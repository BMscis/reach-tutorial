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
    let uploadImage
    const trySignUp = async () => {
        loading = true
        const result = await signUp(password, name, email, phone_number,uploadImage)
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
        //console.log("VERIFY SIGN UP",try_sign_in)
        try_sign_in? await trySignIn(true,uploadImage) : null
        return
    }
    const trySignIn = async (fromSignUp = false,Uimage="") => {
        loading = true
        switch (fromSignUp) {
            case false:
                await signIn(email,password)
                break;
            case true:
                await signIn(email,password,true, Uimage)
                break;
        }
        loading = false
        return
    }
    const goToSignUp = () => {
        try_sign_in = try_sign_up;
    
        try_sign_up = !try_sign_up
    }
    </script>
    <div id="form-container">
    {#if loading}
    <Loading></Loading>
    {/if}
    {#if try_sign_up && !loading}
    <div id="signup-container">
        <form on:submit|preventDefault={trySignUp}>
            <InputContainer>
                <input autocomplete  slot="input-slot" class="input-rect-input" type="text" name="name" bind:value={name} placeholder="username" />
            </InputContainer>
            <InputContainer>
                <input autocomplete  slot="input-slot"  class="input-rect-input" type="password" name="password"      bind:value={password} placeholder="password" />
            </InputContainer>
            <InputContainer>
                <input autocomplete  slot="input-slot"  class="input-rect-input" type="email" name="email"            bind:value={email} placeholder="email" />
            </InputContainer>
            <InputContainer>
                <input autocomplete  slot="input-slot"  class="input-rect-input" type="telephone" name="phone_number" bind:value={phone_number} placeholder="Mobile" />
            </InputContainer>
            <InputContainer >
                <input autocomplete  slot="input-slot" class="input-rect-input" type="file" id="image" name="image" accept="image/*" bind:files={uploadImage} style="color: white;"/>
            </InputContainer>
            <InputContainer >
                <input autocomplete  slot="input-slot" class="input-rect-input" type="submit" value="Sign Up"/>
            </InputContainer>
        </form>
        <h5>Already Have an account? <section><button id="signup-text" on:click={()=>{goToSignUp()}}><h6>SignIn</h6></button></section></h5>
    </div>
    {/if}
    {#if try_verify && !loading}
    <form on:submit|preventDefault={verifySignUp}>
        <h5>Please check your Email</h5>
        <InputContainer>
        <input autocomplete  type="text" slot="input-slot" class="input-rect-input" bind:value={code} name="authCode">
        </InputContainer>
        <InputContainer>
        <button slot="input-slot" class="input-rect-input" type="submit" style="color: white;">Enter Code</button>
        </InputContainer>
    </form>
    {/if}
    {#if try_sign_in && !loading}
    <form >
        <h5>Sign In with your email</h5>
        <InputContainer>
            <input autocomplete  type="text" name="email" slot="input-slot" class="input-rect-input" bind:value={email} placeholder="email" />
        </InputContainer>
        <InputContainer>
            <input autocomplete  type="password" name="password" slot="input-slot" class="input-rect-input" bind:value={password} placeholder="password" />
        </InputContainer>
        <InputContainer>
            <button id="sign-up"  slot="input-slot" class="input-rect-input" on:click={()=> {trySignIn()}} >Sign In</button>
        </InputContainer>
    </form>
    <h5>Don't Have an account? <section><button id="signup-text" on:click={()=>{try_sign_in = try_sign_up; try_sign_up = !try_sign_up}}><h6>SignUp</h6></button></section></h5>
    {/if}
    </div>
    <style>
        #signup-container{
            grid-column-start: 2;
        }
        #form-container{
            display: flex;
            flex-direction: column;
            flex-direction: column;
            align-items: center;
        }
        button{
            letter-spacing: 2px;
            width: 80px;
            background: blueviolet;
            border-radius: 4px;
            height: 40px;
            margin-top: 7px;
            color: white;
            font-size: 11px;
        }
        button:hover{
            background-color: var(--inactive-component);
        }
        h5{
            margin: auto;
            text-align: center;
            color: black;
            letter-spacing: 2px;
            pointer-events: none;
            color: var(--inactive-component);
        }
        h6{
            letter-spacing: 1px;
            margin:0;
            color: white;
        }
        form{
            margin: 10%;
        }
        #sign-up{
            background-color: var(--spectacular-orange);
            margin:10% auto;
        }
    </style>