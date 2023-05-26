// 根据浏览器类型重定向
(function browserRedirect() {
    var mobileport = window.mobileport;
      var sUserAgent = navigator.userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
      var bIsIphone = sUserAgent.match(/iphone os/i) == 'iphone os';
      var bIsMidp = sUserAgent.match(/midp/i) == 'midp';
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
      var bIsUc = sUserAgent.match(/ucweb/i) == 'web';
      var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
      var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';
      var bIsAndroid = sUserAgent.match(/android/i) == 'android';

      if(bIsIpad || bIsIphone || bIsMidp || bIsUc7 || bIsUc || bIsCE || bIsWM || bIsAndroid ){
          if (mobileport)
              var pathname = location.pathname === "/user" ? "" : location.pathname;
              window.location.href = mobileport + pathname;
      }
    })();

$(function () {
    //账号
    function userName(namespace) {
        var re_name = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/; //只含有汉字、数字、字母、下划线
        var name = $(".fname", namespace).val().trim(); //trim  去掉左右空格
        var maxLength = 8;
        if (name) {
            var isOver = name.length > maxLength;
            if (isOver) {
                $(".name_txt", namespace).html("帐号不能超过" + maxLength + "个字符");
                $(".name_txt", namespace).css("color", "red");
                return false;
            }
            else if (!re_name.test(name)) {

                $(".name_txt", namespace).html("用户名只能含有汉字、数字、字母、下划线");
                $(".name_txt", namespace).css("color", "red");
                return false;
            }
            else {
                $(".name_txt", namespace).html("");
                return name;
            }
        } else {
            $(".name_txt", namespace).html("用户名不能为空");
            $(".name_txt", namespace).css("color", "red");
            return false;
        }
    }

    //手机号码
    function mobilePhone(namespace) {
        var re_phone = /^1[0-9]{10}$/;
        var phone = $(".phone", namespace).val().trim(); //trim  去掉左右空格
        if (phone) {
            if (!re_phone.test(phone)) {
                $(".phone_txt", namespace).html("用手机号码输入错误");
                $(".phone_txt", namespace).css("color", "red");
                return false;
            }
            else {
                $(".phone_txt", namespace).html("");
                return phone;
            }
        } else {
            $(".phone_txt", namespace).html("手机号码不能为空");
            $(".phone_txt", namespace).css("color", "red");
            return false;
        }
    }

    //密码
    function userPassword(namespace) {
        var re_pwd = /^([A-Za-z0-9]{6,15})$/; //只能由英文，数字组成
        console.log($(".password", namespace));
        var pawd = $(".password", namespace).val().trim();
        if (pawd) {
            if (re_pwd.test(pawd)) {
                $(".pwd_txt", namespace).html("");
                return pawd;
            } else {
                $(".pwd_txt", namespace).html("密码仅支持6-15位数字、字母");
                $(".pwd_txt", namespace).css("color", "red");
                return false;
            }
        } else {
            $(".pwd_txt", namespace).html("密码不能为空");
            $(".pwd_txt", namespace).css("color", "red");
            return false;
        }
    }
    //确认密码
    function rePassword(namespace) {
        var re_pwd = /^([A-Za-z0-9]{6,16})$/; //只能由英文，数字组成
        console.log($(".re-password", namespace));
        var pwd = $(".password", namespace).val().trim();
        var pawd = $(".re-password", namespace).val().trim();
        if (pawd) {
            if (pwd === pawd) {
                $(".re-pwd_txt", namespace).html("");
                return pawd;
            } else {
                $(".re-pwd_txt", namespace).html("两次输入密码不一致");
                $(".re-pwd_txt", namespace).css("color", "red");
                return false;
            }
        } else {
            $(".re-pwd_txt", namespace).html("密码不能为空");
            $(".re-pwd_txt", namespace).css("color", "red");
            return false;
        }
    }

    //验证码
    function yanZheng(namespace) {
        var verica = /^[0-9]{4}$/;
        var doe = $(".code", namespace).val().trim();
        console.log(doe);
        if (verica.test(doe)) {
            return doe;
        }
    }

    //点击手机验证
    $(".gain").click(function () {
        //先检查手机和密码
        var namespace = ".register";
        var the_type = $(this).data('type');
        if (the_type) {
            namespace = ".get-password";
            if (userName(namespace)) {

            } else {
                return false;
            }
        } else if (userName(namespace) && userPassword(namespace)) {

        } else {
            return false;
        }
        var username = userName(namespace);

        //发送验证码
        $.ajax({
            cache: true,
            type: "POST",
            url: "/login/send_msg.html",
            dataType: 'json',
            data: { mobile: username, type: the_type },
            success: function (data) {
                if (data['ret'] != 200) {
                    showmsg(false, data['data']);
                    return false;
                }
                $(".gain").unbind("click"); //移除click
                var time = 60;
                var id = setInterval(function () {
                    if (time > 0) {
                        $(".gain", namespace).html(time + "s");
                        time--;
                    } else {
                        $(".gain", namespace).html("获取验证码");
                        clearInterval(id);
                    }
                }, 1000);
            },
            error: function (data) {
                //setTime(namespace);
            }
        }, 'json');
        // setTime(namespace);
    });


    //获取焦点 失去焦点
    function clickFocus(namespace) {
        $(".num", namespace).on("focus", function () {
            $(this).css("border", "1px solid #ffde00");
        });
        $(".num", namespace).on("blur", function () {
            $(this).css("border", "1px solid #dddddd");
            userName(namespace);
        });

        $(".password", namespace).on("focus", function () {
            $(this).css("border", "1px solid #ffde00");
        });
        $(".password", namespace).on("blur", function () {
            $(this).css("border", "1px solid #dddddd");
            userPassword(namespace);
        });
        $(".re-password", namespace).on("focus", function () {
            $(this).css("border", "1px solid #ffde00");
        });
        $(".re-password", namespace).on("blur", function () {
            $(this).css("border", "1px solid #dddddd");
            rePassword(namespace);
        });

    }

    //密码显示状态
    function estate(namespace) {
        var on = true;
        $(".mima", namespace).on("click", "em", function () {
            if (on) {
                $(this).addClass("active");
                $(".mi", namespace).val($(".pasd", namespace).val());
                $(".mi", namespace).show();
                $(".ma", namespace).hide();
                on = false;
            } else {
                $(this).removeClass("active");
                $(".mi", namespace).hide();
                $(".ma", namespace).show();
                on = true;
            }
        });
    }
    //登录
    +function () {
            var namespace = ".login";
            clickFocus(namespace);
            $('.js_login').keydown(function (e) {
                if (e.keyCode == 13) {
                    login();
                }
            })
            $("#tj_but", namespace).on("click", function () {
                login();
            });

            function login() {
                var username = userName(namespace);
                var password = userPassword(namespace);
                if (userName(namespace) && userPassword(namespace)) {
                    goLogin(username, password);
                }
            }
        }();

    //登录账号
    function goLogin(username, password) {
        $.ajax({
            cache: true,
            type: "POST",
            url: "/Handler/Login.ashx",
            dataType: 'json',
            data: { username: username, password: password },
            success: function (data) {
                if (data.status == "200")
                {
                    showmsg(true, "登录成功");
                    setTimeout('delayer()', 1000);
                }
                else
                {
                    showmsg(false, data.msg);
                    return false;
                }
            },
            error: function (data) {

            }
        }, 'json');
    }
    //注册
    +function () {
            var namespace = ".register";
            clickFocus(namespace);
            estate(namespace);
            $('.js_reg').keydown(function (e) {
                if (e.keyCode == 13) {
                    register();
                }
            });
            //注册
            $("#regs", namespace).on("click", function () {
                register();
            });
            function register() {
                var username = userName(namespace);
                var password = userPassword(namespace);
                var re_password = rePassword(namespace);
                var mobilephone = mobilePhone(namespace);
                var yanzheng = yanZheng(namespace);
                if (username && mobilephone && password && re_password && yanzheng) {
                    $.ajax({
                        cache: true,
                        type: "POST",
                        url: "/Handler/Register.ashx",
                        dataType: 'json',
                        data: { username: username, password: password, phone: mobilephone, code: yanzheng },
                        success: function (data) {
                            if (data.status == "200") {
                                showmsg(true, '注册成功！');
                                    setTimeout(function () {
                                        $('.register').hide();
                                        goLogin(username, password);
                                    }, 1000);
                            }
                            else {
                                showmsg(false, data.msg);
                                return false;
                            }
                        },
                        error: function (data) {

                        }
                    }, 'json');
                }
            }
    }();

    //找回密码
    +function () {
        var namespace = ".get-password";
        clickFocus(namespace);
        //  setTime(namespace);
        $(".step", namespace).on("click", function () {
            var name = userName(namespace);
            var code = yanZheng(namespace);
            if (name && code) {
                $.ajax({
                    cache: true,
                    type: "POST",
                    url: "/index/check_code.html",
                    dataType: 'json',
                    data: { code: code, name: name },
                    success: function (data) {
                        if (data.ret != 200) {
                            showmsg(false, "验证码错误");
                            return false;
                        } else {
                            $(".search-code").show();
                            $(".get-password").hide();
                        }

                    }
                }, 'json');
            }
        });
    }();

    //设置新密码
    +function () {
        var namespace = ".search-code";
        clickFocus(namespace);
        estate(namespace);
        $(".que").on("click", function () {
            if (userPassword(namespace)) {
                $(".xiu").show();
            }
        });
    }();

});

