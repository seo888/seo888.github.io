//通用
function css(elem,css){
	var _this=this;
	if(typeof css=='string'){
		var style=document.defaultView && document.defaultView.getComputedStyle && getComputedStyle(elem, null) || elem.currentStyle || elem.style || {};
		return style[toCase(css)];
	}else{
		var prop,
			propFix;
		for(prop in css){
			if(prop=='float'){
				propFix=("cssFloat" in _this.testStyle) ? 'cssFloat' : 'styleFloat';
			}else{
				propFix=toCase(prop);
			}
			elem.style[propFix]=css[prop];
		}
	}
}
function toCase(str){
	return (str+'').replace(/^-ms-/, 'ms-').replace(/-([a-z]|[0-9])/ig, function(all, letter){
		return (letter+'').toUpperCase();
	});
}
function addListener(e, n, o, u){
	if(e.addEventListener){
		e.addEventListener(n, o, u);
		return true;
	} else if(e.attachEvent){
		e.attachEvent('on' + n, o);
		return true;
	}
	return false;
}
function offsetDis(obj){
	var T =0;
	var L =0;
	var oP = obj;
	while(oP){
		T += oP.offsetTop;
		L += oP.offsetLeft;
		oP = oP.offsetParent;
	}
	return {
		T:T,
		L:L
	}
}

function toTop(oBtn){
	var _clientWidth = document.documentElement.clientWidth;
	if(_clientWidth >=1300){
		$(oBtn).css({"right":((_clientWidth - 1200)/2 - 60) +"px"});
	}
	$(window).resize(function() {
		var _clientWidth = document.documentElement.clientWidth;
		if(_clientWidth >=1300){
			$(oBtn).css({"right":((_clientWidth - 1200)/2 - 60) +"px"});
		}
	});
	if(!oBtn){
		return false;
	}

	var timer = null;

	addListener(oBtn,"click",function(ev){
		var H = $(window).scrollTop();
		timer = setInterval(function(){
			if(H == 0){
				clearInterval(timer)
				$(oBtn).hide();
			}
			H = Math.floor(H*0.7);
			$(window).scrollTop(H);
		},50)
	});
}
function initLogin(login,cancel,content){
	$(login).bind("click",function(){
		$(content).show();
	})
	$(cancel).bind("click",function(){
		$(content).hide();
	})
	$(".qboxipt").bind("focus",function(){
		$(this).prev("span").hide();
	}).bind("blur",function(){
		if($(this).val()==''){
			$(this).prev("span").show();
		}
	})

	$("#qpassword").bind("keyup",function(ev){
		if(ev.keyCode == 13){
			$("#qindexlogin").click();
		}
	})

	$("#qindexlogin").click(function() {
	    $("#qindexlogin").html("登录中...").attr("disabled", "disabled");
	    var qusername = $("#qusername").val();
	    var qpassword = $("#qpassword").val();
	    var qday = $("#qday").prop('checked') ? 1 : 0;
	    if ((qusername.length < 2) || (qpassword.length < 4)) {
	        $("#qboxtit").html("请认真填写用户名密码！").addClass("cRed");
	        $("#qindexlogin").html("登　录").removeAttr("disabled");
	    } else {
	        $.getJSON("http://passport.qingdaonews.com/homelogin.php?username=" + encodeURI(qusername) + "&password=" + qpassword + "&days=" + qday + "&callback=?", function(json) {
	            if (json['result'] == 'success') {
	                $("#hp").html(json['username']);
	                $(".qlogin").hide();
	                $(".qlogout").show();
	                $(".qbox").hide();
	            } else {
	                $("#qboxtit").html("登陆失败，用户名或密码错误！").addClass("cRed");
	                $("#qindexlogin").html("登　录").removeAttr("disabled");
	            }
	        });
	    }
	});

}
function bindPages(obj){
	$('body').bind("keyup",function(ev){
		// console.log($(ev.target)[0].tagName);
		if($(ev.target)[0].tagName == 'BODY' || $(ev.target)[0].tagName == 'A'){
			// console.log(ev.keyCode)
			if(ev.keyCode == '37'){
				//左翻
				// console.log($(obj).find("span").prev("a"));
				if($(obj).find("span").index()>0)	window.location.href = $(obj).find("span").prev("a").attr("href");
			}else if (ev.keyCode == '39'){
				//右翻
				// console.log($(obj).find("span").next("a"));
				if($(obj).find("span").index()<($(obj).find("a").length)) window.location.href = $(obj).find("span").next("a").attr("href");
			}
		}
	})
}

