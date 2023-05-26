(function ($, window, i) {
    $.fn.responsiveSlides = function (options) {
        var settings = $.extend({
            "auto": true,
            "speed": 1000,
            "timeout": 6000,
            "pager": true,
            "nav": true,
            "random": false,
            "pause": true,
            "pauseControls": true,
            "prevText": "Previous",
            "nextText": "Next",
            "maxwidth": "980",
            "navContainer": "",
            "manualControls": "",
            "namespace": "rslides",
            "before": $.noop,
            "after": $.noop
        }, options);
        return this.each(function () {
            i++;
            var $this = $(this), vendor, selectTab, startCycle, restartCycle, rotate, $tabs, index = 0,
                $slide = $this.children(), length = $slide.length, fadeTime = parseFloat(settings.speed),
                waitTime = parseFloat(settings.timeout), maxw = parseFloat(settings.maxwidth),
                namespace = settings.namespace, namespaceIdx = namespace + i,
                navClass = namespace + "_nav " + namespaceIdx + "_nav", activeClass = namespace + "_here",
                visibleClass = namespaceIdx + "_on", slideClassPrefix = namespaceIdx + "_s",
                $pager = $("<ul class='" + namespace + "_tabs' />"),
                visible = {"float": "left", "position": "relative", "opacity": 1, "zIndex": 2},
                hidden = {"float": "none", "position": "absolute", "opacity": 0, "zIndex": 1},
                supportsTransitions = (function () {
                    var docBody = document.body || document.documentElement;
                    var styles = docBody.style;
                    var prop = "transition";
                    if (typeof styles[prop] === "string") {
                        return true
                    }
                    vendor = ["Moz", "Webkit", "Khtml", "O", "ms"];
                    prop = prop.charAt(0).toUpperCase() + prop.substr(1);
                    var i;
                    for (i = 0; i < vendor.length; i++) {
                        if (typeof styles[vendor[i] + prop] === "string") {
                            return true
                        }
                    }
                    return false
                })(), slideTo = function (idx) {
                    settings.before(idx);
                    if (supportsTransitions) {
                        $slide.removeClass(visibleClass).css(hidden).eq(idx).addClass(visibleClass).css(visible);
                        index = idx;
                        setTimeout(function () {
                            settings.after(idx)
                        }, fadeTime)
                    } else {
                        $slide.stop().fadeOut(fadeTime, function () {
                            $(this).removeClass(visibleClass).css(hidden).css("opacity", 1)
                        }).eq(idx).fadeIn(fadeTime, function () {
                            $(this).addClass(visibleClass).css(visible);
                            settings.after(idx);
                            index = idx
                        })
                    }
                };
            if (settings.random) {
                $slide.sort(function () {
                    return (Math.round(Math.random()) - 0.5)
                });
                $this.empty().append($slide)
            }
            $slide.each(function (i) {
                this.id = slideClassPrefix + i
            });
            $this.addClass(namespace + " " + namespaceIdx);
            if (options && options.maxwidth) {
                $this.css("max-width", maxw)
            }
            $slide.hide().css(hidden).eq(0).addClass(visibleClass).css(visible).show();
            if (supportsTransitions) {
                $slide.show().css({
                    "-webkit-transition": "opacity " + fadeTime + "ms ease-in-out",
                    "-moz-transition": "opacity " + fadeTime + "ms ease-in-out",
                    "-o-transition": "opacity " + fadeTime + "ms ease-in-out",
                    "transition": "opacity " + fadeTime + "ms ease-in-out"
                })
            }
            if ($slide.length > 1) {
                if (waitTime < fadeTime + 100) {
                    return
                }
                if (settings.pager && !settings.manualControls) {
                    var tabMarkup = [];
                    var pagerleft = 0;
                    $slide.each(function (i) {
                        var n = i + 1;
                        pagerleft = pagerleft + 13;
                        tabMarkup += "<li><a href='#' rel='nofollow'>" + n + "</a></li>"
                    });
                    $pager.css('margin-left', '-' + pagerleft + 'px');
                    $pager.append(tabMarkup);
                    if (options.navContainer) {
                        $(settings.navContainer).append($pager)
                    } else {
                        $this.after($pager)
                    }
                }
                if (settings.manualControls) {
                    $pager = $(settings.manualControls);
                    $pager.addClass(namespace + "_tabs")
                }
                if (settings.pager || settings.manualControls) {
                    $pager.find("li").each(function (i) {
                        $(this).addClass(slideClassPrefix + (i + 1))
                    })
                }
                if (settings.pager || settings.manualControls) {
                    $tabs = $pager.find("a");
                    selectTab = function (idx) {
                        $tabs.closest("li").removeClass(activeClass).eq(idx).addClass(activeClass)
                    }
                }
                if (settings.auto) {
                    startCycle = function () {
                        rotate = setInterval(function () {
                            $slide.stop(true, true);
                            var idx = index + 1 < length ? index + 1 : 0;
                            if (settings.pager || settings.manualControls) {
                                selectTab(idx)
                            }
                            slideTo(idx)
                        }, waitTime)
                    };
                    startCycle()
                }
                restartCycle = function () {
                    if (settings.auto) {
                        clearInterval(rotate);
                        startCycle()
                    }
                };
                if (settings.pause) {
                    $this.hover(function () {
                        clearInterval(rotate)
                    }, function () {
                        restartCycle()
                    })
                }
                if (settings.pager || settings.manualControls) {
                    $tabs.bind("click", function (e) {
                        e.preventDefault();
                        if (!settings.pauseControls) {
                            restartCycle()
                        }
                        var idx = $tabs.index(this);
                        if (index === idx || $("." + visibleClass).queue("fx").length) {
                            return
                        }
                        selectTab(idx);
                        slideTo(idx)
                    }).eq(0).closest("li").addClass(activeClass);
                    if (settings.pauseControls) {
                        $tabs.hover(function () {
                            clearInterval(rotate)
                        }, function () {
                            restartCycle()
                        })
                    }
                }
                if (settings.nav) {
                    var navMarkup = "<a href='#' rel='nofollow' class='" + navClass + " rslides_prev'>" + settings.prevText + "</a><a href='#' rel='nofollow' class='" + navClass + " rslides_next'>" + settings.nextText + "</a>";
                    if (options.navContainer) {
                        $(settings.navContainer).append(navMarkup)
                    } else {
                        $this.after(navMarkup)
                    }
                    var $trigger = $("." + namespaceIdx + "_nav"), $prev = $trigger.filter(".prev");
                    $trigger.bind("click", function (e) {
                        e.preventDefault();
                        var $visibleClass = $("." + visibleClass);
                        if ($visibleClass.queue("fx").length) {
                            return
                        }
                        var idx = $slide.index($visibleClass), prevIdx = idx - 1,
                            nextIdx = idx + 1 < length ? index + 1 : 0;
                        slideTo($(this)[0] === $prev[0] ? prevIdx : nextIdx);
                        if (settings.pager || settings.manualControls) {
                            selectTab($(this)[0] === $prev[0] ? prevIdx : nextIdx)
                        }
                        if (!settings.pauseControls) {
                            restartCycle()
                        }
                    });
                    if (settings.pauseControls) {
                        $trigger.hover(function () {
                            clearInterval(rotate)
                        }, function () {
                            restartCycle()
                        })
                    }
                }
            }
            if (typeof document.body.style.maxWidth === "undefined" && options.maxwidth) {
                var widthSupport = function () {
                    $this.css("width", "100%");
                    if ($this.width() > maxw) {
                        $this.css("width", maxw)
                    }
                };
                widthSupport();
                $(window).bind("resize", function () {
                    widthSupport()
                })
            }
        })
    }
})(jQuery, this, 0);
$(function () {
    $("#slider").responsiveSlides({})
});
$("#nav ul li").hover(function () {
    if ($(document).width() > 1023) {
        $(this).addClass("on").find("ul").slideDown("slow")
    }
}, function () {
    if ($(document).width() > 1023) {
        $(this).removeClass("on").find("ul").slideUp()
    }
});
$(document).ready(function () {
    var html = '<i class="icon icon-plus erji"></i>';
    for (i = 0; i < 10; i++) {
        if ($("#nav>ul>li:nth-child(" + i + ")").find("ul")[0] != null) {
            $("#nav>ul>li:nth-child(" + i + ")>a").after(html);
            $("#nav>ul>li:nth-child(" + i + ")>a").addClass("icobfe")
        }
    }
});
$(document).on('click', '.erji', function () {
    $(this).toggleClass("icon-minus").next('ul').slideToggle("slow");
});
$(window).scroll(function () {
    var scrolly = $(document).scrollTop();
    if (scrolly > 50) {
        $("#y-nav-top").fadeIn("slow");
        $("#search").addClass("guidongsearch");
        $("#header-footer").addClass("guidongnav")
    } else {
        $("#y-nav-top").fadeOut("fast");
        $("#search").removeClass("guidongsearch");
        $("#header-footer").removeClass("guidongnav")
    }
});
$("#sousuo,.Ysearch,.searchclose").click(function () {
    $("#search").slideToggle();
    $(".Ysearch").children("i").toggleClass('fa-close');
    $("#sousuo").children("i").toggleClass('fa-close');
})
$(".Ynav,.Ynavclose").click(function () {
    $("#nav").animate({right: parseInt($("#nav").css('right'), 10) == 0 ? $("#nav").outerWidth() : 0});
});
$("#tab li").click(function () {
    $(this).addClass("tabhover").siblings().removeClass("tabhover");
    var index = $("#tab").children().index(this);
    $("#con_one").children().eq(index).fadeIn(300).siblings().hide()
});
$(".cent-xiangguan-title span").click(function () {
    $(this).addClass("tabhover2").siblings().removeClass("tabhover2");
    var index = $(".cent-xiangguan-title").children().index(this);
    $(".cent-xiangguan-ul").children().eq(index).fadeIn(300).siblings().hide()
});
$("#divTags li a,#htagcelan li a,#rtagcelan li a").each(function () {
    $(this).addClass("tags" + Math.floor(Math.random() * 10))
});
$(".article-tag a").each(function () {
    $(this).addClass("tagac" + Math.floor(Math.random() * 10))
});
$("#nav ul li a").each(function () {
    if ($(this).attr("href") == $(".place a:eq(1)").attr("href") || $(this).attr("href") == location.href) {
        //$(this).parent("li").addClass("ons");
        //$(this).parents("li").addClass("ons")
    }
});
$('body').on('click', '.denglu', function () {
    $("body").append("<div id='t-bei'></div>");
    $("#dengdiv").fadeIn("slow");
});
$("body").on("click", "#tcaguan", function () {
    $("#dengdiv").fadeOut("fast");
    $("#t-bei").remove();
});
$("#y-nav-top").click(function () {
    $('body,html').animate({scrollTop: 0}, 1000);
});



