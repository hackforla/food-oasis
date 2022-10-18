import {
  Account,
  RegisterFields,
  AccountResponse,
  User,
  PermissionName,
} from "../types/account-types";
import { ClientResponse } from "@sendgrid/mail";
const db = require("./db");
const camelcaseKeys = require("camelcase-keys");

const { promisify } = require("util");
const moment = require("moment");
const bcrypt = require("bcrypt");
import {
  sendRegistrationConfirmation,
  sendResetPasswordConfirmation,
} from "./sendgrid-service";
const { v4: uuid4 } = require("uuid");

const SALT_ROUNDS = 10;

const selectAll = async (tenantId: string): Promise<Account[]> => {
  let sql = `
  select login.id, login.first_name, login.last_name, login.email, login.email_confirmed,
  login.password_hash, login.date_created, login.is_global_admin, login.is_global_reporting,
    lt.tenant_id, lt.is_admin, lt.is_security_admin, lt.is_data_entry, lt.is_coordinator
  from login left outer join
  (
    select * from login_tenant where tenant_id = $<tenantId>
  ) as lt on login.id = lt.login_id
  `;
  const result: Account[] = await db.manyOrNone(sql, {
    tenantId: Number(tenantId),
  });
  return result.map((r) => camelcaseKeys(r));
};

const selectById = async (id: string, tenantId: string): Promise<Account> => {
  const sql = `select login.id, login.first_name, login.last_name, login.email, login.email_confirmed,
  login.password_hash, login.date_created, login.is_global_admin, login.is_global_reporting,
  lt.tenant_id, lt.is_admin, lt.is_security_admin, lt.is_data_entry, lt.is_coordinator
  from login left outer join
  (
    select * from login_tenant where tenant_id = $<tenantId>
  ) as lt on login.id = lt.login_id
  where id = $<id>`;
  const row: Account = await db.one(sql, {
    id: Number(id),
    tenantId: Number(tenantId),
  });
  return camelcaseKeys(row);
};

const selectByEmail = async (
  email: string,
  tenantId: string
): Promise<Account> => {
  const sql = `select login.id, login.first_name, login.last_name, login.email, login.email_confirmed,
  login.password_hash, login.date_created, login.is_global_admin, login.is_global_reporting,
  lt.tenant_id, lt.is_admin, lt.is_security_admin, lt.is_data_entry, lt.is_coordinator
  from login left outer join
  (
    select * from login_tenant where tenant_id = $<tenantId>
  ) as lt on login.id = lt.login_id
  where email ilike $<email> `;
  const row: Account = await db.one(sql, { email, tenantId: Number(tenantId) });
  return camelcaseKeys(row);
};

const register = async (body: RegisterFields): Promise<AccountResponse> => {
  const { email, clientUrl, tenantId } = body;
  let result: AccountResponse;
  await hashPassword(body);
  try {
    const sql = `insert into login (first_name, last_name, email,
        password_hash)
        values ($<firstName>, $<lastName>, $<email>, $<passwordHash>) returning id`;
    const row = await db.one(sql, body);
    result = {
      isSuccess: true,
      code: "REG_SUCCESS",
      newId: row.id as string,
      message: "Registration successful.",
    } as const;
    const sqlRole = `insert into login_tenant (login_id, tenant_id, is_data_entry)
      values ($<loginId>, $<tenantId>, true)`;
    await db.none(sqlRole, { loginId: row.id, tenantId: Number(tenantId) });

    await requestRegistrationConfirmation(email, result, clientUrl);
    return result;
  } catch (err) {
    return {
      isSuccess: false,
      code: "REG_DUPLICATE_EMAIL",
      message: `Email ${email} is already registered. `,
    };
  }
};

