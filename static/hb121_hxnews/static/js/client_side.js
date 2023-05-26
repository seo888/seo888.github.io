var urlnow = window.location.href;
if (!(navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
    var isex = urlnow.indexOf('m.hxnews');
    if(isex >= 0){//开头为m.hxnews时不跳转
        //if(urlnow.substr(-6)=='.shtml'){
        //    urlnow = urlnow.replace(/m.hxnews(.*?)\/(\w+_)?(\d+)\.shtml/img, "www.hxnews$1/$3.shtml");
        //    window.location.href = urlnow;
        //}
    }
    var isjrtt = urlnow.indexOf('jrtt.hxnews');
    if(isjrtt >= 0){
        urlnow = urlnow.replace("jrtt.hxnews",'www.hxnews');
        window.location.href = urlnow;
    }
    var isuczzd = urlnow.indexOf('uczzd.hxnews');
    if(isuczzd >= 0){
        urlnow = urlnow.replace("uczzd.hxnews",'www.hxnews');
        window.location.href = urlnow;
    }
}else{
    var isex = urlnow.indexOf('www.hxnews');
    if(isex >= 0){
        urlnow = urlnow.replace("www.hxnews",'m.hxnews');
        window.location.href = urlnow;
    }
    var isdzb = urlnow.indexOf('dzb.hxnews');
    if (isdzb >= 0) {
        urlnow = urlnow.replace("dzb.hxnews",'m.dzb.hxnews');
        window.location.href = urlnow;
    }
    
}