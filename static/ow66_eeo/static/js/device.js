// JavaScript Document

    var bForcepc = fGetQuery("dv") == "pc";  
    function fBrowserRedirect(){  
        var sUserAgent = navigator.userAgent.toLowerCase();  
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";    
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";  
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";  
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";  
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";  
        var bIsAndroid = sUserAgent.match(/android/i) == "android";  
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";  
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

        if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|wOSBrowser|BrowserNG|WebOS)/i))) {
            var sUrl = location.href;
            //if(!bForcepc){
            var url  = window.location.href;
            var murl=url;
            if(url.indexOf("http://eeo.com.cn")!=-1){
                murl = url.replace("http://eeo.com.cn","https://m.eeo.com.cn");
            }else if(url.indexOf("http://www.eeo.com.cn")!=-1){
                murl =url.replace("http://www.eeo.com.cn","https://m.eeo.com.cn");
            }else if(url.indexOf("https://www.eeo.com.cn")!=-1){
                murl =url.replace("https://www.eeo.com.cn","https://m.eeo.com.cn");
            }else{

            }
            window.location.href = murl;
        }

    }  
    function fGetQuery(name){
        var sUrl = window.location.search.substr(1);  
        var r = sUrl.match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));  
        return (r == null ? null : (r[2]));  
    }  
    function fShowVerBlock(){     
        if(bForcepc){  
            document.getElementByIdx_x("dv_block").style.display = "block";  
        }  
        else{  
            document.getElementByIdx_x("ad_block").style.display = "block";  
        }  
    }  
    fBrowserRedirect(); 
	
