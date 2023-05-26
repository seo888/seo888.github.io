/*
KesionCMS通用脚本函数，最后更新于2012-2-9
*/
//容错脚本
ResumeError=function (){return true;}
window.onerror = ResumeError;

 //检查是否中文字符
is_zw=function(str){
	exp=/[0-9a-zA-Z_.,#@!$%^&*()-+=|\?/<>]/g;
	if(str.search(exp) != -1){return false;}
	return true;
}
//验证是否包含逗号
CheckBadChar=function (Obj,AlertStr)
{
	exp=/[,，]/g;
	if(Obj.value.search(exp) != -1)
	{   alert(AlertStr+"不能包含逗号");
	    Obj.value="";
		Obj.focus();
		return false;
	}
	return true;
}
// 检查是否有效的扩展名
IsExt=function(FileName, AllowExt){
		var sTemp;
		var s=AllowExt.toUpperCase().split("|");
		for (var i=0;i<s.length ;i++ ){
			sTemp=FileName.substr(FileName.length-s[i].length-1);
			sTemp=sTemp.toUpperCase();
			s[i]="."+s[i];
			if (s[i]==sTemp){
				return true;
				break;
			}
		}
		return false;
}
//检查是否数字方法一
is_number=function(a){
  return !isNaN(a)
}
//检查数字方法二
CheckNumber=function(Obj,DescriptionStr){
	if (Obj.value!='' && (isNaN(Obj.value) || Obj.value<0))
	{
		alert(DescriptionStr+"应填有效数字！");
		Obj.value="";
		Obj.focus();
		return false;
	}
	return true;
}
//检查电子邮件有效性
is_email=function(str){ 
if((str.indexOf("@")==-1)||(str.indexOf(".")==-1)){
	return false;
	}
	return true;
}
//检查日期格式是否为2008-01-01 13:01:01
is_date=function(str){   
var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
var r = str.match(reg); 
if(r==null)return is_shortdate(str); 
var d= new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]); 
var v=(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7]);
if (v==false)
  return is_shortdate(str)
 else
 return true;
}
////检查日期格式是否为2008-01-01
is_shortdate=function(str){
var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
if(r==null)return false; 
var d= new Date(r[1], r[3]-1, r[4]); 
return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);	
}

/* 点击选中表单li */
function chk_iddiv(id){
	var objc=document.getElementById("c"+id); //多选框
	var obju=document.getElementById("u"+id);//ul
	if (objc.checked==''){
		objc.checked='checked';
		obju.style.background='#EEF8FE';
		//obju.className='listmouseover';
	}else{
		objc.checked='';
		obju.style.background='';
		//obju.className='list';
	}
}
/**/
function chk_idBatch(form,askString){
	var bCheck;
	bCheck=false;
	for (var i=0;i < form.elements.length;i++)
    {
    var e = form.elements[i];
    if (e.name == "id"){
       if (e.checked ==1){
       		bCheck=true;
       		break;
       	}
		}
	}
	
	if (bCheck==false){
		alert("请选择要操作的内容!")
		return false;
		}
	else{
		return confirm('确认要'+askString+"?");
		}
}
function get_Ids(form)
{  
	var ids='';
	$("input[type=checkbox]").each(function(){
		if ($(this).prop("name")=="id"){
		  if ($(this).prop("checked")==true){
			  if (ids==''){
				   ids=$(this).val();
			  }else{
				   ids+=","+$(this).val();
			  }
		  }
		}
	});

	return ids;
}
function Select(flag)
{  

  $("input[type=checkbox]").each(function(){
  if ($(this).prop("name")=="id"){
	var objc=$("#c"+$(this).val()); 
	var obju=$("#u"+$(this).val());
	switch (flag){
	  case 0:  //全选
	   objc.prop("checked",true);
	   obju.attr("style","background:#eef8fe");
	   break;
	  case 1: //反选
		if (objc.prop("checked")==false){
			objc.prop("checked",true);
			obju.attr("style","background:#eef8fe");
		}else{
			objc.prop("checked",false);
	    	obju.attr("style","background:");
		}
		break;
	 case 2:  //不选
		objc.prop("checked",false);
	    obju.attr("style","background:");
		break;
	 }
  }
 })
}


