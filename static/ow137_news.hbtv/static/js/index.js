/**
 * CKplay播放器配置参数
 * 接口地址
 **/
var player;
var isBoKong; //记录是否为播控状态

var ck=null,               //播放器功能配置对象js
    isLoadHandler=false, //播放器是否加载完成
    xmlDoc=null,           //播放器功能配置对象xml
    videoUrl='',           //视频地址
    deft='',               //视频清晰度文案
    deff='',               //视频清晰度地址
    thumb='',              //初始图片地址
    flashS=0,              //配置调用方式，此处主要是针对m3u8格式
    flashA='',             //调用时的参数，此处当flashS不为0时有效，为视频地址
    islive=0,              //是否是直播流，=1则锁定进度栏，不可进行拖动
    beginAd='',            //前置广告链接地址
    beginTime='',          //前置广告播放时间
    beginlink='',          //前置广告对应的链接地址
    pauseAd='',            //暂停广告的链接地址
    pauseTime="";          //暂停广告播放时间
    pauselink='',          //暂停广告对应的链接地址
    autoStart=0,           //自动播放功能是否开启
    autoPlay=0,           //自动播放功能是否开启【新版X版本】
    logoImg='',            //播放器logo地址
    pointTime=[],          //关键点的时间对象
    pointTitle=[],         //关键点的title对象
    videoPreview=0,        //视频预览功能是否开启
    breakPoint=0,          //断点续播功能是否开启
    deft = "",             //清晰度字deff段
    deff = "",             //不同清晰度的视频流
    playerstop = 5 ,       //播放结束后是否循环播放  1循环播放 5不循环播放
    port={
        config:'/video/player/config?sid='+php_sid+'&type='+php_type,
        videoInfo:'/video/player/video?sid='+php_sid+'&vid='+php_vid+'&type='+php_type,
        ad:'/video/player/ad?sid='+php_sid+'&type='+php_type+'&from_backend='+php_from_backend,
        getDuration:'/video/scanlog/duration',
        setDuration:'/video/scanlog/history',
        monitor: "/video/player/getcontrol?stream_id="+php_id+"&site_id="+php_sid
    },
    playTime=0,
    enableLogin=false,
    breakTime=0;
search=window.location.search.slice(1),
    pos=search.indexOf('=')+1,
    pos2=search.indexOf('&'),
    str=search.slice(pos,pos2),
    sign=str.split('/')[5]; //断点续播用到的字符串


/**
 * 获取url中的某一个参数
 **/
function getUrlParam(url,param){
    var searchStr = url.substr(url.indexOf("?") + 1),
        searchArr = searchStr.split("&"),
        searchObj = {};
    for(var i in searchArr){
        var arr = searchArr[i].split("=");
        searchObj[arr[0]] = arr[1]
    };
    return searchObj[param];
};
var href = window.location.href;
if (getUrlParam(href,"start_ts")) {
    port.videoInfo += "&start_ts=" + getUrlParam(href,"start_ts");
    port.videoInfo += "&end_ts=" + getUrlParam(href,"end_ts");
};
/**
 * 清晰度切换插件安装
 **/
function ckcpt() {
    var cpt = '';
    cpt += 'definition.swf,2,2,-260,-30,2,1|';
    return cpt;
};
// 视频加载中提示
document.getElementById("ck_loading").style.display = "block";
/**
 * 获取视频源地址及播放对应视频源
 **/
