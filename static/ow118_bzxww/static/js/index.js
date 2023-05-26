/**
 * Created by richard on 2016/2/1.
 */
var html = document.getElementsByTagName('html')[0];
if(html){
    var w = window.innerWidth;
    var fontSize = (w>750?750:w)/750 * 100;
    html.style.fontSize = fontSize + 'px';
}
window.onload = function(){
    window.onresize = function(){
        var w = window.innerWidth;
        var fontSize = (w>750?750:w)/750 * 100;
        html.style.fontSize = fontSize + 'px';
    }
}


$(function () {
    $(".footer .top").click(function() {
        $('body,html').animate({
                scrollTop: 0
            },
            500);
        return false;
    });
})