// utility function called by getCookie( )
 function getCookieVal(offset) {
			var endstr = document.cookie.indexOf (";", offset);
			if (endstr == -1) {
				endstr = document.cookie.length;
			}
		    return unescape(document.cookie.substring(offset, endstr));
}
// primary function to retrieve cookie by name
function getCookie(name) {
			var arg = name + "=";
			var alen = arg.length;
			var clen = document.cookie.length;
			var i = 0;
			while (i < clen) {
				var j = i + alen;
				if (document.cookie.substring(i, j) == arg) { 
					return getCookieVal(j);
				}
				i = document.cookie.indexOf(" ", i) + 1;
				if (i == 0) break; 
			}
			return "";
}
// store cookie value with optional details as needed
function setCookie(name, value) {document.cookie = name + "=" + escape (value)}
// remove the cookie by setting ancient expiration date
function deleteCookie(name,path,domain) {
			if (getCookie(name)) {document.cookie = name + "="}
}

function CheckAll(form)
{
	 for (var i=0;i<form.elements.length;i++)
	 {
		var e = form.elements[i];
		if (e.Name != 'chkAll'&&e.disabled==false)
		e.checked = form.chkAll.checked;
	}
 } 
function OpenWindow(Url,Width,Height,WindowObj){
	var ReturnStr=showModalDialog(Url,WindowObj,'dialogWidth:'+Width+'pt;dialogHeight:'+Height+'pt;status:no;help:no;scroll:no;status:0;help:0;scroll:0;');
	return ReturnStr;
}
var obj=null;
var picobj=null;
var box='';
function OpenThenSetValue(Url,Width,Height,WindowObj,SetObj,pic){
	box=top.$.dialog({title:'选择文件',content:'url:'+Url+'&fieldId='+SetObj.id+'&pic='+pic,width:820,height:450});
}
function OpenModalDialog(Url,Width,Height,WindowObj,SetObj,pic){
	if (document.all){
	var ReturnStr=showModalDialog(Url,WindowObj,'dialogWidth:'+Width+'pt;dialogHeight:'+Height+'pt;status:no;help:no;scroll:no;status:0;help:0;scroll:0;');
	if (ReturnStr!='' && ReturnStr!=undefined){SetObj.value=ReturnStr;SetObj.focus();
	 if (pic!=''&& pic!=undefined){$("#"+pic).attr("src",ReturnStr);}
	}
	return ReturnStr;
	}else{
	 obj=SetObj;
	 picobj=pic;
	 Width=Width+180;
	 Height=Height+80;
	 var iTop = (window.screen.availHeight-30-Height)/2; //获得窗口的垂直位置;
     var iLeft = (window.screen.availWidth-10-Width)/2; //获得窗口的水平位置;
	 window.open(Url,'newWin','modal=yes,top='+iTop+',left='+iLeft+',width='+Width+',height='+Height+',resizable=no,scrollbars=no');
	}
}
function setVal(v){
obj.value=v;obj.focus();
if (picobj!=''&&picobj!=null){$("#"+picobj).attr("src",v);}
}
function CheckEnglishStr(Obj,DescriptionStr)
{
	var TempStr=Obj.value,i=0,ErrorStr='',CharAscii;
	if (TempStr!='')
	{
		for (i=0;i<TempStr.length;i++)
		{
			CharAscii=TempStr.charCodeAt(i);
			if (CharAscii>=255||CharAscii<=31)
			{
				ErrorStr=ErrorStr+TempStr.charAt(i);
			}
			else
			{
				if (!CheckErrorStr(CharAscii))
				{
					ErrorStr=ErrorStr+TempStr.charAt(i);
				}
			}
		}
		if (ErrorStr!='')
		{
			alert("出错信息:\n\n"+DescriptionStr+'发现非法字符:'+ErrorStr);
			Obj.focus();
			return false;
		}
		if (!(((TempStr.charCodeAt(0)>=48)&&(TempStr.charCodeAt(0)<=57))||((TempStr.charCodeAt(0)>=65)&&(TempStr.charCodeAt(0)<=90))||((TempStr.charCodeAt(0)>=97)&&(TempStr.charCodeAt(0)<=122))))
		{
			alert(DescriptionStr+'首字符只能够为数字或者字母');
			Obj.focus();
			return false;
		}
	}
	return true;
}
function CheckErrorStr(CharAsciiCode)
{
	var TempArray=new Array(34,47,92,42,58,60,62,63,124);
	for (var i=0;i<TempArray.length;i++)
	{
		if (CharAsciiCode==TempArray[i]) return false;
	}
	return true;
}
//Obj单击的对象,OpStr--BottomFrame显示当前操作的提示信息,ButtonSymbol按钮状态,MainUrl--MainFrame的链接
function SelectObjItem1(Obj,OpStr,ButtonSymbol,MainUrl,ChannelID)
{   if (OpStr!='')
    {
		window.parent.parent.frames['BottomFrame'].location.href='KS.Split.asp?ChannelID='+escape(ChannelID)+'&OpStr='+escape(OpStr)+'&ButtonSymbol='+escape(ButtonSymbol);
		}
	if(MainUrl!='')
	{window.parent.parent.frames['MainFrame'].location.href=MainUrl;
	}

}
function FolderClick(Obj,el)
{   	var i=0;
  for (var i=0;i<document.all.length;i++)
	   {
		if (document.all(i).className=='FolderSelected') document.all(i).className='';
	    }
	         Obj.className='FolderSelected';
	  
              for (i=0;i<DocElementArr.length;i++)
			{
				if (el==DocElementArr[i].Obj)
				{
					if (DocElementArr[i].Selected==false)
					{
						DocElementArr[i].Obj.className='FolderSelectItem';
						DocElementArr[i].Selected=true;
					}
					else
					{
						DocElementArr[i].Obj.className='FolderItem';
						DocElementArr[i].Selected=false;
					}
				}
			}
}
function InsertKeyWords(obj,KeyWords)
{ 
	if (KeyWords!='')
	{
		if (obj.value.search(KeyWords)==-1)
		{
			if (obj.value=='') obj.value=KeyWords;
			else obj.value=obj.value+','+KeyWords;
			
		}
	}
	if (KeyWords == 'Clean')
	{
		obj.value = '';
	}
	return;
}
//发送参数给各个Frames窗口
function SendFrameInfo(MainUrl,LeftUrl,ControlUrl){
	location.href=MainUrl;
    parent.LeftInfoFrame.location.href=LeftUrl;
	 $(parent.document).find('#BottomFrame')[0].src=ControlUrl;
}

