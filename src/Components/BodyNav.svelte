<script>
    import NavButton from "./NavButton.svelte"
    export let width
    export let name
</script>
<div style="width: {width}px;height:40px;margin:auto;">
    <svg id="nft-list-bar" xmlns="http://www.w3.org/2000/svg" width="{width}" height="40" viewBox="0 0 {width} 40">
        <path id="list-bar-box" d="M40,0H{width- 40}a40,40,0,0,1,40,40v0a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0v0A40,40,0,0,1,40,0Z" fill="#6418f2"/>
        <foreignObject transform="translate(32 13)" width="67" height="22">
            <NavButton {name}></NavButton>
        </foreignObject>
      </svg>
</div>
        
  