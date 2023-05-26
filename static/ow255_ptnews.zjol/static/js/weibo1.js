function formatHtmlTag(txt) {
	return txt.replace(/<[^>] + >/g,"");
}

function SendToMicroBlog(icontitle) {
	var Murl = "";
	var Mtitle = $(".list .title").text();
	var Mlink = location.href;
	var Mb = "";
	
	switch(icontitle) {
		case "btn_sf" : Murl = 'http://t.sohu.com/third/post.jsp?&url=' + encodeURIComponent(Mlink) + '&title=' + encodeURIComponent(Mtitle) + '&c=' + encodeURIComponent(Mb) + '&content=gb2312'; break;
		case "btn_kx" : Murl = 'http://www.kaixin001.com/repaste/share.php?rtitle=' + encodeURIComponent(Mtitle) + '&rurl=' + encodeURIComponent(Mlink) + '&rcontent=' + encodeURIComponent(Mb); break;
		case "btn_xn" : Murl = 'http://share.renren.com/share/buttonshare.do?link=' + encodeURIComponent(Mlink) + '&title=' + encodeURIComponent(Mtitle); break;
		case "btn_db" : Murl = 'http://www.douban.com/recommend/?url=' + encodeURIComponent(Mlink) + '&title=' + encodeURIComponent(Mtitle); break;
		case "btn_fb" : Murl = 'http://www.facebook.com/share.php?u=' + encodeURIComponent(Mlink) + '&t=' + encodeURIComponent(Mtitle) + '&rurl=' + encodeURIComponent(Mlink) + '&rcontent=' + encodeURIComponent(Mb); break;
		case "btn_tt" : Murl = 'http://twitter.com/home?status=' + encodeURIComponent(Mtitle) + encodeURIComponent(Mlink)  + '&content' +  encodeURIComponent(Mlink); break;
		case "btn_ff" : Murl = 'http://fanfou.com/share.new?u=' + encodeURIComponent(Mlink) + '&t=' + encodeURIComponent(Mtitle) + '&d=' +  encodeURIComponent(Mb); break;
		case "btn_sina" : Murl = 'http://v.t.sina.com.cn/share/share.php?url=' + encodeURIComponent(Mb) + encodeURIComponent(Mlink) + '&title=' +  encodeURIComponent(Mtitle)  + '&source=浙江在线网&sourceUrl=http://www.zjol.com.cn/&content=gb2312&pic='; break;
		case "btn_t6" : Murl = 'http://t.zjol.com.cn/api/share.php?url=' + encodeURIComponent(Mlink) + '&title=' + escape(a); break;
	}
	
	window.open(Murl, icontitle);
}


function postToWb(){
		var Mtitle = $(".list .title").text();
		var _t = encodeURI(Mtitle);
		var _url = encodeURIComponent(document.location);
		var _appkey = encodeURI("appkey");//你从腾讯获得的appkey
		var _pic = encodeURI('');//（例如：var _pic='图片url1|图片url2|图片url3....）
		var _site = '';//你的网站地址
		var _u = 'http://v.t.qq.com/share/share.php?url='+_url+'&appkey='+_appkey+'&site='+_site+'&pic='+_pic+'&title='+_t;
		window.open( _u,'', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );
	}

 
 