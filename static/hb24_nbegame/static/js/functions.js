var browser = {
    ie6: function() {
        return ((window.XMLHttpRequest == undefined) && (ActiveXObject != undefined))
    },
    getWindow: function() {
        var myHeight = 0;
        var myWidth = 0;
        if (typeof(window.innerWidth) == 'number') {
            myHeight = window.innerHeight;
            myWidth = window.innerWidth
        } else if (document.documentElement) {
            myHeight = document.documentElement.clientHeight;
            myWidth = document.documentElement.clientWidth
        } else if (document.body) {
            myHeight = document.body.clientHeight;
            myWidth = document.body.clientWidth
        }
        return {
            'height': myHeight,
            'width': myWidth
        }
    },
    getScroll: function() {
        var myHeight = 0;
        var myWidth = 0;
        if (typeof(window.pageYOffset) == 'number') {
            myHeight = window.pageYOffset;
            myWidth = window.pageXOffset
        } else if (document.documentElement) {
            myHeight = document.documentElement.scrollTop;
            myWidth = document.documentElement.scrollLeft
        } else if (document.body) {
            myHeight = document.body.scrollTop;
            myWidth = document.body.scrollLeft
        }
        return {
            'height': myHeight,
            'width': myWidth
        }
    },
    getDocWidth: function(D) {
        if (!D) var D = document;
        return Math.max(Math.max(D.body.scrollWidth, D.documentElement.scrollWidth), Math.max(D.body.offsetWidth, D.documentElement.offsetWidth), Math.max(D.body.clientWidth, D.documentElement.clientWidth))
    },
    getDocHeight: function(D) {
        if (!D) var D = document;
        return Math.max(Math.max(D.body.scrollHeight, D.documentElement.scrollHeight), Math.max(D.body.offsetHeight, D.documentElement.offsetHeight), Math.max(D.body.clientHeight, D.documentElement.clientHeight))
    }
};
var dom = {
    ID: function(id) {
        var type = typeof(id);
        if (type == 'object') return id;
        if (type == 'string') return document.getElementById(id);
        return null
    },
    insertHtml: function(html) {
        var frag = document.createDocumentFragment();
        var div = document.createElement("div");
        div.innerHTML = html;
        for (var i = 0,
        ii = div.childNodes.length; i < ii; i++) {
            frag.appendChild(div.childNodes[i])
        }
        document.body.insertBefore(frag, document.body.firstChild)
    }
};
var myEvent = {
    add: function(element, type, handler) {
        var ele = dom.ID(element);
        if (!ele) return;
        if (ele.addEventListener) ele.addEventListener(type, handler, false);
        else if (ele.attachEvent) ele.attachEvent("on" + type, handler);
        else ele["on" + type] = handler
    },
    remove: function(element, type, handler) {
        var ele = dom.ID(element);
        if (!ele) return;
        if (ele.removeEventListener) ele.removeEventListener(type, handler, false);
        else if (ele.detachEvent) ele.detachEvent("on" + type, handler);
        else ele["on" + type] = null
    }
};
var position = {
    rightCenter: function(id) {
        var id = dom.ID(id);
        var ie6 = browser.ie6();
        var win = browser.getWindow();
        var ele = {
            'height': id.clientHeight,
            'width': id.clientWidth
        };
        if (ie6) {
            var scrollBar = browser.getScroll()
        } else {
            var scrollBar = {
                'height': 0,
                'width': 0
            };
            id.style.position = 'fixed'
        }
        ele.top = parseInt((win.height - ele.height) / 2 + scrollBar.height);
        id.style.top = ele.top + 'px';
        id.style.right = '3px'
    },
    floatRightCenter: function(id) {
        position.rightCenter(id);
        var fun = function() {
            position.rightCenter(id)
        };
        if (browser.ie6()) {
            myEvent.add(window, 'scroll', fun);
            myEvent.add(window, 'resize', fun)
        } else {
            myEvent.add(window, 'resize', fun)
        }
    },
    leftCenter: function(id) {
        var id = dom.ID(id);
        var ie6 = browser.ie6();
        var win = browser.getWindow();
        var ele = {
            'height': id.clientHeight,
            'width': id.clientWidth
        };
        if (ie6) {
            var scrollBar = browser.getScroll()
        } else {
            var scrollBar = {
                'height': 0,
                'width': 0
            };
            id.style.position = 'fixed'
        }
        ele.top = parseInt((win.height - ele.height) / 2 + scrollBar.height);
        id.style.top = ele.top + 'px';
        id.style.left = '3px'
    },
    floatLeftCenter: function(id) {
        position.leftCenter(id);
        var fun = function() {
            position.leftCenter(id)
        };
        if (browser.ie6()) {
            myEvent.add(window, 'scroll', fun);
            myEvent.add(window, 'resize', fun)
        } else {
            myEvent.add(window, 'resize', fun)
        }
    }
};
/*
$(document).ready(function() {
    $("#btn-bars").click(function() {
        $(".navbar").slideToggle(500)
    })
});
*/
$(document).ready(function(){
    $("#btn-bars").click(
        function(){$(".m_mm_navbar").slideToggle(500)
            
        })
    
});
$(function() {
    $('#monavber li').hover(function() {
        $(this).addClass('on')
    },
    function() {
        $(this).removeClass('on')
    })
});
jQuery(document).ready(function($) {
    var datatype = $("#monavber").attr("data-type");
    $(".navbar>li ").each(function() {
        try {
            var myid = $(this).attr("id");
            if ("index" == datatype) {
                if (myid == "nvabar-item-index") {
                    $("#nvabar-item-index").addClass("active")
                }
            } else if ("category" == datatype) {
                var infoid = $("#monavber").attr("data-infoid");
                if (infoid != null) {
                    var b = infoid.split(' ');
                    for (var i = 0; i < b.length; i++) {
                        if (myid == "navbar-category-" + b[i]) {
                            $("#navbar-category-" + b[i] + "").addClass("active")
                        }
                    }
                }
            } else if ("article" == datatype) {
                var infoid = $("#monavber").attr("data-infoid");
                if (infoid != null) {
                    var b = infoid.split(' ');
                    for (var i = 0; i < b.length; i++) {
                        if (myid == "navbar-category-" + b[i]) {
                            $("#navbar-category-" + b[i] + "").addClass("active")
                        }
                    }
                }
            } else if ("page" == datatype) {
                var infoid = $("#monavber").attr("data-infoid");
                if (infoid != null) {
                    if (myid == "navbar-page-" + infoid) {
                        $("#navbar-page-" + infoid + "").addClass("active")
                    }
                }
            } else if ("tag" == datatype) {
                var infoid = $("#monavber").attr("data-infoid");
                if (infoid != null) {
                    if (myid == "navbar-tag-" + infoid) {
                        $("#navbar-tag-" + infoid + "").addClass("active")
                    }
                }
            }
        } catch(E) {}
    });
    $("#monavber").delegate("a", "click",
    function() {
        $(".navbar>li").each(function() {
            $(this).removeClass("active")
        });
        if ($(this).closest("ul") != null && $(this).closest("ul").length != 0) {
            if ($(this).closest("ul").attr("id") == "munavber") {
                $(this).addClass("active")
            } else {
                $(this).closest("ul").closest("li").addClass("active")
            }
        }
    })
});
$(function() {
    $(window).scroll(function() {
        if ($(window).scrollTop() > 500) {
            $("#gttop").show()
        } else {
            $("#gttop").hide()
        }
    });
    $("#gttop").click(function() {
        $("body,html").animate({
            scrollTop: 0
        },
        1500);
        return false
    })
});
$(document).ready(function() {
    $(".btn_search").click(function() {
        $(".search").toggle()
    })
});
 (function() {
    var oDiv = document.getElementById("monavber");
    var H = 0,
    iE6;
    var Y = oDiv;
    while (Y) {
        H += Y.offsetTop;
        Y = Y.offsetParent
    };
    iE6 = window.ActiveXObject && !window.XMLHttpRequest;
    if (!iE6) {
        window.onscroll = function() {
            var s = document.body.scrollTop || document.documentElement.scrollTop;
            if (s > H) {
                oDiv.className = "header-nav fixed";
                if (iE6) {
                    oDiv.style.top = (s - H) + "px"
                }
            } else {
                oDiv.className = "header-nav"
            }
        }
    }
})();
$(function() {
    if ($("#module").length > 0) {
        var offset = $("#module").offset();
        $(window).scroll(function() {
            var scrollTop = $(window).scrollTop();
            if (offset.top < scrollTop) $("#module").addClass("following2");
            else $("#module").removeClass("following2")
        })
    }
});
$(function() {
    var $bottomTools = $('.bottom_tools');
    var $qrTools = $('.qr_tool');
    var qrImg = $('.qr_img');
    $(window).scroll(function() {
        var scrollHeight = $(document).height();
        var scrollTop = $(window).scrollTop();
        var $windowHeight = $(window).innerHeight();
        scrollTop > 50 ? $("#scrollUp").fadeIn(200).css("display", "block") : $("#scrollUp").fadeOut(200);
        $bottomTools.css("bottom", scrollHeight - scrollTop > $windowHeight ? 40 : $windowHeight + scrollTop + 40 - scrollHeight)
    });
    $('#scrollUp').click(function(e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        })
    });
    $qrTools.hover(function() {
        qrImg.fadeIn()
    },
    function() {
        qrImg.fadeOut()
    })
});
$(document).ready(function(){
  $("#ads-zz").click(function(){
    $(this).parents(".asds").hide("slow");
    $('.content-wrap').css('overflow','initial');
    $('.guanbi_ad').css('margin-top','8px');
  });
});
zbp.plugin.unbind("comment.reply.start", "system");
zbp.plugin.on("comment.reply.start", "tt_nbegame", function(id) {
	var i = id;
	$("#inpRevID").val(i);
	var frm = $('#divCommentPost'),
		cancel = $("#cancel-reply");

	frm.before($("<div id='temp-frm' style='display:none'>")).addClass("reply-frm");
	$('#AjaxComment' + i).before(frm);

	cancel.show().click(function() {
		var temp = $('#temp-frm');
		$("#inpRevID").val(0);
		if (!temp.length || !frm.length) return;
		temp.before(frm);
		temp.remove();
		$(this).hide();
		frm.removeClass("reply-frm");
		return false;
	});
	try {
		$('#txaArticle').focus();
	} catch (e) {}
	return false;
});
/*
zbp.plugin.on("comment.postsuccess", "tt_nbegame", function () {
	$("#cancel-reply").click();
});
*/
zbp.plugin.on("comment.post.success", "tt_nbegame", function () {
	$("#cancel-reply").click();
});
$(function() {
 $(".tab a").hover(function () {
      var $index = $(this).index();
      $(this).addClass("active").siblings().removeClass("active");
      $(this).parent().siblings(".tab-box").eq($index).show().siblings(".tab-box").hide();
    });
});