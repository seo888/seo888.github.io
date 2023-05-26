/*
* 国新网视频播放器
* 应用于ID=2012的模板
* 
*/

var svpalyer20150902 = new Object();

//视频地址
svpalyer20150902.GetVideoUrl = function(name, isrtmp) {
    if (isrtmp) {
        return "rtmp://vod.scio.gov.cn/vod/" + name;
    }
    else {
        return "http://vod.scio.gov.cn:9095/vod/" + name;
    }
};
/*获取处理化的视频地址*/
svpalyer20150902.GetDealedVideoUrl = function(name) {
    var Result = new Array();
    Result[0] = "";
    Result[1] = "";
    try {
        var UrlProtocol = window.location.protocol;
        var Url = UrlProtocol + "//www.scio.gov.cn/FullSearch/ScioVideoUrl.aspx";
        var CurHref = window.location.href;

        if (CurHref.indexOf(UrlProtocol + "//192.168.255.154") > -1) {
            Url = UrlProtocol + "//192.168.255.154/WCCM/Others/ScioVideoUrl.aspx";
        }
        else if (CurHref.indexOf(UrlProtocol + "//192.168.255.156") > -1) {
            Url = UrlProtocol + "//192.168.255.156/WCCM/Others/ScioVideoUrl.aspx";
        }
        else if (CurHref.indexOf(UrlProtocol + "//127.0.0.1") > -1) {
            Url = UrlProtocol + "//127.0.0.1/WCCM65/Others/ScioVideoUrl.aspx";
        }
        else if (CurHref.indexOf(UrlProtocol + "//36.112.137.223:81") > -1
		||CurHref.indexOf(UrlProtocol + "//192.168.255.156") > -1
		||CurHref.indexOf(UrlProtocol + "//192.168.255.194") > -1) {
            Url = UrlProtocol + "//36.112.137.223:81/FullSearch/ScioVideoUrl.aspx";
        }
        else {
            Url = UrlProtocol + "//www.scio.gov.cn/FullSearch/ScioVideoUrl.aspx";
        }
        $.ajaxSetup({ async: false });
        $.get(Url + "?rnd=" + Math.random(), { "VideoName": name }, function(data) {
            var oUrl = eval(data);
            Result[0] = oUrl[0];
            Result[1] = oUrl[1];
        });
    } catch (e) { }
    return Result;
};
svpalyer20150902.FloatVideo2RBCorner = function(containerId, width, height) {
    try {
        var WrapperSelctor = "#" + containerId + "_wrapper";
        var TmpPlaceHolderId = containerId + "_wrapper_tmp";

        var IsHtml5 = false; //是否是html5模式绘制
        if ($(WrapperSelctor).size() == 0) {//flash模式
            var WrapperSelctor = "#" + containerId; //html5模式
            var TmpPlaceHolderId = containerId + "_tmp";
            if ($(WrapperSelctor).size() == 0) return;
            IsHtml5 = true;
        }

        var divCloseBar = TmpPlaceHolderId + "_closebar"; /*关闭图层*/

        var nWidth = parseInt(width, 10);
        var nHeight = parseInt(height, 10);
        if (isNaN(nWidth) || isNaN(nHeight)) return;
        if (nWidth == 0 || nHeight == 0) return;
        if ($(WrapperSelctor).offset().top == 0) return;

        var TopOffset = $(WrapperSelctor).offset().top + nHeight - 50;
        if (TopOffset < 0) return;

        $("html head").append('<style type="text/css">.videofixtocorner{position:fixed !important;right:110px !important;bottom:100px !important;z-index:1000 !important;width:' + nWidth / 2 + 'px !important ;height:' + nHeight / 2 + 'px !important}</style>');
        $("<div id='" + TmpPlaceHolderId + "'></div>").insertBefore(WrapperSelctor).css({ "width": nWidth, "height": nHeight }).hide();

        if (IsHtml5) {
        }
        else {
            $(WrapperSelctor).prepend('<div id="' + divCloseBar + '" style="border:solid 0px red;text-align: right;display:none"><a class="btnClose" href="javascript:void(0)" style="font-weight: bold;color: #000000;font-family: 宋体,serif;" title="关闭窗口">×</a></div>');
            $("#" + divCloseBar + " a.btnClose").click(function() {
                $("#" + TmpPlaceHolderId).hide();
                $(WrapperSelctor).removeClass('videofixtocorner');
                $("#" + TmpPlaceHolderId).attr("manualclose", "on");
            });
        }

        $(window).scroll(function() {
            if ($(document).scrollTop() > TopOffset) {
                if (jwplayer(containerId).getState() != "PLAYING") return;
                if ($("#" + TmpPlaceHolderId).attr("manualclose") == "on") return;
                $(WrapperSelctor).addClass('videofixtocorner');
                $("#" + TmpPlaceHolderId).show();

                if (IsHtml5) {
                    if ($("#" + divCloseBar).size() == 0) {
                        $(WrapperSelctor).prepend('<div id="' + divCloseBar + '" style="border:solid 0px red;text-align: right;display:none;position: absolute; top: -20px; right: 0px;width:100%"><a class="btnClose" href="javascript:void(0)" style="font-weight: bold;color: #000000;font-size: 16px;font-family: 宋体,serif;" title="关闭窗口">×</a></div>');
                        $("#" + divCloseBar + " a.btnClose").click(function() {
                            $("#" + TmpPlaceHolderId).hide();
                            $(WrapperSelctor).removeClass('videofixtocorner');
                            $("#" + TmpPlaceHolderId).attr("manualclose", "on");
                        });
                    }
                    $("#" + divCloseBar).show();
                } else {
                    $("#" + divCloseBar).show();
                }
            } else {
                $("#" + TmpPlaceHolderId).hide();
                $(WrapperSelctor).removeClass('videofixtocorner');
                $("#" + divCloseBar).hide();
                $("#" + TmpPlaceHolderId).removeAttr("manualclose");
            }
        });

    } catch (e) { }
};
//视频分析地址
svpalyer20150902.GetVideoStatisUrl = function(jwplayer, playevent) {
    var Url = "";
    var UrlProtocol = window.location.protocol;
    try {
        Url = UrlProtocol + "//www.scio.gov.cn/VideoStatis/SCIOVideoStatis.aspx"
        Url += "?Position=" + jwplayer.getPosition();
        Url += "&Duration=" + jwplayer.getDuration();
        Url += "&Oldstate=" + playevent.oldstate;
        Url += "&File=" + encodeURI(jwplayer.getPlaylistItem(0).sources[0].file);
    } catch (e) { Url = "about:blank"; }
    return Url;
};
svpalyer20150902.BindOnPlayEvent = function(jwplayer, playevent) {
    try {
        if (typeof (jQuery) == 'undefined') { alert('缺少jquery库。'); return; }
        var url = svpalyer20150902.GetVideoStatisUrl(jwplayer, playevent);
        $.ajax({ url: url, async: true, cache: false }); /*不能采用同步方式，onPlay事件在堵塞时会重复激发*/
    } catch (e) { }
};


