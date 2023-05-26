$(function(){
    //付费
    $('.zfBtn').click(function(){
        var username = $("#yh_username").attr("user");
        var pay_money = $("#pay_money").attr("value");
        var jiage = $("jiage").attr("value");
        var moduleid = $("#mmoduleid").attr("value");
        var itemid = $("#iitemid").attr("value");
        var title = $("#ttitle").attr("value");
        $.get('https://www.in-en.com/member/charge2.php?action=confirm&a_from=1&reason=grade&amount='+pay_money+'&bank=weixin&mmoduleid='+moduleid+'&itemid='+itemid+'&title='+title+'&username='+username, function(data) {
            if(data) {
                var now_url = window.location.href;
                var data = JSON.parse(data);
                var itemid = data['itemid'];
                var img_src = data['img'];
                $('.ewmImg').attr('src', img_src);
                $('.ewmpay').html('￥'+data['pay_money']);
                var interval = window.setInterval(
                    function() {
                        $.get('https://www.in-en.com/api/pay/weixin/qrcode2.php?action=ajax&itemid='+itemid, function(data) {
                            if(data == 'ok') {
                                clearInterval(interval);
                                window.location.href = now_url;
                            }
                        });
                    },
                    3000);
            }
        });
    });
    $('.syBtn').click(function(){
        $('.tc2').show();
    });
     $('.cancelBtn').click(function(){
        $('.tc2').hide();
    });
    $(".sureBtn").click(function(){
         $('.tc2').hide();
        var username = $("#yh_username").attr("user");
        var moduleid = $("#mmoduleid").attr("value");
        var itemid = $("#iitemid").attr("value");
        $.get('https://www.in-en.com/extend/coupons_record.php?username='+username+'&moduleid='+moduleid+'&itemid='+itemid, function(data) {
            if(data=='1'){
                $('.tc3').show();
            }else if(data == '2'){
                window.location.reload();
            }
        });
    })
});