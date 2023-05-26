var scrolltotop={
	setting:{
		startline:100, //起始行
		scrollto:0, //滚动到指定位置
		scrollduration:400, //滚动过渡时间
		fadeduration:[500,100] //淡出淡现消失
	},
	controlHTML:'<img src="/static/html/images/topback.gif" style="width:54px; height:54px; border:0;" />', //返回顶部按钮
	controlattrs:{offsetx:30,offsety:80},//返回按钮固定位置
	anchorkeyword:"#top",
	state:{
		isvisible:false,
		shouldvisible:false
	},scrollup:function(){
		if(!this.cssfixedsupport){
			this.$control.css({opacity:0});
		}
		var dest=isNaN(this.setting.scrollto)?this.setting.scrollto:parseInt(this.setting.scrollto);
		if(typeof dest=="string"&&jQuery("#"+dest).length==1){
			dest=jQuery("#"+dest).offset().top;
		}else{
			dest=0;
		}
		this.$body.animate({scrollTop:dest},this.setting.scrollduration);
	},keepfixed:function(){
		var $window=jQuery(window);
		var controlx=$window.scrollLeft()+$window.width()-this.$control.width()-this.controlattrs.offsetx;
		var controly=$window.scrollTop()+$window.height()-this.$control.height()-this.controlattrs.offsety;
		this.$control.css({left:controlx+"px",top:controly+"px"});
	},togglecontrol:function(){
		var scrolltop=jQuery(window).scrollTop();
		if(!this.cssfixedsupport){
			this.keepfixed();
		}
		this.state.shouldvisible=(scrolltop>=this.setting.startline)?true:false;
		if(this.state.shouldvisible&&!this.state.isvisible){
			this.$control.stop().animate({opacity:1},this.setting.fadeduration[0]);
			this.state.isvisible=true;
		}else{
			if(this.state.shouldvisible==false&&this.state.isvisible){
				this.$control.stop().animate({opacity:0},this.setting.fadeduration[1]);
				this.state.isvisible=false;
			}
		}
	},init:function(){
		jQuery(document).ready(function($){
			var mainobj=scrolltotop;
			var iebrws=document.all;
			mainobj.cssfixedsupport=!iebrws||iebrws&&document.compatMode=="CSS1Compat"&&window.XMLHttpRequest;
			mainobj.$body=(window.opera)?(document.compatMode=="CSS1Compat"?$("html"):$("body")):$("html,body");
			mainobj.$control=$('<div id="topcontrol">'+mainobj.controlHTML+"</div>").css({position:mainobj.cssfixedsupport?"fixed":"absolute",bottom:mainobj.controlattrs.offsety,right:mainobj.controlattrs.offsetx,opacity:0,cursor:"pointer"}).attr({title:"返回顶部"}).click(function(){mainobj.scrollup();return false;}).appendTo("body");if(document.all&&!window.XMLHttpRequest&&mainobj.$control.text()!=""){mainobj.$control.css({width:mainobj.$control.width()});}mainobj.togglecontrol();
			$('a[href="'+mainobj.anchorkeyword+'"]').click(function(){mainobj.scrollup();return false;});
			$(window).bind("scroll resize",function(e){mainobj.togglecontrol();});
		});
	}
};
scrolltotop.init();

function showImg(){ 
document.getElementById("wxImg").style.display='block'; 
} 
function hideImg(){ 
document.getElementById("wxImg").style.display='none'; 
} 

function showwImg(){ 
document.getElementById("shoujiImg").style.display='block'; 
} 
function hideeImg(){ 
document.getElementById("shoujiImg").style.display='none'; 
}
function showwbImg(){
document.getElementById("weiboImg").style.display='block';
}
function hidewbImg(){
document.getElementById("weiboImg").style.display='none';
}


function showwxImg(){
	document.getElementById("weixinImg").style.display='block';
}
function hidewxImg(){
	document.getElementById("weixinImg").style.display='none';
}

//弹出框

function showma(){
    document.getElementById("MobileER").style.display="";
            }
function closema(){
	document.getElementById("MobileER").style.display="none";
            }

window.onscroll=function(){
    var t=document.documentElement.scrollTop||document.body.scrollTop;
	var div1=document.getElementById("mainRight");
	var div2=document.getElementById("news-topshare");
	if(div1){
		if(t >= 45){
			$("#mainRight").css("margin-top",(t-45)+"px");
		}else{
			$("#mainRight").css("margin-top","0px");
			div1.className = "mainRight";
		}
	}else if(div2){
		var mTop = document.getElementsByClassName('box')[0].offsetTop;
		if(t>= (mTop+15)){
			div2.className = "news-topshare-fixed";
		}else{
			div2.className = "news-topshare";
		}
	}
}

//列表页左边导航
function fixInit(){
	var obj = document.getElementById("js_fix_top");
	var bar = document.getElementById("js_fix_topBar");
	var T = parseInt($("#js_fix_top").attr("originT")) || $("#js_fix_top").offset().top;
	$("#js_fix_top").attr("originT",T);
	var H = $("#js_fix_top").height();
	var Tb = 110;
	var Lbar = ($(window).width() - $(".Main").width()) / 2 >0?($(window).width() - $(".Main").width()) / 2:0;
	showNot();
	$(window).unbind("scroll").bind("scroll",function(ev){
		showNot();
		if($(window).scrollTop() >= 100){
				$('#js_totop').show();
			}else{
				$('#js_totop').hide();
			}
	})

	function showNot() {
		var sT = $(window).scrollTop();
		if (sT >= T) {
			$(obj).css({
				"position": "fixed",
				"top": "20px"
			});
		} else {
			$(obj).css({
				"position": "relative",
				"top": ""
			});
		}
		if (sT >= Tb) {
			// alert(Lbar);
			$(bar).css({
				"position": "fixed",
				"top": "0px",
				"left":Lbar+"px"
			});
			$(".mainMiddle").css({
				"margin-left":"200px"
			})
		} else {
			$(bar).css({
				"position": "relative",
				"top": "",
				"left":""
			});
			$(".mainMiddle").css({
				"margin-left":""
			})
		}
	}
}