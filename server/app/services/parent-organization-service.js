const db = require("./db");
const camelcaseKeys = require("camelcase-keys");

const selectById = async (tenantId) => {
  // Need to cast id to number so pg-promise knows how
  // to format SQL
  const id = Number(tenantId);
  const sql = `select id, name, code, tenant_id
  from parent_organization where tenantId = $<id>`;

  const row = await db.one(sql, { id });
  return camelcaseKeys(row);
};

const insert = async (model) => {
  model.suggestionStatusId = 1;
  const sql = `insert into parent_organization (name, code)
    values ($<name>, $<code>)
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
  selectById,
  insert,
  update,
  remove,
};
