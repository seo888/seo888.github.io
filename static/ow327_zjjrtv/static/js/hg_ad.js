var hg_adPosIds = '0';
if ( window.jQuery && jQuery.each ) {
		$(document).ready(
		function hg_getAdPos()
		{
			$('div[hg_adbox]').each(function(){hg_adPosIds +=','+$(this).attr("hg_adbox")});
			hg_getAdContent();
		}
	);
}
else
{
	window.onload = function(){
		function hg_getAdPos(tagName, attr) {
			var els = document.getElementsByTagName(tagName);
			var i = 0, l = els && els.length, ret = [], el;
			if (l) {
				for (i; i< l; i++) {
					el = els[i];
					if ( el.getAttribute(attr) != null ){
						hg_adPosIds += ',' + el.getAttribute(attr);
					}
				}
			}
			return hg_adPosIds;
		}
		hg_adPosIds = hg_getAdPos("div", "hg_adbox");
		hg_getAdContent();
	}
}
function hg_getAdContent()
{
	if(hg_adPosIds != '0')
	{
		var extra = "&group=website";
		if(typeof hg_adExtendParameters != 'object')
		{
			hg_adExtendParameters = {};
		}
		if(window.m2o_column){
			hg_adExtendParameters['colid'] = m2o_column['id'];
		}
		for(var n in hg_adExtendParameters)
		{
			extra += "&"+n+'='+hg_adExtendParameters[n];
		}
		var hg_adsrc  = 'http://adv.zjjrtv.com/javascript.php?pid='+hg_adPosIds+extra;
		hg_loadAD_js.loadJS(hg_adsrc);
	}
}
function hg_AD_AddHtml(obj)
{
	var hg_addHtml = function(id, html){
		if(document.getElementById(id)){
			document.getElementById(id).innerHTML = html;
		}else{
			var tem_div = document.createElement("div");
			tem_div.id = id;
			document.body.appendChild(tem_div);
			document.getElementById(id).innerHTML = html;
		}
	}
	hg_addHtml(obj.box, obj.html);
	//载入效果js
	//调用对应效果， 可以设置回调函数
	if(!obj.loadjs)
	{
		return;
	}
	var funcname = obj.loadjs.substring(0, obj.loadjs.length-3);
	var callbkobject = {f:funcname, object:obj}
	hg_loadAD_js.loadJS(obj.loadurl + obj.loadjs, callbkobject);
}

var hg_loadAD_js = 
{
	loadJS : function(src, callbkobject){
		if(!src)
		{
			return;
		}
		var ie = document.all;
		var adJS = document.createElement("script");
		adJS.type = "text/javascript";
		adJS.src = src;
		adJS.async = true;
		_this = this;
		document.getElementsByTagName("body")[0].appendChild(adJS);
		if(ie){
			adJS.onreadystatechange = function(){
				if (adJS.readyState == 'loaded' || adJS.readyState == 'complete') {
					callback();
				}
			}
		}else{
			adJS.onload = function(){
				callback();
			}
		};
		function callback(){
			if(!callbkobject)
			{
				return;
			}
			eval(callbkobject.f+"(callbkobject.object)");
		}
	}
}