window.isInitPost = false;
$(function () {
    initHeadBar();
    initIndexBanner();
    setQRCode(mobileport ? mobileport + '/app.html' : location.host + '/app.html','qrcode');
    //选项卡
    var con = $(".upload-con");
    $(".btn").on("click", "li", function (e) {
        var $ele = $(e.currentTarget);
        var index = $ele.index();//获取点击的下标
        var $content = $(".photo-cont", con).eq(index);
        $content.add($ele).addClass("active");
        $content.siblings().add($ele.siblings()).removeClass('active');

    });

    //登录
    $(".header-right").on("click", ".logs", function () {
        $(".login").show();

    });
    $(".cancel").on("click", function () {
        $(".login").hide();
    });

    // //投稿
    $(".nav_ul").on("click", ".js_delive", function () {
        if (CheckIsLogin()) {
            $(".toug").show();
            if(window.isInitPost === false)
                initPost();
        }
    });

    $(".tou-qu").on("click", function () {
        $(".toug").hide();
        $("#texts").val("");
        $("#image_box").find(".img-wrap").remove();
        $("#vjs_video").remove();
    });

    // 注册
    $(".js_enroll").on("click", function () {
        $(".register").show();
        $(".login").hide();
    });
    $(".js_register-close").on("click", function () {
        $(".register").hide();
    });


    //忘记密码
    // $(".chk").on("click","i",function(){
    //        $(".get-password").show();
    //         $(".login").hide();
    // });
    $(".get-title").on("click", "span", function () {
        $(".get-password").hide();
    });
    // document.getElementsByClassName("video-js")[1]
    // videojs(".video-js");
});

window.onload = function() {
    setTimeout(function() {
        $("img.lazyload").lazyload({
            threshold : 500
        });
    },50)
}

function htmlEncode(html) {
    var temp = document.createElement("div");
    (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html);
    var output = temp.innerHTML;
    temp = null;
    return output;
}

function htmlDecode(text) {
    var temp = document.createElement("div");
    temp.innerHTML = text;
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
}


