/**
 * 实现多入口的打包
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: __dirname,
    
    /** entry point 入口起点指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始
    * 进 file.js 后，找出 file.js （直接和间接）的依赖。
    * 每个依赖项随即被处理，最后输出到称之为 bundles 的文件中
    * entry（https://doc.webpack-china.org/concepts/entry-points/）
    * 对象语法可扩展：可重用并且可以与其他配置组合使用（用于将关注点(concern)从环境(environment)、构建目标(build target)、运行时(runtime)中分离。然后使用专门的工具（如 webpack-merge）将它们合并。）
    */
    // entry 代表入口，webpack会找到该文件进行解析
    entry: {
        // key值就是 chunk ： 代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割
        pageA: path.join(__dirname, './src/pageA.js'),
        pageB: path.join(__dirname, './src/pageB.js')
    },

    // output 代表输入文件配置
    output: {
        // path 把最终输出的文件放在哪里
        path: path.join(__dirname, './dist'),
        // [name] : 指的是 chunk 的名字，配置的 key 值 pageA pageB
        // [hash] ，这个是给输出文件一个hash值，避免缓存，那么 :8 是取前8位。
        filename: '[name].[hash:8].js'
    },

    module: {
        rules: [
            {
                // test : 一个正则表达式，匹配文件名
                test: /.scss$/,
                // use : 一个数组，里面放需要执行的loader，倒序执行，从右至左。
                use: ['style-loader', 'css-loader', 'sass-loader'],
                // exclude : 取消匹配node_modules里面的文件
                exclude: /node_modules/
            }
        ]
    },

    // 插件的引入顺序没有规定
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/template.html'),    // html模板的路径地址
            filename: 'pageA.html',             // 生成的文件名
            title: 'pageA',                     // 传入的参数
            chunks: ['pageA'],                  // 需要引入的chunk
            hash: true,                         // 在引入JS里面加入hash值 比如:
            minify: {
                removeAttributeQuotest: true    // 去掉引号，减少文件大小
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/template.html'),
            filename: 'pageB.html',
            title: 'pageB',
            chunks: ['pageB'],
            hash: true,
            minify: {
                removeAttributeQuotest: true
            }
        }),
        // 清除当前目录下的 dist 文件夹（清理 config/dist）
        new CleanWebpackPlugin(['dist']),
    ]
};
