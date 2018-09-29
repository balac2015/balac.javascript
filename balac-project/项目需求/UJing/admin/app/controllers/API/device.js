/**
 * Created by yu869 on 2015/12/4.
 */

var mongoose = require('mongoose');
var Device = mongoose.model('Device');
var Franchisee = mongoose.model('Franchisee');
var Store = mongoose.model('Store');
var DevicePrice = mongoose.model('DevicePrice');
var DevicePriceApply = mongoose.model('DevicePriceApply');
var config = require('../../config/config');
var utils = require(config.root + '/helper/utils');
var async = require('async');
var http = require('http') ;
var moment = require('moment');
var ObjectId = mongoose.Types.ObjectId;

exports.list = function (req, res) {
    var franId = req.param("franId");
    console.log("[franId]", franId);

    Device.find({'franchiseeId': franId, 'status': {$ne : '4'}}).populate('storeId').exec( function (err, devices) {

        if (devices == null) {
            return;
        }
        var devicePrices = new Array;

        var fn = function (devices) {
            var pop = devices.pop();

            var obj = new Object();
            obj.device = pop;

            if (pop == null && pop == undefined) {
                return;
            }

            var id = pop._id;
            DevicePriceApply.find({'deviceId': id}, function (err, prices) {
                obj.prices = prices;
                devicePrices.push(obj);
                if (devices.length > 0) {
                    fn(devices);
                } else {
                    var feedback = {};
                    Store.find({'franchiseeId':franId , 'storeStatus': {$ne : '2'}}, function (err, stores) {
                        console.log("franchiseeId", franId);
                        console.log("stores", stores);
                        feedback.stores = stores;
                        feedback.devicePrices = devicePrices;
                        feedback = JSON.stringify(feedback);
                        res.send(feedback);
                    });
                }
            });
        };
        fn(devices);
    });
};

exports.storeList = function(req, res) {
    var id = req.param("franId");
    console.log(id);
    Store.find({'franchiseeId' : id, "storeStatus": {$ne:'2'}}, function (err, stores) {
        console.log(stores);
        if (err) {
            console.log(err);
        } else {
            DevicePrice.find({"deep": '1'}, function (err, devicePrices) {
                var feedBack = new Object();
                feedBack.stores = stores;
                feedBack.devicePrices = devicePrices
                console.log(feedBack);
                res.send(feedBack);
            });
        }
    })
};

exports.create = function (req, res) {
    var param = JSON.parse(req.param("params"));
    var device = new Device();
    device.name = param.name;
    device.status = '0';
    device.useDate = new Date();
    device.storeId = param.storeId;
    device.name = param.deviceName;
    device.no = param.no;
    device.devicePriceId = param.devicePriceId;
    device.franchiseeId = param.franId;
    device.virtualId = param.deviceID;
    device.deviceType = param.deviceType;

    console.log(device);
    device.save(function(err, result){
        var feedBackObject = new Object();
        if (err) {
            feedBackObject.status = "500";
            feedBackObject.msg = err;
        } else {
            feedBackObject.status = "200";
            feedBackObject.msg = "success";
            feedBackObject.deviceId = result._id;
        }
        var feedback = JSON.stringify(feedBackObject);
        res.send(feedback);
    });
};

/**
 * 将临时虚拟ID更新成正式虚拟ID
 * @param req
 * @param res
 */
exports.changeVirtualId = function (req, res) {
    /*alert(result.preDeviceId + "," + result.curDeviceId);*/
    var preDeviceId = req.param("preDeviceId");
    var curDeviceId = req.param("curDeviceId");

    console.log("changeVirtualId");
    console.log(preDeviceId + "," + curDeviceId);

    Device.update({'virtualId': preDeviceId}, {"virtualId": curDeviceId},  { multi: false, upsert: false },function(err,docs){
        if (err) {
            console.log(err);
        }
    });
};

exports.del = function(req ,res) {
    var virtualId = req.param("deviceId");
    console.log(virtualId);
    Device.findOne({'virtualId': virtualId}, function (err, device) {
        console.log(device);
        var id = device._id;
        Device.update({'_id': new ObjectId(id)}, {"status": "4", "virtualId": "", "qrCode": ""}, {multi: false, upsert: false}, function (err, docs) {
            DevicePriceApply.remove({'deviceId':id}, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    res.send();
                }
            });
        });
    });
};

