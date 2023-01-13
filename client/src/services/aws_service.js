import axios from "axios";
const baseUrl = "/api/aws";

export const autoComplete = async (address) => {
  const response = await axios.get(baseUrl + "/geocode", {
    params: { address },
  });
  return response.data;
};