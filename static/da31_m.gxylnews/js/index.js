//百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?68b12766bb8f990de655014881713518";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

$(function(){      //数字报 县市区 全媒体
	$(".comSelect").mouseover(function(){
		$(this).addClass("red1");
		$(this).children(".selectshow").removeClass("dn");
		$(this).children(".selectshow").addClass("db")
	});
	$(".comSelect").mouseout(function(){
		$(this).removeClass("red1");
		$(".selectshow").removeClass("db");
		$(".selectshow").addClass("dn")
	});
});

$(function(){     //推荐专题 首页
	var timer1 = setTimeout("toggleFun()", 10000);
	$(".float-special .hd").click(function(){
		clearTimeout(timer1);
		toggleFun();	
	});
});
function toggleFun(){    //切出、切入函数
	$(".float-special ul").animate({width: 'toggle'}, 500, function(){
		var isOpen = $(".float-special .hd").html()=='推荐专题' ? 1 : 0;
		$(".float-special .hd").html(isOpen ? '收起' : '推荐专题');
	});
}

//***内页***
$(function(){     //推荐专题 内页
    $(".special li").mousemove(function(){
		$(this).children("div").addClass("db");
		$(this).siblings().children("div").removeClass("db");
		
	});
});

function isMobile() {  //判断终端类型
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        return true;
    } else {
        return false;
    }
}
/*获取url传递的参数**/
function getUrlStr(){
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

//给表单添加 <input name=auth>，AUTH有效期是1小时，得不停刷新
// setInterval(function () {
//     getAUTH(".search-form", "/api.php?op=get_user&act=getFormAuth");
// }, 30000);
function getAUTH(form, apiurl) {
    $.ajaxSettings.async = false;
    $.getJSON(apiurl + '&'+new Date().getTime(), function(data) {
        if (data.auth) {
            if ($(form).find("[name='auth']")[0]) {
                $(form).find("[name='auth']").val(data.auth);
            } else {
                $(form).append('<in'+'put type="hidden" name="auth" value="'+data.auth+'">');
            }

        }
    });

}