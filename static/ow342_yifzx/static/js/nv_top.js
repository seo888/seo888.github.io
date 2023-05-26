
(function(byg) {
    "use strict";
    byg.fn.stickMe = function(options) {
        // Assigning variables
        var bygwindow = jQuery(window),
            bygdocument = jQuery(document),
            bygbody = jQuery('.hd_xin_top'),
            position = 0,
            bygelem = this,
            bygelemHeight = bygelem.innerHeight(),
            bygwin_center = bygwindow.height() / 2,
            bygpos,
            settings = byg.extend({
                transitionDuration: 0,
                shadow: false,
                shadowOpacity: 1,
                animate: false,
                triggerAtCenter: true,
                topOffset: 46,
                transitionStyle: 'slide',
                stickyAlready: false
            }, options);
        // Initial state
        bygelem
            .addClass('stick-me')
            .addClass('not-sticking');
        switch (settings.triggerAtCenter) {
            case (settings.triggerAtCenter && settings.topOffset < bygelemHeight) || (settings.triggerAtCenter && settings.topOffset > bygelemHeight):
                settings.triggerAtCenter = false;
                break;
        }
        if (settings.stickyAlready) {
            settings.triggerAtCenter = false;
            settings.topOffset = 0;
            stick();
        }

        function bygelem_slide() {
            if (settings.animate === true && settings.transitionStyle === 'slide' && settings.stickyAlready !== true) {
                bygelem.slideDown(settings.transitionDuration);
            }
            if (settings.animate === true && settings.transitionStyle === 'fade' && settings.stickyAlready !== true) {
                bygelem.fadeIn(settings.transitionDuration);
            } else {
                bygelem.show();
            }
            bygelem.removeClass('not-sticking');
        }

        function stick() {
            if (bygelem.hasClass('sticking')) {
                bygelem.trigger('sticking');
            }
            if (position === 0) {
                position = 1;
                if(settings.stickyAlready === false) {
                    bygelem.trigger('sticky-begin');
                }
            }
            if (bygelem.hasClass('not-sticking')) {
                bygelem.hide();
                bygelem_slide();
            }
            if (settings.shadow === true) {
                bygelem.css('box-shadow', '0px 1px 2px rgba(0,0,0,' + settings.shadowOpacity + ')');
            }
            bygelem
                .addClass('sticking')
                .css('position', 'fixed')
                .css('top', '0');
            bygbody.css('padding-top', bygelemHeight);
        }

        function unstick() {
            if (settings.shadow === true) {
                bygelem.css('box-shadow', 'none');
            }
            bygelem.addClass('not-sticking')
                .removeClass('sticking')
                .show()
                .css('position', 'relative');
            bygbody.css('padding-top', '0');
        }
        bygwindow.scroll(function() {
            bygpos = bygwindow.scrollTop();
            if (bygpos === 0) {
                position = 0;
                bygelem.trigger('top-reached');
            }
            if (settings.triggerAtCenter === true) {
                if (bygpos > bygwin_center + bygelemHeight) {
                    stick();
                }
            }
            if (settings.triggerAtCenter === false) {
                if (bygpos > settings.topOffset) {
                    stick();
                }
            }
            if (bygpos + bygwindow.height() > bygdocument.height() - 1) {
                bygelem.trigger('bottom-reached');
            }
            if (settings.triggerAtCenter === true) {
                if (bygpos < 46) {
                    unstick();
                }
            }
            if (settings.triggerAtCenter === false) {
                if (bygpos < 46) {
                    if (settings.stickyAlready !== true) {
                        unstick();
                    }
                }
            }
        });
        return this;
    };
}(jQuery));
