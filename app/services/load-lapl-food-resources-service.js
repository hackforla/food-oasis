const { pool } = require("./postgres-pool");
const { toSqlString, toSqlNumeric } = require("./postgres-utils");

const selectAll = () => {
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
  return pool.query(sql).then((res) => {
    return res.rows.map((row) => ({
      name: row.name,
      addr: row.addr,
      phone: row.phone,
      lat: row.lat,
      lon: row.lon,
      populationServed: row.population_served,
      resourceCategories: row.resource_categories,
      generalResources: row.general_resources,
      additionalOfferings: row.additional_offerings
    }));
  });
};

const insert = (model) => {
  let {
    name,
    addr,
    phone,
    populationServed,
    resourceCategories,
    generalResources,
    additionalOfferings,
    lat,
    lon
  } = model;

  const sql = `insert into load_lapl_food_resource 
  (name, addr, phone, population_served, 
    resource_categories, general_resources, additional_offerings,
    lat, lon ) 
    values (
      ${toSqlString(name)}, ${toSqlString(addr)}, 
      ${toSqlString(phone)}, ${toSqlString(populationServed)}, 
      ${toSqlString(resourceCategories)}, 
      ${toSqlString(generalResources)}, 
      ${toSqlString(additionalOfferings)}, 
      ${toSqlNumeric(lat)}, ${toSqlNumeric(lon)}) `;
  return pool.query(sql).catch((err) => {
    const msg = err.message;
    console.log(msg);
  });
};

const removeAll = () => {
  const sql = `delete from load_lapl_food_resource`;
  return pool.query(sql).then((res) => {
    return res;
  });
};

module.exports = {
  selectAll,
  insert,
  removeAll
};
