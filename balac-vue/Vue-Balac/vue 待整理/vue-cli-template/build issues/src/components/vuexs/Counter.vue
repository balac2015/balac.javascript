<template>
	<div class="counter">

		Clicked: {{ $store.state.count }} times, count is {{ evenOrOdd }}.

		<div>
			<button @click="increment">+</div>
			<button @click="decrement">-</div>
			<!-- <button @click="incrementIfOdd">Increment if odd</button>
    		<button	@click="incrementAsync">Increment async</button>-->
		</div>
	

	</div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex';

export default {
	computed: mapGetters([
		'evenOrOdd'
	]),
	methods: mapActions([
		'increment',
		'decrement',
		'incrementIfOdd',
		'incrementAsync'
	])
};

</script>