/**
 * Module dependencies.
 */
require('./../models/CodeType.js');

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , CodeType = mongoose.model('CodeType')
    , ObjectId = Schema.ObjectId;

/**
 * Beta status
 */
var CodeListSchema = new Schema({
  id: ObjectId
  , codeTypeId: {type :ObjectId, ref:'CodeType', require:true}//类型
  , name: { type: String, trim: true, require: true}//名称
  , value: { type: String, trim: true, require: true}//值
  , note1: { type: String, trim: true}//备注1
  , note2: { type: String, trim: true}//备注2
  , note3: { type: String, trim: true}//备注3
  , seq: { type: Number}//顺序
});

CodeListSchema.methods = {

  /**
   * 保存参数明细
   * @param type
   * @param obj
   * @param callback
   */
  saveCodeList:function (type, obj, callback){
    new CodeType().findByType(type, function(err, codeType){
      if(!err){
        var codeTypeId = codeType._id;
        //循环obj数组
        for(var i in obj){
          var codeList = new CodeList(obj[i]);
          codeList.codeTypeId = codeTypeId;
          //需要调整
          codeList.seq = i;
          codeList.save(function(err, result){
            callback(err, result);
          });
        }
      }else{
        throw new Error("参数类型:"+ type +"不存在");
      }
    });
  },


  /**
   * 根据type查参数列表
   * @param type
   * @param callback
   */
  findByCodeType : function(type, callback){
    if(typeof type == 'object'){
      //根据seq排序 1:asc -1:desc
      CodeList.find({codeTypeId: type}).sort({seq:1}).find(function(err, result){
        callback(err, result);
      });
    }else{
      new CodeType().findByType(type, function(err, obj){
        if(!err){
          var typeId = obj._id;
          //根据seq排序 1:asc -1:desc
          //populate 加载关联对象
          CodeList.find({codeTypeId: typeId}).sort({seq:1}).find().populate('codeTypeId').exec(function(err, result){
            if(err){
              console.log(err);
            }
            callback(err, result);
            //console.log(result);
            ////读取关联对象中的属性值
            //console.log(result[0].codeTypeId.codeDesc);
          });
        }
      });
    }
  }

}

var CodeList = mongoose.model("CodeList", CodeListSchema);

