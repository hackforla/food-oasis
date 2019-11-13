const { pool } = require("./postgres-pool");
const { promisify } = require("util");
const bcrypt = require("bcrypt");
const { sendRegistrationConfirmation } = require("./sendgrid-service");
const uuid4 = require("uuid/v4");

const SALT_ROUNDS = 10;

const selectAll = () => {
  let sql = `
    select w.id, w.first_name, w.last_name, w.date_created, w.email_confirmed
    from login w
    order by w.last_name, w.first_name, w.date_created
  `;
  return pool.query(sql).then(res => {
    return res.rows.map(row => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      dateCreated: row.date_created,
      emailConfirmed: row.email_confirmed
    }));
  });
};

const selectById = id => {
  const sql = `select w.id, w.first_name, w.last_name, w.date_created, w.email_confirmed from login w where w.id = ${id}`;
  return pool.query(sql).then(res => {
    const row = res.rows[0];
    return {
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      dateCreated: row.date_created,
      emailConfirmed: row.email_confirmed
    };
  });
};

const selectByEmail = email => {
  const sql = `select id, first_name, last_name, email, password_hash, email_confirmed, date_created
    from login where email ilike '${email}'`;
  return pool.query(sql).then(res => {
    const row = res.rows[0];
    if (row) {
      return {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        passwordHash: row.password_hash,
        email: row.email,
        dateCreated: row.date_created,
        emailConfirmed: row.email_confirmed
      };
    }
    return null;
  });
};

const confirmRegistration = async token => {
  const sql = `select email, date_created
    from security_token where token = '${token}'`;
  try {
    const sqlResult = await pool.query(sql);

    if (sqlResult.rows.length < 1) {
      return {
        success: false,
        code: "REG_CONFIRM_TOKEN_INVALID",
        message:
          "Email confirmation failed. Invalid security token. Re-send confirmation email."
      };
    } else if (sqlResult.rows[0].register_token_timestamp) {
      return {
        success: false,
        code: "REG_CONFIRM_TOKEN_EXPIRED",
        message:
          "Email confirmation failed. Security token expired. Re-send confirmation email."
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
      email
    };
  } catch (err) {
    return { message: err.message };
  }
};

// Re-transmit confirmation email
const resendConfirmationEmail = async model => {
  const { email } = model;
  const token = uuid4();
  let result = null;
  try {
    const sql = `select id from  login where email = '${email}'`;
    const insertResult = await pool.query(sql).then(res => {
      result = {
        success: true,
        code: "REG_SUCCESS",
        newId: res.rows[0].id,
        message: "Account found."
      };
    });
  } catch (err) {
    // Assume any error is an email that does not correspond to
    // an account.
    return {
      success: false,
      code: "REG_ACCOUNT_NOT_FOUND",
      message: `Email ${email} is not registered. `
    };
  }
  try {
    const sqlToken = `insert into security_token (token, email)
        values ('${token}', '${email}') `;
    await pool.query(sqlToken);
  } catch (err) {
    return Promise.reject(err.message);
  }
  try {
    await sendRegistrationConfirmation(email, token);
    return result;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      code: "REG_EMAIL_FAILED",
      message: `Sending registration confirmation email to ${email} failed.`
    };
  }
  return result;
};

const register = async model => {
  const { firstName, lastName, email } = model;
  const token = uuid4();
  let result = null;

  await hashPassword(model);
  try {
    const sql = `insert into login (first_name, last_name, email, 
        password_hash, email_confirmed ) 
        values ('${firstName}', '${lastName}', '${email}', 
        '${model.passwordHash}', false ) returning id`;
    const insertResult = await pool.query(sql).then(res => {
      result = {
        success: true,
        code: "REG_SUCCESS",
        newId: res.rows[0].id,
        message: "Registration successful."
      };
    });
  } catch (err) {
    // Assume any error is duplicate email. This is a successful
    // web api request, though the result is an unsuccessful
    // registration
    return {
      success: false,
      code: "REG_DUPLICATE_EMAIL",
      message: `Email ${email} is already registered. `
    };
  }
  try {
    const sqlToken = `insert into security_token (token, email)
        values ('${token}', '${email}') `;
    await pool.query(sqlToken);
  } catch (err) {
    return Promise.reject(err.message);
  }
  try {
    await sendRegistrationConfirmation(email, token);
    return result;
  } catch (err) {
    console.log(err);
    return {
      success: false,
      code: "REG_EMAIL_FAILED",
      message: `Sending registration confirmation email to ${email} failed.`
    };
  }
  return result;
};

const authenticate = async (email, password) => {
  const user = await selectByEmail(email);
  if (!user) {
    return {
      isSuccess: false,
      reason: `No account found for email ${email}`
    };
  }
  if (!user.emailConfirmed) {
    return {
      isSuccess: false,
      reason: `Email ${email} not confirmed`
    };
  }
  const isUser = await bcrypt.compare(password, user.passwordHash);
  if (isUser) {
    return {
      isSuccess: true,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        emailConfirmed: user.emailConfirmed
      }
    };
  }
  return { isSuccess: false, reason: `Incorrect password` };
};

const update = model => {
  const { id, firstName, lastName } = model;
  const sql = `update login
               set firstName = '${firstName}',
                lastName = '${lastName}'
                where id = ${id}`;
  return pool.query(sql).then(res => {
    return res;
  });
};

const remove = id => {
  const sql = `delete from login where id = ${id}`;
  return pool.query(sql).then(res => {
    return res;
  });
};

async function hashPassword(user) {
  if (!user.password) throw user.invalidate("password", "password is required");
  if (user.password.length < 8)
    throw user.invalidate("password", "password must be at least 8 characters");

  user.passwordHash = await promisify(bcrypt.hash)(user.password, SALT_ROUNDS);
}

module.exports = {
  selectAll,
  selectById,
  register,
  confirmRegistration,
  resendConfirmationEmail,
  authenticate,
  update,
  remove
};
