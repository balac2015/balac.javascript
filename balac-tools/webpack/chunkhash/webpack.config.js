const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        main: path.join(__dirname, "src/example.js")
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].chunkhash.js",
        chunkFilename: "[name].chunkhash.js"
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
};
