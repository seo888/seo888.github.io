zbp.plugin.unbind("comment.reply","system");zbp.plugin.on("comment.reply","mochu",function(e){$("#inpRevID").val(e);var a=$("#postcmt").html();if(a==""){a=$("#reply").html()}$("#reply").remove();$("#AjaxComment"+e).after('<dl id="reply">'+a+"</dl>");$("#postcmt").hide("slow").html("");$("#cancel-reply").show().bind("click",function(){$("#inpRevID").val(0);$("#postcmt").html(a).show(1500);$("#reply").remove();window.location.hash="#comment";return false});$("#reply").show("slow");window.location.hash="#reply"});zbp.plugin.on("comment.postsuccess","mochu",function(){$("#cancel-reply").click()});var rollSet=$("#float");var offset=rollSet.offset();$(window).scroll(function(){var e=$(window).scrollTop();if(offset.top<e){rollSet.addClass("fixed");var a=$(".main-lr").width();rollSet.width(a)}else{rollSet.removeClass("fixed")}});$("#nav li").hover(function(){$(this).find("ul").slideDown("slow")},function(){$(this).find("ul").slideUp("slow")});$("#xiala").on("click",function(){$("#yidongnavs").slideToggle(500);$(".waphead-lf i").toggleClass("fa-times onhover")});$("#guanbi").on("click",function(){$("#yidongnavs").slideToggle(500)});$("#sousuo").on("click",function(){$(".sousuo").slideToggle(500);$("#sousuo i").toggleClass("fa-times onhover")});$("#sguanbi").on("click",function(){$(".sousuo").slideToggle(500);$(".waphead-lr i").toggleClass("fa-times onhover");$("#sousuo i").toggleClass("fa-times onhover")});$("#ydsousuo").on("click",function(){$(".sousuo").slideToggle(500);$(".waphead-lr i").toggleClass("fa-times onhover")});var surl=location.href;var surl2=$(".place a:eq(1)").attr("href");$("#nav ul li a").each(function(){if($(this).attr("href")==surl||$(this).attr("href")==surl2){$(this).addClass("onhover")}});$("#yidongnavs ul li a").each(function(){if($(this).attr("href")==surl||$(this).attr("href")==surl2){$(this).addClass("onhover")}});$(".link-con-lf ul li a").each(function(){if($(this).attr("href")==surl||$(this).attr("href")==surl2){$(this).addClass("link-con-a")}});var s=document.location;$("#nav a").each(function(){if(this.href==s.toString().split("#")[0]){$(this).addClass("onhover");return false}});var tags_a=$("#divTags li");var tags_h=$("#htagcelan li");var tags_r=$("#rtagcelan li");var tags_ac=$(".wennr-fen a");var x=8;var y=0;tags_a.each(function(){var e=parseInt(Math.random()*(x-y+1)+y);$(this).addClass("tags"+e)});tags_h.each(function(){var e=parseInt(Math.random()*(x-y+1)+y);$(this).addClass("tags"+e)});tags_r.each(function(){var e=parseInt(Math.random()*(x-y+1)+y);$(this).addClass("tags"+e)});tags_ac.each(function(){var e=parseInt(Math.random()*(x-y+1)+y);$(this).addClass("tagac"+e)});function setTab(e,a,f){for(i=1;i<=f;i++){var P=document.getElementById(e+i);var g=document.getElementById("con_"+e+"_"+i);P.className=i==a?"tabhover":"";g.style.display=i==a?"block":"none"}}$(".footlogin-on").on("click",function(){$(".y-nav").fadeIn("slow");$(".footlogin-on").fadeOut("fast")});$("#y-nav-close").on("click",function(){$(".y-nav").fadeOut("fast");$(".footlogin-on").fadeIn("slow")});$(window).scroll(function(){var e=$(document).scrollTop();if(e>50){$("#y-nav-top").fadeIn("slow");$("#header").addClass("tophead")}else{$("#y-nav-top").fadeOut("fast");$("#header").removeClass("tophead")}});$("#y-nav-top").click(function(){$("body,html").animate({scrollTop:0},1e3)});$("#ynavweixin").on({mouseover:function(){$(".y-nav-weixin").css("display","block")},mouseout:function(){$(".y-nav-weixin").css("display","none")}});function wennrsize(e){document.getElementById("wennr-wen").style.fontSize=e+"px"}$(".guidang ul:lt(1)").css("display","block");$(".item h3").on("click",function(){$(this).next().slideToggle()});$(".archive-list").mouseover(function(){$(this).toggleClass("archive-on")});$(".archive-list").mouseout(function(){$(this).removeClass("archive-on")});$("body").on("click",".denglu",function(){$("body").append("<div id='t-bei'></div>");$("#dengdiv").fadeIn("slow")});$("body").on("click","#yddenglu",function(){$("body").append("<div id='t-bei'></div>");$("#dengdiv").fadeIn("slow")});$("body").on("click","#tcaguan",function(){$("#dengdiv").fadeOut("fast");$("#t-bei").remove()});$("body").on("click","#btnPost",function(){var e=$("#edtUserName").val();var a=$("#edtPassWord").val();var f=$("#savedate").val();if(e==""||a==""){mochu_alert("鐢ㄦ埛鍚嶆垨瀵嗙爜涓嶈兘涓虹┖锛�");return false}$("#edtUserName").val("");$("#edtPassWord").val("");$("form").attr("action","/zb_system/cmd.php?act=verify");$("#username").val(e);$("#password").val(MD5(a));$("#savedate").val(f)});$("body").on("click","#chkRemember",function(){$("#savedate").attr("value",$("#chkRemember").attr("checked")=="checked"?30:1)});$("#onfxjs").on("click",function(){$("body").append("<div id='t-bei'></div>");$("#fxtan").fadeIn("slow")});$("#fenguan").on("click",function(){$("#fxtan").fadeOut("fast");$("#t-bei").remove()});$("#erweima").on("click",function(){$("body").append("<div id='t-bei'></div>");$("#fxsao").fadeIn("slow")});$("#saoguan").on("click",function(){$("#fxsao").fadeOut("fast");$("#t-bei").remove()});$("#ondashang").on("click",function(){$("body").append("<div id='t-bei'></div>");$("#dashang").fadeIn("slow")});$("#tca").on("click",function(){$("#dashang").fadeOut("fast");$("#t-bei").remove()});$(".ds-payment-way").bind("click",function(){$(".qrcode-img").hide();$(".qrCode_"+$(".ds-payment-way").find("input[name=reward-way]:checked").val()).show()});$("#wennr-wen img").each(function(){var e=$(this).attr("src");$(this).attr("data-source",e);$(this).attr("class","js-lightbox");$(this).attr("data-group","group-1");$(this).attr("data-id","one")});!function(e){e.fn.flexisel=function(a){var f,P,g,d,aI=e.extend({visibleItems:4,itemsToScroll:3,animationSpeed:400,infinite:!0,navigationTargetSelector:null,autoPlay:{enable:!1,interval:5e3,pauseOnHover:!0},responsiveBreakpoints:{portrait:{changePoint:480,visibleItems:1,itemsToScroll:1},landscape:{changePoint:640,visibleItems:2,itemsToScroll:2},tablet:{changePoint:768,visibleItems:3,itemsToScroll:3}},loaded:function(){},before:function(){},after:function(){}},a),dH=e(this),gf=e.extend(aI,a),gD=!0,ga=gf.visibleItems,gY=gf.itemsToScroll,aA=[],c={init:function(){return this.each(function(){c.appendHTML(),c.setEventHandlers(),c.initializeItems()})},initializeItems:function(){var a=gf.responsiveBreakpoints;for(var g in a)aA.push(a[g]);aA.sort(function(e,a){return e.changePoint-a.changePoint});var d=dH.children();f=c.getCurrentItemWidth(),P=d.length,d.width(f),dH.css({left:-f*(ga+1)}),dH.fadeIn(),e(window).trigger("resize"),gf.loaded.call(this,dH)},appendHTML:function(){if(dH.addClass("nbs-flexisel-ul"),dH.wrap("<div class='nbs-flexisel-container'><div class='nbs-flexisel-inner'></div></div>"),dH.find("li").addClass("nbs-flexisel-item"),gf.navigationTargetSelector&&e(gf.navigationTargetSelector).length>0?e("<div class='nbs-flexisel-nav-left'></div><div class='nbs-flexisel-nav-right'></div>").appendTo(gf.navigationTargetSelector):(gf.navigationTargetSelector=dH.parent(),e("<div class='nbs-flexisel-nav-left'></div><div class='nbs-flexisel-nav-right'></div>").insertAfter(dH)),gf.infinite){var a=dH.children(),f=a.clone(),P=a.clone();dH.prepend(f),dH.append(P)}},setEventHandlers:function(){var a=dH.children();e(window).on("resize",function(P){gD=!1,clearTimeout(g),g=setTimeout(function(){gD=!0,c.calculateDisplay(),f=c.getCurrentItemWidth(),a.width(f),gf.infinite?dH.css({left:-f*Math.floor(a.length/2)}):(c.clearDisabled(),e(gf.navigationTargetSelector).find(".nbs-flexisel-nav-left").addClass("disabled"),dH.css({left:0}))},100)}),e(gf.navigationTargetSelector).find(".nbs-flexisel-nav-left").on("click",function(e){c.scroll(!0)}),e(gf.navigationTargetSelector).find(".nbs-flexisel-nav-right").on("click",function(e){c.scroll(!1)}),gf.autoPlay.enable&&(c.setAutoplayInterval(),gf.autoPlay.pauseOnHover===!0&&dH.on({mouseenter:function(){gD=!1},mouseleave:function(){gD=!0}})),dH[0].addEventListener("touchstart",c.touchHandler.handleTouchStart,!1),dH[0].addEventListener("touchmove",c.touchHandler.handleTouchMove,!1)},calculateDisplay:function(){var a=e("html").width(),f=aA[aA.length-1].changePoint;for(var P in aA){if(a>=f){ga=gf.visibleItems,gY=gf.itemsToScroll;break}if(a<aA[P].changePoint){ga=aA[P].visibleItems,gY=aA[P].itemsToScroll;break}}},scroll:function(e){if("undefined"==typeof e&&(e=!0),1==gD){if(gD=!1,gf.before.call(this,dH),f=c.getCurrentItemWidth(),gf.autoPlay.enable&&clearInterval(d),gf.infinite)dH.animate({left:e?"+="+f*gY:"-="+f*gY},gf.animationSpeed,function(){gf.after.call(this,dH),gD=!0,e?c.offsetItemsToBeginning(gY):c.offsetItemsToEnd(gY),c.offsetSliderPosition(e)});else{var a=f*gY;e?dH.animate({left:c.calculateNonInfiniteLeftScroll(a)},gf.animationSpeed,function(){gf.after.call(this,dH),gD=!0}):dH.animate({left:c.calculateNonInfiniteRightScroll(a)},gf.animationSpeed,function(){gf.after.call(this,dH),gD=!0})}gf.autoPlay.enable&&c.setAutoplayInterval()}},touchHandler:{xDown:null,yDown:null,handleTouchStart:function(e){this.xDown=e.touches[0].clientX,this.yDown=e.touches[0].clientY},handleTouchMove:function(e){if(this.xDown&&this.yDown){var a=e.touches[0].clientX,f=e.touches[0].clientY,P=this.xDown-a;this.yDown-f;Math.abs(P)>0&&(P>0?c.scroll(!1):c.scroll(!0)),this.xDown=null,this.yDown=null,gD=!0}}},getCurrentItemWidth:function(){return dH.parent().width()/ga},offsetItemsToBeginning:function(e){"undefined"==typeof e&&(e=1);for(var a=0;a<e;a++)dH.children().last().insertBefore(dH.children().first())},offsetItemsToEnd:function(e){"undefined"==typeof e&&(e=1);for(var a=0;a<e;a++)dH.children().first().insertAfter(dH.children().last())},offsetSliderPosition:function(e){var a=parseInt(dH.css("left").replace("px",""));e?a-=f*gY:a+=f*gY,dH.css({left:a})},getOffsetPosition:function(){return parseInt(dH.css("left").replace("px",""))},calculateNonInfiniteLeftScroll:function(a){return c.clearDisabled(),c.getOffsetPosition()+a>=0?(e(gf.navigationTargetSelector).find(".nbs-flexisel-nav-left").addClass("disabled"),0):c.getOffsetPosition()+a},calculateNonInfiniteRightScroll:function(a){c.clearDisabled();var g=P*f-ga*f;return c.getOffsetPosition()-a<=-g?(e(gf.navigationTargetSelector).find(".nbs-flexisel-nav-right").addClass("disabled"),-g):c.getOffsetPosition()-a},setAutoplayInterval:function(){d=setInterval(function(){gD&&c.scroll(!1)},gf.autoPlay.interval)},clearDisabled:function(){var a=e(gf.navigationTargetSelector);a.find(".nbs-flexisel-nav-left").removeClass("disabled"),a.find(".nbs-flexisel-nav-right").removeClass("disabled")}};return c[a]?c[a].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof a&&a?void e.error('Method "'+method+'" does not exist in flexisel plugin!'):c.init.apply(this)}}(jQuery);$("#flexisel").flexisel({visibleItems:4,itemsToScroll:1,autoPlay:{enable:true,interval:5e3,pauseOnHover:true}});$(".mochu-zan").click(function(){var e=$(this).attr("data-postid");if(e<1){mochu_alert("涓嶈鎹ｄ贡 ^(oo)^",2e3);return false}var a=$(this).attr("data-zan");var a=a*1+1;$.post("/zb_users/theme/mochu/function.php?type=zan",{id:e},function(f){var P=f;if(P=="ok"){$(".zan-"+e).html("<i class='fa fa-thumbs-o-up'></i>"+a+"浜鸿禐");mochu_alert("浣犲凡鎴愬姛鐐硅禐 ^_^",2e3)}else{mochu_alert("浣犲凡缁忕偣杩囪禐鍟� (炉^炉 )",2e3)}})});$("body").on("blur","#inpQQ",function(){mochu_alert("姝ｅ湪鑾峰彇QQ璧勬枡...",1e3);$.getJSON("/zb_users/theme/mochu/function.php?type=inputqq&qq="+$("#inpQQ").val(),function(e){if(e.name){mochu_alert("QQ璧勬枡鑾峰彇鎴愬姛...",1e3);$("#inpName").val(e.name);$("#inpEmail").val($("#inpQQ").val()+"@qq.com");$("#inpQQ").attr("disabled","disabled")}else{mochu_alert("鑾峰彇璧勬枡澶辫触锛�",2e3)}})});function echo(e,a){var f="浣犲ソ";alert("hello world")}function mochu_alert(e,a){var f='<div style="z-index:9999; padding:10px; top:50%;left:50%;color:#fff;background-color:#666;position:fixed;border-radius:5px;" class="mochu-zan-js"><span style="font-size:16px;">'+e+"</span></div>";$("body").append(f);var P=($(".mochu-zan-js").width()+40)/2*-1;$(".mochu-zan-js").css("marginLeft",P);var g=a;setTimeout(function(){$(".mochu-zan-js").remove()},g)}var mochu_pinglun=false;$("#sumbitping").click(function(){if(mochu_pinglun==false){mochu_alert("璇疯В閿佸悗鍐嶆彁浜� (鈭╋伎鈭�)",2e3);return false}});$(document).ready(function(){if($(window).width()<980){$("#sumbitping2").attr("onclick","return zbp.comment.post()")}});$(function(){$(".pinglunnr").on("mousedown",".inner",function(e){var a=$(".inner"),f=a.offset(),P,g=$(".outer>span"),d=$(".filter-box"),aI=$(".outer").width()-a.width();$(document).mousemove(function(e){P=e.pageX-f.left;if(P<0){P=0}else{if(P>aI){P=aI}}d.css("width",P);a.css("left",P)});$(document).mouseup(function(e){$(document).off("mousemove");$(document).off("mouseup");P=e.pageX-f.left;if(P<aI){P=0;g.html("璇锋嫋鍔ㄦ粦鍧楄В閿�")}else{if(P>=aI){P=aI;$(".outer").addClass("act");g.html("瑙ｉ攣鎴愬姛锛�");a.html("&radic;");mochu_pinglun=true;$("#sumbitping").attr("onclick","return zbp.comment.post()").addClass("buttons")}}d.css("width",P);a.css("left",P)})})});$("#pageload").on("click",function(){var e='<div class="pagination-loading"><i class="fa fa-spinner fa-spin"></i> 鏁版嵁鍔犺浇涓�.......</div>';$(".liebiao").append(e);page=$(this).attr("data-page");pagetype=$(this).attr("data-type");pageid=$(this).attr("data-id");$.ajax({type:"POST",url:bloghost+"/zb_users/theme/mochu/function.php?type=ajax",data:{page:page,pagetype:pagetype,pageid:pageid},dataType:"json",success:function(e){$(".pagination-loading").remove();$(".liebiao").append(e.html);$("#ajaxbarhtml").html(e.pagebarhtml);if(e.page>0){$("#pageload").attr("data-page",e.page)}else{$("#pageload").css("display","none")}},error:function(){$(".pagination-loading").remove()}})});