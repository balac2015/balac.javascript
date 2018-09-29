Vue-Devtools（调试应用）：https://github.com/vuejs/vue-devtools#vue-devtools

CND：<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>

NPM：$ npm install vue  # 最新稳定版本

    热重载、保存时代码检查、可直接用于生成环境的构建配置

    node.js、构建工具

不同构建版本：

    Full 完整版本：包含编译器(compiler)和运行时(runtime)的构建版本

    Compiler 编译器：负责将模板字符串编译成 JavaScript render 函数的代码。

    Runtime 运行时：负责创建 Vue 实例(creating Vue instances)、渲染(rendering)和修补虚拟 DOM(patching virtual DOM) 等的代码。基本上，等同于完整版本减去编译器。

        // 编译器版本，在客户端编译模板（例如，向 template 选项传入一个字符串，或者需要将模板中的非 DOM 的 HTML 挂载到一个元素）
        new Vue({
            template: '<div>{{ hi }}</div>'
        });

        // 运行时版本
        new Vue({
            render (h) {
                return h('div', this.hi)
            }
        });

        用 vue-loader、vueify 时，*.vue 中的模板会在构建时(build time)预编译(pre-compile)为 JavaScript。最终生成的 bundle 中不再需要编译器(compiler)，可以直接使用只含有运行时的构建版本(runtime-only)。

        运行时构建版本（runtime-only）比完整构建版本（full-build）轻量 30%


    UMD 版本，能够直接在浏览器中通过 <script> 标签使用，vue.js（完整版本）

    CommonJS 版本，用于较早期的打包器(bundler)（例如 browserify 或 webpack 1 等）中，打包器的默认文件（pkg.main）只有 vue.runtime.common.js

    ES Module 版本，用于现代打包器（例如 webpack 2 或 rollup 等）中，打包器默认文件（pkg.module）会只含 vue.runtime.esm.js

        module.exports = {
            resolve: {
                alias: {
                    'vue$': 'vue/dist/vue.esm.js'   // // 在 webpack 1 中使用 'vue/dist/vue.common.js'
                }
            }
        };


开发环境模式、生成环境模式

    CommonJS、ES Module 模块构建版本适用于打包器，不需要 vue 的压缩版本

    UMD 构建版本必须配置 vue 的环境模式，未压缩用开发环境、压缩用生产环境

    
