<script>
let images
export let nftImage
export let imageHeight
let imageWidth = (imageHeight*0.55).toFixed(2)
</script>
<div id="nft-card-image"
    style="
    width:{imageWidth}px;
    height:{imageHeight}px;
    background-image:url({nftImage? nftImage:images});
    background-repeat:no-repeat;
    background-size:cover;
    background-position:
    center;outline:none;
    border-radius:5%;
    grid-row-start: 2;
    ">
</div>
<style>
#nft-card-image{
    margin: auto;
    z-index: 0;
}
</style>
