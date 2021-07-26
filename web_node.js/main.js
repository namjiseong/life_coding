//필요한 헤더
var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require('querystring');
var path = require('path');
var template = require('./lib/template.js');

var sanitizeHtml = require('sanitize-html');
console.log(11);

//서버 열기
var app = http.createServer(function (request, response) {

    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    
    if (pathname === "/") {
    //if  홈페이지라면
    
        if(queryData.id === undefined){
            
            fs.readdir('./data/', function(err, files){  
        
                var title = 'Welcome';
                var description = 'Hello, Node.js! ~~';
                //함수 2개로 목록, 본문 구현
                var list = template.List(files);
                var html =template.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a>`);
                
                response.writeHead(200);
                response.end(html);
            });
      //다른 하위 페이지
        } else {
            fs.readdir('./data/', function(err, files){
                var filteredId = path.parse(queryData.id).base;
                fs.readFile(`data/${filteredId}`, "utf-8", function (err, description) {
                    var title = queryData.id;
                    var sanitizedTitle = sanitizeHtml(title);
                    var sanitizedDescription = sanitizeHtml(description);
                    var list = template.List(files);
                    var html = template.HTML(sanitizedTitle, list,
                         `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
                          `<a href="/create">create</a>
                           <a href="/update?id=${sanitizedTitle}">update</a>
                           <form action="delete_process" method="post" onsubmit="alert(1);">
                            <input type="hidden" name="id" value="${sanitizedTitle}">
                            <input type="submit" value="delete">
                           </form>`
                           );
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    }else if(pathname === "/create"){
        fs.readdir('./data/', function(err, files){  
        
            var title = 'WEB - create';
            
            //함수 2개로 목록, 본문 구현
            var list = template.List(files);
            var html =template.HTML(title, list, `
                <form action="/create_process" method="post">
                <input type="text" name="title" placeholder="title">
                <p>
                    <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
                </form>
            `, '');
            
            response.writeHead(200);
            response.end(html);
        });
    
    }else if(pathname === "/create_process"){
        var body = "";
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                response.writeHead(302,{Location: `/?id=${title}`});
                response.end();
            })
        });
        
        
    }else if(pathname === '/update'){
        fs.readdir('./data/', function(err, files){
            var filteredId = path.parse(queryData.id).base;    
            fs.readFile(`data/${filteredId}`, "utf-8", function (err, description) {
                var title = queryData.id;
                var list = template.List(files);
                var html = template.HTML(
                    title,
                    list,
                    `
                    <form action="/update_process" method="post">
                    <input type="hidden" name="id" value="${title}">
                    <input type="text" name="title" value="${title}">
                    <p>
                        <textarea name="description">${description}</textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                    </form>
                `,
                  `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
                );
                response.writeHead(200);
                response.end(html);
            });
            });
    }else if(pathname === "/update_process"){
        var body = "";
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            fs.rename(`data/${id}`, `data/${title}`, function(error){
                fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                    response.writeHead(302,{Location: `/?id=${title}`});
                    response.end();
                });
            });
            
            
        });

    }else if(pathname === "/delete_process"){
        var body = "";
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;
            var filteredId = path.parse(id).base;
            fs.unlink(`data/${filteredId}`, function(error){
                response.writeHead(302, {Location: `/`});
                response.end();
            })
            
            
        });

    }else{
        
        response.writeHead(404);
        response.end("Not found");
          
    }
});
app.listen(5500);
