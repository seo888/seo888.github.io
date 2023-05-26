// 公共函数库
//判断浏览器类型
function getOs()  
{  
    var OsObject = "";  
   if(navigator.userAgent.indexOf("MSIE")>0) {  
        return "MSIE";  
   }  
   if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
        return "Firefox";  
   }  
   if(isSafari=navigator.userAgent.indexOf("Safari")>0) {  
        return "Safari";  
   }   
   if(isCamino=navigator.userAgent.indexOf("Camino")>0){  
        return "Camino";  
   }  
   if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){  
        return "Gecko";  
   }
} 

//邮箱格式检查，正确返回true
function email_format(val){
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	 if(myreg.test(val)){
		return true;
	 }
	 return false;
}


function checkForm(){
for ( instance in CKEDITOR.instances )
CKEDITOR.instances[instance].updateElement();
return true;
}

// cookie functions http://www.quirksmode.org/js/cookies.html
function createCookie(name,value,days)
{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name)
{
	createCookie(name,"",-1);
}


//皮肤设置
function switchStylestyle(styleName,isclick){
	    var href = $('link[rel*=style][title]').attr('href');
		$('link[rel*=style][title]').attr('href',href.substring(0, href.lastIndexOf('/'))+'/'+styleName+'.css');
		$('iframe').each(function(i, e){
			if(isclick == true ){
				try{
	                if(typeof(eval(window.frames[$(e).attr('name')].switchStylestyle))){
	                    window.frames[$(e).attr('name')].switchStylestyle(styleName);
	                }
    }catch(e){
		
	}
	
				
			}
		})
		createCookie('style', styleName, 365);
}

//信息提示
function msg(status,msg,lock,time,url){
	if(lock){lock=true}else{lock=false}
	if(!time){time = 3}
	if(status){
	    ico = 	'succeed';
    }else{
		ico = 	'error';
	}
	btn = false;
	if(url){
		btn =  [{name: SUBMIT_CK,focus:true}];
    }
	art.dialog({
        icon: ico,
		time: time,
		background:'#FFF',
		id :'msg',
		title:TIP_INFO,
		close:function(){
			if(url) window.location.href = url;
		},
		button:btn,
		lock:lock,
		fixed:true,
		resize:false,
        content:msg
    });
	btn_is_disabled(true);
}

//设置URL
function setUrlParam(para_name,para_value,url)
{
	    if(para_value==''){
		   return delQueStr(url,para_name);
	    }
        var strNewUrl=new String(),
		    strUrl = url;
        if(strUrl.split("?").length > 1)
        {
            strUrl=strUrl.substr(strUrl.indexOf("?")+1);
            if(strUrl.toLowerCase().indexOf('?'+para_name.toLowerCase())==-1 && strUrl.toLowerCase().indexOf('&'+para_name.toLowerCase())==-1 )
            {
                strNewUrl=url+"&"+para_name+"="+para_value;
                return strNewUrl;
            }else
            {
                var aParam=strUrl.split("&");
                //alert(aParam.length);
                for(var i=0;i<aParam.length;i++)
                {
                    if(aParam[i].substr(0,aParam[i].indexOf("=")).toLowerCase()==para_name.toLowerCase())
                    {
                       aParam[i]= aParam[i].substr(0,aParam[i].indexOf("="))+"="+para_value;
                    }
                }
               strNewUrl=url.substr(0,url.indexOf("?")+1)+aParam.join("&");
               //alert(strNewUrl);
               return strNewUrl;
           }  
        }else
        {
            strUrl+="?"+para_name+"="+para_value;
            return strUrl
        }
}

//删除参数值
function delQueStr(url, ref) {
            var str = "";
            if (url.indexOf('?') != -1) {
                str = url.substr(url.indexOf('?') + 1);
            }
            else {
                return url;
            }
            var arr = "";
            var returnurl = "";
            var setparam = "";
            if (str.indexOf('&') != -1) {
                arr = str.split('&');
                for (i in arr) {
                    if (arr[i].split('=')[0] != ref) {
                        returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
                    }
                }
                return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
            }
            else {
                arr = str.split('=');
                if (arr[0] == ref) {
                    return url.substr(0, url.indexOf('?'));
                }
                else {
                    return url;
                }
            }
}

//禁止或开启按钮
function btn_is_disabled(i){
	if(i==true){
		$(".btn").removeClass('disabled');	
		$("input").attr('disabled', false);
	}else{
		$(".btn").addClass('disabled');	
		$("input").attr('disabled', 'disabled');
	}
}