function InsertFileFromUp(FileList,fileSize,maxId,title,EditorId)
{  
    var files=FileList.split('/');
	var file=files[files.length-1];
	var fileext = FileList.substring(FileList.lastIndexOf(".") + 1, FileList.length).toLowerCase();
    if (fileext=="gif" || fileext=="jpg" || fileext=="jpeg" || fileext=="bmp" || fileext=="png")
	  { if (EditorId==''){
		 insertHTMLToEditor('<img src="'+FileList+'" border="0"/><br/>');	
	  }else{
		 insertHTMLToEditorById(EditorId,'<img src="'+FileList+'" border="0"/><br/>');	
	  }
	  }else{
	  var str="<div class=\"quote\">[UploadFiles]"+maxId+","+fileSize+","+fileext+","+title+"[/UploadFiles]</div><p></p><br/>";
	     if (EditorId==''||EditorId==undefined){
		 insertHTMLToEditor(str);	
		 }else{
		 insertHTMLToEditorById(EditorId,str);	
		 }
	 }
}
function insertHTMLToEditorById(editorId,codeStr) {eval('CKEDITOR.instances.'+editorId).insertHtml(codeStr);} 
//选择附件
var box='';
function PopInsertAnnex(upfrom){
	box=$.dialog({title:'选择附件插入',content:'url:../plus/selectAnnex.asp?upfrom='+upfrom,width:690,height:400});
}
function Getcolor(obj,Url){
	box=$.dialog({id:'colorbox',title:false,content:'url:'+Url,top:$('#'+obj).position().top+80,width:225,height:148,min:false,max:false,padding:0});
}
function OpenImgCutWindow(deloriginphoto,installdir,photourl){
	OpenImgCutWindows(deloriginphoto,installdir,photourl,$('#PhotoUrl')[0]);
}
function OpenImgCutWindows(deloriginphoto,installdir,photourl,obj){
	OpenThenSetValue(installdir+'plus/ImgCut.asp?del='+deloriginphoto+'&photourl='+photourl,680,380,window,obj);
}

