$(function() {

	  $("#showseabtn").click(function(){
		  
		  	if($(this).attr("src")=="/images/navclose.png")
			{
				$(this).attr("src","/images/search_btn.jpg");
			}
			else
			{
				$(this).attr("src","/images/navclose.png");
				
			}
			
		  	$('.mHbom_seashow').slideToggle(250);
	  });

	  $("#wxh").hover(function(){
		  
			$('.mHtop_wx').toggle(
				function(){ 
				},
				function(){
			});	 
	  });
	  
	 $("#app").hover(function(){
		  
			$('.mHtop_app').toggle(
				function(){ 
				},
				function(){
			});	 
	  });
	  
	  $("#shownavbtn").click(function(){
		  
			if($(this).attr("src")=="/images/navclose.png")
			{
				$(this).attr("src","/images/navbar.png");
			}
			else
			{
				$(this).attr("src","/images/navclose.png");
			}
			$(".mHbom_nav").slideToggle(250);
	  });
	  
});

function isChkMobile() {
    var userAgentInfo = navigator.userAgent;
    var mobileAgents = [ "Android", "iPhone", "SymbianOS", "Windows Phone", "iPad","iPod"];
    var mobile_flag = false;
    
    for (var v = 0; v < mobileAgents.length; v++) {
        if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
            mobile_flag = true;
            break;
        }
    }
    var screen_width = window.screen.width;
    var screen_height = window.screen.height;
    if(screen_width < 500 && screen_height < 800){
        mobile_flag = true;
    }
 	return mobile_flag;
}

//判断是否是微信浏览器的函数
function isWeiXin(){
	var ua = window.navigator.userAgent.toLowerCase();
	
	if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		return true;
	}else{
		return false;
	}
}

function isMobile() {
	if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
		return true;
	} else {
		return false;
	}
}

function isMobileClient() {
	var userAgentInfo = navigator.userAgent;
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
	var agentinfo = null;
	for(var i = 0; i < Agents.length; i++) {
		if(userAgentInfo.indexOf(Agents[i]) > 0) {
			agentinfo = userAgentInfo;
			break;
		}
	}
	if(agentinfo) {
		return true;
	} else {
		return false;
	}
}

function multi(pagenum,tagid)
{
	var taget_obj = document.getElementById(tagid);
	var taget_obj_page = document.getElementById("page_"+tagid);
	myajax = new DedeAjax(taget_obj,false,false,'','','');
	myajax.SendGet2("/plus/arcmulti.php?mtype=0&pnum="+pagenum+'&tagid='+tagid);
	myajax = new DedeAjax(taget_obj_page,false,false,'','','');
	myajax.SendGet2("/plus/arcmulti.php?mtype=1&pnum="+pagenum+'&tagid='+tagid);
	DedeXHTTP = null;
}