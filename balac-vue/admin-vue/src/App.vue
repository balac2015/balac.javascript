<template>
	<div id="app" class="app">
		<v-sidebar :menus=" menus " />
		<main class="main">
			<v-header />
			<router-view />
			<v-footer />
		</v-footer>		
	</div>
</template>

<script>
	import VHeader from './components/Header.vue'
	import VSidebar from './components/Sidebar.vue'
	import VFooter from './components/Footer.vue'

	export default {
		components: {
			VHeader,
			VSidebar,
			VFooter
		},
		computed: {
			menus () {
				return this.$store.state.modules
			}
		}
	}
</script>