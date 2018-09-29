/*
	普通模板
	会出现开始的src加载成{{imageSrc}}报错，然后vue.js进行渲染后图片就正常显示
*/
<img src="{{ imageSrc }}" />

/*
	v-bind:src 指令写法
	会正常渲染，不会报错，当是当图片URL无效时候，会继续报错
*/
<img v-bind:src="imageSrc" />

/*
	v-bind:src结合new Image() 用默认图片处理无效图片
*/
<template>
	<!-- 加载渲染过程中用默认图片 -->
    <img v-bind:src="defaultImageSrc" />
</template>
<script>
export default {
    data () {
        return {
            //目标图片URL
            imageSrc : 'http://xxx/a/b/c.jpg',

            //无图片或图片加载失败后显示的默认图片
            defaultImageSrc : 'http://xxx/default.jpg'
        }
    },

    //vue.js渲染结束
    compiled () {
        let that = this

        //测试图片对象
        let testImg = new Image()
        testImg.src = this.imageSrc

        //如果目标图片加载成功，把默认图片替换成目标图片
        testImg.onload = function() {
            that.defaultImageSrc = imageSrc
        }
    }
}
</script>