<!--[4,64,95] published at 2022-07-05 15:08:00 from #202 by 808-->
if(window.location.protocol == 'https:'){
    var cssArr=document.getElementsByTagName("link");
    for (var i = 0;i<cssArr.length; i++) {
        if(cssArr[i].href && cssArr[i].href.indexOf('http://')> -1 ){
            cssArr[i].href = cssArr[i].href.replace("http://","https://");
        }
    }
}