function mochu_alert(cents, time) {
    var mochuhtml = '<div style="z-index:9999; padding:10px; top:50%;left:50%;color:#fff;background-color:#666;position:fixed;border-radius:2px;" class="mochu-zan-js"><span style="font-size:16px;font-family:cursive;">' + cents + '</span></div>';
    $('body').append(mochuhtml);
    var mochu_g_msg = $(".mochu-zan-js").width() / 2 * -1;
    $(".mochu-zan-js").css("marginLeft", mochu_g_msg);
    var t = time;
    setTimeout(function () {
        $(".mochu-zan-js").remove();
    }, t);
}

!function (e) {
    e.fn.flexisel = function (t) {
        var n, i, l, a, o = e.extend({
            visibleItems: 4,
            itemsToScroll: 3,
            animationSpeed: 400,
            infinite: !0,
            navigationTargetSelector: null,
            autoPlay: {enable: !1, interval: 5e3, pauseOnHover: !0},
            responsiveBreakpoints: {
                portrait: {changePoint: 480, visibleItems: 1, itemsToScroll: 1},
                landscape: {changePoint: 640, visibleItems: 2, itemsToScroll: 2},
                tablet: {changePoint: 768, visibleItems: 3, itemsToScroll: 3}
            },
            loaded: function () {
            },
            before: function () {
            },
            after: function () {
            }
        }, t), s = e(this), r = e.extend(o, t), c = !0, f = r.visibleItems, d = r.itemsToScroll, u = [], v = {
            init: function () {
                return this.each(function () {
                    v.appendHTML(), v.setEventHandlers(), v.initializeItems()
                })
            }, initializeItems: function () {
                var t = r.responsiveBreakpoints;
                for (var l in t) u.push(t[l]);
                u.sort(function (e, t) {
                    return e.changePoint - t.changePoint
                });
                var a = s.children();
                n = v.getCurrentItemWidth(), i = a.length, a.width(n), s.css({left: -n * (f + 1)}), s.fadeIn(), e(window).trigger("resize"), r.loaded.call(this, s)
            }, appendHTML: function () {
                if (s.addClass("nbs-flexisel-ul"), s.wrap("<div class='nbs-flexisel-container'><div class='nbs-flexisel-inner'></div></div>"), s.find("li").addClass("nbs-flexisel-item"), r.navigationTargetSelector && e(r.navigationTargetSelector).length > 0 ? e("<div class='nbs-flexisel-nav-left'></div><div class='nbs-flexisel-nav-right'></div>").appendTo(r.navigationTargetSelector) : (r.navigationTargetSelector = s.parent(), e("<div class='nbs-flexisel-nav-left'></div><div class='nbs-flexisel-nav-right'></div>").insertAfter(s)), r.infinite) {
                    var t = s.children(), n = t.clone(), i = t.clone();
                    s.prepend(n), s.append(i)
                }
            }, setEventHandlers: function () {
                var t = s.children();
                e(window).on("resize", function (i) {
                    c = !1, clearTimeout(l), l = setTimeout(function () {
                        c = !0, v.calculateDisplay(), n = v.getCurrentItemWidth(), t.width(n), r.infinite ? s.css({left: -n * Math.floor(t.length / 2)}) : (v.clearDisabled(), e(r.navigationTargetSelector).find(".nbs-flexisel-nav-left").addClass("disabled"), s.css({left: 0}))
                    }, 100)
                }), e(r.navigationTargetSelector).find(".nbs-flexisel-nav-left").on("click", function (e) {
                    v.scroll(!0)
                }), e(r.navigationTargetSelector).find(".nbs-flexisel-nav-right").on("click", function (e) {
                    v.scroll(!1)
                }), r.autoPlay.enable && (v.setAutoplayInterval(), r.autoPlay.pauseOnHover === !0 && s.on({
                    mouseenter: function () {
                        c = !1
                    }, mouseleave: function () {
                        c = !0
                    }
                })), s[0].addEventListener("touchstart", v.touchHandler.handleTouchStart, !1), s[0].addEventListener("touchmove", v.touchHandler.handleTouchMove, !1)
            }, calculateDisplay: function () {
                var t = e("html").width(), n = u[u.length - 1].changePoint;
                for (var i in u) {
                    if (t >= n) {
                        f = r.visibleItems, d = r.itemsToScroll;
                        break
                    }
                    if (t < u[i].changePoint) {
                        f = u[i].visibleItems, d = u[i].itemsToScroll;
                        break
                    }
                }
            }, scroll: function (e) {
                if ("undefined" == typeof e && (e = !0), 1 == c) {
                    if (c = !1, r.before.call(this, s), n = v.getCurrentItemWidth(), r.autoPlay.enable && clearInterval(a), r.infinite) s.animate({left: e ? "+=" + n * d : "-=" + n * d}, r.animationSpeed, function () {
                        r.after.call(this, s), c = !0, e ? v.offsetItemsToBeginning(d) : v.offsetItemsToEnd(d), v.offsetSliderPosition(e)
                    }); else {
                        var t = n * d;
                        e ? s.animate({left: v.calculateNonInfiniteLeftScroll(t)}, r.animationSpeed, function () {
                            r.after.call(this, s), c = !0
                        }) : s.animate({left: v.calculateNonInfiniteRightScroll(t)}, r.animationSpeed, function () {
                            r.after.call(this, s), c = !0
                        })
                    }
                    r.autoPlay.enable && v.setAutoplayInterval()
                }
            }, touchHandler: {
                xDown: null, yDown: null, handleTouchStart: function (e) {
                    this.xDown = e.touches[0].clientX, this.yDown = e.touches[0].clientY
                }, handleTouchMove: function (e) {
                    if (this.xDown && this.yDown) {
                        var t = e.touches[0].clientX, n = e.touches[0].clientY, i = this.xDown - t;
                        this.yDown - n;
                        Math.abs(i) > 0 && (i > 0 ? v.scroll(!1) : v.scroll(!0)), this.xDown = null, this.yDown = null, c = !0
                    }
                }
            }, getCurrentItemWidth: function () {
                return s.parent().width() / f
            }, offsetItemsToBeginning: function (e) {
                "undefined" == typeof e && (e = 1);
                for (var t = 0; t < e; t++) s.children().last().insertBefore(s.children().first())
            }, offsetItemsToEnd: function (e) {
                "undefined" == typeof e && (e = 1);
                for (var t = 0; t < e; t++) s.children().first().insertAfter(s.children().last())
            }, offsetSliderPosition: function (e) {
                var t = parseInt(s.css("left").replace("px", ""));
                e ? t -= n * d : t += n * d, s.css({left: t})
            }, getOffsetPosition: function () {
                return parseInt(s.css("left").replace("px", ""))
            }, calculateNonInfiniteLeftScroll: function (t) {
                return v.clearDisabled(), v.getOffsetPosition() + t >= 0 ? (e(r.navigationTargetSelector).find(".nbs-flexisel-nav-left").addClass("disabled"), 0) : v.getOffsetPosition() + t
            }, calculateNonInfiniteRightScroll: function (t) {
                v.clearDisabled();
                var l = i * n - f * n;
                return v.getOffsetPosition() - t <= -l ? (e(r.navigationTargetSelector).find(".nbs-flexisel-nav-right").addClass("disabled"), -l) : v.getOffsetPosition() - t
            }, setAutoplayInterval: function () {
                a = setInterval(function () {
                    c && v.scroll(!1)
                }, r.autoPlay.interval)
            }, clearDisabled: function () {
                var t = e(r.navigationTargetSelector);
                t.find(".nbs-flexisel-nav-left").removeClass("disabled"), t.find(".nbs-flexisel-nav-right").removeClass("disabled")
            }
        };
        return v[t] ? v[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error('Method "' + method + '" does not exist in flexisel plugin!') : v.init.apply(this)
    }
}(jQuery);


(function ($) {
    $.fn.theiaStickySidebar = function (options) {
        var defaults = {
            'containerSelector': '',
            'additionalMarginTop': 0,
            'additionalMarginBottom': 0,
            'updateSidebarHeight': true,
            'minWidth': 0,
            'disableOnResponsiveLayouts': true,
            'sidebarBehavior': 'modern',
            'defaultPosition': 'relative',
            'namespace': 'TSS'
        };
        options = $.extend(defaults, options);
        options.additionalMarginTop = parseInt(options.additionalMarginTop) || 0;
        options.additionalMarginBottom = parseInt(options.additionalMarginBottom) || 0;
        tryInitOrHookIntoEvents(options, this);

        function tryInitOrHookIntoEvents(options, $that) {
            var success = tryInit(options, $that);
            if (!success) {
                console.log('TSS: Body width smaller than options.minWidth. Init is delayed.');
                $(document).on('scroll.' + options.namespace, function (options, $that) {
                    return function (evt) {
                        var success = tryInit(options, $that);
                        if (success) {
                            $(this).unbind(evt)
                        }
                    }
                }(options, $that));
                $(window).on('resize.' + options.namespace, function (options, $that) {
                    return function (evt) {
                        var success = tryInit(options, $that);
                        if (success) {
                            $(this).unbind(evt)
                        }
                    }
                }(options, $that))
            }
        }

        function tryInit(options, $that) {
            if (options.initialized === true) {
                return true
            }
            if ($('body').width() < options.minWidth) {
                return false
            }
            init(options, $that);
            return true
        }

        function init(options, $that) {
            options.initialized = true;
            var existingStylesheet = $('#theia-sticky-sidebar-stylesheet-' + options.namespace);
            if (existingStylesheet.length === 0) {
                $('head').append($('<style id="theia-sticky-sidebar-stylesheet-' + options.namespace + '">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'))
            }
            $that.each(function () {
                var o = {};
                o.sidebar = $(this);
                o.options = options || {};
                o.container = $(o.options.containerSelector);
                if (o.container.length == 0) {
                    o.container = o.sidebar.parent()
                }
                o.sidebar.parents().css('-webkit-transform', 'none');
                o.sidebar.css({
                    'position': o.options.defaultPosition,
                    'overflow': 'visible',
                    '-webkit-box-sizing': 'border-box',
                    '-moz-box-sizing': 'border-box',
                    'box-sizing': 'border-box'
                });
                o.stickySidebar = o.sidebar.find('.theiaStickySidebar');
                if (o.stickySidebar.length == 0) {
                    var javaScriptMIMETypes = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
                    o.sidebar.find('script').filter(function (index, script) {
                        return script.type.length === 0 || script.type.match(javaScriptMIMETypes)
                    }).remove();
                    o.stickySidebar = $('<div>').addClass('theiaStickySidebar').append(o.sidebar.children());
                    o.sidebar.append(o.stickySidebar)
                }
                o.marginBottom = parseInt(o.sidebar.css('margin-bottom'));
                o.paddingTop = parseInt(o.sidebar.css('padding-top'));
                o.paddingBottom = parseInt(o.sidebar.css('padding-bottom'));
                var collapsedTopHeight = o.stickySidebar.offset().top;
                var collapsedBottomHeight = o.stickySidebar.outerHeight();
                o.stickySidebar.css('padding-top', 1);
                o.stickySidebar.css('padding-bottom', 1);
                collapsedTopHeight -= o.stickySidebar.offset().top;
                collapsedBottomHeight = o.stickySidebar.outerHeight() - collapsedBottomHeight - collapsedTopHeight;
                if (collapsedTopHeight == 0) {
                    o.stickySidebar.css('padding-top', 0);
                    o.stickySidebarPaddingTop = 0
                } else {
                    o.stickySidebarPaddingTop = 1
                }
                if (collapsedBottomHeight == 0) {
                    o.stickySidebar.css('padding-bottom', 0);
                    o.stickySidebarPaddingBottom = 0
                } else {
                    o.stickySidebarPaddingBottom = 1
                }
                o.previousScrollTop = null;
                o.fixedScrollTop = 0;
                resetSidebar();
                o.onScroll = function (o) {
                    if (!o.stickySidebar.is(":visible")) {
                        return
                    }
                    if ($('body').width() < o.options.minWidth) {
                        resetSidebar();
                        return
                    }
                    if (o.options.disableOnResponsiveLayouts) {
                        var sidebarWidth = o.sidebar.outerWidth(o.sidebar.css('float') == 'none');
                        if (sidebarWidth + 50 > o.container.width()) {
                            resetSidebar();
                            return
                        }
                    }
                    var scrollTop = $(document).scrollTop();
                    var position = 'static';
                    if (scrollTop >= o.sidebar.offset().top + (o.paddingTop - o.options.additionalMarginTop)) {
                        var offsetTop = o.paddingTop + options.additionalMarginTop;
                        var offsetBottom = o.paddingBottom + o.marginBottom + options.additionalMarginBottom;
                        var containerTop = o.sidebar.offset().top;
                        var containerBottom = o.sidebar.offset().top + getClearedHeight(o.container);
                        var windowOffsetTop = 0 + options.additionalMarginTop;
                        var windowOffsetBottom;
                        var sidebarSmallerThanWindow = (o.stickySidebar.outerHeight() + offsetTop + offsetBottom) < $(window).height();
                        if (sidebarSmallerThanWindow) {
                            windowOffsetBottom = windowOffsetTop + o.stickySidebar.outerHeight()
                        } else {
                            windowOffsetBottom = $(window).height() - o.marginBottom - o.paddingBottom - options.additionalMarginBottom
                        }
                        var staticLimitTop = containerTop - scrollTop + o.paddingTop;
                        var staticLimitBottom = containerBottom - scrollTop - o.paddingBottom - o.marginBottom;
                        var top = o.stickySidebar.offset().top - scrollTop;
                        var scrollTopDiff = o.previousScrollTop - scrollTop;
                        if (o.stickySidebar.css('position') == 'fixed') {
                            if (o.options.sidebarBehavior == 'modern') {
                                top += scrollTopDiff
                            }
                        }
                        if (o.options.sidebarBehavior == 'stick-to-top') {
                            top = options.additionalMarginTop
                        }
                        if (o.options.sidebarBehavior == 'stick-to-bottom') {
                            top = windowOffsetBottom - o.stickySidebar.outerHeight()
                        }
                        if (scrollTopDiff > 0) {
                            top = Math.min(top, windowOffsetTop)
                        } else {
                            top = Math.max(top, windowOffsetBottom - o.stickySidebar.outerHeight())
                        }
                        top = Math.max(top, staticLimitTop);
                        top = Math.min(top, staticLimitBottom - o.stickySidebar.outerHeight());
                        var sidebarSameHeightAsContainer = o.container.height() == o.stickySidebar.outerHeight();
                        if (!sidebarSameHeightAsContainer && top == windowOffsetTop) {
                            position = 'fixed'
                        } else if (!sidebarSameHeightAsContainer && top == windowOffsetBottom - o.stickySidebar.outerHeight()) {
                            position = 'fixed'
                        } else if (scrollTop + top - o.sidebar.offset().top - o.paddingTop <= options.additionalMarginTop) {
                            position = 'static'
                        } else {
                            position = 'absolute'
                        }
                    }
                    if (position == 'fixed') {
                        var scrollLeft = $(document).scrollLeft();
                        o.stickySidebar.css({
                            'position': 'fixed',
                            'width': getWidthForObject(o.stickySidebar) + 'px',
                            'transform': 'translateY(' + top + 'px)',
                            'left': (o.sidebar.offset().left + parseInt(o.sidebar.css('padding-left')) - scrollLeft) + 'px',
                            'top': '0px'
                        })
                    } else if (position == 'absolute') {
                        var css = {};
                        if (o.stickySidebar.css('position') != 'absolute') {
                            css.position = 'absolute';
                            css.transform = 'translateY(' + (scrollTop + top - o.sidebar.offset().top - o.stickySidebarPaddingTop - o.stickySidebarPaddingBottom) + 'px)';
                            css.top = '0px'
                        }
                        css.width = getWidthForObject(o.stickySidebar) + 'px';
                        css.left = '';
                        o.stickySidebar.css(css)
                    } else if (position == 'static') {
                        resetSidebar()
                    }
                    if (position != 'static') {
                        if (o.options.updateSidebarHeight == true) {
                            o.sidebar.css({'min-height': o.stickySidebar.outerHeight() + o.stickySidebar.offset().top - o.sidebar.offset().top + o.paddingBottom})
                        }
                    }
                    o.previousScrollTop = scrollTop
                };
                o.onScroll(o);
                $(document).on('scroll.' + o.options.namespace, function (o) {
                    return function () {
                        o.onScroll(o)
                    }
                }(o));
                $(window).on('resize.' + o.options.namespace, function (o) {
                    return function () {
                        o.stickySidebar.css({'position': 'static'});
                        o.onScroll(o)
                    }
                }(o));
                if (typeof ResizeSensor !== 'undefined') {
                    new ResizeSensor(o.stickySidebar[0], function (o) {
                        return function () {
                            o.onScroll(o)
                        }
                    }(o))
                }

                function resetSidebar() {
                    o.fixedScrollTop = 0;
                    o.sidebar.css({'min-height': '1px'});
                    o.stickySidebar.css({'position': 'static', 'width': '', 'transform': 'none'})
                }

                function getClearedHeight(e) {
                    var height = e.height();
                    e.children().each(function () {
                        height = Math.max(height, $(this).height())
                    });
                    return height
                }
            })
        }

        function getWidthForObject(object) {
            var width;
            try {
                width = object[0].getBoundingClientRect().width
            } catch (err) {
            }
            if (typeof width === "undefined") {
                width = object.width()
            }
            return width
        }

        return this
    }
})(jQuery);


function copyCnblogsCode(n) {
    var i = $(n).prev().first().first();
    var u = i.text();
    var t = document.createElement("textarea"), r;
    $(t).val(u);
    $(t).css("width", $(i).width());
    r = $(i).height() * 0.8;
    r > 600 && (r = 600);
    r < 150 && (r = 150);
    $(t).css("height", r);
    $(t).css("font-family", "宋体");
    $(t).css("font-size", "14px");
    $(t).css("line-height", "1.5");
    $(i).html(t);
    $(t).select();
    $("<div class='ctrlc'>按 Ctrl+C 复制代码</div>").insertBefore($(t));
    $(n).hide()
};
$("#ksaomiao").click(function () {
    $("body").append("<div id='t-bei'></div>");
    $("#sanmiao").fadeIn("slow")
});
$("#saoguan").click(function () {
    $("#sanmiao").fadeOut("fast");
    $("#t-bei").remove()
});
$("#kdashang").click(function () {
    $("body").append("<div id='t-bei'></div>");
    $("#dashang").fadeIn("slow")
});
$("#tca").click(function () {
    $("#dashang").fadeOut("fast");
    $("#t-bei").remove()
});
$("#kfeixiang").click(function () {
    $("body").append("<div id='t-bei'></div>");
    $("#fenxiang").fadeIn("slow")
});
$("#fenguan").click(function () {
    $("#fenxiang").fadeOut("fast");
    $("#t-bei").remove()
});
$(".ds-payment-way").bind("click", function () {
    $(".qrcode-img").hide();
    $(".qrCode_" + $(".ds-payment-way").find("input[name=reward-way]:checked").val()).show()
});
$(".mochu-zan").click(function () {
    var $postid = $(this).attr("data-postid");
    if ($postid < 1) {
        mochu_alert("不要捣乱 ^(oo)^", 2000);
        return false
    }
    //$.post(bloghost + '', {'id': $postid,}, function (data) {
        //var s = data;
        //if (s == 'no') {
        //    mochu_alert("你已经点过赞啦 (¯^¯ )", 2000)
       // } else {
            $(".zan-" + $postid).html("<i class='icon iconzan'></i>" + s + "人赞");
            mochu_alert("你已成功点赞 ^_^", 2000)
       // }
    //})
});
$('body').on('blur', '#inpQQ', function () {
    mochu_alert("正在获取QQ资料...", 1000);
    $.getJSON(bloghost + '/zb_users/theme/Mochu_Feiniao/function.php?type=inputqq&qq=' + $('#inpQQ').val() + '&callback=?', function (q) {
        if (q.name) {
            mochu_alert("QQ资料获取成功...", 1000);
            $('#inpName').val(q.name);
            $('#inpEmail').val($('#inpQQ').val() + '@qq.com');
            $('#inpQQ').attr("disabled", "disabled")
        } else {
            mochu_alert("获取资料失败！", 2000)
        }
    })
});
var mochu_pinglun = false;
$("#sumbitping").click(function () {
    if (mochu_pinglun == false) {
        mochu_alert("请解开封印后再提交 (∩＿∩)", 2000);
        return false;
    }
});
$(".zitidaxiao").click(function () {
    var s = $(this).attr("date-szie");
    var f = parseInt($(".article-text").css("font-size"));
    if (s == 1) {
        if (f > 14) {
            $(".article-text").css("font-size", f - 1);
            for (i = 2; i < 5; i++) {
                $(".article-text h" + i).css({
                    "font-size": parseInt($(".article-text h" + i).css("font-size")) - 1,
                    "line-height": (parseInt($(".article-text h" + i).css("font-size")) - 1) + "px"
                })
            }
        }
    }
    if (s == 2) {
        $(".article-text").css("font-size", 15);
        $(".article-text h2").css({"font-size": "20px", "line-height": "20px"});
        $(".article-text h3").css({"font-size": "18px", "line-height": "18px"});
        $(".article-text h4").css({"font-size": "15px", "line-height": "15px"})
    }
    if (s == 3) {
        $(".article-text").css("font-size", f + 1);
        for (i = 2; i < 5; i++) {
            $(".article-text h" + i).css({
                "font-size": parseInt($(".article-text h" + i).css("font-size")) + 1,
                "line-height": (parseInt($(".article-text h" + i).css("font-size")) + 1) + "px"
            })
        }
    }
});
var sii = 0;
$("#article-text img").each(function () {
    sii = sii + 1;
    var url = $(this).attr("src");
    $(this).attr("data-source", url);
    $(this).attr("class", "js-lightbox");
    $(this).attr("data-group", "group-1");
    $(this).attr("data-id", sii);
});
(function ($) {
    var LightBox = function (settings) {
        var self = this;
        this.settings = {speed: 'fast', maxWidth: 900, maxHeight: 600};
        $.extend(this.settings, settings || {});
        this.popupMask = $('<div id="G-lightbox-mask">');
        this.popupWin = $('<div id="G-lightbox-popup">');
        this.bodyNode = $(document.body);
        this.renderDOM();
        this.picViewArea = this.popupWin.find('div.lightbox-pic-view');
        this.popupPic = this.popupWin.find('img.lightbox-image');
        this.picCaptionArea = this.popupWin.find('div.lightbox-pic-caption');
        this.nextBtn = this.popupWin.find('span.lightbox-next-btn');
        this.prevBtn = this.popupWin.find('span.lightbox-prev-btn');
        this.closeBtn = this.popupWin.find('span.lightbox-close-btn');
        this.groupName = null;
        this.groupData = [];
        this.bodyNode.delegate('.js-lightbox,*[data-role=lightbox]', 'click', function (e) {
            e.stopPropagation();
            var currentGroupName = $(this).attr('data-group');
            if (currentGroupName != self.groupName) {
                self.groupName = currentGroupName;
                self.getGroup()
            }
            ;self.initPopup($(this))
        });
        this.popupMask.click(function () {
            $(this).fadeOut();
            self.popupWin.fadeOut();
            self.clear = false
        });
        this.closeBtn.click(function () {
            self.popupMask.fadeOut();
            self.popupWin.fadeOut();
            self.clear = false
        });
        this.flag = true;
        this.nextBtn.hover(function () {
            if (!$(this).hasClass('disabled') && self.groupData.length > 1) {
                $(this).addClass('lightbox-next-btn-show')
            }
        }, function () {
            if (!$(this).hasClass('disabled') && self.groupData.length > 1) {
                $(this).removeClass('lightbox-next-btn-show')
            }
        }).click(function (e) {
            if (!$(this).hasClass('disabled') && self.flag && self.groupData.length > 1) {
                self.flag = false;
                e.stopPropagation();
                self.goto('next')
            }
        });
        this.prevBtn.hover(function () {
            if (!$(this).hasClass('disabled') && self.groupData.length > 1) {
                $(this).addClass('lightbox-prev-btn-show')
            }
        }, function () {
            if (!$(this).hasClass('disabled') && self.groupData.length > 1) {
                $(this).removeClass('lightbox-prev-btn-show')
            }
        }).click(function (e) {
            if (!$(this).hasClass('disabled') && self.flag && self.groupData.length > 1) {
                self.flag = false;
                e.stopPropagation();
                self.goto('prev')
            }
        });
        this.isIE6 = /MSIE 6.0/gi.test(window.navigator.userAgent);
        var timer = null;
        $(window).resize(function () {
            if (self.clear) {
                window.clearTimeout(timer);
                timer = window.setTimeout(function () {
                    self.loadPicSize(self.groupData[self.index].src)
                }, 500);
                if (self.isIE6) {
                    self.popupMask.css({windth: $(window).width(), height: $(window).height()})
                }
            }
        }).keyup(function (e) {
            var keyValue = e.which;
            if (self.clear) {
                if (keyValue == 38 || keyValue == 37) {
                    self.prevBtn.click()
                } else if (keyValue == 40 || keyValue == 39) {
                    self.nextBtn.click()
                }
            }
        });
        if (this.isIE6) {
            $(window).scroll(function () {
                self.popupMask.css('top', $(window).scrollTop())
            })
        }
    };
    LightBox.prototype = {
        goto: function (dir) {
            if (dir === 'next') {
                this.index++;
                if (this.index >= this.groupData.length - 1) {
                    this.nextBtn.addClass('disabled').removeClass('lightbox-next-btn-show').addClass('disablednext')
                }
                if (this.index != 0) {
                    this.prevBtn.removeClass('disabled').removeClass('disabledprev')
                }
                var src = this.groupData[this.index].src;
                this.loadPicSize(src)
            } else if (dir === 'prev') {
                this.index--;
                if (this.index <= 0) {
                    this.prevBtn.addClass('disabledprev').removeClass('lightbox-prev-btn-show').addClass('disabled')
                }
                ;
                if (this.index != this.groupData.length - 1) {
                    this.nextBtn.removeClass('disablednext').removeClass('disabled')
                }
                ;var src = this.groupData[this.index].src;
                this.loadPicSize(src)
            }
        }, loadPicSize: function (sourceSrc) {
            var self = this;
            self.popupPic.css({width: 'auto', height: 'auto'}).hide();
            this.picCaptionArea.hide();
            this.preLoadImg(sourceSrc, function () {
                self.popupPic.attr('src', sourceSrc);
                var picWidth = self.popupPic.width();
                var picHeight = self.popupPic.height();
                self.changePic(picWidth, picHeight)
            })
        }, changePic: function (width, height) {
            var self = this;
            var winWidth = $(window).width();
            var winHeight = $(window).height();
            var scale = Math.min(winWidth / (width + 10), winHeight / (height + 10), 1);
            width = width * scale;
            height = height * scale;
            this.picViewArea.animate({width: width - 10, height: height - 10}, self.settings.speed);
            var top = (winHeight - height) / 2;
            if (this.isIE6) {
                top += $(window).scrollTop()
            }
            this.popupWin.animate({
                width: width - 10,
                height: height - 10,
                marginLeft: -(width / 2),
                top: top
            }, self.settings.speed, function () {
                self.popupPic.css({width: width - 10, height: height - 10}).fadeIn();
                self.picCaptionArea.fadeIn();
                self.flag = true;
                self.clear = true
            })
        }, preLoadImg: function (src, callback) {
            var img = new Image();
            if (!!window.ActiveXObject) {
                img.onreadystatechange = function () {
                    if (this.readyState == 'complete') {
                        callback()
                    }
                }
            } else {
                img.onload = function () {
                    callback()
                }
            }
            img.src = src
        }, showMaskAndPopup: function (sourceSrc, currentId) {
            var self = this;
            this.popupPic.hide();
            this.picCaptionArea.hide();
            var winWidth = $(window).width();
            var winHeight = $(window).height();
            this.picViewArea.css({width: winWidth / 2, height: winHeight / 2});
            if (this.isIE6) {
                var scrollTop = $(window).scrollTop();
                this.popupMask.css({width: winWidth, height: winHeight, top: scrollTop})
            }
            this.popupMask.fadeIn();
            this.popupWin.fadeIn();
            var viewHeight = winHeight / 2 + 10;
            var topAnimate = (winHeight - viewHeight) / 2;
            this.popupWin.css({
                width: winWidth / 2 + 20,
                height: winHeight / 2 + 50,
                marginLeft: -(winWidth / 2 + 10) / 2,
                top: (this.isIE6 ? -(winHeight + scrollTop) : -viewHeight)
            }).animate({top: (this.isIE6 ? (topAnimate + scrollTop) : topAnimate)}, self.settings.speed, function () {
                self.loadPicSize(sourceSrc)
            });
            this.index = this.getIndexOf(currentId);
            var groupDataLength = this.groupData.length;
            if (groupDataLength > 1) {
                if (this.index === 0) {
                    this.prevBtn.addClass('disabled').addClass('disabledprev');
                    this.nextBtn.removeClass('disabled').removeClass('disablednext')
                } else if (this.index === groupDataLength - 1) {
                    this.nextBtn.addClass('disabled').addClass('disablednext');
                    this.prevBtn.removeClass('disabled').removeClass('disabledprev')
                } else {
                    this.nextBtn.removeClass('disabled').removeClass('disablednext');
                    this.prevBtn.removeClass('disabled').removeClass('disabledprev')
                }
            } else {
                this.prevBtn.addClass('disabled');
                this.nextBtn.addClass('disabled')
            }
        }, getIndexOf: function (currentId) {
            var index = 0;
            $(this.groupData).each(function (i) {
                index = i;
                if (this.id === currentId) {
                    return false
                }
            });
            return index
        }, initPopup: function (currentObj) {
            var self = this;
            sourceSrc = currentObj.attr('data-source');
            currentId = currentObj.attr('data-id');
            this.showMaskAndPopup(sourceSrc, currentId)
        }, getGroup: function () {
            var self = this;
            var groupList = this.bodyNode.find('*[data-group=' + this.groupName + ']');
            self.groupData.length = 0;
            groupList.each(function () {
                self.groupData.push({
                    src: $(this).attr('data-source'),
                    id: $(this).attr('data-id'),
                    caption: $(this).attr('data-caption')
                })
            })
        }, renderDOM: function () {
            var strDom = '<div class="lightbox-pic-view"><span class="linhtbox-butleft"><span  class=" lightbox-btn lightbox-prev-btn lightbox-prev-btn-show"></span><span class=" lightbox-btn lightbox-next-btn lightbox-next-btn-show"></span></span><span class="lightbox-btn lightbox-close-btn"></span><img src="" alt="" class="lightbox-image" width="100%"/></div>';
            this.popupWin.html(strDom);
            this.bodyNode.append(this.popupMask, this.popupWin)
        }
    };
    window['LightBox'] = LightBox
})(jQuery);
$('body').on('click', '.disablednext', function () {
    mochu_alert("最后一张了，再点打你....", 3000)
});
$('body').on('click', '.disabledprev', function () {
    mochu_alert("已经是第一张了，不能再点了....", 3000)
});
$(function () {
    var lightbox = new LightBox({speed: 'fast', maxWidth: 900, maxHeight: 600})
});
slide();

function slide() {
    var slideBox = $('body #slide_box')[0];
    if (!slideBox) {
        return false;
    }
    var btn = $('body #btn')[0];
    var slideBoxWidth = slideBox.offsetWidth;
    var btnWidth = btn.offsetWidth;
    $('body').on('mousedown', '#btn', function (e) {
        var disX = e.clientX - btn.offsetLeft;
        $(document).mousemove(function (e) {
            var objX = e.clientX - disX + btnWidth;
            if (objX < btnWidth) {
                objX = btnWidth
            }
            if (objX > slideBoxWidth) {
                objX = slideBoxWidth
            }
            $('body #slide_xbox').width(objX + 'px')
        });
        $(document).mouseup(function (e) {
            var objX = e.clientX - disX + btnWidth;
            if (objX < slideBoxWidth) {
                objX = btnWidth
            } else {
                objX = slideBoxWidth;
                $('body #slide_xbox').html('封印已解<div class="btn">&radic;</div>');
                mochu_pinglun = true;
                $("body #sumbitping").attr("onclick", "return zbp.comment.post()").addClass("buttons")
            }
            $('body #slide_xbox').width(objX + 'px');
            $(document).off('mousemove');
            $(document).off('mouseup')
        })
    });
    var startX = 0;
    var sX = 0;
    var moveX = 0;
    var leftX = 0;
    $("body").on("touchstart", "#btn", function (e) {
        startX = e.originalEvent.touches[0].pageX;
        sX = $(this).offset().left;
        leftX = startX - sX
    });
    $("body").on("touchmove", "#btn", function (e) {
        e.preventDefault();
        moveX = e.originalEvent.touches[0].pageX;
        var objX = moveX - leftX + btnWidth;
        if (objX < btnWidth) {
            objX = btnWidth
        }
        if (objX > slideBoxWidth) {
            objX = slideBoxWidth
        }
        $('body #slide_xbox').width(objX + 'px')
    });
    $("body").on("touchend", "#btn", function (e) {
        var objX = moveX - leftX + btnWidth;
        if (objX < slideBoxWidth) {
            objX = btnWidth
        } else {
            objX = slideBoxWidth;
            $('body #slide_xbox').html('封印已解<div class="btn">&radic;</div>');
            mochu_pinglun = true;
            $("body #sumbitping").attr("onclick", "return zbp.comment.post()").addClass("buttons")
        }
        $('body #slide_xbox').width(objX + 'px')
    })
}
//简单返回顶部
$(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
        $("#backTop").fadeIn(400);//当滑动栏向下滑动时，按钮渐现的时间
    } else {
        $("#backTop").fadeOut(200);//当页面回到顶部第一屏时，按钮渐隐的时间
    }
});

