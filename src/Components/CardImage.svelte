<script>
let images
export let nftImage
export let imageHeight
let imageWidth = (imageHeight*0.55).toFixed(2)
</script>
<div id="nft-card-container"style="height:{imageHeight}px;background-image:url({nftImage? nftImage:images});background-repeat:no-repeat;background-size: contain;background-position: center;outline:none;">
</div>
<style>
#nft-card-container{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 0;
}
</style>
