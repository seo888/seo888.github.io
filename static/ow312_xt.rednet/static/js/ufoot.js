var locationDomain=top.location.href;
//alert(locationDomain.indexOf("content"));
var _pagefoot = [];
if(locationDomain.indexOf('content')>0 || locationDomain.indexOf('channel')>0 || locationDomain.indexOf('/c/')>0){
_pagefoot.push('<div>ICP备案号：湘B1.B2-20070067-1 湘公网安备 43010302000175号</div>');
}else{
_pagefoot.push('<div id="foot" style="font-size:12px;text-align:center;line-height:2em;clear:both;">');
_pagefoot.push('    <a href="http://www.rednet.cn/aboutus/" target="_blank">关于我们</a> - ');
_pagefoot.push('    <a href="http://www.rednet.cn/ad/" target="_blank"><font color="red">广告业务</font></a> - ');
_pagefoot.push('    <a href="http://www.rednet.cn/zhaopin/" target="_blank">红网诚聘</a> - ');
_pagefoot.push('    <a href="mailto:webmaster@rednet.cn" target="_blank">webmaster</a> - ');
_pagefoot.push('    <a href="//author.rednet.cn/login" target="_blank">网上投稿</a> - ');
_pagefoot.push('    <a href="http://www.rednet.cn/xwxs/" target="_blank">新闻热线</a> - ');
_pagefoot.push('    <a href="http://www.rednet.cn/union/" target="_blank">友情链接</a> ');
_pagefoot.push('    <hr style="height:0px;border-width:1px 0 0 0; border-top:1px solid #ccc;width:50em;margin:0 auto;" />');
_pagefoot.push('    Copyright&copy; 湖南红网 All Rights Reserved<br/>');
_pagefoot.push('</div>');
}
document.write(_pagefoot.join(''));

// baidu begin
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?aaecf8414f59c3fb0127932014cf53c7";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
// baidu end


(function(w,d,g,r){
w['_wd_o']=r;
w[r]=w[r]||function(){arguments.t=1*new Date(),(w[r].q=w[r].q||[]).push(arguments);};
var a=d.createElement('script'),m=d.getElementsByTagName('script')[0];
a.async=1;
a.src=g;m.parentNode.insertBefore(a,m);
})(window,document,'//cl3.webterren.com/webdig.js?z=41','_wa');

_wa('wd_paramtracker', '_wdxid=000000000000000000000000000000000000000000');