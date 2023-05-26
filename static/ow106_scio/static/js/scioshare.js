var UIShareToolBarFontSize = 0;
var ChangedSelector = "#content p";

function UIShareToolBarClickFD() {
    if (UIShareToolBarFontSize == 0) {
        $(ChangedSelector).css({
            "font-size": "16px"
        });
        UIShareToolBarFontSize++;
    } else if (UIShareToolBarFontSize == 1) {
        $(ChangedSelector).css({
            "font-size": "18px"
        });
        UIShareToolBarFontSize++;
    } else if (UIShareToolBarFontSize == 2) {
        $(ChangedSelector).css({
            "font-size": "20px"
        });
        UIShareToolBarFontSize++;
    }
}

function UIShareToolBarClickSX() {
    if (UIShareToolBarFontSize == 3) {
        $(ChangedSelector).css({
            "font-size": "18px"
        });
        UIShareToolBarFontSize--;
    } else if (UIShareToolBarFontSize == 2) {
        $(ChangedSelector).css({
            "font-size": "16px"
        });
        UIShareToolBarFontSize--;
    } else if (UIShareToolBarFontSize == 1) {
        $(ChangedSelector).css({
            "font-size": "14px"
        });
        UIShareToolBarFontSize--;
    }
}
$(function() {
    $("ul.sharetoolbar li div.scrollDiv").hover(function() {
        $(this).animate({
            top: -38
        }, 300)
    }, function() {
        $(this).animate({
            top: 0
        }, 300)
    });
    $("ul.sharetoolbar li div.line02 .fd").click(UIShareToolBarClickFD);
    $("ul.sharetoolbar li div.line02 .sx").click(UIShareToolBarClickSX);
});
$(function() {
    try{
       var content = $("div.tc.A_title").html(); 
       content = content.replace(/·/gi, "<span style='font-family:宋体'>·</span>");
       content = content.replace(/“/gi, "<span style='font-family:宋体'>“</span>");
       content = content.replace(/”/gi, "<span style='font-family:宋体'>”</span>");
       content = content.replace(/‘/gi, "<span style='font-family:宋体'>‘</span>");
       content = content.replace(/’/gi, "<span style='font-family:宋体'>’</span>");
       $("div.tc.A_title").html(content);
    }catch(e){}
});
function SetupbdShareJs() {
        var imageUrl="http://www.scio.gov.cn/Template/5996/Image/pic300.jpg";	  
              imageUrl="http://www.scio.gov.cn/template/6290/Image/logo4.png";	  
        if ($("div[id='content'] img").size() > 0) //正文中有图片
        {
            imageUrl = $("div[id='content'] img")[0].src;
        }
        window._bd_share_config = { "common": { "bdSnsKey": {}, "bdText": "", "bdMini": "2", "bdMiniList": ["weixin", "sqq", "qzone", "tsina", "copy"], "bdPic": imageUrl, "bdStyle": "0", "bdSize": "24" }, "share": {} }; with (document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
}
$(function(){ /*安装百度分享*/
	SetupbdShareJs(); 
});	
function fnUserErrorRevise(b,c){try{var a='<div class="tiyidialog" style="position: absolute;left: 100px;top: -324px;background-color: #FFF;height: 342px;width: 600px;display: none;z-index:10000;">',a=a+"    <div>",a=a+'        <iframe id="jc_link1" style="width: 600px; height: 350px; float: left;" border="0"   name="search" marginwidth="0" framespacing="0" marginheight="0" frameborder="0"',a=a+'        noresize="" scrolling="no" vspale="0" src="about:blank">',a=a+"        </iframe> ",a=a+"    </div>",
a=a+"  </div>",a=a+' <a href="javascript:void(0);" class="jiucuolnk" style="cursor: pointer;color: #8a0000;">\u3010\u7ea0\u9519\u3011</a>  ';1==$(b).size()&&-1<$(b).html().indexOf("\u8d23\u4efb\u7f16\u8f91\uff1a")&&($(b).css("position","relative"),$(b).prepend(a),$("a.jiucuolnk",$(b)).click(function(){$("#jc_link1",$(b)).attr("src",c+"?Url="+document.location.href+"&rnd="+new Date);$("div.tiyidialog",$(b)).css("display","block")}))}catch(d){}};

;(function(b){b.fn.SCIOWXShare=function(e){function f(){b.ajax({type:"get",async:!1,url:a.configureUrl+"/ShareSet.aspx?entry="+a.entry,data:{"do":"getajaxwechatconfiginfo",url:encodeURIComponent(a.link)},dataType:"json",success:function(c){try{console.log(c.nonceStr)}catch(g){}wx.config({debug:a.debug,appId:c.appId,timestamp:c.timestamp,nonceStr:c.nonceStr,signature:c.signature,jsApiList:"checkJsApi chooseImage previewImage uploadImage downloadImage openLocation getLocation onMenuShareTimeline onMenuShareAppMessage onMenuShareQQ onMenuShareWeibo onMenuShareQZone".split(" ")});
wx.ready(function(){wx.onMenuShareTimeline({title:a.title,link:a.link,imgUrl:a.imageUrl,success:function(a){},cancel:function(a){},fail:function(a){},complete:function(a){}});wx.onMenuShareAppMessage({title:a.title,desc:a.description,link:a.link,imgUrl:a.imageUrl,type:"link",dataUrl:"",success:function(){},cancel:function(){}});wx.onMenuShareQQ({title:a.title,desc:a.description,link:a.link,imgUrl:a.imageUrl,success:function(){},cancel:function(){}});wx.onMenuShareWeibo({title:a.title,desc:a.description,
link:a.link,imgUrl:a.imageUrl,success:function(){},cancel:function(){}});wx.onMenuShareQZone({title:a.title,desc:a.description,link:a.link,imgUrl:a.imageUrl,success:function(){},cancel:function(){}})});wx.error(function(a){console.log("wx.error:"+a)})},error:function(a){console.log("ajaxerror:"+a)}})}var d={title:document.title,link:window.location.href,imageUrl:"http://www.scio.gov.cn/template/6290/Image/logo4.png",description:document.title,entry:"zn",configureUrl:"https://www.scio.gov.cn/PageShare",
wxJSUrl:"http://res.wx.qq.com/open/js/jweixin-1.2.0.js",debug:!1},a=b.extend({},d,e);0==b.trim(a.imageUrl).length&&(a.imageUrl=d.imageUrl);b.ajax({type:"get",async:!1,url:a.configureUrl+"/HeaderTest.aspx",success:function(a){}});b.getScript(a.wxJSUrl,function(){f()})}})(jQuery);

$(function(){ /*设置微信分享*/
		var imageUrl="http://www.scio.gov.cn/template/6290/Image/logo4.png";
		 if ($("div[id='content'] img").size() > 0)  {//正文中有图片
                  imageUrl = $("div[id='content'] img")[0].src;
               }

		/*$(document).SCIOWXShare({"imageUrl":imageUrl});*/

});

$(function(){
   fnUserErrorRevise("div.tr.A_t1.f12,div.scioerrorrevisefront", "http://www.scio.gov.cn/ErrorCorrectFront/front/confirm.aspx");
}); 