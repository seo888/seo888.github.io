/**
 * Created by Wenkx on 2016/12/6.
 */
//加载所需文件
(function () {
	
     
	
    var protocol = (('https:' == window.document.location.protocol) ? "https://" : "http://");
    var fileDir =protocol+discuss.rooturl+"/amucsite";
	window.fileDir=protocol+discuss.rooturl+"/amucsite";
    var sudokuUpload=fileDir+"/discuss/js/sudokuUpload.js";
    //document.write('<script  charset="utf-8" type="text/javascript" src="'+sudokuUpload+'"></script>');
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = sudokuUpload;
	document.body.appendChild(script)

	setTimeout(function () {
        $(".btnImg").css({"opacity":"1"})
    },1000)

    var disJSFile=[
        //TODO 修改位置
       
		"/common.js",
		"/discuss/js/showDiscuss.js",
		"/discuss/js/sudokuFile.js",
		"/discuss/js/sudoku.js",
		"/discuss/js/weiboCenter.js",
		"/sso/js/sso-login.js"
		]
    var cssFile = [
        "/discuss/css/index.css",
        "/discuss/css/reset.css",
        "/discuss/css/sudokuUpload.css",
        "/discuss/css/weiboCenter.css"
    ]
    for(var i = 0, pi; pi = disJSFile[i++];){
        document.write('<script  charset="utf-8" type="text/javascript" src="'+fileDir+pi + '"></script>');
    }
	
    document.write('<script  charset="utf-8" type="text/javascript" src="'+protocol+discuss.rooturl + '/amucsite/sso/js/sso-login.js"></script>');
   
    var head = document.getElementsByTagName('head')[0] || document.head || document.documentElement;

    //cssLink.innerHTML = ".textarea,.textareaInput{border:1px solid #2d96e9}.anum,.hot_title,.name,.r-floor .reply,.snum,.title,.userName{color:#2d96e9}.pC{border:1px solid #2d96e9}.public{background-color:#2e97e9}.all_title{border-bottom:3px solid #2e97e9}"

    for(var i = 0, pi; pi = cssFile[i++];){
        var cssLink = document.createElement('link');
        cssLink.setAttribute('type', 'text/css');
        cssLink.setAttribute('rel', 'stylesheet');
        cssLink.setAttribute('href',fileDir+pi);
        head.appendChild(cssLink);
    }
	
	if(typeof xy_shutup != 'undefined') $("#btnImg").click(xy_shutup.doCancel);

} ());
function  changeName(obj){

	obj.innerHTML=(obj.innerHTML=="回复"?"取消回复":"回复");
	return 1; 
}


var autoTextarea = function (elem, extra, maxHeight) {  
        //判断elem是否为数组  
     
            e(elem);  

        function e(elem){  
        if(!elem) return false;
        extra = extra || 25;  
        var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,  
        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),  
                addEvent = function (type, callback) {  
                        elem.addEventListener ?  
                                elem.addEventListener(type, callback, false) :  
                                elem.attachEvent('on' + type, callback);  
                },  
                getStyle = elem.currentStyle ? function (name) {  
                        var val = elem.currentStyle[name];  
   
                        if (name === 'height' && val.search(/px/i) !== 1) {  
                                var rect = elem.getBoundingClientRect();  
                                return rect.bottom - rect.top -  
                                        parseFloat(getStyle('paddingTop')) -  
                                        parseFloat(getStyle('paddingBottom')) + 'px';          
                        };  
   
                        return val;  
                } : function (name) {  
                                return getComputedStyle(elem, null)[name];  
                },  
                minHeight = parseFloat(getStyle('height'));  
   
        elem.style.resize = 'none';  
   
        var change = function () {  
                var scrollTop, height,  
                        padding = 0,  
                        style = elem.style;  
   
                if (elem._length === elem.value.length) return;  
                elem._length = elem.value.length;  

                if (!isFirefox && !isOpera) {  
                        padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));  
                };  
                scrollTop = document.body.scrollTop || document.documentElement.scrollTop;  
   
                elem.style.height = minHeight + 'px';  
                if (elem.scrollHeight > minHeight) {  
                        if (maxHeight && elem.scrollHeight > maxHeight) {  
                                height = maxHeight - padding;  
                                style.overflowY = 'auto';  
                        } else {  
                                height = elem.scrollHeight - padding;  
                                style.overflowY = 'hidden';  
                        };  
						//
                        style.height = height + extra + 'px';  
                        scrollTop += parseInt(style.height) - elem.currHeight;  
                        document.body.scrollTop = scrollTop;  
                        document.documentElement.scrollTop = scrollTop;  

                        elem.currHeight = parseInt(style.height);
						elem.style.height =parseInt(style.height + padding + 'px');
						elem.scrollHeight = parseInt(style.height + padding + 'px');

                };  
        };  
   
        addEvent('propertychange', change);  
        addEvent('input', change);  
        addEvent('focus', change);  
        change();  
        }  
};  

