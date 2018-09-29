/**
 * Created by yu869 on 2015/12/18.
 */

var mongoose = require('mongoose')
    , ObjectId = mongoose.Types.ObjectId
var OrderSum = mongoose.model('OrderSum');
var OrderSumDay = mongoose.model('OrderSumDay');
var OrderSumDayFranc = mongoose.model('OrderSumDayFranc');
var OrderSumMonth = mongoose.model('OrderSumMonth');
var Store = mongoose.model('Store');
var Device = mongoose.model('Device');
var Order = mongoose.model('Order');
var OrderSumMonthFranc = mongoose.model('OrderSumMonthFranc');
var VendorDashboard = mongoose.model('VendorDashboard'); // 加盟商首页数据表
var SumMonth = mongoose.model('SumMonth');
var MonthFranc = mongoose.model('MonthFranc');
var DayFranc = mongoose.model('DayFranc');
var Franchisee = mongoose.model('Franchisee');
var express = require('express');
var moment = require('moment');
var MongoClient = require('mongodb').MongoClient;

var config = require('./config');
var schedule = require('node-schedule');

var dbUrl = 'mongodb://localhost/cxer';

module.exports = function (app) {

    console.log("schedule init");

    /**
     * 每隔5分钟统计当日订单
     */
    var h = schedule.scheduleJob("0 23 14 28 */1 *", function () {
        console.log("测试日的定时任务两点整");

    });

    /**
     * 每隔5分钟统计当日订单
     */
    var i = schedule.scheduleJob("*/5 * * * *", function () {
        console.log("schedule init saveOrderDayReportInto(5)分钟");
        saveOrderDayReportInto();
    });

    /**
     * 每天1点0分统计前一天每个洗衣店的所有订单，和金额的统计，保存数据
     */
    var j = schedule.scheduleJob("0 0 1 */1 * *", function () {
        console.log("schedule init saveOrderDayReportInto(01:00:00)");
        saveOrderDayReport();
    });
    /**
     * 每天1点10分按加盟商统计前一天的数据 、订单、和金额的统计，保存数据
     */
    var a = schedule.scheduleJob("0 20 1 */1 * *", function () {
        console.log("schedule init countOrderByFranc(01:10:00)");
        countOrderByFranc();
        console.log("每天1点10分按加盟商统计前一天的数据 、订单、和金额的统计，保存数据");
    });

    /**
     * 每隔6分钟按加盟商统当天订单的数据
     */
    var b = schedule.scheduleJob("*/6 * * * *", function () {
        console.log("schedule init tempDayFranc(6)分钟");
        tempDayFranc();

    });

    /**
     * 每月一日1点30分按店铺统计上个月统计订单 、和金额的统计，保存数据
     */
    var c = schedule.scheduleJob("0 30 1 1 */1 *", function () {
        console.log("schedule init countOrderByFranc( 每月1日 01:10:00)");
        countOrderByMonth();
    });
    /**
     * (每日 01:40:00按店铺临时统计当月的订单
     */
    var d = schedule.scheduleJob("0 40 1 */1 * *", function () {
        console.log("schedule init tempSumMonth(每日 01:10:00)");
        tempSumMonth();

    });
    /**
     * 按加盟商统计上个月的订单，每月1日 01:50:00统计
     */
    var e = schedule.scheduleJob("0 50 1 1 */1 *", function () {
        console.log("schedule init countOrderByMonthFranc( 每月1日 01:10:00)");
        countOrderByMonthFranc();

    });
    /**
     * 按加盟商临时统计当月订单 每日1点45分统计
     */
    var f = schedule.scheduleJob("0 45 1 */1 * *", function () {
        console.log("schedule init tempMonthFranc( 每日 01:10:00)");
        tempMonthFranc();
    });

    /**
     * 每隔30分钟清理下注册未激活的用户
     */
    var chearUsers = schedule.scheduleJob("*/30 * * * *", function () {
        console.log("每30分钟清理一次注册为激活的用户 (30)分钟");
        Franchisee.remove({'verification': {$ne: 'ok'}}, function (err, result) {
        });
    });

    /**
     * 每隔5分钟统计首页数据
     */
    var VendorDashboardSchedule = schedule.scheduleJob("*/5 * * * *", function () {
        console.log("每隔5分钟统计首页数据");
        createVendorDashboardData();
    });
};
/**
 * 按加盟商和月临时统计订单
 * @param req
 * @param res
 */
