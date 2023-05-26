if(typeof _mmshare == "undefined"){
	window._mmshare = {};
}
var jsparam=new Array();
getjsParam();

_mmshare._maid = "wx88577f22238b8976"; //微信认证服务号APPID
_mmshare._scd = "http://cmscalc.gywb.cn:6060/mmsc/"; //分享中心根地址

_mmshare._url = location.href;

_mmshare._sourceAppId = getSourceAppId();

_mmshare._newsId = p("newsId");
_mmshare._newsId2 = p("newsid");  
_mmshare._appId = p("appId");
_mmshare._shareData = p("shareData");

if(_mmshare._url.indexOf("?")>-1){
	_mmshare._url = _mmshare._url.substring(0,_mmshare._url.indexOf("?"));
}

$(function(){
		var image="http://www.gywb.cn/cms_template/100/000/003/img/icons.fw_02.png";
		var title=document.title;
		var desc;
		if(document.getElementById("shareabs")){
			desc=document.getElementById("shareabs").innerHTML;
		}else{
			desc="";
		}
	$.getJSON(_mmshare._scd+"getShareInfo",{_maid:_mmshare._maid,url:location.href.split("#")[0]},function(d){
		wx.config({
			debug:false,
			appId:_mmshare._maid,
			timestamp: d.timestamp,
			nonceStr: d.noncestr,
			signature: d.signature,
			jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone']
		});

		
		/*if(typeof(_shareObj)!=undefined&&typeof(_shareObj)!="undefined"){
			title=_shareObj.title;
			desc=_shareObj.desc;
			image=_shareObj.image;
		}*/
	
		var jumplink="";
		
		if(_mmshare._newsId==null&&_mmshare._newsId2!=null){
			jumplink = _mmshare._url+"?_from=&_l=0&newsid="+_mmshare._newsId2+"&sourceAppId="+_mmshare._sourceAppId+"&appId="+_mmshare._appId+"&random="+d.random;
		}else{
			jumplink = _mmshare._url+"?_from=&_l=0&newsId="+_mmshare._newsId+"&sourceAppId="+_mmshare._sourceAppId+"&appId="+_mmshare._appId+"&random="+d.random;
		}
		wx.ready(function(){
			console.log("22jumplink:"+jumplink+";image:"+image+";desc:"+desc);
			wx.onMenuShareTimeline({
				title:title,
				imgUrl:image,
				link:jumplink+"&_c=1"
			});
			wx.onMenuShareAppMessage({
				title:title,
				desc:desc,
				imgUrl:image,
				link:jumplink+"&_c=2"
			});
			wx.onMenuShareQQ({
				title:title,
				desc:desc,
				imgUrl:image,
				link:jumplink+"&_c=3"
			});
			wx.onMenuShareWeibo({
				title:title,
				desc:desc,
				imgUrl:image,
				link:jumplink+"&_c=4"
			});
			wx.onMenuShareQZone({
				title:title,
				desc:desc,
				imgUrl:image,
				link:jumplink+"&_c=5"
				  
			});
			wx.error(function(res){
				//alert("error:"+JSON.stringify(res));
			});
            wx.updateAppMessageShareData({
				title:title,
				desc:desc,
				imgUrl:image
			});
            wx.updateTimelineShareData({
				title:title,
				desc:desc,
				imgUrl:image
			});

		});
	});
})


function p(n){
	var q = location.href.split("?");
	if(q.length<2) return null;
	var ps = q[1].split("&");
	for(var i=0;i<ps.length;i++){
		var p = ps[i].split("=");
		if(p[0]==n)
			if(p.length<2)return true;
			else return p[1];
	}
	return null;
}

function getSourceAppId(){
	for(var i=0;i<jsparam.length;i++){
		var json=eval(jsparam[i]);
		if("sourceAppId"==json.paramName){
			return  json.paramValue;
		}
	}
}

function getjsParam(){
	var js = document.getElementsByTagName("script");  
		for (var i = 0; i < js.length; i++) {  
		    if (js[i].src.indexOf("mmshare") >= 0) {  
		        var arraytemp = new Array();  
		        arraytemp = js[i].src.split('?');  
		        if(arraytemp[1]!=undefined&&arraytemp[1]!=""&&arraytemp[1]!=null){
					arraytemp = arraytemp[1].split('='); 
					var param={};
					param.paramName=arraytemp[0];
					if(arraytemp[1].indexOf("&")!=-1){
						var tempValue=arraytemp[1].substring(0,arraytemp[1].indexOf("&"));			
						param.paramValue=tempValue;
					}else{
						param.paramValue=arraytemp[1];
					}
					jsparam.push(param);
		        }		        
		        //return arraytemp[1]
		    }  
		}
}