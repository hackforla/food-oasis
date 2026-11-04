import axios from "axios";
import { TENANT_ID } from "helpers/Constants";
const baseUrl = "/api/suggestions";

export const getAll = async (statusIds?: Array<number | string>) => {
  try {
    const params = { statusIds, tenantId: TENANT_ID };
    const response = await axios.get(baseUrl, {
      params,
      paramsSerializer: { indexes: null }, // This will prevent axios from adding [] to the query parameters
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getById = async (id: number | string) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export const getByStakeholderId = async (id: number | string) => {
  const response = await axios.get(`${baseUrl}/stakeholder/${id}`);
  return response.data;
};

export const post = async (suggestion: Record<string, any>) => {
  const response = await axios.post(baseUrl, {
    ...suggestion,
    stakeholderId: suggestion.stakeholderId || null,
    tenantId: TENANT_ID,
  });
  return response.data;
};

export const update = async (
  suggestion: Record<string, any> & { id: number | string }
) => {
  const response = await axios.put(`${baseUrl}/${suggestion.id}`, suggestion);
  return response.data;
};
