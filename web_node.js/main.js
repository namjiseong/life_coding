//필요한 헤더
var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require('querystring');
function templateHTML(title, list, body){
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
    <a href="/create">create</a>
    <div id="article">
    <p>
    ${body}
    </p>

    </div>
    </div>

    </body>
    `;
}

function templateList(files){
    var list = '<ul>';
    var i = 0;
    
    while(i < files.length){
        list = list + '<li><a href="/?id='+files[i]+'">'+files[i]+'</a></li>';
        i = i + 1;
    }
    list = list + '</ul>';
    return list;
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
                var list = templateList(files);
                var template =templateHTML(title, list, `<h2>${title}</h2>${description}`);
                
                response.writeHead(200);
                response.end(template);
            });
      //다른 하위 페이지
        } else {
            fs.readdir('./data/', function(err, files){
                
                fs.readFile(`data/${queryData.id}`, "utf-8", function (err, description) {
                    var title = queryData.id;
                    var list = templateList(files);
                    var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    }else if(pathname === "/create"){
        fs.readdir('./data/', function(err, files){  
        
            var title = 'WEB - create';
            
            //함수 2개로 목록, 본문 구현
            var list = templateList(files);
            var template =templateHTML(title, list, `
                <form action="http://localhost:5500/create_process" method="post">
                <input type="text" name="title" placeholder="title">
                <p>
                    <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
                </form>
            `);
            
            response.writeHead(200);
            response.end(template);
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
        });
        response.writeHead(200);
        response.end("success");
        
    }else{
        
        response.writeHead(404);
        response.end("Not found");
          
    }
});
app.listen(5500);
