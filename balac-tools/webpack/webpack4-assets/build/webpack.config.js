/**
 * 静态资源(css, image, fonts 等) 的配置
 * css-loader
 * style-loader
 * file-loader
 * csv-loader
 * xml-loader
 * url-loader
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[hash:8].js'
    },

    module: {
        rules: [
            // todo: css 分离、postcss, sass, less 等
            // 加载 css
            {
                // webpack 根据正则表达式，来确定应该查找哪些文件，并将其提供给指定的 loader。
                // 在这种情况下，以 .css 结尾的全部文件，都将被提供给 style-loader 和 css-loader
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },

            // todo: 压缩和优化图片，image-webpack-loader, url-loader，如果增强加载处理图片功能。
            // 加载图片
            {
                // 假想，现在我们正在下载 CSS，但是我们的背景和图标这些图片，要如何处理呢？
                // 使用 file-loader，我们可以轻松地将这些内容混合到 CSS 中：
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },

            // 加载字体
            // file-loader 和 url-loader 可以接收并加载任何文件，然后将其输出到构建目录。
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },

            // 告诉 webpack 编译器(compiler) 信息：
            // 当碰到「在 require()/import 语句中被解析为 '.txt' 的路径」时，在你对它打包之前，先使用 raw-loader 转换一下。
            {
                test: /\.txt$/,
                use: 'raw-loader'
            },

            // 加载数据
            // 如 JSON 文件，CSV、TSV 和 XML。类似于 NodeJS，JSON 支持实际上是内置的，也就是说 import Data from './data.json' 默认将正常运行。
            // 要导入 CSV、TSV 和 XML，你可以使用 csv-loader 和 xml-loader
            {
                test: /\.(csv|tsv)$/,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            }
            // 在使用 d3 等工具来实现某些数据可视化时，预加载数据会非常有用。
            // 我们可以不用再发送 ajax 请求，然后于运行时解析数据，而是在构建过程中将其提前载入并打包到模块中，以便浏览器加载模块后，可以立即从模块中解析数据。
        ]
    },

    plugins: [
        // 清除当前目录下的 dist 文件夹（清理 build/dist）
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Output Management'  // 设定 HtmlWebpackPlugin
        })
    ]
};
