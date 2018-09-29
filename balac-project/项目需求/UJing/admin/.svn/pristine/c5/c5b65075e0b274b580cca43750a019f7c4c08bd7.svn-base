/**
 * Created by ZhangXiao on 2015/6/11.
 */
var mongoose = require('mongoose')
  , Franchisee = mongoose.model('Franchisee')
  , config = require('../config/config');
var async = require('async');
var ObjectId = mongoose.Types.ObjectId;

var Province = mongoose.model('Province');
var City = mongoose.model('City');
var District = mongoose.model('District');
var Store = mongoose.model('Store');
var MyStore = mongoose.model('MyStore');
var moment = require('moment');
var crypto = require('crypto');

var nodemailer = require("nodemailer");

// 开启一个 SMTP 连接池
var smtpTransport = nodemailer.createTransport("SMTP",{
  host: "mail.midea.com", // 主机
  secureConnection: true, // 使用 SSL
  port: 994, // SMTP 端口
  auth: {
    user: "haojie.li@midea.com", // 账号
    pass: "li_18332561349" // 密码
  }
});

// login to system.
var login = function (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/vendor/';
  delete req.session.returnTo;
  req.flash('success', '欢迎登录系统！');
  res.redirect(redirectTo);
};

/**
 * home page
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/vendor/dashboard');
  } else {
    res.render('vendor/index');
  }
};

/**
 * login page
 * @param req
 * @param res
 */
exports.login = function (req, res) {
  res.render('vendor/login');
};

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/vendor')
};
/**
 * login session
 * @type {login}
 */
exports.session = login;

/**
 * vendor registration page
 * @param req
 * @param res
 */
exports.register = function (req, res) {
  res.render('vendor/register', {
    title: '注册成为加盟商',
    user: new Franchisee({username: '', email: '', mobile: ''})
  });
};

/**
 * create vendor by registration.
 * @param req
 * @param res
 */
exports.createVendor = function (req, res) {
  var vendor = new Franchisee(req.body);
  vendor.provider = 'local';
  vendor.approvedStatus = '01';
  var verification = MathRand();
  vendor.verification = verification;
  console.log("create vendor ... " + vendor);
  vendor.save(function (err, new_user) {
    console.log("Save vendor result: ", err);
    if (err) {
      req.flash("error", err);
      return res.render('vendor/register', {
        user: vendor,
        title: '注册成为加盟商'
      })
    } else {
      // manually login the user once successfully signed up
      sendVerification(new_user, function () {
        res.render('vendor/verification', {
          id : new_user._id
        });
      });
    }
  });
};

function MathRand() {
  var Num="";
  for(var i=0;i<10;i++) {
    Num+=Math.floor(Math.random()*10);
  }
  return Num;
}

function sendVerification(vendor, callback) {
  var mailOptions = {
    from: "U净云洗衣 <haojie.li@midea.com>", // 发件地址
    to: vendor.email, // 收件列表
    subject: "U净-绑定邮箱验证码（请不要答复此邮件)", // 标题
    html: "亲爱的<a href='http://host-pro-wx.zhinengxiyifang.cn/vendor' target='_blank'>U净</a>用户"+vendor.fullname+"，<br><br>" +
    "您好！您的绑定验证码是：<span style='color: red'>"+vendor.verification+"</span><br>" +
    "本邮件是系统自动发送的，请勿直接回复！如请求并非本人发出,请勿理睬!感谢您的访问，祝您使用愉快！<br><br>" +
    "U净云洗衣<br>host-pro-wx.zhinengxiyifang.cn/vendor" // html 内容
  };

  // 发送邮件
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
    }else{
      console.log("Message sent: " + response.message);
      callback();
    }
    smtpTransport.close(); // 如果没用，关闭连接池
  });

}

// 验证验证码
exports.verification = function(req, res) {
  var id = req.body.id;
  var verification = req.body.verification;

  console.log("id ================>" + id);
  console.log("verification ================>" + verification);

  Franchisee.findOne({_id: ObjectId(id)}, function (err, user) {
    // 验证通过
    if (verification == user.verification) {
      console.log("验证通过!");
      user.verification = "ok";
      user.save(function (err, new_user){
        req.logIn(user, function (err) {
          if (err) {
            console.log(err);
            return next(err);
          }
          req.session.userType = "vendor";
          return res.redirect('/vendor');
        })
      });
    } else {
      // 验证不通过
      console.log("验证不通过!");
      req.flash("error", "验证不通过!");
      res.render('vendor/verification', {
        id : user._id
      });
    }
  })

};