svpalyer20150902.CenterVideo = function(containerId) {
    try {
        if (document.getElementById(containerId + "_wrapper")) {
            document.getElementById(containerId + "_wrapper").style.margin = "auto auto"; //居中
        }
        if (document.getElementById(containerId)) {
            document.getElementById(containerId).style.margin = "auto auto"; //居中
        }
    } catch (e) { }
};
/*功能：变换以“embed”形式存在的wmv视频。
* containerId:包容视频的DOM模型的Id
*/
svpalyer20150902.TransformEmbedVideo = function(newname) {
    if (newname == null || newname == "") return;

    var playercoll = document.getElementsByTagName("embed");
    var ElementCount = playercoll.length;
    if (ElementCount == 0) return;

    var VideoElementArray = new Array();
    for (var i = 0; i < ElementCount; i++) {
        VideoElementArray.push(playercoll[i]);
    }

    var VideoNameArray = new Array();
    var tmpArray = newname.split("|");
    for (var i = 0; i < tmpArray.length; i++) {
        if (tmpArray[i] != "") {
            VideoNameArray.push(tmpArray[i]);
        }
    }
    for (var i = 0; i < ElementCount; i++) {
        if (i >= VideoNameArray.length) { //超过视频数目
            break;
        }
        var VideoName = VideoNameArray[i];

        var rtmpUrl = this.GetVideoUrl(VideoName, true);
        var httpUrl = this.GetVideoUrl(VideoName, false);
        var oUrl = this.GetDealedVideoUrl(VideoName);
        rtmpUrl = oUrl[0];
        httpUrl = oUrl[1];

        var elementId = "OldSCIOWMVEmbedVideo" + i;
        var jwscript = '<div id="' + elementId + '"></div>';
        var oVideo = VideoElementArray[i];
        var autostartAttr = (oVideo.getAttribute("autostart") == 1 ? true : false);
        var widthAttr = oVideo.getAttribute("width");
        var heightAttr = oVideo.getAttribute("height");

        //获取type属性，在IE兼容模式下面，不能通过“oVideo.getAttribute("type")”获取。
        var reg = new RegExp("\\s+type\\s*=\\s*[\"']{0,1}([\\w\\d/-]+)[\"']{0,1}", "ig");
        var m = oVideo.outerHTML.match(reg);
        if (m != null) {
            var vtype = RegExp.$1.toLowerCase();
            if (vtype != "video/x-ms-wmv") { //可能是object内部的embed,这是退出
                continue;
            }
        }

        oVideo.style.display = "none";
        try {
            oVideo.stop(); //这个方法在Firefox、Opera调用可能出错。
        } catch (e) { }

        try {
            oVideo.outerHTML = jwscript;
        } catch (e) {
            //文档模式为IE8下，为Embed元素的outerHTML赋值不起作用
            var oContainer = document.createElement("div"); //创建一个元素
            oContainer.id = elementId;
            oContainer.innerHTML = "加载播放器..";
            oVideo.parentElement.parentElement.insertBefore(oContainer, oVideo.parentElement);
        }


        jwplayer(elementId).setup({
            width: widthAttr,
            height: heightAttr,
            autostart: autostartAttr,
            primary: "flash",
            rtmp: { bufferlength: 0.1 },
            androidhls: true,

            playlist: [{ sources: [{ file: rtmpUrl }, { file: httpUrl}]}]
        });

        svpalyer20150902.CenterVideo(elementId);
        jwplayer(elementId).onReady(function(event) {
            svpalyer20150902.CenterVideo(elementId);
        });

        jwplayer(elementId).onPlay(function(event) {
            svpalyer20150902.PausePlayers(elementId);
            svpalyer20150902.BindOnPlayEvent(jwplayer(elementId), event);
        });

        svpalyer20150902.FloatVideo2RBCorner(elementId, widthAttr, heightAttr);
    }
};

