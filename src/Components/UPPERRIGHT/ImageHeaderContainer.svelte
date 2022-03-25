<script>
    import MenuLabel from "../MenuLabel.svelte";
    import ImageHeader from "./ImageHeader.svelte";
    import MenuSubLabel from "../MenuSubLabel.svelte";
    
    export let isLarge
    export let imageWidth
    export let imageHeight
</script>
<div id="image-header-container" style="position: absolute;bottom:27px;left:54px;height:{imageHeight}px;">
    <ImageHeader imageWidth={Math.floor(imageWidth * 0.95)}>
        <MenuLabel isLarge={isLarge} label="Name"  slot="slot1" margin=0></MenuLabel>
        <MenuLabel isLarge={isLarge} label="Owner" slot="slot2" margin=0></MenuLabel>
        <MenuLabel isLarge={isLarge} label="Price" slot="slot3" margin=0></MenuLabel>
    </ImageHeader>
    <ImageHeader imageWidth={Math.floor(imageWidth * 0.95)}>
        <MenuSubLabel margin=0 isLarge={isLarge} label="Coat of Arms"  slot="slot1"></MenuSubLabel>
        <MenuSubLabel margin=0 isLarge={isLarge} label="Bmsic" slot="slot2"></MenuSubLabel>
        <MenuSubLabel margin=0 isLarge={isLarge} label="$1000" slot="slot3"></MenuSubLabel>
    </ImageHeader>
</div>