function tempMonthFranc() {
    //删除原来的统计记录
    MonthFranc.remove({}, function (err, result) {
        if (!err) {
            console.log('删除成功');
            var month = moment().format("YYYY/MM/02 08:00:00");
            var m = new Date(month);
            getMonthFranc(function (err, doce) {
                if (doce) {
                    doce.forEach(function (e) {
                        var monthFranc = new MonthFranc({
                            franchiseeId: e._id.franchiseeId,
                            franchiseeName: e._id.franchiseeName,
                            total: e.total//总订单数
                            , reservationNum: e.reservationNum//预约订单数 10
                            , noPayNum: e.noPayNum//未支付订单数 20
                            , usingNum: e.usingNum//使用中订单数 30
                            , completedNum: e.completedNum//已完成订单数 40
                            , cancelNum: e.cancelNum//已取消订单数 50
                            , allowance: e.allowance//支付金额
                            , amount: e.amount//金额
                            , realIincome: e.realIincome //实际收入
                            , month: m
                        });
                        monthFranc.save(function (err, fran) {
                            if (err) {
                                console.log(err.message);
                            }
                        });
                    })
                    console.log("按加盟商月统计当月订单");
                }
            });
        } else {
            console.log('err=============================================');
            console.log('删除失败');
            console.log('err');
        }
    });

};

/**
 * 按加盟商统计当前月的订单
 * @param deviceId
 */
function getMonthFranc(callback) {

    //获取当前时间  YYYY/MM/DD 00:00:00 用于查看当天订单
    var a = moment().format("YYYY/MM/01 00:00:00");
    var b = moment().add('months', +1).format("YYYY/MM/01 00:00:00");
    var start = new Date(a);
    var end = new Date(b);
    MongoClient.connect(dbUrl, function (err, db) { //链接数据库
        db.collection('ordersums').aggregate([
                {$match: {day: {$gte: start, $lt: end}}},
                {
                    $group: {
                        "_id": {
                            "franchiseeId": "$franchiseeId",
                            "franchiseeName": "$franchiseeName"
                        },
                        "allowance": {$sum: "$allowance"},
                        "amount": {$sum: "$amount"},
                        "total": {$sum: "$total"},//总订单数
                        "reservationNum": {$sum: "$reservationNum"},//预约订单数 10
                        "noPayNum": {$sum: "$noPayNum"},//未支付订单数 20
                        "usingNum": {$sum: "$usingNum"},//使用中订单数 30
                        "completedNum": {$sum: "$completedNum"},//已完成订单数 40
                        "cancelNum": {$sum: "$cancelNum"}//已取消订单数 50
                        , "realIincome": {$sum: "$realIincome"}//实际收入
                    }
                }
            ]
        ).toArray(function (err, result) {
                callback(err, result);
            });
    })
}

/**
 * 按加盟商统计上个月的订单
 * @param req
 * @param res
 */
function countOrderByMonthFranc() {
    var month = moment().add('months', -1).format("YYYY/MM/01 08:00:00");
    var m = new Date(month);
    getOrderSumMonthFranc(function (err, doce) {
        if (doce) {
            doce.forEach(function (e) {
                var monthFranc = new OrderSumMonthFranc({
                    franchiseeId: e._id.franchiseeId,
                    franchiseeName: e._id.franchiseeName,
                    total: e.total//总订单数
                    , reservationNum: e.reservationNum//预约订单数 10
                    , noPayNum: e.noPayNum//未支付订单数 20
                    , usingNum: e.usingNum//使用中订单数 30
                    , completedNum: e.completedNum//已完成订单数 40
                    , cancelNum: e.cancelNum//已取消订单数 50
                    , allowance: e.allowance//支付金额
                    , amount: e.amount//金额
                    , realIincome: e.realIincome //实际收入
                    , month: m
                });
                monthFranc.save(function (err, fran) {
                    if (err) {
                        console.log(err.message);
                    }
                });
            })
            console.log("按月统计订单");
        }
    });

};
/**
 * 按加盟商和月初时统计上月份的订单
 * @param deviceId
 */
function getOrderSumMonthFranc(callback) {

    //获取当前时间  YYYY/MM/DD 00:00:00 用于查看当天订单
    var a = moment().add('months', -1).format("YYYY/MM/01 00:00:00");
    var b = moment().format("YYYY/MM/01 00:00:00");
    var start = new Date(a);
    var end = new Date(b);
    MongoClient.connect(dbUrl, function (err, db) { //链接数据库
        db.collection('ordersums').aggregate([
                {$match: {day: {$gte: start, $lt: end}}},
                {
                    $group: {
                        "_id": {
                            "franchiseeId": "$franchiseeId",
                            "franchiseeName": "$franchiseeName"
                        },
                        "allowance": {$sum: "$allowance"},
                        "amount": {$sum: "$amount"},
                        "total": {$sum: "$total"},//总订单数
                        "reservationNum": {$sum: "$reservationNum"},//预约订单数 10
                        "noPayNum": {$sum: "$noPayNum"},//未支付订单数 20
                        "usingNum": {$sum: "$usingNum"},//使用中订单数 30
                        "completedNum": {$sum: "$completedNum"},//已完成订单数 40
                        "cancelNum": {$sum: "$cancelNum"}//已取消订单数 50
                        , "realIincome": {$sum: "$realIincome"}//实际收入
                    }
                }
            ]
        ).toArray(function (err, result) {
                callback(err, result);
            });
    })
}

