<script>
    export let imageWidth

</script>
<div id="image-header" style="width:{Math.floor(imageWidth * 0.95)}px;height:24px;z-index: 11;display: flex;">
<slot name="slot1"></slot>
<slot name="slot2"></slot>
<slot name="slot3"></slot>
</div>