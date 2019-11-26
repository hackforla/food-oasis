import axios from "axios";

const baseUrl = "/api/faqs";

export const getAll = async language => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// { language: "" }
export const getAllByLanguage = async language => {
  const response = await axios.get(baseUrl, { params: { language } });
  return response.data;
};

export const getById = async id => {
  const response = await axios.get(`${baseUrl}/faq/${id}`);
  return response.data;
};

// { identifier: "" }
export const getByIdentifier = async id => {
  const response = await axios.get(`${baseUrl}/identifier`);
  return response.data;
};

// model = { question: "", answer: "", language: "", identifier: "" }
export const add = async model => {
  const response = axios.put(baseUrl, model);
  return response.data;
};

// model = { question: "", answer: "", language: "" }
export const update = async (id, model) => {
  const response = await axios.put(`${baseUrl}/faq/${id}`, model);
  return response.data;
};

// { identifier: "" }
export const remove = async identifier => {
  const response = await axios.delete(baseUrl, identifier);
  return response.data;
};
