const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '../src/main.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js'
    },

    plugins: [
        // 也可以在命令行接口中使用 --optimize-minimize 标记，来使用 UglifyJsPlugin
        new UglifyJSPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management'  // 设定 HtmlWebpackPlugin
        })
    ]
};
