const db = require("./db");
const camelcaseKeys = require("camelcase-keys");

const selectAllById = async (tenantId) => {
  // Need to cast id to number so pg-promise knows how
  // to format SQL
  const id = Number(tenantId);
  const sql = `select id, name, code, tenant_id
  from parent_organization where tenant_id = $<id>`;

  const result = await db.manyOrNone(sql, { id });
  return result.map((r) => camelcaseKeys(r));
};

const insert = async (model) => {
  const sql = `insert into parent_organization (name, code, tenant_id)
    values ($<name>, $<code>, $<tenantId>)
    returning id`;

  const result = await db.one(sql, model);
  return { id: result.id };
};

const update = async (model) => {
  const sql = `update parent_organization
               set name = $<name>, code = $<code>
                where id = $<id>`;
  await db.none(sql, model);
};

const remove = async (id) => {
  const sql = `delete from parent_organization where id = $<id>`;
  const result = await db.result(sql, { id: Number(id) });
  return result.rowCount;
};

module.exports = {
  selectAllById,
  insert,
  update,
  remove,
};
