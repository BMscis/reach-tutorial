<script>
    import { onDestroy } from "svelte";
    import BodyTitle from "../BodyTitle.svelte";
    import ImageBlock from "./ImageBlock.svelte";
    import { featureBlock } from "../../Stores/allDimension";
    import ImageHeaderContainer from "./ImageHeaderContainer.svelte"
    
    let upperRightBlockWidth
    let upperRightBlockHeight
    let BodyTitleWidth
    let BodyTitleHeight
    let imageBlockWidth
    let imageBlockHeight
    let imageHeaderContainerWidth
    let imageHeaderContainerHeight
    let isLarge = true

    const unsubsrcibe = featureBlock.subscribe((value) => {
            upperRightBlockWidth = value.upperRightBlock.width
            upperRightBlockHeight = value.upperRightBlock.height
            BodyTitleWidth = value.bodyTitle.width
            BodyTitleHeight = value.bodyTitle.height
            imageBlockWidth = value.imageBlock.width
            imageBlockHeight = value.imageBlock.height
            imageHeaderContainerWidth = value.imageHeaderContainer.width
            imageHeaderContainerHeight = value.imageHeaderContainer.height
        })
    onDestroy(() => unsubsrcibe)
</script>
<div id="feature-block" style="width:{upperRightBlockWidth}px;height:{upperRightBlockHeight}px;">
    <BodyTitle label="Featured"></BodyTitle>
    <ImageBlock midWidth={imageBlockWidth} midHeight={imageBlockHeight}></ImageBlock>
    <ImageHeaderContainer imageWidth={imageHeaderContainerWidth} imageHeight={imageHeaderContainerHeight} isLarge={isLarge}></ImageHeaderContainer>
</div>