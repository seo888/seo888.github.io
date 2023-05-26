! function o(r, n, l) {
	function d(t, e) {
		if(!n[t]) {
			if(!r[t]) {
				var a = "function" == typeof require && require;
				if(!e && a) return a(t, !0);
				if(c) return c(t, !0);
				var i = new Error("Cannot find module '" + t + "'");
				throw i.code = "MODULE_NOT_FOUND", i
			}
			var s = n[t] = {
				exports: {}
			};
			r[t][0].call(s.exports, function(e) {
				return d(r[t][1][e] || e)
			}, s, s.exports, o, r, n, l)
		}
		return n[t].exports
	}
	for(var c = "function" == typeof require && require, e = 0; e < l.length; e++) d(l[e]);
	return d
}({
	1: [function(e, t, a) {
		"use strict";

		function c(e) {
			return(c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			})(e)
		}
		/*!
		 * Bootstrap v3.3.7 (http://getbootstrap.com)
		 * Copyright 2011-2016 Twitter, Inc.
		 * Licensed under the MIT license
		 */
		if("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
		var i;
		! function() {
			var e = jQuery.fn.jquery.split(" ")[0].split(".");
			if(e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || 3 < e[0]) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
		}(), (i = jQuery).fn.emulateTransitionEnd = function(e) {
				var t = !1,
					a = this;
				i(this).one("bsTransitionEnd", function() {
					t = !0
				});
				return setTimeout(function() {
					t || i(a).trigger(i.support.transition.end)
				}, e), this
			}, i(function() {
				i.support.transition = function() {
					var e = document.createElement("bootstrap"),
						t = {
							WebkitTransition: "webkitTransitionEnd",
							MozTransition: "transitionend",
							OTransition: "oTransitionEnd otransitionend",
							transition: "transitionend"
						};
					for(var a in t)
						if(void 0 !== e.style[a]) return {
							end: t[a]
						};
					return !1
				}(), i.support.transition && (i.event.special.bsTransitionEnd = {
					bindType: i.support.transition.end,
					delegateType: i.support.transition.end,
					handle: function(e) {
						if(i(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
					}
				})
			}),
			function(o) {
				function r(e) {
					o(e).on("click", t, this.close)
				}
				var t = '[data-dismiss="alert"]';
				r.VERSION = "3.3.7", r.TRANSITION_DURATION = 150, r.prototype.close = function(e) {
					var t = o(this),
						a = t.attr("data-target");
					a = a || (a = t.attr("href")) && a.replace(/.*(?=#[^\s]*$)/, "");
					var i = o("#" === a ? [] : a);

					function s() {
						i.detach().trigger("closed.bs.alert").remove()
					}
					e && e.preventDefault(), i.length || (i = t.closest(".alert")), i.trigger(e = o.Event("close.bs.alert")), e.isDefaultPrevented() || (i.removeClass("in"), o.support.transition && i.hasClass("fade") ? i.one("bsTransitionEnd", s).emulateTransitionEnd(r.TRANSITION_DURATION) : s())
				};
				var e = o.fn.alert;
				o.fn.alert = function(a) {
					return this.each(function() {
						var e = o(this),
							t = e.data("bs.alert");
						t || e.data("bs.alert", t = new r(this)), "string" == typeof a && t[a].call(e)
					})
				}, o.fn.alert.Constructor = r, o.fn.alert.noConflict = function() {
					return o.fn.alert = e, this
				}, o(document).on("click.bs.alert.data-api", t, r.prototype.close)
			}(jQuery),
			function(o) {
				function s(e, t) {
					this.$element = o(e), this.options = o.extend({}, s.DEFAULTS, t), this.isLoading = !1
				}

				function a(i) {
					return this.each(function() {
						var e = o(this),
							t = e.data("bs.button"),
							a = "object" == c(i) && i;
						t || e.data("bs.button", t = new s(this, a)), "toggle" == i ? t.toggle() : i && t.setState(i)
					})
				}
				s.VERSION = "3.3.7", s.DEFAULTS = {
					loadingText: "loading..."
				}, s.prototype.setState = function(e) {
					var t = "disabled",
						a = this.$element,
						i = a.is("input") ? "val" : "html",
						s = a.data();
					e += "Text", null == s.resetText && a.data("resetText", a[i]()), setTimeout(o.proxy(function() {
						a[i](null == s[e] ? this.options[e] : s[e]), "loadingText" == e ? (this.isLoading = !0, a.addClass(t).attr(t, t).prop(t, !0)) : this.isLoading && (this.isLoading = !1, a.removeClass(t).removeAttr(t).prop(t, !1))
					}, this), 0)
				}, s.prototype.toggle = function() {
					var e = !0,
						t = this.$element.closest('[data-toggle="buttons"]');
					if(t.length) {
						var a = this.$element.find("input");
						"radio" == a.prop("type") ? (a.prop("checked") && (e = !1), t.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == a.prop("type") && (a.prop("checked") !== this.$element.hasClass("active") && (e = !1), this.$element.toggleClass("active")), a.prop("checked", this.$element.hasClass("active")), e && a.trigger("change")
					} else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
				};
				var e = o.fn.button;
				o.fn.button = a, o.fn.button.Constructor = s, o.fn.button.noConflict = function() {
					return o.fn.button = e, this
				}, o(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(e) {
					var t = o(e.target).closest(".btn");
					a.call(t, "toggle"), o(e.target).is('input[type="radio"], input[type="checkbox"]') || (e.preventDefault(), t.is("input,button") ? t.trigger("focus") : t.find("input:visible,button:visible").first().trigger("focus"))
				}).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
					o(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
				})
			}(jQuery),
			function(p) {
				function u(e, t) {
					this.$element = p(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = t, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", p.proxy(this.keydown, this)), "hover" != this.options.pause || "ontouchstart" in document.documentElement || this.$element.on("mouseenter.bs.carousel", p.proxy(this.pause, this)).on("mouseleave.bs.carousel", p.proxy(this.cycle, this))
				}

				function r(s) {
					return this.each(function() {
						var e = p(this),
							t = e.data("bs.carousel"),
							a = p.extend({}, u.DEFAULTS, e.data(), "object" == c(s) && s),
							i = "string" == typeof s ? s : a.slide;
						t || e.data("bs.carousel", t = new u(this, a)), "number" == typeof s ? t.to(s) : i ? t[i]() : a.interval && t.pause().cycle()
					})
				}
				u.VERSION = "3.3.7", u.TRANSITION_DURATION = 600, u.DEFAULTS = {
					interval: 5e3,
					pause: "hover",
					wrap: !0,
					keyboard: !0
				}, u.prototype.keydown = function(e) {
					if(!/input|textarea/i.test(e.target.tagName)) {
						switch(e.which) {
							case 37:
								this.prev();
								break;
							case 39:
								this.next();
								break;
							default:
								return
						}
						e.preventDefault()
					}
				}, u.prototype.cycle = function(e) {
					return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(p.proxy(this.next, this), this.options.interval)), this
				}, u.prototype.getItemIndex = function(e) {
					return this.$items = e.parent().children(".item"), this.$items.index(e || this.$active)
				}, u.prototype.getItemForDirection = function(e, t) {
					var a = this.getItemIndex(t);
					if(("prev" == e && 0 === a || "next" == e && a == this.$items.length - 1) && !this.options.wrap) return t;
					var i = (a + ("prev" == e ? -1 : 1)) % this.$items.length;
					return this.$items.eq(i)
				}, u.prototype.to = function(e) {
					var t = this,
						a = this.getItemIndex(this.$active = this.$element.find(".item.active"));
					if(!(e > this.$items.length - 1 || e < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
						t.to(e)
					}) : a == e ? this.pause().cycle() : this.slide(a < e ? "next" : "prev", this.$items.eq(e))
				}, u.prototype.pause = function(e) {
					return e || (this.paused = !0), this.$element.find(".next, .prev").length && p.support.transition && (this.$element.trigger(p.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
				}, u.prototype.next = function() {
					if(!this.sliding) return this.slide("next")
				}, u.prototype.prev = function() {
					if(!this.sliding) return this.slide("prev")
				}, u.prototype.slide = function(e, t) {
					var a = this.$element.find(".item.active"),
						i = t || this.getItemForDirection(e, a),
						s = this.interval,
						o = "next" == e ? "left" : "right",
						r = this;
					if(i.hasClass("active")) return this.sliding = !1;
					var n = i[0],
						l = p.Event("slide.bs.carousel", {
							relatedTarget: n,
							direction: o
						});
					if(this.$element.trigger(l), !l.isDefaultPrevented()) {
						if(this.sliding = !0, s && this.pause(), this.$indicators.length) {
							this.$indicators.find(".active").removeClass("active");
							var d = p(this.$indicators.children()[this.getItemIndex(i)]);
							d && d.addClass("active")
						}
						var c = p.Event("slid.bs.carousel", {
							relatedTarget: n,
							direction: o
						});
						return p.support.transition && this.$element.hasClass("slide") ? (i.addClass(e), i[0].offsetWidth, a.addClass(o), i.addClass(o), a.one("bsTransitionEnd", function() {
							i.removeClass([e, o].join(" ")).addClass("active"), a.removeClass(["active", o].join(" ")), r.sliding = !1, setTimeout(function() {
								r.$element.trigger(c)
							}, 0)
						}).emulateTransitionEnd(u.TRANSITION_DURATION)) : (a.removeClass("active"), i.addClass("active"), this.sliding = !1, this.$element.trigger(c)), s && this.cycle(), this
					}
				};
				var e = p.fn.carousel;
				p.fn.carousel = r, p.fn.carousel.Constructor = u, p.fn.carousel.noConflict = function() {
					return p.fn.carousel = e, this
				};

				function t(e) {
					var t, a = p(this),
						i = p(a.attr("data-target") || (t = a.attr("href")) && t.replace(/.*(?=#[^\s]+$)/, ""));
					if(i.hasClass("carousel")) {
						var s = p.extend({}, i.data(), a.data()),
							o = a.attr("data-slide-to");
						o && (s.interval = !1), r.call(i, s), o && i.data("bs.carousel").to(o), e.preventDefault()
					}
				}
				p(document).on("click.bs.carousel.data-api", "[data-slide]", t).on("click.bs.carousel.data-api", "[data-slide-to]", t), p(window).on("load", function() {
					p('[data-ride="carousel"]').each(function() {
						var e = p(this);
						r.call(e, e.data())
					})
				})
			}(jQuery),
			function(r) {
				function n(e, t) {
					this.$element = r(e), this.options = r.extend({}, n.DEFAULTS, t), this.$trigger = r('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
				}

				function s(e) {
					var t, a = e.attr("data-target") || (t = e.attr("href")) && t.replace(/.*(?=#[^\s]+$)/, "");
					return r(a)
				}

				function l(i) {
					return this.each(function() {
						var e = r(this),
							t = e.data("bs.collapse"),
							a = r.extend({}, n.DEFAULTS, e.data(), "object" == c(i) && i);
						!t && a.toggle && /show|hide/.test(i) && (a.toggle = !1), t || e.data("bs.collapse", t = new n(this, a)), "string" == typeof i && t[i]()
					})
				}
				n.VERSION = "3.3.7", n.TRANSITION_DURATION = 350, n.DEFAULTS = {
					toggle: !0
				}, n.prototype.dimension = function() {
					return this.$element.hasClass("width") ? "width" : "height"
				}, n.prototype.show = function() {
					if(!this.transitioning && !this.$element.hasClass("in")) {
						var e, t = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
						if(!(t && t.length && (e = t.data("bs.collapse")) && e.transitioning)) {
							var a = r.Event("show.bs.collapse");
							if(this.$element.trigger(a), !a.isDefaultPrevented()) {
								t && t.length && (l.call(t, "hide"), e || t.data("bs.collapse", null));
								var i = this.dimension();
								this.$element.removeClass("collapse").addClass("collapsing")[i](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
								var s = function() {
									this.$element.removeClass("collapsing").addClass("collapse in")[i](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
								};
								if(!r.support.transition) return s.call(this);
								var o = r.camelCase(["scroll", i].join("-"));
								this.$element.one("bsTransitionEnd", r.proxy(s, this)).emulateTransitionEnd(n.TRANSITION_DURATION)[i](this.$element[0][o])
							}
						}
					}
				}, n.prototype.hide = function() {
					if(!this.transitioning && this.$element.hasClass("in")) {
						var e = r.Event("hide.bs.collapse");
						if(this.$element.trigger(e), !e.isDefaultPrevented()) {
							var t = this.dimension();
							this.$element[t](this.$element[t]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
							var a = function() {
								this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
							};
							if(!r.support.transition) return a.call(this);
							this.$element[t](0).one("bsTransitionEnd", r.proxy(a, this)).emulateTransitionEnd(n.TRANSITION_DURATION)
						}
					}
				}, n.prototype.toggle = function() {
					this[this.$element.hasClass("in") ? "hide" : "show"]()
				}, n.prototype.getParent = function() {
					return r(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(r.proxy(function(e, t) {
						var a = r(t);
						this.addAriaAndCollapsedClass(s(a), a)
					}, this)).end()
				}, n.prototype.addAriaAndCollapsedClass = function(e, t) {
					var a = e.hasClass("in");
					e.attr("aria-expanded", a), t.toggleClass("collapsed", !a).attr("aria-expanded", a)
				};
				var e = r.fn.collapse;
				r.fn.collapse = l, r.fn.collapse.Constructor = n, r.fn.collapse.noConflict = function() {
					return r.fn.collapse = e, this
				}, r(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(e) {
					var t = r(this);
					t.attr("data-target") || e.preventDefault();
					var a = s(t),
						i = a.data("bs.collapse") ? "toggle" : t.data();
					l.call(a, i)
				})
			}(jQuery),
			function(r) {
				function i(e) {
					r(e).on("click.bs.dropdown", this.toggle)
				}
				var n = '[data-toggle="dropdown"]';

				function l(e) {
					var t = e.attr("data-target"),
						a = (t = t || (t = e.attr("href")) && /#[A-Za-z]/.test(t) && t.replace(/.*(?=#[^\s]*$)/, "")) && r(t);
					return a && a.length ? a : e.parent()
				}

				function o(i) {
					i && 3 === i.which || (r(".dropdown-backdrop").remove(), r(n).each(function() {
						var e = r(this),
							t = l(e),
							a = {
								relatedTarget: this
							};
						t.hasClass("open") && (i && "click" == i.type && /input|textarea/i.test(i.target.tagName) && r.contains(t[0], i.target) || (t.trigger(i = r.Event("hide.bs.dropdown", a)), i.isDefaultPrevented() || (e.attr("aria-expanded", "false"), t.removeClass("open").trigger(r.Event("hidden.bs.dropdown", a)))))
					}))
				}
				i.VERSION = "3.3.7", i.prototype.toggle = function(e) {
					var t = r(this);
					if(!t.is(".disabled, :disabled")) {
						var a = l(t),
							i = a.hasClass("open");
						if(o(), !i) {
							"ontouchstart" in document.documentElement && !a.closest(".navbar-nav").length && r(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(r(this)).on("click", o);
							var s = {
								relatedTarget: this
							};
							if(a.trigger(e = r.Event("show.bs.dropdown", s)), e.isDefaultPrevented()) return;
							t.trigger("focus").attr("aria-expanded", "true"), a.toggleClass("open").trigger(r.Event("shown.bs.dropdown", s))
						}
						return !1
					}
				}, i.prototype.keydown = function(e) {
					if(/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
						var t = r(this);
						if(e.preventDefault(), e.stopPropagation(), !t.is(".disabled, :disabled")) {
							var a = l(t),
								i = a.hasClass("open");
							if(!i && 27 != e.which || i && 27 == e.which) return 27 == e.which && a.find(n).trigger("focus"), t.trigger("click");
							var s = a.find(".dropdown-menu li:not(.disabled):visible a");
							if(s.length) {
								var o = s.index(e.target);
								38 == e.which && 0 < o && o--, 40 == e.which && o < s.length - 1 && o++, ~o || (o = 0), s.eq(o).trigger("focus")
							}
						}
					}
				};
				var e = r.fn.dropdown;
				r.fn.dropdown = function(a) {
					return this.each(function() {
						var e = r(this),
							t = e.data("bs.dropdown");
						t || e.data("bs.dropdown", t = new i(this)), "string" == typeof a && t[a].call(e)
					})
				}, r.fn.dropdown.Constructor = i, r.fn.dropdown.noConflict = function() {
					return r.fn.dropdown = e, this
				}, r(document).on("click.bs.dropdown.data-api", o).on("click.bs.dropdown.data-api", ".dropdown form", function(e) {
					e.stopPropagation()
				}).on("click.bs.dropdown.data-api", n, i.prototype.toggle).on("keydown.bs.dropdown.data-api", n, i.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", i.prototype.keydown)
			}(jQuery),
			function(o) {
				function r(e, t) {
					this.options = t, this.$body = o(document.body), this.$element = o(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, o.proxy(function() {
						this.$element.trigger("loaded.bs.modal")
					}, this))
				}

				function n(i, s) {
					return this.each(function() {
						var e = o(this),
							t = e.data("bs.modal"),
							a = o.extend({}, r.DEFAULTS, e.data(), "object" == c(i) && i);
						t || e.data("bs.modal", t = new r(this, a)), "string" == typeof i ? t[i](s) : a.show && t.show(s)
					})
				}
				r.VERSION = "3.3.7", r.TRANSITION_DURATION = 300, r.BACKDROP_TRANSITION_DURATION = 150, r.DEFAULTS = {
					backdrop: !0,
					keyboard: !0,
					show: !0
				}, r.prototype.toggle = function(e) {
					return this.isShown ? this.hide() : this.show(e)
				}, r.prototype.show = function(a) {
					var i = this,
						e = o.Event("show.bs.modal", {
							relatedTarget: a
						});
					this.$element.trigger(e), this.isShown || e.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', o.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
						i.$element.one("mouseup.dismiss.bs.modal", function(e) {
							o(e.target).is(i.$element) && (i.ignoreBackdropClick = !0)
						})
					}), this.backdrop(function() {
						var e = o.support.transition && i.$element.hasClass("fade");
						i.$element.parent().length || i.$element.appendTo(i.$body), i.$element.show().scrollTop(0), i.adjustDialog(), e && i.$element[0].offsetWidth, i.$element.addClass("in"), i.enforceFocus();
						var t = o.Event("shown.bs.modal", {
							relatedTarget: a
						});
						e ? i.$dialog.one("bsTransitionEnd", function() {
							i.$element.trigger("focus").trigger(t)
						}).emulateTransitionEnd(r.TRANSITION_DURATION) : i.$element.trigger("focus").trigger(t)
					}))
				}, r.prototype.hide = function(e) {
					e && e.preventDefault(), e = o.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), o(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), o.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", o.proxy(this.hideModal, this)).emulateTransitionEnd(r.TRANSITION_DURATION) : this.hideModal())
				}, r.prototype.enforceFocus = function() {
					o(document).off("focusin.bs.modal").on("focusin.bs.modal", o.proxy(function(e) {
						document === e.target || this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.trigger("focus")
					}, this))
				}, r.prototype.escape = function() {
					this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", o.proxy(function(e) {
						27 == e.which && this.hide()
					}, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
				}, r.prototype.resize = function() {
					this.isShown ? o(window).on("resize.bs.modal", o.proxy(this.handleUpdate, this)) : o(window).off("resize.bs.modal")
				}, r.prototype.hideModal = function() {
					var e = this;
					this.$element.hide(), this.backdrop(function() {
						e.$body.removeClass("modal-open"), e.resetAdjustments(), e.resetScrollbar(), e.$element.trigger("hidden.bs.modal")
					})
				}, r.prototype.removeBackdrop = function() {
					this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
				}, r.prototype.backdrop = function(e) {
					var t = this,
						a = this.$element.hasClass("fade") ? "fade" : "";
					if(this.isShown && this.options.backdrop) {
						var i = o.support.transition && a;
						if(this.$backdrop = o(document.createElement("div")).addClass("modal-backdrop " + a).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", o.proxy(function(e) {
								this.ignoreBackdropClick ? this.ignoreBackdropClick = !1 : e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide())
							}, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
						i ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(r.BACKDROP_TRANSITION_DURATION) : e()
					} else if(!this.isShown && this.$backdrop) {
						this.$backdrop.removeClass("in");
						var s = function() {
							t.removeBackdrop(), e && e()
						};
						o.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", s).emulateTransitionEnd(r.BACKDROP_TRANSITION_DURATION) : s()
					} else e && e()
				}, r.prototype.handleUpdate = function() {
					this.adjustDialog()
				}, r.prototype.adjustDialog = function() {
					var e = this.$element[0].scrollHeight > document.documentElement.clientHeight;
					this.$element.css({
						paddingLeft: !this.bodyIsOverflowing && e ? this.scrollbarWidth : "",
						paddingRight: this.bodyIsOverflowing && !e ? this.scrollbarWidth : ""
					})
				}, r.prototype.resetAdjustments = function() {
					this.$element.css({
						paddingLeft: "",
						paddingRight: ""
					})
				}, r.prototype.checkScrollbar = function() {
					var e = window.innerWidth;
					if(!e) {
						var t = document.documentElement.getBoundingClientRect();
						e = t.right - Math.abs(t.left)
					}
					this.bodyIsOverflowing = document.body.clientWidth < e, this.scrollbarWidth = this.measureScrollbar()
				}, r.prototype.setScrollbar = function() {
					var e = parseInt(this.$body.css("padding-right") || 0, 10);
					this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", e + this.scrollbarWidth)
				}, r.prototype.resetScrollbar = function() {
					this.$body.css("padding-right", this.originalBodyPad)
				}, r.prototype.measureScrollbar = function() {
					var e = document.createElement("div");
					e.className = "modal-scrollbar-measure", this.$body.append(e);
					var t = e.offsetWidth - e.clientWidth;
					return this.$body[0].removeChild(e), t
				};
				var e = o.fn.modal;
				o.fn.modal = n, o.fn.modal.Constructor = r, o.fn.modal.noConflict = function() {
					return o.fn.modal = e, this
				}, o(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
					var t = o(this),
						a = t.attr("href"),
						i = o(t.attr("data-target") || a && a.replace(/.*(?=#[^\s]+$)/, "")),
						s = i.data("bs.modal") ? "toggle" : o.extend({
							remote: !/#/.test(a) && a
						}, i.data(), t.data());
					t.is("a") && e.preventDefault(), i.one("show.bs.modal", function(e) {
						e.isDefaultPrevented() || i.one("hidden.bs.modal", function() {
							t.is(":visible") && t.trigger("focus")
						})
					}), n.call(i, s, this)
				})
			}(jQuery),
			function(f) {
				function g(e, t) {
					this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", e, t)
				}
				g.VERSION = "3.3.7", g.TRANSITION_DURATION = 150, g.DEFAULTS = {
					animation: !0,
					placement: "top",
					selector: !1,
					template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
					trigger: "hover focus",
					title: "",
					delay: 0,
					html: !1,
					container: !1,
					viewport: {
						selector: "body",
						padding: 0
					}
				}, g.prototype.init = function(e, t, a) {
					if(this.enabled = !0, this.type = e, this.$element = f(t), this.options = this.getOptions(a), this.$viewport = this.options.viewport && f(f.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
							click: !1,
							hover: !1,
							focus: !1
						}, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
					for(var i = this.options.trigger.split(" "), s = i.length; s--;) {
						var o = i[s];
						if("click" == o) this.$element.on("click." + this.type, this.options.selector, f.proxy(this.toggle, this));
						else if("manual" != o) {
							var r = "hover" == o ? "mouseenter" : "focusin",
								n = "hover" == o ? "mouseleave" : "focusout";
							this.$element.on(r + "." + this.type, this.options.selector, f.proxy(this.enter, this)), this.$element.on(n + "." + this.type, this.options.selector, f.proxy(this.leave, this))
						}
					}
					this.options.selector ? this._options = f.extend({}, this.options, {
						trigger: "manual",
						selector: ""
					}) : this.fixTitle()
				}, g.prototype.getDefaults = function() {
					return g.DEFAULTS
				}, g.prototype.getOptions = function(e) {
					return(e = f.extend({}, this.getDefaults(), this.$element.data(), e)).delay && "number" == typeof e.delay && (e.delay = {
						show: e.delay,
						hide: e.delay
					}), e
				}, g.prototype.getDelegateOptions = function() {
					var a = {},
						i = this.getDefaults();
					return this._options && f.each(this._options, function(e, t) {
						i[e] != t && (a[e] = t)
					}), a
				}, g.prototype.enter = function(e) {
					var t = e instanceof this.constructor ? e : f(e.currentTarget).data("bs." + this.type);
					if(t || (t = new this.constructor(e.currentTarget, this.getDelegateOptions()), f(e.currentTarget).data("bs." + this.type, t)), e instanceof f.Event && (t.inState["focusin" == e.type ? "focus" : "hover"] = !0), t.tip().hasClass("in") || "in" == t.hoverState) t.hoverState = "in";
					else {
						if(clearTimeout(t.timeout), t.hoverState = "in", !t.options.delay || !t.options.delay.show) return t.show();
						t.timeout = setTimeout(function() {
							"in" == t.hoverState && t.show()
						}, t.options.delay.show)
					}
				}, g.prototype.isInStateTrue = function() {
					for(var e in this.inState)
						if(this.inState[e]) return !0;
					return !1
				}, g.prototype.leave = function(e) {
					var t = e instanceof this.constructor ? e : f(e.currentTarget).data("bs." + this.type);
					if(t || (t = new this.constructor(e.currentTarget, this.getDelegateOptions()), f(e.currentTarget).data("bs." + this.type, t)), e instanceof f.Event && (t.inState["focusout" == e.type ? "focus" : "hover"] = !1), !t.isInStateTrue()) {
						if(clearTimeout(t.timeout), t.hoverState = "out", !t.options.delay || !t.options.delay.hide) return t.hide();
						t.timeout = setTimeout(function() {
							"out" == t.hoverState && t.hide()
						}, t.options.delay.hide)
					}
				}, g.prototype.show = function() {
					var e = f.Event("show.bs." + this.type);
					if(this.hasContent() && this.enabled) {
						this.$element.trigger(e);
						var t = f.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
						if(e.isDefaultPrevented() || !t) return;
						var a = this,
							i = this.tip(),
							s = this.getUID(this.type);
						this.setContent(), i.attr("id", s), this.$element.attr("aria-describedby", s), this.options.animation && i.addClass("fade");
						var o = "function" == typeof this.options.placement ? this.options.placement.call(this, i[0], this.$element[0]) : this.options.placement,
							r = /\s?auto?\s?/i,
							n = r.test(o);
						n && (o = o.replace(r, "") || "top"), i.detach().css({
							top: 0,
							left: 0,
							display: "block"
						}).addClass(o).data("bs." + this.type, this), this.options.container ? i.appendTo(this.options.container) : i.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
						var l = this.getPosition(),
							d = i[0].offsetWidth,
							c = i[0].offsetHeight;
						if(n) {
							var p = o,
								u = this.getPosition(this.$viewport);
							o = "bottom" == o && l.bottom + c > u.bottom ? "top" : "top" == o && l.top - c < u.top ? "bottom" : "right" == o && l.right + d > u.width ? "left" : "left" == o && l.left - d < u.left ? "right" : o, i.removeClass(p).addClass(o)
						}
						var h = this.getCalculatedOffset(o, l, d, c);
						this.applyPlacement(h, o);
						var m = function() {
							var e = a.hoverState;
							a.$element.trigger("shown.bs." + a.type), a.hoverState = null, "out" == e && a.leave(a)
						};
						f.support.transition && this.$tip.hasClass("fade") ? i.one("bsTransitionEnd", m).emulateTransitionEnd(g.TRANSITION_DURATION) : m()
					}
				}, g.prototype.applyPlacement = function(e, t) {
					var a = this.tip(),
						i = a[0].offsetWidth,
						s = a[0].offsetHeight,
						o = parseInt(a.css("margin-top"), 10),
						r = parseInt(a.css("margin-left"), 10);
					isNaN(o) && (o = 0), isNaN(r) && (r = 0), e.top += o, e.left += r, f.offset.setOffset(a[0], f.extend({
						using: function(e) {
							a.css({
								top: Math.round(e.top),
								left: Math.round(e.left)
							})
						}
					}, e), 0), a.addClass("in");
					var n = a[0].offsetWidth,
						l = a[0].offsetHeight;
					"top" == t && l != s && (e.top = e.top + s - l);
					var d = this.getViewportAdjustedDelta(t, e, n, l);
					d.left ? e.left += d.left : e.top += d.top;
					var c = /top|bottom/.test(t),
						p = c ? 2 * d.left - i + n : 2 * d.top - s + l,
						u = c ? "offsetWidth" : "offsetHeight";
					a.offset(e), this.replaceArrow(p, a[0][u], c)
				}, g.prototype.replaceArrow = function(e, t, a) {
					this.arrow().css(a ? "left" : "top", 50 * (1 - e / t) + "%").css(a ? "top" : "left", "")
				}, g.prototype.setContent = function() {
					var e = this.tip(),
						t = this.getTitle();
					e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
				}, g.prototype.hide = function(e) {
					var t = this,
						a = f(this.$tip),
						i = f.Event("hide.bs." + this.type);

					function s() {
						"in" != t.hoverState && a.detach(), t.$element && t.$element.removeAttr("aria-describedby").trigger("hidden.bs." + t.type), e && e()
					}
					if(this.$element.trigger(i), !i.isDefaultPrevented()) return a.removeClass("in"), f.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", s).emulateTransitionEnd(g.TRANSITION_DURATION) : s(), this.hoverState = null, this
				}, g.prototype.fixTitle = function() {
					var e = this.$element;
					!e.attr("title") && "string" == typeof e.attr("data-original-title") || e.attr("data-original-title", e.attr("title") || "").attr("title", "")
				}, g.prototype.hasContent = function() {
					return this.getTitle()
				}, g.prototype.getPosition = function(e) {
					var t = (e = e || this.$element)[0],
						a = "BODY" == t.tagName,
						i = t.getBoundingClientRect();
					null == i.width && (i = f.extend({}, i, {
						width: i.right - i.left,
						height: i.bottom - i.top
					}));
					var s = window.SVGElement && t instanceof window.SVGElement,
						o = a ? {
							top: 0,
							left: 0
						} : s ? null : e.offset(),
						r = {
							scroll: a ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
						},
						n = a ? {
							width: f(window).width(),
							height: f(window).height()
						} : null;
					return f.extend({}, i, r, n, o)
				}, g.prototype.getCalculatedOffset = function(e, t, a, i) {
					return "bottom" == e ? {
						top: t.top + t.height,
						left: t.left + t.width / 2 - a / 2
					} : "top" == e ? {
						top: t.top - i,
						left: t.left + t.width / 2 - a / 2
					} : "left" == e ? {
						top: t.top + t.height / 2 - i / 2,
						left: t.left - a
					} : {
						top: t.top + t.height / 2 - i / 2,
						left: t.left + t.width
					}
				}, g.prototype.getViewportAdjustedDelta = function(e, t, a, i) {
					var s = {
						top: 0,
						left: 0
					};
					if(!this.$viewport) return s;
					var o = this.options.viewport && this.options.viewport.padding || 0,
						r = this.getPosition(this.$viewport);
					if(/right|left/.test(e)) {
						var n = t.top - o - r.scroll,
							l = t.top + o - r.scroll + i;
						n < r.top ? s.top = r.top - n : l > r.top + r.height && (s.top = r.top + r.height - l)
					} else {
						var d = t.left - o,
							c = t.left + o + a;
						d < r.left ? s.left = r.left - d : c > r.right && (s.left = r.left + r.width - c)
					}
					return s
				}, g.prototype.getTitle = function() {
					var e = this.$element,
						t = this.options;
					return e.attr("data-original-title") || ("function" == typeof t.title ? t.title.call(e[0]) : t.title)
				}, g.prototype.getUID = function(e) {
					for(; e += ~~(1e6 * Math.random()), document.getElementById(e););
					return e
				}, g.prototype.tip = function() {
					if(!this.$tip && (this.$tip = f(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
					return this.$tip
				}, g.prototype.arrow = function() {
					return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
				}, g.prototype.enable = function() {
					this.enabled = !0
				}, g.prototype.disable = function() {
					this.enabled = !1
				}, g.prototype.toggleEnabled = function() {
					this.enabled = !this.enabled
				}, g.prototype.toggle = function(e) {
					var t = this;
					e && ((t = f(e.currentTarget).data("bs." + this.type)) || (t = new this.constructor(e.currentTarget, this.getDelegateOptions()), f(e.currentTarget).data("bs." + this.type, t))), e ? (t.inState.click = !t.inState.click, t.isInStateTrue() ? t.enter(t) : t.leave(t)) : t.tip().hasClass("in") ? t.leave(t) : t.enter(t)
				}, g.prototype.destroy = function() {
					var e = this;
					clearTimeout(this.timeout), this.hide(function() {
						e.$element.off("." + e.type).removeData("bs." + e.type), e.$tip && e.$tip.detach(), e.$tip = null, e.$arrow = null, e.$viewport = null, e.$element = null
					})
				};
				var e = f.fn.tooltip;
				f.fn.tooltip = function(i) {
					return this.each(function() {
						var e = f(this),
							t = e.data("bs.tooltip"),
							a = "object" == c(i) && i;
						!t && /destroy|hide/.test(i) || (t || e.data("bs.tooltip", t = new g(this, a)), "string" == typeof i && t[i]())
					})
				}, f.fn.tooltip.Constructor = g, f.fn.tooltip.noConflict = function() {
					return f.fn.tooltip = e, this
				}
			}(jQuery),
			function(s) {
				function o(e, t) {
					this.init("popover", e, t)
				}
				if(!s.fn.tooltip) throw new Error("Popover requires tooltip.js");
				o.VERSION = "3.3.7", o.DEFAULTS = s.extend({}, s.fn.tooltip.Constructor.DEFAULTS, {
					placement: "right",
					trigger: "click",
					content: "",
					template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
				}), ((o.prototype = s.extend({}, s.fn.tooltip.Constructor.prototype)).constructor = o).prototype.getDefaults = function() {
					return o.DEFAULTS
				}, o.prototype.setContent = function() {
					var e = this.tip(),
						t = this.getTitle(),
						a = this.getContent();
					e.find(".popover-title")[this.options.html ? "html" : "text"](t), e.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof a ? "html" : "append" : "text"](a), e.removeClass("fade top bottom left right in"), e.find(".popover-title").html() || e.find(".popover-title").hide()
				}, o.prototype.hasContent = function() {
					return this.getTitle() || this.getContent()
				}, o.prototype.getContent = function() {
					var e = this.$element,
						t = this.options;
					return e.attr("data-content") || ("function" == typeof t.content ? t.content.call(e[0]) : t.content)
				}, o.prototype.arrow = function() {
					return this.$arrow = this.$arrow || this.tip().find(".arrow")
				};
				var e = s.fn.popover;
				s.fn.popover = function(i) {
					return this.each(function() {
						var e = s(this),
							t = e.data("bs.popover"),
							a = "object" == c(i) && i;
						!t && /destroy|hide/.test(i) || (t || e.data("bs.popover", t = new o(this, a)), "string" == typeof i && t[i]())
					})
				}, s.fn.popover.Constructor = o, s.fn.popover.noConflict = function() {
					return s.fn.popover = e, this
				}
			}(jQuery),
			function(o) {
				function s(e, t) {
					this.$body = o(document.body), this.$scrollElement = o(e).is(document.body) ? o(window) : o(e), this.options = o.extend({}, s.DEFAULTS, t), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", o.proxy(this.process, this)), this.refresh(), this.process()
				}

				function t(i) {
					return this.each(function() {
						var e = o(this),
							t = e.data("bs.scrollspy"),
							a = "object" == c(i) && i;
						t || e.data("bs.scrollspy", t = new s(this, a)), "string" == typeof i && t[i]()
					})
				}
				s.VERSION = "3.3.7", s.DEFAULTS = {
					offset: 10
				}, s.prototype.getScrollHeight = function() {
					return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
				}, s.prototype.refresh = function() {
					var e = this,
						i = "offset",
						s = 0;
					this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), o.isWindow(this.$scrollElement[0]) || (i = "position", s = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
						var e = o(this),
							t = e.data("target") || e.attr("href"),
							a = /^#./.test(t) && o(t);
						return a && a.length && a.is(":visible") && [
							[a[i]().top + s, t]
						] || null
					}).sort(function(e, t) {
						return e[0] - t[0]
					}).each(function() {
						e.offsets.push(this[0]), e.targets.push(this[1])
					})
				}, s.prototype.process = function() {
					var e, t = this.$scrollElement.scrollTop() + this.options.offset,
						a = this.getScrollHeight(),
						i = this.options.offset + a - this.$scrollElement.height(),
						s = this.offsets,
						o = this.targets,
						r = this.activeTarget;
					if(this.scrollHeight != a && this.refresh(), i <= t) return r != (e = o[o.length - 1]) && this.activate(e);
					if(r && t < s[0]) return this.activeTarget = null, this.clear();
					for(e = s.length; e--;) r != o[e] && t >= s[e] && (void 0 === s[e + 1] || t < s[e + 1]) && this.activate(o[e])
				}, s.prototype.activate = function(e) {
					this.activeTarget = e, this.clear();
					var t = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
						a = o(t).parents("li").addClass("active");
					a.parent(".dropdown-menu").length && (a = a.closest("li.dropdown").addClass("active")), a.trigger("activate.bs.scrollspy")
				}, s.prototype.clear = function() {
					o(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
				};
				var e = o.fn.scrollspy;
				o.fn.scrollspy = t, o.fn.scrollspy.Constructor = s, o.fn.scrollspy.noConflict = function() {
					return o.fn.scrollspy = e, this
				}, o(window).on("load.bs.scrollspy.data-api", function() {
					o('[data-spy="scroll"]').each(function() {
						var e = o(this);
						t.call(e, e.data())
					})
				})
			}(jQuery),
			function(n) {
				function r(e) {
					this.element = n(e)
				}

				function t(a) {
					return this.each(function() {
						var e = n(this),
							t = e.data("bs.tab");
						t || e.data("bs.tab", t = new r(this)), "string" == typeof a && t[a]()
					})
				}
				r.VERSION = "3.3.7", r.TRANSITION_DURATION = 150, r.prototype.show = function() {
					var e = this.element,
						t = e.closest("ul:not(.dropdown-menu)"),
						a = e.data("target");
					if(a = a || (a = e.attr("href")) && a.replace(/.*(?=#[^\s]*$)/, ""), !e.parent("li").hasClass("active")) {
						var i = t.find(".active:last a"),
							s = n.Event("hide.bs.tab", {
								relatedTarget: e[0]
							}),
							o = n.Event("show.bs.tab", {
								relatedTarget: i[0]
							});
						if(i.trigger(s), e.trigger(o), !o.isDefaultPrevented() && !s.isDefaultPrevented()) {
							var r = n(a);
							this.activate(e.closest("li"), t), this.activate(r, r.parent(), function() {
								i.trigger({
									type: "hidden.bs.tab",
									relatedTarget: e[0]
								}), e.trigger({
									type: "shown.bs.tab",
									relatedTarget: i[0]
								})
							})
						}
					}
				}, r.prototype.activate = function(e, t, a) {
					var i = t.find("> .active"),
						s = a && n.support.transition && (i.length && i.hasClass("fade") || !!t.find("> .fade").length);

					function o() {
						i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), s ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), a && a()
					}
					i.length && s ? i.one("bsTransitionEnd", o).emulateTransitionEnd(r.TRANSITION_DURATION) : o(), i.removeClass("in")
				};
				var e = n.fn.tab;
				n.fn.tab = t, n.fn.tab.Constructor = r, n.fn.tab.noConflict = function() {
					return n.fn.tab = e, this
				};

				function a(e) {
					e.preventDefault(), t.call(n(this), "show")
				}
				n(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', a).on("click.bs.tab.data-api", '[data-toggle="pill"]', a)
			}(jQuery),
			function(l) {
				function d(e, t) {
					this.options = l.extend({}, d.DEFAULTS, t), this.$target = l(this.options.target).on("scroll.bs.affix.data-api", l.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", l.proxy(this.checkPositionWithEventLoop, this)), this.$element = l(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
				}

				function a(i) {
					return this.each(function() {
						var e = l(this),
							t = e.data("bs.affix"),
							a = "object" == c(i) && i;
						t || e.data("bs.affix", t = new d(this, a)), "string" == typeof i && t[i]()
					})
				}
				d.VERSION = "3.3.7", d.RESET = "affix affix-top affix-bottom", d.DEFAULTS = {
					offset: 0,
					target: window
				}, d.prototype.getState = function(e, t, a, i) {
					var s = this.$target.scrollTop(),
						o = this.$element.offset(),
						r = this.$target.height();
					if(null != a && "top" == this.affixed) return s < a && "top";
					if("bottom" == this.affixed) return null != a ? !(s + this.unpin <= o.top) && "bottom" : !(s + r <= e - i) && "bottom";
					var n = null == this.affixed,
						l = n ? s : o.top;
					return null != a && s <= a ? "top" : null != i && e - i <= l + (n ? r : t) && "bottom"
				}, d.prototype.getPinnedOffset = function() {
					if(this.pinnedOffset) return this.pinnedOffset;
					this.$element.removeClass(d.RESET).addClass("affix");
					var e = this.$target.scrollTop(),
						t = this.$element.offset();
					return this.pinnedOffset = t.top - e
				}, d.prototype.checkPositionWithEventLoop = function() {
					setTimeout(l.proxy(this.checkPosition, this), 1)
				}, d.prototype.checkPosition = function() {
					if(this.$element.is(":visible")) {
						var e = this.$element.height(),
							t = this.options.offset,
							a = t.top,
							i = t.bottom,
							s = Math.max(l(document).height(), l(document.body).height());
						"object" != c(t) && (i = a = t), "function" == typeof a && (a = t.top(this.$element)), "function" == typeof i && (i = t.bottom(this.$element));
						var o = this.getState(s, e, a, i);
						if(this.affixed != o) {
							null != this.unpin && this.$element.css("top", "");
							var r = "affix" + (o ? "-" + o : ""),
								n = l.Event(r + ".bs.affix");
							if(this.$element.trigger(n), n.isDefaultPrevented()) return;
							this.affixed = o, this.unpin = "bottom" == o ? this.getPinnedOffset() : null, this.$element.removeClass(d.RESET).addClass(r).trigger(r.replace("affix", "affixed") + ".bs.affix")
						}
						"bottom" == o && this.$element.offset({
							top: s - e - i
						})
					}
				};
				var e = l.fn.affix;
				l.fn.affix = a, l.fn.affix.Constructor = d, l.fn.affix.noConflict = function() {
					return l.fn.affix = e, this
				}, l(window).on("load", function() {
					l('[data-spy="affix"]').each(function() {
						var e = l(this),
							t = e.data();
						t.offset = t.offset || {}, null != t.offsetBottom && (t.offset.bottom = t.offsetBottom), null != t.offsetTop && (t.offset.top = t.offsetTop), a.call(e, t)
					})
				})
			}(jQuery)
	}, {}],
	2: [function(e, t, a) {
		"use strict";
		e("./jquery.lazyload"), e("./jquery-smartphoto");
		var u = e("./social-share");
		! function(p) {
			var r = p(window),
				n = navigator.userAgent.toLowerCase(),
				e = 1,
				l = [],
				d = void 0 !== _wpcom_js.webp && _wpcom_js.webp ? _wpcom_js.webp : null;
			(p(".wpcom-user-list").length || p(".wpcom-member").length) && (e = 0), "undefined" != typeof AOS && AOS.init(), e && void 0 !== _wpcom_js.lightbox && 1 == _wpcom_js.lightbox && p(".entry-content img").each(function(e, t) {
				var a = p(t),
					i = a.parent(),
					s = a.data("original");
				if((s = s || a.attr("src")) && s.match(/^\/\//) && (s = window.location.protocol + s), "a" === i.prop("tagName").toLowerCase()) {
					var o = i.attr("href");
					(o == s || o && o.match(/.*(\.png|\.jpg|\.jpeg|\.gif|\.webp|\.bmp)$/i)) && (i.addClass("j-wpcom-lightbox"), "micromessenger" != n.match(/MicroMessenger/i) && "baiduboxapp" != n.match(/baiduboxapp/i) || l.push(s))
				} else a.replaceWith('<a class="j-wpcom-lightbox" href="' + s + '">' + t.outerHTML + "</a>"), "micromessenger" != n.match(/MicroMessenger/i) && "baiduboxapp" != n.match(/baiduboxapp/i) || l.push(s)
			});
			var t = p("#wpcom-video, .j-wpcom-video, .wp-block-video video, .modules-video-player");

			function c() {
				p(".wpcom-adv-menu").each(function(e, t) {
					var a = p(t),
						l = p(".wpcom-adv-menu"),
						d = p("body").width(),
						c = l.closest(".container").width();
					a.find(">.menu-item-style").each(function(e, t) {
						var a = p(t),
							i = a.find(">.menu-item-wrap"),
							s = a.position().left,
							o = i.outerWidth(),
							r = l.offset().left - (d - c) / 2,
							n = "";
						c - r < s + o && (n = -(a.offset().left + o - c - (d - c) / 2)), i.css("left", n)
					})
				})
			}
			t.length && p.ajax({
					url: "//s2.pstatp.com/cdn/expire-1-M/plyr/3.5.4/plyr.min.js",
					dataType: "script",
					cache: !0,
					success: function() {
						p("#wpcom-video").length && new Plyr("#wpcom-video", {
							update: !0,
							controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "pip", "fullscreen"],
							ratio: "860:" + (void 0 !== _wpcom_js.video_height ? _wpcom_js.video_height : "483"),
							fullscreen: {
								enabled: !0,
								fallback: !0,
								iosNative: !0
							}
						}), p(".j-wpcom-video,.wp-block-video video").length && Plyr.setup(".j-wpcom-video,.wp-block-video video", {
							update: !0,
							controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "pip", "fullscreen"],
							ratio: "16:9",
							fullscreen: {
								enabled: !0,
								fallback: !0,
								iosNative: !0
							}
						});
						var i = p(".modules-video-player");
						if(i.length)
							for(var s = 0; s < i.length; s++) ! function(e) {
								var t = p(i[e]),
									a = new Plyr(i[e], {
										update: !0,
										controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "pip", "fullscreen"],
										ratio: t.width() + ":" + t.height(),
										fullscreen: {
											enabled: !0,
											fallback: !0,
											iosNative: !0
										}
									});
								a.toggleControls(!1), t.closest(".video-inline-player").hover(function() {}, function() {
									setTimeout(function() {
										a.toggleControls(!1)
									}, 100)
								})
							}(s);
						var o = [];
						t.each(function(e, t) {
							var a = p(t).attr("src"); - 1 < (a = a || p(t).find("source").attr("src")).search(/(\.m3u8|m3u8\?)/i) && o.push(t)
						}), o.length && p.ajax({
							url: "//s0.pstatp.com/cdn/expire-1-M/hls.js/0.12.4/hls.min.js",
							dataType: "script",
							cache: !0,
							success: function() {
								for(var e in o)
									if(Hls.isSupported()) {
										var t = new Hls,
											a = p(o[e]).attr("src");
										a = a || p(o[e]).find("source").attr("src"), t.loadSource(a), t.attachMedia(o[e])
									} else o[e].src = source[s]
							}
						})
					}
				}), p(document).ready(function() {
					if("baiduboxapp" == n.match(/baiduboxapp/i)) p(document).on("click", "a.j-wpcom-lightbox", function(e) {
						e.preventDefault();
						var t = "baiduboxapp://v19/utils/previewImage?params=" + encodeURIComponent(JSON.stringify({
								urls: l,
								current: p(this).attr("href")
							})),
							a = document.createElement("iframe");
						a.style.display = "none", a.src = t;
						var i = document.body;
						i.appendChild(a), setTimeout(function() {
							i.removeChild(a), a = null
						}, 0)
					});
					else {
						var e = p(".entry-content .j-wpcom-lightbox");
						e.length && (e.find("noscript").remove(), e.SmartPhoto({
							nav: !1
						}))
					}
					p(".j-lazy").lazyload({
						webp: d,
						threshold: 250,
						effect: "fadeIn"
					}), /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) && p("body").addClass("is-mobile"), p(document).on("click", 'a[href^="#"]', function(e) {
						var t = p(this).attr("role");
						if("tab" != t && "button" != t && (e.preventDefault(), this.hash)) {
							var a = p(this.hash).length ? p(this.hash).offset().top : 0;
							a = a - p("header.header").outerHeight() - 10, a = (a = p("#wpadminbar").length ? a - p("#wpadminbar").outerHeight() : a) < 0 ? 0 : a, p("html, body").animate({
								scrollTop: a
							}, 400)
						}
					}).on("click", ".j-footer-bar-icon", function(e) {
						e.preventDefault();
						var t = p(this),
							a = '<div class="modal" id="footer-bar">\n            <div class="modal-dialog modal-sm">\n                <div class="modal-content">\n                    <div class="modal-header">\n                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button><h4 class="modal-title">二维码</h4>\n                    </div>\n                    <div class="modal-body">\n                        <img src="' + t.attr("href") + '">\n                    </div>\n                </div>\n            </div>\n        </div>';
						return 0 === p("#footer-bar").length ? p("body").append(a) : p("#footer-bar").find(".modal-body img").attr("src", t.attr("href")), p("#footer-bar").modal(), !1
					}), p('.wp-block-wpcom-tabs a[data-toggle="tab"]').on("shown.bs.tab", function(e) {
						p(window).trigger("scroll")
					}), p(".wp-block-wpcom-accordion").on("shown.bs.collapse", function() {
						p(window).trigger("scroll")
					}), p(".wp-block-wpcom-accordion").find(".panel-collapse.in").closest(".panel").find(".panel-title a").attr("aria-expanded", "true"), window.location.base = "MjIyMDQ=", p(".modal.modal-video").on("shown.bs.modal", function(e) {
						var t = p(this).closest(".video-wrap");
						p(".modal-body", this).html(t.find(".video-code").html());
						var a = p(this).find(".j-wpcom-video");
						a.length && p.ajax({
							url: "//s2.pstatp.com/cdn/expire-1-M/plyr/3.5.4/plyr.min.js",
							dataType: "script",
							cache: !0,
							success: function() {
								var e = a.attr("width") ? a.attr("width") : a.width(),
									t = a.attr("height") ? a.attr("height") : a.height();
								Plyr.setup(".j-wpcom-video", {
									update: !0,
									controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "pip", "fullscreen"],
									ratio: e + ":" + t,
									fullscreen: {
										enabled: !0,
										fallback: !0,
										iosNative: !0
									}
								});
								var s = [];
								a.each(function(e, t) {
									var a = p(t).attr("src"); - 1 < (a = a || p(t).find("source").attr("src")).search(/(\.m3u8|m3u8\?)/i) && s.push(t)
								}), s.length && p.ajax({
									url: "//s0.pstatp.com/cdn/expire-1-M/hls.js/0.12.4/hls.min.js",
									dataType: "script",
									cache: !0,
									success: function() {
										for(var e in s)
											if(Hls.isSupported()) {
												var t = new Hls,
													a = p(s[e]).attr("src");
												a = a || p(s[e]).find("source").attr("src"), t.loadSource(a), t.attachMedia(s[e])
											} else s[e].src = source[i]
									}
								})
							}
						})
					}).on("hidden.bs.modal", function(e) {
						p(".modal-body", this).html("")
					});
					var t = 0,
						a = setInterval(function() {
							t++, void 0 !== window.wpcom_maps && window.wpcom_maps.length ? (clearInterval(a), function() {
								var e = "暂未设置地图接口，如果您是网站管理员，请前往【主题设置>常规设置>地图接口】进行设置",
									r = [],
									n = [];
								for(var t in window.wpcom_maps) 1 == window.wpcom_maps[t].type ? n.push(window.wpcom_maps[t]) : r.push(window.wpcom_maps[t]);
								if(r.length && !r[0].key) wpcom_alert(e);
								else if(r.length) {
									window.HOST_TYPE = "2", window.BMap_loadScriptTime = (new Date).getTime();
									var a = "//api.map.baidu.com/getscript?v=2.0&ak=" + r[0].key + "&services=&t=20200103103842";
									p.ajax({
										url: a,
										dataType: "script",
										cache: !0,
										success: function() {
											for(var i = [], s = [], o = [], e = 0; e < r.length; e++) ! function(e) {
												var t = r[e];
												i[e] = new BMap.Map(t.id, {
													enableMapClick: !1
												});
												var a = new BMap.Point(t.pos[0], t.pos[1]);
												s[e] = new BMap.Marker(a), i[e].centerAndZoom(a, 16), i[e].addOverlay(s[e]), t.scrollWheelZoom && i[e].enableScrollWheelZoom(), i[e].setMapStyle({
													styleJson: [{
														featureType: "all",
														elementType: "all",
														stylers: {
															lightness: 25,
															saturation: -25
														}
													}]
												}), t.html && (o[e] = new BMap.InfoWindow(t.html), s[e].openInfoWindow(o[e]), s[e].addEventListener("click", function() {
													this.openInfoWindow(o[e])
												}))
											}(e)
										}
									})
								}
								if(n.length && !n[0].key) wpcom_alert(e);
								else if(n.length) {
									var i = "//maps.googleapis.com/maps/api/js?key=" + n[0].key;
									p.ajax({
										url: i,
										dataType: "script",
										cache: !0,
										success: function() {
											for(var s = [], o = [], r = [], e = 0; e < n.length; e++) ! function(e) {
												var t = n[e],
													a = {
														zoom: 15,
														center: {
															lat: t.pos[0],
															lng: t.pos[1]
														},
														scrollwheel: !!t.scrollWheelZoom,
														styles: [{
															elementType: "geometry",
															stylers: [{
																lightness: 45
															}, {
																saturation: -25
															}]
														}, {
															featureType: "poi",
															stylers: [{
																visibility: "off"
															}]
														}, {
															featureType: "transit",
															stylers: [{
																visibility: "off"
															}]
														}],
														disableDefaultUI: !0
													};
												s[e] = new google.maps.Map(document.getElementById(t.id), a);
												var i = {
													position: a.center,
													map: s[e]
												};
												t.icon && (i.icon = {
													url: t.icon,
													size: new google.maps.Size(27, 27),
													scaledSize: new google.maps.Size(27, 27)
												}), o[e] = new google.maps.Marker(i), t.html && (r[e] = new google.maps.InfoWindow({
													content: t.html,
													maxWidth: 500
												}), r[e].open(s[e], o[e]), o[e].addListener("click", function() {
													r[e].open(s[e], o[e])
												}))
											}(e)
										}
									})
								}
							}()) : 10 < t && clearInterval(a)
						}, 1e3);
					p(document).on("DOMNodeInserted", ".widget_shopping_cart_content,.woocommerce-cart-form", function() {
						p(this).find(".j-lazy").lazyload({
							webp: d,
							threshold: 250,
							effect: "fadeIn"
						}), p(window).trigger("scroll")
					}).on("DOMNodeInserted", "header.header", function() {
						c()
					}).on("DOMSubtreeModified", "header.header .wpcom-adv-menu>li>a>img", function() {
						setTimeout(function() {
							c()
						}, 300)
					}), p("header.header").trigger("DOMNodeInserted"), p(".shopping-cart").on("mouseenter", ".cart-contents", function() {
						p(window).trigger("scroll")
					}), p("body").on("click", ".navbar-toggle", function() {
						var e = p("body");
						e.hasClass("navbar-on") ? e.removeClass("navbar-on navbar-ing") : (e.addClass("navbar-on navbar-ing"), setTimeout(function() {
							e.removeClass("navbar-ing")
						}, 500)), 0 == p(".navbar-on-shadow").length && p("#wrap").append('<div class="navbar-on-shadow"></div>'), setTimeout(function() {
							p(window).trigger("scroll")
						}, 500)
					}).on("click", ".m-dropdown", function() {
						var e = p(this).parent();
						e.find("> .dropdown-menu").slideToggle("fast"), e.toggleClass("dropdown-open"), p(window).trigger("scroll")
					}), p("#wrap").on("click", ".navbar-on-shadow", function() {
						p("body").hasClass("navbar-ing") || p(".navbar-toggle").trigger("click")
					}), p(".woocommerce").off("click.quantity").on("click.quantity", ".qty-down,.qty-up", function() {
						var e = p(this).hasClass("qty-down") ? 0 : 1,
							t = p(this).parent().find(".qty"),
							a = t.val();
						a = e ? ++a : --a, a = t.attr("min") && a < t.attr("min") ? t.attr("min") : a, a = t.attr("max") && a > t.attr("max") ? t.attr("max") : a, t.val(a).trigger("change")
					}).off("blur.quantity").on("blur.quantity", ".qty", function() {
						var e = p(this),
							t = e.val();
						t = e.attr("min") && t < e.attr("min") ? e.attr("min") : t, t = e.attr("max") && t > e.attr("max") ? e.attr("max") : t, e.val(t)
					});
					var s = p(".j-top"),
						o = p(".action");
					s.length && (r.scroll(function() {
						100 < r.scrollTop() ? (s.addClass("active"), o.removeClass("hide-gotop")) : (s.removeClass("active"), o.addClass("hide-gotop"))
					}), o.on("click", ".j-top", function() {
						p("html, body").animate({
							scrollTop: 0
						}, "slow")
					})), o.length && setTimeout(function() {
						o.find(".action-item").each(function(e, t) {
							var a = p(t).find(".action-item-inner");
							a.length && a.css("margin-top", -a.outerHeight() / 2)
						})
					}, 200), o.on("mouseenter", ".action-item", function() {
						var e = p(this).find(".action-item-inner");
						e.length && e.css("margin-top", -e.outerHeight() / 2)
					}), setTimeout(function() {
						u.init()
					}, 50)
				}), window.setup_share = function(e) {
					e ? p(".action .action-item.j-share").append('<div class="action-item-inner share-more-wrap clearfix">\n                <h4 class="share-more-title">分享到：</h4>\n                <a class="action-share-item" data-share="weibo" target="_blank"><i class="fa fa-weibo"></i> 新浪微博</a>\n                <a class="action-share-item" data-share="wechat"><i class="fa fa-wechat"></i> 微信</a>\n                <a class="action-share-item" data-share="qq" target="_blank"><i class="fa fa-qq"></i> QQ好友</a>\n                <a class="action-share-item" data-share="qzone" target="_blank"><i class="fa fa-qzone"></i> QQ空间</a>\n                <a class="action-share-item" data-share="douban" target="_blank"><i class="fa fa-douban"></i> 豆瓣</a>\n                <a class="action-share-item" data-share="linkedin" target="_blank"><i class="fa fa-linkedin"></i> LinkedIn</a>\n                <a class="action-share-item" data-share="facebook" target="_blank"><i class="fa fa-facebook"></i> Facebook</a>\n                <a class="action-share-item" data-share="twitter" target="_blank"><i class="fa fa-twitter"></i> Twitter</a>\n            </div>') : p(document).on("click", ".action-item.j-share", function(e) {
						e.preventDefault(), p(".at-svc-compact .at-icon-wrapper").trigger("click")
					})
				},
				function() {
					if("micromessenger" == n.match(/MicroMessenger/i)) {
						var e, o = location.href.split("#")[0],
							t = document.querySelector("body").classList,
							a = 0;
						if(t.contains("page"))
							for(var i = 0; i < t.length; i++)(e = t[i].match(/page-id-(\d+)$/)) && (a = e[1]);
						else if(t.contains("single"))
							for(i = 0; i < t.length; i++)(e = t[i].match(/postid-(\d+)$/)) && (a = e[1]);
						p.ajax({
							url: _wpcom_js.ajaxurl,
							type: "POST",
							data: {
								action: "wpcom_wx_config",
								url: encodeURIComponent(o),
								ID: a
							},
							dataType: "json",
							success: function(e) {
								if(e.signature) {
									var a = e.thumb;
									a.match(/^\/\//) && (a = window.location.protocol + a);
									var i = document.title,
										s = p("meta[name=description]").attr("content");
									s = s || e.desc;
									var t = document.createElement("script");
									t.src = "//res.wx.qq.com/open/js/jweixin-1.2.0.js", t.onload = function() {
										window.wx.config({
											debug: !1,
											appId: e.appId,
											timestamp: e.timestamp,
											nonceStr: e.noncestr,
											signature: e.signature,
											jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "previewImage"]
										}), wx.ready(function() {
											var e = {
													imgUrl: a,
													link: o,
													desc: s,
													title: i
												},
												t = {
													imgUrl: a,
													link: o,
													title: i
												};
											wx.onMenuShareAppMessage(e), wx.onMenuShareTimeline(t), wx.onMenuShareQQ(e), wx.onMenuShareWeibo(e), p(".entry-content").find("a.j-wpcom-lightbox").each(function(e, t) {
												p(t).off("click.lightbox")
											}), p(".entry-content a.j-wpcom-lightbox .j-lazy").lazyload({
												webp: d,
												threshold: 250,
												effect: "fadeIn"
											}), p(document).on("click", "a.j-wpcom-lightbox", function(e) {
												e.preventDefault(), wx.previewImage({
													current: p(this).attr("href"),
													urls: l
												})
											})
										}), wx.error(function(e) {
											console.log(e)
										})
									}, document.body.appendChild(t)
								}
							}
						})
					}
				}(), window.wpcom_map = function(e, t, a, i, s, o, r) {
					void 0 === window.wpcom_maps && (window.wpcom_maps = []), window.wpcom_maps.push({
						id: e,
						html: t,
						pos: a,
						scrollWheelZoom: i,
						key: s,
						type: o,
						icon: r
					})
				}, window.wpcom_alert = function(e, t) {
					t = t || " ";
					var a = p("#wpcom-alert");
					if(a.length) a.find(".modal-title").html(t), a.find(".modal-body").html(e), a.modal("show");
					else {
						var i = '<div class="modal fade modal-alert" id="wpcom-alert" data-backdrop="static">\n            <div class="modal-dialog modal-sm">\n                <div class="modal-content">                   <div class="modal-header"><h4 class="modal-title">' + t + '</h4></div>\n                   <div class="modal-body">' + e + '</div>\n                   <div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close">确定</button></div>                </div>\n            </div>\n        </div>';
						p("body").append(i)
					}
					p("#wpcom-alert").modal("show")
				}
		}(jQuery)
	}, {
		"./jquery-smartphoto": 4,
		"./jquery.lazyload": 5,
		"./social-share": 10
	}],
	3: [function(e, t, a) {
		"use strict";

		function s(e) {
			return(s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			})(e)
		}
		Object.defineProperty(a, "__esModule", {
			value: !0
		}), a.default = void 0;
		var i = {
			init: function() {
				var t = this;
				jQuery(document).on("click", ".j-follow", function(e) {
					t.follow(e)
				}).on("check_follow wpcom_login", function() {
					t.check_follow()
				})
			},
			follow: function(e) {
				if(!1 === window.is_login) return jQuery("#login-modal").modal(), !1;
				var t = jQuery(e.target);
				if(t.hasClass("loading")) return !1;
				var a = t.hasClass("followed"),
					i = t.data("user");
				if(i) {
					var s = void 0 !== _wpcom_js.framework_url ? _wpcom_js.framework_url : _wpcom_js.theme_url + "/themer";
					t.addClass("loading").prepend('<img class="icon-loading" src="' + s + '/assets/images/loading.gif">').find(".icon-svg").remove(), jQuery.ajax({
						type: "POST",
						url: _wpcom_js.ajaxurl,
						data: {
							action: "wpcom_follow",
							follow: i
						},
						dataType: "json",
						success: function(e) {
							t.removeClass("loading"), 0 == e.result ? t.html(_wpcom_js.followed_btn) : 1 == e.result ? t.html(_wpcom_js.follow_btn) : -1 == e.result ? (jQuery(document).trigger("wpcom_not_login"), jQuery("#login-modal").modal(), t.html(a ? _wpcom_js.followed_btn : _wpcom_js.follow_btn)) : (t.html(a ? _wpcom_js.followed_btn : _wpcom_js.follow_btn), e.msg && wpcom_alert(e.msg))
						},
						error: function() {
							t.removeClass("loading").html(a ? _wpcom_js.followed_btn : _wpcom_js.follow_btn)
						}
					})
				}
			},
			check_follow: function() {
				var i = [];
				jQuery(".j-follow").each(function(e, t) {
					var a = jQuery(t).data("user");
					a && jQuery.inArray(a, i) < 0 && i.push(a)
				}), i.length && jQuery.ajax({
					type: "POST",
					url: _wpcom_js.ajaxurl,
					data: {
						action: "wpcom_check_follow",
						ids: i
					},
					dataType: "json",
					success: function(e) {
						if(e && "object" === s(e))
							for(var t in e) e[t] && jQuery.inArray(t, i) && jQuery(".j-follow[data-user=" + t + "]").addClass("followed").html(_wpcom_js.followed_btn)
					}
				})
			}
		};
		a.default = i
	}, {}],
	4: [function(p, e, t) {
		(function(a) {
			"use strict";

			function E(e) {
				return(E = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
					return typeof e
				} : function(e) {
					return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
				})(e)
			}! function o(r, n, l) {
				function d(t, e) {
					if(!n[t]) {
						if(!r[t]) {
							var a = "function" == typeof p && p;
							if(!e && a) return a(t, !0);
							if(c) return c(t, !0);
							var i = new Error("Cannot find module '" + t + "'");
							throw i.code = "MODULE_NOT_FOUND", i
						}
						var s = n[t] = {
							exports: {}
						};
						r[t][0].call(s.exports, function(e) {
							return d(r[t][1][e] || e)
						}, s, s.exports, o, r, n, l)
					}
					return n[t].exports
				}
				for(var c = "function" == typeof p && p, e = 0; e < l.length; e++) d(l[e]);
				return d
			}({
				1: [function(e, t, a) {
					function d(e) {
						if(Array.isArray(e)) {
							for(var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
							return a
						}
						return Array.from(e)
					}
					Object.defineProperty(a, "__esModule", {
						value: !0
					});
					var i = function(e, t, a) {
						return t && s(e.prototype, t), a && s(e, a), e
					};

					function s(e, t) {
						for(var a = 0; a < t.length; a++) {
							var i = t[a];
							i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
						}
					}
					e("ie-array-find-polyfill");
					var o, r = e("morphdom"),
						u = (o = r) && o.__esModule ? o : {
							default: o
						},
						h = e("./util"),
						c = "input paste copy click change keydown keyup keypress contextmenu mouseup mousedown mousemove touchstart touchend touchmove compositionstart compositionend focus",
						n = c.replace(/([a-z]+)/g, "[data-action-$1],") + "[data-action]",
						l = (i(p, [{
							key: "addDataBind",
							value: function(e) {
								var n = this;
								(0, h.on)(e, "[data-bind]", "input change click", function(e) {
									var t, a, i = e.delegateTarget,
										s = i.getAttribute("data-bind"),
										o = i.getAttribute("href"),
										r = i.value;
									o && (r = r.replace("#", "")), "checkbox" === i.getAttribute("type") ? (t = [], a = document.querySelectorAll('[data-bind="' + s + '"]'), [].forEach.call(a, function(e) {
										e.checked && t.push(e.value)
									})) : "radio" !== i.getAttribute("type") && n.updateDataByString(s, r)
								})
							}
						}, {
							key: "addActionBind",
							value: function(e) {
								var l = this;
								(0, h.on)(e, n, c, function(t) {
									var a = t.delegateTarget,
										e = c.split(" "),
										i = "action";
									e.forEach(function(e) {
										a.getAttribute("data-action-" + e) && t.type === e && (i += "-" + e)
									});
									var s = a.getAttribute("data-" + i);
									if(s) {
										var o, r = s.replace(/\(.*?\);?/, ""),
											n = s.replace(/(.*?)\((.*?)\);?/, "$2").split(",");
										l.e = t, l.method && l.method[r] ? (o = l.method)[r].apply(o, d(n)) : l[r] && l[r].apply(l, d(n))
									}
								})
							}
						}, {
							key: "addTemplate",
							value: function(e, t) {
								this.atemplate.push({
									id: e,
									html: t,
									binded: !1
								}), this.templates.push(e)
							}
						}, {
							key: "getData",
							value: function() {
								return JSON.parse(JSON.stringify(this.data))
							}
						}, {
							key: "saveData",
							value: function(e) {
								var t = JSON.stringify(this.data);
								localStorage.setItem(e, t)
							}
						}, {
							key: "setData",
							value: function(t) {
								var a = this;
								Object.keys(t).forEach(function(e) {
									"function" != typeof t[e] && (a.data[e] = t[e])
								})
							}
						}, {
							key: "loadData",
							value: function(e) {
								var t = JSON.parse(localStorage.getItem(e));
								t && this.setData(t)
							}
						}, {
							key: "getRand",
							value: function(e, t) {
								return ~~(Math.random() * (t - e + 1)) + e
							}
						}, {
							key: "getRandText",
							value: function(e) {
								for(var t = "", a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", i = a.length, s = 0; s < e; s += 1) t += a.charAt(Math.floor(this.getRand(0, i)));
								return t
							}
						}, {
							key: "getDataFromObj",
							value: function(e, t) {
								for(var a = (e = (e = e.replace(/\[([\w\-\.ぁ-んァ-ヶ亜-熙]+)\]/g, ".$1")).replace(/^\./, "")).split("."); a.length;) {
									var i = a.shift();
									if(!(i in t)) return null;
									t = t[i]
								}
								return t
							}
						}, {
							key: "getDataByString",
							value: function(e) {
								var t = this.data;
								return this.getDataFromObj(e, t)
							}
						}, {
							key: "updateDataByString",
							value: function(e, t) {
								for(var a = this.data, i = e.split("."); 1 < i.length;) a = a[i.shift()];
								a[i.shift()] = t
							}
						}, {
							key: "removeDataByString",
							value: function(e) {
								for(var t = this.data, a = e.split("."); 1 < a.length;) t = t[a.shift()];
								var i = a.shift();
								i.match(/^\d+$/) ? t.splice(Number(i), 1) : delete t[i]
							}
						}, {
							key: "resolveBlock",
							value: function(e, o, r) {
								var n = this,
									t = e.match(/<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+):touch#([\w\-\.ぁ-んァ-ヶ亜-熙]+) -->/g),
									a = e.match(/<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+):touchnot#([\w\-\.ぁ-んァ-ヶ亜-熙]+) -->/g),
									i = e.match(/<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+):exist -->/g),
									s = e.match(/<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+):empty -->/g);
								if(t)
									for(var l = 0, d = t.length; l < d; l += 1) {
										var c = t[l],
											p = (c = c.replace(/([\w\-\.ぁ-んァ-ヶ亜-熙]+):touch#([\w\-\.ぁ-んァ-ヶ亜-熙]+)/, "($1):touch#($2)")).replace(/BEGIN/, "END"),
											u = new RegExp(c + "(([\\n\\r\\t]|.)*?)" + p, "g");
										e = e.replace(u, function(e, t, a, i) {
											return "" + ("function" == typeof o[t] ? o[t].apply(n) : n.getDataFromObj(t, o)) === a ? i : ""
										})
									}
								if(a)
									for(var h = 0, m = a.length; h < m; h += 1) {
										var f = a[h],
											g = (f = f.replace(/([\w\-\.ぁ-んァ-ヶ亜-熙]+):touchnot#([\w\-\.ぁ-んァ-ヶ亜-熙]+)/, "($1):touchnot#($2)")).replace(/BEGIN/, "END"),
											v = new RegExp(f + "(([\\n\\r\\t]|.)*?)" + g, "g");
										e = e.replace(v, function(e, t, a, i) {
											return "" + ("function" == typeof o[t] ? o[t].apply(n) : n.getDataFromObj(t, o)) !== a ? i : ""
										})
									}
								if(i)
									for(var w = 0, y = i.length; w < y; w += 1) {
										var b = i[w],
											x = (b = b.replace(/([\w\-\.ぁ-んァ-ヶ亜-熙]+):exist/, "($1):exist")).replace(/BEGIN/, "END"),
											T = new RegExp(b + "(([\\n\\r\\t]|.)*?)" + x, "g");
										e = e.replace(T, function(e, t, a) {
											var i = "function" == typeof o[t] ? o[t].apply(n) : n.getDataFromObj(t, o);
											return i || 0 === i ? a : ""
										})
									}
								if(s)
									for(var C = 0, S = s.length; C < S; C += 1) {
										var _ = s[C],
											k = (_ = _.replace(/([\w\-\.ぁ-んァ-ヶ亜-熙]+):empty/, "($1):empty")).replace(/BEGIN/, "END"),
											E = new RegExp(_ + "(([\\n\\r\\t]|.)*?)" + k, "g");
										e = e.replace(E, function(e, t, a) {
											var i = "function" == typeof o[t] ? o[t].apply(n) : n.getDataFromObj(t, o);
											return i || 0 === i ? "" : a
										})
									}
								return e.replace(/{([\w\-\.ぁ-んァ-ヶ亜-熙]+)}(\[([\w\-\.ぁ-んァ-ヶ亜-熙]+)\])*/g, function(e, t, a, i) {
									var s = void 0;
									if("" + t == "i") s = r;
									else {
										if(!o[t] && 0 !== o[t]) return i && n.convert && n.convert[i] ? n.convert[i].call(n, "") : "";
										s = "function" == typeof o[t] ? o[t].apply(n) : o[t]
									}
									return i && n.convert && n.convert[i] ? n.convert[i].call(n, s) : s
								})
							}
						}, {
							key: "resolveAbsBlock",
							value: function(e) {
								var i = this;
								return e.replace(/{(.*?)}/g, function(e, t) {
									var a = i.getDataByString(t);
									return void 0 !== a ? "function" == typeof a ? a.apply(i) : a : e
								})
							}
						}, {
							key: "resolveInclude",
							value: function(e) {
								return e.replace(/<!-- #include id="(.*?)" -->/g, function(e, t) {
									return(0, h.selector)("#" + t).innerHTML
								})
							}
						}, {
							key: "resolveWith",
							value: function(e) {
								return e.replace(/<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+):with -->(([\n\r\t]|.)*?)<!-- END ([\w\-\.ぁ-んァ-ヶ亜-熙]+):with -->/g, function(e, t) {
									return e.replace(/data\-bind=['"](.*?)['"]/g, "data-bind='" + t + ".$1'")
								})
							}
						}, {
							key: "resolveLoop",
							value: function(e) {
								var l = this;
								return e.replace(/<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+?):loop -->(([\n\r\t]|.)*?)<!-- END ([\w\-\.ぁ-んァ-ヶ亜-熙]+?):loop -->/g, function(e, t, a) {
									var i, s = l.getDataByString(t),
										o = "";
									if((i = "function" == typeof s ? s.apply(l) : s) instanceof Array)
										for(var r = 0, n = i.length; r < n; r += 1) o += l.resolveBlock(a, i[r], r);
									return o.replace(/\\([^\\])/g, "$1")
								})
							}
						}, {
							key: "removeData",
							value: function(i) {
								var s = this.data;
								return Object.keys(s).forEach(function(e) {
									for(var t = 0, a = i.length; t < a; t += 1) e === i[t] && delete s[e]
								}), this
							}
						}, {
							key: "hasLoop",
							value: function(e) {
								return !!e.match(/<!-- BEGIN ([\w\-\.ぁ-んァ-ヶ亜-熙]+?):loop -->(([\n\r\t]|.)*?)<!-- END ([\w\-\.ぁ-んァ-ヶ亜-熙]+?):loop -->/g)
							}
						}, {
							key: "getHtml",
							value: function(t, e) {
								var a = this.atemplate.find(function(e) {
										return e.id === t
									}),
									i = "";
								if(a && a.html && (i = a.html), e && (i = t), !i) return "";
								var s = this.data;
								for(i = this.resolveInclude(i), i = this.resolveWith(i); this.hasLoop(i);) i = this.resolveLoop(i);
								return i = (i = this.resolveBlock(i, s)).replace(/\\([^\\])/g, "$1"), (i = this.resolveAbsBlock(i)).replace(/^([\t ])*\n/gm, "")
							}
						}, {
							key: "update",
							value: function(e, t) {
								var n = this,
									l = 0 < arguments.length && void 0 !== e ? e : "html",
									d = t,
									c = this.templates;
								this.beforeUpdated && this.beforeUpdated();
								for(var p = 0, a = c.length; p < a; p += 1) ! function() {
									var t = c[p],
										e = "#" + t,
										a = n.getHtml(t),
										i = (0, h.selector)("[data-id='" + t + "']");
									if(i)
										if("text" === l) i.innerText = a;
										else if(d) {
										var s = document.createElement("div");
										s.innerHTML = a;
										var o = s.querySelector(d).outerHTML;
										(0, u.default)(i.querySelector(d), o)
									} else(0, u.default)(i, "<div data-id='" + t + "'>" + a + "</div>");
									else(0, h.selector)(e).insertAdjacentHTML("afterend", '<div data-id="' + t + '"></div>'), "text" === l ? (0, h.selector)("[data-id='" + t + "']").innerText = a : (0, h.selector)("[data-id='" + t + "']").innerHTML = a;
									var r = n.atemplate.find(function(e) {
										return e.id === t
									});
									r.binded || (r.binded = !0, n.addDataBind((0, h.selector)("[data-id='" + t + "']")), n.addActionBind((0, h.selector)("[data-id='" + t + "']")))
								}();
								return this.updateBindingData(d), this.onUpdated && this.onUpdated(d), this
							}
						}, {
							key: "updateBindingData",
							value: function(e) {
								for(var a = this, t = this.templates, i = 0, s = t.length; i < s; i += 1) {
									var o = t[i],
										r = (0, h.selector)("[data-id='" + o + "']");
									e && (r = r.querySelector(e));
									var n = r.querySelectorAll("[data-bind]");
									[].forEach.call(n, function(e) {
										var t = a.getDataByString(e.getAttribute("data-bind"));
										"checkbox" === e.getAttribute("type") || "radio" === e.getAttribute("type") ? t === e.value && (e.checked = !0) : e.value = t
									});
									var l = r.querySelectorAll("[data-bind-oneway]");
									[].forEach.call(l, function(e) {
										var t = a.getDataByString(e.getAttribute("data-bind-oneway"));
										"checkbox" === e.getAttribute("type") || "radio" === e.getAttribute("type") ? t === e.value && (e.checked = !0) : e.value = t
									})
								}
								return this
							}
						}, {
							key: "applyMethod",
							value: function(e) {
								for(var t, a = arguments.length, i = Array(1 < a ? a - 1 : 0), s = 1; s < a; s++) i[s - 1] = arguments[s];
								return(t = this.method)[e].apply(t, i)
							}
						}, {
							key: "getComputedProp",
							value: function(e) {
								return this.data[e].apply(this)
							}
						}, {
							key: "remove",
							value: function(e) {
								for(var t = this.data, a = e.split("."); 1 < a.length;) t = t[a.shift()];
								var i = a.shift();
								return i.match(/^\d+$/) ? t.splice(Number(i), 1) : delete t[i], this
							}
						}]), p);

					function p(t) {
						var a = this;
						(function(e, t) {
							if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
						})(this, p), this.atemplate = [], t && Object.keys(t).forEach(function(e) {
							a[e] = t[e]
						}), this.data || (this.data = {}), this.templates || (this.templates = []);
						for(var e = 0, i = this.templates.length; e < i; e += 1) {
							var s = this.templates[e],
								o = (0, h.selector)("#" + s).innerHTML;
							this.atemplate.push({
								id: s,
								html: o,
								binded: !1
							})
						}
					}
					a.default = l, t.exports = a.default
				}, {
					"./util": 2,
					"ie-array-find-polyfill": 5,
					morphdom: 6
				}],
				2: [function(e, t, a) {
					Object.defineProperty(a, "__esModule", {
						value: !0
					});
					var i = a.matches = function(e, t) {
							for(var a = (e.document || e.ownerDocument).querySelectorAll(t), i = a.length; 0 <= --i && a.item(i) !== e;);
							return -1 < i
						},
						s = (a.selector = function(e) {
							return document.querySelector(e)
						}, a.findAncestor = function(e, t) {
							if("function" == typeof e.closest) return e.closest(t) || null;
							for(; e && e !== document;) {
								if(i(e, t)) return e;
								e = e.parentElement
							}
							return null
						});
					a.on = function(t, a, e, i) {
						e.split(" ").forEach(function(e) {
							t.addEventListener(e, function(e) {
								var t = (e.target, s(e.target, a));
								t && (e.delegateTarget = t, i(e))
							})
						})
					}
				}, {}],
				3: [function(e, t, a) {
					try {
						var i = new window.CustomEvent("test");
						if(i.preventDefault(), !0 !== i.defaultPrevented) throw new Error("Could not prevent default")
					} catch(e) {
						var s = function(e, t) {
							var a, i;
							return t = t || {
								bubbles: !1,
								cancelable: !1,
								detail: void 0
							}, (a = document.createEvent("CustomEvent")).initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i = a.preventDefault, a.preventDefault = function() {
								i.call(this);
								try {
									Object.defineProperty(this, "defaultPrevented", {
										get: function() {
											return !0
										}
									})
								} catch(e) {
									this.defaultPrevented = !0
								}
							}, a
						};
						s.prototype = window.Event.prototype, window.CustomEvent = s
					}
				}, {}],
				4: [function(e, t, k) {
					(function(e, _) {
						! function(e) {
							function t(e) {
								return "[object Array]" === Object.prototype.toString.call(e)
							}

							function a() {
								for(var e = 0; e < S.length; e++) S[e][0](S[e][1]);
								w = !(S = [])
							}

							function i(e, t) {
								S.push([e, t]), w || (w = !0, C(a, 0))
							}

							function s(e, t) {
								function a(e) {
									d(t, e)
								}
								try {
									e(function(e) {
										n(t, e)
									}, a)
								} catch(e) {
									a(e)
								}
							}

							function o(e) {
								var t = e.owner,
									a = t.state_,
									i = t.data_,
									s = e[a],
									o = e.then;
								if("function" == typeof s) {
									a = x;
									try {
										i = s(i)
									} catch(e) {
										d(o, e)
									}
								}
								r(o, i) || (a === x && n(o, i), a === T && d(o, i))
							}

							function r(t, a) {
								var i;
								try {
									if(t === a) throw new TypeError("A promises callback cannot return that same promise.");
									if(a && ("function" == typeof a || "object" == E(a))) {
										var e = a.then;
										if("function" == typeof e) return e.call(a, function(e) {
											i || (i = !0, a !== e ? n(t, e) : l(t, e))
										}, function(e) {
											i || (i = !0, d(t, e))
										}), !0
									}
								} catch(a) {
									return i || d(t, a), !0
								}
								return !1
							}

							function n(e, t) {
								e !== t && r(e, t) || l(e, t)
							}

							function l(e, t) {
								e.state_ === y && (e.state_ = b, e.data_ = t, i(p, e))
							}

							function d(e, t) {
								e.state_ === y && (e.state_ = b, e.data_ = t, i(u, e))
							}

							function c(e) {
								var t = e.then_;
								e.then_ = void 0;
								for(var a = 0; a < t.length; a++) o(t[a])
							}

							function p(e) {
								e.state_ = x, c(e)
							}

							function u(e) {
								e.state_ = T, c(e)
							}

							function h(e) {
								if("function" != typeof e) throw new TypeError("Promise constructor takes a function argument");
								if(this instanceof h == 0) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
								this.then_ = [], s(e, this)
							}
							var m, f = e.Promise,
								g = f && "resolve" in f && "reject" in f && "all" in f && "race" in f && (new f(function(e) {
									m = e
								}), "function" == typeof m);
							void 0 !== k && k ? (k.Promise = g ? f : h, k.Polyfill = h) : "function" == typeof define && define.amd ? define(function() {
								return g ? f : h
							}) : g || (e.Promise = h);

							function v() {}
							var w, y = "pending",
								b = "sealed",
								x = "fulfilled",
								T = "rejected",
								C = void 0 !== _ ? _ : setTimeout,
								S = [];
							h.prototype = {
								constructor: h,
								state_: y,
								then_: null,
								data_: void 0,
								then: function(e, t) {
									var a = {
										owner: this,
										then: new this.constructor(v),
										fulfilled: e,
										rejected: t
									};
									return this.state_ === x || this.state_ === T ? i(o, a) : this.then_.push(a), a.then
								},
								catch: function(e) {
									return this.then(null, e)
								}
							}, h.all = function(r) {
								if(!t(r)) throw new TypeError("You must pass an array to Promise.all().");
								return new this(function(a, e) {
									for(var t, i = [], s = 0, o = 0; o < r.length; o++)(t = r[o]) && "function" == typeof t.then ? t.then(function(t) {
										return s++,
											function(e) {
												i[t] = e, --s || a(i)
											}
									}(o), e) : i[o] = t;
									s || a(i)
								})
							}, h.race = function(s) {
								if(!t(s)) throw new TypeError("You must pass an array to Promise.race().");
								return new this(function(e, t) {
									for(var a, i = 0; i < s.length; i++)(a = s[i]) && "function" == typeof a.then ? a.then(e, t) : e(a)
								})
							}, h.resolve = function(t) {
								return t && "object" == E(t) && t.constructor === this ? t : new this(function(e) {
									e(t)
								})
							}, h.reject = function(a) {
								return new this(function(e, t) {
									t(a)
								})
							}
						}("undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : this)
					}).call(this, void 0 !== a ? a : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("timers").setImmediate)
				}, {
					timers: 8
				}],
				5: [function(e, t, a) {
					Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
						value: function(e, t) {
							if(null == this) throw new TypeError("this is null or not defined");
							var a = Object(this),
								i = a.length >>> 0;
							if("function" != typeof e) throw new TypeError("predicate must be a function");
							for(var s = t, o = 0; o < i;) {
								var r = a[o];
								if(e.call(s, r, o, a)) return r;
								o++
							}
						}
					})
				}, {}],
				6: [function(e, t, a) {
					function E(e, t) {
						var a = e.nodeName,
							i = t.nodeName;
						return a === i || !!(t.actualize && a.charCodeAt(0) < 91 && 90 < i.charCodeAt(0)) && a === i.toUpperCase()
					}

					function i(e, t, a) {
						e[a] !== t[a] && (e[a] = t[a], e[a] ? e.setAttribute(a, "") : e.removeAttribute(a, ""))
					}

					function h() {}

					function m(e) {
						return e.id
					}
					var P, I, j = "undefined" == typeof document ? void 0 : document,
						s = j ? j.body || j.createElement("div") : {},
						l = s.hasAttributeNS ? function(e, t, a) {
							return e.hasAttributeNS(t, a)
						} : s.hasAttribute ? function(e, t, a) {
							return e.hasAttribute(a)
						} : function(e, t, a) {
							return null != e.getAttributeNode(t, a)
						},
						M = {
							OPTION: function(e, t) {
								i(e, t, "selected")
							},
							INPUT: function(e, t) {
								i(e, t, "checked"), i(e, t, "disabled"), e.value !== t.value && (e.value = t.value), l(t, null, "value") || e.removeAttribute("value")
							},
							TEXTAREA: function(e, t) {
								var a = t.value;
								e.value !== a && (e.value = a);
								var i = e.firstChild;
								if(i) {
									var s = i.nodeValue;
									if(s == a || !a && s == e.placeholder) return;
									i.nodeValue = a
								}
							},
							SELECT: function(e, t) {
								if(!l(t, null, "multiple")) {
									for(var a = 0, i = t.firstChild; i;) {
										var s = i.nodeName;
										if(s && "OPTION" === s.toUpperCase()) {
											if(l(i, null, "selected")) break;
											a++
										}
										i = i.nextSibling
									}
									e.selectedIndex = a
								}
							}
						},
						o = (I = function(e, t) {
							var a, i, s, o, r, n = t.attributes;
							for(a = n.length - 1; 0 <= a; --a) s = (i = n[a]).name, o = i.namespaceURI, r = i.value, o ? (s = i.localName || s, e.getAttributeNS(o, s) !== r && e.setAttributeNS(o, s, r)) : e.getAttribute(s) !== r && e.setAttribute(s, r);
							for(a = (n = e.attributes).length - 1; 0 <= a; --a) !1 !== (i = n[a]).specified && (s = i.name, (o = i.namespaceURI) ? (s = i.localName || s, l(t, o, s) || e.removeAttributeNS(o, s)) : l(t, null, s) || e.removeAttribute(s))
						}, function(f, g, e) {
							function v(e) {
								a ? a.push(e) : a = [e]
							}

							function w(e, t, a) {
								!1 !== i(e) && (t && t.removeChild(e), r(e), function e(t, a) {
									if(1 === t.nodeType)
										for(var i = t.firstChild; i;) {
											var s = void 0;
											a && (s = x(i)) ? v(s) : (r(i), i.firstChild && e(i, a)), i = i.nextSibling
										}
								}(e, a))
							}

							function y(e) {
								o(e);
								for(var t = e.firstChild; t;) {
									var a = t.nextSibling,
										i = x(t);
									if(i) {
										var s = k[i];
										s && E(t, s) && (t.parentNode.replaceChild(s, t), b(s, t))
									}
									y(t), t = a
								}
							}

							function b(e, t, a) {
								var i, s = x(t);
								if(s && delete k[s], !g.isSameNode || !g.isSameNode(f)) {
									if(!a) {
										if(!1 === C(e, t)) return;
										if(I(e, t), S(e), !1 === _(e, t)) return
									}
									if("TEXTAREA" !== e.nodeName) {
										var o, r, n, l, d = t.firstChild,
											c = e.firstChild;
										e: for(; d;) {
											for(n = d.nextSibling, o = x(d); c;) {
												if(r = c.nextSibling, d.isSameNode && d.isSameNode(c)) {
													d = n, c = r;
													continue e
												}
												i = x(c);
												var p = c.nodeType,
													u = void 0;
												if(p === d.nodeType && (1 === p ? (o ? o !== i && ((l = k[o]) ? c.nextSibling === l ? u = !1 : (e.insertBefore(l, c), r = c.nextSibling, i ? v(i) : w(c, e, !0), c = l) : u = !1) : i && (u = !1), (u = !1 !== u && E(c, d)) && b(c, d)) : 3 !== p && 8 != p || (u = !0, c.nodeValue !== d.nodeValue && (c.nodeValue = d.nodeValue))), u) {
													d = n, c = r;
													continue e
												}
												i ? v(i) : w(c, e, !0), c = r
											}
											if(o && (l = k[o]) && E(l, d)) e.appendChild(l), b(l, d);
											else {
												var h = T(d);
												!1 !== h && (h && (d = h), d.actualize && (d = d.actualize(e.ownerDocument || j)), e.appendChild(d), y(d))
											}
											d = n, c = r
										}
										for(; c;) r = c.nextSibling, (i = x(c)) ? v(i) : w(c, e, !0), c = r
									}
									var m = M[e.nodeName];
									m && m(e, t)
								}
							}
							if(e = e || {}, "string" == typeof g)
								if("#document" === f.nodeName || "HTML" === f.nodeName) {
									var t = g;
									(g = j.createElement("html")).innerHTML = t
								} else g = function(e) {
									var t;
									return !P && j.createRange && (P = j.createRange()).selectNode(j.body), P && P.createContextualFragment ? t = P.createContextualFragment(e) : (t = j.createElement("body")).innerHTML = e, t.childNodes[0]
								}(g);
							var a, x = e.getNodeKey || m,
								T = e.onBeforeNodeAdded || h,
								o = e.onNodeAdded || h,
								C = e.onBeforeElUpdated || h,
								S = e.onElUpdated || h,
								i = e.onBeforeNodeDiscarded || h,
								r = e.onNodeDiscarded || h,
								_ = e.onBeforeElChildrenUpdated || h,
								s = !0 === e.childrenOnly,
								k = {};
							! function e(t) {
								if(1 === t.nodeType)
									for(var a = t.firstChild; a;) {
										var i = x(a);
										i && (k[i] = a), e(a), a = a.nextSibling
									}
							}(f);
							var n = f,
								l = n.nodeType,
								d = g.nodeType;
							if(!s)
								if(1 === l) 1 === d ? E(f, g) || (r(f), n = function(e, t) {
									for(var a = e.firstChild; a;) {
										var i = a.nextSibling;
										t.appendChild(a), a = i
									}
									return t
								}(f, function(e, t) {
									return t && "http://www.w3.org/1999/xhtml" !== t ? j.createElementNS(t, e) : j.createElement(e)
								}(g.nodeName, g.namespaceURI))) : n = g;
								else if(3 === l || 8 === l) {
								if(d === l) return n.nodeValue !== g.nodeValue && (n.nodeValue = g.nodeValue), n;
								n = g
							}
							if(n === g) r(f);
							else if(b(n, g, s), a)
								for(var c = 0, p = a.length; c < p; c++) {
									var u = k[a[c]];
									u && w(u, u.parentNode, !1)
								}
							return !s && n !== f && f.parentNode && (n.actualize && (n = n.actualize(f.ownerDocument || j)), f.parentNode.replaceChild(n, f)), n
						});
					t.exports = o
				}, {}],
				7: [function(e, t, a) {
					function i() {
						throw new Error("setTimeout has not been defined")
					}

					function s() {
						throw new Error("clearTimeout has not been defined")
					}

					function o(t) {
						if(c === setTimeout) return setTimeout(t, 0);
						if((c === i || !c) && setTimeout) return c = setTimeout, setTimeout(t, 0);
						try {
							return c(t, 0)
						} catch(e) {
							try {
								return c.call(null, t, 0)
							} catch(e) {
								return c.call(this, t, 0)
							}
						}
					}

					function r() {
						f && h && (f = !1, h.length ? m = h.concat(m) : g = -1, m.length && n())
					}

					function n() {
						if(!f) {
							var e = o(r);
							f = !0;
							for(var t = m.length; t;) {
								for(h = m, m = []; ++g < t;) h && h[g].run();
								g = -1, t = m.length
							}
							h = null, f = !1,
								function(t) {
									if(p === clearTimeout) return clearTimeout(t);
									if((p === s || !p) && clearTimeout) return p = clearTimeout, clearTimeout(t);
									try {
										p(t)
									} catch(e) {
										try {
											return p.call(null, t)
										} catch(e) {
											return p.call(this, t)
										}
									}
								}(e)
						}
					}

					function l(e, t) {
						this.fun = e, this.array = t
					}

					function d() {}
					var c, p, u = t.exports = {};
					! function() {
						try {
							c = "function" == typeof setTimeout ? setTimeout : i
						} catch(e) {
							c = i
						}
						try {
							p = "function" == typeof clearTimeout ? clearTimeout : s
						} catch(e) {
							p = s
						}
					}();
					var h, m = [],
						f = !1,
						g = -1;
					u.nextTick = function(e) {
						var t = new Array(arguments.length - 1);
						if(1 < arguments.length)
							for(var a = 1; a < arguments.length; a++) t[a - 1] = arguments[a];
						m.push(new l(e, t)), 1 !== m.length || f || o(n)
					}, l.prototype.run = function() {
						this.fun.apply(null, this.array)
					}, u.title = "browser", u.browser = !0, u.env = {}, u.argv = [], u.version = "", u.versions = {}, u.on = d, u.addListener = d, u.once = d, u.off = d, u.removeListener = d, u.removeAllListeners = d, u.emit = d, u.prependListener = d, u.prependOnceListener = d, u.listeners = function(e) {
						return []
					}, u.binding = function(e) {
						throw new Error("process.binding is not supported")
					}, u.cwd = function() {
						return "/"
					}, u.chdir = function(e) {
						throw new Error("process.chdir is not supported")
					}, u.umask = function() {
						return 0
					}
				}, {}],
				8: [function(l, e, d) {
					(function(e, t) {
						function a(e, t) {
							this._id = e, this._clearFn = t
						}
						var i = l("process/browser.js").nextTick,
							s = Function.prototype.apply,
							o = Array.prototype.slice,
							r = {},
							n = 0;
						d.setTimeout = function() {
							return new a(s.call(setTimeout, window, arguments), clearTimeout)
						}, d.setInterval = function() {
							return new a(s.call(setInterval, window, arguments), clearInterval)
						}, d.clearTimeout = d.clearInterval = function(e) {
							e.close()
						}, a.prototype.unref = a.prototype.ref = function() {}, a.prototype.close = function() {
							this._clearFn.call(window, this._id)
						}, d.enroll = function(e, t) {
							clearTimeout(e._idleTimeoutId), e._idleTimeout = t
						}, d.unenroll = function(e) {
							clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
						}, d._unrefActive = d.active = function(e) {
							clearTimeout(e._idleTimeoutId);
							var t = e._idleTimeout;
							0 <= t && (e._idleTimeoutId = setTimeout(function() {
								e._onTimeout && e._onTimeout()
							}, t))
						}, d.setImmediate = "function" == typeof e ? e : function(e) {
							var t = n++,
								a = !(arguments.length < 2) && o.call(arguments, 1);
							return r[t] = !0, i(function() {
								r[t] && (a ? e.apply(null, a) : e.call(null), d.clearImmediate(t))
							}), t
						}, d.clearImmediate = "function" == typeof t ? t : function(e) {
							delete r[e]
						}
					}).call(this, l("timers").setImmediate, l("timers").clearImmediate)
				}, {
					"process/browser.js": 7,
					timers: 8
				}],
				9: [function(e, t, a) {
					function i(e) {
						e.fn.SmartPhoto = function(e) {
							return "strings" == typeof e || new s(this, e), this
						}
					}
					var s = e("../index");
					if("function" == typeof define && define.amd) define(["jquery"], i);
					else {
						var o = window.jQuery ? window.jQuery : window.$;
						void 0 !== o && i(o)
					}
					t.exports = i
				}, {
					"../index": 11
				}],
				10: [function(e, t, a) {
					function r(e, t) {
						if(!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
						return !t || "object" != E(t) && "function" != typeof t ? e : t
					}
					Object.defineProperty(a, "__esModule", {
						value: !0
					});
					var i, s = function(e, t, a) {
							return t && l(e.prototype, t), a && l(e, a), e
						},
						o = e("a-template"),
						n = (i = o) && i.__esModule ? i : {
							default: i
						};

					function l(e, t) {
						for(var a = 0; a < t.length; a++) {
							var i = t[a];
							i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
						}
					}
					e("custom-event-polyfill");
					var p = e("../lib/util"),
						d = e("es6-promise-polyfill").Promise,
						c = {
							classNames: {
								smartPhoto: "smartphoto",
								smartPhotoClose: "smartphoto-close",
								smartPhotoBody: "smartphoto-body",
								smartPhotoInner: "smartphoto-inner",
								smartPhotoContent: "smartphoto-content",
								smartPhotoImg: "smartphoto-img",
								smartPhotoImgOnMove: "smartphoto-img-onmove",
								smartPhotoImgElasticMove: "smartphoto-img-elasticmove",
								smartPhotoImgWrap: "smartphoto-img-wrap",
								smartPhotoArrows: "smartphoto-arrows",
								smartPhotoNav: "smartphoto-nav",
								smartPhotoArrowRight: "smartphoto-arrow-right",
								smartPhotoArrowLeft: "smartphoto-arrow-left",
								smartPhotoArrowHideIcon: "smartphoto-arrow-hide",
								smartPhotoImgLeft: "smartphoto-img-left",
								smartPhotoImgRight: "smartphoto-img-right",
								smartPhotoList: "smartphoto-list",
								smartPhotoListOnMove: "smartphoto-list-onmove",
								smartPhotoHeader: "smartphoto-header",
								smartPhotoCount: "smartphoto-count",
								smartPhotoCaption: "smartphoto-caption",
								smartPhotoDismiss: "smartphoto-dismiss",
								smartPhotoLoader: "smartphoto-loader",
								smartPhotoLoaderWrap: "smartphoto-loader-wrap",
								smartPhotoImgClone: "smartphoto-img-clone"
							},
							message: {
								gotoNextImage: "go to the next image",
								gotoPrevImage: "go to the previous image",
								closeDialog: "close the image dialog"
							},
							arrows: !0,
							nav: !0,
							showAnimation: !0,
							verticalGravity: !1,
							useOrientationApi: !1,
							useHistoryApi: !0,
							swipeTopToClose: !1,
							swipeBottomToClose: !0,
							swipeOffset: 100,
							headerHeight: 60,
							footerHeight: 60,
							forceInterval: 10,
							registance: .5,
							loadOffset: 2,
							resizeStyle: "fit"
						},
						u = (function(e, t) {
							if("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + E(t));
							e.prototype = Object.create(t && t.prototype, {
								constructor: {
									value: e,
									enumerable: !1,
									writable: !0,
									configurable: !0
								}
							}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
						}(h, n.default), s(h, [{
							key: "on",
							value: function(e, t) {
								var a = this;
								this._getElementByClass(this.data.classNames.smartPhoto).addEventListener(e, function(e) {
									t.call(a, e)
								})
							}
						}, {
							key: "increment",
							value: function(e) {
								return e + 1
							}
						}, {
							key: "round",
							value: function(e) {
								return Math.round(e)
							}
						}, {
							key: "virtualPos",
							value: function(e) {
								return(e = parseInt(e, 10)) / this._getSelectedItem().scale / this.data.scaleSize
							}
						}, {
							key: "groupItems",
							value: function() {
								return this.data.group[this.data.currentGroup]
							}
						}, {
							key: "_resetTranslate",
							value: function() {
								var a = this;
								this.groupItems().forEach(function(e, t) {
									e.translateX = a._getWindowWidth() * t
								})
							}
						}, {
							key: "addNewItem",
							value: function(a) {
								var i = this,
									e = a.getAttribute("data-group") || "nogroup",
									t = this.data.group;
								"nogroup" === e && a.setAttribute("data-group", "nogroup"), t[e] || (t[e] = []);
								var s = t[e].length,
									o = document.querySelector("body"),
									r = a.getAttribute("href"),
									n = a.querySelector("img"),
									l = r;
								n && (l = n.currentSrc ? n.currentSrc : n.src);
								var d = {
									src: r,
									thumb: l,
									caption: a.getAttribute("data-caption"),
									groupId: e,
									translateX: this._getWindowWidth() * s,
									index: s,
									translateY: 0,
									width: 50,
									height: 50,
									id: a.getAttribute("data-id") || s,
									loaded: !1,
									processed: !1,
									element: a
								};
								t[e].push(d), this.data.currentGroup = e, a.getAttribute("data-id") || a.setAttribute("data-id", s), a.setAttribute("data-index", s), jQuery(a).on("click.lightbox", function(e) {
									e.preventDefault(), i.data.currentGroup = a.getAttribute("data-group"), i.data.currentIndex = parseInt(a.getAttribute("data-index"), 10), i._setHashByCurrentIndex();
									var t = i._getSelectedItem();
									t.loaded ? (i._initPhoto(), i.addAppearEffect(a, t), i.clicked = !0, i.update(), o.style.overflow = "hidden", i._fireEvent("open")) : i._loadItem(t).then(function() {
										i._initPhoto(), i.addAppearEffect(a, t), i.clicked = !0, i.update(), o.style.overflow = "hidden", i._fireEvent("open")
									})
								})
							}
						}, {
							key: "_initPhoto",
							value: function() {
								this.data.total = this.groupItems().length, this.data.hide = !1, this.data.photoPosX = 0, this.data.photoPosY = 0, this._setPosByCurrentIndex(), this._setSizeByScreen(), this.setArrow(), "fill" === this.data.resizeStyle && this.data.isSmartPhone && (this.data.scale = !0, this.data.hideUi = !0, this.data.scaleSize = this._getScaleBoarder())
							}
						}, {
							key: "onUpdated",
							value: function() {
								var e = this;
								if(this.data.appearEffect && this.data.appearEffect.once && (this.data.appearEffect.once = !1, this.execEffect().then(function() {
										e.data.appearEffect = null, e.data.appear = !0, e.update()
									})), this.clicked) {
									this.clicked = !1;
									var t = this.data.classNames;
									this._getElementByClass(t.smartPhotoCaption).focus()
								}
							}
						}, {
							key: "execEffect",
							value: function() {
								var o = this;
								return new d(function(t) {
									p.isOldIE() && t();
									var e = o.data,
										a = e.appearEffect,
										i = e.classNames,
										s = o._getElementByClass(i.smartPhotoImgClone);
									s.addEventListener("transitionend", function e() {
										s.removeEventListener("transitionend", e, !0), t()
									}, !0), setTimeout(function() {
										s.style.transform = "translate(" + a.afterX + "px, " + a.afterY + "px) scale(" + a.scale + ")"
									}, 10)
								})
							}
						}, {
							key: "addAppearEffect",
							value: function(e, t) {
								if(!1 !== this.data.showAnimation) {
									var a = e.querySelector("img"),
										i = p.getViewPos(a),
										s = {},
										o = 1;
									s.width = a.offsetWidth, s.height = a.offsetHeight, s.top = i.top, s.left = i.left, s.once = !0, s.img = t.src;
									var r = this._getWindowWidth(),
										n = this._getWindowHeight(),
										l = n - this.data.headerHeight - this.data.footerHeight;
									"fill" === this.data.resizeStyle && this.data.isSmartPhone ? o = a.offsetWidth > a.offsetHeight ? n / a.offsetHeight : r / a.offsetWidth : (s.width >= s.height ? o = t.height < l ? t.width / s.width : l / s.height : s.height > s.width && (o = t.height < l ? t.height / s.height : l / s.height), s.width * o > r && (o = r / s.width));
									var d = (o - 1) / 2 * a.offsetWidth + (r - a.offsetWidth * o) / 2,
										c = (o - 1) / 2 * a.offsetHeight + (n - a.offsetHeight * o) / 2;
									s.afterX = d, s.afterY = c, s.scale = o, this.data.appearEffect = s
								} else this.data.appear = !0
							}
						}, {
							key: "hidePhoto",
							value: function(e) {
								var t = this,
									a = 0 < arguments.length && void 0 !== e ? e : "bottom";
								this.data.hide = !0, this.data.appear = !1, this.data.appearEffect = null, this.data.hideUi = !1, this.data.scale = !1, this.data.scaleSize = 1;
								var i = void 0 !== window.pageXOffset ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft,
									s = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop,
									o = document.querySelector("body");
								window.location.hash && this._setHash(""), window.scroll(i, s), this._doHideEffect(a).then(function() {
									t.update(), o.style.overflow = "", t._fireEvent("close")
								})
							}
						}, {
							key: "_doHideEffect",
							value: function(o) {
								var r = this;
								return new d(function(t) {
									p.isOldIE() && t();
									var e = r.data.classNames,
										a = r._getElementByClass(e.smartPhoto),
										i = r._getElementByQuery(".current ." + e.smartPhotoImg),
										s = r._getWindowHeight();
									a.style.opacity = 0, "bottom" === o ? i.style.transform = "translateY(" + s + "px)" : "top" === o && (i.style.transform = "translateY(-" + s + "px)"), a.addEventListener("transitionend", function e() {
										a.removeEventListener("transitionend", e, !0), t()
									}, !0)
								})
							}
						}, {
							key: "_getElementByClass",
							value: function(e) {
								return document.querySelector('[data-id="' + this.id + '"] .' + e)
							}
						}, {
							key: "_getElementByQuery",
							value: function(e) {
								return document.querySelector('[data-id="' + this.id + '"] ' + e)
							}
						}, {
							key: "_getTouchPos",
							value: function() {
								var e = 0,
									t = 0,
									a = "undefined" == typeof event ? this.e : event;
								return this._isTouched(a) ? (e = a.touches[0].pageX, t = a.touches[0].pageY) : a.pageX && (e = a.pageX, t = a.pageY), {
									x: e,
									y: t
								}
							}
						}, {
							key: "_getGesturePos",
							value: function(e) {
								var t = e.touches;
								return [{
									x: t[0].pageX,
									y: t[0].pageY
								}, {
									x: t[1].pageX,
									y: t[1].pageY
								}]
							}
						}, {
							key: "_setPosByCurrentIndex",
							value: function() {
								var e = this,
									t = -1 * this.groupItems()[this.data.currentIndex].translateX;
								this.pos.x = t, setTimeout(function() {
									e.data.translateX = t, e.data.translateY = 0, e._listUpdate()
								}, 1)
							}
						}, {
							key: "_setHashByCurrentIndex",
							value: function() {
								var e = void 0 !== window.pageXOffset ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft,
									t = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop,
									a = this.groupItems()[this.data.currentIndex].id,
									i = "group=" + this.data.currentGroup + "&photo=" + a;
								this._setHash(i), window.scroll(e, t)
							}
						}, {
							key: "_setHash",
							value: function(e) {
								window.history && window.history.pushState && this.data.useHistoryApi && (e ? window.history.replaceState(null, null, "" + location.pathname + location.search + "#" + e) : window.history.replaceState(null, null, "" + location.pathname + location.search))
							}
						}, {
							key: "_getCurrentItemByHash",
							value: function() {
								function t(e) {
									i.group === e.groupId && i.photo === e.id && (s = e)
								}
								var a = this.data.group,
									e = location.hash.substr(1),
									i = p.parseQuery(e),
									s = null;
								return Object.keys(a).forEach(function(e) {
									a[e].forEach(t)
								}), s
							}
						}, {
							key: "_loadItem",
							value: function(a) {
								return new d(function(e) {
									var t = new Image;
									t.onload = function() {
										a.width = t.width, a.height = t.height, a.loaded = !0, e()
									}, t.onerror = function() {
										e()
									}, t.src = a.src
								})
							}
						}, {
							key: "_getItemByIndex",
							value: function(e) {
								var t = this.data;
								return t.group[t.currentGroup][e] ? t.group[t.currentGroup][e] : null
							}
						}, {
							key: "_loadNeighborItems",
							value: function() {
								for(var e = this, t = this.data.currentIndex, a = this.data.loadOffset, i = t + a, s = [], o = t - a; o < i; o++) {
									var r = this._getItemByIndex(o);
									r && !r.loaded && s.push(this._loadItem(r))
								}
								s.length && d.all(s).then(function() {
									e._initPhoto(), e.update()
								})
							}
						}, {
							key: "_setSizeByScreen",
							value: function() {
								var t = this._getWindowWidth(),
									a = this._getWindowHeight(),
									e = this.data.headerHeight,
									i = this.data.footerHeight,
									s = a - (e + i);
								this.groupItems().forEach(function(e) {
									e.loaded && (e.processed = !0, e.scale = s / e.height, e.height < s && (e.scale = 1), e.x = (e.scale - 1) / 2 * e.width + (t - e.width * e.scale) / 2, e.y = (e.scale - 1) / 2 * e.height + (a - e.height * e.scale) / 2, e.width * e.scale > t && (e.scale = t / e.width, e.x = (e.scale - 1) / 2 * e.width))
								})
							}
						}, {
							key: "_slideList",
							value: function() {
								var t = this;
								this.data.scaleSize = 1, this.isBeingZoomed = !1, this.data.hideUi = !1, this.data.scale = !1, this.data.photoPosX = 0, this.data.photoPosY = 0, this.data.onMoveClass = !0, this._setPosByCurrentIndex(), this._setHashByCurrentIndex(), this._setSizeByScreen(), setTimeout(function() {
									var e = t._getSelectedItem();
									t.data.onMoveClass = !1, t.setArrow(), t.update(), t.data.oldIndex !== t.data.currentIndex && t._fireEvent("change"), t.data.oldIndex = t.data.currentIndex, t._loadNeighborItems(), e.loaded || t._loadItem(e).then(function() {
										t._initPhoto(), t.update()
									})
								}, 200)
							}
						}, {
							key: "gotoSlide",
							value: function(e) {
								this.e && this.e.preventDefault && this.e.preventDefault(), this.data.currentIndex = parseInt(e, 10), this.data.currentIndex || (this.data.currentIndex = 0), this._slideList()
							}
						}, {
							key: "setArrow",
							value: function() {
								var e = this.groupItems().length,
									t = this.data.currentIndex + 1,
									a = this.data.currentIndex - 1;
								this.data.showNextArrow = !1, this.data.showPrevArrow = !1, t !== e && (this.data.next = t, this.data.showNextArrow = !0), -1 != a && (this.data.prev = a, this.data.showPrevArrow = !0)
							}
						}, {
							key: "beforeDrag",
							value: function() {
								if(this._isGestured(this.e)) this.beforeGesture();
								else if(this.isBeingZoomed = !1, this.data.scale) this.beforePhotoDrag();
								else {
									var e = this._getTouchPos();
									this.isSwipable = !0, this.dragStart = !0, this.firstPos = e, this.oldPos = e
								}
							}
						}, {
							key: "afterDrag",
							value: function() {
								var e = this.groupItems(),
									t = (new Date).getTime(),
									a = this.tapSecond - t,
									i = 0,
									s = 0;
								return this.isSwipable = !1, this.onListMove = !1, this.oldPos && (i = this.oldPos.x - this.firstPos.x, s = this.oldPos.y - this.firstPos.y), this.isBeingZoomed ? void this.afterGesture() : this.data.scale ? void this.afterPhotoDrag() : p.isSmartPhone() || 0 !== i || 0 !== s ? Math.abs(a) <= 500 && 0 === i && 0 === s ? (this.e.preventDefault(), void this.zoomPhoto()) : (this.tapSecond = t, this._fireEvent("swipeend"), "horizontal" === this.moveDir && (i >= this.data.swipeOffset && 0 !== this.data.currentIndex ? this.data.currentIndex -= 1 : i <= -this.data.swipeOffset && this.data.currentIndex !== e.length - 1 && (this.data.currentIndex += 1), this._slideList()), void("vertical" === this.moveDir && (this.data.swipeBottomToClose && s >= this.data.swipeOffset ? this.hidePhoto("bottom") : this.data.swipeTopToClose && s <= -this.data.swipeOffset ? this.hidePhoto("top") : (this.data.translateY = 0, this._slideList())))) : void this.zoomPhoto()
							}
						}, {
							key: "onDrag",
							value: function() {
								if(this.e.preventDefault(), this._isGestured(this.e) && !1 === this.onListMove) this.onGesture();
								else if(!this.isBeingZoomed) {
									if(this.data.scale) return void this.onPhotoDrag();
									if(this.isSwipable) {
										var e = this._getTouchPos(),
											t = e.x - this.oldPos.x,
											a = e.y - this.firstPos.y;
										this.dragStart && (this._fireEvent("swipestart"), this.dragStart = !1, Math.abs(t) > Math.abs(a) ? this.moveDir = "horizontal" : this.moveDir = "vertical"), "horizontal" === this.moveDir ? (this.pos.x += t, this.data.translateX = this.pos.x) : this.data.translateY = a, this.onListMove = !0, this.oldPos = e, this._listUpdate()
									}
								}
							}
						}, {
							key: "zoomPhoto",
							value: function() {
								var e = this;
								this.data.hideUi = !0, this.data.scaleSize = this._getScaleBoarder(), this.data.scaleSize <= 1 || (this.data.photoPosX = 0, this.data.photoPosY = 0, this._photoUpdate(), setTimeout(function() {
									e.data.scale = !0, e._photoUpdate(), e._fireEvent("zoomin")
								}, 300))
							}
						}, {
							key: "zoomOutPhoto",
							value: function() {
								this.data.scaleSize = 1, this.isBeingZoomed = !1, this.data.hideUi = !1, this.data.scale = !1, this.data.photoPosX = 0, this.data.photoPosY = 0, this._photoUpdate(), this._fireEvent("zoomout")
							}
						}, {
							key: "beforePhotoDrag",
							value: function() {
								var e = this._getTouchPos();
								this.photoSwipable = !0, this.data.photoPosX || (this.data.photoPosX = 0), this.data.photoPosY || (this.data.photoPosY = 0), this.oldPhotoPos = e, this.firstPhotoPos = e
							}
						}, {
							key: "onPhotoDrag",
							value: function() {
								if(this.photoSwipable) {
									this.e.preventDefault();
									var e = this._getTouchPos(),
										t = e.x - this.oldPhotoPos.x,
										a = e.y - this.oldPhotoPos.y,
										i = this._round(this.data.scaleSize * t, 6),
										s = this._round(this.data.scaleSize * a, 6);
									"number" == typeof i && (this.data.photoPosX += i, this.photoVX = i), "number" == typeof s && (this.data.photoPosY += s, this.photoVY = s), this.oldPhotoPos = e, this._photoUpdate()
								}
							}
						}, {
							key: "afterPhotoDrag",
							value: function() {
								if(this.oldPhotoPos.x === this.firstPhotoPos.x && this.photoSwipable) this.photoSwipable = !1, this.zoomOutPhoto();
								else {
									this.photoSwipable = !1;
									var e = this._getSelectedItem(),
										t = this._makeBound(e),
										a = this.data.swipeOffset * this.data.scaleSize,
										i = 0,
										s = 0;
									if(this.data.photoPosX > t.maxX ? i = -1 : this.data.photoPosX < t.minX && (i = 1), this.data.photoPosY > t.maxY ? s = -1 : this.data.photoPosY < t.minY && (s = 1), this.data.photoPosX - t.maxX > a && 0 !== this.data.currentIndex) return void this.gotoSlide(this.data.prev);
									if(t.minX - this.data.photoPosX > a && this.data.currentIndex + 1 !== this.data.total) return void this.gotoSlide(this.data.next);
									0 === i && 0 === s ? (this.vx = this.photoVX / 5, this.vy = this.photoVY / 5) : this._registerElasticForce(i, s)
								}
							}
						}, {
							key: "beforeGesture",
							value: function() {
								this._fireEvent("gesturestart");
								var e = this._getGesturePos(this.e),
									t = this._getDistance(e[0], e[1]);
								this.isBeingZoomed = !0, this.oldDistance = t, this.data.scale = !0, this.e.preventDefault()
							}
						}, {
							key: "onGesture",
							value: function() {
								var e = this._getGesturePos(this.e),
									t = this._getDistance(e[0], e[1]),
									a = (t - this.oldDistance) / 100,
									i = this.data.scaleSize,
									s = this.data.photoPosX,
									o = this.data.photoPosY;
								this.isBeingZoomed = !0, this.data.scaleSize += this._round(a, 6), this.data.scaleSize < .2 && (this.data.scaleSize = .2), this.data.scaleSize < i && (this.data.photoPosX = (1 + this.data.scaleSize - i) * s, this.data.photoPosY = (1 + this.data.scaleSize - i) * o), this.data.scaleSize < 1 || this.data.scaleSize > this._getScaleBoarder() ? this.data.hideUi = !0 : this.data.hideUi = !1, this.oldDistance = t, this.e.preventDefault(), this._photoUpdate()
							}
						}, {
							key: "afterGesture",
							value: function() {
								this.data.scaleSize > this._getScaleBoarder() || (this.data.photoPosX = 0, this.data.photoPosY = 0, this.data.scale = !1, this.data.scaleSize = 1, this.data.hideUi = !1, this._fireEvent("gestureend"), this._photoUpdate())
							}
						}, {
							key: "_getForceAndTheta",
							value: function(e, t) {
								return {
									force: Math.sqrt(e * e + t * t),
									theta: Math.atan2(t, e)
								}
							}
						}, {
							key: "_getScaleBoarder",
							value: function() {
								var e = this._getSelectedItem(),
									t = this._getWindowWidth(),
									a = this._getWindowHeight();
								return p.isSmartPhone() ? e.width > e.height ? a / (e.height * e.scale) : t / (e.width * e.scale) : 1 / e.scale
							}
						}, {
							key: "_makeBound",
							value: function(e) {
								var t = e.width * e.scale * this.data.scaleSize,
									a = e.height * e.scale * this.data.scaleSize,
									i = void 0,
									s = void 0,
									o = void 0,
									r = void 0,
									n = this._getWindowWidth(),
									l = this._getWindowHeight();
								return i = -1 * (o = t < n ? (n - t) / 2 : (t - n) / 2), s = -1 * (r = a < l ? (l - a) / 2 : (a - l) / 2), {
									minX: this._round(i, 6) * this.data.scaleSize,
									minY: this._round(s, 6) * this.data.scaleSize,
									maxX: this._round(o, 6) * this.data.scaleSize,
									maxY: this._round(r, 6) * this.data.scaleSize
								}
							}
						}, {
							key: "_registerElasticForce",
							value: function(e, t) {
								var a = this,
									i = this._getSelectedItem(),
									s = this._makeBound(i);
								this.data.elastic = !0, 1 === e ? this.data.photoPosX = s.minX : -1 === e && (this.data.photoPosX = s.maxX), 1 === t ? this.data.photoPosY = s.minY : -1 === t && (this.data.photoPosY = s.maxY), this._photoUpdate(), setTimeout(function() {
									a.data.elastic = !1, a._photoUpdate()
								}, 300)
							}
						}, {
							key: "_getSelectedItem",
							value: function() {
								var e = this.data,
									t = e.currentIndex;
								return e.group[e.currentGroup][t]
							}
						}, {
							key: "_getUniqId",
							value: function() {
								return(Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
							}
						}, {
							key: "_getDistance",
							value: function(e, t) {
								var a = e.x - t.x,
									i = e.y - t.y;
								return Math.sqrt(a * a + i * i)
							}
						}, {
							key: "_round",
							value: function(e, t) {
								var a = Math.pow(10, t);
								return e *= a, (e = Math.round(e)) / a
							}
						}, {
							key: "_isTouched",
							value: function(e) {
								return !(!e || !e.touches)
							}
						}, {
							key: "_isGestured",
							value: function(e) {
								return !!(e && e.touches && 1 < e.touches.length)
							}
						}, {
							key: "_isSmartPhone",
							value: function() {
								var e = navigator.userAgent;
								return 0 < e.indexOf("iPhone") || 0 < e.indexOf("iPad") || 0 < e.indexOf("ipod") || 0 < e.indexOf("Android")
							}
						}, {
							key: "_calcGravity",
							value: function(e, t) {
								(5 < e || e < -5) && (this.vx += .05 * e), !1 !== this.data.verticalGravity && (5 < t || t < -5) && (this.vy += .05 * t)
							}
						}, {
							key: "_photoUpdate",
							value: function() {
								var e = this.data.classNames,
									t = this._getElementByQuery(".current").querySelector("." + e.smartPhotoImg),
									a = this._getElementByQuery("." + e.smartPhotoNav),
									i = this._getElementByQuery("." + e.smartPhotoArrows),
									s = "translate(" + this.virtualPos(this.data.photoPosX) + "px," + this.virtualPos(this.data.photoPosY) + "px) scale(" + this.data.scaleSize + ")";
								t.style.transform = s, this.data.scale ? p.addClass(t, e.smartPhotoImgOnMove) : p.removeClass(t, e.smartPhotoImgOnMove), this.data.elastic ? p.addClass(t, e.smartPhotoImgElasticMove) : p.removeClass(t, e.smartPhotoImgElasticMove), this.data.hideUi ? (a && a.setAttribute("aria-hidden", "true"), i && i.setAttribute("aria-hidden", "true")) : (a && a.setAttribute("aria-hidden", "false"), i && i.setAttribute("aria-hidden", "false"))
							}
						}, {
							key: "_getWindowWidth",
							value: function() {
								return document && document.documentElement ? document.documentElement.clientWidth : window && window.innerWidth ? window.innerWidth : 0
							}
						}, {
							key: "_getWindowHeight",
							value: function() {
								return document && document.documentElement ? document.documentElement.clientHeight : window && window.innerHeight ? window.innerHeight : 0
							}
						}, {
							key: "_listUpdate",
							value: function() {
								var e = this.data.classNames,
									t = this._getElementByQuery("." + e.smartPhotoList),
									a = "translate(" + this.data.translateX + "px," + this.data.translateY + "px)";
								t.style.transform = a, this.data.onMoveClass ? p.addClass(t, e.smartPhotoListOnMove) : p.removeClass(t, e.smartPhotoListOnMove)
							}
						}, {
							key: "_fireEvent",
							value: function(e) {
								var t = this._getElementByClass(this.data.classNames.smartPhoto);
								p.triggerEvent(t, e)
							}
						}, {
							key: "_doAnim",
							value: function() {
								if(!(this.isBeingZoomed || this.isSwipable || this.photoSwipable || this.data.elastic) && this.data.scale) {
									this.data.photoPosX += this.vx, this.data.photoPosY += this.vy;
									var e = this._getSelectedItem(),
										t = this._makeBound(e);
									this.data.photoPosX < t.minX ? (this.data.photoPosX = t.minX, this.vx *= -.2) : this.data.photoPosX > t.maxX && (this.data.photoPosX = t.maxX, this.vx *= -.2), this.data.photoPosY < t.minY ? (this.data.photoPosY = t.minY, this.vy *= -.2) : this.data.photoPosY > t.maxY && (this.data.photoPosY = t.maxY, this.vy *= -.2);
									var a = this._getForceAndTheta(this.vx, this.vy),
										i = a.force,
										s = a.theta;
									i -= this.data.registance, Math.abs(i) < .5 || (this.vx = Math.cos(s) * i, this.vy = Math.sin(s) * i, this._photoUpdate())
								}
							}
						}]), h);

					function h(e, t) {
						! function(e, t) {
							if(!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
						}(this, h);
						var a = r(this, (h.__proto__ || Object.getPrototypeOf(h)).call(this));
						a.data = p.extend({}, c, t), a.data.currentIndex = 0, a.data.oldIndex = 0, a.data.hide = !0, a.data.group = {}, a.data.scaleSize = 1, a.data.scale = !1, a.pos = {
							x: 0,
							y: 0
						}, a.data.photoPosX = 0, a.data.photoPosY = 0, a.convert = {
							increment: a.increment,
							virtualPos: a.virtualPos,
							round: a.round
						}, a.data.groupItems = a.groupItems, a.elements = "string" == typeof e ? document.querySelectorAll(e) : e;
						var i = new Date;
						a.tapSecond = i.getTime(), a.onListMove = !1, a.clicked = !1, a.id = a._getUniqId(), a.vx = 0, a.vy = 0, a.data.appearEffect = null, a.addTemplate(a.id, '<div class="\\{classNames.smartPhoto\\}"\x3c!-- BEGIN hide:exist --\x3e aria-hidden="true"\x3c!-- END hide:exist --\x3e\x3c!-- BEGIN hide:empty --\x3e aria-hidden="false"\x3c!-- END hide:empty --\x3e role="dialog">\n\t<div class="\\{classNames.smartPhotoBody\\}">\n\t\t<div class="\\{classNames.smartPhotoInner\\}">\n\t\t\t   <div class="\\{classNames.smartPhotoHeader\\}">\n\t\t\t\t\t<span class="\\{classNames.smartPhotoCount\\}">{currentIndex}[increment]/{total}</span>\n\t\t\t\t\t<span class="\\{classNames.smartPhotoCaption\\}" aria-live="polite" tabindex="-1">\x3c!-- BEGIN groupItems:loop --\x3e\x3c!-- \\BEGIN currentIndex:touch#{index} --\x3e{caption}\x3c!-- \\END currentIndex:touch#{index} --\x3e\x3c!-- END groupItems:loop --\x3e</span>\n\t\t\t\t\t<button class="\\{classNames.smartPhotoDismiss\\}" data-action-click="hidePhoto()"><span class="smartphoto-sr-only">\\{message.closeDialog\\}</span></button>\n\t\t\t\t</div>\n\t\t\t\t<div class="\\{classNames.smartPhotoContent\\}"\x3c!-- BEGIN isSmartPhone:exist --\x3e data-action-touchstart="beforeDrag" data-action-touchmove="onDrag" data-action-touchend="afterDrag(false)"\x3c!-- END isSmartPhone:exist --\x3e\x3c!-- BEGIN isSmartPhone:empty --\x3e data-action-click="hidePhoto()"\x3c!-- END isSmartPhone:empty --\x3e>\n\t\t\t\t</div>\n\t\t\t\t<ul style="transform:translate({translateX}[round]px,{translateY}[round]px);" class="\\{classNames.smartPhotoList\\}\x3c!-- BEGIN onMoveClass:exist --\x3e \\{classNames.smartPhotoListOnMove\\}\x3c!-- END onMoveClass:exist --\x3e">\n\t\t\t\t\t\x3c!-- BEGIN groupItems:loop --\x3e\n\t\t\t\t\t<li style="transform:translate({translateX}[round]px,{translateY}[round]px);" class="\x3c!-- \\BEGIN currentIndex:touch#{index} --\x3ecurrent\x3c!-- \\END currentIndex:touch#{index} --\x3e">\n\t\t\t\t\t\t\x3c!-- BEGIN processed:exist --\x3e\n\t\t\t\t\t\t<div style="transform:translate({x}[round]px,{y}[round]px) scale({scale});" class="\\\\{classNames.smartPhotoImgWrap\\\\}"\x3c!-- \\BEGIN isSmartPhone:empty --\x3e data-action-mousemove="onDrag" data-action-mousedown="beforeDrag" data-action-mouseup="afterDrag"\x3c!-- \\END isSmartPhone:empty --\x3e\x3c!-- \\BEGIN isSmartPhone:exist --\x3e data-action-touchstart="beforeDrag" data-action-touchmove="onDrag" data-action-touchend="afterDrag"\x3c!-- \\END isSmartPhone:exist --\x3e>\n\t\t\t\t\t\t\t<img style="\x3c!-- \\BEGIN currentIndex:touch#{index} --\x3etransform:translate(\\{photoPosX\\}[virtualPos]px,\\{photoPosY\\}[virtualPos]px) scale(\\{scaleSize\\});\x3c!-- \\END currentIndex:touch#{index} --\x3ewidth:{width}px;" src="{src}" class="\\\\{classNames.smartPhotoImg\\\\}\x3c!-- \\BEGIN scale:exist --\x3e  \\\\{classNames.smartPhotoImgOnMove\\\\}\x3c!-- \\END scale:exist --\x3e\x3c!-- \\BEGIN elastic:exist --\x3e \\\\{classNames.smartPhotoImgElasticMove\\\\}\x3c!-- \\END elastic:exist --\x3e\x3c!-- \\BEGIN appear:exist --\x3e active\x3c!-- \\END appear:exist --\x3e" ondragstart="return false;">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\x3c!-- END processed:exist --\x3e\n\t\t\t\t\t\t\x3c!-- BEGIN processed:empty --\x3e\n\t\t\t\t\t\t<div class="\\\\{classNames.smartPhotoLoaderWrap\\\\}">\n\t\t\t\t\t\t\t<span class="\\\\{classNames.smartPhotoLoader\\\\}"></span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\x3c!-- END processed:empty --\x3e\n\t\t\t\t\t</li>\n\t\t\t\t\t\x3c!-- END groupItems:loop --\x3e\n\t\t\t\t</ul>\n\t\t\t\t\x3c!-- BEGIN arrows:exist --\x3e\n\t\t\t\t<ul class="\\{classNames.smartPhotoArrows\\}"\x3c!-- BEGIN hideUi:exist --\x3e aria-hidden="true"\x3c!-- END hideUi:exist --\x3e\x3c!-- BEGIN hideUi:exist --\x3e aria-hidden="false"\x3c!-- END hideUi:exist --\x3e>\n\t\t\t\t\t<li class="\\{classNames.smartPhotoArrowLeft\\}\x3c!-- BEGIN isSmartPhone:exist --\x3e \\{classNames.smartPhotoArrowHideIcon\\}\x3c!-- END isSmartPhone:exist --\x3e"\x3c!-- BEGIN showPrevArrow:empty --\x3e aria-hidden="true"\x3c!-- END showPrevArrow:empty --\x3e><a href="#" data-action-click="gotoSlide({prev})" role="button"><span class="smartphoto-sr-only">\\{message.gotoPrevImage\\}</span></a></li>\n\t\t\t\t\t<li class="\\{classNames.smartPhotoArrowRight\\}\x3c!-- BEGIN isSmartPhone:exist --\x3e \\{classNames.smartPhotoArrowHideIcon\\}\x3c!-- END isSmartPhone:exist --\x3e"\x3c!-- BEGIN showNextArrow:empty --\x3e aria-hidden="true"\x3c!-- END showNextArrow:empty --\x3e><a href="#" data-action-click="gotoSlide({next})" role="button"><span class="smartphoto-sr-only">\\{message.gotoNextImage\\}</span></a></li>\n\t\t\t\t</ul>\n\t\t\t\t\x3c!-- END arrows:exist --\x3e\n\t\t\t\t\x3c!-- BEGIN nav:exist --\x3e\n\t\t\t\t<nav class="\\{classNames.smartPhotoNav\\}"\x3c!-- BEGIN hideUi:exist --\x3e aria-hidden="true"\x3c!-- END hideUi:exist --\x3e\x3c!-- BEGIN hideUi:exist --\x3e aria-hidden="false"\x3c!-- END hideUi:exist --\x3e>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t\x3c!-- BEGIN groupItems:loop --\x3e\n\t\t\t\t\t\t<li><a href="#" data-action-click="gotoSlide({index})" class="\x3c!-- \\BEGIN currentIndex:touch#{index} --\x3ecurrent\x3c!-- \\END currentIndex:touch#{index} --\x3e" style="background-image:url({thumb});" role="button"><span class="smartphoto-sr-only">go to {caption}</span></a></li>\n\t\t\t\t\t\t\x3c!-- END groupItems:loop --\x3e\n\t\t\t\t\t</ul>\n\t\t\t\t</nav>\n\t\t\t\t\x3c!-- END nav:exist --\x3e\n\t\t</div>\n\t\t\x3c!-- BEGIN appearEffect:exist --\x3e\n\t\t<img src=\\{appearEffect.img\\}\n\t\tclass="\\{classNames.smartPhotoImgClone\\}"\n\t\tstyle="width:\\{appearEffect.width\\}px;height:\\{appearEffect.height\\}px;transform:translate(\\{appearEffect.left\\}px,\\{appearEffect.top\\}px) scale(1)" />\n\t\t\x3c!-- END appearEffect:exist --\x3e\n\t</div>\n</div>\n'), a.data.isSmartPhone = a._isSmartPhone();
						var s = document.querySelector("body");
						p.append(s, "<div data-id='" + a.id + "'></div>"), [].forEach.call(a.elements, function(e) {
							a.addNewItem(e)
						}), a.update();
						var o = a._getCurrentItemByHash();
						return o && p.triggerEvent(o.element, "click"), setInterval(function() {
							a._doAnim()
						}, a.data.forceInterval), a.data.isSmartPhone ? (window.addEventListener("orientationchange", function() {
							a.groupItems() && (a._resetTranslate(), a._setPosByCurrentIndex(), a._setHashByCurrentIndex(), a._setSizeByScreen(), a.update())
						}), a.data.useOrientationApi ? (window.addEventListener("deviceorientation", function(e) {
							var t = window.orientation;
							e && e.gamma && !a.data.appearEffect && (a.isBeingZoomed || a.photoSwipable || a.data.elastic || !a.data.scale || (0 === t ? a._calcGravity(e.gamma, e.beta) : 90 === t ? a._calcGravity(e.beta, e.gamma) : -90 === t ? a._calcGravity(-e.beta, -e.gamma) : 180 === t && a._calcGravity(-e.gamma, -e.beta)))
						}), a) : r(a)) : (window.addEventListener("resize", function() {
							a.groupItems() && (a._resetTranslate(), a._setPosByCurrentIndex(), a._setSizeByScreen(), a.update())
						}), window.addEventListener("keydown", function(e) {
							var t = e.keyCode || e.which;
							!0 !== a.data.hide && (37 === t ? a.gotoSlide(a.data.prev) : 39 === t ? a.gotoSlide(a.data.next) : 27 === t && a.hidePhoto())
						}), r(a))
					}
					a.default = u, t.exports = a.default
				}, {
					"../lib/util": 12,
					"a-template": 1,
					"custom-event-polyfill": 3,
					"es6-promise-polyfill": 4
				}],
				11: [function(e, t, a) {
					t.exports = e("./core/")
				}, {
					"./core/": 10
				}],
				12: [function(e, t, a) {
					Object.defineProperty(a, "__esModule", {
						value: !0
					});
					var o = "function" == typeof Symbol && "symbol" == E(Symbol.iterator) ? function(e) {
							return E(e)
						} : function(e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : E(e)
						},
						i = (a.isSmartPhone = function() {
							var e = navigator.userAgent;
							return 0 < e.indexOf("iPhone") || 0 < e.indexOf("iPad") || 0 < e.indexOf("ipod") || 0 < e.indexOf("Android")
						}, a.extend = function e(t) {
							t = t || {};
							for(var a = 1; a < arguments.length; a++) {
								var i = arguments[a];
								if(i)
									for(var s in i) i.hasOwnProperty(s) && ("object" === o(i[s]) ? t[s] = e(t[s], i[s]) : t[s] = i[s])
							}
							return t
						}, a.triggerEvent = function(e, t, a) {
							var i = void 0;
							window.CustomEvent ? i = new CustomEvent(t, {
								cancelable: !0
							}) : (i = document.createEvent("CustomEvent")).initCustomEvent(t, !1, !1, a), e.dispatchEvent(i)
						}, a.parseQuery = function(e) {
							for(var t, a, i, s = e.split("&"), o = {}, r = 0, n = s.length; r < n; r++) void 0 !== (t = s[r].split("="))[0] && (a = t[0], i = void 0 !== t[1] ? t.slice(1).join("=") : a, o[a] = decodeURIComponent(i));
							return o
						}, a.getViewPos = function(e) {
							return {
								left: e.getBoundingClientRect().left,
								top: e.getBoundingClientRect().top
							}
						}, a.removeElement = function(e) {
							e && e.parentNode && e.parentNode.removeChild(e)
						}, a.append = function(e, t) {
							var a = document.createElement("div");
							for(a.innerHTML = t; 0 < a.children.length;) e.appendChild(a.children[0])
						}, a.addClass = function(e, t) {
							e.classList ? e.classList.add(t) : e.className += " " + t
						}, a.removeClass = function(e, t) {
							e.classList ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " ")
						}, a.getBrowser = function() {
							var e = window.navigator.userAgent.toLowerCase(),
								t = window.navigator.appVersion.toLowerCase(),
								a = "unknown";
							return -1 != e.indexOf("msie") ? a = -1 != t.indexOf("msie 6.") ? "ie6" : -1 != t.indexOf("msie 7.") ? "ie7" : -1 != t.indexOf("msie 8.") ? "ie8" : -1 != t.indexOf("msie 9.") ? "ie9" : -1 != t.indexOf("msie 10.") ? "ie10" : "ie" : -1 != e.indexOf("trident/7") ? a = "ie11" : -1 != e.indexOf("chrome") ? a = "chrome" : -1 != e.indexOf("safari") ? a = "safari" : -1 != e.indexOf("opera") ? a = "opera" : -1 != e.indexOf("firefox") && (a = "firefox"), a
						});
					a.isOldIE = function() {
						var e = i();
						return -1 !== e.indexOf("ie") && parseInt(e.replace(/[^0-9]/g, "")) <= 10
					}
				}, {}]
			}, {}, [9])
		}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
	}, {}],
	5: [function(e, t, a) {
		"use strict";
		/*!
		 * Lazy Load - jQuery plugin for lazy loading images
		 *
		 * Copyright (c) 2007-2015 Mika Tuupola
		 *
		 * Licensed under the MIT license:
		 *   http://www.opensource.org/licenses/mit-license.php
		 *
		 * Project home:
		 *   http://www.appelsiini.net/projects/lazyload
		 *
		 * Version:  1.9.7
		 *
		 */
		var d, i, s, c, o, p;
		d = jQuery, i = window, s = document, o = d(i), p = function() {
			try {
				return 0 === s.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")
			} catch(e) {
				return !1
			}
		}(), d.fn.lazyload = function(e) {
			var t, n = this,
				l = {
					threshold: 0,
					failure_limit: 500,
					event: "scroll",
					effect: "show",
					container: i,
					data_attribute: "original",
					skip_invisible: !1,
					appear: null,
					load: null,
					webp: null,
					placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
				};

			function a() {
				var t = 0;
				n.each(function() {
					var e = d(this);
					if((!l.skip_invisible || e.is(":visible")) && !d.abovethetop(this, l) && !d.leftofbegin(this, l))
						if(d.belowthefold(this, l) || d.rightoffold(this, l)) {
							if(++t > l.failure_limit) return !1
						} else e.trigger("appear"), t = 0
				})
			}
			return e && (c !== e.failurelimit && (e.failure_limit = e.failurelimit, delete e.failurelimit), c !== e.effectspeed && (e.effect_speed = e.effectspeed, delete e.effectspeed), d.extend(l, e)), t = l.container === c || l.container === i ? o : d(l.container), 0 === l.event.indexOf("scroll") && t.on(l.event, function() {
				return a()
			}), this.each(function() {
				var o = this,
					r = d(o);
				o.loaded = !1, r.attr("src") !== c && !1 !== r.attr("src") || r.is("img") && r.attr("src", l.placeholder), r.one("appear", function() {
					if(!this.loaded) {
						if(l.appear) {
							var e = n.length;
							l.appear.call(o, e, l)
						}
						var a = r.attr("data-" + l.data_attribute);
						a && p && l.webp && (a = function(e) {
							return e && 1 < e.split("?").length ? e.match(/([&?]+)x-oss-process=/i) ? e = e.replace(/([&?]+)x-oss-process=/i, "$1x-oss-process=image/format,webp,") : e.match(/([&?]+)imageMogr2/i) ? e = e.replace(/([&?]+)imageMogr2\//i, "$1imageMogr2/format/webp/") : e += l.webp.replace("?", "&") : e && (e += l.webp), e
						}(a));
						var i = r.attr("data-srcset"),
							s = r.css("display");
						a && d("<img />").one("load", function() {
							r.hide(), r.is("img") ? (i && r.attr("srcset", i), r.attr("src", a), r.hasClass("fluidbox__thumb") && setTimeout(function() {
								r.closest("a.fluidbox").fluidbox("reposition")
							}, 200)) : r.css("background-image", "url('" + a + "')"), r[l.effect](l.effect_speed).css("display", s), o.loaded = !0;
							var e = d.grep(n, function(e) {
								return !e.loaded
							});
							if(n = d(e), l.load) {
								var t = n.length;
								l.load.call(o, t, l)
							}
							r.trigger("DOMSubtreeModified")
						}).attr("src", a)
					}
				}), 0 !== l.event.indexOf("scroll") && r.on(l.event, function() {
					o.loaded || r.trigger("appear")
				})
			}), o.on("resize", function() {
				a()
			}), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && o.on("pageshow", function(e) {
				e.originalEvent && e.originalEvent.persisted && n.each(function() {
					d(this).trigger("appear")
				})
			}), d(s).ready(function() {
				a()
			}), this
		}, d.belowthefold = function(e, t) {
			return(t.container === c || t.container === i ? (i.innerHeight ? i.innerHeight : o.height()) + o.scrollTop() : d(t.container).offset().top + d(t.container).height()) <= d(e).offset().top - t.threshold
		}, d.rightoffold = function(e, t) {
			return(t.container === c || t.container === i ? o.width() + o.scrollLeft() : d(t.container).offset().left + d(t.container).width()) <= d(e).offset().left - t.threshold
		}, d.abovethetop = function(e, t) {
			return(t.container === c || t.container === i ? o.scrollTop() : d(t.container).offset().top) >= d(e).offset().top + t.threshold + d(e).height()
		}, d.leftofbegin = function(e, t) {
			return(t.container === c || t.container === i ? o.scrollLeft() : d(t.container).offset().left) >= d(e).offset().left + t.threshold + d(e).width()
		}, d.inviewport = function(e, t) {
			return !(d.rightoffold(e, t) || d.leftofbegin(e, t) || d.belowthefold(e, t) || d.abovethetop(e, t))
		}, d.extend(d.expr[":"], {
			"below-the-fold": function(e) {
				return d.belowthefold(e, {
					threshold: 0
				})
			},
			"above-the-top": function(e) {
				return !d.belowthefold(e, {
					threshold: 0
				})
			},
			"right-of-screen": function(e) {
				return d.rightoffold(e, {
					threshold: 0
				})
			},
			"left-of-screen": function(e) {
				return !d.rightoffold(e, {
					threshold: 0
				})
			},
			"in-viewport": function(e) {
				return d.inviewport(e, {
					threshold: 0
				})
			},
			"above-the-fold": function(e) {
				return !d.belowthefold(e, {
					threshold: 0
				})
			},
			"right-of-fold": function(e) {
				return d.rightoffold(e, {
					threshold: 0
				})
			},
			"left-of-fold": function(e) {
				return !d.rightoffold(e, {
					threshold: 0
				})
			}
		})
	}, {}],
	6: [function(e, t, a) {
		"use strict";
		var m;
		(m = jQuery).fn.qrcode = function(d) {
			var a;

			function t(e) {
				this.mode = a, this.data = e
			}

			function c(e, t) {
				this.typeNumber = e, this.errorCorrectLevel = t, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = []
			}

			function p(e, t) {
				if(null == e.length) throw Error(e.length + "/" + t);
				for(var a = 0; a < e.length && 0 == e[a];) a++;
				this.num = Array(e.length - a + t);
				for(var i = 0; i < e.length - a; i++) this.num[i] = e[i + a]
			}

			function u(e, t) {
				this.totalCount = e, this.dataCount = t
			}

			function r() {
				this.buffer = [], this.length = 0
			}
			t.prototype = {
				getLength: function() {
					return this.data.length
				},
				write: function(e) {
					for(var t = 0; t < this.data.length; t++) e.put(this.data.charCodeAt(t), 8)
				}
			}, c.prototype = {
				addData: function(e) {
					this.dataList.push(new t(e)), this.dataCache = null
				},
				isDark: function(e, t) {
					if(e < 0 || this.moduleCount <= e || t < 0 || this.moduleCount <= t) throw Error(e + "," + t);
					return this.modules[e][t]
				},
				getModuleCount: function() {
					return this.moduleCount
				},
				make: function() {
					if(this.typeNumber < 1) {
						var e = 1;
						for(e = 1; e < 40; e++) {
							for(var t = u.getRSBlocks(e, this.errorCorrectLevel), a = new r, i = 0, s = 0; s < t.length; s++) i += t[s].dataCount;
							for(s = 0; s < this.dataList.length; s++) t = this.dataList[s], a.put(t.mode, 4), a.put(t.getLength(), h.getLengthInBits(t.mode, e)), t.write(a);
							if(a.getLengthInBits() <= 8 * i) break
						}
						this.typeNumber = e
					}
					this.makeImpl(!1, this.getBestMaskPattern())
				},
				makeImpl: function(e, t) {
					this.moduleCount = 4 * this.typeNumber + 17, this.modules = Array(this.moduleCount);
					for(var a = 0; a < this.moduleCount; a++) {
						this.modules[a] = Array(this.moduleCount);
						for(var i = 0; i < this.moduleCount; i++) this.modules[a][i] = null
					}
					this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(e, t), 7 <= this.typeNumber && this.setupTypeNumber(e), null == this.dataCache && (this.dataCache = c.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, t)
				},
				setupPositionProbePattern: function(e, t) {
					for(var a = -1; a <= 7; a++)
						if(!(e + a <= -1 || this.moduleCount <= e + a))
							for(var i = -1; i <= 7; i++) t + i <= -1 || this.moduleCount <= t + i || (this.modules[e + a][t + i] = 0 <= a && a <= 6 && (0 == i || 6 == i) || 0 <= i && i <= 6 && (0 == a || 6 == a) || 2 <= a && a <= 4 && 2 <= i && i <= 4)
				},
				getBestMaskPattern: function() {
					for(var e = 0, t = 0, a = 0; a < 8; a++) {
						this.makeImpl(!0, a);
						var i = h.getLostPoint(this);
						(0 == a || i < e) && (e = i, t = a)
					}
					return t
				},
				createMovieClip: function(e, t, a) {
					for(e = e.createEmptyMovieClip(t, a), this.make(), t = 0; t < this.modules.length; t++) {
						a = 1 * t;
						for(var i = 0; i < this.modules[t].length; i++) {
							var s = 1 * i;
							this.modules[t][i] && (e.beginFill(0, 100), e.moveTo(s, a), e.lineTo(1 + s, a), e.lineTo(1 + s, a + 1), e.lineTo(s, a + 1), e.endFill())
						}
					}
					return e
				},
				setupTimingPattern: function() {
					for(var e = 8; e < this.moduleCount - 8; e++) null == this.modules[e][6] && (this.modules[e][6] = 0 == e % 2);
					for(e = 8; e < this.moduleCount - 8; e++) null == this.modules[6][e] && (this.modules[6][e] = 0 == e % 2)
				},
				setupPositionAdjustPattern: function() {
					for(var e = h.getPatternPosition(this.typeNumber), t = 0; t < e.length; t++)
						for(var a = 0; a < e.length; a++) {
							var i = e[t],
								s = e[a];
							if(null == this.modules[i][s])
								for(var o = -2; o <= 2; o++)
									for(var r = -2; r <= 2; r++) this.modules[i + o][s + r] = -2 == o || 2 == o || -2 == r || 2 == r || 0 == o && 0 == r
						}
				},
				setupTypeNumber: function(e) {
					for(var t = h.getBCHTypeNumber(this.typeNumber), a = 0; a < 18; a++) {
						var i = !e && 1 == (t >> a & 1);
						this.modules[Math.floor(a / 3)][a % 3 + this.moduleCount - 8 - 3] = i
					}
					for(a = 0; a < 18; a++) i = !e && 1 == (t >> a & 1), this.modules[a % 3 + this.moduleCount - 8 - 3][Math.floor(a / 3)] = i
				},
				setupTypeInfo: function(e, t) {
					for(var a = h.getBCHTypeInfo(this.errorCorrectLevel << 3 | t), i = 0; i < 15; i++) {
						var s = !e && 1 == (a >> i & 1);
						i < 6 ? this.modules[i][8] = s : i < 8 ? this.modules[i + 1][8] = s : this.modules[this.moduleCount - 15 + i][8] = s
					}
					for(i = 0; i < 15; i++) s = !e && 1 == (a >> i & 1), i < 8 ? this.modules[8][this.moduleCount - i - 1] = s : i < 9 ? this.modules[8][15 - i - 1 + 1] = s : this.modules[8][15 - i - 1] = s;
					this.modules[this.moduleCount - 8][8] = !e
				},
				mapData: function(e, t) {
					for(var a = -1, i = this.moduleCount - 1, s = 7, o = 0, r = this.moduleCount - 1; 0 < r; r -= 2)
						for(6 == r && r--;;) {
							for(var n = 0; n < 2; n++)
								if(null == this.modules[i][r - n]) {
									var l = !1;
									o < e.length && (l = 1 == (e[o] >>> s & 1)), h.getMask(t, i, r - n) && (l = !l), this.modules[i][r - n] = l, -1 == --s && (o++, s = 7)
								}
							if((i += a) < 0 || this.moduleCount <= i) {
								i -= a, a = -a;
								break
							}
						}
				}
			}, c.PAD0 = 236, c.PAD1 = 17, c.createData = function(e, t, a) {
				t = u.getRSBlocks(e, t);
				for(var i = new r, s = 0; s < a.length; s++) {
					var o = a[s];
					i.put(o.mode, 4), i.put(o.getLength(), h.getLengthInBits(o.mode, e)), o.write(i)
				}
				for(s = e = 0; s < t.length; s++) e += t[s].dataCount;
				if(i.getLengthInBits() > 8 * e) throw Error("code length overflow. (" + i.getLengthInBits() + ">" + 8 * e + ")");
				for(i.getLengthInBits() + 4 <= 8 * e && i.put(0, 4); 0 != i.getLengthInBits() % 8;) i.putBit(!1);
				for(; !(i.getLengthInBits() >= 8 * e) && (i.put(c.PAD0, 8), !(i.getLengthInBits() >= 8 * e));) i.put(c.PAD1, 8);
				return c.createBytes(i, t)
			}, c.createBytes = function(e, t) {
				for(var a = 0, i = 0, s = 0, o = Array(t.length), r = Array(t.length), n = 0; n < t.length; n++) {
					var l = t[n].dataCount,
						d = t[n].totalCount - l;
					i = Math.max(i, l), s = Math.max(s, d);
					o[n] = Array(l);
					for(var c = 0; c < o[n].length; c++) o[n][c] = 255 & e.buffer[c + a];
					for(a += l, c = h.getErrorCorrectPolynomial(d), l = new p(o[n], c.getLength() - 1).mod(c), r[n] = Array(c.getLength() - 1), c = 0; c < r[n].length; c++) d = c + l.getLength() - r[n].length, r[n][c] = 0 <= d ? l.get(d) : 0
				}
				for(c = n = 0; c < t.length; c++) n += t[c].totalCount;
				for(a = Array(n), c = l = 0; c < i; c++)
					for(n = 0; n < t.length; n++) c < o[n].length && (a[l++] = o[n][c]);
				for(c = 0; c < s; c++)
					for(n = 0; n < t.length; n++) c < r[n].length && (a[l++] = r[n][c]);
				return a
			}, a = 4;
			for(var h = {
					PATTERN_POSITION_TABLE: [
						[],
						[6, 18],
						[6, 22],
						[6, 26],
						[6, 30],
						[6, 34],
						[6, 22, 38],
						[6, 24, 42],
						[6, 26, 46],
						[6, 28, 50],
						[6, 30, 54],
						[6, 32, 58],
						[6, 34, 62],
						[6, 26, 46, 66],
						[6, 26, 48, 70],
						[6, 26, 50, 74],
						[6, 30, 54, 78],
						[6, 30, 56, 82],
						[6, 30, 58, 86],
						[6, 34, 62, 90],
						[6, 28, 50, 72, 94],
						[6, 26, 50, 74, 98],
						[6, 30, 54, 78, 102],
						[6, 28, 54, 80, 106],
						[6, 32, 58, 84, 110],
						[6, 30, 58, 86, 114],
						[6, 34, 62, 90, 118],
						[6, 26, 50, 74, 98, 122],
						[6, 30, 54, 78, 102, 126],
						[6, 26, 52, 78, 104, 130],
						[6, 30, 56, 82, 108, 134],
						[6, 34, 60, 86, 112, 138],
						[6, 30, 58, 86, 114, 142],
						[6, 34, 62, 90, 118, 146],
						[6, 30, 54, 78, 102, 126, 150],
						[6, 24, 50, 76, 102, 128, 154],
						[6, 28, 54, 80, 106, 132, 158],
						[6, 32, 58, 84, 110, 136, 162],
						[6, 26, 54, 82, 110, 138, 166],
						[6, 30, 58, 86, 114, 142, 170]
					],
					G15: 1335,
					G18: 7973,
					G15_MASK: 21522,
					getBCHTypeInfo: function(e) {
						for(var t = e << 10; 0 <= h.getBCHDigit(t) - h.getBCHDigit(h.G15);) t ^= h.G15 << h.getBCHDigit(t) - h.getBCHDigit(h.G15);
						return(e << 10 | t) ^ h.G15_MASK
					},
					getBCHTypeNumber: function(e) {
						for(var t = e << 12; 0 <= h.getBCHDigit(t) - h.getBCHDigit(h.G18);) t ^= h.G18 << h.getBCHDigit(t) - h.getBCHDigit(h.G18);
						return e << 12 | t
					},
					getBCHDigit: function(e) {
						for(var t = 0; 0 != e;) t++, e >>>= 1;
						return t
					},
					getPatternPosition: function(e) {
						return h.PATTERN_POSITION_TABLE[e - 1]
					},
					getMask: function(e, t, a) {
						switch(e) {
							case 0:
								return 0 == (t + a) % 2;
							case 1:
								return 0 == t % 2;
							case 2:
								return 0 == a % 3;
							case 3:
								return 0 == (t + a) % 3;
							case 4:
								return 0 == (Math.floor(t / 2) + Math.floor(a / 3)) % 2;
							case 5:
								return 0 == t * a % 2 + t * a % 3;
							case 6:
								return 0 == (t * a % 2 + t * a % 3) % 2;
							case 7:
								return 0 == (t * a % 3 + (t + a) % 2) % 2;
							default:
								throw Error("bad maskPattern:" + e)
						}
					},
					getErrorCorrectPolynomial: function(e) {
						for(var t = new p([1], 0), a = 0; a < e; a++) t = t.multiply(new p([1, s.gexp(a)], 0));
						return t
					},
					getLengthInBits: function(e, t) {
						if(1 <= t && t < 10) switch(e) {
							case 1:
								return 10;
							case 2:
								return 9;
							case a:
							case 8:
								return 8;
							default:
								throw Error("mode:" + e)
						} else if(t < 27) switch(e) {
							case 1:
								return 12;
							case 2:
								return 11;
							case a:
								return 16;
							case 8:
								return 10;
							default:
								throw Error("mode:" + e)
						} else {
							if(!(t < 41)) throw Error("type:" + t);
							switch(e) {
								case 1:
									return 14;
								case 2:
									return 13;
								case a:
									return 16;
								case 8:
									return 12;
								default:
									throw Error("mode:" + e)
							}
						}
					},
					getLostPoint: function(e) {
						for(var t = e.getModuleCount(), a = 0, i = 0; i < t; i++)
							for(var s = 0; s < t; s++) {
								for(var o = 0, r = e.isDark(i, s), n = -1; n <= 1; n++)
									if(!(i + n < 0 || t <= i + n))
										for(var l = -1; l <= 1; l++) s + l < 0 || t <= s + l || 0 == n && 0 == l || r == e.isDark(i + n, s + l) && o++;
								5 < o && (a += 3 + o - 5)
							}
						for(i = 0; i < t - 1; i++)
							for(s = 0; s < t - 1; s++) o = 0, e.isDark(i, s) && o++, e.isDark(i + 1, s) && o++, e.isDark(i, s + 1) && o++, e.isDark(i + 1, s + 1) && o++, 0 != o && 4 != o || (a += 3);
						for(i = 0; i < t; i++)
							for(s = 0; s < t - 6; s++) e.isDark(i, s) && !e.isDark(i, s + 1) && e.isDark(i, s + 2) && e.isDark(i, s + 3) && e.isDark(i, s + 4) && !e.isDark(i, s + 5) && e.isDark(i, s + 6) && (a += 40);
						for(s = 0; s < t; s++)
							for(i = 0; i < t - 6; i++) e.isDark(i, s) && !e.isDark(i + 1, s) && e.isDark(i + 2, s) && e.isDark(i + 3, s) && e.isDark(i + 4, s) && !e.isDark(i + 5, s) && e.isDark(i + 6, s) && (a += 40);
						for(s = o = 0; s < t; s++)
							for(i = 0; i < t; i++) e.isDark(i, s) && o++;
						return a + 10 * (e = Math.abs(100 * o / t / t - 50) / 5)
					}
				}, s = {
					glog: function(e) {
						if(e < 1) throw Error("glog(" + e + ")");
						return s.LOG_TABLE[e]
					},
					gexp: function(e) {
						for(; e < 0;) e += 255;
						for(; 256 <= e;) e -= 255;
						return s.EXP_TABLE[e]
					},
					EXP_TABLE: Array(256),
					LOG_TABLE: Array(256)
				}, e = 0; e < 8; e++) s.EXP_TABLE[e] = 1 << e;
			for(e = 8; e < 256; e++) s.EXP_TABLE[e] = s.EXP_TABLE[e - 4] ^ s.EXP_TABLE[e - 5] ^ s.EXP_TABLE[e - 6] ^ s.EXP_TABLE[e - 8];
			for(e = 0; e < 255; e++) s.LOG_TABLE[s.EXP_TABLE[e]] = e;
			return p.prototype = {
				get: function(e) {
					return this.num[e]
				},
				getLength: function() {
					return this.num.length
				},
				multiply: function(e) {
					for(var t = Array(this.getLength() + e.getLength() - 1), a = 0; a < this.getLength(); a++)
						for(var i = 0; i < e.getLength(); i++) t[a + i] ^= s.gexp(s.glog(this.get(a)) + s.glog(e.get(i)));
					return new p(t, 0)
				},
				mod: function(e) {
					if(this.getLength() - e.getLength() < 0) return this;
					for(var t = s.glog(this.get(0)) - s.glog(e.get(0)), a = Array(this.getLength()), i = 0; i < this.getLength(); i++) a[i] = this.get(i);
					for(i = 0; i < e.getLength(); i++) a[i] ^= s.gexp(s.glog(e.get(i)) + t);
					return new p(a, 0).mod(e)
				}
			}, u.RS_BLOCK_TABLE = [
				[1, 26, 19],
				[1, 26, 16],
				[1, 26, 13],
				[1, 26, 9],
				[1, 44, 34],
				[1, 44, 28],
				[1, 44, 22],
				[1, 44, 16],
				[1, 70, 55],
				[1, 70, 44],
				[2, 35, 17],
				[2, 35, 13],
				[1, 100, 80],
				[2, 50, 32],
				[2, 50, 24],
				[4, 25, 9],
				[1, 134, 108],
				[2, 67, 43],
				[2, 33, 15, 2, 34, 16],
				[2, 33, 11, 2, 34, 12],
				[2, 86, 68],
				[4, 43, 27],
				[4, 43, 19],
				[4, 43, 15],
				[2, 98, 78],
				[4, 49, 31],
				[2, 32, 14, 4, 33, 15],
				[4, 39, 13, 1, 40, 14],
				[2, 121, 97],
				[2, 60, 38, 2, 61, 39],
				[4, 40, 18, 2, 41, 19],
				[4, 40, 14, 2, 41, 15],
				[2, 146, 116],
				[3, 58, 36, 2, 59, 37],
				[4, 36, 16, 4, 37, 17],
				[4, 36, 12, 4, 37, 13],
				[2, 86, 68, 2, 87, 69],
				[4, 69, 43, 1, 70, 44],
				[6, 43, 19, 2, 44, 20],
				[6, 43, 15, 2, 44, 16],
				[4, 101, 81],
				[1, 80, 50, 4, 81, 51],
				[4, 50, 22, 4, 51, 23],
				[3, 36, 12, 8, 37, 13],
				[2, 116, 92, 2, 117, 93],
				[6, 58, 36, 2, 59, 37],
				[4, 46, 20, 6, 47, 21],
				[7, 42, 14, 4, 43, 15],
				[4, 133, 107],
				[8, 59, 37, 1, 60, 38],
				[8, 44, 20, 4, 45, 21],
				[12, 33, 11, 4, 34, 12],
				[3, 145, 115, 1, 146, 116],
				[4, 64, 40, 5, 65, 41],
				[11, 36, 16, 5, 37, 17],
				[11, 36, 12, 5, 37, 13],
				[5, 109, 87, 1, 110, 88],
				[5, 65, 41, 5, 66, 42],
				[5, 54, 24, 7, 55, 25],
				[11, 36, 12],
				[5, 122, 98, 1, 123, 99],
				[7, 73, 45, 3, 74, 46],
				[15, 43, 19, 2, 44, 20],
				[3, 45, 15, 13, 46, 16],
				[1, 135, 107, 5, 136, 108],
				[10, 74, 46, 1, 75, 47],
				[1, 50, 22, 15, 51, 23],
				[2, 42, 14, 17, 43, 15],
				[5, 150, 120, 1, 151, 121],
				[9, 69, 43, 4, 70, 44],
				[17, 50, 22, 1, 51, 23],
				[2, 42, 14, 19, 43, 15],
				[3, 141, 113, 4, 142, 114],
				[3, 70, 44, 11, 71, 45],
				[17, 47, 21, 4, 48, 22],
				[9, 39, 13, 16, 40, 14],
				[3, 135, 107, 5, 136, 108],
				[3, 67, 41, 13, 68, 42],
				[15, 54, 24, 5, 55, 25],
				[15, 43, 15, 10, 44, 16],
				[4, 144, 116, 4, 145, 117],
				[17, 68, 42],
				[17, 50, 22, 6, 51, 23],
				[19, 46, 16, 6, 47, 17],
				[2, 139, 111, 7, 140, 112],
				[17, 74, 46],
				[7, 54, 24, 16, 55, 25],
				[34, 37, 13],
				[4, 151, 121, 5, 152, 122],
				[4, 75, 47, 14, 76, 48],
				[11, 54, 24, 14, 55, 25],
				[16, 45, 15, 14, 46, 16],
				[6, 147, 117, 4, 148, 118],
				[6, 73, 45, 14, 74, 46],
				[11, 54, 24, 16, 55, 25],
				[30, 46, 16, 2, 47, 17],
				[8, 132, 106, 4, 133, 107],
				[8, 75, 47, 13, 76, 48],
				[7, 54, 24, 22, 55, 25],
				[22, 45, 15, 13, 46, 16],
				[10, 142, 114, 2, 143, 115],
				[19, 74, 46, 4, 75, 47],
				[28, 50, 22, 6, 51, 23],
				[33, 46, 16, 4, 47, 17],
				[8, 152, 122, 4, 153, 123],
				[22, 73, 45, 3, 74, 46],
				[8, 53, 23, 26, 54, 24],
				[12, 45, 15, 28, 46, 16],
				[3, 147, 117, 10, 148, 118],
				[3, 73, 45, 23, 74, 46],
				[4, 54, 24, 31, 55, 25],
				[11, 45, 15, 31, 46, 16],
				[7, 146, 116, 7, 147, 117],
				[21, 73, 45, 7, 74, 46],
				[1, 53, 23, 37, 54, 24],
				[19, 45, 15, 26, 46, 16],
				[5, 145, 115, 10, 146, 116],
				[19, 75, 47, 10, 76, 48],
				[15, 54, 24, 25, 55, 25],
				[23, 45, 15, 25, 46, 16],
				[13, 145, 115, 3, 146, 116],
				[2, 74, 46, 29, 75, 47],
				[42, 54, 24, 1, 55, 25],
				[23, 45, 15, 28, 46, 16],
				[17, 145, 115],
				[10, 74, 46, 23, 75, 47],
				[10, 54, 24, 35, 55, 25],
				[19, 45, 15, 35, 46, 16],
				[17, 145, 115, 1, 146, 116],
				[14, 74, 46, 21, 75, 47],
				[29, 54, 24, 19, 55, 25],
				[11, 45, 15, 46, 46, 16],
				[13, 145, 115, 6, 146, 116],
				[14, 74, 46, 23, 75, 47],
				[44, 54, 24, 7, 55, 25],
				[59, 46, 16, 1, 47, 17],
				[12, 151, 121, 7, 152, 122],
				[12, 75, 47, 26, 76, 48],
				[39, 54, 24, 14, 55, 25],
				[22, 45, 15, 41, 46, 16],
				[6, 151, 121, 14, 152, 122],
				[6, 75, 47, 34, 76, 48],
				[46, 54, 24, 10, 55, 25],
				[2, 45, 15, 64, 46, 16],
				[17, 152, 122, 4, 153, 123],
				[29, 74, 46, 14, 75, 47],
				[49, 54, 24, 10, 55, 25],
				[24, 45, 15, 46, 46, 16],
				[4, 152, 122, 18, 153, 123],
				[13, 74, 46, 32, 75, 47],
				[48, 54, 24, 14, 55, 25],
				[42, 45, 15, 32, 46, 16],
				[20, 147, 117, 4, 148, 118],
				[40, 75, 47, 7, 76, 48],
				[43, 54, 24, 22, 55, 25],
				[10, 45, 15, 67, 46, 16],
				[19, 148, 118, 6, 149, 119],
				[18, 75, 47, 31, 76, 48],
				[34, 54, 24, 34, 55, 25],
				[20, 45, 15, 61, 46, 16]
			], u.getRSBlocks = function(e, t) {
				var a = u.getRsBlockTable(e, t);
				if(null == a) throw Error("bad rs block @ typeNumber:" + e + "/errorCorrectLevel:" + t);
				for(var i = a.length / 3, s = [], o = 0; o < i; o++)
					for(var r = a[3 * o + 0], n = a[3 * o + 1], l = a[3 * o + 2], d = 0; d < r; d++) s.push(new u(n, l));
				return s
			}, u.getRsBlockTable = function(e, t) {
				switch(t) {
					case 1:
						return u.RS_BLOCK_TABLE[4 * (e - 1) + 0];
					case 0:
						return u.RS_BLOCK_TABLE[4 * (e - 1) + 1];
					case 3:
						return u.RS_BLOCK_TABLE[4 * (e - 1) + 2];
					case 2:
						return u.RS_BLOCK_TABLE[4 * (e - 1) + 3]
				}
			}, r.prototype = {
				get: function(e) {
					return 1 == (this.buffer[Math.floor(e / 8)] >>> 7 - e % 8 & 1)
				},
				put: function(e, t) {
					for(var a = 0; a < t; a++) this.putBit(1 == (e >>> t - a - 1 & 1))
				},
				getLengthInBits: function() {
					return this.length
				},
				putBit: function(e) {
					var t = Math.floor(this.length / 8);
					this.buffer.length <= t && this.buffer.push(0), e && (this.buffer[t] |= 128 >>> this.length % 8), this.length++
				}
			}, "string" == typeof d && (d = {
				text: d
			}), d = m.extend({}, {
				render: "canvas",
				width: 256,
				height: 256,
				typeNumber: -1,
				correctLevel: 2,
				background: "#ffffff",
				foreground: "#000000"
			}, d), this.each(function() {
				var e;
				if("canvas" == d.render) {
					(e = new c(d.typeNumber, d.correctLevel)).addData(d.text), e.make();
					var t = document.createElement("canvas");
					t.width = d.width, t.height = d.height;
					for(var a = t.getContext("2d"), i = d.width / e.getModuleCount(), s = d.height / e.getModuleCount(), o = 0; o < e.getModuleCount(); o++)
						for(var r = 0; r < e.getModuleCount(); r++) {
							a.fillStyle = e.isDark(o, r) ? d.foreground : d.background;
							var n = Math.ceil((r + 1) * i) - Math.floor(r * i),
								l = Math.ceil((o + 1) * i) - Math.floor(o * i);
							a.fillRect(Math.round(r * i), Math.round(o * s), n, l)
						}
				} else
					for((e = new c(d.typeNumber, d.correctLevel)).addData(d.text), e.make(), t = m("<table></table>").css("width", d.width + "px").css("height", d.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", d.background), a = d.width / e.getModuleCount(), i = d.height / e.getModuleCount(), s = 0; s < e.getModuleCount(); s++)
						for(o = m("<tr></tr>").css("height", i + "px").appendTo(t), r = 0; r < e.getModuleCount(); r++) m("<td></td>").css("width", a + "px").css("background-color", e.isDark(s, r) ? d.foreground : d.background).appendTo(o);
				e = t, jQuery(e).appendTo(this)
			})
		}
	}, {}],
	7: [function(e, t, a) {
		"use strict";
		! function(c) {
			c(document).ready(function() {
				function l(e, t) {
					var a = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"),
						i = (e && e.split("?")[1] ? e.split("?")[1] : "").match(a);
					return null != i ? unescape(i[2]) : null
				}
				"Microsoft Internet Explorer" == navigator.appName && "9." == navigator.appVersion.match(/9./i) && c(".edit-cover, .edit-avatar").hide();
				var r, n, d = 0,
					o = 0;
				c(document).on("click", ".edit-avatar, .edit-cover", function(e) {
					e.preventDefault(), d = c(this).hasClass("edit-cover") ? 1 : 0, n = c(this).data("user");
					var t = cropperModal({
						lg: d,
						title: _wpcom_js.cropper.title,
						desc: d ? _wpcom_js.cropper.desc_1 : _wpcom_js.cropper.desc_0,
						btn: _wpcom_js.cropper.btn,
						loading: _wpcom_js.cropper.loading,
						apply: _wpcom_js.cropper.apply,
						cancel: _wpcom_js.cropper.cancel
					});
					c("#crop-modal").length ? c("#crop-modal").replaceWith(t) : c("body").append(t), r && (r.destroy(), r = null, c(".crop-img-wrap").hide(), c(".crop-img-btn").show(), c("#crop-img").remove(), c(".crop-notice").text("")), c("#crop-modal").modal("show")
				}).on("change", "#img-file", function(e) {
					if(c(".crop-notice").text(""), !this.files.length) return !1;
					var t;
					if(5120 < this.files[0].size / 1024) return wpcom_alert(_wpcom_js.cropper.alert_size), !1;
					this.files[0].type.match(/image.*/) ? (t = window.URL.createObjectURL(this.files[0]), c(".crop-img-wrap").append('<img id="crop-img" src="' + t + '">').show(), c(".crop-img-btn").hide(), r = new Cropper(document.getElementById("crop-img"), {
						aspectRatio: d ? 2.7 : 1,
						minContainerHeight: 300,
						viewMode: d ? 3 : 1,
						ready: function() {
							var e = {
								width: 300,
								height: 300
							};
							d && (e = {
								width: 810,
								height: 300,
								left: 44
							}), r.setCropBoxData(e)
						}
					}), c(this).val("")) : wpcom_alert(_wpcom_js.cropper.alert_filetype)
				}).on("click", ".j-crop-close", function() {
					r && r.destroy(), r = null, c(".crop-img-wrap").hide(), c(".crop-img-btn").show(), c("#crop-img").remove(), c(".crop-notice").text("")
				}).on("click", ".j-crop-apply", function() {
					var t = c(this).button("loading"),
						a = c(".crop-notice");
					if(a.text(""), r)
						if(r.crop().cropped) {
							var e = {
								minWidth: 200,
								minHeight: 200,
								maxWidth: 600,
								maxHeight: 600,
								fillColor: "#fff",
								imageSmoothingQuality: "high"
							};
							d && (e = {
								minWidth: 810,
								minHeight: 300,
								maxWidth: 1620,
								maxHeight: 600,
								fillColor: "#fff",
								imageSmoothingQuality: "high"
							});
							var i = c.extend(r.getCropBoxData(), e),
								s = r.getCroppedCanvas(i).toDataURL("image/jpeg", .95);
							if(s) {
								var o = new FormData;
								o.append("action", "wpcom_cropped_upload"), o.append("nonce", c("#wpcom_cropper_nonce").val()), o.append("image", s), o.append("type", d), n && o.append("user", n), c.ajax(_wpcom_js.ajaxurl, {
									method: "POST",
									data: o,
									dataType: "json",
									processData: !1,
									contentType: !1,
									success: function(e) {
										"1" == e.result ? (d ? c(".wpcom-profile-head .wpcom-ph-bg img").attr("src", e.url) : c(".member-account-avatar img.avatar,.wpcom-ph-avatar img.avatar,#j-user-wrap img.avatar").replaceWith('<img class="avatar photo" src="' + e.url + "?t=" + Date.parse(new Date) / 1e3 + '">'), c("#crop-modal").modal("hide")) : "-1" == e.result ? a.text(_wpcom_js.cropper.err_nonce) : "-2" == e.result ? a.text(_wpcom_js.cropper.err_fail) : "-3" == e.result && a.text(_wpcom_js.cropper.err_login), t.button("reset")
									},
									error: function() {
										wpcom_alert(_wpcom_js.cropper.ajaxerr), t.button("reset")
									}
								})
							} else t.button("reset")
						} else t.button("reset");
					else a.text(_wpcom_js.cropper.err_empty), t.button("reset")
				}).on("click", ".j-social-unbind", function() {
					var t = c(this);
					if(t.hasClass("disabled")) return !1;
					var e = t.data("name");
					t.addClass("disabled").text("处理中..."), confirm("是否确定解除绑定？") ? c.ajax({
						type: "POST",
						url: _wpcom_js.ajaxurl,
						data: {
							action: "wpcom_social_unbind",
							name: e
						},
						dataType: "json",
						success: function(e) {
							t.removeClass("disabled").text("解除绑定"), 1 == e.result ? (wpcom_alert("解绑成功！"), t.parent().html(e.error)) : e.error && wpcom_alert(e.error)
						},
						error: function() {
							t.removeClass("disabled").text("解除绑定")
						}
					}) : t.removeClass("disabled").text("解除绑定")
				}).on("click", "a", function(e) {
					var t = c(this).attr("href"),
						a = t ? t.match(/(\?|&)modal-type=(login|register)/i) : null;
					if(a && a[2]) {
						if(c("body.navbar-on").length) return;
						e.preventDefault();
						var i = c("#login-form-modal"),
							s = c(window).height();
						0 === i.length && (c("body").append('<div class="modal" id="login-form-modal" data-backdrop="static">\n            <div class="modal-dialog">\n                <div class="modal-content"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>\n                    <div class="modal-body"></div>\n                </div>\n            </div>\n        </div>'), i = c("#login-form-modal")), c("#login-modal").length && c("#login-modal").modal("hide");
						var o = i.find(".modal-body");
						o.html(""), i.modal("show");
						var r = l(t, "approve"),
							n = {
								action: "wpcom_login_modal",
								type: a[2]
							};
						r && (n.approve = r, n.login = l(t, "login")), c.ajax({
							type: "POST",
							url: _wpcom_js.ajaxurl,
							data: n,
							dataType: "html",
							success: function(e) {
								if("undefined" == typeof is_load_login) {
									var t = void 0 !== _wpcom_js.framework_url ? _wpcom_js.framework_url : _wpcom_js.theme_url + "/themer";
									c.getScript(t + "/assets/js/login.js", function() {
										o.html(e), c(document).trigger("init_captcha"), setTimeout(function() {
											o.css("height", "");
											var e = (s - o.height()) / 2 - 60;
											i.find(".modal-dialog").css("margin-top", e <= 0 ? 30 : e), o.css("height", o.height())
										}, 50)
									})
								} else o.html(e), c(document).trigger("init_captcha"), setTimeout(function() {
									o.css("height", "");
									var e = (s - o.height()) / 2 - 60;
									i.find(".modal-dialog").css("margin-top", e <= 0 ? 30 : e), o.css("height", o.height())
								}, 50)
							},
							error: function() {}
						})
					}
				}).on("click", "#j-login-type", function(e) {
					e.preventDefault();
					var t = c(this),
						a = t.closest(".j-member-form"),
						i = c("#j-tpl-login" + (o ? "" : "2")).html();
					if(i) {
						a.find(".member-form-items").html(i);
						var s = t.data("target");
						t.data("target", t.text()), t.text(s), o = o ? 0 : 1, c(document).trigger("init_captcha")
					}
				}).on("click", ".profile-tab .profile-tab-item", function() {
					var e = c(this),
						t = e.closest(".wpcom-profile-main"),
						a = e.index();
					t.find(".profile-tab-item, .profile-tab-content").removeClass("active"), e.addClass("active"), t.find(".profile-tab-content").eq(a).addClass("active").trigger("profile_tab_show")
				})
			});
			var o = c("#j-user-wrap");
			o.length && c.ajax({
				type: "POST",
				url: _wpcom_js.ajaxurl,
				data: {
					action: "wpcom_is_login"
				},
				dataType: "json",
				success: function(e) {
					if(0 == e.result) {
						var t = 0;
						e.messages && (t = Number(e.messages)), e.notifications && (t += Number(e.notifications));
						var a = '<ul class="profile"><li class="menu-item dropdown"><a class="menu-item-user" href="' + (e.account ? e.account : e.url) + '"><span class="menu-item-avatar">' + e.avatar + (t ? '<span class="menu-item-unread">' + t + "</span>" : "") + '</span><span class="menu-item-name">' + e.display_name + "</span></a>",
							i = c(".header .navbar-toggle");
						if(t && i.length && i.append('<span class="navbar-unread">' + t + "</span>"), e.menus && e.menus.length) {
							a += '<ul class="dropdown-menu">';
							for(var s = 0; s < e.menus.length; s++) a += '<li><a href="' + e.menus[s].url + '">' + e.menus[s].title + "</a></li>";
							a += "</ul>"
						}
						a += "</li></ul>", o.html(a), window.is_login = !0, c(document).trigger("wpcom_login")
					} else o.find(".login").addClass("cur"), window.is_login = !1, c(document).trigger("wpcom_not_login");
					c("header.header").trigger("DOMNodeInserted"), e.wc && (e.wc.fragments && e.wc.fragments["a.cart-contents"] && c("header .shopping-cart").html(e.wc.fragments["a.cart-contents"]), setTimeout(function() {
						e.wc.fragments && e.wc.fragments["div.widget_shopping_cart_content"] && c("header .shopping-cart").append(e.wc.fragments["div.widget_shopping_cart_content"]), c("header.header").trigger("DOMNodeInserted")
					}, 100))
				}
			}), c(".social-login-wrap").on("submit", "#sl-form-create", function() {
				var t = c(this);
				if(t.find(".sl-input-submit.disabled").length) return !1;
				t.find(".sl-input-submit").addClass("disabled");
				for(var e = 0, a = t.find(".sl-input input"), i = 0; i < a.length; i++) {
					var s = c(a[i]).val();
					"" == c.trim(s) && (c(a[i]).addClass("error"), e = 1)
				}
				return e ? t.find(".sl-input-submit").removeClass("disabled") : c.ajax({
					url: _wpcom_js.ajaxurl,
					data: c(this).serialize() + "&action=wpcom_sl_login",
					type: "POST",
					dataType: "json",
					success: function(e) {
						t.find(".sl-input-submit").removeClass("disabled"), "-1" == e ? t.find(".sl-result").text("请求出错，请重试！").addClass("error") : "1" == e.result ? t.find(".sl-result").text("用户名或密码不能为空").addClass("error") : "2" == e.result ? t.find(".sl-result").text("用户名或密码错误").addClass("error") : "3" == e.result ? t.find(".sl-result").text("第三方应用授权失败，请重试").addClass("error") : "4" == e.result ? t.find(".sl-result").text("第三方帐号已与本站其他帐号绑定").addClass("error") : "0" == e.result && (t.find(".sl-result").text("绑定成功！").removeClass("error"), setTimeout(function() {
							window.location.href = e.redirect
						}, 100))
					},
					error: function() {
						t.find(".sl-result").text("请求出错，请重试！").addClass("error"), t.find(".sl-input-submit").removeClass("disabled")
					}
				}), !1
			}).on("submit", "#sl-form-bind", function() {
				var t = c(this);
				if(t.find(".sl-input-submit.disabled").length) return !1;
				t.find(".sl-input-submit").addClass("disabled");
				for(var e = 0, a = t.find(".sl-input input"), i = 0; i < a.length; i++) {
					var s = c(a[i]).val();
					"" == c.trim(s) && (c(a[i]).addClass("error"), e = 1)
				}
				return e ? t.find(".sl-input-submit").removeClass("disabled") : c.ajax({
					url: _wpcom_js.ajaxurl,
					data: c(this).serialize() + "&action=wpcom_sl_create",
					type: "POST",
					dataType: "json",
					success: function(e) {
						"-1" == e ? t.find(".sl-result").text("请求出错，请重试！").addClass("error") : "1" == e.result ? t.find(".sl-result").text("请输入电子邮箱").addClass("error") : "2" == e.result ? t.find(".sl-result").text("请输入正确的电子邮箱").addClass("error") : "3" == e.result ? t.find(".sl-result").text("第三方应用授权失败，请重试").addClass("error") : "4" == e.result ? t.find(".sl-result").text("第三方帐号已与本站其他帐号绑定").addClass("error") : "5" == e.result ? t.find(".sl-result").text("该邮箱已被注册").addClass("error") : "0" == e.result ? (t.find(".sl-result").text("注册成功！").removeClass("error"), setTimeout(function() {
							window.location.href = e.redirect
						}, 100)) : e.result && e.msg && t.find(".sl-result").text(e.msg).addClass("error"), t.find(".sl-input-submit").removeClass("disabled")
					},
					error: function() {
						t.find(".sl-result").text("请求出错，请重试！").addClass("error"), t.find(".sl-input-submit").removeClass("disabled")
					}
				}), !1
			}).on("input change", ".sl-input input", function() {
				var e = c(this);
				e.removeClass("error"), e.closest(".sl-info-form").find(".sl-result").text("")
			}).on("click", ".sl-form-title", function() {
				var e = c(this).closest(".sl-form-item");
				c(".sl-form-item").removeClass("active"), e.addClass("active")
			})
		}(jQuery)
	}, {}],
	8: [function(e, t, a) {
		"use strict";
		Object.defineProperty(a, "__esModule", {
			value: !0
		}), a.default = void 0;
		var i = {
			init: function() {
				var t = this;
				this.checker = null, jQuery(document).on("click", ".j-message", function(e) {
					t.load_box(e)
				}).on("click", ".j-message-send", function(e) {
					t.send(e)
				}).on("input propertychange", ".j-message-text", function() {
					var e = jQuery(this);
					jQuery.trim(e.val()).length ? e.parent().find(".j-message-send").removeClass("disabled") : e.parent().find(".j-message-send").addClass("disabled")
				}).on("keydown", ".j-message-text", function(e) {
					13 !== e.keyCode || e.shiftKey || (e.preventDefault(), e.returnValue = !1, jQuery(e.target).closest(".modal-content").find(".j-message-send").trigger("click"))
				})
			},
			load_box: function(e) {
				if(!1 === window.is_login) return jQuery("#login-modal").modal(), !1;
				var r = this,
					n = jQuery(e.target).closest(".j-message");
				if(n.hasClass("loading")) return !1;
				var l = n.data("user");
				if(l) {
					var t = void 0 !== _wpcom_js.framework_url ? _wpcom_js.framework_url : _wpcom_js.theme_url + "/themer";
					n.addClass("loading").prepend('<img class="icon-loading" src="' + t + '/assets/images/loading.gif">').find(".icon-svg").hide(), jQuery.ajax({
						type: "POST",
						url: _wpcom_js.ajaxurl,
						data: {
							action: "wpcom_message_box",
							user: l
						},
						dataType: "json",
						success: function(e, t, a) {
							if(n.removeClass("loading").find(".icon-loading").remove(), n.find(".icon-svg").show(), 0 == e.result) {
								if(!jQuery("#message-modal").length) {
									jQuery("body").append('<div class="modal modal-message fade" id="message-modal" data-backdrop="static">\n            <div class="modal-dialog">\n                <div class="modal-content"><div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>\n                <h4 class="modal-title"></h4>\n            </div>\n                    <div class="modal-body"><div class="modal-message-list"></div><div class="modal-message-editor"><textarea class="modal-message-text j-message-text"></textarea><div class="modal-message-send">按 Enter 键发送<button type="button" class="btn btn-primary btn-message disabled j-message-send">发送</button></div></div></div>\n                </div>\n            </div>\n        </div>')
								}
								var i = jQuery("#message-modal"),
									s = '<div class="modal-message-more"><img src="' + (void 0 !== _wpcom_js.framework_url ? _wpcom_js.framework_url : _wpcom_js.theme_url + "/themer") + '/assets/images/loading.gif"></div>',
									o = i.find(".modal-message-list");
								i.find(".modal-title").text(e.to_uname ? e.to_uname : " ").data("user", e.to_uid ? e.to_uid : 0), o.html(s + (e.messages ? e.messages : "")), i.find(".j-message-send").data("avatar", e.avatar), i.modal("show").find(".j-message-text").val(""), "0" === a.getResponseHeader("Next-page") && i.find(".modal-message-more").remove(), setTimeout(function() {
									var e = i.find(".modal-message-item:last-child")[0];
									e && e.scrollIntoView(), r.load_more(i, l)
								}, 200), r.set_read(l, n), r.checker && clearInterval(r.checker), r.checker = setInterval(function() {
									r.check_messages(i, l)
								}, 1e4), i.on("hide.bs.modal", function() {
									clearInterval(r.checker)
								})
							} else -1 == e.result ? (jQuery(document).trigger("wpcom_not_login"), jQuery("#login-modal").modal()) : -3 == e.result && e.msg && wpcom_alert(e.msg)
						},
						error: function() {
							n.removeClass("loading").find(".icon-loading").remove(), n.find(".icon-svg").show()
						}
					})
				}
			},
			send: function(e) {
				var t = jQuery(e.target).closest(".j-message-send");
				if(!t.hasClass("disabled")) {
					var a = t.closest(".modal-content"),
						i = a.find(".modal-message-list"),
						s = jQuery.trim(a.find(".j-message-text").val()),
						o = a.find(".modal-title").data("user"),
						r = this;
					if(s) {
						r.checker && clearInterval(r.checker), r.checker = setInterval(function() {
							r.check_messages(a, o)
						}, 1e4);
						var n = void 0 !== _wpcom_js.framework_url ? _wpcom_js.framework_url : _wpcom_js.theme_url + "/themer",
							l = jQuery('<div class="modal-message-item message-sender"><div class="modal-message-time"></div><div class="modal-message-inner"><div class="modal-message-status"><img class="modal-message-loading" src="' + n + '/assets/images/loading.gif"></div><div class="modal-message-content"><div class="message-text"></div></div><div class="modal-message-avatar"><img src="' + t.data("avatar") + '"></div></div></div>');
						l.find(".message-text").text(s);
						var d = i.find(".modal-message-item:last-child"),
							c = d.length ? d.data("id") : 0;
						i.append(l), a.find(".j-message-text").val("").trigger("input"), setTimeout(function() {
							i.animate({
								scrollTop: i.prop("scrollHeight")
							}, 150)
						}, 100), jQuery.ajax({
							type: "POST",
							url: _wpcom_js.ajaxurl,
							data: {
								action: "wpcom_send_message",
								to: o,
								content: s,
								last: c
							},
							dataType: "json",
							success: function(e) {
								try {
									0 === e.result ? e.messages ? (l.replaceWith(e.messages), i.animate({
										scrollTop: i.prop("scrollHeight")
									}, 150)) : (l.data("id", e.message_id).find(".modal-message-status").html(""), l.find(".modal-message-time").html(e.message_time)) : -1 === e.result ? (jQuery(document).trigger("wpcom_not_login"), a.closest(".modal").modal("hide"), setTimeout(function() {
										jQuery("#login-modal").modal("show")
									}, 100)) : -3 === e.result ? (e.msg && wpcom_alert(e.msg), l.remove()) : l.find(".modal-message-status").html('<img class="modal-message-loading" src="' + n + '/assets/images/error.png">')
								} catch(e) {
									l.find(".modal-message-status").html('<img class="modal-message-loading" src="' + n + '/assets/images/error.png">')
								}
							},
							error: function() {
								l.find(".modal-message-status").html('<img class="modal-message-loading" src="' + n + '/assets/images/error.png">')
							}
						})
					} else wpcom_alert("私信内容不能为空")
				}
			},
			load_more: function(a, i) {
				var o = 0,
					r = a.find(".modal-message-list"),
					n = a.find(".modal-message-more");
				r.off("scroll.message").on("scroll.message", function(e) {
					if(e.target.scrollTop <= 20 && e.target.scrollTop < o && (n = a.find(".modal-message-more")).length && !n.hasClass("active")) {
						n.addClass("active");
						var s = a.find(".modal-message-item").first(),
							t = s.length ? s.data("id") : 0;
						jQuery.ajax({
							type: "POST",
							url: _wpcom_js.ajaxurl,
							data: {
								action: "wpcom_load_messages",
								user: i,
								last: t
							},
							dataType: "html",
							success: function(e, t, a) {
								if(e) {
									var i = s.offset().top - r.scrollTop();
									n.after(e), r.scrollTop(s.offset().top - i)
								}
								n.removeClass("active"), "0" === a.getResponseHeader("Next-page") && n.remove()
							},
							error: function() {
								n.removeClass("active")
							}
						})
					}
					o = e.target.scrollTop
				})
			},
			set_read: function(e, t) {
				jQuery.ajax({
					type: "POST",
					url: _wpcom_js.ajaxurl,
					data: {
						action: "wpcom_read_messages",
						user: e
					},
					dataType: "html",
					success: function(e) {
						0 < e && t && t.find(".messages-item-unread").length && t.find(".messages-item-unread").remove()
					}
				})
			},
			check_messages: function(e, t) {
				var a = this,
					i = e.find(".modal-message-list"),
					s = i.find(".modal-message-item:last-child"),
					o = s.length ? s.data("id") : 0;
				jQuery.ajax({
					type: "POST",
					url: _wpcom_js.ajaxurl,
					data: {
						action: "wpcom_check_messages",
						user: t,
						last: o
					},
					dataType: "json",
					success: function(e) {
						0 === e.result && e.messages && (i.append(e.messages), a.set_read(t), i.animate({
							scrollTop: i.prop("scrollHeight")
						}, 150))
					}
				})
			}
		};
		a.default = i
	}, {}],
	9: [function(e, t, a) {
		"use strict";
		Object.defineProperty(a, "__esModule", {
			value: !0
		}), a.default = void 0;
		var i = {
			init: function() {
				var a = this;
				jQuery(".notify-list").on("click", ".j-notification .notify-item-title a", function() {
					var e = $(this).closest(".j-notification");
					if(!e.hasClass("status-1")) {
						var t = e.data("id");
						a.set_read(e, t)
					}
				})
			},
			set_read: function(t, e) {
				jQuery.ajax({
					type: "POST",
					url: _wpcom_js.ajaxurl,
					data: {
						action: "wpcom_read_notification",
						id: e
					},
					dataType: "html",
					success: function(e) {
						e && t.removeClass("status-0").addClass("status-1")
					}
				})
			}
		};
		a.default = i
	}, {}],
	10: [function(require, module, exports) {
		"use strict";

		function WShare() {
			this.defaults = {
				url: this.getMeta("url") || location.href,
				origin: location.origin,
				source: this.getMeta("site_name") || document.title,
				title: this.getMeta("title") || document.title,
				description: this.getMeta("description") || "",
				image: this.getMeta("image")
			}
		}
		require("../../../Themer/src/js/jquery.qrcode.min"), "function" != typeof Object.assign && (Object.assign = function(e) {
			if(null == e) throw new TypeError("Cannot convert undefined or null to object");
			e = Object(e);
			for(var t = 1; t < arguments.length; t++) {
				var a = arguments[t];
				if(null != a)
					for(var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i])
			}
			return e
		}), WShare.prototype = {
			getMeta: function(e) {
				var t = document.querySelector('meta[property="og:' + e + '"]');
				return t ? t.getAttribute("content") : ""
			},
			templates: {
				qzone: "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}&pics={{IMAGE}}",
				qq: 'https://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&pics={{IMAGE}}&summary="{{SUMMARY}}"',
				weibo: "https://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}&searchPic=true",
				wechat: "javascript:",
				douban: "https://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11",
				linkedin: "https://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{SUMMARY}}&source={{SOURCE}}&armin=armin",
				facebook: "https://www.facebook.com/sharer/sharer.php?u={{URL}}",
				twitter: "https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{ORIGIN}}"
			},
			icons: {
				qzone: '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M504.768 24.224c-5.216 2.144-19.872 17.728-19.872 21.28 0 1.184-22.944 49.888-51.072 108.064s-52.256 108.992-53.664 113.024c-1.184 3.776-3.328 8.288-4.256 9.696-1.184 1.408-7.808 14.176-14.88 28.384-7.552 15.616-15.616 28.608-20.096 32.16-10.88 9.216-3.552 8.288-221.312 32.64-98.368 11.104-109.248 12.768-115.136 18.208-4.256 3.776-5.92 17.504-2.848 25.536 0.96 2.112 43.264 42.336 94.112 89.376 160.768 148.48 150.368 138.08 150.368 149.184 0 5.44-3.296 25.056-7.104 43.968-4.032 18.912-12.992 66.208-20.32 105.216s-15.84 83.712-18.912 99.296c-16.32 83.232-16.544 85.6-8.032 94.592 8.032 8.512 17.248 7.552 41.6-4.736 22.688-11.584 24.832-12.768 69.504-39.008 16.32-9.472 37.6-21.76 47.296-27.2s27.648-16.064 39.712-23.392 22.464-13.248 23.168-13.248c0.48 0 7.808-4.256 16.064-9.472s15.84-9.44 16.8-9.44c0.96 0 9.472-4.736 18.912-10.624 22.464-13.952 41.856-21.056 52.96-18.912 4.736 0.96 16.064 5.44 25.056 10.4 23.648 12.544 172.608 98.368 218.944 126.016 39.488 23.648 51.072 28.128 64.544 24.576 8.992-2.144 11.584-15.136 8.512-40.896-1.408-11.584-3.552-24.608-4.736-29.088-1.888-7.552-9.696-49.408-28.608-154.4-8.736-49.888-8.736-50.848 10.88-58.176 27.2-10.176 39.968-19.136 35.008-24.128-1.664-1.664-16.8 0.256-48.224 5.92-58.4 10.624-70.464 12.288-132.16 17.984-70.208 6.624-135.008 8.032-221.568 4.96-67.616-2.368-148-8.288-152.512-11.104-3.552-2.368-1.888-9.696 3.552-14.432 2.848-2.592 38.784-28.384 79.68-57.44 128.16-90.784 211.392-150.848 218.24-157.248 11.808-11.104 10.88-11.584-38.304-17.984-77.792-9.92-98.112-11.584-224.864-17.504-42.336-1.888-80.64-4.256-85.12-4.96-46.336-7.808 189.856-29.088 289.632-26.016 65.504 1.888 142.592 7.328 187.968 13.248 42.336 5.664 44.928 6.144 44.928 10.88 0 3.776-4.48 7.104-104.032 75.648-40.896 28.384-84.416 58.4-96.704 66.912-12.064 8.512-24.576 17.248-27.424 19.136-13.248 8.992-57.696 39.968-69.984 48.928-7.808 5.664-13.952 11.808-13.952 13.728 0 4.48 11.584 7.328 47.296 11.584 94.816 11.104 271.2 17.248 279.008 9.472 1.664-1.664 1.408-6.848-1.184-17.728-1.888-8.288-3.552-16.096-3.552-17.248 0-3.328 40.192-43.52 95.744-95.52 146.816-137.6 150.144-140.928 150.144-151.808 0-9.472-7.808-17.984-19.392-20.8-5.664-1.408-39.488-5.216-75.2-8.736-35.712-3.328-75.2-7.104-87.488-8.288-12.288-1.408-38.304-4.032-57.92-6.144-74.944-7.552-97.888-10.4-103.328-12.992-10.4-4.736-20.096-24.128-91.744-185.376-51.072-115.392-55.552-124.608-62.656-130.976-5.888-5.44-15.104-7.552-21.504-4.96l0 0z"></path></svg>',
				douban: '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M99.223 56.859h819.937v92.37h-819.937v-92.37z"></path><path d="M847.863 245.533h-677.394v361.141h677.394v-361.141zM268.741 337.8h481.886v176.559h-481.886v-176.559z"></path><path d="M701.332 814.715c29.463-45.098 57.318-97.394 83.105-156.833l-98.586-35.881c-25.628 70.365-55.451 134.723-89.467 192.714h-171.433c-28.428-75.181-60.528-139.488-96.462-192.714l-90.662 35.881c37.436 56.152 67.57 108.266 90.662 156.833h-252.464v91.359h866.33v-91.359h-241.023z"></path></svg>'
			},
			makeUrl: function(s, o) {
				o = o || this.defaults;
				var e = this.subString(o.description, 236);
				return o.description = e && e !== o.description ? e + "..." : o.description, o.summary || (o.summary = o.description), this.templates[s].replace(/\{\{(\w)(\w*)\}\}/g, function(e, t, a) {
					var i = s + t + a.toLowerCase();
					return a = (t + a).toLowerCase(), encodeURIComponent((void 0 === o[i] ? o[a] : o[i]) || "")
				})
			},
			init: function init() {
				var _this = this;
				jQuery("a[data-share]").each(function() {
					var $el = jQuery(this),
						type = $el.data("share");
					if(type && _this.templates[type]) {
						var data = Object.assign({}, _this.defaults);
						$el.data("share-callback") && (data = Object.assign(data, eval($el.data("share-callback"))(this))), $el.attr("href", _this.makeUrl(type, data)), _this.icons[type] && $el.find(".fa-" + type) && $el.find(".fa-" + type).html(_this.icons[type]), "wechat" === type && 0 === $el.find(".share-wx-wrap").length && ($el.attr("target", ""), $el.append('<span class="share-wx-wrap"><span class="j-share-qrcode"></span><span>微信扫码分享</span></span>'), $el.find(".j-share-qrcode").qrcode({
							text: _this.defaults.url
						}))
					}
				})
			},
			subString: function(e, t) {
				var a = /[^\x00-\xff]/g;
				if(e.replace(a, "aa").length <= t) return e;
				for(var i = Math.floor(t / 2), s = e.length; i < s; i++)
					if(e.substring(0, i).replace(a, "aa").length >= t) return e.substring(0, i);
				return e
			}
		}, module.exports = new WShare
	}, {
		"../../../Themer/src/js/jquery.qrcode.min": 6
	}],
	11: [function(e, t, a) {
		"use strict";

		function L(e) {
			return(L = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			})(e)
		}! function() {
			var O, e, t, a, i, s, o, r, n, l = function n(e, l) {
				if(!(this instanceof n)) return new n(e, l);
				var t = {
						direction: "horizontal",
						touchEventsTarget: "container",
						initialSlide: 0,
						speed: 300,
						autoplay: !1,
						autoplayDisableOnInteraction: !0,
						autoplayStopOnLast: !1,
						iOSEdgeSwipeDetection: !1,
						iOSEdgeSwipeThreshold: 20,
						freeMode: !1,
						freeModeMomentum: !0,
						freeModeMomentumRatio: 1,
						freeModeMomentumBounce: !0,
						freeModeMomentumBounceRatio: 1,
						freeModeMomentumVelocityRatio: 1,
						freeModeSticky: !1,
						freeModeMinimumVelocity: .02,
						autoHeight: !1,
						setWrapperSize: !1,
						virtualTranslate: !1,
						effect: "slide",
						coverflow: {
							rotate: 50,
							stretch: 0,
							depth: 100,
							modifier: 1,
							slideShadows: !0
						},
						flip: {
							slideShadows: !0,
							limitRotation: !0
						},
						cube: {
							slideShadows: !0,
							shadow: !0,
							shadowOffset: 20,
							shadowScale: .94
						},
						fade: {
							crossFade: !1
						},
						parallax: !1,
						zoom: !1,
						zoomMax: 3,
						zoomMin: 1,
						zoomToggle: !0,
						scrollbar: null,
						scrollbarHide: !0,
						scrollbarDraggable: !1,
						scrollbarSnapOnRelease: !1,
						keyboardControl: !1,
						mousewheelControl: !1,
						mousewheelReleaseOnEdges: !1,
						mousewheelInvert: !1,
						mousewheelForceToAxis: !1,
						mousewheelSensitivity: 1,
						mousewheelEventsTarged: "container",
						hashnav: !1,
						hashnavWatchState: !1,
						history: !1,
						replaceState: !1,
						breakpoints: void 0,
						spaceBetween: 0,
						slidesPerView: 1,
						slidesPerColumn: 1,
						slidesPerColumnFill: "column",
						slidesPerGroup: 1,
						centeredSlides: !1,
						slidesOffsetBefore: 0,
						slidesOffsetAfter: 0,
						roundLengths: !1,
						touchRatio: 1,
						touchAngle: 45,
						simulateTouch: !0,
						shortSwipes: !0,
						longSwipes: !0,
						longSwipesRatio: .5,
						longSwipesMs: 300,
						followFinger: !0,
						onlyExternal: !1,
						threshold: 0,
						touchMoveStopPropagation: !0,
						touchReleaseOnEdges: !1,
						uniqueNavElements: !0,
						pagination: null,
						paginationElement: "span",
						paginationClickable: !1,
						paginationHide: !1,
						paginationBulletRender: null,
						paginationProgressRender: null,
						paginationFractionRender: null,
						paginationCustomRender: null,
						paginationType: "bullets",
						resistance: !0,
						resistanceRatio: .85,
						nextButton: null,
						prevButton: null,
						watchSlidesProgress: !1,
						watchSlidesVisibility: !1,
						grabCursor: !1,
						preventClicks: !0,
						preventClicksPropagation: !0,
						slideToClickedSlide: !1,
						lazyLoading: !1,
						lazyLoadingInPrevNext: !1,
						lazyLoadingInPrevNextAmount: 1,
						lazyLoadingOnTransitionStart: !1,
						preloadImages: !0,
						updateOnImagesReady: !0,
						loop: !1,
						loopAdditionalSlides: 0,
						loopedSlides: null,
						control: void 0,
						controlInverse: !1,
						controlBy: "slide",
						normalizeSlideIndex: !0,
						allowSwipeToPrev: !0,
						allowSwipeToNext: !0,
						swipeHandler: null,
						noSwiping: !0,
						noSwipingClass: "swiper-no-swiping",
						passiveListeners: !0,
						containerModifierClass: "swiper-container-",
						slideClass: "swiper-slide",
						slideActiveClass: "swiper-slide-active",
						slideDuplicateActiveClass: "swiper-slide-duplicate-active",
						slideVisibleClass: "swiper-slide-visible",
						slideDuplicateClass: "swiper-slide-duplicate",
						slideNextClass: "swiper-slide-next",
						slideDuplicateNextClass: "swiper-slide-duplicate-next",
						slidePrevClass: "swiper-slide-prev",
						slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
						wrapperClass: "swiper-wrapper",
						bulletClass: "swiper-pagination-bullet",
						bulletActiveClass: "swiper-pagination-bullet-active",
						buttonDisabledClass: "swiper-button-disabled",
						paginationCurrentClass: "swiper-pagination-current",
						paginationTotalClass: "swiper-pagination-total",
						paginationHiddenClass: "swiper-pagination-hidden",
						paginationProgressbarClass: "swiper-pagination-progressbar",
						paginationClickableClass: "swiper-pagination-clickable",
						paginationModifierClass: "swiper-pagination-",
						lazyLoadingClass: "swiper-lazy",
						lazyStatusLoadingClass: "swiper-lazy-loading",
						lazyStatusLoadedClass: "swiper-lazy-loaded",
						lazyPreloaderClass: "swiper-lazy-preloader",
						notificationClass: "swiper-notification",
						preloaderClass: "preloader",
						zoomContainerClass: "swiper-zoom-container",
						observer: !1,
						observeParents: !1,
						a11y: !1,
						prevSlideMessage: "Previous slide",
						nextSlideMessage: "Next slide",
						firstSlideMessage: "This is the first slide",
						lastSlideMessage: "This is the last slide",
						paginationBulletMessage: "Go to slide {{index}}",
						runCallbacksOnInit: !0
					},
					a = l && l.virtualTranslate;
				l = l || {};
				var i = {};
				for(var s in l)
					if("object" !== L(l[s]) || null === l[s] || (l[s].nodeType || l[s] === window || l[s] === document || "undefined" != typeof Dom7 && l[s] instanceof Dom7 || "undefined" != typeof jQuery && l[s] instanceof jQuery)) i[s] = l[s];
					else
						for(var o in i[s] = {}, l[s]) i[s][o] = l[s][o];
				for(var r in t)
					if(void 0 === l[r]) l[r] = t[r];
					else if("object" === L(l[r]))
					for(var d in t[r]) void 0 === l[r][d] && (l[r][d] = t[r][d]);
				var b = this;
				if(b.params = l, b.originalParams = i, b.classNames = [], void 0 !== O && "undefined" != typeof Dom7 && (O = Dom7), (void 0 !== O || (O = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7)) && (b.$ = O, b.currentBreakpoint = void 0, b.getActiveBreakpoint = function() {
						if(!b.params.breakpoints) return !1;
						var e, t = !1,
							a = [];
						for(e in b.params.breakpoints) b.params.breakpoints.hasOwnProperty(e) && a.push(e);
						a.sort(function(e, t) {
							return parseInt(e, 10) > parseInt(t, 10)
						});
						for(var i = 0; i < a.length; i++)(e = a[i]) >= window.innerWidth && !t && (t = e);
						return t || "max"
					}, b.setBreakpoint = function() {
						var e = b.getActiveBreakpoint();
						if(e && b.currentBreakpoint !== e) {
							var t = e in b.params.breakpoints ? b.params.breakpoints[e] : b.originalParams,
								a = b.params.loop && t.slidesPerView !== b.params.slidesPerView;
							for(var i in t) b.params[i] = t[i];
							b.currentBreakpoint = e, a && b.destroyLoop && b.reLoop(!0)
						}
					}, b.params.breakpoints && b.setBreakpoint(), b.container = O(e), 0 !== b.container.length)) {
					if(1 < b.container.length) {
						var c = [];
						return b.container.each(function() {
							c.push(new n(this, l))
						}), c
					}(b.container[0].swiper = b).container.data("swiper", b), b.classNames.push(b.params.containerModifierClass + b.params.direction), b.params.freeMode && b.classNames.push(b.params.containerModifierClass + "free-mode"), b.support.flexbox || (b.classNames.push(b.params.containerModifierClass + "no-flexbox"), b.params.slidesPerColumn = 1), b.params.autoHeight && b.classNames.push(b.params.containerModifierClass + "autoheight"), (b.params.parallax || b.params.watchSlidesVisibility) && (b.params.watchSlidesProgress = !0), b.params.touchReleaseOnEdges && (b.params.resistanceRatio = 0), 0 <= ["cube", "coverflow", "flip"].indexOf(b.params.effect) && (b.support.transforms3d ? (b.params.watchSlidesProgress = !0, b.classNames.push(b.params.containerModifierClass + "3d")) : b.params.effect = "slide"), "slide" !== b.params.effect && b.classNames.push(b.params.containerModifierClass + b.params.effect), "cube" === b.params.effect && (b.params.resistanceRatio = 0, b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.centeredSlides = !1, b.params.spaceBetween = 0, b.params.virtualTranslate = !0), "fade" !== b.params.effect && "flip" !== b.params.effect || (b.params.slidesPerView = 1, b.params.slidesPerColumn = 1, b.params.slidesPerGroup = 1, b.params.watchSlidesProgress = !0, void(b.params.spaceBetween = 0) === a && (b.params.virtualTranslate = !0)), b.params.grabCursor && b.support.touch && (b.params.grabCursor = !1), b.wrapper = b.container.children("." + b.params.wrapperClass), b.params.pagination && (b.paginationContainer = O(b.params.pagination), b.params.uniqueNavElements && "string" == typeof b.params.pagination && 1 < b.paginationContainer.length && 1 === b.container.find(b.params.pagination).length && (b.paginationContainer = b.container.find(b.params.pagination)), "bullets" === b.params.paginationType && b.params.paginationClickable ? b.paginationContainer.addClass(b.params.paginationModifierClass + "clickable") : b.params.paginationClickable = !1, b.paginationContainer.addClass(b.params.paginationModifierClass + b.params.paginationType)), (b.params.nextButton || b.params.prevButton) && (b.params.nextButton && (b.nextButton = O(b.params.nextButton), b.params.uniqueNavElements && "string" == typeof b.params.nextButton && 1 < b.nextButton.length && 1 === b.container.find(b.params.nextButton).length && (b.nextButton = b.container.find(b.params.nextButton))), b.params.prevButton && (b.prevButton = O(b.params.prevButton), b.params.uniqueNavElements && "string" == typeof b.params.prevButton && 1 < b.prevButton.length && 1 === b.container.find(b.params.prevButton).length && (b.prevButton = b.container.find(b.params.prevButton)))), b.isHorizontal = function() {
						return "horizontal" === b.params.direction
					}, b.rtl = b.isHorizontal() && ("rtl" === b.container[0].dir.toLowerCase() || "rtl" === b.container.css("direction")), b.rtl && b.classNames.push(b.params.containerModifierClass + "rtl"), b.rtl && (b.wrongRTL = "-webkit-box" === b.wrapper.css("display")), 1 < b.params.slidesPerColumn && b.classNames.push(b.params.containerModifierClass + "multirow"), b.device.android && b.classNames.push(b.params.containerModifierClass + "android"), b.container.addClass(b.classNames.join(" ")), b.translate = 0, b.progress = 0, b.velocity = 0, b.lockSwipeToNext = function() {
						(b.params.allowSwipeToNext = !1) === b.params.allowSwipeToPrev && b.params.grabCursor && b.unsetGrabCursor()
					}, b.lockSwipeToPrev = function() {
						(b.params.allowSwipeToPrev = !1) === b.params.allowSwipeToNext && b.params.grabCursor && b.unsetGrabCursor()
					}, b.lockSwipes = function() {
						b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !1, b.params.grabCursor && b.unsetGrabCursor()
					}, b.unlockSwipeToNext = function() {
						(b.params.allowSwipeToNext = !0) === b.params.allowSwipeToPrev && b.params.grabCursor && b.setGrabCursor()
					}, b.unlockSwipeToPrev = function() {
						(b.params.allowSwipeToPrev = !0) === b.params.allowSwipeToNext && b.params.grabCursor && b.setGrabCursor()
					}, b.unlockSwipes = function() {
						b.params.allowSwipeToNext = b.params.allowSwipeToPrev = !0, b.params.grabCursor && b.setGrabCursor()
					}, b.setGrabCursor = function(e) {
						b.container[0].style.cursor = "move", b.container[0].style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", b.container[0].style.cursor = e ? "-moz-grabbin" : "-moz-grab", b.container[0].style.cursor = e ? "grabbing" : "grab"
					}, b.unsetGrabCursor = function() {
						b.container[0].style.cursor = ""
					}, b.params.grabCursor && b.setGrabCursor(), b.imagesToLoad = [], b.imagesLoaded = 0, b.loadImage = function(e, t, a, i, s, o) {
						var r;

						function n() {
							o && o()
						}
						e.complete && s ? n() : t ? ((r = new window.Image).onload = n, r.onerror = n, i && (r.sizes = i), a && (r.srcset = a), t && (r.src = t)) : n()
					}, b.preloadImages = function() {
						function e() {
							null != b && b && (void 0 !== b.imagesLoaded && b.imagesLoaded++, b.imagesLoaded === b.imagesToLoad.length && (b.params.updateOnImagesReady && b.update(), b.emit("onImagesReady", b)))
						}
						b.imagesToLoad = b.container.find("img");
						for(var t = 0; t < b.imagesToLoad.length; t++) b.loadImage(b.imagesToLoad[t], b.imagesToLoad[t].currentSrc || b.imagesToLoad[t].getAttribute("src"), b.imagesToLoad[t].srcset || b.imagesToLoad[t].getAttribute("srcset"), b.imagesToLoad[t].sizes || b.imagesToLoad[t].getAttribute("sizes"), !0, e)
					}, b.autoplayTimeoutId = void 0, b.autoplaying = !1, b.autoplayPaused = !1, b.startAutoplay = function() {
						return void 0 === b.autoplayTimeoutId && (!!b.params.autoplay && (!b.autoplaying && (b.autoplaying = !0, b.emit("onAutoplayStart", b), void y())))
					}, b.stopAutoplay = function(e) {
						b.autoplayTimeoutId && (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplaying = !1, b.autoplayTimeoutId = void 0, b.emit("onAutoplayStop", b))
					}, b.pauseAutoplay = function(e) {
						b.autoplayPaused || (b.autoplayTimeoutId && clearTimeout(b.autoplayTimeoutId), b.autoplayPaused = !0, 0 === e ? (b.autoplayPaused = !1, y()) : b.wrapper.transitionEnd(function() {
							b && (b.autoplayPaused = !1, b.autoplaying ? y() : b.stopAutoplay())
						}))
					}, b.minTranslate = function() {
						return -b.snapGrid[0]
					}, b.maxTranslate = function() {
						return -b.snapGrid[b.snapGrid.length - 1]
					}, b.updateAutoHeight = function() {
						var e, t = [],
							a = 0;
						if("auto" !== b.params.slidesPerView && 1 < b.params.slidesPerView)
							for(e = 0; e < Math.ceil(b.params.slidesPerView); e++) {
								var i = b.activeIndex + e;
								if(i > b.slides.length) break;
								t.push(b.slides.eq(i)[0])
							} else t.push(b.slides.eq(b.activeIndex)[0]);
						for(e = 0; e < t.length; e++)
							if(void 0 !== t[e]) {
								var s = t[e].offsetHeight;
								a = a < s ? s : a
							}
						a && b.wrapper.css("height", a + "px")
					}, b.updateContainerSize = function() {
						var e, t;
						e = void 0 !== b.params.width ? b.params.width : b.container[0].clientWidth, t = void 0 !== b.params.height ? b.params.height : b.container[0].clientHeight, 0 === e && b.isHorizontal() || 0 === t && !b.isHorizontal() || (e = e - parseInt(b.container.css("padding-left"), 10) - parseInt(b.container.css("padding-right"), 10), t = t - parseInt(b.container.css("padding-top"), 10) - parseInt(b.container.css("padding-bottom"), 10), b.width = e, b.height = t, b.size = b.isHorizontal() ? b.width : b.height)
					}, b.updateSlidesSize = function() {
						b.slides = b.wrapper.children("." + b.params.slideClass), b.snapGrid = [], b.slidesGrid = [], b.slidesSizesGrid = [];
						var e, t = b.params.spaceBetween,
							a = -b.params.slidesOffsetBefore,
							i = 0,
							s = 0;
						if(void 0 !== b.size) {
							var o, r;
							"string" == typeof t && 0 <= t.indexOf("%") && (t = parseFloat(t.replace("%", "")) / 100 * b.size), b.virtualSize = -t, b.rtl ? b.slides.css({
								marginLeft: "",
								marginTop: ""
							}) : b.slides.css({
								marginRight: "",
								marginBottom: ""
							}), 1 < b.params.slidesPerColumn && (o = Math.floor(b.slides.length / b.params.slidesPerColumn) === b.slides.length / b.params.slidesPerColumn ? b.slides.length : Math.ceil(b.slides.length / b.params.slidesPerColumn) * b.params.slidesPerColumn, "auto" !== b.params.slidesPerView && "row" === b.params.slidesPerColumnFill && (o = Math.max(o, b.params.slidesPerView * b.params.slidesPerColumn)));
							var n, l = b.params.slidesPerColumn,
								d = o / l,
								c = d - (b.params.slidesPerColumn * d - b.slides.length);
							for(e = 0; e < b.slides.length; e++) {
								r = 0;
								var p, u, h, m = b.slides.eq(e);
								if(1 < b.params.slidesPerColumn) "column" === b.params.slidesPerColumnFill ? (h = e - (u = Math.floor(e / l)) * l, (c < u || u === c && h === l - 1) && ++h >= l && (h = 0, u++), p = u + h * o / l, m.css({
									"-webkit-box-ordinal-group": p,
									"-moz-box-ordinal-group": p,
									"-ms-flex-order": p,
									"-webkit-order": p,
									order: p
								})) : u = e - (h = Math.floor(e / d)) * d, m.css("margin-" + (b.isHorizontal() ? "top" : "left"), 0 !== h && b.params.spaceBetween && b.params.spaceBetween + "px").attr("data-swiper-column", u).attr("data-swiper-row", h);
								"none" !== m.css("display") && ("auto" === b.params.slidesPerView ? (r = b.isHorizontal() ? m.outerWidth(!0) : m.outerHeight(!0), b.params.roundLengths && (r = w(r))) : (r = (b.size - (b.params.slidesPerView - 1) * t) / b.params.slidesPerView, b.params.roundLengths && (r = w(r)), b.isHorizontal() ? b.slides[e].style.width = r + "px" : b.slides[e].style.height = r + "px"), b.slides[e].swiperSlideSize = r, b.slidesSizesGrid.push(r), b.params.centeredSlides ? (a = a + r / 2 + i / 2 + t, 0 === i && 0 !== e && (a = a - b.size / 2 - t), 0 === e && (a = a - b.size / 2 - t), Math.abs(a) < .001 && (a = 0), s % b.params.slidesPerGroup == 0 && b.snapGrid.push(a), b.slidesGrid.push(a)) : (s % b.params.slidesPerGroup == 0 && b.snapGrid.push(a), b.slidesGrid.push(a), a = a + r + t), b.virtualSize += r + t, i = r, s++)
							}
							if(b.virtualSize = Math.max(b.virtualSize, b.size) + b.params.slidesOffsetAfter, b.rtl && b.wrongRTL && ("slide" === b.params.effect || "coverflow" === b.params.effect) && b.wrapper.css({
									width: b.virtualSize + b.params.spaceBetween + "px"
								}), b.support.flexbox && !b.params.setWrapperSize || (b.isHorizontal() ? b.wrapper.css({
									width: b.virtualSize + b.params.spaceBetween + "px"
								}) : b.wrapper.css({
									height: b.virtualSize + b.params.spaceBetween + "px"
								})), 1 < b.params.slidesPerColumn && (b.virtualSize = (r + b.params.spaceBetween) * o, b.virtualSize = Math.ceil(b.virtualSize / b.params.slidesPerColumn) - b.params.spaceBetween, b.isHorizontal() ? b.wrapper.css({
									width: b.virtualSize + b.params.spaceBetween + "px"
								}) : b.wrapper.css({
									height: b.virtualSize + b.params.spaceBetween + "px"
								}), b.params.centeredSlides)) {
								for(n = [], e = 0; e < b.snapGrid.length; e++) b.snapGrid[e] < b.virtualSize + b.snapGrid[0] && n.push(b.snapGrid[e]);
								b.snapGrid = n
							}
							if(!b.params.centeredSlides) {
								for(n = [], e = 0; e < b.snapGrid.length; e++) b.snapGrid[e] <= b.virtualSize - b.size && n.push(b.snapGrid[e]);
								b.snapGrid = n, 1 < Math.floor(b.virtualSize - b.size) - Math.floor(b.snapGrid[b.snapGrid.length - 1]) && b.snapGrid.push(b.virtualSize - b.size)
							}
							0 === b.snapGrid.length && (b.snapGrid = [0]), 0 !== b.params.spaceBetween && (b.isHorizontal() ? b.rtl ? b.slides.css({
								marginLeft: t + "px"
							}) : b.slides.css({
								marginRight: t + "px"
							}) : b.slides.css({
								marginBottom: t + "px"
							})), b.params.watchSlidesProgress && b.updateSlidesOffset()
						}
					}, b.updateSlidesOffset = function() {
						for(var e = 0; e < b.slides.length; e++) b.slides[e].swiperSlideOffset = b.isHorizontal() ? b.slides[e].offsetLeft : b.slides[e].offsetTop
					}, b.currentSlidesPerView = function() {
						var e, t, a = 1;
						if(b.params.centeredSlides) {
							var i, s = b.slides[b.activeIndex].swiperSlideSize;
							for(e = b.activeIndex + 1; e < b.slides.length; e++) b.slides[e] && !i && (a++, (s += b.slides[e].swiperSlideSize) > b.size && (i = !0));
							for(t = b.activeIndex - 1; 0 <= t; t--) b.slides[t] && !i && (a++, (s += b.slides[t].swiperSlideSize) > b.size && (i = !0))
						} else
							for(e = b.activeIndex + 1; e < b.slides.length; e++) b.slidesGrid[e] - b.slidesGrid[b.activeIndex] < b.size && a++;
						return a
					}, b.updateSlidesProgress = function(e) {
						if(void 0 === e && (e = b.translate || 0), 0 !== b.slides.length) {
							void 0 === b.slides[0].swiperSlideOffset && b.updateSlidesOffset();
							var t = -e;
							b.rtl && (t = e), b.slides.removeClass(b.params.slideVisibleClass);
							for(var a = 0; a < b.slides.length; a++) {
								var i = b.slides[a],
									s = (t + (b.params.centeredSlides ? b.minTranslate() : 0) - i.swiperSlideOffset) / (i.swiperSlideSize + b.params.spaceBetween);
								if(b.params.watchSlidesVisibility) {
									var o = -(t - i.swiperSlideOffset),
										r = o + b.slidesSizesGrid[a];
									(0 <= o && o < b.size || 0 < r && r <= b.size || o <= 0 && r >= b.size) && b.slides.eq(a).addClass(b.params.slideVisibleClass)
								}
								i.progress = b.rtl ? -s : s
							}
						}
					}, b.updateProgress = function(e) {
						void 0 === e && (e = b.translate || 0);
						var t = b.maxTranslate() - b.minTranslate(),
							a = b.isBeginning,
							i = b.isEnd;
						0 == t ? (b.progress = 0, b.isBeginning = b.isEnd = !0) : (b.progress = (e - b.minTranslate()) / t, b.isBeginning = b.progress <= 0, b.isEnd = 1 <= b.progress), b.isBeginning && !a && b.emit("onReachBeginning", b), b.isEnd && !i && b.emit("onReachEnd", b), b.params.watchSlidesProgress && b.updateSlidesProgress(e), b.emit("onProgress", b, b.progress)
					}, b.updateActiveIndex = function() {
						var e, t, a, i = b.rtl ? b.translate : -b.translate;
						for(t = 0; t < b.slidesGrid.length; t++) void 0 !== b.slidesGrid[t + 1] ? i >= b.slidesGrid[t] && i < b.slidesGrid[t + 1] - (b.slidesGrid[t + 1] - b.slidesGrid[t]) / 2 ? e = t : i >= b.slidesGrid[t] && i < b.slidesGrid[t + 1] && (e = t + 1) : i >= b.slidesGrid[t] && (e = t);
						b.params.normalizeSlideIndex && (e < 0 || void 0 === e) && (e = 0), (a = Math.floor(e / b.params.slidesPerGroup)) >= b.snapGrid.length && (a = b.snapGrid.length - 1), e !== b.activeIndex && (b.snapIndex = a, b.previousIndex = b.activeIndex, b.activeIndex = e, b.updateClasses(), b.updateRealIndex())
					}, b.updateRealIndex = function() {
						b.realIndex = parseInt(b.slides.eq(b.activeIndex).attr("data-swiper-slide-index") || b.activeIndex, 10)
					}, b.updateClasses = function() {
						b.slides.removeClass(b.params.slideActiveClass + " " + b.params.slideNextClass + " " + b.params.slidePrevClass + " " + b.params.slideDuplicateActiveClass + " " + b.params.slideDuplicateNextClass + " " + b.params.slideDuplicatePrevClass);
						var e = b.slides.eq(b.activeIndex);
						e.addClass(b.params.slideActiveClass), l.loop && (e.hasClass(b.params.slideDuplicateClass) ? b.wrapper.children("." + b.params.slideClass + ":not(." + b.params.slideDuplicateClass + ')[data-swiper-slide-index="' + b.realIndex + '"]').addClass(b.params.slideDuplicateActiveClass) : b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + b.realIndex + '"]').addClass(b.params.slideDuplicateActiveClass));
						var t = e.next("." + b.params.slideClass).addClass(b.params.slideNextClass);
						b.params.loop && 0 === t.length && (t = b.slides.eq(0)).addClass(b.params.slideNextClass);
						var a = e.prev("." + b.params.slideClass).addClass(b.params.slidePrevClass);
						if(b.params.loop && 0 === a.length && (a = b.slides.eq(-1)).addClass(b.params.slidePrevClass), l.loop && (t.hasClass(b.params.slideDuplicateClass) ? b.wrapper.children("." + b.params.slideClass + ":not(." + b.params.slideDuplicateClass + ')[data-swiper-slide-index="' + t.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicateNextClass) : b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + t.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicateNextClass), a.hasClass(b.params.slideDuplicateClass) ? b.wrapper.children("." + b.params.slideClass + ":not(." + b.params.slideDuplicateClass + ')[data-swiper-slide-index="' + a.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicatePrevClass) : b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + a.attr("data-swiper-slide-index") + '"]').addClass(b.params.slideDuplicatePrevClass)), b.paginationContainer && 0 < b.paginationContainer.length) {
							var i, s = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length;
							if(b.params.loop ? ((i = Math.ceil((b.activeIndex - b.loopedSlides) / b.params.slidesPerGroup)) > b.slides.length - 1 - 2 * b.loopedSlides && (i -= b.slides.length - 2 * b.loopedSlides), s - 1 < i && (i -= s), i < 0 && "bullets" !== b.params.paginationType && (i = s + i)) : i = void 0 !== b.snapIndex ? b.snapIndex : b.activeIndex || 0, "bullets" === b.params.paginationType && b.bullets && 0 < b.bullets.length && (b.bullets.removeClass(b.params.bulletActiveClass), 1 < b.paginationContainer.length ? b.bullets.each(function() {
									O(this).index() === i && O(this).addClass(b.params.bulletActiveClass)
								}) : b.bullets.eq(i).addClass(b.params.bulletActiveClass)), "fraction" === b.params.paginationType && (b.paginationContainer.find("." + b.params.paginationCurrentClass).text(i + 1), b.paginationContainer.find("." + b.params.paginationTotalClass).text(s)), "progress" === b.params.paginationType) {
								var o = (i + 1) / s,
									r = o,
									n = 1;
								b.isHorizontal() || (n = o, r = 1), b.paginationContainer.find("." + b.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + r + ") scaleY(" + n + ")").transition(b.params.speed)
							}
							"custom" === b.params.paginationType && b.params.paginationCustomRender && (b.paginationContainer.html(b.params.paginationCustomRender(b, i + 1, s)), b.emit("onPaginationRendered", b, b.paginationContainer[0]))
						}
						b.params.loop || (b.params.prevButton && b.prevButton && 0 < b.prevButton.length && (b.isBeginning ? (b.prevButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.prevButton)) : (b.prevButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.prevButton))), b.params.nextButton && b.nextButton && 0 < b.nextButton.length && (b.isEnd ? (b.nextButton.addClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.disable(b.nextButton)) : (b.nextButton.removeClass(b.params.buttonDisabledClass), b.params.a11y && b.a11y && b.a11y.enable(b.nextButton))))
					}, b.updatePagination = function() {
						if(b.params.pagination && b.paginationContainer && 0 < b.paginationContainer.length) {
							var e = "";
							if("bullets" === b.params.paginationType) {
								for(var t = b.params.loop ? Math.ceil((b.slides.length - 2 * b.loopedSlides) / b.params.slidesPerGroup) : b.snapGrid.length, a = 0; a < t; a++) b.params.paginationBulletRender ? e += b.params.paginationBulletRender(b, a, b.params.bulletClass) : e += "<" + b.params.paginationElement + ' class="' + b.params.bulletClass + '"></' + b.params.paginationElement + ">";
								b.paginationContainer.html(e), b.bullets = b.paginationContainer.find("." + b.params.bulletClass), b.params.paginationClickable && b.params.a11y && b.a11y && b.a11y.initPagination()
							}
							"fraction" === b.params.paginationType && (e = b.params.paginationFractionRender ? b.params.paginationFractionRender(b, b.params.paginationCurrentClass, b.params.paginationTotalClass) : '<span class="' + b.params.paginationCurrentClass + '"></span> / <span class="' + b.params.paginationTotalClass + '"></span>', b.paginationContainer.html(e)), "progress" === b.params.paginationType && (e = b.params.paginationProgressRender ? b.params.paginationProgressRender(b, b.params.paginationProgressbarClass) : '<span class="' + b.params.paginationProgressbarClass + '"></span>', b.paginationContainer.html(e)), "custom" !== b.params.paginationType && b.emit("onPaginationRendered", b, b.paginationContainer[0])
						}
					}, b.update = function(e) {
						var t;
						b && (b.updateContainerSize(), b.updateSlidesSize(), b.updateProgress(), b.updatePagination(), b.updateClasses(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), e ? (b.controller && b.controller.spline && (b.controller.spline = void 0), b.params.freeMode ? (a(), b.params.autoHeight && b.updateAutoHeight()) : (("auto" === b.params.slidesPerView || 1 < b.params.slidesPerView) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0)) || a()) : b.params.autoHeight && b.updateAutoHeight());

						function a() {
							b.rtl, b.translate;
							t = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate()), b.setWrapperTranslate(t), b.updateActiveIndex(), b.updateClasses()
						}
					}, b.onResize = function(e) {
						b.params.onBeforeResize && b.params.onBeforeResize(b), b.params.breakpoints && b.setBreakpoint();
						var t = b.params.allowSwipeToPrev,
							a = b.params.allowSwipeToNext;
						b.params.allowSwipeToPrev = b.params.allowSwipeToNext = !0, b.updateContainerSize(), b.updateSlidesSize(), ("auto" === b.params.slidesPerView || b.params.freeMode || e) && b.updatePagination(), b.params.scrollbar && b.scrollbar && b.scrollbar.set(), b.controller && b.controller.spline && (b.controller.spline = void 0);
						var i = !1;
						if(b.params.freeMode) {
							var s = Math.min(Math.max(b.translate, b.maxTranslate()), b.minTranslate());
							b.setWrapperTranslate(s), b.updateActiveIndex(), b.updateClasses(), b.params.autoHeight && b.updateAutoHeight()
						} else b.updateClasses(), i = ("auto" === b.params.slidesPerView || 1 < b.params.slidesPerView) && b.isEnd && !b.params.centeredSlides ? b.slideTo(b.slides.length - 1, 0, !1, !0) : b.slideTo(b.activeIndex, 0, !1, !0);
						b.params.lazyLoading && !i && b.lazy && b.lazy.load(), b.params.allowSwipeToPrev = t, b.params.allowSwipeToNext = a, b.params.onAfterResize && b.params.onAfterResize(b)
					}, b.touchEventsDesktop = {
						start: "mousedown",
						move: "mousemove",
						end: "mouseup"
					}, window.navigator.pointerEnabled ? b.touchEventsDesktop = {
						start: "pointerdown",
						move: "pointermove",
						end: "pointerup"
					} : window.navigator.msPointerEnabled && (b.touchEventsDesktop = {
						start: "MSPointerDown",
						move: "MSPointerMove",
						end: "MSPointerUp"
					}), b.touchEvents = {
						start: b.support.touch || !b.params.simulateTouch ? "touchstart" : b.touchEventsDesktop.start,
						move: b.support.touch || !b.params.simulateTouch ? "touchmove" : b.touchEventsDesktop.move,
						end: b.support.touch || !b.params.simulateTouch ? "touchend" : b.touchEventsDesktop.end
					}, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === b.params.touchEventsTarget ? b.container : b.wrapper).addClass("swiper-wp8-" + b.params.direction), b.initEvents = function(e) {
						var t = e ? "off" : "on",
							a = e ? "removeEventListener" : "addEventListener",
							i = "container" === b.params.touchEventsTarget ? b.container[0] : b.wrapper[0],
							s = b.support.touch ? i : document,
							o = !!b.params.nested;
						if(b.browser.ie) i[a](b.touchEvents.start, b.onTouchStart, !1), s[a](b.touchEvents.move, b.onTouchMove, o), s[a](b.touchEvents.end, b.onTouchEnd, !1);
						else {
							if(b.support.touch) {
								var r = !("touchstart" !== b.touchEvents.start || !b.support.passiveListener || !b.params.passiveListeners) && {
									passive: !0,
									capture: !1
								};
								i[a](b.touchEvents.start, b.onTouchStart, r), i[a](b.touchEvents.move, b.onTouchMove, o), i[a](b.touchEvents.end, b.onTouchEnd, r)
							}(l.simulateTouch && !b.device.ios && !b.device.android || l.simulateTouch && !b.support.touch && b.device.ios) && (i[a]("mousedown", b.onTouchStart, !1), document[a]("mousemove", b.onTouchMove, o), document[a]("mouseup", b.onTouchEnd, !1))
						}
						window[a]("resize", b.onResize), b.params.nextButton && b.nextButton && 0 < b.nextButton.length && (b.nextButton[t]("click", b.onClickNext), b.params.a11y && b.a11y && b.nextButton[t]("keydown", b.a11y.onEnterKey)), b.params.prevButton && b.prevButton && 0 < b.prevButton.length && (b.prevButton[t]("click", b.onClickPrev), b.params.a11y && b.a11y && b.prevButton[t]("keydown", b.a11y.onEnterKey)), b.params.pagination && b.params.paginationClickable && (b.paginationContainer[t]("click", "." + b.params.bulletClass, b.onClickIndex), b.params.a11y && b.a11y && b.paginationContainer[t]("keydown", "." + b.params.bulletClass, b.a11y.onEnterKey)), (b.params.preventClicks || b.params.preventClicksPropagation) && i[a]("click", b.preventClicks, !0)
					}, b.attachEvents = function() {
						b.initEvents()
					}, b.detachEvents = function() {
						b.initEvents(!0)
					}, b.allowClick = !0, b.preventClicks = function(e) {
						b.allowClick || (b.params.preventClicks && e.preventDefault(), b.params.preventClicksPropagation && b.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
					}, b.onClickNext = function(e) {
						e.preventDefault(), b.isEnd && !b.params.loop || b.slideNext()
					}, b.onClickPrev = function(e) {
						e.preventDefault(), b.isBeginning && !b.params.loop || b.slidePrev()
					}, b.onClickIndex = function(e) {
						e.preventDefault();
						var t = O(this).index() * b.params.slidesPerGroup;
						b.params.loop && (t += b.loopedSlides), b.slideTo(t)
					}, b.updateClickedSlide = function(e) {
						var t = M(e, "." + b.params.slideClass),
							a = !1;
						if(t)
							for(var i = 0; i < b.slides.length; i++) b.slides[i] === t && (a = !0);
						if(!t || !a) return b.clickedSlide = void 0, void(b.clickedIndex = void 0);
						if(b.clickedSlide = t, b.clickedIndex = O(t).index(), b.params.slideToClickedSlide && void 0 !== b.clickedIndex && b.clickedIndex !== b.activeIndex) {
							var s, o = b.clickedIndex,
								r = "auto" === b.params.slidesPerView ? b.currentSlidesPerView() : b.params.slidesPerView;
							if(b.params.loop) {
								if(b.animating) return;
								s = parseInt(O(b.clickedSlide).attr("data-swiper-slide-index"), 10), b.params.centeredSlides ? o < b.loopedSlides - r / 2 || o > b.slides.length - b.loopedSlides + r / 2 ? (b.fixLoop(), o = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.' + b.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function() {
									b.slideTo(o)
								}, 0)) : b.slideTo(o) : o > b.slides.length - r ? (b.fixLoop(), o = b.wrapper.children("." + b.params.slideClass + '[data-swiper-slide-index="' + s + '"]:not(.' + b.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function() {
									b.slideTo(o)
								}, 0)) : b.slideTo(o)
							} else b.slideTo(o)
						}
					};
					var x, T, C, S, p, _, k, u, E, P, h, m, f = "input, select, textarea, button, video",
						I = Date.now(),
						j = [];
					for(var g in b.animating = !1, b.touches = {
							startX: 0,
							startY: 0,
							currentX: 0,
							currentY: 0,
							diff: 0
						}, b.onTouchStart = function(e) {
							if(e.originalEvent && (e = e.originalEvent), (h = "touchstart" === e.type) || !("which" in e) || 3 !== e.which)
								if(b.params.noSwiping && M(e, "." + b.params.noSwipingClass)) b.allowClick = !0;
								else if(!b.params.swipeHandler || M(e, b.params.swipeHandler)) {
								var t = b.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
									a = b.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
								if(!(b.device.ios && b.params.iOSEdgeSwipeDetection && t <= b.params.iOSEdgeSwipeThreshold)) {
									if(C = !(T = !(x = !0)), m = p = void 0, b.touches.startX = t, b.touches.startY = a, S = Date.now(), b.allowClick = !0, b.updateContainerSize(), b.swipeDirection = void 0, 0 < b.params.threshold && (u = !1), "touchstart" !== e.type) {
										var i = !0;
										O(e.target).is(f) && (i = !1), document.activeElement && O(document.activeElement).is(f) && document.activeElement.blur(), i && e.preventDefault()
									}
									b.emit("onTouchStart", b, e)
								}
							}
						}, b.onTouchMove = function(e) {
							if(e.originalEvent && (e = e.originalEvent), !h || "mousemove" !== e.type) {
								if(e.preventedByNestedSwiper) return b.touches.startX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, void(b.touches.startY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY);
								if(b.params.onlyExternal) return b.allowClick = !1, void(x && (b.touches.startX = b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.startY = b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, S = Date.now()));
								if(h && b.params.touchReleaseOnEdges && !b.params.loop)
									if(b.isHorizontal()) {
										if(b.touches.currentX < b.touches.startX && b.translate <= b.maxTranslate() || b.touches.currentX > b.touches.startX && b.translate >= b.minTranslate()) return
									} else if(b.touches.currentY < b.touches.startY && b.translate <= b.maxTranslate() || b.touches.currentY > b.touches.startY && b.translate >= b.minTranslate()) return;
								if(h && document.activeElement && e.target === document.activeElement && O(e.target).is(f)) return T = !0, void(b.allowClick = !1);
								if(C && b.emit("onTouchMove", b, e), !(e.targetTouches && 1 < e.targetTouches.length)) {
									var t;
									if(b.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, b.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, void 0 === p) p = !(b.isHorizontal() && b.touches.currentY === b.touches.startY || !b.isHorizontal() && b.touches.currentX === b.touches.startX) && (t = 180 * Math.atan2(Math.abs(b.touches.currentY - b.touches.startY), Math.abs(b.touches.currentX - b.touches.startX)) / Math.PI, b.isHorizontal() ? t > b.params.touchAngle : 90 - t > b.params.touchAngle);
									if(p && b.emit("onTouchMoveOpposite", b, e), void 0 === m && (b.touches.currentX === b.touches.startX && b.touches.currentY === b.touches.startY || (m = !0)), x)
										if(p) x = !1;
										else if(m) {
										b.allowClick = !1, b.emit("onSliderMove", b, e), e.preventDefault(), b.params.touchMoveStopPropagation && !b.params.nested && e.stopPropagation(), T || (l.loop && b.fixLoop(), k = b.getWrapperTranslate(), b.setWrapperTransition(0), b.animating && b.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), b.params.autoplay && b.autoplaying && (b.params.autoplayDisableOnInteraction ? b.stopAutoplay() : b.pauseAutoplay()), P = !1, !b.params.grabCursor || !0 !== b.params.allowSwipeToNext && !0 !== b.params.allowSwipeToPrev || b.setGrabCursor(!0)), T = !0;
										var a = b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY;
										a *= b.params.touchRatio, b.rtl && (a = -a), b.swipeDirection = 0 < a ? "prev" : "next", _ = a + k;
										var i = !0;
										if(0 < a && _ > b.minTranslate() ? (i = !1, b.params.resistance && (_ = b.minTranslate() - 1 + Math.pow(-b.minTranslate() + k + a, b.params.resistanceRatio))) : a < 0 && _ < b.maxTranslate() && (i = !1, b.params.resistance && (_ = b.maxTranslate() + 1 - Math.pow(b.maxTranslate() - k - a, b.params.resistanceRatio))), i && (e.preventedByNestedSwiper = !0), !b.params.allowSwipeToNext && "next" === b.swipeDirection && _ < k && (_ = k), !b.params.allowSwipeToPrev && "prev" === b.swipeDirection && k < _ && (_ = k), 0 < b.params.threshold) {
											if(!(Math.abs(a) > b.params.threshold || u)) return void(_ = k);
											if(!u) return u = !0, b.touches.startX = b.touches.currentX, b.touches.startY = b.touches.currentY, _ = k, void(b.touches.diff = b.isHorizontal() ? b.touches.currentX - b.touches.startX : b.touches.currentY - b.touches.startY)
										}
										b.params.followFinger && ((b.params.freeMode || b.params.watchSlidesProgress) && b.updateActiveIndex(), b.params.freeMode && (0 === j.length && j.push({
											position: b.touches[b.isHorizontal() ? "startX" : "startY"],
											time: S
										}), j.push({
											position: b.touches[b.isHorizontal() ? "currentX" : "currentY"],
											time: (new window.Date).getTime()
										})), b.updateProgress(_), b.setWrapperTranslate(_))
									}
								}
							}
						}, b.onTouchEnd = function(e) {
							if(e.originalEvent && (e = e.originalEvent), C && b.emit("onTouchEnd", b, e), C = !1, x) {
								b.params.grabCursor && T && x && (!0 === b.params.allowSwipeToNext || !0 === b.params.allowSwipeToPrev) && b.setGrabCursor(!1);
								var t, a = Date.now(),
									i = a - S;
								if(b.allowClick && (b.updateClickedSlide(e), b.emit("onTap", b, e), i < 300 && 300 < a - I && (E && clearTimeout(E), E = setTimeout(function() {
										b && (b.params.paginationHide && 0 < b.paginationContainer.length && !O(e.target).hasClass(b.params.bulletClass) && b.paginationContainer.toggleClass(b.params.paginationHiddenClass), b.emit("onClick", b, e))
									}, 300)), i < 300 && a - I < 300 && (E && clearTimeout(E), b.emit("onDoubleTap", b, e))), I = Date.now(), setTimeout(function() {
										b && (b.allowClick = !0)
									}, 0), x && T && b.swipeDirection && 0 !== b.touches.diff && _ !== k)
									if(x = T = !1, t = b.params.followFinger ? b.rtl ? b.translate : -b.translate : -_, b.params.freeMode) {
										if(t < -b.minTranslate()) return void b.slideTo(b.activeIndex);
										if(t > -b.maxTranslate()) return void(b.slides.length < b.snapGrid.length ? b.slideTo(b.snapGrid.length - 1) : b.slideTo(b.slides.length - 1));
										if(b.params.freeModeMomentum) {
											if(1 < j.length) {
												var s = j.pop(),
													o = j.pop(),
													r = s.position - o.position,
													n = s.time - o.time;
												b.velocity = r / n, b.velocity = b.velocity / 2, Math.abs(b.velocity) < b.params.freeModeMinimumVelocity && (b.velocity = 0), (150 < n || 300 < (new window.Date).getTime() - s.time) && (b.velocity = 0)
											} else b.velocity = 0;
											b.velocity = b.velocity * b.params.freeModeMomentumVelocityRatio, j.length = 0;
											var l = 1e3 * b.params.freeModeMomentumRatio,
												d = b.velocity * l,
												c = b.translate + d;
											b.rtl && (c = -c);
											var p, u = !1,
												h = 20 * Math.abs(b.velocity) * b.params.freeModeMomentumBounceRatio;
											if(c < b.maxTranslate()) b.params.freeModeMomentumBounce ? (c + b.maxTranslate() < -h && (c = b.maxTranslate() - h), p = b.maxTranslate(), P = u = !0) : c = b.maxTranslate();
											else if(c > b.minTranslate()) b.params.freeModeMomentumBounce ? (c - b.minTranslate() > h && (c = b.minTranslate() + h), p = b.minTranslate(), P = u = !0) : c = b.minTranslate();
											else if(b.params.freeModeSticky) {
												var m, f = 0;
												for(f = 0; f < b.snapGrid.length; f += 1)
													if(b.snapGrid[f] > -c) {
														m = f;
														break
													}
												c = Math.abs(b.snapGrid[m] - c) < Math.abs(b.snapGrid[m - 1] - c) || "next" === b.swipeDirection ? b.snapGrid[m] : b.snapGrid[m - 1], b.rtl || (c = -c)
											}
											if(0 !== b.velocity) l = b.rtl ? Math.abs((-c - b.translate) / b.velocity) : Math.abs((c - b.translate) / b.velocity);
											else if(b.params.freeModeSticky) return void b.slideReset();
											b.params.freeModeMomentumBounce && u ? (b.updateProgress(p), b.setWrapperTransition(l), b.setWrapperTranslate(c), b.onTransitionStart(), b.animating = !0, b.wrapper.transitionEnd(function() {
												b && P && (b.emit("onMomentumBounce", b), b.setWrapperTransition(b.params.speed), b.setWrapperTranslate(p), b.wrapper.transitionEnd(function() {
													b && b.onTransitionEnd()
												}))
											})) : b.velocity ? (b.updateProgress(c), b.setWrapperTransition(l), b.setWrapperTranslate(c), b.onTransitionStart(), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function() {
												b && b.onTransitionEnd()
											}))) : b.updateProgress(c), b.updateActiveIndex()
										}(!b.params.freeModeMomentum || i >= b.params.longSwipesMs) && (b.updateProgress(), b.updateActiveIndex())
									} else {
										var g, v = 0,
											w = b.slidesSizesGrid[0];
										for(g = 0; g < b.slidesGrid.length; g += b.params.slidesPerGroup) void 0 !== b.slidesGrid[g + b.params.slidesPerGroup] ? t >= b.slidesGrid[g] && t < b.slidesGrid[g + b.params.slidesPerGroup] && (v = g, w = b.slidesGrid[g + b.params.slidesPerGroup] - b.slidesGrid[g]) : t >= b.slidesGrid[g] && (v = g, w = b.slidesGrid[b.slidesGrid.length - 1] - b.slidesGrid[b.slidesGrid.length - 2]);
										var y = (t - b.slidesGrid[v]) / w;
										if(i > b.params.longSwipesMs) {
											if(!b.params.longSwipes) return void b.slideTo(b.activeIndex);
											"next" === b.swipeDirection && (y >= b.params.longSwipesRatio ? b.slideTo(v + b.params.slidesPerGroup) : b.slideTo(v)), "prev" === b.swipeDirection && (y > 1 - b.params.longSwipesRatio ? b.slideTo(v + b.params.slidesPerGroup) : b.slideTo(v))
										} else {
											if(!b.params.shortSwipes) return void b.slideTo(b.activeIndex);
											"next" === b.swipeDirection && b.slideTo(v + b.params.slidesPerGroup), "prev" === b.swipeDirection && b.slideTo(v)
										}
									}
								else x = T = !1
							}
						}, b._slideTo = function(e, t) {
							return b.slideTo(e, t, !0, !0)
						}, b.slideTo = function(e, t, a, i) {
							void 0 === a && (a = !0), void 0 === e && (e = 0), e < 0 && (e = 0), b.snapIndex = Math.floor(e / b.params.slidesPerGroup), b.snapIndex >= b.snapGrid.length && (b.snapIndex = b.snapGrid.length - 1);
							var s = -b.snapGrid[b.snapIndex];
							if(b.params.autoplay && b.autoplaying && (i || !b.params.autoplayDisableOnInteraction ? b.pauseAutoplay(t) : b.stopAutoplay()), b.updateProgress(s), b.params.normalizeSlideIndex)
								for(var o = 0; o < b.slidesGrid.length; o++) - Math.floor(100 * s) >= Math.floor(100 * b.slidesGrid[o]) && (e = o);
							return !(!b.params.allowSwipeToNext && s < b.translate && s < b.minTranslate()) && (!(!b.params.allowSwipeToPrev && s > b.translate && s > b.maxTranslate() && (b.activeIndex || 0) !== e) && (void 0 === t && (t = b.params.speed), b.previousIndex = b.activeIndex || 0, b.activeIndex = e, b.updateRealIndex(), b.rtl && -s === b.translate || !b.rtl && s === b.translate ? (b.params.autoHeight && b.updateAutoHeight(), b.updateClasses(), "slide" !== b.params.effect && b.setWrapperTranslate(s), !1) : (b.updateClasses(), b.onTransitionStart(a), 0 === t || b.browser.lteIE9 ? (b.setWrapperTranslate(s), b.setWrapperTransition(0), b.onTransitionEnd(a)) : (b.setWrapperTranslate(s), b.setWrapperTransition(t), b.animating || (b.animating = !0, b.wrapper.transitionEnd(function() {
								b && b.onTransitionEnd(a)
							}))), !0)))
						}, b.onTransitionStart = function(e) {
							void 0 === e && (e = !0), b.params.autoHeight && b.updateAutoHeight(), b.lazy && b.lazy.onTransitionStart(), e && (b.emit("onTransitionStart", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeStart", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextStart", b) : b.emit("onSlidePrevStart", b)))
						}, b.onTransitionEnd = function(e) {
							b.animating = !1, b.setWrapperTransition(0), void 0 === e && (e = !0), b.lazy && b.lazy.onTransitionEnd(), e && (b.emit("onTransitionEnd", b), b.activeIndex !== b.previousIndex && (b.emit("onSlideChangeEnd", b), b.activeIndex > b.previousIndex ? b.emit("onSlideNextEnd", b) : b.emit("onSlidePrevEnd", b))), b.params.history && b.history && b.history.setHistory(b.params.history, b.activeIndex), b.params.hashnav && b.hashnav && b.hashnav.setHash()
						}, b.slideNext = function(e, t, a) {
							if(b.params.loop) {
								if(b.animating) return !1;
								b.fixLoop();
								b.container[0].clientLeft;
								return b.slideTo(b.activeIndex + b.params.slidesPerGroup, t, e, a)
							}
							return b.slideTo(b.activeIndex + b.params.slidesPerGroup, t, e, a)
						}, b._slideNext = function(e) {
							return b.slideNext(!0, e, !0)
						}, b.slidePrev = function(e, t, a) {
							if(b.params.loop) {
								if(b.animating) return !1;
								b.fixLoop();
								b.container[0].clientLeft;
								return b.slideTo(b.activeIndex - 1, t, e, a)
							}
							return b.slideTo(b.activeIndex - 1, t, e, a)
						}, b._slidePrev = function(e) {
							return b.slidePrev(!0, e, !0)
						}, b.slideReset = function(e, t, a) {
							return b.slideTo(b.activeIndex, t, e)
						}, b.disableTouchControl = function() {
							return b.params.onlyExternal = !0
						}, b.enableTouchControl = function() {
							return !(b.params.onlyExternal = !1)
						}, b.setWrapperTransition = function(e, t) {
							b.wrapper.transition(e), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTransition(e), b.params.parallax && b.parallax && b.parallax.setTransition(e), b.params.scrollbar && b.scrollbar && b.scrollbar.setTransition(e), b.params.control && b.controller && b.controller.setTransition(e, t), b.emit("onSetTransition", b, e)
						}, b.setWrapperTranslate = function(e, t, a) {
							var i = 0,
								s = 0;
							b.isHorizontal() ? i = b.rtl ? -e : e : s = e, b.params.roundLengths && (i = w(i), s = w(s)), b.params.virtualTranslate || (b.support.transforms3d ? b.wrapper.transform("translate3d(" + i + "px, " + s + "px, 0px)") : b.wrapper.transform("translate(" + i + "px, " + s + "px)")), b.translate = b.isHorizontal() ? i : s;
							var o = b.maxTranslate() - b.minTranslate();
							(0 == o ? 0 : (e - b.minTranslate()) / o) !== b.progress && b.updateProgress(e), t && b.updateActiveIndex(), "slide" !== b.params.effect && b.effects[b.params.effect] && b.effects[b.params.effect].setTranslate(b.translate), b.params.parallax && b.parallax && b.parallax.setTranslate(b.translate), b.params.scrollbar && b.scrollbar && b.scrollbar.setTranslate(b.translate), b.params.control && b.controller && b.controller.setTranslate(b.translate, a), b.emit("onSetTranslate", b, b.translate)
						}, b.getTranslate = function(e, t) {
							var a, i, s, o;
							return void 0 === t && (t = "x"), b.params.virtualTranslate ? b.rtl ? -b.translate : b.translate : (s = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (6 < (i = s.transform || s.webkitTransform).split(",").length && (i = i.split(", ").map(function(e) {
								return e.replace(",", ".")
							}).join(", ")), o = new window.WebKitCSSMatrix("none" === i ? "" : i)) : a = (o = s.MozTransform || s.OTransform || s.MsTransform || s.msTransform || s.transform || s.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === t && (i = window.WebKitCSSMatrix ? o.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])), "y" === t && (i = window.WebKitCSSMatrix ? o.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])), b.rtl && i && (i = -i), i || 0)
						}, b.getWrapperTranslate = function(e) {
							return void 0 === e && (e = b.isHorizontal() ? "x" : "y"), b.getTranslate(b.wrapper[0], e)
						}, b.observers = [], b.initObservers = function() {
							if(b.params.observeParents)
								for(var e = b.container.parents(), t = 0; t < e.length; t++) D(e[t]);
							D(b.container[0], {
								childList: !1
							}), D(b.wrapper[0], {
								attributes: !1
							})
						}, b.disconnectObservers = function() {
							for(var e = 0; e < b.observers.length; e++) b.observers[e].disconnect();
							b.observers = []
						}, b.createLoop = function() {
							b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove();
							var i = b.wrapper.children("." + b.params.slideClass);
							"auto" !== b.params.slidesPerView || b.params.loopedSlides || (b.params.loopedSlides = i.length), b.loopedSlides = parseInt(b.params.loopedSlides || b.params.slidesPerView, 10), b.loopedSlides = b.loopedSlides + b.params.loopAdditionalSlides, b.loopedSlides > i.length && (b.loopedSlides = i.length);
							var e, s = [],
								o = [];
							for(i.each(function(e, t) {
									var a = O(this);
									e < b.loopedSlides && o.push(t), e < i.length && e >= i.length - b.loopedSlides && s.push(t), a.attr("data-swiper-slide-index", e)
								}), e = 0; e < o.length; e++) b.wrapper.append(O(o[e].cloneNode(!0)).addClass(b.params.slideDuplicateClass));
							for(e = s.length - 1; 0 <= e; e--) b.wrapper.prepend(O(s[e].cloneNode(!0)).addClass(b.params.slideDuplicateClass))
						}, b.destroyLoop = function() {
							b.wrapper.children("." + b.params.slideClass + "." + b.params.slideDuplicateClass).remove(), b.slides.removeAttr("data-swiper-slide-index")
						}, b.reLoop = function(e) {
							var t = b.activeIndex - b.loopedSlides;
							b.destroyLoop(), b.createLoop(), b.updateSlidesSize(), e && b.slideTo(t + b.loopedSlides, 0, !1)
						}, b.fixLoop = function() {
							var e;
							b.activeIndex < b.loopedSlides ? (e = b.slides.length - 3 * b.loopedSlides + b.activeIndex, e += b.loopedSlides, b.slideTo(e, 0, !1, !0)) : ("auto" === b.params.slidesPerView && b.activeIndex >= 2 * b.loopedSlides || b.activeIndex > b.slides.length - 2 * b.params.slidesPerView) && (e = -b.slides.length + b.activeIndex + b.loopedSlides, e += b.loopedSlides, b.slideTo(e, 0, !1, !0))
						}, b.appendSlide = function(e) {
							if(b.params.loop && b.destroyLoop(), "object" === L(e) && e.length)
								for(var t = 0; t < e.length; t++) e[t] && b.wrapper.append(e[t]);
							else b.wrapper.append(e);
							b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0)
						}, b.prependSlide = function(e) {
							b.params.loop && b.destroyLoop();
							var t = b.activeIndex + 1;
							if("object" === L(e) && e.length) {
								for(var a = 0; a < e.length; a++) e[a] && b.wrapper.prepend(e[a]);
								t = b.activeIndex + e.length
							} else b.wrapper.prepend(e);
							b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.slideTo(t, 0, !1)
						}, b.removeSlide = function(e) {
							b.params.loop && (b.destroyLoop(), b.slides = b.wrapper.children("." + b.params.slideClass));
							var t, a = b.activeIndex;
							if("object" === L(e) && e.length) {
								for(var i = 0; i < e.length; i++) t = e[i], b.slides[t] && b.slides.eq(t).remove(), t < a && a--;
								a = Math.max(a, 0)
							} else t = e, b.slides[t] && b.slides.eq(t).remove(), t < a && a--, a = Math.max(a, 0);
							b.params.loop && b.createLoop(), b.params.observer && b.support.observer || b.update(!0), b.params.loop ? b.slideTo(a + b.loopedSlides, 0, !1) : b.slideTo(a, 0, !1)
						}, b.removeAllSlides = function() {
							for(var e = [], t = 0; t < b.slides.length; t++) e.push(t);
							b.removeSlide(e)
						}, b.effects = {
							fade: {
								setTranslate: function() {
									for(var e = 0; e < b.slides.length; e++) {
										var t = b.slides.eq(e),
											a = -t[0].swiperSlideOffset;
										b.params.virtualTranslate || (a -= b.translate);
										var i = 0;
										b.isHorizontal() || (i = a, a = 0);
										var s = b.params.fade.crossFade ? Math.max(1 - Math.abs(t[0].progress), 0) : 1 + Math.min(Math.max(t[0].progress, -1), 0);
										t.css({
											opacity: s
										}).transform("translate3d(" + a + "px, " + i + "px, 0px)")
									}
								},
								setTransition: function(e) {
									if(b.slides.transition(e), b.params.virtualTranslate && 0 !== e) {
										var a = !1;
										b.slides.transitionEnd(function() {
											if(!a && b) {
												a = !0, b.animating = !1;
												for(var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) b.wrapper.trigger(e[t])
											}
										})
									}
								}
							},
							flip: {
								setTranslate: function() {
									for(var e = 0; e < b.slides.length; e++) {
										var t = b.slides.eq(e),
											a = t[0].progress;
										b.params.flip.limitRotation && (a = Math.max(Math.min(t[0].progress, 1), -1));
										var i = -180 * a,
											s = 0,
											o = -t[0].swiperSlideOffset,
											r = 0;
										if(b.isHorizontal() ? b.rtl && (i = -i) : (r = o, s = -i, i = o = 0), t[0].style.zIndex = -Math.abs(Math.round(a)) + b.slides.length, b.params.flip.slideShadows) {
											var n = b.isHorizontal() ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top"),
												l = b.isHorizontal() ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
											0 === n.length && (n = O('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), t.append(n)), 0 === l.length && (l = O('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), t.append(l)), n.length && (n[0].style.opacity = Math.max(-a, 0)), l.length && (l[0].style.opacity = Math.max(a, 0))
										}
										t.transform("translate3d(" + o + "px, " + r + "px, 0px) rotateX(" + s + "deg) rotateY(" + i + "deg)")
									}
								},
								setTransition: function(e) {
									if(b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.virtualTranslate && 0 !== e) {
										var a = !1;
										b.slides.eq(b.activeIndex).transitionEnd(function() {
											if(!a && b && O(this).hasClass(b.params.slideActiveClass)) {
												a = !0, b.animating = !1;
												for(var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) b.wrapper.trigger(e[t])
											}
										})
									}
								}
							},
							cube: {
								setTranslate: function() {
									var e, t = 0;
									b.params.cube.shadow && (b.isHorizontal() ? (0 === (e = b.wrapper.find(".swiper-cube-shadow")).length && (e = O('<div class="swiper-cube-shadow"></div>'), b.wrapper.append(e)), e.css({
										height: b.width + "px"
									})) : 0 === (e = b.container.find(".swiper-cube-shadow")).length && (e = O('<div class="swiper-cube-shadow"></div>'), b.container.append(e)));
									for(var a = 0; a < b.slides.length; a++) {
										var i = b.slides.eq(a),
											s = 90 * a,
											o = Math.floor(s / 360);
										b.rtl && (s = -s, o = Math.floor(-s / 360));
										var r = Math.max(Math.min(i[0].progress, 1), -1),
											n = 0,
											l = 0,
											d = 0;
										a % 4 == 0 ? (n = 4 * -o * b.size, d = 0) : (a - 1) % 4 == 0 ? (n = 0, d = 4 * -o * b.size) : (a - 2) % 4 == 0 ? (n = b.size + 4 * o * b.size, d = b.size) : (a - 3) % 4 == 0 && (n = -b.size, d = 3 * b.size + 4 * b.size * o), b.rtl && (n = -n), b.isHorizontal() || (l = n, n = 0);
										var c = "rotateX(" + (b.isHorizontal() ? 0 : -s) + "deg) rotateY(" + (b.isHorizontal() ? s : 0) + "deg) translate3d(" + n + "px, " + l + "px, " + d + "px)";
										if(r <= 1 && -1 < r && (t = 90 * a + 90 * r, b.rtl && (t = 90 * -a - 90 * r)), i.transform(c), b.params.cube.slideShadows) {
											var p = b.isHorizontal() ? i.find(".swiper-slide-shadow-left") : i.find(".swiper-slide-shadow-top"),
												u = b.isHorizontal() ? i.find(".swiper-slide-shadow-right") : i.find(".swiper-slide-shadow-bottom");
											0 === p.length && (p = O('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), i.append(p)), 0 === u.length && (u = O('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), i.append(u)), p.length && (p[0].style.opacity = Math.max(-r, 0)), u.length && (u[0].style.opacity = Math.max(r, 0))
										}
									}
									if(b.wrapper.css({
											"-webkit-transform-origin": "50% 50% -" + b.size / 2 + "px",
											"-moz-transform-origin": "50% 50% -" + b.size / 2 + "px",
											"-ms-transform-origin": "50% 50% -" + b.size / 2 + "px",
											"transform-origin": "50% 50% -" + b.size / 2 + "px"
										}), b.params.cube.shadow)
										if(b.isHorizontal()) e.transform("translate3d(0px, " + (b.width / 2 + b.params.cube.shadowOffset) + "px, " + -b.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + b.params.cube.shadowScale + ")");
										else {
											var h = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
												m = 1.5 - (Math.sin(2 * h * Math.PI / 360) / 2 + Math.cos(2 * h * Math.PI / 360) / 2),
												f = b.params.cube.shadowScale,
												g = b.params.cube.shadowScale / m,
												v = b.params.cube.shadowOffset;
											e.transform("scale3d(" + f + ", 1, " + g + ") translate3d(0px, " + (b.height / 2 + v) + "px, " + -b.height / 2 / g + "px) rotateX(-90deg)")
										}
									var w = b.isSafari || b.isUiWebView ? -b.size / 2 : 0;
									b.wrapper.transform("translate3d(0px,0," + w + "px) rotateX(" + (b.isHorizontal() ? 0 : t) + "deg) rotateY(" + (b.isHorizontal() ? -t : 0) + "deg)")
								},
								setTransition: function(e) {
									b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), b.params.cube.shadow && !b.isHorizontal() && b.container.find(".swiper-cube-shadow").transition(e)
								}
							},
							coverflow: {
								setTranslate: function() {
									for(var e = b.translate, t = b.isHorizontal() ? -e + b.width / 2 : -e + b.height / 2, a = b.isHorizontal() ? b.params.coverflow.rotate : -b.params.coverflow.rotate, i = b.params.coverflow.depth, s = 0, o = b.slides.length; s < o; s++) {
										var r = b.slides.eq(s),
											n = b.slidesSizesGrid[s],
											l = (t - r[0].swiperSlideOffset - n / 2) / n * b.params.coverflow.modifier,
											d = b.isHorizontal() ? a * l : 0,
											c = b.isHorizontal() ? 0 : a * l,
											p = -i * Math.abs(l),
											u = b.isHorizontal() ? 0 : b.params.coverflow.stretch * l,
											h = b.isHorizontal() ? b.params.coverflow.stretch * l : 0;
										Math.abs(h) < .001 && (h = 0), Math.abs(u) < .001 && (u = 0), Math.abs(p) < .001 && (p = 0), Math.abs(d) < .001 && (d = 0), Math.abs(c) < .001 && (c = 0);
										var m = "translate3d(" + h + "px," + u + "px," + p + "px)  rotateX(" + c + "deg) rotateY(" + d + "deg)";
										if(r.transform(m), r[0].style.zIndex = 1 - Math.abs(Math.round(l)), b.params.coverflow.slideShadows) {
											var f = b.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"),
												g = b.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");
											0 === f.length && (f = O('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "left" : "top") + '"></div>'), r.append(f)), 0 === g.length && (g = O('<div class="swiper-slide-shadow-' + (b.isHorizontal() ? "right" : "bottom") + '"></div>'), r.append(g)), f.length && (f[0].style.opacity = 0 < l ? l : 0), g.length && (g[0].style.opacity = 0 < -l ? -l : 0)
										}
									}
									b.browser.ie && (b.wrapper[0].style.perspectiveOrigin = t + "px 50%")
								},
								setTransition: function(e) {
									b.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
								}
							}
						}, b.lazy = {
							initialImageLoaded: !1,
							loadImageInSlide: function(e, l) {
								if(void 0 !== e && (void 0 === l && (l = !0), 0 !== b.slides.length)) {
									var d = b.slides.eq(e),
										t = d.find("." + b.params.lazyLoadingClass + ":not(." + b.params.lazyStatusLoadedClass + "):not(." + b.params.lazyStatusLoadingClass + ")");
									!d.hasClass(b.params.lazyLoadingClass) || d.hasClass(b.params.lazyStatusLoadedClass) || d.hasClass(b.params.lazyStatusLoadingClass) || (t = t.add(d[0])), 0 !== t.length && t.each(function() {
										var i = O(this);
										i.addClass(b.params.lazyStatusLoadingClass);
										var s = i.attr("data-background"),
											o = i.attr("data-src"),
											r = i.attr("data-srcset"),
											n = i.attr("data-sizes");
										b.loadImage(i[0], o || s, r, n, !1, function() {
											if(null != b && b) {
												if(s ? (i.css("background-image", 'url("' + s + '")'), i.removeAttr("data-background")) : (r && (i.attr("srcset", r), i.removeAttr("data-srcset")), n && (i.attr("sizes", n), i.removeAttr("data-sizes")), o && (i.attr("src", o), i.removeAttr("data-src"))), i.addClass(b.params.lazyStatusLoadedClass).removeClass(b.params.lazyStatusLoadingClass), d.find("." + b.params.lazyPreloaderClass + ", ." + b.params.preloaderClass).remove(), b.params.loop && l) {
													var e = d.attr("data-swiper-slide-index");
													if(d.hasClass(b.params.slideDuplicateClass)) {
														var t = b.wrapper.children('[data-swiper-slide-index="' + e + '"]:not(.' + b.params.slideDuplicateClass + ")");
														b.lazy.loadImageInSlide(t.index(), !1)
													} else {
														var a = b.wrapper.children("." + b.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
														b.lazy.loadImageInSlide(a.index(), !1)
													}
												}
												b.emit("onLazyImageReady", b, d[0], i[0])
											}
										}), b.emit("onLazyImageLoad", b, d[0], i[0])
									})
								}
							},
							load: function() {
								var e, t = b.params.slidesPerView;
								if("auto" === t && (t = 0), b.lazy.initialImageLoaded || (b.lazy.initialImageLoaded = !0), b.params.watchSlidesVisibility) b.wrapper.children("." + b.params.slideVisibleClass).each(function() {
									b.lazy.loadImageInSlide(O(this).index())
								});
								else if(1 < t)
									for(e = b.activeIndex; e < b.activeIndex + t; e++) b.slides[e] && b.lazy.loadImageInSlide(e);
								else b.lazy.loadImageInSlide(b.activeIndex);
								if(b.params.lazyLoadingInPrevNext)
									if(1 < t || b.params.lazyLoadingInPrevNextAmount && 1 < b.params.lazyLoadingInPrevNextAmount) {
										var a = b.params.lazyLoadingInPrevNextAmount,
											i = t,
											s = Math.min(b.activeIndex + i + Math.max(a, i), b.slides.length),
											o = Math.max(b.activeIndex - Math.max(i, a), 0);
										for(e = b.activeIndex + t; e < s; e++) b.slides[e] && b.lazy.loadImageInSlide(e);
										for(e = o; e < b.activeIndex; e++) b.slides[e] && b.lazy.loadImageInSlide(e)
									} else {
										var r = b.wrapper.children("." + b.params.slideNextClass);
										0 < r.length && b.lazy.loadImageInSlide(r.index());
										var n = b.wrapper.children("." + b.params.slidePrevClass);
										0 < n.length && b.lazy.loadImageInSlide(n.index())
									}
							},
							onTransitionStart: function() {
								b.params.lazyLoading && (!b.params.lazyLoadingOnTransitionStart && (b.params.lazyLoadingOnTransitionStart || b.lazy.initialImageLoaded) || b.lazy.load())
							},
							onTransitionEnd: function() {
								b.params.lazyLoading && !b.params.lazyLoadingOnTransitionStart && b.lazy.load()
							}
						}, b.scrollbar = {
							isTouched: !1,
							setDragPosition: function(e) {
								var t = b.scrollbar,
									a = (b.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - t.track.offset()[b.isHorizontal() ? "left" : "top"] - t.dragSize / 2,
									i = -b.minTranslate() * t.moveDivider,
									s = -b.maxTranslate() * t.moveDivider;
								a < i ? a = i : s < a && (a = s), a = -a / t.moveDivider, b.updateProgress(a), b.setWrapperTranslate(a, !0)
							},
							dragStart: function(e) {
								var t = b.scrollbar;
								t.isTouched = !0, e.preventDefault(), e.stopPropagation(), t.setDragPosition(e), clearTimeout(t.dragTimeout), t.track.transition(0), b.params.scrollbarHide && t.track.css("opacity", 1), b.wrapper.transition(100), t.drag.transition(100), b.emit("onScrollbarDragStart", b)
							},
							dragMove: function(e) {
								var t = b.scrollbar;
								t.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), b.wrapper.transition(0), t.track.transition(0), t.drag.transition(0), b.emit("onScrollbarDragMove", b))
							},
							dragEnd: function() {
								var e = b.scrollbar;
								e.isTouched && (e.isTouched = !1, b.params.scrollbarHide && (clearTimeout(e.dragTimeout), e.dragTimeout = setTimeout(function() {
									e.track.css("opacity", 0), e.track.transition(400)
								}, 1e3)), b.emit("onScrollbarDragEnd", b), b.params.scrollbarSnapOnRelease && b.slideReset())
							},
							draggableEvents: !1 !== b.params.simulateTouch || b.support.touch ? b.touchEvents : b.touchEventsDesktop,
							enableDraggable: function() {
								var e = b.scrollbar,
									t = b.support.touch ? e.track : document;
								O(e.track).on(e.draggableEvents.start, e.dragStart), O(t).on(e.draggableEvents.move, e.dragMove), O(t).on(e.draggableEvents.end, e.dragEnd)
							},
							disableDraggable: function() {
								var e = b.scrollbar,
									t = b.support.touch ? e.track : document;
								O(e.track).off(e.draggableEvents.start, e.dragStart), O(t).off(e.draggableEvents.move, e.dragMove), O(t).off(e.draggableEvents.end, e.dragEnd)
							},
							set: function() {
								if(b.params.scrollbar) {
									var e = b.scrollbar;
									e.track = O(b.params.scrollbar), b.params.uniqueNavElements && "string" == typeof b.params.scrollbar && 1 < e.track.length && 1 === b.container.find(b.params.scrollbar).length && (e.track = b.container.find(b.params.scrollbar)), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = O('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = b.isHorizontal() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = b.size / b.virtualSize, e.moveDivider = e.divider * (e.trackSize / b.size), e.dragSize = e.trackSize * e.divider, b.isHorizontal() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", 1 <= e.divider ? e.track[0].style.display = "none" : e.track[0].style.display = "", b.params.scrollbarHide && (e.track[0].style.opacity = 0)
								}
							},
							setTranslate: function() {
								if(b.params.scrollbar) {
									var e, t = b.scrollbar,
										a = (b.translate, t.dragSize);
									e = (t.trackSize - t.dragSize) * b.progress, b.rtl && b.isHorizontal() ? 0 < (e = -e) ? (a = t.dragSize - e, e = 0) : -e + t.dragSize > t.trackSize && (a = t.trackSize + e) : e < 0 ? (a = t.dragSize + e, e = 0) : e + t.dragSize > t.trackSize && (a = t.trackSize - e), b.isHorizontal() ? (b.support.transforms3d ? t.drag.transform("translate3d(" + e + "px, 0, 0)") : t.drag.transform("translateX(" + e + "px)"), t.drag[0].style.width = a + "px") : (b.support.transforms3d ? t.drag.transform("translate3d(0px, " + e + "px, 0)") : t.drag.transform("translateY(" + e + "px)"), t.drag[0].style.height = a + "px"), b.params.scrollbarHide && (clearTimeout(t.timeout), t.track[0].style.opacity = 1, t.timeout = setTimeout(function() {
										t.track[0].style.opacity = 0, t.track.transition(400)
									}, 1e3))
								}
							},
							setTransition: function(e) {
								b.params.scrollbar && b.scrollbar.drag.transition(e)
							}
						}, b.controller = {
							LinearSpline: function(e, t) {
								var a, i, s, o, r, n = function(e, t) {
									for(i = -1, a = e.length; 1 < a - i;) e[s = a + i >> 1] <= t ? i = s : a = s;
									return a
								};
								this.x = e, this.y = t, this.lastIndex = e.length - 1;
								this.x.length;
								this.interpolate = function(e) {
									return e ? (r = n(this.x, e), o = r - 1, (e - this.x[o]) * (this.y[r] - this.y[o]) / (this.x[r] - this.x[o]) + this.y[o]) : 0
								}
							},
							getInterpolateFunction: function(e) {
								b.controller.spline || (b.controller.spline = b.params.loop ? new b.controller.LinearSpline(b.slidesGrid, e.slidesGrid) : new b.controller.LinearSpline(b.snapGrid, e.snapGrid))
							},
							setTranslate: function(t, e) {
								var a, i, s = b.params.control;

								function o(e) {
									t = e.rtl && "horizontal" === e.params.direction ? -b.translate : b.translate, "slide" === b.params.controlBy && (b.controller.getInterpolateFunction(e), i = -b.controller.spline.interpolate(-t)), i && "container" !== b.params.controlBy || (a = (e.maxTranslate() - e.minTranslate()) / (b.maxTranslate() - b.minTranslate()), i = (t - b.minTranslate()) * a + e.minTranslate()), b.params.controlInverse && (i = e.maxTranslate() - i), e.updateProgress(i), e.setWrapperTranslate(i, !1, b), e.updateActiveIndex()
								}
								if(Array.isArray(s))
									for(var r = 0; r < s.length; r++) s[r] !== e && s[r] instanceof n && o(s[r]);
								else s instanceof n && e !== s && o(s)
							},
							setTransition: function(t, e) {
								var a, i = b.params.control;

								function s(e) {
									e.setWrapperTransition(t, b), 0 !== t && (e.onTransitionStart(), e.wrapper.transitionEnd(function() {
										i && (e.params.loop && "slide" === b.params.controlBy && e.fixLoop(), e.onTransitionEnd())
									}))
								}
								if(Array.isArray(i))
									for(a = 0; a < i.length; a++) i[a] !== e && i[a] instanceof n && s(i[a]);
								else i instanceof n && e !== i && s(i)
							}
						}, b.hashnav = {
							onHashCange: function() {
								var e = document.location.hash.replace("#", "");
								e !== b.slides.eq(b.activeIndex).attr("data-hash") && b.slideTo(b.wrapper.children("." + b.params.slideClass + '[data-hash="' + e + '"]').index())
							},
							attachEvents: function(e) {
								var t = e ? "off" : "on";
								O(window)[t]("hashchange", b.hashnav.onHashCange)
							},
							setHash: function() {
								if(b.hashnav.initialized && b.params.hashnav)
									if(b.params.replaceState && window.history && window.history.replaceState) window.history.replaceState(null, null, "#" + b.slides.eq(b.activeIndex).attr("data-hash") || "");
									else {
										var e = b.slides.eq(b.activeIndex),
											t = e.attr("data-hash") || e.attr("data-history");
										document.location.hash = t || ""
									}
							},
							init: function() {
								if(b.params.hashnav && !b.params.history) {
									b.hashnav.initialized = !0;
									var e = document.location.hash.replace("#", "");
									if(e)
										for(var t = 0, a = b.slides.length; t < a; t++) {
											var i = b.slides.eq(t);
											if((i.attr("data-hash") || i.attr("data-history")) === e && !i.hasClass(b.params.slideDuplicateClass)) {
												var s = i.index();
												b.slideTo(s, 0, b.params.runCallbacksOnInit, !0)
											}
										}
									b.params.hashnavWatchState && b.hashnav.attachEvents()
								}
							},
							destroy: function() {
								b.params.hashnavWatchState && b.hashnav.attachEvents(!0)
							}
						}, b.history = {
							init: function() {
								if(b.params.history) {
									if(!window.history || !window.history.pushState) return b.params.history = !1, void(b.params.hashnav = !0);
									b.history.initialized = !0, this.paths = this.getPathValues(), (this.paths.key || this.paths.value) && (this.scrollToSlide(0, this.paths.value, b.params.runCallbacksOnInit), b.params.replaceState || window.addEventListener("popstate", this.setHistoryPopState))
								}
							},
							setHistoryPopState: function() {
								b.history.paths = b.history.getPathValues(), b.history.scrollToSlide(b.params.speed, b.history.paths.value, !1)
							},
							getPathValues: function() {
								var e = window.location.pathname.slice(1).split("/"),
									t = e.length;
								return {
									key: e[t - 2],
									value: e[t - 1]
								}
							},
							setHistory: function(e, t) {
								if(b.history.initialized && b.params.history) {
									var a = b.slides.eq(t),
										i = this.slugify(a.attr("data-history"));
									window.location.pathname.includes(e) || (i = e + "/" + i), b.params.replaceState ? window.history.replaceState(null, null, i) : window.history.pushState(null, null, i)
								}
							},
							slugify: function(e) {
								return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
							},
							scrollToSlide: function(e, t, a) {
								if(t)
									for(var i = 0, s = b.slides.length; i < s; i++) {
										var o = b.slides.eq(i);
										if(this.slugify(o.attr("data-history")) === t && !o.hasClass(b.params.slideDuplicateClass)) {
											var r = o.index();
											b.slideTo(r, e, a)
										}
									} else b.slideTo(0, e, a)
							}
						}, b.disableKeyboardControl = function() {
							b.params.keyboardControl = !1, O(document).off("keydown", z)
						}, b.enableKeyboardControl = function() {
							b.params.keyboardControl = !0, O(document).on("keydown", z)
						}, b.mousewheel = {
							event: !1,
							lastScrollTime: (new window.Date).getTime()
						}, b.params.mousewheelControl && (b.mousewheel.event = -1 < navigator.userAgent.indexOf("firefox") ? "DOMMouseScroll" : function() {
							var e = "onwheel",
								t = e in document;
							if(!t) {
								var a = document.createElement("div");
								a.setAttribute(e, "return;"), t = "function" == typeof a[e]
							}
							return !t && document.implementation && document.implementation.hasFeature && !0 !== document.implementation.hasFeature("", "") && (t = document.implementation.hasFeature("Events.wheel", "3.0")), t
						}() ? "wheel" : "mousewheel"), b.disableMousewheelControl = function() {
							if(!b.mousewheel.event) return !1;
							var e = b.container;
							return "container" !== b.params.mousewheelEventsTarged && (e = O(b.params.mousewheelEventsTarged)), e.off(b.mousewheel.event, A), !(b.params.mousewheelControl = !1)
						}, b.enableMousewheelControl = function() {
							if(!b.mousewheel.event) return !1;
							var e = b.container;
							return "container" !== b.params.mousewheelEventsTarged && (e = O(b.params.mousewheelEventsTarged)), e.on(b.mousewheel.event, A), b.params.mousewheelControl = !0
						}, b.parallax = {
							setTranslate: function() {
								b.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
									N(this, b.progress)
								}), b.slides.each(function() {
									var e = O(this);
									e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
										N(this, Math.min(Math.max(e[0].progress, -1), 1))
									})
								})
							},
							setTransition: function(a) {
								void 0 === a && (a = b.params.speed), b.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
									var e = O(this),
										t = parseInt(e.attr("data-swiper-parallax-duration"), 10) || a;
									0 === a && (t = 0), e.transition(t)
								})
							}
						}, b.zoom = {
							scale: 1,
							currentScale: 1,
							isScaling: !1,
							gesture: {
								slide: void 0,
								slideWidth: void 0,
								slideHeight: void 0,
								image: void 0,
								imageWrap: void 0,
								zoomMax: b.params.zoomMax
							},
							image: {
								isTouched: void 0,
								isMoved: void 0,
								currentX: void 0,
								currentY: void 0,
								minX: void 0,
								minY: void 0,
								maxX: void 0,
								maxY: void 0,
								width: void 0,
								height: void 0,
								startX: void 0,
								startY: void 0,
								touchesStart: {},
								touchesCurrent: {}
							},
							velocity: {
								x: void 0,
								y: void 0,
								prevPositionX: void 0,
								prevPositionY: void 0,
								prevTime: void 0
							},
							getDistanceBetweenTouches: function(e) {
								if(e.targetTouches.length < 2) return 1;
								var t = e.targetTouches[0].pageX,
									a = e.targetTouches[0].pageY,
									i = e.targetTouches[1].pageX,
									s = e.targetTouches[1].pageY;
								return Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - a, 2))
							},
							onGestureStart: function(e) {
								var t = b.zoom;
								if(!b.support.gestures) {
									if("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
									t.gesture.scaleStart = t.getDistanceBetweenTouches(e)
								}
								t.gesture.slide && t.gesture.slide.length || (t.gesture.slide = O(this), 0 === t.gesture.slide.length && (t.gesture.slide = b.slides.eq(b.activeIndex)), t.gesture.image = t.gesture.slide.find("img, svg, canvas"), t.gesture.imageWrap = t.gesture.image.parent("." + b.params.zoomContainerClass), t.gesture.zoomMax = t.gesture.imageWrap.attr("data-swiper-zoom") || b.params.zoomMax, 0 !== t.gesture.imageWrap.length) ? (t.gesture.image.transition(0), t.isScaling = !0) : t.gesture.image = void 0
							},
							onGestureChange: function(e) {
								var t = b.zoom;
								if(!b.support.gestures) {
									if("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
									t.gesture.scaleMove = t.getDistanceBetweenTouches(e)
								}
								t.gesture.image && 0 !== t.gesture.image.length && (b.support.gestures ? t.scale = e.scale * t.currentScale : t.scale = t.gesture.scaleMove / t.gesture.scaleStart * t.currentScale, t.scale > t.gesture.zoomMax && (t.scale = t.gesture.zoomMax - 1 + Math.pow(t.scale - t.gesture.zoomMax + 1, .5)), t.scale < b.params.zoomMin && (t.scale = b.params.zoomMin + 1 - Math.pow(b.params.zoomMin - t.scale + 1, .5)), t.gesture.image.transform("translate3d(0,0,0) scale(" + t.scale + ")"))
							},
							onGestureEnd: function(e) {
								var t = b.zoom;
								!b.support.gestures && ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2) || t.gesture.image && 0 !== t.gesture.image.length && (t.scale = Math.max(Math.min(t.scale, t.gesture.zoomMax), b.params.zoomMin), t.gesture.image.transition(b.params.speed).transform("translate3d(0,0,0) scale(" + t.scale + ")"), t.currentScale = t.scale, t.isScaling = !1, 1 === t.scale && (t.gesture.slide = void 0))
							},
							onTouchStart: function(e, t) {
								var a = e.zoom;
								a.gesture.image && 0 !== a.gesture.image.length && (a.image.isTouched || ("android" === e.device.os && t.preventDefault(), a.image.isTouched = !0, a.image.touchesStart.x = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX, a.image.touchesStart.y = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY))
							},
							onTouchMove: function(e) {
								var t = b.zoom;
								if(t.gesture.image && 0 !== t.gesture.image.length && (b.allowClick = !1, t.image.isTouched && t.gesture.slide)) {
									t.image.isMoved || (t.image.width = t.gesture.image[0].offsetWidth, t.image.height = t.gesture.image[0].offsetHeight, t.image.startX = b.getTranslate(t.gesture.imageWrap[0], "x") || 0, t.image.startY = b.getTranslate(t.gesture.imageWrap[0], "y") || 0, t.gesture.slideWidth = t.gesture.slide[0].offsetWidth, t.gesture.slideHeight = t.gesture.slide[0].offsetHeight, t.gesture.imageWrap.transition(0), b.rtl && (t.image.startX = -t.image.startX), b.rtl && (t.image.startY = -t.image.startY));
									var a = t.image.width * t.scale,
										i = t.image.height * t.scale;
									if(!(a < t.gesture.slideWidth && i < t.gesture.slideHeight)) {
										if(t.image.minX = Math.min(t.gesture.slideWidth / 2 - a / 2, 0), t.image.maxX = -t.image.minX, t.image.minY = Math.min(t.gesture.slideHeight / 2 - i / 2, 0), t.image.maxY = -t.image.minY, t.image.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, t.image.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !t.image.isMoved && !t.isScaling) {
											if(b.isHorizontal() && Math.floor(t.image.minX) === Math.floor(t.image.startX) && t.image.touchesCurrent.x < t.image.touchesStart.x || Math.floor(t.image.maxX) === Math.floor(t.image.startX) && t.image.touchesCurrent.x > t.image.touchesStart.x) return void(t.image.isTouched = !1);
											if(!b.isHorizontal() && Math.floor(t.image.minY) === Math.floor(t.image.startY) && t.image.touchesCurrent.y < t.image.touchesStart.y || Math.floor(t.image.maxY) === Math.floor(t.image.startY) && t.image.touchesCurrent.y > t.image.touchesStart.y) return void(t.image.isTouched = !1)
										}
										e.preventDefault(), e.stopPropagation(), t.image.isMoved = !0, t.image.currentX = t.image.touchesCurrent.x - t.image.touchesStart.x + t.image.startX, t.image.currentY = t.image.touchesCurrent.y - t.image.touchesStart.y + t.image.startY, t.image.currentX < t.image.minX && (t.image.currentX = t.image.minX + 1 - Math.pow(t.image.minX - t.image.currentX + 1, .8)), t.image.currentX > t.image.maxX && (t.image.currentX = t.image.maxX - 1 + Math.pow(t.image.currentX - t.image.maxX + 1, .8)), t.image.currentY < t.image.minY && (t.image.currentY = t.image.minY + 1 - Math.pow(t.image.minY - t.image.currentY + 1, .8)), t.image.currentY > t.image.maxY && (t.image.currentY = t.image.maxY - 1 + Math.pow(t.image.currentY - t.image.maxY + 1, .8)), t.velocity.prevPositionX || (t.velocity.prevPositionX = t.image.touchesCurrent.x), t.velocity.prevPositionY || (t.velocity.prevPositionY = t.image.touchesCurrent.y), t.velocity.prevTime || (t.velocity.prevTime = Date.now()), t.velocity.x = (t.image.touchesCurrent.x - t.velocity.prevPositionX) / (Date.now() - t.velocity.prevTime) / 2, t.velocity.y = (t.image.touchesCurrent.y - t.velocity.prevPositionY) / (Date.now() - t.velocity.prevTime) / 2, Math.abs(t.image.touchesCurrent.x - t.velocity.prevPositionX) < 2 && (t.velocity.x = 0), Math.abs(t.image.touchesCurrent.y - t.velocity.prevPositionY) < 2 && (t.velocity.y = 0), t.velocity.prevPositionX = t.image.touchesCurrent.x, t.velocity.prevPositionY = t.image.touchesCurrent.y, t.velocity.prevTime = Date.now(), t.gesture.imageWrap.transform("translate3d(" + t.image.currentX + "px, " + t.image.currentY + "px,0)")
									}
								}
							},
							onTouchEnd: function(e) {
								var t = e.zoom;
								if(t.gesture.image && 0 !== t.gesture.image.length) {
									if(!t.image.isTouched || !t.image.isMoved) return t.image.isTouched = !1, void(t.image.isMoved = !1);
									t.image.isTouched = !1, t.image.isMoved = !1;
									var a = 300,
										i = 300,
										s = t.velocity.x * a,
										o = t.image.currentX + s,
										r = t.velocity.y * i,
										n = t.image.currentY + r;
									0 !== t.velocity.x && (a = Math.abs((o - t.image.currentX) / t.velocity.x)), 0 !== t.velocity.y && (i = Math.abs((n - t.image.currentY) / t.velocity.y));
									var l = Math.max(a, i);
									t.image.currentX = o, t.image.currentY = n;
									var d = t.image.width * t.scale,
										c = t.image.height * t.scale;
									t.image.minX = Math.min(t.gesture.slideWidth / 2 - d / 2, 0), t.image.maxX = -t.image.minX, t.image.minY = Math.min(t.gesture.slideHeight / 2 - c / 2, 0), t.image.maxY = -t.image.minY, t.image.currentX = Math.max(Math.min(t.image.currentX, t.image.maxX), t.image.minX), t.image.currentY = Math.max(Math.min(t.image.currentY, t.image.maxY), t.image.minY), t.gesture.imageWrap.transition(l).transform("translate3d(" + t.image.currentX + "px, " + t.image.currentY + "px,0)")
								}
							},
							onTransitionEnd: function(e) {
								var t = e.zoom;
								t.gesture.slide && e.previousIndex !== e.activeIndex && (t.gesture.image.transform("translate3d(0,0,0) scale(1)"), t.gesture.imageWrap.transform("translate3d(0,0,0)"), t.gesture.slide = t.gesture.image = t.gesture.imageWrap = void 0, t.scale = t.currentScale = 1)
							},
							toggleZoom: function(e, t) {
								var a, i, s, o, r, n, l, d, c, p, u, h, m, f, g, v, w = e.zoom;
								w.gesture.slide || (w.gesture.slide = e.clickedSlide ? O(e.clickedSlide) : e.slides.eq(e.activeIndex), w.gesture.image = w.gesture.slide.find("img, svg, canvas"), w.gesture.imageWrap = w.gesture.image.parent("." + e.params.zoomContainerClass)), w.gesture.image && 0 !== w.gesture.image.length && (i = void 0 === w.image.touchesStart.x && t ? (a = "touchend" === t.type ? t.changedTouches[0].pageX : t.pageX, "touchend" === t.type ? t.changedTouches[0].pageY : t.pageY) : (a = w.image.touchesStart.x, w.image.touchesStart.y), w.scale && 1 !== w.scale ? (w.scale = w.currentScale = 1, w.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"), w.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"), w.gesture.slide = void 0) : (w.scale = w.currentScale = w.gesture.imageWrap.attr("data-swiper-zoom") || e.params.zoomMax, t ? (g = w.gesture.slide[0].offsetWidth, v = w.gesture.slide[0].offsetHeight, s = w.gesture.slide.offset().left + g / 2 - a, o = w.gesture.slide.offset().top + v / 2 - i, l = w.gesture.image[0].offsetWidth, d = w.gesture.image[0].offsetHeight, c = l * w.scale, p = d * w.scale, m = -(u = Math.min(g / 2 - c / 2, 0)), f = -(h = Math.min(v / 2 - p / 2, 0)), (r = s * w.scale) < u && (r = u), m < r && (r = m), (n = o * w.scale) < h && (n = h), f < n && (n = f)) : n = r = 0, w.gesture.imageWrap.transition(300).transform("translate3d(" + r + "px, " + n + "px,0)"), w.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + w.scale + ")")))
							},
							attachEvents: function(e) {
								var a = e ? "off" : "on";
								if(b.params.zoom) {
									b.slides;
									var t = !("touchstart" !== b.touchEvents.start || !b.support.passiveListener || !b.params.passiveListeners) && {
										passive: !0,
										capture: !1
									};
									b.support.gestures ? (b.slides[a]("gesturestart", b.zoom.onGestureStart, t), b.slides[a]("gesturechange", b.zoom.onGestureChange, t), b.slides[a]("gestureend", b.zoom.onGestureEnd, t)) : "touchstart" === b.touchEvents.start && (b.slides[a](b.touchEvents.start, b.zoom.onGestureStart, t), b.slides[a](b.touchEvents.move, b.zoom.onGestureChange, t), b.slides[a](b.touchEvents.end, b.zoom.onGestureEnd, t)), b[a]("touchStart", b.zoom.onTouchStart), b.slides.each(function(e, t) {
										0 < O(t).find("." + b.params.zoomContainerClass).length && O(t)[a](b.touchEvents.move, b.zoom.onTouchMove)
									}), b[a]("touchEnd", b.zoom.onTouchEnd), b[a]("transitionEnd", b.zoom.onTransitionEnd), b.params.zoomToggle && b.on("doubleTap", b.zoom.toggleZoom)
								}
							},
							init: function() {
								b.zoom.attachEvents()
							},
							destroy: function() {
								b.zoom.attachEvents(!0)
							}
						}, b._plugins = [], b.plugins) {
						var v = b.plugins[g](b, b.params[g]);
						v && b._plugins.push(v)
					}
					return b.callPlugins = function(e) {
						for(var t = 0; t < b._plugins.length; t++) e in b._plugins[t] && b._plugins[t][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
					}, b.emitterEventListeners = {}, b.emit = function(e) {
						var t;
						if(b.params[e] && b.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]), b.emitterEventListeners[e])
							for(t = 0; t < b.emitterEventListeners[e].length; t++) b.emitterEventListeners[e][t](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
						b.callPlugins && b.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
					}, b.on = function(e, t) {
						return e = B(e), b.emitterEventListeners[e] || (b.emitterEventListeners[e] = []), b.emitterEventListeners[e].push(t), b
					}, b.off = function(e, t) {
						var a;
						if(e = B(e), void 0 === t) return b.emitterEventListeners[e] = [], b;
						if(b.emitterEventListeners[e] && 0 !== b.emitterEventListeners[e].length) {
							for(a = 0; a < b.emitterEventListeners[e].length; a++) b.emitterEventListeners[e][a] === t && b.emitterEventListeners[e].splice(a, 1);
							return b
						}
					}, b.once = function(t, a) {
						t = B(t);
						return b.on(t, function e() {
							a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), b.off(t, e)
						}), b
					}, b.a11y = {
						makeFocusable: function(e) {
							return e.attr("tabIndex", "0"), e
						},
						addRole: function(e, t) {
							return e.attr("role", t), e
						},
						addLabel: function(e, t) {
							return e.attr("aria-label", t), e
						},
						disable: function(e) {
							return e.attr("aria-disabled", !0), e
						},
						enable: function(e) {
							return e.attr("aria-disabled", !1), e
						},
						onEnterKey: function(e) {
							13 === e.keyCode && (O(e.target).is(b.params.nextButton) ? (b.onClickNext(e), b.isEnd ? b.a11y.notify(b.params.lastSlideMessage) : b.a11y.notify(b.params.nextSlideMessage)) : O(e.target).is(b.params.prevButton) && (b.onClickPrev(e), b.isBeginning ? b.a11y.notify(b.params.firstSlideMessage) : b.a11y.notify(b.params.prevSlideMessage)), O(e.target).is("." + b.params.bulletClass) && O(e.target)[0].click())
						},
						liveRegion: O('<span class="' + b.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
						notify: function(e) {
							var t = b.a11y.liveRegion;
							0 !== t.length && (t.html(""), t.html(e))
						},
						init: function() {
							b.params.nextButton && b.nextButton && 0 < b.nextButton.length && (b.a11y.makeFocusable(b.nextButton), b.a11y.addRole(b.nextButton, "button"), b.a11y.addLabel(b.nextButton, b.params.nextSlideMessage)), b.params.prevButton && b.prevButton && 0 < b.prevButton.length && (b.a11y.makeFocusable(b.prevButton), b.a11y.addRole(b.prevButton, "button"), b.a11y.addLabel(b.prevButton, b.params.prevSlideMessage)), O(b.container).append(b.a11y.liveRegion)
						},
						initPagination: function() {
							b.params.pagination && b.params.paginationClickable && b.bullets && b.bullets.length && b.bullets.each(function() {
								var e = O(this);
								b.a11y.makeFocusable(e), b.a11y.addRole(e, "button"), b.a11y.addLabel(e, b.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1))
							})
						},
						destroy: function() {
							b.a11y.liveRegion && 0 < b.a11y.liveRegion.length && b.a11y.liveRegion.remove()
						}
					}, b.init = function() {
						b.params.loop && b.createLoop(), b.updateContainerSize(), b.updateSlidesSize(), b.updatePagination(), b.params.scrollbar && b.scrollbar && (b.scrollbar.set(), b.params.scrollbarDraggable && b.scrollbar.enableDraggable()), "slide" !== b.params.effect && b.effects[b.params.effect] && (b.params.loop || b.updateProgress(), b.effects[b.params.effect].setTranslate()), b.params.loop ? b.slideTo(b.params.initialSlide + b.loopedSlides, 0, b.params.runCallbacksOnInit) : (b.slideTo(b.params.initialSlide, 0, b.params.runCallbacksOnInit), 0 === b.params.initialSlide && (b.parallax && b.params.parallax && b.parallax.setTranslate(), b.lazy && b.params.lazyLoading && (b.lazy.load(), b.lazy.initialImageLoaded = !0))), b.attachEvents(), b.params.observer && b.support.observer && b.initObservers(), b.params.preloadImages && !b.params.lazyLoading && b.preloadImages(), b.params.zoom && b.zoom && b.zoom.init(), b.params.autoplay && b.startAutoplay(), b.params.keyboardControl && b.enableKeyboardControl && b.enableKeyboardControl(), b.params.mousewheelControl && b.enableMousewheelControl && b.enableMousewheelControl(), b.params.hashnavReplaceState && (b.params.replaceState = b.params.hashnavReplaceState), b.params.history && b.history && b.history.init(), b.params.hashnav && b.hashnav && b.hashnav.init(), b.params.a11y && b.a11y && b.a11y.init(), b.emit("onInit", b)
					}, b.cleanupStyles = function() {
						b.container.removeClass(b.classNames.join(" ")).removeAttr("style"), b.wrapper.removeAttr("style"), b.slides && b.slides.length && b.slides.removeClass([b.params.slideVisibleClass, b.params.slideActiveClass, b.params.slideNextClass, b.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), b.paginationContainer && b.paginationContainer.length && b.paginationContainer.removeClass(b.params.paginationHiddenClass), b.bullets && b.bullets.length && b.bullets.removeClass(b.params.bulletActiveClass), b.params.prevButton && O(b.params.prevButton).removeClass(b.params.buttonDisabledClass), b.params.nextButton && O(b.params.nextButton).removeClass(b.params.buttonDisabledClass), b.params.scrollbar && b.scrollbar && (b.scrollbar.track && b.scrollbar.track.length && b.scrollbar.track.removeAttr("style"), b.scrollbar.drag && b.scrollbar.drag.length && b.scrollbar.drag.removeAttr("style"))
					}, b.destroy = function(e, t) {
						b.detachEvents(), b.stopAutoplay(), b.params.scrollbar && b.scrollbar && b.params.scrollbarDraggable && b.scrollbar.disableDraggable(), b.params.loop && b.destroyLoop(), t && b.cleanupStyles(), b.disconnectObservers(), b.params.zoom && b.zoom && b.zoom.destroy(), b.params.keyboardControl && b.disableKeyboardControl && b.disableKeyboardControl(), b.params.mousewheelControl && b.disableMousewheelControl && b.disableMousewheelControl(), b.params.a11y && b.a11y && b.a11y.destroy(), b.params.history && !b.params.replaceState && window.removeEventListener("popstate", b.history.setHistoryPopState), b.params.hashnav && b.hashnav && b.hashnav.destroy(), b.emit("onDestroy"), !1 !== e && (b = null)
					}, b.init(), b
				}

				function w(e) {
					return Math.floor(e)
				}

				function y() {
					var e = b.params.autoplay,
						t = b.slides.eq(b.activeIndex);
					t.attr("data-swiper-autoplay") && (e = t.attr("data-swiper-autoplay") || b.params.autoplay), b.autoplayTimeoutId = setTimeout(function() {
						b.params.loop ? (b.fixLoop(), b._slideNext(), b.emit("onAutoplay", b)) : b.isEnd ? l.autoplayStopOnLast ? b.stopAutoplay() : (b._slideTo(0), b.emit("onAutoplay", b)) : (b._slideNext(), b.emit("onAutoplay", b))
					}, e)
				}

				function M(e, a) {
					var t = O(e.target);
					if(!t.is(a))
						if("string" == typeof a) t = t.parents(a);
						else if(a.nodeType) {
						var i;
						return t.parents().each(function(e, t) {
							t === a && (i = a)
						}), i ? a : void 0
					}
					if(0 !== t.length) return t[0]
				}

				function D(e, t) {
					t = t || {};
					var a = new(window.MutationObserver || window.WebkitMutationObserver)(function(e) {
						e.forEach(function(e) {
							b.onResize(!0), b.emit("onObserverUpdate", b, e)
						})
					});
					a.observe(e, {
						attributes: void 0 === t.attributes || t.attributes,
						childList: void 0 === t.childList || t.childList,
						characterData: void 0 === t.characterData || t.characterData
					}), b.observers.push(a)
				}

				function z(e) {
					e.originalEvent && (e = e.originalEvent);
					var t = e.keyCode || e.charCode;
					if(!b.params.allowSwipeToNext && (b.isHorizontal() && 39 === t || !b.isHorizontal() && 40 === t)) return !1;
					if(!b.params.allowSwipeToPrev && (b.isHorizontal() && 37 === t || !b.isHorizontal() && 38 === t)) return !1;
					if(!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
						if(37 === t || 39 === t || 38 === t || 40 === t) {
							var a = !1;
							if(0 < b.container.parents("." + b.params.slideClass).length && 0 === b.container.parents("." + b.params.slideActiveClass).length) return;
							var i = window.pageXOffset,
								s = window.pageYOffset,
								o = window.innerWidth,
								r = window.innerHeight,
								n = b.container.offset();
							b.rtl && (n.left = n.left - b.container[0].scrollLeft);
							for(var l = [
									[n.left, n.top],
									[n.left + b.width, n.top],
									[n.left, n.top + b.height],
									[n.left + b.width, n.top + b.height]
								], d = 0; d < l.length; d++) {
								var c = l[d];
								c[0] >= i && c[0] <= i + o && c[1] >= s && c[1] <= s + r && (a = !0)
							}
							if(!a) return
						}
						b.isHorizontal() ? (37 !== t && 39 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), (39 === t && !b.rtl || 37 === t && b.rtl) && b.slideNext(), (37 === t && !b.rtl || 39 === t && b.rtl) && b.slidePrev()) : (38 !== t && 40 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === t && b.slideNext(), 38 === t && b.slidePrev()), b.emit("onKeyPress", b, t)
					}
				}

				function A(e) {
					e.originalEvent && (e = e.originalEvent);
					var t = 0,
						a = b.rtl ? -1 : 1,
						i = function(e) {
							var t = 0,
								a = 0,
								i = 0,
								s = 0;
							return "detail" in e && (a = e.detail), "wheelDelta" in e && (a = -e.wheelDelta / 120), "wheelDeltaY" in e && (a = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = a, a = 0), i = 10 * t, s = 10 * a, "deltaY" in e && (s = e.deltaY), "deltaX" in e && (i = e.deltaX), (i || s) && e.deltaMode && (1 === e.deltaMode ? (i *= 40, s *= 40) : (i *= 800, s *= 800)), i && !t && (t = i < 1 ? -1 : 1), s && !a && (a = s < 1 ? -1 : 1), {
								spinX: t,
								spinY: a,
								pixelX: i,
								pixelY: s
							}
						}(e);
					if(b.params.mousewheelForceToAxis)
						if(b.isHorizontal()) {
							if(!(Math.abs(i.pixelX) > Math.abs(i.pixelY))) return;
							t = i.pixelX * a
						} else {
							if(!(Math.abs(i.pixelY) > Math.abs(i.pixelX))) return;
							t = i.pixelY
						}
					else t = Math.abs(i.pixelX) > Math.abs(i.pixelY) ? -i.pixelX * a : -i.pixelY;
					if(0 !== t) {
						if(b.params.mousewheelInvert && (t = -t), b.params.freeMode) {
							var s = b.getWrapperTranslate() + t * b.params.mousewheelSensitivity,
								o = b.isBeginning,
								r = b.isEnd;
							if(s >= b.minTranslate() && (s = b.minTranslate()), s <= b.maxTranslate() && (s = b.maxTranslate()), b.setWrapperTransition(0), b.setWrapperTranslate(s), b.updateProgress(), b.updateActiveIndex(), (!o && b.isBeginning || !r && b.isEnd) && b.updateClasses(), b.params.freeModeSticky ? (clearTimeout(b.mousewheel.timeout), b.mousewheel.timeout = setTimeout(function() {
									b.slideReset()
								}, 300)) : b.params.lazyLoading && b.lazy && b.lazy.load(), b.emit("onScroll", b, e), b.params.autoplay && b.params.autoplayDisableOnInteraction && b.stopAutoplay(), 0 === s || s === b.maxTranslate()) return
						} else {
							if(60 < (new window.Date).getTime() - b.mousewheel.lastScrollTime)
								if(t < 0)
									if(b.isEnd && !b.params.loop || b.animating) {
										if(b.params.mousewheelReleaseOnEdges) return !0
									} else b.slideNext(), b.emit("onScroll", b, e);
							else if(b.isBeginning && !b.params.loop || b.animating) {
								if(b.params.mousewheelReleaseOnEdges) return !0
							} else b.slidePrev(), b.emit("onScroll", b, e);
							b.mousewheel.lastScrollTime = (new window.Date).getTime()
						}
						return e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
					}
				}

				function N(e, t) {
					var a, i, s;
					e = O(e);
					var o = b.rtl ? -1 : 1;
					a = e.attr("data-swiper-parallax") || "0", i = e.attr("data-swiper-parallax-x"), s = e.attr("data-swiper-parallax-y"), i || s ? (i = i || "0", s = s || "0") : b.isHorizontal() ? (i = a, s = "0") : (s = a, i = "0"), i = 0 <= i.indexOf("%") ? parseInt(i, 10) * t * o + "%" : i * t * o + "px", s = 0 <= s.indexOf("%") ? parseInt(s, 10) * t + "%" : s * t + "px", e.transform("translate3d(" + i + ", " + s + ",0px)")
				}

				function B(e) {
					return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
				}
			};
			l.prototype = {
				isSafari: (n = window.navigator.userAgent.toLowerCase(), 0 <= n.indexOf("safari") && n.indexOf("chrome") < 0 && n.indexOf("android") < 0),
				isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
				isArray: function(e) {
					return "[object Array]" === Object.prototype.toString.apply(e)
				},
				browser: {
					ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
					ieTouch: window.navigator.msPointerEnabled && 1 < window.navigator.msMaxTouchPoints || window.navigator.pointerEnabled && 1 < window.navigator.maxTouchPoints,
					lteIE9: (r = document.createElement("div"), r.innerHTML = "\x3c!--[if lte IE 9]><i></i><![endif]--\x3e", 1 === r.getElementsByTagName("i").length)
				},
				device: (t = window.navigator.userAgent, a = t.match(/(Android);?[\s\/]+([\d.]+)?/), i = t.match(/(iPad).*OS\s([\d_]+)/), s = t.match(/(iPod)(.*OS\s([\d_]+))?/), o = !i && t.match(/(iPhone\sOS|iOS)\s([\d_]+)/), {
					ios: i || o || s,
					android: a
				}),
				support: {
					touch: window.Modernizr && !0 === Modernizr.touch || !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch),
					transforms3d: window.Modernizr && !0 === Modernizr.csstransforms3d || (e = document.createElement("div").style, "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e),
					flexbox: function() {
						for(var e = document.createElement("div").style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), a = 0; a < t.length; a++)
							if(t[a] in e) return !0
					}(),
					observer: "MutationObserver" in window || "WebkitMutationObserver" in window,
					passiveListener: function() {
						var e = !1;
						try {
							var t = Object.defineProperty({}, "passive", {
								get: function() {
									e = !0
								}
							});
							window.addEventListener("testPassiveListener", null, t)
						} catch(e) {}
						return e
					}(),
					gestures: "ongesturestart" in window
				},
				plugins: {}
			};
			for(var d, c = ["jQuery", "Zepto", "Dom7"], p = 0; p < c.length; p++) window[c[p]] && u(window[c[p]]);

			function u(e) {
				e.fn.swiper = function(t) {
					var a;
					return e(this).each(function() {
						var e = new l(this, t);
						a = a || e
					}), a
				}
			}(d = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7) && ("transitionEnd" in d.fn || (d.fn.transitionEnd = function(t) {
				var a, i = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
					s = this;

				function o(e) {
					if(e.target === this)
						for(t.call(this, e), a = 0; a < i.length; a++) s.off(i[a], o)
				}
				if(t)
					for(a = 0; a < i.length; a++) s.on(i[a], o);
				return this
			}), "transform" in d.fn || (d.fn.transform = function(e) {
				for(var t = 0; t < this.length; t++) {
					var a = this[t].style;
					a.webkitTransform = a.MsTransform = a.msTransform = a.MozTransform = a.OTransform = a.transform = e
				}
				return this
			}), "transition" in d.fn || (d.fn.transition = function(e) {
				"string" != typeof e && (e += "ms");
				for(var t = 0; t < this.length; t++) {
					var a = this[t].style;
					a.webkitTransitionDuration = a.MsTransitionDuration = a.msTransitionDuration = a.MozTransitionDuration = a.OTransitionDuration = a.transitionDuration = e
				}
				return this
			}), "outerWidth" in d.fn || (d.fn.outerWidth = function(e) {
				return 0 < this.length ? e ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
			})), window.Swiper = l
		}(), void 0 !== t ? t.exports = window.Swiper : "function" == typeof define && define.amd && define([], function() {
			return window.Swiper
		})
	}, {}],
	12: [function(e, t, a) {
		"use strict";
		var f, i = 0;

		function g(e, t, a, i, s) {
			for(var o = 0, r = 0, n = 0; n < e.length; n++) /\n/.test(e[n]) ? (s.fillText(e.substring(r, n).replace(/^\n/, ""), t, a), a += i + 20, o = 0, r = n) : (560 < (o += s.measureText(e[n]).width) && (s.fillText(e.substring(r, n).replace(/^\n/, ""), t, a), a += i, o = 0, r = n), n == e.length - 1 && (s.fillText(e.substring(r, n + 1).replace(/^\n/, ""), t, a), a += i));
			return a
		}
		t.exports = {
			loadFont: function() {
				if(!i) {
					var e = document.getElementsByTagName("head")[0],
						t = document.createElement("link");
					t.href = "https://fonts.googleapis.com/css?family=Noto+Sans+SC|Noto+Serif+SC:900&display=swap", t.rel = "stylesheet", t.type = "text/css", e.appendChild(t), i = 1
				}
			},
			buildCanvas: function d(c) {
				if(f && clearTimeout(f), c.num && 20 < c.num) return !1;
				var p = document.createElement("canvas"),
					u = p.getContext("2d");
				p.width = 640, p.height = 1e4;
				var h = 0;
				u.fillStyle = "#fff", u.fillRect(0, 0, p.width, p.height);
				var m = new Image;
				m.crossOrigin = "anonymous", c.head.match(/^\/\//) && (c.head = window.location.protocol + c.head), m.src = c.head, m.onerror = function(e) {
					wpcom_alert("生成海报图片失败"), $(".mobile-share-bg,.mobile-share-wrap").remove()
				}, m.onload = function() {
					h += 640 / m.width * m.height, u.drawImage(this, 0, 0, m.width, m.height, 0, 0, 640, 640 / m.width * m.height);
					var e = new Date(1e3 * c.timestamp),
						t = e.getDate(),
						a = e.getFullYear(),
						i = e.getMonth() + 1;
					t = t < 10 ? "0" + t : "" + t, i = a + "/" + (i = i < 10 ? "0" + i : "" + i);
					var s = 0,
						o = 0;
					if(!c.time_style) {
						u.fillStyle = "#fff", u.textAlign = "center", u.font = "68px Noto Sans SC";
						for(var r = 0; r < t.length; r++) s += u.measureText(t[r]).width;
						for(u.fillText(t, 80, h - 72), u.fillStyle = "#fff", u.textAlign = "center", u.font = "30px Noto Sans SC", r = 0; r < i.length; r++) o += u.measureText(i[r]).width;
						u.fillText(i, 80, h - 28);
						var n = parseInt(s < o ? o : s);
						u.moveTo(80 - n / 2, h - 60), u.lineTo(80 - n / 2 + n, h - 60), u.lineWidth = 1, u.strokeStyle = "rgba(255,255,255, 1)", u.stroke()
					}
					u.fillStyle = "#000", u.textAlign = c.title_align ? c.title_align : "center", u.font = "900 40px Noto Serif SC", h += 80, h = g(jQuery("<div>").html(c.title).text(), "left" === u.textAlign ? 30 : 320, h, 54, u), "1" == c.time_style && (u.fillStyle = "#666", u.font = "400 28px FontAwesome, Noto Sans SC", h += 20, h = g(" " + c.time, "left" === u.textAlign ? 30 : 320, h, 44, u)), u.textAlign = "left", u.fillStyle = "#333", u.font = "400 28px Noto Sans SC", h += 30, h = g(jQuery("<div>").html(c.excerpt).text(), 30, h, 44, u), h += 40, u.lineWidth = 1, u.beginPath(), u.setLineDash([7, 7]), u.strokeStyle = "#ccc", u.moveTo(0, h), u.lineTo(640, h), u.stroke();
					var l = new Image;
					l.crossOrigin = "anonymous", c.logo.match(/^\/\//) && (c.logo = window.location.protocol + c.logo), l.src = c.logo, l.onerror = function(e) {
						wpcom_alert("生成海报图片失败"), $(".mobile-share-bg,.mobile-share-wrap").remove()
					}, l.onload = function() {
						h += 40;
						var i = 400 / l.width * l.height;
						i = 100 < i ? 100 : i;
						var e = l.width / (l.height / i);
						i = (e = 400 < e ? 400 : e) / l.width * l.height, u.drawImage(this, 0, 0, l.width, l.height, 30, h + (100 - i) / 2, e, i);
						var s = new Image;
						s.src = c.qrcode, s.onerror = function(e) {
							wpcom_alert("生成海报图片失败"), $(".mobile-share-bg,.mobile-share-wrap").remove()
						}, s.onload = function() {
							u.drawImage(this, 0, 0, s.width, s.height, 510, h, 100, 100 / s.width * s.height);
							var e = 100 / s.width * s.height;
							h += i < e ? e : i, h += 40;
							var t = u.getImageData(0, 0, 640, h);
							p.height = h, u.putImageData(t, 0, 0);
							var a = p.toDataURL("image/jpeg", 1);
							c.callback(a), f = setTimeout(function() {
								u.clearRect(0, 0, p.width, p.height), c.num = c.num ? c.num + 1 : 1, d(c)
							}, 500)
						}
					}
				}
			}
		}
	}, {}],
	13: [function(e, t, a) {
		"use strict";
		Object.defineProperty(a, "__esModule", {
			value: !0
		}), a.default = void 0;
		var i = {
			init: function() {
				if(!this.is_mobile() && _wpcom_js.user_card) {
					var i = this;
					jQuery(document).on("mouseenter", ".j-user-card", function() {
						i.timer && clearTimeout(i.timer), i.timer2 && clearTimeout(i.timer2);
						var a = this;
						i.timer = setTimeout(function() {
							var t = jQuery(a),
								e = t.data("user");
							e && (i.show_card(t), i.get_data(e, function(e) {
								i.render_card(e, t)
							}))
						}, 500)
					}).on("mouseleave", ".j-user-card", function() {
						i.timer && clearTimeout(i.timer), i.timer2 && clearTimeout(i.timer2), i.hide_card()
					}).on("mouseenter", "#j-user-card", function() {
						i.timer && clearTimeout(i.timer), i.timer2 && clearTimeout(i.timer2)
					}).on("mouseleave", "#j-user-card", function() {
						i.timer && clearTimeout(i.timer), i.timer2 && clearTimeout(i.timer2), i.hide_card()
					})
				}
			},
			get_data: function(e, t) {
				jQuery.ajax({
					type: "POST",
					url: _wpcom_js.ajaxurl,
					data: {
						action: "wpcom_user_card",
						user: e
					},
					dataType: "json",
					success: function(e) {
						t(e.html)
					}
				})
			},
			show_card: function(e) {
				var t = jQuery("#j-user-card"),
					a = t.length ? t : jQuery('<div id="j-user-card" class="user-card-wrap"><div class="user-card-loading"><img src="' + _wpcom_js.theme_url + '/images/loading-dots.gif" alt="loading"></div></div>');
				t.length || jQuery("body").append(a);
				var i = this.get_style(e, !a.find(".user-card-loading").length);
				a.css(i), t.length || a.fadeIn(200)
			},
			hide_card: function() {
				this.timer2 = setTimeout(function() {
					jQuery("#j-user-card").fadeOut(200, function() {
						jQuery("#j-user-card").remove()
					})
				}, 300)
			},
			render_card: function(e, t) {
				var a = jQuery("#j-user-card");
				a.html(e);
				var i = this.get_style(t, 1);
				a.css(i)
			},
			get_style: function(e, t) {
				var a = e.offset(),
					i = jQuery(window),
					s = 0;
				if(i.height() - (a.top - i.scrollTop() + e.outerHeight()) < 245) {
					var o = t ? _wpcom_js.user_card_height ? _wpcom_js.user_card_height : 238 : 180;
					s = a.top - o - 5
				} else s = a.top + e.outerHeight() + 5;
				return {
					left: a.left,
					top: s
				}
			},
			is_mobile: function() {
				return /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
			}
		};
		a.default = i
	}, {}],
	14: [function(e, t, a) {
		"use strict";
		var b = n(e("../../../Themer/src/js/text-image")),
			d = n(e("../../../Themer/src/js/social-share")),
			i = n(e("../../../Themer/src/js/message")),
			s = n(e("../../../Themer/src/js/notification")),
			o = n(e("../../../Themer/src/js/follow")),
			r = n(e("../../../Themer/src/js/user-card"));

		function n(e) {
			return e && e.__esModule ? e : {
				default: e
			}
		}
		e("../../../Themer/src/js/bootstrap"), e("../../../Themer/src/js/swiper.jquery"), e("../../../Themer/src/js/member"), e("../../../Themer/src/js/common"), e("../../../Themer/src/js/jquery.qrcode.min"),
			function(m) {
				var f = m(window),
					g = f.height(),
					l = 0,
					v = void 0 !== _wpcom_js.webp && _wpcom_js.webp ? _wpcom_js.webp : null,
					w = m(".navbar-toggle").is(":hidden");
				i.default.init(), s.default.init(), o.default.init(), r.default.init(), window.kx_share = function(e) {
					var t = m(e).closest(".kx-item");
					if(t.length && t.hasClass("entry-footer")) return t = m(".entry"), {
						title: m.trim(t.find(".entry-title").text()),
						description: m.trim(t.find(".entry-content").text()).replace("[原文链接]", ""),
						url: window.location.href,
						image: t.find(".entry-content img").attr("src")
					};
					if(t.length) {
						var a = (t.find(".kx-title").length ? t.find(".kx-title").text() : t.find(".kx-content h2").text()).match(/^\s*([^\s]+)\s*$/);
						return {
							title: a && a[1] ? a[1] : "",
							description: m.trim(t.find(".kx-content p").text()).replace("[原文链接]", ""),
							url: t.find(".kx-meta").data("url"),
							image: t.find(".kx-content img").length ? t.find(".kx-content img").attr("src") : ""
						}
					}
				}, m(document).ready(function() {
					a(), f.resize(function() {
						w = m(".navbar-toggle").is(":hidden"), g = f.height(), m(document).trigger("DOMSubtreeModified"), a()
					}), new Swiper(".swiper-container", {
						onInit: function(e) {
							m(e.container[0]).on("click", ".swiper-button-next", function() {
								e.slideNext()
							}).on("click", ".swiper-button-prev", function() {
								e.slidePrev()
							}).find(".j-lazy").lazyload({
								webp: v,
								threshold: 250,
								effect: "fadeIn"
							}), setTimeout(function() {
								jQuery(window).trigger("scroll")
							}, 800)
						},
						pagination: ".swiper-pagination",
						paginationClickable: !0,
						simulateTouch: !1,
						loop: !0,
						autoplay: _wpcom_js.slide_speed ? _wpcom_js.slide_speed : 5e3,
						effect: "slide",
						onSlideChangeEnd: function() {
							jQuery(window).trigger("scroll")
						}
					});
					var e = m(".entry .entry-video");
					e.length && e.height(parseInt(e.width() / (860 / (void 0 !== _wpcom_js.video_height ? _wpcom_js.video_height : 483))));
					var t = m(".sidebar");

					function a() {
						if(!w)
							for(var e = m("header li.dropdown"), t = 0; t < e.length; t++) {
								var a = m(e[t]);
								0 == a.find(".m-dropdown").length && a.append('<div class="m-dropdown"><i class="fa fa-angle-down"></i></div>')
							}
					}
					m(document).on("DOMNodeInserted", ".navbar-action", function() {
						a()
					}), m(".modules-navs").each(function(e, t) {
						var a = m(t),
							i = 0,
							s = a.find(".list-navs>.navs-link");
						s.outerHeight(""), s.each(function(e, t) {
							var a = m(t).outerHeight();
							i < a && (i = a)
						}), s.outerHeight(i)
					});
					var i = m("#wrap"),
						s = i.height(),
						o = m("footer.footer"),
						r = m(".member-form-wrap");
					if(m(document).on("DOMSubtreeModified", function() {
							if(i.css("min-height", g - i.offset().top - o.outerHeight()), s = i.height(), r.length && m(".page-no-sidebar").length) {
								r.outerHeight();
								var e = (s - r.outerHeight()) / 2 - 30;
								r.css("margin-top", e <= 30 ? 30 : e)
							}
						}).on("click", ".j-mobile-share", function() {
							var s = m(this),
								e = s.data("id"),
								t = '<div class="mobile-share-bg"><div class="top_tips">请长按图片，将内容推荐给好友</div></div><div class="mobile-share-wrap"><div class="loading"><img src="' + (void 0 !== _wpcom_js.framework_url ? _wpcom_js.framework_url : _wpcom_js.theme_url + "/themer") + '/assets/images/loading.gif">分享海报生成中...</div></div>';
							m("body").append(t), b.default.loadFont(), m.ajax({
								url: _wpcom_js.ajaxurl,
								data: {
									id: e,
									action: "wpcom_mobile_share"
								},
								method: "POST",
								dataType: "json",
								timeout: 1e4,
								success: function(e) {
									e.callback = function(e) {
										var t = m(".mobile-share-wrap");
										t.find(".mobile-share-close").length ? t.find("img").attr("src", e) : t.html('<img src="' + e + '"><div class="mobile-share-close">×</div>'), m(".mobile-share-bg .top_tips").show()
									};
									var t = m(".meta-item.wechat");
									if((t = t.length ? t : s.closest(".kx-meta").find(".j-share-qrcode")).find("canvas")[0]) e.qrcode = t.find("canvas")[0].toDataURL();
									else {
										var a = m('<div style="display: none;"></div>');
										m("body").append(a);
										var i = s.data("qrcode") ? s.data("qrcode") : location.href;
										a.qrcode({
											text: i
										}), e.qrcode = a.find("canvas")[0].toDataURL(), a.remove()
									}
									e.head && e.logo && e.qrcode ? b.default.buildCanvas(e) : (m(".mobile-share-bg,.mobile-share-wrap").remove(), setTimeout(function() {
										wpcom_alert("生成分享海报失败")
									}, 50))
								},
								error: function() {
									m(".mobile-share-bg,.mobile-share-wrap").remove(), setTimeout(function() {
										wpcom_alert("获取分享海报失败")
									}, 50)
								}
							})
						}).on("click", ".mobile-share-close", function() {
							m(".mobile-share-bg,.mobile-share-wrap").remove()
						}).on("click", ".kx-new", function() {
							window.location.href = window.location.href
						}).on("click", ".widget-kx-list .kx-title", function() {
							var e = m(this);
							e.next().slideToggle("fast"), e.closest(".kx-item").toggleClass("active"), f.trigger("scroll")
						}).on("wpcom_not_login", function() {
							! function() {
								if(0 === m("#login-modal").length) {
									var e = _wpcom_js.login_url,
										t = _wpcom_js.register_url,
										a = '<div class="modal fade" id="login-modal">\n    <div class="modal-dialog modal-sm">\n        <div class="modal-content">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>\n                <h4 class="modal-title">请登录</h4>\n            </div>\n            <div class="modal-body login-modal-body">\n                <p>您还未登录，请登录后再进行相关操作！</p>\n                <div class="login-btn">\n                    <a class="btn btn-login" href="' + e + '">登 录</a>\n                    <a class="btn btn-register" href="' + t + '">注 册</a>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>';
									m("body").append(a)
								}
							}()
						}).trigger("DOMSubtreeModified"), t.length && t.find(".widget").length && 991 < f.width())
						for(var n = 0; n < t.length; n++) y(m(t[n]));
					var l = m(".kx-list");
					if(l.length) {
						var d;
						window.kxDate = l.find(".kx-date"), d = m("#wpadminbar").length ? m("#wpadminbar").outerHeight() + m("header.header").outerHeight() : m("header.header").outerHeight();
						var c = kxDate.first().offset().top,
							p = {
								$el: null
							},
							u = m(".kx-new"),
							h = kxDate.first().outerHeight();
						f.scroll(function() {
							var s = f.scrollTop(),
								o = kxDate.length - 1;
							m.each(kxDate, function(e, t) {
								var a = m(t),
									i = a.offset().top - s - d;
								return 0 < i && p.$el && p.top < 0 ? (kxDate.removeClass("fixed").css("width", "auto"), p.$el.addClass("fixed").css("top", d).css("width", l.outerWidth()), u.addClass("fixed").css("top", d + 36), void l.css("padding-top", h)) : (0 == e && i <= 0 ? s <= c - d ? (kxDate.removeClass("fixed").css("width", "auto"), u.removeClass("fixed"), l.css("padding-top", 0)) : (kxDate.removeClass("fixed").css("width", "auto"), a.addClass("fixed").css("top", d).css("width", l.outerWidth()), u.addClass("fixed").css("top", d + 36), l.css("padding-top", h)) : e == o && i <= 0 && (kxDate.removeClass("fixed").css("width", "auto"), a.addClass("fixed").css("top", d).css("width", l.outerWidth()), u.addClass("fixed").css("top", d + 36), l.css("padding-top", h)), p.$el = a, void(p.top = i))
							})
						}), setInterval(function() {
							var e = m(".kx-item").first().data("id");
							m.ajax({
								url: _wpcom_js.ajaxurl,
								data: {
									id: e,
									action: "wpcom_new_kuaixun"
								},
								method: "POST",
								dataType: "text",
								success: function(e) {
									1 <= e && m(".kx-new").html("您有" + e + "条新消息！").show()
								}
							})
						}, 1e4)
					}
					m(".kx-list,.widget-kx-list,.entry-footer").on("click", ".share-icon", function() {
						var e = m(this),
							t = kx_share(this);
						if(t && e.hasClass("copy"))
							if(void 0 !== document.execCommand) {
								var a = t.title + "\r\n" + t.description + "\r\n" + decodeURIComponent(t.url),
									i = document.createElement("textarea");
								i.value = a, m("body").append(i), i.style.position = "fixed", i.style.height = 0, i.select(), document.execCommand("copy"), i.remove(), wpcom_alert("复制成功！")
							} else wpcom_alert("浏览器暂不支持拷贝功能")
					})
				}), m(".navbar-search").on("click", ".j-navbar-search", function() {
					var e = m(this).parent();
					w ? e.hasClass("active") ? e.submit() : (e.addClass("active"), e.find(".navbar-search-input").focus()) : e.submit()
				}).on("keydown", ".navbar-search-input", function() {
					m(this).parent().removeClass("warning")
				}).on("submit", function() {
					var e = m(this);
					if("" == m.trim(e.find(".navbar-search-input").val())) return e.addClass("warning"), e.find(".navbar-search-input").focus(), !1
				}), m(document).on("click", function(e) {
					0 == m(e.target).closest(".navbar-search").length && m(".navbar-search").removeClass("active warning")
				}), m("body").on("click", "#j-reading-back", function() {
					m("body").removeClass("reading"), m(this).remove(), f.trigger("scroll")
				}).on("click", "#j-reading", function() {
					m("body").addClass("reading").append('<div class="reading-back" id="j-reading-back"><i class="fa fa-reply"></i></div>')
				}), m(".entry").on("click", ".btn-zan", function() {
					var t = m(this);
					if(!t.hasClass("liked")) {
						var e = t.data("id");
						m.ajax({
							type: "POST",
							url: _wpcom_js.ajaxurl,
							data: {
								action: "wpcom_like_it",
								id: e
							},
							dataType: "json",
							success: function(e) {
								0 == e.result ? t.addClass("liked").find("span").html("(" + e.likes + ")") : -2 == e.result && t.addClass("liked")
							}
						})
					}
				}).on("click", ".j-heart", function() {
					var t = m(this),
						e = t.data("id");
					m.ajax({
						type: "POST",
						url: _wpcom_js.ajaxurl,
						data: {
							action: "wpcom_heart_it",
							id: e
						},
						dataType: "json",
						success: function(e) {
							0 == e.result ? t.addClass("hearted").find("span").html(e.favorites) : 1 == e.result ? t.removeClass("hearted").find("span").html(e.favorites) : -1 == e.result && m("#login-modal").modal()
						}
					})
				}), m("#commentform").on("submit", function() {
					var e = m(".comment-form-comment textarea"),
						i = 0,
						s = 0,
						t = m(this).find("input.required");
					if("" == m.trim(e.val()) && (e.addClass("error").focus(), i = s = 1), t.each(function(e, t) {
							var a = m(t);
							"" == m.trim(a.val()) && (a.addClass("error"), 0 == s && (a.focus(), s = 1), i = 1)
						}), i) return !1
				}).on("keydown", ".required", function() {
					m(this).removeClass("error")
				}), m("#comments, #reviews").on("click", ".comment-must-login,#must-submit,.comment-reply-login", function() {
					return m("#login-modal").modal(), !1
				});
				var a = m(".entry-bar");

				function e() {
					var e = a.offset().top,
						t = a.outerHeight();
					f.scrollTop() + g < e + t ? (a.addClass("fixed"), a.find(".entry-bar-inner").css("width", m(".main").width())) : a.removeClass("fixed")
				}

				function y(t) {
					var e = t.parent(),
						a = e.offset().top,
						i = 0,
						s = 0,
						o = 0,
						r = t.closest(".container").find(".main");
					setTimeout(function() {
						a = e.offset().top + parseInt(e.css("paddingTop")), i = t.outerHeight()
					}, 2e3), r.length && (m(document).on("DOMSubtreeModified", function() {
						i = t.outerHeight(), o = r.outerHeight(), a = e.offset().top + parseInt(e.css("paddingTop")), s = r.offset().top + o
					}), f.scroll(function() {
						if(!(o <= i)) {
							var e = f.scrollTop();
							i < g - a ? s < e + i + a ? t.removeClass("fixed").addClass("abs").css({
								bottom: 0,
								top: "auto"
							}) : t.removeClass("abs").addClass("fixed").css({
								bottom: "auto",
								top: a
							}) : s < e + g ? t.addClass("abs").removeClass("fixed") : a + i < e + g ? t.addClass("fixed").removeClass("abs") : t.removeClass("fixed").removeClass("abs")
						}
					}))
				}
				a.length && 767 < f.width() && (e(), f.scroll(function() {
					e()
				})), m("#wrap").on("click", ".j-newslist .tab", function() {
					var a = m(this),
						e = a.parent(),
						i = a.closest(".main-list").find(".tab-wrap");
					e.find(".tab").removeClass("active"), a.addClass("active"), i.removeClass("active"), i.eq(a.index()).addClass("active");
					var t = a.find("a").data("id");
					if(t && 1 != a.data("loaded")) {
						i.eq(a.index()).addClass("loading");
						var s = e.data("type"),
							o = e.data("per_page");
						m.ajax({
							type: "POST",
							url: _wpcom_js.ajaxurl,
							data: {
								action: "wpcom_load_posts",
								id: t,
								type: s || "default",
								per_page: o
							},
							dataType: "html",
							success: function(e) {
								if(i.eq(a.index()).removeClass("loading"), "0" == e) i.eq(a.index()).html('<li class="item"><p style="text-align: center;color:#999;margin:10px 0;">暂无内容</p></li>');
								else {
									var t = m(e);
									i.eq(a.index()).html(t), t.find(".j-lazy").lazyload({
										webp: v,
										threshold: 250,
										effect: "fadeIn"
									}), m(window).trigger("scroll")
								}
								a.data("loaded", 1)
							},
							error: function() {
								i.eq(a.index()).html('<li class="item"><p style="text-align: center;color:#999;margin:10px 0;">加载失败，请稍后再试！</p></li>'), i.eq(a.index()).removeClass("loading")
							}
						})
					}
				}).on("click", ".j-load-more, .j-user-posts, .j-user-comments, .j-user-favorites, .j-user-follows, .j-user-followers, .j-load-kx", function() {
					if(!l) {
						l = 1;
						var o = m(this);
						if(o.hasClass("disabled")) l = 0;
						else {
							var e = null,
								r = o.data("page");
							if(r = void 0 !== r ? r + 1 : 2, o.hasClass("j-user-posts")) e = {
								action: "wpcom_user_posts",
								user: (t = m(".profile-posts-list").data("user")) || 0,
								page: r
							};
							else if(o.hasClass("j-user-comments")) {
								e = {
									action: "wpcom_user_comments",
									user: (t = m(".profile-comments-list").data("user")) || 0,
									page: r
								}
							} else if(o.hasClass("j-user-favorites")) {
								e = {
									action: "wpcom_user_favorites",
									user: (t = m(".profile-favorites-list").data("user")) || 0,
									page: r
								}
							} else if(o.hasClass("j-user-follows")) {
								e = {
									action: "wpcom_user_follows",
									user: (t = m(".profile-tab").data("user")) || 0,
									page: r
								}
							} else if(o.hasClass("j-user-followers")) {
								e = {
									action: "wpcom_user_followers",
									user: (t = m(".profile-tab").data("user")) || 0,
									page: r
								}
							} else if(o.hasClass("j-load-kx")) e = {
								action: "wpcom_load_kuaixun",
								page: r
							};
							else {
								var t = o.data("id"),
									a = o.data("exclude"),
									i = o.closest(".main-list").find(".j-newslist"),
									s = i.data("type"),
									n = i.data("per_page");
								e = {
									action: "wpcom_load_posts",
									id: t,
									page: r,
									type: s || "default",
									per_page: n,
									exclude: a
								}
							}
							o.parent().addClass("loading"), m.ajax({
								type: "POST",
								url: _wpcom_js.ajaxurl,
								data: e,
								dataType: "html",
								success: function(e, t, a) {
									if("0" == e) {
										if(o.addClass("disabled").text("已经到底了"), o.hasClass("j-user-followers"))(s = o.closest(".profile-tab-content")).find(".follow-items-loading").length && (s.find(".follow-items-loading").remove(), s.find(".profile-no-content").show())
									} else {
										var i = m(e);
										if(o.hasClass("j-load-more")) o.parent().before(i);
										else if(o.hasClass("j-load-kx")) m(i[0]).text() == m(".kx-list .kx-date:last").text() && i.first().hide(), o.parent().before(i), o.parent().parent().find(".kx-date:hidden").remove(), window.kxDate = m(".kx-list .kx-date"), d.default.init();
										else if(o.parent().prev().append(i), o.hasClass("j-user-follows")) m(document).trigger("check_follow");
										else if(o.hasClass("j-user-followers")) {
											var s;
											(s = o.closest(".profile-tab-content")).find(".follow-items-loading").remove(), s.find(".follow-items").show(), "0" === !a.getResponseHeader("Next-page") && s.find(".load-more-wrap").show(), m(document).trigger("check_follow")
										}
										i.find(".j-lazy").lazyload({
											webp: v,
											threshold: 250,
											effect: "fadeIn"
										}), o.data("page", r), m(window).trigger("scroll")
									}
									o.parent().removeClass("loading"), l = 0
								},
								error: function() {
									o.parent().removeClass("loading"), l = 0
								}
							})
						}
					}
				}).on("profile_tab_show", ".profile-tab-content", function() {
					var e = m(this);
					e.closest(".profile-follows").length && e.find(".follow-items-loading").length && e.find(".j-user-followers").trigger("click")
				}), m(".special-wrap").on("click", ".load-more", function() {
					var t = m(this);
					if(!t.hasClass("disabled")) {
						var a = t.data("page");
						a = a ? a + 1 : 2, t.parent().addClass("loading"), m.ajax({
							type: "POST",
							url: _wpcom_js.ajaxurl,
							data: {
								action: "wpcom_load_special",
								page: a
							},
							dataType: "html",
							success: function(e) {
								"0" == e ? t.addClass("disabled").text("已经到底了") : (t.closest(".special-wrap").find(".special-list").append(e), t.data("page", a)), t.parent().removeClass("loading")
							},
							error: function() {
								t.parent().removeClass("loading")
							}
						})
					}
				})
			}(jQuery)
	}, {
		"../../../Themer/src/js/bootstrap": 1,
		"../../../Themer/src/js/common": 2,
		"../../../Themer/src/js/follow": 3,
		"../../../Themer/src/js/jquery.qrcode.min": 6,
		"../../../Themer/src/js/member": 7,
		"../../../Themer/src/js/message": 8,
		"../../../Themer/src/js/notification": 9,
		"../../../Themer/src/js/social-share": 10,
		"../../../Themer/src/js/swiper.jquery": 11,
		"../../../Themer/src/js/text-image": 12,
		"../../../Themer/src/js/user-card": 13
	}]
}, {}, [14]);