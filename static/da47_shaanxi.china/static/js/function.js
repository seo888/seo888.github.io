/**
 * 渠道媒体信息流
 */
function mediaData(){
    var j = {//看见云1
            'home':[
                {type:'gdt',id:'/common/m/production/h/static/gw/openjs/i/zddj.js',arrdata:[],domid:[]},//新列表页信息流1
                {type:'gdt',id:'/production/f_a/source/z/resource/pbw/production/zpg.js',arrdata:[],domid:[]}//新列表页信息流2
            ]
        };
		return j;
};
/**
 * 创建js
 */
function cNewScript(item,url){
    var d = document.createElement('script');
    d.setAttribute('type','text/javascript');
    d.setAttribute('src',url);
    item.appendChild(d);
};

// 列表


function homeMedia(){
    if($('#js-defList').length<1){return false;}
    var media = mediaData();
    var newsItem = $('#js-defList').find('.item-default');
    var newsCount = newsItem.length;
    var newsShow = 0;//新闻共加载条数
    var mediaShow = 3;//渠道媒体1次加载条数
    var step = 3;//间隔新闻条数
    var count = 1;//从第几条开始插入渠道媒体
    var showMore = true;
    var gdtCountId = 0;
    var sgCountId = 0;
    var mfirstrun = false;
    /**
     * bd媒体插入
     */
    var addBaidu = function(dom,url){
        var _id = $('<div class="sptpAD"></div>');
        _id.css('height','auto');
        dom.after(_id);
        var _url = '//bd1-china.xsfaya.com';
        cNewScript(_id[0],_url+url);
    };
    /**
     * 插入渠道信息流
     */
    var addMedia = function(){
        for(var i=0; i<mediaShow; i++){
            var _this = newsItem.eq(count),
                _i = i%2;
			if(media.home[_i].id){
				if(typeof(media.home[_i].id)=='string'){
					addBaidu(_this,media.home[_i].id);
				}
			}         
            count = count + step;
        }
        showMore = true;
    };
    /**
     * 判断元素是否可见
     */
    var scrollHandler = function(id){
        var _t = id.offset().top,
            _w = $(window),
            _s = _w.scrollTop();
        if(_t>_s && _t<_s+_w.height() && showMore){
            showMore = false;
            addMedia();
        }
    };
    $(window).scroll(function(){
        if(count<newsCount){
            scrollHandler(newsItem.eq(count));
        }
    });
    addMedia();
};
$(function(){
    homeMedia();
});