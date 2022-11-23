const db = require("./db");

const selectAll = async () => {
  const sql = `select * from load_open_la_data`;
  return db.manyOrNone(sql);
};

module.exports = {
  selectAll,
};