exports.forgetPass = function(req, res) {
  res.render('vendor/forgetPass', {});
};

exports.checkForgetPass = function(req, res) {
  var username = req.body.username;
  var email = req.body.email;

  console.log("checkForgetPass-username ===========>" + username);
  console.log("checkForgetPass-email ===========>" + email);

  Franchisee.findOne({mobile: username}, function (err, user) {
    console.log("checkForgetPass-user ===========>" + user);
    if (user && user.email == email) {
      // 验证通过 发邮件
      sendChangePassUrl(user, function() {
        req.flash("success", "邮件已发,请检查邮箱!");
        res.redirect('/vendor');
      })
    } else {
      // 验证不通过 重新填写信息
      req.flash("error", "无此数据,请检查账号和邮箱!");
      res.redirect('/vendor/forgetPass');
    }
  });

};

function sendChangePassUrl(vendor, callback) {
  var newDate = moment(new Date());
  var newStr = newDate.format("YYYY/MM/DD 00:00:00");//当天的零点
  var key = vendor.username + vendor.hashed_password + vendor.email;
  var md5 = crypto.createHash('md5');
  var key = md5.update(key).digest('hex');
  console.log("key =============>" + key);

  var mailOptions = {
    from: "U净云洗衣 <haojie.li@midea.com>", // 发件地址
    to: vendor.email, // 收件列表
    subject: "U净-找回密码（请不要答复此邮件)", // 标题
    html: "亲爱的<a href='http://host-pro-wx.zhinengxiyifang.cn/vendor' target='_blank'>U净</a>用户"+vendor.fullname+"，<br><br>" +
    "您使用了<a href='http://host-pro-wx.zhinengxiyifang.cn/vendor' target='_blank'>U净</a>的找回密码功能，请点击以下链接重置您的密码：<br>" +
    "<a href='http://121.41.34.175:3000/api/changePass/"+vendor.email+"?token="+key+"' target='_blank'>点击这里</a><br>" +
    "注意此链接将在当天24时失效。<br><br>" +
    "U净云洗衣<br>host-pro-wx.zhinengxiyifang.cn/vendor" // html 内容
  };

  // 发送邮件
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
    }else{
      console.log("Message sent: " + response.message);
      callback();
    }
    smtpTransport.close(); // 如果没用，关闭连接池
  });

}

exports.changePass = function(req, res) {
  var email = req.params.email;
  var token = req.query.token;
  console.log("changePass-email==============>" + email);
  console.log("changePass-token==============>" + token);
  if (!email || !token) {
    req.flash("error", "参数不合法");
    res.redirect('/vendor');
  } else {
    Franchisee.findOne({email: email}, function (err, user) {
      var newDate = moment(new Date());
      var newStr = newDate.format("YYYY/MM/DD 00:00:00");//当天的零点
      var key = user.username + user.hashed_password + user.email;
      var md5 = crypto.createHash('md5');
      var key = md5.update(key).digest('hex');
      console.log("changePass-key==============>" + key);
      if (key != token) {
        req.flash("error", "密码修改超时,请重新申请");
        res.redirect('/vendor');
      } else {
        res.render('vendor/changePass', {
          email : email
        });
      }
    });
  }
};

exports.changeForgetPass = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  Franchisee.findOne({email: email}, function (err, user) {
    var pwd = user.encryptPassword(password);
    user.hashed_password = pwd;
    user.save(function (err, user) {
      res.redirect('/vendor');
    });
  });
};

/**
 * 检查用户名是否已经存在^
 */
exports.checkUnique = function (req, res) {
  var prop = req.params.prop;
  var nv = req.query[prop];
  var ov = req.query.ov;
  var q = {};
  q[prop] = nv;
  console.log("Vendor checkUnique:prop=" + prop + ",ov=" + ov + ",nv=" + nv + ", q=" + q);
  if (nv === ov) {
    res.send('true');
  } else {
    Franchisee.count(q, function (err, result) {
      console.log(err + ",resule:" + result);
      if (err) {
        res.send('false');
      } else if (result > 0) {
        res.send('false');
      } else {
        res.send('true');
      }
    });
  }
};

