import AWS from 'aws-sdk';
import App from './App.svelte';
import { Amplify } from 'aws-amplify'
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);
const app = new App({
	target: document.body,
});

export default app;