var langdata = [];
langdata['zh-cn'] = {
	timeOnlyTitle: '选择时间',
		timeText: '时间',
		hourText: '小时',
		minuteText: '分钟',
		secondText: '秒钟',
		millisecText: '微秒',
		timezoneText: '时区',
		currentText: '现在时间',
		closeText: '关闭',
		timeFormat: 'HH:mm',
		amNames: ['AM', 'A'],
		pmNames: ['PM', 'P'],

		changeMonth: true,
        changeYear: true,
		yearRange:'c-100:c+100',
                closeText: '关闭',
                prevText: '&#x3c;上月',
                nextText: '下月&#x3e;',
                currentText: '今天',
                monthNames: ['一月','二月','三月','四月','五月','六月',
                '七月','八月','九月','十月','十一月','十二月'],
                monthNamesShort: ['一','二','三','四','五','六',
                '七','八','九','十','十一','十二'],
                dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
                dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
                dayNamesMin: ['日','一','二','三','四','五','六'],
                weekHeader: '周',
                dateFormat: 'yy-mm-dd',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: true,
                yearSuffix: '年'		
};

//排序函数
function order(type,val){
	var thisurl = window.location.href;
   	thisurl = setUrlParam('ordertype',type,thisurl);  //设置URL
	thisurl = setUrlParam('orderval',val,thisurl);  //设置URL
	window.location.href=thisurl;
}

//检查是否选中，如果有选中返回true

function isck(){
	 $allid = new Array();
     $(".table_lists .check_box").each(function(i,o){
		    if(this.checked) {
			    $allid.push($(this).val());
		    }
	 })
	 if($allid == ''){
	     return false;	 
	 }else{
	     return $allid;	 
	 }
}

//禁止或开启按钮
function btn_is_disabled(i){
	if(i==true){
		$(".btn").removeClass('disabled');	
		$("input").attr('disabled', false);
	}else{
		$(".btn").addClass('disabled');	
		$("input").attr('disabled', 'disabled');
	}
}

//当前URL设置参数后并跳转
function backURL(value,name){
	var thisurl = window.location.href;
   	thisurl = setUrlParam(name,value,thisurl);  //设置URL
	window.location.href=thisurl;
}


//加粗
function input_font_bold(name,weight) {		
	if($(name).css('font-weight') == '700' || $(name).css('font-weight')=='bold') {
		$(name).css('font-weight','normal');
		$(weight).val('');
	} else {
		$(name).css('font-weight','bold');
		$(weight).val('1');
	}
}

/* *
 * 检测密码强度
 * @param       string     pwd     密码
 */
function checkIntensity(pwd)
{
  var Mcolor = "#FFF",Lcolor = "#FFF",Hcolor = "#FFF";
  var m=0;

  var Modes = 0;
  for (i=0; i<pwd.length; i++)
  {
    var charType = 0;
    var t = pwd.charCodeAt(i);
    if (t>=48 && t <=57)
    {
      charType = 1;
    }
    else if (t>=65 && t <=90)
    {
      charType = 2;
    }
    else if (t>=97 && t <=122)
      charType = 4;
    else
      charType = 4;
    Modes |= charType;
  }

  for (i=0;i<4;i++)
  {
    if (Modes & 1) m++;
      Modes>>>=1;
  }

  if (pwd.length<=4)
  {
    m = 1;
  }

  switch(m)
  {
    case 1 :
      Lcolor = "2px solid red";
      Mcolor = Hcolor = "2px solid #DADADA";
    break;
    case 2 :
      Mcolor = "2px solid #f90";
      Lcolor = Hcolor = "2px solid #DADADA";
    break;
    case 3 :
      Hcolor = "2px solid #3c0";
      Lcolor = Mcolor = "2px solid #DADADA";
    break;
    case 4 :
      Hcolor = "2px solid #3c0";
      Lcolor = Mcolor = "2px solid #DADADA";
    break;
    default :
      Hcolor = Mcolor = Lcolor = "";
    break;
  }
  if (document.getElementById("pwd_lower"))
  {
    document.getElementById("pwd_lower").style.borderBottom  = Lcolor;
    document.getElementById("pwd_middle").style.borderBottom = Mcolor;
    document.getElementById("pwd_high").style.borderBottom   = Hcolor;
  }
}

/*加入收藏*/
function addfavor(title,url) {
	if(!url) url = window.location.href;
	if(!title) title = $('title').html();
    var ua = navigator.userAgent.toLowerCase();
        if(ua.indexOf("msie 8")>-1){
            window.external.AddToFavoritesBar(url,title,'');//IE8
        }else{
            try {
                window.external.addFavorite(url, title);
            } catch(e) {
                try {
                    window.sidebar.addPanel(title, url, "");//firefox
                } catch(e) {
                    alert("加入收藏失败，请使用Ctrl+D进行添加");
                }
            }
        }
    return false;
}

function sethome(obj,url){
	if(!url) url = window.location.href;
    try{
       obj.style.behavior='url(#default#homepage)';
       obj.setHomePage(url);
   }catch(e){
       if(window.netscape){
          try{
              netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
         }catch(e){
              alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
          }
       }else{
        alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");
       }
  }
}

//名称检测，不能包含特殊符号
function containSpecial( s ) { 
 var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#) (\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=) (\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/) (\<)(\>)(\?)(\)]+/); 
 return ( containSpecial.test(s) ); 
} 