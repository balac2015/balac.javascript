<template>
	<header class="header">
		<nav class="inner">
			<router-link to="/">
				<img class="logo" src="../assets/logo.png" alt="logo" />
			</router-link>
			<router-link v-for=" category in categories " :to=" category.path" :key=" category.id ">
				{{ category.title }}
			</router-link>
			<a class="github" href="" target="_blank" rel="noopener">
				Built with vue.js
			</a>
		</nav>
	</header>
</template>

<script>
	import Category from '../config/category.js';

	export default {
		name: 'navigation',
		data () {
			return {
				categories: Category.map(category => ({
					path: '/' + category.title,
					title: category.name,
					id: category.id
				}))
			};
		}
	}
</script>

<style scoped>
	.header {
		background-color: #ff6600;
		position: fixed;
		z-index: 999;
		height: 55px;
		top: 0;
		left: 0;
		right: 0;
	}
	.header .inner {
		max-width: 800px;
		box-sizing: border-box;
		margin: 0 auto;
		padding: 15px 5px;
	}
	.header a {
		flex: 1;
		display: inline-block;
		vertical-align: middle;
		font-weight: 300;
		letter-spacing: .075em;
		margin-right: 1em;
		line-height: 24px;
		transition: color .15s ease;
		color: rgba(255, 255, 255, .8);
	}
	.header a:hover {
		color: #fff;
	}
	.header a.router-link-active {
		color: #fff;
		font-weight: 400;
	}
	.header .github {
		color: #fff;
		font-size: .9em;
		margin: 0;
		float: right;
	}
	.header .logo {
		width: 24px;
		margin-right: 10px;
		display: inline-block;
		vertical-align: middle;
	}
	@media (max-width: 860px) {
		.header .inner {
			padding: 15px 30px;
		}
	}
	@media (max-width: 600px) {
		.header .inner {
			padding: 15px;
		}
		.header a {
			margin-right: 1em;
		}
		.header .github {
			display: none;
		}
	}
</style>