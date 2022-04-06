<script>
import InputContainer from "./INPUTS/InputContainer.svelte";


    export let sendImage;
    export let uploadImage;
    export let menuBarContainerWidth
</script>

<form on:submit|preventDefault={sendImage}>
    <InputContainer
        containerWidth={menuBarContainerWidth}
        inputWidth={(menuBarContainerWidth * 0.85).toFixed(2)}
    >
        <input
            slot="input-slot"
            class="input-rect-input"
            type="file"
            id="image"
            name="image"
            accept="image/*"
            bind:files={uploadImage}
        />
    </InputContainer>
    <InputContainer
        containerWidth={menuBarContainerWidth}
        inputWidth={(menuBarContainerWidth * 0.85).toFixed(2)}
    >
        <input
            slot="input-slot"
            class="input-rect-input"
            type="submit"
            value="Upload"
        />
    </InputContainer>
</form>