/**
 *
 * @param req
 * @param res
 */
exports.dashboard = function (req, res) {
  console.log(req.user);
  res.render('vendor/dashboard');
};

exports.profile = function (req, res) {
  var mobile = req.params.mobile;
  console.log(mobile);
  async.waterfall([
    function (callback) {
      if (req.user) {
        if (mobile === req.user.mobile) {
          callback(null, req.user)
        } else {
          Franchisee.findOne({mobile: mobile}, function (err, user) {
            callback(err, user)
          })
        }
      } else {
        Franchisee.findOne({mobile: mobile}, function (err, user) {
          callback(err, user)
        })
      }
    }], function (err, user) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      res.render('404', {url: req.url, error: '404 Not found'});

    } else {
      if (user.photo_profile === undefined) {
        //user.photo_profile = 'https://gravatar.com/avatar/' + utility.md5(user.email) + '?s=200&d=retro'
        user.photo_profile = '/dist/img/avatar.png';

      }

      res.render('vendor/profile', {
        title: user.name,
        user: user
      });
    }
  })
};


/**
 * 修改用户资料
 * @param req
 * @param res
 */
exports.updateProfile = function (req, res) {
  var id = req.body.id;
  console.log(req.body);
  if (id) {
    // update
    Franchisee.update({'_id': id}, req.body, function (err, result) {
      console.log(err);
      console.log(result);
      if (err) {
        res.send({success: false, msg: err});
      } else {
        res.send({success: true, msg: '保存个人资料成功'});
      }
    });
  }
};

/**
 * 修改用户密码
 * @param req
 * @param res
 */
exports.editPassword = function (req, res) {
  var id = req.user._id;
  var oldPwd = req.body.oldPwd;
  var newPwd = req.body.newPwd;
  var affirmPwd = req.body.affirmPwd;
  console.log(req.body);
  if (id) {
    Franchisee.findOne({_id:id},function(err,fran){
      if(!fran || !fran.authenticate(oldPwd)){
        req.flash("errors", "输入的原密码不正确");
        res.redirect('/vendor/profile/'+req.user.username);
      }else{
        if(newPwd === affirmPwd){
         var pwd = fran.encryptPassword(newPwd);
          var updata={hashed_password:pwd};
          var options={};
          Franchisee.update({_id:id},updata,options,function(err,ff){
            req.flash("success", "密码已修改,请重新登录！");
            res.redirect('/vendor/login');
          });
        }else{
          req.flash("errors", "新密码和确认密码不一致");
          res.redirect('/vendor/profile/'+req.user.username);
        }
      }
    });
  }else{
    req.flash("errors", "没有查到用户");
    res.redirect('/vendor/profile/'+req.user.username);
  }
};
/**
 * 重置用户密码
 * @param req
 * @param res
 */
exports.resetPassword = function (req, res) {
  var id = req.body.userId;
  console.log(req.body);
  if (id) {
    Franchisee.findOne({_id: id}, function (err, user) {
      var pwd = user.encryptPassword('123456');
      var updata = {hashed_password: pwd};
      var options = {};
      Franchisee.update({_id: id}, updata, options, function (err, ff) {
        req.flash("success", "密码已重置!");
        if(user.approvedStatus == '01'){
          res.redirect('/franchisee/waitList')
        }else{
          res.redirect('/franchisee/list')
        }
      });
    });
  }else{
    req.flash("errors", "没有找到用户");
    res.redirect('/franchisee/list');
  }
};
/**
 * 验证用户密码
 * @param req
 * @param res
 */
exports.virtualPwd = function (req, res) {
  var id = req.user._id;
  var pwd = req.param("oldPwd");
  Franchisee.findById(id,function(err,fran){
    if(!fran || !fran.authenticate(pwd)){
      console.log("输入的原密码不正确");
      res.send('false');
    }else{
      console.log("输入的原密码正确");
      res.send('true');
    }
  });
};

/**
 * 跳转至加盟商列表
 * @param req
 * @param res
 */