function editArticle(categoryId, articleId) {
    var currentContent;
    $.ajax({
        type: 'POST',
        url: '/Handler/Ajax.ashx',
        data: { action: 'get_article_detail', categoryid: categoryId, id: articleId },
        dataType: 'json',
        success: function (data) {
            if (data.success == 1) {
                $(".toug").show();
                if (window.isInitPost === false) {
                    initPost();
                }
                if (mySelect) {
                    mySelect.Init();
                    mySelect.Value = data.data.categoryid;
                    mySelect.Init();
                }
                $("#txtArticleType").val(data.data.articletype);
                showContentStyle(data.data.articletype);

                $("#hidArticleId").val(data.data.articleid);

                if (data.data.articletype == 4) {  //图文结合
                    $("#txtTitle").val(data.data.title);
                    window.UE_Content.setContent(data.data.content);
                }
                else if (data.data.articletype == 3) {  //上传视频
                    $("#texts").val(htmlDecode(data.data.title));
                    $("#hidVideourl").val(data.data.content);
                    var videoHtml = '<video id="vjs_video" class="video-js vis vjs-default-skin vjs-big-play-centered" controls="controls" width="398px" height="264px" data-setup=""><source src="' + data.data.content + '" type="video/mp4"></video>';
                    $("#video_box").html(videoHtml);
                }
                else if (data.data.articletype == 2)  //上传图片
                {
                    $("#texts").val(htmlDecode(data.data.title));
                    $("#hidPicturesurl").val(data.data.content);

                    var pics = data.data.content.split('|');
                    var allHtml="";
                    for (var i = 0 ; i < pics.length; i++) {
                        if (pics[i] != null && pics[i].length > 0){
                            allHtml = allHtml + '<span class="img-wrap"><img src="' + pics + '"><span class="img_del" onclick="delimg(this);"></span></span>';
                        }
                    }
                    $("#image_box").html(allHtml);
                }
                else {
                    $("#texts").val(htmlDecode(data.data.content));
                }
            }
        }
    });
}

// 初始化头部
function initHeadBar() {
    $btn = $("#btn-search");
    if ($btn) {
        $btn.on('click', function () {
            search();
        });
    }

    function search() {
        var val = $("#q").val();
        if (val == '') {
            layer.alert("请输入关键字");
            return false;
        }
        window.location.href = "/" + $('#hidCategoryCode').val() + "/search/" + encodeURI(val) + "/";
    }

    var category = window.typename || "";
    if (category.length > 0){
        category = "/" + category + "/";
    }
    else {
        category = "/";
    }
    if(location.pathname == "/user") return;
        
    // 分类下拉
    $('.item-category').hover(function () {
        $(this).addClass('category-hover');
    }, function () {
        $(this).removeClass('category-hover');
    });

    if (category === "/fenlei/") {
        $(".nav_ul").find("a").removeClass('on');
        return;
    }

    if (category === "/tougao/") {
        $(".nav_ul").find("a").removeClass('on');
        $(".nav_ul").find(".js_delive a").addClass("on");
        return;
    }

    $(".nav_ul").find("a").each(function () {
        if ($(this).attr("href").indexOf(category) != -1 && $(this).attr("class") != "category_label") {
            $(".nav_ul").find("a").removeClass('on');
            $(this).addClass("on");
            return false;
        }
    });
}

function initIndexBanner() {
    if ($('#indexBanner').length > 0) {
        $LAB.script("/assets/js/jquery.SuperSlide.2.1.1.js").wait(function () {
            $('#indexBanner').slide({
                titCell: '.hd ul',
                mainCell: '.bd ul',
                effect: 'leftLoop',
                autoPlay: true,
                autoPage: true,
                interTime: 5000
            });
        });
    }
}

