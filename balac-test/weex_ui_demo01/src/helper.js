import Vue from 'vue';
import weex from 'weex-vue-render';

weex.init(Vue);

const App = require('./pages/helper/index.vue');
App.el = '#root';
new Vue(App);
