function qrCreate(url){
    if(!($('#js-qrcode-img').length>0))return false;
    $('#js-qrcode-img').qrcode({
        width:120,
        height:120,
        text:url
    });
};
function sharePage(){
    var _url = window.location.href;
    //分享到新浪微博
    $('#js-share-weibo').on('click',function(e){
        e.preventDefault();
        var _title = $('#js-article-title').text();
        if(_title === ''){
            _title = $(document).attr('title');
        }
        _url += '#sns_weibo';
        var _pic = '';
        var _shareUrl = 'http://v.t.sina.com.cn/share/share.php?&appkey=1343713053'+    //真实的appkey，必选参数
            '&url='+ encodeURIComponent(_url)+                       //参数url设置分享的内容链接|默认当前页location，可选参数
            '&title=' + encodeURIComponent(_title)+                                 //参数title设置分享的标题|默认当前页标题，可选参数
            '&content=utf-8'+                                                      //参数content设置页面编码gb2312|utf-8，可选参数
            //'&pic=' + encodeURIComponent(_pic||'')+                                     //参数pic设置图片链接|默认为空，可选参数
            //'&searchPic=false';
            '&searchPic=true';
        window.open(_shareUrl,'_blank');
    });
    //分享到微信
    //生成二维码
    qrCreate(_url);
    var _qr = $('#js-qrcode-wrap');
    var _body = $('body');
    $('#js-share-weixin').on('click',function(e){
        _qr.removeClass('hidden');
        e.stopPropagation();
        _body.off('click').on('click',function(e){
            //遍历父级
            for(var n=e.target;n;){
                if(_qr.hasClass('hidden')||n.id=='js-qrcode-wrap')return false;
                n = n.parentNode;
            }
            _qr.addClass('hidden');
            _body.off('click');
        });
    });
    $('#js-qrcode-close').on('click',function(){
        _qr.addClass('hidden');
        _body.off('click');
    });
};

/**
 * 
 */
function rightFollow(){
    (function(b, a, c, d){
        var e = b(a),
            g = b(c),
            f = function(a, b) {
                this.initialize('fixbox', a, b)
            };
        f.prototype = {
            constructor: f,
            initialize: function(a, c, d) {
                var f = this;
                this.type = a;
                this.$element = b(c);
                this.options = this.options || this.getOptions(d);
                this.winH = e.height();
                this.winW = e.width();
                this.options.isFixdeHeight && (this.fixedBoxH = this.$element.outerHeight(!0));
                this.offsetT = this.$element.offset().top;
                this.resizeWindow();
                this.documentH = g.height();
                e.bind('resize',

                function() {
                    f.resizeWindow()
                })
            },
            getOptions: function(a) {
                return a = b.extend({},
                b.fn[this.type].defaults, this.$element.data(), a || {})
            },
            resizeWindow: function() {
                var a = this.options,
                    b = this;
                this.winH = e.height();
                this.winW = e.width();
                this.winW >= a.pagewidth ? (this.doFix(), e.unbind('.' + a.scrollEventName), e.bind('scroll.' + a.scrollEventName,

                function() {
                    b.doFix()
                })) : (e.unbind('.' + a.scrollEventName), this.$element.css('position', 'static'))
            },
            doFix: function() {
                var a = this.$element,
                    d = this.options,
                    f = d.distanceToBottom,
                    m = d.distanceToTop;
                this.options.isFixdeHeight || (this.fixedBoxH = a.outerHeight(!0));
                var k = this.fixedBoxH,
                    n = this.offsetT,
                    q = k + this.offsetT,
                    B = this.winH;
                d.isFixdeDocHeight || (this.documentH = g.height());
                var h = this.documentH;
                d.container && (f = parseInt(b(c).height() - b(d.container).offset().top - b(d.container).height()));
                q + f - d.threshold >= h || (d = q - B, q = e.scrollTop(), k < B - m ? q > n ? q >= h - f - k ? a.css({
                    position: 'fixed',
                    top: -(q + f + k - h)
                }) : a.css({
                    position: 'fixed',
                    top: m
                }) : a.css('position', 'static') : q > d ? q > h - B - f ? a.css({
                    position: 'fixed',
                    top: -(q + f + k - h)
                }) : a.css({
                    position: 'fixed',
                    top: B - k
                }) : a.css('position', 'static'))
            }
        };
        b.fn.fixbox = function(a) {
            for (var c = [], d = 0, e = arguments.length; d < e; d++) c.push(arguments[d]);
            var g = c.slice(1);
            return this.each(function() {
                var d = b(this),
                    e = d.data('fixbox'),
                    m = 'object' == typeof a && a;
                e || (e = new f(this, m), d.data('fixbox', e));
                'string' == typeof c[0] && e[c[0]].apply(e, g)
            })
        };
        b.fn.fixbox.Constructor = f;
        b.fn.fixbox.defaults = {
            container: '',
            distanceToTop: 0,
            distanceToBottom: 0,
            isFixdeHeight: !0,
            isFixdeDocHeight: !0,
            pagewidth: 960,
            threshold: 0,
            scrollEventName:'followScroll'
        }
    })(jQuery, window, document);
    
    //
    if($('#js-follow-right').length>0){
        $('#js-follow-right').fixbox({
            isFixdeDocHeight: false,
            isFixdeHeight: false,
            container: '#js-info-flow .article_wrap_left'
        });
    };
};

