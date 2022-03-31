<script>
import { onDestroy } from "svelte";

import images from "../nftea-assets/assets/tcCycle.webp"
import { nftCardList } from "../Stores/nftCard";
    export let image
    export let isLarge
    export let imageHeight
    export let imageWidth
    export let nftValidator
    export let nftSubscriber
    let label
    let clicked = false
    const enlarge = () => {
        nftValidator(!clicked)
    }
    nftCardList.subscribe((value)=>{
        //find label in value where value.label === label
        //if value.active === true
        //set clicked to true
        value.forEach(element => {
            if(element.label === label){
                if(element.active){
                    clicked = true
                }
                else{
                    clicked = false
                }
            }
        });
    })

    nftSubscriber.subscribe((value) => {
        //console.log("CARDIMAGE: ",value)
        label = value.label
    })
    onDestroy(()=> {return [nftSubscriber,nftValidator,nftCardList]})
</script>
<button style="width:{imageWidth}px;height:{imageHeight}px;background-image:url({image? image:images});background-repeat:no-repeat;background-size: contain;background-position: center;outline:none;" class:active={clicked} on:click={() => {enlarge()}}>
</button>
<style>
    button.active{
        border-bottom: 4px solid var(--primary-mono);
        border-radius: 24px;
    }
</style>
