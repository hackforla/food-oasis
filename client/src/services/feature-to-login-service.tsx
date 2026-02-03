import axios from "axios";

export interface FeatureUser {
  login_id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface FeatureToLogin {
  ftl_id: number;
  feature_id: number;
  users: FeatureUser[];
}

const baseUrl = "/api/features-to-login/";

export const getLoginsByFeature = async (
  id?: number
): Promise<FeatureToLogin[]> => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const addUserToFeature = async (
  feature_id: number,
  login_id: number
) => {
  const data = { feature_id, login_id };
  try {
    const response = await axios.post(`${baseUrl}`, data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const removeUserFromFeature = async (ftl_id: number) => {
  try {
    const response = await axios.delete(`${baseUrl}/${ftl_id}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
