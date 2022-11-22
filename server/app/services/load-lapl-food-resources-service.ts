import { Article, LAPLFoorResource } from "../../types/import-types";

const { db } = require("./db");

const selectAll = async () => {
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
  const rows: LAPLFoorResource[] = await db.manyOrNone(sql);
  return rows.map((row) => ({
    name: row.name,
    addr: row.addr,
    phone: row.phone,
    lat: row.lat,
    lon: row.lon,
    populationServed: row.population_served,
    resourceCategories: row.resource_categories,
    generalResources: row.general_resources,
    additionalOfferings: row.additional_offerings,
  }));
};

const insert = async (data: Article) => {
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
  return await db.none(sql, data);
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
