const { pool } = require("./postgres-pool");
const { promisify } = require("util");
const { toSqlBoolean } = require("./postgres-utils");
const moment = require("moment");
const bcrypt = require("bcrypt");
const {
  sendRegistrationConfirmation,
  sendResetPasswordConfirmation,
} = require("./sendgrid-service");
const uuid4 = require("uuid/v4");

const SALT_ROUNDS = 10;

const selectAll = () => {
  let sql = `
    select * from login order by last_name, first_name, date_created
  `;
  return pool.query(sql).then((res) => {
    return res.rows.map((row) => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      dateCreated: row.date_created,
      emailConfirmed: row.email_confirmed,
      isAdmin: row.is_admin,
      isCoordinator: row.is_coordinator,
      isSecurityAdmin: row.is_security_admin,
      isDataEntry: row.is_data_entry,
    }));
  });
};

const selectById = (id) => {
  const sql = `select * from login where id = ${id}`;
  return pool.query(sql).then((res) => {
    const row = res.rows[0];
    return {
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      dateCreated: row.date_created,
      emailConfirmed: row.email_confirmed,
      isAdmin: row.is_admin,
      isCoordinator: row.is_coordinator,
      isSecurityAdmin: row.is_security_admin,
      isDataEntry: row.is_data_entry,
    };
  });
};

const selectByEmail = (email) => {
  const sql = `select * from login where email ilike '${email}'`;
  return pool.query(sql).then((res) => {
    const row = res.rows[0];
    if (row) {
      return {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        passwordHash: row.password_hash,
        email: row.email,
        dateCreated: row.date_created,
        emailConfirmed: row.email_confirmed,
        isAdmin: row.is_admin,
        isCoordinator: row.is_coordinator,
        isSecurityAdmin: row.is_security_admin,
        isDataEntry: row.is_data_entry,
      };
    }
    return null;
  });
};

