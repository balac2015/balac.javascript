loaders（webpack 自身只能处理 JavaScript）

    使用 loader 来预处理文件。允许打包除 JavaScript 之外的任何静态资源。可以使用 Node.js 来很简单地编写自己的 loader。

    本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。

    使用 loader

        配置（推荐）：在 webpack.config.js 文件中指定 loader。

        内联：在每个 import 语句中显式指定 loader。

        CLI：在 shell 命令中指定它们。

资源：

    https://webpack.docschina.org/loaders/

    https://github.com/webpack-contrib/awesome-webpack#loaders


    文件

    JSON

    转换编译 transpiling

    模板 templating

    样式

    清理和测试 linting && testing

    框架 frameworks

    	vue-loader

    	polymer-loader
