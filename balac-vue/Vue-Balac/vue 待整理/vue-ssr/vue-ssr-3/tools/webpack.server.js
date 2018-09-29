const path = require('path');
// 获取项目根目录
const projectRoot = path.resolve(__dirname, '..');

module.exports = {
	target: 'node',		// !different 这里必须是node，因为打包完成的运行环境是node
	entry: path.join(projectRoot, 'src/server-index.js'),
	output: {
		libraryTarget: 'commonjs2',		// !different
		path: path.join(projectRoot, 'build'),
		filename: 'bundle.server.js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: projectRoot,
				exclude: /node_modules/		// // 这里会把node_modules里面的东西排除在外，提高打包效率
			}
		]
	}
};