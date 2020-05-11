const { pool } = require("./postgres-pool");
const { toSqlString } = require("./postgres-utils");

/*
// TODO: verify the model for org table
  type Resource {
    id: ID!
    description: String!
    url: String!
  }
*/
const selectAll = () => {
  const sql = `
    select r.id, r.description, r.url
    from resource r
    order by r.id
  `;
  return pool.query(sql).then((res) => {
    return res.rows;
  });
};

const selectById = (id) => {
  const sql = `select r.id, r.description, r.url
   from resource r where r.id = ${id}`;
  return pool.query(sql).then((res) => {
    return res.rows[0];
  });
};

const create = (model) => {
  // Partial implementation need to escape characters, add other columns
  const { description, url } = model;
  const sql = `insert into resource (description, url) values (${toSqlString(
    description
  )},${toSqlString(url)}) returning id`;
  return pool.query(sql).then((res) => {
    return res.rows[0];
  });
};

const update = (model) => {
  const { id, url, description } = model;
  // Partial implementation need to escape characters, add other columns
  const sql = `update resource
               set url = '${toSqlString(url)}',
               description = ${toSqlString(description)}
                where id = ${id}`;
  return pool.query(sql).then((res) => {
    return res;
  });
};

const remove = (id) => {
  const sql = `delete from resource where id = ${id}`;
  return pool.query(sql).then((res) => {
    return res;
  });
};

module.exports = {
  selectAll,
  selectById,
  create,
  update,
  remove
};