ajax({
    method : 'GET',
    url : port.config,
    success : function(res){
//            autoStart="//";
        autoStart=res.autoStart;
        autoPlay=res.autoStart;
        videoPreview=res.videoPreview?1000:500000;
        breakPoint=res.breakpointPlay;
        logoImg=res.logoImgPath;
        var setupTmp='1,1,1,1,1,2,0,1,2,0,0,1,200,0,1,1,0,1,1,1,1,10,3,0,1,2,3000,0,0,0,0,1,1,1,1,1,1,250,0,90,0,0,0';
        if(getUrlParam(href,"isRadioLive")&&getUrlParam(href,"isRadioLive")=="true"){//当播放类型为音频直播时[一直显示控制栏,隐藏全屏开关]
            setupTmp='1,1,1,1,1,2,0,1,2,0,0,1,200,0,1,1,0,1,1,1,1,10,3,0,1,0,3000,0,0,0,0,1,1,1,0,1,1,250,0,90,0,0,0';
        }
        ckInit();
        function ckInit(){
            ck = {
                cpath: '',
                language: '',
                cpt_definition_text:'标清,高清,超清,蓝光',
                cpt_definition:'0x656565,0x2c2c2c,80,20,0xFFFFFF,0x00b4ff,10,10,1,3,自动,12,MicrosoftYaHei|微软雅黑,0x505050,10,80,20,15,0,10',
                flashvars: '',
                setup: setupTmp,
                pm_bg: '0x000000,100,230,180',
                mylogo: null,
                pm_mylogo: '1,1,100,55',
                logo: logoImg,
                pm_logo: '0,2,180,-35,1',
                control_rel: 'related.swf,ckplayer/related.xml,0',
                control_pv: 'Preview.swf,105,'+videoPreview,
                pm_repc: '',
                pm_spac: '|',
                pm_fpac: 'file->f',
                pm_advtime: '2,0,-110,10,0,300,0',
                pm_advstatus: '1,2,2,-110,-40',
                pm_advjp: '0,1,2,2,-100,-40',
                pm_padvc: '2,0,-13,-13',
                pm_advms: '2,2,-46,-67',
                pm_zip: '1,1,-20,-8,1,0,0',
                pm_advmarquee: '1,2,50,-70,50,20,0,0x000000,50,0,20,1,30,2000',
                pm_glowfilter:'1,0x01485d, 100, 6, 3, 10, 1, 0, 0',
                advmarquee: null,
                mainfuntion:'',
                flashplayer:'',
                calljs:'ckplayer_status,ckadjump,playerstop,ckmarqueeadv',
                myweb: escape('f46e10b6d8c0c9a6f016eaa33fac39ee,CmstopPlayer,http://www.cmstop.com ,v1.5.1'),
                cpt_lights: '0',
                cpt_share:'',
                cpt_list: ckcpt()
            }
            function _fn(){
                if(!php_vid){          //当vid不存在时
                    var srcArr=php_video.split('/');
                    var srcArrLen=srcArr.length;
                    var index=srcArr[srcArr.length-1].indexOf('.');
                    if(srcArr[srcArr.length-1].slice(index+1)=='m3u8' || srcArr[srcArrLen-1].slice(0,4) == 'm3u8' || srcArr[srcArr.length - 1].slice(index + 1).substring(0,4) == 'm3u8'){
                        videoUrl='/assets/libraries/ckplayer/ckplayer/m3u8.swf';
                        flashS=4;
                        flashA=php_video;
                        islive=1;
                        autoStart=1;
                        if (getUrlParam(window.location.href,"type") == "replay") {
                            islive = 0;
                        };
                    }else{
                        videoUrl=php_video;
                    }
                    thumb=php_thumb;
                    requestAd();
                }else{          //当视频的vid存在时
                    ajax({
                        method : 'GET',
                        url : port.videoInfo,
                        success : function(data){
                            if (!(data && data.file && (data.file.url || data.file.sd || data.file.hd || data.file.ed))) return;
                            videoUrl = data.file.url || data.file.hd || data.file.sd;
                            window.dataFile = data.file;
                            window.oldVideoUrl = data.file.url || data.file.hd || data.file.sd;
                            (function(){
                                var file = data.file;
                                if(file.sd){
                                    deft += '标清';
                                    deff += file.sd;
                                }
                                if(file.hd){
                                    deft += ',高清';
                                    deff += '|' + file.hd;
                                }
                                if(file.ed){
                                    deft += ',超清';
                                    deff += '|' + file.ed;
                                }
                            })();
                            thumb=data.image;
                            var urlArr=videoUrl.split('/');
                            var urlArrLen=urlArr.length;
                            var dotIndex=urlArr[urlArr.length-1].indexOf('.');

                            if(urlArr[urlArr.length-1].slice(dotIndex+1)=='m3u8' || urlArr[urlArrLen-1].slice(0,4) == 'm3u8'){
                                videoUrl='/assets/libraries/ckplayer/ckplayer/m3u8.swf';
                                flashS=4;
                                flashA= data.file.url || data.file.hd || data.file.sd || data.file.ed;
                                islive=1;
                                if (getUrlParam(window.location.href,"type") == "replay") {
                                    islive = 0;
                                };
                                autoStart=1;
                                // 直播清晰度切换地址处理
                                (function(){
                                    deft = "";
                                    deff = "";
                                    var file = data.file;
                                    if(file.sd){
                                        deft += '标清';
                                        deff += videoUrl + "?" + file.sd;
                                    }
                                    if(file.hd){
                                        deft += ',高清';
                                        deff += '|' + videoUrl + "?" +  file.hd;
                                    }
                                    if(file.ed){
                                        deft += ',超清';
                                        deff += '|' + videoUrl + "?" +  file.ed;
                                    }
                                })();
                            }

                            //关键点begin
                            var point=data.point;
                            if(point){
                                if(point.start){
                                    pointTime.push(point.start.time);
                                    pointTitle.push(point.start.title);
                                }
                                if(point.info.length){
                                    var infoLen=point.info.length;
                                    point.info.forEach(function(item){
                                        pointTime.push(item.time);
                                        pointTitle.push(item.title);
                                    });
                                }
                                if(point.end){
                                    pointTime.push(point.end.time);
                                    pointTitle.push(point.end.title);
                                }
                            };
                            // 如果开启了播控
                            if (data.play_control == 1) {
                                window.playerstop = 1;
                                streamMonitor();
                            }else{
                                window.playerstop = 5;
                                requestAd();
                            };
                        }
                    });
                }
            };
            /**
             * 播控
             */
            window.monitorData = "";
            function streamMonitor(){
                ajax({
                    method : 'GET',
                    url : port.monitor,
                    success : function(res){
                        isBoKong=true;
                        if (res && res.state) {
                            window.monitorState = true;
                            if (window.monitorData != res.data) {
                                window.monitorData = res.data;
                                m3u8OrNot(res.data);
                                beginAd="";
                                beginTime="0";
                                beginlink="";
                                autoStart=1;
                                autoPlay=1;
                                init();
                            };
                        }else{
                            if (window.monitorData != window.oldVideoUrl) {
                                window.monitorData = window.oldVideoUrl;
                                m3u8OrNot(window.oldVideoUrl);
                                beginAd="";
                                beginTime="0";
                                beginlink="";
                                autoStart=1;
                                autoPlay=1;
                                init();
                            };
                        }
                    }
                });
                clearTimeout(window.monitorTimeout);
                window.monitorTimeout = setTimeout(function(){
                    streamMonitor()
                },1000);
            };
            // 串联单播放
            ajax({
                method : 'GET',
                url : "/video/player/stream?stream_id="+php_id+"&site_id="+php_sid,
                success : function(res){
                    window.access_type = res.access_type;
                    if (access_type == 4) {  // 如果是串联单
                        ajax({
                            method : 'GET',
                            url : "/video/player/playbill?stream_id="+php_id+"&site_id="+php_sid,
                            success : function(res){
                                window.virtualPlayArr = res;
                                virtualPlay(virtualPlayArr);
                                window.virtualInterval = setInterval(function(){
                                    virtualPlay(virtualPlayArr);
                                },1000);
                            }
                        });
                    }else{ // 如果不是串联单
                        _fn();
                    }
                }
            });
        }
        // xmlDoc=checkXMLDocObj("/assets/libraries/ckplayer/ckplayer/ckplayer.xml");
        // xmlDoc.getElementsByTagName('logo')[0].childNodes[0].nodeValue=logoImg;
    }

});
function m3u8OrNot(item){
    var srcArr=item.split('/');
    var srcArrLen=srcArr.length;
    var index=srcArr[srcArr.length-1].indexOf('.');
    if(srcArr[srcArr.length-1].slice(index+1)=='m3u8' || srcArr[srcArrLen-1].slice(0,4) == 'm3u8'){
        videoUrl='/assets/libraries/ckplayer/ckplayer/m3u8.swf';
        flashS=4;
        flashA=item;
        islive=1;
        autoStart=1;
    }else{
        flashS = 0;
        flashA = '';
        islive=0;
        autoStart=1;
        videoUrl=item;
    }
};
window.nowVideo = 0;
function virtualPlay(res){
    var nowTimeStamp = (new Date()).getTime(),
        nowDate = (new Date()).toLocaleDateString().split('/').join("-"),
        nowDateStart = nowDate + " 00:00:00",
        nowDateStartStamp = (new Date(nowDateStart)).getTime(),
        nowHMSStamp = nowTimeStamp - nowDateStartStamp;
    for(var i in res){
        var resStartTime = +res[i].starttime * 1000,// 转为毫秒
            resEndTime = +res[i].endtime * 1000;// 转为毫秒
        // 如果当前时间在时间范围内
        if (nowHMSStamp >= resStartTime && nowHMSStamp < resEndTime) {
            isBoKong=false;//这里是为了让video的播放路径为string，而不是array
            if (nowVideo == 0) { // 第一次播放
                islive=1;
                if (nowVideo != res[i]["play_url"]) {
                    nowVideo = res[i]["play_url"];
                    m3u8OrNot(res[i]["play_url"]);
                    requestAd();
                };
            }else{ //第二次播放不放广告
                islive=1;
                if (nowVideo != res[i]["play_url"]) {
                    nowVideo = res[i]["play_url"];
                    m3u8OrNot(res[i]["play_url"]);
                    beginAd="";
                    beginTime="0";
                    beginlink="";
                    init();
                }
            };
            break;
        };
    };
};
function loadImage(url, callback) {
    var img = new Image();
    img.src = url;
    img.onload = function(){ //图片下载完毕时异步调用callback函数。
        callback.call(img); // 将callback函数this指针切换为img。
    };
}

