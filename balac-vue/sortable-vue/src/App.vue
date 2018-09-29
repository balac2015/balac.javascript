<template>
			
	<div class="app">
		<!-- <spin /> -->
		<!-- <loader /> -->
		<!-- <div class="text-directive" v-loading>哈哈</div> -->
		<div class="text-directive">哈哈</div>
	</div>

</template>

<script>
	import Vue from 'vue'
	// import Spin from './spinner/spin.vue'
	// import Loader from './loaders.css/demo.vue'
	// import LoadingView from './loader-1/loading.vue'
	import { view as LoadingView, directive as LoadingDirective, service as LoadingService } from './loader-1'

	console.log( LoadingService )
	Vue.prototype.$loading = LoadingService

	export default {
		name: 'app',
		components: {
			// Spin,
			// Loader,
			LoadingView
		},
		directives: {
			loading: LoadingDirective
		},
		mounted () {
			this.$loading({el: this.$el})
		}
	}
</script>

<style>
	body {
		background: #42b983;
	}
</style>