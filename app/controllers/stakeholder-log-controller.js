const stakeholderLogService = require("../services/stakeholder-log-service");

const getById = (req, res) => {
  const { id } = req.params;
  stakeholderLogService
    .selectById(id)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status("500").json({ error: err.toString() });
    });
};

module.exports = {
  getById,
};
