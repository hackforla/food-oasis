import axios from "axios";

const baseUrl = "/api/faqs";

export const getAll = async language => {
  const response = await axios.get(baseUrl, language);
  return response.data;
};

export const getById = async (id, language) => {
  const response = await axios.get(`${baseUrl}/${id}`, language);
  return response.data;
};

export const add = async model => {
  const response = axios.put(baseUrl, model);
  return response.data;
};

export const update = async () => {
  const response = await axios.put(baseUrl);
  return;
};

export const remove = async () => {
  const response = await axios.delete(baseUrl);
  return;
};
