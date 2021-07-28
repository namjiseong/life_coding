var db = require('./db.js');
var template = require('./template.js');
var qs = require('querystring');
var url = require('url');
var sanitizeHtml = require('sanitize-html');
exports.home = function(request, response){
    db.query(`SELECT * FROM topic`, function(error,topics){
        db.query(`SELECT * FROM author`, function(error,authors){
            
            var title = 'author';
            var list = template.list(topics);
            var html = template.HTML(title, list,
            `<h2>${title}</h2>
            <table>
                    ${template.authorTable(authors)}
            </table>
            <style>
               table{
                   width: 33%;
                   border-collapse:collapse;
               }
                td{
                    border:1px solid black;
                }
                
            </style>

            <form action= "author/create_process" method="post">
            <p>
                <input type="text" name="name" placeholder="name">
            </p>
            <p>
                <textarea name="profile" placeholder="description"></textarea>
            </p>
            <p>
                <input type="submit" value="create">
            </p>
            </form>
            `,
            ``);
            
            response.writeHead(200);
            response.end(html);
        });
    });
}

exports.create_pocess = function(request, response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
         var post = qs.parse(body);
         db.query(`
          INSERT INTO author (name,profile) VALUES(?,?)
          `,[post.name, post.profile], 
          function(error, result){
            if(error){
              throw error;
            }
            response.writeHead(302, {Location: `/author`});
            response.end();
          }
         )

      });
}

exports.update = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM topic`, function(error,topics){
        db.query(`SELECT * FROM author`, function(error,authors){
            db.query(`SELECT * FROM author WHERE id=?`, [queryData.id],function(err3, author){
                var title = 'author';
                
                var name = author[0].name;
                var profile = author[0].profile;
                
                var list = template.list(topics);
                var html = template.HTML(title, list,
                `<h2>${title}</h2>
                <table>
                        ${template.authorTable(authors)}
                </table>
                <style>
                table{
                    width: 33%;
                    border-collapse:collapse;
                }
                    td{
                        border:1px solid black;
                    }
                    
                </style>

                <form action= "/author/update_process" method="post">
                    <input type="hidden" name="id" value="${queryData.id}">
                <p>
                    <input type="text" name="name" placeholder="name" value="${sanitizeHtml(name)}">
                </p>
                <p>
                    <textarea name="profile" placeholder="description">${sanitizeHtml(profile)}</textarea>
                </p>
                <p>
                    <input type="submit" value="update">
                </p>
                </form>
                `,
                ``);
                
                response.writeHead(200);
                response.end(html);
            });
            
        });
    });
}

exports.update_process = function(request, response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
         var post = qs.parse(body);
         db.query(`
          UPDATE author SET name=?, profile=? WHERE id=?;
          `,[post.name, post.profile, post.id], 
          function(error, result){
            if(error){
              throw error;
            }
            response.writeHead(302, {Location: `/author`});
            response.end();
          }
         )

      });
}

exports.delete_process = function(request, response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        db.query(`DELETE FROM topic WHERE author_id =?`, [post.id], function(err2, topic){
            if(err2){
                throw err2;
            }
            db.query(`DELETE FROM author WHERE id=?;`,[post.id], function(error, result){
                if(error){
                throw error;
                }
            
                response.writeHead(302, {Location: `/author`});
                response.end();
            });
        });

    });
}