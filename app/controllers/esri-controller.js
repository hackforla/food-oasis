const esriService = require("../services/esri-service");

const geocode = async (req, res) => {
  try {
    const { address } = req.query;
    const response = await esriService.geocode(address);
    res.send(response);
  } catch (err) {
    res.status("500").json({ error: err.toString() });
  }
};

module.exports = {
  geocode
};
