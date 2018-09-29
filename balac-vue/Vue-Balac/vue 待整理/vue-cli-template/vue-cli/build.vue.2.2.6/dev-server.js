require('./check-versions');

var config = require('../config');

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

var path = require('path'),
    opn = require('opn'),
    express = require('express'),
    webpack = require('webpack'),
    proxyMiddleware = require('http-proxy-middleware'),
    webpackConfig = require('./webpack.dev.conf');
