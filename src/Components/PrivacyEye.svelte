<script>
    export let showHidden = true
</script>
<div id="eye" >
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="48" viewBox="0 0 48 48">
    <defs>
      <clipPath id="clip-path-privacy">
        <rect id="icon-box" width="48" height="48" transform="translate(272 11)" fill="rgba(255,255,255,0)"/>
        <rect id="icon-box-closed" width="48" height="48" transform="translate(272 11)" fill="rgba(255,255,255,0)"/>
      </clipPath>
    </defs>
    {#if showHidden}
    <g id="icon-container" transform="translate(-272 -11)">
      <g id="eye-open" clip-path-privacy="url(#clip-path-privacy)">
        <path id="eye-open-2" data-name="eye-open" d="M12,16.349a12.327,12.327,0,0,1-7.309-2.291A12.436,12.436,0,0,1,0,8.167,12.873,12.873,0,0,1,16.691.858,12.655,12.655,0,0,1,24,8.167a12.436,12.436,0,0,1-4.691,5.891A12.327,12.327,0,0,1,12,16.349ZM12,2.712a5.455,5.455,0,1,0,5.455,5.455A5.455,5.455,0,0,0,12,2.712Zm0,8.727A3.164,3.164,0,0,1,8.727,8.167a3.273,3.273,0,0,1,6.545,0A3.164,3.164,0,0,1,12,11.44Z" transform="translate(284 27.03)" fill="#6200ee"/>
      </g>
    </g>
    {:else}
    <g id="icon-container" transform="translate(-272 -11)">
      <g id="eye-closed" clip-path-privacy="url(#clip-path-privacy)">
        <g id="eye-closed-2" data-name="eye-closed" transform="translate(272 11)">
          <g id="Group_9" data-name="Group 9" opacity="0">
            <rect id="Rectangle_4" data-name="Rectangle 4" width="48" height="48" fill="#fff"/>
          </g>
          <path id="Path_51" data-name="Path 51" d="M13,25.5a.9.9,0,0,1,.3-.7l1.8-1.6q.5-.3,0-.6a7.6,7.6,0,0,1-1.7-2.3.9.9,0,0,1,.3-1.4.8.8,0,0,1,1,.1c.2.1.4.4.6.6a7.6,7.6,0,0,0,5.2,3.5,11.7,11.7,0,0,0,7.4-.4,7.5,7.5,0,0,0,3.9-3.3,1,1,0,0,1,1-.6.9.9,0,0,1,.8,1.3,5.1,5.1,0,0,1-.9,1.6c-.2.2-.2.3,0,.5l2,1.7a1.1,1.1,0,0,1,.1,1.4,1.2,1.2,0,0,1-1.5.1l-2-1.8a.6.6,0,0,0-.7-.1,10.1,10.1,0,0,1-2.3,1.2c-.3.1-.3.2-.2.5l1,2.1a1.4,1.4,0,0,1-.1,1.1.9.9,0,0,1-1.6-.2c-.5-.8-.8-1.6-1.2-2.4s-.4-.5-.7-.4H22.8c-.4.1-.6.2-.6.6l-.6,2.5a1,1,0,0,1-1.2.7.9.9,0,0,1-.7-1.1c.1-.8.3-1.6.5-2.5s0-.5-.4-.6a6.3,6.3,0,0,1-2.3-.8.5.5,0,0,0-.6.1L15,25.9l-.6.5a.8.8,0,0,1-.9,0,1.1,1.1,0,0,1-.5-.9Z" fill="#6200ee"/>
        </g>
      </g>
    </g>
    {/if}
  </svg>
</div>