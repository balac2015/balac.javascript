/**
 * Created by xingjie201 on 2015/12/4.
 */
var mongoose = require('mongoose');
var async = require('async');
var config = require('../config/config');
var cache = require('memory-cache');
var ObjectId = mongoose.Types.ObjectId;
var PromotionsPrice = mongoose.model('PromotionsPrice');

/**
 * 促销跳转
 * @param req
 * @param res
 */
exports.list = function (req, res) {
    res.render('promotionsPrice/promotionsPriceList', {
    });
};
/**
 * 促销数据
 * @param req
 * @param res
 */
exports.datatable = function (req, res) {
    PromotionsPrice.dataTable(req.query, function (err, data) {
        res.send(data);
    });
};
/**
 * 促销的修改
 * @param req
 * @param res
 */
exports.edit = function (req, res) {
    var id=req.params.id;
    PromotionsPrice.findById(id,function(err,promotion){
        if(err){
            console.log(err.message);
        }else{
            res.render('promotionsPrice/promotionsPriceForm', {
                viewType:"edit",
                promotion:promotion
            });
        }
    });
};
/**
 * 促销的添加
 * @param req
 * @param res
 */
exports.add = function (req, res) {
    res.render('promotionsPrice/promotionsPriceForm', {
        viewType:"add",
        promotion:null
    });
};

/**
 * 促销的保存
 * @param req
 * @param res
 */
exports.save = function (req, res) {
    var id=req.body.id;

    if(id == null){
        var promotion = new PromotionsPrice(req.body);
        promotion.save(function (err, obj) {
            if (err) {
                console.log(err);
            }else{
                req.flash("success", "保存成功！");
                res.redirect('/basicSet/promotion');
            }
        });
    }else{
        var updata= {
            price: req.body.price
            , effectiveTime: req.body.effectiveTime //生效时间
            , failureTime: req.body.failureTime //失效时间
        };
        var options={};
        PromotionsPrice.update({'_id': ObjectId(id)},updata,options,function(err,ff){
            if(err){
                console.log(err.message);
                req.flash("errors", "修改失败！");
            }else {
                req.flash("success", "修改成功！");
            }
           res.redirect('/basicSet/promotion');
        });
    }
};
/**
 * 促销的修改和添加
 * @param req
 * @param res
 */
exports.del = function (req, res) {
    var id=req.params.id;
    if(id){
        PromotionsPrice.remove({'_id': id}, function (err, result) {
            if (err) {
                console.log(err);
                req.flash('error', err.message);
            } else {
                req.flash('success', '数据删除成功!');
            }
            res.redirect('/basicSet/promotion');
        });
    }else{
        req.flash('error',"请选择数据");
        res.redirect('/basicSet/promotion');
    }
};