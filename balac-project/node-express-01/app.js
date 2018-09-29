import express from 'express';
import config from 'config-lite';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import winston from 'winston';
import expressWinston from 'express-winston';
import path from 'path';
import history from 'connect-history-api-fallback';
import chalk from 'chalk';

import router from './routes/index.js';
console.log('============%o', router)
import db from './mongodb/db.js';
const app = express();

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('X-Powered-By', '3.2.1');

    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

// app.use(Statistic.apiRecord)
const MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(session({
    name: config.session.name,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: config.session.cookie,
    store: new MongoStore({
        url: config.url
    })
}));

// router(app);
app.use(history());
app.use(express.static('./public'));
app.listen(config.port);
console.log(`服务器访问地址：http://localhost:${config.port}`)