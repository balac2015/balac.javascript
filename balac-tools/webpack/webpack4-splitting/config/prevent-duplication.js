/**
 * 防止重复(prevent duplication)
 * splitChunks 将公共依赖提取到现有 chunk 或新的 chunk
 * 其它分离插件：
 * 	 mini-css-extract-plugin 分离 css（https://webpack.js.org/plugins/mini-css-extract-plugin/）
 * 	 bundle-loader 用于分离代码和延迟加载生成的 bundle。（https://webpack.js.org/loaders/bundle-loader/）
 * 	 promise-loader 类似于 bundle-loader ，但是使用的是 promises。（https://github.com/gaearon/promise-loader）
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},

	mode: 'development',

	context: path.resolve(__dirname, 'src'),

	entry: {
		index: './index.js',
		another: './another-module.js'
	},

	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
		new HtmlWebpackPlugin()
	]
};