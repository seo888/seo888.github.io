;function PHPADM_XmlHttpRequest(url,bannerinfoSet)
{
	var xmlHttp=null;
	if (window.XMLHttpRequest)
	{
		xmlHttp=new XMLHttpRequest();
	}
	else
	{
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}   
    xmlHttp.open("post",url,true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.send("bannerinfoSet="+bannerinfoSet);
}
;function PHPADM_ReloadZoneCode()
{
	var addListener = window.addEventListener ?
	function(el, type, fn) { el.addEventListener(type, fn, false); } :
	function(el, type, fn) { el.attachEvent('on' + type, fn); };
	var bannerinfoSet="";
	var bannerinfo=new Array();
	var zones=document.getElementsByName("PHPADM_ZONE_NAME");
	var zonesLength=zones.length;
	for(var i=0;i<zonesLength;i++){
		bannerinfo[i]=zones[i].getAttribute("bannerinfo");
		addListener(zones[i], 'click', function() {
			PHPADM_XmlHttpRequest("https://219.153.58.184:81/phpad.stat/adclick.php",this.getAttribute("bannerinfo")); /// 178 ADM
	//		PHPADM_XmlHttpRequest("https://219.153.58.167:82/phpad.stat/adclick.php",this.getAttribute("bannerinfo"));///179 ADM server
		});
	}
	bannerinfoSet="["
	for (var i = 0; i < zonesLength; i++) {
		bannerinfoSet+=bannerinfo[i]+",";
	};
	bannerinfoSet=bannerinfoSet.substr(0, bannerinfoSet.length-1);
	bannerinfoSet+="]";
	url="https://219.153.58.184:81/phpad.stat/adlog.php"; /// 178
//	 url="https://219.153.58.167:82/phpad.stat/adlog.php";/// 179
	PHPADM_XmlHttpRequest(url,bannerinfoSet);
};
