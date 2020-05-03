import axios from "axios";

const baseUrl = "/api/esri";

export const geocode = async (address) => {
  const response = await axios.get(baseUrl + "/geocode", {
    params: { address },
  });
  return response.data;
};
