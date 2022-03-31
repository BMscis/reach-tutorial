<script>
import {signUp,confirmSignUp,signIn} from "./AuthUtils"
import InputContainer from '../Components/INPUTS/InputContainer.svelte'
let try_sign_up = true
let try_sign_in = !try_sign_up
let try_verify = false
let name
let code
let email
let password
let phone_number

const trySignUp = async () => {
    const result = await signUp(password, name, email, phone_number)
    try_sign_up = !result
    try_verify = result
    return
}
const verifySignUp = async () => {
    try_sign_in = await confirmSignUp(email,code)
    try_verify = !try_sign_in
    console.log("VERIFY SIGN UP",try_sign_in)
    try_sign_in? await trySignIn() : null
    return
}
const trySignIn = async () => {
    await signIn(email,password)
}
</script>
{#if try_sign_up}
<h2>Already Have an account? <section><button on:click={()=>{try_sign_in = try_sign_up; try_sign_up = !try_sign_up}}>SignIn</button></section></h2>
<form on:submit|preventDefault={trySignUp}>
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
{#if try_verify}
<form on:submit|preventDefault={verifySignUp}>
    <h2>Please check your Email</h2>
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
    <h2>Sign In with your email</h2>
    <InputContainer>
        <input type="text" name="email" slot="input-slot" class="input-rect-input" bind:value={email} placeholder="email" />
    </InputContainer>
    <InputContainer>
        <input type="password" name="password" slot="input-slot" class="input-rect-input" bind:value={password} placeholder="password" />
    </InputContainer>
    <InputContainer>
        <button type="submit" slot="input-slot" class="input-rect-input" >Sign In</button>
    </InputContainer>
</form>
{/if}
<style>
    h2{
        margin: auto;
        width: 50vw;
    }
</style>