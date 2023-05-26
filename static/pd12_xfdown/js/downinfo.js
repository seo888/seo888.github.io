if(typeof(_downInfos) != "undefined" && _downInfos.length>0 && document.getElementById("address")==null && typeof(AddressList) != "undefined"){
	var DownURL=decodeURIComponent(_downInfos[0].Address);
	if(parseInt(_downInfos[0].TypeID)>0){
		var sList=eval("AddressList.siteId_"+_downInfos[0].TypeID);
		var DownLoadURL = sList.split("||")[1];
		DownURL = DownLoadURL.split(",")[0] + DownURL;
	}
	var re = /(com|net|cn)\/\//g;
	DownURL = DownURL.replace(re, "$1/");
	document.getElementById("btns").innerHTML='<a href="'+DownURL+'" class="dbtn" rel="nofollow" id="address" isDown="1">立即下载</a>';
}else if(document.getElementById("address")==null){
	document.getElementById("btns").innerHTML='<a href="javascript:;" class="dbtn noDown" rel="nofollow" id="address">暂无下载</a>';
}
$("#keygame").removeClass("plist");
function RandArr(arr, num){
    var sData = arr.slice(0),i = arr.length,min = i - num, item,index;
    while (i-- > min){
        index = Math.floor((i + 1) * Math.random());
        item = sData[index];
        sData[index] = sData[i];
        sData[i] = item;
    }
    return sData.slice(min);
}
$.getJSON("/inc/TopRecomd.txt",function(json){
		var topRs = "";
		var data=($.inArray(_pageinfo.rootId,['178','198','241','9'])==-1||json.TopRecomd.length==0)&&json.TopAppRecomd.length>0 ? json.TopAppRecomd : json.TopRecomd;
		if(browser.versions.ios&&json.TopIosRecomd.length>0)data=json.TopIosRecomd;
        var bbb=data.length>5?RandArr(data,5):data;
		for(i=0;i<bbb.length;i++){
			topRs += '<li><a href="'+bbb[i][1]+'" class="tg" softid="'+bbb[i][5]+'" onclick="return tgclick(this);"><img src="'+bbb[i][2]+'"><strong>'+bbb[i][0]+'</strong></a></li>'
		}
		$(".keynav").html(topRs);
});
function tgclick(aa){
	var SoftID=$(aa).attr("softid");
	var softurl=$(aa).attr("href");
	var title_=$(aa).find("strong").text();
	var tgCount=sessionStorage["tgCount"+SoftID]?sessionStorage["tgCount"+SoftID]:"";
	if(tgCount==""){
		$.ajax({
			type:"POST",
			url:"http://api.xiazaicc.com/index/api/click_area?t_="+(new Date).getTime(),
			data:"title="+escape(title_)+"&domain="+escape(document.domain)+"&area=20&g_id="+SoftID+"&g_url="+escape(softurl),
			success: function(data, status, xhr){sessionStorage["tgCount"+SoftID]="1";}
		});
	}
	return true;
}

function closePage(hidebox,showbox){
	$(hidebox).nextAll().hide();
	$(hidebox).after('<div style="line-height: 50px;text-align: center;background-color: #fff; font-size: 28px; color: #555; margin:10px auto;padding:180px 30px">\u8be5\u5e94\u7528\u5df1\u4e0b\u67b6</div>');		
	$(showbox).show();
}

var nodownurl=false;
var iosroot=["241", "251"];
var azroot=["176", "178", "198"];
if($("#address").attr("href")=="" || $("#address").attr("href")=="javascript:;" || $("#address").attr("href").indexOf("m.xfdown.com") != -1)nodownurl=true;
function setnodown(){
	$("#address").off().html('暂无下载').css("background","#989898").bind("click",function(){return false;});

	if(!sessionStorage['noaddr'+_pageinfo.id]){
		var username=(typeof _webInfo!="undefined" && typeof _webInfo.Username != "undefined")?_webInfo.Username:"";
		$.post("http://api.xiazaicc.com/no_address","username="+escape(username)+"&id="+_pageinfo.id+"&url="+escape(document.domain)+"&name="+escape(_pageinfo.softname)+"&allurl="+escape(location.href)+"&t_="+(new Date).getTime(),function(data){if(data.code==200)sessionStorage['noaddr'+_pageinfo.id]=1});
	}
}
$(function(){
	if (typeof _platformInfo=="undefined" || typeof _pageinfo=="undefined" || JSON.stringify(_pageinfo)=="{}"){
		if(nodownurl) setnodown();
	}else if(browser.versions.ios && iosroot.indexOf(_pageinfo.rootId) == -1){
		if(typeof _platformInfo.iPhone != "undefined"){
			$("#ResSystem").html("系统：<em>"+_platformInfo.iPhone.ResSystem+"</em>");
			if($("#ResVer").length>0){
				$("#ResVer").html("版本：<em>"+_platformInfo.iPhone.ResVer+"</em>");
				$("#info .name h1").html(_platformInfo.iPhone.ResName);
			}else{
				$("#info .name").html("<h1>"+_platformInfo.iPhone.ResName+"</h1>"+_platformInfo.iPhone.ResVer);
			}

			$("#ResSize").html("大小：<em>"+_platformInfo.iPhone.ResSize+"</em>");
			
			$("#address").attr("href",_platformInfo.iPhone.Address).attr("target","_blank");
			$("#info #btns").after('<p class="jctip"><s></s>检测到您是苹果设备，点击下载的是：<em>' + _platformInfo.iPhone.ResName + _platformInfo.iPhone.ResVer+"</em></p>");
		}else{
			if(nodownurl)
				setnodown();
			else{
			if($("#address").attr("href").indexOf(".apple.com/") == -1 && $("#address").attr("href").indexOf(_downInfo.Address) == -1 && _downInfo.Address.indexOf(".apple.com/")!=-1){
				$("#address").attr("href",_downInfo.Address);
				$("#address").html("App Store下载");
				$("#ResSystem").html("系统：<em>IOS</em>");
				$("#info .name").html("<h1>"+$("#info .name h1").text()+"</h1>苹果版");
				$("#info").append('<p class="jctip"><s></s>检测到您是苹果设备，点击下载的是：<em>' + _downInfo.Name+"</em></p>");
			}else{
				$("#info #btns").after('<p class="jctip"><s></s>没有对应的苹果版，点击下载的是：<em>' + $("#info .name h1").text() + _pageinfo.softver +"</em></p>");
				if(!localStorage['iostj'+_pageinfo.id] && azroot.indexOf(_pageinfo.rootId) != -1){
					var username=(typeof _webInfo!="undefined" && typeof _webInfo.Username != "undefined")?_webInfo.Username:"";
					$.post("http://api.xiazaicc.com/apple_info","username="+escape(username)+"&id="+_pageinfo.id+"&url="+escape(document.domain)+"&allurl="+escape(location.href)+"&name="+escape(_pageinfo.softname),function(data){if(data.code==200)localStorage['iostj'+_pageinfo.id]=1});
				}
			}
			}
		}
	}else if(browser.versions.android && azroot.indexOf(_pageinfo.rootId) == -1){
		if(typeof _platformInfo.Android != "undefined"){
			$("#ResSystem").html("系统：<em>"+_platformInfo.Android.ResSystem+"</em>");
			if($("#ResVer").length>0){
				$("#ResVer").html("版本：<em>"+_platformInfo.Android.ResVer+"</em>");
				$("#info .name h1").html(_platformInfo.Android.ResName);
			}else{
				$("#info .name").html("<h1>"+_platformInfo.Android.ResName+"</h1>"+_platformInfo.Android.ResVer);
			}
			$("#ResSize").html("大小：<em>"+_platformInfo.Android.ResSize+"</em>");
			
			$("#address").attr("href",_platformInfo.Android.Address);
			$("#info #btns").after('<p class="jctip"><s></s>检测到您是安卓设备，点击下载的是：<em>' + _platformInfo.Android.ResName + _platformInfo.Android.ResVer+"</em></p>");
		}else{
			if(nodownurl)
				setnodown();
			else{
				$("#info #btns").after('<p class="jctip"><s></s>没有对应的安卓版，点击下载的是：<em>' + $("#info .name h1").text() + _pageinfo.softver +"</em></p>");
				if(!localStorage['aztj'+_pageinfo.id] && iosroot.indexOf(_pageinfo.rootId) != -1){
					var username=(typeof _webInfo!="undefined" && typeof _webInfo.Username != "undefined")?_webInfo.Username:"";
					$.post("http://api.xiazaicc.com/android_info","username="+escape(username)+"&id="+_pageinfo.id+"&url="+escape(document.domain)+"&allurl="+escape(location.href)+"&name="+escape(_pageinfo.softname)+"&t_="+(new Date).getTime(),function(data){if(data.code==200)localStorage['aztj'+_pageinfo.id]=1});
				}
			}
		}
	}else{
		if(nodownurl) setnodown();
	}
	if($("#address").text().indexOf("（0KB）")>0)$("#address").html($("#address").text().replace("（0KB）",""));
	downlabel();
});

function downlabel(){
	if($("#address").attr("href").indexOf(".apple.com/") != -1)
		$("#address").html("App Store下载");
	else if(iswangpan())
		$("#address").html("网盘下载");
	else if(typeof _downInfo.TypeID != "undefined"&&_downInfo.TypeID=="-2")
		$("#address").html("官网站点下载");
}
function iswangpan(){
	if(typeof _downInfo.TypeID != "undefined"&&_downInfo.TypeID=="-3") return true;
	var downHref = $("#address").attr("href");
	var wpurl =["pan.baidu.com","lanzoux.com","lanzoui.com",".yun.cn","cowtransfer.com","cloud.189.cn","weiyun.com","yun.139.com",".123pan.com"];
	for(i=0;i<wpurl.length;i++){
		if(downHref.indexOf(wpurl[i]) > -1)return true;
	}
	return false;
}
$(".rela_down.pictxt").each(function(){
    if($(this).find("ul li").length==0)$(this).remove();
})
$(function(){
	$(".d_title.qx").click(function () {
		$(".m-premissions-div").show();
		$(".m-permission-bg").show();
	});
	$(".m-close-permis,.m-permission-bg").click(function () {
		$(".m-premissions-div").hide();
		$(".m-permission-bg").hide();
	});
	if($(".m-permission-1")){
		if($(".m-permission-1").html()=="")
			$(".d_title.qx").hide();
		else
			$(".d_title.qx").show();
	}

	if(typeof(_pageinfo) != "undefined"){
		if(typeof(_pageinfo.softlicence) != 'undefined'){
			if(_pageinfo.softlicence == "\u4e0b\u67b6")closePage("#topNav",".bottom");
		}
	}
});
/*通用函数Begin*/
Array.prototype.in_array = function(e) {   for(i=0;i<this.length;i++){   if(this[i] == e)  return true;  }   return false;   }
Array.prototype.in_mid = function(e) { for(i=0;i<this.length;i++)  {  if(e.indexOf(this[i])>-1)  return this[i]; }  return 0; }
var getIosPlist=function(title,pic,iphoneid,padid){ var iosurl; var iosresTitle=title.split(/(\s|\()/)[0];iosresTitle = iosresTitle.substring(0,20);iosresTitle= encodeURIComponent(iosresTitle);var pic =encodeURIComponent(pic);var ss = navigator.userAgent.toLowerCase();	if (ss.indexOf("iphone") != -1){ iosurl ="http://x.289.com/"+iphoneid+"/" + iosresTitle+"/"+pic;}else{iosurl ="http://x.289.com/"+padid+"/" + iosresTitle+"/"+pic;} return iosurl;}
var checkURL=function(URL){var str=URL;var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;var objExp=new RegExp(Expression);if(objExp.test(str)==true){return true;}else{return false;}}
var Cookie={get:function(name){var value='',matchs;if(matchs=document.cookie.match("(?:^| )"+name+"(?:(?:=([^;]*))|;|$)"))value=matchs[1]?unescape(matchs[1]):"";return value},set:function(name,value,expire,domain){expire=expire||30*24*3600*1000;var date=new Date(),cookie="";date.setTime(date.getTime()+expire);cookie=name+"="+escape(value)+";expires="+date.toGMTString()+";path=/;";domain&&(cookie+="domain="+domain+";");document.cookie=cookie},del:function(name,domain){Cookie.set(name,'',-1,domain)}};
function GetRandomNum(Min,Max){ var Range = Max - Min; var Rand = Math.random(); return(Min + Math.round(Rand * Range));  }   //生成随机数
var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
function generateMixed(n) { var res = "";  for(var i = 0; i < n ; i ++) {   var id = Math.ceil(Math.random()*35); res += chars[id];   }return res;}
function checkRate(nubmer){var re = /^[0-9]+.?[0-9]*$/;  if (!re.test(nubmer)) { return false;  }else{ return true;}}   //判断字符串是否为数字     //判断正整数 /^[1-9]+[0-9]*]*$/ 
Array.prototype.in_trim_array=function(e){ if(e==""||e==null){return false};	for(i=0;i<this.length;i++){ if(this[i].toLowerCase().indexOf(e)>=0 || e.indexOf(this[i].toLowerCase())>=0) return true;}return false;};
var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            ios9: u.indexOf('iPhone OS 9') > -1,
            MQQBrowser: u.indexOf('MQQBrowser') > -1, //是否MQQBrowser
            UCBrowser: u.indexOf('UCBrowser') > -1, //UCBrowser
            Safari: u.indexOf('Safari') > -1
        };
    } (),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
var browsertype = 'other';
var u = navigator.userAgent.toLowerCase();
if(u.indexOf('360') > -1){
    browsertype = '360';
}else if(u.indexOf('mb2345browser') > -1){
    browsertype = '2345';
}else if(u.indexOf('chrome') > -1 || u.indexOf('crios') > -1){
    browsertype = 'chrome';
}else if(u.indexOf('ucbrowser') > -1){
    browsertype = 'UC';
}else if(u.indexOf('micromessenger') > -1){
    browsertype = 'WeChat';
}else if(u.indexOf('qq') > -1){
    browsertype = 'qq';
}else if(u.indexOf('miuibrowser') > -1){
    browsertype = 'miuibrowser';
}else if(u.indexOf('sogou') > -1){
    browsertype = 'sogou';
}else if(u.indexOf('lbbrowser') > -1){
    browsertype = 'lbbrowser';
}else if(u.indexOf('hao') > -1){
    browsertype = 'hao';
}else if(u.indexOf('jisu') > -1){
    browsertype = 'jisu';
}else if(u.indexOf('mxios') > -1 || u.indexOf('maxthon') > -1){
    browsertype = 'mxios';
}else if(u.indexOf('baidu') > -1){
    browsertype = 'baidu';
}else if(u.indexOf('opera') > -1 || u.indexOf('opios') > -1){
    browsertype = 'opera';
}else if(u.indexOf('world') > -1){
    browsertype = 'world';
}else if(u.indexOf('safari') > -1){
    browsertype = 'safari';
}
var Cookie={get:function(name){var value='',matchs;if(matchs=document.cookie.match("(?:^| )"+name+"(?:(?:=([^;]*))|;|$)"))value=matchs[1]?unescape(matchs[1]):"";return value},set:function(name,value,expire,domain){expire=expire||30*24*3600*1000;var date=new Date(),cookie="";date.setTime(date.getTime()+expire);cookie=name+"="+escape(value)+";expires="+date.toGMTString()+";path=/;";domain&&(cookie+="domain="+domain+";");document.cookie=cookie},del:function(name,domain){Cookie.set(name,'',-1,domain)}};

//ios--search & headcata
    if(browser.versions.ios){
        $('#bdcs-search-form input[name="nsid"]').attr('value','6');		
		if($('#mcateCont').length==0){
		    $('.top #logo').after('<p id="mcate"><b>分类</b></p><div id="mcateCont"><p><span class="cur">软件应用</span><span>网络游戏</span><span>单机游戏</span></p><ul class="on"><li><a href="/class/Catalogid/177/2/"><span>生活服务</span>5百+款应用</a></li><li><a href="/class/Catalogid/196/2/"><span>视频影音</span>6百+款应用</a></li><li><a href="/class/Catalogid/213/2/"><span>金融理财</span>1千+款应用</a></li><li><a href="/class/Catalogid/214/2/"><span>导航出行</span>5百+款应用</a></li><li><a href="/class/Catalogid/215/2/"><span>资讯阅读</span>5百+款应用</a></li><li><a href="/class/Catalogid/216/2/"><span>教育学习</span>5百+款应用</a></li><li><a href="/class/Catalogid/217/2/"><span>摄影摄像</span>2百+款应用</a></li><li><a href="/class/Catalogid/218/2/"><span>商务办公</span>5百+款应用</a></li><li><a href="/class/Catalogid/219/2/"><span>社交聊天</span>5百+款应用</a></li><li><a href="/class/Catalogid/220/2/"><span>手机购物</span>5百+款应用</a></li><li><a href="/class/Catalogid/221/2/"><span>母婴育儿</span>9百+款应用</a></li><li><a href="/class/Catalogid/222/2/"><span>运动健身</span>5百+款应用</a></li><li><a href="/class/Catalogid/223/2/"><span>医疗健康</span>5百+款应用</a></li><li><a href="/class/Catalogid/224/2/"><span>主题美化</span>5百+款应用</a></li><li><a href="/class/Catalogid/225/2/"><span>优化安全</span>5百+款应用</a></li><li><a href="/class/Catalogid/226/2/"><span>系统工具</span>5百+款应用</a></li><li><a href="/class/Catalogid/155/2/"><span>手机银行</span>5百+款应用</a></li></ul><ul><li><a href="/class/Catalogid/199/2/"><span>角色扮演</span>5百+款应用</a></li><li><a href="/class/Catalogid/200/2/"><span>卡牌手游</span>6百+款应用</a></li><li><a href="/class/Catalogid/201/2/"><span>策略塔防</span>1千+款应用</a></li><li><a href="/class/Catalogid/202/2/"><span>动作手游</span>5百+款应用</a></li><li><a href="/class/Catalogid/203/2/"><span>冒险解谜</span>5百+款应用</a></li><li><a href="/class/Catalogid/204/2/"><span>飞行射击</span>5百+款应用</a></li><li><a href="/class/Catalogid/205/2/"><span>模拟经营</span>2百+款应用</a></li><li><a href="/class/Catalogid/206/2/"><span>竞技格斗</span>5百+款应用</a></li><li><a href="/class/Catalogid/207/2/"><span>赛车游戏</span>5百+款应用</a></li><li><a href="/class/Catalogid/208/2/"><span>音乐游戏</span>5百+款应用</a></li><li><a href="/class/Catalogid/209/2/"><span>棋牌游戏</span>9百+款应用</a></li><li><a href="/class/Catalogid/210/2/"><span>休闲益智</span>5百+款应用</a></li><li><a href="/class/Catalogid/211/2/"><span>变态手游</span>5百+款应用</a></li><li><a href="/class/Catalogid/240/2/"><span>捕鱼游戏</span>5百+款应用</a></li><li><a href="/class/Catalogid/212/2/"><span>手游辅助</span>5百+款应用</a></li></ul><ul><li><a href="/class/Catalogid/228/2/"><span>动作游戏</span>5百+款应用</a></li><li><a href="/class/Catalogid/229/2/"><span>角色扮演</span>6百+款应用</a></li><li><a href="/class/Catalogid/230/2/"><span>休闲益智</span>1千+款应用</a></li><li><a href="/class/Catalogid/231/2/"><span>策略游戏</span>5百+款应用</a></li><li><a href="/class/Catalogid/232/2/"><span>卡牌游戏</span>5百+款应用</a></li><li><a href="/class/Catalogid/233/2/"><span>竞技游戏</span>5百+款应用</a></li><li><a href="/class/Catalogid/234/2/"><span>枪战射击</span>2百+款应用</a></li><li><a href="/class/Catalogid/235/2/"><span>模拟经营</span>5百+款应用</a></li><li><a href="/class/Catalogid/236/2/"><span>冒险解谜</span>5百+款应用</a></li><li><a href="/class/Catalogid/237/2/"><span>棋牌游戏</span>5百+款应用</a></li><li><a href="/class/Catalogid/238/2/"><span>赛车游戏</span>9百+款应用</a></li><li><a href="/class/Catalogid/239/2/"><span>破解游戏</span>5百+款应用</a></li></ul></div>')
		}
    }
	else{
		if($('#mcateCont').length==0){
		    $('.top #logo').after('<p id="mcate"><b>分类</b></p><div id="mcateCont"><p><span class="cur">软件应用</span><span>网络游戏</span><span>单机游戏</span></p><ul class="on"><li><a href="/class/Catalogid/177/2/"><span>生活服务</span>5百+款应用</a></li><li><a href="/class/Catalogid/196/2/"><span>视频影音</span>6百+款应用</a></li><li><a href="/class/Catalogid/213/2/"><span>金融理财</span>1千+款应用</a></li><li><a href="/class/Catalogid/214/2/"><span>导航出行</span>5百+款应用</a></li><li><a href="/class/Catalogid/215/2/"><span>资讯阅读</span>5百+款应用</a></li><li><a href="/class/Catalogid/216/2/"><span>教育学习</span>5百+款应用</a></li><li><a href="/class/Catalogid/217/2/"><span>摄影摄像</span>2百+款应用</a></li><li><a href="/class/Catalogid/218/2/"><span>商务办公</span>5百+款应用</a></li><li><a href="/class/Catalogid/219/2/"><span>社交聊天</span>5百+款应用</a></li><li><a href="/class/Catalogid/220/2/"><span>手机购物</span>5百+款应用</a></li><li><a href="/class/Catalogid/221/2/"><span>母婴育儿</span>9百+款应用</a></li><li><a href="/class/Catalogid/222/2/"><span>运动健身</span>5百+款应用</a></li><li><a href="/class/Catalogid/223/2/"><span>医疗健康</span>5百+款应用</a></li><li><a href="/class/Catalogid/224/2/"><span>主题美化</span>5百+款应用</a></li><li><a href="/class/Catalogid/225/2/"><span>优化安全</span>5百+款应用</a></li><li><a href="/class/Catalogid/226/2/"><span>系统工具</span>5百+款应用</a></li><li><a href="/class/Catalogid/155/2/"><span>手机银行</span>5百+款应用</a></li></ul><ul><li><a href="/class/Catalogid/199/2/"><span>角色扮演</span>5百+款应用</a></li><li><a href="/class/Catalogid/200/2/"><span>卡牌手游</span>6百+款应用</a></li><li><a href="/class/Catalogid/201/2/"><span>策略塔防</span>1千+款应用</a></li><li><a href="/class/Catalogid/202/2/"><span>动作手游</span>5百+款应用</a></li><li><a href="/class/Catalogid/203/2/"><span>冒险解谜</span>5百+款应用</a></li><li><a href="/class/Catalogid/204/2/"><span>飞行射击</span>5百+款应用</a></li><li><a href="/class/Catalogid/205/2/"><span>模拟经营</span>2百+款应用</a></li><li><a href="/class/Catalogid/206/2/"><span>竞技格斗</span>5百+款应用</a></li><li><a href="/class/Catalogid/207/2/"><span>赛车游戏</span>5百+款应用</a></li><li><a href="/class/Catalogid/208/2/"><span>音乐游戏</span>5百+款应用</a></li><li><a href="/class/Catalogid/209/2/"><span>棋牌游戏</span>9百+款应用</a></li><li><a href="/class/Catalogid/210/2/"><span>休闲益智</span>5百+款应用</a></li><li><a href="/class/Catalogid/211/2/"><span>变态手游</span>5百+款应用</a></li><li><a href="/class/Catalogid/240/2/"><span>捕鱼游戏</span>5百+款应用</a></li><li><a href="/class/Catalogid/212/2/"><span>手游辅助</span>5百+款应用</a></li></ul><ul><li><a href="/class/Catalogid/228/2/"><span>动作游戏</span>5百+款应用</a></li><li><a href="/class/Catalogid/229/2/"><span>角色扮演</span>6百+款应用</a></li><li><a href="/class/Catalogid/230/2/"><span>休闲益智</span>1千+款应用</a></li><li><a href="/class/Catalogid/231/2/"><span>策略游戏</span>5百+款应用</a></li><li><a href="/class/Catalogid/232/2/"><span>卡牌游戏</span>5百+款应用</a></li><li><a href="/class/Catalogid/233/2/"><span>竞技游戏</span>5百+款应用</a></li><li><a href="/class/Catalogid/234/2/"><span>枪战射击</span>2百+款应用</a></li><li><a href="/class/Catalogid/235/2/"><span>模拟经营</span>5百+款应用</a></li><li><a href="/class/Catalogid/236/2/"><span>冒险解谜</span>5百+款应用</a></li><li><a href="/class/Catalogid/237/2/"><span>棋牌游戏</span>5百+款应用</a></li><li><a href="/class/Catalogid/238/2/"><span>赛车游戏</span>9百+款应用</a></li><li><a href="/class/Catalogid/239/2/"><span>破解游戏</span>5百+款应用</a></li></ul></div>')
		}
	}

	var dcate=$('#info p .cata').html();
	if( dcate=='休闲益智' || dcate=='角色扮演' || dcate=='飞行射击' || dcate=='体育竞技' || dcate=='策略塔防' || dcate=='赛车游戏' || dcate=='养成经营' || dcate=='动作冒险' || dcate=='赛车游戏' || dcate=='卡牌棋牌' || dcate=='变态手游' ||dcate=='其他游戏' || dcate=='iPhone棋牌游戏' || dcate=='iPhone冒险解谜' || dcate=='iPhone格斗游戏' || dcate=='iPhone益智游戏' || dcate=='iPhone情景游戏' || dcate=='iPhone儿童游戏' || dcate=='iPhone休闲游戏' ){$('.mainNav li').eq(2).addClass('cur');}
	else if( dcate=='即时网游' || dcate=='回合网游' || dcate=='休闲养成' || dcate=='角色扮演' || dcate=='其它网游' || dcate=='仙侠网游' || dcate=='动作竞技' || dcate=='卡牌游戏' || dcate=='策略塔防' || dcate=='三国网游' || dcate=='网络游戏' || dcate=='儿童教育' || dcate=='冒险解谜' || dcate=='竞技格斗' || dcate=='模拟经营' || dcate=='音乐游戏'){$('.mainNav li').eq(2).addClass('cur');}
	else if( dcate=='角色扮演' || dcate=='卡牌棋牌' || dcate=='动作游戏' || dcate=='策略塔防' || dcate=='飞行射击' || dcate=='休闲益智' || dcate=='模拟经营' || dcate=='体育竞技' || dcate=='冒险解谜' || dcate=='单机破解'){$('.mainNav li').eq(3).addClass('cur');}
	else{$('.mainNav li').eq(1).addClass('cur');}		



	//判断是否在微信中打开
	function is_weixin() {
		var uaa = navigator.userAgent.toLowerCase();
	    var odocumentH=$(document).height();
	    var owindowW=$(window).width();
		var kg=true;
		if (uaa.indexOf('micromessenger')>0) {
		 if(browser.versions.ios) { //if ios
				$('body').append('<div class="mask main-bg"><img src="/statics/img/iphone_wx.png"></div>');	
			}				
			if(browser.versions.android) {//if android
				$('body').append('<div class="mask main-bg"><img src="/statics/img/anzhuo_wx.png"></div>');
			}
	        $('.mask img').css({'position':'fixed','right':'22px','top':'15px'})
            document.addEventListener("touchmove",function(e){//清除底层文档默认滑动；
				if(kg){
					e.preventDefault();
					e.stopPropagation();
				};
			},false); 
			
			$(".mask").click(function () {
				$(".mask").remove();
				kg=false;
			});
			return false;	
		};
	};
	$('#info #btns a').click(is_weixin);




function scroll(e) {
	var t = $("#" + e);
	oul = t.find(".tags-main-ul"),
	oli = oul.find(".tags-main-box"),
	ospan = '<span class="active"></span>',
	oli_l = oli.length,
	window_w = parseInt($(window).width() - 16),
	oli.width(window_w),
	oli_w = oli.eq(1).outerWidth(!0);
	for (var n = 1; n < oli_l; n++) ospan += "<span></span>";
	t.next(".pagenum").html(ospan),
	oul.width(oli_l * oli_w);
	var o;
	o = new iScroll(e, {
		snap: !0,
		momentum: !1,
		hScrollbar: !1,
		onScrollEnd: function() {
			t.next(".pagenum").find("span").removeClass("active").eq(this.currPageX).addClass("active")
		}
	})
}

function loadmore() {
	$(".rank .lookmore").each(function() {
		$(this).click(function() {
			var e = $(this).parent().find(".list li:hidden").length,
			t = $(this).parent().find(".list li:visible").length;
			$(this).parent().find(".list li").slice(0, t + 4).show(),
			4 == e && $(this).remove()
		})
	})
}



function getCanonicalHref() {
	for (var e = "",
	t = document.getElementsByTagName("link"), n = 0; n < t.length; n++) if (link = t[n], "canonical" === link.rel) {
		e = link.href;
		break
	}
	return e
}

function validate() {
	var e = $(".w-text textarea").val(),
	t = e.length,
	n = e.replace(/[\x00-\xff]/g, "").length;
	tlen = Math.ceil((t + n) / 2),
	tlen < 5 ? $("#verify").addClass("disable") : $("#verify").removeClass("disable")
}

function getIP(e) {
	adIp = e.ip
} 

