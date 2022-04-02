<script>
    import baseImage from "../../nftea-assets/assets/coaWeb.webp"
    //export let image
    export let midWidth
    export let midHeight
</script>
<button id="image-block" style="width:{midWidth}px;height:{midHeight}px;position:absolute;margin: auto;left: 0;right: 0;top: 0;bottom: 0;">
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{midWidth}" height="{midHeight}" viewBox="0 0 {midWidth} {midHeight}">
    <defs>
      <pattern id="pattern-featured" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" viewBox="0 0 {midWidth} {midHeight}">
        <image width="{midWidth}" height="{midHeight}" href={baseImage}/>
      </pattern>
    </defs>
    <rect id="basetst4" width="{midWidth}" height="{midHeight}" rx="0" fill="url(#pattern-featured)"/>
  </svg>
</button>
<style>
  button{
    background-color: transparent;
    border-bottom: 2px inset;
  }
</style>
  