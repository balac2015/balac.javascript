export function renderMixin (Vue) {
    // 在 Vue.prototype 上添加一系列方法
    installRenderHelpers(Vue.prototype);

    Vue.prototype.$nextTick = function (fn) {};
    Vue.prototype._render = function () {};
};