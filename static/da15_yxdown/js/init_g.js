document.writeln('<script type="text/javascript" src="http://static.yxdown.com/all/js/jquery.1.9.1.min.js"></script>');
document.writeln('<script type="text/javascript" src="http://static.yxdown.com/js/turn.js"></script>');
document.writeln('<script src="http://static.yxdown.com/all/js/pb2.js"></script>');
document.writeln('<script type="text/javascript" src="http://static.yxdown.com/all/js/cityjson.js"></script>');
//屏蔽软件和新闻 pft-20170606
try{
	var href = location.href;
	var at =window.pageConfig.at;
	var pt = window.pageConfig.type;
	var id = window.pageConfig.id;
	window.pb=function(data){
		if(data){
			location = '/404?pb='+at+'&href='+ href;
		}
	}
	//根据页面资源信息判断
	if(window.pageConfig){	
		if(window.pageConfig.at){
			var at = window.pageConfig.at;
			document.writeln("<script type=\'text/javascript\' src=\'http://pb.sys.anxiu.com/getpb.do?pt="+pt+"&id="+id+"&at="+at+"&callback=pb&title="+encodeURI(document.title)+"\'></script>");

		}else{
			if(window.pageConfig.type == "soft"||window.pageConfig.type == "news"||window.pageConfig.type == "zt" || window.pageConfig.type == "vrsoft"){
				var pt = window.pageConfig.type.replace("vr","");
				var id = window.pageConfig.id;
				document.writeln("<script type=\'text/javascript\' src=\'http://pb.sys.anxiu.com/getpb.do?pt="+pt+"&id="+id+"&at=myxdown&callback=pb&title="+encodeURI(document.title)+"\'></script>");
			}
		}
	}else{
		//根据路径判断
		if (location.href.indexOf("/azs/")>=0) {
			var pt = "soft";
			function pb_id(){
	            var a = location.href.split("/");
	            var a = a[a.length-1];
	            var a = a.split("?")[0].replace(/[^0-9]/ig,"");
	            return a;
	        }
			document.writeln("<script type=\'text/javascript\' src=\'http://pb.sys.anxiu.com/getpb.do?pt="+pt+"&id="+pb_id()+"&at=myxdownsy&callback=pb&title="+encodeURI(document.title)+"\'></script>");
		}
	}	
}catch(e){}

/*信任过滤*/
var tempwrite = document.write;
function newwrite(str) {
	// console.log(str)
	var d = function() {
		document.write = tempwrite;
		document.write(str);
		document.write = newwrite;
	}
	if (isNaN(str) && str.indexOf("<script") >= 0 && str.indexOf("src") >= 0) {
		//console.log(str)
		if (/(open.ashx|op.ashx|bdstatic|changyan|baidustatic|whafwl|cnzz|kqy1|yxdown|qqxzb|yokaunion|xiazai62|qihucdn|yiwan|punuomisi|uqd168|2k2k|niuxgame77|zsdexun|baidu|shouji56|qhimg|haiyunx|pp8|499|youle55|jusha|88rpg|coolnay|391k|apple|g1c5|chushoushijian|sdqoi2d|tianji520|weizhenwx)/i.test(str)) {
			//console.log(str)
			d();
		}
	}else{
	 	d()
	}
};
try {
	document.write = newwrite;
} catch (err) {}

/*iframe劫持*/
if (self.frameElement && self.frameElement.tagName == "IFRAME") {
    top.location.href=self.location.href;
}
if (window.frames.length != parent.frames.length) {
   top.location.href=self.location.href;
}
if (self != top) {  
    top.location.href=self.location.href;
}