!function(e,t){function C(e){return P.isWindow(e)?e:9===e.nodeType&&(e.defaultView||e.parentWindow)}function E(e){if(!ht[e]){var t=_.body,C=P("<"+e+">").appendTo(t),E=C.css("display");C.remove(),"none"!==E&&""!==E||(ct||(ct=_.createElement("iframe"),ct.frameBorder=ct.width=ct.height=0),t.appendChild(ct),dt&&ct.createElement||(dt=(ct.contentWindow||ct.contentDocument).document,dt.write(("CSS1Compat"===_.compatMode?"<!doctype html>":"")+"<html><body>"),dt.close()),C=dt.createElement(e),dt.body.appendChild(C),E=P.css(C,"display"),t.removeChild(ct)),ht[e]=E}return ht[e]}function D(e,t){var C={};return P.each(gt.concat.apply([],gt.slice(0,t)),function(){C[this]=e}),C}function B(){pt=t}function F(){return setTimeout(B,0),pt=P.now()}function n(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function r(){try{return new e.XMLHttpRequest}catch(t){}}function a(e,C){e.dataFilter&&(C=e.dataFilter(C,e.dataType));var E,D,B,F,n,r,a,o,i=e.dataTypes,A={},s=i.length,l=i[0];for(E=1;E<s;E++){if(1===E)for(D in e.converters)"string"==typeof D&&(A[D.toLowerCase()]=e.converters[D]);if(F=l,l=i[E],"*"===l)l=F;else if("*"!==F&&F!==l){if(n=F+" "+l,r=A[n]||A["* "+l],!r){o=t;for(a in A)if(B=a.split(" "),(B[0]===F||"*"===B[0])&&(o=A[B[1]+" "+l])){a=A[a],a===!0?r=o:o===!0&&(r=a);break}}!r&&!o&&P.error("No conversion from "+n.replace(" "," to ")),r!==!0&&(C=r?r(C):o(a(C)))}}return C}function o(e,C,E){var D,B,F,n,r=e.contents,a=e.dataTypes,o=e.responseFields;for(B in o)B in E&&(C[o[B]]=E[B]);for(;"*"===a[0];)a.shift(),D===t&&(D=e.mimeType||C.getResponseHeader("content-type"));if(D)for(B in r)if(r[B]&&r[B].test(D)){a.unshift(B);break}if(a[0]in E)F=a[0];else{for(B in E){if(!a[0]||e.converters[B+" "+a[0]]){F=B;break}n||(n=B)}F=F||n}if(F)return F!==a[0]&&a.unshift(F),E[F]}function i(e,t,C,E){if(P.isArray(t))P.each(t,function(t,D){C||Re.test(e)?E(e,D):i(e+"["+("object"==typeof D||P.isArray(D)?t:"")+"]",D,C,E)});else if(C||null==t||"object"!=typeof t)E(e,t);else for(var D in t)i(e+"["+D+"]",t[D],C,E)}function A(e,C){var E,D,B=P.ajaxSettings.flatOptions||{};for(E in C)C[E]!==t&&((B[E]?e:D||(D={}))[E]=C[E]);D&&P.extend(!0,e,D)}function s(e,C,E,D,B,F){B=B||C.dataTypes[0],F=F||{},F[B]=!0;for(var n,r=e[B],a=0,o=r?r.length:0,i=e===Ft;a<o&&(i||!n);a++)n=r[a](C,E,D),"string"==typeof n&&(!i||F[n]?n=t:(C.dataTypes.unshift(n),n=s(e,C,E,D,n,F)));return(i||!n)&&!F["*"]&&(n=s(e,C,E,D,"*",F)),n}function l(e){return function(t,C){if("string"!=typeof t&&(C=t,t="*"),P.isFunction(C))for(var E,D,B,F=t.toLowerCase().split(Ct),n=0,r=F.length;n<r;n++)E=F[n],B=/^\+/.test(E),B&&(E=E.substr(1)||"*"),D=e[E]=e[E]||[],D[B?"unshift":"push"](C)}}function c(e,t,C){var E="width"===t?e.offsetWidth:e.offsetHeight,D="width"===t?Ie:Xe,B=0,F=D.length;if(E>0){if("border"!==C)for(;B<F;B++)C||(E-=parseFloat(P.css(e,"padding"+D[B]))||0),"margin"===C?E+=parseFloat(P.css(e,C+D[B]))||0:E-=parseFloat(P.css(e,"border"+D[B]+"Width"))||0;return E+"px"}if(E=ke(e,t,t),(E<0||null==E)&&(E=e.style[t]||0),E=parseFloat(E)||0,C)for(;B<F;B++)E+=parseFloat(P.css(e,"padding"+D[B]))||0,"padding"!==C&&(E+=parseFloat(P.css(e,"border"+D[B]+"Width"))||0),"margin"===C&&(E+=parseFloat(P.css(e,C+D[B]))||0);return E+"px"}function d(e,t){t.src?P.ajax({url:t.src,async:!1,dataType:"script"}):P.globalEval((t.text||t.textContent||t.innerHTML||"").replace(we,"/*$0*/")),t.parentNode&&t.parentNode.removeChild(t)}function u(e){var t=_.createElement("div");return Se.appendChild(t),t.innerHTML=e.outerHTML,t.firstChild}function p(e){var t=(e.nodeName||"").toLowerCase();"input"===t?h(e):"script"!==t&&"undefined"!=typeof e.getElementsByTagName&&P.grep(e.getElementsByTagName("input"),h)}function h(e){"checkbox"!==e.type&&"radio"!==e.type||(e.defaultChecked=e.checked)}function f(e){return"undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName("*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll("*"):[]}function m(e,t){var C;1===t.nodeType&&(t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),C=t.nodeName.toLowerCase(),"object"===C?t.outerHTML=e.outerHTML:"input"!==C||"checkbox"!==e.type&&"radio"!==e.type?"option"===C?t.selected=e.defaultSelected:"input"!==C&&"textarea"!==C||(t.defaultValue=e.defaultValue):(e.checked&&(t.defaultChecked=t.checked=e.checked),t.value!==e.value&&(t.value=e.value)),t.removeAttribute(P.expando))}function g(e,t){if(1===t.nodeType&&P.hasData(e)){var C,E,D,B=P._data(e),F=P._data(t,B),n=B.events;if(n){delete F.handle,F.events={};for(C in n)for(E=0,D=n[C].length;E<D;E++)P.event.add(t,C+(n[C][E].namespace?".":"")+n[C][E].namespace,n[C][E],n[C][E].data)}F.data&&(F.data=P.extend({},F.data))}}function b(e,t){return P.nodeName(e,"table")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function y(e){var t=ce.split("|"),C=e.createDocumentFragment();if(C.createElement)for(;t.length;)C.createElement(t.pop());return C}function v(e,t,C){if(t=t||0,P.isFunction(t))return P.grep(e,function(e,E){var D=!!t.call(e,E,e);return D===C});if(t.nodeType)return P.grep(e,function(e,E){return e===t===C});if("string"==typeof t){var E=P.grep(e,function(e){return 1===e.nodeType});if(ie.test(t))return P.filter(t,E,!C);t=P.filter(t,E)}return P.grep(e,function(e,E){return P.inArray(e,t)>=0===C})}function x(e){return!e||!e.parentNode||11===e.parentNode.nodeType}function w(){return!0}function T(){return!1}function S(e,t,C){var E=t+"defer",D=t+"queue",B=t+"mark",F=P._data(e,E);F&&("queue"===C||!P._data(e,D))&&("mark"===C||!P._data(e,B))&&setTimeout(function(){!P._data(e,D)&&!P._data(e,B)&&(P.removeData(e,E,!0),F.fire())},0)}function k(e){for(var t in e)if(("data"!==t||!P.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}function $(e,C,E){if(E===t&&1===e.nodeType){var D="data-"+C.replace(I,"-$1").toLowerCase();if(E=e.getAttribute(D),"string"==typeof E){try{E="true"===E||"false"!==E&&("null"===E?null:P.isNumeric(E)?parseFloat(E):O.test(E)?P.parseJSON(E):E)}catch(B){}P.data(e,C,E)}else E=t}return E}function N(e){var t,C,E=L[e]={};for(e=e.split(/\s+/),t=0,C=e.length;t<C;t++)E[e[t]]=!0;return E}var _=e.document,j=e.navigator,M=e.location,P=function(){function C(){if(!n.isReady){try{_.documentElement.doScroll("left")}catch(e){return void setTimeout(C,1)}n.ready()}}var E,D,B,F,n=function(e,t){return new n.fn.init(e,t,E)},r=e.jQuery,a=e.$,o=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,i=/\S/,A=/^\s+/,s=/\s+$/,l=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,c=/^[\],:{}\s]*$/,d=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,u=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,p=/(?:^|:|,)(?:\s*\[)+/g,h=/(webkit)[ \/]([\w.]+)/,f=/(opera)(?:.*version)?[ \/]([\w.]+)/,m=/(msie) ([\w.]+)/,g=/(mozilla)(?:.*? rv:([\w.]+))?/,b=/-([a-z]|[0-9])/gi,y=/^-ms-/,v=function(e,t){return(t+"").toUpperCase()},x=j.userAgent,w=Object.prototype.toString,T=Object.prototype.hasOwnProperty,S=Array.prototype.push,k=Array.prototype.slice,$=String.prototype.trim,N=Array.prototype.indexOf,M={};return n.fn=n.prototype={constructor:n,init:function(e,C,E){var D,B,F,r;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if("body"===e&&!C&&_.body)return this.context=_,this[0]=_.body,this.selector=e,this.length=1,this;if("string"==typeof e){if(D="<"!==e.charAt(0)||">"!==e.charAt(e.length-1)||e.length<3?o.exec(e):[null,e,null],D&&(D[1]||!C)){if(D[1])return C=C instanceof n?C[0]:C,r=C?C.ownerDocument||C:_,F=l.exec(e),F?n.isPlainObject(C)?(e=[_.createElement(F[1])],n.fn.attr.call(e,C,!0)):e=[r.createElement(F[1])]:(F=n.buildFragment([D[1]],[r]),e=(F.cacheable?n.clone(F.fragment):F.fragment).childNodes),n.merge(this,e);if(B=_.getElementById(D[2]),B&&B.parentNode){if(B.id!==D[2])return E.find(e);this.length=1,this[0]=B}return this.context=_,this.selector=e,this}return!C||C.jquery?(C||E).find(e):this.constructor(C).find(e)}return n.isFunction(e)?E.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),n.makeArray(e,this))},selector:"",jquery:"1.7.1",length:0,size:function(){return this.length},toArray:function(){return k.call(this,0)},get:function(e){return null==e?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,C){var E=this.constructor();return n.isArray(e)?S.apply(E,e):n.merge(E,e),E.prevObject=this,E.context=this.context,"find"===t?E.selector=this.selector+(this.selector?" ":"")+C:t&&(E.selector=this.selector+"."+t+"("+C+")"),E},each:function(e,t){return n.each(this,e,t)},ready:function(e){return n.bindReady(),B.add(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(k.apply(this,arguments),"slice",k.call(arguments).join(","))},map:function(e){return this.pushStack(n.map(this,function(t,C){return e.call(t,C,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:S,sort:[].sort,splice:[].splice},n.fn.init.prototype=n.fn,n.extend=n.fn.extend=function(){var e,C,E,D,B,F,r=arguments[0]||{},a=1,o=arguments.length,i=!1;for("boolean"==typeof r&&(i=r,r=arguments[1]||{},a=2),"object"!=typeof r&&!n.isFunction(r)&&(r={}),o===a&&(r=this,--a);a<o;a++)if(null!=(e=arguments[a]))for(C in e)E=r[C],D=e[C],r!==D&&(i&&D&&(n.isPlainObject(D)||(B=n.isArray(D)))?(B?(B=!1,F=E&&n.isArray(E)?E:[]):F=E&&n.isPlainObject(E)?E:{},r[C]=n.extend(i,F,D)):D!==t&&(r[C]=D));return r},n.extend({noConflict:function(t){return e.$===n&&(e.$=a),t&&e.jQuery===n&&(e.jQuery=r),n},isReady:!1,readyWait:1,holdReady:function(e){e?n.readyWait++:n.ready(!0)},ready:function(e){if(e===!0&&!--n.readyWait||e!==!0&&!n.isReady){if(!_.body)return setTimeout(n.ready,1);if(n.isReady=!0,e!==!0&&--n.readyWait>0)return;B.fireWith(_,[n]),n.fn.trigger&&n(_).trigger("ready").off("ready")}},bindReady:function(){if(!B){if(B=n.Callbacks("once memory"),"complete"===_.readyState)return setTimeout(n.ready,1);if(_.addEventListener)_.addEventListener("DOMContentLoaded",F,!1),e.addEventListener("load",n.ready,!1);else if(_.attachEvent){_.attachEvent("onreadystatechange",F),e.attachEvent("onload",n.ready);var t=!1;try{t=null==e.frameElement}catch(E){}_.documentElement.doScroll&&t&&C()}}},isFunction:function(e){return"function"===n.type(e)},isArray:Array.isArray||function(e){return"array"===n.type(e)},isWindow:function(e){return e&&"object"==typeof e&&"setInterval"in e},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?String(e):M[w.call(e)]||"object"},isPlainObject:function(e){if(!e||"object"!==n.type(e)||e.nodeType||n.isWindow(e))return!1;try{if(e.constructor&&!T.call(e,"constructor")&&!T.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(C){return!1}var E;for(E in e);return E===t||T.call(e,E)},isEmptyObject:function(e){for(var t in e)return!1;return!0},error:function(e){throw new Error(e)},parseJSON:function(t){return"string"==typeof t&&t?(t=n.trim(t),e.JSON&&e.JSON.parse?e.JSON.parse(t):c.test(t.replace(d,"@").replace(u,"]").replace(p,""))?new Function("return "+t)():void n.error("Invalid JSON: "+t)):null},parseXML:function(C){var E,D;try{e.DOMParser?(D=new DOMParser,E=D.parseFromString(C,"text/xml")):(E=new ActiveXObject("Microsoft.XMLDOM"),E.async="false",E.loadXML(C))}catch(B){E=t}return(!E||!E.documentElement||E.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+C),E},noop:function(){},globalEval:function(t){t&&i.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(y,"ms-").replace(b,v)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toUpperCase()===t.toUpperCase()},each:function(e,C,E){var D,B=0,F=e.length,r=F===t||n.isFunction(e);if(E)if(r){for(D in e)if(C.apply(e[D],E)===!1)break}else for(;B<F&&C.apply(e[B++],E)!==!1;);else if(r){for(D in e)if(C.call(e[D],D,e[D])===!1)break}else for(;B<F&&C.call(e[B],B,e[B++])!==!1;);return e},trim:$?function(e){return null==e?"":$.call(e)}:function(e){return null==e?"":(e+"").replace(A,"").replace(s,"")},makeArray:function(e,t){var C=t||[];if(null!=e){var E=n.type(e);null==e.length||"string"===E||"function"===E||"regexp"===E||n.isWindow(e)?S.call(C,e):n.merge(C,e)}return C},inArray:function(e,t,C){var E;if(t){if(N)return N.call(t,e,C);for(E=t.length,C=C?C<0?Math.max(0,E+C):C:0;C<E;C++)if(C in t&&t[C]===e)return C}return-1},merge:function(e,C){var E=e.length,D=0;if("number"==typeof C.length)for(var B=C.length;D<B;D++)e[E++]=C[D];else for(;C[D]!==t;)e[E++]=C[D++];return e.length=E,e},grep:function(e,t,C){var E,D=[];C=!!C;for(var B=0,F=e.length;B<F;B++)E=!!t(e[B],B),C!==E&&D.push(e[B]);return D},map:function(e,C,E){var D,B,F=[],r=0,a=e.length,o=e instanceof n||a!==t&&"number"==typeof a&&(a>0&&e[0]&&e[a-1]||0===a||n.isArray(e));if(o)for(;r<a;r++)D=C(e[r],r,E),null!=D&&(F[F.length]=D);else for(B in e)D=C(e[B],B,E),null!=D&&(F[F.length]=D);return F.concat.apply([],F)},guid:1,proxy:function(e,C){if("string"==typeof C){var E=e[C];C=e,e=E}if(!n.isFunction(e))return t;var D=k.call(arguments,2),B=function(){return e.apply(C,D.concat(k.call(arguments)))};return B.guid=e.guid=e.guid||B.guid||n.guid++,B},access:function(e,C,E,D,B,F){var r=e.length;if("object"==typeof C){for(var a in C)n.access(e,a,C[a],D,B,E);return e}if(E!==t){D=!F&&D&&n.isFunction(E);for(var o=0;o<r;o++)B(e[o],C,D?E.call(e[o],o,B(e[o],C)):E,F);return e}return r?B(e[0],C):t},now:function(){return(new Date).getTime()},uaMatch:function(e){e=e.toLowerCase();var t=h.exec(e)||f.exec(e)||m.exec(e)||e.indexOf("compatible")<0&&g.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},sub:function(){function e(t,C){return new e.fn.init(t,C)}n.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(C,E){return E&&E instanceof n&&!(E instanceof e)&&(E=e(E)),n.fn.init.call(this,C,E,t)},e.fn.init.prototype=e.fn;var t=e(_);return e},browser:{}}),n.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){M["[object "+t+"]"]=t.toLowerCase()}),D=n.uaMatch(x),D.browser&&(n.browser[D.browser]=!0,n.browser.version=D.version),n.browser.webkit&&(n.browser.safari=!0),i.test(" ")&&(A=/^[\s\xA0]+/,s=/[\s\xA0]+$/),E=n(_),_.addEventListener?F=function(){_.removeEventListener("DOMContentLoaded",F,!1),n.ready()}:_.attachEvent&&(F=function(){"complete"===_.readyState&&(_.detachEvent("onreadystatechange",F),n.ready())}),n}(),L={};P.Callbacks=function(e){e=e?L[e]||N(e):{};var C,E,D,B,F,n=[],r=[],a=function(t){var C,E,D,B;for(C=0,E=t.length;C<E;C++)D=t[C],B=P.type(D),"array"===B?a(D):"function"===B&&(!e.unique||!i.has(D))&&n.push(D)},o=function(t,a){for(a=a||[],C=!e.memory||[t,a],E=!0,F=D||0,D=0,B=n.length;n&&F<B;F++)if(n[F].apply(t,a)===!1&&e.stopOnFalse){C=!0;break}E=!1,n&&(e.once?C===!0?i.disable():n=[]:r&&r.length&&(C=r.shift(),i.fireWith(C[0],C[1])))},i={add:function(){if(n){var e=n.length;a(arguments),E?B=n.length:C&&C!==!0&&(D=e,o(C[0],C[1]))}return this},remove:function(){if(n)for(var t=arguments,C=0,D=t.length;C<D;C++)for(var r=0;r<n.length&&(t[C]!==n[r]||(E&&r<=B&&(B--,r<=F&&F--),n.splice(r--,1),!e.unique));r++);return this},has:function(e){if(n)for(var t=0,C=n.length;t<C;t++)if(e===n[t])return!0;return!1},empty:function(){return n=[],this},disable:function(){return n=r=C=t,this},disabled:function(){return!n},lock:function(){return r=t,(!C||C===!0)&&i.disable(),this},locked:function(){return!r},fireWith:function(t,D){return r&&(E?e.once||r.push([t,D]):(!e.once||!C)&&o(t,D)),this},fire:function(){return i.fireWith(this,arguments),this},fired:function(){return!!C}};return i};var z=[].slice;P.extend({Deferred:function(e){var t,C=P.Callbacks("once memory"),E=P.Callbacks("once memory"),D=P.Callbacks("memory"),B="pending",F={resolve:C,reject:E,notify:D},n={done:C.add,fail:E.add,progress:D.add,state:function(){return B},isResolved:C.fired,isRejected:E.fired,then:function(e,t,C){return r.done(e).fail(t).progress(C),
this},always:function(){return r.done.apply(r,arguments).fail.apply(r,arguments),this},pipe:function(e,t,C){return P.Deferred(function(E){P.each({done:[e,"resolve"],fail:[t,"reject"],progress:[C,"notify"]},function(e,t){var C,D=t[0],B=t[1];P.isFunction(D)?r[e](function(){C=D.apply(this,arguments),C&&P.isFunction(C.promise)?C.promise().then(E.resolve,E.reject,E.notify):E[B+"With"](this===r?E:this,[C])}):r[e](E[B])})}).promise()},promise:function(e){if(null==e)e=n;else for(var t in n)e[t]=n[t];return e}},r=n.promise({});for(t in F)r[t]=F[t].fire,r[t+"With"]=F[t].fireWith;return r.done(function(){B="resolved"},E.disable,D.lock).fail(function(){B="rejected"},C.disable,D.lock),e&&e.call(r,r),r},when:function(e){function t(e){return function(t){F[e]=arguments.length>1?z.call(arguments,0):t,r.notifyWith(a,F)}}function C(e){return function(t){E[e]=arguments.length>1?z.call(arguments,0):t,--n||r.resolveWith(r,E)}}var E=z.call(arguments,0),D=0,B=E.length,F=Array(B),n=B,r=B<=1&&e&&P.isFunction(e.promise)?e:P.Deferred(),a=r.promise();if(B>1){for(;D<B;D++)E[D]&&E[D].promise&&P.isFunction(E[D].promise)?E[D].promise().then(C(D),r.reject,t(D)):--n;n||r.resolveWith(r,E)}else r!==e&&r.resolveWith(r,B?[e]:[]);return a}}),P.support=function(){var t,C,E,D,B,F,n,r,a,o,i,A,s=_.createElement("div");_.documentElement;if(s.setAttribute("className","t"),s.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",C=s.getElementsByTagName("*"),E=s.getElementsByTagName("a")[0],!C||!C.length||!E)return{};D=_.createElement("select"),B=D.appendChild(_.createElement("option")),F=s.getElementsByTagName("input")[0],t={leadingWhitespace:3===s.firstChild.nodeType,tbody:!s.getElementsByTagName("tbody").length,htmlSerialize:!!s.getElementsByTagName("link").length,style:/top/.test(E.getAttribute("style")),hrefNormalized:"/a"===E.getAttribute("href"),opacity:/^0.55/.test(E.style.opacity),cssFloat:!!E.style.cssFloat,checkOn:"on"===F.value,optSelected:B.selected,getSetAttribute:"t"!==s.className,enctype:!!_.createElement("form").enctype,html5Clone:"<:nav><:nav>"!==_.createElement("nav").cloneNode(!0).outerHTML,submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},F.checked=!0,t.noCloneChecked=F.cloneNode(!0).checked,D.disabled=!0,t.optDisabled=!B.disabled;try{delete s.test}catch(l){t.deleteExpando=!1}if(!s.addEventListener&&s.attachEvent&&s.fireEvent&&(s.attachEvent("onclick",function(){t.noCloneEvent=!1}),s.cloneNode(!0).fireEvent("onclick")),F=_.createElement("input"),F.value="t",F.setAttribute("type","radio"),t.radioValue="t"===F.value,F.setAttribute("checked","checked"),s.appendChild(F),r=_.createDocumentFragment(),r.appendChild(s.lastChild),t.checkClone=r.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=F.checked,r.removeChild(F),r.appendChild(s),s.innerHTML="",e.getComputedStyle&&(n=_.createElement("div"),n.style.width="0",n.style.marginRight="0",s.style.width="2px",s.appendChild(n),t.reliableMarginRight=0===(parseInt((e.getComputedStyle(n,null)||{marginRight:0}).marginRight,10)||0)),s.attachEvent)for(i in{submit:1,change:1,focusin:1})o="on"+i,A=o in s,A||(s.setAttribute(o,"return;"),A="function"==typeof s[o]),t[i+"Bubbles"]=A;return r.removeChild(s),r=D=B=n=s=F=null,P(function(){var e,C,E,D,B,F,n,r,o,i,l=_.getElementsByTagName("body")[0];!l||(F=1,n="position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",r="visibility:hidden;border:0;",o="style='"+n+"border:5px solid #000;padding:0;'",i="<div "+o+"><div></div></div><table "+o+" cellpadding='0' cellspacing='0'><tr><td></td></tr></table>",e=_.createElement("div"),e.style.cssText=r+"width:0;height:0;position:static;top:0;margin-top:"+F+"px",l.insertBefore(e,l.firstChild),s=_.createElement("div"),e.appendChild(s),s.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",a=s.getElementsByTagName("td"),A=0===a[0].offsetHeight,a[0].style.display="",a[1].style.display="none",t.reliableHiddenOffsets=A&&0===a[0].offsetHeight,s.innerHTML="",s.style.width=s.style.paddingLeft="1px",P.boxModel=t.boxModel=2===s.offsetWidth,"undefined"!=typeof s.style.zoom&&(s.style.display="inline",s.style.zoom=1,t.inlineBlockNeedsLayout=2===s.offsetWidth,s.style.display="",s.innerHTML="<div style='width:4px;'></div>",t.shrinkWrapBlocks=2!==s.offsetWidth),s.style.cssText=n+r,s.innerHTML=i,C=s.firstChild,E=C.firstChild,D=C.nextSibling.firstChild.firstChild,B={doesNotAddBorder:5!==E.offsetTop,doesAddBorderForTableAndCells:5===D.offsetTop},E.style.position="fixed",E.style.top="20px",B.fixedPosition=20===E.offsetTop||15===E.offsetTop,E.style.position=E.style.top="",C.style.overflow="hidden",C.style.position="relative",B.subtractsBorderForOverflowNotVisible=E.offsetTop===-5,B.doesNotIncludeMarginInBodyOffset=l.offsetTop!==F,l.removeChild(e),s=e=null,P.extend(t,B))}),t}();var O=/^(?:\{.*\}|\[.*\])$/,I=/([A-Z])/g;P.extend({cache:{},uuid:0,expando:"jQuery"+(P.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?P.cache[e[P.expando]]:e[P.expando],!!e&&!k(e)},data:function(e,C,E,D){if(P.acceptData(e)){var B,F,n,r=P.expando,a="string"==typeof C,o=e.nodeType,i=o?P.cache:e,A=o?e[r]:e[r]&&r,s="events"===C;if((!A||!i[A]||!s&&!D&&!i[A].data)&&a&&E===t)return;return A||(o?e[r]=A=++P.uuid:A=r),i[A]||(i[A]={},o||(i[A].toJSON=P.noop)),"object"!=typeof C&&"function"!=typeof C||(D?i[A]=P.extend(i[A],C):i[A].data=P.extend(i[A].data,C)),B=F=i[A],D||(F.data||(F.data={}),F=F.data),E!==t&&(F[P.camelCase(C)]=E),s&&!F[C]?B.events:(a?(n=F[C],null==n&&(n=F[P.camelCase(C)])):n=F,n)}},removeData:function(e,t,C){if(P.acceptData(e)){var E,D,B,F=P.expando,n=e.nodeType,r=n?P.cache:e,a=n?e[F]:F;if(!r[a])return;if(t&&(E=C?r[a]:r[a].data)){P.isArray(t)||(t in E?t=[t]:(t=P.camelCase(t),t=t in E?[t]:t.split(" ")));for(D=0,B=t.length;D<B;D++)delete E[t[D]];if(!(C?k:P.isEmptyObject)(E))return}if(!C&&(delete r[a].data,!k(r[a])))return;P.support.deleteExpando||!r.setInterval?delete r[a]:r[a]=null,n&&(P.support.deleteExpando?delete e[F]:e.removeAttribute?e.removeAttribute(F):e[F]=null)}},_data:function(e,t,C){return P.data(e,t,C,!0)},acceptData:function(e){if(e.nodeName){var t=P.noData[e.nodeName.toLowerCase()];if(t)return t!==!0&&e.getAttribute("classid")===t}return!0}}),P.fn.extend({data:function(e,C){var E,D,B,F=null;if("undefined"==typeof e){if(this.length&&(F=P.data(this[0]),1===this[0].nodeType&&!P._data(this[0],"parsedAttrs"))){D=this[0].attributes;for(var n=0,r=D.length;n<r;n++)B=D[n].name,0===B.indexOf("data-")&&(B=P.camelCase(B.substring(5)),$(this[0],B,F[B]));P._data(this[0],"parsedAttrs",!0)}return F}return"object"==typeof e?this.each(function(){P.data(this,e)}):(E=e.split("."),E[1]=E[1]?"."+E[1]:"",C===t?(F=this.triggerHandler("getData"+E[1]+"!",[E[0]]),F===t&&this.length&&(F=P.data(this[0],e),F=$(this[0],e,F)),F===t&&E[1]?this.data(E[0]):F):this.each(function(){var t=P(this),D=[E[0],C];t.triggerHandler("setData"+E[1]+"!",D),P.data(this,e,C),t.triggerHandler("changeData"+E[1]+"!",D)}))},removeData:function(e){return this.each(function(){P.removeData(this,e)})}}),P.extend({_mark:function(e,t){e&&(t=(t||"fx")+"mark",P._data(e,t,(P._data(e,t)||0)+1))},_unmark:function(e,t,C){if(e!==!0&&(C=t,t=e,e=!1),t){C=C||"fx";var E=C+"mark",D=e?0:(P._data(t,E)||1)-1;D?P._data(t,E,D):(P.removeData(t,E,!0),S(t,C,"mark"))}},queue:function(e,t,C){var E;if(e)return t=(t||"fx")+"queue",E=P._data(e,t),C&&(!E||P.isArray(C)?E=P._data(e,t,P.makeArray(C)):E.push(C)),E||[]},dequeue:function(e,t){t=t||"fx";var C=P.queue(e,t),E=C.shift(),D={};"inprogress"===E&&(E=C.shift()),E&&("fx"===t&&C.unshift("inprogress"),P._data(e,t+".run",D),E.call(e,function(){P.dequeue(e,t)},D)),C.length||(P.removeData(e,t+"queue "+t+".run",!0),S(e,t,"queue"))}}),P.fn.extend({queue:function(e,C){return"string"!=typeof e&&(C=e,e="fx"),C===t?P.queue(this[0],e):this.each(function(){var t=P.queue(this,e,C);"fx"===e&&"inprogress"!==t[0]&&P.dequeue(this,e)})},dequeue:function(e){return this.each(function(){P.dequeue(this,e)})},delay:function(e,t){return e=P.fx?P.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,C){var E=setTimeout(t,e);C.stop=function(){clearTimeout(E)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,C){function E(){--r||B.resolveWith(F,[F])}"string"!=typeof e&&(C=e,e=t),e=e||"fx";for(var D,B=P.Deferred(),F=this,n=F.length,r=1,a=e+"defer",o=e+"queue",i=e+"mark";n--;)(D=P.data(F[n],a,t,!0)||(P.data(F[n],o,t,!0)||P.data(F[n],i,t,!0))&&P.data(F[n],a,P.Callbacks("once memory"),!0))&&(r++,D.add(E));return E(),B.promise()}});var X,Y,q,H=/[\n\t\r]/g,R=/\s+/,W=/\r/g,U=/^(?:button|input)$/i,V=/^(?:button|input|object|select|textarea)$/i,Z=/^a(?:rea)?$/i,Q=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,G=P.support.getSetAttribute;P.fn.extend({attr:function(e,t){return P.access(this,e,t,!0,P.attr)},removeAttr:function(e){return this.each(function(){P.removeAttr(this,e)})},prop:function(e,t){return P.access(this,e,t,!0,P.prop)},removeProp:function(e){return e=P.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(C){}})},addClass:function(e){var t,C,E,D,B,F,n;if(P.isFunction(e))return this.each(function(t){P(this).addClass(e.call(this,t,this.className))});if(e&&"string"==typeof e)for(t=e.split(R),C=0,E=this.length;C<E;C++)if(D=this[C],1===D.nodeType)if(D.className||1!==t.length){for(B=" "+D.className+" ",F=0,n=t.length;F<n;F++)~B.indexOf(" "+t[F]+" ")||(B+=t[F]+" ");D.className=P.trim(B)}else D.className=e;return this},removeClass:function(e){var C,E,D,B,F,n,r;if(P.isFunction(e))return this.each(function(t){P(this).removeClass(e.call(this,t,this.className))});if(e&&"string"==typeof e||e===t)for(C=(e||"").split(R),E=0,D=this.length;E<D;E++)if(B=this[E],1===B.nodeType&&B.className)if(e){for(F=(" "+B.className+" ").replace(H," "),n=0,r=C.length;n<r;n++)F=F.replace(" "+C[n]+" "," ");B.className=P.trim(F)}else B.className="";return this},toggleClass:function(e,t){var C=typeof e,E="boolean"==typeof t;return P.isFunction(e)?this.each(function(C){P(this).toggleClass(e.call(this,C,this.className,t),t)}):this.each(function(){if("string"===C)for(var D,B=0,F=P(this),n=t,r=e.split(R);D=r[B++];)n=E?n:!F.hasClass(D),F[n?"addClass":"removeClass"](D);else"undefined"!==C&&"boolean"!==C||(this.className&&P._data(this,"__className__",this.className),this.className=this.className||e===!1?"":P._data(this,"__className__")||"")})},hasClass:function(e){for(var t=" "+e+" ",C=0,E=this.length;C<E;C++)if(1===this[C].nodeType&&(" "+this[C].className+" ").replace(H," ").indexOf(t)>-1)return!0;return!1},val:function(e){var C,E,D,B=this[0];return arguments.length?(D=P.isFunction(e),this.each(function(E){var B,F=P(this);1===this.nodeType&&(B=D?e.call(this,E,F.val()):e,null==B?B="":"number"==typeof B?B+="":P.isArray(B)&&(B=P.map(B,function(e){return null==e?"":e+""})),C=P.valHooks[this.nodeName.toLowerCase()]||P.valHooks[this.type],C&&"set"in C&&C.set(this,B,"value")!==t||(this.value=B))})):B?(C=P.valHooks[B.nodeName.toLowerCase()]||P.valHooks[B.type],C&&"get"in C&&(E=C.get(B,"value"))!==t?E:(E=B.value,"string"==typeof E?E.replace(W,""):null==E?"":E)):void 0}}),P.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,C,E,D,B=e.selectedIndex,F=[],n=e.options,r="select-one"===e.type;if(B<0)return null;for(C=r?B:0,E=r?B+1:n.length;C<E;C++)if(D=n[C],D.selected&&(P.support.optDisabled?!D.disabled:null===D.getAttribute("disabled"))&&(!D.parentNode.disabled||!P.nodeName(D.parentNode,"optgroup"))){if(t=P(D).val(),r)return t;F.push(t)}return r&&!F.length&&n.length?P(n[B]).val():F},set:function(e,t){var C=P.makeArray(t);return P(e).find("option").each(function(){this.selected=P.inArray(P(this).val(),C)>=0}),C.length||(e.selectedIndex=-1),C}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(e,C,E,D){var B,F,n,r=e.nodeType;if(e&&3!==r&&8!==r&&2!==r)return D&&C in P.attrFn?P(e)[C](E):"undefined"==typeof e.getAttribute?P.prop(e,C,E):(n=1!==r||!P.isXMLDoc(e),n&&(C=C.toLowerCase(),F=P.attrHooks[C]||(Q.test(C)?Y:X)),E!==t?null===E?void P.removeAttr(e,C):F&&"set"in F&&n&&(B=F.set(e,E,C))!==t?B:(e.setAttribute(C,""+E),E):F&&"get"in F&&n&&null!==(B=F.get(e,C))?B:(B=e.getAttribute(C),null===B?t:B))},removeAttr:function(e,t){var C,E,D,B,F=0;if(t&&1===e.nodeType)for(E=t.toLowerCase().split(R),B=E.length;F<B;F++)D=E[F],D&&(C=P.propFix[D]||D,P.attr(e,D,""),e.removeAttribute(G?D:C),Q.test(D)&&C in e&&(e[C]=!1))},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)P.error("type property can't be changed");else if(!P.support.radioValue&&"radio"===t&&P.nodeName(e,"input")){var C=e.value;return e.setAttribute("type",t),C&&(e.value=C),t}}},value:{get:function(e,t){return X&&P.nodeName(e,"button")?X.get(e,t):t in e?e.value:null},set:function(e,t,C){return X&&P.nodeName(e,"button")?X.set(e,t,C):void(e.value=t)}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,C,E){var D,B,F,n=e.nodeType;if(e&&3!==n&&8!==n&&2!==n)return F=1!==n||!P.isXMLDoc(e),F&&(C=P.propFix[C]||C,B=P.propHooks[C]),E!==t?B&&"set"in B&&(D=B.set(e,E,C))!==t?D:e[C]=E:B&&"get"in B&&null!==(D=B.get(e,C))?D:e[C]},propHooks:{tabIndex:{get:function(e){var C=e.getAttributeNode("tabindex");return C&&C.specified?parseInt(C.value,10):V.test(e.nodeName)||Z.test(e.nodeName)&&e.href?0:t}}}}),P.attrHooks.tabindex=P.propHooks.tabIndex,Y={get:function(e,C){var E,D=P.prop(e,C);return D===!0||"boolean"!=typeof D&&(E=e.getAttributeNode(C))&&E.nodeValue!==!1?C.toLowerCase():t},set:function(e,t,C){var E;return t===!1?P.removeAttr(e,C):(E=P.propFix[C]||C,E in e&&(e[E]=!0),e.setAttribute(C,C.toLowerCase())),C}},G||(q={name:!0,id:!0},X=P.valHooks.button={get:function(e,C){var E;return E=e.getAttributeNode(C),E&&(q[C]?""!==E.nodeValue:E.specified)?E.nodeValue:t},set:function(e,t,C){var E=e.getAttributeNode(C);return E||(E=_.createAttribute(C),e.setAttributeNode(E)),E.nodeValue=t+""}},P.attrHooks.tabindex.set=X.set,P.each(["width","height"],function(e,t){P.attrHooks[t]=P.extend(P.attrHooks[t],{set:function(e,C){if(""===C)return e.setAttribute(t,"auto"),C}})}),P.attrHooks.contenteditable={get:X.get,set:function(e,t,C){""===t&&(t="false"),X.set(e,t,C)}}),P.support.hrefNormalized||P.each(["href","src","width","height"],function(e,C){P.attrHooks[C]=P.extend(P.attrHooks[C],{get:function(e){var E=e.getAttribute(C,2);return null===E?t:E}})}),P.support.style||(P.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=""+t}}),P.support.optSelected||(P.propHooks.selected=P.extend(P.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),P.support.enctype||(P.propFix.enctype="encoding"),P.support.checkOn||P.each(["radio","checkbox"],function(){P.valHooks[this]={get:function(e){return null===e.getAttribute("value")?"on":e.value}}}),P.each(["radio","checkbox"],function(){P.valHooks[this]=P.extend(P.valHooks[this],{set:function(e,t){if(P.isArray(t))return e.checked=P.inArray(P(e).val(),t)>=0}})});var K=/^(?:textarea|input|select)$/i,J=/^([^\.]*)?(?:\.(.+))?$/,ee=/\bhover(\.\S+)?\b/,te=/^key/,Ce=/^(?:mouse|contextmenu)|click/,Ee=/^(?:focusinfocus|focusoutblur)$/,De=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,Be=function(e){var t=De.exec(e);return t&&(t[1]=(t[1]||"").toLowerCase(),t[3]=t[3]&&new RegExp("(?:^|\\s)"+t[3]+"(?:\\s|$)")),t},Fe=function(e,t){var C=e.attributes||{};return(!t[1]||e.nodeName.toLowerCase()===t[1])&&(!t[2]||(C.id||{}).value===t[2])&&(!t[3]||t[3].test((C["class"]||{}).value))},ne=function(e){return P.event.special.hover?e:e.replace(ee,"mouseenter$1 mouseleave$1")};P.event={add:function(e,C,E,D,B){var F,n,r,a,o,i,A,s,l,c,d;if(3!==e.nodeType&&8!==e.nodeType&&C&&E&&(F=P._data(e))){for(E.handler&&(l=E,E=l.handler),E.guid||(E.guid=P.guid++),r=F.events,r||(F.events=r={}),n=F.handle,n||(F.handle=n=function(e){return"undefined"==typeof P||e&&P.event.triggered===e.type?t:P.event.dispatch.apply(n.elem,arguments)},n.elem=e),C=P.trim(ne(C)).split(" "),a=0;a<C.length;a++)o=J.exec(C[a])||[],i=o[1],A=(o[2]||"").split(".").sort(),d=P.event.special[i]||{},i=(B?d.delegateType:d.bindType)||i,d=P.event.special[i]||{},s=P.extend({type:i,origType:o[1],data:D,handler:E,guid:E.guid,selector:B,quick:Be(B),namespace:A.join(".")},l),c=r[i],c||(c=r[i]=[],c.delegateCount=0,d.setup&&d.setup.call(e,D,A,n)!==!1||(e.addEventListener?e.addEventListener(i,n,!1):e.attachEvent&&e.attachEvent("on"+i,n))),d.add&&(d.add.call(e,s),s.handler.guid||(s.handler.guid=E.guid)),B?c.splice(c.delegateCount++,0,s):c.push(s),P.event.global[i]=!0;e=null}},global:{},remove:function(e,t,C,E,D){var B,F,n,r,a,o,i,A,s,l,c,d,u=P.hasData(e)&&P._data(e);if(u&&(A=u.events)){for(t=P.trim(ne(t||"")).split(" "),B=0;B<t.length;B++)if(F=J.exec(t[B])||[],n=r=F[1],a=F[2],n){for(s=P.event.special[n]||{},n=(E?s.delegateType:s.bindType)||n,c=A[n]||[],o=c.length,a=a?new RegExp("(^|\\.)"+a.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null,i=0;i<c.length;i++)d=c[i],(D||r===d.origType)&&(!C||C.guid===d.guid)&&(!a||a.test(d.namespace))&&(!E||E===d.selector||"**"===E&&d.selector)&&(c.splice(i--,1),d.selector&&c.delegateCount--,s.remove&&s.remove.call(e,d));0===c.length&&o!==c.length&&((!s.teardown||s.teardown.call(e,a)===!1)&&P.removeEvent(e,n,u.handle),delete A[n])}else for(n in A)P.event.remove(e,n+t[B],C,E,!0);P.isEmptyObject(A)&&(l=u.handle,l&&(l.elem=null),P.removeData(e,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(C,E,D,B){if(!D||3!==D.nodeType&&8!==D.nodeType){var F,n,r,a,o,i,A,s,l,c,d=C.type||C,u=[];if(Ee.test(d+P.event.triggered))return;if(d.indexOf("!")>=0&&(d=d.slice(0,-1),n=!0),d.indexOf(".")>=0&&(u=d.split("."),d=u.shift(),u.sort()),(!D||P.event.customEvent[d])&&!P.event.global[d])return;if(C="object"==typeof C?C[P.expando]?C:new P.Event(d,C):new P.Event(d),C.type=d,C.isTrigger=!0,C.exclusive=n,C.namespace=u.join("."),C.namespace_re=C.namespace?new RegExp("(^|\\.)"+u.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,i=d.indexOf(":")<0?"on"+d:"",!D){F=P.cache;for(r in F)F[r].events&&F[r].events[d]&&P.event.trigger(C,E,F[r].handle.elem,!0);return}if(C.result=t,C.target||(C.target=D),E=null!=E?P.makeArray(E):[],E.unshift(C),A=P.event.special[d]||{},A.trigger&&A.trigger.apply(D,E)===!1)return;if(l=[[D,A.bindType||d]],!B&&!A.noBubble&&!P.isWindow(D)){for(c=A.delegateType||d,a=Ee.test(c+d)?D:D.parentNode,o=null;a;a=a.parentNode)l.push([a,c]),o=a;o&&o===D.ownerDocument&&l.push([o.defaultView||o.parentWindow||e,c])}for(r=0;r<l.length&&!C.isPropagationStopped();r++)a=l[r][0],C.type=l[r][1],s=(P._data(a,"events")||{})[C.type]&&P._data(a,"handle"),s&&s.apply(a,E),s=i&&a[i],s&&P.acceptData(a)&&s.apply(a,E)===!1&&C.preventDefault();return C.type=d,!B&&!C.isDefaultPrevented()&&(!A._default||A._default.apply(D.ownerDocument,E)===!1)&&("click"!==d||!P.nodeName(D,"a"))&&P.acceptData(D)&&i&&D[d]&&("focus"!==d&&"blur"!==d||0!==C.target.offsetWidth)&&!P.isWindow(D)&&(o=D[i],o&&(D[i]=null),P.event.triggered=d,D[d](),P.event.triggered=t,o&&(D[i]=o)),C.result}},dispatch:function(C){C=P.event.fix(C||e.event);var E,D,B,F,n,r,a,o,i,A,s=(P._data(this,"events")||{})[C.type]||[],l=s.delegateCount,c=[].slice.call(arguments,0),d=!C.exclusive&&!C.namespace,u=[];if(c[0]=C,C.delegateTarget=this,l&&!C.target.disabled&&(!C.button||"click"!==C.type))for(F=P(this),F.context=this.ownerDocument||this,B=C.target;B!=this;B=B.parentNode||this){for(r={},o=[],F[0]=B,E=0;E<l;E++)i=s[E],A=i.selector,r[A]===t&&(r[A]=i.quick?Fe(B,i.quick):F.is(A)),r[A]&&o.push(i);o.length&&u.push({elem:B,matches:o})}for(s.length>l&&u.push({elem:this,matches:s.slice(l)}),E=0;E<u.length&&!C.isPropagationStopped();E++)for(a=u[E],C.currentTarget=a.elem,D=0;D<a.matches.length&&!C.isImmediatePropagationStopped();D++)i=a.matches[D],(d||!C.namespace&&!i.namespace||C.namespace_re&&C.namespace_re.test(i.namespace))&&(C.data=i.data,C.handleObj=i,n=((P.event.special[i.origType]||{}).handle||i.handler).apply(a.elem,c),n!==t&&(C.result=n,n===!1&&(C.preventDefault(),C.stopPropagation())));return C.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,C){var E,D,B,F=C.button,n=C.fromElement;return null==e.pageX&&null!=C.clientX&&(E=e.target.ownerDocument||_,D=E.documentElement,B=E.body,e.pageX=C.clientX+(D&&D.scrollLeft||B&&B.scrollLeft||0)-(D&&D.clientLeft||B&&B.clientLeft||0),e.pageY=C.clientY+(D&&D.scrollTop||B&&B.scrollTop||0)-(D&&D.clientTop||B&&B.clientTop||0)),!e.relatedTarget&&n&&(e.relatedTarget=n===e.target?C.toElement:n),!e.which&&F!==t&&(e.which=1&F?1:2&F?3:4&F?2:0),e}},fix:function(e){if(e[P.expando])return e;var C,E,D=e,B=P.event.fixHooks[e.type]||{},F=B.props?this.props.concat(B.props):this.props;for(e=P.Event(D),C=F.length;C;)E=F[--C],e[E]=D[E];return e.target||(e.target=D.srcElement||_),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey===t&&(e.metaKey=e.ctrlKey),B.filter?B.filter(e,D):e},special:{ready:{setup:P.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,C){P.isWindow(this)&&(this.onbeforeunload=C)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,C,E){var D=P.extend(new P.Event,C,{type:e,isSimulated:!0,originalEvent:{}});E?P.event.trigger(D,null,t):P.event.dispatch.call(t,D),D.isDefaultPrevented()&&C.preventDefault()}},P.event.handle=P.event.dispatch,P.removeEvent=_.removeEventListener?function(e,t,C){e.removeEventListener&&e.removeEventListener(t,C,!1)}:function(e,t,C){e.detachEvent&&e.detachEvent("on"+t,C)},P.Event=function(e,t){return this instanceof P.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?w:T):this.type=e,t&&P.extend(this,t),this.timeStamp=e&&e.timeStamp||P.now(),this[P.expando]=!0,void 0):new P.Event(e,t)},P.Event.prototype={preventDefault:function(){this.isDefaultPrevented=w;var e=this.originalEvent;!e||(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=w;var e=this.originalEvent;!e||(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=w,this.stopPropagation()},isDefaultPrevented:T,isPropagationStopped:T,isImmediatePropagationStopped:T},P.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){P.event.special[e]={delegateType:t,bindType:t,handle:function(e){var C,E=this,D=e.relatedTarget,B=e.handleObj;B.selector;return D&&(D===E||P.contains(E,D))||(e.type=B.origType,C=B.handler.apply(this,arguments),e.type=t),C}}}),P.support.submitBubbles||(P.event.special.submit={setup:function(){return!P.nodeName(this,"form")&&void P.event.add(this,"click._submit keypress._submit",function(e){var C=e.target,E=P.nodeName(C,"input")||P.nodeName(C,"button")?C.form:t;E&&!E._submit_attached&&(P.event.add(E,"submit._submit",function(e){this.parentNode&&!e.isTrigger&&P.event.simulate("submit",this.parentNode,e,!0)}),E._submit_attached=!0)})},teardown:function(){return!P.nodeName(this,"form")&&void P.event.remove(this,"._submit")}}),P.support.changeBubbles||(P.event.special.change={setup:function(){return K.test(this.nodeName)?("checkbox"!==this.type&&"radio"!==this.type||(P.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),P.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1,P.event.simulate("change",this,e,!0))})),!1):void P.event.add(this,"beforeactivate._change",function(e){var t=e.target;K.test(t.nodeName)&&!t._change_attached&&(P.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&P.event.simulate("change",this.parentNode,e,!0)}),t._change_attached=!0)})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||"radio"!==t.type&&"checkbox"!==t.type)return e.handleObj.handler.apply(this,arguments)},teardown:function(){return P.event.remove(this,"._change"),K.test(this.nodeName)}}),P.support.focusinBubbles||P.each({focus:"focusin",blur:"focusout"},function(e,t){var C=0,E=function(e){P.event.simulate(t,e.target,P.event.fix(e),!0)};P.event.special[t]={setup:function(){0===C++&&_.addEventListener(e,E,!0)},teardown:function(){0===--C&&_.removeEventListener(e,E,!0)}}}),P.fn.extend({on:function(e,C,E,D,B){var F,n;if("object"==typeof e){"string"!=typeof C&&(E=C,C=t);for(n in e)this.on(n,C,E,e[n],B);return this}if(null==E&&null==D?(D=C,E=C=t):null==D&&("string"==typeof C?(D=E,E=t):(D=E,E=C,C=t)),D===!1)D=T;else if(!D)return this;return 1===B&&(F=D,D=function(e){return P().off(e),F.apply(this,arguments)},D.guid=F.guid||(F.guid=P.guid++)),this.each(function(){P.event.add(this,e,D,E,C)})},one:function(e,t,C,E){return this.on.call(this,e,t,C,E,1)},off:function(e,C,E){if(e&&e.preventDefault&&e.handleObj){var D=e.handleObj;return P(e.delegateTarget).off(D.namespace?D.type+"."+D.namespace:D.type,D.selector,D.handler),this}if("object"==typeof e){for(var B in e)this.off(B,C,e[B]);return this}return C!==!1&&"function"!=typeof C||(E=C,C=t),E===!1&&(E=T),this.each(function(){P.event.remove(this,e,E,C)})},bind:function(e,t,C){return this.on(e,null,t,C)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,C){return P(this.context).on(e,this.selector,t,C),this},die:function(e,t){return P(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,C,E){return this.on(t,e,C,E)},undelegate:function(e,t,C){return 1==arguments.length?this.off(e,"**"):this.off(t,e,C)},trigger:function(e,t){return this.each(function(){P.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return P.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,C=e.guid||P.guid++,E=0,D=function(C){var D=(P._data(this,"lastToggle"+e.guid)||0)%E;return P._data(this,"lastToggle"+e.guid,D+1),C.preventDefault(),t[D].apply(this,arguments)||!1};for(D.guid=C;E<t.length;)t[E++].guid=C;return this.click(D)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),P.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){P.fn[t]=function(e,C){return null==C&&(C=e,e=null),arguments.length>0?this.on(t,null,e,C):this.trigger(t)},P.attrFn&&(P.attrFn[t]=!0),te.test(t)&&(P.event.fixHooks[t]=P.event.keyHooks),Ce.test(t)&&(P.event.fixHooks[t]=P.event.mouseHooks)}),function(){function e(e,t,C,E,B,F){for(var n=0,r=E.length;n<r;n++){var a=E[n];if(a){var o=!1;for(a=a[e];a;){if(a[D]===C){o=E[a.sizset];break}if(1===a.nodeType)if(F||(a[D]=C,a.sizset=n),"string"!=typeof t){if(a===t){o=!0;break}}else if(A.filter(t,[a]).length>0){o=a;break}a=a[e]}E[n]=o}}}function C(e,t,C,E,B,F){for(var n=0,r=E.length;n<r;n++){var a=E[n];if(a){var o=!1;for(a=a[e];a;){if(a[D]===C){o=E[a.sizset];break}if(1===a.nodeType&&!F&&(a[D]=C,a.sizset=n),a.nodeName.toLowerCase()===t){o=a;break}a=a[e]}E[n]=o}}}var E=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,D="sizcache"+(Math.random()+"").replace(".",""),B=0,F=Object.prototype.toString,n=!1,r=!0,a=/\\/g,o=/\r\n/g,i=/\W/;[0,0].sort(function(){return r=!1,0});var A=function(e,t,C,D){C=C||[],t=t||_;var B=t;if(1!==t.nodeType&&9!==t.nodeType)return[];if(!e||"string"!=typeof e)return C;var n,r,a,o,i,s,d,u,h=!0,f=A.isXML(t),m=[],b=e;do if(E.exec(""),n=E.exec(b),n&&(b=n[3],m.push(n[1]),n[2])){o=n[3];break}while(n);if(m.length>1&&c.exec(e))if(2===m.length&&l.relative[m[0]])r=g(m[0]+m[1],t,D);else for(r=l.relative[m[0]]?[t]:A(m.shift(),t);m.length;)e=m.shift(),l.relative[e]&&(e+=m.shift()),r=g(e,r,D);else if(!D&&m.length>1&&9===t.nodeType&&!f&&l.match.ID.test(m[0])&&!l.match.ID.test(m[m.length-1])&&(i=A.find(m.shift(),t,f),t=i.expr?A.filter(i.expr,i.set)[0]:i.set[0]),t)for(i=D?{expr:m.pop(),set:p(D)}:A.find(m.pop(),1!==m.length||"~"!==m[0]&&"+"!==m[0]||!t.parentNode?t:t.parentNode,f),r=i.expr?A.filter(i.expr,i.set):i.set,m.length>0?a=p(r):h=!1;m.length;)s=m.pop(),d=s,l.relative[s]?d=m.pop():s="",null==d&&(d=t),l.relative[s](a,d,f);else a=m=[];if(a||(a=r),a||A.error(s||e),"[object Array]"===F.call(a))if(h)if(t&&1===t.nodeType)for(u=0;null!=a[u];u++)a[u]&&(a[u]===!0||1===a[u].nodeType&&A.contains(t,a[u]))&&C.push(r[u]);else for(u=0;null!=a[u];u++)a[u]&&1===a[u].nodeType&&C.push(r[u]);else C.push.apply(C,a);else p(a,C);return o&&(A(o,B,C,D),A.uniqueSort(C)),C};A.uniqueSort=function(e){if(f&&(n=r,e.sort(f),n))for(var t=1;t<e.length;t++)e[t]===e[t-1]&&e.splice(t--,1);return e},A.matches=function(e,t){return A(e,null,null,t)},A.matchesSelector=function(e,t){return A(t,null,null,[e]).length>0},A.find=function(e,t,C){var E,D,B,F,n,r;if(!e)return[];for(D=0,B=l.order.length;D<B;D++)if(n=l.order[D],(F=l.leftMatch[n].exec(e))&&(r=F[1],F.splice(1,1),"\\"!==r.substr(r.length-1)&&(F[1]=(F[1]||"").replace(a,""),E=l.find[n](F,t,C),null!=E))){e=e.replace(l.match[n],"");break}return E||(E="undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName("*"):[]),{set:E,expr:e}},A.filter=function(e,C,E,D){for(var B,F,n,r,a,o,i,s,c,d=e,u=[],p=C,h=C&&C[0]&&A.isXML(C[0]);e&&C.length;){for(n in l.filter)if(null!=(B=l.leftMatch[n].exec(e))&&B[2]){if(o=l.filter[n],i=B[1],F=!1,B.splice(1,1),"\\"===i.substr(i.length-1))continue;if(p===u&&(u=[]),l.preFilter[n])if(B=l.preFilter[n](B,p,E,u,D,h)){if(B===!0)continue}else F=r=!0;if(B)for(s=0;null!=(a=p[s]);s++)a&&(r=o(a,B,s,p),c=D^r,E&&null!=r?c?F=!0:p[s]=!1:c&&(u.push(a),F=!0));if(r!==t){if(E||(p=u),e=e.replace(l.match[n],""),!F)return[];break}}if(e===d){if(null!=F)break;A.error(e)}d=e}return p},A.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)};var s=A.getText=function(e){var t,C,E=e.nodeType,D="";if(E){if(1===E||9===E){if("string"==typeof e.textContent)return e.textContent;if("string"==typeof e.innerText)return e.innerText.replace(o,"");for(e=e.firstChild;e;e=e.nextSibling)D+=s(e)}else if(3===E||4===E)return e.nodeValue}else for(t=0;C=e[t];t++)8!==C.nodeType&&(D+=s(C));return D},l=A.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(e){return e.getAttribute("href")},type:function(e){return e.getAttribute("type")}},relative:{
"+":function(e,t){var C="string"==typeof t,E=C&&!i.test(t),D=C&&!E;E&&(t=t.toLowerCase());for(var B,F=0,n=e.length;F<n;F++)if(B=e[F]){for(;(B=B.previousSibling)&&1!==B.nodeType;);e[F]=D||B&&B.nodeName.toLowerCase()===t?B||!1:B===t}D&&A.filter(t,e,!0)},">":function(e,t){var C,E="string"==typeof t,D=0,B=e.length;if(E&&!i.test(t)){for(t=t.toLowerCase();D<B;D++)if(C=e[D]){var F=C.parentNode;e[D]=F.nodeName.toLowerCase()===t&&F}}else{for(;D<B;D++)C=e[D],C&&(e[D]=E?C.parentNode:C.parentNode===t);E&&A.filter(t,e,!0)}},"":function(t,E,D){var F,n=B++,r=e;"string"==typeof E&&!i.test(E)&&(E=E.toLowerCase(),F=E,r=C),r("parentNode",E,n,t,F,D)},"~":function(t,E,D){var F,n=B++,r=e;"string"==typeof E&&!i.test(E)&&(E=E.toLowerCase(),F=E,r=C),r("previousSibling",E,n,t,F,D)}},find:{ID:function(e,t,C){if("undefined"!=typeof t.getElementById&&!C){var E=t.getElementById(e[1]);return E&&E.parentNode?[E]:[]}},NAME:function(e,t){if("undefined"!=typeof t.getElementsByName){for(var C=[],E=t.getElementsByName(e[1]),D=0,B=E.length;D<B;D++)E[D].getAttribute("name")===e[1]&&C.push(E[D]);return 0===C.length?null:C}},TAG:function(e,t){if("undefined"!=typeof t.getElementsByTagName)return t.getElementsByTagName(e[1])}},preFilter:{CLASS:function(e,t,C,E,D,B){if(e=" "+e[1].replace(a,"")+" ",B)return e;for(var F,n=0;null!=(F=t[n]);n++)F&&(D^(F.className&&(" "+F.className+" ").replace(/[\t\n\r]/g," ").indexOf(e)>=0)?C||E.push(F):C&&(t[n]=!1));return!1},ID:function(e){return e[1].replace(a,"")},TAG:function(e,t){return e[1].replace(a,"").toLowerCase()},CHILD:function(e){if("nth"===e[1]){e[2]||A.error(e[0]),e[2]=e[2].replace(/^\+|\s*/g,"");var t=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec("even"===e[2]&&"2n"||"odd"===e[2]&&"2n+1"||!/\D/.test(e[2])&&"0n+"+e[2]||e[2]);e[2]=t[1]+(t[2]||1)-0,e[3]=t[3]-0}else e[2]&&A.error(e[0]);return e[0]=B++,e},ATTR:function(e,t,C,E,D,B){var F=e[1]=e[1].replace(a,"");return!B&&l.attrMap[F]&&(e[1]=l.attrMap[F]),e[4]=(e[4]||e[5]||"").replace(a,""),"~="===e[2]&&(e[4]=" "+e[4]+" "),e},PSEUDO:function(e,t,C,D,B){if("not"===e[1]){if(!((E.exec(e[3])||"").length>1||/^\w/.test(e[3]))){var F=A.filter(e[3],t,C,!0^B);return C||D.push.apply(D,F),!1}e[3]=A(e[3],null,null,t)}else if(l.match.POS.test(e[0])||l.match.CHILD.test(e[0]))return!0;return e},POS:function(e){return e.unshift(!0),e}},filters:{enabled:function(e){return e.disabled===!1&&"hidden"!==e.type},disabled:function(e){return e.disabled===!0},checked:function(e){return e.checked===!0},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!!e.firstChild},empty:function(e){return!e.firstChild},has:function(e,t,C){return!!A(C[3],e).length},header:function(e){return/h\d/i.test(e.nodeName)},text:function(e){var t=e.getAttribute("type"),C=e.type;return"input"===e.nodeName.toLowerCase()&&"text"===C&&(t===C||null===t)},radio:function(e){return"input"===e.nodeName.toLowerCase()&&"radio"===e.type},checkbox:function(e){return"input"===e.nodeName.toLowerCase()&&"checkbox"===e.type},file:function(e){return"input"===e.nodeName.toLowerCase()&&"file"===e.type},password:function(e){return"input"===e.nodeName.toLowerCase()&&"password"===e.type},submit:function(e){var t=e.nodeName.toLowerCase();return("input"===t||"button"===t)&&"submit"===e.type},image:function(e){return"input"===e.nodeName.toLowerCase()&&"image"===e.type},reset:function(e){var t=e.nodeName.toLowerCase();return("input"===t||"button"===t)&&"reset"===e.type},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},input:function(e){return/input|select|textarea|button/i.test(e.nodeName)},focus:function(e){return e===e.ownerDocument.activeElement}},setFilters:{first:function(e,t){return 0===t},last:function(e,t,C,E){return t===E.length-1},even:function(e,t){return t%2===0},odd:function(e,t){return t%2===1},lt:function(e,t,C){return t<C[3]-0},gt:function(e,t,C){return t>C[3]-0},nth:function(e,t,C){return C[3]-0===t},eq:function(e,t,C){return C[3]-0===t}},filter:{PSEUDO:function(e,t,C,E){var D=t[1],B=l.filters[D];if(B)return B(e,C,t,E);if("contains"===D)return(e.textContent||e.innerText||s([e])||"").indexOf(t[3])>=0;if("not"===D){for(var F=t[3],n=0,r=F.length;n<r;n++)if(F[n]===e)return!1;return!0}A.error(D)},CHILD:function(e,t){var C,E,B,F,n,r,a=t[1],o=e;switch(a){case"only":case"first":for(;o=o.previousSibling;)if(1===o.nodeType)return!1;if("first"===a)return!0;o=e;case"last":for(;o=o.nextSibling;)if(1===o.nodeType)return!1;return!0;case"nth":if(C=t[2],E=t[3],1===C&&0===E)return!0;if(B=t[0],F=e.parentNode,F&&(F[D]!==B||!e.nodeIndex)){for(n=0,o=F.firstChild;o;o=o.nextSibling)1===o.nodeType&&(o.nodeIndex=++n);F[D]=B}return r=e.nodeIndex-E,0===C?0===r:r%C===0&&r/C>=0}},ID:function(e,t){return 1===e.nodeType&&e.getAttribute("id")===t},TAG:function(e,t){return"*"===t&&1===e.nodeType||!!e.nodeName&&e.nodeName.toLowerCase()===t},CLASS:function(e,t){return(" "+(e.className||e.getAttribute("class"))+" ").indexOf(t)>-1},ATTR:function(e,t){var C=t[1],E=A.attr?A.attr(e,C):l.attrHandle[C]?l.attrHandle[C](e):null!=e[C]?e[C]:e.getAttribute(C),D=E+"",B=t[2],F=t[4];return null==E?"!="===B:!B&&A.attr?null!=E:"="===B?D===F:"*="===B?D.indexOf(F)>=0:"~="===B?(" "+D+" ").indexOf(F)>=0:F?"!="===B?D!==F:"^="===B?0===D.indexOf(F):"$="===B?D.substr(D.length-F.length)===F:"|="===B&&(D===F||D.substr(0,F.length+1)===F+"-"):D&&E!==!1},POS:function(e,t,C,E){var D=t[2],B=l.setFilters[D];if(B)return B(e,C,t,E)}}},c=l.match.POS,d=function(e,t){return"\\"+(t-0+1)};for(var u in l.match)l.match[u]=new RegExp(l.match[u].source+/(?![^\[]*\])(?![^\(]*\))/.source),l.leftMatch[u]=new RegExp(/(^(?:.|\r|\n)*?)/.source+l.match[u].source.replace(/\\(\d+)/g,d));var p=function(e,t){return e=Array.prototype.slice.call(e,0),t?(t.push.apply(t,e),t):e};try{Array.prototype.slice.call(_.documentElement.childNodes,0)[0].nodeType}catch(h){p=function(e,t){var C=0,E=t||[];if("[object Array]"===F.call(e))Array.prototype.push.apply(E,e);else if("number"==typeof e.length)for(var D=e.length;C<D;C++)E.push(e[C]);else for(;e[C];C++)E.push(e[C]);return E}}var f,m;_.documentElement.compareDocumentPosition?f=function(e,t){return e===t?(n=!0,0):e.compareDocumentPosition&&t.compareDocumentPosition?4&e.compareDocumentPosition(t)?-1:1:e.compareDocumentPosition?-1:1}:(f=function(e,t){if(e===t)return n=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var C,E,D=[],B=[],F=e.parentNode,r=t.parentNode,a=F;if(F===r)return m(e,t);if(!F)return-1;if(!r)return 1;for(;a;)D.unshift(a),a=a.parentNode;for(a=r;a;)B.unshift(a),a=a.parentNode;C=D.length,E=B.length;for(var o=0;o<C&&o<E;o++)if(D[o]!==B[o])return m(D[o],B[o]);return o===C?m(e,B[o],-1):m(D[o],t,1)},m=function(e,t,C){if(e===t)return C;for(var E=e.nextSibling;E;){if(E===t)return-1;E=E.nextSibling}return 1}),function(){var e=_.createElement("div"),C="script"+(new Date).getTime(),E=_.documentElement;e.innerHTML="<a name='"+C+"'/>",E.insertBefore(e,E.firstChild),_.getElementById(C)&&(l.find.ID=function(e,C,E){if("undefined"!=typeof C.getElementById&&!E){var D=C.getElementById(e[1]);return D?D.id===e[1]||"undefined"!=typeof D.getAttributeNode&&D.getAttributeNode("id").nodeValue===e[1]?[D]:t:[]}},l.filter.ID=function(e,t){var C="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return 1===e.nodeType&&C&&C.nodeValue===t}),E.removeChild(e),E=e=null}(),function(){var e=_.createElement("div");e.appendChild(_.createComment("")),e.getElementsByTagName("*").length>0&&(l.find.TAG=function(e,t){var C=t.getElementsByTagName(e[1]);if("*"===e[1]){for(var E=[],D=0;C[D];D++)1===C[D].nodeType&&E.push(C[D]);C=E}return C}),e.innerHTML="<a href='#'></a>",e.firstChild&&"undefined"!=typeof e.firstChild.getAttribute&&"#"!==e.firstChild.getAttribute("href")&&(l.attrHandle.href=function(e){return e.getAttribute("href",2)}),e=null}(),_.querySelectorAll&&function(){var e=A,t=_.createElement("div"),C="__sizzle__";if(t.innerHTML="<p class='TEST'></p>",!t.querySelectorAll||0!==t.querySelectorAll(".TEST").length){A=function(t,E,D,B){if(E=E||_,!B&&!A.isXML(E)){var F=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(t);if(F&&(1===E.nodeType||9===E.nodeType)){if(F[1])return p(E.getElementsByTagName(t),D);if(F[2]&&l.find.CLASS&&E.getElementsByClassName)return p(E.getElementsByClassName(F[2]),D)}if(9===E.nodeType){if("body"===t&&E.body)return p([E.body],D);if(F&&F[3]){var n=E.getElementById(F[3]);if(!n||!n.parentNode)return p([],D);if(n.id===F[3])return p([n],D)}try{return p(E.querySelectorAll(t),D)}catch(r){}}else if(1===E.nodeType&&"object"!==E.nodeName.toLowerCase()){var a=E,o=E.getAttribute("id"),i=o||C,s=E.parentNode,c=/^\s*[+~]/.test(t);o?i=i.replace(/'/g,"\\$&"):E.setAttribute("id",i),c&&s&&(E=E.parentNode);try{if(!c||s)return p(E.querySelectorAll("[id='"+i+"'] "+t),D)}catch(d){}finally{o||a.removeAttribute("id")}}}return e(t,E,D,B)};for(var E in e)A[E]=e[E];t=null}}(),function(){var e=_.documentElement,t=e.matchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.msMatchesSelector;if(t){var C=!t.call(_.createElement("div"),"div"),E=!1;try{t.call(_.documentElement,"[test!='']:sizzle")}catch(D){E=!0}A.matchesSelector=function(e,D){if(D=D.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']"),!A.isXML(e))try{if(E||!l.match.PSEUDO.test(D)&&!/!=/.test(D)){var B=t.call(e,D);if(B||!C||e.document&&11!==e.document.nodeType)return B}}catch(F){}return A(D,null,null,[e]).length>0}}}(),function(){var e=_.createElement("div");if(e.innerHTML="<div class='test e'></div><div class='test'></div>",e.getElementsByClassName&&0!==e.getElementsByClassName("e").length){if(e.lastChild.className="e",1===e.getElementsByClassName("e").length)return;l.order.splice(1,0,"CLASS"),l.find.CLASS=function(e,t,C){if("undefined"!=typeof t.getElementsByClassName&&!C)return t.getElementsByClassName(e[1])},e=null}}(),_.documentElement.contains?A.contains=function(e,t){return e!==t&&(!e.contains||e.contains(t))}:_.documentElement.compareDocumentPosition?A.contains=function(e,t){return!!(16&e.compareDocumentPosition(t))}:A.contains=function(){return!1},A.isXML=function(e){var t=(e?e.ownerDocument||e:0).documentElement;return!!t&&"HTML"!==t.nodeName};var g=function(e,t,C){for(var E,D=[],B="",F=t.nodeType?[t]:t;E=l.match.PSEUDO.exec(e);)B+=E[0],e=e.replace(l.match.PSEUDO,"");e=l.relative[e]?e+"*":e;for(var n=0,r=F.length;n<r;n++)A(e,F[n],D,C);return A.filter(B,D)};A.attr=P.attr,A.selectors.attrMap={},P.find=A,P.expr=A.selectors,P.expr[":"]=P.expr.filters,P.unique=A.uniqueSort,P.text=A.getText,P.isXMLDoc=A.isXML,P.contains=A.contains}();var re=/Until$/,ae=/^(?:parents|prevUntil|prevAll)/,oe=/,/,ie=/^.[^:#\[\.,]*$/,Ae=Array.prototype.slice,se=P.expr.match.POS,le={children:!0,contents:!0,next:!0,prev:!0};P.fn.extend({find:function(e){var t,C,E=this;if("string"!=typeof e)return P(e).filter(function(){for(t=0,C=E.length;t<C;t++)if(P.contains(E[t],this))return!0});var D,B,F,n=this.pushStack("","find",e);for(t=0,C=this.length;t<C;t++)if(D=n.length,P.find(e,this[t],n),t>0)for(B=D;B<n.length;B++)for(F=0;F<D;F++)if(n[F]===n[B]){n.splice(B--,1);break}return n},has:function(e){var t=P(e);return this.filter(function(){for(var e=0,C=t.length;e<C;e++)if(P.contains(this,t[e]))return!0})},not:function(e){return this.pushStack(v(this,e,!1),"not",e)},filter:function(e){return this.pushStack(v(this,e,!0),"filter",e)},is:function(e){return!!e&&("string"==typeof e?se.test(e)?P(e,this.context).index(this[0])>=0:P.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var C,E,D=[],B=this[0];if(P.isArray(e)){for(var F=1;B&&B.ownerDocument&&B!==t;){for(C=0;C<e.length;C++)P(B).is(e[C])&&D.push({selector:e[C],elem:B,level:F});B=B.parentNode,F++}return D}var n=se.test(e)||"string"!=typeof e?P(e,t||this.context):0;for(C=0,E=this.length;C<E;C++)for(B=this[C];B;){if(n?n.index(B)>-1:P.find.matchesSelector(B,e)){D.push(B);break}if(B=B.parentNode,!B||!B.ownerDocument||B===t||11===B.nodeType)break}return D=D.length>1?P.unique(D):D,this.pushStack(D,"closest",e)},index:function(e){return e?"string"==typeof e?P.inArray(this[0],P(e)):P.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var C="string"==typeof e?P(e,t):P.makeArray(e&&e.nodeType?[e]:e),E=P.merge(this.get(),C);return this.pushStack(x(C[0])||x(E[0])?E:P.unique(E))},andSelf:function(){return this.add(this.prevObject)}}),P.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return P.dir(e,"parentNode")},parentsUntil:function(e,t,C){return P.dir(e,"parentNode",C)},next:function(e){return P.nth(e,2,"nextSibling")},prev:function(e){return P.nth(e,2,"previousSibling")},nextAll:function(e){return P.dir(e,"nextSibling")},prevAll:function(e){return P.dir(e,"previousSibling")},nextUntil:function(e,t,C){return P.dir(e,"nextSibling",C)},prevUntil:function(e,t,C){return P.dir(e,"previousSibling",C)},siblings:function(e){return P.sibling(e.parentNode.firstChild,e)},children:function(e){return P.sibling(e.firstChild)},contents:function(e){return P.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:P.makeArray(e.childNodes)}},function(e,t){P.fn[e]=function(C,E){var D=P.map(this,t,C);return re.test(e)||(E=C),E&&"string"==typeof E&&(D=P.filter(E,D)),D=this.length>1&&!le[e]?P.unique(D):D,(this.length>1||oe.test(E))&&ae.test(e)&&(D=D.reverse()),this.pushStack(D,e,Ae.call(arguments).join(","))}}),P.extend({filter:function(e,t,C){return C&&(e=":not("+e+")"),1===t.length?P.find.matchesSelector(t[0],e)?[t[0]]:[]:P.find.matches(e,t)},dir:function(e,C,E){for(var D=[],B=e[C];B&&9!==B.nodeType&&(E===t||1!==B.nodeType||!P(B).is(E));)1===B.nodeType&&D.push(B),B=B[C];return D},nth:function(e,t,C,E){t=t||1;for(var D=0;e&&(1!==e.nodeType||++D!==t);e=e[C]);return e},sibling:function(e,t){for(var C=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&C.push(e);return C}});var ce="abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",de=/ jQuery\d+="(?:\d+|null)"/g,ue=/^\s+/,pe=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,he=/<([\w:]+)/,fe=/<tbody/i,me=/<|&#?\w+;/,ge=/<(?:script|style)/i,be=/<(?:script|object|embed|option|style)/i,ye=new RegExp("<(?:"+ce+")","i"),ve=/checked\s*(?:[^=]|=\s*.checked.)/i,xe=/\/(java|ecma)script/i,we=/^\s*<!(?:\[CDATA\[|\-\-)/,Te={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Se=y(_);Te.optgroup=Te.option,Te.tbody=Te.tfoot=Te.colgroup=Te.caption=Te.thead,Te.th=Te.td,P.support.htmlSerialize||(Te._default=[1,"div<div>","</div>"]),P.fn.extend({text:function(e){return P.isFunction(e)?this.each(function(t){var C=P(this);C.text(e.call(this,t,C.text()))}):"object"!=typeof e&&e!==t?this.empty().append((this[0]&&this[0].ownerDocument||_).createTextNode(e)):P.text(this)},wrapAll:function(e){if(P.isFunction(e))return this.each(function(t){P(this).wrapAll(e.call(this,t))});if(this[0]){var t=P(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstChild&&1===e.firstChild.nodeType;)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return P.isFunction(e)?this.each(function(t){P(this).wrapInner(e.call(this,t))}):this.each(function(){var t=P(this),C=t.contents();C.length?C.wrapAll(e):t.append(e)})},wrap:function(e){var t=P.isFunction(e);return this.each(function(C){P(this).wrapAll(t?e.call(this,C):e)})},unwrap:function(){return this.parent().each(function(){P.nodeName(this,"body")||P(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){1===this.nodeType&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){1===this.nodeType&&this.insertBefore(e,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=P.clean(arguments);return e.push.apply(e,this.toArray()),this.pushStack(e,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=this.pushStack(this,"after",arguments);return e.push.apply(e,P.clean(arguments)),e}},remove:function(e,t){for(var C,E=0;null!=(C=this[E]);E++)e&&!P.filter(e,[C]).length||(!t&&1===C.nodeType&&(P.cleanData(C.getElementsByTagName("*")),P.cleanData([C])),C.parentNode&&C.parentNode.removeChild(C));return this},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)for(1===e.nodeType&&P.cleanData(e.getElementsByTagName("*"));e.firstChild;)e.removeChild(e.firstChild);return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return P.clone(this,e,t)})},html:function(e){if(e===t)return this[0]&&1===this[0].nodeType?this[0].innerHTML.replace(de,""):null;if("string"!=typeof e||ge.test(e)||!P.support.leadingWhitespace&&ue.test(e)||Te[(he.exec(e)||["",""])[1].toLowerCase()])P.isFunction(e)?this.each(function(t){var C=P(this);C.html(e.call(this,t,C.html()))}):this.empty().append(e);else{e=e.replace(pe,"<$1></$2>");try{for(var C=0,E=this.length;C<E;C++)1===this[C].nodeType&&(P.cleanData(this[C].getElementsByTagName("*")),this[C].innerHTML=e)}catch(D){this.empty().append(e)}}return this},replaceWith:function(e){return this[0]&&this[0].parentNode?P.isFunction(e)?this.each(function(t){var C=P(this),E=C.html();C.replaceWith(e.call(this,t,E))}):("string"!=typeof e&&(e=P(e).detach()),this.each(function(){var t=this.nextSibling,C=this.parentNode;P(this).remove(),t?P(t).before(e):P(C).append(e)})):this.length?this.pushStack(P(P.isFunction(e)?e():e),"replaceWith",e):this},detach:function(e){return this.remove(e,!0)},domManip:function(e,C,E){var D,B,F,n,r=e[0],a=[];if(!P.support.checkClone&&3===arguments.length&&"string"==typeof r&&ve.test(r))return this.each(function(){P(this).domManip(e,C,E,!0)});if(P.isFunction(r))return this.each(function(D){var B=P(this);e[0]=r.call(this,D,C?B.html():t),B.domManip(e,C,E)});if(this[0]){if(n=r&&r.parentNode,D=P.support.parentNode&&n&&11===n.nodeType&&n.childNodes.length===this.length?{fragment:n}:P.buildFragment(e,this,a),F=D.fragment,B=1===F.childNodes.length?F=F.firstChild:F.firstChild,B){C=C&&P.nodeName(B,"tr");for(var o=0,i=this.length,A=i-1;o<i;o++)E.call(C?b(this[o],B):this[o],D.cacheable||i>1&&o<A?P.clone(F,!0,!0):F)}a.length&&P.each(a,d)}return this}}),P.buildFragment=function(e,t,C){var E,D,B,F,n=e[0];return t&&t[0]&&(F=t[0].ownerDocument||t[0]),F.createDocumentFragment||(F=_),1===e.length&&"string"==typeof n&&n.length<512&&F===_&&"<"===n.charAt(0)&&!be.test(n)&&(P.support.checkClone||!ve.test(n))&&(P.support.html5Clone||!ye.test(n))&&(D=!0,B=P.fragments[n],B&&1!==B&&(E=B)),E||(E=F.createDocumentFragment(),P.clean(e,F,E,C)),D&&(P.fragments[n]=B?E:1),{fragment:E,cacheable:D}},P.fragments={},P.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){P.fn[e]=function(C){var E=[],D=P(C),B=1===this.length&&this[0].parentNode;if(B&&11===B.nodeType&&1===B.childNodes.length&&1===D.length)return D[t](this[0]),this;for(var F=0,n=D.length;F<n;F++){var r=(F>0?this.clone(!0):this).get();P(D[F])[t](r),E=E.concat(r)}return this.pushStack(E,e,D.selector)}}),P.extend({clone:function(e,t,C){var E,D,B,F=P.support.html5Clone||!ye.test("<"+e.nodeName)?e.cloneNode(!0):u(e);if(!(P.support.noCloneEvent&&P.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||P.isXMLDoc(e)))for(m(e,F),E=f(e),D=f(F),B=0;E[B];++B)D[B]&&m(E[B],D[B]);if(t&&(g(e,F),C))for(E=f(e),D=f(F),B=0;E[B];++B)g(E[B],D[B]);return E=D=null,F},clean:function(e,t,C,E){var D;t=t||_,"undefined"==typeof t.createElement&&(t=t.ownerDocument||t[0]&&t[0].ownerDocument||_);for(var B,F,n=[],r=0;null!=(F=e[r]);r++)if("number"==typeof F&&(F+=""),F){if("string"==typeof F)if(me.test(F)){F=F.replace(pe,"<$1></$2>");var a=(he.exec(F)||["",""])[1].toLowerCase(),o=Te[a]||Te._default,i=o[0],A=t.createElement("div");for(t===_?Se.appendChild(A):y(t).appendChild(A),A.innerHTML=o[1]+F+o[2];i--;)A=A.lastChild;if(!P.support.tbody){var s=fe.test(F),l="table"!==a||s?"<table>"!==o[1]||s?[]:A.childNodes:A.firstChild&&A.firstChild.childNodes;for(B=l.length-1;B>=0;--B)P.nodeName(l[B],"tbody")&&!l[B].childNodes.length&&l[B].parentNode.removeChild(l[B])}!P.support.leadingWhitespace&&ue.test(F)&&A.insertBefore(t.createTextNode(ue.exec(F)[0]),A.firstChild),F=A.childNodes}else F=t.createTextNode(F);var c;if(!P.support.appendChecked)if(F[0]&&"number"==typeof(c=F.length))for(B=0;B<c;B++)p(F[B]);else p(F);F.nodeType?n.push(F):n=P.merge(n,F)}if(C)for(D=function(e){return!e.type||xe.test(e.type)},r=0;n[r];r++)if(!E||!P.nodeName(n[r],"script")||n[r].type&&"text/javascript"!==n[r].type.toLowerCase()){if(1===n[r].nodeType){var d=P.grep(n[r].getElementsByTagName("script"),D);n.splice.apply(n,[r+1,0].concat(d))}C.appendChild(n[r])}else E.push(n[r].parentNode?n[r].parentNode.removeChild(n[r]):n[r]);return n},cleanData:function(e){for(var t,C,E,D=P.cache,B=P.event.special,F=P.support.deleteExpando,n=0;null!=(E=e[n]);n++)if((!E.nodeName||!P.noData[E.nodeName.toLowerCase()])&&(C=E[P.expando])){if(t=D[C],t&&t.events){for(var r in t.events)B[r]?P.event.remove(E,r):P.removeEvent(E,r,t.handle);t.handle&&(t.handle.elem=null)}F?delete E[P.expando]:E.removeAttribute&&E.removeAttribute(P.expando),delete D[C]}}});var ke,$e,Ne,_e=/alpha\([^)]*\)/i,je=/opacity=([^)]*)/,Me=/([A-Z]|^ms)/g,Pe=/^-?\d+(?:px)?$/i,Le=/^-?\d/,ze=/^([\-+])=([\-+.\de]+)/,Oe={position:"absolute",visibility:"hidden",display:"block"},Ie=["Left","Right"],Xe=["Top","Bottom"];P.fn.css=function(e,C){return 2===arguments.length&&C===t?this:P.access(this,e,C,!0,function(e,C,E){return E!==t?P.style(e,C,E):P.css(e,C)})},P.extend({cssHooks:{opacity:{get:function(e,t){if(t){var C=ke(e,"opacity","opacity");return""===C?"1":C}return e.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":P.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,C,E,D){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var B,F,n=P.camelCase(C),r=e.style,a=P.cssHooks[n];if(C=P.cssProps[n]||n,E===t)return a&&"get"in a&&(B=a.get(e,!1,D))!==t?B:r[C];if(F=typeof E,"string"===F&&(B=ze.exec(E))&&(E=+(B[1]+1)*+B[2]+parseFloat(P.css(e,C)),F="number"),null==E||"number"===F&&isNaN(E))return;if("number"===F&&!P.cssNumber[n]&&(E+="px"),!(a&&"set"in a&&(E=a.set(e,E))===t))try{r[C]=E}catch(o){}}},css:function(e,C,E){var D,B;return C=P.camelCase(C),B=P.cssHooks[C],C=P.cssProps[C]||C,"cssFloat"===C&&(C="float"),B&&"get"in B&&(D=B.get(e,!0,E))!==t?D:ke?ke(e,C):void 0},swap:function(e,t,C){var E={};for(var D in t)E[D]=e.style[D],e.style[D]=t[D];C.call(e);for(D in t)e.style[D]=E[D]}}),P.curCSS=P.css,P.each(["height","width"],function(e,t){P.cssHooks[t]={get:function(e,C,E){var D;if(C)return 0!==e.offsetWidth?c(e,t,E):(P.swap(e,Oe,function(){D=c(e,t,E)}),D)},set:function(e,t){return Pe.test(t)?(t=parseFloat(t),t>=0?t+"px":void 0):t}}}),P.support.opacity||(P.cssHooks.opacity={get:function(e,t){return je.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?parseFloat(RegExp.$1)/100+"":t?"1":""},set:function(e,t){var C=e.style,E=e.currentStyle,D=P.isNumeric(t)?"alpha(opacity="+100*t+")":"",B=E&&E.filter||C.filter||"";C.zoom=1,t>=1&&""===P.trim(B.replace(_e,""))&&(C.removeAttribute("filter"),E&&!E.filter)||(C.filter=_e.test(B)?B.replace(_e,D):B+" "+D)}}),P(function(){P.support.reliableMarginRight||(P.cssHooks.marginRight={get:function(e,t){var C;return P.swap(e,{display:"inline-block"},function(){C=t?ke(e,"margin-right","marginRight"):e.style.marginRight}),C}})}),_.defaultView&&_.defaultView.getComputedStyle&&($e=function(e,t){var C,E,D;return t=t.replace(Me,"-$1").toLowerCase(),(E=e.ownerDocument.defaultView)&&(D=E.getComputedStyle(e,null))&&(C=D.getPropertyValue(t),""===C&&!P.contains(e.ownerDocument.documentElement,e)&&(C=P.style(e,t))),C}),_.documentElement.currentStyle&&(Ne=function(e,t){var C,E,D,B=e.currentStyle&&e.currentStyle[t],F=e.style;return null===B&&F&&(D=F[t])&&(B=D),!Pe.test(B)&&Le.test(B)&&(C=F.left,E=e.runtimeStyle&&e.runtimeStyle.left,E&&(e.runtimeStyle.left=e.currentStyle.left),F.left="fontSize"===t?"1em":B||0,B=F.pixelLeft+"px",F.left=C,E&&(e.runtimeStyle.left=E)),""===B?"auto":B}),ke=$e||Ne,P.expr&&P.expr.filters&&(P.expr.filters.hidden=function(e){var t=e.offsetWidth,C=e.offsetHeight;return 0===t&&0===C||!P.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||P.css(e,"display"))},P.expr.filters.visible=function(e){return!P.expr.filters.hidden(e)});var Ye,qe,He=/%20/g,Re=/\[\]$/,We=/\r?\n/g,Ue=/#.*$/,Ve=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Ze=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,Qe=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,Ge=/^(?:GET|HEAD)$/,Ke=/^\/\//,Je=/\?/,et=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,tt=/^(?:select|textarea)/i,Ct=/\s+/,Et=/([?&])_=[^&]*/,Dt=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,Bt=P.fn.load,Ft={},nt={},rt=["*/"]+["*"];try{Ye=M.href}catch(at){Ye=_.createElement("a"),Ye.href="",Ye=Ye.href}qe=Dt.exec(Ye.toLowerCase())||[],P.fn.extend({load:function(e,C,E){if("string"!=typeof e&&Bt)return Bt.apply(this,arguments);if(!this.length)return this;var D=e.indexOf(" ");if(D>=0){var B=e.slice(D,e.length);e=e.slice(0,D)}var F="GET";C&&(P.isFunction(C)?(E=C,C=t):"object"==typeof C&&(C=P.param(C,P.ajaxSettings.traditional),F="POST"));var n=this;return P.ajax({url:e,type:F,dataType:"html",data:C,complete:function(e,t,C){C=e.responseText,e.isResolved()&&(e.done(function(e){C=e}),n.html(B?P("<div>").append(C.replace(et,"")).find(B):C)),E&&n.each(E,[C,t,e])}}),this},serialize:function(){return P.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?P.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||tt.test(this.nodeName)||Ze.test(this.type))}).map(function(e,t){var C=P(this).val();return null==C?null:P.isArray(C)?P.map(C,function(e,C){return{name:t.name,value:e.replace(We,"\r\n")}}):{name:t.name,value:C.replace(We,"\r\n")}}).get()}}),P.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){P.fn[t]=function(e){return this.on(t,e)}}),P.each(["get","post"],function(e,C){P[C]=function(e,E,D,B){return P.isFunction(E)&&(B=B||D,D=E,E=t),P.ajax({type:C,url:e,data:E,success:D,dataType:B})}}),P.extend({getScript:function(e,C){return P.get(e,t,C,"script")},getJSON:function(e,t,C){return P.get(e,t,C,"json")},ajaxSetup:function(e,t){return t?A(e,P.ajaxSettings):(t=e,e=P.ajaxSettings),A(e,t),e},ajaxSettings:{url:Ye,isLocal:Qe.test(qe[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":rt},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":P.parseJSON,"text xml":P.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:l(Ft),ajaxTransport:l(nt),ajax:function(e,C){function E(e,C,E,F){if(2!==b){b=2,r&&clearTimeout(r),n=t,B=F||"",y.readyState=e>0?4:0;var i,s,l,m,g,v=C,x=E?o(c,y,E):t;if(e>=200&&e<300||304===e)if(c.ifModified&&((m=y.getResponseHeader("Last-Modified"))&&(P.lastModified[D]=m),(g=y.getResponseHeader("Etag"))&&(P.etag[D]=g)),304===e)v="notmodified",i=!0;else try{s=a(c,x),v="success",i=!0}catch(w){v="parsererror",l=w}else l=v,v&&!e||(v="error",e<0&&(e=0));y.status=e,y.statusText=""+(C||v),i?p.resolveWith(d,[s,v,y]):p.rejectWith(d,[y,v,l]),y.statusCode(f),f=t,A&&u.trigger("ajax"+(i?"Success":"Error"),[y,c,i?s:l]),h.fireWith(d,[y,v]),A&&(u.trigger("ajaxComplete",[y,c]),--P.active||P.event.trigger("ajaxStop"))}}"object"==typeof e&&(C=e,e=t),C=C||{};var D,B,F,n,r,i,A,l,c=P.ajaxSetup({},C),d=c.context||c,u=d!==c&&(d.nodeType||d instanceof P)?P(d):P.event,p=P.Deferred(),h=P.Callbacks("once memory"),f=c.statusCode||{},m={},g={},b=0,y={readyState:0,setRequestHeader:function(e,t){if(!b){var C=e.toLowerCase();e=g[C]=g[C]||e,m[e]=t}return this},getAllResponseHeaders:function(){return 2===b?B:null},getResponseHeader:function(e){var C;if(2===b){if(!F)for(F={};C=Ve.exec(B);)F[C[1].toLowerCase()]=C[2];C=F[e.toLowerCase()]}return C===t?null:C},overrideMimeType:function(e){return b||(c.mimeType=e),this},abort:function(e){return e=e||"abort",n&&n.abort(e),E(0,e),this}};if(p.promise(y),y.success=y.done,y.error=y.fail,y.complete=h.add,y.statusCode=function(e){if(e){var t;if(b<2)for(t in e)f[t]=[f[t],e[t]];else t=e[y.status],y.then(t,t)}return this},c.url=((e||c.url)+"").replace(Ue,"").replace(Ke,qe[1]+"//"),c.dataTypes=P.trim(c.dataType||"*").toLowerCase().split(Ct),null==c.crossDomain&&(i=Dt.exec(c.url.toLowerCase()),c.crossDomain=!(!i||i[1]==qe[1]&&i[2]==qe[2]&&(i[3]||("http:"===i[1]?80:443))==(qe[3]||("http:"===qe[1]?80:443)))),c.data&&c.processData&&"string"!=typeof c.data&&(c.data=P.param(c.data,c.traditional)),s(Ft,c,C,y),2===b)return!1;if(A=c.global,c.type=c.type.toUpperCase(),c.hasContent=!Ge.test(c.type),A&&0===P.active++&&P.event.trigger("ajaxStart"),!c.hasContent&&(c.data&&(c.url+=(Je.test(c.url)?"&":"?")+c.data,delete c.data),D=c.url,c.cache===!1)){var v=P.now(),x=c.url.replace(Et,"$1_="+v);c.url=x+(x===c.url?(Je.test(c.url)?"&":"?")+"_="+v:"")}(c.data&&c.hasContent&&c.contentType!==!1||C.contentType)&&y.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(D=D||c.url,P.lastModified[D]&&y.setRequestHeader("If-Modified-Since",P.lastModified[D]),P.etag[D]&&y.setRequestHeader("If-None-Match",P.etag[D])),y.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+("*"!==c.dataTypes[0]?", "+rt+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)y.setRequestHeader(l,c.headers[l]);if(c.beforeSend&&(c.beforeSend.call(d,y,c)===!1||2===b))return y.abort(),!1;for(l in{success:1,error:1,complete:1})y[l](c[l]);if(n=s(nt,c,C,y)){y.readyState=1,A&&u.trigger("ajaxSend",[y,c]),c.async&&c.timeout>0&&(r=setTimeout(function(){y.abort("timeout")},c.timeout));try{b=1,n.send(m,E)}catch(w){if(!(b<2))throw w;E(-1,w)}}else E(-1,"No Transport");return y},param:function(e,C){var E=[],D=function(e,t){t=P.isFunction(t)?t():t,E[E.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(C===t&&(C=P.ajaxSettings.traditional),P.isArray(e)||e.jquery&&!P.isPlainObject(e))P.each(e,function(){D(this.name,this.value)});else for(var B in e)i(B,e[B],C,D);return E.join("&").replace(He,"+")}}),P.extend({active:0,lastModified:{},etag:{}});var ot=P.now(),it=/(\=)\?(&|$)|\?\?/i;P.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return P.expando+"_"+ot++}}),P.ajaxPrefilter("json jsonp",function(t,C,E){var D="application/x-www-form-urlencoded"===t.contentType&&"string"==typeof t.data;if("jsonp"===t.dataTypes[0]||t.jsonp!==!1&&(it.test(t.url)||D&&it.test(t.data))){var B,F=t.jsonpCallback=P.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,n=e[F],r=t.url,a=t.data,o="$1"+F+"$2";return t.jsonp!==!1&&(r=r.replace(it,o),t.url===r&&(D&&(a=a.replace(it,o)),t.data===a&&(r+=(/\?/.test(r)?"&":"?")+t.jsonp+"="+F))),t.url=r,t.data=a,e[F]=function(e){B=[e]},E.always(function(){e[F]=n,B&&P.isFunction(n)&&e[F](B[0])}),t.converters["script json"]=function(){return B||P.error(F+" was not called"),B[0]},t.dataTypes[0]="json","script"}}),P.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{
script:/javascript|ecmascript/},converters:{"text script":function(e){return P.globalEval(e),e}}}),P.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),P.ajaxTransport("script",function(e){if(e.crossDomain){var C,E=_.head||_.getElementsByTagName("head")[0]||_.documentElement;return{send:function(D,B){C=_.createElement("script"),C.async="async",e.scriptCharset&&(C.charset=e.scriptCharset),C.src=e.url,C.onload=C.onreadystatechange=function(e,D){(D||!C.readyState||/loaded|complete/.test(C.readyState))&&(C.onload=C.onreadystatechange=null,E&&C.parentNode&&E.removeChild(C),C=t,D||B(200,"success"))},E.insertBefore(C,E.firstChild)},abort:function(){C&&C.onload(0,1)}}}});var At,st=!!e.ActiveXObject&&function(){for(var e in At)At[e](0,1)},lt=0;P.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&r()||n()}:r,function(e){P.extend(P.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(P.ajaxSettings.xhr()),P.support.ajax&&P.ajaxTransport(function(C){if(!C.crossDomain||P.support.cors){var E;return{send:function(D,B){var F,n,r=C.xhr();if(C.username?r.open(C.type,C.url,C.async,C.username,C.password):r.open(C.type,C.url,C.async),C.xhrFields)for(n in C.xhrFields)r[n]=C.xhrFields[n];C.mimeType&&r.overrideMimeType&&r.overrideMimeType(C.mimeType),!C.crossDomain&&!D["X-Requested-With"]&&(D["X-Requested-With"]="XMLHttpRequest");try{for(n in D)r.setRequestHeader(n,D[n])}catch(a){}r.send(C.hasContent&&C.data||null),E=function(e,D){var n,a,o,i,A;try{if(E&&(D||4===r.readyState))if(E=t,F&&(r.onreadystatechange=P.noop,st&&delete At[F]),D)4!==r.readyState&&r.abort();else{n=r.status,o=r.getAllResponseHeaders(),i={},A=r.responseXML,A&&A.documentElement&&(i.xml=A),i.text=r.responseText;try{a=r.statusText}catch(s){a=""}n||!C.isLocal||C.crossDomain?1223===n&&(n=204):n=i.text?200:404}}catch(l){D||B(-1,l)}i&&B(n,a,i,o)},C.async&&4!==r.readyState?(F=++lt,st&&(At||(At={},P(e).unload(st)),At[F]=E),r.onreadystatechange=E):E()},abort:function(){E&&E(0,1)}}}});var ct,dt,ut,pt,ht={},ft=/^(?:toggle|show|hide)$/,mt=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,gt=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];P.fn.extend({show:function(e,t,C){var B,F;if(e||0===e)return this.animate(D("show",3),e,t,C);for(var n=0,r=this.length;n<r;n++)B=this[n],B.style&&(F=B.style.display,!P._data(B,"olddisplay")&&"none"===F&&(F=B.style.display=""),""===F&&"none"===P.css(B,"display")&&P._data(B,"olddisplay",E(B.nodeName)));for(n=0;n<r;n++)B=this[n],B.style&&(F=B.style.display,""!==F&&"none"!==F||(B.style.display=P._data(B,"olddisplay")||""));return this},hide:function(e,t,C){if(e||0===e)return this.animate(D("hide",3),e,t,C);for(var E,B,F=0,n=this.length;F<n;F++)E=this[F],E.style&&(B=P.css(E,"display"),"none"!==B&&!P._data(E,"olddisplay")&&P._data(E,"olddisplay",B));for(F=0;F<n;F++)this[F].style&&(this[F].style.display="none");return this},_toggle:P.fn.toggle,toggle:function(e,t,C){var E="boolean"==typeof e;return P.isFunction(e)&&P.isFunction(t)?this._toggle.apply(this,arguments):null==e||E?this.each(function(){var t=E?e:P(this).is(":hidden");P(this)[t?"show":"hide"]()}):this.animate(D("toggle",3),e,t,C),this},fadeTo:function(e,t,C,E){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:t},e,C,E)},animate:function(e,t,C,D){function B(){F.queue===!1&&P._mark(this);var t,C,D,B,n,r,a,o,i,A=P.extend({},F),s=1===this.nodeType,l=s&&P(this).is(":hidden");A.animatedProperties={};for(D in e){if(t=P.camelCase(D),D!==t&&(e[t]=e[D],delete e[D]),C=e[t],P.isArray(C)?(A.animatedProperties[t]=C[1],C=e[t]=C[0]):A.animatedProperties[t]=A.specialEasing&&A.specialEasing[t]||A.easing||"swing","hide"===C&&l||"show"===C&&!l)return A.complete.call(this);s&&("height"===t||"width"===t)&&(A.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],"inline"===P.css(this,"display")&&"none"===P.css(this,"float")&&(P.support.inlineBlockNeedsLayout&&"inline"!==E(this.nodeName)?this.style.zoom=1:this.style.display="inline-block"))}null!=A.overflow&&(this.style.overflow="hidden");for(D in e)B=new P.fx(this,A,D),C=e[D],ft.test(C)?(i=P._data(this,"toggle"+D)||("toggle"===C?l?"show":"hide":0),i?(P._data(this,"toggle"+D,"show"===i?"hide":"show"),B[i]()):B[C]()):(n=mt.exec(C),r=B.cur(),n?(a=parseFloat(n[2]),o=n[3]||(P.cssNumber[D]?"":"px"),"px"!==o&&(P.style(this,D,(a||1)+o),r=(a||1)/B.cur()*r,P.style(this,D,r+o)),n[1]&&(a=("-="===n[1]?-1:1)*a+r),B.custom(r,a,o)):B.custom(r,C,""));return!0}var F=P.speed(t,C,D);return P.isEmptyObject(e)?this.each(F.complete,[!1]):(e=P.extend({},e),F.queue===!1?this.each(B):this.queue(F.queue,B))},stop:function(e,C,E){return"string"!=typeof e&&(E=C,C=e,e=t),C&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){function t(e,t,C){var D=t[C];P.removeData(e,C,!0),D.stop(E)}var C,D=!1,B=P.timers,F=P._data(this);if(E||P._unmark(!0,this),null==e)for(C in F)F[C]&&F[C].stop&&C.indexOf(".run")===C.length-4&&t(this,F,C);else F[C=e+".run"]&&F[C].stop&&t(this,F,C);for(C=B.length;C--;)B[C].elem===this&&(null==e||B[C].queue===e)&&(E?B[C](!0):B[C].saveState(),D=!0,B.splice(C,1));(!E||!D)&&P.dequeue(this,e)})}}),P.each({slideDown:D("show",1),slideUp:D("hide",1),slideToggle:D("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){P.fn[e]=function(e,C,E){return this.animate(t,e,C,E)}}),P.extend({speed:function(e,t,C){var E=e&&"object"==typeof e?P.extend({},e):{complete:C||!C&&t||P.isFunction(e)&&e,duration:e,easing:C&&t||t&&!P.isFunction(t)&&t};return E.duration=P.fx.off?0:"number"==typeof E.duration?E.duration:E.duration in P.fx.speeds?P.fx.speeds[E.duration]:P.fx.speeds._default,null!=E.queue&&E.queue!==!0||(E.queue="fx"),E.old=E.complete,E.complete=function(e){P.isFunction(E.old)&&E.old.call(this),E.queue?P.dequeue(this,E.queue):e!==!1&&P._unmark(this)},E},easing:{linear:function(e,t,C,E){return C+E*e},swing:function(e,t,C,E){return(-Math.cos(e*Math.PI)/2+.5)*E+C}},timers:[],fx:function(e,t,C){this.options=t,this.elem=e,this.prop=C,t.orig=t.orig||{}}}),P.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(P.fx.step[this.prop]||P.fx.step._default)(this)},cur:function(){if(null!=this.elem[this.prop]&&(!this.elem.style||null==this.elem.style[this.prop]))return this.elem[this.prop];var e,t=P.css(this.elem,this.prop);return isNaN(e=parseFloat(t))?t&&"auto"!==t?t:0:e},custom:function(e,C,E){function D(e){return B.step(e)}var B=this,n=P.fx;this.startTime=pt||F(),this.end=C,this.now=this.start=e,this.pos=this.state=0,this.unit=E||this.unit||(P.cssNumber[this.prop]?"":"px"),D.queue=this.options.queue,D.elem=this.elem,D.saveState=function(){B.options.hide&&P._data(B.elem,"fxshow"+B.prop)===t&&P._data(B.elem,"fxshow"+B.prop,B.start)},D()&&P.timers.push(D)&&!ut&&(ut=setInterval(n.tick,n.interval))},show:function(){var e=P._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=e||P.style(this.elem,this.prop),this.options.show=!0,e!==t?this.custom(this.cur(),e):this.custom("width"===this.prop||"height"===this.prop?1:0,this.cur()),P(this.elem).show()},hide:function(){this.options.orig[this.prop]=P._data(this.elem,"fxshow"+this.prop)||P.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(e){var t,C,E,D=pt||F(),B=!0,n=this.elem,r=this.options;if(e||D>=r.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),r.animatedProperties[this.prop]=!0;for(t in r.animatedProperties)r.animatedProperties[t]!==!0&&(B=!1);if(B){if(null!=r.overflow&&!P.support.shrinkWrapBlocks&&P.each(["","X","Y"],function(e,t){n.style["overflow"+t]=r.overflow[e]}),r.hide&&P(n).hide(),r.hide||r.show)for(t in r.animatedProperties)P.style(n,t,r.orig[t]),P.removeData(n,"fxshow"+t,!0),P.removeData(n,"toggle"+t,!0);E=r.complete,E&&(r.complete=!1,E.call(n))}return!1}return r.duration==1/0?this.now=D:(C=D-this.startTime,this.state=C/r.duration,this.pos=P.easing[r.animatedProperties[this.prop]](this.state,C,0,1,r.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update(),!0}},P.extend(P.fx,{tick:function(){for(var e,t=P.timers,C=0;C<t.length;C++)e=t[C],!e()&&t[C]===e&&t.splice(C--,1);t.length||P.fx.stop()},interval:13,stop:function(){clearInterval(ut),ut=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(e){P.style(e.elem,"opacity",e.now)},_default:function(e){e.elem.style&&null!=e.elem.style[e.prop]?e.elem.style[e.prop]=e.now+e.unit:e.elem[e.prop]=e.now}}}),P.each(["width","height"],function(e,t){P.fx.step[t]=function(e){P.style(e.elem,t,Math.max(0,e.now)+e.unit)}}),P.expr&&P.expr.filters&&(P.expr.filters.animated=function(e){return P.grep(P.timers,function(t){return e===t.elem}).length});var bt=/^t(?:able|d|h)$/i,yt=/^(?:body|html)$/i;"getBoundingClientRect"in _.documentElement?P.fn.offset=function(e){var t,E=this[0];if(e)return this.each(function(t){P.offset.setOffset(this,e,t)});if(!E||!E.ownerDocument)return null;if(E===E.ownerDocument.body)return P.offset.bodyOffset(E);try{t=E.getBoundingClientRect()}catch(D){}var B=E.ownerDocument,F=B.documentElement;if(!t||!P.contains(F,E))return t?{top:t.top,left:t.left}:{top:0,left:0};var n=B.body,r=C(B),a=F.clientTop||n.clientTop||0,o=F.clientLeft||n.clientLeft||0,i=r.pageYOffset||P.support.boxModel&&F.scrollTop||n.scrollTop,A=r.pageXOffset||P.support.boxModel&&F.scrollLeft||n.scrollLeft,s=t.top+i-a,l=t.left+A-o;return{top:s,left:l}}:P.fn.offset=function(e){var t=this[0];if(e)return this.each(function(t){P.offset.setOffset(this,e,t)});if(!t||!t.ownerDocument)return null;if(t===t.ownerDocument.body)return P.offset.bodyOffset(t);for(var C,E=t.offsetParent,D=t,B=t.ownerDocument,F=B.documentElement,n=B.body,r=B.defaultView,a=r?r.getComputedStyle(t,null):t.currentStyle,o=t.offsetTop,i=t.offsetLeft;(t=t.parentNode)&&t!==n&&t!==F&&(!P.support.fixedPosition||"fixed"!==a.position);)C=r?r.getComputedStyle(t,null):t.currentStyle,o-=t.scrollTop,i-=t.scrollLeft,t===E&&(o+=t.offsetTop,i+=t.offsetLeft,P.support.doesNotAddBorder&&(!P.support.doesAddBorderForTableAndCells||!bt.test(t.nodeName))&&(o+=parseFloat(C.borderTopWidth)||0,i+=parseFloat(C.borderLeftWidth)||0),D=E,E=t.offsetParent),P.support.subtractsBorderForOverflowNotVisible&&"visible"!==C.overflow&&(o+=parseFloat(C.borderTopWidth)||0,i+=parseFloat(C.borderLeftWidth)||0),a=C;return"relative"!==a.position&&"static"!==a.position||(o+=n.offsetTop,i+=n.offsetLeft),P.support.fixedPosition&&"fixed"===a.position&&(o+=Math.max(F.scrollTop,n.scrollTop),i+=Math.max(F.scrollLeft,n.scrollLeft)),{top:o,left:i}},P.offset={bodyOffset:function(e){var t=e.offsetTop,C=e.offsetLeft;return P.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(P.css(e,"marginTop"))||0,C+=parseFloat(P.css(e,"marginLeft"))||0),{top:t,left:C}},setOffset:function(e,t,C){var E=P.css(e,"position");"static"===E&&(e.style.position="relative");var D,B,F=P(e),n=F.offset(),r=P.css(e,"top"),a=P.css(e,"left"),o=("absolute"===E||"fixed"===E)&&P.inArray("auto",[r,a])>-1,i={},A={};o?(A=F.position(),D=A.top,B=A.left):(D=parseFloat(r)||0,B=parseFloat(a)||0),P.isFunction(t)&&(t=t.call(e,C,n)),null!=t.top&&(i.top=t.top-n.top+D),null!=t.left&&(i.left=t.left-n.left+B),"using"in t?t.using.call(e,i):F.css(i)}},P.fn.extend({position:function(){if(!this[0])return null;var e=this[0],t=this.offsetParent(),C=this.offset(),E=yt.test(t[0].nodeName)?{top:0,left:0}:t.offset();return C.top-=parseFloat(P.css(e,"marginTop"))||0,C.left-=parseFloat(P.css(e,"marginLeft"))||0,E.top+=parseFloat(P.css(t[0],"borderTopWidth"))||0,E.left+=parseFloat(P.css(t[0],"borderLeftWidth"))||0,{top:C.top-E.top,left:C.left-E.left}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent||_.body;e&&!yt.test(e.nodeName)&&"static"===P.css(e,"position");)e=e.offsetParent;return e})}}),P.each(["Left","Top"],function(e,E){var D="scroll"+E;P.fn[D]=function(E){var B,F;return E===t?(B=this[0])?(F=C(B),F?"pageXOffset"in F?F[e?"pageYOffset":"pageXOffset"]:P.support.boxModel&&F.document.documentElement[D]||F.document.body[D]:B[D]):null:this.each(function(){F=C(this),F?F.scrollTo(e?P(F).scrollLeft():E,e?E:P(F).scrollTop()):this[D]=E})}}),P.each(["Height","Width"],function(e,C){var E=C.toLowerCase();P.fn["inner"+C]=function(){var e=this[0];return e?e.style?parseFloat(P.css(e,E,"padding")):this[E]():null},P.fn["outer"+C]=function(e){var t=this[0];return t?t.style?parseFloat(P.css(t,E,e?"margin":"border")):this[E]():null},P.fn[E]=function(e){var D=this[0];if(!D)return null==e?null:this;if(P.isFunction(e))return this.each(function(t){var C=P(this);C[E](e.call(this,t,C[E]()))});if(P.isWindow(D)){var B=D.document.documentElement["client"+C],F=D.document.body;return"CSS1Compat"===D.document.compatMode&&B||F&&F["client"+C]||B}if(9===D.nodeType)return Math.max(D.documentElement["client"+C],D.body["scroll"+C],D.documentElement["scroll"+C],D.body["offset"+C],D.documentElement["offset"+C]);if(e===t){var n=P.css(D,E),r=parseFloat(n);return P.isNumeric(r)?r:n}return this.css(E,"string"==typeof e?e:e+"px")}}),e.jQuery=e.$=P,"function"==typeof define&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return P})}(window),function(){var e=Math,t=function(e){return e>>0},C=/webkit/i.test(navigator.appVersion)?"webkit":/firefox/i.test(navigator.userAgent)?"Moz":/trident/i.test(navigator.userAgent)?"ms":"opera"in window?"O":"",E=/android/gi.test(navigator.appVersion),D=/iphone|ipad/gi.test(navigator.appVersion),B=/playbook/gi.test(navigator.appVersion),F=/hp-tablet/gi.test(navigator.appVersion),n="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix,r="ontouchstart"in window&&!F,a=C+"Transform"in document.documentElement.style,o=D||B,i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){return setTimeout(e,1)}}(),A=function(){return window.cancelRequestAnimationFrame||window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout}(),s="onorientationchange"in window?"orientationchange":"resize",l=r?"touchstart":"mousedown",c=r?"touchmove":"mousemove",d=r?"touchend":"mouseup",u=r?"touchcancel":"mouseup",p="Moz"==C?"DOMMouseScroll":"mousewheel",h="translate"+(n?"3d(":"("),f=n?",0)":")",m=function(e,t){var B,F=this,i=document;F.wrapper="object"==typeof e?e:i.getElementById(e),F.wrapper.style.overflow="hidden",F.scroller=F.wrapper.children[0],F.options={hScroll:!0,vScroll:!1,x:0,y:0,bounce:!0,bounceLock:!1,momentum:!0,lockDirection:!0,useTransform:!0,useTransition:!1,topOffset:0,checkDOMChanges:!1,hScrollbar:!0,vScrollbar:!0,fixedScrollbar:E,hideScrollbar:D,fadeScrollbar:D&&n,scrollbarClass:"",zoom:!1,zoomMin:1,zoomMax:4,doubleTapZoom:2,wheelAction:"scroll",snap:!1,snapThreshold:1,onRefresh:null,onBeforeScrollStart:function(e){r||e.preventDefault()},onScrollStart:null,onBeforeScrollMove:null,onScrollMove:null,onBeforeScrollEnd:null,onScrollEnd:null,onTouchEnd:null,onDestroy:null,onZoomStart:null,onZoom:null,onZoomEnd:null};for(B in t)F.options[B]=t[B];F.x=F.options.x,F.y=F.options.y,F.options.useTransform=!!a&&F.options.useTransform,F.options.hScrollbar=F.options.hScroll&&F.options.hScrollbar,F.options.vScrollbar=F.options.vScroll&&F.options.vScrollbar,F.options.zoom=F.options.useTransform&&F.options.zoom,F.options.useTransition=o&&F.options.useTransition,F.options.zoom&&E&&(h="translate(",f=")"),F.scroller.style[C+"TransitionProperty"]=F.options.useTransform?"-"+C.toLowerCase()+"-transform":"top left",F.scroller.style[C+"TransitionDuration"]="0",F.scroller.style[C+"TransformOrigin"]="0 0",F.options.useTransition&&(F.scroller.style[C+"TransitionTimingFunction"]="cubic-bezier(0.33,0.66,0.66,1)"),F.options.useTransform?F.scroller.style[C+"Transform"]=h+F.x+"px,"+F.y+"px"+f:F.scroller.style.cssText+=";position:absolute;top:"+F.y+"px;left:"+F.x+"px",F.options.useTransition&&(F.options.fixedScrollbar=!0),F.refresh(),F._bind(s,window),F._bind(l),r||(F._bind("mouseout",F.wrapper),"none"!=F.options.wheelAction&&F._bind(p)),F.options.checkDOMChanges&&(F.checkDOMTime=setInterval(function(){F._checkDOMChanges()},500))};m.prototype={enabled:!0,x:0,y:0,steps:[],scale:1,currPageX:0,currPageY:0,pagesX:[],pagesY:[],aniTime:null,wheelZoomCount:0,handleEvent:function(e){var t=this;switch(e.type){case l:if(!r&&0!==e.button)return;t._start(e);break;case c:t._move(e);break;case d:case u:t._end(e);break;case s:t._resize();break;case p:t._wheel(e);break;case"mouseout":t._mouseout(e);break;case"webkitTransitionEnd":t._transitionEnd(e)}},_checkDOMChanges:function(){this.moved||this.zoomed||this.animating||this.scrollerW==this.scroller.offsetWidth*this.scale&&this.scrollerH==this.scroller.offsetHeight*this.scale||this.refresh()},_scrollbar:function(E){var D,B=this,F=document;return B[E+"Scrollbar"]?(B[E+"ScrollbarWrapper"]||(D=F.createElement("div"),B.options.scrollbarClass?D.className=B.options.scrollbarClass+E.toUpperCase():D.style.cssText="position:absolute;z-index:100;"+("h"==E?"height:7px;bottom:1px;left:2px;right:"+(B.vScrollbar?"7":"2")+"px":"width:7px;bottom:"+(B.hScrollbar?"7":"2")+"px;top:2px;right:1px"),D.style.cssText+=";pointer-events:none;-"+C+"-transition-property:opacity;-"+C+"-transition-duration:"+(B.options.fadeScrollbar?"350ms":"0")+";overflow:hidden;opacity:"+(B.options.hideScrollbar?"0":"1"),B.wrapper.appendChild(D),B[E+"ScrollbarWrapper"]=D,D=F.createElement("div"),B.options.scrollbarClass||(D.style.cssText="position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);-"+C+"-background-clip:padding-box;-"+C+"-box-sizing:border-box;"+("h"==E?"height:100%":"width:100%")+";-"+C+"-border-radius:3px;border-radius:3px"),D.style.cssText+=";pointer-events:none;-"+C+"-transition-property:-"+C+"-transform;-"+C+"-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-"+C+"-transition-duration:0;-"+C+"-transform:"+h+"0,0"+f,B.options.useTransition&&(D.style.cssText+=";-"+C+"-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"),B[E+"ScrollbarWrapper"].appendChild(D),B[E+"ScrollbarIndicator"]=D),"h"==E?(B.hScrollbarSize=B.hScrollbarWrapper.clientWidth,B.hScrollbarIndicatorSize=e.max(t(B.hScrollbarSize*B.hScrollbarSize/B.scrollerW),8),B.hScrollbarIndicator.style.width=B.hScrollbarIndicatorSize+"px",B.hScrollbarMaxScroll=B.hScrollbarSize-B.hScrollbarIndicatorSize,B.hScrollbarProp=B.hScrollbarMaxScroll/B.maxScrollX):(B.vScrollbarSize=B.vScrollbarWrapper.clientHeight,B.vScrollbarIndicatorSize=e.max(t(B.vScrollbarSize*B.vScrollbarSize/B.scrollerH),8),B.vScrollbarIndicator.style.height=B.vScrollbarIndicatorSize+"px",B.vScrollbarMaxScroll=B.vScrollbarSize-B.vScrollbarIndicatorSize,B.vScrollbarProp=B.vScrollbarMaxScroll/B.maxScrollY),void B._scrollbarPos(E,!0)):void(B[E+"ScrollbarWrapper"]&&(a&&(B[E+"ScrollbarIndicator"].style[C+"Transform"]=""),B[E+"ScrollbarWrapper"].parentNode.removeChild(B[E+"ScrollbarWrapper"]),B[E+"ScrollbarWrapper"]=null,B[E+"ScrollbarIndicator"]=null))},_resize:function(){var e=this;setTimeout(function(){e.refresh()},E?200:0)},_pos:function(e,E){e=this.hScroll?e:0,E=this.vScroll?E:0,this.options.useTransform?this.scroller.style[C+"Transform"]=h+e+"px,"+E+"px"+f+" scale("+this.scale+")":(e=t(e),E=t(E),this.scroller.style.left=e+"px",this.scroller.style.top=E+"px"),this.x=e,this.y=E,this._scrollbarPos("h"),this._scrollbarPos("v")},_scrollbarPos:function(e,E){var D,B=this,F="h"==e?B.x:B.y;B[e+"Scrollbar"]&&(F=B[e+"ScrollbarProp"]*F,F<0?(B.options.fixedScrollbar||(D=B[e+"ScrollbarIndicatorSize"]+t(3*F),D<8&&(D=8),B[e+"ScrollbarIndicator"].style["h"==e?"width":"height"]=D+"px"),F=0):F>B[e+"ScrollbarMaxScroll"]&&(B.options.fixedScrollbar?F=B[e+"ScrollbarMaxScroll"]:(D=B[e+"ScrollbarIndicatorSize"]-t(3*(F-B[e+"ScrollbarMaxScroll"])),D<8&&(D=8),B[e+"ScrollbarIndicator"].style["h"==e?"width":"height"]=D+"px",F=B[e+"ScrollbarMaxScroll"]+(B[e+"ScrollbarIndicatorSize"]-D))),B[e+"ScrollbarWrapper"].style[C+"TransitionDelay"]="0",B[e+"ScrollbarWrapper"].style.opacity=E&&B.options.hideScrollbar?"0":"1",B[e+"ScrollbarIndicator"].style[C+"Transform"]=h+("h"==e?F+"px,0":"0,"+F+"px")+f)},_start:function(t){var E,D,B,F,n,a=this,o=r?t.touches[0]:t;a.enabled&&(a.options.onBeforeScrollStart&&a.options.onBeforeScrollStart.call(a,t),(a.options.useTransition||a.options.zoom)&&a._transitionTime(0),a.moved=!1,a.animating=!1,a.zoomed=!1,a.distX=0,a.distY=0,a.absDistX=0,a.absDistY=0,a.dirX=0,a.dirY=0,a.options.zoom&&r&&t.touches.length>1&&(F=e.abs(t.touches[0].pageX-t.touches[1].pageX),n=e.abs(t.touches[0].pageY-t.touches[1].pageY),a.touchesDistStart=e.sqrt(F*F+n*n),a.originX=e.abs(t.touches[0].pageX+t.touches[1].pageX-2*a.wrapperOffsetLeft)/2-a.x,a.originY=e.abs(t.touches[0].pageY+t.touches[1].pageY-2*a.wrapperOffsetTop)/2-a.y,a.options.onZoomStart&&a.options.onZoomStart.call(a,t)),a.options.momentum&&(a.options.useTransform?(E=getComputedStyle(a.scroller,null)[C+"Transform"].replace(/[^0-9-.,]/g,"").split(","),D=1*E[4],B=1*E[5]):(D=1*getComputedStyle(a.scroller,null).left.replace(/[^0-9-]/g,""),B=1*getComputedStyle(a.scroller,null).top.replace(/[^0-9-]/g,"")),D==a.x&&B==a.y||(a.options.useTransition?a._unbind("webkitTransitionEnd"):A(a.aniTime),a.steps=[],a._pos(D,B))),a.absStartX=a.x,a.absStartY=a.y,a.startX=a.x,a.startY=a.y,a.pointX=o.pageX,a.pointY=o.pageY,a.startTime=t.timeStamp||Date.now(),a.options.onScrollStart&&a.options.onScrollStart.call(a,t),a._bind(c),a._bind(d),a._bind(u))},_move:function(t){var E,D,B,F=this,n=r?t.touches[0]:t,a=n.pageX-F.pointX,o=n.pageY-F.pointY,i=F.x+a,A=F.y+o,s=t.timeStamp||Date.now();if(F.options.onBeforeScrollMove&&F.options.onBeforeScrollMove.call(F,t),F.options.zoom&&r&&t.touches.length>1)return t.preventDefault(),E=e.abs(t.touches[0].pageX-t.touches[1].pageX),D=e.abs(t.touches[0].pageY-t.touches[1].pageY),F.touchesDist=e.sqrt(E*E+D*D),F.zoomed=!0,B=1/F.touchesDistStart*F.touchesDist*this.scale,B<F.options.zoomMin?B=.5*F.options.zoomMin*Math.pow(2,B/F.options.zoomMin):B>F.options.zoomMax&&(B=2*F.options.zoomMax*Math.pow(.5,F.options.zoomMax/B)),F.lastScale=B/this.scale,i=this.originX-this.originX*F.lastScale+this.x,A=this.originY-this.originY*F.lastScale+this.y,this.scroller.style[C+"Transform"]=h+i+"px,"+A+"px"+f+" scale("+B+")",void(F.options.onZoom&&F.options.onZoom.call(F,t));if(F.pointX=n.pageX,F.pointY=n.pageY,(i>0||i<F.maxScrollX)&&(i=F.options.bounce?F.x+a/2:i>=0||F.maxScrollX>=0?0:F.maxScrollX),(A>F.minScrollY||A<F.maxScrollY)&&(A=F.options.bounce?F.y+o/2:A>=F.minScrollY||F.maxScrollY>=0?F.minScrollY:F.maxScrollY),F.distX+=a,F.distY+=o,F.absDistX=e.abs(F.distX),F.absDistY=e.abs(F.distY),!(F.absDistX<6&&F.absDistY<6)){F.options.lockDirection&&(F.absDistX>F.absDistY+5?(A=F.y,o=0):F.absDistY>F.absDistX+5&&(i=F.x,a=0));var l=F.x,c=F.y;F.moved=!0,F._pos(i,A),!r||F.x==l&&F.y==c||t.preventDefault(),F.dirX=a>0?-1:a<0?1:0,F.dirY=o>0?-1:o<0?1:0,s-F.startTime>300&&(F.startTime=s,F.startX=F.x,F.startY=F.y),F.options.onScrollMove&&F.options.onScrollMove.call(F,t)}},_end:function(E){if(!r||0==E.touches.length){var D,B,F,n,a,o,i,A=this,s=r?E.changedTouches[0]:E,l={dist:0,time:0},p={dist:0,time:0},m=(E.timeStamp||Date.now())-A.startTime,g=A.x,b=A.y;if(A._unbind(c),A._unbind(d),A._unbind(u),A.options.onBeforeScrollEnd&&A.options.onBeforeScrollEnd.call(A,E),A.zoomed)return i=A.scale*A.lastScale,i=Math.max(A.options.zoomMin,i),i=Math.min(A.options.zoomMax,i),A.lastScale=i/A.scale,A.scale=i,A.x=A.originX-A.originX*A.lastScale+A.x,A.y=A.originY-A.originY*A.lastScale+A.y,A.scroller.style[C+"TransitionDuration"]="200ms",A.scroller.style[C+"Transform"]=h+A.x+"px,"+A.y+"px"+f+" scale("+A.scale+")",A.zoomed=!1,A.refresh(),void(A.options.onZoomEnd&&A.options.onZoomEnd.call(A,E));if(!A.moved)return r&&(A.doubleTapTimer&&A.options.zoom?(clearTimeout(A.doubleTapTimer),A.doubleTapTimer=null,A.options.onZoomStart&&A.options.onZoomStart.call(A,E),A.zoom(A.pointX,A.pointY,1==A.scale?A.options.doubleTapZoom:1),A.options.onZoomEnd&&setTimeout(function(){A.options.onZoomEnd.call(A,E)},200)):A.doubleTapTimer=setTimeout(function(){for(A.doubleTapTimer=null,D=s.target;1!=D.nodeType;)D=D.parentNode;"SELECT"!=D.tagName&&"INPUT"!=D.tagName&&"TEXTAREA"!=D.tagName&&(B=document.createEvent("MouseEvents"),B.initMouseEvent("click",!0,!0,E.view,1,s.screenX,s.screenY,s.clientX,s.clientY,E.ctrlKey,E.altKey,E.shiftKey,E.metaKey,0,null),B._fake=!0,D.dispatchEvent(B))},A.options.zoom?250:0)),A._resetPos(200),void(A.options.onTouchEnd&&A.options.onTouchEnd.call(A,E));if(m<300&&A.options.momentum&&(l=g?A._momentum(g-A.startX,m,-A.x,A.scrollerW-A.wrapperW+A.x,A.options.bounce?A.wrapperW:0):l,p=b?A._momentum(b-A.startY,m,-A.y,A.maxScrollY<0?A.scrollerH-A.wrapperH+A.y-A.minScrollY:0,A.options.bounce?A.wrapperH:0):p,g=A.x+l.dist,b=A.y+p.dist,(A.x>0&&g>0||A.x<A.maxScrollX&&g<A.maxScrollX)&&(l={dist:0,time:0}),(A.y>A.minScrollY&&b>A.minScrollY||A.y<A.maxScrollY&&b<A.maxScrollY)&&(p={dist:0,time:0})),l.dist||p.dist)return a=e.max(e.max(l.time,p.time),10),A.options.snap&&(F=g-A.absStartX,n=b-A.absStartY,e.abs(F)<A.options.snapThreshold&&e.abs(n)<A.options.snapThreshold?A.scrollTo(A.absStartX,A.absStartY,200):(o=A._snap(g,b),g=o.x,b=o.y,a=e.max(o.time,a))),A.scrollTo(t(g),t(b),a),void(A.options.onTouchEnd&&A.options.onTouchEnd.call(A,E));if(A.options.snap)return F=g-A.absStartX,n=b-A.absStartY,e.abs(F)<A.options.snapThreshold&&e.abs(n)<A.options.snapThreshold?A.scrollTo(A.absStartX,A.absStartY,200):(o=A._snap(A.x,A.y),o.x==A.x&&o.y==A.y||A.scrollTo(o.x,o.y,o.time)),void(A.options.onTouchEnd&&A.options.onTouchEnd.call(A,E));A._resetPos(200),A.options.onTouchEnd&&A.options.onTouchEnd.call(A,E)}},_resetPos:function(e){var t=this,E=t.x>=0?0:t.x<t.maxScrollX?t.maxScrollX:t.x,D=t.y>=t.minScrollY||t.maxScrollY>0?t.minScrollY:t.y<t.maxScrollY?t.maxScrollY:t.y;return E==t.x&&D==t.y?(t.moved&&(t.moved=!1,t.options.onScrollEnd&&t.options.onScrollEnd.call(t)),t.hScrollbar&&t.options.hideScrollbar&&("webkit"==C&&(t.hScrollbarWrapper.style[C+"TransitionDelay"]="300ms"),t.hScrollbarWrapper.style.opacity="0"),void(t.vScrollbar&&t.options.hideScrollbar&&("webkit"==C&&(t.vScrollbarWrapper.style[C+"TransitionDelay"]="300ms"),t.vScrollbarWrapper.style.opacity="0"))):void t.scrollTo(E,D,e||0)},_wheel:function(e){var t,C,E,D,B,F=this;if("wheelDeltaX"in e)t=e.wheelDeltaX/12,C=e.wheelDeltaY/12;else if("wheelDelta"in e)t=C=e.wheelDelta/12;else{if(!("detail"in e))return;t=C=3*-e.detail}return"zoom"==F.options.wheelAction?(B=F.scale*Math.pow(2,1/3*(C?C/Math.abs(C):0)),B<F.options.zoomMin&&(B=F.options.zoomMin),B>F.options.zoomMax&&(B=F.options.zoomMax),void(B!=F.scale&&(!F.wheelZoomCount&&F.options.onZoomStart&&F.options.onZoomStart.call(F,e),F.wheelZoomCount++,F.zoom(e.pageX,e.pageY,B,400),setTimeout(function(){F.wheelZoomCount--,!F.wheelZoomCount&&F.options.onZoomEnd&&F.options.onZoomEnd.call(F,e)},400)))):(E=F.x+t,D=F.y+C,E>0?E=0:E<F.maxScrollX&&(E=F.maxScrollX),D>F.minScrollY?D=F.minScrollY:D<F.maxScrollY&&(D=F.maxScrollY),void(F.maxScrollY<0&&F.scrollTo(E,D,0)))},_mouseout:function(e){var t=e.relatedTarget;if(!t)return void this._end(e);for(;t=t.parentNode;)if(t==this.wrapper)return;this._end(e)},_transitionEnd:function(e){var t=this;e.target==t.scroller&&(t._unbind("webkitTransitionEnd"),t._startAni())},_startAni:function(){var t,C,E,D=this,B=D.x,F=D.y,n=Date.now();if(!D.animating){if(!D.steps.length)return void D._resetPos(400);if(t=D.steps.shift(),t.x==B&&t.y==F&&(t.time=0),D.animating=!0,D.moved=!0,D.options.useTransition)return D._transitionTime(t.time),D._pos(t.x,t.y),D.animating=!1,void(t.time?D._bind("webkitTransitionEnd"):D._resetPos(0));E=function(){var r,a,o=Date.now();return o>=n+t.time?(D._pos(t.x,t.y),D.animating=!1,D.options.onAnimationEnd&&D.options.onAnimationEnd.call(D),void D._startAni()):(o=(o-n)/t.time-1,C=e.sqrt(1-o*o),r=(t.x-B)*C+B,a=(t.y-F)*C+F,D._pos(r,a),void(D.animating&&(D.aniTime=i(E))))},E()}},_transitionTime:function(e){e+="ms",this.scroller.style[C+"TransitionDuration"]=e,this.hScrollbar&&(this.hScrollbarIndicator.style[C+"TransitionDuration"]=e),this.vScrollbar&&(this.vScrollbarIndicator.style[C+"TransitionDuration"]=e)},_momentum:function(C,E,D,B,F){var n=6e-4,r=e.abs(C)/E,a=r*r/(2*n),o=0,i=0;return C>0&&a>D?(i=F/(6/(a/r*n)),D+=i,r=r*D/a,a=D):C<0&&a>B&&(i=F/(6/(a/r*n)),B+=i,r=r*B/a,a=B),a*=C<0?-1:1,o=r/n,{dist:a,time:t(o)}},_offset:function(e){for(var t=-e.offsetLeft,C=-e.offsetTop;e=e.offsetParent;)t-=e.offsetLeft,C-=e.offsetTop;return e!=this.wrapper&&(t*=this.scale,C*=this.scale),{left:t,top:C}},_snap:function(C,E){var D,B,F,n,r,a,o=this;for(F=o.pagesX.length-1,D=0,B=o.pagesX.length;D<B;D++)if(C>=o.pagesX[D]){F=D;break}for(F==o.currPageX&&F>0&&o.dirX<0&&F--,C=o.pagesX[F],r=e.abs(C-o.pagesX[o.currPageX]),r=r?e.abs(o.x-C)/r*500:0,o.currPageX=F,F=o.pagesY.length-1,D=0;D<F;D++)if(E>=o.pagesY[D]){F=D;break}return F==o.currPageY&&F>0&&o.dirY<0&&F--,E=o.pagesY[F],a=e.abs(E-o.pagesY[o.currPageY]),a=a?e.abs(o.y-E)/a*500:0,o.currPageY=F,n=t(e.max(r,a))||200,{x:C,y:E,time:n}},_bind:function(e,t,C){(t||this.scroller).addEventListener(e,this,!!C)},_unbind:function(e,t,C){(t||this.scroller).removeEventListener(e,this,!!C)},destroy:function(){var e=this;e.scroller.style[C+"Transform"]="",e.hScrollbar=!1,e.vScrollbar=!1,e._scrollbar("h"),e._scrollbar("v"),e._unbind(s,window),e._unbind(l),e._unbind(c),e._unbind(d),e._unbind(u),e.options.hasTouch||(e._unbind("mouseout",e.wrapper),e._unbind(p)),e.options.useTransition&&e._unbind("webkitTransitionEnd"),e.options.checkDOMChanges&&clearInterval(e.checkDOMTime),e.options.onDestroy&&e.options.onDestroy.call(e)},refresh:function(){var e,E,D,B,F=this,n=0,r=0;if(F.scale<F.options.zoomMin&&(F.scale=F.options.zoomMin),F.wrapperW=F.wrapper.clientWidth||1,F.wrapperH=F.wrapper.clientHeight||1,F.minScrollY=-F.options.topOffset||0,F.scrollerW=t(F.scroller.offsetWidth*F.scale),F.scrollerH=t((F.scroller.offsetHeight+F.minScrollY)*F.scale),F.maxScrollX=F.wrapperW-F.scrollerW,F.maxScrollY=F.wrapperH-F.scrollerH+F.minScrollY,F.dirX=0,F.dirY=0,F.options.onRefresh&&F.options.onRefresh.call(F),F.hScroll=F.options.hScroll&&F.maxScrollX<0,F.vScroll=F.options.vScroll&&(!F.options.bounceLock&&!F.hScroll||F.scrollerH>F.wrapperH),F.hScrollbar=F.hScroll&&F.options.hScrollbar,F.vScrollbar=F.vScroll&&F.options.vScrollbar&&F.scrollerH>F.wrapperH,e=F._offset(F.wrapper),F.wrapperOffsetLeft=-e.left,F.wrapperOffsetTop=-e.top,"string"==typeof F.options.snap)for(F.pagesX=[],F.pagesY=[],B=F.scroller.querySelectorAll(F.options.snap),E=0,D=B.length;E<D;E++)n=F._offset(B[E]),n.left+=F.wrapperOffsetLeft,n.top+=F.wrapperOffsetTop,F.pagesX[E]=n.left<F.maxScrollX?F.maxScrollX:n.left*F.scale,F.pagesY[E]=n.top<F.maxScrollY?F.maxScrollY:n.top*F.scale;else if(F.options.snap){for(F.pagesX=[];n>=F.maxScrollX;)F.pagesX[r]=n,n-=F.wrapperW,r++;for(F.maxScrollX%F.wrapperW&&(F.pagesX[F.pagesX.length]=F.maxScrollX-F.pagesX[F.pagesX.length-1]+F.pagesX[F.pagesX.length-1]),n=0,r=0,F.pagesY=[];n>=F.maxScrollY;)F.pagesY[r]=n,n-=F.wrapperH,r++;F.maxScrollY%F.wrapperH&&(F.pagesY[F.pagesY.length]=F.maxScrollY-F.pagesY[F.pagesY.length-1]+F.pagesY[F.pagesY.length-1])}F._scrollbar("h"),F._scrollbar("v"),F.zoomed||(F.scroller.style[C+"TransitionDuration"]="0",F._resetPos(200))},scrollTo:function(e,t,C,E){var D,B,F=this,n=e;for(F.stop(),n.length||(n=[{x:e,y:t,time:C,relative:E}]),D=0,B=n.length;D<B;D++)n[D].relative&&(n[D].x=F.x-n[D].x,n[D].y=F.y-n[D].y),F.steps.push({x:n[D].x,y:n[D].y,time:n[D].time||0});F._startAni()},scrollToElement:function(t,C){var E,D=this;t=t.nodeType?t:D.scroller.querySelector(t),t&&(E=D._offset(t),E.left+=D.wrapperOffsetLeft,E.top+=D.wrapperOffsetTop,E.left=E.left>0?0:E.left<D.maxScrollX?D.maxScrollX:E.left,E.top=E.top>D.minScrollY?D.minScrollY:E.top<D.maxScrollY?D.maxScrollY:E.top,C=void 0===C?e.max(2*e.abs(E.left),2*e.abs(E.top)):C,
D.scrollTo(E.left,E.top,C))},scrollToPage:function(e,t,C){var E,D,B=this;C=void 0===C?400:C,B.options.onScrollStart&&B.options.onScrollStart.call(B),B.options.snap?(e="next"==e?B.currPageX+1:"prev"==e?B.currPageX-1:e,t="next"==t?B.currPageY+1:"prev"==t?B.currPageY-1:t,e=e<0?0:e>B.pagesX.length-1?B.pagesX.length-1:e,t=t<0?0:t>B.pagesY.length-1?B.pagesY.length-1:t,B.currPageX=e,B.currPageY=t,E=B.pagesX[e],D=B.pagesY[t]):(E=-B.wrapperW*e,D=-B.wrapperH*t,E<B.maxScrollX&&(E=B.maxScrollX),D<B.maxScrollY&&(D=B.maxScrollY)),B.scrollTo(E,D,C)},disable:function(){this.stop(),this._resetPos(0),this.enabled=!1,this._unbind(c),this._unbind(d),this._unbind(u)},enable:function(){this.enabled=!0},stop:function(){this.options.useTransition?this._unbind("webkitTransitionEnd"):A(this.aniTime),this.steps=[],this.moved=!1,this.animating=!1},zoom:function(e,t,E,D){var B=this,F=E/B.scale;B.options.useTransform&&(B.zoomed=!0,D=void 0===D?200:D,e=e-B.wrapperOffsetLeft-B.x,t=t-B.wrapperOffsetTop-B.y,B.x=e-e*F+B.x,B.y=t-t*F+B.y,B.scale=E,B.refresh(),B.x=B.x>0?0:B.x<B.maxScrollX?B.maxScrollX:B.x,B.y=B.y>B.minScrollY?B.minScrollY:B.y<B.maxScrollY?B.maxScrollY:B.y,B.scroller.style[C+"TransitionDuration"]=D+"ms",B.scroller.style[C+"Transform"]=h+B.x+"px,"+B.y+"px"+f+" scale("+E+")",B.zoomed=!1)},isReady:function(){return!this.moved&&!this.zoomed&&!this.animating}},"undefined"!=typeof exports?exports.iScroll=m:window.iScroll=m}(),!function(e,t,C,E){var D=e(t);e.fn.lazyload=function(B){function F(){var t=0;r.each(function(){var C=e(this);if(!a.skip_invisible||C.is(":visible"))if(e.abovethetop(this,a)||e.leftofbegin(this,a));else if(e.belowthefold(this,a)||e.rightoffold(this,a)){if(++t>a.failure_limit)return!1}else C.trigger("appear"),t=0})}var n,r=this,a={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:t,data_attribute:"original",skip_invisible:!1,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return B&&(E!==B.failurelimit&&(B.failure_limit=B.failurelimit,delete B.failurelimit),E!==B.effectspeed&&(B.effect_speed=B.effectspeed,delete B.effectspeed),e.extend(a,B)),n=a.container===E||a.container===t?D:e(a.container),0===a.event.indexOf("scroll")&&n.bind(a.event,function(){return F()}),this.each(function(){var t=this,C=e(t);t.loaded=!1,(C.attr("src")===E||C.attr("src")===!1)&&C.is("img")&&C.attr("src",a.placeholder),C.one("appear",function(){if(!this.loaded){if(a.appear){var E=r.length;a.appear.call(t,E,a)}e("<img />").bind("load",function(){var E=C.attr("data-"+a.data_attribute);C.hide(),C.is("img")?C.attr("src",E):C.css("background-image","url('"+E+"')"),C[a.effect](a.effect_speed),t.loaded=!0;var D=e.grep(r,function(e){return!e.loaded});if(r=e(D),a.load){var B=r.length;a.load.call(t,B,a)}}).attr("src",C.attr("data-"+a.data_attribute))}}),0!==a.event.indexOf("scroll")&&C.bind(a.event,function(){t.loaded||C.trigger("appear")})}),D.bind("resize",function(){F()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&D.bind("pageshow",function(t){t.originalEvent&&t.originalEvent.persisted&&r.each(function(){e(this).trigger("appear")})}),e(C).ready(function(){F()}),this},e.belowthefold=function(C,B){var F;return F=B.container===E||B.container===t?(t.innerHeight?t.innerHeight:D.height())+D.scrollTop():e(B.container).offset().top+e(B.container).height(),F<=e(C).offset().top-B.threshold},e.rightoffold=function(C,B){var F;return F=B.container===E||B.container===t?D.width()+D.scrollLeft():e(B.container).offset().left+e(B.container).width(),F<=e(C).offset().left-B.threshold},e.abovethetop=function(C,B){var F;return F=B.container===E||B.container===t?D.scrollTop():e(B.container).offset().top,F>=e(C).offset().top+B.threshold+e(C).height()},e.leftofbegin=function(C,B){var F;return F=B.container===E||B.container===t?D.scrollLeft():e(B.container).offset().left,F>=e(C).offset().left+B.threshold+e(C).width()},e.inviewport=function(t,C){return!(e.rightoffold(t,C)||e.leftofbegin(t,C)||e.belowthefold(t,C)||e.abovethetop(t,C))},e.extend(e.expr[":"],{"below-the-fold":function(t){return e.belowthefold(t,{threshold:0})},"above-the-top":function(t){return!e.belowthefold(t,{threshold:0})},"right-of-screen":function(t){return e.rightoffold(t,{threshold:0})},"left-of-screen":function(t){return!e.rightoffold(t,{threshold:0})},"in-viewport":function(t){return e.inviewport(t,{threshold:0})},"above-the-fold":function(t){return!e.belowthefold(t,{threshold:0})},"right-of-fold":function(t){return e.rightoffold(t,{threshold:0})},"left-of-fold":function(t){return!e.rightoffold(t,{threshold:0})}})}(jQuery,window,document);
//

!function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.PhotoSwipe=t()}(this,function(){var e=function(e,t,n,o){var i={features:null,bind:function(e,t,n,o){var i=(o?"remove":"add")+"EventListener";t=t.split(" ");for(var r=0;r<t.length;r++){t[r]&&e[i](t[r],n,!1)}},isArray:function(e){return e instanceof Array},createEl:function(e,t){var n=document.createElement(t||"div");return e&&(n.className=e),n},getScrollY:function(){var e=window.pageYOffset;return void 0!==e?e:document.documentElement.scrollTop},unbind:function(e,t,n){i.bind(e,t,n,!0)},removeClass:function(e,t){var n=new RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(n," ").replace(/^\s\s*/,"").replace(/\s\s*$/,"")},addClass:function(e,t){i.hasClass(e,t)||(e.className+=(e.className?" ":"")+t)},hasClass:function(e,t){return e.className&&new RegExp("(^|\\s)"+t+"(\\s|$)").test(e.className)},getChildByClass:function(e,t){for(var n=e.firstChild;n;){if(i.hasClass(n,t)){return n}n=n.nextSibling}},arraySearch:function(e,t,n){for(var o=e.length;o--;){if(e[o][n]===t){return o}}return -1},extend:function(e,t,n){for(var o in t){if(t.hasOwnProperty(o)){if(n&&e.hasOwnProperty(o)){continue}e[o]=t[o]}}},easing:{sine:{out:function(e){return Math.sin(e*(Math.PI/2))},inOut:function(e){return -(Math.cos(Math.PI*e)-1)/2}},cubic:{out:function(e){return --e*e*e+1}}},detectFeatures:function(){if(i.features){return i.features}var e=i.createEl(),t=e.style,n="",o={};if(o.oldIE=document.all&&!document.addEventListener,o.touch="ontouchstart" in window,window.requestAnimationFrame&&(o.raf=window.requestAnimationFrame,o.caf=window.cancelAnimationFrame),o.pointerEvent=navigator.pointerEnabled||navigator.msPointerEnabled,!o.pointerEvent){var r=navigator.userAgent;if(/iP(hone|od)/.test(navigator.platform)){var a=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);a&&a.length>0&&(a=parseInt(a[1],10),a>=1&&a<8&&(o.isOldIOSPhone=!0))}var s=r.match(/Android\s([0-9\.]*)/),l=s?s[1]:0;l=parseFloat(l),l>=1&&(l<4.4&&(o.isOldAndroid=!0),o.androidVersion=l),o.isMobileOpera=/opera mini|opera mobi/i.test(r)}for(var c,p,d=["transform","perspective","animationName"],u=["","webkit","Moz","ms","O"],f=0;f<4;f++){n=u[f];for(var h=0;h<3;h++){c=d[h],p=n+(n?c.charAt(0).toUpperCase()+c.slice(1):c),!o[c]&&p in t&&(o[c]=p)}n&&!o.raf&&(n=n.toLowerCase(),o.raf=window[n+"RequestAnimationFrame"],o.raf&&(o.caf=window[n+"CancelAnimationFrame"]||window[n+"CancelRequestAnimationFrame"]))}if(!o.raf){var m=0;o.raf=function(e){var t=(new Date).getTime(),n=Math.max(0,16-(t-m)),o=window.setTimeout(function(){e(t+n)},n);return m=t+n,o},o.caf=function(e){clearTimeout(e)}}return o.svg=!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,i.features=o,o}};i.detectFeatures(),i.features.oldIE&&(i.bind=function(e,t,n,o){t=t.split(" ");for(var i,r=(o?"detach":"attach")+"Event",a=function(){n.handleEvent.call(n)},s=0;s<t.length;s++){if(i=t[s]){if("object"==typeof n&&n.handleEvent){if(o){if(!n["oldIE"+i]){return !1}}else{n["oldIE"+i]=a}e[r]("on"+i,n["oldIE"+i])}else{e[r]("on"+i,n)}}}});var r=this,a=25,s=3,l={allowPanToNext:!0,spacing:0.12,bgOpacity:1,mouseUsed:!1,loop:!0,pinchToClose:!0,closeOnScroll:!0,closeOnVerticalDrag:!0,verticalDragRange:0.75,hideAnimationDuration:333,showAnimationDuration:333,showHideOpacity:!1,focus:!0,escKey:!0,arrowKeys:!0,mainScrollEndFriction:0.35,panEndFriction:0.35,isClickableElement:function(e){return"A"===e.tagName},getDoubleTapZoom:function(e,t){return e?1:t.initialZoomLevel<0.7?1:1.33},maxSpreadZoom:1.33,modal:!0,scaleMode:"fit"};i.extend(l,o);var c,p,d,u,f,h,m,g,y,v,b,w,x,_,T,S,k,C,I,$,E,A,N,D,j,M,O,P,F,L,z,q,R,H,B,X,Y,W,Z,U,K,V,G,Q,J,ee,te,ne,oe,ie,re,ae,se,le,ce,pe,de,ue=function(){return{x:0,y:0}},fe=ue(),he=ue(),me=ue(),ge={},ye=0,ve={},be=ue(),we=0,xe=!0,_e=[],Te={},Se=!1,ke=function(e,t){i.extend(r,t.publicMethods),_e.push(e)},Ce=function(e){var t=en();return e>t-1?e-t:e<0?t+e:e},Ie={},$e=function(e,t){return Ie[e]||(Ie[e]=[]),Ie[e].push(t)},Ee=function(e){var t=Ie[e];if(t){var n=Array.prototype.slice.call(arguments);n.shift();for(var o=0;o<t.length;o++){t[o].apply(r,n)}}},Ae=function(){return(new Date).getTime()},Ne=function(e){ce=e,r.bg.style.opacity=e*l.bgOpacity},De=function(e,t,n,o,i){(!Se||i&&i!==r.currItem)&&(o/=i?i.fitRatio:r.currItem.fitRatio),e[A]=w+t+"px, "+n+"px"+x+" scale("+o+")"},je=function(e){ie&&(e&&(v>r.currItem.fitRatio?Se||(fn(r.currItem,!1,!0),Se=!0):Se&&(fn(r.currItem),Se=!1)),De(ie,me.x,me.y,v))},Me=function(e){e.container&&De(e.container.style,e.initialPosition.x,e.initialPosition.y,e.initialZoomLevel,e)},Oe=function(e,t){t[A]=w+e+"px, 0px"+x},Pe=function(e,t){if(!l.loop&&t){var n=u+(be.x*ye-e)/be.x,o=Math.round(e-bt.x);(n<0&&o>0||n>=en()-1&&o<0)&&(e=bt.x+o*l.mainScrollEndFriction)}bt.x=e,Oe(e,f)},Fe=function(e,t){var n=wt[e]-ve[e];return he[e]+fe[e]+n-n*(t/b)},Le=function(e,t){e.x=t.x,e.y=t.y,t.id&&(e.id=t.id)},ze=function(e){e.x=Math.round(e.x),e.y=Math.round(e.y)
},qe=null,Re=function(){qe&&(i.unbind(document,"mousemove",Re),i.addClass(e,"pswp--has_mouse"),l.mouseUsed=!0,Ee("mouseUsed")),qe=setTimeout(function(){qe=null},100)},He=function(){i.bind(document,"keydown",r),z.transform&&i.bind(r.scrollWrap,"click",r),l.mouseUsed||i.bind(document,"mousemove",Re),i.bind(window,"resize scroll orientationchange",r),Ee("bindEvents")},Be=function(){i.unbind(window,"resize scroll orientationchange",r),i.unbind(window,"scroll",y.scroll),i.unbind(document,"keydown",r),i.unbind(document,"mousemove",Re),z.transform&&i.unbind(r.scrollWrap,"click",r),Z&&i.unbind(window,m,r),clearTimeout(q),Ee("unbindEvents")},Xe=function(e,t){var n=cn(r.currItem,ge,e);return t&&(oe=n),n},Ye=function(e){return e||(e=r.currItem),e.initialZoomLevel},We=function(e){return e||(e=r.currItem),e.w>0?l.maxSpreadZoom:1},Ze=function(e,t,n,o){return o===r.currItem.initialZoomLevel?(n[e]=r.currItem.initialPosition[e],!0):(n[e]=Fe(e,o),n[e]>t.min[e]?(n[e]=t.min[e],!0):n[e]<t.max[e]&&(n[e]=t.max[e],!0))},Ue=function(){if(A){var t=z.perspective&&!D;return w="translate"+(t?"3d(":"("),void (x=z.perspective?", 0px)":")")}A="left",i.addClass(e,"pswp--ie"),Oe=function(e,t){t.left=e+"px"},Me=function(e){var t=e.fitRatio>1?1:e.fitRatio,n=e.container.style,o=t*e.w,i=t*e.h;n.width=o+"px",n.height=i+"px",n.left=e.initialPosition.x+"px",n.top=e.initialPosition.y+"px"},je=function(){if(ie){var e=ie,t=r.currItem,n=t.fitRatio>1?1:t.fitRatio,o=n*t.w,i=n*t.h;e.width=o+"px",e.height=i+"px",e.left=me.x+"px",e.top=me.y+"px"}}},Ke=function(e){var t="";l.escKey&&27===e.keyCode?t="close":l.arrowKeys&&(37===e.keyCode?t="prev":39===e.keyCode&&(t="next")),t&&(e.ctrlKey||e.altKey||e.shiftKey||e.metaKey||(e.preventDefault?e.preventDefault():e.returnValue=!1,r[t]()))},Ve=function(e){e&&(V||K||re||Y)&&(e.preventDefault(),e.stopPropagation())},Ge=function(){r.setScrollOffset(0,i.getScrollY())},Qe={},Je=0,et=function(e){Qe[e]&&(Qe[e].raf&&M(Qe[e].raf),Je--,delete Qe[e])},tt=function(e){Qe[e]&&et(e),Qe[e]||(Je++,Qe[e]={})},nt=function(){for(var e in Qe){Qe.hasOwnProperty(e)&&et(e)}},ot=function(e,t,n,o,i,r,a){var s,l=Ae();tt(e);var c=function(){if(Qe[e]){if(s=Ae()-l,s>=o){return et(e),r(n),void (a&&a())}r((n-t)*i(s/o)+t),Qe[e].raf=j(c)}};c()},it={shout:Ee,listen:$e,viewportSize:ge,options:l,isMainScrollAnimating:function(){return re},getZoomLevel:function(){return v},getCurrentIndex:function(){return u},isDragging:function(){return Z},isZooming:function(){return ee},setScrollOffset:function(e,t){ve.x=e,L=ve.y=t,Ee("updateScrollOffset",ve)},applyZoomPan:function(e,t,n,o){me.x=t,me.y=n,v=e,je(o)},init:function(){if(!c&&!p){var n;r.framework=i,r.template=e,r.bg=i.getChildByClass(e,"pswp__bg"),O=e.className,c=!0,z=i.detectFeatures(),j=z.raf,M=z.caf,A=z.transform,F=z.oldIE,r.scrollWrap=i.getChildByClass(e,"pswp__scroll-wrap"),r.container=i.getChildByClass(r.scrollWrap,"pswp__container"),f=r.container.style,r.itemHolders=S=[{el:r.container.children[0],wrap:0,index:-1},{el:r.container.children[1],wrap:0,index:-1},{el:r.container.children[2],wrap:0,index:-1}],S[0].el.style.display=S[2].el.style.display="none",Ue(),y={resize:r.updateSize,orientationchange:function(){clearTimeout(q),q=setTimeout(function(){ge.x!==r.scrollWrap.clientWidth&&r.updateSize()},500)},scroll:Ge,keydown:Ke,click:Ve};var o=z.isOldIOSPhone||z.isOldAndroid||z.isMobileOpera;for(z.animationName&&z.transform&&!o||(l.showAnimationDuration=l.hideAnimationDuration=0),n=0;n<_e.length;n++){r["init"+_e[n]]()}if(t){var a=r.ui=new t(r,i);a.init()}Ee("firstUpdate"),u=u||l.index||0,(isNaN(u)||u<0||u>=en())&&(u=0),r.currItem=Jt(u),(z.isOldIOSPhone||z.isOldAndroid)&&(xe=!1),e.setAttribute("aria-hidden","false"),l.modal&&(xe?e.style.position="fixed":(e.style.position="absolute",e.style.top=i.getScrollY()+"px")),void 0===L&&(Ee("initialLayout"),L=P=i.getScrollY());var d="pswp--open ";for(l.mainClass&&(d+=l.mainClass+" "),l.showHideOpacity&&(d+="pswp--animate_opacity "),d+=D?"pswp--touch":"pswp--notouch",d+=z.animationName?" pswp--css_animation":"",d+=z.svg?" pswp--svg":"",i.addClass(e,d),r.updateSize(),h=-1,we=null,n=0;n<s;n++){Oe((n+h)*be.x,S[n].el.style)}F||i.bind(r.scrollWrap,g,r),$e("initialZoomInEnd",function(){r.setContent(S[0],u-1),r.setContent(S[2],u+1),S[0].el.style.display=S[2].el.style.display="block",l.focus&&e.focus(),He()}),r.setContent(S[1],u),r.updateCurrItem(),Ee("afterInit"),xe||(_=setInterval(function(){Je||Z||ee||v!==r.currItem.initialZoomLevel||r.updateSize()},1000)),i.addClass(e,"pswp--visible")}},close:function(){c&&(c=!1,p=!0,Ee("close"),Be(),nn(r.currItem,null,!0,r.destroy))},destroy:function(){Ee("destroy"),Kt&&clearTimeout(Kt),e.setAttribute("aria-hidden","true"),e.className=O.replace(/pswp--.*/g,"").replace(/^[\s　]|[ ]$/g,""),_&&clearInterval(_),i.unbind(r.scrollWrap,g,r),i.unbind(window,"scroll",r),kt(),nt(),Ie=null},panTo:function(e,t,n){n||(e>oe.min.x?e=oe.min.x:e<oe.max.x&&(e=oe.max.x),t>oe.min.y?t=oe.min.y:t<oe.max.y&&(t=oe.max.y)),me.x=e,me.y=t,je()},handleEvent:function(e){e=e||window.event,y[e.type]&&y[e.type](e)
},goTo:function(e){e=Ce(e);var t=e-u;we=t,u=e,r.currItem=Jt(u),ye-=t,Pe(be.x*ye),nt(),re=!1,r.updateCurrItem()},next:function(){r.goTo(u+1)},prev:function(){r.goTo(u-1)},updateCurrZoomItem:function(e){if(e&&Ee("beforeChange",0),S[1].el.children.length){var t=S[1].el.children[0];ie=i.hasClass(t,"pswp__zoom-wrap")?t.style:null}else{ie=null}oe=r.currItem.bounds,b=v=r.currItem.initialZoomLevel,me.x=oe.center.x,me.y=oe.center.y,e&&Ee("afterChange")},invalidateCurrItems:function(){T=!0;for(var e=0;e<s;e++){S[e].item&&(S[e].item.needsUpdate=!0)}},updateCurrItem:function(e){if(0!==we){var t,n=Math.abs(we);if(!(e&&n<2)){r.currItem=Jt(u),Se=!1,Ee("beforeChange",we),n>=s&&(h+=we+(we>0?-s:s),n=s);for(var o=0;o<n;o++){we>0?(t=S.shift(),S[s-1]=t,h++,Oe((h+2)*be.x,t.el.style),r.setContent(t,u-n+o+1+1)):(t=S.pop(),S.unshift(t),h--,Oe(h*be.x,t.el.style),r.setContent(t,u+n-o-1-1))}if(ie&&1===Math.abs(we)){var i=Jt(k);i.initialZoomLevel!==v&&(cn(i,ge),fn(i),Me(i))}we=0,r.updateCurrZoomItem(),k=u,Ee("afterChange")}}},updateSize:function(t){if(!xe&&l.modal){var n=i.getScrollY();if(L!==n&&(e.style.top=n+"px",L=n),!t&&Te.x===window.innerWidth&&Te.y===window.innerHeight){return}Te.x=window.innerWidth,Te.y=window.innerHeight,e.style.height=Te.y+"px"}if(ge.x=r.scrollWrap.clientWidth,ge.y=r.scrollWrap.clientHeight,Ge(),be.x=ge.x+Math.round(ge.x*l.spacing),be.y=ge.y,Pe(be.x*ye),Ee("beforeResize"),void 0!==h){for(var o,a,c,p=0;p<s;p++){o=S[p],Oe((p+h)*be.x,o.el.style),c=u+p-1,l.loop&&en()>2&&(c=Ce(c)),a=Jt(c),a&&(T||a.needsUpdate||!a.bounds)?(r.cleanSlide(a),r.setContent(o,c),1===p&&(r.currItem=a,r.updateCurrZoomItem(!0)),a.needsUpdate=!1):o.index===-1&&c>=0&&r.setContent(o,c),a&&a.container&&(cn(a,ge),fn(a),Me(a))}T=!1}b=v=r.currItem.initialZoomLevel,oe=r.currItem.bounds,oe&&(me.x=oe.center.x,me.y=oe.center.y,je(!0)),Ee("resize")},zoomTo:function(e,t,n,o,r){t&&(b=v,wt.x=Math.abs(t.x)-me.x,wt.y=Math.abs(t.y)-me.y,Le(he,me));var a=Xe(e,!1),s={};Ze("x",a,s,e),Ze("y",a,s,e);var l=v,c={x:me.x,y:me.y};ze(s);var p=function(t){1===t?(v=e,me.x=s.x,me.y=s.y):(v=(e-l)*t+l,me.x=(s.x-c.x)*t+c.x,me.y=(s.y-c.y)*t+c.y),r&&r(t),je(1===t)};n?ot("customZoomTo",0,1,n,o||i.easing.sine.inOut,p):p(1)}},rt=30,at=10,st={},lt={},ct={},pt={},dt={},ut=[],ft={},ht=[],mt={},gt=0,yt=ue(),vt=0,bt=ue(),wt=ue(),xt=ue(),_t=function(e,t){return e.x===t.x&&e.y===t.y},Tt=function(e,t){return Math.abs(e.x-t.x)<a&&Math.abs(e.y-t.y)<a},St=function(e,t){return mt.x=Math.abs(e.x-t.x),mt.y=Math.abs(e.y-t.y),Math.sqrt(mt.x*mt.x+mt.y*mt.y)},kt=function(){G&&(M(G),G=null)},Ct=function(){Z&&(G=j(Ct),Ht())},It=function(){return !("fit"===l.scaleMode&&v===r.currItem.initialZoomLevel)},$t=function(e,t){return !(!e||e===document)&&!(e.getAttribute("class")&&e.getAttribute("class").indexOf("pswp__scroll-wrap")>-1)&&(t(e)?e:$t(e.parentNode,t))},Et={},At=function(e,t){return Et.prevent=!$t(e.target,l.isClickableElement),Ee("preventDragEvent",e,t,Et),Et.prevent},Nt=function(e,t){return t.x=e.pageX,t.y=e.pageY,t.id=e.identifier,t},Dt=function(e,t,n){n.x=0.5*(e.x+t.x),n.y=0.5*(e.y+t.y)},jt=function(e,t,n){if(e-H>50){var o=ht.length>2?ht.shift():{};o.x=t,o.y=n,ht.push(o),H=e}},Mt=function(){var e=me.y-r.currItem.initialPosition.y;return 1-Math.abs(e/(ge.y/2))},Ot={},Pt={},Ft=[],Lt=function(e){for(;Ft.length>0;){Ft.pop()}return N?(de=0,ut.forEach(function(e){0===de?Ft[0]=e:1===de&&(Ft[1]=e),de++})):e.type.indexOf("touch")>-1?e.touches&&e.touches.length>0&&(Ft[0]=Nt(e.touches[0],Ot),e.touches.length>1&&(Ft[1]=Nt(e.touches[1],Pt))):(Ot.x=e.pageX,Ot.y=e.pageY,Ot.id="",Ft[0]=Ot),Ft},zt=function(e,t){var n,o,i,a,s=0,c=me[e]+t[e],p=t[e]>0,d=bt.x+t.x,u=bt.x-ft.x;return n=c>oe.min[e]||c<oe.max[e]?l.panEndFriction:1,c=me[e]+t[e]*n,!l.allowPanToNext&&v!==r.currItem.initialZoomLevel||(ie?"h"!==ae||"x"!==e||K||(p?(c>oe.min[e]&&(n=l.panEndFriction,s=oe.min[e]-c,o=oe.min[e]-he[e]),(o<=0||u<0)&&en()>1?(a=d,u<0&&d>ft.x&&(a=ft.x)):oe.min.x!==oe.max.x&&(i=c)):(c<oe.max[e]&&(n=l.panEndFriction,s=c-oe.max[e],o=he[e]-oe.max[e]),(o<=0||u>0)&&en()>1?(a=d,u>0&&d<ft.x&&(a=ft.x)):oe.min.x!==oe.max.x&&(i=c))):a=d,"x"!==e)?void (re||Q||v>r.currItem.fitRatio&&(me[e]+=t[e]*n)):(void 0!==a&&(Pe(a,!0),Q=a!==ft.x),oe.min.x!==oe.max.x&&(void 0!==i?me.x=i:Q||(me.x+=t.x*n)),void 0!==a)},qt=function(e){if(!("mousedown"===e.type&&e.button>0)){if(Qt){return void e.preventDefault()}if(!W||"mousedown"!==e.type){if(At(e,!0)&&e.preventDefault(),Ee("pointerDown"),N){var t=i.arraySearch(ut,e.pointerId,"id");t<0&&(t=ut.length),ut[t]={x:e.pageX,y:e.pageY,id:e.pointerId}}var n=Lt(e),o=n.length;J=null,nt(),Z&&1!==o||(Z=se=!0,i.bind(window,m,r),X=pe=le=Y=Q=V=U=K=!1,ae=null,Ee("firstTouchStart",n),Le(he,me),fe.x=fe.y=0,Le(pt,n[0]),Le(dt,pt),ft.x=be.x*ye,ht=[{x:pt.x,y:pt.y}],H=R=Ae(),Xe(v,!0),kt(),Ct()),!ee&&o>1&&!re&&!Q&&(b=v,K=!1,ee=U=!0,fe.y=fe.x=0,Le(he,me),Le(st,n[0]),Le(lt,n[1]),Dt(st,lt,xt),wt.x=Math.abs(xt.x)-me.x,wt.y=Math.abs(xt.y)-me.y,te=ne=St(st,lt))}}},Rt=function(e){if(e.preventDefault(),N){var t=i.arraySearch(ut,e.pointerId,"id");
if(t>-1){var n=ut[t];n.x=e.pageX,n.y=e.pageY}}if(Z){var o=Lt(e);if(ae||V||ee){J=o}else{if(bt.x!==be.x*ye){ae="h"}else{var r=Math.abs(o[0].x-pt.x)-Math.abs(o[0].y-pt.y);Math.abs(r)>=at&&(ae=r>0?"h":"v",J=o)}}}},Ht=function(){if(J){var e=J.length;if(0!==e){if(Le(st,J[0]),ct.x=st.x-pt.x,ct.y=st.y-pt.y,ee&&e>1){if(pt.x=st.x,pt.y=st.y,!ct.x&&!ct.y&&_t(J[1],lt)){return}Le(lt,J[1]),K||(K=!0,Ee("zoomGestureStarted"));var t=St(st,lt),n=Zt(t);n>r.currItem.initialZoomLevel+r.currItem.initialZoomLevel/15&&(pe=!0);var o=1,i=Ye(),a=We();if(n<i){if(l.pinchToClose&&!pe&&b<=r.currItem.initialZoomLevel){var s=i-n,c=1-s/(i/1.2);Ne(c),Ee("onPinchClose",c),le=!0}else{o=(i-n)/i,o>1&&(o=1),n=i-o*(i/3)}}else{n>a&&(o=(n-a)/(6*i),o>1&&(o=1),n=a+o*i)}o<0&&(o=0),te=t,Dt(st,lt,yt),fe.x+=yt.x-xt.x,fe.y+=yt.y-xt.y,Le(xt,yt),me.x=Fe("x",n),me.y=Fe("y",n),X=n>v,v=n,je()}else{if(!ae){return}if(se&&(se=!1,Math.abs(ct.x)>=at&&(ct.x-=J[0].x-dt.x),Math.abs(ct.y)>=at&&(ct.y-=J[0].y-dt.y)),pt.x=st.x,pt.y=st.y,0===ct.x&&0===ct.y){return}if("v"===ae&&l.closeOnVerticalDrag&&!It()){fe.y+=ct.y,me.y+=ct.y;var p=Mt();return Y=!0,Ee("onVerticalDrag",p),Ne(p),void je()}jt(Ae(),st.x,st.y),V=!0,oe=r.currItem.bounds;var d=zt("x",ct);d||(zt("y",ct),ze(me),je())}}}},Bt=function(e){if(z.isOldAndroid){if(W&&"mouseup"===e.type){return}e.type.indexOf("touch")>-1&&(clearTimeout(W),W=setTimeout(function(){W=0},600))}Ee("pointerUp"),At(e,!1)&&e.preventDefault();var t;if(N){var n=i.arraySearch(ut,e.pointerId,"id");if(n>-1){if(t=ut.splice(n,1)[0],navigator.pointerEnabled){t.type=e.pointerType||"mouse"}else{var o={4:"mouse",2:"touch",3:"pen"};t.type=o[e.pointerType],t.type||(t.type=e.pointerType||"mouse")}}}var a,s=Lt(e),c=s.length;if("mouseup"===e.type&&(c=0),2===c){return J=null,!0}1===c&&Le(dt,s[0]),0!==c||ae||re||(t||("mouseup"===e.type?t={x:e.pageX,y:e.pageY,type:"mouse"}:e.changedTouches&&e.changedTouches[0]&&(t={x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY,type:"touch"})),Ee("touchRelease",e,t));var p=-1;if(0===c&&(Z=!1,i.unbind(window,m,r),kt(),ee?p=0:vt!==-1&&(p=Ae()-vt)),vt=1===c?Ae():-1,a=p!==-1&&p<150?"zoom":"swipe",ee&&c<2&&(ee=!1,1===c&&(a="zoomPointerUp"),Ee("zoomGestureEnded")),J=null,V||K||re||Y){if(nt(),B||(B=Xt()),B.calculateSwipeSpeed("x"),Y){var d=Mt();if(d<l.verticalDragRange){r.close()}else{var u=me.y,f=ce;ot("verticalDrag",0,1,300,i.easing.cubic.out,function(e){me.y=(r.currItem.initialPosition.y-u)*e+u,Ne((1-f)*e+f),je()}),Ee("onVerticalDrag",1)}}else{if((Q||re)&&0===c){var h=Wt(a,B);if(h){return}a="zoomPointerUp"}if(!re){return"swipe"!==a?void Ut():void (!Q&&v>r.currItem.fitRatio&&Yt(B))}}}},Xt=function(){var e,t,n={lastFlickOffset:{},lastFlickDist:{},lastFlickSpeed:{},slowDownRatio:{},slowDownRatioReverse:{},speedDecelerationRatio:{},speedDecelerationRatioAbs:{},distanceOffset:{},backAnimDestination:{},backAnimStarted:{},calculateSwipeSpeed:function(o){ht.length>1?(e=Ae()-H+50,t=ht[ht.length-2][o]):(e=Ae()-R,t=dt[o]),n.lastFlickOffset[o]=pt[o]-t,n.lastFlickDist[o]=Math.abs(n.lastFlickOffset[o]),n.lastFlickDist[o]>20?n.lastFlickSpeed[o]=n.lastFlickOffset[o]/e:n.lastFlickSpeed[o]=0,Math.abs(n.lastFlickSpeed[o])<0.1&&(n.lastFlickSpeed[o]=0),n.slowDownRatio[o]=0.95,n.slowDownRatioReverse[o]=1-n.slowDownRatio[o],n.speedDecelerationRatio[o]=1},calculateOverBoundsAnimOffset:function(e,t){n.backAnimStarted[e]||(me[e]>oe.min[e]?n.backAnimDestination[e]=oe.min[e]:me[e]<oe.max[e]&&(n.backAnimDestination[e]=oe.max[e]),void 0!==n.backAnimDestination[e]&&(n.slowDownRatio[e]=0.7,n.slowDownRatioReverse[e]=1-n.slowDownRatio[e],n.speedDecelerationRatioAbs[e]<0.05&&(n.lastFlickSpeed[e]=0,n.backAnimStarted[e]=!0,ot("bounceZoomPan"+e,me[e],n.backAnimDestination[e],t||300,i.easing.sine.out,function(t){me[e]=t,je()}))))},calculateAnimOffset:function(e){n.backAnimStarted[e]||(n.speedDecelerationRatio[e]=n.speedDecelerationRatio[e]*(n.slowDownRatio[e]+n.slowDownRatioReverse[e]-n.slowDownRatioReverse[e]*n.timeDiff/10),n.speedDecelerationRatioAbs[e]=Math.abs(n.lastFlickSpeed[e]*n.speedDecelerationRatio[e]),n.distanceOffset[e]=n.lastFlickSpeed[e]*n.speedDecelerationRatio[e]*n.timeDiff,me[e]+=n.distanceOffset[e])},panAnimLoop:function(){if(Qe.zoomPan&&(Qe.zoomPan.raf=j(n.panAnimLoop),n.now=Ae(),n.timeDiff=n.now-n.lastNow,n.lastNow=n.now,n.calculateAnimOffset("x"),n.calculateAnimOffset("y"),je(),n.calculateOverBoundsAnimOffset("x"),n.calculateOverBoundsAnimOffset("y"),n.speedDecelerationRatioAbs.x<0.05&&n.speedDecelerationRatioAbs.y<0.05)){return me.x=Math.round(me.x),me.y=Math.round(me.y),je(),void et("zoomPan")}}};return n},Yt=function(e){return e.calculateSwipeSpeed("y"),oe=r.currItem.bounds,e.backAnimDestination={},e.backAnimStarted={},Math.abs(e.lastFlickSpeed.x)<=0.05&&Math.abs(e.lastFlickSpeed.y)<=0.05?(e.speedDecelerationRatioAbs.x=e.speedDecelerationRatioAbs.y=0,e.calculateOverBoundsAnimOffset("x"),e.calculateOverBoundsAnimOffset("y"),!0):(tt("zoomPan"),e.lastNow=Ae(),void e.panAnimLoop())},Wt=function(e,t){var n;re||(gt=u);var o;if("swipe"===e){var a=pt.x-dt.x,s=t.lastFlickDist.x<10;
a>rt&&(s||t.lastFlickOffset.x>20)?o=-1:a<-rt&&(s||t.lastFlickOffset.x<-20)&&(o=1)}var c;o&&(u+=o,u<0?(u=l.loop?en()-1:0,c=!0):u>=en()&&(u=l.loop?0:en()-1,c=!0),c&&!l.loop||(we+=o,ye-=o,n=!0));var p,d=be.x*ye,f=Math.abs(d-bt.x);return n||d>bt.x==t.lastFlickSpeed.x>0?(p=Math.abs(t.lastFlickSpeed.x)>0?f/Math.abs(t.lastFlickSpeed.x):333,p=Math.min(p,400),p=Math.max(p,250)):p=333,gt===u&&(n=!1),re=!0,Ee("mainScrollAnimStart"),ot("mainScroll",bt.x,d,p,i.easing.cubic.out,Pe,function(){nt(),re=!1,gt=-1,(n||gt!==u)&&r.updateCurrItem(),Ee("mainScrollAnimComplete")}),n&&r.updateCurrItem(!0),n},Zt=function(e){return 1/ne*e*b},Ut=function(){var e=v,t=Ye(),n=We();v<t?e=t:v>n&&(e=n);var o,a=1,s=ce;return le&&!X&&!pe&&v<t?(r.close(),!0):(le&&(o=function(e){Ne((a-s)*e+s)}),r.zoomTo(e,0,200,i.easing.cubic.out,o),!0)};ke("Gestures",{publicMethods:{initGestures:function(){var e=function(e,t,n,o,i){C=e+t,I=e+n,$=e+o,E=i?e+i:""};N=z.pointerEvent,N&&z.touch&&(z.touch=!1),N?navigator.pointerEnabled?e("pointer","down","move","up","cancel"):e("MSPointer","Down","Move","Up","Cancel"):z.touch?(e("touch","start","move","end","cancel"),D=!0):e("mouse","down","move","up"),m=I+" "+$+" "+E,g=C,N&&!D&&(D=navigator.maxTouchPoints>1||navigator.msMaxTouchPoints>1),r.likelyTouchDevice=D,y[C]=qt,y[I]=Rt,y[$]=Bt,E&&(y[E]=y[$]),z.touch&&(g+=" mousedown",m+=" mousemove mouseup",y.mousedown=y[C],y.mousemove=y[I],y.mouseup=y[$]),D||(l.allowPanToNext=!1)}}});var Kt,Vt,Gt,Qt,Jt,en,tn,nn=function(t,n,o,a){Kt&&clearTimeout(Kt),Qt=!0,Gt=!0;var s;t.initialLayout?(s=t.initialLayout,t.initialLayout=null):s=l.getThumbBoundsFn&&l.getThumbBoundsFn(u);var c=o?l.hideAnimationDuration:l.showAnimationDuration,p=function(){et("initialZoom"),o?(r.template.removeAttribute("style"),r.bg.removeAttribute("style")):(Ne(1),n&&(n.style.display="block"),i.addClass(e,"pswp--animated-in"),Ee("initialZoom"+(o?"OutEnd":"InEnd"))),a&&a(),Qt=!1};if(!c||!s||void 0===s.x){return Ee("initialZoom"+(o?"Out":"In")),v=t.initialZoomLevel,Le(me,t.initialPosition),je(),e.style.opacity=o?0:1,Ne(1),void (c?setTimeout(function(){p()},c):p())}var f=function(){var n=d,a=!r.currItem.src||r.currItem.loadError||l.showHideOpacity;t.miniImg&&(t.miniImg.style.webkitBackfaceVisibility="hidden"),o||(v=s.w/t.w,me.x=s.x,me.y=s.y-P,r[a?"template":"bg"].style.opacity=0.001,je()),tt("initialZoom"),o&&!n&&i.removeClass(e,"pswp--animated-in"),a&&(o?i[(n?"remove":"add")+"Class"](e,"pswp--animate_opacity"):setTimeout(function(){i.addClass(e,"pswp--animate_opacity")},30)),Kt=setTimeout(function(){if(Ee("initialZoom"+(o?"Out":"In")),o){var r=s.w/t.w,l={x:me.x,y:me.y},d=v,u=ce,f=function(t){1===t?(v=r,me.x=s.x,me.y=s.y-L):(v=(r-d)*t+d,me.x=(s.x-l.x)*t+l.x,me.y=(s.y-L-l.y)*t+l.y),je(),a?e.style.opacity=1-t:Ne(u-t*u)};n?ot("initialZoom",0,1,c,i.easing.cubic.out,f,p):(f(1),Kt=setTimeout(p,c+20))}else{v=t.initialZoomLevel,Le(me,t.initialPosition),je(),Ne(1),a?e.style.opacity=1:Ne(1),Kt=setTimeout(p,c+20)}},o?25:90)};f()},on={},rn=[],an={index:0,errorMsg:'<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',forceProgressiveLoading:!1,preload:[1,1],getNumItemsFn:function(){return Vt.length}},sn=function(){return{center:{x:0,y:0},max:{x:0,y:0},min:{x:0,y:0}}},ln=function(e,t,n){var o=e.bounds;o.center.x=Math.round((on.x-t)/2),o.center.y=Math.round((on.y-n)/2)+e.vGap.top,o.max.x=t>on.x?Math.round(on.x-t):o.center.x,o.max.y=n>on.y?Math.round(on.y-n)+e.vGap.top:o.center.y,o.min.x=t>on.x?0:o.center.x,o.min.y=n>on.y?e.vGap.top:o.center.y},cn=function(e,t,n){if(e.src&&!e.loadError){var o=!n;if(o&&(e.vGap||(e.vGap={top:0,bottom:0}),Ee("parseVerticalMargin",e)),on.x=t.x,on.y=t.y-e.vGap.top-e.vGap.bottom,o){var i=on.x/e.w,r=on.y/e.h;e.fitRatio=i<r?i:r;var a=l.scaleMode;"orig"===a?n=1:"fit"===a&&(n=e.fitRatio),n>1&&(n=1),e.initialZoomLevel=n,e.bounds||(e.bounds=sn())}if(!n){return}return ln(e,e.w*n,e.h*n),o&&n===e.initialZoomLevel&&(e.initialPosition=e.bounds.center),e.bounds}return e.w=e.h=0,e.initialZoomLevel=e.fitRatio=1,e.bounds=sn(),e.initialPosition=e.bounds.center,e.bounds},pn=function(e,t,n,o,i,a){t.loadError||o&&(t.imageAppended=!0,fn(t,o,t===r.currItem&&Se),n.appendChild(o),a&&setTimeout(function(){t&&t.loaded&&t.placeholder&&(t.placeholder.style.display="none",t.placeholder=null)},500))},dn=function(e){e.loading=!0,e.loaded=!1;var t=e.img=i.createEl("pswp__img","img"),n=function(){e.loading=!1,e.loaded=!0,e.loadComplete?e.loadComplete(e):e.img=null,t.onload=t.onerror=null,t=null};return t.onload=n,t.onerror=function(){e.loadError=!0,n()},t.src=e.src,t},un=function(e,t){if(e.src&&e.loadError&&e.container){return t&&(e.container.innerHTML=""),e.container.innerHTML=l.errorMsg.replace("%url%",e.src),!0}},fn=function(e,t,n){if(e.src){t||(t=e.container.lastChild);var o=n?e.w:Math.round(e.w*e.fitRatio),i=n?e.h:Math.round(e.h*e.fitRatio);e.placeholder&&!e.loaded&&(e.placeholder.style.width=o+"px",e.placeholder.style.height=i+"px"),t.style.width=o+"px",t.style.height=i+"px"}},hn=function(){if(rn.length){for(var e,t=0;
t<rn.length;t++){e=rn[t],e.holder.index===e.index&&pn(e.index,e.item,e.baseDiv,e.img,!1,e.clearPlaceholder)}rn=[]}};ke("Controller",{publicMethods:{lazyLoadItem:function(e){e=Ce(e);var t=Jt(e);t&&(!t.loaded&&!t.loading||T)&&(Ee("gettingData",e,t),t.src&&dn(t))},initController:function(){i.extend(l,an,!0),r.items=Vt=n,Jt=r.getItemAt,en=l.getNumItemsFn,tn=l.loop,en()<3&&(l.loop=!1),$e("beforeChange",function(e){var t,n=l.preload,o=null===e||e>=0,i=Math.min(n[0],en()),a=Math.min(n[1],en());for(t=1;t<=(o?a:i);t++){r.lazyLoadItem(u+t)}for(t=1;t<=(o?i:a);t++){r.lazyLoadItem(u-t)}}),$e("initialLayout",function(){r.currItem.initialLayout=l.getThumbBoundsFn&&l.getThumbBoundsFn(u)}),$e("mainScrollAnimComplete",hn),$e("initialZoomInEnd",hn),$e("destroy",function(){for(var e,t=0;t<Vt.length;t++){e=Vt[t],e.container&&(e.container=null),e.placeholder&&(e.placeholder=null),e.img&&(e.img=null),e.preloader&&(e.preloader=null),e.loadError&&(e.loaded=e.loadError=!1)}rn=null})},getItemAt:function(e){return e>=0&&void 0!==Vt[e]&&Vt[e]},allowProgressiveImg:function(){return l.forceProgressiveLoading||!D||l.mouseUsed||screen.width>1200},setContent:function(e,t){l.loop&&(t=Ce(t));var n=r.getItemAt(e.index);n&&(n.container=null);var o,a=r.getItemAt(t);if(!a){return void (e.el.innerHTML="")}Ee("gettingData",t,a),e.index=t,e.item=a;var s=a.container=i.createEl("pswp__zoom-wrap");if(!a.src&&a.html&&(a.html.tagName?s.appendChild(a.html):s.innerHTML=a.html),un(a),cn(a,ge),!a.src||a.loadError||a.loaded){a.src&&!a.loadError&&(o=i.createEl("pswp__img","img"),o.style.opacity=1,o.src=a.src,fn(a,o),pn(t,a,s,o,!0))}else{if(a.loadComplete=function(n){if(c){if(e&&e.index===t){if(un(n,!0)){return n.loadComplete=n.img=null,cn(n,ge),Me(n),void (e.index===u&&r.updateCurrZoomItem())}n.imageAppended?!Qt&&n.placeholder&&(n.placeholder.style.display="none",n.placeholder=null):z.transform&&(re||Qt)?rn.push({item:n,baseDiv:s,img:n.img,index:t,holder:e,clearPlaceholder:!0}):pn(t,n,s,n.img,re||Qt,!0)}n.loadComplete=null,n.img=null,Ee("imageLoadComplete",t,n)}},i.features.transform){var p="pswp__img pswp__img--placeholder";p+=a.msrc?"":" pswp__img--placeholder--blank";var d=i.createEl(p,a.msrc?"img":"");a.msrc&&(d.src=a.msrc),fn(a,d),s.appendChild(d),a.placeholder=d}a.loading||dn(a),r.allowProgressiveImg()&&(!Gt&&z.transform?rn.push({item:a,baseDiv:s,img:a.img,index:t,holder:e}):pn(t,a,s,a.img,!0,!0))}Gt||t!==u?Me(a):(ie=s.style,nn(a,o||a.img)),e.el.innerHTML="",e.el.appendChild(s)},cleanSlide:function(e){e.img&&(e.img.onload=e.img.onerror=null),e.loaded=e.loading=e.img=e.imageAppended=!1}}});var mn,gn={},yn=function(e,t,n){var o=document.createEvent("CustomEvent"),i={origEvent:e,target:e.target,releasePoint:t,pointerType:n||"touch"};o.initCustomEvent("pswpTap",!0,!0,i),e.target.dispatchEvent(o)};ke("Tap",{publicMethods:{initTap:function(){$e("firstTouchStart",r.onTapStart),$e("touchRelease",r.onTapRelease),$e("destroy",function(){gn={},mn=null})},onTapStart:function(e){e.length>1&&(clearTimeout(mn),mn=null)},onTapRelease:function(e,t){if(t&&!V&&!U&&!Je){var n=t;if(mn&&(clearTimeout(mn),mn=null,Tt(n,gn))){return void Ee("doubleTap",n)}if("mouse"===t.type){return void yn(e,t,"mouse")}var o=e.target.tagName.toUpperCase();if("BUTTON"===o||i.hasClass(e.target,"pswp__single-tap")){return void yn(e,t)}Le(gn,n),mn=setTimeout(function(){yn(e,t),mn=null},300)}}}});var vn;ke("DesktopZoom",{publicMethods:{initDesktopZoom:function(){F||(D?$e("mouseUsed",function(){r.setupDesktopZoom()}):r.setupDesktopZoom(!0))},setupDesktopZoom:function(t){vn={};var n="wheel mousewheel DOMMouseScroll";$e("bindEvents",function(){i.bind(e,n,r.handleMouseWheel)}),$e("unbindEvents",function(){vn&&i.unbind(e,n,r.handleMouseWheel)}),r.mouseZoomedIn=!1;var o,a=function(){r.mouseZoomedIn&&(i.removeClass(e,"pswp--zoomed-in"),r.mouseZoomedIn=!1),v<1?i.addClass(e,"pswp--zoom-allowed"):i.removeClass(e,"pswp--zoom-allowed"),s()},s=function(){o&&(i.removeClass(e,"pswp--dragging"),o=!1)};$e("resize",a),$e("afterChange",a),$e("pointerDown",function(){r.mouseZoomedIn&&(o=!0,i.addClass(e,"pswp--dragging"))}),$e("pointerUp",s),t||a()},handleMouseWheel:function(e){if(v<=r.currItem.fitRatio){return l.modal&&(!l.closeOnScroll||Je||Z?e.preventDefault():A&&Math.abs(e.deltaY)>2&&(d=!0,r.close())),!0}if(e.stopPropagation(),vn.x=0,"deltaX" in e){1===e.deltaMode?(vn.x=18*e.deltaX,vn.y=18*e.deltaY):(vn.x=e.deltaX,vn.y=e.deltaY)}else{if("wheelDelta" in e){e.wheelDeltaX&&(vn.x=-0.16*e.wheelDeltaX),e.wheelDeltaY?vn.y=-0.16*e.wheelDeltaY:vn.y=-0.16*e.wheelDelta}else{if(!("detail" in e)){return}vn.y=e.detail}}Xe(v,!0);var t=me.x-vn.x,n=me.y-vn.y;(l.modal||t<=oe.min.x&&t>=oe.max.x&&n<=oe.min.y&&n>=oe.max.y)&&e.preventDefault(),r.panTo(t,n)},toggleDesktopZoom:function(t){t=t||{x:ge.x/2+ve.x,y:ge.y/2+ve.y};var n=l.getDoubleTapZoom(!0,r.currItem),o=v===n;r.mouseZoomedIn=!o,r.zoomTo(o?r.currItem.initialZoomLevel:n,t,333),i[(o?"remove":"add")+"Class"](e,"pswp--zoomed-in")}}});var bn,wn,xn,_n,Tn,Sn,kn,Cn,In,$n,En,An,Nn={history:!0,galleryUID:1},Dn=function(){return En.hash.substring(1)
},jn=function(){bn&&clearTimeout(bn),xn&&clearTimeout(xn)},Mn=function(){var e=Dn(),t={};if(e.length<5){return t}var n,o=e.split("&");for(n=0;n<o.length;n++){if(o[n]){var i=o[n].split("=");i.length<2||(t[i[0]]=i[1])}}if(l.galleryPIDs){var r=t.pid;for(t.pid=0,n=0;n<Vt.length;n++){if(Vt[n].pid===r){t.pid=n;break}}}else{t.pid=parseInt(t.pid,10)-1}return t.pid<0&&(t.pid=0),t},On=function(){if(xn&&clearTimeout(xn),Je||Z){return void (xn=setTimeout(On,500))}_n?clearTimeout(wn):_n=!0;var e=u+1,t=Jt(u);t.hasOwnProperty("pid")&&(e=t.pid);var n=kn+"&gid="+l.galleryUID+"&pid="+e;Cn||En.hash.indexOf(n)===-1&&($n=!0);var o=En.href.split("#")[0]+"#"+n;An?"#"+n!==window.location.hash&&history[Cn?"replaceState":"pushState"]("",document.title,o):Cn?En.replace(o):En.hash=n,Cn=!0,wn=setTimeout(function(){_n=!1},60)};ke("History",{publicMethods:{initHistory:function(){if(i.extend(l,Nn,!0),l.history){En=window.location,$n=!1,In=!1,Cn=!1,kn=Dn(),An="pushState" in history,kn.indexOf("gid=")>-1&&(kn=kn.split("&gid=")[0],kn=kn.split("?gid=")[0]),$e("afterChange",r.updateURL),$e("unbindEvents",function(){i.unbind(window,"hashchange",r.onHashChange)});var e=function(){Sn=!0,In||($n?history.back():kn?En.hash=kn:An?history.pushState("",document.title,En.pathname+En.search):En.hash=""),jn()};$e("unbindEvents",function(){d&&e()}),$e("destroy",function(){Sn||e()}),$e("firstUpdate",function(){u=Mn().pid});var t=kn.indexOf("pid=");t>-1&&(kn=kn.substring(0,t),"&"===kn.slice(-1)&&(kn=kn.slice(0,-1))),setTimeout(function(){c&&i.bind(window,"hashchange",r.onHashChange)},40)}},onHashChange:function(){return Dn()===kn?(In=!0,void r.close()):void (_n||(Tn=!0,r.goTo(Mn().pid),Tn=!1))},updateURL:function(){jn(),Tn||(Cn?bn=setTimeout(On,800):On())}}}),i.extend(r,it)};return e});

!function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.PhotoSwipeUI_Default=t()}(this,function(){var e=function(e,t){var n,o,i,r,a,s,l,c,p,d,u,f,h,m,g,y,v,b,w,x=this,_=!1,T=!0,S=!0,k={barsSize:{top:44,bottom:"auto"},closeElClasses:["item","caption","zoom-wrap","ui","top-bar"],timeToIdle:4000,timeToIdleOutside:1000,loadingIndicatorDelay:1000,addCaptionHTMLFn:function(e,t){return e.title?(t.children[0].innerHTML=e.title,!0):(t.children[0].innerHTML="",!1)},closeEl:!0,captionEl:!0,fullscreenEl:!0,zoomEl:!0,shareEl:!0,counterEl:!0,arrowEl:!0,preloaderEl:!0,tapToClose:!1,tapToToggleControls:!0,clickToCloseNonZoomable:!0,shareButtons:[{id:"facebook",label:"Share on Facebook",url:"https://www.facebook.com/sharer/sharer.php?u={{url}}"},{id:"twitter",label:"Tweet",url:"https://twitter.com/intent/tweet?text={{text}}&url={{url}}"},{id:"pinterest",label:"Pin it",url:"http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"},{id:"download",label:"Download image",url:"{{raw_image_url}}",download:!0}],getImageURLForShare:function(){return e.currItem.src||""},getPageURLForShare:function(){return window.location.href},getTextForShare:function(){return e.currItem.title||""},indexIndicatorSep:" / "},C=function(e){if(y){return !0}e=e||window.event,g.timeToIdle&&g.mouseUsed&&!p&&P();for(var n,o,i=e.target||e.srcElement,r=i.className,a=0;a<X.length;a++){n=X[a],n.onTap&&r.indexOf("pswp__"+n.name)>-1&&(n.onTap(),o=!0)}if(o){e.stopPropagation&&e.stopPropagation(),y=!0;var s=t.features.isOldAndroid?600:30;v=setTimeout(function(){y=!1},s)}},I=function(){return !e.likelyTouchDevice||g.mouseUsed||screen.width>1200},$=function(e,n,o){t[(o?"add":"remove")+"Class"](e,"pswp__"+n)},E=function(){var e=1===g.getNumItemsFn();e!==m&&($(o,"ui--one-slide",e),m=e)},A=function(){$(l,"share-modal--hidden",S)},N=function(){return S=!S,S?(t.removeClass(l,"pswp__share-modal--fade-in"),setTimeout(function(){S&&A()},300)):(A(),setTimeout(function(){S||t.addClass(l,"pswp__share-modal--fade-in")},30)),S||j(),!1},D=function(t){t=t||window.event;var n=t.target||t.srcElement;return e.shout("shareLinkClick",t,n),!!n.href&&(!!n.hasAttribute("download")||(window.open(n.href,"pswp_share","scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left="+(window.screen?Math.round(screen.width/2-275):100)),S||N(),!1))},j=function(){for(var e,t,n,o,i,r="",a=0;a<g.shareButtons.length;a++){e=g.shareButtons[a],n=g.getImageURLForShare(e),o=g.getPageURLForShare(e),i=g.getTextForShare(e),t=e.url.replace("{{url}}",encodeURIComponent(o)).replace("{{image_url}}",encodeURIComponent(n)).replace("{{raw_image_url}}",n).replace("{{text}}",encodeURIComponent(i)),r+='<a href="'+t+'" target="_blank" class="pswp__share--'+e.id+'"'+(e.download?"download":"")+">"+e.label+"</a>",g.parseShareButtonOut&&(r=g.parseShareButtonOut(e,r))}l.children[0].innerHTML=r,l.children[0].onclick=D},M=function(e){for(var n=0;n<g.closeElClasses.length;n++){if(t.hasClass(e,"pswp__"+g.closeElClasses[n])){return !0}}},O=0,P=function(){clearTimeout(w),O=0,p&&x.setIdle(!1)},F=function(e){e=e?e:window.event;var t=e.relatedTarget||e.toElement;t&&"HTML"!==t.nodeName||(clearTimeout(w),w=setTimeout(function(){x.setIdle(!0)},g.timeToIdleOutside))},L=function(){g.fullscreenEl&&!t.features.isOldAndroid&&(n||(n=x.getFullscreenAPI()),n?(t.bind(document,n.eventK,x.updateFullscreen),x.updateFullscreen(),t.addClass(e.template,"pswp--supports-fs")):t.removeClass(e.template,"pswp--supports-fs"))},z=function(){g.preloaderEl&&(q(!0),d("beforeChange",function(){clearTimeout(h),h=setTimeout(function(){e.currItem&&e.currItem.loading?(!e.allowProgressiveImg()||e.currItem.img&&!e.currItem.img.naturalWidth)&&q(!1):q(!0)},g.loadingIndicatorDelay)}),d("imageLoadComplete",function(t,n){e.currItem===n&&q(!0)}))},q=function(e){f!==e&&($(u,"preloader--active",!e),f=e)},R=function(e){var n=e.vGap;if(I()){var a=g.barsSize;if(g.captionEl&&"auto"===a.bottom){if(r||(r=t.createEl("pswp__caption pswp__caption--fake"),r.appendChild(t.createEl("pswp__caption__center")),o.insertBefore(r,i),t.addClass(o,"pswp__ui--fit")),g.addCaptionHTMLFn(e,r,!0)){var s=r.clientHeight;n.bottom=parseInt(s,10)||44}else{n.bottom=a.top}}else{n.bottom="auto"===a.bottom?0:a.bottom}n.top=a.top}else{n.top=n.bottom=0}},H=function(){g.timeToIdle&&d("mouseUsed",function(){t.bind(document,"mousemove",P),t.bind(document,"mouseout",F),b=setInterval(function(){O++,2===O&&x.setIdle(!0)},g.timeToIdle/2)})},B=function(){d("onVerticalDrag",function(e){T&&0.95>e?x.hideControls():!T&&e>=0.95&&x.showControls()});var e;d("onPinchClose",function(t){T&&0.9>t?(x.hideControls(),e=!0):e&&!T&&t>0.9&&x.showControls()}),d("zoomGestureEnded",function(){e=!1,e&&!T&&x.showControls()})},X=[{name:"caption",option:"captionEl",onInit:function(e){i=e}},{name:"share-modal",option:"shareEl",onInit:function(e){l=e},onTap:function(){N()}},{name:"button--share",option:"shareEl",onInit:function(e){s=e
},onTap:function(){N()}},{name:"button--zoom",option:"zoomEl",onTap:e.toggleDesktopZoom},{name:"counter",option:"counterEl",onInit:function(e){a=e}},{name:"button--close",option:"closeEl",onTap:e.close},{name:"button--arrow--left",option:"arrowEl",onTap:e.prev},{name:"button--arrow--right",option:"arrowEl",onTap:e.next},{name:"button--fs",option:"fullscreenEl",onTap:function(){n.isFullscreen()?n.exit():n.enter()}},{name:"preloader",option:"preloaderEl",onInit:function(e){u=e}}],Y=function(){var e,n,i,r=function(o){if(o){for(var r=o.length,a=0;r>a;a++){e=o[a],n=e.className;for(var s=0;s<X.length;s++){i=X[s],n.indexOf("pswp__"+i.name)>-1&&(g[i.option]?(t.removeClass(e,"pswp__element--disabled"),i.onInit&&i.onInit(e)):t.addClass(e,"pswp__element--disabled"))}}}};r(o.children);var a=t.getChildByClass(o,"pswp__top-bar");a&&r(a.children)};x.init=function(){t.extend(e.options,k,!0),g=e.options,o=t.getChildByClass(e.scrollWrap,"pswp__ui"),d=e.listen,B(),d("beforeChange",x.update),d("doubleTap",function(t){var n=e.currItem.initialZoomLevel;e.getZoomLevel()!==n?e.zoomTo(n,t,333):e.zoomTo(g.getDoubleTapZoom(!1,e.currItem),t,333)}),d("preventDragEvent",function(e,t,n){var o=e.target||e.srcElement;o&&o.className&&e.type.indexOf("mouse")>-1&&(o.className.indexOf("__caption")>0||/(SMALL|STRONG|EM)/i.test(o.tagName))&&(n.prevent=!1)}),d("bindEvents",function(){t.bind(o,"pswpTap click",C),t.bind(e.scrollWrap,"pswpTap",x.onGlobalTap),e.likelyTouchDevice||t.bind(e.scrollWrap,"mouseover",x.onMouseOver)}),d("unbindEvents",function(){S||N(),b&&clearInterval(b),t.unbind(document,"mouseout",F),t.unbind(document,"mousemove",P),t.unbind(o,"pswpTap click",C),t.unbind(e.scrollWrap,"pswpTap",x.onGlobalTap),t.unbind(e.scrollWrap,"mouseover",x.onMouseOver),n&&(t.unbind(document,n.eventK,x.updateFullscreen),n.isFullscreen()&&(g.hideAnimationDuration=0,n.exit()),n=null)}),d("destroy",function(){g.captionEl&&(r&&o.removeChild(r),t.removeClass(i,"pswp__caption--empty")),l&&(l.children[0].onclick=null),t.removeClass(o,"pswp__ui--over-close"),t.addClass(o,"pswp__ui--hidden"),x.setIdle(!1)}),g.showAnimationDuration||t.removeClass(o,"pswp__ui--hidden"),d("initialZoomIn",function(){g.showAnimationDuration&&t.removeClass(o,"pswp__ui--hidden")}),d("initialZoomOut",function(){t.addClass(o,"pswp__ui--hidden")}),d("parseVerticalMargin",R),Y(),g.shareEl&&s&&l&&(S=!0),E(),H(),L(),z()},x.setIdle=function(e){p=e,$(o,"ui--idle",e)},x.update=function(){T&&e.currItem?(x.updateIndexIndicator(),g.captionEl&&(g.addCaptionHTMLFn(e.currItem,i),$(i,"caption--empty",!e.currItem.title)),_=!0):_=!1,S||N(),E()},x.updateFullscreen=function(o){o&&setTimeout(function(){e.setScrollOffset(0,t.getScrollY())},50),t[(n.isFullscreen()?"add":"remove")+"Class"](e.template,"pswp--fs")},x.updateIndexIndicator=function(){g.counterEl&&(a.innerHTML=e.getCurrentIndex()+1+g.indexIndicatorSep+g.getNumItemsFn())},x.onGlobalTap=function(n){n=n||window.event;var o=n.target||n.srcElement;if(!y){if(n.detail&&"mouse"===n.detail.pointerType){if(M(o)){return void e.close()}t.hasClass(o,"pswp__img")&&(1===e.getZoomLevel()&&e.getZoomLevel()<=e.currItem.fitRatio?g.clickToCloseNonZoomable&&e.close():e.toggleDesktopZoom(n.detail.releasePoint))}else{if(g.tapToToggleControls&&(T?x.hideControls():x.showControls()),g.tapToClose&&(t.hasClass(o,"pswp__img")||M(o))){return void e.close()}}}},x.onMouseOver=function(e){e=e||window.event;var t=e.target||e.srcElement;$(o,"ui--over-close",M(t))},x.hideControls=function(){t.addClass(o,"pswp__ui--hidden"),T=!1},x.showControls=function(){T=!0,_||x.update(),t.removeClass(o,"pswp__ui--hidden")},x.supportsFullscreen=function(){var e=document;return !!(e.exitFullscreen||e.mozCancelFullScreen||e.webkitExitFullscreen||e.msExitFullscreen)},x.getFullscreenAPI=function(){var t,n=document.documentElement,o="fullscreenchange";return n.requestFullscreen?t={enterK:"requestFullscreen",exitK:"exitFullscreen",elementK:"fullscreenElement",eventK:o}:n.mozRequestFullScreen?t={enterK:"mozRequestFullScreen",exitK:"mozCancelFullScreen",elementK:"mozFullScreenElement",eventK:"moz"+o}:n.webkitRequestFullscreen?t={enterK:"webkitRequestFullscreen",exitK:"webkitExitFullscreen",elementK:"webkitFullscreenElement",eventK:"webkit"+o}:n.msRequestFullscreen&&(t={enterK:"msRequestFullscreen",exitK:"msExitFullscreen",elementK:"msFullscreenElement",eventK:"MSFullscreenChange"}),t&&(t.enter=function(){return c=g.closeOnScroll,g.closeOnScroll=!1,"webkitRequestFullscreen"!==this.enterK?e.template[this.enterK]():void e.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)},t.exit=function(){return g.closeOnScroll=c,document[this.exitK]()},t.isFullscreen=function(){return document[this.elementK]}),t}};return e});


