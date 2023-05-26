// JavaScript Document
$(document).ready(function(){
	$('#select_btn li:first').css('border','none');
	if ($('#zSlider').length) {
		zSlider();
		$('#h_sns').find('img').hover(function(){
			$(this).fadeTo(200,0.5);
		}, function(){
			$(this).fadeTo(100,1);
		});
	}
	function zSlider(ID, delay){
		var ID=ID?ID:'#zSlider';
		var delay=delay?delay:5000;
		var currentEQ=0, picnum=$('#picshow_img li').size(), autoScrollFUN;
		$('#select_btn li').eq(currentEQ).addClass('current');
		$('#picshow_img li').eq(currentEQ).show();
		$('#picshow_tx li').eq(currentEQ).show();
		autoScrollFUN=setTimeout(autoScroll, delay);
		function autoScroll(){
			clearTimeout(autoScrollFUN);
			currentEQ++;
			if (currentEQ>picnum-1) currentEQ=0;
			$('#select_btn li').removeClass('current');
			$('#picshow_img li').hide();
			$('#picshow_tx li').hide().eq(currentEQ).slideDown(400);
			$('#select_btn li').eq(currentEQ).addClass('current');
			$('#picshow_img li').eq(currentEQ).show();
			autoScrollFUN = setTimeout(autoScroll, delay);
		}
		$('#picshow').hover(function(){
			clearTimeout(autoScrollFUN);
		}, function(){
			autoScrollFUN = setTimeout(autoScroll, delay);
		});
		$('#select_btn li').hover(function(){
			var picEQ=$('#select_btn li').index($(this));
			if (picEQ==currentEQ) return false;
			currentEQ = picEQ;
			$('#select_btn li').removeClass('current');
			$('#picshow_img li').hide();
			$('#picshow_tx li').hide().eq(currentEQ).slideDown(100);
			$('#select_btn li').eq(currentEQ).addClass('current');
			$('#picshow_img li').eq(currentEQ).show();
			return false;
		});
	};
})
function timer(opj) {
	$(opj).find('ul').animate({
		marginTop: "-45px"
	}, 500, function() {
		$(this).css({
			marginTop: "0px"
		}).find("li:first").appendTo(this);
	})
}
$(function() {
	var time = setInterval('timer(".apple")', 4000); 
	var mit = setInterval('timer(".maquee")', 3000); 
	$('.apple ul').find('li').mousemove(function() {
		clearInterval(time);
	}).mouseout(function() {
		time = setInterval('timer(".apple")', 3000);
	});
}); 
$(function() {
	var listPanel = $('.activity ul');
	var nubcers = 0;
	function up() {
		listPanel.animate({ 
			'top': (nubcers - 35) + 'px'
		}, 1500, 'linear', function() {
			listPanel.css({
				'top': '0px'
			})
				.find("li:first").appendTo(listPanel);
			up();
		});
	}
	up();
});