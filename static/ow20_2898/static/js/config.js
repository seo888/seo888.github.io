var preg = {//正则表达式
    email:/^([\w-*\.*]+@[\w-?]+[\.\w{2,}]+)/,//邮箱正则
    mobile:/^(1[3-9]\d{9}$)/ ,//手机号码正则
    web:/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
    wurl:/^((https?|ftp|news|http):\/\/)?([0-9a-z_-]+\.)+[a-z]{2,6}$/,
    qq:/^[1-9][0-9]{4,9}$/,  //qq正则
    wxreg: /^[a-zA-Z]{1}[\-_a-zA-Z0-9]{5,19}$/, //微信号正则
    title:/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030|\ufffc|\s/gi //只保留中文、英文、数组、普通字符
    // ~!@#$%&^*()_+{}:"|><?[];'\,./`·~！@#￥%……*&（）-——=+{}【】：”|《》？；’，、。、
    
    // wurl:/^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/
}
var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
+ "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@ 
+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
+ "|" // 允许IP和DOMAIN（域名）
+ "([0-9a-z_!~*'()-]+\.)*" // 域名- www. 
+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名 
+ "[a-z]{2,6})" // first level domain- .com or .museum 
+ "(:[0-9]{1,4})?" // 端口- :80 
+ "((/?)|" // a slash isn't required if there is no file name 
+ "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
var re = new RegExp(strRegex);
var memberUrl = function(url,obj){
    var str = parameter(obj);
    return fil('member',url+str);
}
var bizopptyUrl = function(url,obj){
    var str = parameter(obj);
    return fil('bizoppty',url+str);
}
var fil = function(act,str){
    var yu = '&';
    if(str.indexOf('?')==-1)yu = '?';
    return '/'+act+str+yu+'rands='+Math.random();
}
var adminUrl = function(url,obj){
    var str = parameter(obj);
    return fil('admin',url+str);
}

var indexUrl = function(url,obj){
    var str = parameter(obj);
    return fil('index',url+str);
}
//http
var ExtranetUrl=function(url,obj){
    var str = parameter(obj);
    return url+str;
}

var parameter = function(obj){
    if(!obj)return '';
    var str = '?';
    var t = typeof obj;
    if(t == 'object'){
        var strArr = [];
        for (var o in obj){
            if(obj[o])strArr.push(encodeURIComponent(o) + "=" + encodeURIComponent(obj[o]));
        }
        str += strArr.join('&');
    }
    if(t == 'string'){
        str += obj
    }
    if(str=='?')return '';
    return str;
}



var httpError = function(error){
    //('请求发生错误'+error);
}

function clearNoNum(obj){ 
    obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
    obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
    if(obj.value.indexOf(".")< 0 && obj.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
        obj.value= parseFloat(obj.value); 
    } 
} 
// 过滤除中、英文和普通字符以外的其他符合
function filtTitle(s){ 
    return s.replace(preg.title,'');
} 
function clearString(value){
    value = String(value) 
    value = value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
    value = value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
    value = value.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
    value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
    if(value.indexOf(".")< 0 && value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
        value= parseFloat(value); 
    }
    return value 
}
// 计算字符串长度 汉字为2 字母为1
function getLength(str){
    var len = 0; 
    for (var i=0; i<str.length; i++) {    
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i)== 94) {    
             len += 2;    
         } else {    
             len ++;    
         }    
     }    
    return len;    
}

// 提取url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function staticHost(url){
    if(!url)return;
    var url_add=url.slice(0,1);
    if(url_add=='/'){
        return '//cdn.2898.com'+url
    }else{
        return '//cdn.2898.com/'+url
    }
}
Date.prototype.format = function(format)  
{  
/* 
* format="yyyy-MM-dd hh:mm:ss"; 
*/  
var o = {  
"M+" : this.getMonth() + 1,  
"d+" : this.getDate(),  
"h+" : this.getHours(),  
"m+" : this.getMinutes(),  
"s+" : this.getSeconds(),  
"q+" : Math.floor((this.getMonth() + 3) / 3),  
"S" : this.getMilliseconds()  
}  
  
if (/(y+)/.test(format))  
{  
format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4  
- RegExp.$1.length));  
}  
  
for (var k in o)  
{  
if (new RegExp("(" + k + ")").test(format))  
{  
format = format.replace(RegExp.$1, RegExp.$1.length == 1  
? o[k]  
: ("00" + o[k]).substr(("" + o[k]).length));  
}  
}  
return format;  
} 

function setLocalStorage(name,val){
  return localStorage.setItem(name, JSON.stringify(val))
}
function getLocalStorage(name){
    return localStorage.getItem(name) || false;
    
}
// 用户是否签到
$(function(){
    if(!window.localStorage)return false;
    var sign = window.localStorage.getItem('user_sign')
    if(sign){
        var info  = JSON.parse(JSON.parse(sign));
        if(info.date == (new Date().format('yyyy-MM-dd'))){       
            $(".head_sign").addClass('is_sign')
        }else{
            $(".head_sign").removeClass('is_sign')
        }
    }
})


function isInteger(obj) {
    return Math.floor( Number(obj) ) === Number(obj)
}
var  referer = '';

function goHref(url){
    if(url){
        window.location.href = url
    }else{
        window.location.href = '/'
    }
}
// 手机号替换
function replace_phone(phone){
    return String(phone).replace(/(\d{3})(\d{4})(\d{4})/,'$1****$2')
}


//头部搜索
function onSearch(){
    var type=$('.search_type').text();
    var val=$('.search_val').val();
    switch(type){
        case '友情链接': return location.href="/friendlink.htm?search="+val;
        case '网站广告': return location.href="/fontlink.htm?search="+val;
        case '微博广告': return location.href="/media.htm?search="+val;   
        case '微信公众号':return location.href="/media_wx.htm?search="+val;    
        case '网站交易':return location.href="/web_exchange.htm?search="+val;    
        case '软文交易':return location.href="softtext.htm?search="+val;    
        case '免费换链':return location.href="/friendchange.htm?search="+val;    
        case '商机加盟':return location.href="/business.htm?search="+val;    
       
    }
}
// 跳转后搜索
function starSearch(str,fun,v,type){
    if(v){
        $('.search_val').val(str);
    }else{
        if(str && fun){
            $('.search_val').val(str);
            fun() 
        }
    }
  
    $('.search_type').text(type);
}
// 深度拷贝
function deepClone(source){
    var targetObj = source.constructor === Array ? [] : {};
    for(var keys in source){ // 遍历目标
      if(source.hasOwnProperty(keys)){
        if(source[keys] && typeof source[keys] === 'object'){ 
          targetObj[keys] = deepClone(source[keys]);
        }else{ 
          targetObj[keys] = source[keys];
        }
      }
    }
    return targetObj;
  } 
