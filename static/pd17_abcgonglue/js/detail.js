var pageObj = {
    init: function () {
        this.hotScroll();
        this.floorNav();
        this.scrollFix();
    },
    hotScroll: function () {
        //热门推介 添加滚动条
        var $list = $("#J_hotList");
        $list.slimScroll({
            height: "150px",
            color: '#578a8e',
            railColor: '#578a8e',
            railVisible: true,
            alwaysVisible: true
        });

    },
    scrollFix: function () {
        //导航 固定
        var $elm = $("#J_pin");
        $elm.pin({
            padding: {
                top: $("#allNav").height()+20,
                bottom: $("footer").height()+50
            }
        });
    },
    floorNav: function () {
        var $w = $(window);
        var $floor = $(".J_floor");
        var $nav = $("#J_floorNav");
        var $navItem = $nav.find("li");
        $w.on("scroll", function () {
            var $this = $(this);
            var cur = $this.scrollTop();
            var flag = false;
            $floor.each(function (i,v) {
                var $this = $(this);
                if(onScreen($this,cur)){
                    flag = true;
                    $navItem.eq(i).addClass("active").siblings().removeClass("active");
                    return false;
                }
            });
            if(!flag){
                $navItem.removeClass("active");
            }
        }).trigger("scroll");
        var wH = $w.height();
        function onScreen($elm,curScrollTop){
            var elmTop = $elm.offset().top;
            var elmTopH = $elm.offset().top+$elm.height();
            return !(elmTop < curScrollTop && elmTopH<curScrollTop+100);
        }
        $navItem.on("click", clickHandler);
        function clickHandler(){
            var $this = $(this);
            var $fl = $floor.eq($this.index());
            var offset = $("#allNav").find(".menu").height()+20;
            $("html,body").animate({
                scrollTop: $fl.offset().top-offset
            });
        }
    }
};
$(function () {
    pageObj.init();
});