/**
 * 按店铺和月临时统计订单
 * @param req
 * @param res
 */
function tempSumMonth() {
    //删除原来的统计记录
    SumMonth.remove({}, function (err, result) {
        if (!err) {
            console.log('删除成功');
            var months = moment().format("YYYY/MM/01 08:00:00");
            var m = new Date(months);
            getSumMonth(function (err, doce) {
                if (doce) {
                    doce.forEach(function (e) {
                        var month = new SumMonth({
                            franchiseeId: e._id.franchiseeId,
                            franchiseeName: e._id.franchiseeName,
                            storeId: e._id.storeId,
                            storeName: e._id.storeName,
                            total: e.total//总订单数
                            , reservationNum: e.reservationNum//预约订单数 10
                            , noPayNum: e.noPayNum//未支付订单数 20
                            , usingNum: e.usingNum//使用中订单数 30
                            , completedNum: e.completedNum//已完成订单数 40
                            , cancelNum: e.cancelNum//已取消订单数 50
                            , allowance: e.allowance//支付金额
                            , amount: e.amount//金额
                            , realIincome: e.realIincome //实际收入
                            , month: m
                        });
                        month.save(function (err, fran) {
                            if (err) {
                                console.log(err.message);
                            }
                        });
                    })
                    console.log("按洗衣房统计当前月份的临时订单");

                }
            });
        } else {
            console.log('err=============================================');
            console.log('删除失败');
            console.log('err');
        }
    });
};
/**
 * 按洗衣房统计当月的订单
 * @param deviceId
 */
function getSumMonth(callback) {

    //获取当前时间  YYYY/MM/DD 00:00:00 用于查看当天订单
    var a = moment().format("YYYY/MM/01 00:00:00");
    var b = moment().add('months', +1).format("YYYY/MM/01 00:00:00");
    var start = new Date(a);
    var end = new Date(b);
    MongoClient.connect(dbUrl, function (err, db) { //链接数据库
        db.collection('ordersums').aggregate(
            [
                {$match: {day: {$gte: start, $lt: end}}},
                {
                    $group: {
                        "_id": {
                            "storeId": "$storeId",
                            "storeName": "$storeName",
                            "franchiseeName": "$franchiseeName"
                        },
                        "allowance": {$sum: "$allowance"},
                        "amount": {$sum: "$amount"},
                        "total": {$sum: "$total"},//总订单数
                        "reservationNum": {$sum: "$reservationNum"},//预约订单数 10
                        "noPayNum": {$sum: "$noPayNum"},//未支付订单数 20
                        "usingNum": {$sum: "$usingNum"},//使用中订单数 30
                        "completedNum": {$sum: "$completedNum"},//已完成订单数 40
                        "cancelNum": {$sum: "$cancelNum"}//已取消订单数 50
                        , "realIincome": {$sum: "$realIincome"}//实际收入
                    }
                }
            ]
        ).toArray(function (err, result) {
                callback(err, result);
            });
    })
}
/**
 * 按店铺统计上个月统计订单
 * @param req
 * @param res
 */
function countOrderByMonth() {
    var month = moment().add('months', -1).format("YYYY/MM/01 08:00:00");
    console.log("++++++++++++++++++++++++++++++++++++++++");
    console.log(month);
    var m = new Date(month);
    getOrderSumMonth(function (err, doce) {
        if (doce) {
            doce.forEach(function (e) {
                var month = new OrderSumMonth({
                    franchiseeId: e._id.franchiseeId,
                    franchiseeName: e._id.franchiseeName,
                    storeId: e._id.storeId,
                    storeName: e._id.storeName,
                    total: e.total//总订单数
                    , reservationNum: e.reservationNum//预约订单数 10
                    , noPayNum: e.noPayNum//未支付订单数 20
                    , usingNum: e.usingNum//使用中订单数 30
                    , completedNum: e.completedNum//已完成订单数 40
                    , cancelNum: e.cancelNum//已取消订单数 50
                    , allowance: e.allowance//支付金额
                    , amount: e.amount//金额
                    , realIincome: e.realIincome //实际收入
                    , month: m
                });
                month.save(function (err, fran) {
                    if (err) {
                        console.log(err.message);
                    }
                });
            })
            console.log("按月统计订单");
        }
    });

};
/**
 * 在月初时统计上月份的订单
 * @param deviceId
 */
