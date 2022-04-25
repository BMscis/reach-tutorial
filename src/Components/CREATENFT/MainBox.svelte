<script>
export let openBox = false
export let nftBlockWidth
export let nftBlockHeight
import Modal from "./Modal.svelte";

</script>
<div id="main-nft-box" style="display:{openBox?"block":"none"};width:{nftBlockWidth}px;height:{nftBlockHeight}px;">
    <div id="nft-container">
        <div id="nft-heading">
            NFTea
        </div>
        <h4 class="modal__title">Create NFT with Reach on Algorand</h4>
        <div id="nft-body">
            <Modal></Modal>
        </div>
    </div>
</div>
<style>
    #main-nft-box{
        z-index: 120;
        position:absolute;
        left: 0;
        right:0;
        bottom: 0;
        top:0;
        -webkit-border-radius: 8px;
        border-radius: 8px;
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        margin: auto;
        min-height: 0;
        -webkit-transition: .2s;
        transition: .2s;
        direction: ltr;
        font-size: 14px;
        line-height: 1.4286;
        color: #202124;
        font-family: roboto,"Noto Sans Myanmar UI",arial,sans-serif;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Open Sans', sans-serif;
        background: var(--background);
        box-shadow: var(--m-shadow, .4rem .4rem 10.2rem .2rem) var(--shadow-1);
        color: var(--light);
    }
    #nft-container{
    padding: 48px 40px 36px;
 
    }
    #nft-heading{
        font-size: 24px;
        font-weight: 500;
        line-height: 1.3;
        color: white;
        font-family: roboto,"Noto Sans Myanmar UI",arial,sans-serif;
    }
    </style>