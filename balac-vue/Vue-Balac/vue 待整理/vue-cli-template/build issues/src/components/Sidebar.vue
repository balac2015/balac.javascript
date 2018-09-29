<style>
	.nav {
		position: fixed;
		bottom: 0;
		max-width: 100%;
		width: 100%;
	}
</style>
<template>
	<nav id="nav" class="nav">
		<ul>
			<li>
				<!--路由跳转-->
				<router-link to="/my-components">组件实现</router-link>
			</li>
			<li>
				<router-link to="/home">首页</router-link>
			</li>
			<li>
				<router-link to="/my-vuexs">vuex实现</router-link>
			</li>
		</ul>
	</nav>
</template>