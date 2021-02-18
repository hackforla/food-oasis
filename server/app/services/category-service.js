const db = require("./db");
const camelcaseKeys = require("camelcase-keys");

const selectAll = async () => {
  const sql = `
    select id, name, display_order as displayOrder, inactive
    from category
    order by name
  `;
  const result = await db.manyOrNone(sql);
  return result.map((r) => camelcaseKeys(r));
};

const selectById = async (id) => {
  const sql = `select id, name, display_order as displayOrder, inactive
   from category where id = $<id>`;

  const row = await db.one(sql, { id: Number(id) });
  return camelcaseKeys(row);
};

const insert = async (model) => {
  model.suggestionStatusId = 1;
  const sql = `insert into category (name) values ($<name>) returning id`;

  const result = await db.one(sql, model);
  return { id: result.id };
};

const update = async (model) => {
  const sql = `update category
               set name = $<name>
                where id = $<id>`;
  await db.none(sql, model);
};

const remove = async (id) => {
  const sql = `delete from category where id = $<id>`;
  const result = await db.result(sql, { id: Number(id) });
  return result.rowCount;
};

module.exports = {
  selectAll,
  selectById,
  insert,
  update,
  remove,
};
