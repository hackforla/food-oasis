const db = require("./db");
const camelcaseKeys = require("camelcase-keys");

const selectAllById = async (tenantId) => {
  // Need to cast id to number so pg-promise knows how
  // to format SQL
  const id = Number(tenantId);
  const sql = `select id, name, tenant_id
  from stakeholder_tag where tenant_id = $<id>`;

  const result = await db.manyOrNone(sql, { id });
  return result.map((r) => camelcaseKeys(r));
};

const insert = async (model) => {
  model.name = model.name.toUpperCase();
  const sql = `insert into stakeholder_tag (name,  tenant_id)
    values ($<name>,  $<tenantId>)
    returning id`;

  const result = await db.one(sql, model);
  return { id: result.id };
};

const update = async (model) => {
  model.name = model.name.toUpperCase();
  const sql = `update stakeholder_tag
               set name = $<name>
                where id = $<id>`;
  await db.none(sql, model);
};

const remove = async (id) => {
  const sql = `delete from stakeholder_tag where id = $<id>`;
  const result = await db.result(sql, { id: Number(id) });
  return result.rowCount;
};

module.exports = {
  selectAllById,
  insert,
  update,
  remove,
};
