/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

/**
 * 常用村小二信息
 */
var FavStoreSchema = new Schema({
  id: ObjectId
  , userId: ObjectId//汇款人
  , reciverId: ObjectId//收款人
  , storeId: ObjectId//店小二
})

module.exports = mongoose.model('FavStore', FavStoreSchema)

