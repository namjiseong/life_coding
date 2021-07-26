// array, object

var f = function (){
    console.log(1+1);
    console.log(1+2);
}
//배열의 원소로서 함수
var a = [f];
a[0]();
//객체
var o = {
    func:f
}
o.func();



//조건문은 값이 아니므로 오류
//var i = if(ture){console.log(1);}

//var w = while(true){console.log(1)};

