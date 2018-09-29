"use strict";

var express = require('express');
var router = express.Router();
var config = require('../config/config');
var Auth = require('../middleware/authorization');

var promotionsPriceController = require(config.root + '/controllers/PromotionsPriceController');

// 系统管理下均需要授权
router.all("/*", Auth.requiresLogin);

//使用express4,var Router = express.Router().相当于一个简单的app,在Router上面装备控制器与中间件

//PromotionsPrice
router.get(['/promotion', '/promotion/list'], promotionsPriceController.list)
  .get("/promotion/edit/:id", promotionsPriceController.edit)
  .get("/promotion/add", promotionsPriceController.add)
  .get("/promotion/del/:id", promotionsPriceController.del)
  .post("/promotion/save", promotionsPriceController.save)
  .all("/promotion/datatable", promotionsPriceController.datatable)
;

module.exports = router;
