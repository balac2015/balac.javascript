"use strict";

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Role = mongoose.model('Role');
var async = require('async');
var config = require('../config/config');
var utility = require('utility');
var crypto = require('crypto');
var errorHelper = require(config.root + '/helper/errors');
var Mailer = require(config.root + '/helper/mailer');


// login to system.
var login = function (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/';
  delete req.session.returnTo;
  req.flash('success', '欢迎登录系统！');
  res.redirect(redirectTo);
};

exports.signin = function (req, res) {
};
//
///**
// * Auth callback
// */
//exports.authCallback = login;

/**
 * Show login form
 */

exports.login = function (req, res) {
  res.render('users/login', {
    title: '登录系统'
  })
};

/**
 * Show sign up form
 */

exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard')
  } else {
    res.render('users/signup', {
      title: 'Sign up',
      user: new User()
    })
  }
};

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/')
};

/**
 * Session
 */
exports.session = login;

/**
 * Create user
 */

exports.create = function (req, res, next) {
  var user = new User(req.body);
  user.provider = 'local';
  console.log("create user ... " + user);
  user.save(function (err, new_user) {
    console.log("Save user result: ", err);
    if (err) {
      return res.render('users/signup', {
        errors: errorHelper.proper(err.errors),
        user: user,
        title: 'Sign up'
      })
    } else {
      console.log(user)
      // manually login the user once successfully signed up
      req.logIn(user, function (err) {
        if (err) {
          console.log(err)
          return next(err)
        }
        return res.redirect('/dashboard')
      })
    }
  })
};

/*
 * list
 */
exports.init = function (req, res) {
  for (var i = 0; i < 100; i++) {
    var U = new User({email: "mail" + i + "@163.com", username: "user " + i});
    U.password = '123456';
    U.save(function (err, obj) {
      if (err) {
        console.log(err);
      }
    });
    console.log("User " + U + " created.");
  }
  res.send("init ok.");
};


/*
 * list
 */
exports.list = function (req, res) {
  new User().findUserAndRole(req, res);
};

/*user list table json datasource*/
exports.datatable = function (req, res) {
  User.dataTable(req.query, function (err, data) {
    res.send(data);
  });
};


exports.add = function (req, res) {
    Role.find(function (err, roles) {
      res.render('user/userForm', {
        viewType: "add",
        user: null,
        roles: roles
      })
    });
};

exports.edit = function (req, res) {
  var id = req.param("id");
  User.findById({'_id': id}, function (err, user) {
    if (err) {
      console.log(err);
      req.flash('error', err);
      res.redirect('/system/user');
    } else {
      Role.find(function (err, roles) {
        res.render('user/userForm', {
          viewType: "edit",
          user: user,
          roles: roles
        })
      });
    }
  });
};


exports.del = function (req, res) {
  var ids = req.body.ids || req.params.ids;
  User.remove({'_id': ids}, function (err, result) {
    if (err) {
      console.log(err);
      req.flash('error', err);
    } else {
      req.flash('success', '数据删除成功!');
      res.redirect('/system/user');
    }
  });

};

/**
 * 检查角色名称是否已经存在^
 */
exports.checkName = function (req, res) {
  var newName = req.query.username;
  var oldName = req.query.oldName;
  if (newName === oldName) {
    res.send('true');
  } else {
    User.count({username: newName}, function (err, result) {
      if (result > 0) {
        res.send('false');
      } else {
        res.send('true');
      }
    });
  }
};

/**
 * 新增或编辑时保存数据
 * @param req
 * @param res
 */
var save = function (req, res) {
  var id = req.body.id;

  if (!id) {
    var user = new User(req.body);
    user.save(function (err, newUser) {
      handleSaved(req, res, err, newUser, 'add');
    });
  } else {
    // update
    User.findByIdAndUpdate({'_id': id}, req.body, function (err, user) {
      handleSaved(req, res, err, (err ? req.body : user), 'edit');
    });
  }
};
exports.save = save;
// handle object saved
function handleSaved(req, res, err, user, type) {
  if (err) {
    console.log(err);
    req.flash('error', '用户保存失败!');
    res.render('user/userForm', {
      viewType: type,
      user: user
    });
  } else {
    var roleId = req.body.roles;
    console.log("Roles:" + roleId);

    user.roles = roleId;
    user.save();
    //user.addRole(roleId);
    req.flash('success', '用户保存成功!');
    res.redirect('/system/user');
  }
}

/**
 * 修改用户资料
 * @param req
 * @param res
 */
exports.updateProfile = function (req, res) {
  var id = req.body.id;
  console.log(req.body);
  if (id) {
    // update
    User.update({'_id': id}, req.body, function (err, result) {
      console.log(err);
      console.log(result);
      if (err) {
        res.send({success: false, msg: err});
      } else {
        res.send({success: true, msg: '保存个人资料成功'});
      }
    });
  }
};

/**
 *  Show profile
 */
exports.profile = function (req, res, next) {
  var username = req.params.username;

  async.waterfall([
    function (callback) {
      if (req.user) {
        if (username === req.user.username) {
          callback(null, req.user)
        } else {
          User.findOne({username: username}, function (err, user) {
            callback(err, user)
          })
        }
      } else {
        User.findOne({username: username}, function (err, user) {
          callback(err, user)
        })
      }
    }], function (err, user) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      res.render('404', {url: req.url, error: '404 Not found'});

    } else {
      if (user.photo_profile === undefined) {
        //user.photo_profile = 'https://gravatar.com/avatar/' + utility.md5(user.email) + '?s=200&d=retro'
        user.photo_profile = '';

      }
      res.render('users/profile', {
        title: user.name,
        user: user
      })
    }

  })
};
/**
 * 验证用户密码
 * @param req
 * @param res
 */
