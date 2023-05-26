/*2018年2月生成，感谢提供代码的所有朋友！*/
$(document).ready(function(){
  /*语音播报新闻*/
    var readerNews = {
        playStatus: "false",
        textArry: [],
        length: 0,
        playObj: null,
        hasInit: !1,
        curParagraph: 0,
        loadPage: 0,
        replay:0,
        lastLoadTime:0,
        bigPer:0,
        ifChange:0,
        formTTS: function(e) {
            var t = {
                    tex: encodeURI(e),
                    cuid: "jschina.com.cn",
                    cod: 2,
                    lan: "zh",
                    ctp: 1,
                    //pdt: 1,
                    spd: 5,
                    per: readerNews.bigPer,
                    vol: 5,
                    pit: 5
                },
                n = [];
            for (name in t) n.push(name + "=" + t[name]);
            return "https://app2.jschina.com.cn/tts/tts.php?" + n.join("&")
        },
        nextAudio:function(){
            var e = this.formTTS(this.textArry[this.curParagraph+1]);
            console.log(e);
            $("html").append('<audio id="nextAudio" style="display:none" controls="" preload="load"><source src="' + e + '" type="audio/mp3"></audio>');

        },
        end:function(e){
            var men_img = $(".men_speak");
            var girl_img = $(".women_speak");
            $(".men_speak").attr("_state","0"),
                $(".women_speak").attr("_state","0")
                //girl_img.attr("src","http://member.jschina.com.cn/2018zt/jschina/jiangjiang.png"),
                //men_img.attr("src","http://member.jschina.com.cn/2018zt/jschina/susu.png");
        },
        decompose: function(e) {
            for (var t = Math.ceil(e.length / 500), n = [], i = 0; i < t; ++i) {
                var r = 500 * i;
                n.push(e.substr(r, 500))
            }
            return n
        },
        initData: function() {
            var e = this;
            e.textArry =[];
            $(".articalCont p").each(function(n, i) {
                var r = $(this).text();
                r = r.replace(/(^\s*)|(\s*$)|(▼)/g, "");
                console.log(r)
                r && (r.length > 500 ? e.textArry = e.textArry.concat(e.decompose(r)) : e.textArry.push(r))
            }),
             e.length = e.textArry.length
        },
        initParagraph:function(){
            var e = this;
            e.curParagraph = 0
        },
        initAll:function(){
            this.initData();
            this.initParagraph();
        },
        play: function() {
            // console.log("开始播放");
            // if (this.loadPage == 1) {console.log("stop play");return;}
            this.playObj.play(),
                this.playStatus = "playing",
                $(".listen_news").addClass("playing")
        },
        pause: function() {
            this.playObj.pause(),
                this.playStatus = "pause",
                $(".listen_news").removeClass("playing")
        },
        init: function() {
            if (this.loadPage == 1) {
                this.textArry = [];
                this.initData();
                this.setUnLoad();
            }
            this.nextAudio();
            if (this.playObj)"playing" == this.playStatus ? this.pause() : "pause" == this.playStatus ? (this.play(),console.log("继续.loadPage="+this.loadPage) ): "end" == this.playStatus && (this.curParagraph = -1,this.changeMedium(), this.play());
            else {
                if (this.initData(), 0 == this.length) return ! 1;
                // console.log("第一步 开始.loadPage="+this.loadPage+"  "+this.textArry[this.curParagraph]);
                var e = this.formTTS(this.textArry[this.curParagraph]);
                $("html").append('<audio id="reader" style="display:none" controls="" ><source src="' + e + '" type="audio/mp3"></audio>'),
                    this.playObj = document.getElementById("reader"),
                    this.intEvent(),
                    this.play();
            }
        },
        destory: function() {
            this.pause()
        },
        intEvent: function() {
            var e = this;
            console.log("intEvent.loadPage="+e.loadPage);
            var i=0;
            this.playObj.addEventListener("ended",
                function(n) {
                    i++;
                    return e.curParagraph >= e.length - 1 ? (e.playStatus = "end", readerNews.end()) : (e.changeMedium(), e.play()),
                        !1
                },
                !1);

            this.playObj.addEventListener("play",
                function(n) {
                    e.nextAudio();
                },
                !1);
        },
        changeMedium: function() {
            ++readerNews.curParagraph,
                readerNews.playObj.src = readerNews.formTTS(readerNews.textArry[readerNews.curParagraph]);
        },
        setLoad:function(){
            this.loadPage=1;
            this.replay=1;
        },
        setUnLoad:function(){
            this.loadPage=0;

        }
    };
    $(".artical-con").bind("DOMNodeInserted",function(){
        readerNews.setLoad();
        readerNews.initData();
    });
    $(".men_speak").click(function(){
        //如果正在播放，且为男声
        var men_img = $(".men_speak");
        var girl_img = $(".women_speak");
        var state = $(this).attr("_state");
        if( state == 0){
            $(".men_speak").addClass("on"),
            $(".men_speak").attr("_state","1"),
            $(".women_speak").removeClass('on'),
            $(".women_speak").attr("_state","0")
            //men_img.attr("src","http://member.jschina.com.cn/2018zt/jschina/jiangjiang.gif"),
            //girl_img.attr("src","http://member.jschina.com.cn/2018zt/jschina/susu.png");
            if($("#video").data('play')==1){
                console.log( $("#video").data('sp'))
                $("#video").data('sp').pause();
            }
        }else{
            $(".men_speak").attr("_state","0"), $(".men_speak").removeClass("on")
                //men_img.attr("src","http://member.jschina.com.cn/2018zt/jschina/jiangjiang.png")
        }
        readerNews.playStatus == "playing" || readerNews.playStatus == "pause" ? (readerNews.bigPer == 1 ? readerNews.init() : (readerNews.bigPer = 1,readerNews.playStatus='end',readerNews.ifChange = 9999,console.log("更换男声"),readerNews.init())):(readerNews.bigPer=1, readerNews.init());
    });
    $(".women_speak").click(function(){
        var men_img = $(".men_speak");
        var girl_img = $(".women_speak");
        var state = $(this).attr("_state");
        if(state == 0){
            $(".men_speak").removeClass("on");
            $(".men_speak").attr("_state","0");
            $(".women_speak").attr("_state","1");
            $(".women_speak").addClass("on");
            //girl_img.attr("src","http://member.jschina.com.cn/2018zt/jschina/susu.gif");
            //men_img.attr("src","http://member.jschina.com.cn/2018zt/jschina/jiangjiang.png")
            if($("#video").data('play')==1){
                $("#video").data('sp').pause();
            }
        }else{
            $(".women_speak").attr("_state","0");
            $(".women_speak").removeClass("on");
                //girl_img.attr("src","http://member.jschina.com.cn/2018zt/jschina/susu.png")
        }
        readerNews.playStatus == "playing" || readerNews.playStatus == "pause" ? (readerNews.bigPer == 0 ? readerNews.init() : (readerNews.bigPer = 0,readerNews.playStatus='end',readerNews.ifChange = 9999,console.log("更换女声"),readerNews.init())):(readerNews.bigPer=0, readerNews.init());
    });
  /*工具栏浮动*/
  $(window).scroll(function(){
    var lTop = $('.slide_left')[0].offsetTop;
    var wTop = $(window).scrollTop();
    var result = wTop - lTop;
    var menu = $("#slide_left_box");       
    if(result>0){
      menu.addClass("slide_left_box_fix");
    } else {
      menu.removeClass("slide_left_box_fix");
    }    
  });
  /*电脑版*/
  $(".m_pc_3 i").click(function(){window.location.href="http://www.jschina.com.cn/?m=1";});
  /*导航滑动*/
  var swiper_0 = new Swiper('.m_nav_3',{slidesPerView:6,spaceBetween:30});
  /*广告滑动*/
  var swiper_ad = new Swiper('.pc_ad_swiper', {effect:'fade',autoplay:3000,loop:true,autoplayDisableOnInteraction:false});
  /*字号缩放*/
  $(".font a").click(function(){
      var thisEle = $(".articalCont").css("font-size");      
      //alert("字号"+thisEle);
      var textFontSize = parseFloat(thisEle , 10);
      var unit = thisEle.slice(-2);
      var cName = $(this).attr("class");
      if(cName == "bigger"){
          if(textFontSize < 25){textFontSize += 2;}
          else if(textFontSize == 25) {textFontSize += 2;$('.bigger').attr("disabled","disabled");}      
      }else if(cName == "smaller"){
          if(textFontSize > 15){textFontSize -= 2; }
          else if(textFontSize == 14) {textFontSize -= 2;$('.smaller').attr("disabled","disabled");}          
      }
      $(".articalCont").css("font-size",  textFontSize + unit );
  });

});