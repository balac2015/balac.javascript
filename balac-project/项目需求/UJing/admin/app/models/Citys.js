/**
 * Created by ZhangXiao on 2015/6/12.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

/**
 * 城市信息
 * @type {Schema}
 */
var CitysSchema = new Schema({
    id: ObjectId
    , region : { type: String, trim: true}//区域
    , state : { type: String, trim: true, required: true }//省
    , city: { type: String, trim: true, required: true}//市
    , district: { type: String, trim: true, required: true }//镇
    , cbd: { type: String, trim: true}//商区
})

mongoose.model('Citys', CitysSchema)
