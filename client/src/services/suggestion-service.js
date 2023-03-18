import axios from "axios";
import { tenantId } from "helpers/Configuration";
const baseUrl = "/api/suggestions";

export const getAll = async (statusIds) => {
  try {
    const params = { statusIds, tenantId };
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

export const post = async (suggestion) => {
  const response = await axios.post(baseUrl, {
    ...suggestion,
    stakeholderId: suggestion.stakeholderId || null,
    tenantId,
  });
  return response.data;
};

export const update = async (suggestion) => {
  const response = await axios.put(`${baseUrl}/${suggestion.id}`, suggestion);
  return response.data;
};