//网站验证码,调用 writeVerifyCode(安装目录,显示tips,cssname);
if (typeof codenum == 'undefined'){	var codenum = 1;}else{codenum++;}
function writeVerifyCode(dir,tips,cssname){
codenum++;	if (dir==undefined) dir='/';if (tips==undefined) tips=0;if (cssname==undefined) cssname='textbox';
document.write('<span style="position: relative;"><input name="Verifycode" id="Verifycode" tabindex="2" maxlength="5" size="6" class="'+cssname+'" onblur="if(!seccodefocus) {document.getElementById(\'codebox'+codenum+'\').style.display=\'none\';}"  id="Verifycode"  onfocus="showverifycode('+codenum+')"  autocomplete="off"/><div class="verifybox"  style="position:absolute;display:none;cursor: pointer;width: 124px; height: 44px;left:0px;top:40px;z-index:10009;padding:0;" id="codebox'+codenum+'" onmouseout="seccodefocus = 0" onmouseover="seccodefocus = 1"><img width="145" src="'+dir+'plus/verifycode.asp?time=0.001" id="vcodeimg'+codenum+'" title="看不清点这里刷新" onclick="showverifycode('+codenum+');"/></div></span>');
if (tips==1) document.write('&nbsp;<span style="color:#999">请输入上图中字符</span>&nbsp;');
}
var seccodefocus = 0;
function showverifycode(id) {
    var obj=document.getElementById("codebox"+id);
	obj.style.top = (-parseInt(obj.style.height) - 4) + 'px';
	obj.style.left = '0px';
	obj.style.display = '';
	var pos=getElementPos("codebox"+id);
	if (pos.y<0) obj.style.top=parseInt(obj.style.height)-20+"px";
document.getElementById('vcodeimg'+id).src =document.getElementById('vcodeimg'+id).src.split('?')[0]+'?time=' + Math.random();
	try{$("#codebox"+id).fadeOut('fast').fadeIn('fast');}catch(e){}
}
function getElementPos(elementId) {
 var ua = navigator.userAgent.toLowerCase();
 var isOpera = (ua.indexOf('opera') != -1);
 var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof
 var el = document.getElementById(elementId);
 if(el.parentNode === null || el.style.display == 'none') { return false; }      
 var parent = null;var pos = []; var box;     
 if(el.getBoundingClientRect)    //IE
 {  box = el.getBoundingClientRect();var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop); var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);return {x:box.left + scrollLeft, y:box.top + scrollTop};}else if(document.getBoxObjectFor)    // gecko    
 {box = document.getBoxObjectFor(el); var borderLeft = (el.style.borderLeftWidth)?parseInt(el.style.borderLeftWidth):0; 
  var borderTop = (el.style.borderTopWidth)?parseInt(el.style.borderTopWidth):0; 
  pos = [box.x - borderLeft, box.y - borderTop];} else    // safari & opera    
 {pos = [el.offsetLeft, el.offsetTop]; parent = el.offsetParent; if (parent != el) {while (parent) {pos[0] += parent.offsetLeft; pos[1] += parent.offsetTop;  parent = parent.offsetParent;}}   
  if (ua.indexOf('opera') != -1 || ( ua.indexOf('safari') != -1 && el.style.position == 'absolute' )) { pos[0] -= document.body.offsetLeft;pos[1] -= document.body.offsetTop;}}              
 if (el.parentNode) {parent = el.parentNode;} else {parent = null;}
 while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { // account for any scrolled ancestors
  pos[0] -= parent.scrollLeft;pos[1] -= parent.scrollTop;if (parent.parentNode) {parent = parent.parentNode;} else { parent = null;}}
 return {x:pos[0], y:pos[1]};
}

function AddFavorite(sURL, sTitle) {
    try { //IE
        window.external.addFavorite(sURL, sTitle);
    } catch (e) {
        try { //Firefox
            window.sidebar.addPanel(sTitle, sURL, "");
        } catch (e) {
   try{//Chrome无法自动收藏，用创建快应用程序的捷方式来替代。Js特效大全 www.www.111cn.net
    createShortcut();
   } catch(e){
    alert("请按Ctrl+D之后按“确定”完成收藏!");
   }
        }
    }
}
function setHomepage(pageURL) {
    if (document.all) {
        document.body.style.behavior='url(#default#homepage)';
        document.body.setHomePage(pageURL);
    }
    else {
            try { //IE
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
    try{ //Firefox
     var prefs = Components.classes['@mozilla.org/preferences-service;1']
.getService(Components. interfaces.nsIPrefBranch);
     prefs.setCharPref('browser.startup.homepage',pageURL);
    } catch(e) {
                alert( "您的浏览器不支持该操作，请使用浏览器菜单手动设置." );
    }
            }
    }
}

