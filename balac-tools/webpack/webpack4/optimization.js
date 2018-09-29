const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    // webpack4新增的，主要是用来自定义一些优化打包策略。
    optimization: {
        // bundle 最小化，UglifyjsWebpackPlugin 插件，production 下默认启用
        minimize: false,

        // UglifyjsWebpackPlugin instances.（https://webpack.js.org/plugins/uglifyjs-webpack-plugin/）
        minimizer: [
            new UglifyJsPlugin({ /* your config */ })
        ],

        // 动态导入的通用策略，SplitChunksPlugin 插件（https://webpack.js.org/plugins/split-chunks-plugin/）
        splitChunks: object,    // (splitChunks)

        runtimeChunk: object | string | boolean,

        noEmitOnErrors: boolean,

        nodeEnv: string | bool.false,
    }
};

var splitChunks = {
    // chunks (默认是async) ：initial、async和all
    chunks: "async", // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
    
    // minSize(默认是30000)：形成一个新代码块最小的体积
    minSize: 30000, // 最小尺寸，30000

    // minChunks（默认是1）：在分割之前，这个代码块最小应该被引用的次数（译注：保证代码块复用性，默认配置的策略是不需要多次引用也可以被分割）
    minChunks: 1, // 最小 chunk ，默认1

    // maxAsyncRequests（默认是5）：按需加载时候最大的并行请求数。
    maxAsyncRequests: 5, // 最大异步请求数， 默认5

    // maxInitialRequests（默认是3）：一个入口最大的并行请求数
    maxInitialRequests: 3, // 最大初始化请求书，默认3
    automaticNameDelimiter: '~',// 打包分隔符
    name: function () { }, // 打包后的名称，此选项可接收 function
    cacheGroups: { // 这里开始设置缓存的 chunks

        // priority ：缓存组打包的先后优先级。
        priority: 0, // 缓存组优先级
        vendor: { // key 为entry中定义的 入口名称
            chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是async) 
            
            // test： 用于控制哪些模块被这个缓存组匹配到。原封不动传递出去的话，它默认会选择所有的模块。可以传递的值类型：RegExp、String和Function
            test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk

            // name(打包的chunks的名字)：字符串或者函数(函数可以根据条件自定义名字)
            name: "vendor", // 要缓存的 分隔出来的 chunk 名称 
            minSize: 30000,
            minChunks: 1,
            enforce: true,
            maxAsyncRequests: 5, // 最大异步请求数， 默认1
            maxInitialRequests: 3, // 最大初始化请求书，默认1
            reuseExistingChunk: true // 可设置是否重用该chunk
        }
    }
};

