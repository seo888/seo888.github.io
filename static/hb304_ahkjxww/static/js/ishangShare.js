/**
 * @description: share
 * @author: ishang
 * @update: ishang_pan (2020-06-16 09:25)
 */
 
$(function(){
	var _webUrl = window.location.href;
	
	if($('#j-wxqrcode').length > 0){
		var wxqrcode = new QRCode(document.getElementById("j-wxqrcode"), {
			width : 80,
			height : 80
		});
		wxqrcode.makeCode(_webUrl);
	}

	$('.j-share a').click(function(){
		var _type = $(this).attr('data-type');
		var _title = $(this).attr("title");
		var _pic = $('#art_box').find('img:first').attr('src') || '';
		var newsObj = {
			url: _webUrl,
			title: _title,
			pic: _pic
		}
		if(_type == 'tsina'){
			window.open("https://service.weibo.com/share/share.php?url=" + newsObj.url + "&title=" + newsObj.title + "&pic=" + newsObj.pic);
		}else if(_type == 'qzone'){
			window.open("https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(newsObj.url) + "&title=" + encodeURIComponent(newsObj.title) + "&pics=" + encodeURIComponent(newsObj.pic));
		}else{
			$('.weixin-share-open').show();
		}
	});
	
	$('.weixin-close').click(function(){
		$('.weixin-share-open').hide();
	})
})