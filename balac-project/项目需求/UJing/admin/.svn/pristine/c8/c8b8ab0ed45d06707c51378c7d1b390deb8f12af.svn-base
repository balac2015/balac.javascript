/**
 * Created by ZhangXiao on 2015/6/11.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CreateUpdatedAt = require('mongoose-timestamp');
var ObjectId = Schema.ObjectId;

var DataTable = require('mongoose-datatable');

DataTable.configure({verbose: true, debug: true});
mongoose.plugin(DataTable.init);


/**
 * 洗衣店信息
 * @type {Schema}
 */
var StoreSchema = new Schema({
  franchiseeId: {type: ObjectId, ref: 'Franchisee', require: true}//加盟商ID
  , schoolId: {type: ObjectId, ref: 'Franchisee.schoolId', require: true}//服务主体
  , name: {type: String, trim: true, required: true}//洗衣店名称
  , no: {type: String, trim: true, required: true}
  , province: {type: ObjectId, ref: 'Province', require: true}
  , city: {type: ObjectId, ref: 'City', require: true}
  , district: {type: ObjectId, ref: 'District', require: true}
  , start: {type: String}// 开始营业时间
  , end: {type: String}// 结束营业时间
  , address: {type: String}//详细地址
  , logo: {type: String} // 店铺LOGO
  , tel: {type: String} //电话号码
  , coordinate: [] //经度,纬度  lat, lng
  , mapTcLat: {type: String}//腾讯地图经纬度
  , storeStatus: {type: String} //洗衣店审核资格 0,未审核1,审核通过,2,逻辑删除
  , ratio: {type: String} // 分成比例
  , label: {type: String} //标签
  , discount: {type: String} // 促销价
  , startDate: {type: Date} // 促销开始时间
  , endDate: {type: Date} // 促销结束时间
});

StoreSchema.plugin(CreateUpdatedAt);

StoreSchema.methods = {
  /**
   * 保存洗衣店信息
   * @param store
   * @param callback
   */
  saveStore: function (obj, callback) {
    var store = new Store(obj);
    store.save(function (err, result) {
      callback(err, result);
    });
  },
  /**
   * 统计店铺有多少
   * @param req
   * @param res
   * @param callback
   */
  count:function(req,res,callback){
    Store.count({storeStatus:'1'}, function(err, count){
      if(err){
        console.log(err);
      }else{
        callback(count);
      }
    });
  },
  /**
   * 查附近的洗衣店
   */
  findNearStore: function (near, callback) {
    var near = [120.385, 31.5099];
    console.log("1111111");
    //使用查询时，需要在数据库中对集合stores加索引db.stores.ensureIndex({"coordinate":"2d"},{"background":"true"})
    //params
    //near:相对坐标
    //num:显示条数
    //spherical:为true则为弧度，否则为度
    //distanceMultiplier:转化公里数
    //maxDistance:查附近最大范围(1/6371 代表查附近一公里)
    Store.collection.geoNear(near, {
      num: 2,
      spherical: true,
      distanceMultiplier: 6371,
      maxDistance: 1 / 6371
    }, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        if (result.ok == 1) {
          for (var i = 0; i < result.results.length; i++) {
            var obj = result.results[i];
            console.log('距离:' + parseInt(obj.dis * 1000) + "米");
            console.log("详细地址:" + obj.obj.address);
          }
        }

      }
    });
  }
};

var Store = mongoose.model('Store', StoreSchema);
