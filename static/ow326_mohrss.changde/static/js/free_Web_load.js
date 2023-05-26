/*
无障碍浏览插件
编写：阿宝
QQ:22420466
中国石门政府网站
*/

jQuery.fn.extend({
    removeCss: function (cssName) {
        return this.each(function () {
            var curDom = $(this);
            jQuery.grep(cssName.split(","),
                function (cssToBeRemoved) {
                    curDom.css(cssToBeRemoved, '');
                });
            return curDom;
        });
    }
});

function InitTTSConfig() {
    var result = false;
    var request = new XMLHttpRequest();
    request.open('get', '/free_Web/TTSConfig.json', false);
    request.send(null);
    if (request.status == 200) {
        var json = JSON.parse(request.responseText);
        result = json.EnableTTS;
    }

    return result;
}

var free_Web = new Object();
free_Web.IsInsideLabel = false; //是否插入标签
free_Web.tool_Box = new Object();
free_Web.tool_Box_sub = new Object();
free_Web.Function = new Object();
free_Web.enableTTS = InitTTSConfig();
// 调用方法之前判断方法是否可执行
free_Web.Function.invokeFunction = function (fn) {
    if ($.isFunction(fn)) {
        return fn.apply(null, Array.prototype.slice.call(arguments, 1));
    }
};
free_Web.Function.help = {
    id: "Br_help",
    fun: "/free_Web/help.htm",
    title: "无障碍浏览使用帮助",
    minTitle: "帮助",
    img: "Br_help.png",
    mp3: "Br_help.mp3",
    toolhtml: function () {
        s = "<ul>";
        s += "<li><a id='" +
            this.id +
            "' href='" +
            this.fun +
            "' title='" +
            this.title +
            "' target='_blank'><img src='/free_Web/images/" +
            this.img +
            "'></a><p>" +
            this.minTitle +
            "</p></li>";
        s += "</ul>";
        return $(s);
    }
};
free_Web.Function.show = {
    Config: {
        id: "Br_close",
        img: "close.png",
        title: "开启无障碍浏览",
        minTitle: "关闭",
        closetitle: "关闭无障碍浏览",
        fun: "javascript:free_Web.Function.show.Start();",
        key: "Ctrl+Alt+B",
        keycode: 79

    },
    toolhtml: function () {
        s = "<ul>";
        s += "<li><a id='" +
            this.Config.id +
            "' href='" +
            this.Config.fun +
            "' title='" +
            this.Config.closetitle +
            "（" +
            this.Config.key +
            "）'><img src='/free_Web/images/" +
            this.Config.img +
            "'></a><p>" +
            this.Config.minTitle +
            "</p></li>";
        s += "</ul>";
        return $(s);
    },
    cookieName: "free_Web_status",
    clear: function () {
        free_Web.cookie.setCookie(this.cookieName, 0);
        free_Web.Function.installBox.remove();
        this.status = false;

    },
    cookieMethod: function () {
        if (free_Web.cookie.getCookie(this.cookieName) == 1) {
            free_Web.Function.installBox.Isinstall(true);
            this.status = true;
            free_Web.Function.Read.Start();
        }; // s();
    },
    status: false,
    IsIsinstall: false,
    Start: function () {
        if (!this.status) {
            free_Web.cookie.setCookie(this.cookieName, 1);
            if (!this.IsIsinstall) {
                free_Web.Function.installBox.Isinstall();
            } else {
                free_Web.Function.audioplay.audio("您已开启无障碍浏览功能");
            }
            this.status = true;
            $("#Browser_head").html("关闭无障碍浏览");

        } else {
            free_Web.Function.installBox.remove();
            this.status = false;
            free_Web.cookie.setCookie(this.cookieName, 0);
            $("#Browser_head").html("无障碍浏览");
            free_Web.Function.audioplay.play("/free_Web/mp3/show_close.mp3");
            free_Web.Function.clear();

        }
        //this.show();

        free_Web.Function.Read.Start();
    }
};
free_Web.Function.installBox = {
    box: "free_Web_box",
    Isinstall: function (isOnPageLoading) {
        if (!free_Web.Function.show.status) {
            var first = $(document.body).children(":first");
            free_Web.tool_Box_sub = $("<div id='" + this.box + "_sub'></div>").insertBefore(first);
            free_Web.tool_Box = $("<div id='" + this.box + "'></div>").appendTo(document.body);
            var Ttool_Box = $("<div class='free_Web_tool'><div>").appendTo(free_Web.tool_Box);
            free_Web.Function.audioplay.load(isOnPageLoading);
            $("<ul><li><a id='Br_BarTitle'><img src='/free_Web/images/Br_BarTitle.png' /></a></li></ul>")
                .appendTo(Ttool_Box);
            free_Web.Function.pageZoom.toolhtml().appendTo(Ttool_Box);
            free_Web.Function.FontZoom.toolhtml().appendTo(Ttool_Box);
            //free_Web.Function.textMode.toolhtml().appendTo(Ttool_Box);
            free_Web.Function.Br_ChangBg.toolhtml().appendTo(Ttool_Box);
            free_Web.Function.guides.toolhtml().appendTo(Ttool_Box);
            free_Web.Function.Fping.toolhtml().appendTo(Ttool_Box);
            free_Web.Function.Read.toolhtml().appendTo(Ttool_Box);
            free_Web.Function.ReadArea.toolhtml().appendTo(Ttool_Box);

            free_Web.Function.show.toolhtml().appendTo(Ttool_Box);
            free_Web.Function.help.toolhtml().appendTo(Ttool_Box);
            free_Web.tool_Box_sub.slideDown(500);
            free_Web.tool_Box.slideDown(500);
            this.IsIsinstall = true;
        }
    },
    remove: function () {
        if (free_Web.Function.show.status) {
            free_Web.tool_Box_sub.slideUp(500);
            free_Web.tool_Box.slideUp(500);
            free_Web.tool_Box_sub.remove();
            free_Web.tool_Box.remove();
        }
    }
};
free_Web.Function.InsideLabel = {
    init: function () {
        var ROOT = document.getElementsByTagName("body")[0];
        for (var i = 0; i < ROOT.childNodes.length; i++) {
            try {
                this.nodeText(ROOT.childNodes[i]);
            } catch (o) {
            }
        }
        try {
            //段落内的文本加上Label
            $("voice.Shimen-Pointer-Label").each(function (index, ele) {
                var reg = /([，|；|。|？|！])/g;
                $(this).get(0).outerHTML = ($(this).get(0).outerHTML.replace(
                    /([^，；。>]+)([，；。])([^，；。<]+)/gim,
                    "$1</voice>$2<voice class='Shimen-Pointer-Label'>$3"
                ));
            });
        } catch (o) {
        }
        free_Web.IsInsideLabel = true;
    },
    nodeText: function (obj) {
        if (obj.id == "browser_audiobox") {
            return;
        }
        if (obj.id == "free_Web_box") {
            return;
        }
        if (obj.nodeName.toLowerCase() == "script" || obj.nodeName.toLowerCase() == "style") {
            return;
        }
        if ((' ' + obj.className + ' ').indexOf(' videoPlayer ') > -1) {
            return;
        }
        for (var i = 0; i < obj.childNodes.length; i++) {
            try {

                if (obj.childNodes[i].hasChildNodes()) {
                    this.nodeText(obj.childNodes[i]);
                }
                if (obj.childNodes[i].nodeType == 3 && !/^\s+$/.test(obj.childNodes[i].nodeValue)) {
                    var tempHTML = document.createElement("voice");
                    tempHTML.className = "Shimen-Pointer-Label";
                    tempHTML.innerHTML = obj.childNodes[i].nodeValue;
                    obj.replaceChild(tempHTML, obj.childNodes[i]);
                }
                // 图片类型识别。
                if (
                    obj.childNodes[i].nodeType == 1 &&
                    obj.childNodes[i].nodeName === "IMG"
                ) {
                    if (
                        obj.childNodes[i].alt != "" ||
                        obj.childNodes[i].parentElement.nodeName == "A" ||
                        obj.childNodes[i].title != ""
                    ) {
                        $(obj.childNodes[i]).addClass(
                            "IMG-Shimen-Pointer-Label"
                        );
                    }
                }

                // 视频类型识别。
                if (
                    obj.childNodes[i].nodeType == 1 &&
                    obj.childNodes[i].nodeName === "VIDEO"
                ) {
                    $(obj.childNodes[i]).addClass("VIDEO-Shimen-Pointer-Label");
                }

                // 音频类型识别。
                if (
                    obj.childNodes[i].nodeType == 1 &&
                    obj.childNodes[i].nodeName === "AUDIO"
                ) {
                    $(obj.childNodes[i]).addClass("AUDIO-Shimen-Pointer-Label");
                }

                //Input类型识别。
                if (
                    obj.childNodes[i].nodeType == 1 &&
                    obj.childNodes[i].nodeName === "INPUT"
                ) {
                    $(obj.childNodes[i]).addClass("INPUT-Shimen-Pointer-Label");
                }

                // SELECT类型识别。
                if (
                    obj.childNodes[i].nodeType == 1 &&
                    obj.childNodes[i].nodeName === "SELECT"
                ) {
                    $(obj.childNodes[i]).addClass(
                        "SELECT-Shimen-Pointer-Label"
                    );
                }
            } catch (o) { }
        }
    },
    claer: function () {
        //document.body.outerHTML = document.body.outerHTML.replace(/<\/voice>/g, "");

    }
};
free_Web.Function.clear = function () {
    free_Web.Function.show.clear();
    free_Web.Function.pageZoom.clear();
    free_Web.Function.FontZoom.clear();
    free_Web.Function.Br_ChangBg.clear();
    free_Web.Function.Fping.clear();
    free_Web.Function.Read.clear();
    free_Web.Function.ReadArea.clear();
    free_Web.Function.ReadCon.clear();
    free_Web.Function.guides.clear();
    free_Web.Function.audioplay.beforeNewPlayer();
    if (free_Web.Function.textMode.status) {
        window.location.reload();
    }
};

