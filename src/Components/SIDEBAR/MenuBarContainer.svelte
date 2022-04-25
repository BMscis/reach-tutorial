<script>
import { onDestroy} from "svelte";
import { Auth } from "aws-amplify";
import MenuBar from "../MenuBar.svelte";
import Loading from "../Loading.svelte";
import SignOutIcon from "../SignOutIcon.svelte";
import ListPointer from "../ListPointer.svelte";
import SuccessIcon from "../SuccessIcon.svelte";
import SettingsIcon from "../SettingsIcon.svelte";
import UploadProfile from "../UploadProfile.svelte";
import { sendToStore } from "../../STORAGE/storage";
import { tryMountImage } from "../../Stores/movment";
import {contractState} from "../../ReachContract/reachStore";
import InputContainer from "../INPUTS/InputContainer.svelte";
import ContractDeploy from "../../Participants/ContractDeploy.svelte";

export let username = "";
export let menuBarHeight

let successUpload = false
let uploadImage
let auctionState = 0
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
    tryUpload = !trySend
    successUpload = await sendToStore(uploadImage,'public')
    console.log("sendImage",trySend)
    return
}
const closeImage = async () => {
    setTimeout(() => {
        tryUpload = !auctionState === 8
        trySend = !auctionState === 8
    }, 2000);
    return false
}
const unsubscribeMount = tryMountImage.subscribe(value => {
        value  ? tryUpload = value : null
        return
})
contractState.subscribe(value=>{
    auctionState = value
    if(trySend){
        trySend = !(auctionState === 8)
        tryUpload = !trySend
    }
})
onDestroy(() => {
    return unsubscribeMount
})
</script>
<div id="menubar-container" style="height: {menuBarHeight}px;">
    {#if !editProfile}
        <div id=first-container>
            {#if !trySend}
            <button class="tr" on:click={()=>{tryUpload = !tryUpload}}><MenuBar backgroundColor="transparent" gridGap=0 innerComponent = {ListPointer} menuBarWidth={"unset"} val = "Create NFT"  margin={0}></MenuBar></button>
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
            {/if}
            {#if trySend}
                <div id="result-container">
                    <Loading isLarge={true} dark={true}></Loading>
                    <ContractDeploy {auctionState} ></ContractDeploy>
                    {#if auctionState === 8 || successUpload}
                        <SuccessIcon position="absolute"></SuccessIcon>
                    {/if}
                </div>
            {/if}
            {#if !trySend && !tryUpload}
            <button class="tr">
                <MenuBar setTransparent={true} gridGap=0 innerComponent = {SettingsIcon} menuBarWidth={"unset"} val = "Privacy & Settings"  margin={0}></MenuBar>
            </button>
            {/if}
            </div>
        {#if !trySend && !tryUpload}
        <div id = "second-container">
            <button class="tr" ><MenuBar setTransparent={true} gridGap=0 innerComponent = {ListPointer} menuBarWidth={"unset"} val="About US" margin={0}></MenuBar></button>
            {#if username.length > 0}
            <button class="tr" on:click={()=>{signOut()}}><MenuBar setTransparent={true} gridGap=0 innerComponent = {SignOutIcon} menuBarWidth={"unset"}  val="SignOut" margin={0}></MenuBar></button>
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
</style>
