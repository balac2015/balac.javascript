/**
 * 基于入口提取 css
 */
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, '..', 'src/main'),
        about: path.resolve(__dirname, '..', 'src/about')
    },
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: '[name].[hash].js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                mainStyles: {
                    name: 'main',
                    test: (m, c, entry = 'main') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true
                },
                barStyles: {
                    name: 'about',
                    test: (m, c, entry = 'about') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'main.[hash].html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: 'about.[hash].html',
            chunks: ['about']
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        })
    ]
};
