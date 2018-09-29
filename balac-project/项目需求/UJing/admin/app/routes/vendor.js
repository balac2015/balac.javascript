"use strict";

var express = require('express');
var router = express.Router();
var config = require('../config/config');
var passport = require('passport');
var Auth = require('../middleware/authorization');

//加盟商控制
var vendorController = require(config.root + '/controllers/FranchiseeController');

// 设备
var deviceController = require(config.root + '/controllers/DeviceController');

//设备型号价格设定
var devicePriceController = require(config.root + '/controllers/DevicePriceConfController');

//设备型号价格审核
var devicePriceApplyController = require(config.root + '/controllers/DevicePriceApplyController');

//消费记录查询
var orderDayReportController = require(config.root + '/controllers/OrderDayReportController');

//订单统计
var orderSumController = require(config.root + '/controllers/OrderSumController');

//用户控制器
var storeController = require(config.root + '/controllers/StoreController');

//订单控制
var OrderController = require(config.root + '/controllers/OrderController');
// 加盟商自助管理功能需要加盟商登录系统
router
// 加盟商首页
    .get('/login', vendorController.login)//登录页面
    .post('/login',
    passport.authenticate('local', {
      successRedirect: '/vendor',
      failureRedirect: '/vendor/login',
      failureFlash: true
    }), vendorController.session)//登录form提交
    .get('/checkunique/:prop', vendorController.checkUnique)
    .get('/register', vendorController.register)
    .post('/register', vendorController.createVendor)
    .get('/forgetPass', vendorController.forgetPass)


    .post('/checkForgetPass', vendorController.checkForgetPass)
    .post('/verification', vendorController.verification)
    .all("/*", Auth.requiresVendorLogin)//其他需要登录
    .get('/logout', vendorController.logout)//logout
    .get(['/', '/index'], vendorController.index)//首页
    .get(['/dashboard'], orderDayReportController.dashboard)//仪表盘
    .get('/profile/:mobile', vendorController.profile)//用户资料
    .post('/:uername/update', vendorController.updateProfile)//保持更新用户资料
    .post('/editPassword', vendorController.editPassword)//修改用户密码
    .get('/virtualPwd', vendorController.virtualPwd)//验证密码是否正确

    .get('/addSchool', vendorController.addSchool)  //跳转至添加学校的页面
    .get("/editSchool", vendorController.editSchool)  //添加学校

    .post("/franchRegisterSave", vendorController.franchRegisterSave) //加盟商注册保存
    .post("/franchiseeSave", vendorController.franchiseeSave) //加盟商注册保存
    .post("/franchScholSave", vendorController.franchScholSave) //加盟商添加学校保存
    .get("/franchApply", vendorController.franchApply)  //注册页面
  //.post("/delFran", vendorController.delFran)  //删除加盟商功能
    .get("/applyFranchisee", vendorController.applyFranchisee)  //申请加盟商功能
    .post("/delSchool", vendorController.delSchool)  //删除学校
    .get("/h5FranchInfoView", vendorController.h5FranchInfoView) // 手机端加盟商信息查看
    .get('/checkStatus', vendorController.checkStatus) // 检查加盟商是否审核
    .get('/storeList', storeController.storeList)
    .get('/storeAdd/:schoolId', storeController.storeAdd) // 添加洗衣店
    .post('/storeDel', storeController.del) // 删除洗衣店
    .post('/storeSave', storeController.save) // 添加洗衣店
    .get('/editStore/:id', storeController.editStore) // 编辑洗衣店
    .get('/devicePrice', devicePriceController.devicePrice)
    .get('/typeList', devicePriceController.typeList)
    .get('/priceList', devicePriceController.priceList)
    .post('/setPrice', devicePriceApplyController.setPrice)
    .get('/orderDayReport', orderDayReportController.orderDayReport)
    .post('/saveDevice', deviceController.saveDevice) // 更新设备信息
    .get('/deviceInfo/:type', deviceController.deviceInfo) // 首页查询

    .get('/province', vendorController.province) // 省
    .get('/city', vendorController.city) // 市
    .get('/district', vendorController.district) // 区

    .get('/deviceEdit/:id', deviceController.deviceEdit)
    .get('/deviceInStore/:storeId', deviceController.deviceInStore)

    .get('/vendorMonthList', orderSumController.vendorMonthList)

    .get('/schoolList', vendorController.schoolList)
    .get('/storeInFran/:id', vendorController.storeInFran)

    .all("/orderRecord", OrderController.orderRecord);
module.exports = router;
