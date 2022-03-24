<script>
    import baseImage from "../../nftea-assets/assets/basetst6.png"
    //export let image
    export let midWidth
    export let midHeight
</script>
<div id="image-block" style="width:{midWidth - 54}px;height:{midHeight - 27}px;position:absolute;margin: auto;left: 0;right: 0;top: 0;bottom: 0;">
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{midWidth - 54}" height="{midHeight  - 27}" viewBox="0 0 {midWidth  - 54} {midHeight  - 27}">
    <defs>
      <pattern id="pattern" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" viewBox="0 0 1920 1080">
        <image width="1920" height="1080" href={baseImage}/>
      </pattern>
    </defs>
    <rect id="basetst4" width="{midWidth  - 54}" height="{midHeight  - 27}" rx="24" fill="url(#pattern)"/>
  </svg>
</div>
  