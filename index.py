#!python
print("content-type: text/html; charset=utf-8\n")
print()
import cgi
form = cgi.FieldStorage()
if 'id' in form:
    pageId = form["id"].value
else:
    pageId = 'Welcome'

print('''<!doctype html>
<html>
<head>
    <title>생활 코딩 웹 공부 WEB</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

    <script src="colors.js"></script>
</head>


<body>
    <h1><a href="index.py">WEB</a></h1>
    <input type="button" value="night" onclick="
        nightDayHandler(this);
    ">
    <div id="grid">
<ol>
    <li><h3><a href="index.py?id=HTML">HTML</a></h3></li>
    <li><h3><a href="index.py?id=CSS">CSS</a></h3></li>
    <li><h3><a href="index.py?id=JavaScript">JavaScript</a></h3></li>
</ol>
<div id="article">
<h2>{title}</h2>

A web page (or webpage) is a hypertext document provided by a website and displayed to a user in a web browser.[1] A website typically consists of many web pages linked together in a coherent fashion. The name "web page" is a metaphor of paper pages bound together into a book.

</body>
</html>
'''.format(title=pageId))
