const { pool } = require("./postgres-pool");

const selectAll = () => {
  const sql = `
    select id, name, inactive
    from category
    order by name
  `;
  return pool.query(sql).then((res) => {
    return res.rows;
  });
};

const selectById = (id) => {
  const sql = `select id, name, inactive
   from category where id = ${id}`;
  return pool.query(sql).then((res) => {
    return res.rows[0];
  });
};

const insert = (model) => {
  // Partial implementation need to escape characters, add other columns
  const { name } = model;
  const sql = `insert into category (name) values ('${name}',) returning id`;
  return pool.query(sql).then((res) => {
    return res.rows[0];
  });
};

const update = (model) => {
  const { id, name } = model;
  // Partial implementation need to escape characters, add other columns
  const sql = `update category
               set name = '${name}'
                where id = ${id}`;
  return pool.query(sql).then((res) => {
    return res;
  });
};

const remove = (id) => {
  const sql = `delete from category where id = ${id}`;
  return pool.query(sql).then((res) => {
    return res;
  });
};

module.exports = {
  selectAll,
  selectById,
  insert,
  update,
  remove,
};
