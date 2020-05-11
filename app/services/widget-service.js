const { pool } = require("./postgres-pool");

const selectAll = () => {
  const sql = `
    select w.id, w.dateCreated, w.name
    from widget w
    order by w.name, w.dateCreated
  `;
  return pool.query(sql).then((res) => {
    return res.rows;
  });
};

const selectById = (id) => {
  const sql = `select w.id, w.dateCreated, w.name from widgets w where w.id = ${id}`;
  return pool.query(sql).then((res) => {
    return res.rows[0];
  });
};

const insert = (model) => {
  const { name } = model;
  const sql = `insert into widget (name) values ('${name}') returning id`;
  return pool.query(sql).then((res) => {
    return res.rows[0];
  });
};

const update = (model) => {
  const { id, name } = model;
  const sql = `update widget
               set name = '${name}'
                where id = ${id}`;
  return pool.query(sql).then((res) => {
    return res;
  });
};

const remove = (id) => {
  const sql = `delete from widget where id = ${id}`;
  return pool.query(sql).then((res) => {
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
