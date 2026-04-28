import axios from "axios";

const baseUrl = "/api/faqs";

export interface Faq {
  id?: number;
  question: string;
  answer: string;
  language: string;
  identifier?: string;
}

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// { language: "" }
export const getAllByLanguage = async (language: string) => {
  const response = await axios.get(baseUrl, { params: { language } });
  return response.data;
};

export const getById = async (id: number | string) => {
  const response = await axios.get(`${baseUrl}/faq/${id}`);
  return response.data;
};

// { identifier: "" }
export const getByIdentifier = async ({
  identifier,
}: {
  identifier: string;
}) => {
  const response = await axios.get(`${baseUrl}/identifier/${identifier}`);
  return response.data;
};

// model = { question: "", answer: "", language: "", identifier: "" }
export const add = async (model: Faq) => {
  const response = await axios.post(baseUrl, model);
  return response.data;
};

// model = { question: "", answer: "", language: "" }
export const update = async (model: Faq & { id: number | string }) => {
  const response = await axios.put(`${baseUrl}/faq/${model.id}`, model);
  return response.data;
};

// { identifier: "" }
export const remove = async (identifier: string) => {
  const response = await axios.delete(baseUrl, { data: { identifier } });
  return response.data;
};
