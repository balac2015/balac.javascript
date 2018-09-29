import Loading from './components/loading/index.js';

const components = [
    Loading
];

const install = function (Vue, opts = {}) {
    Vue.prototype.$loading = Loading.service;
};

if (typeof window !== 'undefined' && window.Vue) {
    install(Vue);
}

module.exports = {
    install,
    Loading
};

module.exports.default = module.exports;