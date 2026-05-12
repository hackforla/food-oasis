import axios from "axios";

const baseUrl = "/api/tenants";

export const getAll = async (searchParams?: Record<string, any>) => {
  searchParams = searchParams || {};
  try {
    const response = await axios.get(baseUrl, {
      params: searchParams,
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