// 初始化投稿
function initPost() {
    window.UEDITOR_HOME_URL = "/assets/MyEditor/1.4.3/";
    $LAB.script("/assets/MySimpleEditor/themes/default/css/umeditor.css", "/assets/MyEditor/1.4.3/ueditor.config.js", "/assets/MyEditor/1.4.3/ueditor.all.js").wait(function () {
        window.isInitPost = true;
        window.MaxLength = 10000;

        if (mySelect) {
            mySelect.Init();
            $.ajax({
                type: 'POST',
                url: '/Handler/Ajax.ashx',
                data: { action: 'getarticletype', categoryid: $("#articlecategory").val() },
                dataType: 'json',
                success: function (data) {
                    if (data.success == 1) {
                        $("#txtArticleType").val(data.articletype);
                        showContentStyle($("#txtArticleType").val());
                    } else {
                        $("#txtArticleType").val("");
                    }
                },
                error: function (data) {
                    $("#txtArticleType").val("");
                },
            });
            showContentStyle($("#txtArticleType").val());
            var oldcategory = $("#articlecategory").val();
            $("body").delegate("select", "change", function () {
                if ($("#articlecategory").val() == "" || $("#articlecategory").val() == "0") {
                    $("#txtArticleType").val("");
                }
                else if (oldcategory != $("#articlecategory").val()) {
                    $.ajax({
                        type: 'POST',
                        url: '/Handler/Ajax.ashx',
                        data: { action: 'getarticletype', categoryid: $("#articlecategory").val() },
                        dataType: 'json',
                        success: function (data) {
                            if (data.success == 1) {
                                $("#txtArticleType").val(data.articletype);
                                oldcategory = $("#articlecategory").val();
                                showContentStyle($("#txtArticleType").val());
                            } else {
                                alert(data.msg + ",请重新选择分类！");
                                oldcategory = "";
                                $("#txtArticleType").val("");
                            }
                        },
                        error: function (data) {
                            alert("执行出错,请重新选择分类！");
                            oldcategory = "";
                            $("#txtArticleType").val("");
                        },
                    });
                }
            });
        }

        $('#texts').on('keyup', function () {
            updateLength()
        });

        $(".sub_jokes").click(function () {
            //检查数据
            //表单提交
            var type = $("#txtArticleType").val();
            var title = "";
            var content = "";

            if (type == 4) {  //图文结合
                title = $("#txtTitle").val();
                if (title == '') {
                    showmsg(false, "请填写文章标题！");
                    return false;
                }
                content = window.UE_Content.getContent();
            }
            else {
                content = $("#texts").val();
            }

            var length = window.MaxLength - countDescLen(content);

            if (content == '') {
                showmsg(false, "请填写内容");
                return false;
            }

            if (length < 0) {
                showmsg(false, "已超出" + Math.abs(length) + "个字");
                return false;
            }

            if (type == 4) {  //图文结合
                title = $("#txtTitle").val();
            }
            else if (type == 3) {  //上传视频
                title = content;
                content = $("#hidVideourl").val();
                if (content == undefined || content == "") {
                    showmsg(false, "请上传视频");
                    return false;
                }
            }
            else if (type == 2)  //上传图片
            {
                title = content;
                var $pics = $("#image_box").find(".img-wrap");
                var pics = "";
                if ($pics.length == 0) {
                    showmsg(false, "请上传图片");
                    return false;
                }
                $pics.each(function () {
                    pics += $(this).find("img").attr("src") + "|";
                });
                content = pics.slice(0, -1);
            }
            else {
                title = "";
            }

            $.ajax({
                type: "post",
                dataType: 'json',
                url: "/Handler/Publish.ashx",
                data: { id: $("#hidArticleId").val(), catid: $("#articlecategory").val(), typeid: type, title: title, resource: content },
                success: function (data) {
                    if (data.status == "200") {
                        showmsg(true, "发布成功，请等待审核！");
                        $('.upload-main .btn').find('li').eq(0).click();
                        $(".toug").hide();
                        $("#texts").val("");
                    }
                    else {
                        var errorMsg = data.msg || "发布失败，请重试！";
                        showmsg(false, errorMsg);
                    }
                }
            });
        });

        

        //文章编编器
        var ue_Content = UE.getEditor('txtContent');
        window.UE_Content = ue_Content;
        ue_Content.imageUrlPrefix = window.UrlPrefix;
        ue_Content.imagePathFormat = "article";
        ue_Content.snapscreenUrlPrefix = window.UrlPrefix;
        ue_Content.snapscreenPathFormat = "article";
        ue_Content.catcherUrlPrefix = window.UrlPrefix;
        ue_Content.catcherPathFormat = "article";

        // 图片上传
        window.MAX_UPLOAD_LIMIT = 9;
        var ue_imageUpload = UE.getEditor('imageUpload');
        window.UE_ImageUpload = ue_imageUpload;

        ue_imageUpload.imageUrlPrefix = window.UrlPrefix;
        ue_imageUpload.imagePathFormat = "article";
        ue_imageUpload.imageCurrentMaxUpload = MAX_UPLOAD_LIMIT;

        ue_imageUpload.ready(function () {
            //隐藏编辑器，因为不会用到这个编辑器实例，所以要隐藏
            ue_imageUpload.hide();
            //侦听图片上传
            ue_imageUpload.addListener('beforeInsertImage', function (t, arg) {

                var pictures = "";
                for (var i = 0; i < arg.length; i++) {
                    html =
                        '<span class="img-wrap">' +
                            '<img src="' + arg[i].src + '">' +
                            '<span class="img_del" onclick="delimg(this);"></span>' +
                        '</span>';
                    $("#imageIcon").before(html);
                    pictures += arg[i].src + "|";
                }

                var currentLength = $("#image_box").find(".img-wrap").length;
                ue_imageUpload.imageCurrentMaxUpload = MAX_UPLOAD_LIMIT - currentLength;

                if (pictures.indexOf('|') > 0) {
                    pictures = pictures.substring(0, pictures.length - 1);
                }

                $("#hidPicturesurl").val(pictures);
            });
        });

        // 视频上传
        var ue_videoUpload = UE.getEditor('videoUpload');
        window.UE_videoUpload = ue_videoUpload;
        ue_videoUpload.imageUrlPrefix = window.UrlPrefix;
        ue_videoUpload.imagePathFormat = "article";
        ue_videoUpload.videoUrlPrefix = window.UrlPrefix;
        ue_videoUpload.videoPathFormat = "article";

        ue_videoUpload.ready(function () {
            //隐藏编辑器，因为不会用到这个编辑器实例，所以要隐藏
            ue_videoUpload.hide();
            //侦听图片上传
            ue_videoUpload.addListener('afterUpVideo', function (t, arg) {
                var pictures = "";
                $("#vjs_video").remove();
                var html =
                    '<video id="vjs_video" class="video-js vis vjs-default-skin vjs-big-play-centered" controls="controls" width="398px" height="264px" data-setup="">' +
                    '<source src="' + arg[0].url + '" type="video/mp4">' +
                    '</video>';
                $("#videoIcon").before(html);
                $("#hidVideourl").val(arg[0].url);
            });
        });
    });
}

function showContentStyle(articleType) {
    if (articleType == "4") { //图文混合
        $("#divWord").hide();
        $("#divContent").show();
        $("#uploader").hide();
        window.MaxLength = 10000;
        updateLength();
    } else if (articleType == "3") { //视频
        $("#divWord").show();
        $("#divContent").hide();
        $("#uploader").show();
        $("#video_uploader").show();
        $("#image_uploader").hide();
        window.MaxLength = 10000;
        updateLength();
    } else if (articleType == "2") { //图片
        $("#divWord").show();
        $("#divContent").hide();
        $("#uploader").show();
        $("#video_uploader").hide();
        $("#image_uploader").show();
        window.MaxLength = 10000;
        updateLength();
    } else { //文字
        $("#divWord").show();
        $("#divContent").hide();
        $("#uploader").hide();
        window.MaxLength = 10000;
        updateLength();
    }
}

function updateLength() {
    var text = $('#texts').val();
    countContentLength(text, $('#content_len')[0], window.MaxLength);
}

function destoryUpload() {
    if (!window.UploadObj) return;
    $("#uploader").find('.filelist').remove();
    $("#uploader").find('.queueList').removeClass('filled');
    $("#uploader").find('.placeholder').removeClass('element-invisible');
    window.UploadObj.destroy();
}

//弹出图片上传的对话框
function uploadImage() {
    var currentLength = $("#image_box").find(".img-wrap").length;
    window.UE_ImageUpload.imageCurrentMaxUpload  = MAX_UPLOAD_LIMIT - currentLength;
    if(currentLength >= MAX_UPLOAD_LIMIT) {
        alert("您上传的图片已达上限（"+ MAX_UPLOAD_LIMIT +"张）");
        return false;
    } 
    var myImage = window.UE_ImageUpload.getDialog("insertimage");
    myImage.open();
}
//弹出视频上传的对话框
function uploadVideo() {
    var myImage = window.UE_videoUpload.getDialog("insertvideo");
    myImage.open();
}
// 删除图片
function delimg(_this) {
    $(_this).parent().remove();
    var pictures = "";
    $("#image_box").find(".img-wrap").each(function(){
        var url = $(this).find("img").attr("src");
        pictures += url + "|";
    });
    if (pictures.indexOf('|') > 0) {
        pictures = pictures.substring(0, pictures.length - 1);
    }
    $("#hidPicturesurl").val(pictures);

    window.UE_imageUpload.imageCurrentMaxUpload++;
}

