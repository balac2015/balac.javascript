const path = require('path');

module.exports = {

	entry: './src/index.js',

	output: {
		filename: 'bundle.js', // '[name].[hash].js',
		path: path.resolve(__dirname, 'dist')
	},

	devServer: {
	    contentBase: path.join(__dirname, "dist"), //静态文件根目录
	    port: 9090, // 端口
	    host: 'localhost',
	    overlay: true,
	    compress: true // 服务器返回浏览器的时候是否启动gzip压缩
	},

	// module: {
	//     rules: [
	//     	{
	//     		test: /\.css$/,
	//     		use: 'css-loader'
	//     	}
	//     ]
	// }


};