// ��������ҳ ֱ����ʾȫ�� ��Ҫ���ظ��๦��  2018-01-29
_num= 0;
var Aid;
$(function(){
    //������
    Aid = articleId;
    $.getScript("https://nodeinterface.yesky.com/getalc.do?aId="+Aid,function(){
        _num = likeCount.count;
        if(_num<1||_num==undefined){
            $(".zan dd").text("��ɳ��");
        }
        else{
            $(".zan dd em").text(_num);
        }
    });
    pageview();
    /*******************************************************************/
    //�����ֻ�
    function pageview() {
        var _screen=$(window).width();
        var _height=parseInt(_screen/2*3/4);
        if (_screen >= 1000) {
            $(".wrap").width(320);
            $(".picbox li").css({"height":120+"px"});
        }
        else{
            $(".picbox li").css({"height":_height});
        }
    }

    $(window).scroll(function(){
        var dheight=$(document).scrollTop();
        if(dheight>800){
            $(".zhiding").show();
        }
        else{
            $(".zhiding").hide();
        }
    });
    $(".zhiding").click(function(){
        $("body,html").animate({scrollTop:0},400);
    });
//����Ч��
    var haszan=false;
    $(function(){
        //�ײ��������
        $(".fixshare").click(function(){
            $(".newsshare").show();
        });
        //�ײ�����ȡ��
        $(".newsshare p.btn").click(function(){
            $(this).parent().parent().hide();
        });
        var _zan=Util.cookie.get("pro"+Aid);
        if(_zan){
            $(".zan dt img").attr("src","https://resource.yesky.com/TLimages2009/yesky/images/qdk0830/znzanguo.png");
            haszan=true;
        }
    });
    $(".zan dt").bind('click',function(){
        var date=new Date().getTime()+1000 * 60 * 60 * 24 * 5;
        var express=new Date(date);
        if(haszan){
            $(".zan dt em").show();
            setTimeout(function(){
                    $(".zan dt em").css("display","none");
                },
                2000);
            haszan = true;
        }else{
            $(this).find("img").attr("src","https://resource.yesky.com/TLimages2009/yesky/images/qdk0830/znzanguo.png");
            var emlength=$(".zan dd em").text();
            if(emlength<1 || emlength == "" ){
                $(".zan dd").html("1������");
            }else{
                $(".zan dd em").html(parseInt(_num)+1);
            }
            $(this).find("span").show();
            setTimeout(function(){
                    $(".zan dt span").css("display","none");
                },
                2000);
            Util.cookie.set("pro"+Aid, "true", express);
            haszan = true;
            $.getScript("https://nodeinterface.yesky.com/addalc.do?aId="+Aid,function(){});
        }
    });
    var index = 0;
    $("body").on("click",".related-search .change",function(){
        var len = $(this).parent().siblings(".keyblock").find("ul").length;
        var obj1=$(this).parent().siblings(".keyblock").find("ul");
        if (index == len) {
            index = 0;
        };
        $(obj1).eq(index).fadeOut(0).siblings().fadeIn(0);
        index += 1;
    });
});

//����cookie Util.cookie.set(name, value, expires, path, domain, secure)
//��ȡcookie Util.cookie.get(name)
//ɾ��cookie Util.cookie.del(name, path, domain, secure)

;var Util=(window.Util)?Util:{};
(function(){
    /////cookie��������, ʹ�÷���CookieUtil.get('name'),����ͬ
    var cookie = {
        get: function(name) {
            var cookie = document.cookie;
            var cookieName = encodeURIComponent(name) + "=";
            var start = cookie.indexOf(cookieName);
            var value = null;
            if (start > -1)
            {
                var end = cookie.indexOf(";", start);
                if (end == -1)
                    end = cookie.length;
                value = decodeURIComponent(cookie.substring(start + cookieName.length, end));
            }
            return value;
        },
        set: function(name, value, expires, path, domain, secure) {
            var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
            if (expires instanceof Date)
                cookieText += "; expires=" + expires.toGMTString();
            if (path)
                cookieText += "; path=" + path;
            if (domain)
                cookieText += "; domain=" + domain;
            if (secure)
                cookieText += "; secure";

            document.cookie = cookieText;
        },
        del: function(name, path, domain, secure) {
            this.set(name, "", new Date(0), path, domain, secure);
        }
    };
    //���
    Util.cookie=cookie;
})();

