function format(date,type) {
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
	var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
	var hours = date.getHours()<10? "0"+date.getHours():date.getHours();
	var min  = date.getMinutes()<10? "0"+date.getMinutes():date.getMinutes();
	var sec = date.getSeconds()<10? "0"+date.getSeconds():date.getSeconds()
	if(type==1){
	    return  date.getFullYear() + seperator1  + month  + seperator1  + strDate;
	}else if(type ==2){
	    return hours  + seperator2  + min + seperator2 + sec;
	}else if(type ==3){
		return  date.getFullYear() + '年'  + month +'月';
	}else if(type ==4){
		return date.getFullYear() + '/'  + month  + '/'  + strDate
	    	+ " "  + hours  + seperator2  + min + seperator2 + sec;
	}else if(type==5){
		return date.getFullYear() +'' + month +''  + strDate+''
	    	+ hours +'' + min +''+ sec;
	}else if(type==6){
		return date.getFullYear()+month;
	}
	else{
		var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
	    	+ " "  + hours  + seperator2  + min + seperator2 + sec;
	    return currentdate;
	}
}
function isURL(str_url) {// 验证url
var strRegex = "(^((http|https):\/\/))";
var re = new RegExp(strRegex);
return re.test(str_url);
}
function timeStamp(second_time){ 
	var time = parseInt(second_time) + "秒"; 
	if( parseInt(second_time )> 60){ 
	   
		var second = parseInt(second_time) % 60; 
		var min = parseInt(second_time / 60); 
		time = min + "分" + second + "秒"; 
		   
		if( min > 60 ){ 
			min = parseInt(second_time / 60) % 60; 
			var hour = parseInt( parseInt(second_time / 60) /60 ); 
			time = hour + "小时" + min + "分" + second + "秒"; 
	   
			// if( hour > 24 ){ 
			// 	hour = parseInt( parseInt(second_time / 60) /60 ) % 24; 
			// 	var day = parseInt( parseInt( parseInt(second_time / 60) /60 ) / 24 ); 
			// 	time = day + "天" + hour + "小时" + min + "分" + second + "秒"; 
			// } 
		} 
		   
	   
	} 
	   
	return time;         
}
function haveAllPermission(token,path,fun){
	$.ajax({
		type: "POST",
		headers: {
			"token": token //此处放置请求到的用户token
		},
		contentType:'application/json',
		url: '/cloud/apis/background/api/permission/haveAllPermission',
		data:JSON.stringify(path),
		dataType: 'json', //当这里指定为json的时候，获取到了数据后会自己解析的，只需要 返回值.字段名称 就能使用了
		cache: false,
		success: function(data) {
			if(data.code == 200) {
				fun(data.data);
			} else if(data.code == 401) {
				setTimeout('top.location.href = "/pages/login.html"', 1000);
			}
		}
	});
}
function havePermission(token,path,fun){
	$.ajax({
		type: "GET",
		headers: {
			"token": token //此处放置请求到的用户token
		},
		url: '/cloud/apis/background/api/permission/havePermission',
		data:{path:path},
		dataType: 'json', //当这里指定为json的时候，获取到了数据后会自己解析的，只需要 返回值.字段名称 就能使用了
		cache: false,
		success: function(data) {
			if(data.code == 200) {
				fun(data.data);
			} else if(data.code == 401) {
				setTimeout('top.location.href = "/pages/login.html"', 1000);
			}
		}
	});
}

function detect(){
	var equipmentType;
	var agent = navigator.userAgent.toLowerCase();
	var android = agent.indexOf("android");
	var iphone = agent.indexOf("iphone");
	var ipad = agent.indexOf("ipad");
	if(android != -1){
	  equipmentType = "android";
	}
	if(iphone != -1 || ipad != -1){
	  equipmentType = "ios";
	}
	return equipmentType;
}
function register(){
 window.webkit.messageHandlers.regcallBack.postMessage("");
}
function ioslogin(){
 window.webkit.messageHandlers.login.postMessage("");
}

