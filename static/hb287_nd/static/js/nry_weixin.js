

function aqUriCom(str){
	str = (''+str).replace(/expression\(/ig, '').replace(/<.*?>/ig, '');
	return encodeURIComponent(str);
}

var wxAcEm = typeof(wxAcEm) == 'string' ? wxAcEm : '//www.fjsen.com/js/images/fjsenbbweixin.jpg';
var wxSmTxt = typeof(wxSmTxt) == 'string' ? wxSmTxt : '扫描关注官方微信';
var wxErLogo = typeof(wxErLogo) == 'string' ? wxErLogo : 'fjsen';
var notToH5 = typeof(notToH5) != 'undefined' ? true : false;

if(typeof pcURL == 'string'){
	var to_url = pcURL;
	if(padURL != ''){
		to_url = padURL
	}
	var to_href = to_url;
}else{
	var to_href = location.href;
	var to_url = to_href;
	if(!notToH5){
		to_url = '//h5.fjsen.com/api.php?m=PCtoWAP&url='+aqUriCom(to_href);
		to_href = to_url + '&reset=1'
	}
}
to_url = to_url.replace(/^\/\//, location.protocol + '//');
//.replace(/(\#|\?)[\S\s]*?$/, '');
document.write('<div style="border:#EAEAEA solid 1px; background:#EFFEFD; margin:10px auto;">' + 
'<div style="padding:5px; height:125px; font-size:12px; line-height:25px;">' + 
'<div style="width:100px; height:125px; float:right; text-align:center;">' + 
'<img src="' + wxAcEm + '" style="width:100px; height:100px;" /><br />' + 
wxSmTxt + 
'</div>' + 
'<div style="width:100px; height:125px; float:left; text-align:center;">' + 
'<a href="' + to_href + '" target="_blank">' + 
'<img src="//api.fjsen.com/erFApi.php?chs=100&chld=M|0&logo=' + wxErLogo + '&chl=' + 
aqUriCom(to_url) + 
'&choe=UTF-8" style="width:100px; height:100px; border:none;" ' + 
'onerror="this.src=\'' + wxAcEm + '\'" /></a><br />' + 
'分享该新闻到微信' + 
'</div>' + 
'<div style="width:300px; height:125px; float:left; padding-left:10px; text-align:left;">分享该新闻到微信朋友圈：<br />' + 
'1、打开手机软件“<span style="color:red;">微信</span>”--“<span style="color:red;">发现</span>”--“<span style="color:red;">扫一扫</span>”。<br />' + 
'2、对准左边二维码进行扫描<br />' + 
'3、识别成功后，弹出是否浏览该页面，点击确定。<br />' + 
'4、点击手机右上角分享按钮，分享到朋友圈。</div>' + 
'</div>' + 
'</div>');