exports.delDevice = function(req, res) {
    var deviceId = req.params.id;
    Device.remove({'_id': deviceId}, function (err, result) {

    });
};

exports.priceList = function(req, res) {
    var parentId = req.param("parentId");
    console.log(parentId);
    DevicePrice.find({"deep": '2', 'parentId': new ObjectId(parentId), 'price' : {$gt : 0}}, function (err, DevicePrices) {
        res.send(DevicePrices);
    });
};

exports.savePrice = function(req, res) {
    var param = JSON.parse(req.param("params"));
    var deviceId = req.param('deviceId');
    var storeId = req.param('storeId');
    var franchiseeId = req.param('franchiseeId');
    var username = req.param('username');
    Device.find({'_id': deviceId}, function (err, devices) {
        if (err) {
            console.log(err);
        } else {
            param.forEach(function (item) {
                var dpa = new DevicePriceApply();
                dpa.deviceId = new ObjectId(deviceId);
                dpa.storeId = storeId;
                dpa.franchiseeId = franchiseeId;
                dpa.devicePriceId = new ObjectId(item._id);
                dpa.price = item.price;
                dpa.command = item.command;
                dpa.type = item.type;
                dpa.status = '1';
                dpa.submitBy = username;
                dpa.submitTime = new Date();
                console.log(dpa);
                dpa.save(function (err, result) {
                });
            });
            res.send(devices)
        }
    });
};

/**
 * 查询设备对应的洗衣价格
 * @param req
 * @param res
 */
exports.price = function(req, res) {
    var test = req.param("params");
    console.log(test);
    var deviceId = req.param("deviceId");
    console.log(deviceId);
    DevicePriceApply.find({'deviceId' : deviceId}, function (err, DevicePriceApplys) {
        console.log(DevicePriceApplys);
        res.send(DevicePriceApplys);
    });
};

/**
 * 编辑价格
 * @param req
 * @param res
 */
exports.editPrice = function(req, res) {
    var params = req.param("params");
    if (!params) {
        return;
    }
    var param = JSON.parse(params);
    updatePrice(param);
    res.send("success");
};

/**
 * 更新价格
 * @param items
 */
var updatePrice = function(items) {
    var pop = items.pop();
    if (pop == null && pop == undefined) {
        return;
    }

    DevicePriceApply.update({'_id': new ObjectId(pop._id)}, {'price': pop.price},  { multi: false, upsert: false },function(err,docs){
        console.log(err, docs);
    });

    if (items.length > 0) {
        updatePrice(items);//递归循环计算统计结果保存
    } else {
        console.log("价格更新完成");
    }
};

/**
 * 按设备ID查询设备信息
 * @param req
 * @param res
 */
exports.getDeviceById = function(req, res) {
    var deviceId = req.param("deviceId");
    Device.findOne({"_id": new ObjectId(deviceId)}, function (err, device) {
        res.send(device);
    })
};

/**
 * 编辑设备信息
 * @param req
 * @param res
 */
exports.editDevice = function(req, res) {
    var deviceId = req.param("deviceId");
    var params = req.param("params");
    if (!params) {
        return;
    }
    var param = JSON.parse(params);

    console.log(param);

    var status = 0;
    if (param.enable == false) {
        status = 3;
    }

    Device.update({'_id': deviceId}, {'name': param.name, 'no': param.no, status: status},  { multi: false, upsert: false },function(err,docs){
        console.log(err, docs);
    });

    res.send("success");
};

exports.checkDeviceId = function(req, res) {
    var virtualId = req.params.virtualId;
    console.log("virtualId", virtualId);
    Device.find({"virtualId": virtualId}, function (err, device) {
        res.send(device);
    })
};

exports.cancelDevice = function(req, res) {
    console.log("==========================================> cancelDevice");
    var deviceId = req.param("deviceId");
    console.log(deviceId);
    Device.remove({'_id': deviceId}, function (err, result) {
        res.send("success");
    });
};

exports.scanCode = function(req, res) {
    console.log("==========================================> scanCode");
    var qrCode = req.param("qrCode");
    var id = req.param("id");
    console.log(qrCode, id);
    Device.findByIdAndUpdate(id, {$set:{qrCode: qrCode}}, {new: true}, function() {
        res.send("success");
    });
};

exports.clearQcCode = function(req, res) {
    Device.find({'status': '4'}, function (err, devices) {
        devices.forEach(function (item) {
            item.qrCode = "";
            item.save();
        });
    });
};