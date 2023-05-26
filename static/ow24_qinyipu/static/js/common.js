var User = function ($) {
    var info = null;
    var getInfo = function () {
        var id = $.cookie("byajqmluserid"),
            name = $.cookie("byajqmlusername"),
            avatar = $.cookie("byajqmluserpic");
        if (id > 0) {
            info = {
                id: id,
                name: name,
                avatar: avatar
            }
        }
    }
    return {
        init: function () {
            // 初始化用户
            getInfo()
        },
        userInfo: function(){
            return info;
        },
        // 初始化顶部条
        initTop: function () {
            if (info === null) {
                // 显示登陆
                $(".action-top-login").show();
                $(".action-top-info").hide();
            } else {
                // 显示信息
                $(".action-top-login").hide();
                $(".action-top-info").show();
                $("#top-user-name").text(info.name);
                if (info.avatar) $("#top-user-pic").attr("src", info.avatar);

            }
        }
    }
}(jQuery);

var App = function ($) {
    function contentImagePopup(container) {
        var $container = $(container);
        $container.find("img").each(function (index, item) {
            // 点击事件
            //console.log(item);
            var $item = $(item);
            if($item.width()<100) {
                $item.addClass("image-sm")
                $item.attr("data-fancybox-group", "thumb-sm");
            }else if($item.width()<600) {
                $item.addClass("image-md")
                $item.attr("data-fancybox-group", "thumb-md");
            }else {
                $item.addClass("image-lg")
                $item.attr("data-fancybox-group", "thumb-lg");
            }
            $item.attr("href", $item.attr("src"));
            //$item.attr("rel", "lightbox");
        });
        $(".view-content img.image-lg").fancybox({
            //type: "image",
            openEffect: 'none',
            closeEffect: 'none',
            prevEffect: 'none',
            nextEffect: 'none',
            centerOnScroll: true,
            closeBtn: false,
            maxWidth:1200,
            helpers:
                {
                    buttons:
                        {
                            position: 'bottom'
                        }
                },
            afterLoad: function () {
                this.title = '第 ' + (this.index + 1) + ' 张, 共 ' + this.group.length + ' 张' + (this.title ? ' - ' + this.title : '');
            }
        })
        /*$container.find("img").click(function (e) {
            // 点击事件
            console.log(e);
        })*/
    }

    function initViewContent() {
        contentImagePopup('.view-content');
    }

    function initFollow() {
        // 判断是否关注，显示关注文字
        // 增加绑定关注和取消关注事件
        var trigger = $(".follow-author");
        if(trigger.length<=0) return;
        var userInfo = User.userInfo(),text = trigger.text();
        var fname = trigger.data("user");
        trigger.click(function (e) {
            if(userInfo === null) {
                alert('请登陆');
                return false;
            }
            if(userInfo.name+"" === fname+"") {
                alert('不能关注自己');
                return false;
            }
            $.post('/e/member/friend/add/ajax.php',{fname:fname,})
                .done(function (res) {
                    console.log(res);
                    if(res.status > 0){
                        return alert('操作失败');
                    }
                    if(res.data === 'DelFriend'){
                        trigger.removeClass('followed');
                        trigger.text(text);
                    }else {
                        trigger.addClass('followed');
                        trigger.text('已关注');
                    }

                })
                .fail(function (xhr) {
                    console.log(xhr)
                });
            return false;
        });
        if(userInfo === null) return;
        $.get("/e/member/friend/has.php?fname="+fname)
            .done(function (res) {
                if(res.data>0){
                    trigger.addClass('followed');
                    trigger.text('已关注');
                }
            })
            .fail(function (xhr) {
                console.log(xhr)
            });
    }
    function initFollow1() {
        // 判断是否关注，显示关注文字
        // 增加绑定关注和取消关注事件
        var trigger = $(".follow1-author");
        if(trigger.length<=0) return;
        var userInfo = User.userInfo(),text = trigger.text();
        var fname = trigger.data("user");
        trigger.click(function (e) {
            if(userInfo === null) {
                alert('请登陆');
                return false;
            }
            if(userInfo.name+"" === fname+"") {
                alert('不能关注自己');
                return false;
            }
            $.post('/e/member/friend/add/ajax.php',{fname:fname,})
                .done(function (res) {
                    console.log(res);
                    if(res.status > 0){
                        return alert('操作失败');
                    }
                    if(res.data === 'DelFriend'){
                        trigger.removeClass('followed');
                        trigger.find('#follow-text').text('关注');
                        trigger.find('#follow-num').text(trigger.find('#follow-num').text()-1);
                    }else {
                        trigger.addClass('followed');
                        trigger.find('#follow-text').text('已关注');
                        trigger.find('#follow-num').text(trigger.find('#follow-num').text()-1+2);
                    }

                })
                .fail(function (xhr) {
                    console.log(xhr)
                });
            return false;
        });
        if(userInfo === null) return;
        $.get("/e/member/friend/has.php?fname="+fname)
            .done(function (res) {
                if(res.data>0){
                    trigger.addClass('followed');
                    trigger.find('#follow-text').text('已关注');
                }
            })
            .fail(function (xhr) {
                console.log(xhr)
            });
    }
    function initFavorite() {
        var trigger = $(".add-favorite");
        if(trigger.length<=0) return;
        var userInfo = User.userInfo(),text = trigger.text();
        var classid = trigger.data("classid"),id = trigger.data("key");
        trigger.click(function (e) {
            if(userInfo === null) {
                alert('请登陆');
                return false;
            }
            $.post('/e/member/fava/add/ajax.php',{classid:classid,id:id})
                .done(function (res) {
                    console.log(res);
                    if(res.status > 0){
                        return alert('操作失败');
                    }
                    if(res.data === 'DelFava'){
                        trigger.removeClass('followed');
                        trigger.text('收藏曲谱');
                    }else {
                        trigger.addClass('followed');
                        trigger.text('已收藏');
                    }
                })
                .fail(function (xhr) {
                    console.log(xhr)
                });
            return false;
        });
        if(userInfo === null) return;
        $.get("/e/member/fava/has.php",{classid:classid,id:id})
            .done(function (res) {
                if(res.data>0){
                    trigger.addClass('favorite');
                    trigger.text('已收藏');
                }
            })
            .fail(function (xhr) {
                console.log(xhr)
            });
    }
    return {
        init: function () {
        },
        initViewContent: initViewContent,
        initFollow: initFollow,
        initFollow1: initFollow1,
        initFavorite: initFavorite,
    }
}(jQuery);

User.init();
User.initTop();
App.initViewContent();
App.initFollow();
App.initFollow1();
App.initFavorite();