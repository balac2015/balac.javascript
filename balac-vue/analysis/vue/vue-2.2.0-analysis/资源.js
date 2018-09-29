

分析目标：

    对 Vue2 的基础运行机制有所了解

    Vue2 中数据绑定的实现方式

    Vue2 中对 Virtual DOM 机制的使用方式

源码初见：

    项目构建配置文件为 build/config.js，定位 vue.js 对应的入口文件为 src/entries/web-runtime-with-compiler.js，基于 rollup 进行模块打包。

vue 构造函数 src/core/instance/index.js

vue 公共接口：src/core/index.js

        asset相关接口：配置在 src/core/config.js 中    

Vue 启动过程：

    new Vue({ ... }) 后，._init() 的最后调用了 .$mount() 来启动

    web-runtime-with-compiler.js, web-runtime.js 中定义了 Vue.prototype.$mount()

    最终调用了 ._mount() ，在 src/core/instance/lifecycle.js

    Vue.prototype._mount(el, hydrating) 简化逻辑后的代码：

        vm = this;
        vm._watcher = new Watcher(vm, updateComponent)

Watch: src/core/observer/watcher.js

