
// 首先判断有没有播放器，如果有播放器,开始动态创建元素
if ($("a[href$='.mp3']").length != 0) {

    $("a[href$='.mp3']").each(function (index) {
        var musc = "<div class='music' id='music_" + index + "'></div><a style='display:block;' download href='"+$(this).attr('href')+"'>点击下载</a>";
        $("#text_fix").append(musc)

        var player = new window.Music({
            id: "music_" + index,
            width: "100%",
            url: [
                {
                    src: $(this).attr('href'),
                    name: $(this).text(),
                    poster: ""
                }
            ],
            volume: 0.8,
            height: 50
        });

    })
}