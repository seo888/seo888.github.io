/*! ResponsiveSlides.js v1.54
 * http://responsiveslides.com
 * http://viljamis.com
 *
 * Copyright (c) 2011-2012 @viljamis
 * Available under the MIT license
 */

/*jslint browser: true, sloppy: true, vars: true, plusplus: true, indent: 4 */

(function ($, window, i) {
	if($.fn.responsiveSlides){
		return;
	}
	$.fn.responsiveSlides = function (options) {
		options.manualControls = options.manualControls && $(this).find(options.manualControls);
		options.navContainer = options.navContainer && $(this).find(options.navContainer);
		options.prevText = options.prevText || '«';
		options.nextText = options.nextText || '»';
		return $(this).find('ul.rslides-inner')._responsiveSlides(options);
	};
	$.fn._responsiveSlides = function (options) {
		// Default settings
		var settings = $.extend({
				"auto" : true, // Boolean: Animate automatically, true or false
				"speed" : 500, // Integer: Speed of the transition, in milliseconds
				"timeout" : 4000, // Integer: Time between slide transitions, in milliseconds
				"pager" : false, // Boolean: Show pager, true or false
				"nav" : false, // Boolean: Show navigation, true or false
				"random" : false, // Boolean: Randomize the order of the slides, true or false
				"pause" : false, // Boolean: Pause on hover, true or false
				"pauseControls" : true, // Boolean: Pause when hovering controls, true or false
				"prevText" : "Previous", // String: Text for the "previous" button
				"nextText" : "Next", // String: Text for the "next" button
				"maxwidth" : "", // Integer: Max-width of the slideshow, in pixels
				"maxheight" : "", // Integer: Max-height of the slideshow, in pixels
				"navContainer" : "", // Selector: Where auto generated controls should be appended to, default is after the <ul>
				"manualControls" : "", // Selector: Declare custom pager navigation
				"namespace" : "rslides", // String: change the default namespace used
				"before" : $.noop, // Function: Before callback
				"after" : $.noop // Function: After callback
			}, options);

		return this.each(function () {

			// Index for namespacing
			i++;

			var $this = $(this),

			// Local variables
			vendor,
			selectTab,
			startCycle,
			restartCycle,
			rotate,
			$tabs,

			// Helpers
			index = 0,
			$slide = $this.children(),
			length = $slide.size(),
			fadeTime = parseFloat(settings.speed),
			waitTime = parseFloat(settings.timeout),
			maxw = parseFloat(settings.maxwidth),
			maxh = parseFloat(settings.maxheight),

			// Namespacing
			namespace = settings.namespace,
			namespaceIdx = namespace + i,

			// Classes
			navClass = namespace + "-nav " + namespaceIdx + "-nav",
			activeClass = namespace + "-here",
			visibleClass = namespaceIdx + "-on",
			slideClassPrefix = namespaceIdx + "-s",

			// Pager
			$pager = $("<ul class='" + namespace + "-tabs " + namespaceIdx + "-tabs' />"),

			// Styles for visible and hidden slides
			visible = {
				"float" : "left",
				"position" : "relative",
				"opacity" : 1,
				"zIndex" : 2
			},
			hidden = {
				"float" : "none",
				"position" : "absolute",
				"opacity" : 0,
				"zIndex" : 1
			},

			// Detect transition support
			supportsTransitions = (function () {
				var docBody = document.body || document.documentElement;
				var styles = docBody.style;
				var prop = "transition";
				if (typeof styles[prop] === "string") {
					return true;
				}
				// Tests for vendor specific prop
				vendor = ["Moz", "Webkit", "Khtml", "O", "ms"];
				prop = prop.charAt(0).toUpperCase() + prop.substr(1);
				var i;
				for (i = 0; i < vendor.length; i++) {
					if (typeof styles[vendor[i] + prop] === "string") {
						return true;
					}
				}
				return false;
			})(),

			// Fading animation
			slideTo = function (idx) {
				// If CSS3 transitions are supported
				if (supportsTransitions) {
					$slide
					.removeClass(visibleClass)
					.css(hidden)
					.eq(idx)
					.addClass(visibleClass)
					.css(visible);
					index = idx;
					setTimeout(function () {
						settings.after(idx);
					}, fadeTime);
					// If not, use jQuery fallback
				} else {
					$slide
					.stop()
					.fadeOut(fadeTime, function () {
						$(this)
						.removeClass(visibleClass)
						.css(hidden)
						.css("opacity", 1);
					})
					.eq(idx)
					.fadeIn(fadeTime, function () {
						$(this)
						.addClass(visibleClass)
						.css(visible);
						settings.after(idx);
						index = idx;
					});
				}
			};

			// Random order
			if (settings.random) {
				$slide.sort(function () {
					return (Math.round(Math.random()) - 0.5);
				});
				$this
				.empty()
				.append($slide);
			}

			// Add ID's to each slide
			$slide.each(function (i) {
				this.id = slideClassPrefix + i;
			});

			// Add max-width and classes
			$this.addClass(namespace + " " + namespaceIdx);
			if (options && options.maxwidth) {
				$this.parent().css("max-width", maxw);
			}
			// Add max-height and classes
			if (options && options.maxheight) {
				$this.parent().css("max-height", maxh);
				$this.css("max-height", maxh);
			}
			// Hide all slides, then show first one
			$slide
			.hide()
			.css(hidden)
			.eq(0)
			.addClass(visibleClass)
			.css(visible)
			.show();

			// CSS transitions
			if (supportsTransitions) {
				$slide
				.show()
				.css({
					// -ms prefix isn't needed as IE10 uses prefix free version
					"-webkit-transition" : "opacity " + fadeTime + "ms ease-in-out",
					"-moz-transition" : "opacity " + fadeTime + "ms ease-in-out",
					"-o-transition" : "opacity " + fadeTime + "ms ease-in-out",
					"transition" : "opacity " + fadeTime + "ms ease-in-out"
				});
			}

			// Only run if there's more than one slide
			if ($slide.size() > 1) {

				// Make sure the timeout is at least 100ms longer than the fade
				if (waitTime < fadeTime + 100) {
					return;
				}

				// Pager
				if (settings.pager && !settings.manualControls) {
					var tabMarkup = [];
					$slide.each(function (i) {
						var n = i + 1;
						tabMarkup +=
						"<li>" +
						"<a href='#' class='" + slideClassPrefix + n + "'>" + n + "</a>" +
						"</li>";
					});
					
					$pager.append(tabMarkup);

					// Inject pager
					if (options.navContainer) {
						$(settings.navContainer).append($pager);
					} else {
						$this.after($pager);
					}
				}

				// Manual pager controls
				if (settings.manualControls) {
					$pager = $(settings.manualControls);
					$pager.addClass(namespace + "-tabs " + namespaceIdx + "-tabs");
				}

				// Add pager slide class prefixes
				if (settings.pager || settings.manualControls) {
					$pager.find('li').each(function (i) {
						$(this).addClass(slideClassPrefix + (i + 1));
					});
				}

				// If we have a pager, we need to set up the selectTab function
				if (settings.pager || settings.manualControls) {
					$tabs = $pager.find('a');

					// Select pager item
					selectTab = function (idx) {
						$tabs
						.closest("li")
						.removeClass(activeClass)
						.eq(idx)
						.addClass(activeClass);
					};
				}

				// Auto cycle
				if (settings.auto) {

					startCycle = function () {
						rotate = setInterval(function () {

								// Clear the event queue
								$slide.stop(true, true);

								var idx = index + 1 < length ? index + 1 : 0;

								// Remove active state and set new if pager is set
								if (settings.pager || settings.manualControls) {
									selectTab(idx);
								}

								slideTo(idx);
							}, waitTime);
					};

					// Init cycle
					startCycle();
				}

				// Restarting cycle
				restartCycle = function () {
					if (settings.auto) {
						// Stop
						clearInterval(rotate);
						// Restart
						startCycle();
					}
				};

				// Pause on hover
				if (settings.pause) {
					$this.hover(function () {
						clearInterval(rotate);
					}, function () {
						restartCycle();
					});
				}

				// Pager click event handler
				if (settings.pager || settings.manualControls) {
					$tabs.bind("click", function (e) {
						e.preventDefault();

						if (!settings.pauseControls) {
							restartCycle();
						}

						// Get index of clicked tab
						var idx = $tabs.index(this);

						// Break if element is already active or currently animated
						if (index === idx || $("." + visibleClass).queue('fx').length) {
							return;
						}

						// Remove active state from old tab and set new one
						selectTab(idx);

						// Do the animation
						slideTo(idx);
					})
					.eq(0)
					.closest("li")
					.addClass(activeClass);

					// Pause when hovering pager
					if (settings.pauseControls) {
						$tabs.hover(function () {
							clearInterval(rotate);
						}, function () {
							restartCycle();
						});
					}
				}

				// Navigation
				if (settings.nav) {
					var navMarkup =
						"<a href='#' class='" + navClass + " prev'>" + settings.prevText + "</a>" +
						"<a href='#' class='" + navClass + " next'>" + settings.nextText + "</a>";

					// Inject navigation
					if (options.navContainer) {
						$(settings.navContainer).append(navMarkup);
					} else {
						$this.after(navMarkup);
					}

					var $trigger = $("." + namespaceIdx + "-nav"),
					$prev = $trigger.filter(".prev");

					// Click event handler
					$trigger.bind("click", function (e) {
						e.preventDefault();

						var $visibleClass = $("." + visibleClass);

						// Prevent clicking if currently animated
						if ($visibleClass.queue('fx').length) {
							return;
						}

						//  Adds active class during slide animation
						//  $(this)
						//    .addClass(namespace + "-active")
						//    .delay(fadeTime)
						//    .queue(function (next) {
						//      $(this).removeClass(namespace + "-active");
						//      next();
						//  });

						// Determine where to slide
						var idx = $slide.index($visibleClass),
						prevIdx = idx - 1,
						nextIdx = idx + 1 < length ? index + 1 : 0;

						// Go to slide
						slideTo($(this)[0] === $prev[0] ? prevIdx : nextIdx);
						if (settings.pager || settings.manualControls) {
							selectTab($(this)[0] === $prev[0] ? prevIdx : nextIdx);
						}

						if (!settings.pauseControls) {
							restartCycle();
						}
					});

					// Pause when hovering navigation
					if (settings.pauseControls) {
						$trigger.hover(function () {
							clearInterval(rotate);
						}, function () {
							restartCycle();
						});
					}
				}

			}

			// Max-width fallback
			if (typeof document.body.style.maxWidth === "undefined" && options.maxwidth) {
				var widthSupport = function () {
					$this.parent().css("width", "100%");
					if ($this.parent().width() > maxw) {
						$this.parent().css("width", maxw);
					}
				};

				// Init fallback
				widthSupport();
				$(window).bind("resize", function () {
					widthSupport();
				});
			}
			// Max-height fallback
			if (typeof document.body.style.maxHeight === "undefined" && options.maxheight) {
				var heightSupport = function () {
					$this.parent().css("height", "100%");
					if ($this.parent().height() > maxh) {
						$this.parent().css("height", maxh);
					}
				};

				// Init fallback
				heightSupport();
				$(window).bind("resize", function () {
					heightSupport();
				});
			}
			if ( options.fillHeight) {
				var heightSupport = function () {
					var $row = $this.parent().parent().parent();
					if($row.prop('className').indexOf('row')!=-1){
						$this.parent().css("height",'100%');
						$this.parent().css("height", $row.height());
					}
				};
				heightSupport();
				$(window).bind("resize", function () {
					heightSupport();
				});

			}
			$this.parent().addClass(namespace+"-loaded");
		});
	};
})(jQuery, this, 0);

