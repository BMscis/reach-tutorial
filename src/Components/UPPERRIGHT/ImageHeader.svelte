<script>
    export let imageWidth
// /width:{(imageWidth * 0.95).toFixed(2)}
</script>
<div id="image-header" style="z-index: 11;display: flex;">
<slot name="slot1"></slot>
<slot name="slot2"></slot>
<slot name="slot3"></slot>
</div>
<style>
    #image-header{
        display: flex;
        flex-direction: column;
        align-content: flex-start
    }
</style>