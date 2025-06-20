import axios from "axios";

const baseUrl = "/api/announcements";

export const getAllAnnouncements = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const post = async (announcement) => {
  const response = await axios.post(`${baseUrl}`, {
    ...announcement,
  });
  return response.data;
};

export const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export const update = async (id, announcement) => {
  const response = await axios.put(`${baseUrl}/${id}`, announcement);
  return response.data;
};