// JavaScript Document

window.SITEINI={
	"sid":{"aversion":"","mversion":"","bhelp":"","ohelp":"","wurl":""}
	
	};

function addListener(target, evt, func) {
		  if(window.attachEvent) target.attachEvent('on' + evt, func);
		  else if(window.addEventListener) target.addEventListener(evt, func, false);  	
}
function openWza(node,iskey,isblind,ispack){
	console.log(window.wzasid+"fff");
	if(window.wzasid=="1176"){window.top.aria.start()}else{
	if(!iskey&&node){
		var pn=node;var hasAccLink=false;
		var i=0;
		while(pn&&pn.tagName!="BODY"){
			i++;
			if(i>3) break;
			if(pn.id&&pn.id=="cniil_wza") {hasAccLink=true;break;}
			pn=pn.parentNode;
		}
		if(!hasAccLink) return false;
	}
	if(iskey&&!node) node=document.body;
	var d=node.ownerDocument==document?document:top.document;
	var scriptNode=d.getElementById("cniil_assist");
	if(scriptNode) {
		if(window.openWzaSetting&&typeof(window.openWzaSetting)=="function") window.openWzaSetting();
		return true;
	}
	scriptNode=d.createElement("script");
	scriptNode.type="text/javascript";
	scriptNode.id="cniil_assist";
	scriptNode.defer=true;
	scriptNode.async=true;
	var isRead=getAccCookie("read");
	var bindPara=(isblind?"blind=2":"blind=1")+(isRead===undefined&!isblind?"&snd=1":"");
	var splitor=window.setupWzaPath.indexOf("?")==-1?"?":"&";
	var keyParam=iskey?"&key=1":"";
	var packParam=ispack?"&pck=1":"";
	window.setupWzaPath=window.setupWzaPath.replace(/blind=\d{1,}/ig,"");
	window.setupWzaPath+=splitor+bindPara+keyParam+packParam;
	scriptNode.src=window.setupWzaPath;
	d.body.appendChild(scriptNode);
	console.log(window.wzasid+"rrr");
	}
}
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
function getAccVal(key,reg){
	var match=reg.exec(window.setupWzaPath);
	if(!match) match=reg.exec(location.href);
	if(match) 
	{
		return match[1];
	}
}
function getAccCookie(key) {
		key="acc"+key;
		var result = key ? undefined : {};
		var cookies = document.cookie ? document.cookie.split('; ') : [];
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decodeURIComponent(parts.shift());
			var cookie = parts.join('=');
			if (key && key === name) {
				result = cookie;
				break;
			}
		}
		result=result&&!/[^\d]/.test(result)?parseInt(result):result;//是整形转换成数值型
		return result;
}


