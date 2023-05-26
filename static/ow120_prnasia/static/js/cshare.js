var csharepagehead = document.getElementsByTagName('head')[0],
cssURL = "https://static.prnasia.com/pro/pcom/newsite/css/cshare.css",
linkTag = document.createElement('link');

linkTag.id = 'dynamic-style';
linkTag.href = cssURL;
linkTag.setAttribute('rel','stylesheet');
linkTag.setAttribute('media','all');
linkTag.setAttribute('type','text/css');
 
csharepagehead.appendChild(linkTag);


function Cshare() {
	this.title = '';
	this.url = '';
	this.summary = '';
	this.pic = '';
	this.picMore1 = '';
	this.lang = 0;
}
 
Cshare.prototype.addDefine = function(obj) {
	this.title = obj.title;
	this.url = obj.url;
	this.summary = obj.summary;
	this.pic = obj.pic;
	this.picMore1 = obj.picMore1;
	this.lang = obj.lang;
	this.useDefine();
}

Cshare.prototype.useDefine = function() {
	var shareTitle = ( isSet(this.title) && this.title != '' ) ? this.title: document.title;
	var shareUrl = ( isSet(this.url) && this.url != '' ) ? this.url: window.location.href;
	var shareSummary = ( isSet(this.summary) && this.summary != '' ) ? this.summary: '';
	var sharePic = ( isSet(this.pic) && this.pic != '' ) ? this.pic: '';
	var sharePicMore1 = ( isSet(this.picMore1) && this.picMore1 != '' ) ? this.picMore1: '';
	var shareLang = ( isSet(this.lang) && !isNaN(this.lang) && this.lang >= 0 ) ? this.lang: 0;

	var sT = 0;
	var wxtcW;
	var wxtcH;
	var winW;
	var winH;

	var wxtcLeft;
	var wxtcTop;

	if(sharePicMore1 == '' && sharePic != '') sharePicMore1 = sharePic;

	var _this = this;

	$(document).ready(function(){

		let shareStr = '';
		if(shareLang == 1) shareStr = '分享至';
		else shareStr = "Share to";
		if($('div.shareicon a').hasClass('share-weixin') || $('div.shareicon i').hasClass('icon-wechat'))
		{

			$('body').append('<div class="weixinTC" style="width:120px;height:140px;"><div class="TCtop"><span class="TCtopLeft">'+shareStr+'</span><span class="TCtopRight"><span class="TCtopClose">X</span></span></div><div class="TCimg"><img style="width:100px;height:100px;" src="" class="qrcodeTC"></div></div>');
			

			$('.qrcodeTC').attr('src','https://www.prnasia.com/p/qrcode.php?data='+encodeURIComponent(shareUrl)+'&size=6');
		}
		$('.wxewm img').attr('src','https://www.prnasia.com/p/qrcode.php?data='+encodeURIComponent(shareUrl)+'&size=6');

		// $(window).resize(function() {

		// 	winW = window.innerWidth;
		// 	winH = window.innerHeight;

		// 	wxtcW = Math.ceil($('.weixinTC').width());
		// 	wxtcH = Math.ceil($('.weixinTC').height());

		// 	sT = Math.ceil($(window).scrollTop());
		// 	wxtcLeft = Math.ceil(winW/2) - Math.ceil(wxtcW/2);
		// 	wxtcTop = Math.ceil(winH/2) - Math.ceil(wxtcH/2) + sT;
		// 	$('.weixinTC').css('top',wxtcTop+'px');
		// 	$('.weixinTC').css('left',wxtcLeft+'px');
		// });

		$('.share-weixin, .icon-wechat').click(function(){
			var cs = $(this).closest('.cshare').css({'position':'relative'})
			var cdom = $(this).closest('.cshare').find('.weixinTC');
			if(cdom.length == 0){
				cs.append($('.weixinTC'));
			}
			$('.cshare .weixinTC').show();
			
			// winW = window.innerWidth;
			// winH = window.innerHeight;

			// wxtcW = Math.ceil($('.weixinTC').width());
			// wxtcH = Math.ceil($('.weixinTC').height());

			// $('.weixinTC').show();
			// sT = Math.ceil($(window).scrollTop());
			// wxtcLeft = Math.ceil(winW/2) - Math.ceil(wxtcW/2);
			// wxtcTop = Math.ceil(winH/2) - Math.ceil(wxtcH/2) + sT;
			$('.weixinTC').css('top',40);
			$('.weixinTC').css('left',0);
			
		});

		$('.weixinTC .TCtopClose').click(function(){
			$('.weixinTC').hide();		
		});

		$('.share-more').click(function(ev){
			$(this).next('.shareMoreTC').show();	
			ev.stopPropagation();	
		});

		$('.shareMoreTC .TCtopClose').click(function(ev){
			$('.shareMoreTC').hide();
			ev.stopPropagation();		
		});

		openWinWidth = 650;
		openWinHeight = 450;

		$('.share-weibo, .icon-sina, .icon-sina1').click(function(){
			console.log(88);
			window.open('http://service.weibo.com/share/share.php?url='+encodeURIComponent(shareUrl)+'&type=button&ralateUid=1649036617&language=zh_cn&appkey=1943563082&title='+encodeURIComponent(shareTitle)+'&pic='+sharePicMore1+'&searchPic=true&style=simple','_blank','width='+openWinWidth+',height='+openWinHeight+'');
		});


		$('.share-linkedin, .icon-linkedin').click(function(){
			window.open('http://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(shareUrl)+'&title='+encodeURIComponent(shareTitle)+'&source=bookmark','_blank','width='+openWinWidth+',height='+openWinHeight+'');
		});


		$('.share-qzone, .icon-qzone').click(function(){
			window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(shareUrl)+'&title='+encodeURIComponent(shareTitle)+'&summary=&desc=&pic=','_blank','width='+openWinWidth+',height='+openWinHeight+'');
		});

		$('.share-facebook, .icon-facebook').click(function(){
			window.open('https://www.facebook.com/share.php?src=bm&u='+encodeURIComponent(shareUrl),'_blank','width='+openWinWidth+',height='+openWinHeight+'');
		});

		$('.share-whatsapp, .icon-whatsapp').click(function(){
			window.open('whatsapp://send?text='+encodeURIComponent(shareTitle)+'  '+encodeURIComponent(shareUrl),'_blank','width='+openWinWidth+',height='+openWinHeight+'');
		});


		// $('.share-twitter').click(function(){
		// 	_this.shareItwithBitly();
		// });

		$('.share-twitter, .icon-twitter-t').click(function(){
			window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(shareTitle)+'&url='+encodeURIComponent(shareUrl)+'&related=','_blank','width=650,height=450');
			// _this.shareItwithBitly();
		});

		$('.share-lineline, .icon-line').click(function(){
			window.open('https://lineit.line.me/share/ui?url='+encodeURIComponent(shareUrl)+'&text='+encodeURIComponent(shareTitle),'_blank','width=650,height=450');
			// _this.shareItwithBitly();
		});

		$('.share-email').attr("href", "mailto:?subject=" + encodeURIComponent(shareTitle) + "&body="+encodeURIComponent(shareUrl))
		




	});
	
}

