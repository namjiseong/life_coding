//const -> 고정
//const express = require('express')
var express = require('express');
var app = express();
var url = require('url');
var bodyParser = require('body-parser');
var topic = require('./lib/topic');
var compression = require('compression');
var helmet = require('helmet')
app.use(helmet());
var path = require('path');
var topicRouter = require('./routes/topic')
var indexRouter = require('./routes/index')
exports.app = app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
app.get('*', function(request, response, next){
  topic.getlist().then(function(topics){
    request.list = topics;
    next();
  })
});
app.use('/topic', topicRouter);
app.use('/', indexRouter);

//route. routing
//app.get('/', (req, res) => res.send('Hello World!')) - 최신버전 코드



app.use(function(req, res, next){
  res.status(404).send('Sorry cant find that!');
})

app.listen(5500, function(){ 
  console.log('go!');
});



/*
var http = require('http');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var db = require('./lib/db.js');
var topic = require('./lib/topic');
var author = require('./lib/author');

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if (pathname === "/") {
    if (queryData.id === undefined) {
      topic.home(request, response);
    } else {
      topic.page(request, response);
    }
  } else if (pathname === "/create") {
    topic.create(request, response);
  } else if (pathname === "/create_process") {
    topic.create_process(request, response);
  } else if (pathname === "/update") {
    topic.update(request, response);
  } else if (pathname === "/update_process") {
    topic.update_process(request, response);
  } else if (pathname === "/delete_process") {
    topic.delete_process(request, response);
  } else if(pathname === "/author"){
    author.home(request, response);
  } else if(pathname === "/author/create_process"){
    author.create_pocess(request, response);
  } else if(pathname === "/author/update"){
    author.update(request, response);
  } else if(pathname === "/author/update_process"){
    author.update_process(request, response);
  } else if(pathname === "/author/delete_process"){
    author.delete_process(request, response);
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(5500);
*/