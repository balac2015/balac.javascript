var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var async = require('async');
var config = require('../config/config');
var ObjectId = mongoose.Types.ObjectId;
var express = require('express');
var moment = require('moment');
var OrderSumDayFranc = mongoose.model('OrderSumDayFranc');
var OrderSumMonth = mongoose.model('OrderSumMonth');
var OrderSumMonthFranc = mongoose.model('OrderSumMonthFranc');
var SumMonth = mongoose.model('SumMonth');
var MonthFranc = mongoose.model('MonthFranc');
var DayFranc = mongoose.model('DayFranc');
var Store = mongoose.model('Store');

/**
 * 按加盟商统计订单的数据
 * @param req
 * @param res
 */
exports.datatableFranc = function (req, res) {
  var start1=req.param("starts");
  var end1=req.param("end");
  if ((start1 == "" && end1 =="") || (start1 == null && end1 == null)) {
    DayFranc.dataTable(req.query, function (err, data) {
      res.send(data);
    });
  } else {
    var startStr = moment(start1).format("YYYY/MM/DD 00:00:00");//当天最后时间
    var endStr = moment(end1).format("YYYY/MM/DD 23:59:59");//当天最后时间
    var start = new Date(startStr);
    var end = new Date(endStr);
    //通过一天的时间段获取一天的订单
    OrderSumDayFranc.dataTable(req.query, {conditions: {"day": {$gte: start, $lt: end}}}, function (err, data) {
      res.send(data);
    });
  }
};
/**
 * 按月统计订单的数据
 * @param req
 * @param res
 */
exports.datatableMonth = function (req, res) {
  var dateText = req.param('dateText');
  var startStr=moment(dateText).format("YYYY/MM/DD");
  var newStr = moment().format("YYYY/MM/01");//当天的零点
  if (dateText == "" || dateText == null || newStr == startStr) {
    var start1=moment().format("YYYY/MM/01 00:00:00");
    var end1=moment().add('months',+1).format("YYYY/MM/01 00:00:00");
    SumMonth.dataTable(req.query,{conditions: {"month": {$gte: start1, $lt: end1}}}, function (err, data) {
      res.send(data);
    });
  } else {
    var endStr = moment(dateText).add('months',+1).format("YYYY/MM/01 00:00:00");//当天最后时间
    var start = new Date(startStr);
    var end = new Date(endStr);
    //通过一天的时间段获取一天的订单
    OrderSumMonth.dataTable(req.query, {conditions: {"month": {$gte: start, $lt: end}}}, function (err, data) {
      res.send(data);
    });
  }
};

/**
 * 按月统计订单的数据
 * @param req
 * @param res
 */
exports.datatableMFranc = function (req, res) {
  var dateText = req.param('dateText');
  var startStr=moment(dateText).format("YYYY/MM/DD");
  var newStr = moment().format("YYYY/MM/01");//当天的零点
  if (dateText == "" || dateText == null || newStr == startStr) {
    var start1=moment().format("YYYY/MM/01 00:00:00");
    var end1=moment().add('months',+1).format("YYYY/MM/01 00:00:00");
    MonthFranc.dataTable(req.query,{conditions: {"month": {$gte: start1, $lt: end1}}}, function (err, data) {
      res.send(data);
    });
  } else {
    var endStr = moment(dateText).add('months',+1).format("YYYY/MM/01 00:00:00");//当天最后时间
    var start = new Date(startStr);
    var end = new Date(endStr);
    //通过一天的时间段获取一天的订单
    OrderSumMonthFranc.dataTable(req.query, {conditions: {"month": {$gte: start, $lt: end}}}, function (err, data) {
      res.send(data);
    });
  }
};


/**
 * 按月统计订单
 * @param req
 * @param res
 */
exports.francList = function (req, res) {
  OrderSumDayFranc.find({}, function (err, report) {
    res.render('order/orderSumFrancList');
  })
};
/**
 * 按加盟商和月统计订单
 * @param req
 * @param res
 */
exports.orderMonthFrancList = function (req, res) {
  OrderSumMonthFranc.find({}, function (err, report) {
    res.render('order/orderSumMFrancList');
  })
};
/**
 * 按店铺和月统计订单
 * @param req
 * @param res
 */
exports.orderMonthList = function (req, res) {
  OrderSumMonth.find({}, function (err, report) {
    res.render('order/orderSumMonthList');
  })
};

/**
 * 按店铺和月统计订单
 * @param req
 * @param res
 */
exports.vendorMonthList = function (req, res) {
  getStoreIds(req,res,function(err,ids){
    var dateText = req.param('dateText');
    var startStr=moment(dateText).format("YYYY/MM/DD");
    var newStr = moment().format("YYYY/MM/01");//当天的零点
    if (dateText == "" || dateText == null || newStr == startStr) {
      var start1=moment().format("YYYY/MM/01 00:00:00");
      var end1=moment().add('months',+1).format("YYYY/MM/01 00:00:00");
      SumMonth.find({'storeId':{$in:ids},"month": {$gte: start1, $lt: end1}}, function (err, data) {
        res.render('order/h5SumMonthList',{
          sumMonth:data,
          dateText:''
        });
      });
    } else {
      var endStr = moment(dateText).add('months', +1).format("YYYY/MM/01 00:00:00");//当天最后时间
      var start = new Date(startStr);
      var end = new Date(endStr);
      //通过一天的时间段获取一天的订单
      OrderSumMonth.find({'storeId': {$in: ids}, "month": {$gte: start, $lt: end}}, function (err, data) {
        res.render('order/h5SumMonthList', {
          sumMonth: data,
          dateText: dateText
        });
      })
    }
  })
};
/**
 * 根据登陆用户id，获取该用户所有洗衣房的id
 * @param req
 * @param res
 * @param callback
 */
function getStoreIds(req,res,callback){
  var id=req.user._id;
  var ids=[];
  Store.find({'franchiseeId': ObjectId(id)}, function (err, stores) {
    stores.forEach(function(e){
      ids.push(e._id)
    });
    callback(err,ids)
  })
}