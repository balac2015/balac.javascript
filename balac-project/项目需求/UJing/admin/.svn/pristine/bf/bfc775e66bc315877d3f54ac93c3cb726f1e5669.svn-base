/**
 * Created by xingjie201 on 2015/11/3.
 */
var mongoose = require('mongoose');
var OrderSum = mongoose.model('OrderSum');
var OrderSumDay = mongoose.model('OrderSumDay');
var OrderSumDayFranc = mongoose.model('OrderSumDayFranc');
var OrderSumMonth = mongoose.model('OrderSumMonth');
var VendorDashboard = mongoose.model('VendorDashboard'); // 加盟商首页数据表
var Store = mongoose.model('Store');
var Device = mongoose.model('Device');
var Order = mongoose.model('Order');
var async = require('async');
var config = require('../config/config');
var ObjectId = mongoose.Types.ObjectId;
var ISO = mongoose.Types.ISO;
var express = require('express');
var moment = require('moment');
var cacha = require('memory-cache');
var app = express();

/**
 * 测试统计数据
 * @param req
 * @param res
 */
exports.testGroup = function (req, res) {
    //getOrderSumDay
    //getOrderSumDay("566e42ce61ce49c44a4b623d", function (err, doce) {
    //  console.log("========================================================");
    //  var d = moment().add('days', -1).format("YYYY/MM/DD 00:00:00");
    //  var da= moment().format("YYYY/MM/DD 00:00:00");
    //  console.log(d);
    //  console.log(da);
    //  console.log("========================================================");
    //  res.send(doce);
    //});
    //getOrderSumMonthFranc(function (err, doce) {
    //    console.log("========================================================");
    //    console.log(doce);
    //    console.log("========================================================");
    //    res.send(doce);
    //});
};

/**
 * 统计数据
 * @param req
 * @param res
 */
exports.datatableReport = function (req, res) {
    var start1=req.param("starts");
    var end1=req.param("end");
    if ((start1 == "" && end1 =="") || (start1 == null && end1 == null)) {
        OrderSumDay.dataTable(req.query, function (err, data) {
            res.send(data);
        });
    } else {
        var startStr = moment(start1).format("YYYY/MM/DD 00:00:00");//当天最后时间
        var endStr = moment(end1).format("YYYY/MM/DD 23:59:59");//当天最后时间
        var start = new Date(startStr);
        var end = new Date(endStr);
        //通过一天的时间段获取一天的订单
        OrderSum.dataTable(req.query, {conditions: {"day": {$gte: start, $lt: end}}}, function (err, data) {
            res.send(data);
        });
    }

};
/**
 * 商家经营分析报告列表
 * @param req
 * @param res
 */
exports.list = function (req, res) {
    OrderSum.find({}, function (err, report) {
        res.render('order/orderDayReportList', {
            report: report
        })
    })
};


exports.orderDayReport = function (req, res) {
    var id = req.user._id;
    var start = req.query.start;
    var end = req.query.end;
    var query = {};

    console.log(start ,end, req.query);
    //查加盟商下的洗衣店
    Store.find({'franchiseeId': new ObjectId(id)}, function (err, stores) {
        console.log(stores.length);
        if (stores != null) {
            //定义临时数组
            var datas = new Array();
            //同步处理洗衣店的每条数据
            var sync = function (stores) {
                //取最后一个元素,每取一个元素集合长度减一
                var store = stores.pop();
                if (store != null && store != undefined && store != "") {
                    if (start != null && start != '' && start != undefined && end != null && end != '' && end != undefined) {
                        var startStr = moment(start);//当天的零点
                        var endStr = moment(end).endOf('day');//截止时间
                        console.log(startStr);
                        console.log(endStr);
                        query = {'franchiseeId': id, 'storeId': store._id, 'day': {$gte: startStr, $lt: endStr}}
                    } else {
                        var starts = moment();//当天的零点
                        query = {'franchiseeId': id, 'storeId': store._id, 'day': {$gte: starts}}
                    }
                    OrderSum.findOne(query, function (err, OrderDayReport) {
                        console.log("OrderDayReport" + OrderDayReport);
                        if (OrderDayReport != null) {
                            var obj = new Object();
                            obj.franchisee = OrderDayReport.franchiseeName;
                            obj.storeName = OrderDayReport.storeName;
                            obj.total = OrderDayReport.total;
                            obj.reservationNum = OrderDayReport.reservationNum;
                            obj.noPayNum = OrderDayReport.noPayNum;
                            obj.usingNum = OrderDayReport.usingNum;
                            obj.completedNum = OrderDayReport.completedNum;
                            obj.cancelNum = OrderDayReport.cancelNum;
                            obj.allowance = OrderDayReport.allowance;
                            obj.amount = OrderDayReport.amount;
                            obj.day = OrderDayReport.day;
                            datas.push(obj);
                            console.log(obj);
                            //如果集合中有数据,继续递归调用
                            if (stores.length > 0) {
                                sync(stores);
                            } else {
                                console.log(datas);
                                req.flash("success", "订单统计已查出");
                                res.render('order/h5DayReportList', {
                                    reports: datas,
                                    start : start == undefined ? '' : start,
                                    end : end == undefined ? '' : end
                                });
                            }
                        } else {
                            req.flash("errors", "您的店铺这个时间没有统计的订单！");
                            res.render('order/h5DayReportList', {
                                reports: datas,
                                start : start == undefined ? '' : start,
                                end : end == undefined ? '' : end
                            });
                        }

                    });
                } else {
                    req.flash("success", "您还有一些店铺没有统计，明天可以查看！");
                    res.render('order/h5DayReportList', {
                        reports: datas,
                        start : start == undefined ? '' : start,
                        end : end == undefined ? '' : end
                    });
                }
            };
            sync(stores);
        } else {
            req.flash("errors", "您暂时没有店铺存在，请添加");
            res.render('order/h5DayReportList', {
                reports: null,
                start : start == undefined ? '' : start,
                end : end == undefined ? '' : end
            });
        }
    });
};

exports.dashboard = function (req, res) {
    var id = req.user._id;
    VendorDashboard.findOne({'franchiseeId': new ObjectId(id)}, function (err, vd) {
        res.render('order/index', {
            reports: vd
        });
    });
};

