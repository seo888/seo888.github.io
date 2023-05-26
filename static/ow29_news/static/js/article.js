// $(function() {
var pcjs = function() {
    function switchAd(element) {
        for(var i = 0; i < element.length; i++) {
            if(element.eq(i).css('display') == 'block') {
                element.css('display', 'none');
                if(i == element.length - 1) {
                    element.eq(0).css('display', 'block');
                } else {
                    element.eq(i + 1).css('display', 'block');
                }
                i = element.length;
            }
        }
    }
    var timer1 = setInterval(function() {
        switchAd($('.switchad1 a'));
    }, 2000);
    var timer2 = setInterval(function() {
        switchAd($('.switchad2 a'));
    }, 2000);
    var timer3 = setInterval(function() {
        switchAd($('.switchad3 a'));
    }, 2000);
    var timer4 = setInterval(function() {
        switchAd($('.switchad4 a'));
    }, 2000);
    $('.switchad1').on('mouseover', 'a', function() {
        var _this = $(this);
        clearInterval(timer1);
    });
    $('.switchad1').on('mouseout', 'a', function() {
        var _this = $(this);
        timer1 = setInterval(function() {
            switchAd($('.switchad1 a'));
        }, 2000);
    });
    $('.switchad2').on('mouseover', 'a', function() {
        var _this = $(this);
        clearInterval(timer2);
    });
    $('.switchad2').on('mouseout', 'a', function() {
        var _this = $(this);
        timer2 = setInterval(function() {
            switchAd($('.switchad2 a'));
        }, 2000);
    });
    $('.switchad3').on('mouseover', 'a', function() {
        var _this = $(this);
        clearInterval(timer3);
    });
    $('.switchad3').on('mouseout', 'a', function() {
        var _this = $(this);
        timer3 = setInterval(function() {
            switchAd($('.switchad3 a'));
        }, 2000);
    });
    $('.switchad4').on('mouseover', 'a', function() {
        var _this = $(this);
        clearInterval(timer4);
    });
    $('.switchad4').on('mouseout', 'a', function() {
        var _this = $(this);
        timer4 = setInterval(function() {
            switchAd($('.switchad4 a'));
        }, 2000);
    });
    $('.switch1').click(function(event) {
        $(this).addClass('select');
        $(this).siblings().removeClass('select');
        $('.switch-con2').hide();
        $('.switch-con1').show();
    });
    $('.switch2').click(function(event) {
        $(this).addClass('select');
        $(this).siblings().removeClass('select');
        $('.switch-con1').hide();
        $('.switch-con2').show();
    });
    $('.switch1').hover(function(event) {
        $(this).addClass('select');
        $(this).siblings().removeClass('select');
        $('.switch-con2').hide();
        $('.switch-con1').show();
    });
    $('.switch2').hover(function(event) {
        $(this).addClass('select');
        $(this).siblings().removeClass('select');
        $('.switch-con1').hide();
        $('.switch-con2').show();
    });
}
var mobilejs = function(){
    // var head = document.getElementsByTagName('head')[0];
    // var link = document.createElement('link');
    // link.rel = 'stylesheet';
    // link.type = 'text/css';
    // link.href = '//www.eol.cn/e_css/article/2018/marticle.css';
    // link.id = 'marticle';
    // head.appendChild(link);
    // var meta =  document.createElement('meta');
    // meta.name = 'viewport';
    // meta.content = 'width=750, user-scalable=no';
    // head.appendChild(meta);
    var cheight = document.documentElement.clientHeight;
    $('.pagemore').css('height', cheight + 'px');
    $('.morenav').click(function(event) {
        $('.pagemore').css('right', '0');
        $('html').css({ 'overflow': 'hidden', 'height': '100%' });
        $('body').css({ 'overflow': 'hidden', 'height': '100%' });
    });
    $('.back').click(function(event) {
        $('.pagemore').css('right', '-750px');
        $('html').css({ 'overflow': 'auto', 'height': 'auto' });
        $('body').css({ 'overflow': 'hidden', 'height': 'auto' });
    });
    $('.zhuanti>.li').each(function(index, el) {
        var hasimg = $(el).children('.img').find('img').length;
        if(hasimg <= 0) {
            $(el).children('.right').remove();
            $(el).addClass('noimg');
        }
    });
}

var mpc = window.navigator.userAgent;
if(/Mobile|iP(hone|ad)|Android|BlackBerry|IEMobile/.test(mpc)) {
    mobilejs();
} else {
    pcjs();
}
