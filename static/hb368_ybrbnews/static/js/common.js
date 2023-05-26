window.onerror=function(){return true;}
function setSimg(sid,sw,sh){
	var sid = $(sid);
	sid.removeAttr("width").removeAttr("height");
	if((parseFloat(sid.width()/sid.height()))>(parseFloat(sw/sh))){
		sid.attr("style","height:"+ sh + "px;");
	}else{
		sid.attr("style","width:"+ sw + "px;");
	}
}

$(document).ready(function(){
	$("#titmenu li").mousemove(function(){
		$(".lm202").hide();
		var dataIndex = $(this).attr("data-index");
		if(dataIndex == "0"){
			$("#xme8").show(0);
		}else{
			$("#lm" + dataIndex).show(0);
		}
	})
	function clock() {
		var week = new Array("日", "一", "二", "三", "四", "五", "六");
		var today = new Date(); iMonth = today.getMonth() + 1; document.getElementById('xme81').innerHTML = "<img src=\"http://www.iybrb.com/res/img/2018/26091.png\" />" + today.getFullYear() + "年" + iMonth + "月" + today.getDate() + "日 星期" + week[today.getDay()];
		$("#xme8").show(100);
	}
	clock();
});

$(document).ready(function(){
	$("#showmobile").hover(function(){ 
		$("#show_contact_us-box").hide();
		var p = $(this).position(); 
		 $("#showmobile-box").css( "left", p.left - 105 + "px").css("top",p.top + 29 + "px").show();
	});
	$("#show_contact_us").hover(function(){ 
		$("#showmobile-box").hide();
		var p = $(this).position(); 
		 $("#show_contact_us-box").css( "left", p.left - 170 + "px").css("top",p.top + 29 + "px").show();
	});
	$("#showmobile-box").mouseleave(function(){$(this).hide(200);});
	$("#show_contact_us-box").mouseleave(function(){$(this).hide(200);});
});


$(document).ready(function(){	
	var RightMenuStatus = 1;
	$("#x3601").click(function(){
		$("html,body").animate({scrollTop:0}, 500);
	});
	$("#x3602").click(function(){
		RightMenuStatus = 0;
		$("#rightmenu").hide();
	});
	function setRightMenuTop(){
		$("#rightmenu").css("top",function(){
			var mh = $(this).outerHeight();
			return ($(window).height() - mh) /2;
		})
	}
	$(window).resize(function(){
		if(RightMenuStatus==0)return;
		if($(window).width()>1240)
		{
			$("#rightmenu").fadeIn(200);
			setRightMenuTop();
		}
		else
			$("#rightmenu").fadeOut(200);
	});
	setRightMenuTop();
});

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(4($){$.B.K=4(h){3 q={"8":H};3 p=$.A({},q,h);3 8=p.8;3 p=$.A({},q,h);3 9=$(6).c(\'.G 5\');3 r=$(6).c(\'D.F\');3 7=9.7;3 2=0;3 b=[];J(i=0;i<7;i++){j(i==0){b.s("<5 u=\'l\' m-n=\'"+i+"\'></5>")}I{b.s("<5 u=\'t\' m-n=\'"+i+"\'></5>")}};$("<E/>",{"C":"d",L:b.T("")}).V(r);4 e(){9.U(0);9.v(2).Y(W);$("#d 5").X("l").x("t");$("#d 5:v("+2+")").x("l")};$("#d 5").o(4(){2=$(6).N("m-n");e()});$(6).c("a.z-M").o(4(){2--;j(2<0){2=7-1}e();k w});4 f(){2++;j(2>=7){2=0}e()};$(6).c("a.z-P").o(4(){f();k w});3 g=0;g=y(f,8);$(6).S(4(){R(g)},4(){g=y(f,8)});k Q}})(O);',61,61,'||currentIndex|var|function|li|this|length|Interval|maincell||items|find|slidecell|tows|arrowRight|cleartime|options||if|return|focus|data|index|click|settings|defaults|numcell|push|normal|class|eq|false|addClass|setInterval|arrow|extend|fn|id|div|ul|num|slider|3000|else|for|rSlider|html|left|attr|jQuery|right|true|clearInterval|hover|join|fadeOut|appendTo|1000|removeClass|fadeIn'.split('|'),0,{}))