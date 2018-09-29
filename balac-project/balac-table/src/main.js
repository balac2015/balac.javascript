import Vue from 'vue';

import App from '@/App.vue';
import router from '@/router';
import ElementUI from 'element-ui';
import './theme-chalk/index.css';
Vue.use(ElementUI);

console.log( ElementUI.version )

import demoBlock from '@/components/demo-block.vue';
import MainFooter from '@/components/footer.vue';
import MainHeader from '@/components/header.vue';
import SideNav from '@/components/side-nav';
import FooterNav from '@/components/footer';

Vue.component('demo-block', demoBlock);
Vue.component('main-footer', MainFooter);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);
Vue.component('footer-nav', FooterNav);

new Vue({
    // el: '#app',
    router,
    render: h => h(App)
}).$mount('#app');
