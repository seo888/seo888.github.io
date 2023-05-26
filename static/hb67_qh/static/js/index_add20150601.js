// JavaScript Document

$(document).ready(function(){
function topnav1(){

	 var _show = null;
	  var _hideTimer = null;
	  var planItems = $('ul.c-fl-ul li.division');
		planItems.each(function(index) {

			var li = $(this);

			var div = li.find('div.navshow_div');
			div.css("display","none");
			li.bind('mouseenter',function() {
				if (_show != null) {
					clearTimeout(_show);
				}
				_show = setTimeout(function() {
					$('ul.nav_navcon li').addClass('');

					li.addClass('topnav_sel');

				}, 0);
				});
			  li.bind('mouseleave', function() {
					if (_show != null) {
					clearTimeout(_show);
				}
				_hideTimer = setTimeout(function() {
					li.removeClass('topnav_sel');

				}, 0);
				});
			});
	  };
	  topnav1();

});

$(function(){
	var $index = 0;
	var $len1 = $("#dlyL1 span i").length;
	//alert($len1);
	$len1=$len1-1;
	var $nav = $("#dlyL1 span i");
	var $text = $("#dlyL h4 a");
	var $pics = $("#dlyL div.picbox div._hddiv");

	 $("#_prevhd").mouseover(function(){
			  $("#_prevhd").removeClass("prev");
			    $("#_prevhd").addClass("prevsel");
		});

	 $("#_prevhd").mouseout(function(){
			  $("#_prevhd").addClass("prev");
			    $("#_prevhd").removeClass("prevsel");
			});
			$("#_nexthd").mouseover(function(){
			 $("#_nexthd").removeClass("next");
			    $("#_nexthd").addClass("nextsel");
			});

	 $("#_nexthd").mouseout(function(){
			  $("#_nexthd").addClass("next");
			    $("#_nexthd").removeClass("nextsel");
			});

	$("#dlyL1 span i").click(function(){	
		var $self = $(this);
		var $index = $nav.index($self);
		showMzin($index);

		$("#dlyL1 b.next").click(function(){
			if($index<$len1){/* 设置4个显示分�&#65533; */
				$index++
			}
			else if($index==$len1){ /* 设置4个显示分�&#65533; */
				$index=0
			}
			showMzin($index);
		});

		$("#dlyL1 b.prev").click(function(){
			if($index>0){
				$index--
			}

			else if($index==0){
				$index=$len1 /* 设置4个显示分�&#65533; */
			}
			showMzin($index);
		});

	}).eq(0).trigger("click");

	function showMzin(i){
		$pics.hide(),
		$pics.eq(i).fadeIn("slow"),
		$text.hide(),
		$text.eq(i).fadeIn("slow"),
		$nav.removeClass("current"),
		$nav.eq(i).addClass("current");
	}

	DLYTime =setInterval(function(){
		$("#dlyL1 b.next").trigger("click");
	 }, 8000);

	$("#dlyL").mouseover(function(){
		if(DLYTime){clearInterval(DLYTime);}
	});

	$("#dlyL").mouseout(function(){
		DLYTime =setInterval(function(){
			$("#dlyL1 b.next").trigger("click");
	 	},8000);
	});

});

