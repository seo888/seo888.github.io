/*时间格式化*/
function geMyTime(str,type)
{
	str = parseInt(str)*1000;
	var content = "";
	var addtime_obj = new Date();
	addtime_obj.setTime(str);
	add_year = addtime_obj.getYear();
	add_year = add_year<1900?(1900+add_year):add_year;
	add_mon = addtime_obj.getMonth()+1;
	if(add_mon<10) add_mon='0'+add_mon;
	add_daily = addtime_obj.getDate();
	if(add_daily<10) add_daily='0'+add_daily;
	add_hour = addtime_obj.getHours();
	if(add_hour<10) add_hour='0'+add_hour;
	add_min = addtime_obj.getMinutes();
	if(add_min<10) add_min='0'+add_min;
	add_sec = addtime_obj.getSeconds();
	if(add_sec<10) add_sec='0'+add_sec;
	switch(type)
	{
		case 1://2001-12-12 12:12:01
		content = add_year+"-"+add_mon+"-"+add_daily+" "+add_hour+":"+add_min+":"+add_sec;
		break;
		case 2://12-12 12:12:01
		content = add_mon+"-"+add_daily+" "+add_hour+":"+add_min+":"+add_sec;
		break;
		case 3://2001-12-12
		content = add_year+"-"+add_mon+"-"+add_daily;
		break;
		case 4://12-12 12:12
		content = add_mon+"-"+add_daily+" "+add_hour+":"+add_min;
		break;
		case 5://2001-12-12 12:12:01
		content = add_year+"-"+add_mon+"-"+add_daily+" "+add_hour+":"+add_min;
		break; 
		case 6://12-12
		content = add_mon+"-"+add_daily;
		break; 
	}
	return content;
}

function formatSeconds(value) {
	var secondTime = parseInt(value);// 秒
	var minuteTime = 0;// 分
	var hourTime = 0;// 小时
	if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
		//获取分钟，除以60取整数，得到整数分钟
		minuteTime = parseInt(secondTime / 60);
		//获取秒数，秒数取佘，得到整数秒数
		secondTime = parseInt(secondTime % 60);
		//如果分钟大于60，将分钟转换成小时
		if(minuteTime > 60) {
			//获取小时，获取分钟除以60，得到整数小时
			hourTime = parseInt(minuteTime / 60);
			//获取小时后取佘的分，获取分钟除以60取佘的分
			minuteTime = parseInt(minuteTime % 60);
		}
	}
	if(secondTime<10) secondTime='0'+secondTime;
	if(minuteTime<10) minuteTime='0'+minuteTime;
	
	var result =  minuteTime +":"+ secondTime;
	if(hourTime > 0) {
		result = hourTime+":"+ minuteTime +":"+ secondTime;
	}
	return result;
}