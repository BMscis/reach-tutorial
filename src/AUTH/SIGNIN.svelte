<script>
import { Auth, Cache } from 'aws-amplify';
import InputContainer from '../Components/INPUTS/InputContainer.svelte';
import { checkUser } from '../Utilities/utilities';
import { cyberuser } from './AuthStore';
let username;
let password;
async function signIn() {
    try {
        const user = await Auth.signIn(username, password);
        console.log("SUCCESS: ", user);
    } catch (error) {
        switch (error.code) {
            case "UserNotFoundException":
                console.log("User not found");
                break;
            case "UserNotConfirmedException":
                console.log("User not confirmed");
                break;
            case "NotAuthorizedException":
                console.log("Not authorized");
                break;
            case "PasswordResetRequiredException":
                console.log("Password reset required");
                break;
            case "ExpiredCodeException":
                console.log("Expired code");
                break;
            default:
                console.log("Sign in error", error);
                break;
        }
    }
}
async function resendConfirmationCode() {
    try {
        await Auth.resendSignUp(username);
        console.log('code resent successfully');
    } catch (err) {
        if(error.code == "UserNotConfirmedException") {
            Auth.verifyCurrentUserAttribute('email')
        } else {
            console.log('error resending code', error);
        }
    }
}
</script>
<form on:submit|preventDefault={signIn}>
    <InputContainer>
        <input type="text" name="username" slot="input-slot" class="input-rect-input" bind:value={username} placeholder="username" />
    </InputContainer>
    <InputContainer>
        <input type="password" name="password" slot="input-slot" class="input-rect-input" bind:value={password} placeholder="password" />
    </InputContainer>
    <InputContainer>
        <button type="submit" slot="input-slot" class="input-rect-input" >Sign In</button>
    </InputContainer>
</form>