$(document).ready(function(){
function lhlayer(){

	var $index = 0;
	var $len1 = $("#dlyL1_n span i").length;
	//alert($len1);
	$len1=$len1-1;
	var $nav = $("#dlyL1_n span i");
	var $text = $("#dlyL_n h4 a");
	var $pics = $("#dlyL_n  div._rdhtdiv");

	 $("#_prevhdn").mouseover(function(){
			  $("#_prevhdn").removeClass("prev");
			    $("#_prevhdn").addClass("prevsel");
		});

	 $("#_prevhdn").mouseout(function(){
			  $("#_prevhdn").addClass("prev");
			    $("#_prevhdn").removeClass("prevsel");
			});
			$("#_nexthdn").mouseover(function(){
			 $("#_nexthdn").removeClass("next");
			    $("#_nexthdn").addClass("nextsel");
			});

	 $("#_nexthdn").mouseout(function(){
			  $("#_nexthdn").addClass("next");
			    $("#_nexthdn").removeClass("nextsel");
			});

	$("#dlyL1_n span i").click(function(){	
		var $self = $(this);
		var $index = $nav.index($self);
		showMzin($index);

		$("#dlyL1_n b.next").click(function(){
			if($index<$len1){/* 设置4个显示分�&#65533; */
				$index++
			}
			else if($index==$len1){ /* 设置4个显示分�&#65533; */
				$index=0
			}
			showMzin($index);
		});

		$("#dlyL1_n b.prev").click(function(){
			if($index>0){
				$index--
			}

			else if($index==0){
				$index=$len1 /* 设置4个显示分�&#65533; */
			}
			showMzin($index);
		});

	}).eq(0).trigger("click");

	function showMzin(i){
		$pics.hide(),
		$pics.eq(i).fadeIn("slow"),
		$text.hide(),
		$text.eq(i).fadeIn("slow"),
		$nav.removeClass("current"),
		$nav.eq(i).addClass("current");
	}

	DLYTime =setInterval(function(){
		$("#dlyL1_n b.next").trigger("click");
	 }, 8000);

	$("#dlyL_n").mouseover(function(){
		if(DLYTime){clearInterval(DLYTime);}
	});

	$("#dlyL_n").mouseout(function(){
		DLYTime =setInterval(function(){
			$("#dlyL1_n b.next").trigger("click");
	 	},8000);
	});

	}

		lhlayer();
		})

$(document).ready(function(){
function lhlayer_js(){

	var $index = 0;
	var $len1 = $("#dlyL1_js span i").length;
	//alert($len1);
	$len1=$len1-1;
	var $nav = $("#dlyL1_js span i");
	var $text = $("#dlyL_js h4 a");
	var $pics = $("#dlyL_js  div._jsxwdiv");

	 $("#_prevhjs").mouseover(function(){
			  $("#_prevhdjs").removeClass("prev");
			    $("#_prevhdjs").addClass("prevsel");
		});

	 $("#_prevhdjs").mouseout(function(){
			  $("#_prevhdjs").addClass("prev");
			    $("#_prevhdjs").removeClass("prevsel");
			});
			$("#_nexthdjs").mouseover(function(){
			 $("#_nexthdjs").removeClass("next");
			    $("#_nexthdjs").addClass("nextsel");
			});

	 $("#_nexthdjs").mouseout(function(){
			  $("#_nexthdjs").addClass("next");
			    $("#_nexthdjs").removeClass("nextsel");
			});

	$("#dlyL1_js span i").click(function(){	
		var $self = $(this);
		var $index = $nav.index($self);
		showMzin($index);

		$("#dlyL1_js b.next").click(function(){
			if($index<$len1){/* 设置4个显示分�&#65533; */
				$index++
			}
			else if($index==$len1){ /* 设置4个显示分�&#65533; */
				$index=0
			}
			showMzin($index);
		});

		$("#dlyL1_js b.prev").click(function(){
			if($index>0){
				$index--
			}

			else if($index==0){
				$index=$len1 /* 设置4个显示分�&#65533; */
			}
			showMzin($index);
		});

	}).eq(0).trigger("click");

	function showMzin(i){
		$pics.hide(),
		$pics.eq(i).fadeIn("slow"),
		$text.hide(),
		$text.eq(i).fadeIn("slow"),
		$nav.removeClass("current"),
		$nav.eq(i).addClass("current");
	}

	}

		lhlayer_js();
		})

	/*请输入关键字*/

 function checksubmit(){
    var code = event.keyCode;
    if(code == 13) submitFun();
  }

function submitFun() {

var hotword=document.getElementsByName('q')[0].value;

if (hotword==''){

alert('请输入关键字!');

return false;

}
else
{

if(document.getElementsByName('s0')[0].value=='cns')
{

 window.open("http://sou.chinanews.com/search.do?q="+encodeURIComponent(hotword));
 }
 else if(document.getElementsByName('s0')[0].value=='baidu')
 {
 window.open("http://www.baidu.com/s?ie=utf-8&bs=%E4%B8+%9B%BD&sr=&z=&cl=3&f=8&wd="+encodeURIComponent(hotword)+"&ct=0");
 }

}

}
<!--[924,6,24] published at 2022-09-14 09:40:10 from #10 by ��ǫ -->  