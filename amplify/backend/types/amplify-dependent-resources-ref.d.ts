export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "NFteaReachProject": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string"
        }
    },
    "storage": {
        "s3storagenft": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "api": {
        "NFteaReachProject": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    }
}