//检查是否已登录
function CheckIsLogin(iscollect) {
    var islogin = true;
    $.ajax({
        async: false,
        type: "post",
        dataType: 'json',
        url: "/Handler/CheckIsLogin.ashx",
        success: function (data) {
            if(!data) return;
            if (data.status == "203") {
                islogin = false;
                showmsg(false, "请先登录！", 1000);
                if($(".login").length) {
                    setTimeout(function() {
                        $(document).scrollTop(0);
                        $(".login").show();
                    },1200);
                }
            } else if (data.status == "202") {      
                if(iscollect) {
                    islogin = true;  
                    return;
                }       
                islogin = false;
                showmsg(false, data.msg, 1000);
                setTimeout(function() {
                  location.href = "/userinfo/";
                },1000);
            }
        }
    });
    return islogin;
}
// 设置二维码
function setQRCode(url,id) {
    if(!document.getElementById(id)) return;
    var qrcode = new QRCode(document.getElementById(id), {
        text: url,
        width: 95,
        height: 95,
        colorDark: "#000000",
        colorLight: "#fff",
        correctLevel: QRCode.CorrectLevel.H
    });
}
// 提示弹框
function showmsg(ret, text, time) {
    if (ret == true) {
        var msg = '<p><img src="/assets/images/dui.png" alt=""></p>';
        msg += ' <span>' + text + '</span></div>';
        $(".success").html(msg);
        $(".success").show()
            .delay(time || 2000).hide(300);
    } else {
        var msg = '<p><img src="/assets/images/fail.png" alt=""></p>';
        msg += ' <span>' + text + '</span></div>';
        $(".error").html(msg);
        $(".error").show()
            .delay(time || 2000).hide(300);

    }
}
function delayer(url) {
    if (url) {
        window.location = url;
    } else {
        window.location.reload();
    }
}
// 收藏事件
// 收藏
function setCollect(selector) {
    selector = selector || "body";
    $(selector).find(".js_collect").click(function() {           
        var isDisable = $(this).closest(".discuss").attr("data-disable") == 1;
        if(isDisable) return;
        if (!CheckIsLogin(true)) return;
        var $collect = $(this).find(".collect");
        if($collect.length > 0)     
            reduceCollect.apply($collect[0]);
    });
    var reduceCollect = Utils.reduce(function(){
        var $collect = $(this);
        var $num = $collect.next();
        var isCollected = $(this).hasClass("collected");
        var typeid = isCollected ? 2 : 1;
        var articleid = $(this).attr("dataid");
        var categoryid = $(this).attr("catid");
        $.ajax({
            type: "post",
            dataType: 'json',
            url: "/Handler/Collection.ashx",
            data: { articleid: articleid, typeid: typeid, categoryid: categoryid },
            success: function (data) {
                if (data.status == "200") {
                    if(isCollected) {
                        $collect.removeClass("collected");
                        showmsg(true, "已取消收藏");
                        $num.html(parseInt($num.text().trim())-1);
                        if(window.typecode && window.typecode === 'shoucang' ) {  
                            setTimeout(function() {
                                $collect.closest(".one-cont").remove();
                            },500)  
                        }
                    } else {
                        $collect.addClass("collected");
                        $num.html(parseInt($num.text().trim())+1);
                    }
                }
                else {
                    showmsg(false, data.msg);
                }
            }
        });
    },1000)
}
//笑话点赞 
function bindCommentEvent(selecter) {
    var op_preview = 0;
    $(selecter).bind("click", function () {
        var isDisable = $(this).closest(".discuss").attr("data-disable") == 1;
        if(isDisable) return;
        var now = +new Date();
        if (now - op_preview < 2000) return;

        var $self = $(this).find("i");
        var type = $self.attr("type");
        var articleid = $self.attr("dataid");
        var categoryid = $self.attr("catid");
        var num = $self.next().text();

        // if ($self.closest('ul').find('.support_y').length > 0
        //     || $self.closest('ul').find('.nosupport_y').length > 0)
        //     return;

        $.ajax({
            type: "post",
            dataType: 'json',
            url: "/Handler/Support.ashx",
            data: { articleid: articleid, support: type, categoryid: categoryid },
            success: function (data) {
                op_preview = +new Date();
                if (data.status == "200") {
                    $self.next().text(parseInt(parseInt(num) + 1));
                    if (type == 1) {
                        $self.attr("class", "support_y");

                        //点赞动画
                        var $ding = $("<span class='ding'>+1</span>");
                        $ding.on("animationend", function () {
                            $(this).remove();
                        });
                        $self.parent().append($ding);
                    }
                    else {
                        $self.attr("class", "nosupport_y");
                    }
                }
                else {
                    showmsg(false, data.msg);
                }
            }
        });
    });
}

//评论点赞
function likeComment(self) {
    var typeid = $(self).attr("typeid");
    var commentid = $(self).attr("dataid");
    var categoryid = $(self).attr("catid");
    var num = $(self).next().text();
    $.ajax({
        type: "post",
        dataType: 'json',
        url: "/Handler/CommentSupport.ashx",
        data: { typeid: typeid, commentid: commentid, categoryid: categoryid },
        success: function (data) {
            if (data.status == "200") {
                $(self).next().text(parseInt(parseInt(num) + 1));
                $(self).attr("class", "comment-support-y");
            }
            else {
                showmsg(false, data.msg);
            }
        }
    });
}

// 插入css
function createStyleSheet(url) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href= url;
    head.appendChild(style);
    // return style.sheet ||style.styleSheet;
}

// 计算剩余字数
function countContentLength(content, currentLength, max) {
    var length = max - countDescLen(content);
    currentLength.innerHTML = (length < 0 ? '已超出' : '还能输入') + Math.abs(length) + '字';
    currentLength.style.color = length < 0 ? "red" : "";
}