/*
*返回ck对象
*/
function ckstyle(){
    return ck;
}

/*
*xml文件调用方式
*/
function loadXML(xmlFile) {
    var xmlDoc;
    if (window.ActiveXObject) {
        xmlDoc = new ActiveXObject('Microsoft.XMLDOM');//IE浏览器
        xmlDoc.async = false;
        xmlDoc.load(xmlFile);
    }
    else if (isFirefox=navigator.userAgent.indexOf("Firefox")>0) { //火狐浏览器
        xmlDoc = document.implementation.createDocument('', '', null);
        xmlDoc.load(xmlFile);
    }
    else{ //谷歌浏览器
        var xmlhttp = new window.XMLHttpRequest();
        xmlhttp.open("GET",xmlFile,false);
        xmlhttp.send(null);
        if(xmlhttp.readyState == 4){
            xmlDoc = xmlhttp.responseXML.documentElement;
        }
    }

    return xmlDoc;
}

// 首先对xml对象进行判断
function checkXMLDocObj(xmlFile) {
    var xmlDoc = loadXML(xmlFile);
    return xmlDoc;
}

/*
*请求广告
*/
function requestAd(){
    ajax({
        method : 'GET',
        url : port.ad,
        success : function(res){
            if(res){
                if(!getUrlParam(href,"isRadioLive")||getUrlParam(href,"isRadioLive")!="true"){//当播放类型为音频直播时，不显示广告
                    pauseAd=res.pause.file;
                    pauselink=res.pause.link;
                    pauseTime=res.pause.time;
                    beginAd=res.begin.file;
                    beginTime=res.begin.time;
                    beginlink=res.begin.link;
                    if (window.parent.postMessage) {
                        window.parent.postMessage(beginTime,'*');
                    };
                }
            }
            init();
        }
    })
}

