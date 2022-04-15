<script>
    import { afterUpdate, onDestroy } from "svelte";
    import Timer from "../Timer.svelte";
    import MenuBar from "../MenuBar.svelte";
    import CardImage from "../CardImage.svelte";
    import MenuLabel from "../MenuLabel.svelte";
    import HeartIcon from "../HeartIcon.svelte";
    import CardHeader from "./CardHeader.svelte";
    import CommentIcon from "../CommentIcon.svelte";
    import {setBottomBlockView} from "./setBottomBlockView";
    import {createNft, nftCardList} from "../../Stores/nftCard";
    export let id
    export let likes
    export let owner
    export let image
    export let price
    export let nonce
    export let wallet
    export let prevOwner
    export let blockTime
    export let ownerName
    export let description
    export let userPicture
    export let isLarge = false
    export let opacity = false
    export let labelDark = false
    export let blockHeight = 500

    let count = 0
    let clicked = false
    let cardHeight = (blockHeight*0.8).toFixed(2)
    let cardWidth = (cardHeight*0.55).toFixed(2)
    let imageHeight = (cardWidth*0.9).toFixed(2)
    const enlarge = () => {
        nftValidator(!clicked)
        clicked ? setBottomBlockView.set({visibility:0}) : setBottomBlockView.set({visibility:1})
    }
    const [nftSubscriber,nftValidator] = createNft(id,owner,description,image,price,wallet,prevOwner,blockTime,nonce,likes,ownerName,userPicture)
    nftSubscriber.subscribe((value) => {
        id = value.id
    })
    nftCardList.subscribe((value)=>{
        //find label in value where value.label === label
        //if value.active === true
        //set clicked to true
        //console.log("UPPERLEFT: ",value)
        function returnTrue(value){
            try {
                if(value.id === id){
                    return true
                }else{
                    return false
                }
            } catch (error) {
                console.log("No Element", error,value)
                return false
            }
        }
        if(value){
            value.forEach(element => {
            if(returnTrue(element)){
                if(element.active){
                    clicked = true
                }
                else{
                    clicked = false
                }
            }
        });
        }
    })
    onDestroy(()=> {return [nftSubscriber,nftValidator,nftCardList]})
</script>
{#if clicked && opacity}
<button class="gg-backspace" on:click={() => {enlarge()}}></button>
{/if}
<button id="nft-card-container" style="width:100%;height:{blockHeight}px;"
class:active={clicked} on:click={() => {enlarge()}}>
    <div id="nft-card" style="height:{cardHeight}px;width:{cardWidth}px;background-image:linear-gradient(58deg, rgb(15 48 74 / 0%), rgb(14, 39, 75));position:relative;">
        <CardImage {imageHeight}  {image}   ></CardImage>
        <CardHeader {ownerName} {userPicture} {owner} {price} label={ownerName} isLarge={isLarge} labelDark={labelDark} labelMargin={0} position="relative" ></CardHeader>
        {#if isLarge}
        <Timer></Timer>
        <button id="bid">BID</button>
        {/if}
        {#if isLarge}
        <MenuBar margin="0 auto"  backgroundColor="var(--primary-bright)" val="$1000"></MenuBar>
        <MenuBar margin="0 auto"  backgroundColor="var(--inactive-component)" val="$900"></MenuBar> 
        {/if}
    </div>
    {#if !isLarge}
    <div id="card-helper">
        <HeartIcon></HeartIcon>
        <CommentIcon></CommentIcon>        
    </div>
    <div>
        <MenuLabel label={description}
        ></MenuLabel>
        <MenuLabel label={wallet}
        ></MenuLabel>
        <MenuLabel label={prevOwner}
        ></MenuLabel>
        <MenuLabel label={price}
        ></MenuLabel>
    </div>
    {/if}
</button>
<style>
    #bid{
        border-radius: 8px;
        margin: auto;
        color: white;
        font: 500 poppins;
        background-color: var(--primary-bright);
        width: 124px;
        height: 40px;
        top:12px;
        right:12px;
        transform: scale(var(--ggs,.6));
        position: absolute;

    }
    #bid:hover{
        background-color: var(--spectacular-orange);
    }
    #nft-card{
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        flex-wrap: nowrap;
        margin:auto 0;
    }
    #nft-card-container{
        display: grid;
        align-items: center;
        justify-content: start;
        grid-auto-flow: column;
        background: radial-gradient(black, transparent);
        z-index: 111;
    }
    #nft-card-container.active{
        border-bottom: 1px solid var(--spectacular-orange);
        z-index: 0;
    }
    #card-helper{
        display: grid;
        grid-gap: 40px;
        grid-auto-flow: row;
        height: 80px;
        width: 80px;
        align-items: center;
        justify-content: center;
    }
</style>