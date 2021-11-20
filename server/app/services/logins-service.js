const db = require("./db");

const insert = async (login_id, tenant_id) => {
  const sql = `insert into logins (login_id, tenant_id)
        values ($<login_id>,'$<tenant_id>') returning id`;

  const row = await db.one(sql, { login_id, tenant_id });
  return row;
};

module.exports = { insert };
