function pcnav() {
    $(".nav>ul>li").hover(function() {
        if($(this).find("li").length > 0){
            $(this).children("ul").stop(true, true).slideDown();
            $(this).addClass("hover");
        }
    },function() {
        $(this).children("ul").stop(true, true).slideUp();
        $(this).removeClass("hover");
    });
}

function onoff(onbtn,oncon,oni,onii) {
    $(onbtn).on("click", function(e){
        $(oni).toggleClass(onii);
        $(oncon).slideToggle();
        $(document).one("click", function(){
            $(oncon).slideUp();
            $(oni).toggleClass(onii);
        });
        e.stopPropagation();
    });
    $(oncon).on("click", function(e){
        e.stopPropagation();
    });
}

function sidefixed(){
    var fixedbox = $(".fixed-con"),st;
    var fixedh = $(window).height();
    if($('dl').hasClass('footer-dw')){
        var fixedlocation = $(".footer-dw").offset().top;
    }
    $(window).scroll(function () {
        st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
        if($(".box-middle").height() > $(".side-right").height()){
            if(st > ($(".side-right").height() + 40)){
                fixedbox.addClass("fixedbox-on");
                fixedbox.css({"width":$(".side-right").width()});
            }else{
                fixedbox.removeClass("fixedbox-on");
            } 
        }
    });
}

$(function(){
    var winr=$(window); 
    var surl = location.href;
    var surl2 = $(".place a:eq(1)").attr("href");
    var boxk = $(".wide").width(); 
    
    $(".nav li a").each(function() {
        if ($(this).attr("href")==surl || $(this).attr("href")==surl2){
            $(this).parent().addClass("on").siblings().removeClass("on");
        }
    });
    $(".list-nav a").each(function() {
        if ($(this).attr("href")==surl || $(this).attr("href")==surl2){
            $(this).addClass("on").siblings().removeClass("on");
        }
    });
    
        
    if(winr.width()>=1080){
        pcnav(); sidefixed();
        onoff(".side-search input",".side-search ul",".nav-on1 i","fa-bars1");
        $(".fixed-top").css({"margin-left": (boxk/2 + 5)});
    }else{
        onoff(".search-on",".side-search",".search-on i","icon-sousuo");
    }
    
    winr.scroll(function(){
        if($(this).scrollTop()>=50){
            $(".box-left-box").addClass("fixed-1"); 
        }else{
            $(".box-left-box").removeClass("fixed-1"); 
        }
    });
    
    $(".gotop").click(function(){
        $('body,html').animate({scrollTop:0},1000);
    });
});

zbp.plugin.unbind("comment.reply.start", "system-default");
zbp.plugin.on("comment.reply.start", "tx_news", function(id) {
    var i = id;
    $("#inpRevID").val(i);
    var frm = $('#divCommentPost'),
        cancel = $("#cancel-reply");

    frm.before($("<div id='temp-frm' style='display:none'>")).addClass("reply-frm");
    $('#AjaxComment' + i).before(frm);

    cancel.show().click(function() {
        var temp = $('#temp-frm');
        $("#inpRevID").val(0);
        if (!temp.length || !frm.length) return;
        temp.before(frm);
        temp.remove();
        $(this).hide();
        frm.removeClass("reply-frm");
        return false;
    });
    try {
        $('#txaArticle').focus();
    } catch (e) {}
    return false;
});

zbp.plugin.on("comment.get", "tx_news", function (logid, page) {
    $('span.commentspage').html("提交中...");
});
zbp.plugin.on("comment.got", "tx_news", function (logid, page) {
    $("#cancel-reply").click();
});
zbp.plugin.on("comment.post.success", "tx_news", function () {
    $("#cancel-reply").click();
});
if(window.console && window.console.log){
    console.log('\n %c \u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u0077\u0077\u0077\u002e\u0074\u0078\u0063\u0073\u0074\u0078\u002e\u0063\u006e\u002f  %c \u5929\u5174\u5de5\u4f5c\u5ba4\u4f5c\u54c1 \n', 'color: #fadfa3; background: #030307; padding:3px 0;', 'background: #fadfa3; padding:3px 0;');
}