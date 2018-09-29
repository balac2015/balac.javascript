/**
 * Created by ZhangXiao on 2015/6/12.
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

/**
 * 收款人地址
 * @type {Schema}
 */
var AddressSchema = new Schema({
  id: ObjectId
  , cityId : ObjectId//城市
  , userId : ObjectId//汇款人
  , address: { type: String, trim: true, required: true}//详细地址
})

mongoose.model('Address', AddressSchema)
