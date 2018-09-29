var mongoose = require('mongoose');
var Device = mongoose.model('Device');
var DevicePrice = mongoose.model('DevicePrice');
var DevicePriceApply = mongoose.model('DevicePriceApply');
var async = require('async');
var config = require('../config/config');
var ObjectId = mongoose.Types.ObjectId;
var express = require('express');
var app = express();

exports.list = function (req, res) {
  DevicePrice.find({"parentId": null}, function (err, DevicePrices) {
    res.render('devicePriceConf/devicePriceConfTreeList', {
      DevicePrices: DevicePrices
    });
  });
};

exports.getChildren = function(req,res) {
  var parentId = req.param("parentId");
  console.log("------------------------------------------");
  console.log(parentId);
  DevicePrice.find({"parentId": new ObjectId(parentId)}, function (err, DevicePrices) {
    res.render('devicePriceConf/devicePriceChildren', {
      DevicePrices: DevicePrices
    })
  });
};

exports.add = function (req, res) {
  res.render('devicePriceConf/devicePriceConfForm', {
  });
};

exports.addDevice = function (req, res) {
    res.render('devicePriceConf/deviceForm', {
      viewType: "add"
    });
};

exports.addDevicePrice = function (req, res) {
  var id = req.params.id;
  if (id == undefined) {
    id = "";
  }
  console.log("id=" +id);
  res.render('devicePriceConf/devicePriceForm', {
    parentId: id
  });
};

exports.saveDevice = function(req, res) {
  if (req.body.id == "") {
    var devicePrice1 = new DevicePrice();
    devicePrice1.type = req.body.type;
    devicePrice1.price = 0;
    devicePrice1.parentId = null;
    devicePrice1.shortName = req.body.shortName;
    devicePrice1.deep = '0';
    devicePrice1.command = "";


    devicePrice1.save(function(err, result){
      if (err) {
        console.log(err);
      } else {
        res.redirect('/store/priceSet');
      }
    });
  } else {
    var shortName = req.body.shortName == undefined ? "" : req.body.shortName;
    DevicePrice.update({'_id': req.body.id}, {"type": req.body.type, "shortName": shortName},  { multi: false, upsert: false },function(err,docs){
      if (err) {
        console.log(err);
      } else {
        res.redirect('/store/priceSet');
      }
    });
  }
};

exports.saveDeviceType = function(req, res) {
    var parentId = req.body.parentId;
    var shortName = req.body.shortName;
    if (req.body.id == "") {
        var devicePrice1 = new DevicePrice();
        devicePrice1.type = req.body.type;
        devicePrice1.price = 0;
        devicePrice1.parentId = parentId;
        devicePrice1.shortName = shortName;
        devicePrice1.deep = '1';
        devicePrice1.command = "";
        devicePrice1.save(function(err, result){
            if (err) {
                console.log(err);
            } else {
                res.redirect('/store/priceSet');
            }
        });
    } else {
        var shortName = req.body.shortName == undefined ? "" : req.body.shortName;
        DevicePrice.update({'_id': req.body.id}, {"type": req.body.type},  { multi: false, upsert: false },function(err,docs){
            if (err) {
                console.log(err);
            } else {
                res.redirect('/store/priceSet');
            }
        });
    }
};

exports.saveDevicePrice = function(req, res) {
  var parentId = req.param('parentId');
  console.log(parentId);

  DevicePrice.findById(parentId).populate('parentId').exec(function (err, devicePrice) {

    console.log("devicePrice", devicePrice);

    var devicePrice1 = new DevicePrice();
    devicePrice1._id = req.body.id == "" ? null : req.body.id;
    devicePrice1.type = req.body.type;
    devicePrice1.price = req.body.price;
    devicePrice1.deep = '2';
    devicePrice1.command = req.body.command;
    devicePrice1.note = req.body.note;
    devicePrice1.topId = devicePrice.parentId._id;
    devicePrice1.shortName = devicePrice.parentId.shortName;
    devicePrice1.execMinute = req.body.execMinute;
    devicePrice1.iconClass = req.body.iconClass;

    if (req.body.id == "") {
      devicePrice1.parentId = new ObjectId(parentId) ;

      console.log(devicePrice1);
      devicePrice1.save(function(err, result){
        console.log('save devicePrice1....');
        if (err) {
          console.log(err);
        } else {
          res.redirect('/store/priceSet');
        }
      });
    } else {
      DevicePrice.update({'_id': req.body.id}, {
        "type": devicePrice1.type,
        "price": devicePrice1.price,
        "command": devicePrice1.command,
        "note": devicePrice1.note,
        "execMinute": devicePrice1.execMinute,
        "iconClass": req.body.iconClass
      }, {multi: false, upsert: false}, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/store/priceSet');
        }
      });
    }
  });
};

