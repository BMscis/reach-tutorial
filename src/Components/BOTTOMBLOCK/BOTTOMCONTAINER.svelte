<script>
    import { onDestroy } from "svelte";
    import NftList from "./NftList.svelte";
    import BodyNav from "../BodyNav.svelte";
    import {bottomContainer} from "../../Stores/dimensions"
    import { centralBlock } from "../../Stores/allDimension";
import { setBottomBlockView } from "./setBottomBlockView";
    let isLarge = true
    let blockHeight
    let style
    let opacity = false
    let visibility = 1
    const unsubscribe = centralBlock.subscribe((value) => {
            blockHeight = value.height
            style = value.style
            opacity = value.opacity
        })
    let hideOnClick = false
    setBottomBlockView.subscribe(value => {
        visibility = value.visibility
        hideOnClick = opacity && visibility === 0 ? true: false
    })
    onDestroy(() => unsubscribe)
</script>
<div id="bottom-block" style={style + `opacity:${hideOnClick? visibility : 1}`} >
    <!-- <BodyNav width={bottomBlockWidth} height={bodyNavHeight/2} name="Latest"></BodyNav> -->
    <NftList {blockHeight} {opacity} ></NftList>
</div>
<style>
    #bottom-block{
        background-color: transparent;
        overflow: auto;
        z-index: 110;
    }
</style>