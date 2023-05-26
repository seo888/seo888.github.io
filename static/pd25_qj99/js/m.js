function fWeather(style,sWith,sHeight)
{
	document.getElementById('weather01').innerHTML='<IFRAME src="/services/?s=weather&style='+style+'" frameBorder="0" width="'+sWith+'" height="'+sHeight+'" ALIGN="CENTER" MARGINWIDTH="0" MARGINHEIGHT="0" HSPACE="0" VSPACE="0" SCROLLING="NO" allowtransparency="true"></IFRAME>'
}
function ktip(str,second,obj,color)
{
	if(second==undefined||typeof second!="number"){
		second=3000;
	}
	let tipwrap=document.createElement("div");
	tipwrap.className="ktipwrap";
	tipwrap.innerHTML="<div class=\"arrow\"></div><div class=\"bg\"></div><div class=\"text\">"+str+"</div>";
	document.body.appendChild(tipwrap);
	if(obj)
	{
		if(color)
		{
		tipwrap.childNodes[0].style.borderRightColor=color;
		tipwrap.childNodes[1].style.backgroundColor=color;
		}
		tipwrap.className="ktipwraparrow";
		tipwrap.style.left=$(obj).offset().left-10+"px";
		tipwrap.style.top=($(obj).offset().top-tipwrap.offsetHeight-5)+"px";
		tipwrap.style.display="none";
		$(tipwrap).fadeIn(500);
	}
	setTimeout(function(){
			this.parent = tipwrap.parentNode;
			parent.removeChild(tipwrap);
		},second);
}
function ktishi(options)
{
	let close=function()
	{
		if(document.querySelector(".ktishiwrap")!=null)
		{
			$(".ktishiwrap").fadeOut();
			this.parent = document.querySelector(".ktishiwrap").parentNode;
			if(document.querySelector(".ktishiwrap").querySelector(".close")!=null)
				{
					document.querySelector(".ktishiwrap").querySelector(".close").onclick=null;
				}
				if(document.querySelector(".ktishiwrap").querySelector(".ktishibg")!=null)
				{
					document.querySelector(".ktishiwrap").querySelector(".ktishibg").onclick=null;
				}
				if(document.querySelector(".ktishiwrap").querySelector(".confirm")!=null)
				{
					document.querySelector(".ktishiwrap").querySelector(".confirm").onclick=null;
				}
				if(document.querySelector(".ktishiwrap").querySelector(".cancel")!=null)
				{
					document.querySelector(".ktishiwrap").querySelector(".cancel").onclick=null;
				}
			setTimeout(function(){this.parent.removeChild(document.querySelector(".ktishiwrap"))},500);
		}
	};
	if(document.querySelector(".ktishiwrap")!=null)
	{
		close();
	}
	
		let tishiwrap=document.createElement("div");
		tishiwrap.className="ktishiwrap";
	
		let tishibg=document.createElement("div");
		tishibg.className="ktishibg";
		tishibg.onclick=function(){
			close();
		}
		tishiwrap.appendChild(tishibg);
		let tishibox=document.createElement("div");
		tishibox.className="ktishibox";
		let tishiclose=document.createElement("div");
		tishiclose.className="close kicon";
		tishiclose.onclick=function(){
				close();
			};
		tishibox.appendChild(tishiclose);
		let tishitext=document.createElement("div");
		tishitext.className="text";
		if(options.text)
		{
			tishitext.innerHTML=options.text;
		}
		tishibox.appendChild(tishitext);
		let tishibtn=document.createElement("div");
		tishibtn.className="btn";
		if(options.confirm||options.url)
		{
			let btnconfirm=document.createElement("div");
			btnconfirm.innerHTML="确定";
			btnconfirm.className="confirm";
			if(options.confirm)
			{
				btnconfirm.onclick=function(){
				options.confirm();
				close();
				}
			}
			if(options.url)
			{
				btnconfirm.onclick=function(){
				window.location.href=options.url;
				close();
				}
			}
			tishibtn.appendChild(btnconfirm);
			let btncancel=document.createElement("div");
			btncancel.innerHTML="取消";
			btncancel.className="cancel";
			btncancel.onclick=function(){
				close();
			}
			tishibtn.appendChild(btncancel);
		}
		else
		{
			let btnconfirm=document.createElement("div");
			btnconfirm.innerHTML="确定";
			btnconfirm.className="confirm only";
			btnconfirm.onclick=function(){
				close();
			}
			tishibtn.appendChild(btnconfirm);
		}
		tishibox.appendChild(tishibtn);
		tishiwrap.appendChild(tishibox);
		document.body.appendChild(tishiwrap);
			$(".ktishibox").fadeIn();
	
}
function kfUrlTab(obj)
{
	$(obj).find(".kftablist").hide();
		$(obj).each(function(index,obj){
			let tabid=0;
			if(getQueryStringArgs()["tabid"])
			{
				tabid=getQueryStringArgs()["tabid"];
			}
			$(obj).find(".head").find("li").eq(tabid).addClass("ck");
			$(obj).find(".kftablist").eq(tabid).show();
		});
		$(obj).find(".head li").on("click",function(){
			$(this).parent().find("li").removeClass("ck");
			$(this).addClass("ck");
			$(this).parent().parent().find(".kftablist").hide();
			$(this).parent().parent().find(".kftablist").eq($(this).index()).show();
			window.location="?tabid="+$(this).index();
		});
}
function kfTab(obj)
{
	$(obj).find(".kftablist").hide();
		$(obj).each(function(index,obj){
			let tabid=0;
			$(obj).find(".head").find("li").eq(tabid).addClass("ck");
			$(obj).find(".kftablist").eq(tabid).show();
		});
		$(obj).find(".head li").on("click",function(){
			$(this).parent().find("li").removeClass("ck");
			$(this).addClass("ck");
			$(this).parent().parent().find(".kftablist").hide();
			$(this).parent().parent().find(".kftablist").eq($(this).index()).show();
		});
}
function getQueryStringArgs(){
	let qs=(location.search.length>0?location.search.substring(1):""),args={};
		for(let item of qs.split("&").map(kv=>kv.split("=")))
			{
				let name=decodeURIComponent(item[0]),value=decodeURIComponent(item[1]);
				if(name.length)
					{
						args[name]=value;
					}
			}
		return args;
	}