free_Web.Function.audioplay = {
    speed: 1,
    VolumeNum: 100,
    audioBox: null,
    IsMute: false,
    isSectionPlayed: true,
    turl: 'https://tts.powereasy.net/ServicesManagement/home/index',
    playingUrl: '', // 当前播放的url，为了防止多个语音同时播放
    continueLongText: void (0), // 保存播放长文本的回调，防止打开其他开关触发语言操作之后当前的播放停止
    load: function (isMutedLoadingPrompt) {
        soundManager.useFastPolling = true;
        soundManager.onready(function (b) {
            if (!b.success) {
                return false;
            } else if (!isMutedLoadingPrompt) {
                free_Web.Function.audioplay.audio("您已开启无障碍浏览功能");
            }
        });

    },
    stopAll: function () {
        soundManager.stopAll();
        this.isSectionPlayed = true;
    },
    pauseAll: function () {
        soundManager.pauseAll();
    },
    resumeAll: function () {
        soundManager.resumeAll();
    },
    audio: function (zhText, finishedCallback, current, strs) {
        if (!free_Web.enableTTS) {
            return false;
        }
        this.stopAll();
        var url = window.location.href;
        var Turl = this.turl + '?text=' + encodeURI(zhText) + '&speed=' + this.speed + '&sourceUrl=' + url;
        this.play(Turl, finishedCallback, current, strs, this.turl, this.speed);
        this.playingUrl = Turl;
    },
    play: function (url, finishedCallback, current, strs, turlValue, speedValue) {
        if (!free_Web.enableTTS) {
            return false;
        }
        this.stopAll();
        var id = 'Shimen_gov_vioce' + this.r(),
            _audioplay = this;
        this.audioBox = soundManager.createSound({
            id: id,
            url: url,
            autoLoad: true,
            autoPlay: false,
            onload: function () {
                if (_audioplay.playingUrl === url) {
                    this.play();
                }
            },
            onfinish: function () {
                this.destruct();
                _audioplay.isSectionPlayed = true;
                free_Web.Function.invokeFunction(finishedCallback);
                free_Web.Function.invokeFunction(_audioplay.continueLongText);
            },
            onplay: function () {
                if (strs != undefined && current != undefined && current < strs.length - 1) {
                    setTimeout(function () {
                        $.ajax({
                            type: 'get',
                            url: turlValue + '?text=' + strs[current + 1] + '&speed=' + speedValue + '&isLoad=' + true + '&sourceUrl=' + window.location.href,
                            dataType: 'json',
                            xhrFields: {
                                withCredentials: true
                            },
                            crossDomain: true
                        });
                    }, 1000);
                }
            },
            volume: this.VolumeNum
        });
        if (free_Web.Function.audioplay.IsMute) {
            this.audioBox.mute();
        } else {
            this.audioBox.unmute();
        };

    },
    playLongText: function (str, progressCallback, finishedCallback) {
        if (!free_Web.enableTTS) {
            return false;
        }

        str = str.trim();
        str = str.replaceAll('&nbsp;', '');
        str = str.replace(/\s*/g, "");
        this.stopAll();
        if (!str) {
            setTimeout(function () {
                free_Web.Function.invokeFunction(finishedCallback);
            },
                100);
            return 0;
        }
        if (str.length <= 100) {
            this.audio(str, finishedCallback);
            return 1;
        }

        var strs = [],
            current = 0,
            index = 1,
            contentIndex = 0,
            _player = this;

        strs[0] = "开始播放无障碍语音";

        // 先按100个字符分隔，在判断最后一个字符是否是以下符号，是则通过，不是则读这一百个字内最后的符号位置，按符号分隔转语音，
        // 不包含符号的一部分则列入下一次计算中。
        // 如果都没有符号，则走原流程，不做分隔处理，直接转语音。
        while (true) {
            var content = str.substring(contentIndex, contentIndex + 101);
            if (contentIndex >= str.length - 1) {
                break;
            }

            if (content[content.length - 1] == '，' || content[content.length - 1] == '。' || content[content.length - 1] == '；' || content[content.length - 1] == '!' || content[content.length - 1] == '？' || content[content.length - 1] == '、') {
                strs[index] = content;
                index++;
                contentIndex += content.length;
            } else {
                var lastIndexA = content.lastIndexOf('，');
                var lastIndexB = content.lastIndexOf('。');
                var lastIndexC = content.lastIndexOf('；');
                var lastIndexD = content.lastIndexOf('！');
                var lastIndexE = content.lastIndexOf('？');
                var lastIndexF = content.lastIndexOf('、');

                var lastIndex = lastIndexA;
                if (lastIndex < lastIndexB) {
                    lastIndex = lastIndexB;
                }
                if (lastIndex < lastIndexC) {
                    lastIndex = lastIndexC;
                }
                if (lastIndex < lastIndexD) {
                    lastIndex = lastIndexD;
                }
                if (lastIndex < lastIndexE) {
                    lastIndex = lastIndexE;
                }
                if (lastIndex < lastIndexF) {
                    lastIndex = lastIndexF;
                }

                var surplusIndex = content.length - 1 - lastIndex;
                if (lastIndex == -1) {
                    surplusIndex = 0;
                    lastIndex = content.length;
                }

                strs[index] = content.substring(0, lastIndex + 1);
                index++;
                contentIndex += content.length - surplusIndex;
            }
        }



        var playListLength = strs.length;
        _player.continueLongText = continueNextSection;
        _player.audio(strs[current], afterPlay, current, strs);

        return playListLength;

        function afterPlay() {
            current++;
            progressCallback(current, playListLength);
            if (current >= playListLength) {
                free_Web.Function.invokeFunction(finishedCallback);
            }
        }

        function continueNextSection() {
            _player.isSectionPlayed = false;
            if (current >= playListLength) {
                _player.continueLongText = void (0);
            } else {
                _player.audio(strs[current], afterPlay, current, strs);
            }
        }
    },
    audioCon: function (zhText) {
        this.stopAll();
        var url = window.location.href;
        var Turl = this.turl + '?text=' + encodeURI(zhText) + '&speed=' + this.speed + '&sourceUrl=' + url;
        this.playCon(Turl);
        this.playingUrl = Turl;
    },
    playCon: function (url) {
        if (!free_Web.enableTTS) {
            return false;
        }
        this.stopAll();
        var id = 'Shimen_gov_vioce' + this.r();
        var self = this;
        this.audioBox = soundManager.createSound({
            id: id,
            url: url,
            autoLoad: true,
            autoPlay: false,
            onload: function () {
                if (self.playingUrl === url) {
                    this.play();
                }
            },
            onfinish: function () {
                this.destruct();
                free_Web.Function.ReadCon.ReadNext();
            },
            volume: this.VolumeNum
        });
        if (free_Web.Function.audioplay.IsMute) {
            this.audioBox.mute();
        } else {
            this.audioBox.unmute();
        };
    },
    Mute: function () {
        free_Web.Function.audioplay.IsMute = true;
        this.audioBox.mute(); //静音
    },
    UnMute: function () {
        free_Web.Function.audioplay.IsMute = false;
        this.audioBox.unmute(); //取消静音();
    },
    Volume: function (vol) {
        this.VolumeNum = vol;
        this.audioBox.setVolume(this.VolumeNum);

    },
    r: function r() {
        return Math.round(2147483647 * (Math.random() || .5)) * +new Date % 1E10;
    },
    beforeNewPlayer: function () {
        // 因为播放组件是共享的，一次只有一个播放组件在工作。

        // 当开启一个新的播放组件的时候，需要设置其他的播放组件状态为关闭的。
        $('.power-content_voice .power-content_voice-start').removeClass('disabled');
        $('.power-content_voice .power-content_voice-stop').addClass('disabled');
        $('.power-content_voice progress').attr('value', 0);

        // 关闭正文阅读操作
        free_Web.Function.audioplay.continueLongText = void (0);
        // 关闭连续指读
        free_Web.Function.ReadCon.clear();
        // 关闭指读
        free_Web.Function.Read.clear();
    }
};