/*
* 判断宿主环境是移动端还是PC端
*/
function IsPC() {
    var $channel = php_channel;
    if($channel && $channel == 'pc'){
        return true;
    } else if ($channel && $channel == 'wap'){
        return false;
    }
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};
/*
*播放器加载
*/
/*function init(){
    var flashvars={
        f:videoUrl,
        s:flashS,
        a:flashA,
        c:'0',
        l:beginAd,
        t:beginTime,
        r:beginlink,
        d:pauseAd,
        u:pauselink,
        i:thumb,
        loaded:'loadedHandler',
        lv:islive,
        p:(getUrlParam(href,"autoStart")||autoStart),
        h:3,
        k:pointTime.join('|'),
        n:pointTitle.join('|'),
        e:playerstop
        // my_url:encodeURIComponent(window.location.href)
    };
    var getVideo=flashA ? flashA : videoUrl,
        src=getVideo.split('/'),
        i=src[src.length-1].indexOf('.'),
        type=src[src.length-1].slice(i+1),
        video=[getVideo+'->video/'+type];
    if(deft && deff && deff.indexOf('|') != -1){
        flashvars.deft = deft;
        flashvars.deff = deff;
    }*/
    /*
    CKobject.embed('/assets/libraries/ckplayer/ckplayer/ckplayer.swf','a1','ckplayer_a1','100%','100%',false,flashvars,video);
    if (IsPC()) {
        // 只支持falsh
        CKobject.embedSWF('/assets/libraries/ckplayer/ckplayer/ckplayer.swf','a1','ckplayer_a1','100%','100%',flashvars,video);
    }else{
        // 优先选择HTML5
        CKobject.embed('/assets/libraries/ckplayer/ckplayer/ckplayer.swf','a1','ckplayer_a1','100%','100%',true,flashvars,video);
    }
    */
    /*document.getElementById("ck_loading").style.display = "none";
}*/
/**
 * 移动端广告
 */
