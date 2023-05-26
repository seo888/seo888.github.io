;(function(w) {
    var scriptUrl = "https://j.rednet.cn/js/jquery-1.11.3.min.js";
    var baseUrl='';
    var protocolStr = window.location.protocol == 'https:' ? 'https:' : 'http:';
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
          if (typeof this !== "function") {
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
          }
          var aArgs = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP = function () {},
          fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis
            ? this
            : oThis,
            aArgs.concat(Array.prototype.slice.call(arguments)));
          };
          fNOP.prototype = this.prototype;
          fBound.prototype = new fNOP();
          return fBound;
      };
    }

/** 临时过滤注销 **/
var local_kaifu=window.location.href.indexOf('kaifuxw.com');
if(local_kaifu==-1){

    if ((window.location.href.indexOf('172.16.6.2')==-1)){//判断是否是生产环境
        baseUrl = protocolStr +'//front-web.rednet.cn/gg-content/'
    }else{
        baseUrl = protocolStr+'//172.16.6.49:8080/gg-content/'
    }

}

    /**
     * @param {} target 事件目标
     * @param {} type 添加的事件类型
     * @param {} handler 事件处理函数
     */
    var  addListerEvent=(function () {
        //能力检测
        if(window.addEventListener){
            return function (target,type,handler) {
                target.addEventListener(type,handler,false)
            }
        }else if(window.attachEvent){
            return function (target, type, handler) {
                target.attachEvent('on'+type,handler)
            }
        }
    })()

     

    /**
     * @param  {} SID 站点ID
     * @param  {} 
     */
    function RedAd(el, SID) {
        if (!el) {
            throw new Error("请传入广告挂载位置");
        } else if (!SID) {
            throw new Error("请传入站点ID");
        }
        this.siteId = SID;
        this.adId = el.split('_')[1];
        this.adInfoObj={};
        this.$el = el
        try {
            this._appendScript('https://cdn.bootcss.com/jquery-ajaxtransport-xdomainrequest/1.0.4/jquery.xdomainrequest.min.js',this._init.bind(this))
        } catch (error) {
            console.log(error)
        }
        
    }

    RedAd.prototype={
        constructor:RedAd,
        jqueryFlag:0,
        //初始化
        _init:function () {
            var _self = this;
            
            if (!window.jQuery ) {
                try {
                    var scriptJq = document.querySelectorAll('.script');
                } catch (error) {
                    console.log(error)
                }
                
                var scriptJqLen = scriptJq.length;
               if (scriptJqLen > 0) {
                for (i = 0; i < scriptJqLen; i++) {
                    var parent = scriptJq[i].parentElement;
                    parent.removeChild(scriptJq[i])
                }
               }

                _self._loadScript(scriptUrl, function () {
                    _self._readInfo()
                })
            } else {
               _self._readInfo()
               
            }
            
            
        },

        //渲染广告
        _render:function(ADINFO) {
            switch (ADINFO.displayId) {
                case 1:
                    this.initSlideTlAd(ADINFO)//下滑通栏1/3
                    break;
                case 2:
                    this.initSkyscraper(ADINFO)//摩天楼独播
                    break;
                case 3:
                    this.initTlAd(ADINFO)//通栏
                    break;
                case 4:
                    this.initDoubleFace(ADINFO)//双翻面
                    break;
                case 5:
                    this.initTextLink(ADINFO)//文字链
                    break;
                case 6:
                    this.initCenterJoint(ADINFO)//中缝
                    break;
                case 7:
                    this.initCenterJoint(ADINFO)//旗帜
                    break;
                case 8:
                    this.initColumnAd(ADINFO)
                    break;
                case 9:
                    this.initTlAd(ADINFO)
                    break;
            }
            
        },

        _creatFlash: function(obj){
            var resultStr = '<div  style="position: relative">' +
                '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"   width="' + obj.width + '" height="' + obj.height + '">' +
                '<param name="movie" value="' + obj.falshUrl + '" />' +
                '<param name="play" value="true" /> ' +
                '<!--[if !IE]>-->' +
                '<object type="application/x-shockwave-flash" data="' + obj.falshUrl + '" width="' + obj.width + '" height="' + obj.height + '">'
                '<!--<![endif]-->'
                '<p>Alternative content</p>'
                '<!--[if !IE]>-->'
                '</object>'
                '<!--<![endif]-->'
                '</object>'
                '</div>'
            return resultStr
        },
        _creatPic:function(redUrl,picUrl,width,height){
            if(redUrl){
				var ContentId=request(decodeURIComponent(redUrl),"adContentId");
				if(ContentId){
					var redUrl=decodeURIComponent(request(redUrl,"adUrl"));
					return '<div><a href="' + redUrl + '" target="_blank"><img onclick="ggClick('+ContentId+');" width="' + width + '" height="' + height +'" src="' + picUrl + ' "></a></div>'
				}else{
					return '<div><a href="' + redUrl + '" target="_blank"><img width="' + width + '" height="' + height +'" src="' + picUrl + ' "></a></div>'
				}
                //return '<div><a href="' + redUrl + '" target="_blank"><img width="' + width + '" height="' + height +'" src="' + picUrl + ' "></a></div>'

            }else{
                return '<div><img width="' + width + '" height="' + height +'" src="' + picUrl + ' "></div>'
            }
        },
        //获取广告元素信息
        _readInfo:function () {
            var _self = this
            jQuery.support.cors = true;
            jQuery.ajaxSetup({
                xhr: function() {
                    if(window.ActiveXObject){
                        return new window.ActiveXObject("Microsoft.XMLHTTP");
                    }else{
                        return new window.XMLHttpRequest();
                    }
                }
            });
            $.ajax({
                url:baseUrl + this.adId + '/' + this.siteId,
                dataType: "json",
                type: "GET",
                cache:false,
                success:function(data, status) {
                    _self._render(data)
                },
                error:function(error) {
                    console.log(error)
                }
            })       
        },
        creatLabel: function(pEl, label) {
            var labelItem = $("<span>" + label + "</span>").css({
                "position": "absolute",
                "right": 0,
                "bottom": 0,
                "background": "black",
                "opacity": 0.5,
                "color": "white",
                "font-size": "12px",
                "padding": "1px 3px",
            })
            return $(pEl).css({
                "position": "relative"
            }).append(labelItem).prop('outerHTML')
        },

        //通栏广告
        initTlAd:function(INFO) {
            var ad_root_wrap = $('#'+this.$el).parent(), 
                contentList = INFO.contentList||[],
                contentLen = contentList.length,
                indexScroll = 0,
                adHtmlStr='';
                _self=this;
                if (INFO.wheelPlayFlag) { //通栏 轮播
                  
                    var intervalHandler=function () {
                        if (indexScroll >= contentLen) {
                            indexScroll = 0;
                        }
                        var curAdContent = contentList[indexScroll].adPictureList[0];
                        ad_root_wrap.html('')//切换前 清空广告
                        if (contentList[indexScroll].contentType === 2) {//图片广告
                            adHtmlStr = _self._creatPic(contentList[indexScroll].redUrl, curAdContent.pictureUrl, INFO.width, INFO.height);
                          
                        } else if (contentList[indexScroll].contentType === 3) {//flash广告
                            var flashInfo={
                                falshUrl: curAdContent.pictureUrl,
                                width: INFO.width,
                                height: INFO.height
                            }
                            adHtmlStr = _self._creatFlash(flashInfo)
                       
                        } else if (contentList[indexScroll].contentType === 4) {
                            adHtmlStr = contentList[indexScroll].code
                        }else{
                            adHtmlStr = _self._creatPic(contentList[indexScroll].redUrl, curAdContent.pictureUrl, INFO.width, INFO.height);
                        }
                        if (contentList[indexScroll].labelFlag){//是否有标签
                            adHtmlStr = _self.creatLabel(adHtmlStr, contentList[indexScroll].adLabel)
                        }
                        
                        ad_root_wrap.append($(adHtmlStr))
                        indexScroll++
                    }
                    if(!contentList[0].adPictureList[0].pictureUrl || contentList[0].adPictureList[0].pictureUrl ==''){
                        return;
                    }
                    intervalHandler()
                    if (contentList.length>1){
                        setInterval(function () {
                            intervalHandler()
                        }, INFO.intervalTime * 1000);
                    }
                    
                }else{
                     var curAdContent = contentList[0].adPictureList[0];
                     if(!curAdContent.pictureUrl || curAdContent.pictureUrl ==''){
                         return;
                     }
                     if (contentList[0].contentType === 2) {//图片
                         adHtmlStr = _self._creatPic(contentList[0].redUrl, curAdContent.pictureUrl, INFO.width, INFO.height);
                     } else if (contentList[0].contentType === 3) {//flash
                         adHtmlStr = _self._creatFlash({
                            falshUrl: curAdContent.pictureUrl,
                            width: INFO.width,
                            height: INFO.height
                        })
                     }else if (contentList[0].contentType === 4) {
                         adHtmlStr = contentList[0].code
                     }else{//默认广告
                         adHtmlStr = _self._creatPic(contentList[0].redUrl, curAdContent.pictureUrl, INFO.width, INFO.height);
                     }
                    if (contentList[0].labelFlag) { //是否有标签
                        adHtmlStr = _self.creatLabel(adHtmlStr, contentList[0].adLabel)
                    }
                    ad_root_wrap.append($(adHtmlStr))
                }
                $('#'+this.$el).remove()
        },

        //下滑通栏1/3展现
        initSlideTlAd: function (INFO) {
            var ad_root_wrap = $('#' + this.$el).parent(),
                label = ''
                contentList = INFO.contentList||[],
                adHtmlStr = '';
                
            var i = parseInt(contentList.length * Math.random());
            var curAdContent = contentList[i];
            var curAdPicList = curAdContent.adPictureList[0]
            if((!curAdPicList.smallPictureUrl || curAdPicList.smallPictureUrl=='') || (!curAdPicList.pictureUrl || curAdPicList.pictureUrl=='')){
                return;
            }
            var _self=this;
            if (INFO.telescopicFlag){//有伸缩状态
                var arrBanner = '',
                    arrSmall = '',
                    B = '',
                    S = '';
                //伸展广告内容
                if (curAdContent.contentType==3){
                    arrBanner = _self._creatFlash({
                        falshUrl: curAdPicList.pictureUrl,
                        width: INFO.width,
                        height: INFO.height
                    })
                } else if (curAdContent.contentType == 2) {
                    arrBanner = _self._creatPic(curAdContent.redUrl, curAdPicList.pictureUrl, INFO.width, INFO.height)//创建图片广告
                } else if (curAdContent.contentType == 4){//自定义代码
                    arrBanner = curAdContent.code
                }else{ //默认广告
                     arrBanner = _self._creatPic(curAdContent.redUrl, curAdPicList.pictureUrl, INFO.width, INFO.height) //创建图片广告
                }
                
                //收缩广告内容
                if (curAdContent.smallContentType == 2){
                    
                    arrSmall = _self._creatPic(contentList[0].redUrl, curAdPicList.smallPictureUrl, INFO.smallWidth, INFO.smallHeight)//创建图片广告

                } else if (curAdContent.smallContentType == 3){//falsh
                    arrSmall = _self._creatFlash({
                        falshUrl: curAdPicList.smallPictureUrl,
                        width: INFO.smallWidth,
                        height: INFO.smallHeight
                    })
                } else if (curAdContent.smallContentType == 4){//自定义
                    arrSmall = curAdContent.smallCode
                }else{//默认广告
                     arrSmall = _self._creatPic(contentList[0].redUrl, curAdPicList.smallPictureUrl, INFO.smallWidth, INFO.smallHeight) //创建图片广告
                }
 
                S = '<div id="sbs_' + this.$el + '_' + this.siteId + '_' + this.adId + '"  style="overflow: hidden; width: ' + INFO.smallWidth + 'px; height: ' + INFO.smallHeight +'px; background-color: white; top: 0px; z-index: 1;     cursor: pointer; padding: 0px; margin: 0px auto; border:none;  display: none; background-position: initial initial; background-repeat: initial initial;" onmouseover="this.style.display=\'none\';document.getElementById(\'sbb_' + this.$el + '_' + this.siteId + '_' + this.adId + "\').style.display=\'block\';\">" + arrSmall + '</div>';
                B = '<div id="sbb_' + this.$el + '_' + this.siteId + '_' + this.adId + '"  style="overflow: hidden; width: ' + INFO.width + 'px; height: ' + INFO.height +'px; background-color: white; z-index: 2; cursor: pointer; padding: 0px; margin: 0px auto; border:none; background-position: initial initial; background-repeat: initial initial;" onmouseout="this.style.display=\'none\';document.getElementById(\'sbs_' + this.$el + '_' + this.siteId + '_' + this.adId+ "\').style.display=\'block\';\">" + arrBanner + '</div>';
                if (curAdContent.labelFlag){
                    S = _self.creatLabel(S, curAdContent.adLabel)//创建标签
                    B = _self.creatLabel(B, curAdContent.adLabel)
                }
               
                ad_root_wrap.append($(S+B))
                // 定时切换成小图
                setTimeout(function () {
                    document.getElementById('sbs_' + _self.$el + '_' + _self.siteId + '_' + _self.adId).style.display = 'block';
                    document.getElementById('sbb_' + _self.$el + '_' + _self.siteId + '_' + _self.adId).style.display = 'none';
                }, 10000);
            }else{
                if (contentList[0].contentType == 3) {
                    adHtmlStr = _self._creatFlash({
                        falshUrl: curAdPicList.pictureUrl,
                        width: INFO.width,
                        height: INFO.height
                    })
                } else if (contentList[0].contentType == 2) {
                    adHtmlStr = _self._creatPic(contentList[0].redUrl, curAdPicList.pictureUrl, INFO.width, INFO.height)//创建图片广告
                } else if (contentList[0].contentType == 4) { //自定义代码
                    adHtmlStr = contentList[0].code
                } else { //默认广告
                    adHtmlStr = _self._creatPic(contentList[0].redUrl, curAdPicList.pictureUrl, INFO.width, INFO.height) //创建图片广告
                }
                if (contentList[0].labelFlag) { //创建标签
                    adHtmlStr = _self.creatLabel(S, contentList[0].adLabel)
                }
                ad_root_wrap.append($(adHtmlStr))
            }
            $('#' + this.$el).remove()
        },

        //首页摩天楼独播
        initSkyscraper:function(INFO){
            (function (adInfo,_self) {
                var contentList = adInfo.contentList[0]
                if((!contentList.adPictureList[0].smallPictureUrl || contentList.adPictureList[0].smallPictureUrl=='') || (!contentList.adPictureList[0].pictureUrl || contentList.adPictureList[0].pictureUrl=='')){//如果图片链接为空不显示
                    return;
                }
                
                if ((/iphone|ipad|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase())) || (/\.so\.com|\.360\.cn|\.qihoo\.com/i.test(document.referrer))) return;
                // 广告素材
                var lm = '<a href="' + contentList.redUrl + '" target="_blank"><img src="' + contentList.adPictureList[0].smallPictureUrl + '" border="0" width="' + adInfo.smallWidth + '" height="' + adInfo.smallHeight +'"></a>',
                    lb = '<a href="' + contentList.redUrl + '" target="_blank"><img src="' + contentList.adPictureList[0].pictureUrl + '" border="0" width="' + adInfo.width + '" height="' + adInfo.height +'"></a>',
                    rm = '<a href="' + contentList.redUrl + '" target="_blank"><img src="' + contentList.adPictureList[0].smallPictureUrl + '" border="0" width="' + adInfo.smallWidth + '" height="' + adInfo.smallHeight + '"></a>',
                    rb = '<a href="' + contentList.redUrl + '" target="_blank"><img src="' + contentList.adPictureList[0].pictureUrl + '" border="0" width="' + adInfo.width + '" height="' + adInfo.height + '"></a>';
                if (!contentList.redUrl||contentList.redUrl==''){ //如果广告链接为空
                    lm = '<img src="' + contentList.adPictureList[0].smallPictureUrl + '" border="0" width="' + adInfo.smallWidth + '" height="' + adInfo.smallHeight +'">',
                    lb = '<img src="' + contentList.adPictureList[0].pictureUrl + '" border="0" width="' + adInfo.width + '" height="' + adInfo.height +'">',
                    rm = '<img src="' + contentList.adPictureList[0].smallPictureUrl + '" border="0" width="' + adInfo.smallWidth + '" height="' + adInfo.smallHeight + '">',
                    rb = '<img src="' + contentList.adPictureList[0].pictureUrl + '" border="0" width="' + adInfo.width + '" height="' + adInfo.height + '">';
                }
                // 添加定位框
                lm = '<div id="__lm__" style="overflow: hidden; width: ' + adInfo.smallWidth + 'px; height: ' + adInfo.smallHeight +'px; position: fixed; left: 0px; background-color: white; top: 10px; z-index: 1; cursor: pointer; right: auto; bottom: auto; padding: 0px; margin: 0px; border: 0px; font-size: 0px; visibility: hidden; background-position: initial initial; background-repeat: initial initial;" onmouseover="this.style.visibility=\'hidden\';__lb__.style.visibility=\'visible\';">' + lm + '</div>';

                lb = '<div id="__lb__"  style="overflow: hidden; width: ' + adInfo.width + 'px; height: ' + adInfo.height + 'px; position: fixed; left: 0px; background-color: white; top: 10px; z-index: 2; cursor: pointer; right: auto; bottom: auto; padding: 0px; margin: 0px; border: 0px; font-size: 0px; visibility: visible; background-position: initial initial; background-repeat: initial initial;font-size:16px;color:#000;"  onmouseout = "this.style.visibility = \'hidden\'; __lm__.style.visibility = \'visible\';">' + lb + '</div>';

                rm = '<div id="__rm__"  style="overflow: hidden; width: ' + adInfo.smallWidth + 'px; height: ' + adInfo.smallHeight +'px; position: fixed; left: auto; background-color: white; top: 10px; z-index: 1; cursor: pointer; right: 0; bottom: auto; padding: 0px; margin: 0px; border: 0px; font-size: 0px; visibility: hidden; background-position: initial initial; background-repeat: initial initial;" onmouseover="this.style.visibility=\'hidden\';__rb__.style.visibility=\'visible\';">' + rm + '</div>';

                rb = '<div id="__rb__"  style="overflow: hidden; width: ' + adInfo.width + 'px; height: ' + adInfo.height + 'px; position: fixed; left: auto; background-color: white; top: 10px; z-index: 2; cursor: pointer; right: 0; bottom: auto; padding: 0px; margin: 0px; border: 0px; font-size: 0px; visibility: visible; background-position: initial initial; background-repeat: initial initial;" onmouseout="this.style.visibility=\'hidden\';__rm__.style.visibility=\'visible\';">' + rb + '</div>';

                btn = '<a id="__lc__" href="javascript:void(0);" style="visibility:hidden;width:10px;height:10px;line-height:10px;font-size:10px;border:1px solid #666;text-align:center;color:#666;text-decoration:none;background-color:#eee;position:fixed;top:260px;left:0;z-index:2;" onclick="__lb__.style.visibility=\'hidden\';__lm__.style.visibility=\'hidden\';this.style.visibility=\'hidden\';return false;">X</a><a id="__rc__" href="javascript:void(0);" style="visibility:hidden;width:10px;height:10px;font-size:10px;line-height:10px;border:1px solid #666;text-align:center;color:#666;text-decoration:none;background-color:#eee;position:fixed;top:260px;right:0;z-index:2;" onclick="__rb__.style.visibility=\'hidden\';__rm__.style.visibility=\'hidden\';this.style.visibility=\'hidden\';return false;">X</a>';
                // 写入文档
                if (contentList.labelFlag){//创建标签
                    lm = _self.creatLabel(lm, contentList.adLabel)
                    lb = _self.creatLabel(lb, contentList.adLabel)
                    rm = _self.creatLabel(rm, contentList.adLabel)
                    rb = _self.creatLabel(rb, contentList.adLabel)
                }
                if(INFO.fixFlag){
                    $('body').append($(rm + rb + btn));
                    // 定时切换成小图
                    setTimeout(function () {
                        __rm__.style.visibility = 'visible';
                        __rb__.style.visibility = 'hidden';
                        __rc__.style.visibility = 'visible';

                    }, 8000);
                }else{
                    $('body').append($(lm + lb + btn));
                    // 定时切换成小图
                    setTimeout(function () {
                        __lm__.style.visibility = 'visible';
                        __lb__.style.visibility = 'hidden';
                        __lc__.style.visibility = 'visible';
                    }, 8000);
                }
                // $('body').append($(lm+lb+rm+rb+btn));

                
                $('#' + _self.$el).remove()
            }(INFO,this));
        },

        //双翻面广告
        initDoubleFace:function(INFO){
            var index = 0;
            var ad_root_wrap = $('#' + this.$el).parent();
            var picList =[];
            var _self=this;
            INFO.contentList.forEach(function(item){
                var pushHTML='';
                if(!item.adPictureList[0].pictureUrl || item.adPictureList[0].pictureUrl ==''){
                    return;
                }
                if (item.contentType==2){
                    pushHTML = _self._creatPic(item.redUrl, item.adPictureList[0].pictureUrl, INFO.width, INFO.height)
                } else if (item.contentType == 3){
                    pushHTML = _self._creatFlash({
                        falshUrl: item.adPictureList[0].pictureUrl,
                        width: INFO.width,
                        height: INFO.height
                    })
                } else if (item.contentType == 4){//自定义广告
                    pushHTML=item.code
                } else if(item.contentType ==1){//文字链
                    pushHTML = '<div><a href="' + item.redUrl + '" target="_blank">' + item.content + '</a></div>'
                }else{//默认广告
                    pushHTML = _self._creatPic(item.redUrl, item.adPictureList[0].pictureUrl, INFO.width, INFO.height)
                }
                if (item.labelFlag){//创建标签
                    pushHTML = _self.creatLabel(pushHTML,item.adLabel)
                }
                picList.push(pushHTML)
            })
            ad_root_wrap.append($(picList[0]))
            setInterval(function () {
                index++;
                if (index >= picList.length) {
                    index = 0;
                }
                if (picList[index] == "") {
                    index = 0;
                } if (ad_root_wrap.html() != picList[index]) {
                    ad_root_wrap.html('')
                    ad_root_wrap.append($(picList[index]))
                } 
            }, INFO.intervalTime * 1000); 
            $('#' + _self.$el).remove()
        },

        //文字链
        initTextLink: function (INFO) {
            var ad_root_wrap = $('#' + this.$el).parent();
            var adHTmlStr = '<div style="width:' + INFO.width + 'px;height:' + INFO.height + 'px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"><a href="' + INFO.contentList[0].redUrl + '" target="_blank">' + INFO.contentList[0].content + '</a></div>'
            if (INFO.contentList[0].labelFlag){
                adHTmlStr = this.creatLabel(adHTmlStr, INFO.contentList[0].adLabel)
            }
            ad_root_wrap.append($(adHTmlStr))
            $('#' + this.$el).remove()
        },

        //中缝&&旗帜广告
        initCenterJoint: function (INFO){
            this.initTlAd(INFO)
        },

        //冠名栏目
        initColumnAd:function(INFO){
            var ad_root_wrap = $('#' + this.$el).parent();
            var curAdContent = INFO.contentList[0];
            var curAdPicInfo = curAdContent.adPictureList[0];
            if(!curAdPicInfo.pictureUrl || curAdPicInfo.pictureUrl ==''){
                return;
            }
            var adHtmlStr='';
            if (curAdContent.contentType==2){
                adHtmlStr = this._creatPic(curAdContent.redUrl, curAdPicInfo.pictureUrl, INFO.width, INFO.height)//创建图片广告
            } else if (curAdContent.contentType == 3){
                adHtmlStr = this._creatFlash({
                    falshUrl: curAdPicInfo.pictureUrl,
                    width: INFO.width,
                    height: INFO.height
                })
            } else if (curAdContent.contentType == 4) {
                adHtmlStr = contentList[0].code
            }else{
                adHtmlStr = this._creatPic(curAdContent.redUrl, curAdPicInfo.pictureUrl, INFO.width, INFO.height) //创建图片广告
            }
            if (curAdContent.labelFlag) { //创建标签
                adHtmlStr = this.creatLabel(adHtmlStr, curAdContent.adLabel)
            }
            ad_root_wrap.append($(adHtmlStr))
            $('#' + this.$el).remove()
        },

        //通用广告
        // initCommonAd:function(INFO){
        //     var ad_root_wrap = $('#' + this.$el).parent();
        //     var contentList=INFO.contentList;
        //     var _self=this;
        //     if(INFO.telescopicFlag){//是否可伸缩
        //         if (INFO.wheelPlayFlag && contentList.length>1) { //是否轮播
        //             var indexScroll=0;
        //             var intervalHandler = function () {
        //                 if (indexScroll >= contentLen) {
        //                     indexScroll = 0;
        //                 }
        //                 var curAdContent = contentList[indexScroll].adPictureList[0];
        //                 ad_root_wrap.html('') //切换前 清空广告
        //                 if (contentList[indexScroll].contentType === 2) { //图片广告
        //                     adHtmlStr = _self._creatPic(contentList[indexScroll].redUrl, curAdContent.pictureUrl, INFO.width, INFO.height);
        //                     ad_root_wrap.append($(adHtmlStr))
        //                 } else if (contentList[indexScroll].contentType === 3) { //flash广告
        //                     var flashInfo = {
        //                         falshUrl: curAdContent.pictureUrl,
        //                         width: INFO.width,
        //                         height: INFO.height
        //                     }
        //                     adHtmlStr = _self._creatFlash(flashInfo)
        //                     ad_root_wrap.append($(adHtmlStr))
        //                 } else if (contentList[indexScroll].contentType === 4) {
        //                     ad_root_wrap.append($(contentList[indexScroll].code))
        //                 }else{
        //                     adHtmlStr = '<div><a href="' + INFO.contentList[indexScroll].redUrl + '" target="_blank">' + INFO.contentList[indexScroll].content + '</a></div>'
        //                     ad_root_wrap.append($(adHtmlStr))
        //                 }
        //                 indexScroll++
        //             }
        //             intervalHandler()
        //             setInterval(function () {
        //                 intervalHandler()
        //             }, INFO.intervalTime * 1000);
        //         }
        //     }else{

        //     }
        // },
        //加载jq
        _loadScript: function (url, callback) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.setAttribute('class','script')
            if (script.readyState) { // IE
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else { // FF, Chrome, Opera, ...
                script.onload = function () {
                    callback();
                };
            }
            script.src = url;
            var redadscript = document.getElementById('rednetAd')
            document.getElementsByTagName("head")[0].insertBefore(script, redadscript);
        },
        _appendScript:function(url, callback) {
            var hasIe8 = document.querySelectorAll('.ie8ajax');
            if(!hasIe8.length){
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.setAttribute('class','ie8ajax')
                if (script.readyState) { // IE
                    script.onreadystatechange = function () {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            callback();
                        }
                    };
                } else { // FF, Chrome, Opera, ...
                    script.onload = function () {
                        callback();
                    };
                }
                script.src = url;
                document.getElementsByTagName("head")[0].appendChild(script);
            }else{
                callback();
            }
            
        }
        
    }

    window.RedAd = RedAd
    
})(window)