exports.virtualPwd = function (req, res) {
  var id = req.user._id;
  var pwd = req.param("oldPwd");
  User.findById(id,function(err,user){
    if(!user || !user.authenticate(pwd)){
      console.log("输入的原密码不正确");
      res.send('false');
    }else{
      console.log("输入的原密码正确");
      res.send('true');
    }
  });
};
/**
 * 修改用户密码
 * @param req
 * @param res
 */
exports.editPassword = function (req, res) {
  var id = req.user._id;
  var oldPwd = req.body.oldPwd;
  var newPwd = req.body.newPwd;
  var affirmPwd = req.body.affirmPwd;
  console.log(req.body);
  if (id) {
    User.findOne({_id:id},function(err,user){
      if(!user || !user.authenticate(oldPwd)){
        req.flash("errors", "输入的原密码不正确");
        res.redirect('/'+req.user.username);
      }else{
        if(newPwd === affirmPwd){
          var pwd = user.encryptPassword(newPwd);
          var updata={hashed_password:pwd};
          var options={};
          User.update({_id:id},updata,options,function(err,ff){
            req.flash("success", "密码已修改,请重新登录！");
            res.redirect('/login');
          });
        }else{
          req.flash("errors", "新密码和确认密码不一致");
          res.redirect('/'+req.user.username);
        }
      }
    });
  }else{
    req.flash("errors", "没有查到用户");
    res.redirect('/'+req.user.username);
  }
};
/**
 * 重置用户密码
 * @param req
 * @param res
 */
exports.resetPassword = function (req, res) {
  var id = req.body.userId;
  console.log(req.body);
  if (id) {
    User.findOne({_id: id}, function (err, user) {
      var pwd = user.encryptPassword('123456');
      var updata = {hashed_password: pwd};
      var options = {};
      User.update({_id: id}, updata, options, function (err, ff) {
        req.flash("success", "密码已重置");
        res.redirect('/system/user');
      });
    });
  }else{
    req.flash("errors", "没有找到用户");
    res.redirect('/system/user');
  }
};
//获得具体分组情况
exports.getRoleSelect = function (req, res) {
  Role.find({}, function (err, group) {
    if (err) {
      console.log(err);
    } else {
      res.send(group);
    }
  });
};

exports.getForgotPassword = function (req, res) {
  res.render('users/forgot-password', {
    title: 'Forgot Password'
  });
};


exports.postForgotPassword = function (req, res) {

  async.waterfall([
    function (next) {
      crypto.randomBytes(16, function (err, buf) {
        var token = buf.toString('hex');
        next(err, token);
      });
    },
    function (token, next) {
      User.findOne({email: req.body.email.toLowerCase()}, function (err, user) {

        if (!user) {
          return errorHelper.custom(res, {msg: 'No account with that email address exists.', code: 404});
        }

        user.reset_password_token = token;
        user.reset_password_expires = Date.now() + 43200000; // 12 hour

        user.save(function (err) {
          next(err, token, user);
        });
      });
    }, function (token, user, next) {
      user.url_reset_password = req.protocol + '://' + req.headers.host + '/reset/' + token

      Mailer.sendOne('forgot-password', "Trick.JS - Password Reset", user, function (err, responseStatus, html, text) {
        next(err, responseStatus);
      })
    }
  ], function (err) {
    if (err) {
      err.status = 500;
      errorHelper.custom(res, err);
    }
    return res.json({message: 'success', status: 200});
  });
}


exports.getResetPassword = function (req, res) {
  User
    .findOne({reset_password_token: req.params.token})
    .where('reset_password_expires').gt(Date.now())
    .exec(function (err, user) {
      if (user) {
        res.render('users/reset-password', {
          title: '忘记密码'
        });
      } else {
        req.flash('error', {msg: 'Password reset token is invalid or has expired.'});
        return res.redirect('/');
      }
    })

};

exports.postResetPassword = function (req, res) {

  req.assert('password', 'Password must be at least 6 characters long.').len(6);
  req.assert('confirm_password', 'Please enter confirm password same with password.').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    err.status = 500;
    errorHelper.custom(res, errors);
  }

  async.waterfall([
    function (done) {
      User
        .findOne({reset_password_token: req.params.token})
        .where('reset_password_expires').gt(Date.now())
        .exec(function (err, user) {
          if (!user) {
            return errorHelper.custom(res, {
              msg: 'Password reset token is invalid or has expired.',
              code: 410
            });
          }

          user.password = req.body.password;
          user.reset_password_token = '';
          user.reset_password_expires = '';

          user.save(function (err) {
            if (err) {
              return errorHelper.mongoose(res, err);
            }
            done(user);
          });
        });
    }], function (user) {
    user.url_login = req.protocol + '://' + req.headers.host + '/login'

    Mailer.sendOne('reset-password', "Trick.JS - Your password has been changed", user, function (err, responseStatus, html, text) {
      if (err) {
        return errorHelper.custom(res, {msg: err, code: 500});
      } else {
        return res.json({message: 'Success! Your password has been changed.', code: 200});
      }
    })
  });
};
