/**
 * 代码分割
 */

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var efile = 'split-mpa',
    ofile = 'dist-split-mpa';

module.exports = {
    mode: 'development',
    entry: {
        pageA: path.join(__dirname, efile, 'pageA'), // 引用utility1.js  utility2.js
        pageB: path.join(__dirname, efile, 'pageB'), // 引用utility2.js  utility3.js
        pageC: path.join(__dirname, efile, 'pageC')  // 引用utility2.js  utility3.js
    },
    output: {
        path: path.join(__dirname, ofile),
        filename: '[name].js'
    },

    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0 // This is example is too small to create commons chunks
                },
                'vendor-pageA': {
                    test: /vue|element-ui/,
                    chunks: 'initial',
                    name: 'vendor-pageA',
                    enforce: true
                },
                'vendor-pageB': {
                    test: /react/,
                    chunks: 'initial',
                    name: 'vendor-pageB',
                    enforce: true
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    },

    plugins: [
        new HtmlWebpackPlugin({})
    ]
};