// 计算输入长度
function countDescLen(str) {
    var value = str.replace(/(^\s*)|(\s*$)/g, "");
    var reg = new RegExp('((news|telnet|nttp|file|http|ftp|https)://){1}(([-A-Za-z0-9]+(\\.[-A-Za-z0-9]+)*(\\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\\.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_\\$\\.\\+\\!\\*\\(\\),;:@&=\\?/~\\#\\%]*)*', 'gi');
    value = value.replace(reg, '**********************');
    return Math.ceil(value.replace(/[^\x00-\xff]/ig, "**").length / 2);
}

//  设置默认图片
function initDefaultImage() {
    $('.js_img').each(function() {
        if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
            var $self = $(this),
                type = $(this).attr('data-default') || 'l4',
                imageUrl = '/assets/images/error/' + type + '.png';
            $self.attr('src', imageUrl);
        } 
     });
}

$(window).load(function() { 
    initDefaultImage();
});

function setShare() {
    var images = "";
    $(".share-pic-content").find("img").each(function (index, el) {
        images += $(el).attr("data-src") + '||';
    });
    images += location.origin + "/assets/images/icos.png";
    $(".discuss").each(function() {
        var $this = $(this);
        var dataid = $this.find('.bdsharebuttonbox').attr("dataid");
        var catid = $this.find('.bdsharebuttonbox').attr("catid");
        if($this.attr("data-disable") == "1") return;
        $this.find('.bdsharebuttonbox').share({ image: images });
        $this.find('.bdsharebuttonbox').on("click","a", function() {
            var $num = $(this).closest(".bdsharebuttonbox").prev();
            statShare(catid,dataid, $num);
        });
    }) 
}

function setListShare() {
    $(".discuss").each(function() {
        var $this = $(this);
        var dataid = $this.find('.bdsharebuttonbox').attr("dataid");
        var catid = $this.find('.bdsharebuttonbox').attr("catid");
        if($this.attr("data-disable") == "1") return;
        var img = $this.prev().find("img").attr("data-src") || (location.host + "/assets/images/icos.png");
        var url = location.origin +  $this.find(".js_comment > a").attr("href");
        var title = $this.closest(".one-cont").find(".fonts > a").text().trim();
        $this.find('.bdsharebuttonbox')
            .share({ 
                image: img, 
                url: url, 
                title: title
            });
        $this.find('.bdsharebuttonbox').on("click","a", function() {
            var $num = $(this).closest(".bdsharebuttonbox").prev();
            statShare(catid,dataid, $num);
        });
    }) 
}
function statShare(categoryid,id, $num) {
    $.ajax({
        type: "post",
        data: { action: "article_share", categoryid: categoryid, articleid: id },
        url: "/Ajax.aspx",
        success: function (data) {
        }
    });
    if($num) {
        var num = parseInt($num.text().trim());
        $num.text(num+1);
    }
}
var Utils = {};
// 重复点击不做处理
Utils.reduce = function(handler, wait) {
    var lastTime = 0;
    return function () {
        var nowTime = new Date().getTime();
        if (nowTime - lastTime > wait) {
            handler.apply(this, arguments);
            lastTime = nowTime;
        }
    }
}



