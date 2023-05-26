if("micromessenger"==window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)&&"share.gmw.cn"!=window.location.hostname){
    window.location.href=window.location.href.replace(/\/(\w+)\.gmw\.cn\//g, function(a,b){
        var z={};
        return a.replace(b,'share')+b+'/';
    });
}