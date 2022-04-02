<script>
    //import getImage
    import { getImage } from "../../STORAGE/Storage";
    import Loading from "../Loading.svelte"
</script>
<!-- svelte await getImage then put result into image src -->
{#await getImage("dunk.webp")}
    <Loading></Loading>
{:then result} 
<img width="40px" name="test" src={result} alt="testImg" />
{/await}