const axios = require("axios");

const getTokenUrl = `http://www.arcgis.com/sharing/oauth2/token`;
const findAddressCandidateUrl = `http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates`;

let esriToken = "";

const generateToken = async () => {
  const url =
    `${getTokenUrl}?f=json&grant_type=client_credentials&` +
    `client_id=${process.env.ESRI_CLIENT_ID}&` +
    `client_secret=${process.env.ESRI_CLIENT_SECRET}`;
  try {
    const result = await axios.get(url);
    if (result.data.access_token) {
      esriToken = result.data.access_token;
    }
    return esriToken;
  } catch (err) {
    throw new Error("Unable to get access token!");
  }
};

const buildGeocodeUrl = (address) =>
  `${findAddressCandidateUrl}?f=json&outFields=*&outFields=*&` +
  `singleline=${address}&token=${esriToken}`;

const geocode = async (address) => {
  const searchString = encodeURI(address);
  if (esriToken === "") {
    console.log("Generating initial ESRI token...");
    await generateToken();
  }
  console.log("Trying geocoding with existing token...");
  let addressResult = await axios.get(buildGeocodeUrl(searchString));
  if (addressResult.error && addressResult.error.code === 498) {
    // Invalid token - need to generate a new token
    // and try again.
    console.log("ESRI token expired, generating a new one...");
    await generateToken();
    console.log("Retrying geolocation query...");
    addressResult = await axios.get(buildGeocodeUrl(searchString));
    console.log(
      "Geocoding results: " + JSON.stringify(addressResult.data, null, 2)
    );
  } else if (addressResult.error) {
    Promise.reject(
      "ESRI Geocoding error: " + JSON.stringify(addressResult.error, null, 2)
    );
  }
  return addressResult.data.candidates;
};

module.exports = {
  geocode,
};
