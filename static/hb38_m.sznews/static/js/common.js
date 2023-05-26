jQuery(document).ready(function($) {
	var _globalKey = "CATEGORY:LIST:NEW";
	function setCookie(name,value) {
		var Days = 30*24;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	}

	function getCookie(name) {
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		if(arr != null)
			return unescape(arr[2]);
		return null;
	}
	jQuery.extend({
        getURLParam: function(href,strParamName) {
             var strReturn = "";
             var strHref = href?href:document.location.href;
             var bFound = false;
             var cmpstring = strParamName + "=";
             var cmplen = cmpstring.length;

             if (strHref.indexOf("?") > -1){
                 var strQueryString = strHref.substr(strHref.indexOf("?") + 1);
                 var aQueryString = strQueryString.split("&");
                 for (var iParam = 0; iParam < aQueryString.length; iParam++){
                     if (aQueryString[iParam].substr(0, cmplen) == cmpstring){
                         var aParam = aQueryString[iParam].split("=");
                         strReturn = aParam[1];
                         bFound = true;
                         break;
                     }
                 }
             }
             if (bFound == false) return null;
             return strReturn;
         }
     });
	//从cookie读取分类
	(function _initCategroies(){
		var __currentId = jQuery.getURLParam(null,"chanid");
		var __token = jQuery.getURLParam(null,"token");
		var __tid = jQuery.getURLParam(null, "tid");
		// console.log(__currentId);
		var _savedCates = decodeURIComponent(getCookie(_globalKey));
		var _rawArray = _savedCates.split("|");
		var __categories = [];
		var _newURL = window.location.protocol + "//" + window.location.host;
		// var _newURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
		for (var i = _rawArray.length - 1; i >= 0; i--) {
			var _data = _rawArray[i].split(":");
			if (_data.length != 3) continue;
			if (i == _rawArray.length - 1) {
				var _url = '<li data-type="'+_data[0]+'"><a href="'+_newURL+'/index.htm?chanid='+_data[1]+'&tid='+__tid+'&token='+__token+'">'+_data[2]+'</a></li>';
				__categories.push(_url);
			}else{
				var _url = '<li data-type="'+_data[0]+'"><a href="'+_newURL+'/node_'+_data[1]+'.htm?chanid='+_data[1]+'&tid='+__tid+'&token='+__token+'">'+_data[2]+'</a></li>';
				__categories.push(_url);
			}
		}
		// console.log(__categories);
		if (__categories.length!=0 && __categories != 'null') {
			$(".navHeader .nav").html(__categories);
		}else{
			$(".navHeader .nav").html($(".menu-green").html());
		}
		//init navi
		$(".navHeader .nav li").removeClass('on');
		var saved = $(".navHeader .nav").find('a');
		var cates = [];
		for (var i = saved.length - 1; i >= 0; i--) {
			cates.push(saved[i].innerText);
			var _id = jQuery.getURLParam(saved[i].href,"chanid");
			// console.log(_id+"|"+__currentId);
			if (_id == __currentId) {
				console.log(_id+"|"+saved[i]);
				$(saved[i]).parent().addClass('on');
				var _left = $(saved[i]).position().left;
				var _cW = $(".navHeader .nav").width();
				if (_left > _cW*.8) {
					$('.navHeader .nav').animate({scrollLeft: $(saved[i]).position().left}, 100);
				}else{
					$('.navHeader .nav').animate({scrollLeft: 0}, 100);
				}				
			}
		}
		//过滤掉已经选中过的栏目
		$("#catList,#recList,#zmtList").find('a').each(function(index, el) {
			if ($.inArray(el.innerText, cates) != -1) {
				$(el).parent().detach();
			}
		});
	})();

	//显示分享菜单
	$(".sico-share,.menu-icon").click(function(event) {
		$(".side-menu").fadeToggle('fast');
	});

	//显示栏目菜单
	$(".add").click(function(event) {
		resetCategories(true);
		$(".logo").css({
			position: 'fixed',
			top: '0',
			'z-index': 9999
		});
		$(".menu").css({
			height: $(window).height() - $(".logo").height()
		}).fadeIn('fast',function(){
			$(".navHeader nav").hide();
		});
	});

	$(".ico-close").click(function(event) {
		$(".logo").removeAttr('style');
		$(".menu").slideUp('fast');
		$(".navHeader nav").show();
	});

/*	$(window).scroll(function() {
		if($(window).scrollTop()>=38){
			$(".navHeader").addClass("fixedNav");
		}else{
			$(".navHeader").removeClass("fixedNav");
		} 
  	});*/

	  	(function($) {
		    var uniqueCntr = 0;
		    $.fn.scrolled = function (waitTime, fn) {
		        if (typeof waitTime === "function") {
		            fn = waitTime;
		            waitTime = 500;
		        }
		        var tag = "scrollTimer" + uniqueCntr++;
		        this.scroll(function () {
		            var self = $(this);
		            var timer = self.data(tag);
		            if (timer) {
		                clearTimeout(timer);
		            }
		            timer = setTimeout(function () {
		                self.removeData(tag);
		                fn.call(self[0]);
		            }, waitTime);
		            self.data(tag, timer);
		        });
		    }
		})(jQuery);

	 	/*$(window).scrolled(100,function(){
			if($(window).scrollTop()>=35){
				$(".navHeader").addClass("fixedNav");
			}else{
				$(".navHeader").removeClass("fixedNav");
			} 
	  	});*/

	 // 默认头条
	var chanidx = jQuery.getURLParam(null,"chanid");
	if (chanidx==null||chanidx=='') {
		$(".nav-header .nav li:first").addClass("on");
	}

  	//刷新栏目
  	function resetCategories(reverse){
  		if (reverse) {
  			$(".menu-green").html($(".navHeader .nav").html());	
  			return;
  		}
  		var _catList = $(".menu-green").html();
  		$(".navHeader .nav").html(_catList);

  		var _toSaveStr ="";
  		var _lis = $(".menu-green").find('li');
  		for (var i = _lis.length - 1; i >= 0; i--) {
  			console.log(_lis[i]);
  			var dataType = $(_lis[i]).attr("data-type") || 0;
  			var id = jQuery.getURLParam($(_lis[i]).find("a")[0].href,"chanid");
  			var name = $(_lis[i]).children('a').html();
  			_toSaveStr += dataType + ":" + id + ":" + name + ((i!=0)?"|":"");
  		}
  		console.log("存储分类："+_toSaveStr);
  		setCookie(_globalKey,encodeURIComponent(_toSaveStr));
   	}
	//分组导航
	$(".unchecked").on('click', 'li', function(event) {
		event.preventDefault();
		var dataType = $(this).attr("data-type");
		if (dataType == 1) {//推荐主题
			$(".menu-green").append($(this).detach());
		}else if(dataType == 2){//各区
			$(".menu-green").append($(this).detach());
		}else if(dataType == 3){//自媒体
			$(".menu-green").append($(this).detach());
		}
		resetCategories(false);
	});
	//移除我的主题
	$(".menu-green").on('click','li', function(event) {
		if (!$(this).parent().attr("data-enable")) {
			event.preventDefault();
			var dataType = $(this).attr("data-type");
			if (!dataType) return;
			if (dataType == 1) {//推荐主题
				$("#recList").append($(this));
			}else if(dataType == 2){//各区
				$("#catList").append($(this));
			}else if(dataType == 3){//自媒体
			$("#zmtList").append($(this));
		}
			resetCategories(false);
		}
	});

	$(".close-icon").click(function(event) {
		history.go(-1);
	});

	var browser = {
	    versions: function () {
	        var u = navigator.userAgent, app = navigator.appVersion;
	        return {         //移动终端浏览器版本信息
	            trident: u.indexOf('Trident') > -1, //IE内核
	            presto: u.indexOf('Presto') > -1, //opera内核
	            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
	            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
	            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
	            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
	            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
	            iPad: u.indexOf('iPad') > -1, //是否iPad
	            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
	        };
	    }(),
	    language: (navigator.browserLanguage || navigator.language).toLowerCase()
	}

	var ua = navigator.userAgent.toLowerCase();
    //微信&QQ分享
    if (ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/QQ/i) == "qq") {
        $(".sico-weixin").on('click', function(event) {
        	var hasObj = document.getElementById("shareBg");
        	if (!hasObj) {
            	$("body").append('<div id="shareBg"></div>');
	            $("#shareBg").on('click', function(event) {
	            	$(this).fadeOut('fast');
				});
	            $(".side-menu").fadeOut('fast');
        	}else{
        		$("#shareBg").fadeIn('fast');
        	}
		});
    }else{
    	$(".side-menu").find('li').first().hide();
    }



});