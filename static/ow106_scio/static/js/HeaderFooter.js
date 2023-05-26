$(function() {

    //输出网页日期
    WriteDateDelay("spanDate");
    
    //搜索功能
    $("#Search1_Keyword").one("click", function() {
        $(this).val("");
    });
    //导航条固定功能。
    $(window).scroll(function() {
        if ($(document).scrollTop() > 204) {
            $("div.HeaderNav").addClass('HeaderNaviFloat');
        } else {
            $("div.HeaderNav").removeClass('HeaderNaviFloat');
        }
    });
    //body附加大背景
    //$("body").addClass('bigbg');

   //修改英文版链接
    $("div.HeaderWrap>div.HeaderTop>p.time>a:nth-child(1)").attr("href","http://english.scio.gov.cn/");
   
    //苹果手机字间距校正
     var regiphone = new RegExp("iphone", "gim");
    var agent = navigator.userAgent;
    if (regiphone.test(agent)) {
        //if(screen.width<400)
        {
        	  $("#content p  span").css("letter-spacing","0mm");
        	//alert("iphone");
        }
    }
       /*添加回到首页、顶部的滚动条*/
    WriteReturnTop();
    /*修改二维码链接*/
    $("div.ma > p >a").attr("href","http://www.scio.gov.cn/qt/Document/1630850/1630850.htm");
   //隐藏国新图闻导航
   $("div.HeaderNav >p >a:contains('国新图闻')").hide();
});

function WriteReturnTop() {
    var html = '<div class="go_bank fixed ie6"><a href="http://www.scio.gov.cn/index.htm" class="a01" target="_blank"></a><a href="javascript:void(0);" class="a02" id="js_return_top" ></a></div>';
    $(html).appendTo('body');
    $("#js_return_top").click(function() {
        $('body,html').animate({ scrollTop: 0 }, 500);
    })
    $(window).scroll(function() {

        if ($(document).scrollTop() > 204) {
            $("div.go_bank").fadeIn(500);
        } else {
            $("div.go_bank").fadeOut(500);
        }
    });
}

/*为网页输出当前日期
 *elementId:日期包裹元素的Id
*/
function WriteDateDelay(elementId) {
    var todayDate = new Date();
    var date = todayDate.getDate();
    var month = todayDate.getMonth() + 1;
    var year = todayDate.getFullYear();
    var result = year + "年" + month + "月" + date + "日";
    switch (todayDate.getDay()) {
        case 0: result += (" 星期日"); break;
        case 1: result += (" 星期一"); break;
        case 2: result += (" 星期二"); break;
        case 3: result += (" 星期三"); break;
        case 4: result += (" 星期四"); break;
        case 5: result += (" 星期五"); break;
        case 6: result += (" 星期六"); break;
    }
    $("#" + elementId).html(result);
}
/*
输出党政机关图标
*/
function OutputSCIODZJGIcon() {
    //document.write(unescape("%3Cspan id='_ideConac' %3E%3C/span%3E%3Cscript src='http://dcs.conac.cn/js/33/000/0000/60406415/CA330000000604064150003.js' type='text/javascript'%3E%3C/script%3E"));
    document.write('<span id="_ideConac"><a href="http://bszs.conac.cn/sitename?method=show&id=09C07EFD99FE2FEFE053012819ACB4AC" target="_blank"><img id="imgConac" vspace="0" hspace="0" border="0" src="http://www.scio.gov.cn/Template/6303/Image/dzjglogo.png" data-bd-imgshare-binded="1"></a></span>');
}
/*输出可信站点图标*/
function OutputSCIOKXWZIcon() {
    document.write('<script');
    document.write(' src="'+window.location.protocol+'//kxlogo.knet.cn/seallogo.dll?sn=a14062711010650606ss9p000000&size=0">');
    document.write('</scri');
    document.write('pt>');
}
/**/
$(function(){$("#Relative1 li.list a").text(function(index, text){return text.replace("<br>", "");});})
