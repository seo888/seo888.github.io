var CKDomain = "";var CKPath = "/";var CKPrex = "ced_";
function get_cookie(n) {
    var v = ''; var s = CKPrex + n + "=";
    if(document.cookie.length > 0) {
        o = document.cookie.indexOf(s);
        if(o != -1) {
            o += s.length;
            end = document.cookie.indexOf(";", o);
            if(end == -1) end = document.cookie.length;
            v = unescape(document.cookie.substring(o, end));
        }
    }
    return v;
}
function GoMobile(url) {
    var UA = navigator.userAgent.toLowerCase();
    if((UA.indexOf('phone') != -1 || UA.indexOf('mobile') != -1 || UA.indexOf('android') != -1 || UA.indexOf('ipod') != -1) && get_cookie('mobile') != 'pc' && UA.indexOf('ipad') == -1) {
        window.location = url;
    }
}
function show_task(s) {document.write('<script type="text/javascript" src="http://proxy.hnr.cn/api/task.js.php?'+s+'&refresh='+Math.random()+'.js"></sc'+'ript>');}