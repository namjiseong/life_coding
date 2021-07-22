function a(){
    console.log('A');
}
//js에서는 함수가 값이다. 변수다
var a = function(){
    console.log('A');
}

//a();

function slowfunc(callback){
    console.log('aa');
    callback();
    console.log('aa');
}

slowfunc(a);