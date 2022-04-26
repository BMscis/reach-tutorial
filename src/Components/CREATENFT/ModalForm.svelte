<script>
import { get } from "svelte/store";
import {formNumber, nftDescription, nftName, nftPrice, nftSymbol, nftImage} from "./nftFormSvelte"
export let formz
let nftdescription
let nftname
let nftprice
let nftsymbol
let nftimage
    const checkCount = (y) => {
        if(y >= 5) return 0 
        else return 1
    }
    const nextForm = (x) => {
        switch (x) {
            case true:
            let num = get(formNumber)
            formNumber.set(num + checkCount(num))
                break;
            case false:
            let num2 = get(formNumber)
            formNumber.set(num - checkCount(num2))
                break;
        }
    }
    const setNftValue = () => {
        nextForm(true)
        switch (formz) {
            case "nft-name":
            nftName.set(nftname)
            break;
            case "nft-symbol":
            nftSymbol.set(nftsymbol)
            break;
            case "nft-price":
            nftPrice.set(nftprice)
            break;
            case "nft-description":
            nftDescription.set(nftdescription)
            break;
            case "nft-image":
            nftImage.set({
                url:"https://storagenft171809-staging.s3.eu-west-2.amazonaws.com/public/"+nftimage[0].name,
                image:nftimage}
            )
            break;
        }
    }
</script>
<div class="modal" style="--m-shadow: 0 0 10rem 0">
    {#if formz == "nft-description"}
    <form on:submit|preventDefault={setNftValue}>
            <input type="text" placeholder="{formz}" style="background-color: transparent;height:100px;" bind:value={nftdescription}/>
            <button type="submit"  class="modal__btn" style="font-size: 25px;">&rarr; </button>
        </form>
        {:else if formz == "nft-price"}
        <form on:submit|preventDefault={setNftValue}>
        <input type="number" placeholder="{formz}" bind:value={nftprice} style="background-color: transparent;border: 1px solid var(--border-color);">
        <button type="submit" class="modal__btn" style="font-size: 25px;">&rarr; </button>
    </form>
    {:else if formz == "nft-symbol"}
    <form on:submit|preventDefault={setNftValue}>
        <input type="text" placeholder="{formz}" bind:value={nftsymbol} style="background-color: transparent;border: 1px solid var(--border-color);">
        <button type="submit"  class="modal__btn" style="font-size: 25px;">&rarr; </button>
    </form>
    {:else if formz == "nft-name"}
    <form on:submit|preventDefault={setNftValue}>
        <input type="text" placeholder="{formz}" bind:value={nftname} style="background-color: transparent;border: 1px solid var(--border-color);">
        <button type="submit"  class="modal__btn" style="font-size: 25px;">&rarr; </button>
    </form>
    {:else if formz == "nft-image"}
    <form on:submit|preventDefault={setNftValue}>
        <input autocomplete    type="file" id="image" name="image" accept="image/*" bind:files={nftimage} style="background-color: transparent;border: 1px solid var(--border-color);">
        <button type="submit"  class="modal__btn" style="font-size: 25px;">&uArr; </button>
    </form>
    {/if}
    <!-- <button on:click={()=>{nextForm(false)}} class="modal__btn"> &larrhk;</button> -->
  </div>
<style>
    button,
button:link {
  font-family: inherit;
  text-decoration: none;
  cursor: pointer;
}
button:focus {
  outline: none;
}

button::-moz-focus-inner {
  border: 0;
}
input{
    color:white;
}
.modal {
  border-radius: .8rem;

  color: var(--light);
  background: transparent;
  position: relative;

  overflow: hidden;
}
.modal__btn,input {
    border: 1px solid var(--border-color);
    color: inherit;
    background: transparent;
    font-family: inherit;
    cursor: pointer;
}
.modal__btn{

}
.modal__btn:hover,
.modal__btn:focus {
  background: var(--focus);
  border-color: var(--focus);
  transform: translateY(-.2rem);
}
</style>