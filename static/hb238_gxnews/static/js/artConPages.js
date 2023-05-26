// JavaScript Document


//(支持“←、→”按键翻页)
document.onkeydown = function(e) {     
	var theEvent = window.event || e;     
	var code = theEvent.keyCode || theEvent.which;     
	if (code == 37 && $('#artCon_prev').attr('href') != undefined) { //左箭头按键
		window.location = $('#artCon_prev').attr('href');
	}
	if (code == 39 && $('#artCon_next').attr('href') != undefined) { //右箭头按键
		window.location = $('#artCon_next').attr('href');
	}
}