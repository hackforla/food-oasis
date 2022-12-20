import { Login } from "../../types/logins-types";
import db from "./db";
import camelcaseKeys from "camelcase-keys";

const insert = async (login_id: string, tenant_id: string) => {
  const sql = `insert into logins (login_id, tenant_id)
        values ($<login_id>,'$<tenant_id>') returning id`;

  const row = await db.one(sql, { login_id, tenant_id });
  return row;
};

// limit 500
const selectAll = async (
  email: string | undefined,
  tenantId: string | undefined
): Promise<Login[]> => {
  let sql = `select logins.id, login.first_name, login.last_name, login.email, logins.login_time
    from logins
    join login
    on login.id = logins.login_id`;

  const queryValues: string[] = [];
  const whereExpressions: string[] = [];

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
    sql += " order by logins.login_time desc limit 500";
  }
  if (whereExpressions.length > 1) {
    sql += " where " + whereExpressions.join(" and ");
    sql += " order by logins.login_time desc";
  }
  const rows: Login[] = await db.any(sql, queryValues);
  return camelcaseKeys(rows);
};

export default { insert, selectAll };
