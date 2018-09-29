/**
 * Created by yu869 on 2016/1/29.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;
var moment = require('moment');

/**
 * 加盟商首页数据
 * @type {Schema}
 */
var VendorDashboardSchema = new Schema({
    franchiseeId: {type: ObjectId, ref: 'Franchisee'}//所属加盟商
    , lastMonthOrderNum: {type: Number, default: 0} // 上月订单数
    , lastMonthOrderAmount: {type: Number, default: 0} // 上月收入总额
    , lastMonthAmount: {type: Number, default: 0} // 上月加盟商收入
    , todayOrderNum: {type: Number, default: 0} // 今天订单数
    , todayOrderAmount: {type: Number, default: 0} // 今天收入总额
    , todayAmount: {type: Number, default: 0} // 今天加盟商收入
    , thisWeekOrderNum: {type: Number, default: 0} // 本周订单总数
    , thisWeekOrderAmount: {type: Number, default: 0} // 本周总收入
    , thisWeekAmount: {type: Number, default: 0} // 本周加盟商收入
    , thisMonthOrderNum: {type: Number, default: 0} // 本月订单总数
    , thisMouthOrderAmount: {type: Number, default: 0} // 本月总收入
    , thisMouthAmount: {type: Number, default: 0} // 本月加盟商收入
    , standby: {type: Number, default: 0} // 停止
    , run: {type: Number, default: 0} // 运行
    , broken: {type: Number, default: 0} // 损坏
    , createAt: {type: Date, default: Date.now}//创建时间
});

var VendorDashboard = mongoose.model('VendorDashboard', VendorDashboardSchema);