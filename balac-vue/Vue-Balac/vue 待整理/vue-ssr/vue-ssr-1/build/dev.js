const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.conf.js');
const compiler = webpack(webpackConfig);

// webpack的nodeAPI里面提供2个方法，一个run， 一个是watch，开发的时候用watch，要上线了得用run这个方法
compiler.watch({}, (err, stats) => {

	if (err === null && stats.compilation.errors.length === 0) {
		console.log('编译成功');
	} else {
		console.log('编译出现错误...')
        console.log(stats.compilation.errors[0].message)
	}
});