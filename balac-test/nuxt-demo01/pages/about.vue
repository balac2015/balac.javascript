<template>
	<div>
		<p>{{ name }}</p>
		<nuxt-link to="/">Home page</nuxt-link>
	</div>
</template>

<script>
export default {
	asyncData () {
		return {
			name: process.static ? 'static' : (process.server ? 'server' : 'client')
		};
	},
	head: {
		title: 'about page'
	}
}
</script>