$(function () {
    // 生成二维码
    $('.qrcodeImg').each(function () {
        var url = 'https:' + $(this).attr('url');
        var id = $(this).attr('id');
        makeQRCode(id, url, 114, 114);
        $(this).removeAttr('title');
    });
    //二维码图片
    function makeQRCode(codes, url, width, height) {
        var qrcode = new QRCode(codes, {
            width: width,
            height: height
        });
        qrcode.makeCode(url);
    }

    $("#backTop").click(function () {
        $('html,body').animate({
            scrollTop : '0px'
        }, 200);
    });

  $(".foot_about").append('<div class="foot_txt"><a href="https://beian.miit.gov.cn/" target="_blank">桂ICP备18004272号-3</a></div>');
});

jQuery(function($) {
	var st = 180;
	$('#eweima>li').mouseenter(function() {
		$(this).find('ul').stop(false, true).slideDown(st);
	}).mouseleave(function() {
		$(this).find('ul').stop(false, true).slideUp(st);
	});
	try {
		if ($('#qs').qrcode && typeof($('#qs').qrcode) == 'function') {
			$('#qs').qrcode({
				text: window.location.href,
				width: 103,
				height: 103
			});
		}
	} catch (e) {}
	$(function() {
		$('.hd li').click(function() {
			console.log(1);
			$(this).addClass('on').siblings().removeClass('on');
			$('.bd>div:eq(' + $(this).index() + ')').show().siblings().hide();
			var LIclass = $(".hd li").eq(2).attr("class");
			if (LIclass == "on") {
				function slide(N) { /*轮播图*/
					var num = 0;
					var length = $(".slideList li").length;
					var shuW = $(".slideList li").eq(0).width() + 10;
					var hengW = $(".apkdb_02li").eq(0).width() + 70;
					var w;
					console.log(length);

					if (shuW > hengW) {
						w = shuW;
					} else {
						w = hengW;
					}
					$(".slideBox .btn2").click(function() {
						num += N;
						if (num >= length - N) {
							num = length - N;
						}
						$(".slideList").animate({
							left: -num * w + "px"
						}, 700);
					});
					$(".slideBox .btn1").click(function() {
						num -= N;
						if (num <= 0) {
							num = 0;
						}
						$(".slideList").animate({
							left: -num * w + "px"
						}, 700);
					});


					$(".slideBox .btn").mouseover(function() {
						$(this).addClass("ac").siblings().removeClass("ac");
					});
				};

				var picW = $(".slideList li").eq(0).find("img").width();
				console.log(picW);
				if (picW > 400) {
					slide(1);
				} else {
					slide(2);
				}
			};
		})
	})
});

