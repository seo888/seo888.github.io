	var rdxw_tpl='<div class="title1"><a href="//www.dzwww.com/special/ts/jtz/" target="_blank">精华推荐</a></div><ul class="list1"><[var len=$data.length;len>3?len=4:"";for(var i=0;i<len;i++){]><li><a href="<[=$data[i].url]>" target="_blank"><img src="<[=$data[i].src]>" height="60" width="105" /></a><p><a href="<[=$data[i].url]>" target="_blank"><[=$data[i].title]></a></p></li><[}]></ul>';
	var dutu_tpl='<div class="title1"><a href="//www.dzwww.com/tupian/wyzp/" target="_blank">读 图</a></div><ul class="list3"><[var len=$data.length;len>3?len=4:"";for(var i=0;i<len;i++){]><li><a href="<[=$data[i].url]>" target="_blank"><img src="<[=$data[i].src]>" alt="<[=$data[i].title]>" width="140" height="85" /></a><p><a href="<[=$data[i].url]>" target="_blank"><[=$data[i].title]></a></p></li><[}]><div class="clear"></div></ul>';
	var juetu_tpl='<ul class="photo-list"><[for(var i=0;i<2;i++){]><li><a href="<[=$data[i].url]>" target="_blank"><img border="0" alt="1.jpg" src="<[=$data[i].src]>" width="130" height="90" /></a><p><a href="<[=$data[i].url]>" target="_blank"><[=$data[i].title]></a></p></li><[}]><div class="clear"></div></ul><div class="blank1"></div><div class="blank10"></div><ul class="list12-25"><[for(var i=2;i<5;i++){]><li><a href="<[=$data[i].url]>" target="_blank"><[=$data[i].title]></a></li><[}]></ul>';
	var newsrank_tpl='<[for(var i=0;i<10;i++){]><li><a title="<[=$data[i].title]>" href="<[=$data[i].url]>" target="_blank"><[=$data[i].title]></a></li><[}]>';
	var ltzd_tpl='<div class="blank15"></div><h3><a href="<[=$data[0].url]>" target="_blank"><[=$data[0].title]> </a></h3><ul class="list12-25"><[for(var i=1;i<8;i++){]><li><a href="<[=$data[i].url]>" target="_blank"><[=$data[i].title]></a></li><[}]></ul>';
	var newadd1408_tpl='<ul><[for(var i=0;i<8;i++){]><li><a href="<[=$data[i].url]>" target="_blank"><img src="<[=$data[i].src]>" width="140" height="100" /></a><p><a href="<[=$data[i].url]>" target="_blank"><[=$data[i].title]></a></p></li><[}]></ul>';
	var jrrb_tpl='<div class="title1"><a href="//www.dzwww.com/synr/dzsc/" target="_blank">今日热播</a></div><ul class="list3"><[var len=$data.length;len>3?len=4:"";for(var i=0;i<len;i++){]><li><a href="<[=$data[i].url]>" target="_blank"><img src="<[=$data[i].src]>" width="140" height="85" /></a><p><a href="<[=$data[i].url]>" target="_blank"><[=$data[i].title]></a></p><div class="play"><a href="<[=$data[i].url]>" target="_blank"></a></div></li><[}]><div class="clear"></div></ul>';
	var ltrt_tpl='<div class="title1"><a href="">论坛热帖</a></div><ul class="list2"><[var len=$data.length;len>7?len=6:len;for(var i=0;i<len;i++){]><li><a href="<[=$data[i].url]>" target="_blank"><[=$data[i].title]></a></li><[}]></ul>';
	var shrd_tpl='<div class="title1"><a href="//www.dzwww.com/xinwen/shehuixinwen/" target="_blank">社会热点</a></div><ul class="list2"><[var len=$data.length;len>10?len=10:"";for(var i=0;i<len;i++){]><li><a href="<[=$data[i].url]>" target="_blank"><[=$data[i].title]></a></li><[}]></ul>';
	var mtjz_tpl='<div class="title1">大众网全媒体矩阵</div><div class="matrix"><table><tbody><tr><td><h5><a href="//www.dzwww.com/synr/mtjz/sjb/">山东手机报</a></h5><[for(var i=0;i<2;i++){]><p>[<a href="<[=$data[i].url]>" target="_blank" title=""><[=$data[i].title]></a>]</p><[}]></td><td><h5><a href="//www.dzwww.com/synr/mtjz/24xs/">山东24小时</a></h5><[for(var i=2;i<4;i++){]><p>[<a href="<[=$data[i].url]>" target="_blank" title=""><[=$data[i].title]></a>]</p><[}]></td></tr><tr><td><h5><a href="//www.dzwww.com/synr/mtjz/gfpt/">大众网微信官方平台</a></h5><[for(var i=4;i<6;i++){]><p>[<a href="<[=$data[i].url]>" target="_blank" title=""><[=$data[i].title]></a>]</p><[}]></td><td><h5><a href="//www.dzwww.com/synr/mtjz/ltkhd/">论坛客户端</a></h5><[for(var i=6;i<8;i++){]><p>[<a href="<[=$data[i].url]>" target="_blank" title=""><[=$data[i].title]></a>]</p><[}]></td></tr>	</tbody></table></div>';