function festivalClose(){
	$("#js_festival").hide();
	$("html").removeClass("festival");
}
// 兼容的placeHolder
function jsPlaceHolder(oTxtId,option){
    var _this=this;
    if(!oTxtId) return false;
    var  _test = "placeholder" in document.createElement("input");
    if(_test) return false;
    //以下代码是不支持的情况
    option=option||{};
    var oTxt=null;
    var setting={
        focusColor:"#333",
        blurColor:"#999"
    };
    for(var key in setting){
        if(!option[key]){
            option[key] = setting[key];
        }
    };
    if(typeof(oTxtId)!="string" && oTxtId.nodeType==1){
        oTxt = oTxtId;
        oTxtId=oTxt.id;
    }
    if(!oTxt){
        oTxt = document.getElementById(oTxtId);
    }
    var blurTxt = oTxt.getAttribute("placeholder").replace(/^\s+|\s+$/,"");
    oTxt.value = blurTxt;
    oTxt.style.color=setting.blurColor;
    _this.addListener(oTxt,"focus",function(){
        if(oTxt.value.replace(/^\s+|\s+$/,"")==blurTxt){
            oTxt.value="";
            oTxt.style.color=setting.focusColor;
        }
    });
    _this.addListener(oTxt,"blur",function(){
        if(oTxt.value.replace(/^\s+|\s+$/,"")==blurTxt || oTxt.value.replace(/^\s+|\s+$/,"")==""){
            oTxt.value=blurTxt;
            oTxt.style.color=setting.blurColor;
        }
    });
}
//move.js
//选项卡模型
function tab(id){
	var oBox = document.getElementById(id)
	this.oUl = oBox.getElementsByTagName("ul")[0];
	this.oLi = this.oUl.getElementsByTagName("li");
	this.oDiv = getClassName(oBox,"tabBox");
	var that = this;
	for(var i=0;i<this.oLi.length;i++){
		this.oLi[i].index = i;
		this.oLi[i].onmouseover = function(){
			that.fnClick(this);
		}
	}
}

tab.prototype.fnClick = function(btn){
	for(var i=0;i<this.oLi.length;i++){
		this.oLi[i].className = "";
		this.oDiv[i].className = "tabBox dn"
	}
	btn.className = "on"
	this.oDiv[btn.index].className = "tabBox"
}

//focus.js
//青岛新闻网 焦点图公共框架

//调取className
function getClassName(obj,className){
	if (obj.getElementsByClassName) {
		return obj.getElementsByClassName(className);
	}else{
		var result = [];
		var tags = obj.getElementsByTagName("*");
		for (var i = 0, len = tags.length; i < len; i++) {
			var classNames = tags[i].className.split(" ");
			for (var j = 0, l = classNames.length; j < l; j++) {
				if ( classNames[j] === className ) {
					result.push(tags[i]);
					break;
				}
			}
		}
		// 返回结果集
		return result;
	}
}

function focusImg(boxId,picId,numId,autoTime,imgWidth){
	var oBox = document.getElementById(boxId); //最外层div
	var oDiv = document.getElementById(picId); //图片组div
	var oPic = getClassName(oDiv,"fcon"); //所有含有fcon的div组
	var oPicNum = oPic.length;
	var oSpan = oBox.getElementsByTagName("span");

	//按钮进出
	$("#"+boxId).on("mouseover",function(){
		$("#"+boxId + " .prev,#"+boxId + " .next").css({display:"block"})
	})
	$("#"+boxId).on("mouseout",function(){

		$("#"+boxId + " .prev").css({display:"block"})
		$("#"+boxId + " .prev,#"+boxId + " .next").css({display:"none"})

	})

	//标签切换
	$("#"+numId).find("a").each(function(){
		$(this).click(
			function(){
				var numL = $(this).index();
				$(this).addClass("on").siblings().removeClass("on");
				$("#"+picId).animate({left:-numL*imgWidth + "px"})
			}
		)
		$(this).on("mouseover",function(){
			$("#"+boxId + " .prev,#"+boxId + " .next").stop()
		})
	})

	//左右按钮切换
	$("#"+boxId + " .prev").on("click",function(){
		btnClick(1);
	})
	$("#"+boxId + " .next").on("click",function(){
		btnClick(0);
	})

	//自动播放
	var timerA = setInterval(function(){btnClick(0)},autoTime)
	oBox.onmouseover = function(){
		clearInterval(timerA);
	}
	oBox.onmouseout = function(){
		timerA = setInterval(function(){btnClick(0)},autoTime)
	}

	function btnClick(asp){
		var imgList = parseInt($("#"+boxId+" .focusList").css("left"));

		function addon(obj){
			if($(obj).hasClass("on")){
				$(obj).removeClass("on");
				$("#"+numId).find("a").eq(num_this).addClass("on")
			}
		}

		if(asp == 0){
			if(!$("#"+picId).is(":animated")){
				var lOffsetLeft = parseInt($("#"+picId).css("left")); //图集当前定位
				var num_this = -lOffsetLeft/imgWidth+1;

				if(imgList == -(oPicNum-1)*imgWidth){
					$("#"+picId).animate({left:0})
					$("#"+numId + " a:first").addClass("on").siblings().removeClass("on");
				}else{
					$("#"+picId).animate({left: lOffsetLeft - imgWidth + "px"});
					$("#"+numId + " a").each(function(){
						addon(this);
					})
				}
			}
		}else{
			if(!$("#"+picId).is(":animated")){
				var lOffsetLeft = parseInt($("#"+picId).css("left")); //图集当前定位
				var num_this = -lOffsetLeft/imgWidth-1;

				if(imgList == 0){
					$("#"+picId).animate({left:-(oPicNum-1)*imgWidth+"px"})
					$("#"+numId + " a:last").addClass("on").siblings().removeClass("on");
				}else{
					$("#"+picId).animate({left: lOffsetLeft + imgWidth + "px"})
					$("#"+numId + " a").each(function(){
						addon(this);
					})
				}
			}
		}
	}

}