function mobileAd(adObj) {
    if (!adObj) {
        return;
    }
    var vi = document.getElementsByTagName('video')[0]; //video标签
    var imgAds=document.getElementById("imgAds");//图片广告
    var closead=document.getElementById("closead");//关闭图片按钮
    var oldSrc = vi.src; //原视频地址
    var cTime = 0; //原视频内容播放的时间点
    var adflag = adObj.begin.file ? true : false ; //
    var pflage=true;
    var videoCountTimer;
    var imgCountTimer;
    vi.onplay=function(){
        //又前置广告
        if(adflag){
            //切换为前置广告
            if(adObj.begin.file&&vi.src==oldSrc){
                //处理视频和图片两种类型
                //图片广告
                if(adObj.begin.file.indexOf('.mp4')==-1){
                    var img=new Image();
                    img.src=adObj.begin.file;
                    var _time=0;
                    img.onload=function(){
                        imgAds.style.display="block";
                        imgAds.style.background="url("+adObj.begin.file+") no-repeat center center";
                        document.getElementById("countdown").style.display="block";
                        imgCountTimer=setInterval(function(){
                            _time++;
                            document.getElementById("cdtimer").innerHTML=Math.floor(adObj.begin.time-_time);
                            if(_time==adObj.begin.time){
                                clearInterval(imgCountTimer);
                                imgAds.style.display="none"
                                document.getElementById("countdown").style.display="none";
                                adflag=false;
                                vi.src=oldSrc;
                                vi.controls=true;
                                vi.play();
                            }
                        },1000)
                    };
                }else{
                    //视频广告
                    vi.src=adObj.begin.file;
                    vi.controls=false;
                    vi.play();
                    //广告倒计时
                    var videoCountTimer=setInterval(function () {
                        document.getElementById("countdown").style.display="block";
                        document.getElementById("cdtimer").innerHTML=Math.floor(adObj.begin.time-vi.currentTime);
                        //处理视频广告404的情况
                        if(isNaN(vi.duration)||vi.currentTime>=adObj.begin.time){
                            document.getElementById("countdown").style.display="none";
                            clearInterval(videoCountTimer);
                            adflag=false;
                            vi.src=oldSrc;
                            vi.controls=true;
                            vi.play();
                        }
                    }, 1000);
                }
            }
        }
    }
    vi.onended=function(){
        //前置广告播放完了，切换为内容视频
        if(adObj.begin.file &&vi.src.indexOf(adObj.begin.file.substr(1))!=-1){
            document.getElementById("countdown").style.display="none";
            clearInterval(videoCountTimer);
            adflag=false;
            vi.src=oldSrc;
            vi.controls=true;
            vi.play();
        }
    }
    vi.onpause=function(){
        if(pflage){
            //处理=>跳转进度，触发暂停
            var _oldTime=vi.currentTime;
            cTime=vi.currentTime;
            setTimeout(function(){
                var _onwTime=vi.currentTime;
                //跳转进度
                if(_oldTime!=_onwTime){
                }else{
                    if(pauseAd){
                        pflage=false;
                        var img=new Image();
                        img.src=pauseAd;
                        img.onload=function(){
                            imgAds.style.display="block";
                            imgAds.style.background="url("+pauseAd+") no-repeat center center";
                        };
                    }
                }
            },1000)
        }
    }
    //前置广告跳转
    vi.onclick=function(){
        if(vi.src==adObj.begin.file&&beginlink){
            adGo(beginlink);
        }
    }

    //暂停广告跳转
    imgAds.onclick=function(){
        if(pauselink){
            adGo(beginlink);
        }
    }
    //关闭广告
    closead.onclick=function(event){
        imgAds.style.display="none";
        vi.play();
        try {
            event.stopPropagation();
        } catch (error) {

        }
    }
    //跳转广告
    function adGo(link){
        /*
         *处理广告传过来的广告
         *1.正常的url  eg:https://www.baidu.com
         *2.不正常的url  eg：http://site.wh.meitiyun.org/https://www.baidu.com
         */
        if(link.lastIndexOf("http")!=0){
            //处理 http 和 https 两种情况
            //https
            var _link="";
            if(link.lastIndexOf("https")!=0){
                _link=link.substr(link.lastIndexOf("https"));
            }else{
                //http
                _link=link.substr(link.lastIndexOf("http"));
            }
            window.parent.location.href=_link;
        }else{
            window.parent.location.href=link;
        }
    }
}
/*
*点击跳过广告按钮的操作
*/
// function ckadjump(){
//     CKobject.getObjectById('ckplayer_a1').frontAdUnload();
// }

/*
*播放器加载成功后调用
*/
function loadedHandler(){
    isLoadHandler = true;
    player.addListener('play',playHandler);
    // player.addListener('pause',pauseHandler);
    player.addListener('error',playerError);
    /*
    if(CKobject.getObjectById('ckplayer_a1').getType()){
        CKobject.getObjectById('ckplayer_a1').addListener('play',playHandler);
        CKobject.getObjectById('ckplayer_a1').addListener('pause',pauseHandler);
        CKobject.getObjectById('ckplayer_a1').addListener('error',playerError);

    }else{
        CKobject.getObjectById('ckplayer_a1').addListener('play','playHandler');
        CKobject.getObjectById('ckplayer_a1').addListener('pause','pauseHandler');
        CKobject.getObjectById('ckplayer_a1').addListener('error','playerError');
    }
    */
}

