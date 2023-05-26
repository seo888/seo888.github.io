/*创建html播放器对象的js脚本
 *videoplayer.js
 *Author zhoujiang
 *Ver 2.0
 *Last Modified: 2014/09/23
 *
 *
 *使用方法
 *tide_player.showPlayer({json:'...'})
 */

tide_player={
    ua:navigator.userAgent,
    isios:false,
    isandroid:false,
    _tide_play_num:0,
    _path :"http://m.tibet.cn/images/videoplayer-1.28.07.swf",//播放器路径
    divid:"",

    //初始化函数
    init:function(){

        this.tmpobj={};//用于html5的对象
        if (/(iPhone|iPad|iPod|iOS)/i.test(this.ua)) {
            this.isios = true;
        } else if (/(Android)/i.test(this.ua)) {
            this.isandroid = true;
        }
        if (!this.isios && !this.enableflash()) {
            this.isios = true;
        }

        //定义trim方法
        String.prototype.trim = function() {
            return this.replace(/(^\s*)|(\s*$)/g, "");
        };      
    },
    //播放器函数
    /*
     *object和video对象通用的设置参数
     *skin 单独定义分享、关灯、画质、设置是否显示
     *autoplay 默认为自动播放
     *name object，video的id
     *width 视频的宽度，默认为浏览器页面的宽的一半
     *height 视频的高度，默认为浏览器页面的高的0.75+36
     *json,url,id,xml 传入的json地址
     *notool 当为true的时候播放器将不显示右侧功能按钮
     *divid 视频播放器显示的位置,不提供则显示在此脚本所在的位置
     *
     */
    showPlayer:function(obj){

        this.init();
        obj.skin = obj.skin||"1,1,1,1";

        //this.isios = true;//用于测试
        this.divid=obj.divid;
        if (obj.autoplay === undefined) {//
            obj.autoplay = true;
        }
 if(!obj.sturl)
{//统计接口
	obj.sturl="http://58.135.108.39/tongji/tide_log_video.php";
}
	if(!obj.evurl)
{//播放情况反馈接口 2015/02/04 19:00
	obj.evurl="http://58.135.108.39/tongji/tide_log_video_playinfo.php";
}
        var _dom_name = obj.name||"TIDE_PLAYER_" + (this._tide_play_num);
        this._tide_play_num+=1;

        var _w = obj.width||480;
        var _h = obj.height||360;

        obj.json=obj.json||obj.url||obj.id||obj.xml||"";
        if(!obj.json) delete obj.json;
        this._path=obj.path||this._path;

        /*html5的方式创建，处理json,video地址
         *非html5的方式创建，json或video传入的地址，无论是否加密交给flv处理
         */

        if (this.isios) {

            this.forhtml5(_dom_name, _w, _h, obj);
        } else {
            this.newfla(this._path, _dom_name, _w, _h, false,obj);
        }


    },

    /*
     *创建object对象的函数
     *flvpath flash的路径
     *wmode 窗口模式 ,默认为opaque
     *flavars flash处理的参数，包括skin，autoplay，json等
     */
    newfla:function(flvpath,domname,w,h,wmode,obj){

        var flavars= this.objtourl(obj);
        var e = '<object id="' +domname + '" width="' + w + '" height="' + h + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" >'
            +'<param name="movie" value="' +flvpath + '" /><param name="FlashVars" value="' + flavars + '" /><param name="wmode" value="'
            + (wmode ? 'transparent': 'opaque')
            +'" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" />'
            +'<embed name="' + domname + '" width="' + w + '" height="' + h + '" src="'
            + flvpath + '" wmode="' + (wmode? 'transparent': 'opaque')
            +'" allowFullScreen="true" allowScriptAccess="never" FlashVars="' + flavars
            + '" type="application/x-shockwave-flash"></embed></object>';

        if (!obj.notool) {
            e = "<div style='position:relative;z-index:300;'>" + e+ "</div>";
        }
        if (obj.divid) {
            try {
                document.getElementById(obj.divid).innerHTML = e;
            } catch(e) {}
        } else {
            document.write(e);
        }

    },

    /*
     *创建video对象的函数
     *loop 是否循环播放
     *cover 视频缓冲显示的图片
     *playcallback 响应播放或正在播放或点击的函数
     */
    forhtml5:function(domname,w,h,o){

        this.tmpobj.id =domname;
        this.tmpobj.w = w;
        this.tmpobj.h = h;
        this.tmpobj.ap = o.autoplay;

        this.tmpobj.lp = o.loop;
        this.tmpobj.cv = o.cover;

        this.tmpobj.pc = o.playcallback;
        var theurl = o.json;
        var videohtml;

        //如果json传入
        if (theurl) {
            if (theurl.indexOf("http://") == -1) {
                theurl = this.decode64(o.json);
            }
            if (theurl.split('/')[2]!==window.location.href.split('/')[2]) {
                if(theurl.substr(theurl.lastIndexOf(".") + 1)=='json')
                    this.dojsonp(theurl);
                else this.dojsonp(theurl + "&funcname=tide_player.ihtml5");

            } else {
                this.doajax(theurl);
            }
            videohtml = "Loading...";

            //如果视频地址传入
        } else {
            var c = o.video;
            if (c) {
                if (c.indexOf("http://") == -1||c.indexOf("https://") == -1) {
                    c = this.decode64(c);
                }
                var d = c.toLowerCase();
                var e = d.substr(d.lastIndexOf(".") + 1);
                //不是只接受MP4的移动格式
                //if (e == "mp4") {
                videohtml = this.ihtml5(c, true)
                //}
            }
            if (!videohtml) {
                videohtml = "此视频暂时不支持移动设备播放，请在电脑上浏览观看！"
            }
        }

        var videodiv='<div id=' + domname + ' style="width:' + w + 'px;height:' + h + 'px;background:#000;line-height:' + h + 'px;text-align:center;color:#fff;font-size:16px;clear:both;">' + videohtml + '</div>'
        if(!this.divid) document.write(videodiv);
        else document.getElementById(this.divid).innerHTML =videodiv;
    },

    /*
     *json exam
     *{"id":"2","title":"this is title","photo":"http://tidedemo.com/playerdemo/QQ20140725-1.png",
     *"videos":[{"type":"v_hd","url":"http://tidedemo.com/playerdemo/mp4/v_hd.mp4"},
     *{"type":"v_hd","url":"http://tidedemo.com/playerdemo/mp4/v.mp4"},
     *{"type":"v_sd","url":"http://tidedemo.com/playerdemo/mp4/v_sd.mp4"}]}
     */
    ihtml5:function(vars,notspc){

        var c;
        if (notspc) {
            c = vars;
        } else {
            var vc;
            for (var i = vars.videos.length - 1; i >= 0; i--) {
                var vi = vars.videos[i];
                if (!c) {
                    c = vi.url;
                }
                //默认播放清晰度为v的，或者不存在v则播放第一个url地址
                if (vi.type == "v") {
                    vc = vi.url;
                }
            }
            if (vc) c = vc;
        }
        if (c) {
            var cf = "tide_player.forplay(this,'" + this.tmpobj.pc + "');";
            //poster 当视频未响应或缓冲不足时，该属性值链接到一个图像。该图像将以一定比例被显示出来
            //controls 控件，例如播放按钮
            var d = '<video ' + (this.tmpobj.pc ? ('onplay="' + cf + '" onplaying="' + cf + '" onclick="' + cf + '" ') : '')
                + 'width="' + this.tmpobj.w + '" height="' + this.tmpobj.h + '" controls="controls" ' + (this.tmpobj.ap=="true" ? 'autoplay="autoplay" ': '')
                + (this.tmpobj.lp ? 'loop="loop" ': '') + (this.tmpobj.cv ? ('poster="' + this.tmpobj.cv + '" ') : (vars.photo ? ('poster="' + vars.photo + '" ') : ''))
                + 'src="' + c + '"></video>';
            if (notspc) {
                return d;
            } else {
                var tmp=this.divid||this.tmpobj.id;
                if(tmp)  document.getElementById(tmp).innerHTML=d;
            }
        }

    },
    dojsonp:function(url){//处理jsonp，要求返回的格式为tide_player.ihtml5(json)
        $.ajax({type : "GET",url : url,dataType : "jsonp",jsonp:'tide_player.ihtml5'});
    },
    doajax:function(url) {

        $.getJSON(url,this.ajaxsucc);
    },
    ajaxsucc:function(data){
        tide_player.ihtml5(data);
    },
    forplay:function(vobj, func) {
        if (eval(func)()) {
            vobj.onplay = null;
            vobj.onplaying = null;
            onclick = null;
        } else {
            if (typeof vobj.webkitExitFullscreen !== "undefined") {
                vobj.webkitExitFullscreen();
            }
            vobj.currentTime = 0;
            vobj.pause();
            try {
                vobj.stop();
            } catch(e) {}
        }
    },


    getFlashDom:function(a){
        return document[a];
    },

    _getPlayer:function(id){
        return document["TIDE_PLAYER_"+id];
    },

    getPlayerPageUrl:function() {
        return window.location.href;
    },

    //检查flash是否能使用
    enableflash:function() {
        if (navigator.mimeTypes.length > 0) {
            try {
                return navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin != null
            } catch(e) {
                return false;
            }
        } else if (window.ActiveXObject) {
            try {
                new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                return true;
            } catch(e) {
                return false;
            }
        } else {
            return false;
        }
    },

    //将对象转化为url组件
    objtourl:function(a) {
        var b = [];
        for (var c in a) {
            b.push(c + "=" + encodeURIComponent(a[c]));
        }
        return b.join("&");
    },

    //base64解码的函数
    decode64:function(a) {
        if (a.indexOf(".") != -1) return a;
        var b = [ - 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
            -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
            42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];
        var c,c2,c3,c4,i,len,out;
        len = a.length;
        i = 0;
        out = "";
        while (i < len) {
            do {
                c = b[a.charCodeAt(i++) & 0xff];
            }
            while (i < len && c == -1);
            if (c == -1) break;
            do {
                c2 = b[a.charCodeAt(i++) & 0xff];
            }
            while (i < len && c2 == -1);
            if (c2 == -1) break;
            out += String.fromCharCode((c << 2) | ((c2 & 0x30) >> 4));
            do {
                c3 = a.charCodeAt(i++) & 0xff;
                if (c3 == 61) return out;
                c3 = b[c3]
            }
            while (i < len && c3 == -1);
            if (c3 == -1) break;
            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
            do {
                c4 = a.charCodeAt(i++) & 0xff;
                if (c4 == 61) return out;
                c4 = b[c4]
            }
            while (i < len && c4 == -1);
            if (c4 == -1) break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4)
        }
        return out
    }

};


function newlight() {
    var d = document.createElement("div");
    d.setAttribute('style','position:absolute;display:none;\
		width:100%;zIndex:299;left:0px;top:0px;background-color:#000;');
    d.style.height=document.documentElement.scrollHeight + 'px';
    return d;

}

function controlLight(show) {
    if (!this.light) {
        this.light =newlight();
        document.body.appendChild(this.light);
    }
    this.light.style.display = show ? "none": "block";
}
