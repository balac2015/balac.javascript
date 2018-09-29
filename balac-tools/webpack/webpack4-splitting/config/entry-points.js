/**
 * 入口起点 entry points
 * 最简单、最直观的分离代码方式。（手动配置较多）
 * 问题：1、如果入口 chunks 之间包含重复的模块，那些重复模块都会被引入到各个 bundle 中。
 *      2、不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码。
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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