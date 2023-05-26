var player;
$(function () {
    if (location.href.indexOf('?sign=') > -1) {
        /* 兼容防盗链参数 */
        location.href = location.href.replace('?sign=', '&sign=');
    }
    if (location.href.indexOf('&sign=') > -1) {
        var videoSign = UrlParm.parm("sign") || "";
        var signT = UrlParm.parm("t") || "";
    }
    var videoLink = UrlParm.parm("videosrc") || "";
    var imgLink = UrlParm.parm("imgUrl") || "";
    var live = UrlParm.parm("live") || "";
    var logo = UrlParm.parm("logo") || "";
    var leftLogo = UrlParm.parm("leftlogo") || "";
    videoLink = !!~videoLink.indexOf('http://live.dahe.cn') ? videoLink.replace('http://live.dahe.cn', 'https://live.dahe.cn') : videoLink;
    if (videoSign) {
        videoLink += '?sign=' + videoSign + '&t=' + signT;
    }
    var videoObject = {
        container: '.video', //“#”代表容器的ID，“.”或“”代表容器的class
        variable: 'player', //该属性必需设置，值等于下面的new chplayer()的对象
        autoplay: false, //自动播放
        live: live,
        // html5m3u8: true,
        video: videoLink, //视频地址
        poster: imgLink
    };
    if (IEVersion() !== -1 && !~['edge', 11].indexOf(IEVersion())) {
        player = new ckplayer(videoObject);
    } else {
        var html =
            '<video id="safari" webkit-playsinline class="video-js vjs-default-skin vjs-big-play-centered" controls x5-playsinline="" playsinline="" webkit-playsinline="">' +
            '<source src="' + videoLink + '">' +
            '<source src="' + videoLink + '" type="application/x-mpegURL">' +
            '</video>';
        document.getElementById("video").innerHTML = html;
        player = videojs('safari', {
            controlBar: true,
            nativeControlsForTouch: false,
            poster: imgLink
        });
    }
    if (logo === "true") {
        $('#mLogo').css("display", "block");
    }
    if (leftLogo) {
        var leftLogoHtml = '<img src="' + leftLogo + '">';
        $('#leftLogo').html(leftLogoHtml);
    }
})
window.addEventListener('message', function (event) {
    if (player[event.data]) {
        player[event.data]();
    }
})