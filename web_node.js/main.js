//필요한 헤더
var http = require("http");
var fs = require("fs");
var url = require("url");
//서버 열기
var app = http.createServer(function (request, response) {

    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;


    if (pathname === "/") {
    //if  홈페이지라면
    if(queryData.id === undefined){
        
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <ul>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ul>
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.writeHead(200);
          response.end(template);
        
      //다른 하위 페이지
        } else {
            fs.readFile(`data/${queryData.id}`, "utf-8", function (err, description) {
            var title = queryData.id;
            var template = `
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
            <ol>
                <li><h3><a href="/?id=HTML">HTML</a></h3></li>
                <li><h3><a href="/?id=CSS">CSS</a></h3></li>
                <li><h3><a href="/?id=JavaScript">JavaScript</a></h3></li>
            </ol>
            <div id="article">
            <h2>${title}</h2>
        
            <p>
            ${description}</p>
            </div>
            </div>
        
            </body>
            `;
            response.writeHead(200);
            response.end(template);
        });

        }
    }else{
        
        response.writeHead(404);
        response.end("Not found");
          
    }
});
app.listen(5500);