jQuery(".slideBox").slide({
	mainCell: "ul",
	vis: 3,
	prevCell: ".sPrev",
	nextCell: ".sNext",
	effect: "leftLoop"
});
/* 外层tab切换 */
jQuery(".slideGroup").slide({
	titCell: ".parHd li",
	mainCell: ".parBd"
});
/*选项卡*/
jQuery(".tab").slide();
jQuery(".tabs").slide();
jQuery(".game13").slide();
jQuery(".txtboxe").slide();
jQuery(".tab-box").slide(); /*图片轮播*/
jQuery(".slidebox").slide({
	mainCell: ".bd ul",
	autoPlay: true
});
/*图片滚动*/
/* 内层图片滚动切换 */
jQuery(".slideGroup .slideBox").slide({
	mainCell: "ul",
	vis: 10,
	prevCell: ".sPrev",
	nextCell: ".sNext",
	effect: "leftLoop"
});
/* 外层tab切换 */
jQuery(".slideGroup").slide({
	titCell: ".parHd li",
	mainCell: ".parBd"
});

jQuery(".picScroll-left").slide({
	titCell: ".hd ul",
	mainCell: ".bd ul",
	autoPage: true,
	effect: "left",
	autoPlay: true,
	vis: 5,
	trigger: "click"
});
/*滚动*/
jQuery(".carousel").slide({
	titCell: ".hds ul",
	mainCell: ".bds ul",
	autoPage: true,
	effect: "left",
	vis: 3,
	easing: "easeOutCirc"
});
/*轮播*/
jQuery(".carousels").slide({
	titCell: ".hd1 ul",
	mainCell: ".bd1 ul",
	autoPage: true,
	effect: "left",
	vis: 3,
	easing: "easeOutCirc"
});
/*风车*/
jQuery(".sidemenu").slide({
	titCell: "h3",
	//鼠标触发对象
	targetCell: "div",
	//与titCell一一对应，第n个titCell控制第n个targetCell的显示隐藏
	effect: "slideDown",
	//targetCell下拉效果
	delayTime: 300,
	//效果时间
	triggerTime: 150,
	//鼠标延迟触发时间（默认150）
	defaultPlay: true,
	//默认是否执行效果（默认true）
	returnDefault: true //鼠标从.sideMen移走后返回默认状态（默认false）
});
