import AWS from "aws-sdk"

const generateLocation = async () => {
    AWS.config.update({ region: 'us-west-2' });
    const poolId: any = process.env.IDENTITY_POOL_ID;
    const credentials: any = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: poolId,
    })
    const location = new AWS.Location({
        credentials,
        region: AWS.config.region || 'us-west-2'
    })
    return location
}

const autocomplete = async (address: string) => {
    const location = await generateLocation()
    const params: any = {
        "IndexName": process.env.PLACE_INDEX_NAME,
        "Text": address,
        "MaxResults": 10,
        "FilterCountries": ["USA"],
        "Language": "en"
    };
    const data = await location.searchPlaceIndexForText(params).promise().then(results => results)
    data.Results.forEach((result) => {
        result.Place.Geometry.Point?.push(result.Place.Geometry.Point.shift())
    })
    return data
}

const getCoords = async (address: string) => {
    const location = await generateLocation()
    const params: any = {
        "IndexName": process.env.PLACE_INDEX_NAME,
        "Text": address,
        "MaxResults": 1,
        "FilterCountries": ["USA"],
        "Language": "en"
    };
    const data = await location.searchPlaceIndexForText(params).promise().then(results => results)
    data.Results[0].Place.Geometry.Point?.push(data.Results[0].Place.Geometry.Point.shift())
    return data
}

export default {
    autocomplete,
    getCoords
};