var browser = {
	versions: function() {
		var e = navigator.userAgent;
		navigator.appVersion;
		return {
			wechat: e.indexOf("MicroMessenger") > -1,
			ios: !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			android: e.indexOf("Android") > -1,
			iPhone: e.indexOf("iPhone") > -1 || e.indexOf("Mac") > -1,
			mobile: !!e.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i),
			iPad: e.indexOf("iPad") > -1,
			ios9: e.indexOf("iPhone OS 9") > -1,
			MQQBrowser: e.indexOf("MQQBrowser") > -1,
			UCBrowser: e.indexOf("UCBrowser") > -1,
			Safari: e.indexOf("Safari") > -1
		}
	} (),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
},
Cookie = {
	get: function(e) {
		var t, n = "";
		return (t = document.cookie.match("(?:^| )" + e + "(?:(?:=([^;]*))|;|$)")) && (n = t[1] ? unescape(t[1]) : ""),
		n
	},
	set: function(e, t, n, o) {
		n = n || 2592e6;
		var i = new Date,
		r = "";
		i.setTime(i.getTime() + n),
		r = e + "=" + escape(t) + ";expires=" + i.toGMTString() + ";path=/;",
		o && (r += "domain=" + o + ";"),
		document.cookie = r
	},
	del: function(e, t) {
		Cookie.set(e, "", -1, t)
	}
};
$(function() {
	function e(e) {
		$(e).append('<li class="sq"><span></span></li>'),
		$(e).find("li").eq(4).after('<li class="zk"><span></span></li>'),
		$(e).find(".sq").hide(),
		$(e).find(".zk").click(function() {
			$(e).find("li").show().removeClass("hide"),
			$(this).hide()
		}),
		$(e).find(".sq").click(function() {
			$(e).find("li").each(function(e) {
				var t = e;
				t > 5 && $(this).hide()
			}),
			$(e).find(".zk").show()
		})
	}
	1 != $("body#search").length && 1 != $("body#hsearch").length && $("#Search_form").click(function() {
		return window.location.href = "/search/hotsearch.html",
		!1
	});
	var t = window.location.href;
	t.indexOf("ruanj.html") > -1 || t.indexOf("rpai.html") > -1 || t.indexOf("rnew.html") > -1 ? $(".mainNav li").eq(1).addClass("cur").siblings().removeClass("cur") : t.indexOf("wangyou.html") > -1 || t.indexOf("wpai.html") > -1 || t.indexOf("wnew.html") > -1 ? $(".mainNav li").eq(2).addClass("cur").siblings().removeClass("cur") : t.indexOf("/top/") > -1 ? $(".mainNav li").eq(3).addClass("cur").siblings().removeClass("cur") : t.indexOf("/h5/") > -1 ? $(".mainNav li").eq(4).addClass("cur").siblings().removeClass("cur") : $("#index-page").length > 0 && $(".mainNav li").eq(0).addClass("cur").siblings().removeClass("cur");
	var n = !1,
	o = !1;
	$("#mcate b").click(function() {
		0 == n ? ($("#mcateCont").css("height", "auto"), $("#nav .pullNav").removeClass("open"), $("#nav .moreNav").css("display", "none"), o = !1, n = !0) : ($("#mcateCont").animate({
			height: "0px"
		},
		100), n = !1)
	}),
	$("#mcateCont p span").click(function() {
		$(this).addClass("cur").siblings().removeClass("cur");
		var e = $("#mcateCont p span").index(this);
		$("#mcateCont ul").eq(e).addClass("on").siblings().removeClass("on")
	}),
	$("#topNav").length > 0 && e("#topNav ul");
	var i = document.domain,
	r = document.referrer;
	r.indexOf(i) > -1 && window.history.length > 0 && $(".sback, .back").on("click",
	function() {
		return window.history.go( - 1),
		!1
	})
});


