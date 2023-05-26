//WEB文章点击数
var xy_webClick = {
	//提交WEB文章点击数--点击事件
	commitEvent : function() {
		//得到文章ID
		var aid = xy_webClick.getarticleID();
		if (!aid) return;
		
		var url = xy_webClick.urlRoot + "/event";
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
if(navigator.appName == "Microsoft Internet Explorer") {
    var src = "http://www.ycwb.com/amucsite" ;
    src = "http://www.ycwb.com/amucsite" ;
    $(function(){
		$.getScript(src+"/common.js",function(){
			xy_webClick.urlRoot=xyUrl;  //外网api根地址
			xy_webClick.commitEvent();
		});
	});

}else{
	var src = document.currentScript.src ;
	src = src.substring(0,src.lastIndexOf("/",src.lastIndexOf("/")-1)) ;
	//console.log(src);
	$(function(){
		$.getScript(src+"/common.js",function(){
			xy_webClick.urlRoot=xyUrl;  //外网api根地址
			xy_webClick.commitEvent();
		});
	});

}

