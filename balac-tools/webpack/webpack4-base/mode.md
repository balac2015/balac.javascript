生产环境构建：development, production, testing

    NODE_ENV 是一个由 Node.js 暴露给执行脚本的系统环境变量。通常用于决定在开发环境与生产环境(dev-vs-prod)下，服务器工具、构建脚本和客户端 library 的行为。

    无法在构建脚本 webpack.config.js 中，将 process.env.NODE_ENV 设置为 "production"，请查看 #2537


1、线上和线下（通过 webpack-merge 做配置的合并）

    在生产环境和开发环境的配置是存在相同点，和不同点的，为了处理这个问题，会创建3个文件:

    webpack.base.js : 共同的配置

    webpack.dev.js : 在开发环境下（development）的配置

        实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server

    webpack.prod.js : 在生产环境下（production）的配置

        更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间


2、使用 source map

    为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码

    webpack 的 deltool 配置（https://webpack.docschina.org/configuration/devtool）

    在生产环境中启用 source map，因为它们对调试源码(debug)和运行基准测试(benchmark tests)很有帮助

    避免在生产中使用 inline-* 和 eval-* 因为它们可以增加 bundle 大小，并降低整体性能。


3、开发工具（代码发生变化后自动编译代码）

    1、观察者模式 webpack's Watch Mode：

        webpak --watch --config webpack.config.js

        缺点：需要手动刷新浏览器

    2、webpack-dev-server： 提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)

        webpack-dev-server --config webpack.config.js

    3、webpack-dev-middleware：是一个容器(wrapper)，它可以把 webpack 处理后的文件传递给一个服务器(server)

        webpack-dev-server 在内部使用了它，同时，它也可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求

        node server.js


3、模块热替换（Hot Module Replacement 或 HMR）

    是 webpack 提供的最有用的功能之一。它允许在运行时更新各种模块，而无需进行完全刷新。

    1、启用 HMR

        如果使用了 webpack-dev-middleware 而没有使用 webpack-dev-server，请使用 webpack-hot-middleware package 包，以在自定义服务或应用程序上启用 HMR。

        可以通过命令来修改 webpack-dev-server 的配置：webpack-dev-server --hotOnly。

    2、通过 node.js api

    3、HRM 修改样式表

        借助于 style-loader 的帮助，CSS 的模块热替换实际上是相当简单的。当更新 CSS 依赖模块时，此 loader 在后台使用 module.hot.accept 来修补(patch) <style> 标签。

资源

    JavaScript source map 功能：http://blog.teamtreehouse.com/introduction-source-maps

    webpack source map 选项：https://doc.webpack-china.org/configuration/devtool

    webpack-dev-server 配置：https://doc.webpack-china.org/configuration/dev-server

    模块热替换（hot module replacement）：https://doc.webpack-china.org/guides/hot-module-replacement    


split css

    ExtractTextPlugin 将 CSS 分离成单独的文件

    disable 选项可以和 --env 标记结合使用，以允许在开发中进行内联加载，推荐用于热模块替换和构建速度。

cli 替代选项

    webpack -p 将自动调用 webpack --define process.env.NODE_ENV="'production'"

    --optimize-minimize 标记将在后台引用 UglifyJSPlugin
