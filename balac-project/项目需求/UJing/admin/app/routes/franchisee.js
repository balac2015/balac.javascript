/**
 * Created by yu869 on 2015/10/26.加盟商相关的路由
 */

"use strict";

var express = require('express');
var router = express.Router();
var config = require('../config/config');
var Auth = require(config.root + '/middleware/authorization');

//加盟商控制
var FranchiseeController = require(config.root + '/controllers/FranchiseeController');

//使用express4,var Router = express.Router().相当于一个简单的app,在Router上面装备控制器与中间件
//加盟商
router.get(['/list'], FranchiseeController.list) //跳转至加盟商列表
    .get("/waitList", FranchiseeController.waitList)    //未审核的加盟商
    .all("/datatable", FranchiseeController.datatable)   //加盟商列表数据
    .all("/datatableWait", FranchiseeController.datatableWait)   //未审核的加盟商数据
    .get("/getData", FranchiseeController.getData)
    .get("/editFran/:id", FranchiseeController.editFran)  //加盟商编辑功能
    .get("/getAllStatus", FranchiseeController.getAllStatus) //获取所有的状态
    .get("/getStatus", FranchiseeController.getStatusByCode)
    .post("/save", FranchiseeController.save) //审核保存功能
    .post("/isEnabledFran", FranchiseeController.isEnabledFran)  //删除加盟商功能
    .get('/checkStatus' , FranchiseeController.checkStatus)  // 检查当前加盟商是否有添加洗衣店的权限
    .get('/hasRoleFran', FranchiseeController.hasRoleFran) // 查找审核通过的加盟商
    .post('/resetPassword', FranchiseeController.resetPassword)//重置用户密码
    .get('/getFranById/:id', FranchiseeController.getFranById)//重置用户密码
;

module.exports = router;
