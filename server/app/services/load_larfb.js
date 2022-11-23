const db = require("./db");

const selectAll = async () => {
  const sql = `select * from load_larfb`;
  return db.manyOrNone(sql);
};

module.exports = {
  selectAll,
};
