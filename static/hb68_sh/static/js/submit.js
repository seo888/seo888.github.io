		function submitFun(){
			var date=new Date();
			var hotword="";
			hotword=document.getElementsByName('word')[0].value;
			if (hotword != "") {
				window.open("http://search.news.chinanews.com/search.do?q="+encodeURIComponent(hotword)+"&dbtype=sh");
			}
			return false;
		}

$(document).ready(function(){
	var w,rw,sw;
	$("#switch").click(function(){
		$(".floating_div").hide();
	});
	w = $(window).width();
	rw = 520+w/2;
	sw = rw+"px";
	$(".floating_div").css("left",sw);
});
