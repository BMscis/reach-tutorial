<script>
import { onDestroy, onMount } from "svelte";
import { Auth } from "aws-amplify";
import MenuBar from "../MenuBar.svelte";
import Loading from "../Loading.svelte";
import SignOutIcon from "../SignOutIcon.svelte";
import ListPointer from "../ListPointer.svelte";
import SuccessIcon from "../SuccessIcon.svelte";
import SettingsIcon from "../SettingsIcon.svelte";
import { sendToStore } from "../../STORAGE/storage";
import { tryMountImage } from "../../Stores/movment";
import InputContainer from "../INPUTS/InputContainer.svelte";
import UploadProfile from "../UploadProfile.svelte";
export let username = "";
export let menuBarHeight

let uploadImage
let trySend = false
let tryUpload = false
export let editProfile = false

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}
const sendImage = async () => {
    trySend = true
}
const closeImage = async () => {
    setTimeout(() => {
        tryUpload = false
        trySend = false
    }, 2000);
    return false
}
const unsubscribeMount = tryMountImage.subscribe(value => {
        value  ? tryUpload = value : null
        return
})

onDestroy(() => {
    return unsubscribeMount
})
</script>
<div id="menubar-container" style="height: {menuBarHeight}px;">
    {#if !editProfile}
        <div id=first-container>
            {#if !trySend}
            <button on:click={()=>{tryUpload = !tryUpload}}><MenuBar backgroundColor="transparent" gridGap=0 innerComponent = {ListPointer} menuBarWidth={"unset"} val = "Create NFT"  margin={0}></MenuBar></button>
            {/if}
            {#if tryUpload}
            <form on:submit|preventDefault={sendImage}>
                <InputContainer >
                    <input autocomplete  slot="input-slot" class="input-rect-input" type="file" id="image" name="image" accept="image/*" bind:files={uploadImage}/>
                </InputContainer>
                <InputContainer >
                    <input autocomplete  slot="input-slot" class="input-rect-input" type="submit" value="Upload"/>
                </InputContainer>
            </form>
            {#if trySend}
                <div id="result-container">
                    {#await sendToStore(uploadImage,'public')}
                    <Loading isLarge={true} dark={true}></Loading>
                    {:then result} 
                    {#if result}
                        <SuccessIcon position="absolute"></SuccessIcon>
                        {#await closeImage()}
                                <p></p>
                            {:then result} 
                                <p></p>
                        {/await}
                        {:else}
                        <p class="message">Something went wrong</p>
                        {#await closeImage()}
                                <p></p>
                            {:then result} 
                                <p></p>
                        {/await}
                        {/if}
                    {/await}
                </div>
                {/if}
            {/if}
            {#if !trySend && !tryUpload}
            <button>
                <MenuBar backgroundColor="transparent" gridGap=0 innerComponent = {SettingsIcon} menuBarWidth={"unset"} val = "Privacy & Settings"  margin={0}></MenuBar>
            </button>
            {/if}
            </div>
        {#if !trySend && !tryUpload}
        <div id = "second-container">
            <button><MenuBar backgroundColor="transparent" gridGap=0 innerComponent = {ListPointer} menuBarWidth={"unset"} val="About US" margin={0}></MenuBar></button>
            {#if username.length > 0}
            <button on:click={()=>{signOut()}}><MenuBar backgroundColor="transparent" gridGap=0 innerComponent = {SignOutIcon} menuBarWidth={"unset"}  val="SignOut" margin={0}></MenuBar></button>
            {/if}
        </div>
        {/if}
    {:else}
    <UploadProfile></UploadProfile>
    {/if}
</div>
<style>
    div#second-container {
        position: absolute;
        bottom: 80px;
        width: 100%;
    }
    #first-container,#second-container{
        display: flex;
        flex-direction: column;
    }
    button:hover,.input-rect-input:hover{
        background: #ff77005c;
    }
    #menubar-container{
        display: flex;
        flex-direction: column;
        position: relative;
    }
    p{
        display: none;
    }
    p.message{
        display: block;
    }
</style>
