function columnSignWidth(){
	if(!document.getElementById||!document.createTextNode){return false;}
	var colP=document.getElementById("article_primary");
	var colS=document.getElementById("article_second");
	if(!colP||!colS){return false;}
	colPhigh=colP.offsetHeight;
	colShigh=colS.offsetHeight;
	if(colPhigh>colShigh){
		colS.style.height=(colPhigh-2)+"px";
	}else{
		colP.style.height=(colShigh-22)+"px";
	}
	
}

function addLoadFunction(func){
	var oldLoad=window.onload;
	if(typeof oldLoad!="function"){
		window.onload=func;
	}else{
		window.onload=function(){
			oldLoad();
			func();
		}
	}
}
addLoadFunction(columnSignWidth);


