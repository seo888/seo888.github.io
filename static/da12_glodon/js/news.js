/**
 * Created by huyp on 2018/9/7.
 */


$(function () {

    //遍历video标签判定是否是阿里云的播放方式，如果是进行替换
    var is_mobile = initIsMobile();
    $("video").each(function (i) {
        var index = i+1;
        var play_video_id = $(this).attr('play_video_id');

        if (!is_mobile && initIsIE8()) {
            var url = $(this).attr('src');
            var ext = url.substr(url.lastIndexOf('.') + 1);
            var show_html = '<embed width="640px" height="360px" src="' + url + '" type="video/' + ext + '" ' +
                    'allowfullscreen="true" allowscriptaccess="never" play_video_id="" menu="false" loop="false" play="true" wmode="transparent"/>'
            $(this).after(show_html);
            $(this).remove();
            return;
        }

        //不是ie8 解析视频播放 如果是阿里云的视频则重新调用方法
        var play_video_height = "360px";
        if (play_video_id != "" && !initIsIE8()) {
            var play_url = getPlayUrl(play_video_id);
            if (!is_mobile ) {
                var show_html = "<div id='play_con_"+index+"' style='width: 640px;height: 360px;;margin-left: auto;margin-right: auto;'></div>";
            } else {
                //手机端
                var show_html = "<div id='play_con_"+index+"' style='max-width: 100%;'></div>";
                play_video_height = "200px";
            }
            $(this).after(show_html);
            $(this).remove();


            vplayer(play_url, "play_con_"+index,initUseH5Prism(),initUseFlashPrism(),false,'',play_video_height);
            if(is_mobile) {
                $(this).height("auto");
            }
        }
    });
});
