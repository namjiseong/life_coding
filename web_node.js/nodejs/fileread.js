 var fs = require('fs');
// fs.readFile('sample.txt', 'utf-8', function(err, data){
//     console.log(data);
// });

fs.open('sample.txt', 'r', (err, fd) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error('myfile does not exist');
        return;
      }
  
      throw err;
    }
  
    console.log(fd);
  });