function isNumber(val){

    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(val) || regNeg.test(val)){
        return true;
    }else{
        return false;
    }

}
function isHttps(){
	var ishttps = 'https:' == document.location.protocol ? true: false;
	return ishttps;
}
function return2Br(str) {
 return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+str.replace(/\r?\n/g,"<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
}

function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
}
function index(id){
    // 根据参数id取得该节点
    var obj = document.getElementById(id);
    // 获取该节点的父节点
    var p = obj.parentNode;
    // 取得父节点下的所有节点
    var tags = p.getElementsByTagName('*');
    // 在父节点的所有子节点中查找自己所在的位置
    for(var i=0,len=tags.length;i<len;i++){
        // 找到节点，返回下标
        if(tags[i] == obj){
            return i;
        }
    }
    // 不在父节点中，返回-1
    return -1;
}
Array.prototype.indexOf = function (val) {
 for(var i = 0; i < this.length; i++){
  if(this[i] == val){return i;}
 }
 return -1;
}
Array.prototype.remove = function (val) {
 var index = this.indexOf(val);
 if(index > -1){this.splice(index,1);}
}

function getBeginTimeAndEndTime(obj){
	        	var year = obj.year;
            	var month = obj.month;
            	var day = obj.date;
            	var hours = obj.hours;
            	var minutes = obj.minutes;
            	var seconds = obj.seconds;
            	if(year=='undefined' || year == null){
            		return '';
            	}
            	if(month=='undefined' || month == null){
            		return '';
            	}
            	if(month<10){
            		month = '0'+month
            	}
            	if(day=='undefined' || day == null){
            		return '';
            	}
            	if(day<10){
            		day = '0'+day
            	}
            	if(hours<10){
            		hours = '0'+hours
            	}
            	if(minutes<10){
            		minutes = '0'+minutes
            	}
            	if(seconds<10){
            		seconds = '0'+seconds
            	}
            	return year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds;
	        }

function getToDayBegin(){
	var beginDate = new Date();
    	beginDate.setHours(0);
    	beginDate.setMinutes(0);
    	beginDate.setSeconds(0);
    return beginDate;
}

function getUtc(date){
	var yer = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hours = date.getHours();
	var min  = date.getMinutes()
	var sec = date.getSeconds();
	if(month<10){
		month = '0'+month;
	}
	if(day<10){
		day = '0'+day;
	}
	if(hours<10){
		hours = '0'+hours;
	}
	if(min<10){
		min = '0'+min;
	}
	if(sec<10){
		sec = '0'+sec;
	}
	var start = yer+'-'+month+'-'+day+'T'+hours+':'+min+':'+sec+'Z';
	return start;
}

function getLastTime(date,type,year,month,day,hours,min,sec){
	if(type==0){
		date.setYear(date.getFullYear()-year);
		date.setMonth(date.getMonth()-month);
		date.setDate(date.getDate() - day);
		date.setHours(date.getHours() - hours); 
		date.setMinutes(date.getMinutes() - min);
		date.setSeconds(date.getSeconds() - sec);
	}else if(type ==1){
		date.setYear(date.getFullYear()+year);
		date.setMonth(date.getMonth()+month);
		date.setDate(date.getDate() + day);
		date.setHours(date.getHours()+ hours); 
		date.setMinutes(date.getMinutes() + min);
		date.setSeconds(date.getSeconds() + sec);
	}
	return date;
}

function getToDayEnd(){
	var beginDate = new Date();
    	beginDate.setHours(23);
    	beginDate.setMinutes(59);
    	beginDate.setSeconds(59);
    return beginDate;
}

function getDateFiff(date,type,num){
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	var hours = date.getHours();
	var min  = date.getMinutes();
	var sec = date.getSeconds();
	switch (type) {
        case 1:
        	date.setYear(year-num);
            break;
        case 2:
            date.setMonth(month-num);
            break;
        case 3:
        	date.setDate(strDate - num);
            break;
       	case 4:
            date.setHours(hours - num); 
            break;
        case 5:
            date.setMinutes(min - num);
            break;
        case 6:
            beginDate.setSeconds(sec - nul);
            break;
    }
	return date;
}

function mOver(obj,msg){
			index = layer.tips(msg, obj,{time: 2000});
	}