// =======================回复===========================
function reply(item,id,rid,userName,userID,content) {
	
var defaultHint=$("#defaultHint").html();
	var _td = $(item).parent().parent().parent();
	var _td = $(item).parent().parent().parent();
	var showAnonymous=$("#public").attr("showAnonymous");
	var showPic=$("#public").attr("showPic");
	var btnImgSrc=$(".btnImg").attr("src");
	_html = '<div class=\"replyCmt\" id="replyCmt'+rid+'" style=\"display:none;\"><br/><br/>'
		+'<form action=\"\" method=\"post\" onSubmit=\"if(checkFrm(this)){comment_pop();}return false;\">'
		+'<input type="hidden" id="userName'+id+'" name="userName" value="'+userName+'"/>'
		+'<input type="hidden" id="userID'+id+'" name="userID" value="'+userID+'"/>'
		+'<input type="hidden" id="content'+id+'" name="content" value="'+content+'"/>'
		+'<input type="hidden" id="id'+id+'" name="id" value="'+id+'"/>'
		+'<div style="position:relative ;margin-top: -10px;">'
		+'<div class="textareaDiv">'
		+'<textarea id="paTextDis" node-type="textarea" name="" onfocus="if (value ==\''+defaultHint
		+'\'){value =\'\';}this.style.color=\'#333\';" onblur="if (value ==\'\'){value=\''+defaultHint
			+'\';this.style.color=\'#bfbfbf\';}"class="textarea textareaInput" >'+defaultHint
			+'</textarea>'
		+'</div>'
		+'</div>'
		+'<div class="commitDiscussDiv"><img class="rebtnImg" style="vertical-align: center; margin-top: 16px;margin-left: 10px;" src="'+btnImgSrc+'" alt="" /><div  class="commitDiscuss f16"  id="republic" onclick="commitDis('+id+')">发表评论</div></td></tr></table></form></div></div>'
		+'<div id="resudokuUpload" style="display:none;" class="sudokuUpload" />',
		replyCmt = $(_html);
//console.info(_td.html());
//console.info(_td.find("#replyCmt"+rid).html());
		$("#discuss").find("a").css('color','#333');
		if(_td.find("#replyCmt"+rid).length > 0 ) {
		//if($("#replyCmt"+rid).length > 0 ) {	
			replyCmt = $("#replyCmt"+rid);
			if (replyCmt[0].style.display == 'none') {
				$(item).css('color',$("#color").html());
				replyCmt.slideDown();
			} else {
				replyCmt.slideUp();
			}
			
			
	} else {

		$(".replyCmt").remove();
		$('#resudokuUpload').remove();
		_td.append(replyCmt);
		$(item).css('color',$("#color").html());
		var cmu = loadAccountName();
		var sessionId = loadSessionId();
		if (sessionId!=null && cmu != "" && cmu != "null" && cmu != "undefined") {
			$(".slogOut", replyCmt).hide();
			$("#JcmtName_pop").html(cmu);
			$(".slogIn", replyCmt).show();
		}
		replyCmt.slideDown();
		
	}
//	alert(_td.find('.reply').html());
//	document.getElementById('replyFloor').value= floor;
	var content = _td.find('.commentContent').html();
	var preReply = _td.find('.reply').html();
	closeUploadMoreImagesRe();
	
}

function loadAccountName() {
		var cmu = decodeURIComponent(getCookie('cmu'));
		return cmu;
	}
