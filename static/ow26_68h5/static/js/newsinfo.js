var theSite = '//tj.68h5.com/';
$(function(){
	QWNews.SetHz();
	if($('.newplun').length > 0){
		var pltop = $('#comment').offset().top;
		$('.newplun').click(function(){
			$('body,html').animate({scrollTop:pltop-100},300);
		});
	}
	hitsSet();
	newsinfo.init();
});


function hitsSet() {
	var r = getReferrer();
	$.getJSON(theSite+"hits.asp?ArticleID=" + ArticleID+"&ref=pc:"+r+"&jsoncallback=?&rnd=" + new Date().getTime(),function(data) {});
}

document.write('<script type="text/javascript" src="//player.youku.com/jsapi"></script>');
var newsinfo = {
	init : function(){
	   if($("embed").length > 0 && $("embed").attr("src").indexOf(".youku.")> -1){
		  this.Youku();
	    }	
	},
	Youku:function(){
		var demo = $("embed"),h=demo.attr("height"),w=demo.attr("width"),url=demo.attr("src");
		var vidzu = url.split("/"),len=vidzu.length,svid=vidzu[len-2].indexOf("==")>-1 ? vidzu[len-2] : vidzu[len-1];
		demo.after("<div id='youkuplayer' style='width:580px;height:326px;margin:auto;'></div>");
		demo.remove();
		var player = new YKU.Player('youkuplayer',{
			styleid:'0',
			client_id:'f17807ebd1783f0b',
			vid:svid,
			newPlayer:true
		});
	}
}