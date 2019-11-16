const laplFoodResourcesService = require("../services/load-lapl-food-resources-service");
const { json2csv } = require("json-2-csv");

// Allow viewing (not editing) data loaded by imports
// and scrapers.

const getLaplFoodResources = async (req, res) => {
  laplFoodResourcesService
    .selectAll()
    .then(async resp => {
      // Give preference to download via csv, so non-devcelopers
      // can download csv from endpoint /loads/lapl-food-resources
      if (req.query.format === "csv" || req.accepts("csv")) {
        json2csv(resp, (err, csv) => {
          res.setHeader("Content-Type", "text/csv");
          res.setHeader(
            "Content-Disposition",
            'attachment; filename="' +
              "lapl-food-resources-" +
              Date.now() +
              '.csv"'
          );
          res.send(csv);
        });
      } else if (req.query.format === "json" || req.accepts("json")) {
        res.send(resp);
      } else {
        json2csv(resp, (err, csv) => {
          res.setHeader("Content-Type", "text/csv");
          res.setHeader(
            "Content-Disposition",
            'attachment; filename="' +
              "lapl-food-resources-" +
              Date.now() +
              '.csv"'
          );
          res.send(csv);
        });
      }
    })
    .catch(err => {
      res.status("404").json({ error: err.toString() });
    });
};

module.exports = {
  getLaplFoodResources
};
