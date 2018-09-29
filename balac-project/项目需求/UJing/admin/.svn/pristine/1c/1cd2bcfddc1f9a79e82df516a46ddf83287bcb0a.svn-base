
/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

/**
 * User Schema
 */
var WechatFansSchema = new Schema({
  id: ObjectId
  , subscribe: { type: String, trim: true}
  , openid: { type: String, trim: true, unique: true, require: true}
  , nickname: { type: String, trim: true}
  , sex: { type: String, trim: true }
  , language: { type: String, trim: true}
  , city: { type: String, trim: true}
  , province: { type: String, trim: true}
  , country: { type: String, trim: true}
  , headimgurl: { type: String, trim: true}
  , subscribe_time: { type: String, trim: true}
  , createAt: { type: Date, default: Date.now}
})

WechatFansSchema.methods = {
    findAndSave : function(obj){
        if(!obj){
            //do nothing
        }
        //先查openid是否已存在，存在则更新
        WechatFans.count({openid: obj.openid}, function(err, count){
            if(count == 0){
                var wechatFans = new WechatFans(obj);
                wechatFans.save(function(err, obj){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(obj.openid);
                    }
                });
            }else{
                //更新粉丝信息
                WechatFans.findOne({openid: obj.openid}, function(err, result){
                    result.subscribe = obj.subscribe;
                    result.nickname = obj.nickname;
                    result.sex = obj.sex;
                    result.language = obj.language;
                    result.city = obj.city;
                    result.province = obj.province;
                    result.country = obj.country;
                    result.headimgurl = obj.headimgurl;
                    result.headimgurl = obj.headimgurl;
                    result.subscribe_time = obj.subscribe_time;
                    result.save();
                });
            }
        });
    }
}

var WechatFans = mongoose.model('WechatFans', WechatFansSchema)




