var mysql = require('mysql');
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'qsdrwe159',
    database:'open'
  });
  db.connect();
module.exports = db;
