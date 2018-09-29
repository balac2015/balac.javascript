export function lifecycleMixin (Vue) {
    Vue.prototype._update = function (vnode, hydrating) {};
    Vue.prototype.$forceUpdate = function () {};
    Vue.prototype.$destory = function () {};
};