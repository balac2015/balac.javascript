var express = require('express');
var http = require('http');

var app = express();

var counter = 0;

// view engine setup
app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
    counter++;
    res.render('index')
})

var server = http.createServer(app);
server.listen(3000);
console.log('server started on http://localhost:3000//');

app.locals.jadeVar = 'jade变量';
app.locals.title = 'welcome to visitor';
app.locals.counter = '44440';

app.locals.name ='tj';
app.locals.email = 'tj@vision.media.ca';