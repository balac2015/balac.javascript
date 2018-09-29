<template>
	<div class="container">
		<p>自定义页面加载进度：Hello {{ name }}</p>
		<nuxt-link to="/about">Go to /about</nuxt-link>

		<h2>自定义路由：Users</h2>
		<ul class="users">
			<li v-for="user in users" :key="user.id">
				<nuxt-link :to=" '/users/' + user.id ">{{ user.name }}</nuxt-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		// asyncData () {
		// 	return new Promise((resolve) => {
		// 		setTimeout(resolve, 1000, {name: 'world'})
		// 	})
		// }
		async asyncData () {
			const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
			return { users: data }
		},
		data () {
			return {
				name: 'world'
			};
		}
	}
</script>

<style scoped>
	.container {
		font-size: 20px;
		text-align: center;
		padding-top: 100px;
	}
</style>