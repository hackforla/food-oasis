import db from "./db";
import { LARFBListing } from "../../types/load-larfb-types";

const selectAll = async (): Promise<LARFBListing[]> => {
  const sql = `select 
  name, lar_code, agency_posting_code, phone,
  street, city, state, zip,
  stars, extra1, extra2,
  extra3, stakeholder_id, stakeholder_id_confidence
  from load_larfb`;
  return db.manyOrNone(sql);
};

export default {
  selectAll,
};
