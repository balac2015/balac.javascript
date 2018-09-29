var mongoose = require('mongoose');
var ArticleType = mongoose.model('ArticleType');
var config = require('../config/config');
var ObjectId = mongoose.Types.ObjectId;
var express = require('express');
var app = express();


exports.showArticleType = function (req, res) {
  ArticleType.find({"pId": 0}, function (err, docs) {
    console.log(docs);
    res.render('article/articleType', {
      list: docs
    });
  })
}

exports.tree = function (req, res) {
  ArticleType.find({}, function (err, docs) {
    console.log(docs);
    res.send(docs);
  })
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

  if (objId != '') {
    var today = new Date();
    saveObj.addTime = today;
    var update = saveObj
      , options = {};

    Article.update({_id: objId}, update, options, function (err, docs) {
      res.redirect('/showArticle');
    });

  } else {
    var today = new Date();
    saveObj.addTime = today;
    var articleFrom = new ArticleType(saveObj);
    articleFrom.save(function (error, obj) {
      if (error) {
        console.log(error);
      } else {
        this.showArticleList;
        res.redirect('/showArticle');
      }
    });
  }
}

//编辑功能
exports.editArticle = function (req, res) {
  var id = new ObjectId(req.param('id'));
  ArticleType.findOne({_id: id}, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.send(docs);
    }
  });
}

//删除功能
exports.delArticle = function (req, res) {

  var id = new ObjectId(req.param('id'));
  ArticleType.remove({_id: id}, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      this.showArticleList;
      res.redirect('/showArticle');
    }
  })
}

//获取下拉选项
exports.articleSelect = function (req, res) {
  ArticleSelect.find({}, function (err, docs) {
    res.send(docs);
  });
}

//文件上传
exports.uploadFile = function (req, res) {
  console.log(getExtension(req.files.userFile.name));
  res.send({image: false, file: req.files.userFile.originalname, savedAs: req.files.userFile.name});
}


function getExtension(fn) {
  return fn.split('.').pop();
}










