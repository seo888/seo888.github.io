'use strict';

//动态版本号     

//document.write('<script src="/js/require.js?v=' + new Date().getTime() + '"><\/script>');

// 首页微博和微信的tab切换
$(document).on("mouseenter", '.border-bottom.wei h2', function (e) {
    for (var i = 0; i < 2; i++) {
        $('.border-bottom.wei h2').removeClass('landi');
    }
    if ($(this).attr("data-tab") === '1') {
        $('.container-div.wei').eq(0).removeClass('on');
        $('.container-div.wei').eq(1).addClass('on');
    } else {
        $('.container-div.wei').eq(1).removeClass('on');
        $('.container-div.wei').eq(0).addClass('on');
    }
    $(this).addClass('landi');
});
// $('right-login a img').attr('src','https://cmsres.dianzhenkeji.com/static/dx/pc/common/imgs/app-dark.png')
// $('popup img').attr('src','https://cmsres.dianzhenkeji.com/static/dx/pc/common/imgs/login-dark.png')

// 判断是否是ie浏览器
function isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
    } else {
        return false;
    }
}

// 点击选择页数
$(document).on('click', '.pagination ul li', function () {
    num = parseInt($(this).text());
    PageIndex = $(this).text();
    special();
    $(window).scrollTop(0);
});

$(function () {
    // let userIcon = sessionStorage.getItem('UserIcon')
    // let UserNickName = sessionStorage.getItem('UserNickName')
    // console.log($('#popup  span')[0])

    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIEs = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; //判断是否IE<11浏览器  
    if (isIEs) {
        var str1 = '您的IE浏览器版本不能低于11且IE浏览器页面可能变形';
        var str2 = '推荐使用:<a href="https://browser.qq.com/?adtag=SEM170314031" target="_blank" style="color:blue;">QQ</a>,' +
        '<a href="https://browser.360.cn/ee/mac/index.html" target="_blank" style="color:blue;">360</a>,<a href="https://www.google.cn/intl/zh-CN/chrome/" target="_blank" style="color:blue;">谷歌</a>,等最新版浏览器或其他双核极速模式';
        document.writeln("<pre style='text-align:center;color:#fff;background-color:#0cc; height:100%;border:0;position:fixed;top:0;left:0;width:100%;z-index:1234'>" +
        "<p style='padding-top:200px;margin:0'><strong>" + str1 + "<br/></strong></p><p style='margin-top:10px;'>" +
        str2 + "</p><p style='margin:10px;'><strong>如果你的使用的是双核浏览器,请切换到极速模式访问<br/></strong></p></pre>");
        document.execCommand("Stop");
    }else{
        if (isIE()) {
            console.log('不是IE浏览器');
            var html = '<div>'
            html+='您正在使用的IE浏览器页面可能变形，推荐使用<a class="a_lay" href="https://browser.qq.com/?adtag=SEM170314031">QQ</a>、<a class="a_lay" href="https://browser.360.cn/ee/mac/index.html">360</a>、<a class="a_lay" href="https://www.google.cn/intl/zh-CN/chrome/">谷歌</a>等最新版浏览器或其他双核极速模式 <br/>如果您的使用的是双核浏览器,请切换到极速模式访问'
            html+='</div>'
            layer.open({
                title: '友情提示',
                content: html
            });
        }
    }
    if($('#popup').length>0){
        $('#popup span')[0].innerHTML = '公号登陆';
        // $('#popup a')[0].href = 'http://114.55.100.31:8008/Login'
        $('#land').remove();
        $('#popup').click(function () {
            location.href = 'http://kuaixun.0745tv.com/Login';
        });
    }
    
});

// 上下翻页
$(document).on('click', '.pagination button', function () {
    var id = $(this).attr("data-id");
    if (id === '0') {
        num = num - 1;
        if (num <= 0) {
            num = total;
        }
    } else {
        if (num === parseInt(total)) {
            num = 1;
        } else {
            num = num + 1;
        }
    }
    PageIndex = num;
    special();
    $(window).scrollTop(0);
});

// 搜索
$('.search-button').click(function () {
    PageIndex = 1;
    total = 0;
    num = 1;
    a = 0;
    b = 0;
    Name = $('.search input').val();
    Name = Name.trim();
    special();
});
// 回车搜索
$('.search input').bind('keypress', function (event) {
    if (event.keyCode == "13") {
        PageIndex = 1;
        total = 0;
        num = 1;
        a = 0;
        b = 0;
        Name = $('.search input').val();
        Name = Name.trim();
        special();
    }
});

// 选择输入页数
$(document).on('keypress', "#page-number", function (event) {
    if (event.keyCode == "13") {
        if ($(this).val() !== '') {
            num = parseInt($(this).val());
        }
        $(this).css('display', 'none');
        PageIndex = num;
        special();
        $(window).scrollTop(0);
    }
});

