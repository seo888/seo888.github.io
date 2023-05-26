//Cookie
function Set(minutes, c) {
    var Limittimes = new Date();
    Limittimes.setTime(Limittimes.getTime() + 60 * 1000 * minutes);
    document.cookie = c + ";expires=" + Limittimes.toGMTString();
}
//Cookie
function Get(cookieHeader) {
    var cookieString = new String(document.cookie);
    var beginPosition = cookieString.indexOf(cookieHeader);
    if (beginPosition != -1) {
        return true;
    } else {
        return false;
    }
}

if (window.top!=self){
}else{
	var a_loca = window.top.location.toString();
	a_loca = a_loca.replace(/\s|http|voc|com|cn|html|article|\.|\W/ig,""); //+"_"+_NewsID;

	if (!Get("=hnolall")){
		document.write(" <SCRIPT language=javascript src='https://clickip.hnol.net/c.php?id=4'></script>");
	}
	if (!Get(a_loca+"=")){
		Set(15,a_loca+"=hnolall");

		var _aurl;
		_aurl = "https://click.hnol.net/c.php?";
		_aurl+= "nodeid="+_ClassID+"&articleid="+_NewsID+"&subscriber="+_EditID;
		_aurl+= "&rr="+escape(document.referrer);
		document.write(" <SCRIPT language=javascript src='"+_aurl+"'></script>");
	}
}
if(_ClassID != 405){
	document.write('<scr' + 'ipt src="https://bbs.voc.com.cn/js/gg/click_hnol.js" charset="gbk"></scr' + 'ipt>');
}
document.write('<div style="display:none;"><script language="javascript" type="text/javascript" src="https://hunan.voc.com.cn/Script/hnolcnzz.js"></script></div>');