function getOrderSumMonth(callback) {

    //获取当前时间  YYYY/MM/DD 00:00:00 用于查看当天订单
    var a = moment().add('months', -1).format("YYYY/MM/01 00:00:00");
    var b = moment().format("YYYY/MM/01 00:00:00");
    var start = new Date(a);
    var end = new Date(b);
    var s = null;
    MongoClient.connect(dbUrl, function (err, db) { //链接数据库
        db.collection('ordersums').aggregate(
            [
                {$match: {day: {$gte: start, $lt: end}}},
                {
                    $group: {
                        "_id": {
                            "storeId": "$storeId",
                            "storeName": "$storeName",
                            "franchiseeName": "$franchiseeName"
                        },
                        "allowance": {$sum: "$allowance"},
                        "amount": {$sum: "$amount"},
                        "total": {$sum: "$total"},//总订单数
                        "reservationNum": {$sum: "$reservationNum"},//预约订单数 10
                        "noPayNum": {$sum: "$noPayNum"},//未支付订单数 20
                        "usingNum": {$sum: "$usingNum"},//使用中订单数 30
                        "completedNum": {$sum: "$completedNum"},//已完成订单数 40
                        "cancelNum": {$sum: "$cancelNum"}//已取消订单数 50
                        , "realIincome": {$sum: "$realIincome"}//实际收入
                    }
                }
            ]
        ).toArray(function (err, result) {
                callback(err, result);
            });
    })
}

/**
 * 按加盟商统当天订单的数据
 * @param req
 * @param res
 */
function tempDayFranc() {
    //删除原来的统计记录
    DayFranc.remove({}, function (err, result) {
        if (!err) {
            console.log('删除成功');

            var day = moment().format("YYYY/MM/DD 08:00:00");
            getDayFranc(function (err, doce) {
                if(doce) {
                    doce.forEach(function (e) {
                        var franc = new DayFranc({
                            franchiseeId: e._id.franchiseeId,
                            franchiseeName: e._id.franchiseeName,
                            total: e.total//总订单数
                            , reservationNum: e.reservationNum//预约订单数 10
                            , noPayNum: e.noPayNum//未支付订单数 20
                            , usingNum: e.usingNum//使用中订单数 30
                            , completedNum: e.completedNum//已完成订单数 40
                            , cancelNum: e.cancelNum//已取消订单数 50
                            , allowance: e.allowance//支付金额
                            , amount: e.amount//金额
                            , realIincome: e.realIincome //实际收入
                            , day: day
                        });
                        franc.save(function (err, fran) {
                            if (err) {
                                console.log(err.message);
                            }
                        });
                    });
                    console.log("按加盟商统计当天的数据");
                }
            });
        } else {
            console.log('err=============================================');
            console.log('删除失败');
            console.log('err');
        }
    });
};

/**
 * 以加盟商为单位，统计当天的订单
 * @param deviceId
 */
function getDayFranc(callback) {

    //获取当前时间  YYYY/MM/DD 00:00:00 用于查看当天订单
    var a = moment().format("YYYY/MM/DD 00:00:00");
    var b = moment().add('days', +1).format("YYYY/MM/DD 00:00:00");
    var start = new Date(a);
    var end = new Date(b);

    MongoClient.connect(dbUrl, function (err, db) { //链接数据库
        db.collection('ordersumdays').aggregate(
            [
                {$match: {createdAt: {$gte: start, $lt: end}}},
                {
                    $group: {
                        "_id": {
                            "franchiseeId": "$franchiseeId",
                            "franchiseeName": "$franchiseeName"
                        },
                        "allowance": {$sum: "$allowance"},
                        "amount": {$sum: "$amount"},
                        "total": {$sum: "$total"},//总订单数
                        "reservationNum": {$sum: "$reservationNum"},//预约订单数 10
                        "noPayNum": {$sum: "$noPayNum"},//未支付订单数 20
                        "usingNum": {$sum: "$usingNum"},//使用中订单数 30
                        "completedNum": {$sum: "$completedNum"},//已完成订单数 40
                        "cancelNum": {$sum: "$cancelNum"}//已取消订单数 50
                        , "realIincome": {$sum: "$realIincome"}//实际收入
                    }
                }
            ]
        ).toArray(function (err, result) {
                callback(err, result);
            });
    })
}

/**
 * 按加盟商统计前一天的数据
 * @param req
 * @param res
 */
