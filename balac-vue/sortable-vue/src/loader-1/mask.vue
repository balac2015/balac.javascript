<template>
	<div class="mask">
        <slot />   
    </div>
</template>

<style lang="scss" scoped>
.mask {
	position: absolute;
    z-index: 2000;
    background-color: hsla(0,0%,100%,.9);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity .3s;
}	
</style>