

var Body = {
    setColor:function(color){
        document.querySelector('body').style.color=color;
    },
    setBackgroundColor(color){
        document.querySelector('body').style.backgroundColor = color;
    }
}

var Links = {
    setColor : function(color){
        // var a_list = document.querySelectorAll('a');
        // i = 0;
        // while(i < a_list.length){
        //     console.log(a_list[i]);
        //     a_list[i].style.color = color;
        //     i = i + 1;
        // }
        $('a').css('color', color);
    }
}




function nightDayHandler(self){
var target = document.querySelector('body');
if(self.value == 'night'){
Body.setBackgroundColor('black');
Body.setColor('white');
self.value = 'day';


Links.setColor('powderblue');
}else{
Body.setBackgroundColor('white');
Body.setColor('black');
self.value = 'night';

Links.setColor('blue');
}

}