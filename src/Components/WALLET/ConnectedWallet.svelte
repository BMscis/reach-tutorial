<script>
import { onMount } from "svelte";
import { reachWallet } from "../../Stores/walletStore";
import { connectMyAlgo } from "../../Utilities/connectALGOWallet";

let accountName;
let clicked = false;
async function getAccountName() {
  let result = await connectMyAlgo();
  return result;
}
onMount(() => {
    return reachWallet.subscribe((value) => {
        console.log("reachWallet changed", value);
        value.account ? (accountName = value.account) : (accountName = "Wallet");
    });
});

</script>
<!-- create html that displays value of reachWallet -->
{#if clicked}
    {#await getAccountName()}
        <p>Loading</p>
    {:then result}
        {#if result}
        <p>{result.account}</p>
        {/if}
    {/await}
{/if}
<button id="wallet-button" style="width:24px;height:24px;" on:click={(() => {clicked = true})}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path id="wallet" d="M1,35.7V18.5a5.606,5.606,0,0,1,.7-2.073A3.361,3.361,0,0,1,4.68,15.1H20.573a5.18,5.18,0,0,1,1.216.146,2.207,2.207,0,0,1,1.387,1.244c.619,1.244.224,1.988-1.013,2H5.469a5.856,5.856,0,0,0-.8.037.732.732,0,0,0-.651.756.862.862,0,0,0,.533.939,2.22,2.22,0,0,0,.9.11h17.12c1.28,0,2.016.671,2.336,2.085.021.11.064.232.1.341V36.551c-.565,2.012-1.195,2.537-3.061,2.549H4.669A3.353,3.353,0,0,1,1.7,37.771,5.606,5.606,0,0,1,1,35.7Zm21.013-6.049a1.863,1.863,0,0,0-.451-1.233,1.421,1.421,0,0,0-1.085-.5,1.723,1.723,0,0,0-1.515,1.78,1.638,1.638,0,0,0,1.547,1.72,1.653,1.653,0,0,0,1.5-1.768Z" transform="translate(-1 -15.1)" fill="#fff"/>   
</button>
<style>
    p{
        font-family: 'poppins';
    margin: 0 16px;
    width: 50px;
    overflow: auto;
    padding: 0;
    text-align: center;
    text-overflow: ellipsis;
    }
    p::-webkit-scrollbar {
    width: 0;
    display: none;
    }
    #wallet-button{
        margin-right: 32px;
    }
    button:hover #wallet{
        fill:var(--spectacular-orange);
    }
</style>