/**
 * 开发环境
 */
 const path = require('path');
 const webpack = require('webpack');
 const merge = require('webpack-merge');
 const base = require('./webpack.base');

 const dev = {
     // 开发环境中启动一个devServer静态文件服务器，预览项目
     devServer: {
         contentBase: path.join(__dirname, './dist'),// 静态文件地址
         port: 8080,            // 端口号
         host: 'localhost',     // 主机
         overlay: true,         // 如果出错，则在浏览器中显示出错误
         compress: true,        // 服务器返回浏览器的时候是否启动gzip压缩
         open:true,             // 打包完成自动打开浏览器
         hot: true,             //  模块热替换 需要 webpack.HotModuleReplacementPlugin 插件
         inline: true,          //  实时构建
         progress: true,        //  显示打包进度
     },

     // 生成代码映射，查看编译前代码，利于找bug
     devtool: 'inline-source-map',

     plugins: [
         new webpack.HotModuleReplacementPlugin(),
         // 显示模块的相对路径
         new webpack.NamedModulesPlugin(),
     ]
 }

 // 引入base配置文件，用merge去合并配置。
 module.exports = merge(base, dev);