// JavaScript Document
function MultiSelect(className,strId,strName,inputId,parentId,level,onChange)
{
	var parentThis=this; //指向的是MultiSelect
	
	
	this.ArrId;
	this.ArrName;
	this.ArrParentId;
	this.StrId=strId;
	this.StrName=strName;
	this.Id=inputId;
	this.ParentId=parentId;
	this.Level=level;
	this.Value=parentId;
	this.OnChange="";
	if(onChange!=undefined)
	    this.OnChange=onChange;
	this.Init=function (){
	    parentThis.StrName=parentThis.WordEncode(parentThis.StrName);
		parentThis.ArrId=parentThis.ConvertToArrId(parentThis.StrId);
		parentThis.ArrName=parentThis.ConvertToArrName(parentThis.StrName);
		parentThis.ArrParentId=parentThis.GetAllParentId(parentThis.ParentId);
		$("#Div_"+parentThis.Id).append($("<input type=\"hidden\"  name=\""+parentThis.Id+"\" id=\""+parentThis.Id+"\" value="+parentThis.ParentId+">"));
		$("#Div_"+parentThis.Id).append("<input type=\"hidden\"  name=\"ParentIdList\" id=\"ParentIdList\">");
	   parentThis.ShowCategory(1);
	   parentThis.SaveParentIdList();
    };
	this.GetName=function(){
		for (var a in window){
			if (window[a]==this){return a.toString()};
		}
	}

	this.ShowCategory=function(num)
	{
		if (num>1&&num<=parentThis.Level)
		{
			var currentSelect=document.getElementById(parentThis.Id+(num-1));
			if(currentSelect.options.length>1&&currentSelect.options[currentSelect.selectedIndex].value!="")
			{
				var currentId=currentSelect.options[currentSelect.selectedIndex].value;
				if(parentThis.IsExistChildrenId(currentId))
				{
				    if($("#"+parentThis.Id+num)[0]!=undefined)
				        $("#"+parentThis.Id+num).parent().remove();
				    
				    var nextSelect=$("<select name='"+parentThis.Id+""+num+"' id='"+parentThis.Id+""+num+"' class=\"select\" onchange=\""+parentThis.GetName()+".ShowCategory("+(num+1)+");"+parentThis.GetName()+".SaveId("+num+");"+parentThis.OnChange+"\"></select>")[0];
					var div = $("<span class=\"" + className + "\" ></span>");
				    div.append(nextSelect);
				    $("#Div_"+parentThis.Id).append(div[0]);
					$(nextSelect).append("<option value=\"\">--------</option>");
					for(var i=0;i<parentThis.ArrId.length;i++)
					{
						var flag=false;
						if(currentSelect.options[currentSelect.selectedIndex].value==parentThis.ArrId[i][0])
						{
						    $(nextSelect).append("<option value=\""+parentThis.ArrId[i][1]+"\">"+parentThis.WordDecode(parentThis.ArrName[i])+"</option>");
						}
					}
				}
				else
				{
					for(var i=num;i<=parentThis.Level;i++)
					{
					    if($("#"+parentThis.Id+i)!=undefined)
						    $("#"+parentThis.Id+i).parent().remove();
					}
				}
			}
			else
			{
				for(var i=num;i<=parentThis.Level;i++)
				{
					if($("#"+parentThis.Id+i)!=undefined)
						    $("#"+parentThis.Id+i).parent().remove();
				}
			}
		}
		else if(num==1)
		{
			var currentSelect=$("#"+parentThis.Id+num)[0];
			if(currentSelect==undefined||currentSelect==null)
			{
			    currentSelect = $("<select name='" + parentThis.Id + "" + num + "' id='" + parentThis.Id + "" + num + "' class=\"select\" onchange=\"" + parentThis.GetName() + ".ShowCategory(" + (num + 1) + ");" + parentThis.GetName() + ".SaveId(" + num + ");" + parentThis.OnChange + "\"></select>")[0];
			    var div = $("<span class=\"" + className + "\" ></span>");
			    div.append(currentSelect);
				$("#Div_"+parentThis.Id).append(div[0]);
			}

			currentSelect.options[currentSelect.options.length]=new Option("--------","")
			for(var i=0;i<parentThis.ArrId.length;i++)
			{
				var flag=false;
				if(parentThis.ArrId[i][0]==0)
				{
					for(var m=0;m<currentSelect.options.length;m++)
					{
						if(currentSelect.options[m].value==parentThis.ArrId[i][1])
						{
							flag=true;
						}
					}
					if(currentSelect.options.length==0)
					{
						flag=false;
					}
					if(!flag)
					{
						currentSelect.options[currentSelect.options.length]=new Option(parentThis.WordDecode(parentThis.ArrName[i]),parentThis.ArrId[i][1])
					}
				}
			}
		}
		
		for(var k=num;k<=parentThis.Level;k++)
		{
			var v=$("#"+parentThis.Id+k)[0];
			if(v==undefined)
			    break;
		    if(v.options.length>0)
			{
				v.style.display="block";
			}
			else
			{
			    $(v).remove();
			}
		}
				
		var current=$("#"+parentThis.Id+num)[0];
		if(num<=parentThis.Level&&current!=undefined)
		{
			for(var i=0;i<current.options.length;i++)
			{
				for(var k=0;k<parentThis.ArrParentId.length;k++)
				{
					if(current.options[i].value==parentThis.ArrParentId[k])
					{
						current.selectedIndex=i;
						break;
					}
				}
			}
			
			if(current.options.length>0)
			{
				parentThis.ShowCategory(num+1);
			}
		}
	};
	
	//保存当前选中ID
	this.SaveId=function(num)
	{
		if(document.getElementById(parentThis.Id+num).value!="")
		{
			parentThis.Value=document.getElementById(parentThis.Id).value=document.getElementById(parentThis.Id+num).value;
		}
		else if(num>1)
		{
			parentThis.Value=document.getElementById(parentThis.Id).value=document.getElementById(parentThis.Id+(num-1)).value;
		}
		else
		{
			parentThis.Value=document.getElementById(parentThis.Id).value=0;
		}
		parentThis.SaveParentIdList();
	}
	
	this.SaveParentIdList=function()
	{
	    var idList="";
	    $("#Div_"+parentThis.Id).find("select[id]").each(function(i,n){
	        if($(n).attr("id").indexOf(parentThis.Id)==0&&$(n).val()!="")
	        {
	            idList=idList+"|"+$(n).val();
	        }
	    });
	    if(idList!="")
	        idList=idList+"|";
	    $("#ParentIdList").val(idList);
	}

	//获取父ID
	this.GetParentId=function(currentid)
	{
		for(var i=0;i<parentThis.ArrId.length;i++)
		{
			if(parentThis.ArrId[i][1]==currentid)
			{
				return parentThis.ArrId[i][0];
			}
		}
		return 0;
	}

	//获取所有父ID
	this.GetAllParentId = function(currentid)
	{
		var parentid=[];
		parentid[parentid.length]=currentid;
		while(parentid[parentid.length-1]!=0)
		{
			parentid[parentid.length]=parentThis.GetParentId(parentid[parentid.length-1]);
		}
		return parentid;
	}
	
	//获取下一级子Id
	this.GetChildrenId=function(currentid)
	{
		var childrenid=[];
		childrenid[childrenid.length]=currentid;
		for(var i=0;i<parentThis.ArrId.length;i++)
		{
			if(parentThis.ArrId[i][0]==currentid)
			{
				childrenid[childrenid.length]=parentThis.ArrId[i][1];				
			}
		}
		return childrenid;
	}
	
	//获取所有子ID
	this.GetAllChildrenId=function (currentid)
	{
		var childrenid=[];
		childrenid[childrenid.length]=currentid;
		var i=0;
		while(i<childrenid.length)
		{
			var childrenId1=parentThis.GetChildrenId(childrenid[i]);
			if(childrenId1.length>0)
			{
				for(var j=0;j<childrenId1.length;j++)
				{
					childrenid[childrenid.length]=childrenId1[j];
				}
			}
			i++;
		}		
		return childrenid;
	}
	
	this.IsChildrenId = function(target_id,source_id)
	{
		var arr_tempid=parentThis.GetAllParentId(target_id);
		for(var i=0;i<arr_tempid.length;i++)
		{
			if(arr_tempid[i]==source_id)
			{
				return true;
			}
		}
		return false;
	}
	
	//是否存在子ID
	this.IsExistChildrenId= function(id)
	{
		var id_arr=parentThis.GetChildrenId(id);
		if(id_arr.length==1)
		{
			return false;
		}
		else
		{
			return true;
		}
	}

	//检测当前选中的ID是否有效
	this.IsIdValid=function (source_id)
	{
		if(parentThis.IsChildrenId(parentThis.Value,source_id))
		{
			return false;
		}
		return true
	}
	
	//将id字符串转换为数组
	this.ConvertToArrId =function (str)
	{
		var arr_id=[];
		if(str!="")
		{
			var arr_id2=str.split("$$");
			for(var i=0;i<arr_id2.length;i++)
			{
				arr_id3=arr_id2[i].split("||");
				arr_id[arr_id.length]=arr_id3;
			}
		}
		return arr_id;
	};
	
    this.ConvertToArrName=function (str)
	{
		var arr_name;
		if(str!="")
		{
			arr_name=str.split("$$");
		}
		else
		{
			arr_name=[];
		}
		return arr_name;
	};	
	this.WordEncode=function(str)
	{
		var str=str.replace("\'","&#1986;");
		str=str.replace("\"","&quot;");
		return str;
	};
	
	this.WordDecode=function(str)
	{
		var str=str.replace("&#1986;","\'");
		str=str.replace("&quot;","\"");
		return str;
	};
}

