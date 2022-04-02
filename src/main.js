import AWS from 'aws-sdk';
import App from './App.svelte';
import { Amplify } from 'aws-amplify'
import aws_exports from './aws-exports';

// Set the region 
// AWS.config.update({region: 'eu-west-2'});

// // Create the IAM service object
// var iam = new AWS.IAM({apiVersion: '2010-05-08'});

// var params = {
//   MaxItems: 10
// };

// iam.listUsers(params, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     var users = data.Users || [];
//     users.forEach(function(user) {
//       console.log("User " + user.UserName + " created", user.CreateDate);
//     });
//   }
// });

Amplify.configure(aws_exports);
const app = new App({
	target: document.body,
});

export default app;