content=$('.cont').html();
function fulltext(){
    if($('#show-all-cont').html() == '分页阅读'){
        $('#show-all-cont').html('阅读全文');
        $('.cont').html(content);
        $('#show-all-cont').parent().parent().parent().siblings().show();
        $('.article-menu').show();
        // imageZoom();
    }else{
        $('#show-all-cont').html('分页阅读');
        $('.cont').html($('.cont').attr('data-old'));
        $('#show-all-cont').parent().parent().parent().siblings().hide();
        $('.article-menu').hide();
        //imageZoom();
        url='http://app.10yan.com.cn/appapi/index.php?c=indexv4&a=news_detail&os=ios&version=3.0&jsoncallback=?&contentid='+contentid
        //$.getJSON(APP_URL+'?app=article&controller=article&action=fulltext&jsoncallback=?&contentid='+contentid,function(data){
        $.getJSON(url,function(data){
            $('.article-content').html(data.content);
            $('#cont').html('分页阅读').parent().parent().parent().siblings().hide();
            $('.article-menu').hide();
            //imageZoom();
        });
    }

}

$(function(){

    $.ajax({
        url:"http://video.10yan.com/index.php?m=content&c=index&a=videoapi&callback=?",
        dataType:'jsonp',
        data:'',
        jsonp:'callback',
        success:function(data) {
            var str_s='<li>';
            var str_e='</li>';
            var str='';
            $.each(data, function(i,item){
                divcls=(i%2==0)?'right':'left';
                str+=str_s+`<a target="_blank" href="${item.url}" title="${item.title}"><img border="0" src="${item.thumb}" class=framed width="150" height="90"><div class="bf"><img src="http://video.10yan.com/statics/images/video_cc/bf.png" class="animated myzoomOut"></div><span>${item.title}</span></a>`+str_e;
            });
            $("#rdsp").html(str);

        }
    }).error(function(event,request, settings){
        console.log('can not get video.10yan.com api data!')
    });

    $(".minibar > span").click(function(){
        var thisEle = $(".cont").css("font-size");
        var textFontSize = parseFloat(thisEle , 10);
        var unit = thisEle.slice(-2); //获取单位
        var cName = $(this).attr("class");
        if(cName.includes("big")){
            if( textFontSize <= 20 ){
                textFontSize += 2;
            }
        }else if(cName.includes("small")){
            if( textFontSize >= 12 ){
                textFontSize -= 2;
            }
        } else{
            textFontSize = 16;
        }
        $(".cont").css("font-size", textFontSize + unit);
        $(".cont *").css("font-size", textFontSize + unit);
        $(".minibar > span").removeClass('active');
        $(this).addClass('active')
    });

    $(".print").click(function(){
        $(".cont").jqprint({
            debug: false, //如果是true则可以显示iframe查看效果（iframe默认高和宽都很小，可以再源码中调大），默认是false
            importCSS: true, //true表示引进原来的页面的css，默认是true。（如果是true，先会找$("link[media=print]")，若没有会去找$("link")中的css文件）
            printContainer: true, //表示如果原来选择的对象必须被纳入打印（注意：设置为false可能会打破你的CSS规则）。
            operaSupport: false//表示如果插件也必须支持歌opera浏览器，在这种情况下，它提供了建立一个临时的打印选项卡。默认是true
        });
    });

    var txtplay={
        init(){
            //获取需要播放的信息
            var con=$(".cont").html();
            this.msg=new SpeechSynthesisUtterance();

            this.msg.rate = 0.7 ;//播放语速
            this.msg.pitch = 10 ;//音调高低
            this.msg.text = con;//"播放文本"
            this.msg.volume = 0.5; //播放音量
            this.msg.lang='zh';//播放语言
        },
        playing(){
            //播放文本
            window.speechSynthesis.speak(this.msg);
            $(".txtplay > abbr").text('播放中')
        },
        stop(){
            window.speechSynthesis.cancel();
            $(".txtplay > abbr").text('播放')
        }
    }
    var playing=false;
    $('.txtplay').click(function(){
        if(!playing){
            txtplay.init();
            txtplay.playing();
            playing=true;
        }else{
            txtplay.stop();
            playing=false;
        }
    })

    $('.weibo').mouseenter(function(){
        layer.tips('<img src="http://img1.10yan.com/templates/qcw/2021/articleshow/images/qrcode/wanbaoweibo.png" width="100" height="100"/><a class="tac black disb" href="#" target="_blank">十堰晚报微博</a>', '.weibo', {
            tips: [3, '#fff'],
            time: 25000,
            end :function(){$(".layui-layer-move").remove()}
        })
        $('.layui-layer-tips').mouseleave(function(){
            layer.closeAll();
        });
    })

    $('.weixin').mouseenter(function(){
        layer.tips('<div class="wxqrcode"><span><img src="http://img1.10yan.com/templates/qcw/2021/articleshow/images/qrcode/wanbaoweixin.jpg" width="100" height="100"/>十堰晚报微信</span><span><img src="http://img1.10yan.com/templates/qcw/2021/articleshow/images/qrcode/qinchuwangweixin.jpg" width="100" height="100"/>秦楚网微信</span></div>', '.weixin', {
            tips: [3, '#fff'],
            time: 250000,
            end :function(){$(".layui-layer-move").remove()}
        })

        $('.layui-layer-tips').mouseleave(function(){
            layer.closeAll();
        });
    })

    $('.douyin').mouseenter(function(){
        layer.tips('<img src="http://img1.10yan.com/templates/qcw/2021/articleshow/images/qrcode/douyin.png" width="100" height="100"/><a class="tac black disb">十堰晚报抖音</a>', '.douyin', {
            tips: [3, '#fff'],
            time: 25000,
            end :function(){$(".layui-layer-move").remove()}
        })
        $('.layui-layer-tips').mouseleave(function(){
            layer.closeAll();
        });
    })

    $('.baoliao').mouseenter(function(){
        layer.tips('<img src="http://img1.10yan.com/templates/qcw/2021/articleshow/images/qrcode/baoliao.jpg" width="100" height="100"/><a class="tac black disb">微信扫码参与爆料</a>', '.baoliao', {
            tips: [4, '#fff'],
            time: 25000,
            end :function(){$(".layui-layer-move").remove();}
        })
        $('.layui-layer-tips').mouseleave(function(){
            layer.closeAll();
        });
    }).mouseout(function(){
        layer.closeAll();
    })
    $('.tougao').mouseenter(function(){
        layer.tips('发送邮件至 qc10yan@163.com', '.tougao', {
            tips: [4, '#333'],
            time: 25000,
            end :function(){$(".layui-layer-move").remove()}
        })
        $('.layui-layer-tips').mouseleave(function(){
            layer.closeAll();
        });
    })
    $('.fankui').mouseenter(function(){
        layer.tips('发送邮件至 qc10yan@163.com', '.fankui', {
            tips: [4, '#333'],
            time: 25000,
            end :function(){$(".layui-layer-move").remove()}
        })
        $('.layui-layer-tips').mouseleave(function(){
            layer.closeAll();
        });
    })

    $(window).bind('scroll', function(){
        if($(document).scrollTop()>0){
            $(".top").css({'top':0, 'position': 'fixed',"width":"100%"})
        }else{
            $(".top").css({'top':'auto', 'position': 'static'})
        }
        if($(document).scrollTop()>240){
            $(".contbox > .ld > .sharebox").css({'top':'100px', 'position': 'fixed', "width":"85px"})
        }else{
            $(".contbox > .ld > .sharebox").css({'top':'', 'position': 'static', "width":"85px"})
        }
    })
})