
$(function() {


    $('.leihz2 span').on('click',function(){
        var _html = $(this).html();
        console.log(_html)
    })




	var sWidth = $("#focus").width();
	var len = $("#focus ul li").length;
	var _index= 0;

	$("#focus .btn span").mouseenter(function() {
		_index = $("#focus .btn span").index(this);
		showPics(_index);
	}).eq(0).trigger("mouseenter");

  	$("#focus .preNext").css("opacity",0.2).hover(function() {
		$(this).stop(true,false).animate({"opacity":"0.5"},300);
	},function() {
		$(this).stop(true,false).animate({"opacity":"0.2"},300);
	});

	$("#focus .pre").click(function() {
		_index -= 1;
		if(_index == -1) {_index = len - 1;}
		showPics(_index);
	});

	$("#focus .next").click(function() {
		_index += 1;
		if(_index == len) {_index = 0;}
		showPics(_index);
	});

	/*$("#focus").hover(function() {
		clearInterval(picTimer);
	},function() {
     picTimer = setInterval(function() {   console.log(_index)
     showPics(_index)
     _index++;
     if(_index>len-1){
     _index = 0;
     }
     },3000);
	}).trigger("mouseleave");*/

  var   picTimer = setInterval(function() {
      showPics(_index)
      _index++;
        if(_index>len-1){
            _index = 0;
        }
    },3000)

	function showPics(index) {
        $("#focus ul li").eq(index).fadeIn().siblings().fadeOut()
        $("#focus .btn span").eq(index).addClass('on').siblings().removeClass('on')

	}


	$(document).on("click", ".gotoUrl", function(){
		var target_url=$(this).attr("target_url");
		var href_way=$(this).attr("href_way");
		/*if(href_way=="openNewWindow"){
			var time = new Date();
			window.open(target_url,time);
		}else{
			*//*window.location.href=target_url;*//*
            window.open(target_url);
		}*/
        window.open(target_url);
	});
    $("#nav_bg span").click(function(){
        $(this).addClass("on").siblings().removeClass("on")
    });

	$(".select_price_confirm").on("click",function(){
		var low_price = $(".low_price").val();
		var heigh_price = $(".heigh_price").val();
		var url = $(this).attr("url-data");
		location.href = url + '/low_price/' + low_price + '/heigh_price/' + heigh_price;
	});
	//刷新页面公共方法
	$(".reload").on("click",function(){
		window.location.reload(true);
	})
});
function openbox2(title,price){
  // $('#tanbox2qrcode').empty()
	$(".tanbox2-content-name").text(title);
  $(".tanbox2-content-number").text(price);
  // var qrcode = new QRCode(tanbox2qrcode, {
  //   width : 128,
  //   height : 128
  // });
  // qrcode.makeCode('https://m.hunliji.com/hunpin/detail_' + window.location.href.split('detail_')[1] + '?qrcode=true');
	$(".tanopen2").show();
	$(".tanopen2 .tanbox2").show();
}
function openbox3(){
	$(".tanopen3").show()
	$(".tanopen3 .tanbox3").show()
}
function openboxDownLoad(title){
	$(".tanopen4").find(".title").text(title);
	$(".tanopen4").show();
	$(".tanopen4 .tanbox4").show();
}

var _arr = ['http://qnm.hunliji.com/o_1abi34nlk1me81fr71mhkan7fjd13.jpg',
	'http://qnm.hunliji.com/o_1abi34nlkptb1bk52s212ah1b7r14.jpg',
	'http://qnm.hunliji.com/o_1abi34nlkdtc14lo1vbvq7jdvi15.jpg',
	'http://qnm.hunliji.com/o_1abi34nlk180v1g057um3ddnac16.jpg',
	'http://qnm.hunliji.com/o_1abi34nlk1psq7461eg81quk1k3617.jpg',
	'http://qnm.hunliji.com/o_1abi34nlkfnve7156c1v2128u18.jpg']

function openbox4(id){
    $(".tanopen3").show()
    $(".tanopen3 .tanbox3").show()
    $('.tanbox3 img').attr('src',_arr[id]);
}

function shut(){
	$(".tanopen2, .tanopen3, .tanopen4").hide()
	$(".tanopen2 .tanbox2, .tanopen3 .tanbox3, .tanopen4 .tanbox4").hide()
}
$(function(){
	$(".openbox2").click(function(){
			var title = $(this).attr("data-title");
			var price = $(this).attr("data-price");

			openbox2(title, price);
		}
	)
	$(".openbox3").click(function(){
			openbox3();
		}
  )
  $(".openbox4").click(function(){
    var title = "下载婚礼纪APP　更多功能随心用";
    var open_title = $(this).attr("open-title");
    if(open_title){
      title = open_title;
    }
    openboxDownLoad(title);
	})
	$(".hunpin-detail-merchant-license").click(function(e) {
		console.log('.hunpin-detail-merchant-license click', e)
		e.stopPropagation()
		e.preventDefault()
		const merchantId = $(this).attr("data-merchant-id")
		window.open('/p/wedding/Public/wap/activity/businessLicense/index.html#/index?businessId='+merchantId)
	})

	$(".shut").click(function(){
			shut();
		}
	)

	$('.huitop, .gotop em').click(function(){$('html,body').animate({scrollTop: '0px'}, 500);});

	var topMain=$(".tab-swit").height()//是头部的高度加头部与nav导航之间的距离
	var nav=$("#nav_bg");
	$(window).scroll(function(){
		if ($(window).scrollTop()>680){//如果滚动条顶部的距离大于topMain则就nav导航就添加类.nav_scroll，否则就移除
			nav.addClass("topdh_scroll");
		}else{
			nav.removeClass("topdh_scroll");
		}
	});

	/*document.oncontextmenu=new Function("event.returnValue=false;");*/
	document.onselectstart=new Function("event.returnValue=false;");
})

