<script>
    export let containerWidth = 328
    export let inputWidth = 280
</script>
<div class="input-container" style="width: {containerWidth}px;">
    <div class="input-slot" style="width: {inputWidth}px;">
        <slot name="input-slot" class="input-rect-input" style="width: {inputWidth}px;"></slot>
    </div>
</div>