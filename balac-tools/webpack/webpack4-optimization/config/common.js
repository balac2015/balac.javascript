/**
 * 提取公共的 js 文件
 * webpack4中废弃了webpack.optimize.CommonsChunkPlugin插件，用新的配置项替代
 */

 module.exports = {
     entry: './src/index.js',
     output: {
         path: path.join(__dirname, './dist'),
         filename: 'main.js'
     },

     // 把多次import的文件打包成一个单独的common.js
     optimization: {
         splitChunks: {
             cacheGroups: {
                 commons: {
                     chunks: 'initial',
                     minChunks: 2,
                     maxInitialRequest: 5,
                     minSize: 2,
                     name: 'common'
                 }
             }
         }
     }
 };
