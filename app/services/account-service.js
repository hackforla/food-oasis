const { pool } = require("./postgres-pool");

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
  const sql = `select * from login where email = ${email}`;
  return pool.query(sql).then(res => {
    return res.rows[0];
  });
};

const register = async model => {
  const { firstName, lastName, email } = model;
  const passwordHash = hashPassword(model.password);
  const sql = `insert into login (firstName, lastName, email) 
    values ('${firstName}', '${lastName}', '${email}', '${passwordHash}', true ) returning id`;
  return pool.query(sql).then(res => {
    return res.rows[0];
  });
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

  const passwordHash = await promisify(bcrypt.hash)(user.password, SALT_ROUNDS);
  return passwordHash;
}

module.exports = {
  selectAll,
  selectById,
  register,
  update,
  remove
};
