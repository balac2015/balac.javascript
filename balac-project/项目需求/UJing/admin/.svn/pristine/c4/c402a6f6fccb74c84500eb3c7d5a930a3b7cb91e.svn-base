/**
 * Created by yu869 on 2015/10/30.
 */

var mongoose = require('mongoose');
var Device = mongoose.model('Device');
var config = require('../config/config');
var ObjectId = mongoose.Types.ObjectId;
var Store = mongoose.model('Store');
var DevicePrice = mongoose.model('DevicePrice');
var DevicePriceApply = mongoose.model('DevicePriceApply');
var qs = require('querystring');
var http = require('http');

exports.init = function (req, res) {
    Store.find({'franchiseeId': {'$exists': true}}, function (err, doce) {
        for (s in doce) {
            for (var i = 1; i < 3; i++) {
                var device = new Device({
                    "name": "未来3000型洗衣机0" + i,
                    "type": "" + i + "",
                    "no": "Fw30000" + i,
                    "sn": "shw000000" + i,
                    "devicePriceId": ObjectId("564a9e3758983a0d06bec392"),
                    "status": "0",
                    "useDate": new Date(),
                    "storeId": doce[s]._id
                });

                device.save(function (err, obj) {
                    if (err) {
                        console.log(err);
                    }
                });
                console.log("device " + device.no + " created.");
            }
        }
    });
    res.redirect('/device/list')
};

exports.datatable = function (req, res) {
    var id = req.param("id");
    console.log("id=====================================>" + id);
    if (id == 0) {
        Device.dataTable(req.query, {conditions: {"status": {$ne: '4'}}}, function (err, data) {
            res.send(data);
        });
    } else {
        Device.dataTable(req.query, {conditions: {"storeId": id, "status": {$ne: '4'}}}, function (err, data) {
            console.log("data=====================================>" + data);
            res.send(data);
        });
    }
};

exports.datatableAll = function (req, res) {
    Device.dataTable(req.query, {conditions: {"status": {$ne: '2'}}}, function (err, data) {
        res.send(data);
    });
};

exports.faultDatatable = function (req, res) {
    Device.dataTable(req.query, {conditions: {"status": '2'}}, function (err, data) {
        res.send(data);
    });
};

exports.list = function (req, res) {
    Device.find({}, function (err, devices) {
        res.render('device/deviceList', {
            devices: devices
        })
    })
};

exports.faultList = function (req, res) {
    res.render('device/faultDeviceList', {})
};

exports.deviceInStore = function (req, res) {
    var storeId = req.params.storeId;
    var schoolId = "";
    Store.findById(storeId, function (err, store) {
        if (err) {
            req.flash("error", err);
            return;
        }

        schoolId = store.schoolId;
        var deviceIds = [];
        Device.find({"storeId": storeId, "status": {$ne: '4'}}).populate({
            path: "devicePriceId",
            select: "type"
        }).exec(function (err, devices) {
            var devicePrices = new Array;

            var fn = function (devices) {
                var pop = devices.pop();

                var obj = new Object();
                obj.device = pop;

                if (pop == null && pop == undefined) {
                    res.render('device/h5DeviceList', {
                        devices: devicePrices,
                        storeId: storeId,
                        schoolId: schoolId,
                        storeName: store.name
                    })
                } else {
                    var id = pop._id;
                    DevicePriceApply.find({'deviceId': id}, function (err, prices) {
                        obj.prices = prices;
                        devicePrices.push(obj);
                        if (devices.length > 0) {
                            fn(devices);
                        } else {
                            console.log(devicePrices);
                            res.render('device/h5DeviceList', {
                                devices: devicePrices,
                                storeId: storeId,
                                schoolId: schoolId,
                                storeName: store.name
                            })
                        }
                    });
                }
            };
            fn(devices);
        });
    });
};

exports.deviceEdit = function (req, res) {
    var id = new ObjectId(req.param("id"));
    Device.findOne({"_id": id}, function (err, device) {
        DevicePriceApply.find({'deviceId': device._id}, function (err, prices) {
            res.render('device/h5DeviceForm', {
                device: device,
                prices: prices,
                storeId: device.storeId
            })
        });
    });
};

