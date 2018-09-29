import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './App.vue';
import confRouter from './router';
import confStore from './store';

Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
	mode: 'history',	// history 路由不带 #，'hash' 路由中带 #
	confRouter
});

const store = new Vuex.Store(confStore);

/**
 * 模块的动态创建
 * 模块的状态：store.state.myModule
 * 模块动态注册功能可以让其他 Vue 插件为了应用的 store 附加新模块，以此来分割 Vuex 的状态管理（如 vuex-router-sync 插件可以集成 vue-router 与 vuex，管理动态模块的路由状态）
 * 可以使用 store.unregisterModule(moduleName) 动态地卸载模块。（不能使用此方法卸载静态模块-在创建 store 时声明的模块）
 */
store.registerModule('myModule', {});

new Vue({
	el: '#app',   // 会替换指定的标签，el 不能设置在 html, body 了
  	router,       // 组件中的 $route 对象
  	store,        // 组件中的 $store 对象
	render: h => h(App)
})
