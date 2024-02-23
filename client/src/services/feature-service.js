import axios from "axios";

const baseUrl = "api/features";

// get all features
export const getAllFeatures = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

//add a new feature below
export const post = async (feature) => {
  const response = await axios.post(`${baseUrl}`, {
    ...feature,
  });
  return response.data;
};