//������
$(function(){
    var plnum=$(".header-comment-number  .comment-number").eq(0).html();
    var timer = setInterval(function () {
        plnum = $(".header-comment-number  .comment-number").eq(0).html();
        if (plnum > 0) {
            $(".headpl").show();
            $(".headpl em").text(plnum);
        }
        if (plnum != null) {
            clearInterval(timer);
        }

    }, 1000);
});
//�����ӿ�
var _airHtml ='<span class="getloc"></span><a href="'+_airherf+'" '+"onclick=\"_hmt.push(['_trackEvent', 'wap_�����ӿ�', 'ad_click', 'wap_�����ӿ�']);\""+'>'
    +'<div id="air" class="tq"><div class="wd"></div>'+
    '<div class="dq"><p class="fir"><b>����</b><span></span></p><p class="sec"><i></i><b></b></p></div>'+
    '</div></a>';
var _airherf = "";
var latitude = 39.907;
var longitude = 116.391;
var requestDate;/*����ʱ��*/
var locationid;/*λ��id*/
/*��ȡλ�ýӿ� ��ȡʵʱ�����ӿ� ��ȡ���������ӿ�*/
var locationUrl;
var currentconditionsUrl;
var airqualityUrl;
var localurl = 'http://php.app.yesky.com/activity/weather/api.php';
//var _locationurl = window.location.href;
var isclick = false;

/*$(function(){
 $(".head").append(_airHtml);
 $(".headpl").hide();//����������
 geturl();
 $(".getloc").bind('click',function(e){
 isclick = true;
 geturl();
 getLocation();

 });
 });*/
function geturl(){
    $.getScript(localurl, function() {
        var timeout = setTimeout(function () {
        }, 5000);
        if(timeout > 5000){
            clearTimeout(timeout);
            timeout=null;
            $("#air").css("display", "none");
            $(".getloc").css("display", "none");
            return;
        }
        locationUrl = data.locations;
        currentconditionsUrl = data.currentconditions;
        airqualityUrl = data.airquality;
        requestDate = data.date;
        locations(latitude,longitude);
    });
}
function locations(latitude,longitude){
    $.ajax({
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        url:'http://apidev.weathercn.com/locations/v1/cities/geoposition/search.json?q='+latitude+',' +longitude
        +'&apikey=59065d7e9515477a9221f1aa85e475d9&requestDate='+requestDate+'&accessKey='+locationUrl+'&language=zh-cn',
        dataType:'json',
        timeout :3000,
        data:'',
        success:function(data) {
            if(isclick){
                $(".fir b").text(data.LocalizedName);
            }
            locationid = data.ParentCity.Key;
            currentconditions();
            airquality();
        },
        error:function(jqXHR, textStatus, errorThrown){
            $("#air").css("display", "none");
            $(".getloc").css("display", "none");
            if(textStatus=="timeout"){
                console.log("timeout");
            }else{
                console.log(errorThrown);
            }
        }
    });
}
function currentconditions(){
    $.ajax({
        url:'http://apidev.weathercn.com/currentconditions/v1/'+locationid+'?apikey=59065d7e9515477a9221f1aa85e475d9&requestDate='+
        requestDate+'&accessKey='+currentconditionsUrl+'&details=true&language=zh-cn&metric=true',
        dataType:'json',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        timeout :3000,
        data:'',
        success:function(data) {
            $(".wd").text(data[0].Temperature.Metric.Value+"��");
            $(".fir span").text(data[0].WeatherText);
            $("#air").parent().attr("href",data[0].MobileLink);
            var cloud = (data[0].WeatherText).indexOf("����");
            var sun = (data[0].WeatherText).indexOf("��");
            var overcast = (data[0].WeatherText).indexOf("��");
            var rain = (data[0].WeatherText).indexOf("��");
            var fog = (data[0].WeatherText).indexOf("��");
            var haze = (data[0].WeatherText).indexOf("��");
            var ice = (data[0].WeatherText).indexOf("��");
            var sand = (data[0].WeatherText).indexOf("ɳ");
            var snow = (data[0].WeatherText).indexOf("ѩ");
            if(cloud >= 0){
                $("#air").attr("class","").addClass("tq tq1");
            }else if(sun >= 0){
                $("#air").attr("class","").addClass("tq tq2");
            }else if(overcast >= 0){
                $("#air").attr("class","").addClass("tq tq3");
            }else if(rain >= 0){
                $("#air").attr("class","").addClass("tq tq4");
            }else if(fog >= 0){
                $("#air").attr("class","").addClass("tq tq5");
            }else if(haze >= 0){
                $("#air").attr("class","").addClass("tq tq6");
            }else if(ice >= 0){
                $("#air").attr("class","").addClass("tq tq7");
            }else if(sand >= 0){
                $("#air").attr("class","").addClass("tq tq8");
            }else if(snow >= 0){
                $("#air").attr("class","").addClass("tq tq9");
            }else{
                $("#air").attr("class","").addClass("tq tq1");
            }
            $(".tq").show();
        },
        error:function(jqXHR, textStatus, errorThrown){
            $("#air").css("display", "none");
            $(".getloc").css("display", "none");
            if(textStatus=="timeout"){
                console.log("timeout");
            }else{
                console.log(errorThrown);
            }
        }
    });
}
function airquality(){
    $.ajax({
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        url:'http://apidev.weathercn.com/airquality/v1/global/observations/'+locationid+'.json?apikey=59065d7e9515477a9221f1aa85e475d9&requestDate='+
        requestDate+'&accessKey='+airqualityUrl+'&language=zh-cn',
        dataType:'json',
        timeout :3000,
        data:'',
        success:function(data) {
            var _pm = data.ParticulateMatter2_5;
            if(_pm > 0 && _pm <= 35){
                $(".sec b").text("��");
            }else if(_pm > 35 && _pm <= 75){
                $(".sec b").text("��");
            }else if(_pm > 75 && _pm <= 115){
                $(".sec b").text("�����Ⱦ");
            }else if(_pm > 115 && _pm <= 150){
                $(".sec b").text("�ж���Ⱦ");
            }else if(_pm > 150 && _pm <= 250){
                $(".sec b").text("�ض���Ⱦ");
            }else if(_pm > 250){
                $(".sec b").text("������Ⱦ");
            }
            $(".sec i").text(_pm);
        },
        error:function(jqXHR, textStatus, errorThrown){
            $("#air").css("display", "none");
            $(".getloc").css("display", "none");
            if(textStatus=="timeout"){
                console.log("timeout");
            }else{
                console.log(errorThrown);
            }
        }
    });
}
function getLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition( // �ú�����������������
            function(pos){ // ����ɹ���ִ�иûص�����
                console.log(
                    '  ���ȣ�' + pos.coords.latitude +
                    '  γ�ȣ�' + pos.coords.longitude +
                    '  �߶ȣ�' + pos.coords.altitude +
                    '  ��ȷ��(��γ)��' + pos.coords.accuracy +
                    '  ��ȷ��(�߶�)��' + pos.coords.altitudeAccuracy +
                    '  �ٶȣ�' + pos.coords.speed
                );
                latitude =   pos.coords.latitude;
                longitude =  pos.coords.longitude;
                locations(latitude,longitude)
            }, function(err){ // ���ʧ����ִ�иûص�����
                isclick = false;
                alert("�޷���ȡλ����Ϣ");
                //alert(err.message);
            }, { // ��������
                enableHighAccuracy: false, // ��߾���(�ķ���Դ)
                timeout: 3000, // ����timeout�����ʧ�ܵĻص�����
                maximumAge: 1000 // ��ȡ���ĵ�����Ϣ����Ч�ڣ�������Ч�������»�ȡһ��λ����Ϣ
            }
        );
    }else{
        console.log("���������֧�ֻ�ȡ����λ�á�")
    }
}
//��չ�������ж�
if(document.URL.indexOf("smartisanTNT")>0&&$(".content p strong").html()=="���켫���ʼǱ�Ƶ����"){
    $(".content p strong").html("���켫����չ��Ƶ����")
}

