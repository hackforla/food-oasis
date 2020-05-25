const { pool } = require("./postgres-pool");
const { toSqlString } = require("./postgres-utils");

/*
  type Organization {
    id: ID!
      // TODO: verify the model for org table


    description: String!
    url: String!
  }
*/
const selectAll = () => {
  const sql = `
    select id, description, url
    from organization
    order by id
  `;
  return pool.query(sql).then((res) => {
    return res.rows;
  });
};

const selectById = (id) => {
  const sql = `select id, description, url
   from organization where id = ${id}`;
  return pool.query(sql).then((res) => {
    return res.rows[0];
  });
};

const create = (model) => {
  // Partial implementation need to escape characters, add other columns

  // TODO: verify the model for org table
  const { description, url } = model;
  const sql = `insert into organization (description, url) values (${toSqlString(
    description
  )},${toSqlString(url)}) returning id`;
  return pool.query(sql).then((res) => {
    return res.rows[0];
  });
};

const update = (model) => {
  // TODO: verify the model for org table

  const { id, url, description } = model;
  // Partial implementation need to escape characters, add other columns
  const sql = `update organization
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
  remove,
};
