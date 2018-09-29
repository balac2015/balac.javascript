import service from './service.js'
import directive from './directive.js'

export default {
    install (Vue) {
        Vue.use(directive);
        Vue.prototype.$tip = service;
    },
    directive,
    service
}
