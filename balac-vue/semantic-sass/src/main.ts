import Vue from 'vue'
// import App from './pages/button.vue'

import App from './postcss-test/pcs.vue'

Vue.config.productionTip = false
import './definitions/elements/button.css'

new Vue({
  render: h => h(App)
}).$mount('#app')