// Re-transmit confirmation email
const resendConfirmationEmail = async (
  email: string,
  clientUrl: string
): Promise<AccountResponse> => {
  let result: AccountResponse;
  try {
    const sql = `select id from  login where email ilike $<email>`;
    const rows = await db.manyOrNone(sql, { email });
    result = {
      isSuccess: true,
      code: "REG_SUCCESS",
      newId: rows[0].id,
      message: "Account found.",
    };
    result = await requestRegistrationConfirmation(email, result, clientUrl);
    return result;
  } catch (err) {
    // Assume any error is an email that does not correspond to
    // an account.
    return {
      isSuccess: false,
      code: "REG_ACCOUNT_NOT_FOUND",
      message: `Email ${email} is not registered. `,
    };
  }
};

// Generate security token and transmit registration
// confirmation email
const requestRegistrationConfirmation = async (
  email: string,
  result: AccountResponse,
  clientUrl: string
): Promise<AccountResponse> => {
  const token = uuid4();
  try {
    const sqlToken = `insert into security_token (token, email)
        values ($<token>, $<email>) `;
    await db.none(sqlToken, { token, email });
    await sendRegistrationConfirmation(email, token, clientUrl);
    return result;
  } catch (err) {
    return {
      isSuccess: false,
      code: "REG_EMAIL_FAILED",
      message: `Sending registration confirmation email to ${email} failed.`,
    };
  }
};

const confirmRegistration = async (token: string): Promise<AccountResponse> => {
  const sql = `select email, date_created
    from security_token where token = $<token>;`;
  try {
    const rows = await db.manyOrNone(sql, { token });
    const now = moment();

    if (rows.length < 1) {
      return {
        isSuccess: false,
        code: "REG_CONFIRM_TOKEN_INVALID",
        message:
          "Email confirmation failed. Invalid security token. Re-send confirmation email.",
      };
    } else if (moment(now).diff(rows[0].date_created, "hours") >= 1) {
      return {
        isSuccess: false,
        code: "REG_CONFIRM_TOKEN_EXPIRED",
        message:
          "Email confirmation failed. Security token expired. Re-send confirmation email.",
      };
    }

    // If we get this far, we can update the login.email_confirmed flag
    const email = rows[0].email;
    const confirmSql = `update login
            set email_confirmed = true
            where email ilike $<email>`;
    await db.none(confirmSql, { email });

    return {
      isSuccess: true,
      code: "REG_CONFIRM_SUCCESS",
      message: "Email confirmed.",
      email,
    };
  } catch (err: any) {
    return {
      isSuccess: false,
      code: "REG_CONFIRM_FAILED",
      message: err.message,
    };
  }
};

// Forgot Password - verify email matches an account and
// send password reset confirmation email.
const forgotPassword = async (model: {
  email: string;
  clientUrl: string;
}): Promise<AccountResponse> => {
  const { email, clientUrl } = model;
  let result: AccountResponse;
  try {
    const sql = `select id from  login where email ilike $<email>`;
    const row = await db.one(sql, { email });
    if (row) {
      result = {
        isSuccess: true,
        code: "FORGOT_PASSWORD_SUCCESS",
        newId: row.id,
        message: "Account found.",
      };
    } else {
      return {
        isSuccess: false,
        code: "FORGOT_PASSWORD_ACCOUNT_NOT_FOUND",
        message: `Email ${email} is not registered. `,
      };
    }
    // Replace the success result if there is a prob
    // sending email.
    try {
      await requestResetPasswordConfirmation(email, result, clientUrl);
    } catch (e) {}
    if (result.isSuccess === true) {
      return {
        isSuccess: true,
        code: "FORGOT_PASSWORD_SUCCESS",
        newId: row.id,
        message: "Account found.",
      };
    } else {
      return result;
    }
  } catch (err: any) {
    return Promise.reject(`Unexpected Error: ${err.message}`);
  }
};

