var http = require('http');
var fs = require('fs');
var url = require('url');
 
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    var pathname = url.parse(_url, true).pathname;
    
    
    if(pathname === '/'){
        fs.readFile(`data/${title}`, 'utf-8', function(err, description){
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
        })
        
    }else{
        response.writeHead(404);
        response.end('Not found');
    }

    
    
 
});
app.listen(5500);