if ($("#lookmore").length > 0) {
	var obj = $("#lookmore"),
	num = obj.data("show");
	num && (obj.parent().children().hide().slice(0, num).show(), obj.parent().children().length - 1 <= num ? obj.hide() : obj.show()),
	obj.click(function() {
		$(this).hasClass("expand") ? (obj.find("span").text("展开全部"), obj.parent().children().hide().slice(0, num).show(), obj.show()) : (obj.find("span").text("收起内容"), obj.parent().children().show()),
		$(this).toggleClass("expand")
	})
}
if ($(".historyver").length > 0 && 0 == $(".historyver").find("p").length && $(".historyver").remove(), $(".footer_nav").length > 0 && $(".footer_nav").css("height", "80px"), $("#tcsyy").length > 0) {
	var li = $("#tcsyy .tags-main-ul > li");
	if (len = li.length, page = Math.ceil(len / 8), 0 == len) $("#tcsyy").remove();
	else {
		len < 8 && $("#tcsyy").find(".pagenum").remove();
		for (var i = 0; i < page; i++) $("#tcsyy .tags-main-ul > li").slice(0, 8).wrapAll('<div class="tags-main-box"><ul class="tags-box-ul"></ul></div>');
		$("#tags-main1").length > 0 && scroll("tags-main1")
	}
}
$(".rank").length > 0 && (loadmore(), $(".rank .list").each(function() {
	$(this).find("li").hide().slice(0, 4).show()
}), $(".tab-panel ul li").parents("section").children(".tab-content").hide().eq(1).show(), $(".tab-panel ul li").click(function() {
	$(this).parents("section").children(".tab-content").hide().eq($(this).index()).show(),
	$(this).addClass("active").siblings().removeClass("active")
})),