// Generate security token and transmit password reset
// confirmation email
const requestResetPasswordConfirmation = async (
  email: string,
  result: AccountResponse,
  clientUrl: string
): Promise<AccountResponse> => {
  const token = uuid4();
  try {
    const sqlToken = `insert into security_token (token, email)
        values ($<token>, $<email>); `;
    await db.none(sqlToken, { token, email });
    try {
      await sendResetPasswordConfirmation(email, token, clientUrl);
    } catch (e: any) {
      throw new Error(e);
    }
    return result;
  } catch (err) {
    return {
      isSuccess: false,
      code: "FORGOT_PASSWORD_EMAIL_FAILED",
      message: `Sending registration confirmation email to ${email} failed.`,
    };
  }
};

// Verify password reset token and change password
const resetPassword = async ({
  token,
  password,
}: {
  token: string;
  password: string;
}): Promise<AccountResponse> => {
  const sql = `select email, date_created
    from security_token where token = $<token>; `;
  const now = moment();
  let email = "";
  try {
    const row = await db.one(sql, { token });

    if (!row) {
      return {
        isSuccess: false,
        code: "RESET_PASSWORD_TOKEN_INVALID",
        message:
          "Password reset failed. Invalid security token. Re-send confirmation email.",
      };
    } else if (moment(now).diff(row.date_created, "hours") >= 1) {
      return {
        isSuccess: false,
        code: "RESET_PASSWORD_TOKEN_EXPIRED",
        message:
          "Password reset failed. Security token expired. Re-send confirmation email.",
      };
    }

    // If we get this far, we can update the password
    const passwordHash = await promisify(bcrypt.hash)(password, SALT_ROUNDS);
    email = row.email;
    const resetSql = `update login
            set password_hash = $<passwordHash>
            where email ilike $<email> ;`;
    await db.none(resetSql, { passwordHash, email });

    return {
      isSuccess: true,
      code: "RESET_PASSWORD_SUCCESS",
      message: "Password reset.",
      email,
    };
  } catch (err: any) {
    return {
      isSuccess: false,
      code: "RESET_PASSWORD_FAILED",
      message: `Password reset failed. ${err.message}`,
      email,
    };
  }
};

const authenticate = async (
  email: string,
  password: string,
  tenantId: string
): Promise<AccountResponse> => {
  try {
    const user = await selectByEmail(email, tenantId);
    if (!user.emailConfirmed) {
      return {
        isSuccess: false,
        code: "AUTH_NOT_CONFIRMED",
        message: `Email ${email} not confirmed`,
      };
    }
    const isUser = await bcrypt.compare(password, user.passwordHash);
    if (isUser) {
      // assign role on JWT; default to least privilege
      let role = [];
      if (user.isAdmin) {
        role.push("admin");
      }
      if (user.isSecurityAdmin) {
        role.push("security_admin");
      }
      if (user.isCoordinator) {
        role.push("coordinator");
      }
      if (user.isDataEntry) {
        role.push("data_entry");
      }
      if (user.isGlobalAdmin) {
        role.push("global_admin");
      }
      if (user.isGlobalReporting) {
        role.push("global_reporting");
      }
      return {
        isSuccess: true,
        code: "AUTH_SUCCESS",
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
          isCoordinator: user.isCoordinator,
          isSecurityAdmin: user.isSecurityAdmin,
          isDataEntry: user.isDataEntry,
          emailConfirmed: user.emailConfirmed,
          isGlobalAdmin: user.isGlobalAdmin,
          isGlobalReporting: user.isGlobalReporting,
          role: role.join(","), // join list of roles to string
        },
      };
    }
    return {
      isSuccess: false,
      code: "AUTH_INCORRECT_PASSWORD",
      message: `Incorrect password`,
    };
  } catch (err) {
    return {
      isSuccess: false,
      code: "AUTH_NO_ACCOUNT",
      message: `No account found for email ${email}`,
    };
  }
};

const update = async (model: User): Promise<Account> => {
  const sql = `update login
               set firstName = $<firstName>,
                lastName = $<lastName>
                where id = $<id>;`;
  return await db.none(sql, model);
};

const remove = async (id: string) => {
  const sql = `delete from login where id = $<id>`;
  return await db.none(sql, { id: Number(id) });
};

