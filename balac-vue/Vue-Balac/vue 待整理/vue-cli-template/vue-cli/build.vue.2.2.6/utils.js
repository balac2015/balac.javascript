var path = require('path'),
    config = require('../config'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');
   
exports.assetsPath = function (_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production' ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory;

    return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = function (options) {};

exports.styleLoaders = function (options) {};