/*
*时间设置cookie时间
*/
function timeHandler(t) {
    if(breakPoint){ //  && !flashA
        if(enableLogin){
            playTime = t;
        }else{
            if(php_vid){
                SetCookie(php_vid+"-"+php_sid, t);
            }else{
                SetCookie(php_id+"-"+php_sid, t);
            }
        }
    }
}

/*
*结束当前界面时，记录播放时间
*/
window.onbeforeunload=function(){
    if(breakPoint && enableLogin){ //&& !flashA
        ajax({
            method : 'POST',
            url : port.setDuration,
            data : {
                sid : php_sid,
                vid : php_vid || php_id,
                duration : playTime
            },
            success : function (res){}
        })
    }
}

/*
*单位时间加载的字节
*/
function speedHandler(){
    return CKobject.getObjectById('ckplayer_a1').getStatus().speed;
}

/*
*播放
*/
var videoFirstPlay=0;
var videoFirstSeek;
function playHandler() {
    removePlayListener();
    player.addListener('play', playerHandler);
    player.addListener('pause', pauseHandler2);
    if(breakPoint){ // && !flashA
        ajax({
            method : 'POST',
            url : port.getDuration,
            data : {
                sid : php_sid,
                vid : php_vid || php_id
            },
            success : function (res){
                if(res.state){
                    if(res.member_state){
                        enableLogin=true;
                        if(autoPlay){
                            player.videoSeek(res.duration);
                        }else{
                            videoFirstSeek=res.duration;
                            ++videoFirstPlay;
                        }
                    }else{
                        enableLogin=false;
                        var cookie='';
                        if(php_vid){
                            cookie=php_vid+"-"+php_sid;
                        }else{
                            cookie=php_id+"-"+php_sid;
                        }
                        if(autoPlay){
                            player.videoSeek(getCookie(cookie));
                        }else{
                            videoFirstSeek=getCookie(cookie);
                            ++videoFirstPlay;
                        }
                    }
                }
                addTimeListener();
            }
        })

    }
}

/*
*删除播放监听事件
*/
function removePlayListener() {
    player.removeListener('play',playHandler);
    /*
    if (CKobject.getObjectById('ckplayer_a1').getType()) {//说明使用html5播放器
        CKobject.getObjectById('ckplayer_a1').removeListener('play', playHandler);
    }
    else {
        CKobject.getObjectById('ckplayer_a1').removeListener('play', 'playHandler');
    }
    */
}

/*
*增加时间监听
*/
function addTimeListener() {
    player.addListener('time', timeHandler);
    player.addListener('ended', breakPointEnd);
    /*
    if (CKobject.getObjectById('ckplayer_a1').getType()) {//说明使用html5播放器
        CKobject.getObjectById('ckplayer_a1').addListener('time', timeHandler);
        CKobject.getObjectById('ckplayer_a1').addListener('ended', breakPointEnd);
    }
    else {
        CKobject.getObjectById('ckplayer_a1').addListener('time', 'timeHandler');
        CKobject.getObjectById('ckplayer_a1').addListener('ended', 'breakPointEnd');
    }*/
}

/**
 * 监听加载失败事件
 */
function playerError(){
    if (window.dataFile && window.dataFile.hd && window.dataFile.sd && window.playerErrorCount != 1) {
        window.playerErrorCount = 1;
        videoUrl = window.dataFile.sd;
        m3u8OrNot(videoUrl);
        requestAd();
    };
};


/*
*断点续播，播放结束时间定位开始位置
*/
function breakPointEnd(){
    if (window.monitorState) { // 播控循环播放
        return;
    };
    if (window.access_type == 4) {
        nowVideo = 1;
        virtualPlay(virtualPlayArr);
        return;
    }
    player.removeListener('ended', breakPointEnd);
    player.videoSeek(0);
    player.videoPause();
    // if (CKobject.getObjectById('ckplayer_a1').getType()) {//说明使用html5播放器
    //     CKobject.getObjectById('ckplayer_a1').removeListener('ended', breakPointEnd);
    // }
    // else {
    //     CKobject.getObjectById('ckplayer_a1').removeListener('ended', 'breakPointEnd');
    // }
    // CKobject.getObjectById('ckplayer_a1').videoSeek(0);
    // CKobject.getObjectById('ckplayer_a1').videoPause();
}

