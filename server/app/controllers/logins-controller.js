const loginsService = require("../services/logins-service");

const getAll = async (req, res) => {
  try {
    const resp = await loginsService.selectAll(
      req.query.email,
      req.query.tenantId
    );
    res.send(resp);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  getAll,
};
