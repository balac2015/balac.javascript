/**
 * Created by ZhangXiao on 2015/6/11.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var CreateUpdatedAt = require('mongoose-timestamp');

var DataTable = require('mongoose-datatable');

DataTable.configure({verbose: true, debug: true});
mongoose.plugin(DataTable.init);

/**
 * 设备基本信息维护
 * @type {Schema}
 */
var DeviceSchema = new Schema({
  id: ObjectId
  , name: {type: String, trim: true}//设备名称
  , type: {type: String} // 设备类型 1:洗衣机 2:烘干机 3 洗鞋机
  , no: {type: String}//设备编号
  , sn: {type: String}//序列号
  , devicePriceId: {type: ObjectId, ref: 'DevicePrice'}//设备型号
  , status: {type: String}//状态 0：空闲  1: 使用中 2: 故障, 3:禁用, 4逻辑删除
  , useDate: {type: Date} //投入使用时间
  , storeId: {type: ObjectId, ref: 'Store'}//所属洗衣店
  , franchiseeId:{type: ObjectId, ref: 'Franchisee'}//所属加盟商
  , useTime: { type: Date}//开始使用时间
  , endData: { type: Date}//预计释放时间
  , execTime: { type: Number}//预计执行时间(分钟)
  , virtualId:{ type: String}//绑定设备云端虚拟ID（绑定设备时写入）
  , deviceType: {type: String} // 设备类型
  , qrCode: {type: String} // 二维码
});

DeviceSchema.plugin(CreateUpdatedAt);

DeviceSchema.methods = {

  /**
   * 保存设备信息
   * @param store
   * @param callback
   */
  saveDevice: function (obj, callback) {
    var device = new Device(obj);
    device.save(function (err, result) {
      callback(err, result);

    });
  }

};

var Device = mongoose.model('Device', DeviceSchema);
