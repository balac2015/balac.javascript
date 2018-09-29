/**
 * Created by ZhangXiao on 2015/6/11.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId

/**
 * 常用洗衣房
 * @type {Schema}
 */
var MyStoreSchema = new Schema({
    id: ObjectId
    , openid: {type :String, require:true}//微信用户openid
    , storeId: {type: ObjectId,ref:'Store', required: true}//洗衣房ID
    , dis: {type: String}//距离公里数
})

MyStoreSchema.methods = {
    saveMyStore: function(obj, callback){
        //如果有这条数据了不新增
        var query = {'openid': obj.openid, 'storeId':obj.storeId};
        MyStore.findOne(query, function(err, result){
            if(!err && result && result != null){
                //do not save
            }else{
                new MyStore(obj).save();
            }
        });
    },

    /**
     * 查常用的洗衣店
     * @param query
     * @param callback
     */
    findByOpenid: function(openid, callback){
        MyStore.find({'openid': openid}).populate('storeId').exec(function(err, result){
            //if(!err && result){
            //    var datas = [];
            //    for(var i=0; i<result.length;i++){
            //        var data = result[i].storeId;
            //        //标签处理
            //        if(data.label != null && data.label != undefined && data.label != 'undefined'){
            //            var labels = [];
            //            var strs = data.label.split(',');
            //            strs.forEach(function(str){
            //                if(str == 'clothes'){
            //                    labels.push('烘干');
            //                }else if(str == 'shoe'){
            //                    labels.push('洗鞋');
            //                }else if(str == 'drying'){
            //                    labels.push('洗衣');
            //                }
            //            });
            //            data.label = labels;
            //        }
            //        data.dis = result[i].dis;
            //        datas.push(data);
            //    }
            //}
            callback(err, result);
        });
    }
}

var MyStore = mongoose.model('MyStore', MyStoreSchema)