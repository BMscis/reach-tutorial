<script>
    import {Storage} from "aws-amplify"
    import img1 from "../nftea-assets/assets/avatarts.webp"
    const sendToStore = async () => {
        const results = await Storage.put("avatar", img1)
        console.log(`Uploaded: ${ProgressEvent.loaded}/${ProgressEvent.total}`)
        console.log("Storage put results:", results)
    }
    const getStore = async () => {
        const results = await Storage.list()
        console.log(`Uploaded: ${ProgressEvent.loaded}/${ProgressEvent.total}`)
        console.log("Storage put results:", results)
    }
</script>
<button on:click={()=>{sendToStore()}}>put</button>
<button on:click={()=>{getStore()}}>get</button>
<style>
    button{
        margin-right: 20px;
    }
</style>