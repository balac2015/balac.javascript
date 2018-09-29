const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs-extra');
const rootPath = path.resolve(__dirname, '../');

// eslint-disable indent
const vueLoader = {
	loaders: {
		'less': [
			{
				'loader': path.join(rootPath, 'node_modules/extract-text-webpack-plugin/loader.js'),
				'options': {
					'omit': 1,
					'remove': true
				}
			},
			{
				'loader': 'vue-style-loader'
			},
			{
				'loader': 'css-loader',
				'options': {
					'minimize': true,
					'sourceMap': true
				}
			},
			{
				'loader': 'less-loader',
				'options': {
					'sourceMap': true
				}
			}
		]
	}
};

module.exports = {
		entry: path.resolve(rootPath, 'src/main.js'),
		output: {
			path: path.join(rootPath, 'dist/client'),
			publicPath: '../',
			filename: 'script/[name].js'
		},
		devtool: '#eval-source-map',
		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: 'vue-loader',
					options: vueLoader
				},
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/
				},
				{
					 test: /\.(swf)$/,
                	loader: `url-loader?limit=10000&name=/script/[name].[ext]`
				},
				{
					test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf)$/,
                	loader: `url-loader?limit=10000&name=/images/[name].[ext]`
				},
				{
					test: /\.less/,
					use: [
						{
							loader: 'less-loader'
						}
					]
				},
				{
					test: /\.css/,
					loader: 'style-loader!css-loader'
				}
			]
		},
		resolve: {
			alias: {
				'vue$': 'vue/dist/vue.common.js',		// alias里面其他的可以不要，但是vue是必填，就是'vue$': 'vue/dist/vue.common.js'，要不然会报错，因为你import vue的时候，不写这个引用文件不是同一个，只有vue2里会出这个问题，vue1不会
				'components': path.join(rootPath, '/src/client/components'),	// 定义文件路径， 加速打包过程中webpack路径查找过程
				'lib': path.join(rootPath, '/src/lib'),
				'less': path.join(rootPath, '/src/less'),
				'@': path.join(rootPath)
			},
			extensions: ['.js', '.less', '.vue', '*', '.json']					// 可以不加后缀, 直接使用 import xx from 'xx' 的语法
		},
		plugins: [
			// 把.vue文件里面的style都打包到一个css文件中
			new ExtractTextPlugin('css/[name].css'),

			//  将 vue 等框架/库进行单独打包, 并输入到vendors.js文件当中
			new webpack.optimize.CommonsChunkPlugin({
				names: ['vendors']
			})
		]
	};