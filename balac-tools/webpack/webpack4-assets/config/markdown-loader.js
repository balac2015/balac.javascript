var webpack = require("webpack");
var path = require('path');

// markdown conver to html
var marked = require("marked");
var renderer = new marked.Renderer();

module.exports = {
  entry: path.join(__dirname, "../src/markdown-loader/index.js"),
  mode: "development",
  output: {
    path: path.join(__dirname, '../dist'),
    filename: "bundle.js"
  },
  module: {
        rules: [{
            test: /\.md$/,
            use: [
                {
                    loader: "html-loader"
                },
                {
                    loader: "markdown-loader",
                    //those options are optional
                    options: {
                        renderer
                    }
                }
            ]
        }]
    }
};