exports.list = function (req, res) {
  Franchisee.find({}, function (err, list) {
    console.log(list);
    if (err) {
      console.log(err);
    } else {
      res.render('franchisee/franchiseeList', {
          list: list
        }
      )
    }
  })
};

/**
 * 跳转至加盟商列表
 * @param req
 * @param res
 */
exports.waitList = function (req, res) {
  Franchisee.find({}, function (err, list) {
    console.log(list);
    if (err) {
      console.log(err);
    } else {
      res.render('franchisee/franchiseeWaitList', {
            list: list
          }
      )
    }
  })
};

/**
 * 加盟商列表数据
 * @param req
 * @param res
 */
exports.datatable = function (req, res) {
  console.log("datatable");
  Franchisee.dataTable(req.query, {conditions: {"approvedStatus": {$in: ['02', '03']}}}, function (err, data) {
    res.send(data);
  });
};

/**
 * 加盟商列表数据
 * @param req
 * @param res
 */
exports.datatableWait = function (req, res) {
  console.log("datatable");
  Franchisee.dataTable(req.query, {conditions: {"approvedStatus": {$in: ['01']}}}, function (err, data) {
    res.send(data);
  });
};

//编辑功能
exports.getData = function (req, res) {

  var id = new ObjectId(req.param('id'));
  Franchisee.findOne({_id: id}, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.send(docs);
    }
  })
};
/**
 * 编辑功能
 * @param req
 * @param res
 */
exports.editFran = function (req, res) {
  var id = new ObjectId(req.params.id);
  console.log(id);
  Franchisee.findOne({_id: id}, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
      res.render('franchisee/franchiseeForm', {
        fran: docs == null ? new Franchisee() : docs
      });
    }
  })
};

/**
 * 注册页面
 * @param req
 * @param res
 */
exports.franchApply = function (req, res) {
  Franchisee.findById(req.user.id, function (err, franchisee) {
      res.render('franchisee/applyResult', {
          fran: franchisee
        }
      )
  });
};

/**
 * 加盟商注册保存
 * @param req
 * @param res
 */
exports.franchRegisterSave = function (req, res) {
  var update = {
    fullname: req.body.fullname                         //加盟申请人
    , numberID: req.body.numberID             //身份证号
    , tel: req.body.tel          //固定电话
    , mobile: req.body.mobile         //移动电话
    , email: req.body.email           //邮箱
  };
  var options = {};
  var id = req.user._id;
  Franchisee.update({_id: id}, update, options, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("保存成功");
      res.redirect('/vendor/addSchool');
    }
  });

};
/**
 * 加盟商注册保存
 * @param req
 * @param res
 */
exports.franchiseeSave = function (req, res) {
  var update = {
    fullname: req.body.fullname                         //加盟申请人
    , numberID: req.body.numberID             //身份证号
    , tel: req.body.tel          //固定电话
    , mobile: req.body.mobile         //移动电话
    , email: req.body.email           //邮箱
  };
  var options = {};
  var id = req.user._id;
  Franchisee.update({_id: id}, update, options, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("保存成功");
      var mes = "保存成功";
      req.flash('success', mes);
      res.send(mes);
    }
  });
};
/**
 * 加盟商添加学校并保存
 * @param req
 * @param res
 */
exports.franchScholSave = function (req, res) {
  var id = req.body._id;
  var index = req.body.index;
  Franchisee.findOne({_id: id}, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
      if (docs != null) {
        var school = {
          schoolName: req.body.schoolName         //学校名称      写学校全称
          , ubietyAddress: req.body.ubietyAddress   //所在省市      例如：江苏省无锡市
          , stuNum: req.body.stuNum        //在校大学生数量
          , dormitoryNum: req.body.dormitoryNum        //学校宿舍楼数量
          , washhouseNum: req.body.washhouseNum        //洗衣店数量       如没有洗衣店就写“无”
          , washerNum: req.body.washerNum        //公用洗衣机数量
          , washerLocation: req.body.washerLocation       //公用洗衣机摆放位置
          , mgSubject: req.body.mgSubject == "其他" ? req.body.mgSubjects : req.body.mgSubject       //目前的管理主体     可选择：代理商、学校自营、个人管理、其他（需填写）
          , washerPhoto: req.body.washerPhoto       //洗衣机现状照片     需添加校园洗衣机的照片，包括洗衣店及洗衣机近照
          , extendPolicy: req.body.extendPolicy   //校园推广策略
        }
        var schools = docs.school;
        var ss = [];
        if (index != null && index != undefined && index != "" && index != '' && index != 'null') {
          schools[index] = school;
          ss = schools;
        } else {
          ss = schools.concat(school);
        }
        console.log(ss);
        var update = {'school': ss};
        var options = {};
        Franchisee.update({_id: id}, update, options, function (err, docs) {
          if (err) {
            console.log(err);
            req.flash('errors', err.message);
          } else {
            console.log("保存成功");
            var mes = "保存成功";
            req.flash('success', mes);
          }
          res.redirect('/vendor/schoolList');
        });
      }
    }
  })
};

