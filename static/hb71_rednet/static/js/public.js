var pubUrl = "https://hpzg-fapi.rednet.cn";
var liuyanUrl = "https://a.rednet.cn/dispatch"
var liuyanCodeUrl = "https://front-web.rednet.cn"

// var pubUrl = "http://172.16.6.49:8082"
// var liuyanCodeUrl = "http://172.16.6.49:8080"
// var liuyanUrl = "//a.onlyred.net/dispatch"

var curTime = new Date().getTime();
var expireTime = 1000*60*30;

function encrypt(keyword) {
  var key = CryptoJS.enc.Utf8.parse("TUvwLUVJTJs2mrvf")
  var encryptedData = CryptoJS.AES.encrypt(keyword, key, {
	iv: CryptoJS.enc.Utf8.parse('16-Bytes--String'),
	mode: CryptoJS.mode.CBC,
	padding: CryptoJS.pad.Pkcs7
  })
  return encryptedData.toString()
}

/*****  *****/
$.extend({
    myTime:{
        CurTime: function(){
            return Date.parse(new Date())/1000;
        },
        DateToUnix: function(string) {
            var f = string.split('', 2);
            var d = (f[0] ? f[0] : '').split('-', 3);
            var t = (f[1] ? f[1] : '').split(':', 3);
            return (new Date(
                parseInt(d[0], 10) || null,
                (parseInt(d[1], 10) || 1) - 1,
                parseInt(d[2], 10) || null,
                parseInt(t[0], 10) || null,
                parseInt(t[1], 10) || null,
                parseInt(t[2], 10) || null
                )).getTime() / 1000;
        },
        UnixToDate: function(unixTime, isFull, timeZone) {
            if (typeof (timeZone) == 'number'){
                unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
            }
            var time = new Date(unixTime * 1000);
            var ymdhis = "";
            ymdhis += time.getUTCFullYear() + "-";
            ymdhis += (time.getUTCMonth()+1) + "-";
            ymdhis += time.getUTCDate();
            if (isFull === true){
                ymdhis += "" + time.getUTCHours() + ":";
                ymdhis += time.getUTCMinutes() + ":";
                ymdhis += time.getUTCSeconds();
            }
            return ymdhis;
        }
    }
});

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?d02d5a5724737a5940b7e7fdde6e4258";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();



