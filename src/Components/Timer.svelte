<button class="gg-alarm"></button>
<style>
.gg-alarm {
background:
linear-gradient( to left,
black 5px, transparent 0)
no-repeat 4.5px 6px/5px 2px,
linear-gradient( to left,
black 7px, black 0)
no-repeat 4.5px 2px/2px 6px;
box-sizing: border-box;
position: absolute;
top: 12px;
right: 12px;
display: block;
width: 16px;
height: 16px;
border-radius: 100%;
border: 2px solid black;
transform: scale(var(--ggs,1));
box-shadow: 0 0 0 2px
}

.gg-alarm::after,
.gg-alarm::before {
 content: "";
 display: block;
 box-sizing: border-box;
 position: absolute;
 width: 6px;
 height: 2px;
 background: black;
 top: -4px
}

.gg-alarm::before {
 left: -5px;
 transform: rotate(-42deg)
}

.gg-alarm::after {
 transform: rotate(42deg);
 right: -5px
} 
</style>