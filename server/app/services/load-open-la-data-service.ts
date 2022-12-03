import db from "./db";
import { OpenLAData } from "../../types/load-open-la-data-types";

const selectAll = async (): Promise<OpenLAData[]> => {
  const sql = `select 
  id, objectid, ext_id, cat1, cat2, cat3,
  org_name, name, addrln1, addrln2, city, state, zip,
  hours, phones, email, url,
  info1, info2, post_id, description,
  link, use_type, latitude, longitude,
  dateupdated, point_x,  point_y
 from load_open_la_data`;
  return db.manyOrNone(sql);
};

export default {
  selectAll,
};
