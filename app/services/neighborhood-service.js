const { pool } = require("./postgres-pool");

const selectAll = () => {
  const sql = `
    select id, name, website, empower_link, nc_id,
      certified, service_region, geometry
    from neighborhood
    order by name
  `;
  return pool.query(sql).then((res) => {
    return res.rows;
  });
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
      ST_GeomFromText('POINT(${latitude} ${longitude})'))
    `;
  const result = await pool.query(sql);
  if (!result.rows.length) {
    // Could not find a neighborhood that contains this point
    return null;
  }
  return result.rows[0];
};

// assignNeighborhood: given a stakeholder_id, find and assign a neighborhood_id
// if one exists for that location.
const assignNeighborhood = (
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
    return pool.query(sql).then((res) => {
      return res;
    });
  }
  // otherwise...what?
  return Promise.reject(
    new Error("Could not find valid neighborhood ID for stakeholder")
  );
};

module.exports = {
  selectAll,
  findNeighborhood,
  assignNeighborhood,
};
