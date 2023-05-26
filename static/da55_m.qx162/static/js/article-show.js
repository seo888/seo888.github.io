$(function(){
	TAB({
		menu: 'tabmenu',
		content: 'tabcontent',
		active_tab: 0,
		active_css: 'tabactive'
	});
	digg.get(contentid,'supports');
	content = $('.article-content').html();
	$.getJSON(APP_URL+'?app=system&controller=content&action=stat&jsoncallback=?&contentid='+contentid, function(data){
$('.comments').html(data.comments);
console.log(data);
});
    imageZoom();

	var clip = new ZeroClipboard(document.getElementById('zeroclipboard'), {
		moviePath: IMG_URL + 'js/zeroclipboard/ZeroClipboard.swf',
		trustedDomains: ['*'],
		allowScriptAccess: "alway"
	});
});
function imageZoom() {
    grab_img_zoom($('.article-content img'),550);
}
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

function addfavorite()
{
	// 添加收藏
   if (document.all)
   {
	  window.external.addFavorite(document.URL, title);
   }
   else if (window.sidebar)
   {
	  window.sidebar.addPanel(title, document.URL, '');
   }
} 
function changeFont(t){ 
	//改变字号
	var tosmall = $(t).hasClass('small')?true:false;
	if(tosmall && !$(t).hasClass('sactive')) return;
	if(!tosmall && !$(t).hasClass('bactive')) return;
	if(tosmall){
		$(t).removeClass('sactive');
		$('.big').addClass('bactive');
	}else{
		$(t).removeClass('bactive');
		$('.small').addClass('sactive');
	}
	$('.article-content').removeClass(tosmall?'fontSizeBig':'fontSizeSmall').addClass(tosmall?'fontSizeSmall':'fontSizeBig');
}

function fulltext(){  
	//阅读全文
	if(context ==''){
		$.getJSON(APP_URL+'?app=article&controller=article&action=fulltext&jsoncallback=?&contentid='+contentid,function(data){
			context = data.content;
			$('.article-content').html(data.content);
			$('#show-all-cont').html('分页阅读').parent().parent().parent().siblings().hide();
			$('.article-menu').hide();
            imageZoom();
		});	
	}else{
		if($('#show-all-cont').html() == '分页阅读'){
			$('#show-all-cont').html('阅读全文');
			$('.article-content').html(content);
			$('#show-all-cont').parent().parent().parent().siblings().show();
			$('.article-menu').show();
            imageZoom();
		}else{
			$('#show-all-cont').html('分页阅读');
			$('.article-content').html(context);
			$('#show-all-cont').parent().parent().parent().siblings().hide();
			$('.article-menu').hide();
            imageZoom();
		}
	}
}
