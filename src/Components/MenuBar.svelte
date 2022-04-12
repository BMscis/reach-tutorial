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
export let backgroundColor = "white"
</script>
<div id="menu-bar" style="width:{menuBarWidth}px;height:{menuBarHeight}px;background-color:{backgroundColor};display:grid;grid-gap:{gridGap}px;margin:{margin};">
<svg xmlns="http://www.w3.org/2000/svg" width="70%" height="1" viewBox="0 0 70% 1">
<rect id="Devider_Light_" data-name="Devider / Light 🌕" width="100%" height="1" fill="rgba(0,0,0,0.12)"/>
</svg>
<IconContainer isLarge={false} isRound={true} innerComponent={innerComponent}></IconContainer>
<MenuLabel label="{val}" dark={true}></MenuLabel>
</div>
<style>
    #menu-bar{
        position: relative;
        grid-auto-flow:column;
        grid-template-columns: 30px 1fr;
    }
    svg{
        position: absolute;
        top: 0;
        right: 0;
    }
</style>