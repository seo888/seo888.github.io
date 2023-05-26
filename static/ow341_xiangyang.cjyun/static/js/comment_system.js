/**
 * Created by xuzhihan on 2017/5/24.
 */
$(function(){
    var curPage = 1,
        pagesize = 20,
        userinfo,
        isSend = false,
        defaultUserImg = comment.resource + '/assets/templates/web/1/images/comment/default_user.png',
        oauth = Oauth(oauthConfig);

    function getUserinfo(){
        var timer = window.setInterval(function(){
            if(isLogined && !userinfo){
                oauth.check(function(noticeurl, isCaptcha, res) {
                    userinfo = res;
                    $('.comment_system #js-comment-username').text(res.nickname+'：').removeClass('hide');
                    res.thumb = res.thumb ? res.thumb : defaultUserImg;
                    $('.comment_system #js-comment-userimg').removeClass('hide').find('img').attr('src',res.thumb);
                    $('.comment_system #js-comment-login-btn').addClass('hide');
                }, $.noop);
            } else if(!isLogined && userinfo) {
                $('.comment_system #js-comment-username').addClass('hide');
                $('.comment_system #js-comment-userimg').addClass('hide');
                $('.comment_system #js-comment-login-btn').removeClass('hide');
                userinfo = undefined;
            } else if(userinfo) {
                $('.comment_system .del-btn').each(function(){
                    var thisId = $(this).attr('user_id');
                    if(thisId == userinfo.memberid) {
                        $(this).show().siblings('.flag').hide();
                    }
                });
                window.clearInterval(timer);
            }
        }, 1000);
    }

    // 登录按钮
    $('.comment_system #js-comment-login-btn').on('click',function(){
        $('.login-btn').click();
    });

    // 回复评论界面切换
    $('.comment_system').on('click', '.reply-btn', function(){
        var form = $(this).parent().next();
        if(form.is(':hidden')){
            form.slideDown('fast');
            $(this).text('取消回复');
        } else {
            form.slideUp('fast');
            $(this).text('回复');
        }

    });

    // 点赞
    $('.comment_system').on('click', '.ding', function(){
        var $this = $(this);
        if($this.hasClass('active')){
            return;
        }
        var param = {
            comment_id: $this.parent().next().attr('comment_id')
        };
        $.getJSON('/index/comment/support', param, function(data) {
            if(data.state) {
                $this.addClass('active');
                var num = $this.text() || 0;
                $this.text(+num + 1);
            } else if (data.error) {
                Modal.alert(data.error);
            }

        });
    });

    // 举报
    $('.comment_system').on('click', '.flag', function(){
        var $this = $(this);
        if($this.hasClass('active')){
            return;
        }
        var param = {
            member_id : userinfo?userinfo.memberid:'',
            comment_id: $this.parent().next().attr('comment_id')
        };
        $.getJSON('/index/comment/report', param, function(data) {
            if(data.state) {
                $this.addClass('active');
                $this.text('已举报');
            } else if (data.error) {
                Modal.alert(data.error);
            }
        });
    });

    // 删除自己的评论
    $('.comment_system').on('click', '.del-btn', function(e){
        var $this = $(this),
            params = {
                user_id : userinfo.memberid,
                comment_id : $this.attr('comment_ids')
            };

        $.post('/index/comment/del', params, function(data) {
            if(data.state) {
                curPage = 1;
                getCommentList(true);
            }
        }, 'json');
    });


    // 列表加载
    function getCommentList(reload){
        var param = {
            'content_id': comment.contentid,
            'appid': comment.appid,
            'page': curPage,
            'pagesize': pagesize
        };
        $.getJSON('/index/comment/list', param).success(function(data){
            isSend = false;
            if(!data.state){
                return;
            }
            $('.comment_system .num').text(data.data.participation_sum||'0');
            $('.comment_system .comment-num').text(data.data.cmt_sum||'0');
            $('.comment_system .comment-number').removeClass('hide');
            if(curPage < data.data.total_page_no) {
                $('.comment_system .load-more').removeClass('hide');
            } else {
                $('.comment_system .load-more').addClass('hide');
            }
            // 最新评论
            var html = '';
            if(data.data.comments.length > 0){
                for(var i = 0;i < data.data.comments.length; i++) {
                    var bean = data.data.comments[i];
                    html += getListItemHtml(bean, false);
                }
                if(reload){
                    $('.comment_system #js-comment-list-new').empty();
                }
                $('.comment_system #js-comment-list-new').append(html).prev().removeClass('hide');
            } else {
                $('.comment_system .empty-text').removeClass('hide');
            }


            //最热评论
            html = '';
            if(data.data.hots.length > 0){
                for(var i = 0;i < data.data.hots.length; i++){
                    var bean = data.data.hots[i];
                    html += getListItemHtml(bean, false);
                }
                if(reload){
                   $('.comment_system #js-comment-list-hot').empty();
                }
                $('.comment_system #js-comment-list-hot').append(html).prev().removeClass('hide');
            }

        });
    }

    //翻页
    $('.comment_system .load-more').on('click', function(e){
        if(isSend) {
            return;
        }
        isSend = true;
        curPage++;
        getCommentList();
    });


    // 提交评论
    $('.comment_system').on('click', '.submit-btn', function(e){

        if(!isLogined && comment.login == 1) {
            $('.login-btn').click();
            return;
        }
        var $this = $(this);
        if(comment.vf_code == 1){
            CaptchaModal(function(){
                submitForm($this)
            });
        } else {
            submitForm($this)
        }
    });


    // 提交评论的数据
    function submitForm($this) {
        var form = $this.parents('.form-box').length == 0 ? $this.parents('.form-btn').prev() : $this.parents('.form-box'),
            content = form.find('textarea').val(),
            cid = form.attr('comment_id')||'',
            param = {
                'content_id': comment.contentid,
                'appid': comment.appid,
                'member_id': userinfo ? userinfo.memberid : 0,
                'reply_id': cid,
                'content': content
            };
        $this.addClass('hide').next().removeClass('hide');
        $.getJSON('/index/comment/reply', param).success(function(data) {
            isSend = false;
            $this.removeClass('hide').next().addClass('hide');
            if(!sensitiveserver(data)){
                return;
            }
            if(data.error_msg) {
                Modal.alert(data.error_msg);
                return;
            }
            if(data.state){
                curPage = 1;
                form.find('textarea').val('');
                getCommentList(true);
            }
        });
    }

    //获取列表评论模板
    function getListItemHtml(bean, isfloor) {
        var out = '';
        if(isfloor) {
            out = $('.comment_system #js-comment-list-floor-item-html').html();
        } else {
            out = $('.comment_system #js-comment-list-item-html').html();
        }
        out = $('<div></div>').html(out);
        out.find('.user-img').attr('src', bean.passport.img_url ? bean.passport.img_url : defaultUserImg);
        out.find('.username').text(bean.passport.nickname);
        out.find('.time').text(bean.create_time);
        out.find('.text').text(bean.content);
        out.find('.btn-list').after($('#js-comment-form-html').html());
        out.find('.form-box').attr('comment_id',bean.comment_id);
        out.find('.ding').text(bean.support_count||'');
        out.find('.del-btn').attr('comment_ids', bean.comment_id).attr('user_id', bean.passport.user_id);

        if(bean.ip_location) {
            out.find('.ipaddress').text('[' + bean.ip_location + ']');
        }
        if(bean.passport.user_id && userinfo && userinfo.memberid
            && bean.passport.user_id == userinfo.memberid) {
            out.find('.del-btn').attr('comment_ids', bean.comment_id).show();
            out.find('.flag').hide();
        }
        if(bean.comments && bean.comments.length > 0){
            $.each(bean.comments , function(i,item){
                //out.find('.text:first').before(getListItemHtml(item, true));
                item.create_time = bean.comments.length - i;
                if(out.find('.floor').length != 0) {
                    out.find('.comment-info:eq(1)').before(getListItemHtml(item, true));
                }else{
                    out.find('.comment-info').after(getListItemHtml(item, true));
                }
            });
        }
        return out.html();
    }


    // 验证码弹框
    var CaptchaModal = function (func) {
        var objModal = $('#modal-captcha'),
            objCancelBtn = $('#captcha-cancel'),
            objIpt = $('#captcha-value'),
            objConfirmBtn = $('#captcha-confirm'),
            objCaptcha = $('.captcha-image'),
            timer = null,
            isValided = false,
            m = dialog({
                padding : 0,
                content : objModal
            }).showModal();

        objCaptcha.trigger('click');

        // cancel
        objCancelBtn.add('#remodal-close-captcha').off('click').on('click', function () {
            m.remove();
        });

        objConfirmBtn.off('click').on('click', function () {
            testCode();
        });
        objIpt.off('keydown').on('keydown',function(e){
            if(e.keyCode == 13){
                if (!isValided) {
                    return false;
                }
                testCode();
            }
        });

        function testCode() {
            var iptValue = objIpt.val();
            if (!iptValue || iptValue == '') {
                Modal.alert('请输入验证码'); return;
            }

            if (isValided) { // 验证成功
                if (!func) { return; }
                func();
                m.remove();
            } else {         // 验证失败
                Modal.alert('验证码错误');
            }
        }

        // check captcha value
        objIpt.off('keyup').on('keyup', function () {
            clearTimeout(timer);
            var iptValue = $(this).val();

            if (!iptValue || iptValue.length !=4) {
                return;
            }

            timer = setTimeout(function () {
                $.get('/index/comment/checkcaptcha', {
                    'captcha' : iptValue,
                    '_' : new Date().getTime()
                }, function (res) {
                    if (res.state) {        // 验证成功
                        setCaptchaCheckResult(true);
                    } else {                // 验证失败
                        setCaptchaCheckResult(false);
                    }
                    isValided = res.state;
                });
            }, 300);
        });

        // 刷新验证码
        objCaptcha.off('click').on('click', function () {
            var objIcon = $('#captcha-icon');
            objIcon.removeClass('success error');
            objIpt.val('');
            isValided = false;
            $(this).attr('src', '/index/comment/captcha?_=' + new Date().getTime());
        });

        // 监听close事件
        m.addEventListener('remove', function () {
            objIpt.val('');  // 清空文本框中的值
        });

        // focus
        objIpt.focus();

    };

    // 设置验证码验证结果
    function setCaptchaCheckResult (flag) {
        var obj = $('#captcha-icon');
        if (flag) {
            if (obj.hasClass('error')) {
                obj.removeClass('error');
            }
            obj.addClass('success');
        } else {
            if (obj.hasClass('success')) {
                obj.removeClass('success');
            }
            obj.addClass('error');
        }
    }


    // 楼层hover效果
    $('body').on('mouseover','.floor', function(e){
        e.stopPropagation();
        $(this).addClass('hover').parents('.floor').removeClass('hover');
    });
    $('body').on('mouseleave','.floor', function(e){
        //e.stopPropagation();
        $(this).removeClass('hover');
    });


    function init() {
        getUserinfo();
        getCommentList();
    }
    init();

});
