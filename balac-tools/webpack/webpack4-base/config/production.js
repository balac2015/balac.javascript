/**
 * 生产环境：最重要的代码压缩，混淆:
 */
const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
 const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const prod = {
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),

        /**
         * 许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。
         * 如：当不处于生产环境中时，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。
         * 当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体用户的环境进行代码优化从而删除或添加一些重要代码
         * 可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量：
         */
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),

        // webpack-parallel-uglify-plugin 可以并行压缩代码，提升打包效率
        // 文档: https://github.com/gdborton/webpack-parallel-uglify-plugin
        // new WebpackParallelUglifyPlugin(
        //     {
        //         uglifyJS: {
        //             mangle: false,         // 是否混淆代码
        //             output: {
        //                 beautify: false,   // 代码压缩成一行 true为不压缩 false压缩
        //                 comments: false    // 去掉注释
        //             },
        //             compress: {
        //                 warnings: false,       //  在删除没用到代码时 不输出警告
        //                 drop_console: true,    //  删除console
        //                 collapse_vars: true,   // 把定义一次的变量，直接使用，取消定义变量
        //                 reduce_vars: true      // 合并多次用到的值，定义成变量
        //             }
        //         }
        //     }
        // )
    ]
};

module.exports = merge(base, prod);
