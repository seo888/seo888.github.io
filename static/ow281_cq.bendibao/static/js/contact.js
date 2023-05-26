//left ad logo
if(typeof(adicon)=="undefined"){
	
	var divs=document.getElementsByTagName("div");
	for(var i=0;i<divs.length;i++){
		var divsid=divs[i].getAttribute("id");
		if(divsid!=null){
			if(
					(divsid.indexOf("BAIDU_SSP__wrapper")>-1|| divsid.indexOf("tanxssp_con_mm_")>-1 ) 
					&& divsid.indexOf("_551413_")==-1 
					&& divsid.indexOf("_2073588_")==-1 
					&& divsid.indexOf("_u2362223_")==-1 
					&& divsid.indexOf("_554287_")==-1 
			){
						
					if(divs[i].parentNode.tagName=="BODY"){
						continue;	
					}
					
					var adicon=document.createElement("img");
					adicon.src="http://imgbdb3.bendibao.com/img/20168/25/2016825095522_94814.png";
					adicon.style.width="35px";
					adicon.style.height="15px";
					adicon.style.position="absolute";
					adicon.style.zIndex="999999";
					adicon.style.bottom="0px";
					adicon.style.border="0px";
					divs[i].parentNode.style.textAlign="left";
					if(divs[i].parentNode.style.position){
					}else{
						divs[i].parentNode.style.position="relative"
					}
					divs[i].parentNode.insertBefore(adicon,divs[i].parentNode.firstChild);
			}
		}
	}
	
	var iframes=document.getElementsByTagName("iframe");
	for(var i=0;i<iframes.length;i++){
		var iframesid=iframes[i].getAttribute("id");
		var iframessrc=iframes[i].getAttribute("src");
		if(iframessrc==null){iframessrc="null";}
		if(iframesid!=null){
			if(iframesid.indexOf("iframeu")>-1 || iframessrc.indexOf("j.s11.cn")>-1){
				
					if(iframes[i].parentNode.tagName=="BODY" || iframes[i].parentNode.getAttribute("id").indexOf("BAIDU_SSP__wrapper")>-1 ){
						continue;	
					}
					var adicon=document.createElement("img");
					adicon.src="http://imgbdb3.bendibao.com/img/20168/25/2016825095522_94814.png";
					adicon.style.width="35px";
					adicon.style.height="15px";
					adicon.style.position="absolute";
					adicon.style.zIndex="999999";
					adicon.style.bottom="0px";
					adicon.style.border="0px";
					iframes[i].parentNode.style.textAlign="left";
					if(iframes[i].parentNode.style.position){
					}else{
						iframes[i].parentNode.style.position="relative"
					}
					iframes[i].parentNode.insertBefore(adicon,iframes[i].parentNode.firstChild);
			}
		}
	}
	
	/*北京上海*/
	var rad300List=document.getElementsByClassName("content_r_ad300"),i;
	for(i=0;i<rad300List.length;i++){
		(function(index,element){
			if(element.style.position || element.innerHTML.indexOf("iframeu")>-1 ){
			}else{
				element.style.textAlign="left";
				element.style.position="relative";
				var adicon=document.createElement("img");
					adicon.src="http://imgbdb3.bendibao.com/img/20168/25/2016825095522_94814.png";
					adicon.style.width="35px";
					adicon.style.height="15px";
					adicon.style.position="absolute";
					adicon.style.zIndex="999999";
					adicon.style.bottom="3px";
					adicon.style.border="0px"
					element.insertBefore(adicon,element.childNodes[0]);
			}
		})(i,rad300List.item(i));
	}

}

if(document.getElementsByClassName("960ad").length>0){
	var ad960=document.getElementsByClassName("960ad")[0];
	ad960.style.width="1000px";
	ad960.style.marginLeft="auto";
	ad960.style.marginRight="auto";
}

//
var url=document.location.href;
//深圳站除购物外，其它不调用
if(url.indexOf("sz.bendibao")==-1 || url.indexOf("gouwu.sz.bendibao")>-1){
	var urlarr=url.split("/");
	url=urlarr[0]+"//"+urlarr[2]+"/"+urlarr[3]+"/";
	var outstr	= '<script language=javascript src=http://wh.bendibao.com/bdb_api/link_api.php?pathurl=' + url  + '><\/script>';
	document.write(outstr);
}