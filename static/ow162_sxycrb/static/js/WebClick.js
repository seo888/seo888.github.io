//WEB文章点击数
var appif_url = "http://111.53.65.253:8087/app_if/";
var xy_webClick = {
	//提交WEB文章点击数--点击事件
	commitEvent : function() {
		//得到文章ID
		var aid = xy_webClick.getarticleID();
		if (!aid) return;
		
		var url = appif_url + "/event";
		var params = {
			id : aid,
			type : 0,
			eventType : 0,
			channel : 0
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
			
			var start = params.lastIndexOf("/c");
			if (start < 0) return "";
			
			var end = params.lastIndexOf(".");
			
			if (end >= 0) {
				var id = params.substring(start+2,end);
				return id;
			} else {
				return "";
			}
		}
	}
}

$(document).ready(function(){
  xy_webClick.commitEvent();

});
