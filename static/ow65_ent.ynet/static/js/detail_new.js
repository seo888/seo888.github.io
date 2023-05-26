(function(){document.write(unescape('%3Cdiv id="bdcs"%3E%3C/div%3E'));var bdcs = document.createElement('script');bdcs.type = 'text/javascript';bdcs.async = true;bdcs.src = 'http://znsv.baidu.com/customer_search/api/js?sid=17617257847089310497' + '&plate_url=' + encodeURIComponent(window.location.href) + '&t=' + Math.ceil(new Date()/3600000);var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(bdcs, s);})();
$(function(){
	
	$("#subButton").click(function() {

		if( $("#bdcsMain").val() ){

			$("#form_1").submit();

		}		
	});
	
	/*var $newHeader = $(".newHeader");
	$newHeader.find("li").each(function(i, el) {
		$(el).attr("name",$(el).text());
	});
	if(location.href.indexOf("http://dev.phx.ynet.com/") != -1){//http://news.ynet.com
		$("ul.headerNav").find("li[name='新闻']").addClass("cur").siblings("li").removeClass('cur');
	}else if(location.href.indexOf("http://ent.ynet.com/") != -1){
		$("ul.headerNav").find("li[name='娱乐']").addClass("cur").siblings("li").removeClass('cur');
	}else if(location.href.indexOf("http://sports.ynet.com/") != -1){
		$("ul.headerNav").find("li[name='体育']").addClass("cur").siblings("li").removeClass('cur');
	}else if(location.href.indexOf("http://life.ynet.com/") != -1){
		$("ul.headerNav").find("li[name='生活']").addClass("cur").siblings("li").removeClass('cur');
	}else if(location.href.indexOf("http://ly.ynet.com/") != -1){
		$("ul.headerNav").find("li[name='旅游']").addClass("cur").siblings("li").removeClass('cur');
	}else if(location.href.indexOf("http://home.ynet.com/") != -1){
		$("ul.headerNav").find("li[name='房产']").addClass("cur").siblings("li").removeClass('cur');
	}*/
});
//tagtable
$(function(){
	var aLi = $(".tagTitle li");
	var aDiv = $("div.tagConList div.tagCon");
	$("ul.tagTitle li:first").addClass("active");
	$("div.tagConList div.tagCon:first").show();
	aLi.mousemove(function(){
		$(this).addClass("active").siblings().removeClass("active");
		var index =aLi.index(this);
		aDiv.eq(index).show().siblings().hide();
	});
});
//头条加载更多
$(function(){
	$("#touTiaoMore").click(function(){
		$(this).hide();
		$(this).siblings("ul").find("li.none").show();
	})
});
//weixin
$(function(){
	var oWeiBo = $("#weiBo");
	var oKongJian = $("#kongJian");
	var oWeiXin = $(".msgBox .shareBox a.weixin");
	var oClose = $(".shareBox .dialogBox .dialogClose");
	oWeiBo.attr('href','http://service.weibo.com/share/share.php?url=' + encodeURIComponent(location.href + '?from=pc,weibo'));
	oKongJian.attr('href','http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(location.href + '?from=pc,qzone'));
	oWeiXin.click(function(){
		if (!$(".msgBox .dialogBox em").html()) {
			$(".msgBox .dialogBox em").qrcode(location.href+"?forward=1");	
		}
		$(".msgBox .dialogBox h3").html("分享到微信朋友圈");
		$(".msgBox .dialogBox p").html("使用“扫一扫”即可将网页分享到朋友圈");
		$(this).next(".dialogBox").show();
		$(this).addClass("wxHover");
	});
	oClose.click(function(){
		$(this).parent(".dialogBox").hide();
		oWeiXin.removeClass("wxHover");
	});
});
$(function(){
	var pageBoxUl = $("#articleContent ul.pageBox");
	var scrollBoxA = $("#articleContent .scrollCon a[class^='scroll']");
	if( pageBoxUl.length > 0 ){
		scrollBoxA.show();
	}else{
		scrollBoxA.hide();
	}
});
//more
/*$(function(){
	var oConList = $("<div class='tuiJianCon' id='tuiJianCon'></div>"),
	oXinWenList = $("#tjXinWen").prepend("<h1 class='title_h1'>推荐新闻</h1>").append(oConList),
	num = 0,
	numLength = 6,
	aDataList_3 = [];
	oXinWenList.append("<span href='javascript:;' id='jzMore' class='tuiJianMore'>点击加载更多</span>");
	$("#jzMore").click(function(){					
		if( aDataList_3.length - numLength > 10 ){
			num = numLength;
			numLength = numLength + 10;
		}else{
			num = numLength;
			numLength = aDataList_3.length;	
			$(this).hide();
		}
		getData();					
	});	
	function getData(){
		for(var i=num; i<numLength; i++){
			if( aDataList_3[i].title || aDataList_3[i]['date'] ){
				var aDataDate = aDataList_3[i]['date'];
				var aDataTitle = aDataList_3[i].title;
				var aDataDescription = aDataList_3[i].description;
				var aDataLink = aDataList_3[i]['link'];
				var aDataFor = aDataList_3[i]['for'];
				var aDataImg = aDataList_3[i].imgs;
				var html = '<div class="tuiJianBox">'+
								'<h2 class="cfix">'+
									'<span>'+ aDataFor +'</span>'+
									'<a href='+ aDataLink +'>'+ aDataTitle +'</a>'+
								'</h2>'+
								'<p class="description"><a href='+ aDataLink +'>'+ aDataDescription +'<span>［详情］</span></p>'+
								'<ul class="tuiJianUl comList mb10">'+
									'<li class="cfix"><a href='+ aDataLink +'>'+ aDataImg +'</a></li>'+
								'</ul>'+
								'<div class="cfix tuiJianMsg">'+
									'<span class="sourceA">'+ aDataDate +'</span>'+
									'<div class="shareBox">'+
										'<a class="shareFenXiang"></a>'+
										'<a class="weibo"></a>'+
										'<a class="kongjian"></a>'+
										'<a class="weixin"></a>'+
										'<div class="dialogBox">'+
											'<span class="fRight dialogClose">x</span>'+
											'<h3></h3><em></em>'+
											'<p></p>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>';
				oConList.append(html);
			}
		}
		$(".tuiJianBox").each(function(index){
			if( aDataList_3[index]['for'] ){
				$(this).find("h2 span").show();
			}						
			if( aDataList_3[index].imgs ){
				$(this).find("p.description").remove();
				$(this).find("ul.tuiJianUl").show();
			}else{
				$(this).find("p.description").show();
				$(this).find("ul.tuiJianUl").remove();
			}
			var _this = this;			
			var weiXin = $(this).find("a.weixin");
			var oClose = $(this).find(".dialogClose");
			var oWeiBo_1= $(this).find(".weibo");
			var oKongJian_1= $(this).find(".kongjian");
			oWeiBo_1.attr('href','http://service.weibo.com/share/share.php?url=' + encodeURIComponent(aDataList_3[index]['link'] + '?from=pc,weibo'));
			oKongJian_1.attr('href','http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(aDataList_3[index]['link'] + '?from=pc,qzone'));
			weiXin.click(function(){
				var $em = $(_this).find(".dialogBox em");
				if( $em.is(":empty") ){
					$(_this).find(".dialogBox em").qrcode(aDataList_3[index]['link']+"?forward=1");
				}
				$(_this).find(".dialogBox h3").html("分享到微信朋友圈");
				$(_this).find(".dialogBox p").html("使用“扫一扫”即可将网页分享到朋友圈");
				$(".tuiJianBox .dialogBox").hide();
				$(".tuiJianBox a.weixin").removeClass("wxHover");
				$(this).next(".dialogBox").show();
				$(this).addClass("wxHover");
			});
			oClose.click(function(){
				$(this).parent(".dialogBox").hide();
				weiXin.removeClass("wxHover");
			});
		});
	}

	$.ajax({
		url : ($('#static_url').attr('content')?$('#static_url').attr('content'):'http://res.ynet.com/')+"YnetView/tjxw.json",
		type : "get",
		datatype:"json",
		async : true,
		success : function(result){
			// result = result.replace(/\t/g,'').replace(/\r/g,'').replace(/\n/g,'').replace(/"/g,'\\"').replace(/'/g,'"');
			// aDataList_3 = eval("("+result+")");
			aDataList_3 = result;	
			getData();			
		},
		error : function(data){
		}
	});	
});*/
//retutuijian
$(function(){
	var oRtujBox = $("#reTuTuiJian");	
	var oUlBox = $("<ul class='cfix imgList'></ul>");
	var aDataList_1=[];
	oRtujBox.prepend("<h1 class='title_h1'>热图推荐</h1>").append(oUlBox);
	$.ajax({
		url : ($('#static_url').attr('content')?$('#static_url').attr('content'):'http://res.ynet.com/')+"YnetView/rttj.json",
		type : "get",
		datatype:"json",
		async : true,
		success : function(result){	
			// result = result.replace(/\t/g,'').replace(/\r/g,'').replace(/\n/g,'').replace(/"/g,'\\"').replace(/'/g,'"');
			// var aDataList_1 = eval("("+result+")");	
			aDataList_1 = result;
			var url_param_link = '';
			var url_param = location.href.split('?')[1];
		 if (url_param) {
		 url_param_link = '?'+url_param;
		 }
			for( var i=0; i<aDataList_1.length; i++){
				if(aDataList_1[i].imgs){
					var aDataLink = aDataList_1[i].link+url_param_link;
					var aDataTitle = aDataList_1[i].title;
					var aDataImg = aDataList_1[i].imgs;

					var liBox = '<li>'+
									'<a href='+ aDataLink +'>'+ aDataImg +'<span class="tuShuo">'+ aDataTitle +'</span></a>'+
								'</li>';
					oUlBox.append(liBox);
				}					
			}
		},
		error : function(){	
		}
	});
});

/*//kuaixun
$(function(){
	var aDataList_2 = [];
	$.ajax({
		url : "http://res1.ynet.com/h5/kuaixun.json",
		type : "get",
		datatype:"json",
		async : true,
		success : function(result){	
			// result = result.replace(/\t/g,'').replace(/\r/g,'').replace(/\n/g,'').replace(/"/g,'\\"').replace(/'/g,'"');
			// var aDataList_2 = eval("("+result+")");	
			aDataList_2 = result;
			var date_1 = parseInt(Date.parse(aDataList_2[0]['date'].replace(/-/g,'/'))/1000);
			var now_date_1 = parseInt(new Date().getTime()/1000);
			if(aDataList_2[0].title){
				if(now_date_1 - date_1 > 0 && now_date_1 - date_1 < 3600){
					var pBox ='<div class="kuaiXun" id="kuaiXun">'+
								'<font>快讯</font>'+
								'<p><a href='+ aDataList_2[0].link +'>'+ aDataList_2[0].title +'</a></p>'+
								'<span class="kxClose"></span>'+
							 '</div>';
					$("body").append(pBox);
				}
			}
			$("#kuaiXun span").click(function(){
				$("#kuaiXun").hide();		
			});
		},
		error : function(){
		}
	});
});*/
// $(window).scroll(function(){
// 	var ywphHeight =$("#ywphBox").height();
// 	var ynetGp6 = $("#ynetG_P6");
// 	var ynetIns = ynetGp6.find("ins");
// 	var adOffSetTop = ynetGp6.offset().top;
// 	var scrollTop = $(window).scrollTop();
// 	if( ynetGp6 && scrollTop + ywphHeight >= adOffSetTop ){	

// 			ynetIns.css({"position": "static", "top": ywphHeight});
// 			ynetIns.next("a").css({"display":"block", "height":ynetIns.css("height"), "width":ynetIns.css("width")});
			
// 		}
// });

$(window).load(function(){
		var winHeight = $(window).height();
		var ywphBox = $("#ywphBox");
		var ynetGp6 = $("#ynetG_P6");
		var ywphHeight =$("#ywphBox").height();
		var ywphOffSetTop = ywphBox.offset().top;
		$(window).scroll(function(){
			var scrollTop = $(window).scrollTop();
			if( scrollTop >= ywphOffSetTop + 220 ){
				
				$(ywphBox).addClass("fixed");
				$(ynetGp6).addClass("fixed");		

			}else{
				$(ywphBox).removeClass("fixed");
				$(ynetGp6).removeClass("fixed");	
			}
		});

	});

$(function(){
	var winHeight = $(window).height();
	var gotoTophtml = '<a id="gotoTop"></a>';
	$("body").append(gotoTophtml);
	$("#gotoTop").click(function(){
		$('html,body').animate({scrollTop:0},700);
	});
	$(window).scroll(function(){
		var _scrollTop = $(window).scrollTop();
		if( _scrollTop > 600){
			$("#gotoTop").fadeIn(100);
			if(_scrollTop + winHeight >= $(".newHeader").height() + $("#ynetG_B1").height() + $(".detailMain").height()){
				$("#gotoTop").css("bottom","230px");
			}else{
				$("#gotoTop").css("bottom","0");
			}
		}else{
			$("#gotoTop").fadeOut(200);
		};
	});
});
//内容自动推荐到百度
(function(){
 var bp = document.createElement('script');
 var curProtocol = window.location.protocol.split(':')[0];
 if (curProtocol === 'https'){
 bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
 }
 else{
 bp.src = 'http://push.zhanzhang.baidu.com/push.js';
 }
 var s = document.getElementsByTagName("script")[0];
 s.parentNode.insertBefore(bp, s);
})();

/*
	function data_api(position,data){
		if(!position || !data){
			return ;
		}
		var html_left = '',html_right = '',no = 0,valid_data = [];
		for(var i = 0;i < data.length;i++){
			var item = data[i];
			if (item.title.length < 20 ) {
				valid_data.push(item);
			}
		}
		for(var i in valid_data){
			var item = valid_data[i];
			if (no % 2 == 0) {
				html_left += '<a href="'+item.url+'">'+item.title+'</a>';	
			}else{
				html_right += '<a href="'+item.url+'">'+item.title+'</a>';
			}
			no += 1;
			if (no == 8) {
				break;
			}
		}
		$('.juJiao .fLeft').html(html_left);
		$('.juJiao .fRight').html(html_right);	
	}
	document.write('<div id="hm_t_117613"><script type="text/template">data_api(\'pcjujiao\',txtResult);<\/script><\/div>');
	document.write('<script type="text/javascript" src="http://crs.baidu.com/tapi.js?planId=117613&siteId=0fbac86540d9e7c16f26d0ded9e2c813"><\/script>');
	*/
//精彩推荐广告回填
function createEle(id){
 var newLi=document.createElement("div");
 newLi.id=id;
 newLi.style.marginTop = '-12px';
 newLi.style.marginRight = '0px';
 newLi.style.marginBottom = '16px';
 newLi.style.marginLeft = '0px';
 var newScript = document.createElement('script');
 newScript.type = 'text/javascript';
 newScript.innerHTML = "loadYm('"+id+"');";
 newLi.appendChild(newScript);
 return newLi;
}
var ynetLis=$("#jingcai_ynet li");
var baiduLis=$("#hm_t_117902 li");

 if(ynetLis.length>=4){
 for(var i=0;i<ynetLis.length;i++){
 if(i<3){
 var ynetEle=createEle("JHTJ"+(i+1));
 $(ynetLis[i]).after(ynetEle);
 }

 }
 }
 if(baiduLis.length>=4){
 for(var i=0;i<baiduLis.length;i++){
 if(i<3){
 var baiduEle=createEle("JHTJ"+(i+1));
 $(baiduLis[i]).after(baiduEle);
 }

 }
 }

(function(){
var url_param = location.href.split('?')[1];
 if (!!url_param) {
 $('#hm_t_117613 a').each(function(){
 $(this).attr('href',$(this).attr('href').split('?')[0]?$(this).attr('href').split('?')[0]+'?'+url_param:$(this).attr('href')+'?'+url_param);
 });
$('.jingHuaTuiJian a').each(function(){
$(this).attr('href',$(this).attr('href').split('?')[0]?$(this).attr('href').split('?')[0]+'?'+url_param:$(this).attr('href')+'?'+url_param);
});
 }

})()