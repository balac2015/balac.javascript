"use strict";

var express = require('express');
var router = express.Router();
var config = require('../config/config');
var Auth = require(config.root + '/middleware/authorization');

//用户控制器
var wechatFansController = require(config.root + '/controllers/WechatFansController');

//使用express4,var Router = express.Router().相当于一个简单的app,在Router上面装备控制器与中间件
router.get(['/list'], wechatFansController.list)
  .all("/datatable", wechatFansController.datatable)
  .get('/init', wechatFansController.init);

module.exports = router;
