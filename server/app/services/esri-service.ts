import get, { AxiosResponse } from "axios";
const getTokenUrl = `https://www.arcgis.com/sharing/oauth2/token`;
const findAddressCandidateUrl = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates`;

let esriToken = "";

const generateToken = async () => {
  const url =
    `${getTokenUrl}?f=json&grant_type=client_credentials&` +
    `client_id=${process.env.ESRI_CLIENT_ID}&` +
    `client_secret=${process.env.ESRI_CLIENT_SECRET}`;
  try {
    const result: {
      data: { access_token?: string; error?: { message?: string } };
    } = await get(url);
    if (result.data.access_token) {
      esriToken = result.data.access_token;
      return esriToken;
    }
    return Promise.reject(result.data.error?.message);
  } catch (err) {
    throw new Error("Unable to get access token!");
  }
};

const buildGeocodeUrl = (address: string) =>
  `${findAddressCandidateUrl}?f=json&outFields=*&outFields=*&` +
  `singleline=${address}&token=${esriToken}`;

const geocode = async (address: string) => {
  const searchString = encodeURI(address);
  if (esriToken === "") {
    console.log("Generating initial ESRI token...");
    try {
      await generateToken();
    } catch (err: any) {
      Promise.reject(
        "ESRI Geocoding error: " + JSON.stringify(err.toString(), null, 2)
      );
    }
  } else {
    console.log("Trying geocoding with existing token...");
  }

  let addressResult: { error?: { code: number }; data: { candidates: any[] } } =
    await get(buildGeocodeUrl(searchString));
  if (addressResult.error && addressResult.error.code === 498) {
    // Invalid token - need to generate a new token
    // and try again.
    console.log("ESRI token expired, generating a new one...");
    await generateToken();
    console.log("Retrying geolocation query...");
    addressResult = await get(buildGeocodeUrl(searchString));
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

export default {
  geocode,
};
