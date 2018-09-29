<template>
	<transition>
		<loading-mask>
			<spinner />
		</loading-mask>
	</transition>
</template>

<script>
	import LoadingMask from './mask.vue'
	import spinner from './spinner.vue'

	export default {
		name: 'loading',
		components: {
			LoadingMask,
			spinner
		}
	}
</script>