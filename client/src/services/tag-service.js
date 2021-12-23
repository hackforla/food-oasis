import axios from "axios";
import { tenantId } from "helpers/Configuration";

const baseUrl = "/api/tags";

export const getAllByTenantId = async () => {
  try {
    const response = await axios.get(`${baseUrl}/${tenantId}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const update = async (data) => {
  const response = await axios.put(`${baseUrl}/${data.id}`, {
    ...data,
    tenantId,
  });
  return response.data;
};

export const post = async (data) => {
  const response = await axios.post(`${baseUrl}`, {
    ...data,
    tenantId,
  });
  return response.data;
};

export const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};
