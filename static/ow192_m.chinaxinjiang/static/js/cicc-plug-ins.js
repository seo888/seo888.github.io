// JavaScript Document
/**
 * 获取URL的参数
 */
function getRequest() {  
	var qs = location.search.substr(1), // 获取url中"?"符后的字串  
	args = {}, // 保存参数数据的对象
	items = qs.length ? qs.split("&") : [], // 取得每一个参数项
	item = null,
	len = items.length;
	for(var i = 0; i < len; i++) {
		item = items[i].split("=");
		var name = decodeURIComponent(item[0]),
		 value = decodeURIComponent(item[1]);
		if(name) {
			args[name] = value;
		}
	}
	return args;
}
/**
 * 获取图片显示地址
 * @param {*} url 图片路径，不能为空
 * @param {*} type  图片显示类型，0-缩略图；1-大图，可以为空，默认为0
 * @param {*} position 图片显示位置，图片路径数组的位置，也就是第几张图，可以为空，默认为0
 */
function imageUrl(url,type,position){
	var src = "";
	if (url!=null && url!=""){
		var array = url.split("|");
		if(position!=null && position!=""){
			if(position<=array.length){
				if(type!=null && type!=""){
					if(type==0){
						src = array[position];
					}else{
						src = array[position].replace("/_thumbs/", "/");
					}
				}else{
					src = array[position];//默认缩略图
				}
			}
		}else{//默认第一条
			if(type!=null && type!=""){
				if(type==0){
					src = array[0];
				}else{
					src = array[0].replace("/_thumbs/", "/");
				}
			}else{
				src = array[0];//默认缩略图
			}
		}
	}
	return src;
}
/**
 * 日期换为英式格式（January 18,2017）
 * @param {*} date 日期
 * @param {*} abbr 是否简写
 */
function formatEnDate(date,abbr){		
	var enDate = null;
	var array = date.split(" ");
	if(array.length>=1){
		var d = array[0].split("-");
		if(d.length==3){
			var year = d[0];
			var month = d[1];
			 var day = d[2];
			 var mth = "";
			 if(month=="01"){
				if (abbr) {
					mth = "Jan.";
				} else {
					mth = "January";
				}
			}else if(month=="02"){
				if (abbr) {
					mth = "Feb.";
				} else {
					mth = "February";
				}
			}else if(month=="03"){
				if (abbr) {
					mth = "Mar.";
				} else {
					mth = "March";
				}
			}else if(month=="04"){
				if (abbr) {
					mth = "Apr.";
				} else {
					mth = "April";
				}
			}else if(month=="05"){
				mth = "May";
			}else if(month=="06"){
				mth = "June";
			}else if(month=="07"){
				mth = "July";
			}else if(month=="08"){
				if (abbr) {
					mth = "Aug.";
				} else {
					mth = "August";
				}
			}else if(month=="09"){
				if (abbr) {
					mth = "Sept.";
				} else {
					mth = "September";
				}
			}else if(month=="10"){
				if (abbr) {
					mth = "Oct.";
				} else {
					mth = "October";
				}
			}else if(month=="11"){
				if (abbr) {
					mth = "Nov.";
				} else {
					mth = "November";
				}
			}else if(month=="12"){
				if (abbr) {
					mth = "Dec.";
				} else {
					mth = "December";
				}
			}
			 enDate = mth+" "+day+", "+year;
		}
	}
	return enDate;
}

		function fordate(date){
			var oDate = null;
			oDate = date.substring(0,10);
			return oDate;
		}


var browser = {
	versions: function () {
		var u = navigator.userAgent, app = navigator.appVersion;
		return { //移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
/**
 * 获取访问来源
 */
function getAccessSource(){
		var source = 0;//直接访问
		var r = document.referrer.toLowerCase(); //获取上一页面的URL
		var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
	
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			source = 1;//微信中访问
		}else if (ua.match(/WeiBo/i) == "weibo") {
			source = 2;//新浪微博客访问
		}else if (ua.match(/QQ/i) == "qq") {
			source = 3;//在QQ空间访问
		}

		if (r.indexOf("baidu.")!=-1){
			source = 4;//百度跳转访问	
		}else if(r.indexOf("sogou.")!=-1){
			source = 5;//搜狗跳转访问
		}else if(r.indexOf("soso.")!=-1){
			source = 7;//腾讯搜搜跳转访问
		}else if(r.indexOf("so.")!=-1 || r.indexOf("360.")!=-1){
			source = 7;//360跳转访问
		}else if(r.indexOf("google.")!=-1){
			source = 8;//谷歌跳转访问
		}else if(r.indexOf("yahoo.")!=-1){
			source = 9;//雅虎跳转访问
		}
		return source;
}		