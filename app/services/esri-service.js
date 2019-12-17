const axios = require("axios");

const baseUrl = "http://geocode.arcgis.com";
const getTokenUrl = `https://www.arcgis.com/sharing/oauth2/token`;
const findAddressCandidateUrl = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates`;

let esriToken = "";

const generateToken = async () => {
  url =
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

const buildGeocodeUrl = address =>
  `${findAddressCandidateUrl}?f=json&outFields=*&outFields=*&` +
  `singleline=${address}&token=${esriToken}`;

const geocode = async address => {
  const searchString = encodeURI(address);

  try {
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
    } else if (addressResult.error) {
      throw new Error(
        `ESRI Error Code: ${addressResult.error.code} ${addressResult.message}`
      );
    }
    return addressResult.data.candidates;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  geocode
};
