import directive from './directive.js'
import service from './service.js'
import view from './loading.vue'

// export default {
//     directive,
//     service,
//     install (Vue) {
//         Vue.use(directive)
//         Vue.prototype.$loading = service
//     }
// }
/*
调用方式：v-loading="loading" loading = true

v-loading.body="loading" loading=true
*/

export { view, service, directive }