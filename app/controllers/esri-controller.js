const esriService = require("../services/esri-service");

const geocode = async (req, res) => {
  try {
    const { address } = req.query;
    const response = await esriService.geocode(address);
    res.send(response);
  } catch (err) {
    // In order to surface the error at the client, we need to
    // return it as a successful web api request, then detect that
    // it's an error at the client.
    res.json(err);
  }
};

module.exports = {
  geocode,
};
