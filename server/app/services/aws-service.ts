import {
  LocationClient,
  Location,
  SearchPlaceIndexForTextCommandInput,
} from "@aws-sdk/client-location";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";

const generateLocation = async () => {
  if (!process.env.IDENTITY_POOL_ID) return;
  const region = "us-west-2";
  const poolId: string = process.env.IDENTITY_POOL_ID;
  const clientIdentity = new CognitoIdentityClient({ region });
  const client = new LocationClient({
    region,
    credentials: fromCognitoIdentityPool({
      client: clientIdentity,
      identityPoolId: poolId,
    }),
  });
  const location = new Location();
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
  const data = await location
    .searchPlaceIndexForText(params)
    .then((results) => results);
  const tenantRegions: { [key: number]: string } = {
    1: "California",
    3: "Hawaii",
    5: "Texas",
    6: "California",
  };
  const filtered = data.Results.filter(
    (result) => result.Place.Region === tenantRegions[tenantId]
  );
  filtered.forEach((result) => {
    const point: number | undefined = result.Place.Geometry.Point?.shift();
    if (!point) return;
    result.Place.Geometry.Point?.push(point);
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
  const data = await location
    .searchPlaceIndexForText(params)
    .then((results) => results);
  const point: number | undefined =
    data.Results[0].Place.Geometry.Point?.shift();
  if (!point) return;
  data.Results[0].Place.Geometry.Point?.push(point);
  return data;
};

export default {
  autocomplete,
  getCoords,
};
