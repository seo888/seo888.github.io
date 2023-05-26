// JavaScript Document
$(document).ready(function(){
	var qcloud={};
	$("[_t_nav]").hover(function(){  
            $(".nav-tc").show();  
        },function(){  
            $(".nav-tc").hide();  
        })  

	 $("a[nid]").click(function(){
		var _nav = $(this).attr('nid');
		clearTimeout( qcloud[ _nav + '_timer' ] );
		qcloud[ _nav + '_timer' ] = setTimeout(function(){
		$('a[nid]').each(function(){
		$(this)[ _nav == $(this).attr('nid') ? 'addClass':'removeClass' ]('active');
		});
	   
		$("#part2-list ul").hide();
		$('#w'+_nav).show();
		 
	   })
	 })
	 
	 var href = window.location.href;
			
			var title = $(".tt_news").html();
			$(".s-wb").on("click", function () {
				window.open('//service.weibo.com/share/share.php?url=' + href + "&title=" + encodeURI(title)
);
			});
			$(".s-q").on("click", function () {
				window.open('//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + href + "&title=" + encodeURI(title)
)
			})
			$(".share-wx-item").on("mouseover", function () {
				$(".wx-ewm").stop(true, true).slideDown();
			}).on("mouseleave", function () {
				$(".wx-ewm").stop(true, true).slideUp();
			});
var str="";
var valu=$(".kwap a").html();
var list=valu.split('|');
$.each(list, function(i,v){      
  str=str+"<div class=\"kwap\"><a href=\"//news.baidu.com/ns?cl=2&rn=20&tn=news&word="+v+"%20site%3Adbw.cn\">"+v+"</a></div>";
}); 
$("#gjc").html(str);	 
var titleh=$(".tt_news").height();

if(titleh>50)
{
   var cha=titleh-48;
   $(".fllow3-wap").css("top",200+cha);
}	 
	 
});


