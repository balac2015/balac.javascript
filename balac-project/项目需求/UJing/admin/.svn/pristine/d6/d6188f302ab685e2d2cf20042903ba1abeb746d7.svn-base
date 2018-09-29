var mongoose = require('mongoose');
var User = mongoose.model('User');
var Franchisee = mongoose.model('Franchisee');
var config = require('../../config/config');
var utils = require(config.root + '/helper/utils');
var async = require('async');
var http = require('http') ;
var moment = require('moment');
var crypto = require('crypto');

exports.get_profile = function (req, res, next) {

  var user_id = req.user._id;

  User
    .findOne({_id: user_id}, function (err, user) {
      if (err) return utils.responses(res, 500, err);

      return utils.responses(res, 200, user);
    })
};

/**
 * 登录系统，调用mcloud登录接口
 * @param req
 * @param res
 * @param next
 */
exports.login = function (req, res, next) {
  console.log("login");
  var param = eval(req.param("params"));
  console.log(param);
  var username = param.username;
  var password = param.password;
  console.log(username + "," + password);
  Franchisee.findOne({
    $or: [
      {email: username},
      {mobile: username},
      {username: username}
    ]
  }, function (err, user) {
    console.log("user = " + user);
    if (err) {
      console.log(500);
      return utils.responses(res, 500, err);
    }
    if (!user) {
      console.log(403 + "用户不存在!");
      res.send("用户不存在!");
    } else if (user != null && !user.authenticate(password)) {
      console.log(403 + "密码错误!");
      res.send("密码错误!");
    } else {
      var token = getToken(user.username, user.encryptPassword(password));
      var feedBackObject = new Object();
      feedBackObject.token = token;
      feedBackObject.email = user.email;
      feedBackObject.franId = user._id;
      feedBackObject.username = user.username;
      feedBackObject.status = 200;
      var feedback = JSON.stringify(feedBackObject);
      console.log("login feedback" + feedback);
      res.send(feedback);
    }
  });

};

/**
 * 登录过程中，mcloud平台回调验证token的入口
 * @param req
 * @param res
 * @param next
 */
exports.verify = function (req, res) {
  console.log("=========================verify=========================");
  var passToken = req.param("token");
  var email = req.param("email");

  email = email.replace("__uj__","");

  var mobile = req.param("mobile");
  Franchisee.findOne({$or: [
    {"email": email},
    {"mobile": mobile}
  ]}, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      var msgCode = "";
      var token = "";
      if (docs) {
        token = getToken(docs.username, docs.hashed_password);
        console.log("username = " + docs.username);
        console.log("password = " + docs.hashed_password);
        console.log("verify token = " + token + ", " + token.length);
        console.log("passToken =    " + passToken + ", " + passToken.length);
        if (passToken == token) {
          msgCode = "20000";
        } else {
          msgCode = "20001";
        }
      } else {
        msgCode = "20003";
      }

      var nowDate = moment(new Date());
      var nowStr= nowDate.format("YYYYMMDDHHmmss");//时间戳。格式为：yyyyMMddHHmmss
      var data = {
        "result": true
        , "msgCode": msgCode
        //, "msgCode": 20000
        , "content": {
          "loginTime": nowStr
          , "token": token
          , "mobile": mobile
        }
      };

      console.log(data);

      res.send(data);
    }
  });
};

function getToken (username, password) {
  var nowDate = moment(new Date());
  var nowStr= nowDate.format("YYYYMMDDHH");//时间戳。格式为：yyyyMMddHHmmss
  var token = username + password + nowStr;
  var md5 = crypto.createHash('md5');
  token = md5.update(token).digest('hex');
  return token;
}

