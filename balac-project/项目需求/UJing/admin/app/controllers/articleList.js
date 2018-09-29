var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var ArticleSelect = mongoose.model('ArticleSelect');
var async = require('async');
var config = require('../config/config');
var ObjectId = mongoose.Types.ObjectId;
var utility = require('utility');
var multer = require('multer');
var express = require('express');
var app = express();


exports.showArticleList = function (req, res) {

  var search = {};
  var page = {limit: 5, num: 1};
  if (req.query.p) {
    page['num'] = req.query.p < 1 ? 1 : req.query.p;
  }

  //查询条件与需要的字段
  var model = {
    search: search,
    columns: '_id articleTitle articleClass articleImp isDisplay addTime',
    page: page
  }

  new Article().findPagination(model, function (err, pageCount, list, count) {
    page['pageCount'] = pageCount;
    page['size'] = list.length;
    page['numberOf'] = pageCount > 5 ? 5 : pageCount;
    page['count'] = count;
    console.log(page);
    return res.render('article/articleList', {
      page: page,
      list: list
    });
  });

}


//添加功能
exports.addArticle = function (req, res) {
  var articleTitle = req.param('articleTitle')
    , articleClass = req.param('articleClass')
    , articleImp = req.param('articleImp')
    , isDisplay = req.param('isDisplay')
    , author = req.param('author')
    , keyWord = req.param('keyWord')
    , abstract = req.param('abstract')
    , httplink = req.param('httplink')
    , docs = req.param('docs')
    , articleText = req.param('articleText')
    , objId = req.param('objId');


    var saveObj = {};
    if (articleTitle !== '') {
      saveObj.articleTitle = articleTitle;
    }
    if (articleClass !== '') {
      saveObj.articleClass = articleClass;
    }
    if (articleImp !== '') {
      saveObj.articleImp = articleImp;
    }
    if (isDisplay !== '') {
      saveObj.isDisplay = isDisplay;
    }
    if (author !== '') {
      saveObj.author = author;
    }
    if (keyWord !== '') {
      saveObj.keyWord = keyWord;
    }
    if (abstract !== '') {
      saveObj.abstract = abstract;
    }
    if (httplink !== '') {
      saveObj.httplink = httplink;
    }
    if (docs !== '') {
      saveObj.docs = docs;
    }
    if (articleText !== '') {
      saveObj.articleText = articleText;
    }

    if(objId != ''){
      var today = new Date();
      saveObj.addTime = today;
      var update = saveObj
        ,options = {};

      Article.update({_id:objId},update,options,function(err,docs){
        res.redirect('/showArticleList');
      });

    }else{
      var today = new Date();
      saveObj.addTime = today;
      var articleFrom = new Article(saveObj);
      articleFrom.save(function (error, obj) {
        if (error) {
          console.log(error);
        } else {
          res.redirect('/showArticleList');
        }
      });
    }
}

//编辑功能
exports.editArticle = function (req,res){
  var id = new ObjectId(req.param('id'));
  Article.findOne({_id:id},function(err,docs){
      if(err){
        console.log(err);
      }else{
        res.send(docs);
      }
    });
}

//删除功能
exports.delArticle = function (req, res) {

  var id = new ObjectId(req.param('id'));
  Article.remove({_id: id}, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/showArticleList');
    }
  })
}

//获取下拉选项
exports.articleSelect = function (req, res) {
  ArticleSelect.find({"distinguish":"article"}, function (err, docs) {
    res.send(docs);
  });
}

//文件上传
exports.uploadFile = function(req,res){
  console.log(getExtension(req.files.userFile.name));
  res.send({image: false, file: req.files.userFile.originalname, savedAs: req.files.userFile.name});
}


function getExtension(fn) {
  return fn.split('.').pop();
}










