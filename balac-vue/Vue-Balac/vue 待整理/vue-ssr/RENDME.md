

前端用 vue，后端渲染用 vue-ssr

SEO、首屏渲染

client 端渲染，在 server 端取数据传递给前端


client 端渲染：vue-ssr-1
	
	postcss.config.js这个文件很重要，vue-loader和这个文件，能解决css前缀问题（这里用的是webpack2的解决方案，目测为唯一的解决方案，webpack1有其他解决方案）。

vue-ssr-2
	
	vuex 的使用

vue-ssr-3
	
	简单的 server-render	

vue-ssr-4 
	
	完整项目

		怎么取数据：首先得先通过node端来获取数据, 然后放到vuex里面保存起来, 放到Context中, 达到前后端共享数据的目的	


服务器端渲染


	即然数据在服务器端已经取到了，为什么还要共享到前端？
		
		vue-ssr 不能渲染出 js，只能是 HTML+CSS，也就是说服务器端使用 vue-ssr 渲染出来的返回到浏览器的也只能是 HTML+CSS。（没有 js 的交互）
		

	vue-ssr 的前后端共用同一套vue文件，也就是说一个.vue文件
		
		后端从vuex里面取到数据之后，对<template>里面的HTML使用vue的语法进渲染，最终渲染成真正的HTML，对<style>里面的内容，使用loader，抽取成css，所以服务端渲染的成果是HTML+CSS；

		前端也是从vuex里面取到数据，前端的渲染主要做2件事，1.拿到数据，使用virtual-dom进行预渲染，然后和服务端渲染出来的进行比对，比对两边渲染的内容是不是一致的；2.对DOM元素的事件进行绑定，也就是回答的问题，事件在这块进行的处理。


	vuex 解决的问题：兄弟组件间通信的问题



vue-ssr（Vue 服务端渲染）
	
	参考：https://juejin.im/entry/58c9f6b6ac502e0058854686


