function isAdmins(){
	// var token = $.cookie('token')
	// $.ajax({
	// 	type: "POST",
	// 	headers: {
	// 		"token":token//此处放置请求到的用户token
	// 	},
	// 	url: '/apis/api/user/isAdmin',
	// 	dataType: 'json',   //当这里指定为json的时候，获取到了数据后会自己解析的，只需要 返回值.字段名称 就能使用了
	// 	cache: false,
	// 	success: function (data) {
	// 		if (data.code == 200) {
	// 			$('#isAdmin').val(data.data);
	// 		} 
	// 	}
	// });
}
function isHome(){
	var token = $.cookie('token')
	$.ajax({
		type: "GET",
		url: '/cloud/apis/background/api/region/isHome',
		dataType: 'json',   //当这里指定为json的时候，获取到了数据后会自己解析的，只需要 返回值.字段名称 就能使用了
		cache: false,
		success: function (data) {
			if (data.code == 200) {
				var date = new Date();
		        date.setTime(date.getTime()+100000*1000+8000);
		        $.cookie("isHome", "true", {expires: date});
			} 
		}
	});
}

function getNowFormatDate() {//获取当前时间
           	var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
            var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
            var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
            		+ " "  + date.getHours()  + seperator2  + date.getMinutes()
            		+ seperator2 + date.getSeconds();
            return currentdate;
        }

function isAdmin(){
	var token = $.cookie('cookie')
	
	$.ajax({
		type: "POST",
		headers: {
			"token":token//此处放置请求到的用户token
		},
		url: '/apis/api/user/isAdmin',
		dataType: 'json',   //当这里指定为json的时候，获取到了数据后会自己解析的，只需要 返回值.字段名称 就能使用了
		cache: false,
		success: function (data) {
			if (data.code == 200) {
				if(!data.data){
					window.location.href  = "/pages/system/403.html";
				}
				yes = data.data;
			} else if(data.code==401){
				layer.msg('登陆超时，请重新登陆！');
				setTimeout('top.location.href = "/login.html"',1000);
			}else {
				layer.msg(data.msg);
			}
		}
	});
}

function put(uri,param,header,layer,okLayer, callback){
	var a = $.ajax({
		type: "PUT",
		headers: header,
		url: uri,
		dataType: 'json',  
		data: param,
		cache: false,
		success: function (data) {
			if (data.code == 200) {
				console.log(JSON.stringify(data))
				callback(data.data);
			} else if(data.code==401){
				layer.msg('登陆超时，请重新登陆！');
				setTimeout('top.location.href = "/pages/login.html"',1000);
			}else if(data.code==403){
				layer.msg('您没有权限！');
				setTimeout('window.location.href = "/pages/system/403.html"',1000);
			}else if(data.code==500){
				layer.msg(data.msg);
			}else {
				layer.msg(data.msg);
			}
		}
	});
	return a;
}

function deleteJson(uri,param,header,layer,okLayer, callback){
	var a = $.ajax({
		type: "DELETE",
		headers: header,
		url: uri,
		dataType: 'json',  
		contentType: "application/json",
		data: JSON.stringify(param),
		cache: false,
		success: function (data) {
			if (data.code == 200) {
				callback(data.data);
			} else if(data.code==401){
				layer.msg('登陆超时，请重新登陆！');
				setTimeout('top.location.href = "/pages/login.html"',1000);
			}else if(data.code==403){
				layer.msg('您没有权限！');
				setTimeout('window.location.href = "/pages/system/403.html"',1000);
			}else if(data.code==500){
				layer.msg(data.msg);
			}else {
				layer.msg(data.msg);
			}
		}
	});
	return a;
}

function mydelete(uri,param,header,layer,okLayer, callback){
	var a = $.ajax({
		type: "DELETE",
		headers: header,
		url: uri,
		dataType: 'json',  
		data: param,
		cache: false,
		success: function (data) {
			if (data.code == 200) {
				callback(data.data);
			} else if(data.code==401){
				layer.msg('登陆超时，请重新登陆！');
				setTimeout('top.location.href = "/pages/login.html"',1000);
			}else if(data.code==403){
				layer.msg('您没有权限！');
				setTimeout('window.location.href = "/pages/system/403.html"',1000);
			}else if(data.code==500){
				layer.msg(data.msg);
			}else {
				layer.msg(data.msg);
			}
		}
	});
	return a;
}

