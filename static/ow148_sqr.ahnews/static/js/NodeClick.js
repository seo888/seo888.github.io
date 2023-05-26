//文章分享页：提交分享点击事件；若是选题生产的文章分享，则显示订阅用户
var xy_colClick = {
	//提交分享点击事件
	commitEvent : function() {
		//得到文章ID
		var cid = xy_colClick.getcolumnID();
		if (!cid) return;
		
		var url = xy_colClick.urlRoot + "event";
		var params = {
			id : cid,
			type : 5,
			eventType : 0
		}
		$.ajax({url: url, async:true, dataType:"jsonp", jsonp: 'jsoncallback', cache: true, data:params});
	},
	getcolumnID : function() {
		if(document.getElementById("DocIDforCount")){
			return document.getElementById("DocIDforCount").value;
  		}
		else 
		{
			var params = window.location.href;
			var start = params.lastIndexOf("/");
			if (start < 0) return "";
			params = params.substring(start+1);
			var end = params.lastIndexOf(".");
			if (end >= 0) {
				var id = params.substring(0,end);
				return id;
			}else{
				return "";
			}
		}
	}
}
var src = document.currentScript.src ;
src = src.substring(0,src.lastIndexOf("/",src.lastIndexOf("/")-1)) ;
$(function() {
	$.getScript(src+"/common.js",function(){
		xy_colClick.urlRoot=xyUrl;  //外网api根地址
		xy_colClick.commitEvent();
	});
});
