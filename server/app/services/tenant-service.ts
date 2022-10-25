const db = require("./db");
import { Tenant } from "../types/tenant-types";

const selectAll = async (): Promise<Tenant[]> => {
  const sql = `
    select id, name, code
    from tenant
    order by name
  `;

  const rows: Tenant[] = await db.manyOrNone(sql);
  return rows;
};

const selectById = async (id: string): Promise<Tenant> => {
  const sql = `
    select id, name, code
    from tenant
    where id = $<id>
  `;

  return await db.one(sql, { id: Number(id) });
};

const insert = async (params: Tenant): Promise<void> => {
  const sql = `
    insert into tenant(id, name, code)
    values ($<id>, $<name>, $<code>)
  `;
  await db.none(sql, params);
};

const update = async (params: Tenant): Promise<number> => {
  const sql = `
    update tenant set
      name = $<name>,
      code = $<code>
    where id = $<id>;`;

  const result = await db.result(sql, params);
  return result.rowCount;
};

const remove = async (id: string): Promise<number> => {
  const sql = `
    delete from tenant
    where id = $<id>;`;

  const result = await db.result(sql, { id: Number(id) });
  return result.rowCount;
};

export default {
  selectAll,
  selectById,
  insert,
  update,
  remove,
};
