<script>
    import { onMount } from "svelte";
    import BodyTitle from "../BodyTitle.svelte";
    import ImageBlock from "./ImageBlock.svelte";
    import { windowSize } from "../../Stores/dimensions";
    import ImageHeaderContainer from "./ImageHeaderContainer.svelte"
    let midWidth = Math.floor(window.innerWidth * 0.57)
    let midHeight = Math.floor(window.innerHeight * 0.5)
    let isLarge = true
    onMount(()=>{
        windowSize.subscribe((value) => {
            midWidth = Math.floor(value.width * 0.57)
            midHeight= Math.floor(value.height * 0.5)
            isLarge= value.isLarge
        })
    })
</script>
<div id="upper-mid-bar" style="width:{midWidth}px;height:{midHeight}px;">
    <BodyTitle label="Featured"></BodyTitle>
    <ImageBlock {midWidth} {midHeight}></ImageBlock>
    <ImageHeaderContainer imageWidth={midWidth} isLarge={isLarge}></ImageHeaderContainer>
</div>