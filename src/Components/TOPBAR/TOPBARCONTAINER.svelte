<script>
import { onMount } from "svelte";
import MenuButton from "./MenuButton.svelte";
import WalletButton from "./WalletButton.svelte";
import IconContainer from "../IconContainer.svelte";
import { windowSize } from "../../Stores/dimensions";

let isLarge = true
let topWidth = window.innerWidth
let topHeight = window.innerHeight * 0.13

    onMount(() => {
        windowSize.subscribe((value) => {
            topWidth = value.width
            topHeight = value.height * 0.13
            isLarge = value.isLarge
        })
    })
</script>
<div id="top-bar" style="width:{topWidth}px;height:{topHeight}px">
    <div id="menu-block" style="width: {topWidth * 0.2}px;height:{topHeight}px">
        <IconContainer isLarge={isLarge} isSmall={!isLarge} innerComponent={MenuButton}></IconContainer>        
    </div>
    <div id="title-block" style="width: {topWidth * 0.2}px;height:{topHeight}px">
        <h1 id="title" style="font:var(--font-heading)"> nft<sub>ea</sub></h1>
    </div>
    <div id="anchor-block" style="width: {topWidth * 0.6}px;height:{topHeight}px">
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