t1 = null,
lazyimg = function(e) {
	var t = {
		effect: "fadeIn",
		placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAQAICRAEAOw==",
		threshold: 200,
		failure_limit: 10
	};
	$(e).lazyload(t)
};
lazyimg("img.lazy");
var platformStatus = !1;
$(function() {
	var comment = function() {
		function time(e) {
			var t = "";
			return t += [e.getFullYear(), e.getMonth() + 1, e.getDate()].join("/"),
			t.replace(/(-|\:)(\d[^\d])/g, "$10$2")
		}

		function setCookie(e, t) {
			var n = new Date;
			n.setTime(n.getTime() + 12e4),
			document.cookie = e + "=" + escape(t) + ";expires=" + n.toGMTString()
		}

		function getCookie(e) {
			var t, n = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
			return (t = document.cookie.match(n)) ? unescape(t[2]) : null
		}

		function writeComment(e) {
			var t;
			t = e ? "[quote]" + e + "[/quote]" + $("#comment-list .w-text textarea").val() : $("#submit .w-text textarea").val(),
			oli = oul.find("li"),
			$.ajax({
				url: "/ajax.asp",
				data: {
					type: "POST",
					content: t,
					SoftID: oid,
					Action: 2,
					CommentTpye: $("#CommentTpye").val() || 0
				},
				beforeSend: function () {
					return !e && $("#submit #verify").hasClass("disable") || e && $("#comment-list #verify").hasClass("disable") ? (alert("您评论写的太短啦！"), !1) : 1 == Cookie.get("oldTime" + oid) ? (alert("您评论次数太频繁啦！"), !1) : void 0
				},
				success: function () {
					alert("您的评论已提交，请等待审核。"),
					$(".w-text textarea").val(""),
					$("#comment").hasClass("new") && ($("#comment-list div.post").remove(), $("#view-comment .post header").css({
						display: "block"
					}), $("#submit").css({
						display: "none"
					})),
					Cookie.set("oldTime" + oid, "1", 12e4)
				}
			})
		}


            function readComment() {
                if (oli = oul.find("li"), 0 == oul.find("li.org").length) {
                    if (0 == oli.length) return !1;
                    p = 1,
                    oul.find("li").each(function (e) {
                        $(this).addClass("org"),
                        $(this).find("time").text(String($(this).find("time").text()).split(" ")[0]),
                        (Number($(this).find(".ctrl > s").attr("rpid")) + Number(String($(this).find("time").text()).split(" ")[0].split("/")[2])) % 2 == 0 ? $(this).prepend('') : $(this).prepend('')
                    });
                    var rpshtml = '<div class="post"><fieldset class="w-text"><textarea onkeyup="validate()"></textarea></fieldset><fieldset class="w-button"><input id="verify" class="button disable" type="submit" value="点击发言" hidefocus="true"></fieldset><input type="hidden" id="app-id" value="' + oid + '"></div>';
                    $(".rps").each(function () {

                        var e = $(this).attr("is_bind");
                        1 != e && ($(this).attr("is_bind", 1), $(this).bind("click", function () {
																	console.log(1)
                            1 == $(this).parents("li").find("div.post").length ? $("#comment-list div.post").remove() : ($("#comment-list div.post").remove(), $(this).parents("li").append(rpshtml), $("#comment").hasClass("new") && ($("#view-comment .post header").css({
                                display: "block"
                            }), $("#submit").css({
                                display: "none"
                            })), $("#comment-list #verify").click(function () {
                                writeComment($(this).parents(".post").siblings(".ctrl").find(".rps").attr("rpid"))
                            }))
                        }))
                    }),
                    $(".ctrl > a").each(function () {
                        var e = $(this).attr("is_bind");
                        1 != e && ($(this).attr("is_bind", 1), $(this).bind("click", function () {
                            if ($(this).hasClass("is_ding")) alert("您已经顶过了");
                            else {
                                $(this).addClass("is_ding");
                                var e;
                                "赞" == $(this).find("span").text() ? ($(this).removeClass("txt"), e = 0) : e = Number($(this).find("span").text()),
                                $(this).find("span").html(e + 1),
                                $.ajax({
                                    type: "POST",
                                    url: "/ajax.asp",
                                    data: "action=19&id=" + $(this).siblings(".rps").attr("rpid"),
                                    success: function () {}
                                })
                            }
                        }))
                    })
                }
                return !(oul.find("li.org").length < 10) && (10 == oul.find("li.org").length && 1 == p ? ($("#view-comment .button-status-complete").css("display", "block"), $("#comment .button").show(), p++, !1) : (p = Math.floor(oli.length / 5 + 1), void $.ajax({
                    type: "get",
                    url: "/sajax.asp",
                    data: "action=0&id=" + oid + "&page=" + p + "&CommentTpye=0",
                    success: function (data) {
                        var html = "",
                            data = eval("(" + data + ")");
                        if (userName = data.sUserName, userForm = data.sUserForm, userData = data.sDateAndTime, userText = data.sContent, urId = data.sId, urDing = data.sReTopic, 1 == data.PageCount) return $("#view-comment .button").val("没有更多评论了！").attr("disabled", !0),
                        !1;
                        if ($("#comment").hasClass("new")) for (var i = 0; i < userName.length; i++) {
                                var tt1 = decodeURIComponent(userText[i]);
                                tt1.indexOf("+") > -1 && (tt1 = tt1.replace(/\+/g, " "));
                                var headnum = 1;
                                (urId[i] + Number(String(userData[i]).split(" ")[0].split("/")[2])) % 2 == 0 && (headnum = 2),
                                html += 0 != urDing[i] ? '<li><time>' + String(userData[i]).split(" ")[0] + '</time><p class="ctrl"><a href="javascript:"><span>' + urDing[i] + '</span></a><s rpid="' + urId[i] + '" class="rps">回复</s></p><div class="cmt"><p class="user">' + userForm[i] + userName[i] + "</p><p>" + tt1 + "</p></div></li>" : '<li><time>' + String(userData[i]).split(" ")[0] + '</time><p class="ctrl"><a href="javascript:" class="txt"><span>赞</span></a><s rpid="' + urId[i] + '" class="rps">回复</s></p><div class="cmt"><p class="user">' + userForm[i] + userName[i] + "</p><p>" + tt1 + "</p></div></li>"
                            } else for (var i = 0; i < userName.length; i++) html += '<li><p class="user">' + userForm[i] + userName[i] + "<time>" + String(userData[i]).split(" ")[0] + "</time></p><p>" + decodeURIComponent(userText[i]) + "</p></li>";
                        data.RecordCount > 5 && ($("#view-comment .button-status-complete").css("display", "block"), $("#comment .button").show()),
                        p >= data.PageCount && $("#view-comment .button").val("没有更多评论了！").attr("disabled", !0),
                        0 == oli.length ? oul.html(html) : oli.last().after(html);
                        var rpshtml = '<div class="post"><fieldset class="w-text"><textarea onkeyup="validate()"></textarea></fieldset><fieldset class="w-button"><input id="verify" class="button disable" type="submit" value="点击发言" hidefocus="true"></fieldset><input type="hidden" id="app-id" value="' + oid + '"></div>';
                        $(".rps").each(function () {
                                var e = $(this).attr("is_bind");
                                1 != e && ($(this).attr("is_bind", 1), $(this).bind("click", function () {
                                    1 == $(this).parents("li").find("div.post").length ? $("#comment-list div.post").remove() : ($("#comment-list div.post").remove(), $(this).parents("li").append(rpshtml), $("#comment").hasClass("new") && ($("#view-comment .post header").css({
                                        display: "block"
                                    }), $("#submit").css({
                                        display: "none"
                                    })), $("#comment-list #verify").click(function () {
                                        writeComment($(this).parents(".post").siblings(".ctrl").find(".rps").attr("rpid"))
                                    }))
                                }))
                            }),
                        $(".ctrl > a").each(function () {
                                var e = $(this).attr("is_bind");
                                1 != e && ($(this).attr("is_bind", 1), $(this).bind("click", function () {
                                    if ($(this).hasClass("is_ding")) alert("您已经顶过了");
                                    else {
                                        $(this).addClass("is_ding");
                                        var e;
                                        "赞" == $(this).find("span").text() ? ($(this).removeClass("txt"), e = 0) : e = Number($(this).find("span").text()),
                                        $(this).find("span").html(e + 1),
                                        $.ajax({
                                            type: "POST",
                                            url: "/ajax.asp",
                                            data: "action=19&id=" + $(this).siblings(".rps").attr("rpid"),
                                            success: function () {}
                                        })
                                    }
                                }))
                            })
                    }
                })))
            }

		var oul = $("#comment-list"),
		oid = $("#app-id").val(),
		oli = oul.find("li"),
		p = Math.floor(oli.length / 5 + 1);
		$("#submit #verify").click(function() {
			writeComment()
		}),
		readComment(),
		$("#view-comment .button").click(function() {
			readComment()
		}),
		$("#view-comment header .fb").click(function() {
			$("#view-comment").css({
				display: "none"
			}),
			$("#submit").css({
				display: "block"
			})
		}),
		$("#cancel").click(function() {
			$("#view-comment").css({
				display: "block"
			}),
			$("#submit").css({
				display: "none"
			})
		})
	} ()
});

