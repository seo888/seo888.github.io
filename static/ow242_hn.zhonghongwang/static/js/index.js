   
// 全球直播鼠标移入状态
$('.rightSidebar .box .item').mouseover(function(){
    $('.rightSidebar .box .item').eq($(this).index()).find('p').removeClass('line_clamp')}).mouseout(function (){  
        $('.rightSidebar .box .item p').addClass('line_clamp');
    });  

    $("#sucai").niceScroll({  
    cursorcolor:"#999",  
    cursoropacitymax:1,  
    touchbehavior:false,  
    cursorwidth:"3px",  
    cursorborder:"0",  
    cursorborderradius:"3px"  
}); 




// 信用中国搜索
function search(){
    var inp = $(".right-inputText");
    var list = $(".right-search-list").find("li");


for(var i= 0,j=list.length;i<j;i++){
    list.eq(i).click(function(){
        $(this).addClass("search_btn_active").siblings().removeClass("search_btn_active");
        inp.eq(0).attr({placeholder:$(this).attr("title")});
    });
}
$(".right-inputBtn").click(function(){
    var setype = $(".search_btn_active").eq(0).attr("searchtype");
    var keyword = inp.eq(0).val();

    if(setype == 0){
        window.open("https://www.creditchina.gov.cn/xinyongxinxi/index.html?index=0&keyword=" + keyword);
    }else if(setype == 1){
        window.open("https://www.creditchina.gov.cn/xinyongfuwu/tongyishehuixinyongdaimachaxunzhuanlan/shehuixinyongdaimachaxun/index.html?index=1&keyword=" + keyword + "&filterManageDept=0&filterOrgan=0&filterDivisionCode=0&deptName=&orgName=&location=");
    }else{
        window.open("https://www.creditchina.gov.cn/articesearch/index.html?index=2&keyword=" + keyword);
    }
});
}
search()

