const { pool } = require("./postgres-pool");

const selectAll = () => {
  const sql = `
    select w.id, w.name
    from category w
    order by w.name
  `;
  return pool.query(sql).then(res => {
    return res.rows;
  });
};

const selectById = id => {
  const sql = `select w.id, w.name from category w where w.id = ${id}`;
  return pool.query(sql).then(res => {
    return res.rows[0];
  });
};

const insert = model => {
  const { name } = model;
  const sql = `insert into category (name) values ('${name}') returning id`;
  return pool.query(sql).then(res => {
    return res.rows[0];
  });
};

const update = model => {
  const { id, name } = model;
  const sql = `update category
               set name = '${name}'
                where id = ${id}`;
  return pool.query(sql).then(res => {
    return res;
  });
};

const remove = id => {
  const sql = `delete from category where id = ${id}`;
  return pool.query(sql).then(res => {
    return res;
  });
};

module.exports = {
  selectAll,
  selectById,
  insert,
  update,
  remove
};
