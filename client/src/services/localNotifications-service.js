import axios from "axios";

const baseUrl = "/api/localNotifications";

export const getAlllocalNotifications = async () => {
  try {
    const response = await axios.get(`${baseUrl}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const post = async (localNotifications) => {
  const response = await axios.post(`${baseUrl}`, {
	...localNotifications,
  });
  return response.data;
};

export const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export const update = async (id, localNotifications) => {
  const response = await axios.put(`${baseUrl}/${id}`, localNotifications);
  //const response = await axios.put(`${baseUrl}/${id}`, localNotifications);
  console.log("Response", response.data);
  return response.data;
};

/*
export const update = async ({ id, ...localNotifications }: { id: number; name?: string }) => {
  const response = await axios.put(`${baseUrl}/${id}`, localNotifications);
  return response.data;
};
*/
 
