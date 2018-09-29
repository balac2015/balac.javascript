<template>
	<div class="container">
		<p>About pAge</p>
		<nuxt-link to="/">GO to /</nuxt-link>
	</div>
</template>

<script>
	export default {
		asyncData () {
			return new Promise((resolve) => {
				setTimeout(resolve, 1000, {});
			});
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