import axios from "axios";
const baseUrl = "/api/aws";

export const autoComplete = async (address) => {
  const response = await axios.get(baseUrl + "/autocomplete", {
    params: { address },
  });
  return response.data;
};

export const getCoords = async (address) => {
  const response = await axios.get(baseUrl + "/getCoords", {
    params: { address },
  });
  return response.data;
}