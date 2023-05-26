// 项目公共JS
if(screen.width>=1220){  //宽屏判断
	document.getElementsByTagName('html')[0].className='wide';
}
$(function(){
	var isloginmouse;
	$('body').on({
		mouseover:function(){
			 $(this).children('ul').addClass('hover');	
		},
		mouseout:function(){
			$(this).children('ul').removeClass('hover');	
		}
	},'li');
	$("#top_islogin").load($("#top_islogin").attr('ajaxurl'));  //		 
})