function sideFixed(){
    if($('#js-side-fixed').length<1)return false;
    $(window).scroll(function(){     
        var wh = $(window).height(),
            st = $(window).scrollTop();  
        if(st > wh/2){
            $('#js-side-fixed').fadeIn(300); 
        }else{    
            $('#js-side-fixed').fadeOut(300);    
        }  
    });
};

/* font size changer */
function doZoom(obj_target){
	var elem = $('#js-doZoom a');
    elem.on('click',function(e){
        e.preventDefault();
        var _this = $(this),
            _size = _this.attr('data-dozoom'),
            defaultSize = obj_target.css('font-size') || 16;
        if(_size>0){
            obj_target.css('font-size',(parseInt(defaultSize) + 2));
        }else{
            obj_target.css('font-size',(parseInt(defaultSize) - 2));
        };
    });
};


function articleSlideEconomyCon(callback){
    if($('#js-article-slide-cj').length<1){
        if(callback)callback();
        return false;
    }
    $.ajax({
        url: '//finance.china.com/api/article',
        type: 'GET',
        dataType: 'script',
        cache: true,
        success: function(){
            if(typeof(cjchina_data)!='object')return false;
            if(cjchina_data.pc_top_fragment.length>0){
                var _html = '';
                var _data = cjchina_data.pc_top_fragment;
                var _dataLength = _data.length<4?_data.length:4;
                
                for(var i=0; i<_dataLength; i++){
                    _html += '<li><a href="'+ _data[i].url +'" class="item_img" target="_blank"><img src="//finance-pic.china.com/'+ _data[i].pic_url +'" alt="'+ _data[i].title +'"></a><h3 class="item_txt"><a href="'+ _data[i].url +'" target="_blank">'+ _data[i].title +'</a><i class="item_tag">'+ _data[i].pre_title +'</i></h3></li>';
                }
                $('#js-article-slide-cj').html(_html);
            };
            if(callback)callback();
        },
        error: function(){
            if(callback)callback();
        }
    });
};

function articleSlideMilitaryCon(callback){
    if($('#js-article-slide-js').length<1){
        if(callback)callback();
        return false;
    }
    $.ajax({
        url: '//junshi.china.com/api/artical',
        type: 'GET',
        dataType: 'script',
        cache: true,
        success: function(){
            if(typeof(mili_data)!='object')return false;
            if(mili_data.middle_art.length>0){
                var _html = '';
                var _data = mili_data.middle_art;
                var _dataLength = _data.length<6?_data.length:6;
                for(var i=0; i<_dataLength; i++){
                    _html += '<li><a target="_blank" href="'+ _data[i].url +'"><img alt="'+ _data[i].short_title +'" src="'+ _data[i].art_img +'"><h3>'+ _data[i].short_title +'</h3></a></li>';
                }
                $('#js-article-slide-js').html(_html);
            };
            if(callback)callback();
        },
        error: function(){
            if(callback)callback();
        }
    });
};

function articleSlideHotCon(callback){
    if($('#js-ranktop').length<1)return false;
    $.ajax({
        url: '//rank.china.com/rank/cms/news/day/rank.js',
        type: 'GET',
        dataType: 'script',
        cache: true,
        success: function(){
            var d_t = day_top['305'];
            if(typeof(d_t)!='object')return false;
            if(d_t.list.length>0){
                var _html = '';
                var _data = d_t.list;
                var _dataLength = _data.length<9?_data.length:9;
                for(var i=0; i<_dataLength; i++){
                    if(i<3){
                        _html += '<li class="hot">';
                    }else{
                        _html += '<li>';
                    }
                    _html += '<i>'+ (i+1) +'</i><a href="'+ _data[i].url +'" target="_blank">'+ _data[i].title +'</a></li>';
                }
                $('#js-ranktop').html(_html);
            };
            if(callback)callback();
        },
        error: function(){
            if(callback)callback();
        }
    });
};

function topShowSub(){
    if($('.top_header_sub').length<1)return false;
    $('.top_header_sub').hover(
        function(){
            $(this).addClass('over');
        },
        function(){
            $(this).removeClass('over');
        }
    );
};

function tjMedAdd(){
    if($('#js-arttj-med').length<1)return false;
    var _id = $('<li class="arttj-med"></li>');
    $('#js-arttj-med li').eq(4).after(_id);
    var d = document.createElement('script');
    d.setAttribute('type','text/javascript');
    d.setAttribute('src','//bchina-1.xsfaya.com/site/pkjm_z_m/source/ch_h.js');
    _id[0].appendChild(d);
};

function editorMoveShow(){
    if(!($('.editor').length>0))return false;
	let editorDom = $('.editor'),
		editorTxtDom = $('#js_article_content>p:last');
	if(editorDom.text()!=''){
		editorDom.hide();
		let editorTxt = editorTxtDom.html();
		editorTxtDom.html(editorTxt+'<span class="editor_author">'+editorDom.html()+'</span>');
	}
};

/**
 * 整体函数调用相关
 */
function init(){
    //分享
    sharePage();
    //
    sideFixed();
    
    //
    doZoom($('#js_article_content'));
    
    //
    topShowSub();
    
    articleSlideMilitaryCon(function(){
        articleSlideEconomyCon(function(){
            articleSlideHotCon(function(){
                rightFollow();
            });
        });
    });
    
    tjMedAdd();
    
    editorMoveShow();
};

$(function(){
    init();
});