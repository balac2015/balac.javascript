import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import App from './App.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes
})

import Icon from './component/icon'     // tag-component
import test from './component/test'     // js-component 1
import Message from './component/message'    
// import Loading from './component/loading'

Vue.component(Icon.name, Icon)  // 标签形式调用：<icon>
// Vue.use(Loading.directive);     // 指令器形式调用：<div v-loading="true">
// Vue.prototype.$loading = Loading.service; // 服务方式调用：this.$loading.close()
Vue.prototype.$test = test;   // js 中调用：this.$message({})
Vue.prototype.$message = Message;

import store from './store'
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')