/*
* 功能：在位替换以“object”形式存在的wmv视频，不会修改父元素。
* newname: 视频名称
* width:视频宽度，省略时读取object的宽度
* height:视频高度，省略时读取object的高度
*/
svpalyer20150902.TransformObjectVideoInPlace = function(newname, width, height) {
    if (newname == null || newname == "") return;

    var rtmpUrl = this.GetVideoUrl(newname, true);
    var httpUrl = this.GetVideoUrl(newname, false);


    var oUrl = this.GetDealedVideoUrl(newname);
    rtmpUrl = oUrl[0];
    httpUrl = oUrl[1];


    var player = document.getElementById("NSPlay");
    if (player == null) return;

    var jwscript = '<div id="OldSCIOWMVObjectVideo">加载播放器...</div>';

    var widthAttr = player.getAttribute("width");
    var heightAttr = player.getAttribute("height");

    if (width) {
        widthAttr = width;
    }
    if (height) {
        heightAttr = height;
    }

    player.style.display = "none";
    try {
        player.stop(); //这个方法在Firefox、Opera调用可能出错。
    } catch (e) { }

    player.outerHTML = jwscript;

    jwplayer("OldSCIOWMVObjectVideo").setup({
        width: widthAttr,
        height: heightAttr,
        autostart: true,
        primary: "flash",
        rtmp: { bufferlength: 0.1 },
        androidhls: true,
        playlist: [{ sources: [{ file: rtmpUrl }, { file: httpUrl}]}]
    });

    svpalyer20150902.CenterVideo("OldSCIOWMVObjectVideo");
    jwplayer("OldSCIOWMVObjectVideo").onReady(function(event) {
        svpalyer20150902.CenterVideo("OldSCIOWMVObjectVideo");
    });

    jwplayer("OldSCIOWMVObjectVideo").onPlay(function(event) {
        svpalyer20150902.BindOnPlayEvent(jwplayer("OldSCIOWMVObjectVideo"), event);
    });
};
/*
* 功能：变换以“object”形式存在的wmv视频，在位替换不会修改父元素,要求指定object的Id,通常用于网页中需要转化多个视频的情况。
* newname:视频的名称
* objectId:object对象的Id，要求不能重复。
* autostart:是否自动播放
* width:宽度，省略时读取object的宽度
* height: 高度，省略时读取object的高度
*/
svpalyer20150902.TransformObjectVideoInPlaceForId = function(newname, objectId, autostart, width, height) {
    if (newname == null || newname == "") return;

    var rtmpUrl = this.GetVideoUrl(newname, true);
    var httpUrl = this.GetVideoUrl(newname, false);


    var oUrl = this.GetDealedVideoUrl(newname);
    rtmpUrl = oUrl[0];
    httpUrl = oUrl[1];


    var player = document.getElementById(objectId);
    if (player == null) return;

    var newobjectid = 'OldSCIOWMVObjectVideo' + objectId;
    var jwscript = '<div id="' + newobjectid + '">加载播放器...</div>';

    var widthAttr = player.getAttribute("width");
    var heightAttr = player.getAttribute("height");
    if (width) {
        widthAttr = width;
    }
    if (height) {
        heightAttr = height;
    }

    player.style.display = "none";
    try {
        player.stop(); //这个方法在Firefox、Opera调用可能出错。
    } catch (e) { }

    player.outerHTML = jwscript;

    jwplayer(newobjectid).setup({
        width: widthAttr,
        height: heightAttr,
        autostart: autostart,
        primary: "flash",
        rtmp: { bufferlength: 0.1 },
        androidhls: true,
        playlist: [{ sources: [{ file: rtmpUrl }, { file: httpUrl}]}]
    });

    jwplayer(newobjectid).onPlay(function(event) {
        svpalyer20150902.BindOnPlayEvent(jwplayer(newobjectid), event);
    });

    //svpalyer20150902.CenterVideo(newobjectid);
    //jwplayer(newobjectid).onReady(function(event){
    //		svpalyer20150902.CenterVideo(newobjectid);
    //});
};
/*功能：变换以“object”形式存在的wmv视频,要求容器内部必须具有“NSPlay”的对象。
* newname:视频的名称
* containerId:包容视频的DOM模型的Id
* width:宽度，省略时读取object的宽度
* height: 高度，省略时读取object的高度
*/
svpalyer20150902.TransformObjectVideo = function(newname, containerId, width, height) {
    if (newname == null || newname == "") return;

    var rtmpUrl = this.GetVideoUrl(newname, true);
    var httpUrl = this.GetVideoUrl(newname, false);


    var oUrl = this.GetDealedVideoUrl(newname);
    rtmpUrl = oUrl[0];
    httpUrl = oUrl[1];


    var player = document.getElementById("NSPlay");
    if (player == null) return;

    var jwscript = '<div id="OldSCIOWMVObjectVideo">加载播放器...</div>';

    var widthAttr = player.getAttribute("width");
    var heightAttr = player.getAttribute("height");

    if (width) {
        widthAttr = width;
    }
    if (height) {
        heightAttr = height;
    }

    player.style.display = "none";

    try {
        player.stop(); //这个方法在Firefox、Opera调用可能出错。
    } catch (e) { }

    //player.outerHTML = jwscript;
    jwplayer(containerId).setup({
        width: widthAttr,
        height: heightAttr,
        autostart: true,
        primary: "flash",
        rtmp: { bufferlength: 0.1 },
        androidhls: true,
        playlist: [{ sources: [{ file: rtmpUrl }, { file: httpUrl}]}]
    });
    svpalyer20150902.CenterVideo(containerId);
    jwplayer(containerId).onReady(function(event) {
        svpalyer20150902.CenterVideo(containerId);
    });
    jwplayer(containerId).onPlay(function(event) {
        svpalyer20150902.BindOnPlayEvent(jwplayer(containerId), event);
    });
};
/*功能：在指定位置安装视频。
* width：视频宽度
* height:视频高度
* name:视频的名称，利用rtmp服务器的名称，不包括目录。
* containerId:包容视频的DOM模型的Id
* autostart:是否自动播放
* poster:广告图片
*/
svpalyer20150902.SetupVideo = function(width, height, name, containerId, autostart, poster) {
    if (name == null || name == "") return;

    var rtmpUrl = this.GetVideoUrl(name, true);
    var httpUrl = this.GetVideoUrl(name, false);


    var oUrl = this.GetDealedVideoUrl(name);
    rtmpUrl = oUrl[0];
    httpUrl = oUrl[1];


    var AutoStartAttr = true;
    if (typeof (autostart) == 'boolean') {
        AutoStartAttr = autostart;
    }

    jwplayer(containerId).setup({
        width: width,
        height: height,
        autostart: AutoStartAttr,
        primary: "flash",
        rtmp: { bufferlength: 0.1 },
        androidhls: true,
        playlist: [{ image: poster, sources: [{ file: rtmpUrl }, { file: httpUrl}]}]

    });
    svpalyer20150902.CenterVideo(containerId); //消除在手机端调用的bug
    jwplayer(containerId).onReady(function(event) {
        svpalyer20150902.CenterVideo(containerId);
    });
    jwplayer(containerId).onPlay(function(event) {
        svpalyer20150902.PausePlayers(containerId);
        svpalyer20150902.BindOnPlayEvent(jwplayer(containerId), event);
    });
    svpalyer20150902.FloatVideo2RBCorner(containerId, width, height);
};
/*******************************************************************************************************/
/*********************以下为移动版函数********************************************************************/
/****************************************************************************************************/
/*自适应视频，用于移动端*/
/*功能：变换以“embed”形式存在的wmv视频。
* containerId:包容视频的DOM模型的Id
*/
svpalyer20150902.TransformEmbedVideo_Mobile = function(newname) {
    if (newname == null || newname == "") return;

    var rtmpUrl = this.GetVideoUrl(newname, true);
    var httpUrl = this.GetVideoUrl(newname, false);


    var oUrl = this.GetDealedVideoUrl(newname);
    rtmpUrl = oUrl[0];
    httpUrl = oUrl[1];


    var playercoll = document.getElementsByTagName("embed");
    if (playercoll.length == 0) return;

    for (var i = 0; i < playercoll.length; i++) {
        var elementId = "OldSCIOWMVEmbedVideo" + i;
        var jwscript = '<div id="' + elementId + '"></div>';
        var oVideo = playercoll[i];
        var autostartAttr = (oVideo.getAttribute("autostart") == 1 ? true : false);
        var widthAttr = oVideo.getAttribute("width");
        var heightAttr = oVideo.getAttribute("height");

        //获取type属性，在IE兼容模式下面，不能通过“oVideo.getAttribute("type")”获取。
        var reg = new RegExp("\\s+type\\s*=\\s*[\"']{0,1}([\\w\\d/-]+)[\"']{0,1}", "ig");
        var m = oVideo.outerHTML.match(reg);
        if (m != null) {
            var vtype = RegExp.$1.toLowerCase();
            if (vtype != "video/x-ms-wmv") { //可能是object内部的embed,这是退出
                continue;
            }
        }

        oVideo.style.display = "none";
        try {
            oVideo.stop(); //这个方法在Firefox、Opera调用可能出错。
        } catch (e) { }

        try {
            oVideo.outerHTML = jwscript;
        } catch (e) {
            //文档模式为IE8下，为Embed元素的outerHTML赋值不起作用
            var oContainer = document.createElement("div"); //创建一个元素
            oContainer.id = elementId;
            oContainer.innerHTML = "加载播放器..";
            oVideo.parentElement.parentElement.insertBefore(oContainer, oVideo.parentElement);
        }

        var strAspectratio = "16:10";

        jwplayer(elementId).setup({
            width: "100%",
            aspectratio: strAspectratio,
            autostart: autostartAttr,
            primary: "flash",
            rtmp: { bufferlength: 0.1 },
            androidhls: true,
            playlist: [{ sources: [{ file: rtmpUrl }, { file: httpUrl}]}]
        });

        svpalyer20150902.CenterVideo(elementId);
        jwplayer(elementId).onReady(function(event) {
            svpalyer20150902.CenterVideo(elementId);
            $("#" + elementId).css({ "max-width": widthAttr + "px", "max-height": heightAttr + "px" }); //自适应
        });

        jwplayer(elementId).onPlay(function(event) {
            svpalyer20150902.PausePlayers(elementId);
            svpalyer20150902.BindOnPlayEvent(jwplayer(elementId), event);
        });
    }
};
/*功能：在指定位置安装视频。
* width：视频宽度
* height:视频高度
* name:视频的名称，利用rtmp服务器的名称，不包括目录。
* containerId:包容视频的DOM模型的Id
* autostart:是否自动播放
* poster:广告图片
*/
svpalyer20150902.SetupVideo_Mobile = function(width, height, name, containerId, autostart, poster) {
    if (name == null || name == "") return;

    var rtmpUrl = this.GetVideoUrl(name, true);
    var httpUrl = this.GetVideoUrl(name, false);


    var oUrl = this.GetDealedVideoUrl(name);
    rtmpUrl = oUrl[0];
    httpUrl = oUrl[1];


    var AutoStartAttr = true;
    if (typeof (autostart) == 'boolean') {
        AutoStartAttr = autostart;
    }

    var strAspectratio = width + ":" + height;

    jwplayer(containerId).setup({
        width: "100%",
        aspectratio: strAspectratio,
        autostart: AutoStartAttr,
        primary: "flash",
        rtmp: { bufferlength: 0.1 },
        androidhls: true,
        playlist: [{ image: poster, sources: [{ file: rtmpUrl }, { file: httpUrl}]}]

    });
    svpalyer20150902.CenterVideo(containerId); //消除在手机端调用的bug
    jwplayer(containerId).onReady(function(event) {
        svpalyer20150902.CenterVideo(containerId);
        $("#" + containerId).css({ "max-width": width + "px", "max-height": height + "px" }); //自适应
    });
    jwplayer(containerId).onPlay(function(event) {
        svpalyer20150902.PausePlayers(containerId);
        svpalyer20150902.BindOnPlayEvent(jwplayer(containerId), event);
    });
};
/*功能：获取播放图标的url
*/
svpalyer20150902.GetPlayIconUrl = function() {
    var UrlProtocol = window.location.protocol;
    var Url = UrlProtocol + "//www.scio.gov.cn/Template/2012/Image/playbutton.png";
    var CurHref = window.location.href;
    if (CurHref.indexOf(UrlProtocol + "//192.168.255.154") > -1) {
        Url = UrlProtocol + "//192.168.255.154/wccm/WebData/27/Template/2012/Image/playbutton.png";
    }
    else if (CurHref.indexOf(UrlProtocol + "//172.16.97.252") > -1) {
        Url = UrlProtocol + "//172.16.97.252/wccm/WebData/27/Template/2012/Image/playbutton.png";
    }
    else if (CurHref.indexOf(UrlProtocol + "//172.16.98.253") > -1) {
        Url = UrlProtocol + "//172.16.98.253/wccm/WebData/27/Template/2012/Image/playbutton.png";
    }

    return Url;
}
/*功能：为视频左上角添加播放按钮
* containerId：容器Id
*/
svpalyer20150902.fnAddPlayButton = function(containerId) {
    var player = jwplayer(containerId);
    var id = containerId + "playbutton";
    var icon = svpalyer20150902.GetPlayIconUrl();
    var label = "开始播放";
    player.removeButton(id);
    player.addButton(icon, label, function() { player.play(); }, id);
};
/*功能：移走视频左上角的播放按钮
* containerId：容器Id
*/
svpalyer20150902.fnRemovePlayButton = function(containerId) {
    var player = jwplayer(containerId);
    var id = containerId + "playbutton";
    player.removeButton(id);
};
/*功能：暂停播放“containerId”之外的播放器
* containerId：容器Id
*/
svpalyer20150902.PausePlayers = function(containerId) {
    var player;
    for (var i = 0; i < 10; i++) {
        player = jwplayer(i);
        if (player != undefined) {
            if (player.id != containerId) {
                jwplayer(i).pause(true);
            }
        }
    }
};
/*功能：在指定位置安装左上角具有播放按钮的视频。
* width：视频宽度
* height:视频高度
* name:视频的名称 
* containerId:包容视频的DOM模型的Id
* autostart:是否自动播放
* poster:广告图片
*/
svpalyer20150902.SetupPlayButtonVideo = function(width, height, name, containerId, autostart, poster) {
    svpalyer20150902.SetupVideo(width, height, name, containerId, autostart, poster);
    var player = jwplayer(containerId);

    player.onIdle(function(event) { svpalyer20150902.fnAddPlayButton(containerId); });
    player.onPause(function(event) { svpalyer20150902.fnAddPlayButton(containerId); });
    player.onPlay(function(event) { svpalyer20150902.fnRemovePlayButton(containerId); svpalyer20150902.PausePlayers(containerId); });
    player.onReady(function(event) { svpalyer20150902.fnAddPlayButton(containerId); });
};