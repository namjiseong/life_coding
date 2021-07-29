//const -> 고정
//const express = require('express')
var express = require('express');
var app = express();
var url = require('url');

var topic = require('./lib/topic');

//route. routing
//app.get('/', (req, res) => res.send('Hello World!')) - 최신버전 코드
app.get('/', function(request, response) { 
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  if (queryData.id === undefined) {
    topic.home(request, response);
  }else {
    topic.page(request, response);
  }
});
app.get('/page/:pageId', function(request, response) { 
  response.send(request.params);
});

app.get('/create',function(request, response){
  topic.create(request, response);
});

app.post('/create_process',function(request, response){
  topic.create_process(request, response);
});

app.get('/update', function(request, response){
  topic.update(request, response);
});

app.post('/update_process', function(request, response){
  topic.update_process(request, response);
})

app.listen(5500, function(){ 
  console.log('Example app listening on port 5500!');
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