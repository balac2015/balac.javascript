/**
 * Created by yu869 on 2016/3/3.
 */
//"use strict";
// Module dependencies
var path = require('path');
var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require(__dirname + '/app/config/config');

var app = express();
app.use(express.static(__dirname + '/public'));

if (process.env.NODE_ENV === 'production') {
    app.enable('trust proxy');
    //app.use(require('express-enforces-ssl')());
}

app.config = config;

// Database
require('./app/config/database')(app, mongoose);

var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('.js')) require(models_path + '/' + file);
});

//定时任务
require('./app/config/schedule')(app);

module.exports = app;