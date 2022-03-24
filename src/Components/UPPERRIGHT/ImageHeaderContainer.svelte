<script>
    import MenuLabel from "../MenuLabel.svelte";
    import ImageHeader from "./ImageHeader.svelte";
    import MenuSubLabel from "../MenuSubLabel.svelte";
    
    export let isLarge
    export let imageWidth
</script>
<div id="image-header-container" style="position: absolute;bottom:27px;left:54px;">
    <ImageHeader imageWidth={imageWidth - 54}>
        <MenuLabel isLarge={isLarge} label="Name"  slot="slot1"></MenuLabel>
        <MenuLabel isLarge={isLarge} label="Owner" slot="slot2"></MenuLabel>
        <MenuLabel isLarge={isLarge} label="Price" slot="slot3"></MenuLabel>
    </ImageHeader>
    <ImageHeader imageWidth={imageWidth - 54}>
        <MenuSubLabel isLarge={isLarge} label="Coat of Arms"  slot="slot1"></MenuSubLabel>
        <MenuSubLabel isLarge={isLarge} label="Bmsic" slot="slot2"></MenuSubLabel>
        <MenuSubLabel isLarge={isLarge} label="$1000" slot="slot3"></MenuSubLabel>
    </ImageHeader>
</div>