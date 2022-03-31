export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "NFTeaBackendAuthentication": {
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
        "S3Triggerd765a61e": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    },
    "storage": {
        "NFTeaBackendStorage": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}