import db from "./db";
import { LA211Listing } from "../../types/load-211-types";

const selectAll = async (limit: number): Promise<LA211Listing[]> => {
  limit = limit || 1;
  const sql = `select * from load_211 LIMIT $<limit>`;
  return db.manyOrNone(sql, { limit });
};

const insert = async (row: LA211Listing) => {
  const sql = `insert into load_211 (
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
    site_url
    )
    values (
      $<agency_description>,
      $<agency_id>,
      $<agency_name>,
      $<agency_overview>,
      $<geometry>,
      $<is_agency>,
      $<public_school>,
      $<school_district>,
      $<score>,
      $<site_addresses>,
      $<site_aliases>,
      $<site_cross_and_access>,
      $<site_hours>,
      $<site_id>,
      $<site_name>,
      $<site_phones>,
      $<site_services>,
      $<site_url>
    )`;

  return db.none(sql, row);
};

export default {
  selectAll,
  insert,
};
