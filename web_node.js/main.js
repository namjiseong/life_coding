//필요한 헤더
var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require('querystring');

var template = {
    HTML:function(title, list, body, control){
        return `
        <head>
        <title>생활 코딩 웹 공부 ${title}</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="style.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="colors.js"></script>
        </head>
    
    
        <body>
        
        <h1><a href="/">WEB</a></h1>
        <input type="button" value="night" onclick="
            nightDayHandler(this);
        ">
        <div id="grid">
        ${list}
        ${control}
        <div id="article">
        <p>
        ${body}
        </p>
    
        </div>
        </div>
    
        </body>
        `;
    },List:function(files){
        var list = '<ul>';
        var i = 0;
        
        while(i < files.length){
            list = list + '<li><a href="/?id='+files[i]+'">'+files[i]+'</a></li>';
            i = i + 1;
        }
        list = list + '</ul>';
        return list;
    }
}




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
                
                fs.readFile(`data/${queryData.id}`, "utf-8", function (err, description) {
                    var title = queryData.id;
                    var list = template.List(files);
                    var html = template.HTML(title, list,
                         `<h2>${title}</h2>${description}`,
                          `<a href="/create">create</a>
                           <a href="/update?id=${title}">update</a>
                           <form action="delete_process" method="post" onsubmit="alert(1);">
                            <input type="hidden" name="id" value="${title}">
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
                
            fs.readFile(`data/${queryData.id}`, "utf-8", function (err, description) {
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
            
            fs.unlink(`data/${id}`, function(error){
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
