const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.join(__dirname, '../'),

    entry: {
        app: './src/main.js'
    },

    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].[hash:8].js'
    },

    plugins: [
        new CleanWebpackPlugin(['../dist']),
        new HtmlWebpackPlugin({
            title: 'Product'
        })
    ]
};
