var path = require('path');
var gulp = require('gulp');

// webpack
module.exports = {
	context: path.join(__dirname, 'app'),
	entry: './app',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader!postcss-loader'	// postcss-loader 用来对.css 文件进行处理
			}
		]
	},
	postcss: function () {
		return [
			require('autoprefixer')	// 加载 Autoprefixer 插件。
		];
	}
};

// gulp
gulp.task('css', function () {
	var postcss = require('gulp-postcss');	// 使用 gulp-postcss 来集成 PostCSS

	return gulp.src('app/**/*.css')
		.pipe(postcss([require('autoprefixer')]))
		.pipe(gulp.dest('dist/'));			// CSS 文件由 gulp-postcss 处理之后，产生的结果写入到 dist 目录
});

// grunt
module.exports = function (grunt) {
	grunt.initConfig({
		postcss: {
			options: {
				processors: [
					require('autoprefixer')()
				]
			},
			dist: {
				src: 'app/**/*.css',
				expand: true,
				dest: 'dist'
			}
		}
	});
	// 使用 grunt.loadNpmTasks 方法来加载插件
	grunt.loadNpmTask('grunt-postcss'); // 使用 grunt-postcss 来集成 PostCSS
}