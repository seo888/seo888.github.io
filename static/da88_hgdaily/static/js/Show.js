//公共参数
//检测浏览设备是手机还是PC，如果是手机则检测是否微信、QQ内置浏览器访问//
	var system = {win: false,mac: false,xll: false,ipad: false}; //检测平台 
	var system_p = navigator.platform;
	var system_Browser = "pc";
	var system_info = window.navigator.userAgent;
	var appleyn = navigator.userAgent.toLowerCase();
	system.win = system_p.indexOf("Win") == 0;
	system.mac = system_p.indexOf("Mac") == 0;
	system.x11 = (system_p == "X11") || (system_p.indexOf("Linux") == 0);
	system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;
	if (system.win || system.mac || system.xll || system.ipad) {
		system_Browser = "pc";
	} else {
		var ua = navigator.userAgent.toLowerCase();  
		if(ua.match(/MicroMessenger/i)=="micromessenger") {  
			system_Browser = "weixin";
		} else if(system_info.indexOf("QQTheme")>= 0) {  
			system_Browser = "qq";
		} else {  
			system_Browser = "mobile";
		}  
	}

//监听是否返回
window.addEventListener('pageshow', function (event){
	if(event.persisted || window.performance && window.performance.navigation.type == 2){		// 返回2则是点击返回
		console.log('window.performance.navigation.type: '+ window.performance.navigation.type)
		HWaitingLoad();
	}
	},false);
//=====================载入、提示代码开始=========================//
document.writeln("<div class=\'waiting_box noselect\' id=\'waiting_box\' style=\'display:none;\'><div class=\'pic_box\'><ul id=\'spinners\'><li class=\'selected sk-fading-circle\'><div class=\'sk-circle1 sk-circle\'></div><div class=\'sk-circle2 sk-circle\'></div><div class=\'sk-circle3 sk-circle\'></div><div class=\'sk-circle4 sk-circle\'></div><div class=\'sk-circle5 sk-circle\'></div><div class=\'sk-circle6 sk-circle\'></div><div class=\'sk-circle7 sk-circle\'></div><div class=\'sk-circle8 sk-circle\'></div><div class=\'sk-circle9 sk-circle\'></div><div class=\'sk-circle10 sk-circle\'></div><div class=\'sk-circle11 sk-circle\'></div><div class=\'sk-circle12 sk-circle\'></div></li></ul></div><span id=\'info\'>Please wait...</span></div>");
document.writeln("<div class=\'MyWriteMsg noselect\' id=\'MyWriteMsg\' style=\'display:none;\'><div class=\'MyWriteMsg_main\' id=\'MyWriteMsg_main\'></div><div class=\'MyWriteMsg_button\' id=\'MyWriteMsg_button\'><strong id=\'Meg_define\'>确定</strong><strong id=\'Meg_cancel\'>取消</strong></div></div>");
document.writeln("<div class=\'waiting_bg\' id=\'bgDiv\' style=\'display:none;\'></div>");

function WaitingLoad() {
    if(system_Browser == "weixin" || system_Browser == "qq" || system_Browser == "pc"){
    $("html,body").css({"overflow-y": "hidden"});
    $("#waiting_box").fadeIn("1");
    $("#bgDiv").fadeIn("1");
    my_position();
    }
}

function HWaitingLoad() {
    $("#waiting_box").hide();
    $("#bgDiv").hide();
    $("html,body").css({"overflow-y": ""});
}

function MyWrite_Close(){
	$("#MyWriteMsg").hide();
    $("#bgDiv").hide();
	}


