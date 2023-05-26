var videoPlug_s = {
    main: false,
    flash: false
};

(function (videoPlug_s) {
    _watch(videoPlug_s, "main");
    _watch(videoPlug_s, "flash");
    if (typeof Promise == 'undefined') {
        var scriptObj = document.createElement('script');
        scriptObj.type = "text/javascript";
        scriptObj.src = "https://cdn.bootcdn.net/ajax/libs/es6-promise/4.1.1/es6-promise.auto.min.js";
        var headObj = document.getElementsByTagName('head')[0];
        headObj.appendChild(scriptObj);
        scriptObj.onload = function () {
            hwwVideoPlugin();
        }
    } else {
        hwwVideoPlugin();
    }
    function hwwVideoPlugin() {
        _include_css('http://statics.haiwainet.cn/tpl2020/2020-05-14/videojs/css/video-js.min.css');
        _include_js('http://statics.haiwainet.cn/tpl2020/2020-05-14/videojs/script/videojs/video.min.js').then(function (response) {
            _include_js('http://statics.haiwainet.cn/tpl2020/2020-05-14/videojs/script/videojs/videojs-ie8.min.js').then(function (response) {
            });
            // handle success 
            videoPlug_s.setAttr("main", true);
            _include_js('http://statics.haiwainet.cn/tpl2020/2020-05-14/videojs/script/videojs/videojs-flash.js').then(function (response) {
                videoPlug_s.setAttr("flash", true);
            });
            console.log("插件引入成功");
        })
            .catch(function (error) {
                // handle error
                console.log("videojs引入失败:", error);
            })
        // .finally(function () {

        //     console.log("插件引入完毕");

        // });
    }
    function _include_js(path) {
        return new Promise(function (resolve, reject) {
            var sobj = document.createElement('script');
            sobj.type = "text/javascript";
            sobj.src = path;
            var headobj = document.getElementsByTagName('head')[0];
            headobj.appendChild(sobj);
            sobj.onload = function () {
                resolve();
            }
        })
    }

    function _include_css(path) {
        return new Promise(function (resolve, reject) {
            var fileref = document.createElement("link")
            fileref.rel = "stylesheet";
            fileref.type = "text/css";
            fileref.href = path;
            var headobj = document.getElementsByTagName('head')[0];
            headobj.appendChild(fileref);
        });
    }
})(videoPlug_s);

