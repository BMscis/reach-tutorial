<script>
    export let position = "relative"
</script>
<div class="successicon" style="position: {position};left:0;right:0;bottom:0;top:0;"> 
    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle class="checkmark__circle" cx="12" cy="12" r="12" style="fill:none" />
        <path class="checkmark__check" d="M20.3,26.6,23.7,30l8-8" transform="translate(-14 -14)" style="fill:none" />
    </svg>
</div>
<style>
    * {
    padding: 0;
    margin: 0
}

.successicon {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
}

.checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: #7ac142;
    fill: none;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards
}

.checkmark {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: #fff;
    stroke-miterlimit: 10;
    margin: 10% auto;
    box-shadow: inset 0px 0px 0px #7ac142;
    animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both
}

.checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards
}

@keyframes stroke {
    100% {
        stroke-dashoffset: 0
    }
}

@keyframes scale {

    0%,
    100% {
        transform: none
    }

    50% {
        transform: scale3d(1.1, 1.1, 1)
    }
}

@keyframes fill {
    100% {
        box-shadow: inset 0px 0px 0px 30px #7ac142
    }
}
</style>