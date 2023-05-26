/**
 * 分享控件
 * TY src/ui 
 * @author kevin 
 * 2016-04-04 TY.ui.share.js v3
 * example:
 * new TY.ui.share({});
 */
//TY.namespace("ui");
//TY.loadedModule('TY.ui.share');

//依赖二维码插件



// TY.namespace("m");
// TY.loadedModule('TY.m.shareV2');

var TYShare = {};
(function($) {
    TYShare.m = {
        share: function(config) {
            TYShare.m.init(config);
        },
        init: function(config) {
            var urlO; //判断是否设置url
            if (config.url == "" || typeof(config.url) == "undefined") { urlO = true; } else {
                urlO = false;
            }

            this.setConfig(config);
            $("#TY_plug_share").length <= 0 ? this.insertHtml() : void(0);
            this.bindEvent(urlO);
        },
        setConfig: function(config) {
            this.defArgs = {
                "position": "bottom", //分享位置
                "show": false, //是否显示
                "linkShow": true, //复制是否显示
                "via": "", //分享方式
                "header": "分享到", //分享的标题
                "title": $("title").text(), //分享标题，默认为空
                "desc": "太赞了，快去围观_来自天涯社区", //分享要说的话
                "summary": "天涯社区，无处不在的相逢", //分享摘要，默认为空  
                "url": window.location.href, //分享链接，默认为当前
                //  "img": __inline("share_logo.jpg"), //分享图片，默认为空
                "renderCbk": function() { //dom构造之后的回调
                },
                "goWxBackCbk": function() {}
                //"img":"http://static.tianyaui.com/global/ty2.0/m/share/share_logo.jpg"
            };
            if (config.url == "") config.url = window.location.href;
            if (config.title == "") config.title = $("title").text();
            if (config.summary == "") config.summary = "天涯社区，无处不在的相逢";
            if (config.desc == "") config.desc = "太赞了，快去围观_来自天涯社区";
            // if (config.img == "") config.img = __uri("share_logo.jpg");
            //if(config.img=="")config.img="http://static.tianyaui.com/global/ty2.0/m/share/share_logo_e724003.jpg";
            this.args = $.extend({}, this.defArgs, config);
        },
        insertHtml: function() {

            //插入位置
            var pos = "bottom";
            var posto = "body";
            if (this.args['position'] == "top") {
                pos = "top:0;";
            } else if (this.args['position'] == "center") {
                pos = "top:50%;margin-top:-180px;";
            } else if (this.args['position'].indexOf("#") >= 0) {
                pos = "position:static; width:inherit;";
                posto = this.args['position']
            } else {
                pos = "bottom:0;";
            }




            var via = "<a href='javascript:void(0)' class='bds_tsina'   data-cmd='tsina'></a>";
            via += "<a href='javascript:void(0)' class='bds_qzone'  data-cmd='qzone'></a>";
            via += "<a href='javascript:void(0)' class='bds_douban'     data-cmd='douban'></a>";
            via += "<a href='javascript:void(0)' class='bds_weixin' data-cmd='wx'></a>";

            if (this.args['via'] != "") {
                via = "";
                for (i = 0; i < this.args['via'].length; i++) {
                    var t = this.args['via'][i];
                    via = via + "<a href='javascript:void(0)' class='bds_" + t + "' data-cmd='" + t + "'></a>";
                }
            }



            var wxLink = this.args['url'] == "" ? window.location : this.args['url']

            var share_html = "<div class='TY_plug_share' id='TY_plug_share' style='" + pos + "'>";
            share_html += "<h2><span>" + this.args['header'] + "</span></h2>";
            share_html += "<div class='bdsharebuttonbox'>" + via + "</div>";
            share_html += "<div class='copyToWx'>";
            share_html += "<a href='" + wxLink + "' target='_blank'>" + wxLink + "</a><p>长按链接文字拷贝链接，粘贴到微信分享~</p>";
            share_html += "</div>";

            share_html += "<div class='wx_qrcode'>";
            share_html += "<div id='wx_code'>请稍候。。。</div>";
            share_html += "<p>打开微信，点击右上角”+“号，使用”扫一扫“即可在微信内进行分享。</p>";
            share_html += "</div>";

            if (this.args['show'] && this.args['position'].indexOf("#") >= 0) { share_html += "<div class='btn_clo TY_plug_share_hide' style='display:none'>返 回</div>"; } else { share_html += "<div class='btn_clo'>取 消</div>"; }

            share_html += "</div>";

            var share_wx_html = "<div class='share_wx'>";
            share_wx_html += "<div class='share_wx_arrow'></div>";
            share_wx_html += "<div class='share_wx_tip'><div class='share_wx_text'></div><div class='share_wx_btn'></div></div>";
            share_wx_html += "</div>";
            share_wx_html += "<div class='TY_plug_share_cover' id='TY_plug_share_cover'></div>";

            $(posto).append(share_html);
            $("body").append(share_wx_html);

            this.args['renderCbk'] && this.args['renderCbk']();



            if (this.args['show']) {
                this.showShare();
            }


            var self = this;
            if (self.args.url.indexOf("?") != -1) {
                self.args.url += "&";
            }
            var s_url = encodeURIComponent(self.args.url);
            var s_title = encodeURIComponent(self.args.title);
            var s_summary = encodeURIComponent(self.args.summary);
            var s_img = encodeURIComponent(self.args.img);
            var s_desc = encodeURIComponent(self.args.desc);





            var gW = $(window).width();
            //新浪分享
            $(".bds_tsina").bind("click", function() {
                var t = 'http://service.weibo.com/share/share.php?url=' + encodeURIComponent(self.args.url) + '&title=' + s_title + '&content=utf-8&ralateUid=&appkey=&pic=' + s_img
                gW < 1024 ? location.href = t : window.open(t);

            });

            //qq空间
            $(".bds_qzone").bind("click", function() {
                var t = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(self.args.url) + '&desc=' + s_desc + '&summary=' + s_summary + '&title=' + s_title + '&site=天涯社区&pics=' + s_img;
                gW < 1024 ? location.href = t : window.open(t);
            });

            //腾讯博客
            $(".bds_tqq").bind("click", function() {
                var t = "http://share.v.t.qq.com/index.php?c=share&a=index&url=" + s_url + "&appkey=801235657&title=" + s_title + "&pic=" + s_img
                gW < 1024 ? location.href = t : window.open(t);
            });

            //天涯博客
            $(".bds_ty").bind("click", function() {
                var t = "http://open.tianya.cn/widget/send_for.php?action=send-html&shareTo=1&url=" + s_url + "&title=" + s_title + "&relateTYUserName=&flashVideoUrl=http%3A%2F%2Fwww.tianya.cn%231234%230-ty-1-8338-36c499a5aa21e7e1ad8d75f6bcf81488&picUrl=" + s_img;
                gW < 1024 ? location.href = t : window.open(t);
            });

            //百度贴吧
            $(".bds_tieba").bind("click", function() {
                var t = "http://tieba.baidu.com/f/commit/share/openShareApi?url=" + s_url + "&title=" + s_title + "&comment=" + s_summary + "&pic=" + s_img;
                gW < 1024 ? location.href = t : window.open(t);
            });


            //豆瓣
            $(".bds_douban").bind("click", function() {
                var t = "https://www.douban.com/share/service?href=" + s_url + "&amp;name=" + s_title + "&amp;text=" + s_summary + "&amp;image=" + s_img;
                gW < 1024 ? location.href = t : window.open(t);
            });

            //人人
            $(".bds_renren").bind("click", function() {
                var t = "http://widget.renren.com/dialog/share?resourceUrl=" + s_url + "&srcUrl=&title=" + s_title + "&description=" + s_summary + "&pic=" + s_img;
                gW < 1024 ? location.href = t : window.open(t);
            });
        },

        showShare: function() { //显示分享按钮
            if (!this.args['linkShow']) { //是否显示链接
                $(".copyToWx ").hide();
            }


            $("#TY_plug_share").show();
            if (this.args['position'].indexOf("#") < 0) {
                $("#TY_plug_share_cover").show();
            }
            if ($("#TY_plug_share").hasClass("seted")) {
                return;
            } else {
                if (this.args['via'] = "" || this.args['via'].length <= 4) {
                   $(".TY_plug_share .bdsharebuttonbox").height($(".TY_plug_share .bdsharebuttonbox").height() / 2);
                }
                if ($(".copyToWx a").height() < 20) {
                    $(".copyToWx").addClass("tc");
                }
                $("#TY_plug_share").addClass("seted")
            }

            //微信
        },
        bindEvent: function(urlO) { //显示分享按钮
            var self = this,
                isLoadQrcode = false;
            var userAgent = navigator.userAgent;
            var qrcode_data;
            if (userAgent.indexOf("MSIE 6.0") >= 0 || userAgent.indexOf("MSIE 7.0") >= 0 || userAgent.indexOf("MSIE 8.0") >= 0) {
                $("#TY_plug_share").addClass("TY_plug_share_forIE")
                qrcode_data = {
                    render: "table",
                    text: self.args.url //任意内容 
                }
            } else {

                qrcode_data = {
                    width: 160, //宽度 
                    height: 160, //高度 
                    text: self.args.url //任意内容 
                }
            }

            function makeQrcode() { //二维码
                if (!isLoadQrcode) {
                    isLoadQrcode = true;
                    TY.loader("TY.util.qrcode", function() {
                        $("#wx_code").html("").qrcode(qrcode_data);
                    })
                }
            }

            //关闭
            $("#TY_plug_share .btn_clo,#TY_plug_share_cover").click(function() {
                $("#TY_plug_share h2 span").html(self.args['header']);
                $("#TY_plug_share h2 span").removeClass("wx");
                $("#TY_plug_share .copyToWx").removeClass('copyToWx_b');
                $("#TY_plug_share .bdsharebuttonbox ").show();
                $("#TY_plug_share .wx_qrcode").hide();
                $("#TY_plug_share .btn_clo").removeAttr("style");
                if (self.args['position'].indexOf("#") >= 0 && self.args['show']) {
                    self.args['goWxBackCbk']();
                } else {
                    $("#TY_plug_share").hide();
                    $("#TY_plug_share_cover").hide();
                }
            });

            /*
            微信分享规则：
            1、未指定分享链接，微信、QQ、百度、欧朋浏览器箭头指示，未指定浏览器出现复制
            2、指定分享链接，所有微信分享默认出现复制模式
            */

            //微信
            $("#TY_plug_share .bds_weixin").click(function() {

                if ($(window).width() > 800) {
                    $("#TY_plug_share .bdsharebuttonbox").hide();
                    $("#TY_plug_share .wx_qrcode,.btn_clo").show();
                    $("#TY_plug_share h2 span").text("扫描二维码分享到微信");
                    makeQrcode();
                    if (self.args['position'].indexOf("#") >= 0 && self.args['show']) {
                        $("#TY_plug_share .btn_clo").show();
                    }
                    return;
                }

                var browseInfo = navigator.userAgent;

                if ((browseInfo.indexOf("MicroMessenger") >= 0 || (browseInfo.indexOf("QQ") >= 0 && browseInfo.indexOf("MQQBrowser") < 0)) && urlO) {
                    $(".share_wx").addClass("browse_rt");
                    $("#TY_plug_share").hide();
                    $(".share_wx,.TY_plug_share_cover").show();
                } //微信或者QQ自带浏览器
                else if ((browseInfo.indexOf("baidubrowser") >= 0) && urlO) {
                    $(".share_wx").addClass("browse_an_bd");
                    $("#TY_plug_share").hide();
                    $(".share_wx,.TY_plug_share_cover").show();
                } //百度浏览器   
                else if ((browseInfo.indexOf("OPiOS") >= 0) && urlO) {
                    $(".share_wx").addClass("browse_rb");
                    $("#TY_plug_share").hide();
                    $(".share_wx,.TY_plug_share_cover").show();
                } //OPEA浏览器
                else if ((browseInfo.indexOf("UCBrowser") >= 0) && urlO) {
                    $(".share_wx").addClass("browse_cb");
                    $("#TY_plug_share").hide();
                    $(".share_wx,.TY_plug_share_cover").show();
                } //OPEA浏览器
                else {
                    $(".copyToWx ").show();
                    $("#TY_plug_share .bdsharebuttonbox ").hide();
                    $("#TY_plug_share h2 span").text("复制链接分享到微信");
                    $("#TY_plug_share h2 span").addClass("wx");
                    $("#TY_plug_share .copyToWx").addClass('copyToWx_b');
                    if (self.args['position'].indexOf("#") >= 0 && self.args['show']) {
                        $("#TY_plug_share .btn_clo").show();
                    }
                }
                if (self.args['position'].indexOf("#") >= 0 && self.args['show']) {
                    $("#TY_plug_share").show();
                }


            });
            //微信确认
            $(".share_wx_btn").click(function() {
                $(".share_wx").hide();
                $(".TY_plug_share_cover").hide();

            })
        }
    }
    // TY.m.shareV2 = TYShare.m;

})(TY);

TY(document).ready(function() {
    // var link = document.createElement("link");
    // link.type = "text/css";
    // link.rel = "stylesheet";
    // link.href = "http://static.tianyaui.com/global/ty2.0/m/share/shareV2_c2a7a1d.css";
    // document.getElementsByTagName("head")[0].appendChild(link);
    $(".shareBox").html("");
    $(".shareBox").click(function(event) {
        TYShare.m.showShare()
    });

    new TYShare.m.share({
        //分享的位置 top/center/bottom,或者被置入的id
        "position": "center",
        //是否显示，默认不显示，true为显示,false为不显示
        "show": "",
        //默认所有类别，ty:天涯/weixin:微信/qzone:QQ空间/tqq:腾讯微博/tsina:新浪/douban:豆瓣/tieba:贴吧/renren:人人/
        "via": ["weixin", "qzone", "tsina", "douban"],
        //分享标题，默认为空
        "title": "",
        //分享摘要，默认为空
        "summary": "",
        //分享链接，默认为空,去当前url
        "url": "",
        //分享图片，默认为空
        "img": ""
    });
})