//	var ltrt_tpl='<div class="title1"><a href="">论坛热帖</a></div><div class="hot1"><h3><a href="<[=$data[0].url]>" target="_blank"><[=$data[0].title]></a></h3><[if($data[0].src.indexOf("nophoto")<0){]><a href="<[=$data[0].url]>"><img src="<[=$data[0].src]>" width="90" height="60" /></a><[}]><p><[=$data[0].title]></p><div class="clear"></div></div><ul class="list2"><[var len=$data.length;len>7?len=6:"";for(var i=1;i<len;i++){]><li><a href="<[=$data[i].url]>" target="_blank"><[=$data[i].title]></a></li><[}]></ul>';
	var rtph_tpl='<[var len=$data.length;len>10?len=10:"";for(var i=0;i<len;i++){]><li><a href="<[=$data[i].url]>" target="_blank"><[=$data[i].title]></a></li><[}]>';
	var sqdt_tpl='<div class="title1"><a href="">山东十七地市新闻精选</a></div><div class="hot2"><a href="<[=$data[0].url]>" target="_blank"><img src="<[=$data[0].src]>"  width="90" height="80"></a><h3><a href="<[=$data[0].url]>" target="_blank" title=""><[=$data[0].title]></a></h3><p><[=$data[0].abstract]></p><div class="clear"></div></div><ul class="list2"><[for(var i=1;i<17;i++){]><li><a href="<[=$data[i].url]>" target="_blank" title="<[=$data[i].title]>"><[=$data[i].title]></a></li><[}]></ul>';
	(function() {
		var subForPrefix = "__sub_foreach_", subIndexPrefix = "__index_",subTempIndexPrefix = "__index_tmp_",  subTempVariablePrefix = "__var_tmp_", subLenPrefix = "__len_",printPrefix = "__buf__.push(";
		var sweet = function( tplStr ) {
	 // Prevent new operator
			if (!this.applyData) return new sweet(tplStr);
	 var re = new RegExp("(.*?)" + sweet.startDelimiter + "(.*?)" + sweet.endDelimiter, "g"),
				foreachRe = /foreach[\s\xa0]*\([\s\xa0]*(\S+?)[\s\xa0]*(?:as[\s\xa0]*(\S+?)){0,1}?[\s\xa0]*\)[\s\xa0]*\{/g,
				tmpStr,
				i, l,      // loop variable
				subExprs = [],
				replaced = [];
			tmpStr = tplStr.replace(re, function(m, text, expr) {
				expr = trim(expr);
				if (text != "") {
					text = text.replace(/'/g, "\\'");
					replaced.push(printPrefix + '\'' + text + '\'');
					replaced.push(");");
					// deal with ?: expression
					if (expr.charAt(0) == ":") {
						replaced[replaced.length - 1] = ")";
					}
				}
				if (expr != "") {
					if (expr.charAt(0) == "=") {
						expr = printPrefix + expr.substr(1) + ');';
					} else {
						if (!/[;\?\{\}:]/.test(expr.charAt(expr.length - 1)))
							expr = expr + ";";
					}
					replaced.push(expr);
				}
				return "";
			});
			if (tmpStr) {
				replaced.push(printPrefix + '\'' + tmpStr + '\'' + ");");
			}
			replaced = replaced.join('')
					.replace(foreachRe, function(m, varName, definedVarName) {
				var subExpr = {
						type: "foreach",
						varName: varName,
						definedVarName: definedVarName || false
					},
					id = subExprs.push(subExpr) - 1,
					header = subForPrefix + id + "_{";
				subExpr.id = id;
				return header;
			});
			for (i = 0, l = subExprs.length; i < l; i++) {
				replaced = replaceSubExpr(replaced, subExprs[i]);
			}
			replaced = ["var __buf__=[],$index=null;$util.print=function(str){__buf__.push(str);};with($data){",
				replaced, "} return __buf__.join('');"].join('');
			this.compiled = new Function("$data", "$util", replaced);
		};
		sweet.prototype.applyData = function(data, scope) {
			var util = {};
			if (sweet.util) {
				var _util = sweet.util;
				for (var key in _util) {
					util[key] = _util[key];
				}
			}
			return this.compiled.call(scope || window, data, util);
		}
		function replaceSubExpr(str, subExpr) {
			var id = subExpr.id,
				varName = subExpr.varName,
				definedVarName = subExpr.definedVarName,
				indexName = subIndexPrefix + id,
				tmpIndexName = subTempIndexPrefix + id,
				tmpVarName = subTempVariablePrefix + id,
				lenName = subLenPrefix + id,
				indexVarName = [varName, "[", indexName, "]"].join(''),
				subRe = new RegExp(subForPrefix + id + "_{", "g"),
				braceRe = new RegExp("\{|\}", "g"),
				m, mbrace,
				subStr,
				index,
				lastIndex,
				unclosed = 0, prefix, suffix;
			if (definedVarName) {
				prefix = ["var ", tmpIndexName, "=$index;if(typeof ", definedVarName," !='undefined')var ",
					tmpVarName, "=", definedVarName,";else var ", definedVarName, "=null;for(var ",indexName,"=0,", lenName, "=", varName,
					".length;",indexName, "<", lenName, ";", indexName, "++){$index=",indexName,
					";", definedVarName, "=", indexVarName, ";with(",definedVarName, "){"].join('');
				suffix = ["}}$index=", tmpIndexName, ";if(typeof ", tmpVarName, "!='undefined')",
					definedVarName, "=", tmpVarName, ";"].join('');
			} else {
				prefix = ["var ", tmpIndexName, "=$index;for(var ",indexName,"=0,", lenName, "=", varName,
					".length;",indexName, "<", lenName, ";", indexName, "++){$index=",indexName,
					";with(",indexVarName, "){"].join('');
				suffix = "}}$index=" + tmpIndexName + ";";
			}
			m = subRe.exec(str);
			if (m) {
				index = m.index;
				lastIndex = subRe.lastIndex;
				subStr = str.substr(lastIndex);
				while ((mbrace = braceRe.exec(subStr))) {
					if (mbrace == "{") {
						unclosed++;
					} else {
						if (unclosed > 0)
							unclosed--;
						else {
							subStr = subStr.substring(0, mbrace.index) + suffix + subStr.substr(braceRe.lastIndex);
							break;
						}
					}
				}
				str = str.substring(0, index) + prefix + subStr;
			}
			return str;
		}
		function trim(str) {
			return str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
		}
		sweet.setDelimiters = function(delimitersPattern) {
			var d = delimitersPattern.replace(/[\{\[\}\]\(\)\|]/g, function(m) {
				return "\\" + m;
			}).split("...");
			sweet.startDelimiter = d[0];
			sweet.endDelimiter = d[1];
		}
		sweet.startDelimiter = "<\\[";
		sweet.endDelimiter = "\\]>";
		sweet.util = {
			trim: trim
		};
		sweet.extendUtil = function(utilExtends) {
			if (utilExtends) {
				var util = sweet.util;
				for (var key in utilExtends) {
					var func = utilExtends[key];
					if (func) util[key] = func;
				}
			}
		};
		function L(){
	};
	L.tool={
			add :function(el, type, fn, capture) {
				if(!capture){capture=false;}
				if (el && el.addEventListener) {
					el.addEventListener(type, fn, capture);
				} else if (el && el.attachEvent) {
					el.attachEvent('on' + type, fn);
				}
			},
			remove :function(el, type, fn, capture) {
				////移除某个对象的某个类或者多个类，类与类之间用空格隔开
				if (el && el.removeEventListener) {
				// this can throw an uncaught exception in FF
					try {
						el.removeEventListener(type, fn, capture);
					} catch (ex) {}
				} else if (el && el.detachEvent) {
					el.detachEvent('on' + type, fn);
            	}
			},
			rmClassName:function(org,what){
				var arrWhat,arrClass;
				if(!org||!what){return org;}
				arrWhat=what.split(" ");
				arrClass=org.split(" ");
				if(arrClass.length==1&&arrClass[0]=="") return org;
				for(var j=0;j<arrWhat.length;j++){
					for(var i=0;i<arrClass.length;i++){
						if(arrClass[i]==arrWhat[j]) arrClass[i]="";
					} }
				var tempStr="";var num=arrClass.length-1;
				for(var m=0;m<=num;m++){
					if(m==num){ if(arrClass[m]!="") tempStr=tempStr+arrClass[m];}
					else if(arrClass[m]!="") tempStr=tempStr+arrClass[m]+" ";
				}
				return tempStr;
			},
			addClassName :function(org,what){
				//给某个类添加新的类，可同时添加多个类，已经存在的则不再添加，
				var arrWhat,arrClass;
				if(!org){return what;}
				if(!what){return org;}
				arrWhat=what.split(" ");
				arrClass=org.split(" ");
				if(arrWhat.length==1&&arrWhat[0]==""){return org}
				if(arrClass.length==1&&arrClass[0]==""){
					org+=what;
				}else {
					for(var j=0;j<arrWhat.length;j++){
						var flag=0;
						for(var i=0;i<arrClass.length;i++){
							if(arrClass[i]==arrWhat[j]) {flag=1;break;}
						}
						if(flag==0&&arrWhat[j]!="")
						  org+=" "+arrWhat[j];
					}}
				return org;
			},
			getByClass:function(object, tag, className) {
				//getByClass  查找某个对象下面 某个类为className的对象数组
					var o = object.getElementsByTagName(tag);
					for ( var i = 0, n = o.length, ret = []; i < n; i++) {
						if(className==''){ret.push(o[i]);continue;}
						var tempArr=o[i].className.split(" ");
						for(var j=0;j<tempArr.length;j++){
							if (tempArr[j]== className) {ret.push(o[i]);break;}
						}
					}
					return ret;
			},
			stopBubble:function(e) {
				if (e && e.stopPropagation && e.preventDefault) {// 非IE
						e.stopPropagation();// 标准W3C的取消冒泡
						e.preventDefault();// 取消默认行为
				} else {
						window.event.cancelBubble = true;// IE的取消冒泡方式
						window.event.returnValue = false;// IE的取消默认行为
				}
			},
			extend:function(org,tar){
				for(var i in tar){
					org[i]=tar[i];
				};
				return org;
			},
			createClipPage:function(pageCount,curPage){
				var i  ,num ,bef ,aft ,flag ,flagPre ,flagAft ,href ;
				//num表示显示的数量
				//bef  表示curPage前的个数，最大为num-1
				num=8;href=[];flagPre=1;flagAft=4;bef=3;aft=num-3-bef;i=0;
				if(curPage-bef>1){flagPre=2;}
				if(curPage+aft+2<pageCount){flagAft=7;}
				flag=flagPre+flagAft;
				//核心部分 下面这部分
				href[href.length]=i;
				for(i=curPage-bef<1?1:curPage-bef;i<curPage+aft+2;i++){
					if(i>=pageCount) break;
					href[href.length]=i;
				}
				// 对后半部分进行修正，最后一位进行修正
				if(curPage+aft+2<pageCount){
					href[href.length-1]=(pageCount-1);
				}
				//end of 下面这部分
				href[href.length]=flag;
				href[href.length]=curPage;
				href[href.length]=pageCount;
				return href;
			}
		};
		window.L=L;
		window.Sweet = sweet;
	})();
	if (!Array.prototype.indexOf)
	{
	  Array.prototype.indexOf = function(elt /*, from*/)
	  {
		var len = this.length >>> 0;
		var from = Number(arguments[1]) || 0;
		from = (from < 0)
			 ? Math.ceil(from)
			 : Math.floor(from);
		if (from < 0)
		  from += len;
		for (; from < len; from++)
		{
		  if (from in this &&
			  this[from] === elt)
			return from;
		}
		return -1;
	  };
	}
	function newsRender(json_str){
		for(var key in json_str){
			url=decodeURIComponent(json_str[key].url);
			if(json_str[key].img==undefined){
				if(key<8){
				document.write("<li><a href="+url+" target='_blank'>"+json_str[key].title+"</a></li>")
				}
			}else{
			if(key<2){
				document.write("<li><a href="+url+" target='_blank'><img src="+json_str[key].img+" width=118 height=89 /></a><p style='height:auto;line-height:18px;text-align:left;padding-top:2px;'><a href="+url+" target='_blank'>"+json_str[key].title+"</a></p></li>")
					}
			}
		}
	}
	function fill_con (idc,con){
	   if(document.getElementById(idc))
		 document.getElementById(idc).innerHTML=con;
	 }
	 function taberFun(nav,con,option){
	/*
		param - on : 当前显示导航的className;
		param - out: 不是当前导航的className;
		param - eventType: 导航触发事件
		start:内容切换前的处理
		complete:内容切换后的处理
	*/
	var defaults={
		on:"current",
		out:"",
		startIndex:0,
		eventType:"click",
		start:function(){},
		complete:function(){},
		preventBubble:true
	};
	option=L.tool.extend(defaults,option);
	for(var i=0;i<nav.length;i++){
		nav[i].className=L.tool.addClassName(L.tool.rmClassName(nav[i].className,option.on),option.out);
		con[i].style.display="none";
		(function(index){
			L.tool.add(nav[index],option.eventType,function(e){
				var _this=nav[index];
				option.start(index);
				for(var j=0;j<nav.length;j++){
					nav[j].className=L.tool.addClassName(L.tool.rmClassName(nav[j].className,option.on),option.out);
					con[j].style.display="none";
					_this.className=L.tool.addClassName(L.tool.rmClassName(_this.className,option.out),option.on);
					con[index].style.display="block";
				}
				option.complete(index);
				if(option.preventBubble){
					L.tool.stopBubble(e);
				}
			});
		})(i);
	}
	nav[option.startIndex].className=L.tool.addClassName(L.tool.rmClassName(nav[option.startIndex].className,option.out),option.on);
	con[option.startIndex].style.display="block";
};
function myClipPage(tpArr,name,ext){
	//by licxpro PageClip
	var pageCount=tpArr.pop(),curPage=tpArr.pop(),flag=tpArr.pop(),i,strA,href,tempA;
	strA='',sepBef='',sepAft='';
	if(tpArr.length<2) return "";
	if(6===flag){sepBef="<a>...</a>";
		}else if(8===flag){sepAft="<a>...</a>";
		}else if(9===flag){sepBef="<a>...</a>";sepAft="<a>...</a>";
	}
	href=name+"."+ext;
	if(curPage==0){
		tempA='<a class="on">'+'1'+'</a>';
	}else{tempA='<a href="'+href+'" >'+'1'+'</a>';
		strA+='<a class="text" href="'+href+'">上一页</a>';
	}
	strA+=tempA+sepBef;
	for(i=1;i<tpArr.length;i++){
		href=name+"_"+tpArr[i]+"."+ext;
		if(curPage==tpArr[i]){
			tempA='<a class="on">'+(tpArr[i]+1)+'</a>';
		}else tempA='<a href="'+href+'" >'+(tpArr[i]+1)+'</a>';
		if(i==tpArr.length-2)
			strA+=tempA+sepAft;
		else
			strA+=tempA;
	}
	if(curPage+1!=pageCount){
		strA+='<a class="text" href="'+name+'_'+(curPage+1)+'.'+ext+'">下一页</a>';
	}
	document.write(strA);
}
function createPageHTML(_nPageCount, _nCurrIndex, _sPageName, _sPageExt){
	if(_nPageCount == null || _nPageCount<=1){
	return;
	}
	var nCurrIndex = _nCurrIndex || 0;
	//--------头部------
	if(nCurrIndex == 0)
	{
		//上一页
		//document.write('<TD class=pagnp><A  href="'+_sPageName+'.'+_sPageExt+'">上一页</A></TD>');
		document.write('<a class="on" href="#">1</a>');
	}
	else
	{
		if(document.getElementById("videocontent"))
		{
		document.getElementById("videocontent").style.display = 'none';
		}
		if(nCurrIndex>1)//上一页
		{
		document.write('<A  class="text"  href="'+_sPageName+'_'+(_nCurrIndex-1)+'.'+_sPageExt+'">上一页</A>');
		}
		else
		{
		document.write('<A class="text" href="'+_sPageName+'.'+_sPageExt+'">上一页</A>');
		}
		//
		document.write('<A href="'+_sPageName+'.'+_sPageExt+'">1</A>');
	}
	for(var i=1; i<_nPageCount; i++){
		if(i%10==0)
			document.write("<br/><br/>");
		if(nCurrIndex==i)
			document.write('<a href="javascript:void(0)" class="on">'+(i+1)+'</a>');
		else
			document.write("<a  href=\""+_sPageName+"_" + i + "."+_sPageExt+"\">"+(i+1)+"</a>");
	}
	//---------尾部-----
	if(_nPageCount>1)
	{
		if(nCurrIndex==(_nPageCount-1))
		{
	//	document.write('<TD class=pagnp><A  href="'+_sPageName+'_'+(_nPageCount-1)+'.'+_sPageExt+'">下一页</A></TD>');
		}
		else
		{
		document.write('<A  class="text" href="'+_sPageName+'_'+(_nCurrIndex+1)+'.'+_sPageExt+'">下一页</A>');
		}
	}
	else
	{	document.write('<A  href="'+_sPageName+'.'+_sPageExt+'">下一页</A>');
	}
	//------------------
}
//x_nextPage(${PAGE_COUNT}, ${PAGE_INDEX}, "${PAGE_NAME}", "${PAGE_EXT}",_text)
function x_nextPage(_nPageCount, _nCurrIndex, _sPageName, _sPageExt,_text)
{
		if(_nCurrIndex==(_nPageCount-1)||_nPageCount==1)
		{
		document.write('<A  href="javascript:void(0)">'+_text+'</A>');
		}
		else
		{
		document.write('<A  href="'+_sPageName+'_'+(_nCurrIndex+1)+'.'+_sPageExt+'">'+_text+'</A>');
		}
}
//x_beforePage(${PAGE_COUNT}, ${PAGE_INDEX}, "${PAGE_NAME}", "${PAGE_EXT}",_text)
function x_beforePage(_nPageCount, _nCurrIndex, _sPageName, _sPageExt,_text)
{
	if(_nCurrIndex>1)//上一页
		{
		document.write('<A  href="'+_sPageName+'_'+(_nCurrIndex-1)+'.'+_sPageExt+'">'+_text+'</A>');
		}
		else
		{
		document.write('<A  href="'+_sPageName+'.'+_sPageExt+'">'+_text+'</A>');
		}
}
function nextpage(act) {
	if (NeedBack==0)
	{
		if(PAGE_COUNT == null || PAGE_COUNT<=1){
			//alert('本篇无分页');
			return;
		}
		PAGE_INDEX = PAGE_INDEX || 0;
		if(PAGE_COUNT ==PAGE_INDEX+1){
			alert('已是最末页.再次点击将回到第一页');
			NeedBack=1;
			return;
		}
		PAGE_INDEX=PAGE_INDEX+1;
		var url=_sPageName+"_" + PAGE_INDEX + "."+_sPageExt;
	}else{
		var url=_sPageName+"."+_sPageExt;
	}
	window.location.href=url;
}
function GoNextPage(doc)
{
	for(num; num<doc.images.length; num++)
	{
		//alert(doc.images[num].OLDSRC);
		//if ((doc.images[num].OLDSRC!='' && typeof(doc.images[num].OLDSRC) != 'undefined')||(doc.images[num].oldsrc!='' && typeof(doc.images[num].oldsrc) != 'undefined'))
		if(doc.images[num].getAttribute("OLDSRC") )
		{
			var img = doc.images[num];
			img.onclick  = function ()
			{
				nextpage();
			}
			img.onmouseover=function ()
			{
				img.style.cursor="pointer";
				img.alt="点击浏览下一张";
				img.title="点击浏览下一张";
			}
		}//end if
	}
}
/**
 *视频播放 by ssq@qlwb.com.cn 20170102
 *参数说明
	u - 媒体URL
	w - 媒体宽度width
	h - 媒体高度height
	id- 播放器id
 */
 if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (elt /*, from*/) {
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                 ? Math.ceil(from)
                 : Math.floor(from);
            if (from < 0)
                from += len;
            for (; from < len; from++) {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    }
 document.write('<script type="text/javascript" src="//w.dzwww.com/zt/dzplayer/ckplayer/ckplayer.js" charset="utf-8"></script>');
 /**
 function pv(url, w, h , id){
	 if(url==''||url.indexOf('//')<0)
		 return false;
	document.write('<div id="'+id+'"></div>');
	var flashvars={
		f:url,
		c:0,
		b:1,
		i:''
		};
	var video=[url+'->video/mp4'];
	CKobject.embed('//w.dzwww.com/zt/dzplayer/ckplayer/ckplayer.swf',id,'ckplayer_'+id,w,h,false,flashvars,video)	;
 }
 */
 	//添加对mp3的支持
   function pv(url, w, h , id){
	 if(url==''||url.indexOf('//')<0)
		 return false;
	document.write('<div id="'+id+'"></div>');
	var extname=url.split('.').pop().toLowerCase();
	if(extname=='m3u8')	{
	   	var flashvars={
		f:'https://w.dzwww.com/zt/dzplayer/ckplayer/m3u8.swf',
		a:url,c:0,b:1,s:4,p:1,	i:''	,lv:1};
	}else{
		var flashvars={f:url,c:0,b:1,i:''};
		if(extname=='mp3'){
			h='55px'
		}
	}
	var video=[url+'->video/mp4'];
	CKobject.embed('//w.dzwww.com/zt/dzplayer/ckplayer/ckplayer.swf',id,'ckplayer_'+id,w,h,false,flashvars,video)	;
 }
 //360信息流
//document.write('<script language="javascript" src="//static.mediav.com/js/mvf_news_feed.js" ></script>');
