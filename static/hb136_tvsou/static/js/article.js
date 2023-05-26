countView($("#data-id").val());
var share = new SimpleShare({
    url: "https://www.tvsou.com/article/" + $("#data-id").val(),
    title: $("#data-title").val(),
    content: $("#share-content").val(),
    pic: $("#share-pic").val()
});
$(function () {
    jQuery("body").slide({
        mainCell: ".uesr-box-info ol",
        pnLoop: false,
        autoPlay: false,
        effect: "left",
        vis: 2,
        scroll: 2,
        trigger: "click"
    });
    $("body").switchTab({"titCell": ".st-tabnav a", "titOnClassName": "active", "trigger": "hover", "delayTime": 1});
    $("body").switchTab({
        "titCell": ".st-tabnav1 a",
        mainCell: ".st-tabcon1",
        "titOnClassName": "active",
        "trigger": "hover",
        "delayTime": 1
    });
    var isAjaxMore = true;
    $("body").delegate(".ajax-more", "click", function () {
        isAjaxMore = false;
        var obj = this;
        $(obj).show();
        $(obj).removeClass("ajax-more");
        $(obj).removeClass("cur");
        var postData = {"page": $("#data-page").val(), "articleid": $("#data-zhihuid").val()};
        var url = "/tvsou/article/ajaxGetList";
        $.ajax({
            type: "POST", data: postData, url: url, dataType: "json", async: "true", success: function (data) {
                if (data.status == 1) {
                    var itemHtml = template("tpl_list_item", data.data);
                    $(".index-list").append(itemHtml);
                    $("#data-page").val(parseInt(parseInt($("#data-page").val()) + 1));
                    if (data.data.pageInfo.page == data.data.pageInfo.pageCount) {
                        $(obj).html('<span class="color-6">暂时就这么多了</span>');
                        $(obj).addClass("btn-boxs");
                        $(obj).removeClass("cur")
                    } else {
                        $(obj).addClass("ajax-more");
                        $(obj).addClass("cur");
                    }
                } else {
                    layer.msg(data.msg, {time: 1000});
                    $(obj).addClass("ajax-more");
                    $(obj).addClass("cur")
                }
            }
        })
    });
    $(".page-item").click(function () {
        $(".page-item-list").hide();
        $("." + $(this).attr("data-id")).show();
        $(this).addClass("active").siblings().removeClass("active")
    });
    $("body").delegate(".favor-agree-btn", "click", function () {
        $(this).removeClass("cur").removeClass("favor-agree-btn").addClass("zan-actives");
        onFavor("/tvsou/group/ajaxDoArticleFavor", "", $(this).attr("data-id"), "0", $(this).children("p"), $(this).next().children("em"))
    });
    var _share_timeout;
    $(".share-btn").hover(function () {
        clearTimeout(_share_timeout);
        $(".share-list").show()
    }, function () {
        _share_timeout = setTimeout(function () {
            $(".share-list").hide()
        }, 500)
    });
    $(".share-list").hover(function () {
        clearTimeout(_share_timeout);
        $(".share-list").show()
    }, function () {
        _share_timeout = setTimeout(function () {
            $(".share-list").hide()
        }, 500)
    });
    var _item_timeout;
    $(".item-name").hover(function () {
        clearTimeout(_item_timeout);
        $(".item-name-list").hide();
        $(this).parent().children(".item-name-list").show()
    });
    var _item_list_timeout;
    $(".item-list").hover(function () {
        clearTimeout(_item_list_timeout);
        $(this).parent().children(".item-list-view").show();
        $($(this).parent().children(".item-list-view").children("div").children(".program-btn-lists")[0]).show();
    }, function () {
        var obj = this;
        _item_list_timeout = setTimeout(function () {
            $(obj).parent().children(".item-list-view").hide()
        }, 500)
    });
    $(".item-list-view").hover(function () {
        clearTimeout(_item_list_timeout);
        $(this).show()
    }, function () {
        var obj = this;
        _item_list_timeout = setTimeout(function () {
            $(obj).hide()
        }, 500)
    });
    var _article_timeout;
    $(".article-item").hover(function () {
        clearTimeout(_article_timeout);
        var obj = this;
        $(".article-item-info").hide();
        $(obj).children("span").children(".article-item-info").show();
        $(obj).parent().children(".article-item-info").show()
    }, function () {
        clearTimeout(_article_timeout);
        var obj = this;
        _article_timeout = setTimeout(function () {
            $(obj).children("span").children(".article-item-info").hide();
            $(obj).parent().children(".article-item-info").hide()
        }, 500)
    });
    $(".article-item-info").hover(function () {
        clearTimeout(_article_timeout);
        var obj = this;
        $(".article-item-info").hide();
        $(obj).parent().children(".article-item-info").show()
    }, function () {
        clearTimeout(_article_timeout);
        var obj = this;
        _article_timeout = setTimeout(function () {
            $(obj).parent().children(".article-item-info").hide()
        }, 500)
    });
    // var adTop = $(".fix-div").offset().top;
    // window.onscroll = function () {
    //     var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //     if (scrollTop > 900) {
    //         $(".right-up").show()
    //     } else {
    //         $(".right-up").hide()
    //     }
    //     if (scrollTop > adTop) {
    //         $(".fix-div").css("top", "0px");
    //         $(".fix-div").css("position", "fixed")
    //     } else {
    //         $(".fix-div").removeAttr("style")
    //     }
    // }
});

function ajaxGetCount() {
    $.ajax({
        type: "POST",
        data: {"id": $("#data-id").val(), "type": "article",},
        url: "/tvsou/count/ajaxGetCount",
        dataType: "json",
        success: function (data) {
            $('.likenum-div').html(data.likenum);
            if (data.favorite == 1) {
                $(".useritem-btn").attr("data-val", "no");
                $(".useritem-btn").children("p").html("已收藏");
                $(".useritem-btn").attr("title", "点击取消收藏");
                $(".useritem-btn").addClass("already-circle").removeClass("collect-circle")
            }
            if (data.likeBtn == 1) {
                $(".zan-circle").removeClass("favor-agree-btn").removeClass("cur").addClass("zan-actives")
            }
        }
    })
}

ajaxGetCount();