lastScrollY = 0;
function heartBeat_dl(){
	var diffY_dl;
	if (document.documentElement && document.documentElement.scrollTop)
		diffY_dl = document.documentElement.scrollTop;
	else if (document.body)
		diffY_dl = document.body.scrollTop
	else
		{/*Netscape stuff*/}
	percent=.1*(diffY_dl-lastScrollY);
	if(percent>0)percent=Math.ceil(percent);
	else percent=Math.floor(percent);
	document.getElementById("leftDiv_dl").style.top = parseInt(document.getElementById("leftDiv_dl").style.top)+percent+"px";
	lastScrollY=lastScrollY+percent;
}
//下面这段删除后，对联将不跟随屏幕而移动。
window.setInterval("heartBeat_dl()",1);
//-->


