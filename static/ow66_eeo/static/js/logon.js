/*
 * zwp
 * 修改于2016.10.24
 * 登录界面优化
 * */
$(document).ready(function() {
		/*登录界面*/
		$(".login_dl").click(function(){
			$(".overlay").show();
			$(".modal").show();
			$("#login_css").addClass("zoomInDown");
			
		});
		/*退出登录界面*/
		$("#log_close").click(function(){
			$(".overlay").hide();
			$(".modal").hide();
			$("#login_css").removeClass("zoomInDown");
		});
		/*鼠标得失焦点事件*/
//		$("#login_username").focus(function(){
//			$("#login_username_qx").hide();
//		});
//		$("#login_username").blur(function(){
//			if( $("#login_username").val()==""){
//				$("#login_username_qx").show();
//			}else{
//				$("#login_username_qx").hide();	
//			}
//		});
//		$("#login_password").focus(function(){
//			$("#login_password_qx").hide();
//		});
//		$("#login_password").blur(function(){
//			if( $("#login_password").val()==""){
//				$("#login_password_qx").show();
//			}else{
//				$("#login_password_qx").hide();	
//			}
//		});
	});

/*登录要求判断*/
$(function(){
var islogin = +0;
var loginUrl = "http://app.eeo.com.cn/?app=member&controller=index&action=login";
var username = "";
var defaultname = "";

$(function(){

	if ($.cookie(COOKIE_PRE+'auth')) {
		//已登录
		username = $.cookie(COOKIE_PRE+'username');
		if(username == null) username = defaultname;
		$('#nickname').html(username);
		$('.fg_logo').show();
		$('.xd-logo-l').hide();
                if($.cookie(COOKIE_PRE+'userid')==240587){
                  $('#mysearchto').html("<a href=http://app.eeo.com.cn/?app=search&controller=index&action=mysearch target=_blank>搜索</a>");
                }
	} else {
		$('.fg_logo').hide();
		$('.xd-logo-l').show();
	}
	
        $('#quickLogout > a').click(function() {
		$.getJSON(APP_URL+'?app=member&controller=index&action=ajaxlogout&jsoncallback=?', function(json){
			if(json.state) {
				$('.fg_logo').hide();
				$('.xd-logo-l').show();
				username = '';
			} else {
				alert('退出失败');
			}
		});
	});

});

//退出登录
$(".tc_logo_dl").click(function(){
	window.parent.location.href =  'http://app.eeo.com.cn/?app=member&controller=index&action=logout&url='+encodeURIComponent(window.parent.location.href);
})
//登录判断
		$(".login_dl_pd").click(function(){
			var username = $("#username").val();
			//2018.4.18修复 个人中心密码 重置 功能 得 bug
			var dl_password = $("#dl_password").val();
			var password="";
			if(dl_password != undefined){
				password = dl_password;
			}else{
				password = $("#password").val();
			}
			//var password = $("#password").val();
			if(!username){
				$('#al_warn').text('*请输入用户名');
				$("#al_warn").show();
				return false;
			}else if(username.length < 3){
				$('#al_warn').text('帐号或密码错误，请重新输入');
				$("#al_warn").show();	
		
			}else if(username > 16){
				$('#al_warn').text('帐号或密码错误，请重新输入');
				$("#al_warn").show();
			
			}
			if(!password){
				$('#al_warn').text('*请输入密码');
				$('#al_warn').show();
				return false;
			}else if(password.length < 6){
				$('#al_warn').text('*帐号或密码错误，请重新输入');
				$('#al_warn').show();
				return false;
			}else if(password.length > 12){
				$('#al_warn').text('*帐号或密码错误，请重新输入');
				$('#al_warn').show();
			}
	$.getJSON(APP_URL+'?app=member&controller=index&action=ajaxlogin&username='+encodeURIComponent(username)+'&password='+encodeURIComponent(password)+'&jsoncallback=?', function(json){
		if(json.state) {
			username = json.username;
			$('#nickname').html(username);
			$(".overlay").hide();
			$(".modal").hide();
			$(".xd-logo-l").hide();
			$(".fg_logo").show();
			$("#login_css").removeClass("zoomInDown");
			$(".login_dl_pd").removeClass("login_dl_pd");
			
		} else {
				$('#al_warn').text('*帐号或密码错误，请重新输入');
				$('#al_warn').show();
		}
	});
		})
	})