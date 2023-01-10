import axios from "axios";
const baseUrl = "/api/aws";

// This geocoder api is deprecated for the Food Oasis App,
// as it was found to out of servcie for hours at a time.
// Use the geocode-tamu-service.geocode function instead.

export const geocode = async (address) => {
  const response = await axios.get(baseUrl + "/geocode", {
    params: { address },
  });
  return response.data;
};
