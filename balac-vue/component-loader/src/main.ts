import Vue from 'vue'
import App from './test.jsx' 

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