function getHashArgs(){
	let qs=(location.hash.length>0?location.hash.substring(1):""),args={};
		for(let item of qs.split("&").map(kv=>kv.split("=")))
			{
				let name=decodeURIComponent(item[0]),value=decodeURIComponent(item[1]);
				if(name.length)
					{
						args[name]=value;
					}
			}
		return args;
	}
	
function showpic(url)
{
	if (url != "") {
		if (url.indexOf("http://") == -1 && url.indexOf("https://") == -1 && url.substr(0, 1) != "/")
		{
			url = '/' + url;
		}
	}
	else
	{
		url = "/user/images/nopic2.gif";
	}
	ktishi({text:"<div class='jsshowpic' style='max-height:400px; text-align:center; overflow: hidden;'><img src='"+url+"' style='max-width:300px;' /></div>"});
}

function valiUpPic(picInputId, picId) {
	if ($("#" + picInputId).val() != "") {
		if ($("#" + picInputId).val().indexOf("http://") == -1 && $("#" + picInputId).val().indexOf("https://") == -1 && $("#" + picInputId).val().substr(0, 1) != "/") {
			$("#" + picId).attr("src", "/" + $("#" + picInputId).val());
		}
		else {
			$("#" + picId).attr("src", $("#" + picInputId).val());
		}
	}
	else {
		$("#" + picId).attr("src", "/user/images/nopic2.gif");
	}
}
function valiUpPic1(picInputId, picId,defpic) {
	if ($("#" + picInputId).val() != "") {
		if ($("#" + picInputId).val().indexOf("http://") == -1 && $("#" + picInputId).val().indexOf("https://") == -1 && $("#" + picInputId).val().substr(0, 1) != "/") {
			$("#" + picId).attr("src", "/" + $("#" + picInputId).val());
		}
		else {
			$("#" + picId).attr("src", $("#" + picInputId).val());
		}
	}
	else {
		$("#" + picId).attr("src", defpic);
	}
}
function wapurlback()
{
	if(history.length > 1)
	{
		history.go(-1);
	}
	else
	{
		window.location.href="/";
	}
}
function tishi(text,url)
{
	if(url==""||url==undefined)
		{
				layer.open({title:"提示：",content:text,shadeClose:true,icon:9,btn:['确定']});
		}
	else{
			layer.open({title:"提示：",content:text,shadeClose:true,icon:9,btn:['确定','取消'],yes:function(index,layero)
								{
									layer.close(index);
									window.location.href=url;
								}});
	}

}
function waptishi(text,url)
{
	if(url=="")
		{
				layer.open({title:["提示：","background-color:#ed414a; color:#fff;"],content:text,shadeClose:true,icon:9,btn:['确定']});
		}
	else{
			layer.open({title:["提示：","background-color:#ed414a; color:#fff;"],content:text,shadeClose:true,icon:9,btn:['确定','取消'],yes:function(index,layero)
								{
									layer.close(index);
									window.location.href=url;
								}});
	}

}
//收藏信息功能
function fInfoFav(id)
{
	$.get("/services/?s=favorite&mid="+id,function(data,status){
    alert(data);
  });
}
function setCookie(name,value)
{
	var Days = 30; 
	var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
}
function setCookie(name,value,Days)
{
	var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
}
function getCookie(name)    
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return "";
}
//收藏信息功能结束