//正式
function createVideo(videos) {
    this.videosOptions = videos;
    //启动
    if (!videoPlug_s.main) {

        _watch(videoPlug_s, "main", function (obj) {
            if (obj.main == true) {
                init(videos);
            }
        });
    } else {
        init();
    }
    //启动函数
    function init() {
        var _self = this;
        for (var i = 0; i < this.videosOptions.length; i++) {
            switch (true) {
                //vms下获取mp4资源
                case _self.videosOptions[i].type == "vms" && _self.videosOptions[i].sourceType == "video/mp4":
                    vmsGetMP4(_self.videosOptions[i].videoSrc, i);
                    _watch(_self.videosOptions[i], "videoSrc", mp4VMS);
                    break;
                case _self.videosOptions[i].type == "rtmp" && videoPlug_s.flash == false:
                    var t = i;
                    _watch(videoPlug_s, "flash", function () { _self.videosOptions[t].videoPlayer = creatDom(_self.videosOptions[t]) });
                    break;
                default: this.videosOptions[i].videoPlayer = creatDom(_self.videosOptions[i]);
            }
        }
    }
    //vms mp4 获取后📛地址后处理
    function mp4VMS(obj) {
        switch (true) {
            case obj.videoSrc.indexOf(".mp4") != -1: obj.videoPlayer = creatDom(obj);
                break;
            case obj.videoSrc.indexOf(".mov") != -1: obj.sourceType = "video/flv"; obj.videoPlayer = creatDom(obj);
                break;
        }
        // if (obj.videoSrc.indexOf(".mp4") != -1) {
        //     obj.videoPlayer = creatDom(obj);
        // } else {
        //     //获取资源错误处理
        // }
    }
    //检测浏览器属性
    function evCheck() {
        var ev = {};
        var browser = {
            versions: function () {
                var u = navigator.userAgent, app = navigator.appVersion;
                return {//移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        }
        if (browser.versions.iPhone || browser.versions.iPad || browser.versions.android) {
            ev.terminal = "wap";
        } else {
            ev.terminal = "PC"
        }
        browser.versions.iPhone ? ev.iPhone = true : ev.iPhone = false;
        return ev;
    }
    //从vms系统获取mp4
    function vmsGetMP4(id, i) {
        _jsonp("http://tvplayer.people.com.cn/getXMLForHW.php?path=" + id)
            .then(function (response) {
                // handle success
                this.videosOptions[i].setAttr("videoSrc", response);
            })
            .catch(function (error) {
                // handle error
                console.log("vms资源出错,请核实📛是否生成。", error);
            })
        // .finally(function () {
        //     console.log("vms 还活着！");
        // });
    }

    //creat video Dom
    function creatDom(opt) {
        var ev = evCheck();
        var video = document.createElement("VIDEO");
        var videoBox = document.getElementById(opt.el);
        // var size =
        //   "width:" +
        //   videoBox.clientWidth +
        //   "px; height : " +
        //   videoBox.clientHeight +
        //   "px ;";
        var size = "width:100%; height : 100%;";
        var flash=false;
        video.className = "hwwvideo video-js vjs-big-play-centered";
        if (document.getElementById(opt.el + "_video")) {
            return;
        } else {
            videoBox.appendChild(video);
        }


        // 各种属性的一批 
        video.setAttribute("id", opt.el + "_video");
        video.setAttribute("style", size);
        if (ev.iPhone) {
            video.setAttribute("webkit-playsinline", true);
            video.setAttribute("playsinline", true);
        }
        if (opt.type == "rtmp" || opt.videoSrc.indexOf(".mov") != -1){
            flash=true;
        }
        var finalOption = {
            techOrder: flash? ["flash","html5"] : ["html5"],
            autoplay: opt.type == "hls"? true:false,
            controls: true,
            language: 'zh-CN',
            poster: opt.poster,
            muted: (ev.terminal == "wap") ? true : false,
            sources: [ // 视频源
                {
                    src: opt.videoSrc,
                    type: opt.sourceType,
                    // poster: opt.poster
                }
            ],
            controlBar: { // 设置控制条组件
                /* 设置控制条里面组件的相关属性及显示与否*/
                'currentTimeDisplay': true,
                'timeDivider': true,
                'durationDisplay': true,
                'remainingTimeDisplay': false,
                volumePanel: {
                    inline: true,
                },
                /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
                // children: [
                //   {name: 'progressControl'}, // 播放进度条
                //   {name: 'playToggle'}, // 播放按钮
                //   {name: 'currentTimeDisplay'}, // 当前已播放时间
                //   {name:'timeDivider'},
                //   {name: 'durationDisplay'}, // 总时间
                //   {
                //     name: 'volumePanel', // 音量控制
                //     inline: false, // 不使用水平方式
                //   },
                //   {name: 'FullscreenToggle'} // 全屏
                // ]
            },
        };
        var videoObj = videojs(opt.el + "_video", finalOption, function () {
            var _self = this;
            console.log(this);
            this.on('error', function () {
                _self.errorDisplay.close();   //将错误信息不显示
                console.log(_self.error);
            });
            this.on('touchstart', function () {
                console.log("点我了");
                _self.paused() ? _self.play() : _self.pause();
            })
            this.on('click', function () {
                console.log("鼠我了");

            })
        });
        return videoObj
    }
    //get jsonp 方法
    function _jsonp(url) {
        if (!url) {
            console.error("Axios.JSONP 至少需要一个url参数!");
            return;
        }
        return new Promise(function (resolve, reject) {
            var str =
                "haiwai_jsonp_" +
                Math.floor(Math.random() * 100) +
                new Date().getTime();

            window[str] = function (result) {
                resolve(result);
            };
            var JSONP = document.createElement("script");
            JSONP.type = "text/javascript";
            JSONP.src = url + "&callback=" + str;
            document.getElementsByTagName("head")[0].appendChild(JSONP);
        });
    }


}
//监听属性变化
function _watch(obj, attr, callback) {
    if (typeof obj.defaultValues == "undefined") {
        obj.defaultValues = {};
        for (var p in obj) {
            if (typeof obj[p] !== "object") obj.defaultValues[p] = obj[p];
        }
    }
    if (typeof obj.setAttr != "undefined") {
        delete obj.setAttr
    }
    obj.setAttr = function (attr, value) {
        if (this[attr] != value) {
            this.defaultValues[attr] = this[attr];
            this[attr] = value;
            if (typeof callback === "function") {
                return callback(this);
            }
        }
        return this;
    };
}


