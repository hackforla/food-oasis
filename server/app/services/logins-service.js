const db = require("./db");
const camelcaseKeys = require("camelcase-keys");

const insert = async (login_id, tenant_id) => {
  const sql = `insert into logins (login_id, tenant_id)
        values ($<login_id>,'$<tenant_id>') returning id`;

  const row = await db.one(sql, { login_id, tenant_id });
  return row;
};

const selectAll = async (tenantId) => {
  const sql = `select login.first_name, login.last_name, login.email, logins.login_time
    from logins
    join login
    on login.id = logins.login_id
    where logins.tenant_id = $<tenantId>`;

  const rows = await db.any(sql, { tenantId });
  return camelcaseKeys(rows);
};
module.exports = { insert, selectAll };
