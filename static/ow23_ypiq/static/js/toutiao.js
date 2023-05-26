!function(t) {
    let o = t.location.href,n = document.getElementById("ttzz").src.split("?")[1];
    if(!o || !n)return;
    if(!t.navigator.appName)return;
    var h = function(u){
        let e = "https://zhanzhang.toutiao.com/s.gif",
        a = new Image;
        u && (e += "?url=" + encodeURIComponent(u)),
        n && (e += "&token=" + n),
        n && (a.src = e)}
    var a=document.getElementsByTagName('a');var u,k,d=document.location.href.replace(/https?:\/\//,'').split('/')[0];
    var g=[];
    for(var i=0;i<a.length;i++){
        u=a[i].href;k=a[i].rel;u=u.replace(/\#.+/g,'');if(u.indexOf(d)<0){continue;}
        if(u.indexOf('/wp-admin/')>-1){continue;}
        if(u.indexOf('/wp-login\.php')>-1){continue;}
        if(/nofollow/.test(k)){continue;}
        if(g.indexOf(u)>-1){continue;}
        g.push(u);h(u);}
} (window);