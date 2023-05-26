/**
 * 整体函数调用相关
 */
init()
function init() {
	// 轮播
	focusInit();
	// 展开全文
	artRead();
	// 相关新闻
	wapHotNews();
	// 推荐
	hotList();
	// city
	floating();
	// lazyload
	$("img.lazy").lazyload({
		effect: "fadeIn",
		placeholder:"/static/img/loading.png"
	});

    //阅读量     
    userReading();
};

function focusInit() {
	if ($(".focus-swiper").length < 1) {
		return false
	};
	var swiper = new Swiper('.focus-swiper .swiper-container', {
		loop: true,
		lazy: true,
		spaceBetween: 0,
		pagination: {
			el: '.focus-swiper .swiper-pagination',
			clickable: true,
		},
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
	});
};

/* font size changer */
function doZoom(obj_target,size){
    var elem = document.getElementById(obj_target),
        defaultSize = elem.style.fontSize || 17;
    if ( size > 0 ) {
        elem.style.fontSize = (parseInt(defaultSize) + 1) + "px";
    };
    if ( size < 0 ) {
        elem.style.fontSize = (parseInt(defaultSize) - 1) + "px";
    };
};

function artRead(){
	 // 终极页展开全文显示
	if ($("#js-continue-reading").length < 1) {
		return false;
	};   
	if ($(".chan_newsVideo").length > 0 || $(".prevPage").length > 0) { //如果页面中有视频或者有分页,则不显示查看全文；
		$('.continue-reading').hide();
	}else {
		var percent, article_height = $('#artiCon').height(),
			minH = 300;
		percent = Math.round((article_height - minH) / article_height * 100);
		if (article_height <= minH) {
			$('.continue-reading').hide();
		} else {
			$('.continue-reading').show();
			$('#artiCon').addClass('min_height');
			$('#js-continue-reading em').html(percent);
			$('.continue-reading').click(function() {
				$('#artiCon').removeClass('min_height').addClass('auto_height');
				$(this).hide();
			});
		}
	}
}

function wapHotNews(){
	if ($("#wapHotNews").length < 1) {		
		return false;
	}; 
	if($("#wapHotNews .item-default").length<1){
		$('.section-hot-news').hide();
		return false;		
	}
}
function hotList(){
	if ($("#wapTj2").length < 1) {
		return false
	};
	$.getScript('//rank.china.com/rank/cms/shaanxi/day/rank.js',function(){
	    if(typeof(day_top) != 'object' || day_top['-1'].list.length < 1){
			$('.section-tj').hide();
	        return false;
	    }
		var _html= "";
		var _data = day_top['-1'].list;
	    for(var i=0;i<_data.length;i++){
			if(i<7){
				_html += '<div class="item item-default clearfix">';
				_html += '<a href="'+_data[i].url+'">';
				if(_data[i].imgurl){
				_html += '<div class="item-img"><img  class="lazy" src="'+_data[i].imgurl+'"></div>'
				}
				_html += '<h3 class="item-tit">'+_data[i].title+'</h3>';
				_html += '<div class="item-foot"><span class="source">'+_data[i].createTime+'</span></div>';
				_html += '</a>'
				_html += '</div>';
			}
	    }
		$('#wapTj2').append(_html);
	});
}

function floating(){
	// 地市nav
	$('.js-top-bar-menu').on('click',function(event){
		event.stopPropagation();
		$('#js-floating').show();
		$('.shaanxi_city').show();

	});
	// 所有nav
	$('.js-header_menu_btn').on('click',function(event){
		event.stopPropagation();
		$('#js-floating').show();
		$('.shaanxi_all_nav').show();

	});
	$('.js-pop-close').on('click',function(e){	
		$('#js-floating').hide();
		$('.fl-body').hide();

	});
	$(document).click(function() {
		$('#js-floating').hide();
		$('.fl-body').hide();
	});
}



/**
 * thirdcms阅读量展示
 */
function userReading(){
    if(!($('.read').length>0))return false;
    
    var _html = 'ids[]=',
        _dataStr = '',
        _data = [];
    $('.read').each(function(i){
        var _this = $(this).attr('data-comment-id');

        // 处理标题+链接时，稿件id值的各种情况
        _this = _this.replace(/[^0-9]/ig,""); //只留数字
	    if(typeof _this== null || _this== "" || _this== "undefined") {
	       _this = '87654321';
	    }
	    $(this).attr('data-comment-id', _this); // id重新赋值

        var d = (i==0) ? _this : '&ids[]='+_this;
        _html += d;
        _data[i] = _this;
    });
    
    $.ajax({
        url:'//open-data.china.com/openapi/pv-for-3g?'+ _html,
        type:'get',
        dataType:'jsonp',
        jsonpCallback:'a',
        cache:true,
        success:function(res){
            for(var i=0; i<_data.length; i++){
                var _d = _data[i];

                $('.read[data-comment-id='+ _d +']').each(function(){
                    var _res = res.result[_d];
                    if(_res)$(this).html(res.result[_d]).show();
                })
            }
        },
        error:function(res){ 
            console.log('失败');
        }
    });
};