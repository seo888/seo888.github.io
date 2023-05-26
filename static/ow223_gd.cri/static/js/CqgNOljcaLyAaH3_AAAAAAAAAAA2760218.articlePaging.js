(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery, window, document);
    }
}(function ($) {


    var CookieUtil = {
        get: function (name) {
            var cookieName = encodeURIComponent(name) + "=",
                cookieStart = document.cookie.indexOf(cookieName),
                cookieValue = null,
                cookieEnd;

            if (cookieStart > -1) {
                cookieEnd = document.cookie.indexOf(";", cookieStart);
                if (cookieEnd == -1) {
                    cookieEnd = document.cookie.length;
                }
                cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
            }

            return cookieValue;
        },
        set: function (name, value, expires, path, domain, secure) {
            var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);

            if (expires instanceof Date) {
                cookieText += "; expires=" + expires.toGMTString();
            }

            if (path) {
                cookieText += "; path=" + path;
            }

            if (domain) {
                cookieText += "; domain=" + domain;
            }

            if (secure) {
                cookieText += "; secure";
            }

            document.cookie = cookieText;
        },

        unset: function (name, path, domain, secure) {
            this.set(name, "", new Date(0), path, domain, secure);
        }

    };


    var pluginName = "articlePaging",
        defaults = {
            isAutoPlay: false,         //false，或imp后台添加渲染元素 --- <div id="abody" isautoplay='<--isautoplay-->'>
            clickFirstImg: true,       //点击第一张图片是否跳转
            clickFirstImgBtn:true,     //是否为第一张图片添加左右按钮
            playInterval: "15s",   //10s,15s,20s
            isJumpTo:true,         //最后一页点击下一页是否跳出
            jumpTo: "http://" + location.host + "/more",  //跳出页地址
            isShowAllPages: false,      // 是否显示“阅读全文”
            isShowFirstAndLast: false,   // 页码中是否显示 "首页"，"末页"
            pageSelecter: '.page-nav'
        };
    function ArticlePaging(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this.init();
    }

    ArticlePaging.prototype = {
        init: function () {
            var self = this,
                abody = $(self.element),
                pageInfo = !!abody.attr("pageData") ? jQuery.parseJSON(abody.attr("pageData")) : null,
                pageHtml = "",
                pageNav = $(self.settings.pageSelecter),
                abodyImg = abody.find("img").eq(0),
                contentAddress = [];


            if (!pageInfo) return;

            for (var f = 0; pageInfo["total"] && f < pageInfo["total"]; f++) {
                contentAddress.push("http://" + location.host + pageInfo.urls[f]);
            }
            //跳出页
            if (self.settings.isJumpTo) {
                contentAddress.push(self.settings.jumpTo);
            }

            if (contentAddress.length <= 1) {
                pageNav.hide();
                return;
            }

            //页码
            pageHtml += '<ul>';
            if (self.settings.isShowFirstAndLast) {
                pageHtml += '<li class="pageFirst"><a href=' + contentAddress[0] + '>首页</a></li>';
            }
            pageHtml += '<li class="prevPage"><a href=' + contentAddress[pageInfo.current - 2] + '>上一页</a></li>';
            for (var g = 0; g < pageInfo["total"]; g++) {
                pageHtml += '<li class="pageNum"><a href=' + contentAddress[g] + '>' + (g + 1) + '</a></li>';
            }
            pageHtml += '<li class="nextPage"><a href=' + contentAddress[pageInfo["current"]] + '>下一页</a></li>';
            pageHtml += '</ul>';
            pageNav.html(pageHtml);
            if (self.settings.isShowFirstAndLast) {
                pageNav.find("ul").append('<li class="pageLast"><a href=' + contentAddress[pageInfo["total"] - 1] + '>末页</a></li>');
            }
            if (self.settings.isShowAllPages) {
                pageNav.find("ul").append('<li class="pageAll"><a href=' + pageInfo.allUrl + '>阅读全文</a></li>');
            }


            pageNav.find(".pageNum").removeClass("current").eq(pageInfo["current"] - 1).addClass("current");
            pageInfo["current"] == 1 && pageNav.find(".prevPage a").attr("href", "javascript:void(0)");
            !self.settings.isJumpTo && pageInfo["current"] == pageInfo.total && pageNav.find(".nextPage a").attr("href", "javascript:void(0)");

            //if(pageInfo["current"]==1){ pageNav.find(".pageFirst").hide();pageNav.find(".prevPage").hide();}
            //if(pageInfo["current"]==pageInfo["total"]){ pageNav.find(".pageLast").hide();pageNav.find(".nextPage").hide();}

           
            //自动播放
            if (abody.attr("isautoplay") == "true" || self.settings.isAutoPlay) {
                abodyImg.parent().prepend(
                    '<div class="play-box"><span class="tip">点击图片进入下一页</span>' +

                    '<ul id="play-tools" class="play-tools">' +
                    '<li><a class="btn-play pause" title="点击自动播放">自动播放</a></li>' +
                    '<li><input id="playTime1" class="radio" type="radio" name="time" value="10"><label for="playTime1">10秒</label></li>' +
                    '<li><input id="playTime2" class="radio" type="radio" name="time" value="15"><label for="playTime2">15秒</label></li>' +
                    '<li><input id="playTime3" class="radio" type="radio" name="time" value="20"><label for="playTime3">20秒</label></li>' +
                    '<li><a class="btn-prev" title="上一页">上一页</a><a class="btn-next" title="下一页">下一页</a></li>' +
                    '</ul></div>');
                var playBox = abodyImg.parent().find(".play-box");

                //点击左右箭头……
                if (pageInfo["current"] == 1) {
                    playBox.find(".btn-prev").attr("href", "javascript:void(0)");
                } else {
                    playBox.find(".btn-prev").attr("href", contentAddress[pageInfo["current"] - 2]);
                }
                playBox.find(".btn-next").attr("href", contentAddress[pageInfo["current"]]);


                if (self.settings.playInterval == "10s") $("#playTime1").attr("checked", "");
                if (self.settings.playInterval == "15s") $("#playTime2").attr("checked", "");
                if (self.settings.playInterval == "20s") $("#playTime3").attr("checked", "");

                if (!CookieUtil.get("playInterval")) CookieUtil.set("playInterval", parseInt(self.settings.playInterval));

                if (!!CookieUtil.get("playInterval")) {
                    CookieUtil.get("playInterval") == "10" && $("#playTime1").attr("checked", "");
                    CookieUtil.get("playInterval") == "15" && $("#playTime2").attr("checked", "");
                    CookieUtil.get("playInterval") == "20" && $("#playTime3").attr("checked", "");
                }

                //添加自动播放按钮
                var timeId = null,
                    locationTo = function () {
                        if (timeId) clearTimeout(timeId);
                        timeId = setTimeout(function () {
                            location.href = contentAddress[pageInfo["current"]];
                        }, Number(CookieUtil.get("playInterval")) * 1000);
                    };

                if (playBox.find(".btn-play").hasClass("pause")) {
                    CookieUtil.set("isAutoPlay", "yes");
                    locationTo();
                }

                //note:这里的auto和pause与样式冲突，所以只能反着来……
                playBox.find(".btn-play").click(function () {
                    if ($(this).hasClass("auto")) {
                        $(this).removeClass("auto").addClass("pause");
                        locationTo();
                    } else {
                        $(this).addClass("auto").removeClass("pause");
                        clearTimeout(timeId);
                    }
                    if ($(this).hasClass("auto")) CookieUtil.set("isAutoPlay", "no");
                    if ($(this).hasClass("pause")) CookieUtil.set("isAutoPlay", "yes");
                });

                playBox.find("input").each(function () {
                    $(this).click(function () {
                        CookieUtil.set("playInterval", $(this).val());
                        if (CookieUtil.get("isAutoPlay") == "no") return;
                        locationTo();
                    });
                });
            }else{
                  //pageInfo["current"] == pageInfo.total && abodyImg.parents("a").attr("href", "javascript:void(0)");
                    abodyImg.parent().prepend('<div class="play-box"><span class="tip">点击图片进入下一页</span></div>');
            }

                 //点击图片进入下一页
                if (self.settings.clickFirstImg &&abodyImg.length > 0 && abodyImg.attr("src")) {
                    if (abodyImg.parents("a").length == 0) {
                        abodyImg.wrapAll('<a href=' + contentAddress[pageInfo["current"]] + '></a>');
                    } else {
                        abodyImg.parents("a").attr("href", contentAddress[pageInfo["current"]]);
                    }
                  
                }
            

            //不自动播放，点击第一张图片左右按钮播放，最后一页跳出
            if(self.settings.clickFirstImgBtn) {
                if (abodyImg.length < 1) return;
                if (abodyImg.parents("p").length > 0) {
                    abodyImg.parents("p").addClass("play-pic");
                } else {
                    abodyImg.wrapAll("<p class='playPic'></p>");
                }
                $(".play-pic").append('<a class="arrow prev" href=' + contentAddress[pageInfo["current"] - 2] + ' title="上一页">上一页</a><a class="arrow next" href=' + contentAddress[pageInfo["current"]] + ' title="下一页">下一页</a>');
                pageInfo["current"] == 1 && abody.find(".arrow.prev").attr("href", "javascript:void(0)");
                !self.settings.isJumpTo && pageInfo.current == pageInfo.total && abody.find(".arrow.next").attr("href", "javascript:void(0)");
            }
        }
    };

    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new ArticlePaging(this, options));
            }
        });
        return this;
    };


}));

$("#abody").articlePaging({
  isAutoPlay: false, //false，或imp后台添加渲染元素 --- <div id="abody" isautoplay='<--isautoplay-->'>
  clickFirstImg: true, //点击第一张图片是否跳转
  clickFirstImgBtn: true, //是否为第一张图片添加左右按钮
  playInterval: "15s", //10s,15s,20s
  isJumpTo: true, //最后一页点击下一页是否跳出
  jumpTo: "https://sc.cri.cn",  //跳出页地址
  isShowAllPages: false, // 是否显示“阅读全文”
  isShowFirstAndLast: true, // 页码中是否显示 "首页"，"末页"
  pageSelecter: '.page-nav'
})

$(function(){
    if($(".current a").html()==1){
        $(".page-nav li:first").hide().next().hide();
    }else if($(".current a").html()==$(".pageNum").length){
        $(".page-nav li:last").hide().prev().hide();
    }
})