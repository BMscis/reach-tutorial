<script>
import { Auth } from "aws-amplify";
import MenuBar from "../MenuBar.svelte";
import ListPointer from "../ListPointer.svelte";
import SignOutIcon from "../SignOutIcon.svelte";
import SettingsIcon from "../SettingsIcon.svelte";
import { sendToStore } from "../../STORAGE/storage";
import IconContainer from "../IconContainer.svelte";
import InputContainer from "../INPUTS/InputContainer.svelte";
import Loading from "../Loading.svelte";
import SuccessIcon from "../SuccessIcon.svelte";
import { onMount } from "svelte";
import { tryMountImage } from "../../Stores/movment";
import UploadImage from "../UploadImage.svelte";

export let username = "";
export let menuBarContainerWidth
export let menuBarContainerHeight

let uploadImage
let tryUpload = false
let trySend = false
let loading = true
let success = false
async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        //console.log('error signing out: ', error);
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
onMount(() => {
    tryMountImage.subscribe(value => {
        value  ? tryUpload = value : null
        return
    })
})
</script>
<div id="menubar-container" style="width:{menuBarContainerWidth}px ;height:{menuBarContainerHeight}px ;">
<div id=first-container>
    {#if !trySend}
    <button on:click={()=>{tryUpload = !tryUpload}}><MenuBar backgroundColor="transparent" gridGap=0 innerComponent = {ListPointer} menuBarWidth={"unset"} val = "Create NFT"  margin={0}></MenuBar></button>
    {/if}
    {#if tryUpload}
    <form on:submit|preventDefault={sendImage}>
        <InputContainer
            containerWidth={menuBarContainerWidth}
            inputWidth={(menuBarContainerWidth * 0.85).toFixed(2)}
        >
            <input
                slot="input-slot"
                class="input-rect-input"
                type="file"
                id="image"
                name="image"
                accept="image/*"
                bind:files={uploadImage}
            />
        </InputContainer>
        <InputContainer
            containerWidth={menuBarContainerWidth}
            inputWidth={(menuBarContainerWidth * 0.85).toFixed(2)}
        >
            <input
                slot="input-slot"
                class="input-rect-input"
                type="submit"
                value="Upload"
            />
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
    {#if !trySend}
    <button>
        <MenuBar backgroundColor="transparent" gridGap=0 innerComponent = {SettingsIcon} menuBarWidth={"unset"} val = "Privacy & Settings"  margin={0}></MenuBar>
    </button>
    {/if}
    </div>
{#if !trySend}
<div id = "second-container">
    <button><MenuBar backgroundColor="transparent" gridGap=0 innerComponent = {ListPointer} menuBarWidth={"unset"} val="About US" margin={0}></MenuBar></button>
    {#if username.length > 0}
    <button on:click={()=>{signOut()}}><MenuBar backgroundColor="transparent" gridGap=0 innerComponent = {SignOutIcon} menuBarWidth={"unset"}  val="SignOut" margin={0}></MenuBar></button>
    {/if}
</div>
{/if}
</div>
<style>
    div#second-container {
    position: absolute;
    bottom: 10px;
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
