/**
 * Created by yu869 on 2015/10/26.加盟商相关的路由
 */

"use strict";

var express = require('express');
var router = express.Router();
var config = require('../config/config');
var Auth = require(config.root + '/middleware/authorization');

//加盟商控制
var OrderController = require(config.root + '/controllers/OrderController');
var orderSumController = require(config.root + '/controllers/OrderSumController');
//订单统计
var OrderDayReportController = require(config.root + '/controllers/OrderDayReportController');

//使用express4,var Router = express.Router().相当于一个简单的app,在Router上面装备控制器与中间件
//加盟商
router.get(['/showList'], OrderController.showList)
  .get(['/todayOrder'], OrderController.todayOrder)
  .get(['/init'], OrderController.init)
  .all("/datatable", OrderController.datatable)
  .all("/datatableToday", OrderController.datatableToday)
  .all("/orderRecord", OrderController.orderRecord)
  .get("/orderDetail", OrderController.orderDetail)
  .get("/getAllStatus", OrderController.getAllStatus)
  .get(['/list'], OrderDayReportController.list)
  .get(['/testGroup'], OrderDayReportController.testGroup)

  .get(['/datatableFranc'], orderSumController.datatableFranc)//按加盟商统计前一天的订单数据
  .get(['/francList'], orderSumController.francList)//按加盟商统计前一天的订单数据
  .get(['/orderMonthList'], orderSumController.orderMonthList)//按店铺统计前一个月的订单数据
  .get(['/orderMFrancList'], orderSumController.orderMonthFrancList)//按加盟商统计前一个月的订单页面跳转
  .all(['/datatableMonth'], orderSumController.datatableMonth)//按店铺统计前一个月的订单数据
  .all(['/datatableMFranc'], orderSumController.datatableMFranc)//按加盟商统计前一个月的订单数据

  .post('/cancelOrder', OrderController.cancelOrder ) //取消订单
  .get('/exportOrder', OrderController.exportOrder ) //导出

  .get('/testOrder', OrderController.testOrder ) //测试导出功能

  .get(['/updateOrder'], OrderController.updateOrder)

  .all("/datatableReport", OrderDayReportController.datatableReport);


module.exports = router;
