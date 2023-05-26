$(function() {
	$('.tab3').find('.tab_menu li').click(function(event) {
		var index = $(this).index();
		$(this).addClass('current').siblings().removeClass('current');
		$(".tab_box .list").hide().eq(index).show();
	});

	$(".jj").click(function(event) {
		var oc = $(".jj").hasClass('jj_open');
		if (oc) {
			$(".part_jt2 .jj").removeClass('sh');
			$(".jj").removeClass('jj_open').addClass('jj_closed');		
		} else {
			$(".part_jt2 .jj").addClass('sh');			
			$(".jj").removeClass('jj_closed').addClass('jj_open');
		}
	});
	//recommendList();
/**
	$('.scroll img').click(function(event) {
		$('.scroll').hide();
		$(".pic_area").show().find('img').attr('src', $(this).attr('src'));
	});

	$('.pic_area').click(function(event) {
		$('.scroll').show();
		$(".pic_area").hide()
	});
**/
});
if($("#video").length>0){
	$(".game-video video").on('ended', function() {
		if($('#dw a').attr('href')){
			$('.vback a').attr('href', $('#dw a').attr('href'));
			$('.vback').show();
		}
	})
	$('#replay').on('click',function(){
		$(this).parents('.game-video').find('video')[0].play();
		$(this).parents('.vback').hide();
	})
}
document.write('<script type="text/javascript" charset="utf-8" src="//image.diyiyou.com/m/js/countdetail.js" ></script>');


$(function(){
	// 分享
    $('#share').on('click',function(){
        $('.share_wrap').removeClass('hide');
        $('.share_wrap_bg').removeClass('hide');
    });
    $('.share_wrap').on('click','.close',function(){
        $('.share_wrap').addClass('hide');
        $('.share_wrap_bg').addClass('hide');
        $('.txttip').addClass('hide');
    })
    $('#bds_wx').on('click',function(){
        $('.txttip').removeClass('hide');
	});
	// 专题详情更多
	$('#zt_hidden').css('height','auto');
    $('#zt_hidden_btn').remove();
	// 截图放大缩小
	$('.ul1').find('li').on('click',function(){
		var    swiper = new Swiper('.xzImgBig'),
		swiperIndex = $(this).index();
			
		$('#xzImgBig').find('.swiper-wrapper').removeClass('hide');
		$('.pic-mask').removeClass('hide');

		var  swiperW = $('#xzImgBig').find('.swiper-slide').width(),
		transformW = -swiperW*swiperIndex;
		
		$('#xzImgBig').find('.swiper-wrapper').css({'transform': 'translate3d('+transformW+'px, 0px, 0px)'});

	});
	$('#xzImgBig').find('.swiper-slide').on('click',function(){
		$('#xzImgBig').find('.swiper-wrapper').addClass('hide');
		$('.pic-mask').addClass('hide');
		$('.ul1').removeClass('hide');
	});
})


// feedback
    var feBaHtml = '';
    feBaHtml += `<div class="feedBack hide">
			<div class="feHead"><i class="ico"></i> <span>游戏反馈</span></div>
			<div class="feBack">
			<span>反馈原因</span>
			<div class="info">
			<div class='checkbox'> <input type='checkbox' id='checkbox1' data-value="1" name='checkbox[]'> <label for='checkbox1'>有色情、暴力、反动等不良内容</label>
			</div>
			<div class='checkbox'> <input type='checkbox' id='checkbox2' data-value="2" name='checkbox[]'> <label for='checkbox2'>有抄袭、侵权嫌疑</label>
			</div>
			<div class='checkbox'> <input type='checkbox' id='checkbox3' data-value="3" name='checkbox[]'> <label for='checkbox3'>广告很多、含有不良插件</label>
			</div>
			<div class='checkbox'> <input type='checkbox' id='checkbox4' data-value="4" name='checkbox[]'> <label for='checkbox4'>无法正常安装或进入游戏</label>
			</div>
			</div>
			<span>其他原因</span>
			<textarea name="remake" placeholder="请输入补充说明"></textarea>
			</div>
			<div class="h20"></div>
			<div class="telBox"> <span>联系方式</span> <input type="tel" name="tel"  placeholder="请输入手机号码"> </div>
			<div class="feSubmit"> <input type="button" class="submit" name="submit" value="提交反馈"> </div>
			</div>`

    if ($(".feBaBtn").length > 0) {
        $("body").append(feBaHtml);
    }

    $(".feBaBtn").on('click', function() {
        $(".feedBack").show();
    });
    $(".feHead>i").on('click', function(e) {
        let ev = e || window.event;
        if (ev && ev.stopPropagation) {
            ev.stopPropagation();
        } else {
            ev.cancelBubble = true;
        }
        $(".feedBack").hide();
    });
    $(".submit").click(function() {
        let tel_num = $.trim($(".telBox input[name='tel']").val());
        let game_id = $.trim($("input[name='game_id']").val());
        let game_name = $.trim($("input[name='game_name']").val());
        let type_info = $.trim($("input[name='type_info']").val());

        let reason = "";
        $("input[name='checkbox[]']:checked").each(function(k, v) {
            reason += ',' + $(v).data('value')
        })

        if (!reason) {
            alert('请选择反馈原因！');
            return;
        }

        let tel = isPoneAvailable(tel_num);
        if (!tel) {
            alert('请输入正确的手机号码!');
            return;
        }

        let remake = $.trim($("textarea[name='remake']").val());

        $.ajax({
            url: '/index.php?module=api&method=feedback',
            type: 'get',
            dataType: "jsonp",
            data: {
                'game_id': game_id,
                'reason': reason,
                'tel': tel_num,
                'remake': remake,
                'system': 2,
                'type': type_info,
                'game_name': game_name,
            },
            success: function(data) {
                if (data.code == 200) {
                    alert('反馈成功,谢谢您！');
                    window.location.reload();
                } else {
                    alert(data.msg);
                    return;
                }

            }
        });
    })
// 正则：判断手机号码
function isPoneAvailable(tel) {
    var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(tel)) {  return false; } else {  return true;}
}
$.trim = function(str) {return str == null ? '' : String.prototype.trim.call(str);}







