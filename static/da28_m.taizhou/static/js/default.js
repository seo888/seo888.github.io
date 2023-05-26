    $(document).ready(function() {
        $(".share").click(function() {
            $("#sharepanel").slideDown(300);
            $(".showpanel-content").slideDown(500);

        });
        $("#sharepanel").click(function() {
            $("#sharepanel").slideUp(300);
            $(".showpanel-content").slideUp(500);
            $("#bsWXBox").hide();
            $(".guidewxt_layout_show").attr("class", "guidewxt_layout_default");
        });
        $(".closepanel").click(function() {
            $("#sharepanel").slideUp(300);
            $(".showpanel-content").slideUp(500);
        });
        $(".showguide").click(function() {
            $(".showpanel-content").hide();
            $("#sharepanel").hide();
            $(".guidewxt_layout_default").attr("class", "guidewxt_layout_show");
            $(".guidewxt_layout_show").click(function() {
                $(".guidewxt_layout_show").attr("class", "guidewxt_layout_default");
            });
        });

        // if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
        //     if (window.location.href.indexOf("?mobile") < 0) {
        //         try {
        //             if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        //                 //手机 
        //                 // window.location.href = "http://www.taizhou.com.cn/zhuanti/node_32720.htm";
        //                 document.title = "";
        //             } else if (/iPad/i.test(navigator.userAgent)) {
        //                 //ipad
        //                 // window.location.href = "http://www.taizhou.com.cn/zhuanti/node_32720.htm";
        //                 document.title = "";
        //             } else {
        //                 //电脑
        //                 // window.location.href = "http://www.taizhou.com.cn/zhuye/index.htm"
        //             }
        //         } catch (e) {}
        //     }
        // }
    });

    // 找到p标签里有align为center属性的和a标签里有title属性的，去掉style值
    // 根据有无相关阅读列表隐藏区块
    $(window).load(function() {
        if ($(".xglst>li").length > 0) {
            $(".xgyd").show();
        } else {
            $(".xgyd").hide();
        }
        var ct = $("p[align=center]");
        ct.each(function() {
            $(this).removeAttr("style");
        });

       var at = $("a[title], center");
        at.each(function() {
            var image = $(this).find('img');
            image.removeAttr("style");
            if ($(document).width()<768) {
                image.removeAttr("height");
            }
        });
        //如果一个P标签中有多张图片，在非最后一张的图片之间添加间隔
        var og = $("p img");
        if (og.length > 1) {
            var addP = "<div class='mar15'></div>";
            $("p img:not(:last-child)").after(addP);
        }
        og.each(function() {
            $(this).removeAttr("style");
            $(this).parents("p").removeAttr("style").attr("align", "center", function(index, attrValue) {
                return attrValue == undefined ? this.align : attrValue;
            });
        });
        $(".article-content img").each(function() {
            var maxwidth = 600;
           // var maxheight = 600;
            var image = $(this);
            if (image.width() > image.height()) {
                if (image.width() > maxwidth) {
                    image.attr("width", "600");
                    image.attr("height", maxwidth / image.width() * image.height());
                }
            } else {
                if (image.height() > 1200) {
                    image.attr("width", "600");
                    image.attr("height", image.height());
                }
                //if (image.height() > maxheight && image.height() < 1200 ) {
                //    image.attr("height", "600");
                //    image.attr("width", maxheight / image.height() * image.width());
               // }
            }

        });

    });

    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?b8ec3b4f62c91bf283e5e8916f5481d5";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
	
 
 
  var _paq = window._paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="https://analytics.taizhou.com.cn/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '2']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
 
 

	