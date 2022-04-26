<script>
import { onDestroy } from "svelte";

import Loading from "../Loading.svelte";
import {Creator} from "../../ReachContract/pt"
import ModalForm from "./ModalForm.svelte";
import {formNumber, nftImage} from "./nftFormSvelte"
import { get } from "svelte/store";
import {sendToStore} from "../../STORAGE/storage"
import SuccessIcon from "../SuccessIcon.svelte";
import { contractState } from "../../ReachContract/reachStore";
import ContractDeploy from "../../Participants/ContractDeploy.svelte";
import { openNFTBox } from "../../Stores/movment";
let count = 0
let loading = false
let auctionState
const forms = [
    "nft-name",
    "nft-symbol",
    "nft-description",
    "nft-price",
    "nft-image"
]
let showModal = false
const startnftUpload = () => {
  showModal = true
}
const closeImage = async () => {
    setTimeout(() => {
        showModal = false
        openNFTBox.set(false)
    }, 2000);
    return false
}
const waitResponse = async () => {
  console.log("creator")
  const nft = new Creator()
  let sendToStorage = false
  let nftCreated = await nft.createNFT()
  if(nftCreated ){
    sendToStorage = await sendToStore(get(nftImage).image,"public")
  }
  return sendToStorage
}
contractState.subscribe(value=>{
    auctionState = value
})
formNumber.subscribe(value => {
    count = value
})
onDestroy(() => {
    return formNumber
})
</script>
<main>
  <!-- modal 3 -->
  <div class="box">
    <div class="modal-container" id="m3-o" style="--m-background: transparent;">
        <ModalForm formz = {forms[count]}></ModalForm>
    {#if count !== 5}
    <button disabled  class="link-1" id="m3-c" style="margin-top:3rem" >Upload</button>
    {:else}
    {#if showModal}
    {#await waitResponse() }
    <Loading></Loading>
    <ContractDeploy isSide={false} {auctionState} ></ContractDeploy>
    {:then result} 
      {#if result}
        <SuccessIcon></SuccessIcon>
      {/if}
      {#await closeImage()}
      <div style="display: none;"></div>
      {/await}
    {/await}
    {:else}
    <button on:click={() => {startnftUpload()}} class="link-1" id="m3-c" style="margin-top:3rem" >Upload</button>
    {/if}
    {/if}
  </div>
  <!-- /modal 3 -->
</main>
<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
*{
    font-family: roboto,"Noto Sans Myanmar UI",arial,sans-serif;
}

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
main{
  background: transparent;
}

/* box */
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.box:not(:first-child) {
  height: 45rem;
}

/* modal */
.modal-container {
  z-index: 10;
  min-width: 80px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


  margin: 20px auto;

  /* --m-background is set as inline style */
}

/* using :target */
/*
when users will click/enter button(link) browser will add a #id in a url and when that happens we'll show our users the modal that contains that id.
*/
.modal-container:target {
  display: flex;
}



.link-1:disabled{
    color: #999;
    background-color: #99999938;
    padding: 5px;
    font-size: 16px;
}

/* link-... */
.link-1,button {
  font-size: 16px;
  padding:1rem;
}

.link-1:hover,
.link-1:focus {
  transform: translateY(-.2rem);
  box-shadow: 0 0 4.4rem .2rem var(--shadow-2);
}

.link-1:focus {
  box-shadow:
    0 0 4.4rem .2rem var(--shadow-2),
    0 0 0 .4rem var(--global-background),
    0 0 0 .5rem var(--focus);
}

</style>