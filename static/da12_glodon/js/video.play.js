/**
 * Created by huyp on 2018/9/4.
 */

/**
 * 根据视频ID获取对应的视频链接
 * @param video_id
 * @returns {string}
 */
function getPlayUrl(video_id) {
    var play_url = "";
    $.ajax({
        url: "/home/Index/getPlayUrl",
        data: {'video_id': video_id},
        type: 'post',
        async: false,
        success: function (res) {
            res = $.parseJSON(res);
            if (res.status) {
                play_url = res.data;
            }
        },
    });
    return play_url;
}

/**
 * 阿里视频播放
 * @param video_id
 * @param playurl
 */
function vplayer(playurl, play_container_id,useH5Prism,useFlashPrism,autoplay,cover,height) {
    if(!useH5Prism){
        useH5Prism = false;
    }
    if(!useFlashPrism){
        useFlashPrism = false;
    }
    if(!autoplay){
        autoplay = false;
    }
    if(cover){
        cover = cover;
    }else{
        cover = '';
    }
    if(height){
        height = height;
    }else{
        height = '360px';
    }
    var player = new Aliplayer({
            "id": play_container_id,
            "source":playurl,
            //播放方式二：点播用户推荐
            //"vid":video_id,
            // "playauth": playauth,
            "width": "100%",
            "height": height,
            "autoplay": autoplay,
            "isLive": false,
            "rePlay": false,
            "playsinline": true,
            "cover": cover,
            "preload": autoplay,
            "controlBarVisibility": "hover",
            "useH5Prism": useH5Prism,
            "useFlashPrism": useFlashPrism,
            "skinLayout": [
                {
                    "name": "bigPlayButton",
                    "align": "cc",
                },
                {
                    "name": "H5Loading",
                    "align": "cc"
                },
                {
                    "name": "tooltip",
                    "align": "blabs",
                    "x": 0,
                    "y": 56
                },
                {
                    "name": "thumbnail"
                },
                {
                    "name": "controlBar",
                    "align": "blabs",
                    "x": 0,
                    "y": 0,
                    "children": [
                        {
                            "name": "progress",
                            "align": "blabs",
                            "x": 0,
                            "y": 44
                        },
                        {
                            "name": "playButton",
                            "align": "tl",
                            "x": 15,
                            "y": 12
                        },
                        {
                            "name": "timeDisplay",
                            "align": "tl",
                            "x": 10,
                            "y": 7
                        },
                        {
                            "name": "fullScreenButton",
                            "align": "tr",
                            "x": 10,
                            "y": 12
                        },
                        {
                            "name": "setting",
                            "align": "tr",
                            "x": 15,
                            "y": 12
                        },
                        {
                            "name": "volume",
                            "align": "tr",
                            "x": 5,
                            "y": 10
                        }
                    ]
                }
            ]

        }, function (player) {
            console.log("播放器创建了。");
        }
    );
};