//cookie----------------------------------
free_Web.cookie = new Object();
free_Web.cookie.setCookie = function (cookieName, cookieValue) {
    if (cookieName == undefined || cookieValue == undefined) {
        return;
    }
    document.cookie = cookieName + "=" + escape(cookieValue) + ";";
};
free_Web.cookie.getCookie = function (name) {
    if (name == undefined) {
        return;
    }
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
        return unescape(arr[2]);
    }
    return null;
};

document.write('<script src="/free_Web/pinyin.js" type="text/javascript"></script>');
document.write('<script src="/free_Web/free_Web_page.js?i=4" type="text/javascript"></script>');
document.write('<script src="/free_Web/free_Web_FPing.js?i=4" type="text/javascript"></script>');
document.write('<script src="/free_Web/free_Web_ReadArea.js?i=4" type="text/javascript"></script>');
document.write('<script src="/free_Web/browserRead.js?i=6" type="text/javascript"></script>');
document.write('<script src="/free_Web/browserKeys.js" type="text/javascript"></script>');

$(document).ready(function () {
    $(document).click(function (event) {
        if (free_Web.Function.Br_ChangBg.ISItemsShow &&
            event.target.getAttribute("dir") != free_Web.Function.Br_ChangBg.Config.menuBoxid) {
            free_Web.Function.Br_ChangBg.up();
        }
        if (free_Web.Function.guides.ISItemsShow &&
            event.target.getAttribute("dir") != free_Web.Function.guides.Config.tools[1].dir) {
            free_Web.Function.guides.up();
        }
        if (free_Web.Function.Fping.ISItemsShow &&
            event.target.getAttribute("dir") != free_Web.Function.Fping.Config.tools[1].dir) {
            free_Web.Function.Fping.up();
        }
        if (free_Web.Function.VoiceSet.ISItemsShow &&
            event.target.getAttribute("dir") != free_Web.Function.Read.Config.tools[3].dir) {
            free_Web.Function.VoiceSet.up();
        }

    });

    free_Web.Function.show.cookieMethod();
    soundManager.debugMode = false;
    soundManager.url = "/free_Web/swf/";

});

