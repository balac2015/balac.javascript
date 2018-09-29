/**
 * Created by ZhangXiao on 2015/6/11.
 */
var mongoose = require('mongoose');
var Store = mongoose.model('Store');
var MyStore = mongoose.model('MyStore');
var Seq = mongoose.model('Seq');
var DevicePrice = mongoose.model('DevicePrice');
var config = require('../config/config');
var Device = mongoose.model('Device');
var ObjectId = mongoose.Types.ObjectId;
var Franchisee = mongoose.model('Franchisee');
var DevicePriceApply = mongoose.model('DevicePriceApply');

exports.saveStore = function (req, res) {
    var store = new Store();
    store.name = '西岸别院洗衣店';
    store.address = '上海市徐汇区龙吴路472号';
    store.logo = "c:\\baidu.gif";
    store.coordinate = [120.388, 31.5095];
    store.mapTcLat = '无';
    store.storeStatus = '1';
    store.ratio = "50%";
    store.label = "clothes,shoe,drying";

    new Store().saveStore(store, function (err, result) {
        console.log('save store....');
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
};

exports.findNearStore = function (req, res) {
    new Store().findNearStore();
};

exports.list = function (req, res) {
    Store.find({}, function (err, stores) {
        console.log(stores);
        res.render('store/storeList', {
            stores: stores
        })
    });
};

exports.datatable = function (req, res) {
    Store.dataTable(req.query, {conditions: {"storeStatus": '1'}}, function (err, data) {
        res.send(data);
    });
};

exports.add = function (req, res) {
    DevicePrice.find({"deep": '0'}, function (err, DevicePrices) {
        res.render('store/storeForm', {
            viewType: "add",
            DevicePrices: DevicePrices
        })
    });
};

exports.save = function (req, res) {
    var store = new Store();
    store._id = req.body.id == "" ? null : req.body.id;
    store.name = req.body.name;
    store.storeStatus = '0';
    store.label = req.body.label == undefined ? "" : req.body.label;
    store.tel = req.body.tel;
    store.start = req.body.start;
    store.end = req.body.end;
    store.schoolId = req.body.schoolId;
    store.discount = req.body.discount;
    store.startDate = req.body.startDate;
    store.endDate = req.body.endDate;

    console.log(req.body);

    var province = req.body.province == undefined ? new Array("", "", "") : req.body.province.split("|");
    var city = req.body.city == undefined ? new Array("", "", "") : req.body.city.split("|");
    var district = req.body.district == undefined ? new Array("", "", "") : req.body.district.split("|");

    store.province = province[1];
    store.city = city[1];
    store.district = district[1];

    store.address = req.body.address == undefined ? "" : req.body.address;
    store.franchiseeId = req.body.franchiseeId;

    if (req.body.coordinate) {
        console.log(req.body.coordinate);
        var c = req.body.coordinate.split(',');
        if (c.length > 1) {
            store.coordinate = [parseFloat(c[0]), parseFloat(c[1])];
        }
    }


    // 页面请求是否来自H5
    var isFromH5 = req.body.formH5;
    var url = "list";

    if (isFromH5 == 'formH5') {
        store.franchiseeId = req.user._id; // 页面请求来时H5时 从登陆信息中读取供应商信息
        url = "/vendor/storeInFran/" + store.schoolId;
    }

    if (req.body.id == "") {
        new Seq().genSeq("store", function (seq) {
            console.log("no", seq);
            store.no = seq;
            store.save(function (err, result) {
                console.log('save store....');
                if (err) {
                    console.log(err);
                } else {
                    res.redirect(url);
                }
            });
        });

    } else {
        var needUpdate = {
            "name": store.name,
            "label": store.label,
            "start": store.start,
            "end": store.end,
            "address": store.address,
            "province": store.province,
            "city": store.city,
            "district": store.district,
            "schoolId": store.schoolId,
            "tel": store.tel,
            "discount": store.discount,
            "startDate": store.startDate,
            "endDate": store.endDate
        };

        if (store.coordinate && store.coordinate.length > 0) {
            needUpdate.coordinate = store.coordinate;
        }


        Store.update({'_id': req.body.id}, needUpdate, {multi: false, upsert: false}, function (err, docs) {
            console.log('save store....');
            if (err) {
                console.log(err);
            } else {
                res.redirect(url);
            }
        });
    }
};

exports.del = function (req, res) {
    var id = req.body.ids;

    console.log("id", id);

    // 页面请求是否来自H5
    var isFromH5 = req.body.formH5;
    var url = "list";

    if (isFromH5 == 'formH5') {
        var schoolId = req.body.schoolId;
        url = "/vendor/storeInFran/" + schoolId;
    }

    Store.update({'_id': new ObjectId(id)}, {"storeStatus": "2"}, {multi: false, upsert: false}, function (err, docs) {
        console.log("docs=============================>", docs);
        if (err) {
            console.log(err);
        } else {
            Device.update({'storeId': new ObjectId(id)}, {"status": "4", "virtualId": "", "qrCode": ""}, {
                multi: true,
                upsert: false
            }, function (err, docs) {
                if (err) {
                    console.log(err);
                } else {
                    DevicePriceApply.remove({'storeId': new ObjectId(id)}, function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            MyStore.remove({'storeId': new ObjectId(id)}, function (err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.redirect(url);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

exports.edit = function (req, res) {
    var id = new ObjectId(req.param("id"));
    Store.findOne({'_id': id}, function (err, store) {
        DevicePrice.find({"deep": '0'}, function (err, DevicePrices) {
            res.render('store/storeForm', {
                viewType: "edit"
                , store: store
                , DevicePrices: DevicePrices
                , provinceId: store.province
                , cityId: store.city
                , districtId: store.district
            })
        });
    });
};

exports.audit = function (req, res) {
    var ids = req.param("ids");
    ids = ids.split(',');
    var fn = function (ids) {
        console.log("ids=========================================>" + ids);
        var pop = ids.pop();
        console.log(pop);
        if (pop == null && pop == undefined) {
            return;
        }

        Store.update({'_id': pop}, {"storeStatus": "1"}, {
            multi: true,
            upsert: false
        }, function (err, docs) {
            if (err) {
                console.log(err);
            } else {
                if (ids.length > 0) {
                    fn(ids);
                } else {
                    res.redirect("/store/waitList");
                }
            }
        });
    };
    fn(ids);
};

exports.ratio = function (req, res) {
    var id = req.param("id");
    var ratio = req.param("ratio");
    Store.update({'_id': new ObjectId(id)}, {"ratio": ratio}, {multi: false, upsert: false}, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("list");
        }
    });
};

exports.storeList = function (req, res) {
    var id = req.user._id;
    Store.find({'franchiseeId': id, "storeStatus": {$ne: '2'}}, function (err, stores) {
        console.log(stores);
        res.render('store/h5StoreList', {
            stores: stores
        })
    });
};

exports.storeAdd = function (req, res) {
    var schoolId = req.params.schoolId;
    console.log(schoolId);
    var franId = req.user._id;
    // 查询服务内容
    DevicePrice.find({"deep": '0'}, function (err, DevicePrices) {
        Franchisee.findOne({"_id": franId}, function (err, franchisee) {
            res.render('store/h5StoreForm', {
                DevicePrices: DevicePrices,
                schoolId: schoolId
            })
        });
    });
};

exports.editStore = function (req, res) {
    var id = new ObjectId(req.param("id"));
    var franId = req.user._id;
    Store.findOne({'_id': id}, function (err, store) {
        DevicePrice.find({"deep": '0'}, function (err, DevicePrices) {
            res.render('store/h5StoreForm', {
                viewType: "edit"
                , store: store
                , DevicePrices: DevicePrices
                , provinceId: store.province
                , cityId: store.city
                , districtId: store.district
                , schoolId: store.schoolId
            })
        });
    });
};

exports.waitList = function (req, res) {
    Store.find({}, function (err, stores) {
        console.log(stores);
        res.render('store/storeWaitList', {
            stores: stores
        })
    });
};

exports.waitDatatable = function (req, res) {
    Store.dataTable(req.query, {conditions: {"storeStatus": '0'}}, function (err, data) {
        console.log(data);
        res.send(data);
    });
};


