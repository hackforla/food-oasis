const db = require("./db");

const selectAll = async () => {
  const sql = `
    select id, name, code
    from tenant
    order by name
  `;

  const rows = await db.manyOrNone(sql);
  return rows;
};

const selectById = async (id) => {
  const sql = `
    select id, name, code
    from tenant
    where id = $<id>
  `;

  return await db.one(sql, { id });
};

const insert = async (params) => {
  const sql = `
    insert into tenant(id, name, code)
    values ($<id>, $<name>, $<code>)
  `;
  await db.none(sql, params);
};

const update = async (params) => {
  const sql = `
    update tenant set
      name = $<name>,
      code = $<code>
    where id = $<id>;`;

  const result = await db.result(sql, params);
  return result.rowCount;
};

const remove = async (id) => {
  const sql = `
    delete from tenant
    where id = $<id>;`;

  const result = await db.result(sql, { id });
  return result.rowCount;
};

module.exports = {
  selectAll,
  selectById,
  insert,
  update,
  remove,
};
