import AWS from "aws-sdk"

const geocode = async (address: string) => {

    AWS.config.update({ region: 'us-west-2' });

    const poolId: any = process.env.IDENTITY_POOL_ID;

    const credentials: any = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: poolId,
    })

    const location = new AWS.Location({
        credentials,
        region: AWS.config.region || 'us-west-2'
    })

    const params = {
        "IndexName": "FOLA_Test",
        "Text": address,
        "BiasPosition": [
            -123.11081356340885,
            49.29304366933074
        ]
    };

    location.searchPlaceIndexForSuggestions(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(data);
            return data
        }       // successful response
    });
}

export default {
    geocode,
};