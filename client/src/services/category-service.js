import axios from "axios";

const baseUrl = "/api/categories";

export const getAll = async (searchParams) => {
  searchParams = searchParams || {};
  try {
    const response = await axios.get(baseUrl, {
      params: searchParams,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export const post = async (category) => {
  const response = await axios.post(baseUrl, {
    category,
  });
  return response.data;
};

// edit user-created job
export const put = async (category, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, {
    category,
    id,
  });
  return response.data;
};

// delete user-created job
export const remove = async (id) => {
  const response = await axios.post(`${baseUrl}/${id}`, {
    id,
  });
  return response.data;
};
