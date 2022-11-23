const laplFoodResourcesService = require("../services/load-lapl-food-resources-service");
const load211 = require("../services/load_211");
const loadOpenLAData = require("../services/load_open_la_data");
const loadLARFB = require("../services/load_larfb");
const { json2csv } = require("json-2-csv");

// Allow viewing (not editing) data loaded by imports
// and scrapers.

// Retrieve LA Public Library imported listings from db table load_lapl_food_resources
const getLaplFoodResources = async (req, res) => {
  laplFoodResourcesService
    .selectAll()
    .then(async (resp) => {
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
    .catch((err) => {
      res.status("404").json({ error: err.toString() });
    });
};

// Retrieve Open LA imported listings from db table load_open_la_data
const getOpenLA = async (req, res) => {
  loadOpenLAData
    .selectAll()
    .then(async (resp) => {
      // Give preference to download via csv, so non-devcelopers
      // can download csv from endpoint /loads/lapl-food-resources
      if (req.query.format === "csv" || req.accepts("csv")) {
        json2csv(resp, (err, csv) => {
          res.setHeader("Content-Type", "text/csv");
          res.setHeader(
            "Content-Disposition",
            'attachment; filename="' + "open-la-data-" + Date.now() + '.csv"'
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
            'attachment; filename="' + "open-la-data-" + Date.now() + '.csv"'
          );
          res.send(csv);
        });
      }
    })
    .catch((err) => {
      res.status("404").json({ error: err.toString() });
    });
};

// Retrieve LA Refional Food Bank imported listings from db table load_larfb
const getLARFB = async (req, res) => {
  loadOpenLAData
    .selectAll()
    .then(async (resp) => {
      // Give preference to download via csv, so non-devcelopers
      // can download csv from endpoint /loads/lapl-food-resources
      if (req.query.format === "csv" || req.accepts("csv")) {
        json2csv(resp, (err, csv) => {
          res.setHeader("Content-Type", "text/csv");
          res.setHeader(
            "Content-Disposition",
            'attachment; filename="' + "open-la-data-" + Date.now() + '.csv"'
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
            'attachment; filename="' + "open-la-data-" + Date.now() + '.csv"'
          );
          res.send(csv);
        });
      }
    })
    .catch((err) => {
      res.status("404").json({ error: err.toString() });
    });
};

// Retrieve 211 imported listings from db table load_211
const get211 = async (req, res) => {
  // can't convert to csv because data has nested json
  const parseJSONArray = (arr) => {
    let result = [];
    arr.forEach((val) => result.push(JSON.parse(val)));
    return result;
  };
  load211.selectAll().then((sqlRes) => {
    let resJSON = [];
    sqlRes.forEach((row) => {
      const {
        agency_description,
        agency_id,
        agency_name,
        agency_overview,
        geometry,
        is_agency,
        public_school,
        school_district,
        score,
        site_addresses,
        site_aliases,
        site_cross_and_access,
        site_hours,
        site_id,
        site_name,
        site_phones,
        site_services,
        site_url,
      } = row;
      let rowJson = {
        agency_description,
        agency_id,
        agency_name,
        agency_overview,
        geometry,
        is_agency,
        public_school: parseJSONArray(public_school),
        school_district,
        score,
        site_addresses: parseJSONArray(site_addresses),
        site_aliases: parseJSONArray(site_aliases),
        site_cross_and_access,
        site_hours,
        site_id,
        site_name,
        site_phones: parseJSONArray(site_phones),
        site_services: parseJSONArray(site_services),
        site_url,
      };
      resJSON.push(rowJson);
    });
    res.send(resJSON);
  });
};

module.exports = {
  getLaplFoodResources,
  get211,
  getOpenLA,
  getLARFB,
};
