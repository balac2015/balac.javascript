/**
 * Created by yu869 on 2015/12/10.
 */

var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Device = mongoose.model('Device');
var config = require('../../config/config');
var utils = require(config.root + '/helper/utils');
var async = require('async');
var http = require('http') ;
var moment = require('moment');
var ObjectId = mongoose.Types.ObjectId;
var cache = require('memory-cache');

/**
 * 订单列表
 * @param req
 * @param res
 */
exports.list = function (req, res) {
    var id = req.param("franId");
    console.log(id);

    Device.find({'franchiseeId': id}, function (err, devices) {
        if (err) {
            console.log(err);
        } else {

            var deviceIds = [];

            devices.forEach(function (item) {
                deviceIds.push(item._id);
            });

            console.log(deviceIds);

            var d = moment(new Date());
            var nowStr = d.format("YYYY/MM/DD 00:00:00");
            var mDate=new Date(nowStr);

            Order.find({"deviceId": {$in: deviceIds}, "createAt": {$gte: mDate}}, function (err, orders) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(orders);
                    res.send(orders)
                }
            });
        }
    });
};

/**
 * 首页数据
 * @param req
 * @param res
 */
exports.dashboard = function(req, res) {
    var id = req.param("franId");

    console.log("franId", id);

    var obj = cache.get(id);

    if (obj) {
        console.log("read result from cache");
        res.send(JSON.stringify(obj));
    } else {
        Device.find({'franchiseeId': ObjectId(id)}, function (err, devices) {
            if (err) {
                console.log(err);
            } else {
                var deviceIds = [];

                console.log("devices length", "==============================>", devices.length);

                devices.forEach(function (item) {
                    deviceIds.push(item._id);
                });

                console.log(deviceIds);

                var report = {
                    allOrderNum: '0',
                    allAmount: '0',
                    orderNum: '0',
                    cancalNum: '0',
                    amount: '0',
                    cancalAmount: '0'
                };

                countMonthData(deviceIds, function (err, month) {
                    report.allOrderNum = month.allOrderNum;
                    report.allAmount = month.allAmount;
                    console.log("report" + report);
                    countTodayData(deviceIds, function (err, today) {
                        report.orderNum = today.orderNum;
                        report.cancalNum = today.cancalNum;
                        report.amount = today.amount;
                        report.cancalAmount = today.cancalAmount;

                        cache.put(id , report, 60000);
                        console.log("read result from mongodb");
                        res.send(JSON.stringify(report));
                    });
                });

            }
        });
    }
};

/**
 * 当月数据
 * @param deviceIds
 * @param callback
 */
function countMonthData(deviceIds, callback) {
    console.log("deviceIds"+ deviceIds);
    var MongoClient = require('mongodb').MongoClient;
    //链接数据库
    MongoClient.connect(config.database.url, function (err, db) {
        var collection = db.collection('orders');

        var d = moment(new Date());
        var thisMonth = d.format("YYYY/MM/01 00:00:00");
        var month = new Date(thisMonth);
        console.log(month);

        collection.group(
            {"status": true}
            , {
                "deviceId": {$in: deviceIds}
                , "createAt": {$gte: month}
            }
            , {'count': 0, 'allowance': 0}
            , function (obj, prev) {
                prev.count++;
                prev.allowance += obj.allowance;
            }
            , true
            , function(err, month) {
                var result = {allOrderNum: 0, allAmount: 0};
                for (i in month) {
                    result.allOrderNum += month[i].count;
                    switch (month[i].status) {
                        case '40':
                            result.allAmount += month[i].allowance;
                            break;
                        default:
                            break;
                    }
                }
                console.log("month"+JSON.stringify(result));
                callback(err, result);
                db.close();
            }
        );


    });
}

/**
 * 当天数据
 * @param deviceIds
 * @param callback
 */
function countTodayData(deviceIds, callback) {
    var MongoClient = require('mongodb').MongoClient;
    //链接数据库
    MongoClient.connect(config.database.url, function (err, db) {
        var collection = db.collection('orders');

        var d = moment(new Date());
        var thisDay = d.format("YYYY/MM/DD 00:00:00");
        var today = new Date(thisDay);
        console.log(today);

        collection.group(
            {"status": true}
            , {
                "deviceId": {$in: deviceIds}
                , "createAt": {$gte: today}
            }
            , {'count': 0, 'allowance': 0}
            , function (obj, prev) {
                prev.count++;
                prev.allowance += obj.allowance;
            }
            , true
            , function (err, today) {
                var result = {orderNum: 0, cancalNum: 0, amount: 0, cancalAmount: 0};
                for (i in today) {
                    result.orderNum += today[i].count;
                    switch (today[i].status) {
                        case '40':
                            result.amount += today[i].allowance;
                            break;
                        case '50':
                            result.cancalNum += today[i].count;
                            result.cancalAmount += today[i].allowance;
                            break;
                        default:
                            break;
                    }
                }
                console.log("day"+JSON.stringify(result));
                callback(err, result);
                db.close();
            }
        );

    });
}

