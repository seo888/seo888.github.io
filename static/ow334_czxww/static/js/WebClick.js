//WEB文章点击数
var xy_webClick = {
	//提交WEB文章点击数--点击事件
	commitEvent : function() {
		//得到文章ID
		var aid = xy_webClick.getarticleID();
		if (!aid) return;
		var userOtherID = xy_webClick.getVirtualDevid();
		var url = xy_webClick.urlRoot + "/event";
		var params = {
			id : aid,
			type : 0,
			eventType : 0,
			channel : 0,
			userOtherID: userOtherID
		}
		$.ajax({url: url, async:true, dataType:"jsonp", jsonp: 'jsoncallback', cache: true, data:params});

	},
	getarticleID : function() {
		
		if(document.getElementById("DocIDforCount")){
			return document.getElementById("DocIDforCount").value;
  		}
		else 
		{
			var params = window.location.href;
			
			var start = params.lastIndexOf("_");
			if (start < 0) return "";
			
			var end = params.lastIndexOf(".");
			
			if (end >= 0) {
				var id = params.substring(start+1,end);
				return id;
			} else {
				return "";
			}
		}
	},
	getVirtualDevid: function(){
		// 前端模拟设备号
		var virtualDevid = window.localStorage.getItem('virtualDevid');
		if (!virtualDevid) {
			virtualDevid = 'xy' + xy_webClick.getRandomByNum(1000) + xy_webClick.getRandomByNum(10000) + xy_webClick.getRandomByNum(100000) + Date.now();
			window.localStorage.setItem('virtualDevid', virtualDevid);
		}
		return virtualDevid;
	},
	getRandomByNum: function(_v) {
		return Math.floor(Math.random() * 9 * _v + _v).toString();
	}
}
var src = document.currentScript.src ;
src = src.substring(0,src.lastIndexOf("/",src.lastIndexOf("/")-1)) ;
$(function(){
	$.getScript(src+"/common.js",function(){
		xy_webClick.urlRoot= "http://111.22.96.93:2224/app_if/" ;  //外网api根地址
		xy_webClick.commitEvent();
	});
})
