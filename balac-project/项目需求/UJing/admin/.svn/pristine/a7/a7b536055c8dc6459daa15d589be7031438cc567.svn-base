"use strict";

var mongoose = require('mongoose');
var async = require('async');
var config = require('../config/config');
var cache = require('memory-cache');
var Order = mongoose.model('Order');
var Store = mongoose.model('Store');
var Franchisee = mongoose.model('Franchisee');
var moment = require('moment');
var DayFranc = mongoose.model('DayFranc');
var OrderSumDay = mongoose.model('OrderSumDay');


exports.dashboard = function (req, res) {
  var obj = cache.get("dFranchiseeCount");

  var valueNum={};
  if(obj==null){
    setCache(req, res,function(value){
      valueNum=value;
      res.render('home/dashboard', {
        countNum:valueNum
      });
    });
  }else{
    valueNum=getCachaValue();
    res.render('home/dashboard', {
      countNum:valueNum
    });
  }
};
/**
 *
 * @returns {{}}
 */
function getCachaValue(){
  var countNum={};
  var franchiseeCount = cache.get("dFranchiseeCount");
  var countNewFran = cache.get("countNewFran");
  var storeCount = cache.get("dStoreCount");
  var orderOkCount = cache.get("dOrderOkCount");
  var orderAllowance = cache.get("orderAllowance");
  var realIincome = cache.get("realIincome");
  countNum.franchiseeCount=franchiseeCount;
  countNum.countNewFran=countNewFran;
  countNum.storeCount=storeCount;
  countNum.orderOkCount=orderOkCount;
  countNum.orderAllowance=orderAllowance;
  countNum.realIincome=realIincome;
  countNum.topByFran=cache.get("topByFran");
  countNum.topByStore=cache.get("topByStore");

  return countNum;
}
function setCache(req, res,dome){
  async.waterfall([
    function (next) {
      new Franchisee().count(req, res,function(count){
        cache.put("dFranchiseeCount" , count, 180000);
        next()
      });

    }, function (next) {
      new Franchisee().countNewFran(req, res,function(count){
        cache.put("countNewFran" , count, 180000);
        next()
      });

    },function (next) {
      var start=moment().format("YYYY/MM/DD 00:00:00");
       new DayFranc().findTopByAllowance({},function(results){
        cache.put("topByFran" , results, 180000);
        next()
      });

    },function (next) {
      var start=moment().format("YYYY/MM/DD 00:00:00");
       new OrderSumDay().findTopByAllowance({},function(results){
        cache.put("topByStore" , results, 180000);
        next()
      });

    },function (next) {
      new Store().count(req, res,function(count){
        cache.put("dStoreCount" , count, 180000);
        next()
      });
    },function (next) {
      new Order().count(req, res,function(count){
        cache.put("dOrderOkCount" , count, 180000);
        next()
      });
    },function (next) {
      var d = moment(new Date());
      var nowStr = d.format("YYYY/MM/DD 00:00:00");
      var mDate=new Date(nowStr);
      Order.find({"status":'40','createAt': {$gte: mDate}},function(err,orders){
        var orderAllowance=0;
        orders.forEach(function(v) {
          orderAllowance+=v.allowance;
        });
        cache.put("orderAllowance" , orderAllowance, 180000);
        next();
      });
    },function (next) {
      var d = moment(new Date());
      var nowStr = d.format("YYYY/MM/DD 00:00:00");
      var mDate=new Date(nowStr);
      var query=Order.find({"status":'40','createAt': {$gte: mDate}});
      query.populate(
        {"path": "storeId", "select": "name ratio"}
      ).exec(function(err,orders){
        var realIincome=0;
        orders.forEach(function(v) {
          realIincome+=v.allowance-v.allowance*(v.storeId == null || v.storeId.ratio == undefined ? 1:v.storeId.ratio/100);
        });
        cache.put("realIincome" , realIincome, 180000);
        next();
      });
    },
    function (callback) {
      var value=getCachaValue();
      callback(value);
    }], function (value) {
      dome(value);
    })
}