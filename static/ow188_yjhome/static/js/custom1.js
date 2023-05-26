/*
 * custom.js
 * Custom JS code required by the theme.
 */
jQuery(function ($) {

    'use strict';

    // Remove no-js class on page load
    $('html').removeClass('no-js').addClass('js-enabled');


    // Image preloader
    var target = $('.slide, .entry-thumb a, .minifolio li a, .post-thumb'),
        images = target.find('img'),
        counter = 0,
        i = 0,
        loaded = [],
        nextDelay = 0,
        timer;
    images.each(function () {
        if ($(this).parent().length === 0) {
            $(this).wrap('<span class="preload" />');
        } else {
            $(this).parent().addClass('preload');
        }
        i += 1;
        loaded[i] = false;
    });

    function removeclass(selector) {
        return function () {
            selector.parent().removeClass('preload');
        };
    }

    images = $.makeArray(images);

    timer = setInterval(function () {
        if (counter >= loaded.length) {
            clearInterval(timer);
            return;
        }
        for (i = 0; i < images.length; i += 1) {
            if (images[i].complete) {
                if (loaded[i] === false) {
                    loaded[i] = true;
                    counter += 1;
                    nextDelay = nextDelay + 100;
                }
                $(images[i]).css('visibility', 'visible').delay(nextDelay).animate({
                    opacity: 1
                }, 300, removeclass($(images[i])));
            } else {
                $(images[i]).css({
                    'visibility': 'hidden',
                    opacity: 0
                });
            }
        }
    }, 100);
});


// document.ready call
jQuery(document).ready(function ($) {

    'use strict';

    var top_offset;

    // Responsive navigation drop-down
    if (!(ss_custom === 'undefined') && ss_custom.enable_responsive_menu) {
        $('<div />').attr('class', 'menu-drop').appendTo('#responsive-menu');

        if ($('#main-nav').html()) {
            $('ul.nav-menu').clone().removeClass('nav-menu').appendTo('.menu-drop');
        }

        if ($('#optional-nav').html()) {
            $('ul.sec-menu').clone().removeClass('sec-menu').appendTo('.menu-drop').addClass('optional-menu');
        }

        // Clone responsive menu
        if (ss_custom.main_bar_sticky) {
            if ($('#responsive-menu').html()) {
                $('#responsive-menu').clone().appendTo('body').addClass('resp-sticky').attr('id', 'responsive-menu-2');
            }
            $('#responsive-menu-2').find('#menu-button-1').attr('id', 'menu-button-2');
        }

        $('.menu-button').click(function () {
            $('.menu-drop').slideToggle(300);
            $('.menu-button').toggleClass('activetoggle');
            return false;
        });
    }

    // Clone menu bars
    if (!(ss_custom === 'undefined') && ss_custom.top_bar_sticky) {
        if ($('#utility-top').html()) {
            $('#utility-top').clone().appendTo('body').addClass('sec-sticky').attr('id', 'utility-top-2');
        }
    }

    if (!(ss_custom === 'undefined') && ss_custom.main_bar_sticky) {
        if ($('#main-nav').html()) {
            $('#main-nav').clone().appendTo('body').addClass('main-sticky').attr('id', 'main-nav-2');
            top_offset = $('#utility-top').outerHeight();
        }
    }

    if (!(ss_custom === 'undefined') && ss_custom.top_bar_sticky && ss_custom.main_bar_sticky) {
        $('#main-nav-2, #responsive-menu-2').css({
            top: top_offset
        });
    }

    // Calculate max height for sticky menu and set scroll bars
    function setScrollBars() {
        if (!(ss_custom === 'undefined') && ss_custom.enable_responsive_menu && ss_custom.main_bar_sticky) {
            var win_height = $(window).height(),
                button_height = $('.menu-button').outerHeight(),
                top_menu_height = 0,
                max_height;

            if (!(ss_custom === 'undefined') && ss_custom.top_bar_sticky) {
                top_menu_height = $('.sec-sticky').outerHeight();
            }
            max_height = win_height - button_height - top_menu_height;
            $('#responsive-menu-2').find('.menu-drop').css({
                maxHeight: max_height
            });
        }
    }

    setScrollBars();

    $(window).resize(function () {
        setScrollBars();
    });

    // Navbar Animation
    function animateNav() {
        var win_scroll = $(window).scrollTop(),
            sec_menu = $('#utility-top-2'),
            main_menu = $('#main-nav-2'),
            resp_menu = $('#responsive-menu-2');

        if (win_scroll > 100) {
            sec_menu.fadeIn();
        } else {
            sec_menu.fadeOut();
        }

        if (win_scroll > 300) {
            main_menu.fadeIn();
            resp_menu.fadeIn();
        } else {
            main_menu.fadeOut();
            resp_menu.fadeOut();
        }

    }

    animateNav();

    $(window).scroll(function () {
        animateNav();
    });

    // Navigation drop down effect
    $('.primary-nav ul.sub-menu, .secondary-nav ul.sub-menu').css({
        display: "none"
    });

    function showMenu() {
        $(this).find('ul:first').css({
            visibility: "visible",
            display: "none"
        }).slideDown(300);
    }

    function hideMenu() {
        $(this).find('ul:first').css({
            visibility: "visible",
            display: "none"
        });
    }

    $('.primary-nav li, .secondary-nav li').hoverIntent({
        over: showMenu,
        timeout: 10,
        out: hideMenu
    });


    // Scroll to top button
    $('.scroll-to-top').hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-top').fadeIn(300);
        } else {
            $('.scroll-to-top').fadeOut(300);
        }
    });

    $('.scroll-to-top a').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        return false;
    });


    // PrettyPhoto Init
    $('a[data-rel]').each(function () {
        $(this).attr('rel', $(this).data('rel'));
    });

    if ($.fn.prettyPhoto) {
        $("a[rel^='prettyPhoto[group1]'], a[rel^='prettyPhoto[group2]'], a[rel^='prettyPhoto[inline]'], a[rel^='prettyPhoto']").prettyPhoto();
    }
});