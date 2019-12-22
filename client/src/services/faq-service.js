import axios from "axios";

const baseUrl = "/api/faqs";

export const getAll = async language => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// { language: "" }
export const getAllByLanguage = async language => {
  console.log(language)
  const response = await axios.get(baseUrl, { params: { language } });
  return response.data;
};

export const getById = async id => {
  const response = await axios.get(`${baseUrl}/faq/${id}`);
  return response.data;
};

// { identifier: "" }
export const getByIdentifier = async ({ identifier }) => {
  const response = await axios.get(`${baseUrl}/identifier/${identifier}`);
  return response.data;
};

// model = { question: "", answer: "", language: "", identifier: "" }
export const add = async model => {
  const response = axios.post(baseUrl, model);
  return response.data;
};

// model = { question: "", answer: "", language: "" }
export const update = async model => {
  const response = await axios.put(`${baseUrl}/faq/${model.id}`, model);
  return response.data;
};

// { identifier: "" }
export const remove = async identifier => {
  const response = await axios.delete(baseUrl, identifier);
  return response.data;
};