var KesionJS={
		//通用对话框
		Alert:function(msg,act){ 
		  if (frameElement==null || frameElement.api==undefined){
			 this.Alert1(msg,act); 
		  }else{
			 var api = frameElement.api, W = api.opener;
			 W.jQuery.dialog.alert(msg,function(){   setTimeout(function(){ eval(act);},1);});
		  }
		},
		Alert1:function(msg,act){ 
		  jQuery.dialog.alert(msg,function(){eval(act);});
		},
		AlertByTime:function(src,msg,t){
		   if (src==1){
			    src="success.gif";
		   }else{
			   src="error.gif";
		   }
		   if (t=='') t=2;
		   jQuery.dialog.tips(msg,t,src,function(){});

		},
		Confirm:function(msg,fun1,fun2){
		   if (frameElement==null ||frameElement.api==undefined){
			   this.Confirm1(msg,fun1,fun2);
		   }else{
			   var api = frameElement.api, W = api.opener;
			   W.jQuery.dialog.confirm(msg,function(){setTimeout(function(){ eval(fun1);},1);},function(){ setTimeout(function(){ eval(fun2);},1);});
		   }
		},
		Confirm1:function(msg,fun1,fun2){
			jQuery.dialog.confirm(msg,function(){eval(fun1);},function(){eval(fun2);});
		},
		Message:function(ico,msg,fun){
			if (frameElement==null ||frameElement.api==undefined){
			 this.Message1(ico,msg,fun); 
		  }else{
			  var api = frameElement.api, W = api.opener;
			  W.jQuery.dialog.tips(msg,2,ico,function(){ setTimeout(function(){ eval(fun);},1); });
			  
		  }
		},
		Message1:function(ico,msg,fun){
			jQuery.dialog.tips(msg,2,ico,function(){eval(fun);});
		},
		Tips:function(title,msg,w,h){
			jQuery.dialog({ title:title,
				content: msg,
				width:w,
				height:h,
				max:false,
				min:false
			});
			
		}

};

/*鼠标切换脚本*/

function scrollDoor(){
}
scrollDoor.prototype = {
	sd : function(menus,divs,openClass,closeClass){
		var _this = this;
		if(menus.length != divs.length)
		{
			alert("菜单层数量和内容层数量不一样!");
			return false;
		}				
		for(var i = 0 ; i < menus.length ; i++)
		{	
			_this.$(menus[i]).value = i;				
			_this.$(menus[i]).onmouseover = function(){
					
				for(var j = 0 ; j < menus.length ; j++)
				{						
					_this.$(menus[j]).className = closeClass;
					_this.$(divs[j]).style.display = "none";
				}
				_this.$(menus[this.value]).className = openClass;	
				_this.$(divs[this.value]).style.display = "block";				
			}
		}
		},
	$ : function(oid){
		if(typeof(oid) == "string")
		return document.getElementById(oid);
		return oid;
	}
}

