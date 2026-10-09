import {
  Location,
  SearchPlaceIndexForTextCommandInput,
  // SearchPlaceIndexForTextCommandOutput,
} from "@aws-sdk/client-location";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const generateLocation = async () => {
  if (!process.env.IDENTITY_POOL_ID) return;

  const region = "us-west-2";
  const poolId: string = process.env.IDENTITY_POOL_ID;

  // Create Cognito Identity Credentials (the pool client is created internally
  // from clientConfig by the credential provider).
  const credentials = fromCognitoIdentityPool({
    identityPoolId: poolId,
    clientConfig: { region },
  });

  // Create a Location client with the credentials and region
  const location = new Location({
    credentials,
    region,
  });

  return location;
};

const autocomplete = async (address: string, tenantId: number) => {
  if (!process.env.PLACE_INDEX_NAME) return;
  const location = await generateLocation();
  const params: SearchPlaceIndexForTextCommandInput = {
    IndexName: process.env.PLACE_INDEX_NAME,
    Text: address,
    MaxResults: 10,
    FilterCountries: ["USA"],
    Language: "en",
  };

  if (!location) return;

  // Use the Location client to searchPlaceIndexForText
  const data = await location.searchPlaceIndexForText(params);

  const tenantRegions: { [key: number]: string } = {
    1: "California",
    3: "Hawaii",
    5: "Texas",
    6: "California",
  };

  const filtered = data.Results?.filter(
    (result) => result.Place?.Region === tenantRegions[tenantId]
  );

  filtered?.forEach((result) => {
    const point = result.Place?.Geometry?.Point?.shift();
    if (!point) return;
    result.Place?.Geometry?.Point?.push(point);
  });

  return filtered;
};

const getCoords = async (address: string) => {
  if (!process.env.PLACE_INDEX_NAME) return;
  const location = await generateLocation();
  const params: SearchPlaceIndexForTextCommandInput = {
    IndexName: process.env.PLACE_INDEX_NAME,
    Text: address,
    MaxResults: 1,
    FilterCountries: ["USA"],
    Language: "en",
  };

  if (!location) return;

  const data = await location.searchPlaceIndexForText(params);

  const point = data.Results?.[0]?.Place?.Geometry?.Point?.shift();
  if (!point) return;
  data.Results?.[0]?.Place?.Geometry?.Point?.push(point);

  return data;
};

export default {
  autocomplete,
  getCoords,
};
