import Vue from 'vue';
import router from './router';
import App from './usage_vue.vue';

new Vue({
	el: '#app',
	router,
	render: h => h(App)
});