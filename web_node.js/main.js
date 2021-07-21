var http = require('http');
var fs = require('fs');
var url = require('url');
 
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    console.log(queryData.id);
    if(_url == '/'){
      title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
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
<a href="https://www.w3.org/TR/html52/" 
target="_blank" title="html5 speicification">
Hypertext Markup Language (HTML)</a> 
is the standard markup language for 
<strong>creating <u>web</u> pages</strong> <br>
and web applications.Web browsers receive HTML documents 
from a web server or from local storage <br>and render them 
into multimedia web pages. HTML describes the structure 
of a web page semantically and <br>originally included cues for the 
appearance of the document.</p>

<img src="coding.jpg" width="450" height="450">

<p style="margin-top:45px;">

<p>HTML elements are the building 
blocks of HTML pages. With HTML constructs, images and other objects, 
such as interactive forms, <br>may be embedded into the rendered page. 
It provides a means to create structured documents by denoting 
structural semantics for text <br>such as headings, paragraphs, lists, 
links, quotes and other items. HTML elements are delineated by tags, 
written using angle brackets. </p>
</div>
</div>

</body>
    `;
    response.end(template);
 
});
app.listen(5500);