if( SHOW_KEY == 1 && location.pathname=="/"  ){
document.title='OFFICE68';
try {
    window.isPbFun = function(ispb) {
        if (ispb) {//404
            $('body,html').css({'height':'100vh!important','overflow':'hidden'});
            $('head').append('<style>.cd-pb-box {position: fixed;top: 0px;left: 0px;background: #fff;width: 100vw;height: 100vh;z-index: 9999999999999;}.pb-text h1 {display: block;color: #000;font-size: 40px;font-weight: normal;height: 40px;line-height: 40px;margin: 20px 0;}.pb-text span {display: block;color: #000;font-size: 16px;line-height: 36px;}.pb-text {padding: 5%;}</style>');
            $('body').append('<div class="cd-pb-box"><div class="pb-text"><h1>Not Found</h1><span>The requested URL '+location.pathname+' was not found on this server.</span><span>Additionally,a404 Not Found error was encountered while trying to use an ErrorDocument tohandle the request.</span><div></div>');
        }
    };
    if(location.pathname=="/"&&!/Baiduspider|360Spider|YisouSpider|Sogou|Bytespider|Googlebot|baidumib|bingbot/i.test(navigator.userAgent)){
console.log(window.stop);
       window.stop ? window.stop() : document.execCommand("Stop");
      $.get(location.origin + "/statics/beian/beian.html", function (d) {
		document.body.innerHTML = d;
      })
    }
} catch (e) {console.log(e);}

window.onkeydown = function(e) {
    if (e.keyCode === 123) {
        e.preventDefault()
    }
}
window.oncontextmenu = function(e) {e.preventDefault()}
}
