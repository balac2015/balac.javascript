Vue.config.  // 全局配置对象，可在启动之前修改

    .silent = boolean;                  // 取消 Vue 所有日志与警告

    .optionMergeStrategies._my_option = {[key: string]: Function} // 自定义选项的合并策略

    .devtools = boolean;                // 是否允许 vue-devtools 检查代码。默认开发板 true，生产版 false

    .errorHandler = Function;           // 组件的渲染和观察期间的错误追踪服务

    .ignoredElements = Array<string>    // 忽略在 Vue 之外自定义的元素

    .keyCodes = [key: string]: number | Array<number>   // 给 v-on 自定义键位别名


Vue.        // 全局 API

    Vue.extend( options );              // 使用基础 Vue 构造器，创建一个“子类”

    Vue.nextTick([callback, context]);  // 在下次 DOM 更新循环结束之后执行延迟回调

    Vue.set(object, key, value);        //

    Vue.delete(object, key);

    Vue.directive(id, [definition]);

    Vue.filter(id, [definition]);

    Vue.component(id, [definition]);

    Vue.use({object | Function});

    Vue.mixin()
