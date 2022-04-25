<script>
import { onMount } from "svelte";
import Avatar from "../Avatar.svelte";
import MenuLabel from "../MenuLabel.svelte";
import PrivacyEye from "../PrivacyEye.svelte";
import MenuSubLabel from "../MenuSubLabel.svelte";
import EditIcon from "../EditIcon.svelte";

export let bal
export let width
export let editProfile
export let username = ""
export let nftAssetOwnerName = ""
export let nftAssetOwnerAddr = ""
export let contactBarHeight
let contactBlockWidth
let showHidden = true

onMount(()=> {
    contactBlockWidth = (width * 0.86).toFixed(2)
})
</script>
<div id="contact-bar" style="width:{width}px;height:{contactBarHeight}px">
    <div id="contact-avatar-block" style="width:40px ;height:40px ;">
        <Avatar isLarge={true}></Avatar>
    </div>
    <EditIcon {editProfile}></EditIcon>
    <div id="contact-block" style="width:{contactBlockWidth}px;">
        <div id="contact-label-block" style="width:{contactBlockWidth}px;">
            <MenuLabel margin={0} label={username} dark={true}></MenuLabel>
            <MenuSubLabel margin={0} hide={!showHidden} label={nftAssetOwnerAddr} dark={true} width={(contactBlockWidth * 0.7).toFixed(2)}></MenuSubLabel>
            <MenuSubLabel margin={0} hide={!showHidden} label={nftAssetOwnerName} dark={true} width={(contactBlockWidth * 0.7).toFixed(2)}></MenuSubLabel>
            <MenuSubLabel margin={0} hide={!showHidden} label={bal} dark={true} width={(contactBlockWidth * 0.7).toFixed(2)}></MenuSubLabel>
        </div>
        <div id="privacy-block">
            <button id="showhidden" class="tr" on:click={()=>{showHidden = !showHidden}}>
            <PrivacyEye {showHidden} ></PrivacyEye>
            </button>
        </div>     
    </div>
</div>
<style>
    #contact-bar{
        display: grid;
        grid-template-columns: 40px 1fr 40px;
        grid-template-rows: 40px 1fr;
        margin:20px;
    }
    #contact-block{
        display: grid;
        grid-template-columns: 1fr 48px;
        grid-column-start: 1;
        grid-row-start: 2;
        grid-column-end: 4;
    }
    #contact-label-block{
        height: 100%;
        display: flex;
        float:left;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: flex-start;
    }
    #privacy-block{
        height: 48px;
        width: 48px;
        margin: auto;
        float:right;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
    }
    #contact-avatar-block{
        background: transparent;
        border-radius: 50%;
        border: 2px solid;
        display: flex;
        justify-content: center;
        align-items: center;
        }
</style>