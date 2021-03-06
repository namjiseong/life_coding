var url = require('url');
var qs = require('querystring');
var db = require('./db.js');
var template = require('./template.js');
var sanitizeHtml = require('sanitize-html');
exports.home = function(request, response){
    db.query(`SELECT * FROM topic`, function(error,topics){
        var title = 'Welcome';
        var description = 'Hello, express';
        var list = template.list(topics);
        var html = template.HTML(title, list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`
        );
        response.writeHead(200);
        response.end(html);
    });

}

exports.page = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM topic`, function(error,topics){
        if(error){
          throw error;
        }
        db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`,[queryData.id], function(error2,topic){
          if(error2){
            throw error2;
          }
          
          var title = topic[0].title;
          var description = topic[0].description;
          var list = template.list(topics);
          var html = template.HTML(title, list,
          `<h2>${sanitizeHtml(title)}</h2>${sanitizeHtml(description)} 
           <p> by ${sanitizeHtml(topic[0].name)}</p>`,
          ` <a href="/create">create</a>
              <a href="/update?id=${queryData.id}">update</a>
              <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${queryData.id}">
                <input type="submit" value="delete">
              </form>`
          );
          response.writeHead(200);
          response.end(html);
        });
    
      });
    
}

exports.create = function(request, response){
    db.query(`SELECT * FROM topic`, function(error,topics){
        if(error){
          throw error;
        }
        db.query(`SELECT * FROM author`, function(error2, authors){
          if(error2){
            throw error2;
          }
          
        var title = 'Create';
        var list = template.list(topics);
        var html = template.HTML(sanitizeHtml(title), list,
          `<form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            ${template.authorSelect(authors, topics[0].author_id)}
          </p>
          <p>
            <input type="submit">
          </p>
        </form>`,
          `<a href="/create">create</a>`
        );
        response.writeHead(200);
        response.end(html);
        });
      });
}

exports.create_process = function(request, response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
         var post = qs.parse(body);
         db.query(`
          INSERT INTO topic (title, description, created, author_id) VALUES(?,?,NOW(),?)
          `,[post.title, post.description, post.author], 
          function(error, result){
            if(error){
              throw error;
            }
            response.writeHead(302, {Location: `/?id=${result.insertId}`});
            response.end();
          }
         )

      });
}

exports.update = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM topic`, function(error,topics){
        db.query(`SELECT * fROM topic WHERE id=?`,[queryData.id], function(error2, cur){
          if(error2){
            throw error2;
          }
          db.query(`SELECT * FROM author`, function(error2, authors){
            if(error2){
              throw error2;
            }

          var title = cur[0].title;
          var description = cur[0].description;
          var id = cur[0].id;
          var list = template.list(topics);
          var html = template.HTML(title, list,
        `
        <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${id}">
          <p><input type="text" name="title" placeholder="title" value="${sanitizeHtml(title)}"></p>
          <p>
            <textarea name="description" placeholder="description">${sanitizeHtml(description)}</textarea>
          </p>
          <p>
            ${template.authorSelect(authors,cur[0].author_id)}
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
        `<a href="/create">create</a> <a href="/update?id=${id}">update</a>`
      );
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
          var id = post.id;
          var title = post.title;
          var description = post.description;
          var author = post.author;
          db.query(`UPDATE topic set title=? ,description =?, author_id=? WHERE id=?`, [sanitizeHtml(title), sanitizeHtml(description), author, id],function(err, result){
            if(err){
              throw err;
            }
            
            response.writeHead(302, {Location: `/?id=${id}`});
            response.end();
          });
        });
}

exports.delete_process = function(request, response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var id = post.id;
          
         db.query(`DELETE FROM topic WHERE id=?`,[id], function(err, result){
           if (err){
             throw err;
           }
           response.writeHead(302, {Location: `/`});
           response.end();
         })
      });
}