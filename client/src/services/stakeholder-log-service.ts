import axios from "axios";

const baseUrl = "/api/stakeholderlogs";

export const getByStakeholderId = async (id: string | number) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getByStakeholderId,
};
