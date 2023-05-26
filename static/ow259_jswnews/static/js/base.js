// JavaScript Document
//=================================================================
//				全站通用脚本JS
//=================================================================

//基础变量
var ajaxloading = "<img src=/icon/loading.gif />";
var ww = window.screen.width;	//屏幕宽度
var wh = window.screen.height;	//屏幕高度

function SlyarErrors() { 
	return true;
} 
window.onerror = SlyarErrors;	//若脚本错误 不表现给终端用户

//JS警告框
function err(str)
  {
    var cf=window.confirm(str);
    if (cf)
    { return true; }
    else
    { return false; }
  }
  
//上传文件时直接把最新的写入文本框
function GetImg(obj){
	if (!obj) return;
	var str = obj.value;
	var arr = str.split("|");
	var k = arr.length-1;
	obj.value = arr[k];
}

//颜色选择器
function GetColor(label){
	Windows(0,"","c","/Plugin/selcolor.html?"+label,400,300);
}

////////////////////////////////////////////////////////////////////////////////////////
$(function(){
	$('input, textarea').placeholder();
	
	//表单非法字符统一处理
	//var REPLACESTR = /['()<>%!@#^…….？?=+*/~&、\\]/g;
	var REPLACESTR = /['\\]/g;	//需要替换的非法字符
	$(document).on('keyup','.replacestr',function(){
		var v = $(this).val();
		if(v!=''){
			v = v.replace(REPLACESTR,'');
			$(this).val(v);
		}
	});
	
	//复选框全选 当标签为 id=“checkall” 的点击后 所有页面 input.name=id的都触发
	$(document).on("click","#checkall",function(){
		var checked = $(this).is(':checked');
		var label = $(this).attr("label");
		if(typeof(label)=='undefined'){label = "input[name='id']";}//默认标签
		$(label).each(function(){
			$(this).prop("checked",checked);
		});
	});
	
	//分页按钮确定
	$(".pagejump").click(function(){
		var nurl;
		var url = $(this).attr("url");
		var maxpage = parseInt($(this).attr("maxpage"));
		var types = $(this).attr("types");
		var page = parseInt($(this).siblings("u").find(".num").val());
		page = (page > maxpage) ? maxpage : page;
		if(types==0){//动态
			nurl = url + "&page=" + page;	
		}else{//静态
			nurl = url + page + "/";
		}
		window.location.href = nurl;
	});
	
	//分页的select 适合移动端
	$(".paging select").change(function(){
		var url = $(this).val();
		window.location.href = url;
	});
	
	//浏览器升级提醒
	var browstip = "<!--[if lte IE 8]>\
						<div class='brows-tip'>\
							<p>你正在使用一个<strong>过时</strong>的浏览器。请<a href='http://browsehappy.osfipin.com/' target='_blank'>升级您的浏览器</a>，以提高您的体验。<span>X</span></p>\
						</div>\
					<![endif]-->";
	$("body").prepend(browstip);
	
	//关闭升级提醒
	$(".brows-tip span").click(function(){
		$(".brows-tip").remove();
	});
	
	
	//移动端菜单
	$(".logo i").click(function(){
		$(".menu").slideToggle();
	});
	
	
});

//去除两端空格
function trim(string){
	return string.replace(/(^\s*)|(\s*$)/g, '');
}

//元素名称选择器
function $name(name){
	return document.getElementsByName(name);	
}

//元素隐藏 批量操作
function Hide(objs){
	var obj = objs.split(",");
	for(i=0;i<obj.length;i++){
		$(obj[i]).addClass('hide');
	}
}

//表单元素只读 批量操作
function ReadOnly(objs){
	var obj = objs.split(",");
	for(i=0;i<obj.length;i++){
		$(obj[i]).attr("readonly",true);
	}	
}

//表单元素禁用 批量操作
function Disabled(objs){
	var obj = objs.split(",");
	for(i=0;i<obj.length;i++){
		$(obj[i]).attr("disabled",true);
	}
}

//弹窗 (是否警告0|1 警告语 新窗口名 链接 宽 高)
function Windows(error,str,name,links,w,h){
	//if(error==1){return Err(str);}
	if(error==1){
		var cn = window.confirm(str);
		if(!cn){
			return false;
		}
	}
	var top = (wh-h)/2;
	var left = (ww-w)/2;
	window.open(links,name,"height=" + h + ",width=" + w + ",top="+ top +",left="+ left +",toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,status=no");
}

//异步执行程序后刷新当前页
function AjaxDo(warn,error,url,data,isrefresh){
	if(warn==1){
		var cn = window.confirm(error);
		if(!cn){
			return false;
		}
	}
	
	$.ajax({
		url:url,
		data:data,
		type:'post',
		async:true,
		success:function(result){
			result = result.split('||');
			alert(result[1]);
			if(isrefresh == 1 && result[0] == 'success'){
				window.location.reload();
			}
		},
		error:function(){
			alert('程序执行错误，请检查！');
		}
	});
}

//异步获取内容
function AjaxDetail(label,url,data){
	var IsMultiple = arguments[3] ? arguments[3] : 0;	//可变参数 用于判断内容是否拆分显示
	$.ajax({
		url:url,
		//cache: false,	//不缓存
		data:data,
		type:'post',
		async:true,
		beforeSend:function(){
			$(label).html(loading);
		},
		success:function(result){
			alert(result);
			if(IsMultiple){
				var v = result.split("{next}");
				var _obj = label.split(",");
				for(var i=0;i<_obj.length;i++){
					$(_obj[i]).html(v[i]);	
				}
			}else{
				$(label).html(result);
			}
				
		},
		error:function(){
			$(label).html(errlog);	
		}
	});	
}

//批量检测字段是否为空 参数示例：
//var compare = [{"warn":"商品规格值数据不完整","cols":["product_sn","gp_market_price","gp_price","gp_stock"]},{"warn":"商品规格值数据不完整","cols":["product_sn","gp_market_price","gp_price","gp_stock"]}];	
//var replaceCols = ["a"];//需要替换初始值的字段	
function BatchCheck(compare,replaceCols){
	for(var i=0;i<compare.length;i++){//compare[]数组
		for(var k=0;k<compare[i].cols.length;k++){//compare[].cols[]数组
			len = $name(compare[i].cols[k]).length;
			for(var j=0;j<len;j++){//元素表单数量
				v = $name(compare[i].cols[k])[j].value;
				if($.inArray(compare[i].cols[k],replaceCols) != -1){v=v.replace('0','');}
				if(v == ''){
					alert(compare[i].warn);
					return false;
				}
			}
		}
	}
}

//加入收藏
function addFavorite() {
    var url = window.location;
    var title = document.title;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("360se") > -1) {
        alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
    }
    else if (ua.indexOf("msie 8") > -1) {
        window.external.AddToFavoritesBar(url, title); //IE8
    }
    else if (document.all) {
  try{
   window.external.addFavorite(url, title);
  }catch(e){
   alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
  }
    }
    else if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
    }
    else {
  alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    }
}

