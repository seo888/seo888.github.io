var localUrl = window.location.href.split("?")[0];
var script = document.createElement("script");	
    script.src = 'https://uploads.dahe.cn/common/layer/layer.js';
    document.body.appendChild(script);

var replyMethod = {
    isLoginFlag: false,
    data:{
        newsId: document.getElementsByTagName('meta')['contentid'].content,
        title: $('.newsTitle h1').text()
    },
    data: {
        page: 1,
        length: 10,
        newsId: document.getElementsByTagName('meta')['contentid'].content,
        title: document.getElementsByTagName('title')[0].text
    },
    API: {
        check_user_islogin: "https://id.dahe.cn/dahe/sso/info",
        comment_history: "https://id.dahe.cn/dahe/service/comment/history",
        comment_news:"https://id.dahe.cn/dahe/service/comment/news",
        comment_dianzan:"https://id.dahe.cn/dahe/service/comment/dianzan"
    },
    init: function () {
        this.isLogin();
        this.toLogin();
        this.keyDown();
    },
    list: function () {
        var self = this;
        $.ajax({
            type: "GET",
            url: self.API.comment_history,
            async: true,
            dataType: 'jsonp',
            jsonp: 'jsonpCallback',
            jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            data: {
                page: 1,
                length: 100,
                newsUrl: localUrl,
                title:self.data.title,
                newsId:self.data.newsId
            },
            success: function (data) {
                $(".commentsListBox").html("");

                var num = 0;
                if (data.status == 1) {
                    $(".goodCommentsBox").show();
                    num = data.obj.count;
                    if(num<1){
                    	$(".goodCommentsBox").hide();
                    	return false;
                    }
                    // $(".people_num").html(num);
                    $.each(data.obj.data[0], function (index, item) {
                        var content = "";
                        if (item[1]) {
                            $.each(item[1], function (idnex, item) {
                                content += "<div class='pl_two cl'><div class='two_title cl'><img src='" + item.commentUserPic + "'><span>" + item.commentUserName + "</span></div><div class='two_content cl' style='word-wrap:break-word'>" + item.content + "</div></div>"
                            });
                        } else {
                            content = ""
                        }
                        var oli = $("<div class='cl'></div>");
                        var odiv_tit = $("<div class='odiv_tit cl'><img src='" + item[0].commentUserPic + "'><span>" + item[0].commentUserName + "</span></div>");
                        var odvi_con = $("<div class='odvi_con cl' style='word-wrap:break-word'>" + item[0].content + "</div>");
                        var odiv_zan = $("<div class='odiv_zan cl'>" +
                            "<span class='fl pl_time'>" + timeFormat(item[0].commentTime) + "</span>" +
                            "<span class='fr pl_hfnum'>" + item[0].commentCount + "</span>" +
                            "<span class='fr pl_rep' style='margin:0 10px;'><img style='display: block;float: left;margin-top: 5px' src='https://bang.dahe.cn/resources/mobile/img/comment.png'></span>" +
                            "<span class='fr pl_zannum'>" + item[0].dianzan_count + "</span>" +
                            "<span class='fr pl_zan' style='margin:0 10px;'><img  style='float: left;margin-top: 2px;' src='https://bang.dahe.cn/resources/mobile/img/zan.png'></span>" +
                            "</div>");
                        var odiv_two = $("<div class='odiv_two cl'>" + content + "</div>")
                        oli.append(odiv_tit);
                        oli.append(odvi_con);
                        oli.append(odiv_zan);
                        oli.append(odiv_two);
                        $(".commentsListBox").append(oli)
                        //二级评论回复写的ajax
                        odiv_zan.find(".pl_rep").click(function () {
                            self.dialog(item[0].id, item[0].commentUserName)
                        })
                        //点赞
                        odiv_zan.find(".pl_zan").click(function () {
                            if (self.isLoginFlag) {
                                $.ajax({
                                    type: "GET",
                                    url: self.API.comment_dianzan,
                                    async: true,
                                    dataType: 'jsonp',
                                    jsonp: 'jsonpCallback',
                                    jsonpCallback: "success_jsonpCallback",
                                    data: {
                                        commentId: item[0].id,
                                        newsUrl: localUrl,
                                        title:self.data.title,
                                        newsId:self.data.newsId
                                    },
                                    success: function (res) {
                                        if (data.status == 1) {
                                            odiv_zan.find(".pl_zannum").html(res.obj.number)
                                            if (res.obj.status == 0) {
                                                oli.find(".pl_zan img").attr("src", "https://bang.dahe.cn/resources/pc/img/zan.png");
                                            }
                                            if (res.obj.status == 1) {
                                                oli.find(".pl_zan img").attr("src", "https://bang.dahe.cn/resources/pc/img/zan_active.png");
                                            }
                                        } else {
                                            layer.msg(res.msg)
                                            // self.msg(res.msg, 1000);
                                        }
                                    }
                                });
                            } else {
                                $("#loginDiv").show();
                            }
                        })
                    });
                } else {
                    $(".people_num").html(num);
                }
            }
        });
    },
    // 评论
    toComment: function () {
        var self = this;
        $("#replyBtn").click(function () {
            //判断
            if (self.isLoginFlag) {
            	console.log(self.isLoginFlag)
                //一级评论
                $("#replyBtn").attr("disabled", true)
                $("#pl_text_con").val("")
                $.ajax({
                    type: "GET",
                    url: self.API.comment_news,
                    async: true,
                    dataType: 'jsonp',
                    jsonp: 'jsonpCallback',
                    jsonpCallback: "success_jsonpCallback",
                    data: {
                        content: $("#replayInput").val(),
                        newsUrl: localUrl,
                        newsId:self.data.newsId,
                        title : self.data.title,
                        pid: 0,
                    },
                    success: function (res) {
                        $("#replyBtn").attr("disabled", false);
                        layer.msg(res.msg)
                        // self.msg(res.msg, 2000);
                        $("#replayInput").val('');
                        if (data.status == 1) {
                            self.list();
                        }
                    },error:function (error) {
                    	console.log(error)
                    }
                });
            } else {
                $("#loginDiv").show()
            }

        })
    },
    msg: function (msg, time) {
        var odiv = $("<div style='position: fixed;left: 50%;top: 50%;padding: 10px;background:rgba(0,0,0,.6);color: #fff;font-size: 16px;margin-left: -40px;'>" + msg + "</div>");
        $("body").append(odiv)
        setTimeout(function () {
            odiv.remove()
        }, time)
    },
    dialog: function (pid, name) {
        var self = this;
        var odiag = $("<div style='width: 100%;height: 60px;position: fixed;bottom: 0;left: 0;background:#fff;border-top:1px solid #eeeeee;padding:10px 20px;'>" +
            "<input class='dia_content' placeholder='回复" + name + "' style='width: 260px;height: 40px;outline: none;font-size: 16px;float: left;padding-left: 25px;border:1px solid #eeeeee;border-radius: 30px;background:#f9f9f9;' >" +
            "<button class='dia_sub' style='width: 60px;height: 40px;font-size: 16px;border: 0;margin-left: 16px;color:#bebebe;font-size:18px;outline:none;float: left;position: absolute;right: 10px;'>回复</button>" +
            "</div>");
        $("body").append(odiag);
        $(".dia_sub").click(function () {
            $(".dia_sub").attr("disabled", true)
            var content = $(".dia_content").val();
            //判断
            if (!self.isLoginFlag) {
                $("#loginDiv").show()
            }else{
                $.ajax({
                    type: "GET",
                    url: self.API.comment_news,
                    async: true,
                    dataType: 'jsonp',
                    jsonp: 'jsonpCallback',
                    jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                    data: {
                        content: content,
                        newsUrl: localUrl,
                        newsId:self.data.newsId,
                        title : self.data.title,
                        pid: pid
                    },
                    success: function (res) {
                        $(".dia_sub").attr("disabled", false);
                        layer.msg(res.msg)
                        // self.msg(res.msg, 2000);
                        if (res.status == 1) {
                            self.list();
                            odiag.remove();
                        }
                    }       
                });
            }
        })
    },
    keyDown: function () {
        $(document).keydown(function (event) {
            if ($("#pl_text_con").val().length > 0) {
                $("#replyBtn").css("color", "#fa8d00")
            } else {
                $("#replyBtn").css("color", "#bebebe")
            }
            if ($(".dia_content").val()) {

                if ($(".dia_content").val().length > 0) {
                    $(".dia_sub").css("color", "#fa8d00")
                } else {
                    $(".dia_sub").css("color", "#bebebe")
                }
            }
        });
    },
    isLogin: function () {
        var _this = this;
        $.ajax({
            type: "GET",
            url: _this.API.check_user_islogin,
            async: true,
            dataType: 'jsonp',
            jsonp: 'jsonpCallback',
            jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success: function (data) {
                if (data.status==1) {
                    _this.isLoginFlag = true;
                }
                _this.list();
                _this.toComment();
            },
            error: function (request) {
                _this.list();
                _this.toComment();
            },
        });

        $(".tcClose").click(function(){
            $("#loginDiv").hide();
        })
    },
    toLogin: function () {
        var _this = this;
        $("#toLogin").click(function () {
            if(_this.data.isLoginFlag){
                $.ajax({
                    type: "GET",
                    url: 'https://id.dahe.cn/dahe/sso/login',
                    async: true,
                    dataType: 'jsonp',
                    jsonp: 'jsonpCallback',
                    jsonpCallback: "success_jsonpCallback",
                    data: {
                        username: $("#username").val(),
                        password: $("#password").val()
                    },
                    success: function (res) {
                        layer.msg(res.msg)
                        // _this.msg(res.msg, 1000)
                        if (res.status == 1) {
                            $("#loginDiv").hide();
                            _this.isLoginFlag = true;
                        }
                    }
                });
            }
        });

    }
}.init()

function timeFormat(timeStamp) {
    var timeToNow = Date.parse(new Date()) - timeStamp;
    //小于60秒
    if (timeToNow < 60 * 1000) {
        return "1分钟前";
    }
    if (timeToNow < 60 * 60 * 1000) {
        return parseInt(timeToNow / 60000) + "分钟前";
    }
    if (timeToNow < 12 * 60 * 60 * 1000) {
        return parseInt(timeToNow / 3600000) + "小时前";
    }
    return fmtDate(timeStamp);
}
function fmtDate(obj) {
    var date = new Date(obj);
    var y = 1900 + date.getYear();
    var m = "0" + (date.getMonth() + 1);
    var d = "0" + date.getDate();
    var h = date.getHours();
    h = h < 10 ? "0" + h : h;
    var mi = date.getMinutes();
    mi = mi < 10 ? "0" + mi : mi;
    return y + "年" + m.substring(m.length - 2, m.length) + "月" + d.substring(d.length - 2, d.length) + "日 " + h + ":" + mi;
}
