(function(){
    $.fn.extend({
        liThumb : function(options){
            var defaults = {
                dis:"-140px",
                thumbImg:"thumb-b-img"
            };
            var t = this;
            options  = options || {};
            options = $.extend(defaults,options);
            $(t).hover(function(){
                $(this).find("."+options.thumbImg).stop().animate({top:options.dis},300);
            },function(){
                $(this).find("."+options.thumbImg).stop().animate({top:"0px"},300);
            });
        },
        bannerShow : function(options){
            var defaults = {
                ifCycle : true,
                autoShow : true,
                autoTime : 4000
            };
            options  = options || {};
            options = $.extend(defaults,options);
            var t = this;
            var mainCont = $(t).find(".ban-main"),
                cont = $(t).find(".ban"),
                itemWidth = cont.find("li").width(),
                len = cont.find("li").length,
                index = 0,
                ifMove = false,
                timer = "";
            if(options.ifCycle){
                var oli = cont.children("li:first").clone(),
                    oli1 = cont.children("li:last").clone();
                cont.append(oli);
                cont.prepend(oli1);
                cont.css({width:itemWidth*(len+2)});
            }
            function next(){
                ifMove = true;
                index++;
                cont.stop().animate({left:"-"+itemWidth*index},300,function(){
                    if(index === len+1){
                        index = 1;
                        cont.css({left:"-"+itemWidth+"px"});
                    }
                    ifMove = false;
                });
            }
            function prev(){
                ifMove = true;
                index--;
                cont.stop().animate({left:"-"+itemWidth*index},300,function(){
                    if(index === 0){
                        index = len;
                        cont.css({left:"-"+itemWidth*len+"px"});
                    }
                    ifMove = false;
                });
            }
            $("#next").on("click",function(){
                if(!ifMove){next();}
            });
            $("#prev").on("click",function(){
                if(!ifMove){prev();}
            });
            $(t).mouseenter(function(){
                if(timer){
                    clearTimeout(timer);
                }
            }).mouseleave(function(){
                    if(timer){
                        clearTimeout(timer);
                    }
                    timer = setTimeout(init,options.autoTime);
                });
            function init(){
                next();
                if(options.autoShow){
                    clearTimeout(timer);
                    timer = setTimeout(init,options.autoTime);
                }
            }
            return init();
        },
        slideShow : function(options){
            var defaults = {
                ifCycle : true,
                autoShow : true,
                autoTime : 4000,
                itemUnit : 7
            };
            options  = options || {};
            options = $.extend(defaults,options);
            var t = this;
            var mainCont = $(t).find(".scroll-cont"),
                cont = $(t).find(".scroll-list"),
                contItem = cont.find("li"),
                itemWidth = contItem.width() + 10,
                len = parseInt(contItem.length/options.itemUnit),
                lastItem = contItem.length % options.itemUnit,
                index = 0,
                ifMove = false,
                timer;
            if(options.ifCycle){
								if(cont.length>0){
									var oCont = cont[0].innerHTML;
									cont.append(oCont);
									//cont.css({left:"-1120px"});
								}
            }
            if(lastItem!==0){
                len+=1;
            }
            function next(){
                var moveDis,
                    left = parseInt(cont.css("left"));
                ifMove = true;
                index++;
                if(lastItem !== 0){
                    if(index === len){
                        moveDis = lastItem * itemWidth;
                    }else{
                        moveDis = itemWidth * options.itemUnit;
                    }
                    cont.stop().animate({left:(left-moveDis)+"px"},300,function(){
                        if(index === len){
                            index = 0;
                            cont.css({left:"0px"});
                        }
                        ifMove = false;
                    });
                }else{
                    cont.stop().animate({left:"-"+index*itemWidth*options.itemUnit},300,function(){
                        if(index === len){
                            index = 0;
                            cont.css({left:"0px"});
                        }
                        ifMove = false;
                    });
                }
            }
            function prev(){//slide
                ifMove = true;
                if(index === 0){
                    cont.css({left:"-"+contItem.length*itemWidth+"px"});
                    index = len;
                }
                var left = parseInt(cont.css("left"));
                index--;
                if(lastItem !== 0){
                    if(index === len-1){
                        moveDis = lastItem * itemWidth;
                    }else{
                        moveDis = itemWidth * options.itemUnit;
                    }
                    cont.stop().animate({left:(left+moveDis)+"px"},300,function(){
//                            if(index === 0){
//                                cont.css({left:"0px"});
//                                index = len+1;
//                            }
                        ifMove = false;
                    });
                }else{
                    cont.stop().animate({left:"-"+index*itemWidth*options.itemUnit},300,function(){
                        ifMove = false;
                    });
                }
            }
            $("#scrollNext").on("click",function(){
                if(!ifMove){next();}
            });
            $("#scrollPrev").on("click",function(){
                if(!ifMove){prev();}
            });
            if(options.autoShow){
                $(t).mouseenter(function(){
                    if(timer){
                        clearTimeout(timer);
                    }
                }).mouseleave(function(){
                        clearTimeout(timer);
                        timer = setTimeout(init,options.autoTime);
                    });
            }
            function init(){
                next();
                if(options.autoShow){
                    clearTimeout(timer);
                    timer = setTimeout(init,options.autoTime);
                }
            }
            return init();
        }
    });
    $('.ylwTopBox').hover(function(){
        $(this).find('.ylwTopSub').show();
        $('.ylwTopTitle a').addClass("aa");
        $('.ylwTopTitle a b').addClass('bb')

    },function(){
        $(this).find('.ylwTopSub').hide();
        $('.ylwTopTitle a b').removeClass('bb');
        $('.ylwTopTitle a').removeClass('aa');
    })

    /*
     * hot
     */
    $('.hots_nav li').on("mousemove",function(){
        var _index = $(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        $('.hots_tab').children("div").eq(_index).show().siblings().hide();

    })
})();
$("#banner").bannerShow();

/*baner right*/
$('.mod-head ul li').hover(function(){
	var index = $(this).index();
	$(this).siblings().removeClass('cur');
	$(this).addClass('cur');
	$('.news_list .list-li').hide().eq(index).show();
});

/*cTab*/
var cTab=function(opt){
	//settings
	var settings=jQuery.extend(true,{
		tabHandleList:"#tabHnadle > li",//鏍囩澶�
		tabBodyList:"#tabBody > li",//鏍囩鍐呭浣撳簭鍒�
		//isAutoPlay:{time:3000},//鏄惁鑷姩鎾斁
		isAutoPlay:false,
		bind:"mouseover",//鏍囩缁戝畾浜嬩欢
		defIndex:0,//榛樿閫変腑鏍囩涓嬫爣tabHnadle
		//tabOnCssList:"#tabHnadle > li",//鏍囩on鏍峰紡娣诲姞鐐�
		tabOnCssName:"on"//閫変腑鏍囩鏍峰紡
	},opt);
	var isAutoPlay=settings.isAutoPlay,
		bind=settings.bind,
		defIndex=settings.defIndex,
		$tabHandleList=$(settings.tabHandleList),
		tabOnCssName=settings.tabOnCssName,
		$tabOnCssList=$(settings.tabHandleList),
		$tabBodyList=$(settings.tabBodyList);
	var maxSize=$tabHandleList.size();
	var gotoIndex=function(i){
		if(i>=maxSize){i=0;}else if(i<0){i=maxSize-1;}
		$tabOnCssList.eq(defIndex).removeClass(tabOnCssName);
		$tabOnCssList.eq(i).addClass(tabOnCssName);
		$tabBodyList.eq(defIndex).hide();
		$tabBodyList.eq(i).show()/*.fadeIn(500);*/
		//$tabBodyList.eq(i).find("img").lazyLoadImg();
		defIndex=i;
		return false;
	};
	gotoIndex(defIndex);
	$tabHandleList.each(function(i){
		$(this).bind(bind,function(){gotoIndex(i);});
	});
	//auto
	var timerID;
	var autoPlay=function(){
		timerID=window.setInterval(function(){
			var temp=defIndex+1;
			gotoIndex(temp);
		},isAutoPlay.time);
	};
	var autoStop=function(){
		window.clearInterval(timerID);
	};
	if(isAutoPlay){
		autoPlay();
		$tabHandleList.hover(autoStop,autoPlay);
		$tabBodyList.hover(autoStop,autoPlay);
	}
	//return
	return {gotoIndex:gotoIndex,defIndex:defIndex};
};

cTab({tabHandleList:"#tabHnadle6 > a",tabBodyList:"#tabBody6 > ul",bind:"click"});
cTab({tabHandleList:"#tabHnadle7 > a",tabBodyList:"#tabBody7 > ul",bind:"click"});

// 排行榜切换
function ranks(id_tab){
	var obj = $(id_tab);
	obj.eq(0).find('dl dt').show();
	obj.eq(0).find('dl dd').hide();
	obj.mouseover(function(){
		obj.find('dl dt').hide();
		obj.find('dl dd').show();
		$(this).find('dt').show();
		$(this).find('dd').hide();
	})
};
// 安卓单机排行榜
ranks('.gameBox_box_1 ul li');
// 安卓网游排行榜
ranks('.gameBox_box_2 ul li');
// 安卓软件排行榜
ranks('.gameBox_box_3 ul li');

/*
 * 
 * 相关合集tab
 * */
function cur(ele,cls){
	$(ele).addClass(cls).siblings().removeClass(cls);
} 	
function Tab(id_tab,tag_tab,id_con,tag_con,act,cls){
	$(id_tab).find(tag_tab).eq(0).addClass(cls); 
	$(id_con).find(tag_con).eq(0).show().siblings(tag_con).hide(); 
	if(!act){ act="click"}; 
    if(act=="click"){ 
        $(id_tab).find(tag_tab).each(function(i){ 
            $(id_tab).find(tag_tab).eq(i).click(function(){ 
                cur(this,cls,id_tab,tag_tab); 
                $(id_con).find(tag_con).eq(i).show().siblings(tag_con).hide(); 
            }) 
        }) 
    }
    if(act=="mouseover"){ 
        $(id_tab).find(tag_tab).each(function(i){ 
            $(id_tab).find(tag_tab).eq(i).mouseover(function(){ 
                cur(this,cls); 
                $(id_con).find(tag_con).eq(i).show().siblings(tag_con).hide(); 
            }) 
        }) 
    } 
};


// 2019/7/12
// 排行榜hover
$('.game-list .item').hover(function () {
    $(this).addClass('on').siblings().removeClass('on');
})

//2020-6-29 TAB
$('.Tab_hd i').hover(function(){
    $(this).addClass('on').siblings().removeClass('on');
    $('.Tab_bd ul').hide().eq($(this).index()).show();
})

$('#tabHnadle6 a:last-child,#tabHnadle7 a:last-child,.Tab_hd i:last-child').unbind();