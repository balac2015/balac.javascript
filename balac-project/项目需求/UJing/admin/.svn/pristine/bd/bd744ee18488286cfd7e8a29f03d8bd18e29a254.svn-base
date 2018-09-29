/**
 * Created by ZhangXiao on 2015/6/12.
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
var CreateUpdatedAt = require('mongoose-timestamp')
var DataTable = require('mongoose-datatable')

DataTable.configure({verbose: true, debug: true})
mongoose.plugin(DataTable.init)

/**
 * 订单日报
 * @type {Schema}
 */
var DayFrancSchema = new Schema({
  franchiseeId: ObjectId,
  franchiseeName: String
  , total: {type: Number}//总订单数
  , reservationNum: {type: Number}//预约订单数 10
  , noPayNum: {type: Number}//未支付订单数 20
  , usingNum: {type: Number}//使用中订单数 30
  , completedNum: {type: Number}//已完成订单数 40
  , cancelNum: {type: Number}//已取消订单数 50
  , allowance: {type: Number}//支付金额
  , amount: {type: Number}//金额
  , realIincome:{type: Number,default:0} //实际收入
  ,day:{type:Date}
})

DayFrancSchema.plugin(CreateUpdatedAt)
DayFrancSchema.methods = {
  //分页功能
  findTopByAllowance: function (querys,callback) {
    //q:查询条件

    //排序功能默认用插入时间倒叙：sort(‘-create_date’)
    var query = DayFranc.find(querys).sort({"allowance":-1}).limit(10);
    query.exec(function (error, results) {
      callback(results);
    });
  }
}

var DayFranc = mongoose.model('DayFranc', DayFrancSchema)
