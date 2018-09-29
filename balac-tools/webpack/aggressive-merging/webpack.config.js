const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        pageA: path.join(__dirname, 'src/pageA'),
        pageB: path.join(__dirname, 'src/pageB'),
        pageC: path.join(__dirname, 'src/pageC')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    plugins: [
        new webpack.optimize.AggressiveMergingPlugin({
            minSizeReduce: 1.5
        }),

        new HtmlWebpackPlugin({})
    ],
    optimization: {
		occurrenceOrder: true // To keep filename consistent between different modes (for example building only)
	}
};
