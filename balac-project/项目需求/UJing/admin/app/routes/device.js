/**
 * Created by yu869 on 2015/10/30.
 */

"use strict";

var express = require('express');
var router = express.Router();
var config = require('../config/config');
var Auth = require(config.root + '/middleware/authorization');

//用户控制器
var deviceController = require(config.root + '/controllers/DeviceController');

//使用express4,var Router = express.Router().相当于一个简单的app,在Router上面装备控制器与中间件
router
  .get('/list', deviceController.list)
  .get('/faultList', deviceController.faultList)
  .all("/datatableAll", deviceController.datatableAll)
  .all("/faultDatatable", deviceController.faultDatatable)
  .all("/datatable/:id", deviceController.datatable)
  .get("/init", deviceController.init)
  .get('/deviceInStore/:storeId', deviceController.deviceInStore)
  .get('/devicePrice/:id', deviceController.devicePrice)
  .all("/applyDatatable/:id", deviceController.applyDatatable)
    .post('/shutdown', deviceController.shutdown)
;

module.exports = router;
