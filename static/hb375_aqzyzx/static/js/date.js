function getBit(m,n) { return (m>>n)&1;}

function lunarDate(d){ 
  var numString = "一二三四五六七八九十";
  var monString = "正二三四五六七八九十冬腊";
	var Cal = [0x41A95,0xD4A,0xDA5,0x20B55,0x56A,0x7155B,0x25D,0x92D,0x5192B,0xA95,0xB4A,0x416AA,0xAD5,0x90AB5,0x4BA,0xA5B,0x60A57,0x52B,0xA93,0x40E95];
	var madd=[0,31,59,90,120,151,181,212,243,273,304,334];
	
	var total,m,n,k;
	var isEnd = false;
	var tmp = d.getYear();
	if (tmp<1900) tmp+=1900;
	total=(tmp-2001)*365+Math.floor((tmp-2001)/4)+madd[d.getMonth()]+d.getDate()-23;
	if(d.getYear()%4==0&&d.getMonth()>1) total++;
	
	for(m=0;;m++)
	{
		k=(Cal[m]<0xfff)?11:12;
		for(n=k;n>=0;n--)
		{
			if(total<=29+getBit(Cal[m],n))
			{ 
				isEnd=true;
				break;
			}
			total = total-29-getBit(Cal[m],n);
		}
		if(isEnd) break;
	}
	
	var cYear=2001 + m;
	var cMonth=k-n+1;
	var cDay=total;
	if(k==12)
	{ 
		if(cMonth==Math.floor(Cal[m]/0x10000)+1)
			cMonth=1-cMonth;
		if(cMonth>Math.floor(Cal[m]/0x10000)+1) 
			cMonth--;  
	}
	var cHour=Math.floor((d.getHours()+3)/2);
	
  var tmp="";
  if(cMonth<1) 
  { 
  	tmp+="闰";
		tmp+=monString.charAt(-cMonth-1);
	} 
	else 
		{tmp+=monString.charAt(cMonth-1);}
	tmp+="月";
	tmp+=(cDay<11)?"初":((cDay<20)?"十":((cDay<30)?"廿":"卅"));
	if(cDay%10!=0||cDay==10)
		tmp+=numString.charAt((cDay-1)%10);
	return tmp;
}

function getDateString(){
	var d = new Date();
	var ymd = d.getFullYear() + "年" + (d.getMonth()+1) + "月" + d.getDate() + "日";
	var week = ['日', '一', '二', '三', '四', '五', '六'];
	var w = "星期" + week[d.getDay()];
	var l = "农历" + lunarDate(d);
         //return ymd + " " + l + " " + w;
	return ymd + " " + w;
}