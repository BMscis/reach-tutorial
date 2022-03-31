<script>
import { onDestroy} from "svelte";
import MenuButton from "./MenuButton.svelte";
import IconContainer from "../IconContainer.svelte";
import { topContainer} from "../../Stores/dimensions";
import ConnectedWallet from "../WALLET/ConnectedWallet.svelte";
import STORAGEPUT from "../../STORAGE/STORAGEPUT.svelte";
import SIGNOUT from "../../AUTH/SIGNOUT.svelte";
let isLarge = true
let topBarWidth
let topBarHeight
let menuBlockWidth
let menuBlockHeight
let anchorBlockWidth
let anchorBlockHeight

const unsubscribe = topContainer.subscribe((value) => {
            topBarWidth = value.topBar.width
            topBarHeight = value.topBar.height
            menuBlockWidth = value.menuBlock.width
            menuBlockHeight = value.menuBlock.height
            anchorBlockWidth = value.anchorBlock.width
            anchorBlockHeight = value.anchorBlock.height
    })
onDestroy(()=> {unsubscribe})
</script>
<div id="top-bar" style="width:{topBarWidth}px;height:{topBarHeight}px;z-index: 111;">
    <div id="menu-block" style="width: {menuBlockWidth}px;height:{menuBlockHeight}px">
        <IconContainer isLarge={isLarge} isSmall={!isLarge} innerComponent={MenuButton}></IconContainer>        
    </div>
    <div id="title-block" style="width: {menuBlockWidth}px;height:{menuBlockHeight}px">
        <h1 id="title"> nft<sub>ea</sub></h1>
    </div>
    <div id="anchor-block" style="width: {anchorBlockWidth}px;height:{anchorBlockHeight}px">
        <SIGNOUT></SIGNOUT>
        <STORAGEPUT></STORAGEPUT>
        <button id="create-nft" on:click={()=>{console.log("CLICKED CREATE NFT")}} >Create NFT</button>
        <ConnectedWallet></ConnectedWallet>
    </div>
</div>
<style>
    #top-bar{
        position: sticky;
        top:0;
    }
#create-nft{
    margin-right: 32px;
}
a{
    font-family: 'poppins';
}
</style>