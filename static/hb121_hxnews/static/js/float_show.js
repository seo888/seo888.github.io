var ctrlHeight = '';
var float_lock = false;
var set_int_val = 0;
var article_content_height = $('.article-content').height();
var post_recommend_adding = true;
$(".slideTxtBox").slide({trigger:"click"});
$(".hxw-nav-list-last").hover(function(){
    $('.hxw-more').addClass("cur");
    $('.hxw-nav-others').css("display","block");
        },function(){
        $('.hxw-nav-others').css("display","none");
        $('.hxw-more').removeClass("cur");
 });
$(".hxw-client-tl").hover(function(){
    $(".hxw-yd").addClass("cur");
    $('.hxw-dropdown').css("display","block");
},function(){
        $('.hxw-dropdown').css("display","none");
        $(".hxw-yd").removeClass("cur");
 });
$(".hbody").slide({ titCell:".hd li", mainCell:".bd",delayTime:0 });
$(".post_recommend_title").click(function(){
    $(".post_recommend_titles .post_recommend_title").removeClass("hxw-active");
    $(this).addClass("hxw-active");
});
//查看全文进行处理。
function fullend() {
    //先将其复位再重新计算其位置,必须确保中间的部分已经加载完成。
    $(".post_recommend_ctrl").removeClass('showed');
    //先锁定不让其变化。
    float_lock = true;
    set_int_val = setInterval('unlock_float()', 3000);
}
function unlock_float(){
    if (article_content_height != $('.article-content').height()) {
        ctrlHeight = $('.post_recommend_ctrl').offset().top;
        article_content_height = $('.article-content').height();
        clearInterval(set_int_val);
        float_lock = false;
    }
}
//滚动时左边菜单
$(function(){
    ctrlHeight = $('.post_recommend_ctrl').offset().top;

    //计算距离
    function distance(el) {
        var left_ctrl = $("."+el).offset().top,
            left_ctrl_height =  $("."+el).height(),
            left_topbox = left_ctrl_height + left_ctrl;
        return left_topbox;
    }

    $(window).scroll(function() {

        var scrollHeight = $(document).scrollTop();
        if (!float_lock) {
            if ((scrollHeight >= (ctrlHeight + 50)) && ctrlHeight > 500) {


                var left_topbox = distance('post_recommend_ctrl'),
                    slideBox = distance('slideTxtBox');

                if(left_topbox > slideBox){

                    $(".post_recommend_ctrl").removeClass('showed');
                    $(".post_recommend_ctrl").css({"display":"none"});

                }else if(($(document).scrollTop()-left_topbox) < 100){

                    $(".post_recommend_ctrl").removeAttr("style");
                $(".post_recommend_ctrl").addClass('showed');
                }
            } else if (scrollHeight < (ctrlHeight + 500)) {
                $(".post_recommend_ctrl").removeClass('showed');
            }
        }
     });
});
$('.post_recommend_add').click(function(){
    if(post_recommend_adding){
        post_recommend_adding = false;
        var obj,cat_id,last_id,page;
        $("ul.post_recommend_news").each(function(){
                if($(this).css("display") == 'block'){
                    obj = $(this);
                    cat_id = $(this).attr('data_value');
                    last_id = $(this).find('li:last-child').attr('data_id');
                    page = $(this).attr('page');
                    $.get("{APP_URL}{url('wap/index/contents')}", {
                        page: page,
                        catid: cat_id,
                        size: 10,
                        last_id: last_id,
                        type:2
                    }, function (data) {
                        if (data.state > 0) {
                            if (data.data == null){
                                obj.html(obj.html() + "没有更多了");
                            } else {
                                obj.html(obj.html() + data.data);
                                page++;
                                obj.attr('page',page);
                            }
                        } else {
                            alert("加载失败");
                        }
                    }, 'jsonp');
                }
        });
        post_recommend_adding = true;
    }
});