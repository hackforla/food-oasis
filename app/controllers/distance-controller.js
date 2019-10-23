const distanceService = require("../services/distance-service");

const getDistances = (req, res) => {
    distanceService
        .getDistances(req)// db instance is passed to service as req.app.get("db")
        .then(resp => {
            res.send(resp)
        })
        .catch(err => {
            res.status(500).json({error: err.toString()});
        });
};

module.exports = {
    getDistances
}