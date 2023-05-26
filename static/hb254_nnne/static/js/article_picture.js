;
(function ($) {
    var DEFAULT = {
        bigPrev: 'picture-pre',
        bigNext: 'picture-next',
        thumbPrev: 'thumb-pre',
        thumbNext: 'thumb-next'
    };
    $.fn.photos = function (options) { 

        var opt = $.extend({}, options, DEFAULT),

            bigPhotos = $('.big-images .picture-big-item'),

            thumbPhotos = $('.thumb-images .picture-thumb-item'),

            ImgCount = bigPhotos.length - 1,

            current = 0, scroll = $('.picture-scroll-bar'),

            bigPrev = $('.' + opt.bigPrev), bigNext = $('.' + opt.bigNext),

            thumbPrev = $('.' + opt.thumbPrev), thumbNext = $('.' + opt.thumbNext),

            pageNum = $('.pageNum'), pageCount = $('.pageCount'), description = $('.picture-description'),

            ls = $('#big-list'),

            _cache = [],

            images = $('.big-images');


        /*
         * 初始化
         */
        var init = function () {


            // 0, 图片预加载
            _initImgLoad();

            // 1, 绑定分页方法 _initPage
            _initPage();

            // 2, 缩略图功能实现
            _initThumb();

            // 3, 描述功能实现
            _initDescribe();

            // 4, Scroll 滚动条实现
            _initScroll();

            // 设置百度分享Config
            /*window._bd_share_config = {
                image: [
                    {
                        "tag": "disabledImg",
                        viewType: 'list',
                        viewPos: 'top',
                        viewColor: 'black',
                        viewSize: '16',
                        viewList: []
                    }
                ]
            };*/

        }

        /**
         * 分页方法
         *
         * @private
         */
        var _initPage = function () {

            var size = 640;

            // 设置contentInc 高度
            $('#picture-content-inc').height(images.height() + 75);
            bigPrev.css('opacity', '0');

            bigPrev.on('click', function (e) {
                e.stopPropagation();
                if (current != 0 && (current % 8 == 0 )) {
                    _initScroll().fnChange(-908);
                }
                _animate(size);
            })
            bigNext.on('click', function (e) {
                e.stopPropagation();
                if (current == ImgCount) {
                    bigNext.attr('disabled', 'disabled');
                    return;
                }
                _animate(-size);
                if ( current % 8 == 0) {
                    _initScroll().fnChange(908);
                }
            })

            //离开区域隐藏
            images.on('mouseout', function () {
                bigPrev.css('opacity', '0');
                bigNext.css('opacity', '0');
            });

            var mouseEvent = function (obj, event, attrFn, attr, value, fn) {
                obj.on(event, function () {
                    switch (attrFn) {
                        case 'css':
                            obj.css(attr, value);
                            break;
                        case 'isFirst':
                            if (current == 0) {obj.css(attr, '0');break;}
                            obj.css(attr, value);
                            break;
                        case 'isLast':
                            if (current == ImgCount) {obj.css(attr, '0');break;}
                            obj.css(attr, value);
                            break;
                    }
                });
            }

            mouseEvent(bigPrev, 'mousemove', 'isFirst', 'opacity', '0.6', false);
            mouseEvent(bigNext, 'mousemove', 'isLast', 'opacity', '0.6', false);

        }

        /**
         * 缩略图绑定事件与初始化
         *
         * @private
         */
        var _initThumb = function () {

            // 1, 默认显示第一张图片与缩略图

            thumbPhotos.eq(current).addClass('active');

            // 2, 绑定点击
            thumbPhotos.on('click', function () {
                var item = $(this), tmpCurrent = item.attr('current');
                var time = 600;
                var left = tmpCurrent * -640;
                var leftStr = parseInt(ls.css('left')) / 640 + ''; //当多次点击时候,默认触发一次
//
                if (left < ImgCount * -640) {
                    return false;
                }

                if (leftStr.indexOf('.') != -1 || left > 0) {
                    time = 100;
                }


                var loadIndex = tmpCurrent;
                var loadImg = bigPhotos.eq(loadIndex).find('img'),
                    loadSrc = loadImg.attr('data-img');
                if (!_cache.contains(loadSrc) && loadIndex <= ImgCount) {

                    imageReady(loadSrc, function () {},function () {
                        loadImg.attr('src', loadSrc);
                        _cache.push(loadSrc);
                        autoScale(loadImg);
                    }, function () {})
                }
                ls.css('left', left);
                ls.css('opacity', 0);
                ls.animate({opacity: 1});
                /*更新当前页*/
                pageNum.html(parseInt(tmpCurrent) + 1);
                current = tmpCurrent;
                bottoms();
            })

        }

        var bottoms = function () {
            var descriptionInfo = description.find('.picture-description-info');
            thumbPhotos.each(function () {
                var that = $(this);
                if (that.hasClass('active')) {
                    that.removeClass('active');
                    return;
                }
            })
            thumbPhotos.eq(current).addClass('active');
            var caption = bigPhotos.eq(current).find('img').attr('data-caption');
            description.find('.picture-description-info').html(caption);

            var downImg = $('.show-bottom').find('img'),
                deLen = descriptionInfo.html().length;

            deLen > 110 ? downImg.show() : downImg.hide();
        }

        /**
         * IMG 更新
         *
         * @private
         */
        var _animate = function (offset) {
            var left = parseInt(ls.css('left')) + offset;
            var more = $('#more');
            var leftStr = left / 640 + ''; //当多次点击时候,默认触发一次
            var hideObj = [ls, description, $('.thumb-images'), scroll];

            if (leftStr.indexOf('.') != -1 || left > 0) {
                return false;
            }

            if (offset > 0 && current > 0) {

                if (current == ImgCount && more.css('display') == 'block') {

                    // 改变上下页的点击范围
                    // 改变上下页的点击范围
                    bigPrev.removeClass('more-big-Prev').css('opacity', 0);
                    bigNext.removeClass('more-big-Next').css('opacity', 0);


                    //离开区域隐藏
                    images.off('mouseout').on('mouseout', function () {
                        bigPrev.css('opacity', '0');
                        bigNext.css('opacity', '0');
                    });

                    more.hide();
                    $.each(hideObj, function () {
                        var that = $(this);
                        that.show();
                    });
                    more.find('.more-img div').off('mouseover mouseout');

                    bigNext.attr('title', '显示下一张图片');
                    return false;
                }
                current--;
            } else if (offset < 0) {
                // more
                if (current == ImgCount) {

                    // 改变上下页的点击范围
                    bigPrev.addClass('more-big-Prev');
                    bigNext.addClass('more-big-Next');
                    $.each(hideObj, function () {
                        var that = $(this);
                        that.hide();
                    })

                    more.show(); // show more
                    $.each([bigPrev, bigNext], function () {
                        $(this).css('opacity', 0.6)
                    })

                    images.off('mouseout'); //删除移除上下页

                    more.find('.more-img div').each(function () {
                        var that = $(this);
                        var thatTitle = that.find('span');
                        var look, relook;
                        that.on('mouseover', function () {
                            clearTimeout(relook);
                            look = setTimeout(function () {
                                thatTitle.animate({bottom: '0'});
                            }, 200)
                        })

                        that.on('mouseout', function () {
                            clearTimeout(look);
                            relook = setTimeout(function () {
                                thatTitle.animate({bottom: '-40'});
                            }, 100)
                        })
                    });

                    more.find('.again').on('click', function () {

                        // 改变上下页的点击范围
                        bigPrev.removeClass('more-big-Prev').css('opacity', 0);
                        bigNext.removeClass('more-big-Next').css('opacity', 0);

                        //恢复 缩略图
                        thumbPhotos.eq(0).addClass('active');
                        $('.thumb-cont').css('left', 0);
                        $('.picture-scroll-bar').css('left', 0);

                        //离开区域隐藏
                        images.off('mouseout').on('mouseout', function () {
                            bigPrev.css('opacity', '0');
                            bigNext.css('opacity', '0');
                        });
                        more.hide();
                        current = 0;
                        $.each(hideObj, function () {
                            var that = $(this);
                            that.show();
                        })
                        ls.css('left', 0);
                        ls.css('opacity', 0);
                        ls.animate({opacity: 1});
                        /*更新当前页*/
                        pageNum.html(parseInt(current) + 1);
                        bottoms();
                    })
                    bigNext.attr('title', '显示下一篇图集');

                    return false;
                }
                current++;
            }

            //缓存图片加载
            var loadIndex = current;
            var loadImg = bigPhotos.eq(loadIndex).find('img'),
                loadSrc = loadImg.attr('data-img');
            if (!_cache.contains(loadSrc) && loadIndex <= ImgCount) {
                imageReady(loadSrc, function () {}, function () {
                    loadImg.attr('src', loadSrc);
                    _cache.push(loadSrc);
                    autoScale(loadImg); // 自动缩放图片
                }, function () {})
            }

            ls.css('left', left);
            ls.css('opacity', 0);
            ls.animate({opacity: 1});
            /*更新当前页*/
            pageNum.html(parseInt(current) + 1);
            bottoms();
        }

        /**
         *
         *
         * @private
         */
        var lookOut, lookOver;
        var _initDescribe = function () {
            var downImg = $('.show-bottom').find('img'),
                descriptionInfo = description.find('.picture-description-info'),
                deLen = descriptionInfo.height();

            if (deLen > 50) {
                downImg.show()
            } else {
                downImg.hide();
            }
            description.on('mouseover', function () {
                var nHeight = parseInt(descriptionInfo.height());
                if (nHeight > 50) {
                    clearTimeout(lookOut);
                    descriptionInfo.removeClass('activeDes');
                    lookOver = setTimeout(function () {
                        description.animate({bottom: nHeight - 35});
                    }, 200);
                }
            });

            description.on('mouseout', function () {
                var nHeight = parseInt(descriptionInfo.height());
                if ( nHeight> 50) {
                    clearTimeout(lookOver);
                    lookOut = setTimeout(function () {
                        description.animate({bottom: -5}, function () {
                        });
                    }, 200)
                }
            })
        }

        var _initScroll = function (offset) {
            var $cont = $('.thumb-cont');
            var $wrap = $('.thumb-wrap');
            var $scrollBar = $('.picture-scroll-bar');
            var $wrapScrollBar = $('.picture-warp-scroll-bar');
            var $cw = ( ImgCount + 1 ) * 82;
            var $ww = $wrap.width();
            //设置滚动按钮宽度
            $scrollBar.width(($ww * $ww / $cw ) > 600 ? 0 : ($ww * $ww / $cw ) - 10);

            if (( $ww * $ww / $cw ) > 600) {
                $wrapScrollBar.remove();
            }

            $cont.width($cw); //解决宽度BUG

            var $sw = $scrollBar.width();
            var disX = 0;

            //滚动条拖动事件
            $scrollBar.mousedown(function (event) {
                disX = event.pageX - $(this).position().left;
                if (this.setCapture) {
                    $(this).mousemove(function (event) {
                        fnChangePos(event.pageX - disX, true);
                    });
                    this.setCapture(); //设置捕获范围
                    $scrollBar.mouseup(function () {
                        $(this).unbind('mousemove mouseup');
                        this.releaseCapture(); //取消捕获范围
                    });
                } else {
                    $(document).mousemove(function (event) {
                        fnChangePos(event.pageX - disX, true);
                    });
                    $(document).mouseup(function () {
                        $(document).unbind('mousemove mouseup');
                    });
                }
                return false;
            });
            function fnChangePos(data, type) {
                if (ImgCount < 8) return; // 图片小于8张 不进行动画
                if (data < 0) data = 0;
                else if (data > ($ww - $sw)) data = $ww - $sw;
                var offset = data > 0 ? 6 : -1;

                if (!type) {
                    $scrollBar.animate({left: data}, 600);
                    $cont.animate({left: -($cw - $ww) * data / ($ww - $sw) + offset }, 600);
                    return;
                }
                $scrollBar.css('left', data);
                $cont.css('left', -($cw - $ww) * data / ($ww - $sw) + offset);
            }

            //鼠标单击击或滚动滚轮时，滚动条单次移动的距离
            var sMoveDis = 100;
            //滚动条单击事件注册
            $wrapScrollBar.click(function (event) {
                var relDisX = event.pageX - $(this).offset().left;
                if (relDisX > ($scrollBar.position().left + $sw)) {
                    fnChangePos($scrollBar.position().left + sMoveDis, true);
                } else if (relDisX < $scrollBar.position().left) {
                    fnChangePos(($scrollBar.position().left - sMoveDis), true)
                }
                ;
            });


            //阻止事件冒泡
            $scrollBar.click(function (event) {
                event.stopPropagation();
            });

            thumbNext.on('click', function () {
                fnChangePos($scrollBar.position().left + 315, false);
            });
            thumbPrev.on('click', function () {
                fnChangePos(($scrollBar.position().left - 315), false);
            });

            return {
                fnChange: function(data) {
                    fnChangePos(data);
                }
            }
        }

        // images Loader
        var imageReady = (function () {
            var list = [],
                timer = null,
                prop = [
                    ['width', 'height'],
                    ['naturalWidth', 'naturalHeight']
                ],
                natural = Number('naturalWidth' in new Image),//是否支持HTML5新增的 naturalHeight
                tick = function () {
                    var i = 0;
                    while (i < list.length) {
                        list[i].end ? list.splice(i, 1) : check.call(list[i++]);
                    }
                    list.length && (timer = setTimeout(tick, 50)) || (timer = null);
                },
                /** overflow: 检测图片尺寸的改变
                 *  img.__width,img.__height: 初载入时的尺寸
                 */
                    check = function () {
                    if (this.complete || this[prop[natural][0]] !== this.__width || this[prop[natural][1]] !== this.__height || this.readyState == 'loading') {
                        this.end = true;
                        this.onready(this);
                    }
                };

            return function (_img, onready, onload, onerror) {
                onready = onready || new Function();
                onload = onload || new Function();
                onerror = onerror || new Function();
                var img = typeof _img == 'string' ? new Image() : _img;
                if(img) img.onerror = function () {// ie && ie<=8 的浏览器必须在src赋予前定义onerror
                    img.end = true;
                    img.onload = img.onerror = img.onreadystatechange = null;
                    onerror.call(img, img);
                    img = null;
                }
                if (typeof _img == 'string') img.src = _img;
                if (!img)return; //为了防止onerror触发后img=null
                if (img.complete) {
                    img.onerror = null;
                    onready.call(img, img);
                    onload.call(img, img);
                    img = null;
                    return;
                }
                img.__width = img[prop[natural][0]];
                img.__height = img[prop[natural][1]];
                img.onready = onready;
                check.call(img);
                img.onload = img.onreadystatechange = function () {
                    if (img && img.readyState && img.readyState != 'loaded' && img.readyState != 'complete') {
                        return;
                    }
                    img.onload = img.onerror = img.onreadystatechange = null;
                    !img.end && check.call(img);
                    setTimeout(function () {
                        onload.call(img, img);
                    }, 500);
                    img = null;
                }
                if (!img.end) {
                    list.push(img);
                    !timer && (timer = setTimeout(tick, 50));
                }
            }
        })();

        // 图片预加载
        var _initImgLoad = function () {
            var range = ImgCount < 2 ? [0] : [0, 1];
            $.each(range, function () {
                var that = bigPhotos.eq(this.toString()).find('img'),
                    src = that.attr('data-img');
                imageReady(src,function () {},function () {
                    _cache.push(src);
                    that.attr('src', src);
                    autoScale(that); // 自动缩放图片
                }, function () {});
            });

        }

        var autoScale = function (obj) {
            // img 宽高
            var hh = obj.height(), ww = obj.width();
            // 限制宽高
            var proMaxHeight = images.height(), proMaxWidth = images;

            var nHeight = 0, nWidth = 0;

            /* TODO:有几率取loading宽高 过滤  32 * 32 */
            if (ww > 100 && hh > 75) {
                var rate = (proMaxWidth / ww < proMaxHeight / hh) ? proMaxWidth / ww : proMaxHeight / hh;
                if (rate <= 1) {
                    nWidth = ww * rate;
                    nHeight = hh * rate;
                }
                else {
                    nWidth = ww;
                    nHeight = hh;
                }

                obj.height(nHeight);
                obj.width(nWidth);
            }

        }

        //扩展Array
        Array.prototype.contains = function (element) {

            var arrLen = this.length;

            if (arrLen > 1) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == element) {
                        return true;
                    }
                }
            }

            return false;
        }
        init();

    };

    $('.picture-content').photos();



}(jQuery));
