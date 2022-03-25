<script>
import { onDestroy} from "svelte";
import MenuButton from "./MenuButton.svelte";
import WalletButton from "./WalletButton.svelte";
import IconContainer from "../IconContainer.svelte";
import { topContainer} from "../../Stores/dimensions";

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
        <a id="create-nft" >Create NFT</a>
        <WalletButton></WalletButton>
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