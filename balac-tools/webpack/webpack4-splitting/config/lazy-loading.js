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
	context: path.resolve(__dirname, 'src'),
	entry: {
		index: './index'
	},
	plugins: [
		new HtmlWebpackPlugin()
	]
};