//设为首页
function SetHome(obj,str){
	var url = window.location;
    try{
        obj.style.behavior='url(#default#homepage)';
        obj.setHomePage(url);
    }catch(e){
        if(window.netscape){
            try{
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }catch(e){
                alert(str);
            }
        }else{
            alert(str)
        }
    }
}

//锁定页面
function lockpage(){
	var str = arguments[0] ? arguments[0] : 0;	//可变参数 是否显示内容
	var divs = "<div class=lock>";
	if(str){divs+="<h1>"+ str +"</h1>";}
	divs += "</div>";
	$(document.body).append(divs); 
	$('.lock').css({height:function(){
		return $(document).height();
	},
	width:"100%"
	});
}

//取消锁定
function unlockpage(){
	$('.lock').remove();
}

////////////////////////////////////////////////////////////////////////////////////////


///以下检测水印文字或图片的宽高属性
//function doCheckWH(flag){
//	var oForm = document.myform;
//	if (flag==1){
//		tdPreview.innerHTML="<span style='font-size:"+oForm.d_syfontsize.value+";font-family:"+oForm.d_syfontname.value+"'>"+oForm.d_sytext.value+"</span>";
//		oForm.d_sywztextwidth.value=tdPreview.offsetWidth;
//		oForm.d_sywztextheight.value=tdPreview.offsetHeight;
//	}else{
//		var url=oForm.d_sypicpath.value;
//		if (url==""){
//			oForm.d_sytpimagewidth.value="0";
//			oForm.d_sytpimageheight.value="0";
//			tdPreview.innerHTML="";
//		}else{
//			if ((url.substring(0,1)!=".")&&(url.substring(0,1)!="/")){
//				url="../"+getAppExt()+"/"+url;
//			}
//			tdPreview.innerHTML="<img border=0 src='"+url+"' onload='setCheckWH()' onerror='ErrorCheckWH()'>";
//		}
//	}
//}
//
//function getAppExt(){
//	var p = location.pathname;
//	var n = p.lastIndexOf(".");
//	return p.substr(n+1).toLowerCase();
//}
//
//function setCheckWH(){
//	document.myform.d_sytpimagewidth.value=tdPreview.offsetWidth;
//	document.myform.d_sytpimageheight.value=tdPreview.offsetHeight;
//}
//
//function ErrorCheckWH(){
//	BaseAlert(document.myform.d_sypicpath,"无效的图片水印图片路径！");
//}
