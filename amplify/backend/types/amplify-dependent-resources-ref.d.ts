export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "NFTeaAuthenticator": {
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
    "function": {
        "S3Triggerc8bdd296": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "storage": {
        "NFTeaStore": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}