function countOrderByFranc() {
    var day = moment().add('days', -1).format("YYYY/MM/DD 08:00:00");
    console.log(day);
    countOrderSumDayFranc(function (err, doce) {
        if(doce) {
            doce.forEach(function (e) {
                var franc = new OrderSumDayFranc({
                    franchiseeId: e._id.franchiseeId,
                    franchiseeName: e._id.franchiseeName,
                    total: e.total//总订单数
                    , reservationNum: e.reservationNum//预约订单数 10
                    , noPayNum: e.noPayNum//未支付订单数 20
                    , usingNum: e.usingNum//使用中订单数 30
                    , completedNum: e.completedNum//已完成订单数 40
                    , cancelNum: e.cancelNum//已取消订单数 50
                    , allowance: e.allowance//支付金额
                    , amount: e.amount//金额
                    , realIincome: e.realIincome //实际收入
                    , day: day
                });
                franc.save(function (err, fran) {
                    if (err) {
                        console.log(err.message);
                    }
                });
            })
            console.log("按加盟商统计前一天的数据");
        }
    });
};
/**
 * 以加盟商为单位，统计前一天的订单
 * @param deviceId
 */
function countOrderSumDayFranc(callback) {

    //获取当前时间  YYYY/MM/DD 00:00:00 用于查看当天订单
    var a = moment().add('days', -1).format("YYYY/MM/DD 00:00:00");
    var b = moment().format("YYYY/MM/DD 00:00:00");
    var start = new Date(a);
    var end = new Date(b);
    var s = null;
    MongoClient.connect(dbUrl, function (err, db) { //链接数据库
        db.collection('ordersums').aggregate(
            [
                {$match: {day: {$gte: start, $lt: end}}},
                {
                    $group: {
                        "_id": {
                            "franchiseeId": "$franchiseeId",
                            "franchiseeName": "$franchiseeName"
                        },
                        "allowance": {$sum: "$allowance"},
                        "amount": {$sum: "$amount"},
                        "total": {$sum: "$total"},//总订单数
                        "reservationNum": {$sum: "$reservationNum"},//预约订单数 10
                        "noPayNum": {$sum: "$noPayNum"},//未支付订单数 20
                        "usingNum": {$sum: "$usingNum"},//使用中订单数 30
                        "completedNum": {$sum: "$completedNum"},//已完成订单数 40
                        "cancelNum": {$sum: "$cancelNum"}//已取消订单数 50
                        , "realIincome": {$sum: "$realIincome"}//实际收入
                    }
                }
            ]
        ).toArray(function (err, result) {
                callback(err, result);
            });
    })
}

/**
 * 统计每个洗衣店当天的订单，每隔10分钟统计一次
 * @param req
 * @param res
 */
function saveOrderDayReportInto() {
    var result = {};
    //删除原来的统计记录
    OrderSumDay.remove({}, function (err, result) {
        if (!err) {
            console.log('删除成功');
            var da = moment().format("YYYY/MM/DD 08:00:00");
            var date = new Date(da);
            Store.find({'franchiseeId': {'$exists': true}}).populate('franchiseeId').exec(function (err, store) {
                if (store == null) {
                    return;
                }
                var fn = function (store) {
                    var pop = store.pop();
                    if (pop == null && pop == undefined) {
                        result.code = '09'
                        result.msg = '没有洗衣店信息'
                        return result;
                    }
                    if(pop.storeStatus == "2"){
                        fn(store);
                    }else {
                        getDevice(pop._id, function (err, doce) {     //根据店铺统计该店铺的营销统计
                            var orderSumDay = new OrderSumDay({
                                franchiseeName: pop.franchiseeId == null ? '' : pop.franchiseeId.username
                                ,
                                franchiseeId: pop.franchiseeId == null ? '' : pop.franchiseeId._id//加盟商ID
                                ,
                                storeId: pop._id//所属洗衣店
                                ,
                                storeName: pop.name
                                ,
                                ratio: pop.ratio
                                ,
                                total: doce == null ? 0 : doce.total
                                ,
                                reservationNum: doce == null ? 0 : doce.reservationNum
                                ,
                                noPayNum: doce == null ? 0 : doce.noPayNum
                                ,
                                usingNum: doce == null ? 0 : doce.usingNum
                                ,
                                completedNum: doce == null ? 0 : doce.completedNum
                                ,
                                cancelNum: doce == null ? 0 : doce.cancelNum
                                ,
                                allowance: doce == null ? 0 : doce.allowance
                                ,
                                amount: doce == null ? 0 : doce.amount
                                ,
                                realIincome: doce == null ? 0 : pop.ratio ? doce.allowance * (pop.ratio.valueOf() / 100) : doce.allowance
                                ,
                                day: date
                            });
                            orderSumDay.save(function (err, docs) {
                                if (err) {
                                    console.log("保存失败");
                                }
                            });
                            if (store.length > 0) {
                                fn(store);
                            } else {
                                console.log("统计完成");
                                result.code = '00'
                                result.msg = '统计完成'
                                return result;
                            }
                        })
                    }
                };
                fn(store);
            });
        } else {
            console.log('err=============================================');
            console.log('删除失败');
            console.log('err');
        }
    });
};