var uaa = navigator.userAgent.toLowerCase();
uaa.indexOf("micromessenger") > 0 && $("#btns .dbtn").click(function() {
	var e = $(this).attr("href"); (e.indexOf("itunes.apple.com") < 0 && "undefined" != typeof _platformInfo.Android || "undefined" == typeof _platformInfo.Android && "undefined" == typeof _platformInfo.iPhone) && (is_weixin(), event.preventDefault())
});
$("body#down-page header#info a.cata").html().indexOf("iPhone") > -1 ? $("body#down-page header#info a.cata").html($("body#down-page header#info a.cata").html().replace("iPhone", "")) : $("body#down-page header#info a.cata").html().indexOf("iPad") > -1 && $("body#down-page header#info a.cata").html($("body#down-page header#info a.cata").html().replace("iPad", ""));
var game_down = function() {
	function e(e) {
		var t = $("#" + e);
		oul = t.find(".tags-main-ul"),
		oli = oul.find(".tags-main-box"),
		onav_li = t.parent().find("#wrapert ul li"),
		ospan = '<span class="active"></span>',
		oli_l = oli.length,
		window_w = parseInt($(window).width() - 16),
		onav_w = parseInt(window_w / 4),
		oli.width(window_w),
		oli_w = oli.eq(1).outerWidth(!0),
		onav_li.width(onav_w),
		tag_li = $(".bq-main span");
		for (var n = 1; n < oli_l; n++) ospan += "<span></span>";
		t.next(".pagenum").html(ospan),
		oul.width(oli_l * oli_w);
		var o;
		tag_li.each(function(e) {
			$(this).click(function() {
				onav_li.eq(e).addClass("active").siblings().removeClass("active"),
				t.next(".pagenum").find("span").eq(e).addClass("active").siblings().removeClass("active"),
				o.x = -e * window_w,
				$(".tags-main-ul").css("-webkit-transform", "translate3d(" + o.x + "px, 0px, 0px)"),
				e >= 3 && t.parent().find("#wrapert ul").css({
					"-webkit-transform": "translate3d(" + -window_w + "px, 0px, 0px)"
				})
			})
		}),
		t.parent().find("#wrapert ul li:first").addClass("active"),
		t.parent().find("#wrapert ul li").each(function(e) {
			$(this).click(function() {
				var n = t.parent().find("#wrapert ul li");
				n.eq(e).addClass("active").siblings().removeClass("active"),
				t.next(".pagenum").find("span").eq(e).addClass("active").siblings().removeClass("active"),
				o.x = -e * window_w,
				t.parent().find(".tags-main-ul").css({
					"-webkit-transform": "translate3d(" + o.x + "px, 0px, 0px)"
				})
			})
		}),
		o = new iScroll(e, {
			snap: !0,
			momentum: !1,
			hScrollbar: !1,
			onScrollEnd: function() {
				var e = t.parent().find("#wrapert ul li");
				e.removeClass("active"),
				t.next(".pagenum").find("span").removeClass("active"),
				e.eq(this.currPageX).addClass("active"),
				t.next(".pagenum").find("span").eq(this.currPageX).addClass("active"),
				this.currPageX >= 8 ? t.parent().find("#wrapert ul").css({
					"-webkit-transform": "translate3d(" + -2 * window_w + "px, 0px, 0px)"
				}) : this.currPageX >= 4 ? t.parent().find("#wrapert ul").css({
					"-webkit-transform": "translate3d(" + -window_w + "px, 0px, 0px)"
				}) : t.parent().find("#wrapert ul").css({
					"-webkit-transform": "translate3d(0px, 0px, 0px)"
				})
			}
		})
	} !
	function() {
		0 == $("#wrapert li").length && $(".guess").remove(),
		1 == $("#wrapert li").length && $(".guess .pagenum").remove(),
		$("#xgk li").length < 1 && $("#xgk").remove(),
		$("#down-page .xgwz li").length < 1 && $(".xgwz").remove()
	} (),
	function() {
		$(".xgwz ul li").length > 0 ? $(".xgwz").show() : ($(".xgwz").hide(), $("#tab span").eq(1).hide()),
		$("#tab span").click(function() {
			"游戏介绍" == $(this).text() || "软件介绍" == $(this).text()  || "应用介绍" == $(this).text() || "简介" == $(this).text() ? ($(this).addClass("cur").siblings().removeClass("cur"), $(".xyc,.cont,#comment,.xgwz,.similar,#tcsyy,.guess,#xgk,.tips_more,.h5online,.hot_gamerec,.rank,.rela_down").show()) : "教程" == $(this).text() || "攻略" == $(this).text() ? ($(this).addClass("cur").siblings().removeClass("cur"), $(".cont,.xyc,.similar,#tcsyy,#xgk,.guess,.tips_more,.h5online,.hot_gamerec,.rank,#comment,.rela_down").hide(), $(".xgwz").show()) : "评论" == $(this).text() && ($(this).addClass("cur").siblings().removeClass("cur"), $(".xgwz,.cont,.xyc,.similar,#tcsyy,#xgk,.guess,.tips_more,.h5online,.hot_gamerec,.rank,.rela_down").hide(), $("#comment").show())
		})
	} (),
	function() {
		$(".xq-top #mcate b").click(function() {
			$(".xq-nav").slideToggle()
		}),
		$(".xq-top #mcate em").click(function() {
			$(".xq-top .title").hide(),
			$(".xq-top form").show(),
			$("#mcate").css("width", "35px"),
			$("#mcate em").remove(),
			$(".xq-top").css("padding-right", "51px")
		})
	} (),
	function() {
		var e = $("header").height() + 90;
		$(window).scroll(function() {
			var t = $("#btns"),
			n = $("#yuyue"),
			o = ($(window).scrollTop(), navigator.userAgent.toLowerCase());
			return ! (o.indexOf("baiduboxapp") > -1) && ($(window).scrollTop() >= e ? (t.css({
				position: "fixed",
				top: 0
			}).addClass("on"), n.css({
				position: "fixed",
				top: 0,
				width: $(window).width() - 20 + "px",
				padding: "10px",
				margin: "0",
				background: "#fff",
				left: 0
			}).addClass("on"), $("#goTop").fadeIn()) : Math.abs(parseInt($("body").css("top"))) > 0 && Math.abs(parseInt($("body").css("top"))) >= e ? n.css({
				position: "fixed",
				top: 0,
				width: $(window).width() - 20 + "px",
				padding: "10px",
				margin: "0",
				background: "#fff",
				left: 0
			}).addClass("on") : Math.abs(parseInt($("body").css("top"))) > 0 && Math.abs(parseInt($("body").css("top"))) < e ? n.css({
				position: "relative",
				top: "auto",
				width: "auto",
				padding: "0",
				margin: "10px 0",
				background: "#fff",
				left: "auto"
			}).removeClass("on") : (t.css({
				position: "relative"
			}).removeClass("on"), n.css({
				position: "relative",
				top: "auto",
				width: "auto",
				padding: "0",
				margin: "10px 0",
				background: "#fff",
				left: "auto"
			}).removeClass("on"), $("#goTop").fadeOut()), void($("#wrapper").offset().top + $("#wrapper").height() - 35 <= $(window).scrollTop() ? $("#xgk").addClass("fix") : $("#xgk").removeClass("fix")))
		})
	} (),
	function() {
		var e = 1;
		$("#expand span").click(function() {
			$("#expand").toggleClass("expand"),
			e > 0 ? ($("#summary").hide(), $("#details").show(), $(this).html("收起内容"), $("#expand span").addClass("sq"), e = 0) : ($("#summary").show(), $("#details").hide(), $(this).html("显示全部"), $("#expand span").removeClass("sq"), e = 1)
		})
	} (),
	function() {
		function e() {
			i > r ? ($("#thelist img").width(225), $("#thelist img").height(225 * a), $("#thelist li").width(235), s = 235 * $("#thelist li").length) : ($("#thelist img").width(150), $("#thelist img").height(150 * a), $("#thelist li").width(160), s = 160 * $("#thelist li").length),
			$("#scroller").width(s),
			t = new iScroll("wrapper", {
				hScrollbar: !1
			})
		}
		var t, n, o, i, r, a, s = 0,
		l = new Image,
		c = 0,
		p = 0,
		d = [],
		u = 80 * $("#thelist2 li").length,
		f = 80 * $("#thelist4 li").length;
		$("#scroller2").width(u),
		$("#scroller4").width(f),
		$("#thelist img").length > 0 && $("#thelist img").each(function(n) {
			if ($(this).attr("data-original")) 0 == n && (l.src = $(this).attr("data-original"), l.onload = function() {
				i = l.width,
				r = l.height,
				a = (r / i).toFixed(2),
				e()
			});
			else {
				if (l = new Image, l.src = $(this).attr("src"), l.complete) i = l.width,
				r = l.height,
				a = (r / i).toFixed(2),
				i < r || i == r ? ($('#thelist img[src="' + l.src + '"]').width(140), $('#thelist img[src="' + l.src + '"]').height(140 * a), $('#thelist img[src="' + l.src + '"]').parent("li").width(150), p++) : ($('#thelist img[src="' + l.src + '"]').width(215), $('#thelist img[src="' + l.src + '"]').height(215 * a), $('#thelist img[src="' + l.src + '"]').parent("li").width(225), c++),
				n == $("#thelist img").length - 1 && ($("#scroller").width(150 * p + 225 * c), t = new iScroll("wrapper", {
					hScrollbar: !1
				}));
				else if (null != l.onload) l.onload = function() {
					i = l.width,
					r = l.height,
					a = (r / i).toFixed(2),
					i < r || i == r ? ($('#thelist img[src="' + l.src + '"]').width(140), $('#thelist img[src="' + l.src + '"]').height(140 * a), $('#thelist img[src="' + l.src + '"]').parent("li").width(150), p++) : ($('#thelist img[src="' + l.src + '"]').width(215), $('#thelist img[src="' + l.src + '"]').height(215 * a), $('#thelist img[src="' + l.src + '"]').parent("li").width(225), c++),
					n == $("#thelist img").length - 1 && ($("#scroller").width(150 * p + 225 * c), t = new iScroll("wrapper", {
						hScrollbar: !1
					}))
				};
				else {
					if (d.push(l), 0 == d.length) return $("#scroller").width(150 * p + 225 * c),
					void(t = new iScroll("wrapper", {
						hScrollbar: !1
					}));
					var o = setInterval(function() {
						l = d[0],
						l.complete && (clearInterval(o), d.shift(), i = l.width, r = l.height, a = (r / i).toFixed(2), i < r || i == r ? ($('#thelist img[src="' + l.src + '"]').width(140), $('#thelist img[src="' + l.src + '"]').height(140 * a), $('#thelist img[src="' + l.src + '"]').parent("li").width(150), p++) : ($('#thelist img[src="' + l.src + '"]').width(215), $('#thelist img[src="' + l.src + '"]').height(215 * a), $('#thelist img[src="' + l.src + '"]').parent("li").width(225), c++), 0 == d.length && ($("#scroller").width(150 * p + 225 * c), t = new iScroll("wrapper", {
							hScrollbar: !1
						})), $('#wrapper img[src="' + l.src + '"]').parent("li").attr({
							href: l.src,
							"data-size": i + "x" + r,
							"data-med": l.src,
							"data-med-size": i + "x" + r
						}))
					},
					1e3)
				}
				$('#wrapper img[src="' + l.src + '"]').parent("li").attr({
					href: l.src,
					"data-size": i + "x" + r,
					"data-med": l.src,
					"data-med-size": i + "x" + r
				})
			}
		}),
		$("#wrapper2 li").length > 0 && (n = new iScroll("wrapper2", {
			hScrollbar: !1
		})),
		$("#wrapper4 li").length > 0 && (o = new iScroll("wrapper4", {
			hScrollbar: !1
		}))
	} (),
	function() {
		var e = $(".h5online .tags-main-ul > li");
		len = e.length,
		page = Math.ceil(len / 8);
		for (var t = 0; t < page; t++) $(".h5online .tags-main-ul > li").slice(0, 8).wrapAll('<div class="tags-main-box"><ul class="tags-box-ul"></ul></div>');
		$("#tags-main2").length > 0 && scroll("tags-main2")
	} (),
	function() {
		$(".rela_down").addClass("pictxt").removeClass("list");
		var e = $(".rela_down .tags-main-ul > li");
		len = e.length,
		page = Math.ceil(len / 8);
		for (var t = 0; t < page; t++) $(".rela_down .tags-main-ul > li").slice(0, 8).wrapAll('<div class="tags-main-box"><ul class="tags-box-ul"></ul></div>');
		$("#tags-main3").length > 0 && scroll("tags-main3")
	} (),
	function() {
		if ($(".wefocus").remove(), $(".wefocus").length > 0) {
			$(".wefocus").html('<b>关注[科技陀螺]微信</b>科技陀螺，带你玩转生活！<div class="wefocus_b">打开微信</div>'),
			$("body").append('<div class="wefocus_a"><div class="wefocus_a_head"><img src="https://thumb10.jfcdns.com/2018-04/bce5acd8218c9c6c.jpeg" alt=""  width="61" height="55"><p><b>科技陀螺</b>科技陀螺，带你玩转生活！</p></div><div class="wefocus_a_way"><b>关注方法</b><dl><dt><i>1</i>打开微信首页点【搜索】</dt><dd><img src="https://thumb11.jfcdns.com/2018-04/bce5acd8218efeaa.png" alt="" width="237" height="107"></dd></dl><dl><dt><i>2</i>搜索【科技陀螺】即可关注</dt><dd><img src="https://thumb10.jfcdns.com/2018-04/bce5acd821924e40.png" alt="" width="237" height="100"></dd></dl></div><div class="wefocus_btn" data-clipboard-text="科技陀螺"><a href="weixin://">复制名字并打开微信</a></div><div class="wefocus_clo"></div></div><div class="wefocus_bg"></div>'),
			$(".wefocus").click(function() {
				_hmt.push(["_trackEvent", "down_weixin", "click", _webInfo.Id]),
				$(".wefocus_bg").show(),
				$(".wefocus_a").attr("style", "").show().css("margin-top", -$(".wefocus_a").outerHeight(!0) / 2 + "px"),
				$(".wefocus_bg,.wefocus_clo").bind("click",
				function() {
					$(".wefocus_a,.wefocus_bg").hide()
				})
			});
			var e = document.querySelector(".wefocus_btn"),
			t = new Clipboard(e);
			t.on("success",
			function(e) {
				console.log("复制成功")
			})
		}
	} (),
	$("#tags-main").length > 0 && e("tags-main")
} ();

