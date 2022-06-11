<script>
import Bid from "./Bid.svelte";
import MenuLabel from "./MenuLabel.svelte";
import IconContainer from "./IconContainer.svelte"

export let val
export let gridGap = 20
export let margin = "auto"
export let menuBarHeight = 40
export let menuBarWidth = 124
export let innerComponent = Bid
export let biddersBar = false
export let setTransparent = false
</script>
<div id="menu-bar" class:mtr={setTransparent} class:bidder-bar={biddersBar} style="width:{menuBarWidth}px;height:{menuBarHeight}px;display:grid;grid-gap:{gridGap}px;margin:{margin};">
<IconContainer isLarge={false} isRound={true} innerComponent={innerComponent}></IconContainer>
<MenuLabel label="{val}" dark={true}></MenuLabel>
</div>
<style>
    #menu-bar{
        position: relative;
        grid-auto-flow:column;
        grid-template-columns: 30px 1fr;
        width: 100%;
    }
    svg{
        position: absolute;
        top: 0;
        right: 0;
    }
</style>