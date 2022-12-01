import axios from "axios";
// Note we do NOT use the "./axios-instance", since we are using
// an API outside of the app's web api.

const baseUrl =
  "https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx";

export const geocode = async (street, city, state, zip) => {
  const url =
    `${baseUrl}?apiKey=${process.env.REACT_APP_TAMU_GEOSERVICES_API_KEY}` +
    `&version=4.01&format=json` +
    `&streetAddress=${encodeURIComponent(street)}` +
    `&city=${encodeURIComponent(city)}` +
    `&state=${encodeURIComponent(state)}` +
    `&zip=${encodeURIComponent(zip)}`;

  const response = await axios.get(url, { withCredentials: false });
  return response.data;
};