function MyMessage(Masg, Action, Url_1, Url_2){
		$("html,body").css({"overflow-y":"hidden"});
		$('#MyWriteMsg #MyWriteMsg_main').html(Masg);
 		$('#MyWriteMsg').css({"width":"80%","max-width":"500px","min-width":"230px","height":"auto","line-height":"150%"});
   		$("#MyWriteMsg").fadeIn("1");
    	$("#bgDiv").fadeIn("1");
		
		if(Action==1){ //Action = 1 显示提示信息	Masg=提示文本；点确定 返回上级页面.
		//	Meg_cancel.style.display="none";
		// 	document.getElementById("Meg_define").onclick = function(){history.go(-1)};
		  	$("#MyWriteMsg #Meg_cancel").hide();
		  	$("#MyWriteMsg #Meg_define").click(function(){history.go(-1)});
 		}
		else if(Action==2){ //Action = 2 强制跳转，Masg=提示文本；点确定 转到Url_1页面.
		//	Meg_cancel.style.display="none";
		//  	document.getElementById("Meg_define").onclick = function(){WaitingLoad();my_position();location.href = Url_1;};		
		  	$("#MyWriteMsg #Meg_cancel").hide();
		  	$("#MyWriteMsg #Meg_define").click(function(){MyWrite_Close(); WaitingLoad();location.href = Url_1;});

	  	}
		else if(Action==3){ //Action= 3  是点确定转到 Url_1 ，点取消关闭提示窗口
		//	Meg_cancel.style.display="";
		// 	document.getElementById("Meg_define").onclick = function(){WaitingLoad();my_position();location.href = Url_1;};
		//	document.getElementById("Meg_cancel").onclick = function(){MyWrite_Close();};
		  	$("#MyWriteMsg #Meg_cancel").fadeIn("1");
		  	$("#MyWriteMsg #Meg_cancel").click(function(){MyWrite_Close();});
		  	$("#MyWriteMsg #Meg_define").click(function(){MyWrite_Close(); WaitingLoad();location.href = Url_1;});
		}
		else if(Action==4){ //Action= 4  是点确定转到 Url_1 ，点取消转到 Url_2
		//	Meg_cancel.style.display="";
		//  document.getElementById("Meg_define").onclick = function(){WaitingLoad();my_position();location.href = Url_1;};
		//	document.getElementById("Meg_cancel").onclick = function(){WaitingLoad();my_position();location.href = Url_2;};
			
		  	$("#MyWriteMsg #Meg_cancel").fadeIn("1");
		  	$("#MyWriteMsg #Meg_define").click(function(){MyWrite_Close(); WaitingLoad();location.href = Url_1;});
		  	$("#MyWriteMsg #Meg_cancel").click(function(){MyWrite_Close(); WaitingLoad();location.href = Url_2;});
	  	}
		else if(Action==5){ //Action = 5 是表单判断，Masg=提示文本；点确定：提交ID为Url_1的表单到 Url_2,点取消关闭提示窗口.
        	$("#" + Url_1 + "").attr("action",Url_2);    //通过jquery为action属性赋值
    		$("#MyWriteMsg #Meg_cancel").fadeIn("slow");
			$("#MyWriteMsg #Meg_cancel").click(function(){MyWrite_Close();});        
        	$("#MyWriteMsg #Meg_define").click(function(){$("#" + Url_1 + "").submit();WaitingLoad()});
		//	Meg_cancel.style.display="";
		//	document.getElementById(""+Url_1+"").action=Url_2;
		// 	document.getElementById("Meg_define").onclick = function(){document.getElementById(""+Url_1+"").submit();WaitingLoad()};
		//	document.getElementById("Meg_cancel").onclick = function(){MyWrite_Close();};		
	  	}
		else{ // 显示提示信息， 是点确定关闭，无取消按钮
		//	Meg_cancel.style.display="none";
		// 	document.getElementById("Meg_define").onclick = function(){MyWrite_Close();};
		  	$("#MyWriteMsg #Meg_cancel").hide();
			$("#MyWriteMsg #Meg_define").click(function(){MyWrite_Close();});        
		}
		var MyWriteMsg_top = $(".MyWriteMsg").height() / 2 + 15;
		var MyWriteMsg_left = $(".MyWriteMsg").width() / 2;
    	$('#MyWriteMsg').css({"left": "calc(50% - " + MyWriteMsg_left + "px)","top": "calc(50% - " + MyWriteMsg_top + "px)"}); 
  }

function myalert(Masg){
		$("html,body").css({"overflow-y":"hidden"});
		$('#MyWriteMsg #MyWriteMsg_main').html(Masg);
 		$('#MyWriteMsg').css({"width":"80%","max-width":"500px","min-width":"230px","height":"auto","line-height":"150%"});		  
 		$("#MyWriteMsg #Meg_cancel").hide();
   		$("#MyWriteMsg").fadeIn("1");
    	$("#bgDiv").fadeIn("1");
    	$("#MyWriteMsg #Meg_define").click(function(){MyWrite_Close();});
		var MyWriteMsg_top = $(".MyWriteMsg").height() / 2 + 15;
		var MyWriteMsg_left = $(".MyWriteMsg").width() / 2;
    	$('#MyWriteMsg').css({"left": "calc(50% - " + MyWriteMsg_left + "px)","top": "calc(50% - " + MyWriteMsg_top + "px)"}); 
		}  
  

