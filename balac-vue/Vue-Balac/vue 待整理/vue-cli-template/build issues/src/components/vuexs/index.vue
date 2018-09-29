<template>
	<div class="my-vuexs">

		<!--
	      $route.path 是当前路由对象的路径，会被解析为绝对路径
	      to 路由跳转地址
	    -->
	    <router-link v-if="$route.path !== '/my-vuexs/counter'"
	    	to="/my-vuexs/counter">vuex示例：Counter</router-link>

	    <router-view></router-view>	


	</div>
</template>