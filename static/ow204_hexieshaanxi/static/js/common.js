  function SetHome(obj,url){
    try{
        obj.style.behavior='url(#default#homepage)';
       obj.setHomePage(url);
   }catch(e){
       if(window.netscape){
          try{
              netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
         }catch(e){
              alert("抱歉，此操作被浏览器拒绝！请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
          }
       }else{
        alert("抱歉，您所使用的浏览器无法完成此操作。您需要手动将【"+url+"】设置为首页。");
       }
  }
}
 
//收藏本站
function AddFavorite(title, url) {
  try {
      window.external.addFavorite(url, title);
  }
catch (e) {
     try {
       window.sidebar.addPanel(title, url, "");
    }
     catch (e) {
         alert("抱歉，您所使用的浏览器无法完成此操作。加入收藏失败，请使用Ctrl+D进行添加");
     }
  }
}


function scrollTop() {
	var $backToHomeTxt = "\u8fd4\u56de\n\u9996\u9875";
	var $backToTopTxt = "\u8fd4\u56de\n\u9876\u90e8";
	$backToHomeEle = $('<div class="backToHome"></div>').appendTo($("body")).text($backToHomeTxt).attr("title", $backToHomeTxt).click(function () {
			window.location.href = "/";
	}),
	$backToTopEle = $('<div class="backToTop"></div>').appendTo($("body")).text($backToTopTxt).attr("title", $backToTopTxt).click(function () {
			$("html, body").animate({
				scrollTop : 0
			}, 120)
	}),
	$backToTopFun = function () {
		var st = $(document).scrollTop(),
		winh = $(window).height();
		$backToHomeEle.show()
		st > 0 ? $backToTopEle.show() : $backToTopEle.hide();
		if (!window.XMLHttpRequest)
			$backToTopEle.css("top", st + winh - 166)
	};
	$(window).bind("scroll", $backToTopFun);
	$(function () {
		$backToTopFun()
	})
}

$(function(){
    //向上滚动
	scrollTop();
});

var browser = {
	/*
	 * 获得当前浏览器的版本信息
	 */
	versions: function () {
		var u = window.navigator.userAgent, app = window.navigator.appVersion;
		return {
			//IE内核
			trident: u.indexOf('Trident') > -1,
			//opera内核
			presto: u.indexOf('Presto') > -1,
			//苹果、谷歌WebKits内核
			webKit: u.indexOf('AppleWebKit') > -1,
			//火狐内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
			//是否为移动终端
			mobile: !!u.match(/AppleWebKit.*Mobile.*/),
			//ios终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			//android终端
			android: u.indexOf('Android') > -1,
			//iPhone
			iPhone: u.indexOf('iPhone') > -1,
			//iPod
			iPod: u.indexOf('iPod') > -1,
			//iPad
			iPad: u.indexOf('iPad') > -1,
			//是否web应该程序，没有头部与底部
			webApp: u.indexOf('Safari') == -1
		};
	}()
}

function isMobile() {
	var u = window.navigator.userAgent, mbc = 0, us4, map;
	u = u.toLowerCase();
	if (/(up.browser|up.link|mmp|symbian|smartphone|midp|wap|phone|iphone|ipad|ipod|android|xoom)/i.test(u)) {
		mbc++;
	}
	us4 = u.substr(0, 4);
	map = ['w3c ','acs-','alav','alca','amoi','audi','avan','benq','bird','blac',  
		   'blaz','brew','cell','cldc','cmd-','dang','doco','eric','hipt','inno',  
		   'ipaq','java','jigs','kddi','keji','leno','lg-c','lg-d','lg-g','lge-',  
		   'maui','maxo','midp','mits','mmef','mobi','mot-','moto','mwbp','nec-',  
		   'newt','noki','oper','palm','pana','pant','phil','play','port','prox',  
		   'qwap','sage','sams','sany','sch-','sec-','send','seri','sgh-','shar',  
		   'sie-','siem','smal','smar','sony','sph-','symb','t-mo','teli','tim-',  
		   'tosh','tsm-','upg1','upsi','vk-v','voda','wap-','wapa','wapi','wapp',  
		   'wapr','webc','winw','winw','xda','xda-'];

	for (var i = 0; i < map.length; i++) {
		if (map[i] == us4) {
			mbc++;
			break;
		}
	}
	if (u.indexOf('windows') != -1) {
		mbc = 0;
	}
	if (u.indexOf('windows phone') != -1) {
		mbc = 0;
	}
	return mbc > 0; 
}