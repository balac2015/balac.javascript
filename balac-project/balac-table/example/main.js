import Vue from 'vue';
import ElementUI from 'element-ui';

import router from '@/router';
import App from './App.vue';

// import MainHeader from '@/components/header.vue';
import SideNav from '@/components/side-nav';
// import FooterNav from '@/components/footer';

import './theme-chalk/src/index.scss';
Vue.use(ElementUI);

import { ThemePicker } from 'element-ui';

Vue.use(ThemePicker)

Vue.component('side-nav', SideNav);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
