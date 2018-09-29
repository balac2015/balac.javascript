/**
 * Created by yu869 on 2015/10/26.
 */

"use strict";

var express = require('express');
var router = express.Router();
var config = require('../config/config');
var Auth = require(config.root + '/middleware/authorization');

//用户控制器
var storeController = require(config.root + '/controllers/StoreController');

//加盟商控制
var franchiseeController = require(config.root + '/controllers/FranchiseeController');

//设备型号价格设定
var devicePriceController = require(config.root + '/controllers/DevicePriceConfController');

//设备型号价格审核
var devicePriceApplyController = require(config.root + '/controllers/DevicePriceApplyController');

//使用express4,var Router = express.Router().相当于一个简单的app,在Router上面装备控制器与中间件
router.get('/list', storeController.list)
  .get('/init', storeController.saveStore)
  .all("/datatable", storeController.datatable)

  .get("/waitList", storeController.waitList)    //未审核的洗衣店
  .all("/waitDatatable", storeController.waitDatatable) //未审核的洗衣店

  .get('/add', storeController.add)
  .post('/del', storeController.del)
  .get('/edit/:id', storeController.edit)
  .post('/audit', storeController.audit)
  .post('/ratio', storeController.ratio)
  .post('/save', storeController.save)

  .get('/priceSet', devicePriceController.list) // 树表查询数据
  .get('/devicePriceChildren', devicePriceController.getChildren) // 树表查询下级数据
  .get('/addDevice', devicePriceController.addDevice) // 洗衣价格设定添加设备
  .get('/addDeviceType/:id', devicePriceController.addDeviceType) //添加类型
  .get('/addDevicePrice/:id', devicePriceController.addDevicePrice) // 洗衣价格设定添加价格
  .post('/saveDevice', devicePriceController.saveDevice) //洗衣价格设定保存设备
  .post('/saveDeviceType', devicePriceController.saveDeviceType) //洗衣价格设定保存设备
  .get('/editDevicePrice/:id', devicePriceController.editDevicePrice) //洗衣价格设定编辑价格
  .get('/editDevice/:id', devicePriceController.editDevice) //洗衣价格设定编辑设备
  .get('/editDeviceType/:id', devicePriceController.editDeviceType) //洗衣价格设定编辑设备
  .post('/delDevice', devicePriceController.del) //洗衣价格设定删除数据
  .post('/saveDevicePrice', devicePriceController.saveDevicePrice) //洗衣价格设定保存价格

  .get('/priceApplyList', devicePriceApplyController.list) // 洗衣价格审核 页面初始化
  .all("/applyDatatable", devicePriceApplyController.datatable)

  .get('/waitPriceApplyList', devicePriceApplyController.waitPriceApplyList) // 洗衣价格待审核 页面初始化
  .all("/waitApplyDatatable", devicePriceApplyController.waitApplyDatatable)

  .get('/refusePriceApplyList', devicePriceApplyController.refusePriceApplyList) // 洗衣价格待审核 页面初始化
  .all("/refuseApplyDatatable", devicePriceApplyController.refuseApplyDatatable)

  .post('/price/audit', devicePriceApplyController.audit) // 洗衣价格审核 通过
  .post('/refuse', devicePriceApplyController.refuse) // 洗衣价格审核 拒绝

  .get('/province', franchiseeController.province) // 省
  .get('/city', franchiseeController.city) // 市
  .get('/district', franchiseeController.district) // 区
;


module.exports = router;
