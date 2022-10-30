import axios from "axios";
import { tenantId } from "helpers/Configuration";

const baseUrl = "/api/neighborhoods";

export const getAll = async (searchParams) => {
  const params = { ...searchParams, tenantId };
  try {
    const response = await axios.get(baseUrl, {
      params,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getGeoJSONById = async (id) => {
  try {
    const response = await axios.get(baseUrl + `/${id}`, {
      id,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Not used yet, but will be used by admin screen for maintaining zoom levels
// for neighborhoodss
export const updateZoom = async (ncId, zoom) => {
  try {
    await axios.put(baseUrl + `/${ncId}`, {
      ncId,
      zoom,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
