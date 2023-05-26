if(typeof _mmshare == "undefined"){
    window._mmshare = {};
}
var jsparam=new Array();
getjsParam();

_mmshare._maid = "wxc969fd346ef191de"; //微信认证服务号APPID
_mmshare._scd = "http://fenxiang.xiancity.cn/mmsc/"; //分享中心根地址
_mmshare._url = location.href;
_mmshare._from = p("_from");
_mmshare._sourceAppId = getSourceAppId();
_mmshare._l = p("_l");
_mmshare._newsId = p("newsId");
_mmshare._newsId2 = p("newsid");
_mmshare._appId = p("appId");
_mmshare._shareData = p("shareData");
_mmshare._c = p("_c");
if(!isEmpty(_mmshare._c)){_mmshare._c = _mmshare._c.replace("#","");}
if(!_mmshare._from){_mmshare._from ="";}
if(!_mmshare._c){_mmshare._c ="";}
if(!_mmshare._l){_mmshare._l="0";}
if(!_mmshare._appId){_mmshare._appId="";}
if(!_mmshare._sourceAppId){_mmshare._sourceAppId="";}
if(_mmshare._url.indexOf("?")>-1){
    _mmshare._url = _mmshare._url.substring(0,_mmshare._url.indexOf("?"));
}

$(function(){
    var image="http://www.xiancity.cn/wxsharelogo.jpg";
    var title=document.title;
    var desc;
    if(document.getElementById("shareabs")){
        desc=document.getElementById("shareabs").innerHTML;
    }else{
        desc="";
    }
    $.getJSON(_mmshare._scd+"getShareInfo",{_maid:_mmshare._maid,url:location.href.split("#")[0]},function(d){
console.log(d);
        wx.config({
            debug:false,
            appId:_mmshare._maid,
            timestamp: d.timestamp,
            nonceStr: d.noncestr,
            signature: d.signature,
            jsApiList: ['checkJsApi','updateAppMessageShareData','updateTimelineShareData','onMenuShareWeibo']
        });


        if(typeof(_shareObj)!=undefined&&typeof(_shareObj)!="undefined"){
            title=_shareObj.title;
            desc=_shareObj.desc;
        }else{
            title = document.title;
        }
        //desc
        if(desc==""||desc==null){
            desc = " ";
        }
        var jumplink="";

        if(_mmshare._newsId==null&&_mmshare._newsId2!=null){
            jumplink=_mmshare._url+"?_from=&_l=0&newsid="+_mmshare._newsId2+"&appId="+_mmshare._appId+"&random="+d.random;
        }else if(_mmshare._newsId!=null&&_mmshare._newsId2==null){
            jumplink=_mmshare._url+"?_from=&_l=0&newsId="+_mmshare._newsId+"&appId="+_mmshare._appId+"&random="+d.random;
        }else if(_mmshare._newsId==null&&_mmshare._newsId2==null){
            jumplink=_mmshare._url+"?_from=&_l=0"+"&appId="+_mmshare._appId+"&random="+d.random;
        }
        wx.ready(function(){

            console.log("jumplink:"+jumplink+";image:"+image+";desc:"+desc);
                /*pyq、QQ*/
                wx.updateTimelineShareData({
                    title:title,
                    imgUrl:image,
                    link:jumplink+"&_c=1"
                });
                /*py*/
                wx.updateAppMessageShareData({
                    title:title,
                    desc:desc,
                    imgUrl:image,
                    link:jumplink+"&_c=2"
                });
            /*wb*/
            wx.onMenuShareWeibo({
                title:title,
                desc:desc,
                imgUrl:image,
                link:jumplink+"&_c=3"
            });
            wx.error(function(res){
                //alert("error:"+JSON.stringify(res));
            });
        });
    });
})


/* isnull*/
function isEmpty(obj) {
    if(typeof obj == "undefined" || obj == null || obj == "") {
        return true;
    }else{
        return false;
    }
}

function p(n){
    var q = location.href.split("?");
    if(q.length<2) return null;
    var ps = q[1].split("&");
    for(var i=0;i<ps.length;i++){
        var p = ps[i].split("=");
        if(p[0]==n)
            if(p.length<2)return true;
            else return p[1];
    }
    return null;
}

function getSourceAppId(){
    for(var i=0;i<jsparam.length;i++){
        var json=eval(jsparam[i]);
        if("sourceAppId"==json.paramName){
            return  json.paramValue;
        }
    }
}

function getjsParam(){
    var js = document.getElementsByTagName("script");
    for (var i = 0; i < js.length; i++) {
        if (js[i].src.indexOf("mmshare") >= 0) {
            var arraytemp = new Array();
            arraytemp = js[i].src.split('?');
            if(arraytemp[1]!=undefined&&arraytemp[1]!=""&&arraytemp[1]!=null){
                arraytemp = arraytemp[1].split('=');
                var param={};
                param.paramName=arraytemp[0];
                if(arraytemp[1].indexOf("&")!=-1){
                    var tempValue=arraytemp[1].substring(0,arraytemp[1].indexOf("&"));
                    param.paramValue=tempValue;
                }else{
                    param.paramValue=arraytemp[1];
                }
                jsparam.push(param);
            }
        }
    }
}
/**
 * Created by Administrator on 2020/4/1.
 */