$(function(){
	//自动轮播
	var carousel_interval = setInterval(function(){
		nextscroll();
	},3000);
	//鼠标hover上去停止轮播
	$(".v_cont").mouseover(function(){
		clearInterval(carousel_interval);
	}).mouseleave(function(){
		carousel_interval = setInterval(function(){
			nextscroll();
		},3000);
	});
	/*======next======*/
	$(".next a").click(function(){ 
		if(!$(".v_cont").is(":animated")){
			nextscroll();
		}
	 });

	function nextscroll(){

		var vcon = $(".v_cont");
		var offset = ($(".v_cont li").width())*-1;

		vcon.stop().animate({left:offset},"slow",function(){

			var firstItem = $(".v_cont ul li").first();
			vcon.find("ul").append(firstItem);
			$(this).css("left","0px");

			circle()

		});  

	};


	function circle(){

		var currentItem = $(".v_cont ul li").first();
		var currentIndex = currentItem.attr("index");

		$(".circle li").removeClass("circle-cur");
		$(".circle li").eq(currentIndex).addClass("circle-cur");
	}

				//setInterval(nextscroll,2000)

				/*======prev======*/
	$(".prev a").click(function(){
		if(!$(".v_cont").is(":animated")){
			var vcon = $(".v_cont ");
			var offset = ($(".v_cont li").width()*-1);

			var lastItem = $(".v_cont ul li").last();
			vcon.find("ul").prepend(lastItem);
			vcon.css("left",offset);
			vcon.animate({left:"0px"},"slow",function(){
				circle()
			})
		}
	})
});
//首页右侧轮播
$(function(){
	//自动轮播
	var carousel_interval = setInterval(function(){
		nextscroll();
	},3000);
	//鼠标hover上去停止轮播
	$(".v_contm").mouseover(function(){
		clearInterval(carousel_interval);
	}).mouseleave(function(){
		carousel_interval = setInterval(function(){
			nextscroll();
		},3000);
	});
	/*======next======*/
	$(".nextm a").click(function(){
		if(!$(".v_contm").is(":animated")){
			nextscroll();
		}
	});

	function nextscroll(){

		var vcon = $(".v_contm");
		var offset = ($(".v_contm li").width())*-1;

		vcon.stop().animate({left:offset},"slow",function(){

			var firstItem = $(".v_contm ul li").first();
			vcon.find("ul").append(firstItem);
			$(this).css("left","0px");

			circle()

		});  

	};


	function circle(){

		var currentItem = $(".v_contm ul li").first();
		var currentIndex = currentItem.attr("index");

		$(".circle li").removeClass("circle-cur");
		$(".circle li").eq(currentIndex).addClass("circle-cur");
	}

				//setInterval(nextscroll,2000)

	/*======prev======*/
	$(".prevm a").click(function(){
		if(!$(".v_contm").is(":animated")){
			var vcon = $(".v_contm ");
			var offset = ($(".v_contm li").width()*-1);

			var lastItem = $(".v_contm ul li").last();
			vcon.find("ul").prepend(lastItem);
			vcon.css("left",offset);
			vcon.animate({left:"0px"},"slow",function(){
				circle()
			})
		}
	})
});