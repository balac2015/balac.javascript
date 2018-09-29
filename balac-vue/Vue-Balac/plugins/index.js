MyPlugin.install = function (Vue, options) {
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function () {
        // 一些逻辑……
    }

    // 2. 添加一个全局资源(asset)
    Vue.directive('my-directive', {
        bind(el, binding, vnode, oldVnode) {
            // 一些逻辑……
        }
      ...
    })

    // 3. 注入一些组件选项
    Vue.mixin({
        created: function () {
            // 一些逻辑……
        }
      ...
    })

    // 4. 添加一个实例方法
    Vue.prototype.$myMethod = function (methodOptions) {
        // 一些逻辑……
    }
}

Vue.use(MyPlugin, { someOption: true });