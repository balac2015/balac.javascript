/**
 * Created by ZhangXiao on 2015/10/21.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CreateUpdatedAt = require('mongoose-timestamp');
var ObjectId = Schema.ObjectId;

var DataTable = require('mongoose-datatable');

DataTable.configure({verbose: true, debug: true});
mongoose.plugin(DataTable.init);

/**
 * 设备型号价格
 * @type {Schema}
 */
var DevicePriceSchema = new Schema({
  type: {type: String, trim: true, required: true, default: ''}//设备型号
  , shortName: {type: String}
  , price: {type: Number, trim: true, required: true, default: '0.00'}//基准价格
  , parentId: {type: ObjectId, ref: "DevicePrice"} // 上级大类ID
  , topId: {type: ObjectId, ref: "DevicePrice"} // 顶层ID
  , deep: {type: String, trim: true, required: true} // deep
  , command: {type: String, trim: true}// 洗衣命令
  , note: {type: String, trim: true}// 备注
  , execMinute: {type: String, trim: true}//预计执行时间
  , iconClass: {type: String} //图标css类
});

DevicePriceSchema.plugin(CreateUpdatedAt);

DevicePriceSchema.methods = {

};

var DevicePrice = mongoose.model('DevicePrice', DevicePriceSchema);