<script>
    import {sendToStore} from '../../STORAGE/storage'
let uploadImage
const sendImage = async () => {
    let result = await sendToStore(uploadImage)
    console.log(result,"IMAGES")
}
</script>
<form on:submit|preventDefault={sendImage}>
    <!-- get image upload from user-->
    <!-- upload image to amplify storage -->
    <!-- upload image to database -->
    <input type="file" id="image" name="image" accept="image/*"  bind:files={uploadImage}/>
    <input type="submit" value="Upload"/>
    
</form>