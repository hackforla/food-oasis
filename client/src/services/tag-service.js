import axios from "axios";
import { TENANT_ID } from "helpers/Constants";

const baseUrl = "/api/tags";

export const getAllByTenantId = async () => {
  try {
    const response = await axios.get(`${baseUrl}/${TENANT_ID}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const update = async (data) => {
  const response = await axios.put(`${baseUrl}/${data.id}`, {
    ...data,
    tenantId: TENANT_ID,
  });
  return response.data;
};

export const post = async (data) => {
  const response = await axios.post(`${baseUrl}`, {
    ...data,
    tenantId: TENANT_ID,
  });
  return response.data;
};

export const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};
