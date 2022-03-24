<script>
    let isLarge = true
    export let isRound = false
    export let isSmall = false
    export let innerComponent

</script>
{#if isSmall}
<svg id="icon-container" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <rect id="icon-box" width="24" height="24" fill="transparent"/>
    <foreignObject width="24" height="24">
        <svelte:component this={innerComponent}></svelte:component>
    </foreignObject>
  </svg>
{:else if isLarge}
<svg id="icon-container" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
    <rect id="icon-box" width="48" height="48" fill="transparent"/>
    <foreignObject width="24" height="24" transform="translate(12 12)">
        <svelte:component this={innerComponent}></svelte:component>
    </foreignObject>
  </svg>
{:else if isRound}
<svg id="icon-container" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <circle id="Ellipse_3" data-name="Ellipse 3" cx="12" cy="12" r="12" fill="transparent"/>
  </svg>  
{/if}  