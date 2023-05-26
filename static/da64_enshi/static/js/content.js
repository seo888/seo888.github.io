/*************
**恩施新闻网**
*************/

function contentInfos() {
	var btnFont = $('.btn-font');
	if(!btnFont.length) return;
	var myContent = $('#intro, .article-content, .article-content p');
	var fSize = parseInt($.cookie("fontSize") ? $.cookie("fontSize") : parseFloat(myContent.css('fontSize'), 10));
	var cDomain = document.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i);
	var options = {
			path: '/',
			domain: cDomain,
			expires: 30
		};
	if(fSize){
		myContent.css({'font-size': fSize + 'px'});
		$.cookie("fontSize", fSize, options);
	}
	btnFont.click(function(){
		$(this).addClass('on').siblings().removeClass('on');
		var cID = $(this).attr("id");
		if(cID=="btn-font-plus"){
			if(fSize>=20) return;
			fSize += 2;
		}else if(cID=="btn-font-reduce"){
			if(fSize<=12) return;
			fSize -= 2;
		};
		myContent.css({fontSize: fSize});
		$.cookie("fontSize", fSize, options);
	});
};

function contentTool() {
	//addfavorite
	$('<a href="javascript:;" class="png tool-btn tool-addfavorite" title="收藏"></a>').appendTo('.content-tool .fl').click(function(){
		AddFavorite(title, document.location.href);
	});
	//print
	if(modelid==1){
		$('<a href="javascript:;" class="png tool-btn tool-print" title="打印"></a>').appendTo('.content-tool .fl').click(function(){
			window.open(APP_URL+'print.php?contentid='+contentid)
		});
	};
	//comment
	if(comment){
		$('<a href="javascript:;" class="png tool-btn tool-comment" title="评论"></a>').appendTo('.content-tool .fl').click(function(){
			if($('.content-comment').length) $('html,body').animate({scrollTop: $('.content-comment')[0].offsetTop}, 300);
		});
	};
	//digg
	var digg = false;
	$('<a href="javascript:;" class="png tool-btn tool-digg" title="点赞"><div><span class="hidden">1</span></div></a>').appendTo('.content-tool .fl').click(function(){
		if(digg) {
			alert('您已经顶过了！');
			return;
		};
		$.getJSON(APP_URL+'?app=digg&controller=digg&action=digg&contentid='+contentid+'&jsoncallback=?&flag=1', function(data){
			if(data==0){
				alert('您已经顶过了！');
			}else{
				$('.tool-digg span').html(data).removeClass('hidden').show();
			};
			digg = true;
		});
	});
	//digg-getData
	$.getJSON(APP_URL+'?app=digg&controller=digg&action=digg&contentid='+contentid+'&jsoncallback=?', function(data){
		if(data.supports) $('.tool-digg span').html(data.supports).removeClass('hidden').show();
		if(data.done) digg = true;
	});
	//bdshare
	var shareDiv = $('.content-tool .fr');
	if(!shareDiv || !shareDiv.length) return;
	$('<div class="bdsharebuttonbox" data-tag="share_1">'+
	'<a class="png bds_tsina" data-cmd="tsina"></a>'+
	'<a class="png bds_weixin" data-cmd="weixin"></a>'+
	'<a class="png bds_qzone" data-cmd="qzone"></a>'+
	'<a class="png bds_sqq" data-cmd="sqq"></a>'+
	'<a class="png bds_more" data-cmd="more"></a>'+
	'</div>').appendTo(shareDiv);
	window._bd_share_config = {
		common : {
			bdText : document.title,
			bdDesc : $('#intro').html(),
			bdMini: 0,
			bdPopupOffsetLeft: '-9999',
			bdPopupOffsetTop: '-9999',
			onAfterClick: function() {
				if(typeof('articleSpmForward')=='undefined') return false;
				articleSpmForward();
			}
		},
		share : [{
			"bdSize" : 32,
			"bdCustomStyle": IMG_URL+"statics/css/bdshare.css"
		}]
	}
	with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
	$('.bdshare_popup_box').remove();
};

function contentComment() {
	var commentDiv = $('.content-comment');
	if(!comment || !commentDiv.length) return;
};


$(function(){
	contentInfos();
	contentTool();
	contentComment();
});