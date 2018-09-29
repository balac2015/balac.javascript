/**
 * Created by ZhangXiao on 2015/10/21.
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

/**
 * 设备价格申请
 * @type {Schema}
 */
var DevicePriceApplySchema = new Schema({
  id: ObjectId
  , deviceId: {type: ObjectId, ref: 'Device', require: true}//设备ID
  , storeId: {type: ObjectId, ref: 'Store', require: true}//洗衣店ID
  , franchiseeId: {type :ObjectId, ref:'Franchisee', require:true}//加盟商ID
  , devicePriceId: {type: ObjectId, ref: 'DevicePrice', require: true}//设备型号及基准价
  , type: {type: String} // 类型
  , price: {type: Number, trim: true, required: true}//设定价格
  , command: {type: String, trim: true, required: true} //命令
  , status: {type: String}//申请状态 // 0 申请 1申请通过 2申请失败
  , submitBy: {type: String}//申请人
  , submitTime: {type: Date}//申请时间
  , approvedBy: {type: String}//审批人
  , approvedTime: {type: Date}//审批时间
  , reason: {type: String}//审批说明
});

DevicePriceApplySchema.methods = {
  findByDeviceId: function(deviceId, callback){
    DevicePriceApply.find({"deviceId": deviceId}).populate("devicePriceId").exec(function(err, result){
      callback(err, result);
    });
  }
}

var DevicePriceApply = mongoose.model('DevicePriceApply', DevicePriceApplySchema);
