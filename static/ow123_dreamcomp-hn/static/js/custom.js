function RevertComment(g) {
    $("#inpRevID").val(g);
    var C = $("#comt-respond"),
    e = $("#cancel-reply"),
    H = $("#temp-frm");
    var c = document.createElement("div");
    c.id = "temp-frm";
    c.style.display = "none";
    C.before(c);
    $("#AjaxComment" + g).before(C);
    C.addClass("");
    e.show();
    e.click(function() {
        $("#inpRevID").val(0);
        var g = $("#temp-frm"),
        C = $("#comt-respond");
        if (!g.length || !C.length) return;
        g.before(C);
        g.remove();
        $(this).hide();
        C.removeClass("");
        $(".commentlist").before(C);
        return false
    });
    try {
        $("#txaArticle").focus()
    } catch(g) {}
    return false
}
function GetComments(g, C) {
    $("span.commentspage").html("Waiting...");
    $.get(bloghost + "zb_system/cmd.php?act=getcmt&postid=" + g + "&page=" + C,
    function(g) {
        $("#AjaxCommentBegin").nextUntil("#AjaxCommentEnd").remove();
        $("#AjaxCommentEnd").before(g);
        $("#cancel-reply").click()
    })
}
function CommentComplete() {
    $("#cancel-reply").click()
} (function(g, C) {
    g(function() {
        var C = g("#cundang"),
        e = g(".al_mon_list.item h3", C),
        H = g(".al_post_list", C),
        c = g(".al_post_list:first,.al_mon_list.item:nth-child(2) ul.al_post_list", C);
        H.hide();
        c.show();
        e.css("cursor", "pointer").on("click",
        function() {
            g(this).next().slideToggle(0)
        });
        var T = function(g, C, e) {
            if (g > H.length) {
                return
            }
            if (C == "up") {
                H.eq(g).slideUp(e,
                function() {
                    T(g + 1, C, e - 10 < 1 ? 0 : e - 10)
                })
            } else {
                H.eq(g).slideDown(e,
                function() {
                    T(g + 1, C, e - 10 < 1 ? 0 : e - 10)
                })
            }
        };
        g("#al_expand_collapse").on("click",
        function(C) {
            C.preventDefault();
            if (g(this).data("s")) {
                g(this).data("s", "");
                T(0, "up", 300)
            } else {
                g(this).data("s", 1);
                T(0, "down", 300)
            }
        })
    })
})(jQuery, window); (function(g) {
    g.fn.lazyload = function(C) {
        var e = {
            threshold: 0,
            failurelimit: 0,
            event: "scroll",
            effect: "show",
            container: window
        };
        if (C) {
            g.extend(e, C)
        }
        var H = this;
        if ("scroll" == e.event) {
            g(e.container).bind("scroll",
            function(C) {
                var c = 0;
                H.each(function() {
                    if (g.abovethetop(this, e) || g.leftofbegin(this, e)) {} else if (!g.belowthefold(this, e) && !g.rightoffold(this, e)) {
                        g(this).trigger("appear")
                    } else {
                        if (c++>e.failurelimit) {
                            return false
                        }
                    }
                });
                var T = g.grep(H,
                function(g) {
                    return ! g.loaded
                });
                H = g(T)
            })
        }
        this.each(function() {
            var C = this;
            if (undefined == g(C).attr("original")) {
                g(C).attr("original", g(C).attr("src"))
            }
            if ("scroll" != e.event || undefined == g(C).attr("src") || e.placeholder == g(C).attr("src") || (g.abovethetop(C, e) || g.leftofbegin(C, e) || g.belowthefold(C, e) || g.rightoffold(C, e))) {
                if (e.placeholder) {
                    g(C).attr("src", e.placeholder)
                } else {
                    g(C).removeAttr("src")
                }
                C.loaded = false
            } else {
                C.loaded = true
            }
            g(C).one("appear",
            function() {
                if (!this.loaded) {
                    g("<img />").bind("load",
                    function() {
                        g(C).hide().attr("src", g(C).attr("original"))[e.effect](e.effectspeed);
                        C.loaded = true
                    }).attr("src", g(C).attr("original"))
                }
            });
            if ("scroll" != e.event) {
                g(C).bind(e.event,
                function(e) {
                    if (!C.loaded) {
                        g(C).trigger("appear")
                    }
                })
            }
        });
        g(e.container).trigger(e.event);
        return this
    };
    g.belowthefold = function(C, e) {
        if (e.container === undefined || e.container === window) {
            var H = g(window).height() + g(window).scrollTop()
        } else {
            var H = g(e.container).offset().top + g(e.container).height()
        }
        return H <= g(C).offset().top - e.threshold
    };
    g.rightoffold = function(C, e) {
        if (e.container === undefined || e.container === window) {
            var H = g(window).width() + g(window).scrollLeft()
        } else {
            var H = g(e.container).offset().left + g(e.container).width()
        }
        return H <= g(C).offset().left - e.threshold
    };
    g.abovethetop = function(C, e) {
        if (e.container === undefined || e.container === window) {
            var H = g(window).scrollTop()
        } else {
            var H = g(e.container).offset().top
        }
        return H >= g(C).offset().top + e.threshold + g(C).height()
    };
    g.leftofbegin = function(C, e) {
        if (e.container === undefined || e.container === window) {
            var H = g(window).scrollLeft()
        } else {
            var H = g(e.container).offset().left
        }
        return H >= g(C).offset().left + e.threshold + g(C).width()
    };
    g.extend(g.expr[":"], {
        "below-the-fold": "$.belowthefold(a, {threshold : 0, container: window})",
        "above-the-fold": "!$.belowthefold(a, {threshold : 0, container: window})",
        "right-of-fold": "$.rightoffold(a, {threshold : 0, container: window})",
        "left-of-fold": "!$.rightoffold(a, {threshold : 0, container: window})"
    })
})(jQuery);

