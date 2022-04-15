<script>
import Loading from "./Loading.svelte";
import {updateUser} from "../AUTH/AuthUtils"
import { setEditProfile } from "./SIDEBAR/sideBarStore";
import InputContainer from "./INPUTS/InputContainer.svelte";
let uploadImage;
let loading = false;
const sendImage = async () => {
    try {
        const result = await updateUser(uploadImage);
        result ? setEditProfile.set({edit:false}) : null;
    } catch (error) {
        console.log("Send IMages error: ",error);
        !result ? setEditProfile.set({edit:false}) : null;
    }
}

</script>
<div id = "upload-profile-pic">
<h5>Upload Profile Picture</h5>
{#if loading}
<Loading></Loading>
{:else}
<form on:submit|preventDefault={sendImage}>
    <InputContainer >
        <input autocomplete  slot="input-slot" class="input-rect-input" type="file" id="image" name="image" accept="image/*" bind:files={uploadImage}/>
    </InputContainer>
    <InputContainer >
        <input autocomplete  slot="input-slot" class="input-rect-input" type="submit" value="Upload"/>
    </InputContainer>
    </form>
{/if}
</div>
<style>
    div{
        max-width: 100%;
        max-height: 100%;
    }
    h5{
        color: black;
        margin: auto 16px;
    }
</style>