async function hashPassword(user: any) {
  if (!user.password) throw user.invalidate("password", "password is required");
  if (user.password.length < 8)
    throw user.invalidate("password", "password must be at least 8 characters");

  user.passwordHash = await promisify(bcrypt.hash)(user.password, SALT_ROUNDS);
}

// Update login table with the specified permissionName column set to value
const setTenantPermissions = async (
  userId: string,
  permissionName: PermissionName,
  value: string,
  tenantId: string
): Promise<AccountResponse> => {
  const user = await selectById(userId, tenantId);
  if (!user) {
    return {
      isSuccess: false,
      code: "AUTH_NO_ACCOUNT",
      message: `No account found for id ${userId}`,
    };
  }
  // Don't expose any columns besides the currently allowed ones:
  // is_admin, is_coordinator, is_security_admin, is_data_entry
  var allowedPermissions = [
    "is_admin",
    "is_coordinator",
    "is_security_admin",
    "is_data_entry",
  ];
  if (!allowedPermissions.includes(permissionName)) {
    return {
      isSuccess: false,
      code: "DB_ERROR",
      message: `Cannot modify login field ${permissionName}.`,
    };
  }

  try {
    // do a tiny bit of sanity checking on our input
    var booleanValue = Boolean(value);
    // if granting a role for the first time, a login_tenant record may not
    // exist, so we might need to insert it.
    if (booleanValue) {
      const insertSql = `INSERT INTO login_tenant ( login_id, tenant_id )
      VALUES ( $<userId>, $<tenantId> )`;
      try {
        await db.none(insertSql, { userId, tenantId });
      } catch (err) {
        console.error(err);
        console.log(
          `login_tenant record already exists for login_id ${userId}, tenant_id ${tenantId}`
        );
      }
    }

    const updateSql = `update login_tenant set $<permissionName:name> = $<booleanValue> where login_id = $<userId> and tenant_id = $<tenantId>;`;
    await db.none(updateSql, {
      permissionName,
      booleanValue,
      userId,
      tenantId,
    });
    return {
      isSuccess: true,
      code: "UPDATE_SUCCESS",
      message: `${permissionName} successfully set to ${booleanValue} for ${userId}`,
    };
  } catch (err) {
    return {
      isSuccess: false,
      code: "DB_ERROR",
      message: `Updating login.${permissionName} failed: ${err}`,
    };
  }
};

const setGlobalPermissions = async (
  userId: string,
  permissionName: string,
  value: string,
  tenantId: string
): Promise<AccountResponse> => {
  const user = await selectById(userId, tenantId);
  if (!user) {
    return {
      isSuccess: false,
      code: "AUTH_NO_ACCOUNT",
      message: `No account found for id ${userId}`,
    };
  }
  // Don't expose any columns besides the currently allowed ones:
  // is_global_admin, is_global_reporting
  var allowedPermissions = ["is_global_admin", "is_global_reporting"];
  if (!allowedPermissions.includes(permissionName)) {
    return {
      isSuccess: false,
      code: "DB_ERROR",
      message: `Cannot modify login field ${permissionName}.`,
    };
  }

  try {
    // do a tiny bit of sanity checking on our input
    var booleanValue = Boolean(value);
    const updateSql = `update login set $<permissionName:name> = $<booleanValue> where id = $<userId>;`;
    await db.none(updateSql, { permissionName, booleanValue, userId });
    return {
      isSuccess: true,
      code: "UPDATE_SUCCESS",
      message: `${permissionName} successfully set to ${booleanValue} for ${userId}`,
    };
  } catch (err) {
    return {
      isSuccess: false,
      code: "DB_ERROR",
      message: `Updating login.${permissionName} failed: ${err}`,
    };
  }
};

export default {
  authenticate,
  confirmRegistration,
  forgotPassword,
  register,
  remove,
  resendConfirmationEmail,
  resetPassword,
  selectAll,
  selectByEmail,
  selectById,
  setGlobalPermissions,
  setTenantPermissions,
  update,
};
