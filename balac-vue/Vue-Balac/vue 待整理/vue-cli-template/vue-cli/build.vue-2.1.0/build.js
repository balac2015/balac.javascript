// https://github.com/shelljs/shelljs
require('./check-versions')()           // 检查 Node 和 npm 版本
require('shelljs/global')               // 使用了 shelljs 插件，可以让我们在 node 环境的 js 中使用 shell
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

console.log(                            //  输出提示信息 ～ 提示用户请在 http 服务下查看本页面，否则为空白页
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...') // 使用 ora 打印出 loading + log
spinner.start()                                 // 开始 loading 动画

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)// 拼接编译输出文件路径
rm('-rf', assetsPath)                           // 删除这个文件夹 （递归删除）
mkdir('-p', assetsPath)                         // 创建此文件夹
cp('-R', 'static/*', assetsPath)                // 复制 static 文件夹到我们的编译输出目录

webpack(webpackConfig, function (err, stats) {  // 开始 webpack 的编译
  spinner.stop()                                // 编译成功的回调函数
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
