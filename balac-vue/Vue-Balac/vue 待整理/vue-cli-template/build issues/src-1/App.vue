<template>
	<div id="app">
		<usage-svg></usage-svg>
		{{msg}}
		<img src="./assets/images/photo.png" />
	</div>
</template>

<script>
	import UsageSvg from './components/svg/index.vue';
console.log( UsageSvg)
	export default {
		name: 'app',
		components: {
			UsageSvg
		},
		data () {
			return {
				msg: 'Welcome to Your Vue.js App'
			};
		}
	};
</script>