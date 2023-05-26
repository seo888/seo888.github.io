$(function(){
    $('.news_content .mark').on('click', function(){
        $(this).find('.ion').html("&#xe606;")
    })

    window.checkTxt = function() { 
        var len = $('#commont_content').val().length;
        $('.news_commont .num .cur').html(len);
    }


    // 右侧产品联动
    $('.index_right .block_product_news .left_list a').mouseenter(function(){
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.index_right .block_product_news .right_list .box').eq($(this).index()).removeClass('hide').siblings().addClass('hide');
    }).eq(0).trigger('mouseenter');

    // 词排
    $('.news_content .tri_link').mouseenter(function(){
    	var target = $(this).attr("id");
        var top = $(this).offset().top + 40;
        var left = $(this).offset().left - 180;

        $('.effect_down').addClass('hide');
        $('#f' + target).css({
            "left": left,
            "top": top
        }).removeClass('hide');
    })

    $('.effect_down').mouseenter(function(){
        $(this).removeClass('hide');
    }).mouseleave(function(){
        $(this).addClass('hide');
    })

    $('.effect_down .close_p').on('click', function(){
        $('.effect_down').addClass('hide');
    })

    // 产品词排
    $('.news_content .content .tri_pro').mouseenter(function(){
    	var target = $(this).attr("id");
        var top = $(this).offset().top - $('.effect_up').outerHeight();
        var left = $(this).offset().left - 180;
        
        $('.effect_up').addClass('hide');
        $('#p' + target).css({
            "left": left,
            "top": top
        }).removeClass('hide');
    })

    $('.effect_up').mouseenter(function(){
        $(this).removeClass('hide');
    }).mouseleave(function(){
        $(this).addClass('hide');
    })

    $('.effect_up .close_p').on('click', function(){
        $('.effect_up').addClass('hide');
    })


    // 产品词排
    $('.news_content .content .tri_brand').mouseenter(function(){
    	var target = $(this).attr("id");
        var top = $(this).offset().top - $('.effect_brand').outerHeight();
        var left = $(this).offset().left - 180;
        
        $('.effect_brand').addClass('hide');
        $('#b' + target).css({
            "left": left,
            "top": top
        }).removeClass('hide');
    })

    $('.effect_brand').mouseenter(function(){
        $(this).removeClass('hide');
    }).mouseleave(function(){
        $(this).addClass('hide');
    })

    $('.effect_brand .close_p').on('click', function(){
        $('.effect_brand').addClass('hide');
    })
	//评论登录
	$('#comment_login').on('click',  function() {
		$('.portal').removeClass('hide');
		$('.passport').removeClass('hide');
		$('.register').addClass('hide');
		$('.forget_pop').addClass('hide');
		$('.third_checkin').addClass('hide');
	})
	//评论
	$('.submit_comment').on('click',  function() {
		console.log('in comment');
		if($('#memberId').val()=='' ||$('#memberId').val()=='0'){
			$('.portal').removeClass('hide');
			$('.passport').removeClass('hide');
			$('.register').addClass('hide');
			$('.forget_pop').addClass('hide');
			$('.third_checkin').addClass('hide');
			return false;
		}
		if($('#commont_content').val()==''){
			alert('内容不能为空！');
			return false;
		}
		console.log('in comment center');
		$.ajax({
			url: '/information_list_2020/action/ajax.jsp',
			data: {
				flag: 'comment',
				detailId:$('#detailId').val(),
				content:$('#commont_content').val()
			},
			success: function(data) {
				console.log('in comment ajax');
				if($.trim(data)=='success'){
					$('#allCommentList').removeClass('hide');
					$('#commont_content').val('');
					//刷新评论列表
					$.ajax({
						url: '/information_list_2020/action/ajax.jsp',
						data: {
							flag: 'refreshComment',
							detailId:$('#detailId').val()
						},
						success: function(data) {
							$('#commont_list').html($.trim(data));
						}
					});
				}else if($.trim(data)=='noLog'){
					alert('登录后才可以参与讨论哦！');
				}
			}
		});
	})
	//查看更多评论
	var nowPage=1;
	$('.comment_loading').on('click',  function() {
		nowPage++;
		$.ajax({
			url: '/information_list_2020/action/ajax.jsp',
			data: {
				flag: 'moreComments',
				detailId:$('#detailId').val(),
				pageSize:2,
				nowPage:nowPage
			},
			success: function(data) {
				
				if($.trim(data)!=''){
					$('#commont_list').append($.trim(data));
				}else{
					$('.comment_loading').addClass('hide');
				}
			}
		});
	})
	
	// 视频图库直播
    var videoPicSwiper = new Swiper('.block_videopic_news .swiper-container', {
        autoplay: true,
        loop:true,
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
        }
    });

})
