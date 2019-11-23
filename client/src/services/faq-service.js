import axios from "axios";

const baseUrl = "/api/faqs";

export const getAll = async language => {
  const response = await axios.get(baseUrl, { language });
  return response.data;
};

export const getById = async id => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

// model = {question: "", answer: "", language: "", identifier: ""}
export const add = async model => {
  const response = axios.put(baseUrl, model);
  return response.data;
};

// model = {question: "", answer: "", language: ""}
export const update = async (id, model) => {
  const response = await axios.put(`${baseUrl}/${id}`, model);
  return response.data;
};

export const remove = async identifier => {
  const response = await axios.delete(baseUrl, identifier);
  return response.data;
};
