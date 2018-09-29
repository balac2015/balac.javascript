/**
 * Created by JiBingKun on 2015/07/07.
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;


/**
 * 文章列表
 * @type {Schema}
 */
var ArticleTypeSchema = new Schema({
  id: ObjectId
  , number : {type:Number} //编号
  , articleClass: {type: String, trim: true}//文章分类
  , orderBy : {type:Number} //排序
  , pId : {type:Number} //父ID
  , addTime: {type: Date}//添加时间
})

ArticleTypeSchema.methods = {
  //分页功能
  findPagination: function (obj, callback) {
    //q:查询条件
    var q = obj.search || {};
    console.log(q);
    //col:数据返回字段
    var col = obj.columns;
    console.log(col);
    //pageNumber:当前是第几页，如果不存在默认为第一页
    var pageNumber = obj.page.num || 1;
    console.log(pageNumber);
    //resultsPerPage:每页多少条记录
    var resultsPerPage = obj.page.limit || 10;
    console.log(resultsPerPage);

    var skipFrom = (pageNumber * resultsPerPage) - resultsPerPage;
    console.log(skipFrom);
    //排序功能默认用插入时间倒叙：sort(‘-create_date’)
    var query = Article.find(q, col).sort('create_date').skip(skipFrom).limit(resultsPerPage);
    query.exec(function (error, results) {
      console.log(results);
      if (error) {
        callback(error, null, null);
      } else {
        Article.count(q, function (error, count) {
          if (error) {
            callback(error, null, null);
          } else {
            var pageCount = Math.ceil(count / resultsPerPage);
            callback(null, pageCount, results, count);
          }
        });
      }
    });
  }
}

var ArticleType = mongoose.model('ArticleType', ArticleTypeSchema)
