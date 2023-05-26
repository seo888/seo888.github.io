
(function($){ //create closure so we can safely use $ as alias for jQuery

    $(document).ready(function(){

        "use strict";

        /*-----------------------------------------------------------------------------------*/
        /*  Superfish Menu
        /*-----------------------------------------------------------------------------------*/
        // initialise plugin
        var example = $('.sf-menu').superfish({
            //add options here if required
            delay:       100,
            speed:       'fast',
            autoArrows:  false  
        }); 
        
        /*-----------------------------------------------------------------------------------*/
        /*  bxSlider
        /*-----------------------------------------------------------------------------------*/

        $('.featured-slider .bxslider').bxSlider({
            auto: true,
            preloadImages: 'all',
            pause: '6000',
            autoHover: true,
            adaptiveHeight: true,
            mode: 'fade',
            onSliderLoad: function(){ 
                $(".featured-slider .bxslider").css("display", "block");
                $('.featured-slider .entry-header').fadeIn("100");
                $('.featured-slider .gradient').fadeIn("100"); 
            }
        });    

        $('.gallery-slider').show().bxSlider({
            auto: true,
            preloadImages: 'all',
            pause: '6000',
            autoHover: true,
            adaptiveHeight: true,
            mode: 'fade',
            onSliderLoad: function(){ 
                $(".single #primary .bx-wrapper").css("visibility", "visible");
                $(".single #primary .gallery-slider").css("display", "block");                
            }
        });  

        $(window).load(function() {
            // executes when complete page is fully loaded, including all frames, objects and images
            $(".custom-share").fadeIn('1000'); 
            $(".bottom-right").fadeIn('1000'); 
            $(".widget_posts_thumbnail .entry-wrap").fadeIn('1000');   
            $('.sidebar .widget_ad .widget-title').fadeIn("1000"); 
            $(".breadcrumbs.is_zhuanti h1").fadeIn('1000');                     
        });


        /*-----------------------------------------------------------------------------------*/
        /*  Back to Top
        /*-----------------------------------------------------------------------------------*/
        // hide #back-top first
        //$("#back-top").hide();

        $(function () {
            // fade in #back-top
            $(window).scroll(function () {
                if ($(this).scrollTop() > 100) {
                    $('#back-top').css('visibility','visible');
                } else {
                    $('#back-top').css('visibility','hidden');
                }
            });

            // scroll body to 0px on click
            $('#back-top a').click(function () {
                $('body,html').animate({
                    scrollTop: 0
                }, 400);
                return false;
            });
        });            

        /*-----------------------------------------------------------------------------------*/
        /*  Misc.
        /*-----------------------------------------------------------------------------------*/       
        
        /*-----------------------------------------------------------------------------------*/
        /*  Mobile Menu & Search
        /*-----------------------------------------------------------------------------------*/

        /* Mobile Search */
        $('.search-icon > .fa-search').click(function(){

            $('.header-search').slideDown('fast', function() {});
            $('.search-icon > .fa-search').toggleClass('active');
            $('.search-icon > .fa-close').toggleClass('active');

        });

        $('.search-icon > .fa-close').click(function(){

            $('.header-search').slideUp('fast', function() {});
            $('.search-icon > .fa-search').toggleClass('active');
            $('.search-icon > .fa-close').toggleClass('active');   

        });     

    });

})(jQuery);