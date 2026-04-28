import axios from "axios";
import { TENANT_ID } from "helpers/Constants";

const baseUrl = "/api/neighborhoods";

export const getAll = async (searchParams?: Record<string, any>) => {
  const params = { ...searchParams, tenantId: TENANT_ID };
  try {
    const response = await axios.get(baseUrl, {
      params,
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getGeoJSONById = async (id: number | string) => {
  try {
    const response = await axios.get(baseUrl + `/${id}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

// Not used yet, but will be used by admin screen for maintaining zoom levels
// for neighborhoodss
export const updateZoom = async (
  neighborhoodId: number | string,
  zoom: number
) => {
  try {
    await axios.put(baseUrl + `/${neighborhoodId}`, {
      ncId: neighborhoodId,
      zoom,
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
};
