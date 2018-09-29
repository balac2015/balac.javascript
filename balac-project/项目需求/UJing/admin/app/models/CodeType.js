/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

/**
 * 参数类型表
 */
var CodeTypeSchema = new Schema({
  id: ObjectId
  , codeType: { type: String, trim: true, require: true, unique: true }//类型
  , codeDesc: { type: String, trim: true}//类型描述
})

/**
 * 写一些公共方法
 * @type {{}}
 */
CodeTypeSchema.methods = {

  /**
   * 新增
   * @param obj
   * @param callback
   */
  saveCodeType: function(obj, callback){
    var instance = new CodeType(obj);

    //检查codeType是否重复
    CodeType.count({codeType:instance.codeType}, function(err, count){
      if(count != null && count > 0){
        var err = "参数类型:" + instance.codeType + "已存在，不能重复添加";
        throw new Error(err);
      }else{
        instance.save(function(err, obj){
          callback(err, obj);
        });
      }
    });
  },

  findByType : function (type, callback){
      CodeType.findOne({codeType:type},function(err, obj){
      callback(err, obj);
    });
  }

}

var CodeType = mongoose.model("CodeType", CodeTypeSchema);