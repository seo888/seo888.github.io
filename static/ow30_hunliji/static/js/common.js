var CheckData = {
	phone_num : function(phone_num){
		//phonenum
		if(phone_num.match(/^1[0-9]{2}[0-9]{8}$/)){
			return true;
		}else{
			return false;
		}
	},
	//限制长度的字符串
	stringLen : function(string, minlen, maxlen){
		//phonenum
		if(string.length >= minlen &&  string.length <= maxlen){
			return true;
		}else{
			return false;
		}
	},
	//比较字符串
	stringCompare : function(string1, string2){
		//phonenum
		if(string1 == string2){
			return true;
		}else{
			return false;
		}
	}
}

var Utils = {
	//使用的是/XX/XX/XX/XX的模式匹配
	GetQueryString : function(name) {
		var reg = new RegExp("(^|\/)" + name + "\/([^\/]*)","i");
		var r = window.location.href.substr(1).match(reg);
		if (r!=null) return (r[2]); return null;
	},
	//当前的href
	GetCurrentUrl : function(){
		return window.location.href;
	}
}


