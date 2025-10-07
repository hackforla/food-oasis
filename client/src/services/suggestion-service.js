import axios from "axios";
import { TENANT_ID } from "helpers/Constants";
const baseUrl = "/api/suggestions";

export const getAll = async (statusIds) => {
  try {
    const params = { statusIds, tenantId: TENANT_ID };
    const response = await axios.get(baseUrl, { params });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export const getByStakeholderId = async (id) => {
  const response = await axios.get(`${baseUrl}/stakeholder/${id}`);
  return response.data;
};

export const post = async (suggestion) => {
  const response = await axios.post(baseUrl, {
    ...suggestion,
    stakeholderId: suggestion.stakeholderId || null,
    tenantId: TENANT_ID,
  });
  return response.data;
};

export const update = async (suggestion) => {
  const response = await axios.put(`${baseUrl}/${suggestion.id}`, suggestion);
  return response.data;
};
