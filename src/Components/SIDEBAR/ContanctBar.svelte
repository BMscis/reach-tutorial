<script>
import Avatar from "../Avatar.svelte";
import MenuLabel from "../MenuLabel.svelte";
import PrivacyEye from "../PrivacyEye.svelte";
import MenuSubLabel from "../MenuSubLabel.svelte";

export let username = ""
export let walletname = ""
export let contactBarWidth
export let contactBarHeight
export let walletAddress = ""

let showHidden = true
</script>
<div id="contact-bar" style="width:{contactBarWidth}px ;height:{contactBarHeight}px ;">
    <div id="contact-avatar-block" style="width:24px ;height:24px ;">
        <Avatar isLarge={true}></Avatar>
    </div>
    <div id="contact-block">
        <div id="contact-label-block">
            <MenuLabel label={username} dark={true}></MenuLabel>
            <MenuSubLabel hide={!showHidden} label={walletAddress} dark={true}></MenuSubLabel>
            <MenuSubLabel hide={!showHidden} label={walletname} dark={true}></MenuSubLabel>
        </div>
        <div id="privacy-block">
            <button id="showhidden" on:click={()=>{showHidden = !showHidden}}>
            <PrivacyEye {showHidden} ></PrivacyEye>
            </button>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="1" viewBox="0 0 304 1">
            <rect id="Devider_Light_" data-name="Devider / Light 🌕" width="100%" height="1" fill="rgba(0,0,0,0.12)"/>
          </svg>      
    </div>
</div>
<style>
    #contact-bar{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px;
        max-width: 300px;
    }
    #contact-block{
        display: grid;
        grid-template-columns: 70% 1fr;
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
        height: 24px;
        width: 24px;
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