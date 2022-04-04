import axios from "axios";

const baseUrl = "/api/neighborhoods";

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

export const getGeoJSONById = async (id) => {
  try {
    const response = await axios.get(baseUrl + `/${id}`, {
      id,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
