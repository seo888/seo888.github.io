/**
 * $.fixbox
 * @extends jquery.1.7.2
 * @fileOverview 通用的侧边跟随模块（fixed）等
 * @author 愚人码头
 * @email admin@css88.com
 * @site wwww.css88.com
 * @version 0.3
 * @date 2012-10-17
 * Copyright (c) 2012 愚人码头
 * @param {Object,String} options 插件配置或外部调用插件里的方法名 .
 * @example
 *    $('#single-posts').fixbox({});//初始化
 *    $("#single-posts").fixbox("show");//外部调用插件里的方法
 */
;
(function ($, window, document, undefined) {
    var $win = $(window);
    var $document = $(document);
    /**
     * @constructor FixBox
     * 创建一个新的的 FixBox 类.
     * @param {Object} element DOM元素.
     * @param {Object} options 插件配置 .
     * @type {Object}
     * @example new FixBox( this , options)
     * */
    var FixBox = function (element, options) {
        this.initialize('fixbox', element, options);
    };
    /**
     * This is a property of class FixBox
     */
    FixBox.prototype = {
        constructor:FixBox,
        /**
         * 初始化
         * @classDescription 初始化
         * @param {String} type 跟随类型
         * @param {Object} element 弹窗所依附的DOM元素.
         * @param {Object} options 插件配置 .
         */
        initialize:function (type, element, options) {
            var _this = this;
            this.type = type;
            this.$element = $(element);
            this.options = this.options || this.getOptions(options);
            this.winH = $win.height();
            this.winW = $win.width();
            if (this.options.isFixdeHeight) {
                this.fixedBoxH = this.$element.outerHeight(true);
            }
            this.offsetT = this.$element.offset().top;
            this.resizeWindow();
            this.documentH = $document.height();
            $win.bind("resize", function () {
                _this.resizeWindow();
            });
        },

        /**
         * 初始化 配置参数 返回参数MAP
         * @param {Object} options 插件配置 .
         * @return {Object} 配置参数
         */
        getOptions:function (options) {
            options = $.extend({}, $.fn[this.type].defaults, this.$element.data(), options || {});

            return options;
        },
        //resize Window和初始化的时候使用
        resizeWindow:function () {
            var options = this.options;
            var _this = this;
            this.winH = $win.height();
            this.winW = $win.width();
            if (this.winW >= options.pagewidth) {
                this.doFix();
                $win.unbind("." + options.scrollEventName);
                $win.bind("scroll." + options.scrollEventName, function () {
                    _this.doFix();
                });
            } else {
                $win.unbind("." + options.scrollEventName);
                this.$element.css("position", "static");
            }
        },
        //滚动
        doFix:function () {
            var $element = this.$element;
            var options = this.options;
            var distanceToBottom = options.distanceToBottom;
            var distanceToTop = options.distanceToTop;
            if (!this.options.isFixdeHeight) {
                this.fixedBoxH = $element.outerHeight(true);
            }
            var fixedBoxH = this.fixedBoxH;
            var offsetT = this.offsetT;
            var fixedBoxPositionB = fixedBoxH + this.offsetT;//$fixedBox的底部位置 =fixedBox高度+fixedBox的offset().top
            var winH = this.winH;
            if (!options.isFixdeDocHeight) {
                this.documentH = $document.height();
            }
            var documentH = this.documentH;
            //console.log(fixedBoxPositionB+distanceToBottom-options.threshold)
            if (fixedBoxPositionB + distanceToBottom - options.threshold >= documentH) {
                return;
            }
            var scrollNum = fixedBoxPositionB - winH;
            var winST = $win.scrollTop();
            //元素高度 小于 窗口减去离顶部的固定距离

            if (fixedBoxH < (winH - distanceToTop)) {
                //滚去的高度 大于 初始化时元素的top位置
                if (winST > offsetT) {
                    //console.log(winH - distanceToBottom < fixedBoxH+distanceToTop)
                    if (winST >= ( documentH - distanceToBottom - fixedBoxH)) {
                        //if(this.winH-245<fixedBoxH+40){
                        $element.css({
                            "position":"fixed",
                            "top":-(winST + distanceToBottom + fixedBoxH - documentH)
                        });
                        //}
                    } else {
                        $element.css({
                            "position":"fixed",
                            "top":distanceToTop
                        });
                    }
                } else {
                    $element.css("position", "static");
                }
            }
            //元素高度 大于 窗口减去离顶部的固定距离
            else {
                if (winST > scrollNum) {
                    if (winST > ( documentH - winH - distanceToBottom)) {
                        $element.css({
                            "position":"fixed",
                            "top":-(winST + distanceToBottom + fixedBoxH - documentH)
                        });
                    } else {
                        $element.css({
                            "position":"fixed",
                            "top":winH - fixedBoxH
                        });
                    }
                } else {
                    $element.css("position", "static");
                }
            }
        }
    };
    $.fn.fixbox = function (option) {
        var argumentsAry = [];
        for (var i = 0, len = arguments.length; i < len; i++) {
            argumentsAry.push(arguments[i]);
        }
        var newarg = argumentsAry.slice(1);
        return this.each(function () {
            var $this = $(this),
                data = $this.data('fixbox'),
                options = typeof option == 'object' && option;
            if (!data) {
                data = new FixBox(this, options);
                $this.data('fixbox', data);
            }
            //如果 option是字符串，就运行类的这个方法
            if (typeof argumentsAry[0] == 'string') {
                data[argumentsAry[0]].apply(data, newarg);
            }
        });
    };
    $.fn.fixbox.Constructor = FixBox;

    $.fn.fixbox.defaults = {
        distanceToTop:0, // 节点上边到页面顶部的距离
        distanceToBottom:0,//离底部空余多少时候停止跟随，其实还是fixed定位，只是改变top的值
        isFixdeHeight:true,//跟随元素是不是固定高度
        isFixdeDocHeight:true,//document是不是固定高度
        pagewidth:988,//页面宽度，当窗口宽度 小于 页面宽度 的时候 元素不在跟随。
        threshold:0, //阀值,一般小于等于元素的margin-top值，主要解决固定定位整个栏高度大于非固定定位栏的时候,这样就不固定定位了
        scrollEventName:"followScroll"// scroll事件名，当元素不需要跟随的时候，可以解除对应的scroll事件
    };
})(window.jQuery, window, document);
/**
 * @author 愚人码头
 */
