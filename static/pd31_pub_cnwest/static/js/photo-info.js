/* ================================================================ 
This copyright notice must be untouched at all times.
Copyright (c) 2009 Stu Nicholls - stunicholls.com - all rights reserved.
=================================================================== */
$(document).ready(function(){

$(".wrap_one div").hover(function() {
	$(this).animate({"top": "-300px"}, 400, "swing");
},function() {
	$(this).stop(true,false).animate({"top": "0px"}, 400, "swing");
});


$(".wrap_two div").hover(function() {
	$(this).animate({"top": "-150px"}, 400, "swing");
},function() {
	$(this).stop(true,false).animate({"top": "0px"}, 400, "swing");
});


$(".wrap_three div").hover(function() {
	$(this).animate({"top": "-126px"}, 400, "swing");
},function() {
	$(this).stop(true,false).animate({"top": "0px"}, 400, "swing");
});

$(".wrap_four div").hover(function() {
	$(this).animate({"top": "-300px"}, 400, "swing");
},function() {
	$(this).stop(true,false).animate({"top": "0px"}, 400, "swing");
	
});


$(".wrap_five div").hover(function() {
	$(this).animate({"top": "-378px"}, 400, "swing");
},function() {
	$(this).stop(true,false).animate({"top": "0px"}, 400, "swing");
	
});

$(".wrap_six div").hover(function() {
	$(this).animate({"top": "-378px"}, 400, "swing");
},function() {
	$(this).stop(true,false).animate({"top": "0px"}, 400, "swing");
	
});

$(".wrap_end div").hover(function() {
	$(this).animate({"top": "-175px"}, 400, "swing");
},function() {
	$(this).stop(true,false).animate({"top": "0px"}, 400, "swing");
	
});

});
