生产环境部署

    用打包工具

        process.env.NODE_ENV ，默认开发状态。使用打包工具时决定环境状态

        module.exports = {
            plugin:
                // 使用 webpack 的 DefinePlugin 来指定生产环境
                // 以便在压缩时可以让 UglifyJS 自动删除代码块内的警告语句
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: '"production"'
                    }
                })
            ]
        };

    预编译模板：把模板文件转换成 render 函数（单文件组件、vue-template-loader）

    提取组件 css：（vue-loader、vueify）

    跟踪运行时错误：（Vue.config.errorHandler 配置、错误跟踪服务）


单文件组件

    关注点分离

单元测试

    karma, 断言

TypeScript 支持
