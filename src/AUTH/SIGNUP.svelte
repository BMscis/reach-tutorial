<script>
import { Auth } from 'aws-amplify';
import {cyberuser} from './AuthStore';
import InputContainer from '../Components/INPUTS/InputContainer.svelte'
import { checkUser } from '../Utilities/utilities';

let name
let code
let email
let username
let password
let phone_number
let showLoading = false

async function signUp() {
    username = email
    try {
        const { user } = await Auth.signUp({username,password,attributes: {name,email,phone_number,}});
        console.log(user)
        showLoading = true
        cyberuser.set(user)

    } catch (error) {
        if(error.code == "UsernameExistsException"){
            alert("UserName Already Exists")
        }
        else{
            alert('error signing up:', error.message);
        }
    }
}
async function confirmSignUp() {
    try {
      let confirm = await Auth.confirmSignUp(username, code);
      console.log("Confirm:: ",confirm)
    } catch (error) {
        switch (error.code) {
            case "CodeMismatchException":
                alert('Missmatch', error);
                break;
            case "UserLambdaValidationException":
                alert('User except', error);
                break
            case "NotAuthorizedException":
                alert('Not Auth', error);
                break
            default:
                alert('error confirming sign up', error);
                break;
        }
    }
}
</script>
{#if showLoading}
<form on:submit|preventDefault={confirmSignUp}>
    <InputContainer>
    <input type="text" slot="input-slot" class="input-rect-input" bind:value={code} name="authCode">
    </InputContainer>
    <InputContainer>
    <button slot="input-slot" class="input-rect-input" type="submit">Enter Code</button>
    </InputContainer>
</form>
{:else}
<form on:submit|preventDefault={signUp}>
    <InputContainer>
        <input slot="input-slot" class="input-rect-input" type="text" name="name" bind:value={name} placeholder="name" />
    </InputContainer>
    <InputContainer>
        <input slot="input-slot"  class="input-rect-input" type="password" name="password"      bind:value={password} placeholder="password" />
    </InputContainer>
    <InputContainer>
        <input slot="input-slot"  class="input-rect-input" type="email" name="email"            bind:value={email} placeholder="email" />
    </InputContainer>
    <InputContainer>
        <input slot="input-slot"  class="input-rect-input" type="telephone" name="phone_number" bind:value={phone_number} placeholder="phone_number" />
    </InputContainer>
    <InputContainer>
        <button slot="input-slot"  class="input-rect-input" type="submit">Sign Up</button>
    </InputContainer>
</form>
{/if}