// TAB切换
function nTabs(thisObj,Num)
{
  if(thisObj.className == "active")return;
  var tabObj = thisObj.parentNode.id;
  var tabList = document.getElementById(tabObj).getElementsByTagName("li");
  for(i=0; i <tabList.length; i++)
  {
    if (i == Num)
      {
     thisObj.className = "active"; 
        document.getElementById(tabObj+"_Content"+i).style.display = "block";
      }
    else
     {
     tabList[i].className = "normal"; 
     document.getElementById(tabObj+"_Content"+i).style.display = "none";
    }
  } 
}

// 首页日期
Date.prototype.pattern=function(fmt) {         
    var o = {         
    "M+" : this.getMonth()+1, //月份         
    "d+" : this.getDate(), //日         
    "h+" : this.getHours()%24 == 0 ? 24 : this.getHours()%24, //小时         
    "H+" : this.getHours(), //小时         
    "m+" : this.getMinutes(), //分         
    "s+" : this.getSeconds(), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0":"\u65e5",         
    "1" : "\u4e00",         
    "2" : "\u4e8c",         
    "3" : "\u4e09",         
    "4" : "\u56db",         
    "5" : "\u4e94",         
    "6" : "\u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;         
}     

setInterval("time.innerHTML=(new Date()).pattern(\"yyyy-MM-dd hh:mm:ss EEE\");",1000);


// 缩放字体
function changesize(size){
	document.getElementById('font').style.fontSize=size+'px';
}


//列表分类导航
function changeMenu(M_sw,S_sw,E_sw){
	var f_sw = 'sw_';
	for(var i=S_sw;i<=E_sw;i++){
		if(i==M_sw){
			document.getElementById(f_sw+M_sw+'_a').className="now";
			document.getElementById(f_sw+M_sw+'_div').style.display="";
		}else{
			document.getElementById(f_sw+i+'_a').className="";
			document.getElementById(f_sw+i+'_div').style.display="none";
		}
	}
}

//滚动效果
var currslid = 0;
var slidint;
function setfoc(id){
	currslid = id;
	for(i=0;i<2;i++){
		document.getElementById("solid_item_"+i).className = "";
		document.getElementById("solid_data_"+i).style.display = "none";
	};
	document.getElementById("solid_item_"+id).className ="now";
	document.getElementById("solid_data_"+id).style.display = "";
	stopit();
}

function playnext(){
	if(currslid==1){
		currslid = 0;
	}
	else{
		currslid++;
	};
	setfoc(currslid);
	playit();
}
function playit(){
	slidint = setTimeout(playnext,5000);
}
function stopit(){
	clearTimeout(slidint);
}

var slidint_b;
function setfoc_b(id){
	currslid_b = id;
	for(i=0;i<2;i++){
		document.getElementById("solid_item_b_"+i).className = "";
		document.getElementById("solid_data_b_"+i).style.display = "none";
	};
	document.getElementById("solid_item_b_"+id).className ="current";
	document.getElementById("solid_data_b_"+id).style.display = "";
	stopit_b();
}
function setfoc_b(M_sw,S_sw,E_sw){
	var f_sw = 'sw_';
	for(var i=S_sw;i<=E_sw;i++){
		if(i==M_sw){
			document.getElementById(f_sw+M_sw+'_a').className="now";
			document.getElementById(f_sw+M_sw+'_div').style.display="";
		}else{
			document.getElementById(f_sw+i+'_a').className="";
			document.getElementById(f_sw+i+'_div').style.display="none";
		}
	}
	stopit_b();
}
function playnext_b(s){
	if(s==4){
		s = 1;
	}
	else{
		s++;
	};
	setfoc_b(s,1,4);
	playit_b(s);
}
function playit_b(str){
	//slidint_b = setTimeout(playnext_b(5),5000);
	slidint_b = setTimeout(function(){playnext_b(str);},5000); 
}
function stopit_b(){
	clearTimeout(slidint_b);
}


$(function(){
	var oDiv = $("#play");  //外部盒子
	var count = $("#play ul li").length;  //内部图片数量
	var countwidth = $("#play ul li").width();  //图片边框宽度
	var oUl = $("#play ul").css("width",count*countwidth);  //ul li总宽度
	var now = 0;
	var next = $("#next");
	var prev = $("#prev");

	//按钮点击事件
	var aBtn = $("#play ol li");
	aBtn.each(function(index){
		$(this).click(function(){
			clearInterval(timer);
			tab(index);
			nextImg();
			prevImg();
			timer=setInterval(autoRun,2000);
		});
	});
	//图片循环事件
	function tab(index){
		now = index;
		aBtn.removeClass("active");
		aBtn.eq(index).addClass("active");
		oUl.stop(true,false).animate({"left":-countwidth * now},400);
	}
	//下一张按钮图片切换
	function nextImg(){
		var d = $("#play ul li").find("img").eq(now+1).attr("src");
		var nI = $("#play ul li:nth-child(1)").find("img").attr("src");
		$(".nextImg").find("img").attr("src",d);
		if(now==count-1){
			$(".nextImg").find("img").attr("src",nI);
		}
	}
	//上一张图片按钮切换
	function prevImg(){
		var f = $("#play ul li").find("img").eq(now-1).attr("src");
		$(".prevImg").find("img").attr("src",f);
	}
	
	//下一张点击事件
	next.click(function(){
		clearInterval(timer);
		now++;
		if(now==count){
			now=0;
		}
		tab(now);
		nextImg();
		prevImg();
		timer=setInterval(autoRun, 2000);
	});
	//上一张点击事件
	prev.click(function(){
		clearInterval(timer);
		now--;
		if(now==-1){
			now=count-1;
		}
		tab(now);
		nextImg();
		prevImg();
		timer=setInterval(autoRun, 2000);
	});
	//自动轮播定义
	function autoRun(){
		now++;
		if(now==count){
			now=0;
		}
		tab(now);
		nextImg();
		prevImg();
	};
	var timer=setInterval(autoRun, 5000);
});




$(function(){
	var oDiv = $("#play1");  //外部盒子
	var count = $("#play1 ul li").length;  //内部图片数量
	var countwidth = $("#play1 ul li").width();  //图片边框宽度
	var oUl = $("#play1 ul").css("width",count*countwidth);  //ul li总宽度
	var now = 0;
	var next = $("#next1");
	var prev = $("#prev1");

	//按钮点击事件
	var aBtn = $("#play1 ol li");
	aBtn.each(function(index){
		$(this).click(function(){
			clearInterval(timer);
			tab(index);
			nextImg();
			prevImg();
			timer=setInterval(autoRun,2000);
		});
	});
	//图片循环事件
	function tab(index){
		now = index;
		aBtn.removeClass("active");
		aBtn.eq(index).addClass("active");
		oUl.stop(true,false).animate({"left":-countwidth * now},400);
	}
	//下一张按钮图片切换
	function nextImg(){
		var d = $("#play1 ul li").find("img").eq(now+1).attr("src");
		var nI = $("#play1 ul li:nth-child(1)").find("img").attr("src");
		$(".nextImg").find("img").attr("src",d);
		if(now==count-1){
			$(".nextImg").find("img").attr("src",nI);
		}
	}
	//上一张图片按钮切换
	function prevImg(){
		var f = $("#play1 ul li").find("img").eq(now-1).attr("src");
		$(".prevImg").find("img").attr("src",f);
	}
	
	//下一张点击事件
	next.click(function(){
		clearInterval(timer);
		now++;
		if(now==count){
			now=0;
		}
		tab(now);
		nextImg();
		prevImg();
		timer=setInterval(autoRun, 2000);
	});
	//上一张点击事件
	prev.click(function(){
		clearInterval(timer);
		now--;
		if(now==-1){
			now=count-1;
		}
		tab(now);
		nextImg();
		prevImg();
		timer=setInterval(autoRun, 2000);
	});
	//自动轮播定义
	function autoRun(){
		now++;
		if(now==count){
			now=0;
		}
		tab(now);
		nextImg();
		prevImg();
	};
	var timer=setInterval(autoRun, 5000);
});