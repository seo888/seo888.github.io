// JavaScript Document
fontSize();
$(window).resize(function () {
    fontSize();
});

function fontSize() {
    var size;
    var winW = $(window).width();
    if (winW <= 1600 && winW > 1200) {
        size = Math.round(winW / 16);
    } else if (winW <= 1200) {
        size = Math.round(winW / 7.5);
        if (size > 65) {
            size = 65;
        }
    } else {
        size = 100;
    }
    $('html').css({
        'font-size': size + 'px'
    })
}

$(function(){
	

	//切换
	$('.con_tit h2').hover(function(){
	   var n=$(this).index();
	   $(this).addClass('active').siblings().removeClass('active')
	   $(this).siblings("span").children().hide()
	   $(this).siblings("span").children().eq(n).show()
	   $(this).parent().siblings().children().hide()	
	   $(this).parent().siblings().children().eq(n).show()
	});

    /*弹窗*/
	$('.btn[name]').click(function() {

		var tf_name_id = $(this).attr('name');

		$('.tc[name=' + tf_name_id + ']').addClass('act');

	});

	$('.close').click(function() {

		$(this).parents('.tc').removeClass('act')

	});

	$('.tc-bg').click(function() {

		$(this).parents('.tc').removeClass('act')

	});
});
