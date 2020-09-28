import axios from "axios";

const baseUrl = "/api/suggestions";

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

export const getAllByAssignedUser = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/assigned/${userId}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const post = async (correction) => {
  const response = await axios.post(baseUrl, correction);
  return response.data;
};

export const remove = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

//export const put = async (category, id) => {
//   const response = await axios.put(`${baseUrl}/${id}`, {
//     category,
//     id,
//   });
//   return response.data;
// };
