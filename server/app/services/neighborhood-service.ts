import {
  Neighborhood,
  NeighborhoodGeoJSON,
} from "../../types/neighborhood-types";
import db from "./db";
import camelcaseKeys from "camelcase-keys";

const selectAll = async (tenantId: number): Promise<Neighborhood[]> => {
  // const sql = `
  //   select id, name, website, empower_link, nc_id,
  //     certified, service_region, geometry
  //   from neighborhood
  //   order by name
  // `;
  const sql = `
    select id, name
    from neighborhood
    where tenant_id = $<tenantId>
    order by name
    
  `;
  const result = await db.manyOrNone(sql, { tenantId });
  return result.map((r) => camelcaseKeys(r));
};

const selectGeoJSONById = async (
  ncid: number
): Promise<NeighborhoodGeoJSON> => {
  const sql = `
  SELECT id, name, website, empower_link,
   nc_id, certified, service_region, zoom,
   ST_X(ST_Centroid(geometry)) as centroid_longitude, 
   ST_Y(ST_Centroid(geometry)) as centroid_latitude,
   jsonb_build_object(
    'type',       'Feature',
    'id',         id,
    'name', name,
    'geometry', ST_AsGeoJSON(geometry)::jsonb
  ) as geojson
  FROM neighborhood WHERE nc_id = $<ncid>
  `;

  const result = await db.one(sql, { ncid });
  return camelcaseKeys(result);
};

const updateZoom = async (ncId: number, zoom: number): Promise<void> => {
  const sql = `
  UPDATE neighborhood SET zoom = $<zoom>
  WHERE nc_id = $<ncId> 
  `;
  await db.none(sql, { ncId, zoom });
};

// findNeighborhood: use the postgis postgres extension to find
// a lat/lon within a neighborhood. We treat the neighborhood as a polygon,
// and the lat/lon as a point that will potentially be located within a neighborhood.
// More info on ST_GeomFromText:
// https://postgis.net/docs/ST_GeomFromText.html
const findNeighborhood = async (
  latitude: number,
  longitude: number
): Promise<Object | null> => {
  const sql = `
    SELECT id, name
      FROM neighborhood
     WHERE ST_Contains(
      geometry,
      ST_GeomFromText('POINT($<latitude> $<longitude>)'))
      ORDER BY name
    `;
  const rows: Object[] = await db.manyOrNone(sql, { latitude, longitude });
  if (!rows.length) {
    // Could not find a neighborhood that contains this point
    return null;
  }
  return rows[0];
};

// assignNeighborhood: given a stakeholder_id, find and assign a neighborhood_id
// if one exists for that location.
const assignNeighborhood = async (
  stakeholder_id: number,
  stakeholder_lat: number,
  stakeholder_lon: number
): Promise<null> => {
  const neighborhood_id: Promise<Object | null> = findNeighborhood(
    stakeholder_lat,
    stakeholder_lon
  );
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

export default {
  selectAll,
  selectGeoJSONById,
  updateZoom,
  findNeighborhood,
  assignNeighborhood,
};
