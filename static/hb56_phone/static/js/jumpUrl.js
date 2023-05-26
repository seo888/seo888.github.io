// ��cookie����
function readCookie(name){	
	var cookieValue = "";
	var s_search = name + "=";
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(s_search);
		if (offset != -1) {
			offset += s_search.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1) end = document.cookie.length;
			cookieValue = unescape(document.cookie.substring(offset, end))
		}
	}
	return cookieValue;
}

// дcookie����
function writeCookie(name, value, hours){
    var expire = "";
    if (hours != null) {
        expire = new Date((new Date()).getTime() + hours * 3600000);
        expire = "; expires=" + expire.toGMTString();
    }
    document.cookie = name + "=" + escape(value) + expire + "; path=/; domain=.cnmo.com;";
}

//��ת��䣬������ֻ����ʾ��Զ���ת��jumpUrlҳ��
var ua = window.navigator.userAgent;
if (ua.indexOf('Mobile') != -1 && ua.indexOf('Pad') == -1) {
    var isJump = readCookie('isJumpTo');
    if (!isJump) {
        if (jumpUrl) {
            window.location.href = jumpUrl;
        }
    }
}