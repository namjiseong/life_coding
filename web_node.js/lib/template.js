module.exports = {
    HTML:function(title, list, body, control){
        return `
        <head>
        <title>생활 코딩 웹2 공부 ${title}</title>
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