function post(uri,param,header,layer,okLayer, callback){
	var a = $.ajax({
		type: "POST",
		headers: header,
		url: uri,
		dataType: 'json',  
		data: param,
		cache: false,
		success: function (data) {
			if (data.code == 200) {
				callback(data.data);
			} else if(data.code==401){
				layer.msg('登陆超时，请重新登陆！');
				setTimeout('top.location.href = "/pages/login.html"',1000);
			}else if(data.code==403){
				layer.msg('您没有权限！');
				setTimeout('window.location.href = "/pages/system/403.html"',1000);
			}else if(data.code==500){
				layer.msg(data.msg);
			}else {
				layer.msg(data.msg);
			}
		}
	});
	return a;
}

function post_list(uri,param,header,layer,okLayer, callback){
	var a = $.ajax({
		type: "POST",
		headers: header,
		url: uri,
		dataType: 'json',  
		data: param,
		cache: false,
		traditional: true,
		success: function (data) {
			if (data.code == 200) {
				callback(data.data);
			} else if(data.code==401){
				layer.msg('登陆超时，请重新登陆！');
				setTimeout('top.location.href = "/pages/login.html"',1000);
			}else if(data.code==403){
				layer.msg('您没有权限！');
				setTimeout('window.location.href = "/pages/system/403.html"',1000);
			}else if(data.code==500){
				layer.msg(data.msg);
			}else {
				layer.msg(data.msg);
			}
		}
	});
	return a;
}

function post_json(uri,param,header,layer,okLayer, callback){
	var a = $.ajax({
		type: "POST",
		headers:header,
		url: uri,
		data: param,
		contentType:'application/json',
		dataType: 'json',  
		cache: false,
		success: function (data) {
			if (data.code == 200) {
				callback(data.data);
			} else if(data.code==401){
				layer.msg('登陆超时，请重新登陆！');
				setTimeout('top.location.href = "/pages/login.html"',1000);
			}else if(data.code==403){
				layer.msg('您没有权限！');
				setTimeout('window.location.href = "/pages/system/403.html"',1000);
			}else if(data.code==500){
				layer.msg(data.msg);
			}else {
				layer.msg(data.msg);
			}
		}
	});
	return a;
}

function get(uri,header,layer,okLayer, callback){
	var a = $.ajax({
		type: "GET",
		headers:header,
		url: uri,
		dataType: 'json',   //当这里指定为json的时候，获取到了数据后会自己解析的，只需要 返回值.字段名称 就能使用了
		cache: false,
		success: function (data) {
			if (data.code == 200) {
				callback(data.data);
			} else if(data.code==401){
				layer.msg('登陆超时，请重新登陆！');
				setTimeout('top.location.href = "/pages/login.html"',1000);
			}else if(data.code==403){
				layer.msg('您没有权限！');
				setTimeout('window.location.href = "/pages/system/403.html"',1000);
			}else if(data.code==500){
				layer.msg(data.msg);
			}else {
				layer.msg(data.msg);
			}
		}
	});
	return a;
}

function isAssetTypeAnImage(ext) {
  return [
  'png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].
  indexOf(ext.toLowerCase()) !== -1;
}

function isAssetTypeAnVideo(ext) {
  return [
  '3GP','ASF','AVI','DAT','DV','FLV','F4V','GIF','M2T','M4V','MJ2','MJPEG','MKV','MOV','MP4','MPE','MPG','MPEG','MTS','OGG','QT','RM','RMVB','SWF','TS','VOB','WMV','WEBM'].
  indexOf(ext.toUpperCase()) !== -1;
}

function dow(url,type){
    		window.open(url, '_blank');
    	}

function isIPV4(ip){
	var v4reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	return v4reg.test(ip);
}

function isIPV6(ip){
	var v6reg = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/gm;
	return v6reg.test(ip);
}

function isDomain(url){
	var omainCheck = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9>][-a-zA-Z0-9]{0,62})+$/;
	return omainCheck.test(url);
}

function isIP(ip){
	return isIPV6(ip)||isIPV4(ip)
}
