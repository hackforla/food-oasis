// const { pool } = require("./postgres-pool");
const db = require("./db");

const selectAll = async () => {
  const sql = `
    select id, name, code
    from tenant
    order by name
  `;
  try {
    const rows = await db.manyOrNone(sql);
    return rows;
  } catch (e) {
    return e;
  }
};

const selectById = async (id) => {
  const sql = `
    select id, name, code
    from tenant
    where id = $<id>
  `;
  try {
    const row = await db.one(sql, { id });
    return row;
  } catch (e) {
    return e;
  }
};

const insert = async (params) => {
  const sql = `
    insert into tenant(id, name, code)
    values ($<id>, $<name>, $<code>)
  `;
  try {
    await db.none(sql, params);
  } catch (e) {
    return e;
  }
};

const update = async (params) => {
  const sql = `
    update tenant set
      name = $<name>,
      code = $<code>
    where id = $<id>;`;
  try {
    await db.none(sql, params);
  } catch (e) {
    return e;
  }
};

const remove = async (id) => {
  const sql = `
    delete from tenant
    where id = $<id>;`;
  try {
    await db.none(sql, { id });
  } catch (e) {
    return null;
  }
};

module.exports = {
  selectAll,
  selectById,
  insert,
  update,
  remove,
};
