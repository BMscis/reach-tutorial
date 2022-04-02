<script>
import {signUp,confirmSignUp,signIn} from "./AuthUtils"
import InputContainer from '../Components/INPUTS/InputContainer.svelte'
import Loading from "../Components/Loading.svelte";
let try_sign_up = true
let try_sign_in = !try_sign_up
let try_verify = false
let name
let code
let email
let password
let phone_number
let loading = false
const trySignUp = async () => {
    loading = true
    const result = await signUp(password, name, email, phone_number)
    loading = false
    try_sign_up = !result
    try_verify = result
    return
}
const verifySignUp = async () => {
    loading = true
    try_sign_in = await confirmSignUp(email,code)
    loading = false
    try_verify = !try_sign_in
    console.log("VERIFY SIGN UP",try_sign_in)
    try_sign_in? await trySignIn() : null
    return
}
const trySignIn = async () => {
    loading = true
    await signIn(email,password)
    loading = false
    return
}
</script>
{#if loading}
<Loading></Loading>
{/if}
{#if try_sign_up}
<form on:submit|preventDefault={trySignUp}>
    <InputContainer>
        <input slot="input-slot" class="input-rect-input" type="text" name="name" bind:value={name} placeholder="username" />
    </InputContainer>
    <InputContainer>
        <input slot="input-slot"  class="input-rect-input" type="password" name="password"      bind:value={password} placeholder="password" />
    </InputContainer>
    <InputContainer>
        <input slot="input-slot"  class="input-rect-input" type="email" name="email"            bind:value={email} placeholder="email" />
    </InputContainer>
    <InputContainer>
        <input slot="input-slot"  class="input-rect-input" type="telephone" name="phone_number" bind:value={phone_number} placeholder="Mobile" />
    </InputContainer>
    <InputContainer>
        <button id="sign-up" slot="input-slot"  class="input-rect-input" type="submit">Sign Up</button>
    </InputContainer>
</form>
<h5>Already Have an account? <section><button id="signup-text" on:click={()=>{try_sign_in = try_sign_up; try_sign_up = !try_sign_up}}><h6>SignIn</h6></button></section></h5>
{/if}
{#if try_verify}
<form on:submit|preventDefault={verifySignUp}>
    <h5>Please check your Email</h5>
    <InputContainer>
    <input type="text" slot="input-slot" class="input-rect-input" bind:value={code} name="authCode">
    </InputContainer>
    <InputContainer>
    <button slot="input-slot" class="input-rect-input" type="submit">Enter Code</button>
    </InputContainer>
</form>
{/if}
{#if try_sign_in}
<form on:submit|preventDefault={trySignIn}>
    <h5>Sign In with your email</h5>
    <InputContainer>
        <input type="text" name="email" slot="input-slot" class="input-rect-input" bind:value={email} placeholder="email" />
    </InputContainer>
    <InputContainer>
        <input type="password" name="password" slot="input-slot" class="input-rect-input" bind:value={password} placeholder="password" />
    </InputContainer>
    <InputContainer>
        <button id="sign-up" type="submit" slot="input-slot" class="input-rect-input" >Sign In</button>
    </InputContainer>
</form>
{/if}
<style>
    button{
        letter-spacing: 2px;
    }
    h5{
        margin: auto;
        width: 50vw;
        text-align: center;
        color: white;
        letter-spacing: 5px;
    }
    h6{
        letter-spacing: 1px;
    }
    #sign-up{
        background-color: var(--spectacular-orange);
    }
</style>