$(function () {
    

    $(".discuss").each(function () {
        if ($(this).attr("data-disable") == 1) {
            $(this).find(".fen").remove();
        }
    });
    $(".user-header-menu").find("li").each(function () {
        var url = $(this).find("a").attr("href");
        if (url.indexOf(typecode) !== -1) {
            $(this).addClass("on");
            $(this).find("a").addClass("active");
        }
    })
  }); 



  $(function () {
    $("#pl-tex").on('keyup', function () {
        var text = $(this).val();
        countContentLength(text, $("#comment_len")[0], 100);
    });

    $("#pl-tex").on('click', function () {
        CheckIsLogin();
    })
  
    if ($(".god-comments-cont>.god-cont").length === 0) {
        $(".none-comment").show();
    }
    bindCommentEvent(".js_support");
    setCollect();
    setGallery();
    setShare();
    setListShare();
});


$(function () {
    switch (hitcount_type) {
        case 1:
            updateArticleHit();
            break;
        case 2:
            updateTopicHit();
            break;
    }
});

//更新点击量
function updateArticleHit() {
    $.ajax({
        type: "post",
        async: true,   //是否为异步请求
        url: "/Ajax.aspx",
        data: { action: "article_hit", categoryid: $("#hidCategoryId").val(), articleid: $("#hidDataID").val() },
        success: function (data) {

        }
    });
}

function updateTopicHit() {
    $.ajax({
        type: "post",
        async: true,   //是否为异步请求
        url: "/Ajax.aspx",
        data: { action: "article_topic_hit", categoryid: $("#hidCategoryId").val(), topicid: $("#hidDataID").val() },
        success: function (data) {

        }
    });
}


// 图片gallery
function setGallery() {
    var $html = $('<div class="swiper-box"  style="display: none;"><div class="swiper-container"> <div class="swiper-wrapper"></div><div class="swiper-pagination"></div></div><div class="swiper-button-next"></div><div class="swiper-button-prev"></div></div>'),
        $swiperWraper = $html.find('.swiper-wrapper');
    $("#divPic").find('.imgs').each(function(){     
        var $img = $(this).find(".js_img");   
        var imgHeight = $img.height(),
            imgWidth = $img.width();
        $swiperWraper.append('<div class="swiper-slide"><img class="'+ (imgHeight/imgWidth < 2.5 ? '' : 'long') +'" src="'+ ($img.attr("data-src") || $img.attr("src")) +'"></div>');
    })
    $html.appendTo('body');
    var swiper = null;

    $html.on('click',".swiper-slide", function() {
        $html.fadeOut(200);
        swiper.destroy();
    });
    $(".imgs").on("click", function(e) {
        $html.fadeIn(200);
        swiper = new Swiper('.swiper-container', {
            // direction: 'vertical',
            initialSlide: $(this).index(),
            pagination: {
              el: '.swiper-pagination',
              type: 'fraction',
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
        });
    })
}
/* 评论 */
$("#pinlun").on('click', function () {
    if (CheckIsLogin()) {
        $(this).attr("disabled", "disabled");

        //评论数据ID
        var dataid = $("#hidDataID").val();
        //评论类型ID 1：笑话评论，2：专题评论
        var typeid = $("#hidCommentType").val();
        //评论内容
        var content = $("#pl-tex").val().trim();

        var length = 100 - countDescLen(content);
        var id = $(this).attr('data-type');
        if (content == '') {
            showmsg(false, "评论内容不能为空");
            $("#pinlun").removeAttr("disabled");
            return false;
        } else if (length < 0) {
            showmsg(false, "已超出" + Math.abs(length) + "个字");
            $("#pinlun").removeAttr("disabled");
            return false;
        }

        $.ajax({
            type: "post",
            url: "/Handler/Comment.ashx",
            dataType: 'json',
            data: { typeid: typeid, dataid: dataid, comment: content },
            success: function (data) {
                if (data.status == "200") {
                    $(".none-comment").hide();

                    $("#pl-tex").val("");
                    $("#comment_len").text("");

                    var html = "";
                    html += "<div class=\"god-cont clearfix\">";
                    html += "<div class=\"god-cont-img\">";
                    html += "<img style=\"border-radius: 50%; width: 40px; height: 40px; display: inline;\" data-default=\"user\" class=\"lazy js_img\" src=\"" + currentUserIco + "\" alt=\"\" data-bd-imgshare-binded=\"1\">";
                    html += "</div>";
                    html += "<div class=\"god-cont-right\">";
                    html += "<div class=\"god-font-title clearfix\">";
                    html += "<div class=\"god-zan clearfix\">";
                    html += "<div class=\"praise clearfix\">";
                    html += "<em onclick='likeComment(this)' class=\"comment-support\" typeid=\"" + typeid + "\" dataid=\"" + data.commentid + "\"></em>";
                    html += "<span>0</span>";
                    html += "</div>";
                    html += "<p></p>";
                    html += "</div>";
                    html += "<i>" + currentUserNickName + "</i>";
                    html += "</div>";
                    html += "<div class=\"god-fonts\">";
                    html += "<span>" + content + "</span>";
                    html += "</div>";
                    html += "</div>";
                    html += "</div>";

                    $(".god-comments-cont").prepend(html);
                }
                else {
                    var errorMsg = data.msg || "评论失败！";
                    showmsg(false, errorMsg);
                    return false;
                }
            }
        });

        $("#pinlun").removeAttr("disabled");
    }
});