var p = {
    v1:'v1',
    v2:'v2',
    f1:function (){
        console.log(this.v1);
    },
    f2:function (){
        console.log(this.v2);
    }
}



//객체로 정리정돈, 중복 방지
p.f1();
p.f2();

