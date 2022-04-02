<script>
import { Auth } from "aws-amplify";
import MenuBar from "../MenuBar.svelte";
import ListPointer from "../ListPointer.svelte";
import SignOutIcon from "../SignOutIcon.svelte";
import SettingsIcon from "../SettingsIcon.svelte";
import { getStore, sendToStore } from "../../STORAGE/storage";
import IconContainer from "../IconContainer.svelte";
import InputContainer from "../INPUTS/InputContainer.svelte";
import Loading from "../Loading.svelte";
import SuccessIcon from "../SuccessIcon.svelte";
import { onMount } from "svelte";
import { tryMountImage } from "../../Stores/movment";

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
        console.log('error signing out: ', error);
    }
}
const sendImage = async () => {
    trySend = true
}
const listNFT = async () => {
    await getStore().then(async (value) => {
        if (value.length > 0) {
            console.log("LISTNFT: ", value);
        }
    })
}
const closeImage = async () => {
    setTimeout(() => {
        tryUpload = false
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
    <button on:click={()=>{listNFT()}}><MenuBar backgroundColor="transparent" gridGap=0 innerComponent = {ListPointer} menuBarWidth={"unset"} val = "List NFT"  margin={0}></MenuBar></button>
    <button on:click={()=>{tryUpload = !tryUpload}}><MenuBar backgroundColor="transparent" gridGap=0 innerComponent = {ListPointer} menuBarWidth={"unset"} val = "Create NFT"  margin={0}></MenuBar></button>
    {#if tryUpload}
    <form on:submit|preventDefault={sendImage}>
            <InputContainer  containerWidth={menuBarContainerWidth} inputWidth={(menuBarContainerWidth * 0.85).toFixed(2)}>
                <input slot = "input-slot" class="input-rect-input" type="file" id="image" name="image" accept="image/*"  bind:files={uploadImage}/>
            </InputContainer>
            <InputContainer containerWidth={menuBarContainerWidth} inputWidth={(menuBarContainerWidth * 0.85).toFixed(2)}>
                <input slot = "input-slot" class="input-rect-input" type="submit" value="Upload"/>
            </InputContainer>
        </form>
        {#if trySend}
            {#await sendToStore(uploadImage)}
                <Loading isLarge={false} dark={true}></Loading>
            {:then result} 
                {#if result}
                <SuccessIcon></SuccessIcon>
                {#await closeImage()}
                        <p></p>
                    {:then result} 
                        <p></p>
                {/await}
                {:else}
                <p>Something went wrong</p>
                {#await closeImage()}
                        <p></p>
                    {:then result} 
                        <p></p>
                {/await}
                {/if}
            {/await}

        {/if}
    {/if}
    <button>
        <MenuBar backgroundColor="transparent" gridGap=0 innerComponent = {SettingsIcon} menuBarWidth={"unset"} val = "Privacy & Settings"  margin={0}></MenuBar>
    </button>
</div>
<div id = "second-container">
<button><MenuBar backgroundColor="transparent" gridGap=0 innerComponent = {ListPointer} menuBarWidth={"unset"} val="About US" margin={0}></MenuBar></button>
{#if username.length > 0}
<button on:click={()=>{signOut()}}><MenuBar backgroundColor="transparent" gridGap=0 innerComponent = {SignOutIcon} menuBarWidth={"unset"}  val="SignOut" margin={0}></MenuBar></button>
{/if}
</div>
</div>
<style>
    #first-container,#second-container{
        height: 75%;
        display: flex;
        flex-direction: column;
    }
    button:hover,.input-rect-input:hover{
        background: #ff77005c;
    }
    #menubar-container{
        max-width: 300px;
    }
</style>
