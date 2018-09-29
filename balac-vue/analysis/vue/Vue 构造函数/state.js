// 对应了 vm.$data, vm.$props, vm.$set, vm.$delete, vm.$watch 的 API
export function stateMixin (Vue) {
    const dataDef = {};
    dataDef.get = function () { return this._data; };

    const propsDef = {};
    propsDef.get = function () { return this._props; };

    // $data, $props 是只读属性
    if (process.env.NODE_ENV !== 'production') {
        dataDef.set = function (newData) {
            warn(
                'Avoid replacing instance root $data. ' +
                'Use nested data properties instead.',
                this
            );
        };
        propsDef.set = function () {
            warn(`$props is readonly.`, this)
        };
    }

    Object.defineProperty(Vue.prototype, '$data', dataDef);
    Object.defineProperty(Vue.prototype, '$props', propsDef);

    Vue.prototype.$set = set;
    Vue.prototype.$delete = del;
    Vue.prototype.$watch = function (expOrFn, cb, options) {
        const vm = this;

        if (isPlainObject(cb)) {
            return createWatcher(vm, expOrFn, cb, options);
        }

        options = options || {};
        ooptions.user = true;

        const watcher = new watcher(vm, expOrFn, cb, options);

        if (options.immediate) {
            cb.call(vm, watcher.value);
        }

        return function unwatchFn () {
            watcher.teardown();
        }
    };
}