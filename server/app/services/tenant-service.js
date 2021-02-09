const { pool } = require("./postgres-pool");

const selectAll = () => {
  const sql = `
    select id, name, code
    from tenant
    order by name
  `;
  return pool.query(sql).then((res) => {
    return res.rows;
  });
};

module.exports = {
  selectAll,
};
