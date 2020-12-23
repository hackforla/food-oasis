import axios from "./axios-instance";

const baseUrl = "/api/tenants";

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
