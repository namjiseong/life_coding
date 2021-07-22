var fs = require('fs');

// //read File Sync 동기적 - 직렬
// console.log('A');
// var result = fs.readFileSync('syntax/sample.txt', 'utf8');
// console.log(result);
// console.log('C');
// console.log('D');


//비동기적 - 병렬
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
    console.log(result);
});
console.log('C');
console.log('D');