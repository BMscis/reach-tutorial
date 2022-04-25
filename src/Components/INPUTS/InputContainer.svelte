<script>
    export let inputContainerWidth = 328
    export let inputContainerHeight = 60
    export let inputSlotWidth = 280
    export let inputSlotHeight = 60
</script>
<div class="input-container" style="width:{inputContainerWidth}px;height: {inputContainerHeight}px;">
    <div class="input-slot" style="width:{inputSlotWidth}px;height: {inputSlotHeight}px;">
        <slot name="input-slot" class="input-rect-input" ></slot>
    </div>
</div>