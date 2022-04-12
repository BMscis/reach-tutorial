<script>
    import { onDestroy } from "svelte";
    import NftList from "./NftList.svelte";
    import { centralBlock } from "../../Stores/allDimension";
    import { setBottomBlockView } from "./setBottomBlockView";
    let blockHeight
    let style
    let opacity = false
    let visibility = 1
    let hideOnClick = false

    const unsubscribeCB = centralBlock.subscribe((value) => {
            blockHeight = value.height
            style = value.style
            opacity = value.opacity
        })
    const unsubscribeBB = setBottomBlockView.subscribe(value => {
        visibility = value.visibility
        hideOnClick = opacity && visibility === 0 ? true: false
    })
    onDestroy(() => {return [unsubscribeCB, unsubscribeBB]})
</script>
<div id="central-block" style={style + `opacity:${hideOnClick? visibility : 1}`} >
    <NftList {blockHeight} ></NftList>
</div>
<style>
    #central-block{
        background-color: transparent;
        overflow: auto;
        z-index: 110;
    }
</style>