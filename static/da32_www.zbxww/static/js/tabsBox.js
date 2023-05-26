// JavaScript Document
function tabsBox(n)
{
for (i=1;i<=2;i++)
{
	document.getElementById("top"+i).className="noHover";
	document.getElementById("box"+i).style.display='none';

}
	document.getElementById("top"+n).className="normal";
	document.getElementById("box"+n).style.display='block';
	
}



function tabsBoxTj(s)
{	
	var obj=document.getElementById('topTj1');
	if (obj){
		for (i=1;i<=2;i++)
		{
			document.getElementById('topTj'+i).className="noHover";
			document.getElementById('boxTj'+i).style.display='none';
		
		}
			document.getElementById("topTj"+s).className="normal";
			document.getElementById("boxTj"+s).style.display='block';
	}
}
//选项卡
var f = function (id) { 
 return "string" == typeof id ? document.getElementById(id) : id;
};
function xxk(num,id,ii,iii)
{
//alert(ii);
var dq;
 for(var i=1;i<=num;i++)
 {
   if(i==id){
  dq=f(ii+i).className='cur'; //当前选项
  f(iii+i).style.display="block";
   }
   else
   {
   dq=f(ii+i).className='noHover';
   f(iii+i).style.display="none";
   }
 }
}

