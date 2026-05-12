import axios from "axios";
const baseUrl = "/api/aws";

export const autoComplete = async (address: string, tenantId: number) => {
  const response = await axios.get(baseUrl + "/autocomplete", {
    params: { address, tenantId },
  });
  return response.data;
};

export const getCoords = async (address: string) => {
  const response = await axios.get(baseUrl + "/getCoords", {
    params: { address },
  });
  return response.data;
};
