const db = require("./db");
const camelcaseKeys = require("camelcase-keys");

const insert = async (login_id, tenant_id) => {
  const sql = `insert into logins (login_id, tenant_id)
        values ($<login_id>,'$<tenant_id>') returning id`;

  const row = await db.one(sql, { login_id, tenant_id });
  return row;
};

// limit 50
const selectAll = async (email, tenantId) => {
  let sql = `select logins.id, login.first_name, login.last_name, login.email, logins.login_time
    from logins
    join login
    on login.id = logins.login_id`;

  let queryValues = [];
  let whereExpressions = [];

  if (tenantId !== undefined) {
    queryValues.push(tenantId);
    whereExpressions.push(`logins.tenant_id = $${queryValues.length}`);
  }

  if (email !== undefined) {
    queryValues.push("%" + email + "%");
    whereExpressions.push(`login.email like $${queryValues.length}`);
  }

  if (whereExpressions.length === 1) {
    sql += " where " + whereExpressions.join(" and ");
    sql += " order by logins.login_time desc limit 50";
  }
  if (whereExpressions.length > 1) {
    sql += " where " + whereExpressions.join(" and ");
    sql += " order by logins.login_time desc";
  }
  const rows = await db.any(sql, queryValues);
  return camelcaseKeys(rows);
};

module.exports = { insert, selectAll };
