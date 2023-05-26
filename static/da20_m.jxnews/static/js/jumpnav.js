$(".gochannels").click(function(){
    var t = $(".channels");
    t.toggleClass("channelstoggle");
});
$(".channels li").click(function(){
    $(this).siblings().removeClass("current");
    $(this).addClass("current");
});
$(".gotop").click(function(){
   window.scroll(0, 0);
});