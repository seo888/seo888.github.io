$(document).ready(function() {
	//点击字母跳到相应高度
	$(".jumptoltter a").on("click", function(){
		var letter = $(this).text();
		if($(".city_list_item").length > 0){
			$(".city_list_item").each(function(index, val){
				if(letter == $(this).text()){
                    $(".city_list_item").removeClass("on");
                    $(this).addClass("on");
					$(document).scrollTop($(this).offset().top - $(window).height()/2);
					return;
				}
			})
		}
	});
	/**
	 * 移上切换城市
	 */
	var is_on_citys = 0;
	$(".change_city").on("mouseover",function(){
		$(".citys").attr("class","citys on");
	});
	$(".change_city").on("mouseout",function(){
		if(is_on_citys == 0){
			$(".citys").attr("class","citys");
		}
	});
	$(".citys").on("mouseout",function(){
		$(".citys").attr("class","citys");
		is_on_citys = 0;
	});
	$(".citys").on("mouseover",function(){
		is_on_citys = 1;
		$(".citys").attr("class","citys on");
	});

    $('.login-xx,.xiaoxi-xx,.cang-xx').on('mouseover',function(){
        $(this).find('dd').css('display','block');
    })
    $('.login-xx,.xiaoxi-xx,.cang-xx').on('mouseout',function(){
        $(this).find('dd').css('display','none');
    })


	//点击某一城市
	/*$(document).on("mousedown", '.city_item', function(){
		var city_id = $(this).attr("id");
		var city_name = $(this).attr("name");
		var city_st = $(this).attr("st");
		$(".cur_city").text(city_name);
		var success = function(){
			window.location.href = city_id == '0' ? config.base_url : config.base_url + "/" + city_st;
		}
		var session_ins = new session();//来自session.js
		session_ins.init({city_id : city_id, city_name : city_name}, config.base_url + '/cities/setcity', success);
		session_ins.setCookie(72);

		// setTimeout(success,1000);
		success();
	});*/
});
