$(function(){
    var myForm = $('form');
    myForm.find('button').click(function(){
        if(myForm.find('input[name*="wd"]').val()==null || myForm.find('input[name*="wd"]').val()==''){
            alert("请输入关键字！");
            return false;
        }
    })
})

function articleSpmForward() {
    if(typeof(spm)=='undefined') return false;
    spm.push({
        category: 'event',
        action: 'forward'
    });
}
appid = 'wx7a864cad7a9dc42b';
function articleSpm() {
    var siteID = 'zm5073-001',
    organization = 'zm5073';
    if(typeof(modelid)=='undefined') return false;
    if(modelid!='1') return false;
    $.getScript("https://p.wts.xinwen.cn/dot-wts/spm.js",function(){
        spm.config({
            protocol: 'i',
            siteId: siteID,
            additionalInfo: {
                targetID: contentid,
                organization: organization,
                category: 'event',
                action: 'comeIn'
            }
        });
        $(window).bind('beforeunload', function(){
            spm.push({
                category: 'event',
                action: 'leave'
            });
        });
        $(".tool-digg").click(function(){
            spm.push({
                category: 'event',
                action: 'praise'
            });
        });
    });
}
function shareInfo(vtitle, vurl, vimage, vdescription) {
    return {
        title: typeof(vtitle)!='undefined' && vtitle.length ? vtitle : typeof(title)!='undefined' && title.length ? title : document.title,
        url: typeof(vurl)!='undefined' && vurl.length ? vurl : typeof(url)!='undefined' && url.length ? url : document.location.href.split('#')[0],
        image: $('img.shareimg').length ? $('img.shareimg').attr('src') : typeof(thumb)!='undefined' && thumb.length ? UPLOAD_URL+thumb : $('link[rel="apple-touch-icon"]').attr('href'),
        description: $('meta[name="description"]').attr('content') ? $('meta[name="description"]').attr('content') : document.location.href.split('#')[0]
    }
}
function shareWechat() {
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)!="micromessenger") return;
    if(!appid) return;
    var info = shareInfo();
    var shareinfo = {
        title: info.title,
        desc: info.description.substr(0, 28),
        link: info.url,
        imgUrl: info.image
    };
    $.getScript("http://res.wx.qq.com/open/js/jweixin-1.6.0.js", function() {
        $.getJSON("http://weixin.enshi.cn/index.php?g=Home&m=OpenApi&a=get_jsapi_signature&appid="+appid+"&url="+encodeURIComponent(shareinfo.link)+"&callback=?", function(data){
            wx.config({
                debug: false,
                appId: appid,
                timestamp: data.timestamp,
                nonceStr: data.noncestr,
                signature: data.signature,
                jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
            });
            wx.ready(function() {
                wx.updateAppMessageShareData(shareinfo);
                wx.updateTimelineShareData(shareinfo);
            });
        });
    });
}

function shareDingtalk() {
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/DingTalk/i)!="dingtalk") return;
    var info = shareInfo();
    var dinginfo = {
        type: 0,
        url: info.url,
        content: info.description,
        title: info.title,
        image: info.image,
        onSuccess: function () {},
        onFail: function (err) {}
    };
    $.getScript("https://g.alicdn.com/dingding/open-develop/1.9.0/dingtalk.js", function() {
        dd.ready(function () {
            dd.biz.navigation.setRight({
                show: true,
                control: true,
                onSuccess: function (result) {dd.biz.util.share(dinginfo);},
                onFail: function (err) {}
            });
        });
    });
}

$(function(){
    articleSpm();
    shareWechat();
    shareDingtalk();
});