$("#thelist").attr("data-pswp-uid","1");
var isDown = $("#btns a").attr("isDown");
browser.versions.ios && "undefined" == typeof _platformInfo.iPhone && 0 == isDown || browser.versions.android && "undefined" == typeof _platformInfo.Android && 0 == isDown ? $("#btns a").addClass("noDown").html("暂无下载").attr("href", "javascript:void(0)") : browser.versions.android || browser.versions.ios || 0 != isDown || $("#btns a").addClass("noDown").html("暂无下载").attr("href", "javascript:void(0)"),
function() {
	var e = function(e) {
		for (var t = function(e) {
			for (var e, t, n, o, i = e.childNodes,
			r = i.length,
			a = [], s = 0; s < r; s++) if (e = i[s], 1 === e.nodeType) {
				t = e.children,
				n = e.getAttribute("data-size").split("x"),
				o = {
					src: e.getAttribute("href"),
					w: parseInt(n[0], 10),
					h: parseInt(n[1], 10),
					author: e.getAttribute("data-author")
				},
				o.el = e,
				t.length > 0 && (o.msrc = t[0].getAttribute("src"), t.length > 1 && (o.title = t[1].innerHTML));
				var l = e.getAttribute("data-med");
				l && (n = e.getAttribute("data-med-size").split("x"), o.m = {
					src: l,
					w: parseInt(n[0], 10),
					h: parseInt(n[1], 10)
				}),
				o.o = {
					src: o.src,
					w: o.w,
					h: o.h
				},
				a.push(o)
			}
			return a
		},
		n = function p(e, t) {
			return e && (t(e) ? e: p(e.parentNode, t))
		},
		o = function(e) {
			e = e || window.event,
			e.preventDefault ? e.preventDefault() : e.returnValue = !1;
			var t = e.target || e.srcElement,
			o = n(t,
			function(e) {
				return e.tagName && "LI" === e.tagName.toUpperCase()
			});
			if (o) {
				for (var i, a = o.parentNode,
				s = o.parentNode.childNodes,
				l = s.length,
				c = 0,
				p = 0; p < l; p++) if (1 === s[p].nodeType) {
					if (s[p] === o) {
						i = c;
						break
					}
					c++
				}
				return i >= 0 && r(i, a),
				!1
			}
		},
		i = function() {
			var e = window.location.hash.substring(1),
			t = {};
			if (e.length < 5) return t;
			for (var n = e.split("&"), o = 0; o < n.length; o++) if (n[o]) {
				var i = n[o].split("=");
				i.length < 2 || (t[i[0]] = i[1])
			}
			return t.gid && (t.gid = parseInt(t.gid, 10)),
			t
		},
		r = function(e, n, o, i) {
			var r, a, s, l = document.querySelectorAll(".pswp")[0];
			if (s = t(n), a = {
				galleryUID: n.getAttribute("data-pswp-uid"),
				getThumbBoundsFn: function(e) {
					var t = s[e].el.children[0],
					n = window.pageYOffset || document.documentElement.scrollTop,
					o = t.getBoundingClientRect();
					return {
						x: o.left,
						y: o.top + n,
						w: o.width
					}
				},
				addCaptionHTMLFn: function(e, t, n) {
					return e.title ? (t.children[0].innerHTML = e.title + "<br/><small>Photo: " + e.author + "</small>", !0) : (t.children[0].innerText = "", !1)
				},
				shareEl: !1,
				arrowEl: !0,
				fullscreenEl: !1,
				tapToClose: !0,
				closeOnScroll: !1,
				closeOnVerticalDrag: !1,
				mouseUsed: !1,
				history: !1
			},
			i) if (a.galleryPIDs) {
				for (var c = 0; c < s.length; c++) if (s[c].pid == e) {
					a.index = c;
					break
				}
			} else a.index = parseInt(e, 10) - 1;
			else a.index = parseInt(e, 10);
			if (!isNaN(a.index)) {
				for (var p = document.getElementsByName("gallery-style"), d = 0, u = p.length; d < u; d++) if (p[d].checked) {
					"radio-all-controls" == p[d].id || "radio-minimal-black" == p[d].id && (a.mainClass = "pswp--minimal--dark", a.barsSize = {
						top: 0,
						bottom: 0
					},
					a.captionEl = !1, a.fullscreenEl = !1, a.shareEl = !1, a.bgOpacity = .85, a.tapToClose = !0, a.tapToToggleControls = !1);
					break
				}
				o && (a.showAnimationDuration = 0),
				r = new PhotoSwipe(l, PhotoSwipeUI_Default, s, a);
				var f, h, m = !1,
				g = !0;
				r.listen("beforeResize",
				function() {
					var e = window.devicePixelRatio ? window.devicePixelRatio: 1;
					e = Math.min(e, 2.5),
					f = r.viewportSize.x * e,
					f >= 1200 || !r.likelyTouchDevice && f > 800 || screen.width > 1200 ? m || (m = !0, h = !0) : m && (m = !1, h = !0),
					h && !g && r.invalidateCurrItems(),
					g && (g = !1),
					h = !1
				}),
				r.listen("gettingData",
				function(e, t) {
					m ? (t.src = t.o.src, t.w = t.o.w, t.h = t.o.h) : (t.src = t.m.src, t.w = t.m.w, t.h = t.m.h)
				}),
				r.init()
			}
		},
		a = document.querySelectorAll(e), s = 0, l = a.length; s < l; s++) a[s].setAttribute("data-pswp-uid", s + 1),
		a[s].onclick = o;
		var c = i();
		c.pid && c.gid && r(c.pid, a[c.gid - 1], !0, !0)
	};
	if ($("#thelist").attr("data-pswp-uid")) {
		var t = "";
		t += '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"><div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button> <button class="pswp__button pswp__button--share" title="Share"></button> <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button> <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div></div>',
		$("footer.bottom").after(t),
		e("#thelist")
	}
} ();
var adIp = "";


