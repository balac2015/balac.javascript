var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');
var Vendor = mongoose.model('Franchisee');

module.exports = function (app, passport) {
  // serialize sessions
  passport.serializeUser(function (user, done) {
    //console.log("serializeUser:" + user);
    //var type = req.body.userType || req.session.userType;
    done(null, user.id);
  });

  passport.deserializeUser(function (req, id, done) {
    // check user type.
    var type = req.body.userType || req.session.userType;
    //console.log("deserializeUser:id=" + id + "&& type=" + type);

    if (type === 'vendor') {
      // vendor
      Vendor.findById(id, function (err, vendor) {
        done(err, vendor);
      })
    } else {
      // admin user
      User.findById(id, function (err, user) {
        //console.log("deserialize User from mongo: " + user);
        done(err, user);
      })
    }
  });

  // use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, username, password, done) {
      var type = req.body.userType || req.session.userType;
      req.session.userType = type;
      if (type === 'vendor') {
        Vendor.findOne({mobile: username, verification: 'ok'},
          function (err, vendor) {
            console.log(err);
            if (err) {
              return done(vendor);
            }
            if (!vendor) {
              console.log("vendor not found!");
              return done(null, false, {message: '加盟商不存在！'});
            }
            if (vendor != null && !vendor.authenticate(password)) {
              console.log("vendor input password is incorrect.");
              return done(null, false, {message: '用户名或密码不正确！'});
            }
            return done(null, vendor);
          }
        )
      } else {
        User.findOne({
            $or: [
              {email: username},
              {mobile: username},
              {username: username}
            ]
          },
          function (err, user) {
            console.log(user);
            if (err) {
              return done(err);
            }
            if (!user) {
              console.log("user not found!");
              return done(null, false, {message: '用户不存在！'});
            }
            if (user != null && !user.authenticate(password)) {
              console.log("user input password is incorrect.");
              return done(null, false, {message: '用户名或密码不正确！'});
            }
            return done(null, user);
          }
        )
      }

    }
  ))
}
;
