// const app = require("../../server");

const getDistances = (req) => {
  const { latitude, longitude } = req.query;
  const dbInstance = req.app.get("db");
  let range = req.query.range;
  if (!range) {
    range = Infinity;
  }
  // when the server.js is run, massive appends the files in the db folder as
  // methods for the db instance.
  return dbInstance.distance.getAllDistances({ latitude, longitude, range });
};

module.exports = {
  getDistances
};
