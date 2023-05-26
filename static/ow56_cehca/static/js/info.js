/*截图*/
$(document).ready(function () {
    if ($(".snopshot").length>0) {
        var sst = $(".snopshot");
        if (sst.length == 1) {
            sst.css({
                "position": "relative",
                "text-align": "center"
            }).find("img").css({
                "width": "auto",
                "max-width": "800px",
                "max-height": "600px"
            }).next(".elementOverlay").hide();
            $(".snap-shot-btn").hide();
        } else if (sst.length == 2) {
            sst.css({
                "position": "relative",
                "text-align": "center"
            }).find("img").css({
                "width": "auto",
                "max-width": "800px",
                "margin": "10px auto",
                "max-height": "600px"
            }).next(".elementOverlay").hide();
            $(".snap-shot-btn").hide();
            sst.parent(".snapShotCont").css({
                "max-width": "765px",
                "margin": "0 auto"
            });
        } else {
            var conImage  = $('.snopshot').find("img");
            var firstImg  = conImage.eq(0);

            var timer = setInterval(function () {
                if (firstImg[0].complete) {
                    clearInterval(timer)
                    var imgWidth  = 0,
                        imgHeight = 0;

                    if (firstImg.height() >= 600) {
                        imgWidth  = 600 / firstImg.height() * firstImg.width();
                        imgHeight = 600;
                    } else{
                        imgWidth  = firstImg.width();
                        imgHeight = firstImg.height();
                    }

                    sst.find("img").css({
                        "max-width": "550px",
                        "max-height": "600px"
                    });
                    $('.snopshot').eq(0).find('.elementOverlay').css({"opacity": 0});

                    var snapShotWrap = new posterTvGrid(
                        'snapShotWrap',
                        {
                            imgHeight: imgHeight, //图片宽高，来调整框架样式
                            imgWidth: imgWidth,
                            imgP: parseInt(imgWidth / 1.2) //小图与大图比例暂定1比1.2
                        }
                    );
                }
            }, 500)
        }
    }

    if ($(".js-tab").length>0) {
        $(".js-tab .tab-btn .btn").mouseover(function() {
            var _index = $(this).index();
            $(this).addClass('cur').siblings('.cur').removeClass('cur');
            $(this).parents(".js-tab").find(".item").eq(_index).show().siblings().hide();
        });
    }

    if ($(".big-js-tab").length>0) {
        $(".big-js-tab .big-tab-btn .btn").click(function() {
            var _index = $(this).index();
            $(this).addClass('cur').siblings('.cur').removeClass('cur');
            if (_index==0) {
                $(".big-js-tab").find(".js-item").show().siblings('.m-changyan').hide();
                $(".c-relative-load").show();
            }
            else{
                $(".big-js-tab").find(".js-item").eq(_index).show().siblings(".js-item").hide();
                if (_index==2) {
                    $(".c-relative-load").show();
                }
                else{
                    $(".c-relative-load").hide();
                }
            }

        });
    }

})
/*
     * 相关合集切换
     */
function hj(){
    // 大切换
    Tab('.d_hj .hj_item_tab','li','.d_hj .hj_item_tag','.tag_list','mouseover','current_hj');
    // 安卓、苹果小切换
    var oTag = $('.d_hj .hj_item .hj_item_tag');
    var len = oTag.find('.tag_list').length;
    for(var i=0; i<len; i++){
        var obj = oTag.find('.tag_list').eq(i).find('.tag_head ol');
        Tab(obj,'li',oTag.find('.tag_list').eq(i),'.tag_cont','click','cur_hj');
    }
}
hj();

/*
 * 右侧推荐tab
 */
function right_tj(){
    Tab('.b-r .b-r-tit','a','.b-r .b-r-con','ul','click','b-r-active');
}
right_tj()