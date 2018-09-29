/*
 *  Generic require login routing middleware
 */
"use strict";

var _ = require('lodash');

exports.requiresLogin = function (req, res, next) {
  console.log("User type logged in: " + req.session.userType);
  if (req.isAuthenticated() && req.session.userType === "platform") return next();
  if (req.method == 'GET') req.session.returnTo = req.originalUrl;
  res.redirect('/login');
};

exports.requiresVendorLogin = function (req, res, next) {
  if (req.isAuthenticated() && req.session.userType === "vendor") return next();
  if (req.method == 'GET') req.session.returnTo = req.originalUrl;
  res.redirect('/vendor/login');
};


exports.hasLogin = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    next();
  }
};


/*
 *  User authorization routing middleware
 */
exports.user = {
  hasAuthorization: function (req, res, next) {
    if (req.profile.id != req.user.id) {
      req.flash('info', 'You are not authorized');
      return res.redirect('/users/' + req.profile.id);
    }
    next();
  }
};

/*
 *  authorization routing middleware if user has login
 */
exports.APIrequiresUserLogin = function (req, res, next) {

  var is_login = req.headers['is_login'];

  if (req.isAuthenticated() || is_login) {
    return next();
  } else {
    var errPrint = {};
    errPrint.status = 403;
    errPrint.message = "Unauthorized, need user session to access this route";

    return res.json(200, errPrint);
  }
};
