<script>
import EthButton from "./EthButton.svelte";
import AlgoButton from "./AlgoButton.svelte";
import { displayWallet, walletSelect } from "./displayWallet";

export let topBarHeight
let popup = false;
let dim  = Math.floor(topBarHeight) + 40;
displayWallet.subscribe(value => {
    popup = value;
})
const setVal = (val) =>{
    setTimeout(() => {
        walletSelect.set(val)
    }, 1000);
}
</script>
{#if popup}
    <div id="select-wallet" style="width:{dim}px;height:{dim}px;top:{topBarHeight}px;display:{popup?"flex":"none"}">
        <button on:click={() => {setVal("ALGO")}}>
            <AlgoButton></AlgoButton>
            <p>ALGO</p>
        </button>
        <button on:click={() => {setVal("ETH")}}>
            <EthButton></EthButton>
            <p>ETH</p>
        </button>
    </div>
{/if}
<style>
    #select-wallet{
        position: fixed;
        z-index: 112px;
        right: 1px;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: flex-start;
        background-color: var(--focus);
        box-shadow: var(--m-shadow, .4rem .4rem 5.2rem .2rem) #0d80f29e;
        border-radius: 0 0 8px 8px;
        padding-right: 12px;
    }
    button{
    width: 100%;
    display: grid;
    justify-content: space-between;
    align-items: center;
    grid-template-columns: 50% 50%;
    }
    button:hover{
        background-color: #314c70;
    }
</style>