// 县市区
var city = function () {
    $.ajax({
        type: 'get',
        url: url + '/NewWebChannel/GetChannelList',
        data: {
            Chid: 461,
            PageSize: 24
        },
        cache: false,
        async: true,
        dataType: 'json',
        jsonp: 'jsonCallback',
        jsonpCallback: 'callback',
        success: function success(data) {
            // console.log(data.Data)
            data.Data.unshift(data.Data.pop());
            var localhref = location.href;
            var a_href = /html\/download|html\/details/.test(localhref) ? '../news.html' : './news.html';
            
            // let a_href = './news.html'
            var html = '';
            var html1 = '';
            data.Data.forEach(function (item, index) {
              var url = void 0;
              if(item.ResourceType==2)
              {
                  url=item.ResourceUrl;
              }else if(item.ResourceType==4){
                  url = './special-details.html?ParentID=' + item.ChID;
              }else{
                  url='./html/details.html?' + item.ID + '?新闻'
              }
                html1 += '<a href="' + a_href + '?' + item.ID + '?' + item.ChannelName + '?' + item.ParentID + '">' + item.ChannelName + '</a>';
                if (index === 0) {
                    html += '<big class="on" data-id=' + item.ID + '> ' + item.ChannelName + '</big>';
                } else if (index > 0) {
                    html += '<big data-id=' + item.ID + '> ' + item.ChannelName + '</big>';
                }
            });
            console.log(html1);
            $(".cityP").html(html);
            $('.county').html(html1);
            $(".countyA").html(html1);
            // $(document).on('click', '.county a', function () {
            //   localStorage.setItem('information', $(this).text())
            // })
        }
    });
}();
var chid = 443;
information();

function information() {
    $.ajax({
        type: 'get',
        url: url + '/NewWebChannel/GetNewsChildUpList',
        data: {
            Chid: chid
        },
        cache: false,
        async: true,
        dataType: 'json',
        jsonp: 'jsonCallback',
        jsonpCallback: 'callback',
        success: function success(data) {
            // console.log(data.Data)
            var html1 = '';
            var html2 = '';
            data.Data.forEach(function (item, index) {
                var PicPath = '';
                if (item.SmallPicUrl && item.SmallPicUrl !== '') {
                    PicPath = item.SmallPicUrl.indexOf('http') === -1 ? imgUrl + item.SmallPicUrl : item.SmallPicUrl;
                    PicPath = PicPath.split(',')[0];
                } else {
                    PicPath = '../img/default_img.png';
                }
                var CreateTime = dateFormat("yyyy-MM-dd hh:mm", item.CreateTime);
                var url = void 0;
                if(item.ResourceType==2)
                {
                  url=item.ResourceUrl;
                }else if(item.ResourceType==4){
                  url = './special-details.html?ParentID=' + item.ChID;
                }else{
                  url='./html/details.html?' + item.ID + '?新闻'
                }
                if (index === 0) {
                    html1 += '<a target="_blank" href="'+url+'" class="big-img"><img src="' + PicPath + '" alt=""><p class="h52"> ' + item.Title + ' </p><span>' + CreateTime + '</span></a>';
                } else if (index > 0 && index < 7) {
                    html2 += '<a target="_blank" href="'+url+'" class="small-img"><img src="' + PicPath + '" alt=""><p> ' + item.Title + ' </p><span>' + CreateTime + '</span></a>';
                }
            });
            $(".content-informationDiv-left.city").html(html1);
            $(".content-informationDiv-right.city").html(html2);
        }
    });
}
$(document).on('click', ".cityP big", function () {
    chid = parseInt($(this).attr('data-id'));
    $('.cityP big').removeClass('on');
    $(this).addClass('on');
    information();
});

// 资讯下拉框
$.ajax({
    type: 'get',
    url: url + '/NewWebChannel/GetZXList',
    cache: false,
    async: true,
    dataType: 'json',
    jsonp: 'jsonCallback',
    jsonpCallback: 'callback',
    success: function success(data) {
        // console.log(data.Data)
        var localhref = location.href;
        var a_href = /html\/download|html\/details/.test(localhref) ? '../news.html' : './news.html';
        // let a_href = './news.html'
        console.log(a_href);
        var html = '';
        data.Data.forEach(function (item) {
            if(item.Type=="B"){
              html += '<a href="'+item.ChannelUrl+'" target="view_window" >' + item.ChannelName + '</a>';
            }else{
              html += '<a href="' + a_href + '?' + item.ID + '?' + item.ChannelName + '?' + item.ParentID + ' " target="view_window" >' + item.ChannelName + '</a>';
            }
            
        });
        $(".party").html(html);
        $(".partyA").html(html);
    }
});

// 登陆
function GoLogin(url) {
    // sessionStorage.setItem('addUrl', url)
    sessionStorage.setItem('currentUrl', location.href);
}