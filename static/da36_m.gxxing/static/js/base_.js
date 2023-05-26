document.writeln("<link href=\'//my.fhwlgs.com/static/mob/css/base.css\' rel=\'stylesheet\' type=\'text/css\' />");
document.writeln("<script src=\'//my.fhwlgs.com/static/mob/js_dy/jquery.js\'></script>");
document.writeln("<script src=\'//my.fhwlgs.com/static/mob/js_dy/bottom.js\'></script>");
document.writeln("<script src=\'//my.fhwlgs.com/static/mob/js_dy/top.js\'></script>");
document.writeln("<script>");
document.writeln("var _hmt = _hmt || [];");
document.writeln("(function() {");
document.writeln("  var hm = document.createElement(\'script\');");
document.writeln("  hm.src = \'https://hm.baidu.com/hm.js?945dfd7706e711d00834e1a978ab718a\';");
document.writeln("  var s = document.getElementsByTagName(\'script\')[0]; ");
document.writeln("  s.parentNode.insertBefore(hm, s);");
document.writeln("})();");
document.writeln("</script>");

console.log(navigator.userAgent);
  var os = function (){
    var ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian;
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
    };
}();

if (os.isAndroid || os.isPhone) {
  //console.log("手机")
} else if (os.isTablet) {
  //console.log("平板")
} else if(os.isPc) {
  //console.log("电脑")
var parentId='';
var id='';
var url = document.URL;
urls=url.replace("//m.","//www.");
window.location.href=urls;
}