function my_position(){
	var waiting_box_top = $("#waiting_box").height() / 2 - $("#waiting_box").height()-30;
	var waiting_box_left = $("#waiting_box").width() / 2 - $("#waiting_box").width();
	$('#waiting_box').css({"top":"50%","left":"50%","top":"50%","top":"50%","margin-top": waiting_box_top +"px","margin-left": waiting_box_left +"px"});
	}

function Box_Close(){
	waiting_box.style.visibility="hidden";
	bgDiv.style.visibility="hidden";
	}

function orientationChange() { 
	switch(window.orientation) { 
		case 0: my_position();
	//	alert("肖像模式 0,screen-width: " + screen.width + "; screen-height:" + screen.height); 
		break; 
		case -90: my_position();
	//		alert("左旋 -90,screen-width: " + screen.width + "; screen-height:" + screen.height); 
		break; 
		case 90: my_position();
	//		alert("右旋 90,screen-width: " + screen.width + "; screen-height:" + screen.height); 
		break; 
		case 180: my_position();
　　 	//	alert("风景模式 180,screen-width: " + screen.width + "; screen-height:" + screen.height); 
　　 	break; 
		};
};

// 添加事件监听屏幕旋转
addEventListener('load', function(){ 
	orientationChange(); 
	window.onorientationchange = orientationChange; 
	});  
//=====================载入、提示代码结束=========================//

//=======================公共代码开始===========================//
//写入cookie
function SetCookie(name, value) {
            var exp = new Date();
            exp.setTime(exp.getTime() + 366 * 24 * 60 * 60 * 1000); //366天过期
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
            return true;
        };
//读取cookie
function getCookie(name) {
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr != null) return unescape(arr[2]); return null;
        };
//=======================公共代码结束===========================//

//=====================图片上传代码开始=========================//
function readAsDataURL(divid){  
	var myfile = document.getElementById("file"+divid+"").files[0];
    if(!/image\/\w+/.test(myfile.type)){  
        alert("只能是图片哦！"); 
        document.getElementById("file"+divid+"").value = '' ;
		document.getElementById("uppic_result"+divid+"").style.cssText="background: #F7F7F7 url('/images/nopic.png') no-repeat center center;";
        return false;  
	    }  
	var reader = new FileReader();
	reader.readAsDataURL(myfile);
	reader.onload = function(theFile) {
	var image = new Image();
	image.src = theFile.target.result;
	image.onload = function() {
	//	alert("图片的宽度为"+this.width+",长度为"+this.height);
		var ImgResult=document.getElementById("uppic_result"+divid+"");  
		if(this.width>this.height){	//如果图片宽度大于高度则高度100%
			ImgResult.style.background="url('" + reader.result +"') 50% 50% / auto 100% no-repeat";
    	}else{
			ImgResult.style.background="url('" + reader.result +"') 50% 50% / 100% auto no-repeat";
    	} 
   		Close_Uppic_Menu(); 
	    document.getElementById("uppic_result"+divid+"").onclick = function(){Open_Uppic_Menu_2(divid);}  //已经有图片的层修改弹出菜单
   };
};
}
	
function uppic_setid_1_(divid){
	str='<input type="file" id="file'+divid+'" name="file'+divid+'" capture="camera" accept="image/*" onchange="readAsDataURL('+divid+')"/>'
	document.getElementById("uppic_input"+divid+"").innerHTML = str;
	document.getElementById('file'+divid+'').click();
}
function uppic_setid_2_(divid){
	str='<input type="file" id="file'+divid+'" name="file'+divid+'" onchange="readAsDataURL('+divid+')"/>'
	document.getElementById("uppic_input"+divid+"").innerHTML = str;
	document.getElementById('file'+divid+'').click();
}
	
