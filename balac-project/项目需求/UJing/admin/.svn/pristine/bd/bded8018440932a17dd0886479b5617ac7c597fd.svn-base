"use strict";

module.exports = function (ROOT_PATH) {
  var config = {
    server: {
      port: 3000,
      hostname: 'localhost'
    },
    database: {
      url: 'mongodb://localhost/cxer'
    },
    BaseApiURL: 'http://localhost:3000/api/',
    root: ROOT_PATH,
    app: {
      name: 'U净 administration app'
    },
    mailgun: {
      user: process.env.MAILGUN_USER || 'test@midea.com',
      password: process.env.MAILGUN_PASSWORD || '123456'
    },
    phamtom: {
      retries: 2,
      width: 1280,
      height: 800,
      maxRenders: 50
    }
  }
  return config;
}