Cshare.prototype.shareItwithBitly = function() {

			var shareTitle = ( isSet(this.title) && this.title != '' ) ? this.title: document.title;
			var shareUrl = ( isSet(this.url) && this.url != '' ) ? this.url: window.location.href;
			var shareSummary = ( isSet(this.summary) && this.summary != '' ) ? this.summary: '';
			var sharePic = ( isSet(this.pic) && this.pic != '' ) ? this.pic: '';
			var sharePicMore1 = ( isSet(this.picMore1) && this.picMore1 != '' ) ? this.picMore1: '';

			var shortURL = "";
			var longURL  = encodeURI(shareUrl);
			var data={
				longURL: longURL,
				login:        "prnasia",
				apiKey:     "R_e8cf63d92244f631950d07a33334cbe3",
				client:       "bitly-javascript-api"
			}

			$.ajax({
				type:"POST",
				async: false,
				dataType:"jsonp",
				data:data,
				url:"http://api.bit.ly/v3/shorten",
				success:function(rv){
				        if(rv.data){
				                 shortURL = rv.data.url
				        }else{
				                 shortURL = longURL;
				        }
				        window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(shareTitle)+'&url='+encodeURIComponent(shortURL)+'&related=','_blank','width=650,height=450');
				},
				error:function(){
				        window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(shareTitle)+'&url='+encodeURIComponent(longURL)+'&related=','_blank','width=650,height=450');
				        console.log("couldn't get the short URL...");
				}
			})
		}
 
var cShare = new Cshare();

function isSet(a)
{
	if(a == undefined || a == null)
	{
		return false;
	}
	else
	{
		return true;
	}
}
 