/**
 *根据店铺统计该店铺的营销分析报告
 * @param storeId
 * @param collback
 */
function getDevice(storeId, collback) {
    Device.find({"storeId": ObjectId(storeId)}, function (err, doce) {
        var result = {
            amount: 0,
            allowance: 0,
            total: 0,
            reservationNum: 0,
            noPayNum: 0,
            usingNum: 0,
            completedNum: 0,
            cancelNum: 0
        };
        if (doce != null && doce != '') {
            var fn = function (doce) {
                var pop = doce.pop();
                getOrderSumDay(pop._id, function (err, res) { //根据设备获取订单分组文档
                    result.amount += res.amount;
                    result.allowance += res.allowance;
                    result.total += res.total;
                    result.reservationNum += res.reservationNum;
                    result.noPayNum += res.noPayNum;
                    result.usingNum += res.usingNum;
                    result.completedNum += res.completedNum;
                    result.cancelNum += res.cancelNum;
                    if (doce.length > 0) {
                        fn(doce);
                    } else {
                        collback(err, result);
                    }
                });
            };
            fn(doce);
        } else {
            collback(err, null);
        }
    });

}
/**
 * 根据设备id获取订单分组文档
 * @param deviceId
 */
function getOrderSumDay(deviceId, collback) {

    //获取当前时间  YYYY/MM/DD 00:00:00 用于查看当天订单
    var a = moment().format("YYYY/MM/DD 00:00:10");
    var start = new Date(a);
    //分组查询数据
    mongoose.connection.collections['orders'].group({"status": true}, {
            "deviceId": ObjectId(deviceId),
            "createAt": {$gte: start}
        }, {"count": 0, "amount": 0, "allowance": 0}
        , function (obj, prev) {   //统计每组的数量，支付金额，金额
            prev.count++;
            if (obj.status != '50' && obj.status != '10' && obj.status != '60') {
                prev.amount += obj.amount;
                prev.allowance += obj.payment;
            }
        }
        , true
        , function (err, results) {  //返回结果
            var result =
            {
                amount: 0,
                allowance: 0,
                total: 0,
                reservationNum: 0,
                noPayNum: 0,
                usingNum: 0,
                completedNum: 0,
                cancelNum: 0
            };
            for (i in results) {
                switch (results[i].status) {
                    case '10':
                        result.reservationNum += results[i].count;
                        break;
                    case '20':
                        result.noPayNum += results[i].count;
                        break;
                    case '30':
                        result.usingNum += results[i].count;
                        break;
                    case '40':
                        result.completedNum += results[i].count;
                        break;
                    case '50':
                        result.cancelNum += results[i].count;
                        break;
                    default:
                        break;
                }
                result.total += results[i].count;
                // Calculation of Sum(Quantity)          result.amount += results[i].amount;
                // Calculation of Sum(Sales)
                result.allowance += results[i].allowance;
                result.amount += results[i].amount;
            }
            collback(err, result);
        });
}

/**
 * 每天0点0分统计前一天每个洗衣店的所有订单，和金额的统计，保存数据
 * @param req
 * @param res
 */
function saveOrderDayReport() {
    var result = {};
    var d = moment().add('days', -1).format("YYYY/MM/DD 08:00:00");
    var date = new Date(d);
    Store.find({'franchiseeId': {'$exists': true}}).populate('franchiseeId').exec(function (err, store) {
        if (store == null) {
            return;
        }
        var fn = function (store) {
            var pop = store.pop();
            if (pop == null && pop == undefined) {
                result.code = '09'
                result.msg = '没有洗衣店信息'
                return result;
            }
            if(pop.storeStatus == "2"){
                fn(store);
            }else {
                getDeviceReport(pop._id, function (err, doce) {     //根据店铺统计该店铺的营销分析报告
                    var orderSum = new OrderSum({
                        franchiseeName: pop.franchiseeId != null ? pop.franchiseeId.username : ""
                        ,
                        franchiseeId: pop.franchiseeId != null ? pop.franchiseeId._id : ''//加盟商ID
                        ,
                        storeId: pop._id//所属洗衣店
                        ,
                        storeName: pop.name
                        ,
                        ratio: pop.ratio
                        ,
                        total: doce == null ? 0 : doce.total
                        ,
                        reservationNum: doce == null ? 0 : doce.reservationNum
                        ,
                        noPayNum: doce == null ? 0 : doce.noPayNum
                        ,
                        usingNum: doce == null ? 0 : doce.usingNum
                        ,
                        completedNum: doce == null ? 0 : doce.completedNum
                        ,
                        cancelNum: doce == null ? 0 : doce.cancelNum
                        ,
                        allowance: doce == null ? 0 : doce.allowance
                        ,
                        amount: doce == null ? 0 : doce.amount
                        ,
                        realIincome: doce == null ? 0 : pop.ratio ? doce.allowance * (pop.ratio.valueOf() / 100) : doce.allowance
                        ,
                        day: date
                    });
                    orderSum.save(function (err, docs) {
                        if (err) {
                            console.log("保存失败");
                        }
                    });
                    if (store.length > 0) {
                        fn(store);//递归循环计算统计结果保存
                    } else {
                        console.log("统计完成");
                        result.code = '00';
                        result.msg = '统计完成';
                        return result;
                    }
                })
            }
        };
        fn(store);
    });
};
/**
 *根据店铺统计该店铺的营销分析报告
 * @param storeId
 * @param collback
 */