function loadSessionId() {
	return getCookie('common_session_id');
}
function getCookie(name)
{
if (document.cookie.length>0)
  {
  start=document.cookie.indexOf(name + "=");

  if (start!=-1)
    { 
    start=start + name.length+1 ;
    end=document.cookie.indexOf(";",start);
    if (end==-1) end=document.cookie.length;
    return unescape(document.cookie.substring(start,end));
    } 
  }
return "";
}
function doGetCookie(name)
{
if (document.cookie.length>0)
  {
  start=document.cookie.indexOf(name + "=");

  if (start!=-1)
    { 
    start=start + name.length+1 ;
    end=document.cookie.indexOf(";",start);
    if (end==-1) end=document.cookie.length;
    return unescape(document.cookie.substring(start,end));
    } 
  }
return "";
}
function setCookie(name,value) {
	var today = new Date();
	today.setTime( today.getTime() );
	expires = 90 * 1000 * 60 * 60 * 24;
	var expires_date = new Date( today.getTime() + (expires) );
	var data = name  + "=" +escape( value ) +
	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" )+";path=/";
	document.cookie = data;
	
}
function delCookie(name) {
	var today = new Date();
	today.setTime( today.getTime() );
	expires = 90 * 1000 * 60 * 60 * 24;
	var value=getCookie(name);
	var expires_date = new Date( today.getTime() - (expires) );
	var data = name  + "=" +escape( value ) +
	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" )+";path=/";
	document.cookie = data;
	
}
function commitGreat(id,articleId,item){
    var cooId = "great-" + discuss.siteID + "-" + articleId + "-" + id;
    if (getCookie(cooId) != "") {
        alert("已经点过赞了");
        return false;
    }
    var protocol = (('https:' == window.document.location.protocol) ? "https://" : "http://");
    var num=$(item).next().text();
    $(item).next().text(Math.round(num)+1);
	var imgSrc=window.fileDir+"/discuss/images/"+$("#color").html()+'.png';
    $(item).attr({src:imgSrc})


    var userID=$("#userID").text();

	setCookie("scroll",document.body.scrollTop);
	// var sctop=$(document).scrollTop();
	//保存数据
	$.ajax({
		  type: "POST",
		  url: showDiscuss.protocol + discuss.apiroot + "/event",
		  data : {
				"siteID" : discuss.siteID,
				"id" : id,
				"eventType" : 1,
				"type" : 1,
				"userID" : userID,
				"userOtherID" : "",
				"channel" : discuss.channel
			},
		  dataType : "jsonp",
		  jsonp: "jsoncallback",
          jsoncallback:"jsoncallback",
		  beforeSend:function(){
			  //设置按钮不可用，防止重复提交
			  $(item).attr("disabled",true);
		  },

		success: function(){
			
			setCookie(cooId,1);

			
			//window.location.reload();
		  },
		  error: function(){
			   alert("点赞失败！");
		  }
		});
			
	//保存数据
}
function commitDis(parentID){

	var auditType=$("#public").attr("auditType");
	var showAnonymous=$("#public").attr("showAnonymous");
	var userID=$("#userID").text();
	var uname=$("#uname").text();
if(auditType=="2"){
alert("站点评论已关闭，不允许评论!");
return;
}
	if(userID==undefined ||userID=="" || userID == null|| userID == "0"){
		userID="0";
		if(discuss.channel=="0"){
			uname="网站用户";
		}else if(discuss.channel=="1"){
			uname="触屏用户";
		}
	}
	if(userID == "0"&&showAnonymous=="false"){
		alert("不允许匿名评论！");
		return;
	}
	var imgUrl= [];
	//var parentuserName="";
	var parentuserID=0;
	//var parentcontent="";
	var content = $("#textDis").val();
	if($("#uploadGuid_1").length>0 ){
		imgUrl.push($("#uploadGuid_1").attr("guid"));
	}
	if(parentID!=0){
		content = $("#paTextDis").val();
		//parentuserName=$("#userName"+parentID).val();
		parentuserID=$("#userID"+parentID).val();
		//parentcontent=$("#content"+parentID).val();
	}
	// if(content ==$("#defaultHint").html()){
	// 	alert("请输入评论");
	// 	return;
	// }

	setCookie("scroll",document.body.scrollTop);
	if(content.length >800){
		alert("最多可以输入800字，请重新输入！");
		return;}


	//保存数据
	$.ajax({
		  type: "POST",
		  url: showDiscuss.protocol + discuss.apiroot + "/discuss",
		  data : {
				"siteID" : discuss.siteID,
				"rootID" : discuss.articleID,
				"parentID" : parentID,
				"parentUserID" : parentuserID,
				"sourceType" : 0,
				"type" : 0,
				"content" : content,
				"longitude" : 0,
				"latitude" : 0,
				"location" : "",
				"userID" :userID,
				"userName" : uname,
				"channel" : discuss.channel,
				"imgUrl" : imgUrl.toString()
				
			//		,
				//"ipaddress":"[IP]"
			},
		  dataType : "json",

		success: function(data){
			$("#textDis").val(window.defaultHint)  
			$("#paTextDis").val(window.defaultHint)
			$("#textDis").css("color","rgb(191, 191, 191)");
			$("#paTextDis").css("color","rgb(191, 191, 191)");
			$(".replyCmt").each(function(index,val){
				$(val).val(window.defaultHint)
			    $(val).css("color","rgb(191, 191, 191)");
				$(val).slideUp();
				
			})
			$("#close").click();
			if(data){
				alert("评论成功！");
			//window.location.reload();
		}else{
			alert("评论失败！");
			}
		  },
		  error: function(){
			  alert("评论失败！");
		  }
		});
	//保存数据

}


function userLogin(){



	aWidth = parseInt(100);  //操作要求的宽和高
				aHeight = parseInt(200);

			
				
				//chrome下点击窗口的关闭时无法正确执行after.do，因此隐藏窗口关闭按钮，并不允许esc关闭
				opurl=sso_url + "/user/ssoLogin?code=" + authCode + "&redirectUrl=" + login_out + "sso/setCookie.html?";



				e5.dialog({
		        type: 'iframe',
		        value: opurl
		        },
		        { title: "登录窗口", id: "formpreview", width: iWidth, height: iHeight+40,resizable:true,
			showClose : "true" }
		        ).show();


}

function checkUserLogin(){
	getCookie("userID");
}

	function closeLogin(){
	   document.getElementById("win").style.display="none";
	}

   function scrollback()  
    {  
        if(getCookie("scroll")!=null){
			document.body.scrollTop=getCookie("scroll");
			delCookie("scroll");
				}  
    }  

var text = document.getElementById("textDis");
	var reText = document.getElementById("paTextDis");
	autoTextarea(text); // 调用
	autoTextarea(reText);

//每5毫秒自动检测一次用户是否登录（也就是检测cookie是否存在）
