//分享
//shareBox.init(btnClass,conClass),分享图标外层的class，最外层的con
window.shareBox = function() {
	function _init(btnClass, conClass, pos){
		bindShare(btnClass, conClass, pos);
	}
	
	function bindShare(btnClass, conClass, pos) {
		pos = pos || 'right';
		$('body').on('click', btnClass, function(e){
			e.stopPropagation();
			var _this = this,
				_div = $(_this).closest(conClass);
			var _top = _getOffsetTop(_this),
				_left = _getOffsetLeft(_this);
			var _text = $(_div).find('p').text().substring(0,20)+'...',
				_url = $(_div).find('h3 a').attr('href');
				_pic = $(_div).find('img') ? $(_div).find('img').attr('src') : '';

			if(_url.indexOf('http') >= 0){
				window._bd_share_config.share.bdUrl = _url;
			}else{
				window._bd_share_config.share.bdUrl = window.location.protocol + '//' + window.location.host + _url;
			}
			window._bd_share_config.share.bdText = "【当代先锋网】"+ _text;
			window._bd_share_config.share.bdPic = _pic;

			var posLeft = pos === 'left' ? _left - 240 + 'px' : _left + 'px';
			$('.share-box').css({
				left : posLeft,
				top : _top + 25 + 'px'
			}).show();
		});
	}
	
	function  _getOffsetTop(el){
		return offsetTop = $(el).offset().top;
	}
	function _getOffsetLeft(el){
		return offsetTop = $(el).offset().left;
	}
	
	return {
		init: _init
	}	
}();

with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
window._bd_share_config={"common":{"bdUrl":"", "bdText":"","bdPic":"","bdSnsKey":{},"bdMini":"2","bdMiniList":false,"bdStyle":"0","bdSize":"24"},"share":{}};

var shareDiv = $('<div class="share-box" style="display:none;">' +
      '<i></i>' +
      '<div class="bdsharebuttonbox">'+
      '<span class="fl">分享到：</span>'+
      '<a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>'+
      '<a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>'+
      '<a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>'+
      '<a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>'+
  '</div>');
$('body').append(shareDiv);

$(".share-box").on('mouseleave', function(){
    $('.share-box').hide();
});

document.body.onclick = function (){
    $('.share-box').hide();
};
