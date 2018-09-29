"use strict";

var morgan = require('morgan');
var path = require('path');
var responseTime = require('response-time');
var methodOverride = require('method-override');
var compression = require('compression');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var csrf = require('lusca').csrf();
var MongoStore = require('connect-mongo')({session: session});
var errorHandler = require('errorhandler');
var expressValidator = require('express-validator');
var env = process.env.NODE_ENV || 'development';
var views_helpers = require('../helper/views-helper');
var pkg = require('../../package.json');
var flash = require('express-flash');
var _ = require('lodash');

var Auth = require('../middleware/authorization');

// Routers
var index = require('../routes/index');
var system = require('../routes/system');
var store = require('../routes/store');//store 洗衣店管理
var franchisee = require('../routes/franchisee'); //alliance 加盟商相关联的路由
var wechatFans = require('../routes/wechatFans'); // 微信粉丝查询
var device = require('../routes/device');//设备
var order = require('../routes/order');//设备型号价格
var basicSet = require('../routes/basicSet');//基础设定

// 加盟商自助管理路由
var vendor = require('../routes/vendor');

module.exports = function (app, express, passport) {
  var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  };

  // settings
  app.set('env', env);
  app.set('port', app.config.server.port || 3000);
  app.set('views', path.join(__dirname, '../../app/views'));
  app.set('view engine', 'jade');
  app.enable('trust proxy');
  app.disable('x-powered-by');

  // Express use middlewares
  app.use(favicon(path.join(__dirname, '../../public/favicon.png')));
  app.use(allowCrossDomain);
  if (env === 'development') {
    app.use(morgan('dev'))
  } else {
    app.use(morgan('combined', {
      skip: function (req, res) {
        return res.statusCode < 400
      },
      stream: require('fs').createWriteStream(app.config.root + '/access.log', {flags: 'a'})
    }))
  }

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(expressValidator());
  app.use(methodOverride());

  app.use(cookieParser('notagoodsecretnoreallydontusethisone'));
  app.use(session({
    name: [pkg.name, '.sid'].join(),
    resave: true,
    saveUninitialized: true,
    secret: pkg.name,
    genid: function (req) {
      return require('node-uuid').v4(); // use UUIDs for session IDs
    },
    store: new MongoStore({
      url: app.config.database.url,
      collection: 'sessions'
    })
  }));

  // connect flash
  app.use(flash());

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session({
    maxAge: new Date(Date.now() + 3600000)
  }));

  // authorization
  app.use(function (req, res, next) {
    if (req.isAuthenticated())
      console.log("Current User: " + req.user);

    next();
  });

  // CSRF
  var csrfExclude = ['/'];
  app.use(function (req, res, next) {
    var path = req.path.split('/')[1];
    var ajax = req.params.ajax || req.param.ajax || req.body.ajax;

    console.log("ajax request ,skip csrf:" + req.header('X-Requested-With'));
    if (/api/i.test(path)) {
      return next();
    } else if (req.header('X-Requested-With') === 'XMLHttpRequest') {
      return next();
    } else {
      if (_.contains(csrfExclude, req.path)) return next();
      csrf(req, res, next);
    }
  });

  app.use(views_helpers(pkg.name));

  app.use(function (req, res, next) {
    res.locals.pkg = pkg;
    res.locals.NODE_ENV = env;
    res.locals.moment = require('moment');
    if (_.isObject(req.user)) {
      res.locals.User = req.user
    }
    next();
  });

  // static content
  app.use(express.static(path.normalize(__dirname + '/../../public')));

  /** ROUTES Apps */
  app.use('/system', Auth.requiresLogin, system);
  //基础设定路由
  app.use('/basicSet', Auth.requiresLogin, basicSet);

  //store 洗衣店管理
  app.use('/store', store);

  //alliance 加盟商相关联的路由
  app.use('/franchisee', Auth.requiresLogin, franchisee);

  //微信粉丝管理
  app.use('/wechatFans', Auth.requiresLogin, wechatFans);

  //设备相关路由
  app.use('/device', device);

  //设备类型相关路由
  app.use('/order', order);

  // 加盟商自助管理
  app.use('/vendor', vendor);

  //index路由放到最后
  app.use('/', index);

  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(responseTime());
  } else {
    app.use(compression({
      filter: function (req, res) {
        return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
      },
      level: 9
    }))
  }

  //404
  app.use(function handleNotFound(req, res, next) {
    res.status(404);
    if (req.accepts('html')) {
      res.render('404', {url: req.url, error: '404 Not found'});
      return;
    }
    if (req.accepts('json')) {
      res.send({error: 'Not found'});
      return;
    }
    res.type('txt').send('Not found');
  });

  if (env === 'development') {
    app.use(errorHandler());
  } else {
    app.use(function logErrors(err, req, res, next) {
      if (err.status === 404) {
        return next(err)
      }
      console.error(err.stack);
      next(err)
    });

    app.use(function respondError(err, req, res, next) {
      var status, message;
      console.error("Response Error ... \n" + err.stack);
      status = err.status || 500;
      res.status(status);

      message = ((err.productionMessage && err.message) || err.customProductionMessage);

      if (!message) {
        if (status === 403) {
          message = '权限不足，无法访问该页面';
        } else {
          message = '系统错误，请联系管理员';
        }
      }

      if (req.accepts('json')) {
        res.send({error: message});
      } else {
        res.type('txt').send(message + '\n');
      }
    });
  }
};
