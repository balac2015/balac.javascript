import Vue from 'vue';
import balac from '../src/index.js';
import App from './app.vue';
console.log(balac)
Vue.use(balac);

Vue.config.debug = true;

const app = new Vue({
    // router: router,
    render: h => h(App)
}).$mount('#app');