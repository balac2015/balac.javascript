"use strict";

var express = require('express');
var router = express.Router();
var config = require('../config/config');
var passport = require('passport');
var Auth = require(config.root + '/middleware/authorization');

var homeController = require(config.root + '/controllers/HomeController');
//用户登入
var userController = require(config.root + '/controllers/UserController');
//文章管理-文章列表
var articleTypeController = require(config.root + '/controllers/articleType');
//文章管理-文章列表
var articleListController = require(config.root + '/controllers/articleList');
//微信管理-用户分组
var storeController = require(config.root + '/controllers/StoreController');
//加盟商控制
var vendorController = require(config.root + '/controllers/FranchiseeController');

var API = {};
//API.Uploader = require(config.root + '/controllers/API/uploader');
API.Users = require(config.root + '/controllers/API/users');
API.Device = require(config.root + '/controllers/API/device');
API.Order = require(config.root + '/controllers/API/order');
//
//
////使用express4,var Router = express.Router().相当于一个简单的app,在Router上面装备控制器与中间件
router
//.all('/api/!*', Auth.APIrequiresUserLogin)
    .post('/api/user/login', API.Users.login)
    .get('/api/user/verify', API.Users.verify)

    .get('/api/device/getDeviceById', API.Device.getDeviceById)
    .post('/api/device/changeVirtualId', API.Device.changeVirtualId)
    .get('/api/device/del', API.Device.del)
    .get('/api/device/delDevice/:id', API.Device.delDevice)
    .get('/api/device/priceList', API.Device.priceList)
    .post('/api/device/savePrice', API.Device.savePrice)
    .get('/api/device/cancelDevice', API.Device.cancelDevice)
    .get('/api/device/scanCode', API.Device.scanCode)
    .get('/api/device/price/:deviceId', API.Device.price)
    .post('/api/device/editPrice', API.Device.editPrice)
    .post('/api/device/editDevice', API.Device.editDevice)
    .get('/api/device/checkDeviceId/:virtualId', API.Device.checkDeviceId)

    .get('/api/order/list', API.Order.list)
    .get('/api/order/dashboard', API.Order.dashboard)

    .get('/api/device/list', API.Device.list)
    .get('/api/store/list', API.Device.storeList)
    .post('/api/device/create', API.Device.create)

    .get("/api/changePass/:email", vendorController.changePass)
    .post("/api/changeForgetPass", vendorController.changeForgetPass)
    .get('/api/device/clearQcCode', API.Device.clearQcCode);

router
  .get('/login', userController.login)
  //.get('/signup', userController.signup)
  .get('/logout', userController.logout)
  //.get('/forgot-password', userController.getForgotPassword)
  //.post('/forgot-password', Auth.hasLogin, userController.postForgotPassword)
  //.get('/reset/:token', Auth.hasLogin, userController.getResetPassword)
  //.post('/reset/:token', Auth.hasLogin, userController.postResetPassword)
  .post('/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    }), userController.session)
  .post('/users/create', userController.create)
  .get('/dashboard', Auth.requiresLogin, homeController.dashboard)
  .get('/:username', Auth.requiresLogin, userController.profile)
  .post('/:uername/update', Auth.requiresLogin, userController.updateProfile)
  .get('/', Auth.requiresLogin, function (req, res) {
    //if (req.session.userType === "vendor") {
    //  res.redirect('/vendor/dashboard')
    //} else {
    res.redirect('/dashboard');
    //}
  })
;

module.exports = router;
