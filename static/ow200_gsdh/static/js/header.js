document.body.addEventListener('touchstart', function() {});
$(function() {
    var topNav = $(".top-nav");
    $(".header-heima .navbar-toggle").on("click", function() {
        var rightContent = $(".header-container-wrap");
        var navWidth = topNav.width();
        var height = $(window).height();
        console.log(height);
        topNav.css("height", height);

        if (topNav.hasClass('open-left')) {
            topNav.removeClass('open-left');
            rightContent.removeClass('opens');
        } else {
            topNav.addClass('open-left');
            rightContent.addClass('opens');
        }

        return false;
    });
    $(".code").on("mouseover", function() {
        $(".codeimg").show();
    }).on("mouseout", function() {
        $(".codeimg").hide();
    });

    $(".codeimg").on("mouseout", function() {
        $(".codeimg").hide();
    });

    var height = $(".footer_box").height();
    $("body").css("padding-bottom", height + 30);
    $(window).resize(function() {
        height = $(".footer_box").height();
        $("body").css("padding-bottom", height +30);
    });
    $(document).on("click", "#academy-nav", function() {
        if ($(this).attr('href')) window.location = $(this).attr('href');
    });
    $(".dropdown").on("mouseover", function() {
        $(".dropdown-menu").show();
    });
    $(".dropdown").on("mouseout", function() {
        $(".dropdown-menu").hide();
    });
});