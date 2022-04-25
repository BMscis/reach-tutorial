<script>
const states = ["Initializing Contract","Creating Nft","Deploying Contract","Publishing Contract","Publishing Contract","Paying for Contract","Payment Successful","Auction Start","Auction End"]
export let auctionState
export let isSide = false
</script>
    <div id="deployment-state" style="bottom:{isSide?"-80px":"0"};">
    <p>{states[auctionState]}</p>
</div>
<style>
    #deployment-state {
    width: 237.99px;
    height: 50px;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin: auto;
    left: 0;
    right: 0;
    position: absolute;
    bottom: 0;
}
    p{
        margin:auto;
        font:var(--font-subscript);
        color: var(--inactive-component);
        font-size: 8px;
    }
</style>