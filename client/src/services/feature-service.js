import axios from "axios";

const baseUrl = "api/features";

export const getAllFeatures = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const post = async (feature) => {
  const response = await axios.post(`${baseUrl}`, {
    ...feature,
  });
  return response.data;
};
