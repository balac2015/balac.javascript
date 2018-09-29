/**
 * Created by ZhangXiao on 2015/6/11.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

/**
 * 登录日志
 * 实现自动登录功能
 * @type {Schema}
 */
var LoginLogSchema = new Schema({
    id: ObjectId
    , mobile: { type: String, trim: true, required: true, unique: true }//手机号
    , loginAt: { type: Date, default: Date.now }//登录时间
})

mongoose.model('LoginLog', LoginLogSchema)
