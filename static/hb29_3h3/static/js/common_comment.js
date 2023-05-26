if(location.href.indexOf("m.")>-1){
	var sb="<scr"+"ipt>";
	 sb=sb+"(function(){";
	 sb=sb+"    $('#SOHUCS').attr('sid','"+commentid+"');var expire_time = parseInt((new Date()).getTime()/(5*60*1000));";
	 sb=sb+"    var head = document.head || document.getElementsByTagName(\"head\")[0] || document.documentElement;";
	 sb=sb+"    var scr"+"ipt_version = document.createElement(\"scr"+"ipt\"),scr"+"ipt_cyan = document.createElement(\"scr"+"ipt\");";
	 sb=sb+"    scr"+"ipt_version.type = scr"+"ipt_cyan.type = \"text/javascr"+"ipt\";";
	 sb=sb+"    scr"+"ipt_version.charset = scr"+"ipt_cyan.charset = \"utf-8\";";
	 sb=sb+"    scr"+"ipt_version.onload = function(){";
	 sb=sb+"        scr"+"ipt_cyan.id = 'changyan_mobile_js';";
	 sb=sb+"        scr"+"ipt_cyan.src = 'http://changyan.itc.cn/upload/mobile/wap-js/changyan_mobile.js?client_id=cysSdaUHq&'";
	 sb=sb+"                        + 'conf=9e0e8d7746030c0cb41209e960ae3f29&version=' + cyan_resource_version;";
	 sb=sb+"        head.insertBefore(scr"+"ipt_cyan, head.firstChild);";
	 sb=sb+"    };";
	 sb=sb+"    scr"+"ipt_version.src = 'http://changyan.sohu.com/upload/mobile/wap-js/version.js';";
	 sb=sb+"    head.insertBefore(scr"+"ipt_version, head.firstChild);";
	 sb=sb+"})();";
	 sb=sb+"</scr"+"ipt>"; 
     $('.m-comment').hide();
	//document.write(sb);
}else{
var sb="</div>";
 sb=sb+"    <scr"+"ipt>";
 sb=sb+"      (function(){";
 sb=sb+"        $('#SOHUCS').attr('sid','"+commentid+"');$('#SOHUCS').css('height','auto');var appid = 'cysSdaUHq',";
 sb=sb+"        conf = '9e0e8d7746030c0cb41209e960ae3f29';";
 sb=sb+"        var doc = document,";
 sb=sb+"        s = doc.createElement('scr"+"ipt'),";
 sb=sb+"        h = doc.getElementsByTagName('head')[0] || doc.head || doc.documentElement;";
 sb=sb+"        s.type = 'text/javascr"+"ipt';";
 sb=sb+"        s.charset = 'utf-8';";
 sb=sb+"        s.src =  'http://assets.changyan.sohu.com/upload/changyan.js?conf='+ conf +'&appid=' + appid;";
 sb=sb+"        h.insertBefore(s,h.firstChild);";
 sb=sb+"        window.SCS_NO_IFRAME = true;";
 sb=sb+"      })()";
 sb=sb+"    </scr"+"ipt>";     
$('#q7').hide();$('#ping').hide();$('.m-hottag').next().hide(); 
//document.write(sb);
if(location.href.indexOf("news/")>-1){//文章的时候放入百度分享
//var bdfx="<scr"+"ipt>window._bd_share_config={\"common\":{\"bdSnsKey\":{},\"bdText\":\"\",\"bdMini\":\"2\",\"bdMiniList\":false,\"bdPic\":\"\",\"bdStyle\":\"1\",\"bdSize\":\"32\"},\"share\":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</scr"+"ipt>";
//document.write(bdfx);
}

}