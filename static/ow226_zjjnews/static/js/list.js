function getStyle(obj,name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj,null)[name];
	};
};

function startMove(obj, json, fnEnd)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function()
	{
		var bStop=true;
		var attr='';
		for(attr in json)
		{
			iTarget=json[attr];
			var cur=0;
			if(attr=='opacity')
			{
				cur=Math.round(parseFloat(getStyle(obj,attr))*100);
			}
			else
			{
				cur=parseInt(getStyle(obj,attr));
			};
			var speed=(iTarget-cur)/7;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(iTarget!=cur)
			{
				bStop=false;
			};
			  if(attr=='opacity')
			  {
				  obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				  obj.style.opacity=(cur+speed)/100;
			  }
			  else
			  {
				  obj.style[attr]=cur+speed+'px';
			  };
		}
		if(bStop)
		{
			clearInterval(obj.timer);
			
			if(fnEnd)fnEnd();
		};
	},30)
};
//公共JS结束

window.onload=function()
{
	var oBut=document.getElementById('news_wb');
	var oNav=document.getElementById('nwes_wb_nav');
	var timer5=timer4=timer3=timer2=timer1=null;
	//oNav.style.height=0;
	oBut.onclick=function()
	{
		startMove(oNav,{opacity:100},function()
		{
			//oNav.style.height='54px';
			startMove(oNav,{height:54})	
		});
	};
	oNav.onmouseout=oBut.onmouseout=function()
	{
		timer1=setTimeout(function()
		{
			startMove(oNav,{height:0},function()
			{
				startMove(oNav,{opacity:0})	
			})
		},500);
	};
	oNav.onmouseover=function()
	{
		clearTimeout(timer1);
	};
	
	var but=document.getElementById('weixin');
	var box=document.getElementById('wxpic');
	
	but.onmousemove=function()
	{
		box.style.display='block';
	};
	but.onmouseout=function()
	{
		box.style.display='none';
	};
};