/*function addshenma(){
 $.ajax({
 url:"https://api.m.sm.cn/rest?method=tools.hot&size=0&from=wa000092",
 dataType:'jsonp',
 data:'',
 jsonp:'callback',
 jsonpCallback:"jsonpCallback",
 success:function(result) {
 var _htmls= '<div class="header"><h2>�������</h2><a class="change" href="javascript:void(0);">��һ��</a></div>'
 +'<div class="keyblock"><ul class="list clearfix" >';
 for(var i in result) {
 if(i<6){
 _htmls +='<li><a class="c"' +'onclick="'+"_hmt.push(['_trackEvent', 'smxw"+i+"', 'ad_click', 'smxw"+i+"']);"+'"'
 + 'href="http://m.sm.cn/'+result[i].url+'&from=wa000092">'+result[i].title+'</a></li>';
 }else if(i == 6){
 _htmls+='</ul>'+'<ul class="list clearfix" style="display: none">'+'<li><a class="c"' +'onclick="'+"_hmt.push(['_trackEvent', 'smxw"+i+"', 'ad_click', 'smxw"+i+"']);"+'"'
 + 'href="http://m.sm.cn/'+result[i].url+'&from=wa000092">'+result[i].title+'</a></li>';
 } else if(i<12&&i>6){
 _htmls += '<li><a class="c"' +'onclick="'+"_hmt.push(['_trackEvent', 'smxw"+i+"', 'ad_click', 'smxw"+i+"']);"+'"'
 + 'href="http://m.sm.cn/'+result[i].url+'&from=wa000092">'+result[i].title+'</a></li>';
 }else{
 _htmls+='</ul>' +'</div>';
 $("#related-search-div").html(_htmls);
 return;
 }
 }
 },
 error:function(e){
 console.log(e);
 console.log("error");
 }

 });
 }*/