/*加载辟谣举报链接*/
var head= document.getElementsByTagName('head')[0];
var script= document.createElement('script');
script.type= 'text/javascript';
script.src= 'https://cdn.bootcss.com/jquery-ajaxtransport-xdomainrequest/1.0.4/jquery.xdomainrequest.min.js';
head.appendChild(script);
/*加载结束*/


function ggClick(vContentId){

var baseUrl='';
var protocolStr = window.location.protocol == 'https:' ? 'https:' : 'http:';
/** 临时过滤注销 **/
var local_kaifu=window.location.href.indexOf('kaifuxw.com');
if(local_kaifu==-1){

    if ((window.location.href.indexOf('172.16.6.2')==-1)){//判断是否是生产环境
        baseUrl = protocolStr +'//front-web.rednet.cn/gg-content/'
    }else{
        baseUrl = protocolStr+'//172.16.6.49:8080/gg-content/'
    }

}
$.ajax({url:baseUrl+"ggClick?ggContentId="+vContentId,success:function(result){
}});
	
	
}

function request(href,paras) {
            var url = href;
            var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
            var paraObj = {}
            for (i = 0; j = paraString[i]; i++) {
                paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
            }
            var returnValue = paraObj[paras.toLowerCase()];
            if (typeof (returnValue) == "undefined") {
                return "";
            } else {
                return returnValue;
            }
}