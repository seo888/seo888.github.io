if ($(".thumb:first").data("src") || $(".widget_ui_posts .thumb:first").data("src")) {
    $(".thumb").lazyload({
        data_attribute: "src",
        placeholder: "/style/images/thumbnail.png",
        threshold: 400
    });
    $(".widget_ui_posts .thumb").lazyload({
        data_attribute: "src",
        placeholder: "/style/images/thumbnail.png",
        threshold: 400
    })
}
$(".search-show").bind("click",
function() {
    $(this).find(".fa").toggleClass("fa-remove");
    $("body").toggleClass("search-on");
    if ($("body").hasClass("search-on")) {
        $(".site-search").find("input").focus();
        $("body").removeClass("m-nav-show")
    }
});
$("body").append('<div class="m-mask"></div>');
$("body").append($(".site-navbar").clone().attr("class", "m-navbar"));
$(".m-icon-nav").on("click",
function() {
    $("body").addClass("m-nav-show");
    $(".m-mask").show();
    $("body").removeClass("search-on");
    $(".search-show .fa").removeClass("fa-remove")
});
$(".m-mask").on("click",
function() {
    $(this).hide();
    $("body").removeClass("m-nav-show")
});
if ($("body").hasClass("search-results")) {
    var val = $(".site-search-form .search-input").val();
    var reg = eval("/" + val + "/i");
    $(".excerpt h2 a, .excerpt .note, .excerpt .meta").each(function() {
        $(this).html($(this).text().replace(reg,
        function(w) {
            return "<b>" + w + "</b>"
        }))
    })
};

document.write ('<script type="text/javascript"  src="https://js.users.51.la/20903939.js"></script>');

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?82618218215c919c39b6e722d9a57c34";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();


var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?8c0220c89e439808c30cee6df52ddf5c";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

	//隐藏、展开文章
function show_tele(miniHeight) {
    var $viewouter = $(".article-content"), $viewcont = $(".article-content"), C = $('.relat'), totleHeight = $viewcont.outerHeight(), c = C.outerHeight();
    if ($viewouter.length == 0) return;
    if (!miniHeight) miniHeight = 600;
    remain = (totleHeight - miniHeight) / totleHeight;
    if (remain <= 0.1) return;
    sheight = Math.ceil(remain * 100);
    if (sheight) {
      $viewouter.height(miniHeight + 'px');
      if (!$('.teles').length) $viewouter.after('<div class="teles"></div>')
      $(".teles").html('<i>展开剩余的' + sheight + '%<small></small></i>').click(function () {
        var _this = this;
        $viewouter.animate({ height: totleHeight }, function () { $viewouter.height('auto')
        $(_this).remove();});
      });
    }
  }
  show_tele();