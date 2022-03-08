const db = require("./db");
const camelcaseKeys = require("camelcase-keys");

const selectAll = async () => {
  // const sql = `
  //   select id, name, website, empower_link, nc_id,
  //     certified, service_region, geometry
  //   from neighborhood
  //   order by name
  // `;
  const sql = `
    select id, name
    from neighborhood
    order by name
  `;
  const result = await db.manyOrNone(sql);
  return result.map((r) => camelcaseKeys(r));
};

const selectGeoJSONById = async (id) => {
  const sql = `
  SELECT id, name, certified, service_region, 
   ST_X(ST_Centroid(geometry)) as centroid_longitude, 
   ST_Y(ST_Centroid(geometry)) as centroid_latitude,
   jsonb_build_object(
    'type',       'Feature',
    'id',         id,
    'name', name,
    'geometry', ST_AsGeoJSON(geometry)::jsonb
  ) as geojson
  FROM neighborhood WHERE id = $<id>
  `;

  const result = await db.one(sql, { id });
  return camelcaseKeys(result);
};

// findNeighborhood: use the postgis postgres extension to find
// a lat/lon within a neighborhood. We treat the neighborhood as a polygon,
// and the lat/lon as a point that will potentially be located within a neighborhood.
// More info on ST_GeomFromText:
// https://postgis.net/docs/ST_GeomFromText.html
const findNeighborhood = async (latitude, longitude) => {
  const sql = `
    SELECT id, name
      FROM neighborhood
     WHERE ST_Contains(
      geometry,
      ST_GeomFromText('POINT($<latitude> $<longitude>)'))
    `;
  const rows = await db.manyOrNone(sql, { latitude, longitude });
  if (!rows.length) {
    // Could not find a neighborhood that contains this point
    return null;
  }
  return rows[0];
};

// assignNeighborhood: given a stakeholder_id, find and assign a neighborhood_id
// if one exists for that location.
const assignNeighborhood = async (
  stakeholder_id,
  stakeholder_lat,
  stakeholder_lon
) => {
  let neighborhood_id = findNeighborhood(stakeholder_lat, stakeholder_lon);
  if (neighborhood_id) {
    const sql = `
      UPDATE stakeholder set neighborhood_id = ${neighborhood_id}
      WHERE id = ${stakeholder_id}
    `;
    return db.none(sql, { stakeholder_id, stakeholder_lat, stakeholder_lon });
  }
  // otherwise...what?
  return Promise.reject(
    new Error("Could not find valid neighborhood ID for stakeholder")
  );
};

module.exports = {
  selectAll,
  selectGeoJSONById,
  findNeighborhood,
  assignNeighborhood,
};
