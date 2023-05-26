function copyToClipboard(txt)
{
	//复制网址
	if(window.clipboardData) {
		window.clipboardData.clearData();
		window.clipboardData.setData("Text", txt);
		alert("复制链接成功！");
	} else if(navigator.userAgent.indexOf("Opera") != -1) {
		window.location = txt;
	} else if (window.netscape) {
		try {
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		} catch (e) {
			alert(" 被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将 'signed.applets.codebase_principal_support'设置为'true'");
		}
		var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
		if (!clip)
		return;
		var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
		if (!trans)
		return;
		trans.addDataFlavor('text/unicode');
		var str = new Object();
		var len = new Object();
		var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
		var copytext = txt;
		str.data = copytext;
		trans.setTransferData("text/unicode",str,copytext.length*2);
		var clipid = Components.interfaces.nsIClipboard;
		if (!clip)
		return false;
		clip.setData(trans,null,clipid.kGlobalClipboard);
		alert("复制链接成功！");
	}
}

function changeFont(t){ 
	//改变字号
	var tosmall = $(t).hasClass('decrease')?true:false;
	//if(tosmall && !$(t).hasClass('sactive')) return;
	//if(!tosmall && !$(t).hasClass('bactive')) return;
	if(tosmall){
		$(t).removeClass('sactive');
		$('.big').addClass('bactive');
		$(t).addClass('decurrent').prev().removeClass('incurrent');
	}else{
		$(t).removeClass('bactive');
		$('.small').addClass('sactive');
		$(t).addClass('incurrent').next().removeClass('decurrent');
	}
	$('.article-detail-inner').removeClass(tosmall?'fontSizeBig':'fontSizeSmall').addClass(tosmall?'fontSizeSmall':'fontSizeBig');
}


$(function(){
	if ($('.article-aside').length >0 && $('.article-aside').height()) {
		var contentheight = $('.article-aside').height();
		if (navigator.userAgent.indexOf("MSIE")>0 && navigator.userAgent.indexOf("MSIE 6.0")>0) {
			$('.article-content').css('height', contentheight+'px');
			$('.article-detail').css('height', contentheight+'px');
		} else {
			$('.article-content').css('min-height', contentheight+'px');
			$('.article-detail').css('min-height', contentheight+'px');
		}
	}
	var cyinterval = setInterval(function(){
		if ($('#bottombar-wrap-w').length > 0){
			$('#bottombar-wrap-w').css('display', 'none');
			clearInterval(cyinterval);
		}
	}, 10);
});

