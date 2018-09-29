/**
 * 将所有 css 提取到单独的一个文件
 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        })
    ],
    module: {
        rules: [
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
            ]
        }
        ]
    }
};

module.exports = config;
