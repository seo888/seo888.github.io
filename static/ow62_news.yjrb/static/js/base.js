$(function () {
    var isLogin = false;
    var isWeixin = false;
    if (typeof weixinLogin != "undefined") {
        isWeixin = weixinLogin.isWeixin();
    }
    //  页脚二维码
    $('.hover_qr').hover(function () {
        $('.f_qr', this).stop().slideDown('fast');
    }, function () {
        $('.f_qr', this).stop().slideUp('fast');
    });
    // 进入页面1s后清理控制台
    if (tycom.config.clearConsole) {
        setTimeout(function () {
            //console.clear();
        }, 1000)
    }

    $(window).on('scroll', function () {
        var height = $(this).scrollTop();
        var $toTop = $('#Backtop');
        if (height > 700) {
            $toTop.show();
        } else {
            $toTop.hide();
        }
    });

    // 加载更多
    if ($(window).width() <= 640) {
        if ($("#c_content").length > 0) {
            var contentH = $("#c_content")[0].scrollHeight;
            if (contentH > 1500) {
                $("#show_more").show();
            }
        }
        if (isWeixin) {
            $('#c_comment').find('.speech').show();
            weixinLogin.init(weixinlogin);
        }
    } else {
        if (isWeixin) {
            weixinLogin.init(weixinlogin);
        }
    }

    function weixinlogin(res) {
        if (res) {  //已登录
            isLogin = true;
            $('#wc_login').hide();
            $('#user_name').text(res.name);
            $('#user_name').attr('title', res.name);
            $('#userinfo').show();
        }
    }

    $('#show_more').on('click', function () {
        $(this).hide();
        $("#c_content").css('max-height', 'none');
    })
    // 文章若有图片则不显示标题图
    // 稿件详情里不显示标题图 2018-07-27
    /*if(!($('#c_content img').length>0) && !($('.imggroup img').length>0)){
      $("#c_titimg").show();
    }*/

    //   去除列表页轮播标题中前后空格
    $('.news-topbox .am-slider-desc h3 a').each(function (i, item) {
        var text = $(this).text();
        $(this).text($.trim(text));
    })
//  去掉详情页后面的空p标签
    /*  var $ps = $('#c_content p').slice(-10);
      $ps.each(function () {
          var len = $(this).html().length;
          if (len <= 4) {
              $(this).remove();
          }
      });*/
    // 详情页有附件
    if ($('.attach-group').length > 0) {
        $('.attachment').show();
    }

    function fill_user() {
        tycom.app_manager.get_login_user_info(function (res) {
            if (res) {  //已登录
                isLogin = true;
                $('#wc_login').hide();
                $('#user_name').text(res.name);
                $('#user_name').attr('title', res.name);
                $('#userinfo').show();
            }
        })
    }

    // 提示信息
    var timer = null;

    function showTips(str) {
        if (!str) {
            return;
        }
        clearTimeout(timer);
        $('#tips span').text(str);
        $('#tips').show();
        timer = setTimeout(function () {
            $('#tips').hide();
        }, 3000)
    }

    fill_user();
//  微信登录
    var uri = tycom.url.redirect_uri();
    var state = Math.random().toString(36).substr(2);
    var weixin = tycom.url.weixin_login(uri, state);
    $("#wc_login").on("click", function () {
        if (isWeixin) {
            weixinLogin.login();
            return false;
        }
        window.open(weixin);
        var wx = {
            state: state
        }
        var interval = setInterval(function () {
            tycom.api.member.get_wechat_user_info(wx, function (res, err) {
                if (res) {
                    data = {
                        bindType: "weixin",
                        bindValue: res.openid,
                        bindName: res.nickname,
                        img: res.headimgurl,
                        autoRegister: "1"
                    }
                    tycom.api.member.check_bind_other(data, function (res, err) {
                        if (err) {
                            return tycom.common.api_tools.alert_error(err);
                        }
                        if (res == 0) {
                            console.log(tycom.url.bind_account(data));
                        } else {
                            collect_login(function (res, err) {
                                if (err) {
                                    return tycom.common.api_tools.alert_error(err)
                                }
                                fill_user();
                            })
                        }
                    })
                    clearInterval(interval);
                }
            })
        }, 1000)
    })

    // 退出

    $('#logout').click(function () {
        tycom.app_manager.logout(function (res, err) {
            if (err) {
                return tycom.common.api_tools.alert_error(err);
            }
            isLogin = false;
            showTips('已退出');
            $("#userinfo").hide();
            $('#wc_login').show();
        })
    });
    // 发表评论
    if (tycom.config && tycom.config.close_comment) {
        $("#c_comment").remove();
    }
    $("#submit_comment").click(function () {
        if (!isLogin) {
            showTips('请先登录');
            return;
        }
        var val = $("#txt_comment").val();
        var data = {
            story_id: $(".page").attr("data-id"),
            content: val
        }
        if (!val) {
            showTips('请输入评论内容');
        }
        if (val) {
            tycom.api.comment.submit(data, function (data, err) {
                if (err) {
                    return tycom.common.api_tools.alert_error(err);
                }
                if (!err) {
                    // 发布成功
                    $("#txt_comment").val('');
                    showTips('发布成功，待审核');
                }
            })
        }
    })


    function renderTemplate(template, data) {
        data.open = "{&";
        data.close = "&}";
        return ejs.render(template, data);
    }

    //视频播放控制 一次播放一个
    function videoPlayerController(){
        var $container=$("#c_content");

        var currentVideo=null;

        function init(){
            bindEvent();
        }
        function bindEvent(){
            $container.find('video').on('play',function () {
                var $this = $(this);
                // var $li = $this.closest('li');
                // var $playBtn = $li.find('.play');
                // $playBtn.hide();
                if(currentVideo != this){
                    currentVideo && currentVideo.pause();
                }
                // if(!this.controls){
                //     this.controls = true;
                // }
                currentVideo = this;
            });
        }




        init();
    }

    videoPlayerController();

    (function () {
        //   评论
        if (tycom.config && tycom.config.close_comment) {
            return false;
        }
        // var comment_url = "https://api.myjson.com/bins/140bba";
        var $template = $("#comment_temp").html();
        if (!$template || !$newJsonPath) {
            return;
        }
        var comment_url = $newJsonPath;
        // var comment_url = 'http://ht.yjrb.com.cn:800/zb_list_json/1795/00000002.json';
        $.getJSON(comment_url, function (data) {
            var newArr = [];
            if (data.page_data && data.page_data.length > 0) {
                for (var i = 0; i < data.page_data.length; i++) {
                    if (i < 3) {
                        newArr.push(data.page_data[i]);
                    }
                }
                newArr.forEach(function (item) {
                    if (dayjs().year() == dayjs(item.createTime).format('YYYY')) { //如果是今年不显示年份
                        item.createTime = dayjs(item.createTime).format('M月D日')
                    } else {
                        item.createTime = dayjs(item.createTime).format('YYYY年M月D日');
                    }

                });
                $("#comment_list").append(renderTemplate($template, {items: newArr}));
                $('#c_comment').show();
            }
        }).error(function (xhr, status, error) {
            console.log('暂无数据', status, error);
            if (tycom.config.clearConsole) {
                setTimeout(function () {
                   // console.clear();
                }, 100)
            }
        });
    })()
    //    推荐列表自动切换
    var tj = {
        as: $('.recommend .tj-menu li a'),
        len: $('.recommend .tj-menu li a').length,
        timer: null,
        cur: 0,
        ul: $('.recommend .tj-menu')
    }

    function toggle_tj() {
        tj.timer = setInterval(function () {
            tj.cur++;
            if (tj.cur >= tj.len) {
                tj.cur = 0;
            }
            tj.as.eq(tj.cur).trigger('click');
        }, 3000)
    }

    if (tj.len > 0) {
        tj.as.on('click', function () {
            tj.cur = tj.as.index($(this));
        });
        tj.ul.hover(function () {
            clearInterval(tj.timer)
        }, function () {
            toggle_tj();
        })
        toggle_tj();
    }

    //    格式化时间
    function formatTime($eles) {
        if (!($eles.length > 0)) {
            return false;
        }
        var $times = $eles;
        for (var i = 0; i < $times.length; i++) {
            var $time = $times[i];
            var publishTime = $($time).attr("data-time");
            if (publishTime.length > 18) {
                publishTime = new Date(parseInt(publishTime.substring(0, 4)), parseInt(publishTime.substring(5, 7)) - 1, parseInt(publishTime.substring(8, 10)),
                    parseInt(publishTime.substring(11, 13)), parseInt(publishTime.substring(14, 16))
                    , parseInt(publishTime.substring(17, 19))).getTime();
            } else {

                publishTime = (new Date()).getTime() - 1 * 3600 * 24;

            }
            var nowTime = new Date().getTime();
            var time = nowTime - publishTime;
            var timeStr = getTime(time);
            if (timeStr) {
                $($time).text(timeStr + '前');
            } else {
            }
        }

        function getTime(time) {
            time = time / 1000;
            if (time < 0) {
                return "10秒";
            }
            if (time < 60) {
                return Math.floor(time) + "秒";
            } else {
                time = time / 60;
            }
            if (time < 60) {
                return Math.floor(time) + "分";
            } else {
                time = time / 60;
            }
            if (time < 24) {
                return Math.floor(time) + "小时";
            } else {
                time = time / 24;
            }
            if (time < 30) {
                return Math.floor(time) + "天";
            } else {
                time = time / 30;
            }
            if (time < 12) {
                return Math.floor(time) + "个月";
                time = time / 12;
                return Math.floor(time) + "年";
            }
        }
    }

    // 阅读数
    /*var countTimer = null;

    function getReadCount(url) {
        url = url || renderNumPath;
        $.getJSON(url, function (res, state) {
            if (state == 'success') {
                var count = res.readCount;
                if (count > 100000) {
                    connt = '100000+'
                }
                $('#reader_num').text(count).parent().show();
            } else {
                clearInterval(countTimer);
            }
        })
    }

    if (renderNumPath) {
        getReadCount(renderNumPath);
        countTimer = setInterval(getReadCount, 3 * 60 * 1000, renderNumPath);
    }*/

    $('#p_time').text(formatTime($('#p_time'))).show();
    $('#p_time').on('click', function () {
        $(this).text($(this).data('formattime')).css('color', '#555');
        $(this).off('click');
    })
//  点击排行
    /* var ph_url = '/asset/home/'+$('body').data('subjectcode')+'/hot_browse.html';
     $("#tab_rank").load(ph_url);*/


//  获取更多新闻   /apps/q_articles/?text=(keyword:"高考" OR keyword:"记忆")

    var $relation_list = $("#relation_list");
    var $rel_list = $('#relation_list p');

    var relation_list_config = {
        maxLength: 10,
        keyword: $relation_list.attr("data-keyword"),
        flagword: $relation_list.attr("data-flagword"),
        excludedIdsContentIds: [$('.page.box').data('id')]
    }

    //如果有手工推荐
    if ($rel_list.length > 0) {
        $("#relation_sec").show();
        //for (var item of $rel_list) {
        for (var i=0;i<$rel_list.length;i++){
            var item = $rel_list[i];
            relation_list_config.excludedIdsContentIds.push($(item).attr("data-nodecontentid"))
        }
    }
    if ($rel_list.length < relation_list_config.maxLength) {
        var keyword = relation_list_config.keyword;
        var flagword = relation_list_config.flagword;

        /*if (!keyword&&!flagword) { // 该稿件没有关键词
            return false;
        }*/
        var keyword_list = [];
        var keyword_arr = [];
        if (keyword) {

            if (/\,/.test(keyword)) {
                keyword_list = keyword.split(',');
            } else if (/\，/.test(keyword)) {
                keyword_list = keyword.split('，');
            } else {
                keyword_list = keyword.split(' ');
            }

            keyword_list.forEach(function (item, index) {
                var str = 'keyword:"' + item + '"';
                keyword_arr.push(str);
            });
        }
        var flagword_list = [];
        var flagword_arr = [];
        if (flagword) {
            if (/\,/.test(flagword)) {
                flagword_list = flagword.split(',');
            } else if (/\，/.test(flagword)) {
                flagword_list = flagword.split('，');
            } else {
                flagword_list = flagword.split(' ');
            }

            flagword_list.forEach(function (item, index) {
                var str = 'flagword:"' + item + '"';
                flagword_arr.push(str);
            });
        }

        var queryArr = keyword_list.concat(flagword_list);
        if (queryArr.length <= 0) {
            return false;
        }

        var queryText = queryArr.join(' OR ');
        var remainLen = relation_list_config.maxLength - $rel_list.length;
        var q_url = '/apps/q_articles/?text=(' + queryText + ')';
        $.getJSON(q_url, function (res) {
            var result = res.data.result;
            var len = result.total_count;
            var data = result.page_data;
            var excludedIds = relation_list_config.excludedIdsContentIds;
            excludedIds = excludedIds.map(function(x){x = x + "";});
            if (!len) {
                console.log('没有找到更多新闻');
                return false;
            }
            var contentId = $('.page.box').data('id');  // 本稿件的nodecContentId
            var newData = [];
            $.each(data, function (index, item) {
//                    if (item.id != contentId) {
//                        newData.push(item);
//                    }
                if (!excludedIds.includes(item.id + "")) {
                    newData.push(item);
                }
                if (newData.length == remainLen) {
                    return false;
                }
            });
            if (!(newData.length)) {
                console.log('没有找到更多新闻');
                return false;
            }
            var htmlTemplate = $('#template_relation').html();
            var resultTemplate = renderTemplate(htmlTemplate, {list: newData});
            // console.log(data);
            $('#relation_list').append(resultTemplate);
            $rel_list = $('#relation_list p');
            if ($rel_list.length > 0) {
                $('#relation_sec').show();
            }

        });
    }




})
