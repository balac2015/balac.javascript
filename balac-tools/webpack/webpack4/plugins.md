/**
 * plugins 插件，可以用于执行范围更广的任务。loader 被用于转换某些类型的模块
 * 插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。（可以用来处理各种各样的任务）
 */

const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

const config = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};

module.exports = config;