(function () {
    function setContentVoice() {
        var ispause = false;
        $('[data-power-accessible-reading]').each(function (i, n) {
            var $content = $(this),
                $play = $($.parseHTML(
                    '<a href="javascript:;" class="voice-button power-content_voice-start"><button></button></a>')),
                $pause = $($.parseHTML(
                    '<a href="javascript:;" class="voice-button power-content_voice-pause disabled" style="display:none;"><button></button></a>')),
                $stop = $($.parseHTML(
                    '<a href="javascript:;" class="voice-button power-content_voice-stop disabled"><button></button></a>')),
                $progress = $('<progress value="0" max="100" ><ie style="width:0%;"></ie></progress>');
            $content.before($('<div class="power-content_voice" data-power-notprint></div>').append($play)
                .append($pause)
                .append($stop)
                .append($progress));

            function onProgress(current, max) {
                $progress.attr('value', current);
                $progress.find('ie').width(Math.round(current * 100 / max) + '%');
            }

            if (!free_Web.enableTTS) {
                $('.power-content_voice').addClass('hide_tts');
            }

            $(".power-content_voice").on('click',
                'a[class="voice-button power-content_voice-start"]:not(.disabled)',
                function () {
                    // 当前是暂停状态
                    if (ispause) {
                        setUiStateResume();
                        free_Web.Function.audioplay.resumeAll();
                        return;
                    }

                    setUiStatePlay();
                    if (!free_Web.IsInsideLabel) {
                        free_Web.Function.InsideLabel.init();
                    }

                    // 所有段落加上。号结尾。
                    var reg = /<\/?.+?\/?>/g;
                    var htmlContent = $content.html();
                    htmlContent = htmlContent.replaceAll('</br>', '。');
                    htmlContent = htmlContent.replaceAll('<br>', '。');
                    htmlContent = '<div>' + htmlContent + '</div>';
                    var pHtmls = $(htmlContent).find('p');
                    var content = '';
                    if (pHtmls.length > 0) {
                        $.each(pHtmls, function (i, v) {
                            var phtml = v.innerHTML;
                            phtml = phtml.replace('\n', '');
                            phtml = phtml.trim();
                            content += phtml + '。';
                        });
                    } else {
                        content = htmlContent;
                    }

                    content = content.replace(reg, '');

                    // 经过上面的过滤可能会出现以下多余符号，去除多余的符号。
                    content = content.replaceAll('。。。', '。');
                    content = content.replaceAll('。。', '。');

                    var max = free_Web.Function.audioplay.playLongText(
                        content,
                        onProgress,
                        setUiStateStop);
                    $progress.attr('max', max);
                    return false;
                }).on('click',
                    'a[class="voice-button power-content_voice-stop"]:not(.disabled)',
                    function () {
                        setUiStateStop();
                        free_Web.Function.audioplay.stopAll();
                        return false;
                    }).on('click',
                        'a[class="voice-button power-content_voice-pause"]:not(.disabled)',
                        function () {
                            setUiStatePause();
                            free_Web.Function.audioplay.pauseAll();
                            return false;
                        });
            // 开始
            function setUiStatePlay() {
                // 当一个段落在播放的时候，设置正在播放的段落播放状态为关闭
                free_Web.Function.audioplay.beforeNewPlayer();

                $play.addClass('disabled');
                $stop.removeClass('disabled');
                $pause.removeClass('disabled');
                $play.hide();
                $pause.show();
            }

            // 停止
            function setUiStateStop() {
                ispause = false;
                $play.removeClass('disabled');
                $pause.addClass('disabled');
                $stop.addClass('disabled');
                $progress.attr('value', 0);
                $progress.find('ie').width('0%');
                $pause.hide();
                $play.show();
            }

            // 暂停
            function setUiStatePause() {
                ispause = true;
                $play.removeClass('disabled');
                $pause.addClass('disabled');
                $stop.removeClass('disabled');
                $pause.hide();
                $play.show();
            }

            // 继续
            function setUiStateResume() {
                ispause = false;
                $play.addClass('disabled');
                $stop.removeClass('disabled');
                $pause.removeClass('disabled');
                $play.hide();
                $pause.show();
            }
        });
    }

    $(function () {
        setContentVoice();
    });

})();