//判断是否在微信中打开
function is_weixin() {
	var uaa = navigator.userAgent.toLowerCase();
	var odocumentH=$(document).height();
	var owindowW=$(window).width();
	var kg=true;
	if (uaa.indexOf('micromessenger')>0) {
	 if(browser.versions.ios) { //if ios
			$('body').append('<div class="mask main-bg"><img src="/statics/img/iphone_wx.png"></div>');	
		}				
		if(browser.versions.android) {//if android
			$('body').append('<div class="mask main-bg"><img src="/statics/img/anzhuo_wx.png"></div>');
		}
		$('.mask img').css({'position':'fixed','right':'22px','top':'15px'})
		document.addEventListener("touchmove",function(e){//清除底层文档默认滑动；
			if(kg){
				e.preventDefault();
				e.stopPropagation();
			};
		},false); 
		
		$(".mask").click(function () {
			$(".mask").remove();
			kg=false;
		});
		return false;	
	};
};
$('#info #btns a').click(is_weixin);

function loadmore() {
	$($(".rank .tab-content:visible")).find(".lookmore").click(function() {
		if (0 == $(this).prev().find("li:hidden").length) $(this).remove();
		else {
			var t = $(this).prev().find("li:visible").length;
			$(this).prev().find("li").slice(0, t + 4).show()
		}
	})
}
if ($("#lookmore").length > 0) {
	var obj = $("#lookmore"),
		num = obj.data("show");
	num && (obj.parent().children().hide().slice(0, num).show(), obj.parent().children().length - 1 < num ? obj.hide() : obj.show()), obj.click(function() {
		$(this).hasClass("expand") ? (obj.find("span").text("展开全部"), obj.parent().children().hide().slice(0, num).show(), obj.show()) : (obj.find("span").text("收起内容"), obj.parent().children().show()), $(this).toggleClass("expand")
	})
}



// 懒加载插件
window.Echo=(function(window,document,undefined){'use strict';var store=[],offset,throttle,poll;var _inView=function(el){var coords=el.getBoundingClientRect();return((coords.top>=0&&coords.left>=0&&coords.top)<=(window.innerHeight||document.documentElement.clientHeight)+parseInt(offset));};var _pollImages=function(){for(var i=store.length;i--;){var self=store[i];if(_inView(self)){self.src=self.getAttribute('data-echo');store.splice(i,1);}}};var _throttle=function(){clearTimeout(poll);poll=setTimeout(_pollImages,throttle);};var init=function(obj){var nodes=document.querySelectorAll('[data-echo]');var opts=obj||{};offset=opts.offset||0;throttle=opts.throttle||250;for(var i=0;i<nodes.length;i++){store.push(nodes[i]);}_throttle();if(document.addEventListener){window.addEventListener('scroll',_throttle,false);}else{window.attachEvent('onscroll',_throttle);}};return{init:init,render:_throttle};})(window,document);
// 执行echo懒加载
Echo.init({
	offset: 0,
	throttle: 0
});
$(function(){

$(".intro img").removeAttr("height").css("height","");

	//recomdsoft();
	scrollX();//滑动
	
	$('.show-jieshao').append('<i style="display:block; position:absolute; width:100%; height:40px;background: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1));bottom:50px"></i>')
	$(".show-jieshao i").eq(0).click(function(){
		var btnText = $(this).text();
		if(btnText=="显示全部"){
			$(".intro").css("height","auto");
			//$('.show-jieshao i').hide()
			$(this).text("收起内容")
		}else{
			$(".intro").css("height","500px");
			$('.show-jieshao i').show()
			$(this).text("显示全部")	
		}
	})
	var phi = 0
	$('.intro p ').each(function(i){
		
		var pheight = $(this).height() + 20;
		phi = phi + pheight
		
	})
	//if(phi < 500){
		$('.show-jieshao').hide();
		$('.intro').css('height','auto')
	//}else{
	//	$(".intro").css("height","auto");
	//	$(".show-jieshao i").eq(0).text("收起内容");
	//}
});


//
var htmlDecode = function(str) {return str.replace(/&#(x)?([^&]{1,5});?/g,function($,$1,$2) {return String.fromCharCode(parseInt($2 , $1 ? 16:10));});}
function incity(areastr,arr){
  for(i=0;i<arr.length;i++)
    if(areastr.indexOf(arr[i]) != -1)return true;
  return false;
}
function isAds(){
	var downHref = $("#address").attr("href");//获取下载地址
	var noAd = swurl;
	for(i=0;i<noAd.length;i++){//循环查找商务包数组
		if(downHref.indexOf(noAd[i]) > -1)return true;
	}
	return false;
}
function inzskey(softname,arr){
  for(i=0;i<arr.length;i++)
    if(softname.indexOf(arr[i]) != -1)return true;
  return false;
}

var zsCity= ['北京']; //zs不显城市
var zsnoRid = ['178','198'];//zs游戏类Rootid
var showzs = ["baidu.com","sm.cn","sogou.com","so.com","toutiao.com","google.com"];//zs指定来路域名
var timeon=1;//zs时间开关

function citygs(zm){	//城市判断
    var hh=(new Date()).getHours();
     //if(hh>=8 && hh<20)return false;
       //if(hh>=8 && hh<20 && zm==0)return false;

	var ipjson=localStorage["ipjson"]?localStorage["ipjson"]:"";
	if (ipjson!="")
		showgaosu(ipjson);
	else{
		$.ajax({
			async:true,url:"//ip.xiazaicc.com/ip_data",type:"get",dataType:"jsonp",jsonp:'callback',jsonpCallback:'showgaosu',data:{q:"javascript",count:"1",sign:"singcww5cwP7cKh3en2f"},success: function(response, status, xhr){}
		});
	}
}

function showgaosu(result) {
	localStorage["ipjson"]=result;
    var result= JSON.parse(result);
	var address = htmlDecode(result.address);
    var downgaosu=sessionStorage["downgaosu"]?sessionStorage["downgaosu"]:"";
	var hh=(new Date()).getHours();
	// || ($.inArray(_pageinfo.rootId,azroot)==-1 && hh >= 8 && hh<20)
    if(incity(address,zsCity) || !browser.versions.android || isAds() || downgaosu=="1" || Cookie.get("downgaosu") == "1" || (!showzs.in_mid(openurl) && Cookie.get("fromssyq") != "1")) return false;

    if(/android/i.test(navigator.userAgent)){
        var myDownurl = $('#address').attr('href');
        var mytitle = $('h1').text();
        var addtitle = [];
        var gaosuurl = [];
        var gaosudownurl = 'http://zs.xiazaicc.com/006/006';
        for(i=0;i<addtitle.length;i++){
            if(mytitle.indexOf(addtitle[i]) > -1){
                gaosudownurl = gaosuurl[i];
                break;
            }
        }
		var zoum=(new Date()).getDay();
		//if(zoum==0||zoum==6)
		//	addurl();
		//else
			addaq();
        function addurl(){
            var addShichang = '<span style="font-size:12px;width:100px;background:url(/statics/images/checked.png) no-repeat 0px 3px;background-size:15px 15px;color:#999;padding-left:22px;margin:10px 20px 0 10px;display:block;text-align:left;" class="dw_checkbox" id="down_app">优先下载360手机助手，更安全</span><a style="width:auto;" href="'+gaosudownurl+'" class="span9 m-game-down down f-eject-btn" data-flag="downbtn" id="address" issw="true">高速下载</a>';
            var btnhtm=$('#btns').html();
            $('#btns').html(addShichang);
            $('#down_app').click(function(){
                if($(this).attr('class') == 'dw_checkbox'){
                    $(this).removeClass().addClass('dw_checkno').css({"background":"url(/statics/images/check.png) no-repeat 0px 3px","background-size":"15px 15px" });
                    $('#address').text('立即下载').attr("href",myDownurl);
                    //$('#btns').html(btnhtm);
                    sessionStorage["downgaosu"]="1";Cookie.set('downgaosu','1',72*60*60*1000);
                }else{
                    $(this).removeClass().addClass('dw_checkbox').css({"background":"url(/statics/images/checked.png) no-repeat 0px 3px","background-size":"15px 15px" });
                    $('#address').text('高速下载').attr("href",gaosudownurl);
                    sessionStorage["downgaosu"]="";Cookie.set('downgaosu','0',72*60*60*1000);
                }
            });
            if(downgaosu=="1" || Cookie.get("downgaosu") == "1") $('#down_app').click();
            $('#address').click(function(){setTimeout("if($('#down_app').hasClass('dw_checkbox')){sessionStorage['downgaosu']='1';Cookie.set('downgaosu','1',72*60*60*1000);$('#down_app').click();}",1000);});
        }
		function addaq(){
            var btnhtm=$('#btns').html();
            $("#btns").append('<a style="border: 1px solid #2BB866;margin-left:10px" href="'+gaosudownurl+'" class="gs2">安全下载<i>需下载应用市场</i></a>');
            $("#btns").after('<div id="aqxzts" style="display: block;width:100%;line-height: 20px;background:#fcfffc;color:#888;border: 1px solid #5Bc896;box-sizing: border-box;margin-bottom:8px;padding: 5px 10px;font-size: 12px;text-align: left;border-radius: 4px;"><font style="color: #65bb0a;">说明：</font>安全下载是直接下载360助手，用户下载后可自行搜索目标进行更高速、更安全下载。</div>');
            $("#address").css({color:"#2BB866",background:"#fff",border:"1px solid #2BB866"});
            $('.gs2').click(function(){/*$('#btns').html(btnhtm);$('#aqxzts').remove();*/
				setTimeout("sessionStorage['downgaosu']='1';Cookie.set('downgaosu','1',72*60*60*1000);",1000);
			})
		}
    }
}
if($('#down-page').length>0){
	var openurl = document.referrer ;
	if(openurl != '' && (openurl.indexOf("xfdown.com") == -1 || Cookie.get("fromssyq") == "1")){
		//
		var zoum=(new Date()).getDay();
		if(zoum==0||zoum==6){
			citygs(1);
		}else{
			citygs(0);
		}
		//end
	}
}


//正文图片预览
var imgdefereds=[];
$('.intro img').each(function(){
	var dfd=$.Deferred();
	$(this).bind('load',function(){
	dfd.resolve();
	}).bind('error',function(){
	})
	if(this.complete) setTimeout(function(){
	dfd.resolve();
	},200);
	imgdefereds.push(dfd);
})
$.when.apply(null,imgdefereds).done(function(){
showimg();
});

function showimg(){
	var items = [];
	$(".intro img").each(function() {
		var wh=$(this).width()+"x"+$(this).height();
		var s=$(this).attr("src");
		var strA = "<a class='showimg' href='"+s+"' data-size='"+wh+"' data-med-size='"+wh+"' data-med='"+s+"' target='_blank'></a>";
		$(this).wrap(strA);
		var o = {src:s,w: parseInt($(this).width()),h:parseInt($(this).height())};
		items.push(o);
		$(this).click(function() {
			var a=$(".intro img").index(this);
			console.log(a);
			var pswpElement = document.querySelectorAll('.pswp')[0];
			var options = {
				index: a,
				shareEl: !1,
				arrowEl: !0,
				fullscreenEl: !1,
				captionEl : !1, 
				bgOpacity : .85,
				tapToClose : !0, 
				tapToToggleControls : !1,
				history: !1,
				closeOnScroll: !1,
				closeOnVerticalDrag: !1,
				mouseUsed: !1,
			};
			var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
			gallery.init();
			return false;
		});
	});
}



$(function(){
	//common-head
	var catanav=false;
	var pullnav=false;
	$('#mcate b').click(function(){		
		if(catanav==false){
        $('#mcateCont').css('height','auto');
		$('#nav .pullNav').removeClass('open');
	    $('#nav .moreNav').css('display','none');
		pullnav=false;
		catanav=true;
		}else{
			$('#mcateCont').animate({height:'0px'},100);
			catanav=false;
		}			
    });
	$('#mcateCont p span').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		var index = $('#mcateCont p span').index(this);
		$('#mcateCont ul').eq(index).addClass('on').siblings().removeClass('on');
	});
	//common-curNav
	var url=window.location.href;
	$('.mainNav li a').each(function(){
		if(url.indexOf('app.html')>-1 || url.indexOf('apphot.html')>-1 || url.indexOf('appnew.html')>-1 || url.indexOf('apptj.html')>-1){
		    $('.mainNav li').eq(1).addClass('cur');
		}else if(url.indexOf('wangyou.html')>-1 || url.indexOf('wangyouhot.html')>-1 || url.indexOf('wangyounew.html')>-1 || url.indexOf('wangyoutj.html')>-1){
		    $('.mainNav li').eq(2).addClass('cur');
		}else if(url.indexOf('youxi.html')>-1 || url.indexOf('youxihot.html')>-1 || url.indexOf('youxinew.html')>-1 || url.indexOf('youxitj.html')>-1){
		    $('.mainNav li').eq(3).addClass('cur');
		}else if(url.indexOf('tech.html')>-1){
		    $('.mainNav li').eq(3).addClass('cur');
		}else if(url.indexOf('k.html')>-1){
		    $('.mainNav li').eq(4).addClass('cur');
		}else if($('#index-page').length>0){
			$('.mainNav li').eq(0).addClass('cur');
		}
	});
	//common-pullNav	
	$('#nav .pullNav').click(function(){
		if(pullnav==false){
			$('#nav .pullNav').addClass('open');
			$('#nav .moreNav').css('display','block');
			pullnav=true;
		}else{
			$('#nav .pullNav').removeClass('open');
			$('#nav .moreNav').css('display','none');
			pullnav=false;
		}
	});
});

function iswl(downHref){
	var wpurl =["198449.com","197946.com","198254.com","qweqwi.com","197784.com","zxclqw.com","xiaotongqq.com","xainjo.com"];
	for(i=0;i<wpurl.length;i++){
		if(downHref.indexOf(wpurl[i]) > -1)return true;
	}
	return false;
}
$(function(){
	if (iswl($('#address').attr("href")) && $("#down1").length>0){
		$('#address').click(function(){
		document.getElementById("down1").src='javascript:top.location.replace("'+$('#address').attr("href")+'")';
		return false;
		});
	}
});

$('.tjyxph').remove();
/*
      //ad-down-game
       if($('.tjyxph').length>0){
            if(browser.versions.ios) { 
            $('.tjyxph #thelist3').append('');
             }
            if(browser.versions.android) { 
	        $('.tjyxph #thelist3').append('<li><a href="/down.asp?id=45980"><img src="http://pic.xfdown.com/uploads/2019-4/20194101149193735.png">高德地图</a></li><li><a href="/down.asp?id=53854"><img src="http://pic.xfdown.com/uploads/2019-4/20194101127391436.png">UC浏览器</a></li><li><a href="/down.asp?id=62667"><img src="http://pic.xfdown.com/uploads/2019-4/20194101152431472.png">奇热漫画</a></li><li><a href="/down.asp?id=55911"><img src="http://pic.xfdown.com/uploads/2019-4/2019410127282667.png">优酷视频</a></li>');
            } 
            else { 
	        $('.tjyxph #thelist3').append('<li><a href="/down.asp?id=45980"><img src="http://pic.xfdown.com/uploads/2019-4/20194101149193735.png">高德地图</a></li><li><a href="/down.asp?id=53854"><img src="http://pic.xfdown.com/uploads/2019-4/20194101127391436.png">UC浏览器</a></li><li><a href="/down.asp?id=62667"><img src="http://pic.xfdown.com/uploads/2019-4/20194101152431472.png">奇热漫画</a></li><li><a href="/down.asp?id=55911"><img src="http://pic.xfdown.com/uploads/2019-4/2019410127282667.png">优酷视频</a></li>');
            }       
       }

*/



function scrollX(){
	setTimeout(function(){
		$(".plist").each(function(i){//横向多个滑动
			var idStr = $(this).attr("id");
			var parent_class =  $(this).attr("class");
			var child_class =  $("."+parent_class).children(i).children(0).attr("class");
			createIScroll(idStr,"g-ppt-btn");
		});
	},1000)
	
}
function createIScroll(idStr, tabClassStr){
	var snap = false;
	var classStr =  $("#"+idStr).attr("class");
	var splitClassStr = classStr.split(" ");
	var scrollObj = new IScroll("#"+idStr,{
			snap: snap,
			momentum: !snap,
			resize: true,
			disableMouse: true,
    		disablePointer: true,
			eventPassthrough: true,
			scrollX: true,
			scrollY: false,
			preventDefault: false
	});
	return snap;
}

var shangwuData = {
	//安卓弹层
	tcAndroidData:[["问道手游","http://m.danji100.com/game/78.html","http://pic.danji100.com/upload/2018-4/201842315428764.jpg"],
    ["我的使命","http://m.danji100.com/game/238.html","http://pic.danji100.com/upload/2018-4/20184281042337653.jpg"],
["坦克前线","http://m.danji100.com/game/240.html","http://pic.danji100.com/upload/2018-4/2018428115299078.png"],
["龙腾传世","http://m.danji100.com/game/239.html","http://pic.danji100.com/upload/2018-4/2018428105392348.jpg"],
["西游奇遇记","http://m.danji100.com/game/13322.html","http://pic.danji100.com/upload/2019-7/20197111240518982.png"],
["神之路","http://m.danji100.com/game/18783.html","http://pic.danji100.com/upload/2018-5/2018530144743158.jpg"],
["一刀9999","http://m.danji100.com/game/10818.html","http://pic.danji100.com/upload/2019-6/2019627850537391.png"],
["倩女幽魂","http://m.danji100.com/game/51.html","http://pic.danji100.com/upload/2018-4/20184181140301217.png"],
["官居一品","http://www.danji100.com/game/550.html","http://pic.danji100.com/upload/2018-5/2018581719481979.png"]],
	//安卓其他城市
	tcOhterCity:[["问道手游","http://m.danji100.com/game/78.html","http://pic.danji100.com/upload/2018-4/201842315428764.jpg"],
    ["我的使命","http://m.danji100.com/game/238.html","http://pic.danji100.com/upload/2018-4/20184281042337653.jpg"],
["坦克前线","http://m.danji100.com/game/240.html","http://pic.danji100.com/upload/2018-4/2018428115299078.png"],
["龙腾传世","http://m.danji100.com/game/239.html","http://pic.danji100.com/upload/2018-4/2018428105392348.jpg"],
["西游奇遇记","http://m.danji100.com/game/13322.html","http://pic.danji100.com/upload/2019-7/20197111240518982.png"],
["神之路","http://m.danji100.com/game/18783.html","http://pic.danji100.com/upload/2018-5/2018530144743158.jpg"],
["一刀9999","http://m.danji100.com/game/10818.html","http://pic.danji100.com/upload/2019-6/2019627850537391.png"],
["倩女幽魂","http://m.danji100.com/game/51.html","http://pic.danji100.com/upload/2018-4/20184181140301217.png"],
["官居一品","http://www.danji100.com/game/550.html","http://pic.danji100.com/upload/2018-5/2018581719481979.png"]],
	//苹果弹层
	tcIosData:[[" 死神觉醒","http://m.xfdown.com/soft/89643.html","http://pic.xfdown.com/uploads/2019-4/2019416912222611.png"],
 ["传世挂机","http://m.xfdown.com/soft/89862.html","http://pic.xfdown.com/uploads/2019-6/20196171715338641.png"],
["葫芦娃","http://m.xfdown.com/soft/89767.html","http://pic.xfdown.com/uploads/2019-4/20194151638501576.png"],
["口袋妖怪复刻","http://m.xfdown.com/soft/89630.html","http://pic.xfdown.com/uploads/2019-4/20194161020212310.png"],
["火影忍者忍者大师","http://m.xfdown.com/soft/89855.html","http://pic.xfdown.com/uploads/2019-5/201956141685792.png"],
["妖怪金手指","http://m.xfdown.com/soft/89753.html","http://pic.xfdown.com/uploads/allimg/1807/4-1PH31630460-L.png"],
["口袋妖怪日月","http://m.xfdown.com/soft/89792.html","http://pic.xfdown.com/uploads/2019-4/20194131430203907.png"],
["去吧皮卡丘","http://m.xfdown.com/soft/89683.html","http://pic.xfdown.com/uploads/allimg/1808/4-1PR11505520-L.jpg"],
["新大主宰","http://m.xfdown.com/soft/89845.html","http://pic.xfdown.com/uploads/2019-4/2019420944417524.png"]],
	//苹果其他地区弹层
	tcIosOhterCity:[[" 死神觉醒","http://m.xfdown.com/soft/89643.html","http://pic.xfdown.com/uploads/2019-4/2019416912222611.png"],
 ["传世挂机","http://m.xfdown.com/soft/89862.html","http://pic.xfdown.com/uploads/2019-6/20196171715338641.png"],
["葫芦娃","http://m.xfdown.com/soft/89767.html","http://pic.xfdown.com/uploads/2019-4/20194151638501576.png"],
["口袋妖怪复刻","http://m.xfdown.com/soft/89630.html","http://pic.xfdown.com/uploads/2019-4/20194161020212310.png"],
["火影忍者忍者大师","http://m.xfdown.com/soft/89855.html","http://pic.xfdown.com/uploads/2019-5/201956141685792.png"],
["妖怪金手指","http://m.xfdown.com/soft/89753.html","http://pic.xfdown.com/uploads/allimg/1807/4-1PH31630460-L.png"],
["口袋妖怪日月","http://m.xfdown.com/soft/89792.html","http://pic.xfdown.com/uploads/2019-4/20194131430203907.png"],
["去吧皮卡丘","http://m.xfdown.com/soft/89683.html","http://pic.xfdown.com/uploads/allimg/1808/4-1PR11505520-L.jpg"],
["新大主宰","http://m.xfdown.com/soft/89845.html","http://pic.xfdown.com/uploads/2019-4/2019420944417524.png"]],
	//下载页顶部安卓推荐位
	androidTopRecomd:[["大话西游","大话西游","http://m.xfdown.com/soft/60411.html","http://pic.xfdown.com/uploads/2019-4/2019411155026241.png"],
["闪烁之光","闪烁之光","http://m.xfdown.com/soft/17210.html","http://pic.xfdown.com/uploads/2019-5/201958111476880.png"],
["王者荣耀","王者荣耀","http://m.xfdown.com/soft/60553.html","http://pic.xfdown.com/uploads/2019-4/2019411104218726.png"],
["和平精英","和平精英","http://m.xfdown.com/soft/14646.html","http://pic.xfdown.com/uploads/2019-5/201958853427710.jpg"],
["熹妃传","熹妃传","http://m.xfdown.com/soft/62095.html","http://pic.xfdown.com/uploads/2019-4/20194171312426447.png"],
["部落冲突","部落冲突","http://m.xfdown.com/soft/61145.html","http://pic.xfdown.com/uploads/allimg/1808/2-1PP21414040-L.png"],
["蜀门手游","蜀门手游","http://m.xfdown.com/soft/67234.html","http://pic.xfdown.com/uploads/2019-4/2019491820583742.png"],
["三国志战略版","三国志战略版","http://m.xfdown.com/soft/93555.html","http://pic.xfdown.com/uploads/2019-8/20198191742282395.png"],
["正统三国","正统三国","http://m.xfdown.com/soft/67306.html","http://pic.xfdown.com/uploads/2019-4/20194101633346130.png"],
["贪玩蓝月","贪玩蓝月","http://m.xfdown.com/soft/69797.html","http://pic.xfdown.com/uploads/2019-4/20194261644188657.png"],
["怒火一刀","怒火一刀","http://m.xfdown.com/soft/72125.html","http://pic.xfdown.com/uploads/2019-5/20195251155442126.png"],
["会玩手游","会玩手游","http://m.xfdown.com/soft/25528.html","http://pic.xfdown.com/uploads/2019-5/20195989417056.png"]],
	//下载页顶部IOS推荐位
	iosTopRecomd:[[" 死神觉醒","http://m.xfdown.com/soft/89643.html","http://pic.xfdown.com/uploads/2019-4/2019416912222611.png"],
 ["传世挂机","http://m.xfdown.com/soft/89862.html","http://pic.xfdown.com/uploads/2019-6/20196171715338641.png"],
["葫芦娃","http://m.xfdown.com/soft/89767.html","http://pic.xfdown.com/uploads/2019-4/20194151638501576.png"],
["口袋妖怪复刻","http://m.xfdown.com/soft/89630.html","http://pic.xfdown.com/uploads/2019-4/20194161020212310.png"],
["火影忍者忍者大师","http://m.xfdown.com/soft/89855.html","http://pic.xfdown.com/uploads/2019-5/201956141685792.png"],
["妖怪金手指","http://m.xfdown.com/soft/89753.html","http://pic.xfdown.com/uploads/allimg/1807/4-1PH31630460-L.png"],
["口袋妖怪日月","http://m.xfdown.com/soft/89792.html","http://pic.xfdown.com/uploads/2019-4/20194131430203907.png"],
["去吧皮卡丘","http://m.xfdown.com/soft/89683.html","http://pic.xfdown.com/uploads/allimg/1808/4-1PR11505520-L.jpg"],
["新大主宰","http://m.xfdown.com/soft/89845.html","http://pic.xfdown.com/uploads/2019-4/2019420944417524.png"]],
}

/*下载页广告Begin*/
function recomdsoft(){		
	var u = navigator.userAgent; 
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
	if(isiOS==true){//IOS		
		var topRecomdHtml = "";
		var topRecomdSize = shangwuData.iosTopRecomd.length;	
		for(i=0;i<topRecomdSize;i++){
			topRecomdHtml += '<li><a href="'+shangwuData.iosTopRecomd[i][1]+'"><img src="'+shangwuData.iosTopRecomd[i][2]+'"><strong>'+shangwuData.iosTopRecomd[i][0]+'</strong></a></li>'
		}
		
		$(".keynav").html(topRecomdHtml);
	}else{//安卓
		var topRecomdHtml = "";
		var topRecomdSize = shangwuData.androidTopRecomd.length;	
		
		
		var recomdRandomAll = [];			
		var i = 0;
		for(y=0;y<topRecomdSize;y++){
			var recomdRandomSize = Math.floor(topRecomdSize*Math.random());
			if($.inArray(recomdRandomSize,recomdRandomAll) == -1){
				i = recomdRandomSize;
				recomdRandomAll.push(i)
				topRecomdHtml += '<li><a href="'+shangwuData.androidTopRecomd[i][2]+'"><img src="'+shangwuData.androidTopRecomd[i][3]+'"><strong class="name">'+shangwuData.androidTopRecomd[i][0]+'</strong><strong class="name">'+shangwuData.androidTopRecomd[i][1]+'</strong></a></li>'	;					
			}else{
				y--;	
			}
		}
		var randomAll = [];
		for(z=0;z<topRecomdSize;z++){
			var randomNum = Math.floor(topRecomdSize*Math.random());	
			if($.inArray(randomNum,randomAll) == -1){					
				randomAll.push(randomNum)			
			}else{
				z--;	
			}
		}
		var n = 0;
		var firstHtml ="";
		window.setInterval(function(){		
			var recomdObj = $(".keynav li");		
			var oneObj = recomdObj.eq(randomAll[n]).find("a .name:first");
			firstHtml = oneObj.html();				
			oneObj.animate({height:"0px"},800,function(){					
				recomdObj.eq(randomAll[n]).find("a .name:last").after('<strong class="name one">'+firstHtml+'</strong>');							
				oneObj.remove();			
				if(n < topRecomdSize-1){
					n++;
				}else{
					n=0;	
				}		
			});			
		},1000);
		
		$(".keynav").html(topRecomdHtml);
	}
};



// JavaScript Document
 //==================函数列表=========================

 String.prototype.Trim=function(){ return  this.replace(/(^\s+)|(\s+$)/g,"");}
 String.prototype.Ltrim = function(){ return  this.replace(/(^\s+)/g,   "");}
 String.prototype.Rtrim = function() { return this.replace(/(\s+$)/g, "");}

//================= AJAX 提交表单 ====================

var TypeID,SoftLinkID;

	TypeID =_downInfo.TypeID;
	SoftLinkID = _downInfo.SoftLinkID;
	SoftID= _downInfo.SoftID; 
 
	$("#address").click(function(){
		softCount(SoftID,SoftLinkID)	
	});

//统计点次下载次数
 function softCount(SoftID,SoftLinkID)
 { 
	if(typeof _pageinfo=="undefined")return;
	var title_=_pageinfo.softname+_pageinfo.softver;
	if (title_.indexOf("破解")!=-1)return;
	var downcount=sessionStorage["DownCount"+SoftID]?sessionStorage["DownCount"+SoftID]:"";
	if(downcount==""){
		sessionStorage["DownCount"+SoftID]="1";
		var Url = "Action=6&SoftLinkID=" + escape(SoftLinkID) + "&SoftID=" + escape(SoftID)
		$.post("../ajax.asp",Url,function(data,status){});
		if(isAds()){
			$.ajax({
				type:"POST",
				url:"http://api.xiazaicc.com/index/shangwulink/form?t_="+(new Date).getTime(),
				data:"name="+escape(title_)+"&domain_url="+escape(location.href)+"&shangwu_url="+escape($("#address").attr("href")),
				success: function(data, status, xhr){}
			});
		}
	}
 }
$(function(){
	var downurl=$("#address").attr("href");
	if(downurl.indexOf("//apps.apple.com/")==-1 && downurl.indexOf("//pan.baidu.com/")==-1){
	if($("#address").attr("href").indexOf("//apps.apple.com/")==-1){
		$("body").append("<iframe src='about:blank' width='0' height='0' frameborder='0' scrolling='no' name='down1' id='down1'></iframe>");
		$("#address").attr("target","down1");
		$("#address").bind("mousedown",function(){ 
			var objEvt = $._data($("#down1")[0], "events");
			if (objEvt && objEvt["load"])return;
			$("#down1").bind("load",downerr = function(){
				$("#down1").unbind("load",downerr);
				if(typeof _pageinfo=="undefined")return;
				var id=_pageinfo.id;
				var downerrdata=sessionStorage['derr'+id]?sessionStorage['derr'+id]:"";
				if(downerrdata==""){
					var data="domain="+escape(location.host)+"&soft_id="+escape(_pageinfo.id)+"&name="+escape(_pageinfo.softname)+"&url="+escape(downurl)+"&address="+escape(location.href)+""
					$.ajax({type: "POST",url: "http://api.xiazaicc.com/index/api/errorinfo",data: data,
						success: function(msg){
							console.log(msg);
							sessionStorage['derr'+id]="1";
						}
					});
				}
				location.href=downurl;
			});
		});
	}
	}
});

if($(".compy .pname").text()=="包名：")$(".compy .pname").remove();
if($(".compy .md5").text()=="MD5：")$(".compy .md5").remove();
if($(".compy .com-pyxx").text()=="厂商名称：")$(".compy .com-pyxx").remove();
$(".bjhf").each(function(){
	var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
    $(this).html($(this).html().replace(reg,'<a target="_blank" href="$1$2">$1$2</a>'));
});
function ischkwords(){
	if (typeof census_word == "undefined") return false;
	for(i=0;i<census_word.length;i++){
		if(document.title.indexOf(census_word[i]) !=-1)return true;
	}
	return false;
}
function viewcount(){
	if(typeof _pageinfo=="undefined")return;
	var downviewdata=sessionStorage['softview'+_pageinfo.id]?sessionStorage['softview'+_pageinfo.id]:"";
	var ckvus=Cookie.get('softuserview');
	if(downviewdata==""&& ckvus=="" && ischkwords()){
		$.ajax({type: "POST",url: "/ajax.asp",data:"action=31&id="+escape(_pageinfo.id),
			success: function(msg){
				sessionStorage['softview'+_pageinfo.id]="1";
				Cookie.set('softuserview', 1, 20*3600*1000)
			}
		});
	}
}
viewcount();

if(typeof _pageinfo!="undefined"){
	if(azroot.indexOf(_pageinfo.rootId) == -1 && iosroot.indexOf(_pageinfo.rootId) == -1){
		var _hmt = _hmt || [];
		(function() {
		  var hm = document.createElement("script");
		  hm.src = "https://hm.baidu.com/hm.js?6d07277d4adeb9522e9fe19f023142ae";
		  var s = document.getElementsByTagName("script")[0]; 
		  s.parentNode.insertBefore(hm, s);
		})();
	}
}