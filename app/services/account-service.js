const { pool } = require("./postgres-pool");
const { promisify } = require("util");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const selectAll = () => {
  let sql = `
    select w.id, w.dateCreated, w.firstName, w.lastName, w.dateCreated, w.emailConfirmed
    from login w
    order by w.lastName, w.firstName, w.dateCreated
  `;
  return pool.query(sql).then(res => {
    return res.rows;
  });
};

const selectById = id => {
  const sql = `select * from login where id = ${id}`;
  return pool.query(sql).then(res => {
    return res.rows[0];
  });
};

const selectByEmail = email => {
  const sql = `select id, first_name, last_name, email, password_hash, email_confirmed, date_created
    from login where email = '${email}'`;
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

const register = async model => {
  const { firstName, lastName, email } = model;

  await hashPassword(model);
  const sql = `insert into login (first_name, last_name, email, password_hash, email_confirmed ) 
      values ('${firstName}', '${lastName}', '${email}', '${model.passwordHash}', true ) returning id`;
  return pool.query(sql).then(res => {
    return res.rows[0];
  });
};

const authenticate = async (email, password) => {
  try {
    const user = await selectByEmail(email);
    if (!user) {
      return {
        isSuccess: false,
        reason: `No account found for email ${email}`
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
  } catch (err) {
    return { isSuccess: false, reason: `Incorrect password` };
  }
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
  authenticate,
  update,
  remove
};
