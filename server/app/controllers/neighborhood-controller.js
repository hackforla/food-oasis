const neighborhoodService = require("../services/neighborhood-service");

const getAll = (req, res) => {
  neighborhoodService
    .selectAll()
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status("404").json({ error: err.toString() });
    });
};

const getGeoJSONById = (req, res) => {
  const { id } = req.params;
  neighborhoodService
    .selectGeoJSONById(id)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.status("404").json({ error: err.toString() });
    });
};

module.exports = {
  getAll,
  getGeoJSONById,
};