/*
*写cookies函数
*/
function SetCookie(cvs_id,value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 30; //此 cookie 将被保存 30 天
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = cvs_id + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

/*
*取cookies函数
*/
function getCookie(cvs_id)
{
    var arr = document.cookie.match(new RegExp("(^| )" + cvs_id + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;
}

/*
*请求函数
*/
function ajax(opt){
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || 'POST';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.success = opt.success || function(){};
    var xhr = new XMLHttpRequest();
    var params = [];
    for(var key in opt.data){
        params.push(key + '=' + opt.data[key]);
    }
    var postData = params.join('&');
    if(opt.method == 'POST'){
        xhr.open(opt.method,opt.url,opt.async);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(postData);
    }else if(opt.method == 'GET'){
        opt.url += opt.url.indexOf('?') > -1 ? postData : '?' + postData;
        xhr.open(opt.method,opt.url);
        xhr.send(null);
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            opt.success(JSON.parse(xhr.responseText));
        }
    }
}

/**
 * 监听message事件
 */
window.addEventListener('message',function(e){
    if(!isLoadHandler) return;
    if(!e.data){
        return;
    }

    var data = JSON.parse(e.data),
        type = data.type;

    if(type == 'play'){
        // CKobject.getObjectById('ckplayer_a1').videoPlay();
        player.videoPlay();
        return;
    }
    if(type == 'pause'){
        // CKobject.getObjectById('ckplayer_a1').videoPause();
        player.videoPause();
        return;
    }
},false);





// ckplayer X 新版播放器  🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕 🐕
/*
* 说明：
*      目前PC强制使用flash WAP使用H5
*      关于自动播放：PC支持，H5不一定 参考：http://www.ckplayer.com/manual/11/8.htm  https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html
*      播放器在H5下不支持广告投放 参考：优酷 芒果等H5 广告只支持flash下播放
*      RTMP流不支持在H5下播放 视频格式推荐：MP4 M3U8 参考：http://www.ckplayer.com/manualx/11.html
 */

function getVideoType(url) {//根据视频url获取视频类型
    var vtype='video/mp4';
    if(/.m3u8/.test(url.toLocaleLowerCase())){
        vtype='video/m3u8';
    }
    return vtype;
}

var VideoArr=[];
function getVideoArr(deft,deff) {//拼接video数组，注意考虑播控情况，如果开启了播控，则不存在清晰度切换
    VideoArr=[];

    if (php_vid && !isBoKong) {
        //非播控状态，存在清晰度
        var deft_arr=deft.split(',');
        var deff_arr=deff.split('|');
        for(var x in deft_arr){
            if(deff_arr[x].split('ckplayer/m3u8.swf?')[1]){
                var arrtmp=[deff_arr[x].split('?')[1],'video/mp4',deft_arr[x],0];
            }else{
                var arrtmp=[deff_arr[x],'video/mp4',deft_arr[x],0];
            }
            VideoArr.push(arrtmp)
        }
    } else {
        //播控状态，不存在清晰度
        VideoArr=flashA ? flashA : videoUrl
    }
}

// 广告相关代码
function playerHandler() {//开始播放
    $('.player-ad').remove();
}
function pauseHandler2() {//暂停播放
    $('.player-ad').remove();
    $('#ck_loading').after(ad_html('pause'));
}

function ad_time(callback) { // 片头广告倒计时
    var at;
    var defTime=beginTime?beginTime:5;//广告时长
    function cutTimeFun() {
        clearInterval(at);
        at=setInterval(function () {
            clearInterval(at);
            --defTime;
            $('.player-ad-time').html(defTime);
            if(defTime<1){ // 片头广告播放结束，执行视频播放逻辑
                $('.player-ad').remove();
                $('#a1').css({
                    'visibility':'visible'
                });
                if(callback){
                    callback.call()
                }else{
                    player.videoPlay(); // 执行播放器播放操作
                }
                clearInterval(at);
            }else{
                cutTimeFun();
            }

        },1000)
    }
    cutTimeFun();
}

function ad_html(type) { // 生成广告html代码  params:front pause
    var adhtml='';
    var adhtml2='';
    function ad_typehtml(adurl, adlink) {//按图片&视频广告生成html
        if(/\.mp4/.test(adurl)){ // 视频广告
            ht= adurl ? '            <!--视频广告-->' +
                '            <a class="ad-link" href="' + (adlink ? adlink : 'javascript:;') + '" target="' + (adlink ? '_blank' : '_self') + '">' +
                '                <video id="ad-video" src="'+ adurl +'"  muted="muted" loop="loop" autoplay="autoplay" webkit-playsinline="true" playsinline="true"></video>' +
                '            </a>' : ''
        }else{ // 图片广告
            ht= adurl ? '            <!--图片广告-->' +
                '            <a class="ad-link" href="' + (adlink ? adlink : 'javascript:;') + '" target="' + (adlink ? '_blank' : '_self') + '">' +
                '                <img src="'+ adurl +'" alt="">' + '<label class="close" onClick="$(`.player-ad`).remove()"></label>' +
                '            </a>' : ''
        }
        return ht;
    }
    switch (type){
        case 'front'://片头广告
            var adhtmlTMP=ad_typehtml(beginAd, beginlink);
            adhtml2='<div class="player-front">' +
            '            <p class="cuttime">广告剩余 <span class="player-ad-time">'+ beginTime +'</span> 秒</p>' +
            adhtmlTMP +
            '        </div>';
            break;
        case 'pause': //暂停广告
            var adhtmlTMP=ad_typehtml(pauseAd, pauselink);
            adhtml2='<div class="player-pause">' +
            adhtmlTMP +
                '        </div>';
            break;
    }
    adhtml='<div class="player-ad">' + adhtml2 + '</div>';
    return adhtml;
}

function ad_front() { // 片头广告逻辑 param:片头广告url  时长 链接 -> beginAd , beginTime , beginlink
    if(beginAd){//存在片头广告
        if(autoPlay){//自动播放
            $('.player-ad').remove();
            $('#ck_loading').after(ad_html('front'));
            document.addEventListener("WeixinJSBridgeReady",function() { 
                document.getElementById('ad-video').play(); 
            }, false);
            $('#a1').css({
                'visibility':'hidden'
            });
            // document.getElementById("ad-video").play();

            ad_time();// 执行片头广告倒计时
        }else{//非自动播放
            console.log('123')
            var ft;
            clearInterval(ft);
            ft=setInterval(function () {
                if(videoFirstPlay==0){
                    $('.player-ad').remove();
                    $('#ck_loading').after(ad_html('front'));
                    $('#a1').css({
                        'visibility':'hidden'
                    });
                    ad_time();// 执行片头广告倒计时


                    clearInterval(ft);
                    player.videoPause();
                    ad_time(function () {
                        if(breakPoint){
                            player.videoSeek(videoFirstSeek);
                        }else{
                            player.videoPlay();
                        }
                    });
                }
            },0)
        }
    }else{//无片头广告
        if(autoPlay){//自动播放
            setTimeout(function () {
                player.videoPlay();
            },600)
        }
    }
}
// 广告相关代码 End

function init() {

    getVideoArr(deft,deff);
    isBoKong=false;
    videoFirstPlay=0;
    videoFirstSeek=undefined;
    var videoObject = {
        container: '#a1', //“#”代表容器的ID，“.”或“”代表容器的class
        variable: 'player', //该属性必需设置，值等于下面的new ckplayer()的对象
        poster: thumb,//视频封面图url
        html5m3u8:true, // 使用H5模式播放m3u8
        flashplayer: false, // 强制使用flash播放
        autoplay: getUrlParam(href,"autoStart")==1?true:false,
        live:islive,//是否为直播
        //广告部分开始
        //advertisements:'website:./ad.json', //适用于将广告配置独立为文件的模式
        // adfront: beginAd,//'a,b', //前置广告
        // adfronttime: beginTime,//'5,3',
        // adfrontlink: beginlink,//'a,b',
        // adpause: pauseAd,//'a,b', //暂停广告
        // adpausetime: pauseTime,
        // adpauselink: pauselink,
        //广告部分结束
        loaded:'loadedHandler', //当播放器加载后执行的函数
        video: VideoArr//[['http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4', 'video/mp4', '中文标清', 0],
            //['http://img.ksbbs.com/asset/Mon_1703/d0897b4e9ddd9a5.mp4', 'video/mp4', '中文高清', 0],
            //['http://img.ksbbs.com/asset/Mon_1703/eb048d7839442d0.mp4', 'video/mp4', '英文高清', 10],]//flashA ? flashA : videoUrl//'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4' //视频地址 http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8
    };
    console.log(videoObject)
    player = new ckplayer(videoObject);
    //console.log(player.playerType) //获取播放器类型【html5video  flashplayer】
    document.getElementById("ck_loading").style.display = "none";
    var playerT;
    clearInterval(playerT);
    playerT=setInterval(function () {
        if(isLoadHandler){
            clearInterval(playerT);
            ad_front();//检测是否有片头广告，有就执行片头广告逻辑
        }
    },0);
}
