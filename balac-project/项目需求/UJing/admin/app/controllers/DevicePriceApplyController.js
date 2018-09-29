/**
 * Created by yu869 on 2015/11/9.
 */

var mongoose = require('mongoose');
var DevicePriceApply = mongoose.model('DevicePriceApply');
var async = require('async');
var config = require('../config/config');
var ObjectId = mongoose.Types.ObjectId;
var express = require('express');
var app = express();

exports.list = function(req, res) {
  DevicePriceApply.find({}, function (err, DevicePriceApplys) {
    console.log(DevicePriceApplys);
    res.render('DevicePriceApply/DevicePriceApplyList', {
      DevicePriceApplys: DevicePriceApplys
    })
  });
};

exports.datatable = function (req, res) {
  console.log("datatable");
  DevicePriceApply.dataTable(req.query, {conditions:{"status": '1'}}, function (err, data) {
    res.send(data);
  });
};

exports.audit = function (req, res) {
  var id = req.param('ids');
  id = id.split(',');
  var fn = function (id) {
    console.log("id=========================================>" + id);
    var pop = id.pop();
    console.log(pop);
    if (pop == null && pop == undefined) {
      return;
    }
    DevicePriceApply.update({'_id': pop}, {
      "status": '1',
      "approvedBy": req.user.username,
      "approvedTime": new Date(),
      "reason": ""
    }, {multi: false, upsert: false}, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        if (id.length > 0) {
          fn(id);
        } else {
          res.redirect('/store/waitPriceApplyList');
        }
      }
    });
  };
  fn(id);
};

exports.refuse = function(req, res) {
  var id = req.param('id');
  DevicePriceApply.update({'_id': id}, {"status": '2', "approvedBy": req.user.username, "approvedTime": new Date(), "reason":req.body.reason},  { multi: false, upsert: false },function(err,docs){
    if (err) {
      console.log(err);
    } else {
      res.redirect('/store/priceApplyList');
    }
  });
};

exports.setPrice = function(req, res) {
  var needSubmitInfo = req.param("needSubmitInfo");
  var deviceId = req.param('deviceId');
  for (i in needSubmitInfo) {
    var dpa = new DevicePriceApply();
    dpa.deviceId = new ObjectId(deviceId);
    dpa.devicePriceId = new ObjectId(needSubmitInfo[i].key);
    dpa.price = needSubmitInfo[i].value;
    dpa.command = needSubmitInfo[i].command;
    dpa.type = needSubmitInfo[i].type;
    dpa.status = '0';
    dpa.submitBy = req.user.username;
    dpa.submitTime = new Date();

    console.log(dpa);
    dpa.save(function(err, result){
      if (err) {
        console.log(err);
      }
      res.send();
    });
  }
};


exports.waitPriceApplyList = function(req, res) {
  res.render('DevicePriceApply/waitPriceApplyList', {
  })
};

exports.waitApplyDatatable = function(req, res) {
  console.log("waitApplyDatatable");
  DevicePriceApply.dataTable(req.query, {conditions:{"status": '0'}}, function (err, data) {
    res.send(data);
  });
};

exports.refusePriceApplyList = function(req, res) {
  res.render('DevicePriceApply/refusePriceApplyList', {
  })
};

exports.refuseApplyDatatable = function(req, res) {
  console.log("refuseApplyDatatable");
  DevicePriceApply.dataTable(req.query, {conditions:{"status": '2'}}, function (err, data) {
    res.send(data);
  });
};
