const tenantService = require("../services/tenant-service");

const getAll = (req, res) => {
  tenantService
    .selectAll()
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status("404").json({ error: err.toString() });
    });
};

module.exports = {
  getAll,
};