/**
 * 跳转至添加学校的页面
 * @param req
 * @param res
 */
exports.addSchool = function (req, res) {
  var id = req.user._id;
  console.log("addSchool-id=====================================>" + id);
  Franchisee.findOne({_id: id}, function (err, fran) {
    if (err) {
      console.log(err);
      req.flash('errors', err.message);
    } else {
      res.render('franchisee/franchiseeAddSchool', {
          fran: fran
        }
      )
    }
  })
};

/**
 * 添加学校
 * @param req
 * @param res
 */
exports.editSchool = function (req, res) {
  var id = req.user._id;
  var index = req.param("index") == null ? null : req.param("index");
  console.log(index);
  Franchisee.findOne({_id: id}, function (err, fran) {
    if (err) {
      console.log(err);
      req.flash('errors', err.message);
    } else {
      res.render('franchisee/franchiseeAddSchoolForm', {
          fran: fran,
          school: index == null ? null : fran.school[index],
          index: index
        }
      )
    }
  })
};

/**
 * 删除学校
 * @param req
 * @param res
 */
exports.delSchool = function (req, res) {
  var id = req.user._id;
  var index = req.body.index;
  if (index != null && index != '') {
    Franchisee.findOne({_id: id}, function (err, fran) {
      if (err) {
        console.log(err);
        req.flash('errors', err.message);
        res.redirect('/vendor/addSchool')
      } else {
        fran.school.splice(index, 1);
        var update = {'school': fran.school};
        var options = {};
        Franchisee.update({_id: id}, update, options, function (err, docs) {
          if (err) {
            req.flash('errors', err.message);
          } else {
            req.flash('success', "服务主体删除成功");
          }
          res.redirect('/vendor/franchApply')
        })
      }
    })
  } else {
    req.flash('errors', "删除失败");
    res.redirect('/vendor/franchApply')
  }
}
/**
 * 申请保存功能
 * @param req
 * @param res
 */
exports.applyFranchisee = function (req, res) {
  var update = {'approvedStatus': "01", 'applyTime': new Date()};
  var options = {};
  var id = req.user._id;
  Franchisee.update({_id: id}, update, options, function (err, docs) {
    if (err) {
      console.log(err);
      req.flash('errors', "申请提交失败");
    } else {
      console.log("申请已提交");
      req.flash('success', "申请已提交");
      res.redirect('/vendor/franchApply')
    }
  });
};

/**
 * 审核保存功能
 * @param req
 * @param res
 */
exports.save = function (req, res) {
  var objId = new ObjectId(req.body._id);
  var status = req.body.approvedStatus;
  console.log(objId);
  var update = {'approvedStatus': status, 'approvedBy': req.user.username, 'approvedTime': new Date};
  var options = {};
  Franchisee.update({_id: objId}, update, options, function (err, docs) {
    if (err) {
      console.log(err);
      req.flash('errors', "审核失败");
    } else {
      console.log("审核成功");
      var mes = "审核成功";
      req.flash('success', mes);
      res.redirect('/franchisee/waitList')
    }
  });
};
/**
 * 删除加盟商功能
 * @param req
 * @param res
 */