function getDeviceReport(storeId, collback) {
    Device.find({"storeId": ObjectId(storeId)}, function (err, doce) {
        var result = {
            amount: 0,
            allowance: 0,
            total: 0,
            reservationNum: 0,
            noPayNum: 0,
            usingNum: 0,
            completedNum: 0,
            cancelNum: 0
        };
        if (doce != null && doce != '') {
            var fn = function (doce) {
                var pop = doce.pop();
                getOrderGroup(pop._id, function (err, res) { //根据设备获取订单分组文档
                    result.amount += res.amount;
                    result.allowance += res.allowance;
                    result.total += res.total;
                    result.reservationNum += res.reservationNum;
                    result.noPayNum += res.noPayNum;
                    result.usingNum += res.usingNum;
                    result.completedNum += res.completedNum;
                    result.cancelNum += res.cancelNum;
                    if (doce.length > 0) {
                        fn(doce);
                    } else {
                        collback(err, result);
                    }
                });
            };
            fn(doce);
        } else {
            collback(err, null);
        }
    });

}
/**
 * 根据设备id获取订单分组文档
 * @param deviceId
 */
function getOrderGroup(deviceId, collback) {

    //获取当前时间  YYYY/MM/DD 00:00:00 用于查看当天订单
    var d = moment().add('days', -1).format("YYYY/MM/DD 00:00:00");
    var a = moment().format("YYYY/MM/DD 00:00:00");
    var start = new Date(d);
    var end = new Date(a);
    var s = null;
    //分组查询数据
    mongoose.connection.collections['orders'].group({"status": true}, {
            "deviceId": ObjectId(deviceId),
            "createAt": {$gte: start, $lt: end}
        }, {"count": 0, "amount": 0, "allowance": 0}
        , function (obj, prev) {   //统计每组的数量，支付金额，金额
            prev.count++;
            if (obj.status != '50' && obj.status != '10' && obj.status != '60') {
                prev.amount += obj.amount;
                prev.allowance += obj.payment;
            }
        }
        , true
        , function (err, results) {  //返回结果
            var result =
            {
                amount: 0,
                allowance: 0,
                total: 0,
                reservationNum: 0,
                noPayNum: 0,
                usingNum: 0,
                completedNum: 0,
                cancelNum: 0
            };
            for (i in results) {
                switch (results[i].status) {
                    case '10':
                        result.reservationNum += results[i].count;
                        break;
                    case '20':
                        result.noPayNum += results[i].count;
                        break;
                    case '30':
                        result.usingNum += results[i].count;
                        break;
                    case '40':
                        result.completedNum += results[i].count;
                        break;
                    case '50':
                        result.cancelNum += results[i].count;
                        break;
                    default:
                        break;
                }
                result.total += results[i].count;
                // Calculation of Sum(Quantity)          result.amount += results[i].amount;
                // Calculation of Sum(Sales)
                result.allowance += results[i].allowance;
                result.amount += results[i].amount;
            }
            collback(err, result);
        });
}

/**
 * 每5分钟统计一下首页数据
 */
function createVendorDashboardData() {
    // 将vendorDashboard表中没有的加盟商加入到表中
    Franchisee.find({
        'approvedStatus': '02'
        , 'isEnabled': true
    }, function (err, franchisees) {
        console.log("franchisees count ===========================>" + franchisees.length);
        countOrder(franchisees);
    });
}

/**
 * 统计加盟商首页的具体方法
 * @param franchisees
 */
