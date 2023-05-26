
function videonews(ws){
	for(vi=1;vi<4;vi++){
		main3left1img=document.getElementById("main3left1img"+vi);
		main3left1tit=document.getElementById("main3left1tit"+vi);
		main3left1sub=document.getElementById("main3left1sub"+vi);
		if(ws==vi){
			main3left1img.style.display="block";
			main3left1tit.style.display="block";
			main3left1sub.style.background="url(images/main3subhover.jpg) no-repeat left top";
		}else{
			main3left1img.style.display="none";
			main3left1tit.style.display="none";
			main3left1sub.style.background="url(images/main3sub.jpg) no-repeat left top";
		}
	}
}

function videonewss(wss){
	for(vis=1;vis<4;vis++){
		main3left1imgs=document.getElementById("main3left1imgs"+vis);
		main3left1tits=document.getElementById("main3left1tits"+vis);
		main3left1subs=document.getElementById("main3left1subs"+vis);
		if(wss==vis){
			main3left1imgs.style.display="block";
			main3left1tits.style.display="block";
			main3left1subs.style.background="url(images/main3subhover.jpg) no-repeat left top";
		}else{
			main3left1imgs.style.display="none";
			main3left1tits.style.display="none";
			main3left1subs.style.background="url(images/main3sub.jpg) no-repeat left top";
		}
	}
}

function videonewstit(v){
	if(v==1){
		document.getElementById("videotit1").style.background="url(images/videotit1.jpg)";
		document.getElementById("videotit1").style.color="#fff";
		document.getElementById("videocon1").style.display="block";
		document.getElementById("videocon2").style.display="none";
		document.getElementById("videotit2").style.background="none";
		document.getElementById("videotit2").style.color="#323232";
	}else{
		document.getElementById("videotit2").style.background="url(images/videotit2.jpg)";
		document.getElementById("videotit2").style.color="#fff";
		document.getElementById("videocon2").style.display="block";
		document.getElementById("videocon1").style.display="none";
		document.getElementById("videotit1").style.background="none";
		document.getElementById("videotit1").style.color="#323232";
	}
}


function xiaobao(ao){
	for(xb=1;xb<6;xb++){
		xbli=document.getElementById("xbli"+xb);
		main2left21img=document.getElementById("main2left21img"+xb);
		if(ao==xb){
			xbli.style.border="1px solid #699DCF";
			xbli.style.borderRight="none";
			xbli.style.background="#F0F5F9";
			xbli.style.fontSize="14px";
			xbli.style.color="#004384";
			main2left21img.style.display="block";
		}else{
			xbli.style.border="none";
			xbli.style.background="none";
			xbli.style.fontSize="12px";
			xbli.style.color="#323232";
			main2left21img.style.display="none";
		}
	}
}

function con(co){
	cldiv=document.getElementById("pic"+co);
	cldiv.style.display="none";
}











