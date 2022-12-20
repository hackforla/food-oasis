import camelcaseKeys from "camelcase-keys";
import { LAPLFoodResource } from "../../types/load-lapl-types";
import db from "./db";

const selectAll = async (): Promise<LAPLFoodResource[]> => {
  const sql = `
    select name, addr, phone, 
    population_served, 
    resource_categories, 
    general_resources, 
    additional_offerings,
    lat, lon
    from load_lapl_food_resource 
    order by name
  `;
  const result = await db.manyOrNone(sql);
  return result.map((r) => camelcaseKeys(r));
};

const insert = async (data: LAPLFoodResource) => {
  const sql = `insert into load_lapl_food_resource 
  (name, addr, phone, population_served, 
    resource_categories, general_resources, additional_offerings,
    lat, lon ) 
    values (
     $<name>, $<addr>, 
     $<phone>, $<populationServed>, 
     $<resourceCategories>, 
     $<generalResources>, 
     $<additionalOfferings>, 
     $<lat>, $<lon>) `;
  await db.none(sql, data);
};

const removeAll = () => {
  const sql = `delete from load_lapl_food_resource`;
  return db.none(sql);
};

export default {
  selectAll,
  insert,
  removeAll,
};