function countOrder(franchisees) {
    // 上个月开始时间点
    var lastMonthStart = moment().add(-1, 'month').startOf('month');
    // 上个月结束时间点
    var lastMonthStop = moment().add(-1, 'month').endOf('month');
    // 这个月开始时间点
    var thisMonthStart = moment().startOf('month');
    // 这周开始时间点
    var vWeekOfDay=moment().format("E");//算出这周的周几
    var thisWeekStart = moment().add(-vWeekOfDay + 1, 'day').startOf('day');
    // 今天开始时间点
    var thisDayStart = moment().startOf('day');
    // 当前时间点
    var now = moment();
    console.log("lastMonthStart ===========================>" + lastMonthStart);
    console.log("lastMonthStop ===========================>" + lastMonthStop);
    console.log("thisMonthStart ===========================>" + thisMonthStart);
    console.log("thisWeekStart ===========================>" + thisWeekStart);
    console.log("thisDayStart ===========================>" + thisDayStart);
    console.log("now ===========================>" + now);


    franchisees.forEach(function (item) {
        var vendorDashboard = new VendorDashboard();
        vendorDashboard.franchiseeId = item._id;

        var cond = {'name': 'lastMonth', 'start': lastMonthStart, 'end': lastMonthStop, 'franchiseesId': item._id};
        countOrderWithCond(cond, function (lastMonth) {
            vendorDashboard.lastMonthOrderNum = lastMonth.allOrderNum;
            vendorDashboard.lastMonthOrderAmount = lastMonth.allAmount;
            vendorDashboard.lastMonthAmount = lastMonth.amount;

            cond = {'name': 'thisMonth', 'start': thisMonthStart, 'end': now, 'franchiseesId': item._id};
            countOrderWithCond(cond, function (thisMonth) {
                vendorDashboard.thisMonthOrderNum = thisMonth.allOrderNum;
                vendorDashboard.thisMouthOrderAmount = thisMonth.allAmount;
                vendorDashboard.thisMouthAmount = thisMonth.amount;

                cond = {'name': 'thisWeek', 'start': thisWeekStart, 'end': now, 'franchiseesId': item._id};
                countOrderWithCond(cond, function (thisWeek) {
                    vendorDashboard.thisWeekOrderNum = thisWeek.allOrderNum;
                    vendorDashboard.thisWeekOrderAmount = thisWeek.allAmount;
                    vendorDashboard.thisWeekAmount = thisWeek.amount;

                    cond = {'name': 'thisDay', 'start': thisDayStart, 'end': now, 'franchiseesId': item._id};
                    countOrderWithCond(cond, function (thisDay) {
                        vendorDashboard.todayOrderNum = thisDay.allOrderNum;
                        vendorDashboard.todayOrderAmount = thisDay.allAmount;
                        vendorDashboard.todayAmount = thisDay.amount;

                        countDevice(item._id, function (countNum) {
                            vendorDashboard.standby = countNum.standby;
                            vendorDashboard.run = countNum.run;
                            vendorDashboard.broken = countNum.broken;
                            console.log("vendorDashboard ===========================>" + JSON.stringify(vendorDashboard));
                            VendorDashboard.remove({'franchiseeId': new ObjectId(item._id)}, function (err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    vendorDashboard.save();
                                }
                            });
                        });


                    });
                });
            });
        })
    });
}

/**
 * 按时间段统计
 * @param cond
 * @param callback
 */
function countOrderWithCond(cond, callback) {
    var result = {};
    Order.find({
        'franchiseeId': cond.franchiseesId,
        'status': '40',
        'createAt': {
            $gte: cond.start,
            $lt: cond.end
        }
    }).populate('storeId').exec(function (err, orders) {
        var allOrderNum = 0, allAmount = 0, amount = 0;
        if (orders) {
            orders.forEach(function (item) {
                allOrderNum++;

                var ratio = item.storeId == null ? '' : item.storeId.ratio;
                if (!ratio) {
                    ratio = 100;
                }

                allAmount = allAmount + item.allowance;
                amount = amount + item.allowance * ratio;
            });
        }
        result.allOrderNum = allOrderNum;
        result.allAmount = allAmount;
        result.amount = amount / 100;

        console.log("result ===========================>" + JSON.stringify(result));
        callback(result);


    });

}

function countDevice(franchiseeId, callback) {
    Device.find({'franchiseeId': franchiseeId}, function (err, devices) {
        var countNum = {standby: 0, run: 0, broken: 0};
        devices.forEach(function (item) {
            switch (item.status) {
                case '0':
                    countNum.standby++;
                    break;
                case '1':
                    countNum.run++;
                    break;
                case '2':
                    countNum.broken++;
                    break;
                default:
                    break;
            }
        });
        callback(countNum);
    });
}
