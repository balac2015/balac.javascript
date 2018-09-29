相当于 webpack 的多页面构建。参考：vuex, vue-router 中的的 examples

issues:

    1、new Vue() 时，绑定 template 报错：
        [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.(found in )

        解决方案：（默认 npm 包导出的是运行时构建，为了使用独立构建，在 webpack 配置中添加别名）

            运行时构建不包含模板编译器，因此不支持 template 选项，只能用 render 选项，但即使使用运行时构建，在单文件组件中也依然可以写模板，因为单文件组件的模板会在构建时预编译为 render 函数。（官方api 解释）

            resolve: {
                alias: {
                    'vue$': 'vue/dist/vue.common.js'
                }
            }

    2、

wiki:

    1、vue 的启动方式：看 todo