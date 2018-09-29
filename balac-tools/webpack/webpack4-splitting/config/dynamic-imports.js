/**
 * 动态导入 dynamic imports
 *
 * 动态导入：1、使用符合 ECMAScript 提案 的 import() 语法（优先）
 *      2、使用 webpack 特定的 require.ensure
 *
 * import() 调用会在内部用到 promises，旧浏览器用 polyfill 库：es6-promise 或 promise-polyfill 来 shim Promise
 * es6-promise:  https://github.com/stefanpenner/es6-promise
 * promise-polyfill: https://github.com/taylorhakes/promise-polyfill
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	output: {
		// chunkFilename，它决定非入口 chunk 的名称
		// 在 .js 中对应 import(/* webpackChunkName: "lodash" */ 'lodash') 
		chunkFilename: '[name].bundle.js',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},

	mode: 'development',
	context: path.resolve(__dirname, '../src/dynamic-imports'),
	entry: {
		index: './index'
	},
	plugins: [
		new HtmlWebpackPlugin()
	]
};