const { pool } = require("./postgres-pool");

const selectAll = () => {
  const sql = `
    select id, name, code
    from parent_organization
    order by name
  `;
  return pool.query(sql).then((res) => {
    return res.rows;
  });
};

const selectById = (id) => {
  const sql = `select id, name, code
  from parent_organization where id = ${id}`;
  return pool.query(sql).then((res) => {
    return res.rows[0];
  });
};

const insert = (model) => {
  const { name, code } = model;
  const sql = `insert into parent_organization (name) values ('${name}', (code) values ('${code})) returning id`;
  return pool.query(sql).then((res) => {
    return res.rows[0];
  });
};

const update = (model) => {
  const { id, name, code } = model;
  const sql = `update parent_organization
               set name = '${name}' code = '${code}'
                where id = ${id}`;
  return pool.query(sql).then((res) => {
    return res;
  });
};

const remove = (id) => {
  const sql = `delete from parent_organization where id = ${id}`;
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
