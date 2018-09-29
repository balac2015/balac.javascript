import directive from './directive.js';
import service from './service.js';

export default {
    install (Vue) {
        Vue.use(directive);
        Vue.prototype.$loading = service;
    },
    directive,
    service
};