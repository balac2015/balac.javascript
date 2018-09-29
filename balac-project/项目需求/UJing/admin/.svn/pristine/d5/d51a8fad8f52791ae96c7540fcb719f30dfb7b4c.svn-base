"use strict";

var express = require('express');
var router = express.Router();
var config = require('../config/config');

//用户控制器
var userController = require(config.root + '/controllers/UserController');
var roleController = require(config.root + '/controllers/RoleController');
var permissionController = require(config.root + '/controllers/PermissionController');

// 系统管理下均需要授权
//router.all("/*", Auth.requiresLogin);

//使用express4,var Router = express.Router().相当于一个简单的app,在Router上面装备控制器与中间件1
router.get(['/user', '/user/list'], userController.list)
  .all("/user/datatable", userController.datatable)
  .get("/user/checkname", userController.checkName)
  .get('/user/virtualPwd',userController.virtualPwd)//验证密码是否正确
    .post('/user/editPassword',userController.editPassword)//修改用户密码
    .post('/user/resetPassword',userController.resetPassword)//重置用户密码
  .get("/user/add", userController.add)
  .get("/user/edit", userController.edit)
  .get("/user/getRoleSelect", userController.getRoleSelect)
  .all("/user/del", userController.del)
  .post("/user/save", userController.save);

// role
router.get(['/role', '/role/list'], roleController.list)
  .all("/role/datatable", roleController.datatable)
  .get("/role/permission/datatable/:roleId", roleController.datatablePermission)
  .get("/role/checkname", roleController.checkName)
  .get("/role/add", roleController.add)
  .get("/role/edit", roleController.edit)
  .all("/role/del", roleController.del)
  .post("/role/save", roleController.save)
  .get("/role/permissions/:roleId", roleController.permissions)
  .post("/role/addpermissions/:roleId", roleController.addPermissions)
  .post("/role/revokepermissions/:roleId", roleController.revokePermissions)
;

// permission
router.get(['/permission', '/permission/list'], permissionController.list)
  .all("/permission/datatable", permissionController.datatable)
  .get("/permission/checkname", permissionController.checkName)
  .get("/permission/add", permissionController.add)
  .get("/permission/edit", permissionController.edit)
  .all("/permission/del", permissionController.del)
  .post("/permission/save", permissionController.save);


module.exports = router;