(function($){
	$.fn.Slide=function(options){
		var opts = $.extend({},$.fn.Slide.deflunt,options);
		var index=1;
		var targetLi = $("." + opts.claNav + " li", $(this));//目标对象
		var clickNext = $("." + opts.claNav + " .next", $(this));//点击下一个按钮
		var clickPrev = $("." + opts.claNav + " .prev", $(this));//点击上一个按钮
		var ContentBox = $("." + opts.claCon , $(this));//滚动的对象
		var ContentBoxNum=ContentBox.children().size();//滚动对象的子元素个数
		var slideH=ContentBox.children().first().height();//滚动对象的子元素个数高度，相当于滚动的高度
		var slideW=ContentBox.children().first().width();//滚动对象的子元素宽度，相当于滚动的宽度
		var autoPlay;
		var slideWH;
		if(opts.effect=="scroolY"||opts.effect=="scroolTxt"){
			slideWH=slideH;
		}else if(opts.effect=="scroolX"||opts.effect=="scroolLoop"){
			ContentBox.css("width",ContentBoxNum*slideW);
			slideWH=slideW;
		}else if(opts.effect=="fade"){
			ContentBox.children().first().css("z-index","1");
		}
		
		return this.each(function() {
			var $this=$(this);
			//滚动函数
			var doPlay=function(){
				$.fn.Slide.effect[opts.effect](ContentBox, targetLi, index, slideWH, opts);
				index++;
				if (index*opts.steps >= ContentBoxNum) {
					index = 0;
				}
			};
			clickNext.click(function(event){
				$.fn.Slide.effectLoop.scroolLeft(ContentBox, targetLi, index, slideWH, opts,function(){
					for(var i=0;i<opts.steps;i++){
	                    ContentBox.find("li:first",$this).appendTo(ContentBox);
	                }
	                ContentBox.css({"left":"0"});
				});
				event.preventDefault();
			});
			clickPrev.click(function(event){
				for(var i=0;i<opts.steps;i++){
	                ContentBox.find("li:last").prependTo(ContentBox);
	            }
	          	ContentBox.css({"left":-index*opts.steps*slideW});
				$.fn.Slide.effectLoop.scroolRight(ContentBox, targetLi, index, slideWH, opts);
				event.preventDefault();
			});
			//自动播放
			if (opts.autoPlay) {
				autoPlay = setInterval(doPlay, opts.timer);
				ContentBox.hover(function(){
					if(autoPlay){
						clearInterval(autoPlay);
					}
				},function(){
					if(autoPlay){
						clearInterval(autoPlay);
					}
					autoPlay=setInterval(doPlay, opts.timer);
				});
			}
			
			//目标事件
			targetLi.hover(function(){
				if(autoPlay){
					clearInterval(autoPlay);
				}
				index=targetLi.index(this);
				window.setTimeout(function(){$.fn.Slide.effect[opts.effect](ContentBox, targetLi, index, slideWH, opts);},200);
				
			},function(){
				if(autoPlay){
					clearInterval(autoPlay);
				}
				autoPlay = setInterval(doPlay, opts.timer);
			});
    	});
	};
	$.fn.Slide.deflunt={
		effect : "scroolY",
		autoPlay:true,
		speed : "normal",
		timer : 1000,
		defIndex : 0,
		claNav:"JQ-slide-nav",
		claCon:"JQ-slide-content",
		steps:1
	};
	$.fn.Slide.effectLoop={
		scroolLeft:function(contentObj,navObj,i,slideW,opts,callback){
			contentObj.animate({"left":-i*opts.steps*slideW},opts.speed,callback);
			if (navObj) {
				navObj.eq(i).addClass("on").siblings().removeClass("on");
			}
		},
		
		scroolRight:function(contentObj,navObj,i,slideW,opts,callback){
			contentObj.stop().animate({"left":0},opts.speed,callback);
			
		}
	}
	$.fn.Slide.effect={
		fade:function(contentObj,navObj,i,slideW,opts){
			contentObj.children().eq(i).stop().animate({opacity:1},opts.speed).css({"z-index": "1"}).siblings().animate({opacity: 0},opts.speed).css({"z-index":"0"});
			navObj.eq(i).addClass("on").siblings().removeClass("on");
		},
		scroolTxt:function(contentObj,undefined,i,slideH,opts){
			//alert(i*opts.steps*slideH);
			contentObj.animate({"margin-top":-opts.steps*slideH},opts.speed,function(){
                for( var j=0;j<opts.steps;j++){
                	contentObj.find("li:first").appendTo(contentObj);
                }
                contentObj.css({"margin-top":"0"});
            });
		},
		scroolX:function(contentObj,navObj,i,slideW,opts,callback){
			contentObj.stop().animate({"left":-i*opts.steps*slideW},opts.speed,callback);
			if (navObj) {
				navObj.eq(i).addClass("on").siblings().removeClass("on");
			}
		},
		scroolY:function(contentObj,navObj,i,slideH,opts){
			contentObj.stop().animate({"top":-i*opts.steps*slideH},opts.speed);
			if (navObj) {
				navObj.eq(i).addClass("on").siblings().removeClass("on");
			}
		}
	};
})(jQuery);

