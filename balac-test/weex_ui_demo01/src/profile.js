console.log('==============: 开始');
import Vue from 'vue';
import weex from 'weex-vue-render';

weex.init(Vue);

const App = require('./pages/index/index.vue');
App.el = '#root';
new Vue(App);

console.log('==============: 结束');