const register = async (model) => {
  const { firstName, lastName, email } = model;
  let result = null;
  await hashPassword(model);
  try {
    const sql = `insert into login (first_name, last_name, email,
        password_hash)
        values ('${firstName}', '${lastName}', '${email}',
        '${model.passwordHash}') returning id`;
    const insertResult = await pool.query(sql);
    result = {
      isSuccess: true,
      code: "REG_SUCCESS",
      newId: insertResult.rows[0].id,
      message: "Registration successful.",
    };
    await requestRegistrationConfirmation(email, result);
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
const resendConfirmationEmail = async (email) => {
  let result = null;
  try {
    const sql = `select id from  login where email = '${email}'`;
    const insertResult = await pool.query(sql);
    result = {
      success: true,
      code: "REG_SUCCESS",
      newId: insertResult.rows[0].id,
      message: "Account found.",
    };
    result = await requestRegistrationConfirmation(email, result);
    return result;
  } catch (err) {
    // Assume any error is an email that does not correspond to
    // an account.
    return {
      success: false,
      code: "REG_ACCOUNT_NOT_FOUND",
      message: `Email ${email} is not registered. `,
    };
  }
};

// Generate security token and transmit registration
// confirmation email
const requestRegistrationConfirmation = async (email, result) => {
  const token = uuid4();
  try {
    const sqlToken = `insert into security_token (token, email)
        values ('${token}', '${email}') `;
    await pool.query(sqlToken);
    await sendRegistrationConfirmation(email, token);
    return result;
  } catch (err) {
    return {
      success: false,
      code: "REG_EMAIL_FAILED",
      message: `Sending registration confirmation email to ${email} failed.`,
    };
  }
};

const confirmRegistration = async (token) => {
  const sql = `select email, date_created
    from security_token where token = '${token}'`;
  try {
    const sqlResult = await pool.query(sql);
    const now = moment();

    if (sqlResult.rows.length < 1) {
      return {
        success: false,
        code: "REG_CONFIRM_TOKEN_INVALID",
        message:
          "Email confirmation failed. Invalid security token. Re-send confirmation email.",
      };
    } else if (moment(now).diff(sqlResult.rows[0].date_created, "hours") >= 1) {
      return {
        success: false,
        code: "REG_CONFIRM_TOKEN_EXPIRED",
        message:
          "Email confirmation failed. Security token expired. Re-send confirmation email.",
      };
    }

    // If we get this far, we can update the login.email_confirmed flag
    const email = sqlResult.rows[0].email;
    const confirmSql = `update login
            set email_confirmed = true
            where email = '${email}'`;
    await pool.query(confirmSql);

    return {
      success: true,
      code: "REG_CONFIRM_SUCCESS",
      message: "Email confirmed.",
      email,
    };
  } catch (err) {
    return { message: err.message };
  }
};

// Forgot Password - verify email matches an account and
// send password reset confirmation email.
const forgotPassword = async (model) => {
  const { email } = model;
  let result = null;
  try {
    const sql = `select id from  login where email = '${email}'`;
    const checkAccountResult = await pool.query(sql);
    if (
      checkAccountResult &&
      checkAccountResult.rows &&
      checkAccountResult.rows.length == 1
    ) {
      result = {
        isSuccess: true,
        code: "FORGOT_PASSWORD_SUCCESS",
        newId: checkAccountResult.rows[0].id,
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
    result = await requestResetPasswordConfirmation(email, result);
    return result;
  } catch (err) {
    return Promise.reject(`Unexpected Error: ${err.message}`);
  }
};

// Generate security token and transmit password reset
// confirmation email
const requestResetPasswordConfirmation = async (email, result) => {
  const token = uuid4();
  try {
    const sqlToken = `insert into security_token (token, email)
        values ('${token}', '${email}') `;
    await pool.query(sqlToken);
    result = await sendResetPasswordConfirmation(email, token);
    return result;
  } catch (err) {
    return {
      success: false,
      code: "FORGOT_PASSWORD_EMAIL_FAILED",
      message: `Sending registration confirmation email to ${email} failed.`,
    };
  }
};

// Verify password reset token and change password
const resetPassword = async ({ token, password }) => {
  const sql = `select email, date_created
    from security_token where token = '${token}'`;
  const now = moment();
  let email = "";
  try {
    const sqlResult = await pool.query(sql);

    if (sqlResult.rows.length < 1) {
      return {
        isSuccess: false,
        code: "RESET_PASSWORD_TOKEN_INVALID",
        message:
          "Password reset failed. Invalid security token. Re-send confirmation email.",
      };
    } else if (moment(now).diff(sqlResult.rows[0].date_created, "hours") >= 1) {
      return {
        isSuccess: false,
        code: "RESET_PASSWORD_TOKEN_EXPIRED",
        message:
          "Password reset failed. Security token expired. Re-send confirmation email.",
      };
    }

    // If we get this far, we can update the password
    const passwordHash = await promisify(bcrypt.hash)(password, SALT_ROUNDS);
    email = sqlResult.rows[0].email;
    const resetSql = `update login
            set password_hash = '${passwordHash}'
            where email = '${email}'`;
    await pool.query(resetSql);

    return {
      isSuccess: true,
      code: "RESET_PASSWORD_SUCCESS",
      message: "Password reset.",
      email,
    };
  } catch (err) {
    return {
      isSuccess: false,
      code: "RESET_PASSWORD_FAILED",
      message: `Password reset failed. ${err.message}`,
      email,
    };
  }
};

const authenticate = async (email, password) => {
  const user = await selectByEmail(email);
  if (!user) {
    return {
      isSuccess: false,
      code: "AUTH_NO_ACCOUNT",
      reason: `No account found for email ${email}`,
    };
  }
  if (!user.emailConfirmed) {
    return {
      isSuccess: false,
      code: "AUTH_NOT_CONFIRMED",
      reason: `Email ${email} not confirmed`,
    };
  }
  const isUser = await bcrypt.compare(password, user.passwordHash);
  if (isUser) {
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
      },
    };
  }
  return {
    isSuccess: false,
    code: "AUTH_INCORRECT_PASSWORD",
    reason: `Incorrect password`,
  };
};

const update = (model) => {
  const { id, firstName, lastName } = model;
  const sql = `update login
               set firstName = '${firstName}',
                lastName = '${lastName}'
                where id = ${id}`;
  return pool.query(sql).then((res) => {
    return res;
  });
};

const remove = (id) => {
  const sql = `delete from login where id = ${id}`;
  return pool.query(sql).then((res) => {
    return res;
  });
};

async function hashPassword(user) {
  if (!user.password) throw user.invalidate("password", "password is required");
  if (user.password.length < 8)
    throw user.invalidate("password", "password must be at least 8 characters");

  user.passwordHash = await promisify(bcrypt.hash)(user.password, SALT_ROUNDS);
}

// Update login table with the specified permissionName column set to value
const setPermissions = async (userId, permissionName, value) => {
  const user = await selectById(userId);
  if (!user) {
    return {
      success: false,
      code: "AUTH_NO_ACCOUNT",
      reason: `No account found for id ${userId}`,
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
      success: false,
      code: "DB_ERROR",
      message: `Cannot modify login field ${permissionName}.`,
    };
  }

  try {
    // do a tiny bit of sanity checking on our input
    var booleanValue = Boolean(value);
    const updateSql = `update login set ${permissionName}=${toSqlBoolean(
      booleanValue
    )} where id = ${userId}`;
    await pool.query(updateSql);
    return {
      success: true,
      code: "UPDATE_SUCCESS",
      reason: `${permissionName} successfully set to ${booleanValue} for ${userId}`,
    };
  } catch (err) {
    return {
      success: false,
      code: "DB_ERROR",
      message: `Updating login.${permissionName} failed: ${err}`,
    };
  }
};

module.exports = {
  selectAll,
  selectById,
  register,
  confirmRegistration,
  resendConfirmationEmail,
  setPermissions,
  forgotPassword,
  resetPassword,
  authenticate,
  update,
  remove,
};
