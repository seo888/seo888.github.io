$(document).ready(function() {
            //正文图片说明为空时隐藏
            var picsArr = $(".pictext");
            for (var i = 0; i < picsArr.length; i++) {
                if (picsArr[i].innerHTML === "") {
                    picsArr[i].style.display = "none";
                }
            }
            $('#share_1').share({
                sites: ['wechat', 'weibo', 'qzone']
            });
            $('#share_2').share({
                sites: ['wechat', 'weibo', 'qzone']
            });
            $('#share_3').share({
                sites: ['wechat', 'weibo', 'qzone']
            });
            /*改变字体大小*/
            $(".bigger_font_size").on("click", function() {
                var currentFontSize = $(".left_zw p").css("fontSize");
                var currentFontSizeInt = parseInt(currentFontSize.split("px")[0]);
                if(currentFontSizeInt < 30){
                   $(".left_zw p").css("fontSize", (parseInt(currentFontSize.split("px")[0]) + 2) + "px");
                }

            });
            $(".small_font_size").on("click", function() {
                var currentFontSize = $(".left_zw p").css("fontSize");
                var currentFontSizeInt = parseInt(currentFontSize.split("px")[0]);
                if(currentFontSizeInt >= 14){
                   $(".left_zw p").css("fontSize", (parseInt(currentFontSize.split("px")[0]) - 2) + "px");
                }
            });
            /*返回顶部start*/
            $(window).scroll(function() {
                if ($(window).scrollTop() > 300) {
                    $('#backtop div,#top').fadeIn(800);
                    $(".share_wrapper").addClass("fixed");
                    $("#second-title").show();
                    $(".title_fixed").css({"marginTop":"0","borderTop":"4px solid #cd131c"});
                    //$("#navbar").addClass("nav_bar_fixed").css("position", "fixed");
                } else {
                    $('#backtop div,#top').fadeOut(800);
                    $(".share_wrapper").removeClass("fixed");
                    $("#second-title").hide();
                    //$("#navbar").removeClass("nav_bar_fixed").css("position", "relative");
                    $(".content_left_title").removeAttr("style");
                    $(".title_fixed").css({"marginTop":"114px","borderTop":""});
                }
                var h = $("#secondend").offset().top;
                if ($(window).scrollTop() > h && $(window).scrollTop() < h + 2000) {
                    $("#second-title").hide();
                    $(".share_wrapper").removeClass("fixed");
                    // $("#navbar").removeClass("nav_bar_fixed").css("position", "relative");
                    $(".content_left_title").removeAttr("style");
                }
            });
            $("#top").click(function() {
                $('body,html').animate({
                        scrollTop: 0
                    },
                    500);
                return false;
            });
            $(".share_wrapper_rightbar").click(function() {
                var shareTop = $(".con_left_nav").offset().top - $(".con_left_nav").outerHeight();
                $('body,html').animate({
                        scrollTop: shareTop
                    },
                    500);
                return false;
            })
            $(".comment_anchor").click(function() {
                    var commentTop = $(".comment_wrapper").offset().top - $(".comment_wrapper").outerHeight();
                    $('body,html').animate({
                            scrollTop: commentTop
                        },
                        500);
                    return false;
                })
                /*返回顶部end*/
                /*新闻精选js start*/
            var currentPage = 1;
            var listObj = $("#changelist li");
            var listLen = listObj.length;
            var pageSize = listLen % 5 != 0 ? Math.ceil(listLen / 5) : Math.floor(listLen / 5);
            listObj.each(function(index, element) {
                if (index < currentPage * 5) {
                    element.className = "change" + currentPage;
                    $("#changelist li").hide();
                    $(".change" + currentPage).show();
                } else {
                    var otherindex = currentPage;
                    element.className = "change" + ++otherindex;
                }
            });
            if (listLen <= 0) {
                $(".newsRecommendTitle").css("display", "none");
            }
            if (listLen < 6) { //每页5条
                $('.page_bar_bg').css("display", "none");
            }
            var count = 0;
            $('.page_bar').click(function() {
                console.log("count:", count++);
                //var newCurrentPage = ++currentPage;
                /*if(newCurrentPage>pageSize){
                    currentPage = 1;
                    newCurrentPage = 1;
                }*/
                ++currentPage; //先递增后返回
                console.log("currentPage first:", currentPage);
                if (currentPage > pageSize) {
                    currentPage = 1;
                }
                console.log("currentPage second:", currentPage);
                $("#changelist li").hide();
                console.log("current not show:", $("#changelist li").css("display"));
                $(".change" + currentPage).show();
                console.log("current show:", $(".change" + currentPage).css("display"));

            });
            /*新闻精选js end*/

            var ad_right_fc1ObjLen = $("#ad_right_fc1 a").length;
            if(ad_right_fc1ObjLen>0){
                 $("#ad_right_fc1").css("marginBottom","10px");
             }
             /*p中包含img时重置p样式*/
	      var pimgObj = $(".left_zw").find("p img");
	      for(var i=0;i<pimgObj.length;i++){
                 var pObj = pimgObj.eq(i).parent("p");
                 var isNextHasPicIntro = pObj.next().hasClass('pictext');
                 if(isNextHasPicIntro){//包含图说时
                     pObj.css({"marginBottom":"0","line-height":"0"});
                 }
	      }
            /*多个视频start*/
            var videoListObj = $(".videojsObj video");
            var videoLen = $(".videojsObj video").length,player=null,videoid="";
            for(var n=0;n<videoLen;n++){
               videoid = videoListObj.eq(n).attr("id");
               player= videojs(videoid);
            }
            $("video").on("play",function(){$("video").not($(this)).trigger("pause");})
            var flashObjArr = $(".flashObj");
            var videojsObjArr = $(".videojsObj");
            if(flashObjArr.length>0 && isIE()){ 
               for(var m=0;m<flashObjArr.length;m++){
                  flashObjArr[m].style.display="block";
                  videojsObjArr[m].style.display="none";
               }
            }
            /*多个视频end*/
        });

        function showChild(index) {
            switch (index) {
                case 1:
                    $(".shizheng_add").show();
                    $(".shizheng").find("img").removeClass("arrowDown").addClass("arrowUp");
                    break;
                case 5:
                    $(".caijing_add").show();
                    $(".caijing").find("img").removeClass("arrowDown").addClass("arrowUp");
                    break;
                case 9:
                    $(".wenyu_add").show();
                    $(".wenyu").find("img").removeClass("arrowDown").addClass("arrowUp");
                    break;
            }
            $("#navbar").css("height", "132px");
            $(".title_fixed").css("marginTop", "134px");
        }

        function hideChild(index) {
            switch (index) {
                case 1:
                    $(".shizheng_add").hide();
                    $(".shizheng").find("img").removeClass("arrowUp").addClass("arrowDown");
                    break;
                case 5:
                    $(".caijing_add").hide();
                    $(".caijing").find("img").removeClass("arrowUp").addClass("arrowDown");
                    break;
                case 9:
                    $(".wenyu_add").hide();
                    $(".wenyu").find("img").removeClass("arrowUp").addClass("arrowDown");
                    break;
            }
            $("#navbar").css("height", "110px");
            $(".title_fixed").css("marginTop", "114px");
        }

        function showArea(index) {
            $(".substation").show();
            $("#navbar").css("height", "132px");
            $(".title_fixed").css("marginTop", "134px");
            $(".area").find("img").removeClass("arrowDown").addClass("arrowUp");
        }

        function hideArea(index) {
            $(".area").find("img").removeClass("arrowUp").addClass("arrowDown");
            $("#navbar").css("height", "110px");
            $(".title_fixed").css("marginTop", "114px");
            $(".substation").hide();
        }

        /*推荐阅读js*/
        function lhlayer_js() {
            var $index = 0;
            var $len1 = $("#dlyL1_js span.number i").length;
            //alert($len1);
            $len1 = $len1 - 1;
            var $nav = $("#dlyL1_js span.number i");
            var $pics = $(".recommend_news_newlist li");

            $("#_prevhjs").mouseover(function() {
                $("#_prevhdjs").removeClass("prev");
                $("#_prevhdjs").addClass("prevsel");
            });

            $("#_prevhdjs").mouseout(function() {
                $("#_prevhdjs").addClass("prev");
                $("#_prevhdjs").removeClass("prevsel");
            });
            $("#_nexthdjs").mouseover(function() {
                $("#_nexthdjs").removeClass("next");
                $("#_nexthdjs").addClass("nextsel");
            });

            $("#_nexthdjs").mouseout(function() {
                $("#_nexthdjs").addClass("next");
                $("#_nexthdjs").removeClass("nextsel");
            });

            $("#dlyL1_js span.number i").click(function() {
                var $self = $(this);
                var $index = $nav.index($self);
                showMzin($index);

                $("#dlyL1_js span.next").click(function() {
                    if ($index < $len1) { /* 设置4个显示分页 */
                        $index++
                    } else if ($index == $len1) { /* 设置4个显示分页 */
                        $index = 0
                    }
                    showMzin($index);
                });

                $("#dlyL1_js span.prev").click(function() {
                    if ($index > 0) {
                        $index--
                    } else if ($index == 0) {
                        $index = $len1 /* 设置4个显示分页 */
                    }
                    showMzin($index);
                });

            }).eq(0).trigger("click");

            function showMzin(i) {
                $pics.hide(),
                    $pics.eq(i).fadeIn("slow"),
                    $nav.removeClass("current"),
                    $nav.eq(i).addClass("current");
            }

        }
         lhlayer_js();
       function menu_on(x,id,y)

{

for(i=1;i<=y;i++)

{
document.getElementById("menu_"+x+"_"+i+"_"+y).className = "";

document.getElementById("cont_"+x+"_"+i+"_"+y).style.display = "none";

}

document.getElementById("menu_"+x+"_"+id+"_"+y).className = "active";

document.getElementById("cont_"+x+"_"+id+"_"+y).style.display = "block";

} 
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?0da10fbf73cda14a786cd75b91f6beab";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
function isIE(){if (!!window.ActiveXObject || 'ActiveXObject' in window){return true;}else{return false;}}