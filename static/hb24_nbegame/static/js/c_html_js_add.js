var zbpConfig = {
    bloghost: "https://www.nbegame.com/",
    blogversion: "162160",
    ajaxurl: "https://www.nbegame.com/zb_system/cmd.php?act=ajax&src=",
    cookiepath: "/",
    lang: {
        error: {
            72: "名称不能为空或格式不正确",
            29: "邮箱格式不正确，可能过长或为空",
            46: "评论内容不能为空或过长"
        }
    },
    comment: {
        useDefaultEvents: true,
        inputs: {
            action: {
                getter: function () {
                    return $("#inpId").parent("form").attr("action");
                }
            },
            name: {
                selector: '#inpName',
                saveLocally: true,
                required: true,
                validateRule: /^[\.\_A-Za-z0-9\u4e00-\u9fa5@]+$/ig,
                validateFailedErrorCode: 72,
            },
            email: {
                selector: '#inpEmail',
                saveLocally: true,
                validateRule: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/ig,
                validateFailedErrorCode: 29,
            },
            homepage: {
                selector: '#inpHomePage',
                getter: function () {
                    var t = $('#inpHomePage').val();
                    return (!/^(.+)\:\/\//.test(t) && t !== "") ? 'http://' + t : t; 
                },
                saveLocally: true
            },
            postid: {
                selector: '#inpId',
                required: true
            },
            verify: {
                selector: '#inpVerify'
            },
            content: {
                selector: '#txaArticle',
                required: true,
                validateRule: /./ig,
                validateFailedErrorCode: 46,
            },
            replyid: {
                selector: '#inpRevID'
            },
            format: {
                getter: function () {return 'json';}
            }
        }
    }
};
var zbp = new ZBP(zbpConfig);

var bloghost = zbp.options.bloghost;
var cookiespath = zbp.options.cookiepath;
var ajaxurl = zbp.options.ajaxurl;
var lang_comment_name_error = zbp.options.lang.error[72];
var lang_comment_email_error = zbp.options.lang.error[29];
var lang_comment_content_error = zbp.options.lang.error[46];

$(function () {

    zbp.cookie.set("timezone", (new Date().getTimezoneOffset()/60)*(-1));
    var $cpLogin = $(".cp-login").find("a");
    var $cpVrs = $(".cp-vrs").find("a");
    var $addinfo = zbp.cookie.get("addinfo");
    if (!$addinfo){
        return ;
    }
    $addinfo = JSON.parse($addinfo);

    if ($addinfo.chkadmin){
        $(".cp-hello").html("欢迎 " + $addinfo.useralias + " (" + $addinfo.levelname  + ")");
        if ($cpLogin.length == 1 && $cpLogin.html().indexOf("[") > -1) {
            $cpLogin.html("[后台管理]");
        } else {
            $cpLogin.html("后台管理");
        }
    }

    if($addinfo.chkarticle){
        if ($cpVrs.length == 1 && $cpVrs.html().indexOf("[") > -1) {
            $cpVrs.html("[新建文章]");
        } else {
            $cpVrs.html("新建文章");
        }
        $cpVrs.attr("href", zbp.options.bloghost + "zb_system/cmd.php?act=ArticleEdt");
    }
});
$(function(){
  let inpNameVal = $(zbpConfig.comment.inputs.name.selector).val();
  if (typeof inpNameVal === "undefined") {
    return;
  }
  if (inpNameVal.trim() === "" || inpNameVal === "访客"){
    zbp.userinfo.output();
  }
});

document.writeln("<script src='https://www.nbegame.com/zb_users/plugin/UEditor/third-party/prism/prism.js' type='text/javascript'></script><link rel='stylesheet' type='text/css' href='https://www.nbegame.com/zb_users/plugin/UEditor/third-party/prism/prism.css'/>");$(function(){var compatibility={as3:"actionscript","c#":"csharp",delphi:"pascal",html:"markup",xml:"markup",vb:"basic",js:"javascript",plain:"markdown",pl:"perl",ps:"powershell"};var runFunction=function(doms,callback){doms.each(function(index,unwrappedDom){var dom=$(unwrappedDom);var codeDom=$("<code>");if(callback)callback(dom);var languageClass="prism-language-"+function(classObject){if(classObject===null)return"markdown";var className=classObject[1];return compatibility[className]?compatibility[className]:className}(dom.attr("class").match(/prism-language-([0-9a-zA-Z]+)/));codeDom.html(dom.html()).addClass("prism-line-numbers").addClass(languageClass);dom.html("").addClass(languageClass).append(codeDom)})};runFunction($("pre.prism-highlight"));runFunction($('pre[class*="brush:"]'),function(preDom){var original;if((original=preDom.attr("class").match(/brush:([a-zA-Z0-9\#]+);/))!==null){preDom.get(0).className="prism-highlight prism-language-"+original[1]}});Prism.highlightAll()});
	

$(function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.flw"),f="object"==typeof b&&b;e||d.data("bs.flw",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.t=a(this.options.target).on("scroll.bs.flw.data-api",a.proxy(this.checkPosition,this)).on("click.bs.flw.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.e=a(b),this.flwed=this.unpin=this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.2.0",c.RESET="flw flw-top flw-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.e.removeClass(c.RESET).addClass("flw");var a=this.t.scrollTop(),b=this.e.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.e.is(":visible")){var b=a(document).height(),d=this.t.scrollTop(),e=this.e.offset(),f=this.options.offset,g=f.top,h=f.bottom;"object"!=typeof f&&(h=g=f),"function"==typeof g&&(g=f.top(this.e)),"function"==typeof h&&(h=f.bottom(this.e));var i=null!=this.unpin&&d+this.unpin<=e.top?!1:null!=h&&e.top+this.e.height()>=b-h?"bottom":null!=g&&g>=d?"top":!1;if(this.flwed!==i){null!=this.unpin&&this.e.css("top","");var j="flw"+(i?"-"+i:""),k=a.Event(j+".bs.flw");this.e.trigger(k),k.isDefaultPrevented()||(this.flwed=i,this.unpin="bottom"==i?this.getPinnedOffset():null,this.e.removeClass(c.RESET).addClass(j).trigger(a.Event(j.replace("flw","flwed"))),"bottom"==i&&this.e.offset({top:b-this.e.height()-h}))}}};var d=a.fn.flw;a.fn.flw=b,a.fn.flw.Constructor=c,a.fn.flw.noConflict=function(){return a.fn.flw=d,this},a(window).on("load",function(){a('[data-spy="flw"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},d.offsetBottom&&(d.offset.bottom=d.offsetBottom),d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})});var e=$(_js.sID),w=$(_js.bID).height()+(+_js.sTP);if(e.length){var h=$(_js.fID);h.flw({offset:{top:e.offset().top+e.height(),bottom:w}});h.on("flw-top.bs.flw",function(){h.css({top:0})});h.on("flw.bs.flw",function(){h.css({top: +_js.sTP})})}});$(document).on("click",".changetheme",function(){zbp.cookie.set("theme", $(this).data("id") , 365);window.location.reload();})