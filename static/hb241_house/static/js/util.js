/*
*数组转换成字符串
*/
function implode(tag,arr){
	var str = '';
	for(var i=0;i<arr.length;i++){
		if(i>0) str += tag;
		str += arr[i];		
	}
	return str;
}

/*
*字符串转换成数组
*/
function explode(tag,str){
	if(str!=null){
	  var arr = str.split(tag);
	  return arr;
	}
	else{
		return str;
	}
}

/*
*在数组中查找某元素看是否存在

Array.prototype.find=function(val){
	for(var i=0;i<this.length;i++){
		if(val==this[i]) return true;
	}
	return false;
}*/

/*
*类似 php 中的 print_r 函数，调试程序时非常有用
*/
function print_r(o,re){
    var res = "";
    for(var name in o){
        if(o[name]){
            var val = o[name];
            switch(typeof(val)){
                case "string" :
                    val = val.replace(/</g,"&lt;").replace(/>/g,"&gt;")
                    break;
                case "function":
                    val = "function(){...}";
                    break;                
            }    
            res+=name+" => "+val+"\n";    
        }
    }

    res = "<pre>"+res+"</pre>"
    if(re) return res;
    var oSpan = document.getElementById("span_print_r");
    if(!oSpan){
        oSpan = document.createElement("span");        
        oSpan.id="span_print_r";
        document.body.insertBefore(oSpan,document.body.childNodes[0]);
    }
    oSpan.innerHTML = res;                          
}

//截取字符串 包含中文处理 
//(串,长度,增加...) 
function SubstringCN(str, len, hasDot) 
{ 
    var newLength = 0; 
    var newStr = ""; 
    var chineseRegex = /[^\x00-\xff]/g; 
    var singleChar = ""; 
    var strLength = str.replace(chineseRegex,"**").length; 
    for(var i = 0;i < strLength;i++) 
    { 
        singleChar = str.charAt(i).toString(); 
        if(singleChar.match(chineseRegex) != null) 
        { 
            newLength += 2; 
        }     
        else 
        { 
            newLength++; 
        } 
        if(newLength > len) 
        { 
            break; 
        } 
        newStr += singleChar; 
    } 
     
    if(hasDot && strLength > len) 
    { 
        newStr += "..."; 
    } 
    return newStr; 
} 

function getLocalTimes(nS) { 
  return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}


//文章页的相关文章把来自网视的内容自动标上“（视频）”字样
function set_art_about(ID) {
    
    if ($(ID).length <= 0) return;

	var arr  = new Array();
	var about_con = $(ID).html();
	
	if ((location.href).indexOf('/staticpages/') < 0 || about_con.indexOf('</a>') < 0) {
		return;	
	}
	
	arr = about_con.split('</a>');
	
	for (var i in arr) {
		if ((arr[i]).indexOf('href="http://tv.gxnews.com.cn') > 0) {
			arr[i] = arr[i] + "(视频)";
		}
	}
	
	$(ID).html(arr.join("</a>"));
}




$(document).ready(function() {		
	// 相关文章处理
	set_art_about('#pagebody #left #left_6'); // 通用模板文章页
});


//重置文章内文图片尺寸
if (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0) { // chrome, webkit内核浏览器
	$(window).load(function(){ resize_artcon_img(); });
} else {
	$(document).ready(function() {	 resize_artcon_img(); });
}

function resize_artcon_img() {
	var maxWidth = parseInt(maxWidth) > 0 ? maxWidth : 550; //内文图片的最大宽度
	$('#artContent img, #content img, .content img').each(function(i){
		(parseInt(this.width) > maxWidth) && (this.width = maxWidth);
	});
}
//重置 END


//查看广告位置编号
document.write('<style type="text/css"> .gxnews_ggao_place { position: relative; } .gxnews_ggao_place_text { width: 100%; height: 20px; line-height: 20px; border: 0; text-align: center; background-color: #000; font-weight: bold; color: #FFF; } </style>');
$(document).ready(function() {
	
	var url = window.location.href;
	var arr1 = arr2 = new Array();
	if (url.indexOf('?') >= 0) {
		arr1 = url.split('?');
	
		if (arr1[1].indexOf('#') >= 0) {
			arr2 = arr1[1].split('#');
		}
		else {
			arr2[0] = arr1[1];
		}
	}
	if (arr2[0] == 'gxnews_view_ggao_pid')
	{
		if (arr2[1] != '') {
			$('#' + arr2[1]).css({'border': '3px solid #F00'});
		}
		$('.gxnews_ggao_place').each(function(i){
				var arr2 = new Array();
				arr2 = (this.id).split('_');
				$(this).append('<div class="gxnews_ggao_place_tip_' + arr2[3] + '"><input readonly class="gxnews_ggao_place_text" type="text" value="位置ID：' + arr2[3] + '" /></div>');
				$('.gxnews_ggao_place>.gxnews_ggao_place_tip_' + arr2[3]).css({
					'left': '0px',
					'top': '0px',
					'width': '120px', 
					'height': '20px', 
					'background': '#000',
					'position': 'absolute', 
					'filter': 'Alpha(opacity=70)', 
					'-moz-opacity': '0.7', 
					'opacity': '0.7'
				});
		});
	}
});

//*   判断在数组中是否含有给定的一个变量值
//*   参数：
//*   obj：需要查询的值
//*    a：被查询的数组
//*   在a中查询obj是否存在，如果找到返回true，否则返回false。
//*   此函数只能对字符和数字有效
function in_array(obj,a) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
     
    return false;
}

//防止冒泡
function StopPop(event){
	var e=window.event || event;
  if(e.stopPropagation){
   e.stopPropagation();
  }else{
   e.cancelBubble = true;
  }
}

function date(format, UnixTime) {
    this_Date = new Date(UnixTime?(parseInt(UnixTime)*1000):(new Date().getTime()));
    var weekday = new Array('Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday');
    return format.replace(/y/i, this_Date.getFullYear()).
    replace('m', parseInt(this_Date.getMonth()+1) < 10 ?
    '0'+parseInt(this_Date.getMonth()+1) : parseInt(this_Date.getMonth()+1)).
    replace('d', parseInt(this_Date.getDate()) < 10 ?
    '0'+this_Date.getDate() : this_Date.getDate()).
    replace(/h/i, this_Date.getHours() < 10 ?
    '0' + this_Date.getHours() : this_Date.getHours()).
    replace('i', this_Date.getMinutes() < 10 ?
    '0' + this_Date.getMinutes() : this_Date.getMinutes()).
    replace('s', this_Date.getSeconds() < 10 ?
    '0' + this_Date.getSeconds() : this_Date.getSeconds()).
    replace('w', this_Date.getDay()).
    replace('W', weekday[this_Date.getDay()]);
}

function time() {
    return parseInt(new Date().getTime()/1000);
}