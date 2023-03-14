import AWS from "aws-sdk"

const generateLocation = async () => {
    if (!process.env.IDENTITY_POOL_ID) return;
    AWS.config.update({ region: 'us-west-2' });
    const poolId: string = process.env.IDENTITY_POOL_ID;
    const credentials: AWS.CognitoIdentityCredentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: poolId,
    })
    const location = new AWS.Location({
        credentials,
        region: AWS.config.region || 'us-west-2'
    })
    return location
}

const autocomplete = async (address: string) => {
    if (!process.env.PLACE_INDEX_NAME) return;
    const location = await generateLocation()
    const params: AWS.Location.SearchPlaceIndexForTextRequest = {
        "IndexName": process.env.PLACE_INDEX_NAME,
        "Text": address,
        "MaxResults": 10,
        "FilterCountries": ["USA"],
        "Language": "en"
    };
    if (!location) return;
    const data = await location.searchPlaceIndexForText(params).promise().then(results => results)
    data.Results.forEach((result) => {
        const point: number | undefined = data.Results[0].Place.Geometry.Point?.shift()
        if (!point) return;
        result.Place.Geometry.Point?.push(point)
    })
    return data
}

const getCoords = async (address: string) => {
    if (!process.env.PLACE_INDEX_NAME) return;
    const location = await generateLocation()
    const params: AWS.Location.SearchPlaceIndexForTextRequest = {
        "IndexName": process.env.PLACE_INDEX_NAME,
        "Text": address,
        "MaxResults": 1,
        "FilterCountries": ["USA"],
        "Language": "en"
    };
    if (!location) return;
    const data = await location.searchPlaceIndexForText(params).promise().then(results => results)
    const point: number | undefined = data.Results[0].Place.Geometry.Point?.shift()
    if (!point) return;
    data.Results[0].Place.Geometry.Point?.push(point)
    return data
}

export default {
    autocomplete,
    getCoords
};