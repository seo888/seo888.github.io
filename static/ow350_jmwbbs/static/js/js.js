// JavaScript Document

//Yesky Public Menu
function fzlist(id,index,obj,pro){ 
	var childobj = document.getElementById(id);
	var menus  = document.getElementById(index); 
		childobj.style.display = "block";
        menus.className = ""+obj+"";
		menus.onmouseout = function (){
		childobj.style.display = "none";
        menus.className = ""+pro+"";
    }
	}
    function fzlisthid(id,index,pro){ 
	var childobj = document.getElementById(id);
	var menus  = document.getElementById(index); 
		childobj.style.display = "none";
        menus.className = ""+pro+"";
    }
	
//鼠标滑盒子出现
function shows_box(id){document.getElementById(""+id+"").style.display="block";}
function hidds_box(id){document.getElementById(""+id+"").style.display="none";}


//经销商广告切换
function opedealerfl123(id,name)
{
var flags = new Array();
for (i=0;i<regionid.length;i++ )
{
   if(flags[regionid[i]] != 1){
      flags[regionid[i]] = 1;
		document.getElementById("svg1"+regionid[i]).className="none";
		document.getElementById("dq1"+regionid[i]).className="normal1";
	}
	}
	if (id!=0)
	{
	document.getElementById("svg1"+id).className="block";
    document.getElementById("dq1"+id).className="active1";
	}
}



//最新，最热产品
function nTabs(thisObj,Num){
if(thisObj.className == "showimg1")return;
var tabObj = thisObj.parentNode.id;
var tabList = document.getElementById(tabObj).getElementsByTagName("span");
for(i=0; i <tabList.length; i++)
{
  if (i == Num)
  {
   thisObj.className = "showimg1"; 
      document.getElementById(tabObj+"_con"+i).style.display = "block";
  }else{
   tabList[i].className = "showimg2"; 
   document.getElementById(tabObj+"_con"+i).style.display = "none";
  }
} 
}