function loadAria(appid){
	var AriaNode = document.createElement("script");
    AriaNode.setAttribute("type", "text/javascript");
	AriaNode.setAttribute("charshset", "utf-8");
	AriaNode.setAttribute("defer","true");
	AriaNode.src="//gov.govwza.cn/dist/aria.js?appid="+appid;
	document.body.appendChild(AriaNode);
}
function loadAria2(appid){
	var AriaNode = document.createElement("script");
    AriaNode.setAttribute("type", "text/javascript");
	AriaNode.setAttribute("charshset", "utf-8");
	AriaNode.setAttribute("defer","true");
	AriaNode.src="//gov.govwza.cn/dist/_aria.js?appid="+appid;
	document.body.appendChild(AriaNode);
}
function cniil_setup(){
	var ismob=function(){
			 var arrs=['iphone','android'];
			 var info=navigator.userAgent.toLowerCase();
			 for(var i=0; i<arrs.length; i++){
				 var result=info.indexOf(arrs[i]);
				 if(result > -1)return true;
			 }
			 return false;
	};
	
	if(/cniil/i.test(navigator.userAgent)) return;//
	var path="";
	for(var i=0;i<document.scripts.length;i++){if(document.scripts[i].src&&/assist\.js/i.test(document.scripts[i].src)) {path=document.scripts[i].src;break;}}
	if(path.indexOf("://")==-1){var n=document.createElement("a");n.href=src;path=n.href;n=null;}
	var mobFlag=ismob()?"m":"a";
	
	
	
	if(!path) return;
	mobFlag=mobFlag+(/lang=en/.test(path)?"e":(/lang=big5/.test(path)?"b":""));
	
	var siteMatch=/[\?&]sid\s*=\s*(\d{1,})/i.exec(path);
	if(!siteMatch)siteMatch=/[\?&]sid\s*=\s*(\d{1,})/i.exec(top.location.href);
	var siteId=siteMatch?siteMatch[1]:"";
	var jsVersion=siteId&&window.SITEINI[siteId]&&window.SITEINI[siteId][mobFlag+"version"]?window.SITEINI[siteId][mobFlag+"version"]:"";
	var period=mobFlag=='m'?1:100000000;
	var wurl=siteId&&window.SITEINI[siteId]&&window.SITEINI[siteId]["wurl"]?window.SITEINI[siteId]["wurl"]:"";
	if(wurl) path=wurl;
	
	path=path.replace(/assist\.js/i,"assist"+mobFlag+jsVersion+".js");
	path=path+(path.indexOf("?")==-1?"?v=":"&v=")+Math.round((new Date()).getTime()/period);
	window.setupWzaPath=path;
	window.wzasid=siteId;
	console.log("rts");
	if(!/mob=1/.test(path)&&mobFlag=="m") {
		switch (window.wzasid) {
		case "1190":
				loadAria2("3ecdba4fc6182531f8839d1908a1c644");
			break; 
		case "1271":
				loadAria2("c383efcf316268aee76eb10e1be48576");
			break;
		case "1188":
				loadAria2("ece8c244d94b15fc6ab22b96de1fe1c9");
			break;
		case "1013":
				loadAria2("9440466afc1a27ae9d048ef1671d504a");
		break;
		case "130":
				loadAria2("f5ae52d8583fd82b0e3710e78672b4ce");
		break;
		case "1071":
				loadAria2("e146dba14b1383105ce456cccfcad553");
		break;
		case "1176":
				loadAria2("fbfc0089a1f075b8daec6204a7bc8558");		
		break;
		case "11974":
				loadAria2("32c4ff43716a481893d15d74fe1cdf30");		
		break;
		case "11964":
				loadAria2("862dffecc3082602274897301cc4687b");		
		break;
		case "119578":
				loadAria2("4bdb213611552f86bb4dccebaaecea39");		
		break;
		case "11955":
				loadAria2("1e5713850444a5ec4aea83fe2552057f");		
		break;
		case "11962":
				loadAria2("159cb35897b9cc99f1001e76bb7172fa");
		break;
		case "1073":
				loadAria2("f344181b19c8014655e239cab9feedb9");
		break;
		case "119578":
				loadAria2("4bdb213611552f86bb4dccebaaecea39");
		break;
		case "9739":
				loadAria2("6626c6b33668ff1dec46b0e0178b2fb8");
		break;
		case "9687":
				loadAria2("45a231d7c56aa84476bcbffa76bea295");
		break;
		case "1406":
				loadAria2("59b7588810292a187226c48a73049444");
		break;
		case "3633":
				loadAria2("8d7b22cec45bd7e78574e918b20af590");
		break;
		case "9149":
				loadAria2("7b18c2833c9961cf3fb0ccd039cd8ab8");
		break;
		case "7933":
				loadAria2("3a4a1ddbc07c43fb06feed17b1ff8325");
		break;
		case "5767":
				loadAria2("cd3c5e292417649c0de47f7a661c741c");
		break;
		case "13633":
				loadAria2("d5c52824d1ef44048602a50c4d222700");
		break;
		case "8468":
				
		break;
		case "82565":
				//loadAria("9292ea6eb49e76cca1deed7886ff9d10");
		break;
		case "82566":
				//loadAria("6bf9d955c156265eea20832c20357065");
		break;
		case "82567":
				//loadAria("9155780654e011446d1bce60920652e1");
		break;
		case "82568":
				//loadAria("1671966b8b634d8114a6b35e5beee159");
		break;
		case "82569":
				//loadAria("ac7cf62018f3cadbefc46d5bfaa5312e");
		break;
		case "82571":
				//loadAria("dde70c7ee24ef620c26ed33dd02476c6");
		break;
		case "82572":
				//loadAria("394ab2763e1855903f92c4c157ecfff7");
		break;
		case "82573":
				//loadAria("7974f7fc9e0a48f90c0acefd30d05139");
		break;
		case "82574":
				//loadAria("7dade77f7fa1dd63c614928ed87b7485");
		break;
		case "82575":
				//loadAria("fca81af4da0db6478d709b57b56055b2");
		break;
		case "82576":
				//loadAria("6939b2c5d22d694ade6bd36bb58b93d9");
		break;
		case "82577":
				//loadAria("ff45e20b25f1f0383015c626d3241231");
		break;
		case "82578":
				//loadAria("c8a0f68f3c49569673b936016176b6d1");
		break;
		case "82579":
				//loadAria("c49d8390039bb7efb78db4a2d04ab2d0");
		break;
		case "82627":
				loadAria2("f438591976f5999a18089359e9ca8377");
		break;
		case "82518":
				loadAria2("5c0fd464f5f51359b57c9164b1cb70da");
		break;
		case "15093":
				loadAria2("0fd7910636fe1b655d7ab257243f212f");
		break;
		case "14459":
				loadAria2("8f0df313912a61156d5ffe2e0b24f37c");
		break;
		case "82625":
				loadAria2("745c434686d1997ce9e7f1fba33aa35a");
		break;
		case "14525":
				loadAria2("6a9dc204632deeb49a8b9c6a96229fc6");
		break;
		case "14619":
				loadAria2("edc790c6e3fae85e2675cd4f2224e78d");
		break;
		case "1766":
				loadAria2("37dba24c8a2c3562d82070357d5899a3");
		break;
		
		}
		return;
		
	};
	if(document.body){
		//根据sid更换新版本
		switch (window.wzasid) {
		case "1190":
				loadAria("3ecdba4fc6182531f8839d1908a1c644");
			break; 
		case "1271":
				loadAria("c383efcf316268aee76eb10e1be48576");
			break;
		case "1188":
				loadAria("ece8c244d94b15fc6ab22b96de1fe1c9");
			break;
		case "1013":
				loadAria("9440466afc1a27ae9d048ef1671d504a");
		break;
		case "130":
				loadAria("f5ae52d8583fd82b0e3710e78672b4ce");
		break;
		case "1071":
				loadAria("e146dba14b1383105ce456cccfcad553");
		break;
		case "1176":
				loadAria("fbfc0089a1f075b8daec6204a7bc8558");		
		break;
		case "11974":
				loadAria("32c4ff43716a481893d15d74fe1cdf30");		
		break;
		case "11964":
				loadAria("862dffecc3082602274897301cc4687b");		
		break;
		case "119578":
				loadAria("4bdb213611552f86bb4dccebaaecea39");		
		break;
		case "11955":
				loadAria("1e5713850444a5ec4aea83fe2552057f");		
		break;
		case "11962":
				loadAria("159cb35897b9cc99f1001e76bb7172fa");
		break;
		case "1073":
				loadAria("f344181b19c8014655e239cab9feedb9");
		break;
		case "119578":
				loadAria("4bdb213611552f86bb4dccebaaecea39");
		break;
		case "9739":
				loadAria("6626c6b33668ff1dec46b0e0178b2fb8");
		break;
		case "9687":
				loadAria("45a231d7c56aa84476bcbffa76bea295");
		break;
		case "1406":
				loadAria("59b7588810292a187226c48a73049444");
		break;
		case "3633":
				loadAria("8d7b22cec45bd7e78574e918b20af590");
		break;
		case "9149":
				loadAria("7b18c2833c9961cf3fb0ccd039cd8ab8");
		break;
		case "7933":
				loadAria("3a4a1ddbc07c43fb06feed17b1ff8325");
		break;
		case "5767":
				loadAria("cd3c5e292417649c0de47f7a661c741c");
		break;
		case "82449":
				loadAria("da322e58f5160c8caf0bb363439ff7d9");
		break;
		case "82448":
				loadAria("8b7925ff4341969afff7c40b50c9ad60");
			break;
		case "13633":
				loadAria2("d5c52824d1ef44048602a50c4d222700");
		break;
		case "82565":
				//loadAria("9292ea6eb49e76cca1deed7886ff9d10");
		break;
		case "82566":
				//loadAria("6bf9d955c156265eea20832c20357065");
		break;
		case "82567":
				//loadAria("9155780654e011446d1bce60920652e1");
		break;
		case "82568":
				//loadAria("1671966b8b634d8114a6b35e5beee159");
		break;
		case "82569":
				//loadAria("ac7cf62018f3cadbefc46d5bfaa5312e");
		break;
		case "82571":
				//loadAria("dde70c7ee24ef620c26ed33dd02476c6");
		break;
		case "82572":
				//loadAria("394ab2763e1855903f92c4c157ecfff7");
		break;
		case "82573":
				//loadAria("7974f7fc9e0a48f90c0acefd30d05139");
		break;
		case "82574":
				//loadAria("7dade77f7fa1dd63c614928ed87b7485");
		break;
		case "82575":
				//loadAria("fca81af4da0db6478d709b57b56055b2");
		break;
		case "82576":
				//loadAria("6939b2c5d22d694ade6bd36bb58b93d9");
		break;
		case "82577":
				//loadAria("ff45e20b25f1f0383015c626d3241231");
		break;
		case "82578":
				//loadAria("c8a0f68f3c49569673b936016176b6d1");
		break;
		case "82579":
				//loadAria("c49d8390039bb7efb78db4a2d04ab2d0");
		break;
		case "82627":
				loadAria("f438591976f5999a18089359e9ca8377");
		break;
		case "82518":
				loadAria("5c0fd464f5f51359b57c9164b1cb70da");
		break;
		case "15093":
				loadAria("0fd7910636fe1b655d7ab257243f212f");
		break;
		case "14459":
				loadAria("8f0df313912a61156d5ffe2e0b24f37c");
		break;
		case "82625":
				loadAria("745c434686d1997ce9e7f1fba33aa35a");
		break;
		case "14525":
				loadAria("6a9dc204632deeb49a8b9c6a96229fc6");
		break;
		case "14619":
				loadAria("edc790c6e3fae85e2675cd4f2224e78d");
		break;
		case "1379":
				loadAria("d2686dd35554f16898524df241ebcf6f");
		break;
		case "1766":
				loadAria("37dba24c8a2c3562d82070357d5899a3");
		break;
		

		/* case "1176":
				alert(window.self.document.getElementById("cniil_wza"));
				document.getElementById("cniil_wza").innerHTML;
				var AriaNode = window.top.document.createElement("script");
				AriaNode.setAttribute("type", "text/javascript");
				AriaNode.setAttribute("charshset", "utf-8");
				AriaNode.src="//gov.govwza.cn/dist/aria.js?appid=fbfc0089a1f075b8daec6204a7bc8558";
				window.top.document.body.appendChild(AriaNode);
				
				console.log("333");
				break; */
		default: 
		//
		addListener(document,"click",function(e){
				var node = e.target||e.srcElement;
				openWza(node);
		});
		/* addListener(document,"keyup",function(e){
				if(window.assist&&window.assist.module&&window.assist.module.face) return true;							  
				e = e ||window.event; 
				var key=e.which||e.keyCode;
				var node=(e.target||e.srcElement);
				if(node&&(node.tagName=="TEXTAREA"||(node.tagName=="INPUT"&&(node.getAttribute("type")=="text"||node.getAttribute("type")=="password"||node.getAttribute("type")=="")))) return true;
				if(!e.altKey&&e.shiftKey&&!e.ctrlKey&&(key==50||key==98))openWza(node,true,true);
				if(!e.altKey&&e.shiftKey&&!e.ctrlKey&&(key==49||key==97))openWza(node,true,false);
				//if(!e.altKey&&!e.shiftKey&&!e.ctrlKey&&key==9&&!window.accTabed) {window.accTabed=true;openWza(node,true,true,true);return true;}
		}); */
		/* addListener(document,"keydown",function(e){
				if(window.assist&&window.assist.module&&window.assist.module.face) return true;							  
				e = e ||window.event; 
				var key=e.which||e.keyCode;
				var node=(e.target||e.srcElement);
				if(!e.altKey&&!e.shiftKey&&!e.ctrlKey&&key==13) openWza(node,false,true);
		}); */
		var accRole=getAccCookie("blind")||getAccVal("blind",(/[\?&]blind\s*=\s*(0|1|2|3)/i));
		if(accRole==1){
			openWza(document.body,true,false);
		}else if(accRole==2){
			openWza(document.body,true,true);
		}
	 //
		}
	}
}

cniil_setup();