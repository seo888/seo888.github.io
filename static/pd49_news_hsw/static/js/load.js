;(function(){var ref=window.parent.document.referrer;ref=lz_encode(String(ref));var url=document.URL;url=lz_encode(String(url));var agent=lz_get_agent();agent=lz_encode(String(agent));var userId=getUserId();var geturl="?ref="+ref+"&url="+url+"&userId="+userId+"&agent="+agent+"&t="+String(Math.random());function getUserId(){var arrCookie=document.cookie.split(";");var userId;for(var i=0;i<arrCookie.length;i++){var arr=arrCookie[i].split("=");if("hsw_uid"==arr[0].trim()){userId=arr[1];return userId}}}function lz_encode(str){var e="",i=0;for(i=0;i<str.length;i++){if(str.charCodeAt(i)>=0&&str.charCodeAt(i)<=255){e=e+escape(str.charAt(i))}else{e=e+str.charAt(i)}}return e}function lz_get_agent(){var a="";var n=navigator;if(n.userAgent){a=n.userAgent}return a}function load(to_url){var new_script=document.createElement("script");new_script.src=to_url;document.getElementsByTagName("head")[0].appendChild(new_script)}if(url.indexOf("hot")<0&&url.indexOf("http%3A//fun.hsw.cn/s/2014/0722/2.shtml")<0&&url.indexOf("http%3A//www.hsw.cn/error.htm")<0&&url.indexOf("http%3A//news.hsw.cn/s2007/08index/2010index.htm")<0){var _div=document.createElement('div');_div.style.visibility='hidden';var _img=document.createElement('img');_img.src="//json.myhsw.cn/sstj/a.gif"+geturl;_div.appendChild(_img);document.getElementsByTagName('body')[0].appendChild(_div)}})();;