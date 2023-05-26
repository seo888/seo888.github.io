/**
 * Created by Administrator on 2018/5/16.
 */

    //获取前缀url
    function getPrefixUrl() {
        var location = window.location,
            origin   = location.origin,
            path     = location.pathname,
            pathArr  = path.split('/'),
            newPath  = '';
        pathArr = pathArr.slice(1, -2);
        newPath += origin;
        return newPath;
    }
    //轮播图
    var url  = getPrefixUrl();
    function advBanner(id){
        $.post(url+"/web/adv/ajaxAdv",{id:id}, function(res) {
            if(res.error_code == 0){
                if(res.data.length>0){
                    var temp = '<ul id="focus-banner-list" style="height: 100%">';
                    $.each(res.data, function (k, v) {
                        temp +=' <li> <a href ="'+ v.url+'" target="_blank" style="height: '+res.height+'px" class="focus-banner-img"> <img src="'+ v.image+'" alt=""> </a>\
                                <div class="focus-banner-text">\
                                <p>'+ v.title+'</p>\
                                </div>\
                                </li>';

                    })
                    temp += '</ul>\
                             <a href="javascript:;" id="next-img'+ id+'" class="focus-handle next-img1"></a>\
                             <a href="javascript:;" id="prev-img'+ id+'" class="focus-handle prov_rota prev-img1"></a>\
                             <ul id="focus-bubble'+ id+'" class="bubble-sty"></ul>';

                    $("#focus-banner"+id).width(res.width).height(res.height);
                    $("#focus-banner"+id).html(temp);
                    /*轮播*/
                    var focusBanner=function(){
                        var $focusBanner=$("#focus-banner"+id),
                            $bannerList=$("#focus-banner"+id +" ul li"),
                            $focusHandle=$(".focus-handle"),
                            $bannerImg=$(".focus-banner-img"),
                            $nextBnt=$("#next-img"+id),
                            $prevBnt=$("#prev-img"+id),
                            $focusBubble=$("#focus-bubble"+id),
                            bannerLength=$bannerList.length,
                            _index=0,
                            _timer="";
                        var _height=$(".focus-banner-img").find("img").height();
                        $focusBanner.height(_height);
                        $bannerImg.height(_height);

                        for(var i=0; i<bannerLength; i++){
                            $bannerList.eq(i).css("zIndex",bannerLength-i);
                            $focusBubble.append('<li><a href="javascript:;">'+i+'</a></li>');
                        }
                        $focusBubble.find("li").eq(0).addClass("current");
                        var bubbleLength=$focusBubble.find("li").length;
                        $focusBubble.css({
                            "width":bubbleLength*22,
                            "marginLeft":-bubbleLength*11
                        });//初始化

                        $focusBubble.on("click","li",function(){
                            $(this).addClass("current").siblings().removeClass("current");
                            _index=$(this).index();
                            changeImg(_index);
                        });//点击轮换

                        $prevBnt.on("click",function(){
                            _index++
                            if(_index>bannerLength-1){
                                _index=0;
                            }
                            changeImg(_index);
                        });//下一张

                        $nextBnt.on("click",function(){
                            _index--
                            if(_index<0){
                                _index=bannerLength-1;
                            }
                            changeImg(_index);
                        });//上一张

                        function changeImg(_index){
                            $bannerList.eq(_index).fadeIn(350);
                            $bannerList.eq(_index).siblings().fadeOut(300);
                            $focusBubble.find("li").removeClass("current");
                            $focusBubble.find("li").eq(_index).addClass("current");
                            clearInterval(_timer);
                            _timer=setInterval(function(){$prevBnt.click()},5000)
                        }//切换主函数
                        _timer=setInterval(function(){$prevBnt.click()},5000);


                        function isIE() { //ie?
                            if (!!window.ActiveXObject || "ActiveXObject" in window)
                                return true;
                            else
                                return false;
                        }

                        if(!isIE()){
                            $(window).resize(function(){
                                window.location.reload();
                            });
                        }else{
                            if(!+'\v1' && !'1'[0]){
                                alert("老铁什么年代啦还在搞ie8以下版本啊！")
                            } else{
                                $(window).resize(function(){
                                    window.location.reload();
                                });
                            };
                        }

                    }();
                }
            }
        });
    }

    //横图
    function advImage(id){
        $.post(url+"/web/adv/ajaxAdv",{id:id}, function(res) {
            var temp;
            if(res.error_code == 0){
                temp = '<a href="'+res.data.url+'" target="_blank"><img src="'+res.data.image+'" class="advertising-img1" style="width:'+res.width+'px;height:'+res.height+'px;"></a>';
                $(".adv_banner"+id).html(temp);
            }
        });
    }

    //列表
    function advList(id){
        $.post(url+"/web/adv/ajaxAdv",{id:id}, function(res) {
            if(res.error_code == 0){
                var temp = '';
                if (res.data.length > 0) {
                    $.each(res.data, function (k, v) {
                        temp+='<li><a href="'+v.url+'" target="_blank" >'+ v.title+'</a></li>';
                    })
                }
                $(".advertising-list1"+id).width(res.width).height(res.height);
                $(".advertising-list1"+id).html(temp);
            }
        });
    }

