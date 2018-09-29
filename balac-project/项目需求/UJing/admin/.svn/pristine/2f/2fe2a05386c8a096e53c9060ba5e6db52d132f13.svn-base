/**
 * Created by ZhangXiao on 2015/6/11.
 */
var mongoose = require('mongoose')
    , WechatFans = mongoose.model('WechatFans')
    , config = require('../config/config');


exports.list = function (req,res){
  WechatFans.find({}, function (err, datas) {
    res.render('wechatFans/wechatFansList', {
      users: datas
    })
  })
}

exports.datatable = function (req, res) {
  WechatFans.dataTable(req.query, function (err, data) {
    res.send(data);
  });
}

exports.init = function(req, res){
  var obj = {
    "subscribe" : "1",
    "openid" : "o3qrpslWrS4D31jZWdZjDfxweMkE",
    "nickname" : "潘广彬",
    "sex" : "1",
    "language" : "zh_CN",
    "city" : "闵行",
    "province" : "上海",
    "country" : "中国",
    "headimgurl" : "http://wx.qlogo.cn/mmopen/6dLGKrEFyw0NTJ2Y2ZP0QclKdcjp7ic6lN9m0oiaofvmEOzicHMsF0oOopC0tlyLTQUkvL7ps8lfP0RVvnVicl2o8wVVsq1Vr1Rt/0",
    "subscribe_time" : "1445929384"
  };

  var data = new WechatFans(obj);
  data.save();
}
