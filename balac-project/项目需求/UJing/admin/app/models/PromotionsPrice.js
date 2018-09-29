/**
 * Created by xingjie201 on 2015/12/4.
    * 促销价
    * @type {*|exports}
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CreateUpdatedAt = require('mongoose-timestamp');
var ObjectId = Schema.ObjectId;

var PromotionsPriceSchema = new Schema({
    price: {type: Number, trim: true, required: true, default: '0.00'}//促销价
    , effectiveTime: {type: Date, trim: true}//生效时间
    , failureTime: {type: Date, trim: true}//失效时间
});

PromotionsPriceSchema.plugin(CreateUpdatedAt);

PromotionsPriceSchema.methods = {
    /**
     * 查当前时段的促销价
     * @param callback
     */
    findCurrentPromotionsPrice: function(callback){
        var now = new Date();
        PromotionsPrice.find({"effectiveTime": {"$lt": now}, "failureTime": {"$gte": now}}).findOne(function(err, result){
            callback(err, result);
        });
    }
};

var PromotionsPrice = mongoose.model('PromotionsPrice', PromotionsPriceSchema);