jQuery(document).ready(function() {
    var g = $(".nav-sousuo");
    $("#mo-so").click(function() {
        $(".mini_search").slideToggle()
    })
});
jQuery(document).ready(function() {
    var g = $(".mobile_aside");
    $(".nav-sjlogo i").click(function() {
        $(".mobile_aside").slideToggle(),
        $(".header-nav").removeClass("header-nav"),
        $(".sub-menu").toggleClass("m-sub-menu")
    })
});
jQuery(document).ready(function() {
    jQuery(".mobile-menu .nav-pills > li,.mobile-menu .nav-pills > li ul li").each(function() {
        jQuery(this).children(".mobile-menu .m-sub-menu").not(".active").css("display", "none");
        jQuery(this).children(".mobile-menu .toggle-btn").bind("click",
        function() {
            $(".mobile-menu .m-sub-menu").addClass("active");
            jQuery(this).children().addClass(function() {
                if (jQuery(this).hasClass("active")) {
                    jQuery(this).removeClass("active");
                    return ""
                }
                return "active"
            });
            jQuery(this).siblings(".mobile-menu .m-sub-menu").slideToggle()
        })
    })
});
jQuery(document).ready(function(g) {
    g("#font-change span").click(function() {
        var C = ".entry p";
        var e = 1;
        var H = 15;
        var c = g(C).css("fontSize");
        var T = parseFloat(c, 10);
        var f = c.slice( - 2);
        var Z = g(this).attr("id");
        switch (Z) {
        case "font-dec":
            T -= e;
            break;
        case "font-inc":
            T += e;
            break;
        default:
            T = H
        }
        g(C).css("fontSize", T + f);
        return false
    })
});
jQuery(document).ready(function(g) {
    var C = g(".nav-pills").attr("data-type");
    g("#backTop").hide();
    g(".nav-sjlogo i").click(function() {
        g(".home").toggleClass("navbar-on")
    });
    g(".nav-sjlogo i").click(function() {
        g(".nav-sjlogo i").toggleClass("active")
    });
    g(".r-hide a").click(function() {
        g(".site-content").toggleClass("primary")
    });
    g(".con_one_list").each(function() {
        g(this).children().eq(0).show()
    });
    g("#tab").each(function() {
        g(this).children().eq(0).addClass("tabhover")
    });
    g("#tab").children().mouseover(function() {
        g(this).addClass("tabhover").siblings().removeClass("tabhover");
        var C = g("#tab").children().index(this);
        g(".con_one_list").children().eq(C).fadeIn(300).siblings().hide()
    });
    g(".nav-pills>li ").each(function() {
        try {
            var e = g(this).attr("id");
            if ("index" == C) {
                if (e == "nvabar-item-index") {
                    g("#nvabar-item-index a:first-child").addClass("on")
                }
            } else if ("category" == C) {
                var H = g(".nav-pills").attr("data-infoid");
                if (H != null) {
                    var c = H.split(" ");
                    for (var T = 0; T < c.length; T++) {
                        if (e == "navbar-category-" + c[T]) {
                            g("#navbar-category-" + c[T] + " a:first-child").addClass("on")
                        }
                    }
                }
            } else if ("article" == C) {
                var H = g(".nav-pills").attr("data-infoid");
                if (H != null) {
                    var c = H.split(" ");
                    for (var T = 0; T < c.length; T++) {
                        if (e == "navbar-category-" + c[T]) {
                            g("#navbar-category-" + c[T] + " a:first-child").addClass("on")
                        }
                    }
                }
            } else if ("page" == C) {
                var H = g(".nav-pills").attr("data-infoid");
                if (H != null) {
                    if (e == "navbar-page-" + H) {
                        g("#navbar-page-" + H + " a:first-child").addClass("on")
                    }
                }
            } else if ("tag" == C) {
                var H = g(".nav-pills").attr("data-infoid");
                if (H != null) {
                    if (e == "navbar-tag-" + H) {
                        g("#navbar-tag-" + H + " a:first-child").addClass("on")
                    }
                }
            }
        } catch(g) {}
    });
    g(".nav-pills").delegate("a", "click",
    function() {
        g(".nav-pills>li a").each(function() {
            g(this).removeClass("on")
        });
        if (g(this).closest("ul") != null && g(this).closest("ul").length != 0) {
            if (g(this).closest("ul").attr("id") == "menu-navigation") {
                g(this).addClass("on")
            } else {
                g(this).closest("ul").closest("li").find("a:first-child").addClass("on")
            }
        }
    })
}); (function() {
    var g = $(document);
    var C = $("#divTags ul li,#hottags ul li");
    C.each(function() {
        var g = 10;
        var C = 0;
        var e = parseInt(Math.random() * (g - C + 1) + C);
        $(this).addClass("divTags" + e)
    })
})();
function autoScroll(g) {
    $("#callboard").find("ul").animate({
        marginTop: "-29px"
    },
    600,
    function() {
        $(this).css({
            marginTop: "0px"
        }).find("li:first").appendTo(this)
    })
}
$(function() {
    setInterval('autoScroll("#callboard")', 5e3)
});
$("<span class='toggle-btn'><i class='fa fa-plus'></i></span>").insertBefore(".sub-menu");
$("#tabcelan,#shangxi,#post_box1,#post_box2,#post_box3").removeClass("wow");
$("#tabcelan,#shangxi,#post_box1,#post_box2,#post_box3").removeClass("fadeInDown");
$(function() {
    var g = $(".navbar");
    var C = $(".home-fluid");
    var e = $(document).scrollTop();
    var H = $(document);
    var c = $(".fixed-nav").outerHeight();
    $(window).scroll(function() {
        var T = $(document).scrollTop();
        if (H.scrollTop() >= 31) {
            g.addClass("fixed-nav");
            $(".navTmp").fadeIn()
        } else {
            g.removeClass("fixed-nav fixed-enabled fixed-appear");
            $(".navTmp").fadeOut()
        }
        if (H.scrollTop() >= 31) {
            C.addClass("shadow");
            $(".navTmp").fadeIn()
        } else {
            C.removeClass("shadow");
            $(".navTmp").fadeOut()
        }
        if (T > c) {
            $(".fixed-nav").addClass("fixed-enabled")
        } else {
            $(".fixed-nav").removeClass("fixed-enabled")
        }
        if (T > e) {
            $(".fixed-nav").removeClass("fixed-appear")
        } else {
            $(".fixed-nav").addClass("fixed-appear")
        }
        e = $(document).scrollTop()
    })
});
$(document).keypress(function(g) {
    var C = $(".button");
    if (g.ctrlKey && g.which == 13 || g.which == 10) {
        C.click();
        document.body.focus();
        return
    }
    if (g.shiftKey && g.which == 13 || g.which == 10) C.click()
});
$(function() {
    $("#backtop").each(function() {
        $(this).find(".weixin").mouseenter(function() {
            $(this).find(".pic").fadeIn("fast")
        });
        $(this).find(".weixin").mouseleave(function() {
            $(this).find(".pic").fadeOut("fast")
        });
        $(this).find(".phone").mouseenter(function() {
            $(this).find(".phones").fadeIn("fast")
        });
        $(this).find(".phone").mouseleave(function() {
            $(this).find(".phones").fadeOut("fast")
        });
        $(this).find(".top").click(function() {
            $("html, body").animate({
                "scroll-top": 0
            },
            "fast")
        });
        $(".bottom").click(function() {
            $("html, body").animate({
                scrollTop: $(".footer").offset().top
            },
            800);
            return false
        });
        $(".close ").click(function() {
            $(".gg-bottom").removeClass("gg-bottom")
        })
    });
    var g = false;
    $(window).scroll(function() {
        var C = $(window).scrollTop();
        if (C > 500) {
            $("#backtop").data("expanded", true)
        } else {
            $("#backtop").data("expanded", false)
        }
        if ($("#backtop").data("expanded") != g) {
            g = $("#backtop").data("expanded");
            if (g) {
                $("#backtop .top").slideDown()
            } else {
                $("#backtop .top").slideUp()
            }
        }
    })
});
function addNumber(g) {
    document.getElementById("txaArticle").value += g
}
if ($("#comment-tools").length) {
    objActive = "txaArticle";
    function InsertText(g, C, e) {
        if (C == "") {
            return ""
        }
        var H = document.getElementById(g);
        if (document.selection) {
            if (H.currPos) {
                if (e && H.value == "") {
                    H.currPos.text = C
                } else {
                    H.currPos.text += C
                }
            } else {
                H.value += C
            }
        } else {
            if (e) {
                H.value = H.value.slice(0, H.selectionStart) + C + H.value.slice(H.selectionEnd, H.value.length)
            } else {
                H.value = H.value.slice(0, H.selectionStart) + C + H.value.slice(H.selectionStart, H.value.length)
            }
        }
    }
    function ReplaceText(g, C, e) {
        var H = document.getElementById(g);
        var c;
        if (document.selection && document.selection.type == "Text") {
            if (H.currPos) {
                var T = document.selection.createRange();
                T.text = C + T.text + e;
                return ""
            } else {
                c = C + e;
                return c
            }
        } else {
            if (H.selectionStart || H.selectionEnd) {
                c = C + H.value.slice(H.selectionStart, H.selectionEnd) + e;
                return c
            } else {
                c = C + e;
                return c
            }
        }
    }
    if ($("#ComtoolsFrame").length) {
        $(this).bind("click",
        function(g) {
            if (g && g.stopPropagation) {
                g.stopPropagation()
            } else {
                g.cancelBubble = true
            }
        })
    }
}
if ($(".face-show").length) {
    $("a.face-show").click(function() {
        $(".ComtoolsFrame").slideToggle()
    })
}
function CommentComplete() {
    if ($("#divNewcomm,.msgarticle,.divComments").length) {
        $("#divNewcomm,.msgarticle,.divComments").each(function g() {
            var C = $(this).html();
            C = C.replace(/\[B\](.*)\[\/B\]/g, "<strong>$1</strong>");
            C = C.replace(/\[U\](.*)\[\/U\]/g, "<u>$1</u>");
            C = C.replace(/\[S\](.*)\[\/S\]/g, "<del>$1</del>");
            C = C.replace(/\[I\](.*)\[\/I\]/g, "<em>$1</em>");
            $(this).html(C)
        })
    }
}
CommentComplete();
function GetComments(g, C) {
    $.get(bloghost + "zb_system/cmd.php?act=getcmt&postid=" + g + "&page=" + C,
    function(g) {
        $("#AjaxCommentBegin").nextUntil("#AjaxCommentEnd").remove();
        $("#AjaxCommentBegin").after(g);
        CommentComplete()
    })
}
function autotree() {
    $(document).ready(function() {
        var g = 1,
        C = $("#listree-ol");
        $("#listree-bodys").find("h1, h2, h3").each(function(e) {
            if ("" !== $(this).text().trim()) {
                $(this).attr("id", "listree-list" + e);
                var H = parseInt($(this)[0].tagName.slice(1));
                0 === e || H === g ? (e = $('<li><a id="listree-click" href="#listree-list' + e + '">' + $(this).text() + "</a></li>"), C.append(e)) : H > g ? (e = $('<ol style="margin-left: 14px;"><li><a id="listree-click" href="#listree-list' + e + '">' + $(this).text() + "</a></li></ol>"), C.append(e), C = e) : H < g && (e = $('<li><a id="listree-click" href="#listree-list' + e + '">' + $(this).text() + "</a></li>"), 1 === H ? ($("#listree-ol").append(e), C = $("#listree-ol")) : (C.parent("ol").append(e), C = C.parent("ol")));
                g = H
            }
        });
        $(".listree-btn").click(function() {
            "[+]" == $(".listree-btn").text() ? $(".listree-btn").attr("title", "收起").text("[-]").parent().next().show() : $(".listree-btn").attr("title", "展开").text("[+]").parent().next().hide();
            return ! 1
        });
        $("a#listree-click").click(function(g) {
            g.preventDefault();
            $("html, body").animate({
                scrollTop: $($(this).attr("href")).offset().top - 100
            },
            800)
        });
        1 < g && $(".listree-box").css("display", "block")
    })
}
autotree();