exports.isEnabledFran = function (req, res) {
  var objId = new ObjectId(req.body.delId);
  var isEnabled = req.body.isEnabled;
  if (isEnabled != 1) {
    isEnabled = 0;
  }
  var update = {'isEnabled': isEnabled};
  var options = {};
  Franchisee.update({_id: objId}, update, options, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      var mes = "";
      if (isEnabled) {
        mes = "加盟商已启用";
      } else {
        mes = "加盟商已禁用";
        delMyStores(objId);
      }
      req.flash('success', mes);
      Franchisee.findOne({_id: objId}, function (err, user) {
        if (user.approvedStatus == '01') {
          res.redirect('/franchisee/waitList')
        } else {
          res.redirect('/franchisee/list')
        }
      })
    }
  });
};

/**
 * 移除与该加盟商objId有关的常用洗衣房数据
 * @param objId
 */
function delMyStores(objId){
  getStoreIds(objId,function(err,ids){
    MyStore.remove({'storeId':{$in:ids}},function(err, result){
      if(err){
        console.log(err.message);
      }else{
        console.log("与所禁用的加盟商店铺有关的常用洗衣房已删除");
      }
    });
  });

}

/**
 * 根据加盟商id，获取该加盟商所有洗衣房的id
 * @param req
 * @param res
 * @param callback
 */
function getStoreIds(franchiessId,callback){
  var ids=[];
  Store.find({'franchiseeId': ObjectId(franchiessId)}, function (err, stores) {
    stores.forEach(function(e){
      ids.push(e._id)
    });
    callback(err,ids)
  })
}

/**
 * //获取所有的状态
 * @param req
 * @param res
 */
exports.getAllStatus = function (req, res) {
  new Franchisee().getAllStatus(req, res);
};

/**
 * //获取所有的状态
 * @param req
 * @param res
 */
exports.getStatusByCode = function (req, res) {
  var code = req.param('code');
  var name = new Franchisee().getStatusByCode(code, res);
  res.send(name);
};

/**
 * 手机端加盟商信息查看
 * @param req
 * @param res
 */
exports.h5FranchInfoView = function (req, res) {
  console.log(req.user);
  Franchisee.findById(req.user.id, function (err, franchisee) {
    if (franchisee == null) {
      res.redirect('/vendor/franchApply')
    } else {
      res.render('franchisee/h5FranchiseeList', {
        franchisee: franchisee
      })
    }
  });
};

exports.checkStatus = function (req, res) {
  var franId = req.user._id;
  Franchisee.findOne({"_id": franId}, function (err, franchisee) {
    res.send(franchisee);
  });
};

exports.hasRoleFran = function (req, res) {
  Franchisee.find({"approvedStatus": '02'}, function (err, franchisee) {
    res.send(franchisee);
  });
};

exports.province = function (req, res) {
  Province.find({}, function (err, provinces) {
    res.send(provinces);
    return;
  });
};

exports.city = function (req, res) {
  var provinceCode = req.param('provinceCode');
  console.log(provinceCode);
  if (!provinceCode) {
    res.send();
    return;
  }
  var q = {};
  var pattern = new RegExp("^" + provinceCode.substring(0, 2) + '.*$');
  q.code = pattern;

  console.log(q);
  City.find(q, function (err, cities) {
    console.log(cities);
    res.send(cities);
    return;
  });
};

exports.district = function (req, res) {
  var cityCode = req.param('cityCode');
  console.log(cityCode);
  if (!cityCode) {
    res.send();
    return;
  }
  var q = {};
  var pattern = new RegExp("^" + cityCode.substring(0, 4) + '.*$');
  q.code = pattern;

  console.log(q);
  District.find(q, function (err, districts) {
    console.log(districts);
    res.send(districts);
    return;
  });
};

exports.schoolList = function(req, res) {
  var franId = req.user._id;
  Franchisee.findOne({"_id": franId}, function (err, franchisee) {
    res.render('franchisee/schoolList', {franchisee: franchisee});
  });
};

exports.storeInFran = function(req, res) {
  var id = req.params.id;
  Store.find({'schoolId': ObjectId(id), "storeStatus": {$ne:'2'}}, function (err, stores) {
    res.render('store/h5StoreList', {
      stores: stores,
      schoolId: id
    })
  })
};

exports.getFranById = function(req, res) {
  var id = req.params.id;
  console.log(id);
  Franchisee.findOne({"_id": id}, function (err, franchisee) {
    res.send(franchisee);
  });
};