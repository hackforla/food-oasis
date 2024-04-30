import axios from "axios";

const baseUrl = "/api/features-to-login/";

export const getLoginsByFeature = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const addUserToFeature = async (feature_id, login_id) => {
  const data = { feature_id, login_id };
  try {
    const response = await axios.post(`${baseUrl}`, data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const removeUserFromFeature = async (ftl_id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${ftl_id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
