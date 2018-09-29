var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var buildPath = (_path) => {
    return path.join(__dirname, '../', _path);
};

const base = {
    mode: 'development',

    entry: {
        main: buildPath('src/main.js'),
        about: buildPath('src/about.js')
    },

    output: {
        path: buildPath('dist'),
        filename: '[name].js'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            filename: 'main.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: 'about.html',
            chunks: ['about']
        })
    ]
};

module.exports = base;
