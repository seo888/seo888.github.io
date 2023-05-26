var digg = {
    done : [],
    init: function () {
      var _digg = $("#support"),
          contentid = $(".sharebox").attr("data-contentid");
      $.get('/ajax/dynamic?id=' + contentid,function(res){
        if(res){
          _digg.html(_digg.html().replace(/点赞 \d+/, '点赞 ' + res.digg||'0'));
        }
      });
    },
    set: function(contentid, obj){
        var t = this;
        if(t.done[contentid]) {
            $('#'+obj).attr("class","digged");
            return ;
        }
        var aid,sid;
        aid = shareVariable.aid;
        sid = shareVariable.sid;
        suffix = shareVariable.suffix;
        $.getJSON('/index/ajax/digg?action=like&sid='+sid+'&aid='+aid+'&contentid='+contentid+'&callback=?', function(response){
            if(response.data > 0) {
                t.done[contentid] = true;
                $('#'+obj).attr("class","digged");
                $('#'+obj).html($('#'+obj).html().replace(/点赞 \d+/, '已赞 ' + response.data));
                $(document.body).append('<img src="'+TJ+'?action=like&sid='+sid+'&aid='+aid+'&cid=' + contentid + '" style="display:none" />')
            } else {
                $('#'+obj).attr("class","digg");
                return ;
            }
        });
    }
}
$(function(){
  digg.init();
})

//内容页点击下一页后的js效果
$(function(){
    var url = document.URL;
    if(url.indexOf('page') > 0){
        var height = $('.header').height();
        $(document).scrollTop(height);
    }
});

// 发长微博
$(function() {
    var dialog, template;
    dialog = new Kdialog({
        width: 480,
        hasCloseIco: false,
        hasOverlay: true
    });
    template = function (string, data) {
        return string.replace(/\{\{(\w+)\}\}/g, function (string, key) {
            return data[key];
        });
    };
    window.longWeibo = function (contentid) {
        var html = $('#longweibo-template').html();
        dialog.open({
            html: html,
            height: 500
        });
        $.getJSON('/index/ajax/longweibo?contentid='+contentid+'&callback=?', function(response){
           $('.lw-dialog').find('img').removeClass('loading').css('margin-left', '0px').css('margin-top', '0px').attr('src', response.src);
            var html = $('#longweibo-template').html(),
                img = document.createElement('img');
            img.onload  = function () {
                html = template(html, {src: response.src});
                picsrc = response.src;
                dialog.open({
                    html: html,
                    height: 500
                });
            };
            img.src = response.src;
        }).error(function (err) {
            console.log('err', err);
        });
    };
    window.longWeiboSina = function (title,id) {
        window.open ('/index/ajax/longweibosina?title='+ title + '&url='+ picsrc + '&contentid=' + id,
            'newwindow', 'height=400, width=600, top=100,left=100');
    };
    window.longWeiboTencent = function (title) {
        window.open ('/index/ajax/longweibotencent?title='+title+'&url='+picsrc,
            'newwindow', 'height=400, width=600, top=100,left=100');
    };
});
var l = 0;
var loadintval = setInterval(function(){
    l += 10;
    if(l < $(window).width()*0.95){    
        $('.loader').width(l);
    }
},1);
window.onload=function(){ 
    clearInterval(loadintval);
    $('.loader').width($(window).width());
    setTimeout(function(){
        $('.loader').hide();
    },30);
}

$(function(){
    $(".backToTop").goToTop();
    $(window).bind('scroll resize',function(){
        $(".backToTop").goToTop({
            pageWidth:960,
            duration:400
        });
    });

    $('.digg').add($('.weibo')).corner("30px");
});