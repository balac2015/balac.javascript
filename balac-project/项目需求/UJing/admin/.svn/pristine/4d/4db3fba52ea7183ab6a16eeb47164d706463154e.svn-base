/**
 * Created by ZhangXiao on 2015/10/27.
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
var crypto = require('crypto');
var CreateUpdatedAt = require('mongoose-timestamp');
var DataTable = require('mongoose-datatable');

DataTable.configure({verbose: true, debug: true});
mongoose.plugin(DataTable.init);

var status = [{"code": '01', "name": '待审核'}
  , {"code": '02', "name": '通过'}
  , {"code": '03', "name": '不通过'}];


/**
 * 加盟商
 * @type {Schema}
 */
var FranchiseeSchema = new Schema({
  fullname: {type: String, trim: true, require: true, default: ''}//加盟申请人
  , numberID: {type: String, trim: true, default: ''}         //身份证号
  , tel: {type: String, trim: true, default: ''}          //固定电话
  , mobile: {type: String, trim: true, required: true, default: ''}         //移动电话
  , email: {type: String, trim: true, required: true, default: ''}           //邮箱
  , username: {type: String, require: true}
  , hashed_password: {type: String, require: true}
  , salt: {type: String}
  , photo_profile: String
  , postCode: {type: String, trim: true, default: ''}          //邮政编码
  , school: [{
    schoolId: ObjectId
    , schoolName: {type: String, trim: true, default: ''}         //学校名称      写学校全称
    , ubietyAddress: {type: String, trim: true, default: ''}   //所在省市      例如：江苏省无锡市
    , stuNum: {type: Number, trim: true, default: ''}        //在校大学生数量
    , dormitoryNum: {type: Number, trim: true, default: ''}        //学校宿舍楼数量
    , washhouseNum: {type: Number, trim: true, default: ''}        //洗衣店数量       如没有洗衣店就写“无”
    , washerNum: {type: Number, trim: true, default: ''}        //公用洗衣机数量
    , washerLocation: {type: String, trim: true, default: ''}       //公用洗衣机摆放位置
    , mgSubject: {type: String, trim: true, default: ''}       //目前的管理主体     可选择：代理商、学校自营、个人管理、其他（需填写）
    , washerPhoto: {type: String, trim: true, default: ''}       //洗衣机现状照片     需添加校园洗衣机的照片，包括洗衣店及洗衣机近照
    , extendPolicy: {type: String, trim: true, default: ''}//校园推广策略
  }]
  , joinType: {type: String, trim: true, default: ''}        //加盟类型    "00"个人加盟、"01"企业加盟
  , personal: {
    personalAddress: {type: String, trim: true, default: ''} //个人地址
    , postCode: {type: String, trim: true, default: ''}
    , emergencyPerson: {type: String, trim: true, default: ''}       //紧急联系人
    , emergencyTel: {type: String, trim: true, default: ''}      //紧急联系电话
    , isStaff: {type: Boolean, trim: true, default: ''}      //是否美的内部员工
    , cardPhoto: {type: String, trim: true, default: ''}      //上传个人身份证
  }
  , company: {
    companyName: {type: String, trim: true, default: ''}      //公司名称
    , companyCorporation: {type: String, trim: true, default: ''}       //公司法人代表
    , registerDate: {type: Date, trim: true, default: ''}       //注册日期
    , registerCapital: {type: Number, trim: true, default: ''}       //注册资金
    , registerAddress: {type: String, trim: true, default: ''}        //注册地址
    , postCode: {type: String, trim: true, default: ''}
    , isAgent: {type: Boolean, trim: true, default: ''}          //是否美的集团代理商
    , credentials: {type: String, trim: true, default: ''}          //  上传企业营业执照、组织机构代码证、税务登记证
    , experience: {type: String, trim: true, default: ''}         //公司代理校园洗衣机的经历
  }
  , applyTime: {type: Date, default: Date.now}//申请时间
  , updateTime: {type: Date, trim: true, default: ''}//更新时间
  , approvedStatus: {type: String, trim: true, default: ''}//审核状态 // 01待审核 02 通过 03 不通过
  , approvedTime: {type: Date, trim: true, default: ''}//审核时间
  , approvedBy: {type: String, trim: true, default: ''}//审核人
  , isEnabled: {type: Boolean, trim: true, default: true}//是否启用
  , verification: {type: String, trim: true}//是否验证
});

FranchiseeSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
    return this._password;
  });
/**
 * Validations
 */
var validatePresenceOf = function (value) {
  return value && value.length
};

// the below 5 validations only apply if you are signing up traditionally
FranchiseeSchema.path('username').validate(function (username) {
  return username.length
}, '用户名不能为空!');

FranchiseeSchema.path('username').validate(function (username, fn) {
  var Franchisee = mongoose.model('Franchisee');
  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('username')) {
    Franchisee.find({username: username}).exec(function (err, users) {
      fn(!err && users.length === 0)
    })
  } else fn(true)
}, '该用户已经存在!');

FranchiseeSchema.path('email').validate(function (email) {
  return email.length
}, '邮件不能为空!');

FranchiseeSchema.path('email').validate(function (email, fn) {
  var Franchisee = mongoose.model('Franchisee');

  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    Franchisee.find({email: email}).exec(function (err, users) {
      fn(!err && users.length === 0)
    })
  } else fn(true)
}, '该Email已经被使用!');

FranchiseeSchema.path('hashed_password').validate(function (hashed_password) {
  return hashed_password.length
}, '密码不能为空!');

FranchiseeSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function (plainText) {
    console.log("authenticate: hashed_password=" + this.hashed_password + ", plainText=" + this.encryptPassword(plainText));
    return this.encryptPassword(plainText) === this.hashed_password;
  },


  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password) {
    if (!password) return '';
    var encrypred;
    try {
      encrypred = crypto.createHmac('sha1', this.salt).update(password).digest('hex');
      console.log("encrypred:" + encrypred);
      return encrypred
    } catch (err) {
      console.log("err:" + err);
      return ''
    }
  },
  /**
   * 统计加盟商共有多少家
   * @param req
   * @param res
   * @param callback
   */
  count:function(req,res,callback){
    Franchisee.count({"approvedStatus": '02','isEnabled':true}, function(err, count){
      if(err){
        console.log(err);
      }else{
        callback(count);
      }
    });
  },
  /**
   * 统计加盟商共有多少家
   * @param req
   * @param res
   * @param callback
   */
  countNewFran:function(req,res,callback){
    Franchisee.count({"approvedStatus": '01'}, function(err, count){
      if(err){
        console.log(err);
      }else{
        callback(count);
      }
    });
  },
  //获取所有的状态
  getAllStatus: function (req, res) {
    res.send(status);
  },
  //根据Code获取设备类型的数据
  getStatusByCode: function (code, res) {
    for (i in status) {
      if (code == status[i].code) {
        res.send(status[i].name);
        break;
      }
    }
  }

};
FranchiseeSchema.plugin(CreateUpdatedAt);

var Franchisee = mongoose.model('Franchisee', FranchiseeSchema, 'franchisees');
