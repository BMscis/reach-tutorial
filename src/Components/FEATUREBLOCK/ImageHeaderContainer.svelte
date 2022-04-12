<script>
    import MenuLabel from "../MenuLabel.svelte";
    import ImageHeader from "./ImageHeader.svelte";
    import MenuSubLabel from "../MenuSubLabel.svelte";
    
    export let imageWidth
    export let imageHeight
</script>
<div id="image-header-container" style="position: absolute;bottom:27px;right:0;height:{imageHeight}px;">
    <ImageHeader imageWidth={(imageWidth * 0.95).toFixed(2)}>
        <MenuLabel label="Name"  slot="slot1" margin=0></MenuLabel>
        <MenuLabel label="Owner" slot="slot2" margin=0></MenuLabel>
        <MenuLabel label="Price" slot="slot3" margin=0></MenuLabel>
    </ImageHeader>
    <ImageHeader imageWidth={(imageWidth * 0.95).toFixed(2)}>
        <MenuSubLabel margin=0 label="Coat of Arms"  slot="slot1"></MenuSubLabel>
        <MenuSubLabel margin=0 label="Bmsic" slot="slot2"></MenuSubLabel>
        <MenuSubLabel margin=0 label="$1000" slot="slot3"></MenuSubLabel>
    </ImageHeader>
</div>
<style>
    #image-header-container{
        display: flex;
        flex-direction: row;
    }
</style>