exports.saveDevice = function (req, res) {

    var deviceId = req.body.deviceId;

    DevicePriceApply.find({'deviceId': deviceId}, function (err, prices) {
        var fn = function (prices) {
            var pop = prices.pop();
            if (pop == null && pop == undefined) {
                return;
            }
            var id = pop._id;

            console.log(req.body[id]);

            DevicePriceApply.findByIdAndUpdate(id, {$set: {price: req.body[id]}}, {new: true}, function () {
                if (err) {
                    console.log(err);
                }
            });

            if (prices.length > 0) {
                fn(prices);
            } else {

            }
        };

        fn(prices);
    });

    var status = req.body.enable;
    if (status == "enable") {
        status = "0";
    } else {
        status = "3";
    }

    Device.update({'_id': deviceId}, {"name": req.body.name, "no": req.body.no, "status": status}, {
        multi: false,
        upsert: false
    }, function (err, docs) {
        console.log('save store....');
        if (err) {
            console.log(err);
        } else {
            res.redirect("/vendor/storeList");
        }
    });

};

exports.devicePrice = function (req, res) {
    var deviceID = req.params.id;
    console.log(deviceID);
    res.render('device/devicePrice', {
        deviceID: deviceID
    })
};

exports.applyDatatable = function (req, res) {
    var deviceID = req.params.id;
    console.log(deviceID);
    DevicePriceApply.dataTable(req.query, {conditions: {"deviceId": deviceID}}, function (err, data) {
        res.send(data);
    });
};

exports.deviceInfo = function (req, res) {
    var type = req.params.type;
    console.log("type ======================>", type);

    Device.find({"status": type, 'franchiseeId': ObjectId(req.user._id)}).populate({
        path: "devicePriceId",
        select: "type"
    }).populate({
        path: "storeId",
        select: "name"
    }).exec(function (err, devices) {
        var devicePrices = new Array;

        var fn = function (devices) {
            var pop = devices.pop();

            var obj = new Object();
            obj.device = pop;

            if (pop == null && pop == undefined) {
                res.render('device/h5DeviceList', {
                    devices: devicePrices,
                    type: type
                })
            } else {
                var id = pop._id;
                DevicePriceApply.find({'deviceId': id}, function (err, prices) {
                    obj.prices = prices;
                    devicePrices.push(obj);
                    if (devices.length > 0) {
                        fn(devices);
                    } else {
                        console.log(devicePrices);
                        res.render('device/deviceInfoList', {
                            devices: devicePrices,
                            type: type
                        })
                    }
                });
            }
        };
        fn(devices);
    });
};

exports.shutdown = function (req, res) {
    var id = req.body.ids;
    Device.findOne({"_id": id}, function (err, device) {
        var data = {
            "appId": "2016",
            "src": "24",
            "stamp": getNow(),
            "sign": "1",
            "virtualId": device.virtualId,
            "deviceType": device.deviceType,
            "command": "{\"switch\":\"0\"}"
        };
        data = qs.stringify(data);

        var options = {
            hostname: "100.98.153.38",
            port: getPort(device.deviceType),
            path: "/v1/open2pro/device/control",
            method: 'POST',
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
                , "Content-Length": data.length
            }
        };
        console.log(data);

        var req = http.request(options, function (res) {
            if (res.statusCode == 200) {
                res.on('data', function (chunk) {
                    var result = JSON.parse(chunk);
                    console.log('shutdown device', result);
                    res.redirect("/order/orderRecord");
                });
            } else {
                console.log(res.statusCode);
                res.redirect("/order/orderRecord");
            }
        });
        //参数传递要在req.end()之前
        req.write(data);
        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
            res.redirect("/order/orderRecord");
        });
        req.end();
    });
};

function getNow() {
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    return new Date().Format('yyyyMMddhhmmss');
}

function getPort(deviceType) {
    if (deviceType == '0xDA') {
        return 3001;
    } else if (deviceType == '0xDB') {
        return 3002;
    } else if (deviceType == '0xDC') {
        return 3003;
    }
}
