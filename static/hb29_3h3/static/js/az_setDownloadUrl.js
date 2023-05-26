var down_gaosu_html = "";
$('.m-downaddr .addr .ul-addr:eq(1) li').each(function () {
    if ($.trim($(this).text()) == "") { $(this).remove(); }
    if ($(this).text().indexOf("迅雷") > -1 || $(this).text().indexOf("旋风") > -1 || $(this).text().indexOf("高速") > -1) {
        down_gaosu_html += $(this).prop('outerHTML');
        $(this).remove();
    }
});

if($('.gaosu_down').length <= 0){$('.m-downaddr .addr .ul-addr:eq(0)').html(down_gaosu_html);}//把高速下载的A标签放入高速下载

$('.J_tab .tab-item').hover(function(){
    $tab_index = $(this).index();
    $('.J_tab .tab-item').removeClass('cur');
    $('.J_tab .tab-item:eq('+$tab_index+')').addClass('cur');
    $('.m-downaddr .addr').hide();
    $('.m-downaddr .addr:eq('+$tab_index+')').show();
    
});
var softCount = function (SoftID, SoftLinkID) {

    window.$ && window.$.ajax({
        type: "post",
        url: "/index.php?m=content&c=content_ajax&a=downcount",
        data: {
            'addressid': SoftLinkID,
            'id': SoftID
        }
    });

}

function address_click2(url) { 
    
}
//paraName 等找参数的名称
function GetUrlParam(url,paraName) {
　　　　//var url = document.location.toString();
    if(typeof(url) != 'undefined') {
        console.log(url);
　　　　var arrObj = url.split("?");

　　　　if (arrObj.length > 1) {
　　　　　　var arrPara = arrObj[1].split("&");
　　　　　　var arr;

　　　　　　for (var i = 0; i < arrPara.length; i++) {
　　　　　　　　arr = arrPara[i].split("=");

　　　　　　　　if (arr != null && arr[0] == paraName) {
　　　　　　　　　　return arr[1];
　　　　　　　　}
　　　　　　}
　　　　　　return "";
　　　　}
　　　　else {
　　　　　　return "";
　　　　}
    }
}
//if(GetUrlParam($('.ul-addr script').attr('src'),'TypeID')==25){//如果是25（H5页面）
if($('.other_down').attr('siteid')==25){//如果是25（H5页面）
    $('head').append('<style type="text/css">.art-appinfo .btn a{background:url(/statics/images/android/btn-h5games.png) no-repeat}</style>');
    setTimeout(function(){$('.gaosu_down li a').text('立即开始游戏');},300);
    $('.ul-addr li a').text('立即开始游戏');
    $('.m-downaddr .addr h3:eq(0)').text($('.m-downaddr .addr h3:eq(0)').text().replace('下载','体验'));
    $('.m-downaddr .addr h3:eq(1)').text($('.m-downaddr .addr h3:eq(1)').text().replace('下载','体验'));
}
if($('.qbox .m-downaddr').attr('hz_error_url')=='1'){//如果合作链接失效
    $('.qbox .m-downaddr .addr').html('<img src="../images/no_address.jpg">');
}