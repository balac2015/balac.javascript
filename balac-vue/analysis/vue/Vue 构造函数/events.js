export function eventsMixin (Vue) {
    Vue.prototype.$on = function (event, fn) {};
    Vue.prototype.$once = function (event, fn) {};
    Vue.prototype.$off = function (event, fn) {};
    Vue.prototype.$emit = function (event) {};
};