function changedisplaytype(s)
{
	setCookie("displaytype",s,365);
	window.location.reload();
}
function setUrlPra()
{
	let url = location.pathname;
	if(url=="/")
		{
			url="/xinxi/"
		}
	var sm1, sm2;
	if ($("input[name='m1']").length == 1) {
		sm1 = $("input[name='m1']").val().replace(/[\s]/, "");
	}
	else {
		sm1 = $("input[name='m1']").eq(1).val().replace(/[\s]/, "");
	}
	if ($("input[name='m2']").length == 1) {
		sm2 = $("input[name='m2']").val().replace(/[\s]/, "");
	}
	else {
		sm2 = $("input[name='m2']").eq(1).val().replace(/[\s]/, "");
	}
    if(sm1=="" && sm2=="")
    {
		window.location.replace(url);
		return;
    }
    if(sm1==""||!/^\d+[.\d]*$/.test(sm1))
    {
        alert("请输入数字！");
    }
    else
    {
        if(sm2==""||!/^\d+[.\d]*$/.test(sm2))
        {
            alert("请输入数字！");
        }
        else
        {
            window.location.replace(url+"?m="+sm1+"_"+sm2);
        }
    }
    
}

function cleanUrlPra()
{
     window.location.replace(location.pathname);
}


function _q(obj)
{
	return document.getElementById(obj);
}
function valiJson(str)
{
	if(str!=null)
		{
   return str.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\n/g, "\\n");
		}
	else
		{
			return "";
		}
}
function istel(kftel){
	if(/^(13|14|15|16|17|18|19)\d{9}$/.test(kftel))
	{
		return true;
	}
	else
	{
		return false;
	}
}


function kloadsort(sid,sid1,sval,sval1,kfidlist,kfnamelist)
{
var kfsi=kfidlist.split(':');
var kfsn=kfnamelist.split(':');
	if(sval=="")
		{
			sval=$('#' + sid).val();
		}
	else{
		$('#' + sid).val(sval);
	}
$('#' + sid1).parent().hide();
$('#' + sid1+ ' option').remove();
for(var i=0;i<kfsi.length;i++)
{
	var kfsi1=kfsi[i].split(',');
	var kfsn1=kfsn[i].split(',');
		if(sval==kfsi1[0])
		{
			if(kfsi1.length>1)
			{
				for(var t=1;t<kfsi1.length;t++)
				{
					$('#' + sid1).append("<option value=\""+kfsi1[t]+"\">"+kfsn1[t]+"</option>");
				}
				$('#' + sid1).parent().show();
			}
		}
	}
	if(sval1!="")
		{
			$('#' + sid1).val(sval1);
		}
	layui.use(['form'], function(){
		form = layui.form;
		form.render();
	});
}
function randomString(len) {
 　　len = len || 32;
 　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
 　　var maxPos = $chars.length;
 　　var pwd = '';
 　　for (i = 0; i < len; i++) {
 　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
 　　}
 　　return pwd;
}