//==============================限时抢购倒计时================================/
function calculagraph(){
	this._id=null;
	//this._sT=null;
	this._cT=null;
	this._eT=null;
	this._lT=null;
	this._tasktype=null;
	this.timerRunning=false;
	this.NowYear=null;
	this.NowDate=null;
	this.NowMonth=null;
	this.NowHour=null;
	this.NowMinute=null;
	this.NowSecond=null;
	this._gT=function(){
		if (this._tasktype==1){  //限时抢购
				//if (this._lT==null){
					var t=this._cT.split(' ')[0];
					var tarr=t.split('-');
					if (this.timerRunning==false){
						this.NowYear = tarr[0];
						this.NowMonth = tarr[1];   
						this.NowDate = tarr[2]; 
						t=this._cT.split(' ')[1];
						if (t==''||t==null) t='00:00:00'
						tarr=t.split(':');
						this.NowHour = tarr[0];   
						this.NowMinute = tarr[1]; 
						this.NowSecond = tarr.length==3?tarr[2]:0;  
					}else{
						if (this.NowMonth>12){
							this.NowMonth=0;
							this.NowYear++;
						}
						
						if(this.NowDate>=parseInt(getDaysInMonth(this.NowYear,this.NowMonth))){
							this.NowDate=0;
							this.NowMonth++;
						}

						if (this.NowHour>=24){
							this.NowHour=0;
							this.NowDate++;
						}
						if (this.NowMinute>=59){
							this.NowMinute=0;
							this.NowHour++;
						}
						if (this.NowSecond>=59){
							this.NowSecond=0;
							this.NowMinute++;
						}
						this.NowSecond++;
					}
					
					
					if (this.NowYear <2000)   
					this.NowYear=1900+this.NowYear;  
					var t=this._eT.split(' ')[0];
					var tarr=t.split('-');
					Yearleft = tarr[0] - this.NowYear   
					Monthleft = tarr[1] - this.NowMonth  
					Dateleft = tarr[2] - this.NowDate
					
					
					t=this._eT.split(' ')[1];
					if (t==''||t==null) t='00:00:00'
					tarr=t.split(':');
					var eHour = tarr[0];   
					var eMinute = tarr[1];   
					var eSecond = tarr.length==3?tarr[2]:0;   
					
					Hourleft = eHour - this.NowHour   
					Minuteleft = eMinute - this.NowMinute   
					Secondleft = eSecond - this.NowSecond   
					if (Secondleft<0)   
					{   
					Secondleft=60+Secondleft;   
					Minuteleft=Minuteleft-1;   
					}   
					if (Minuteleft<0)   
					{    
					Minuteleft=60+Minuteleft;   
					Hourleft=Hourleft-1;   
					}   
					if (Hourleft<0)   
					{   
					Hourleft=24+Hourleft;   
					Dateleft=Dateleft-1;   
					}   
					if (Dateleft<0)   
					{   
					Dateleft=31+Dateleft;   
					Monthleft=Monthleft-1;   
					}   
					if (Monthleft<0)   
					{   
					Monthleft=12+Monthleft;   
					Yearleft=Yearleft-1;   
					} 
					var Temp='';
					if (Yearleft>0){
						Temp='<strong>'+Yearleft+'</strong>年'
					}
					if (Monthleft>0){
						Temp+='<strong>'+Monthleft+'</strong>月';
					}
					Temp+='<strong>'+Dateleft+'</strong>天<strong>'+Hourleft+'</strong>小时<strong>'+Minuteleft+'</strong>分<strong>'+Secondleft+'</strong>秒';	
					if (getMinuteInDates(this._sT.replace(/(-)/g,'/'),this.NowYear+'/'+this.NowMonth+'/'+this.NowDate+' '+this.NowHour+':'+this.NowMinute+':'+this.NowSecond)<0){
					  document.getElementById(this._id).innerHTML='<span style="color:red">开始时间：'+this._sT+'</span>';   
					}
					else if (getMinuteInDates(this.NowYear+'/'+this.NowMonth+'/'+this.NowDate+' '+this.NowHour+':'+this.NowMinute+':'+this.NowSecond,this._eT.replace(/(-)/g,'/'))>=0){
					  document.getElementById(this._id).innerHTML=Temp;   
					}else{
					  document.getElementById(this._id).innerHTML="<strong style='font-size:14px;'>抢购结束</strong>";  
					  clearInterval(timerID);
					}
					this.timerRunning = true;   
					var timerID = setTimeout("function(){var oo=this;oo.gT()}",1000);   

			
		}else{  //限量抢购
					document.getElementById(this._id).innerHTML="<strong style='font-size:14px;'>限量抢购</strong>";
					clearInterval(this._interval);
		}
	}
	this._interval=function(){
		var o=this;
		this._interval=setInterval(function(){o._gT()},1000)
	}
}

function getDaysInMonth(year,month){
      month = parseInt(month,10)+1;
      var temp = new Date(year+"/"+month+"/0");
      return temp.getDate();
}

/**
 * 判断两个时间这间间隔几分钟

 * date1与date2格式：yyyy/MM/dd hh:mm:ss ，它们是字符串类型
 * */
function getMinuteInDates(date1,date2){
    var beginDate= new Date(date1);
    var endDate = new Date(date2);
    
    var date = endDate.getTime() - beginDate.getTime();
    
    var time = Math.floor(date / (1000 * 60   ));
    return time;
}
function getupinput(obj){
		var getstr=$(obj).next('span').find('input[name=up_ContactMan]').val();
		$('input[name=ContactMan]').val(getstr);
		getstr=$(obj).next('span').find('input[name=up_Address]').val();
		$('input[name=Address]').val(getstr);
		getstr=$(obj).next('span').find('input[name=up_ZipCode]').val();		
		$('input[name=ZipCode]').val(getstr);
		getstr=$(obj).next('span').find('input[name=up_Mobile]').val();
		$('input[name=Mobile]').val(getstr);
		getstr=$(obj).next('span').find('input[name=up_Phone]').val();
		$('input[name=Phone]').val(getstr);
		getstr=$(obj).next('span').find('input[name=up_QQ]').val();
		$('input[name=QQ]').val(getstr);
		getstr=$(obj).next('span').find('input[name=up_Email]').val();
		$('input[name=Email]').val(getstr);													  
}
//==============================限时抢购倒计时结束================================/
