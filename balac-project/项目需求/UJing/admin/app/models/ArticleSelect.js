/**
 * Created by JiBingKun on 2015/6/29.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;


/**
 * 下拉列表
 * @type {Schema}
 */
var ArticleSelectSchema = new Schema({
    id: ObjectId
    , distinguish  : { type: String, trim: true}//下拉选项的区分
    , articleClass : { type: String, trim: true}//文章分类下拉
    , notifyClass  : { type: String, trim: true}//通知入口下拉
})

var ArticleSelect  =  mongoose.model('ArticleSelect', ArticleSelectSchema,'ArticleSelect')
