var flLenght = $(".g-type ul li").length;
var click = 0;
$(".nav-open").on('click',function(){
    if(click == 0){
        click = 1;
        for(var i=5;i<flLenght-1;i++){
            $(".g-type ul li").eq(i).show();
        };
        $(this).find('a').html("<em>-</em>点击收起</a>");
    }else{
        click = 0;
        for(var i=5;i<flLenght-1;i++){
            $(".g-type ul li").eq(i).hide();
        };
        $(this).find('a').html("<em>+</em>展开更多</a>");
    }
})