


/********************************************************************************************** */

/**
 * footerScroll()
 * 底部滑动显示
 */
function footerScroll(){
    var footerClose = false;
    $(document).scroll(function(){

        //console.log(!footerClose);

        if((getScrollTop() < 5) && (!footerClose)){
            $(".footer").slideUp();
        }
        else{
            if(!footerClose){
                $(".footer").slideDown();  
            }
        }

        //$('html').scrollTop()&&!footerClose?$(".footer").slideDown():$(".footer").slideUp();        
    });
    $('.close').click(function(){
        $('.footer').slideUp();
        footerClose = true;
    });
}


function getScrollTop() {
	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	return scrollTop;
}


/**
 * shareTop()
 * 顶部wap分享弹出层
 */
function shareTop(){
    $(".forward").click(function(){
        $("#share,#mask").show();
    });
    $("#close").click(function(){
        $("#share,#mask").hide();
    });
    $(".wechat,.weixin,.qq").click(function(){
        $(".sharewechat,#mask2").show();
        $(".share,#mask").hide();
    });
    $("#mask2").click(function(){
        $(".sharewechat,#mask2").hide();
    });
}

/**
 * weibo()
 * 顶部wap分享到微博
 */
function weibo() {
 var sharesinastring='http://v.t.sina.com.cn/share/share.php?url='+window.location.href+'&title="'+$(document).attr('title')+'"';
  window.open(sharesinastring,'newwindow','');
}


$(document).ready(function() {
    footerScroll();
    shareTop();
});


/*  PC 和 WAP 多视频加载代码 20190826 LiuXiaoRong Edit */

if(!playList){     //视频文件中判断多视频个数，需要判断是否已经存在
    var playList = [];
}
function mutiVideoCheck(){
    var plyrSvg = '<svg width="100%" height="100%" viewBox="0 0 348 348" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><g id="白色按钮"><g><path d="M174,5c93.826,0 170,76.174 170,170c0,93.826 -76.174,170 -170,170c-93.826,0 -170,-76.174 -170,-170c0,-93.826 76.174,-170 170,-170Zm0,10c88.306,0 160,71.694 160,160c0,88.306 -71.694,160 -160,160c-88.306,0 -160,-71.694 -160,-160c0,-88.306 71.694,-160 160,-160Z" style="fill:#fff;"/><path d="M145.464,115.814c-2.359,-1.363 -5.261,-1.363 -7.612,0c-2.36,1.362 -3.81,3.882 -3.81,6.615l0,105.445c0,2.733 1.45,5.254 3.81,6.616c1.179,0.681 2.495,1.022 3.81,1.022c1.316,0 2.631,-0.341 3.811,-1.022l91.017,-52.723c2.351,-1.362 3.802,-3.882 3.802,-6.615c0,-2.733 -1.451,-5.254 -3.81,-6.616l-91.018,-52.722Z" style="fill:#fff;fill-rule:nonzero;"/></g></g></svg>'
    if($(".edui-faked-video").length > 0 ){
        for(var i = 0, n = $(".edui-faked-video").length; i < n; i++){
            var dom = $($(".edui-faked-video")[i]);
            var video = '<video class="video-plyr" id="player'+i+'" poster="'+dom.attr("coverImg")+'" displayType="'+dom.attr("displayType")+'" preload="auto" width="700" playsinline webkit-playinline controls><source src="' + dom.attr("urlCloud") + '"  type="video/mp4"></source></video>';
            dom.parent().append(video);
            (function(i){
                var player = new Plyr("#player"+i,{controls:['play-large', 'play', 'progress', 'current-time', 'volume', 'fullscreen']})
                playList.push(player)
                player.on('ready', function(event) {
                    $(".plyr__control--overlaid svg").remove();
                    $(".plyr__control--overlaid .plyr__sr-only").before(plyrSvg)
                });
                player.on('play', function() {
                    for(var j= 0 , k= playList.length; j < k; j++){
                        if(!(player == playList[j])){
                          playList[j].pause();
                        }
                    }
                });


/*全屏事件*/
                player.on('enterfullscreen', function(event) {
                var element = event.detail.plyr.media;
                $(element).css("width","100%");
                $(element).css("height","100%");
                console.log(event)
                });
/*退出全屏事件*/
                player.on('exitfullscreen', function(event) {
                var element = event.detail.plyr.media;
                var scale = window.innerWidth / 750 <= 1 ? window.innerWidth / 750 : 1;
                //$(element).css("width",700*scale +"px");
                $(".video-plyr").css("width","100%");
                $(element).css("height",(700*9/16)*scale + "px");
                });


            })(i)
        }
        $(".edui-faked-video").remove();
    }
    var scale = window.innerWidth / 750 <= 1 ? window.innerWidth / 750 : 1;
    //$(".video-plyr").css("width",700*scale +"px");
    $(".video-plyr").css("width","100%");
    $(".video-plyr").each(function(){
/*
        if($(this).attr("displayType") == "1"){  //横视频展示
            $(this).css("height",(700*9/16)*scale + "px");
        }else if($(this).attr("displayType") == "2"){  //竖视频展示
            $(this).css("height",(700*16/9)*scale + "px");
        }
*/
            $(this).css("height","393.75px");//382.5px
        
    });
    
}


function videoPlay(index){
    for(var i = 0 ,n = players.length; i< n;i++){
        players[i].pause();
    }
    if(index != -1){
        players[index-1]&&players[index-1].play();
    }
}
/* video end  */