function Open_Uppic_Menu(divid)
{
	uppic_prompt.style.visibility="visible"; 
	uppic_bg.style.visibility="visible";
	document.getElementById("uppic_bg").style.display = "block";
	document.getElementById("xuanxiang_paizhao").innerHTML = '<span onclick="uppic_setid_1_('+divid+')">拍照</span>';
	document.getElementById("xuanxiang_xuanze").innerHTML = '<span onclick="uppic_setid_2_('+divid+')">从相册选取</span>';
}
	
function Open_Uppic_Menu_2(divid)
{
	uppic_prompt_2.style.visibility="visible"; 
	uppic_bg.style.visibility="visible";
	document.getElementById("uppic_bg").style.display = "block";
	document.getElementById("xuanxiang_shanchu").innerHTML = '<span onclick="uppic_del('+divid+')">删除图片</span>';
	document.getElementById("xuanxiang_paizhao_2").innerHTML = '<span onclick="uppic_setid_1_('+divid+')">重新拍照</span>';
	document.getElementById("xuanxiang_xuanze_2").innerHTML = '<span onclick="uppic_setid_2_('+divid+')">重新从相册选取</span>';
	
}
function uppic_del(divid)
{
    document.getElementById("file"+divid+"").value = '' ;
    var result=document.getElementById("uppic_result"+divid+"");  
    result.style.cssText="background: #F7F7F7 url('/images/nopic.png') no-repeat center center;";
    document.getElementById("uppic_result"+divid+"").onclick = function(){Open_Uppic_Menu(divid); }  //已经有图片的层修改弹出菜单
    Close_Uppic_Menu();
}


function Close_Uppic_Menu()
{
	var uppic_bgObj=document.getElementById("uppic_bg");
	uppic_prompt.style.visibility="hidden";
	TongYong_TiShi.style.visibility="hidden";
	uppic_prompt_2.style.visibility="hidden";
	uppic_bgObj.style.visibility="hidden";
	uppic_bgObj.style.display = "none";
}
//=====================图片上传代码结束=========================//

//=====================反馈代码开始=========================//

$(document).ready(function(){
	$(".flip1").click(function(){
	    $(".panel").slideToggle(500,fankui1());
	  });
	$(".flip2").click(function(){
	    $(".panel").slideToggle(500,fankui2());
	  });
	});

function fankui1(){
	$(".flip1").hide();$(".flip2").show();$(window).scrollTop($('#Test_Top').offset().top);$("#Test_Bottom").css({"display":"none"});
	}
function fankui2(){
	$(".flip1").show();$(".flip2").hide();$(window).scrollTop($('#Test_Top').offset().top);$("#Test_Bottom").css({"display":"none"});
	}

function fankui3(){$(window).scrollTop($('#Test_Top').offset().top);$("#Test_Bottom").css({"display":"none"});}



function Achecked(divid){
	if(eval("document.all.form_Checkbox_"+divid+"").checked==false){
		document.getElementById("checkbox_"+divid+"").style.background="#e70000";
		document.getElementById("checkbox_"+divid+"").style.color="#ffffff";
		eval("document.all.form_Checkbox_"+divid+"").checked =true;
	}
	else{
		document.getElementById("checkbox_"+divid+"").style.background="#f7f7f7";
		document.getElementById("checkbox_"+divid+"").style.color="#000000";
		eval("document.all.form_Checkbox_"+divid+"").checked =false;
		}
	};
//=====================反馈代码结束=========================//


//=====================验证码代码开始=========================//
$(function () {
    $('#btn').click(function () {
	if($(".telinput_Mobile").val().length == 0){
	   	Open_TongYong_TiShi("请填写您的手机号码", 0 , "");
    	slideVerify.resetVerify();
		return false;
 		}

    else if(!(/^1[34578]\d{9}$/.test($(".telinput_Mobile").val()))){ 
	    Open_TongYong_TiShi("手机号码有误，请正确填写", 0 , "");
    	slideVerify.resetVerify();
	    return false; 
   		}   
  
	$.get('FanKui_SendSms.php?dst='+$(".telinput_Mobile").val()+'').success(function(content){ 
	});     
    var count = 90;
    var countdown = setInterval(CountDown, 1000);
    function CountDown() {
        $("#btn").attr("disabled", true);
        $("#btn").val("重新发送（" + count + "）");
        if (count == 0) {
           $("#btn").val("获取校验码").removeAttr("disabled");
           clearInterval(countdown);
        }
        count--;
        }
    })
    });
//=====================验证码代码结束=========================//