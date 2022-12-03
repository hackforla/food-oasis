import { RequestHandler } from "express";
import { LAPLFoodResource } from "../../types/load-lapl-types";
import loadLaplService from "../services/load-lapl-service";
import { OpenLAData } from "../../types/load-open-la-data-types";
import loadOpenLADataService from "../services/load-open-la-data-service";
import { LARFBListing } from "../../types/load-larfb-types";
import loadLARFBService from "../services/load-larfb-service";
import { LA211Listing } from "../../types/load-211-types";
import load211Service from "../services/load-211-service";
const { json2csv } = require("json-2-csv");

// Allow viewing (not editing) data loaded by imports
// and scrapers.

// Retrieve LA Public Library imported listings from db table load_lapl_food_resources
const getLaplFoodResources: RequestHandler<
  never, // route params
  LAPLFoodResource[] | string, // response
  never, // req body
  { format: string } // query params
> = async (req, res) => {
  try {
    const rows: LAPLFoodResource[] = await loadLaplService.selectAll();
    if (req.query.format === "json" || req.accepts("json")) {
      res.send(rows);
    } else {
      json2csv(rows, (_err: any, csv: string) => {
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
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

// Retrieve Open LA imported listings from db table load_open_la_data
const getOpenLA: RequestHandler<
  never, // route params
  OpenLAData[] | string, // response
  never, // req body
  { format: string } // query params
> = async (req, res) => {
  try {
    const rows = await loadOpenLADataService.selectAll();
    if (req.query.format === "json" || req.accepts("json")) {
      res.send(rows);
    } else {
      json2csv(rows, (_err: any, csv: string) => {
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
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

// Retrieve LA Regional Food Bank imported listings from db table load_larfb
const getLARFB: RequestHandler<
  never, // route params
  LARFBListing[] | string, // response
  never, // req body
  { format: string } // query params
> = async (req, res) => {
  try {
    const resp = await loadLARFBService.selectAll();
    if (req.query.format === "json" || req.accepts("json")) {
      res.send(resp);
    } else {
      json2csv(resp, (_err: any, csv: string) => {
        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          'attachment; filename="' + "open-la-data-" + Date.now() + '.csv"'
        );
        res.send(csv);
      });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

// Retrieve 211 imported listings from db table load_211
const get211: RequestHandler<
  never, // route params
  LA211Listing[] | string, // response
  never, // req body
  { limit: string } // query params
> = async (req, res) => {
  try {
    // can't convert to csv because data has nested json
    const parseJSONArray = (arr: any[]) => {
      let result: any[] = [];
      arr.forEach((val: any) => result.push(JSON.parse(val)));
      return result;
    };
    let response = await load211Service.selectAll(Number(req.query.limit));

    let resJSON: LA211Listing[] = [];
    response.forEach((row) => {
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
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = {
  getLaplFoodResources,
  get211,
  getOpenLA,
  getLARFB,
};
