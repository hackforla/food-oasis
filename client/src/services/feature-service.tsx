import axios from "axios";

export interface Feature {
  id: number;
  name: string;
  is_enabled: boolean;
}

const baseUrl = "/api/features";

export const getAllFeatures = async (): Promise<Feature[]> => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const post = async (feature: Partial<Feature>) => {
  const response = await axios.post(`${baseUrl}`, {
    ...feature,
  });
  return response.data;
};

export const remove = async (id: number) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export const update = async (id: number, feature: Partial<Feature>) => {
  const response = await axios.put(`${baseUrl}/${id}`, feature);
  return response.data;
};