exports.del = function(req, res) {
  var deep = req.param('deep');
  var id = req.param('ids');
    if (deep == 0) {
        DevicePrice.remove({'_id': new ObjectId(id)}, function (err, result) {
            DevicePrice.remove({'parentId': new ObjectId(id)}, function (err, result) {
                DevicePrice.remove({'topId': new ObjectId(id)}, function (err, result) {
                    res.redirect('/store/priceSet');
                });
            });
        });
    } else if (deep == 1) {
        DevicePrice.remove({'_id': new ObjectId(id)}, function (err, result) {
            DevicePrice.remove({'parentId': new ObjectId(id)}, function (err, result) {
                res.redirect('/store/priceSet');
            });
        });
    } else {
        // 删除基准价格后删除对应的供应商自定义价格
        DevicePrice.remove({'_id': new ObjectId(id)}, function (err, result) {
            DevicePriceApply.remove({'devicePriceId' : new ObjectID(id)}, function (err, result) {
                res.redirect('/store/priceSet');
            });
        });
    }

};

exports.editDevice = function(req, res) {
  var id = new ObjectId(req.params.id);
  DevicePrice.findOne({"_id": id}, function (err, devicePrice) {
    console.log(devicePrice);
    res.render('devicePriceConf/deviceForm', {
      devicePrice: devicePrice
    });
  });
};

exports.editDevicePrice = function(req, res) {
  var id = new ObjectId(req.params.id);
  DevicePrice.findOne({"_id": id}, function (err, devicePrice) {
    res.render('devicePriceConf/devicePriceForm', {
      devicePrice: devicePrice,
      parentId: devicePrice.parentId == null ? "" : devicePrice.parentId
    });
  });
};

exports.devicePrice = function(req, res) {
  var deviceId = req.param("deviceId");
  Device.findOne({'_id': ObjectId(deviceId)}, function (err, device) {
    if (device!=null) {
      var devicePriceId = device.devicePriceId;
      DevicePrice.find({"deep": '2', 'parentId': new ObjectId(devicePriceId)}, function (err, DevicePrices) {
        res.render('devicePriceConf/h5DeviceConfForm', {
          DevicePrices: DevicePrices,
          deviceId: deviceId
        })
      });
    }
  });
};

exports.typeList = function(req, res) {
  DevicePrice.find({"deep": '1'}, function (err, DevicePrices) {
    res.send(DevicePrices);
  });
};

exports.priceList = function (req, res) {
  var parentId = req.param("parentId");
  console.log(parentId);
  DevicePrice.find({"deep": '2', 'parentId': new ObjectId(parentId)}, function (err, DevicePrices) {
    res.send(DevicePrices);
  });
};

exports.addDeviceType = function(req, res) {
  var id = req.params.id;
  DevicePrice.findOne({"_id": id}, function (err, devicePrice) {
    console.log(devicePrice);
    res.render('devicePriceConf/deviceTypeForm', {
        shortName: devicePrice.shortName,
        parentId: id,
        viewType: "add"
    });
  });
};

exports.editDeviceType = function(req, res) {
  var id = req.params.id;
  DevicePrice.findOne({"_id": id}, function (err, devicePrice) {
    res.render('devicePriceConf/deviceTypeForm', {
        id: id,
        shortName: devicePrice.shortName,
        parentId: devicePrice.parentId,
        devicePrice: devicePrice
    });
  });
};

