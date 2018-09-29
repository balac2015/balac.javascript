var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

// webpack 版本
var webpackMajorVersion = require('webpack/package.json').version;

const config = {
    entry: {
        main: path.join(__dirname, '../src/main.js')
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].[hash:8].js'
    },
    plugins: [
        new CleanWebpackPlugin(['./dist']),

        // 默认会生成 index.html
        new HtmlWebpackPlugin()
    ]
};