$(function () {
	$(".rslides").not(".rslides-loaded,.rslides-inner").each(function () {
		var s = $(this);
		var m = s.attr("maxwidth");
		var h = s.attr("maxheight");
		
		if (s.hasClass("rslides-14")) {
			s.responsiveSlides({
				manualControls : 'ul.rslides-tabs',
				maxwidth : m,
				maxheight : h
			});
			return;
		}
		if (s.hasClass("rslides-8") || s.hasClass("rslides-9") || s.hasClass("rslides-10") || s.hasClass("rslides-13") || s.hasClass("rslides-14")) {
			s.responsiveSlides({
				manualControls : 'ul.rslides-tabs',
				maxwidth : m
			});
			return;
		}
		if (s.hasClass("rslides-1") || s.hasClass("rslides-5") || s.hasClass("rslides-6")) {
			s.responsiveSlides({
				pager : true,
				maxwidth : m
			});
			return;
		}
		if (s.hasClass("rslides-12") || s.hasClass("rslides-2") || s.hasClass("rslides-3") || s.hasClass("rslides-7")) {
			s.responsiveSlides({
				nav : true,
				maxwidth : m
			});
			return;
		}
		if (s.hasClass("rslides-4")) {
			s.responsiveSlides({
				nav : true,
				pager : true,
				maxwidth : m
			});
			return;
		}
		if (s.hasClass("rslides-11")) {
			s.responsiveSlides({
				nav : true,
				pager : true,
				fillHeight : true,
				maxwidth : m
			});
			return;
		}

	});
});
