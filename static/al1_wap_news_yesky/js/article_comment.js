var comment_title;
var comment_url;
var comment_sid;
var topicId;
var offset = 0;
var timestamp; //ʱ���
var count;
var content; //��������
var replayCon; //�ظ�����
var replyId;
var replyId = 0;
var isWx;
var type;
var comment_counts = 0;
// var txtAreaClicked = 0;
// var userInfo = {"userName":"δ��¼","avatarUri":"","isLogin":false};

// �ж��Ƿ���ios�´�uc
var u = navigator.userAgent;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios�ն�
console.log('isiOS:' + isiOS)
console.log('isiOS:' + !isiOS)

var u1 = navigator.appVersion;
var uc = u1.split('UCBrowser/').length > 1 ? 1 : 0;


// var interval = setInterval(function() {
//     document.body.scrollTop = document.body.scrollHeight
// }, 100)


$(document).ready(function () {
    $('<p>��<text class="comment_count">' + comment_counts + '</text>������</p>').appendTo($('.newCom'));
    // getWapApi();
    // loginState();
    getCookie("content");

    getTopicId();
    is_weixn();

    // ������ظ���
    $('.loadMore').on('click', function () {
        loadMoreComments(offset, 5);
        offset += 5; //����ҳ�������Ժ�ÿҳ����5��
    });

    $('.closeBtn').click('on', function () {
        $('.loginBox').hide();
        $('.replyCover').hide();
    })

    // //��ȡinput Ԫ��,��ʵʱ�����û�����
    // $('#comtInput').live('input propertychange', function () {
    //     // console.log($('#comtInput').val())
    //     content = $('#comtInput').val();
    //     console.log('content:' + content)
    // })

    $('#replyArea').live('input propertychange', function () {
        // console.log($('#replyArea').val())
        content = $('#replyArea').val();
        console.log('content1:' + content)
    })
    $('#replyArea').on('click', function () {
        replyId = 0;
        console.log('���ĵ�replyId1---��' + replyId)

        // if (isiOS) {
        //     createIosComBox();
        //     document.body.scrollTop = 0;
        //     document.documentElement.scrollTop = 0;
        // }
    })

    //������������Ƿ��½
    // $("#comtInput").keydown(function (event) {
    //     event = document.all ? window.event : event;
    //     if ((event.keyCode || event.which) == 13) {
    //         // txtAreaClicked == 0;
    //         replyId = 0;
    //         loginState()
    //     }
    // });


    // �ظ�����
    $('.submiting').on('click', function () {
        createCookie();
        loginState();
    })




    //   ���ֵ�½��ʽ
    $('.qqLogin').on('click', function () {
        var url = window.location.href;
        window.location.href = "https://comment.yesky.com/api/qqWapLogin.do?redirect_uri=" + url;
    })
    $('.sinaLogin').on('click', function () {
        var url = window.location.href;
        window.location.href = "https://comment.yesky.com/api/weiboWapLogin.do?redirect_uri=" + url;
    })
    $('.wechatLogin').on('click', function () {
        var url = window.location.href;
        window.location.href = "https://comment.yesky.com/api/wx/authorize.do?redirect_uri=" + url;
    })



    $('.comment').on('click', '#fCom', function () {
        replyId = $(this).data('id')
        console.log('replyId2:' + replyId);
        replyUserShow();
        // if (isiOS) {
        //     createIosComBox()
        //     document.body.scrollTop = 0;
        //     document.documentElement.scrollTop = 0;
        // }
    })
    $('#fIcon').live('click', function () {
        replyId = $(this).data('id')
        console.log('replyId2:' + replyId);
        replyUserShow();
        // if (isiOS) {
        //     createIosComBox()
        //     document.body.scrollTop = 0;
        //     document.documentElement.scrollTop = 0;
        // }
    })
    $('.comment').on('click', '.an-content-com', function () {
        replyId = $(this).data('id')
        console.log('replyId2:' + replyId);
        replyUserShow();
        // if (isiOS) {
        //     createIosComBox()
        //     document.body.scrollTop = 0;
        //     document.documentElement.scrollTop = 0;
        // }
    })
    // $(".show-comment").on("click", ".user-con", function () {
    //     replyId = $(this).find("img").attr("data-id");
    //     console.log(1, replyId);
    //     replyUserShow();
    // })
    if (isiOS) {
        $('.replyBox').on('click', '.cancleBtn', function () {
            $('.replyBox').css({
                "height": "0.7rem",
            })
            $('.replyBox').removeClass('rpActive')
            $('.textBox').css({
                "height": "0.7rem",
                "margin-bottom": "0rem",
                "width": "80%",
                "position": "static",
                "top": "0",
                "left": "0",

            })
            $('.cancleBtn').hide();
            $('.submiting').removeClass("subActive")
        })
    }



})

function createIosComBox() {
    $('body').css({
        "height": "100%",
        "width": "100%",
        "position": "fixed",
        "top": "0px",

    })
    $('.replyBox').css({
        "height": "26rem",
        "position": "absolute",

    })
    $('.replyBox').addClass('rpActive')
    $('.cancleBtn').show();
    $('.textBox').css({
        "height": "3rem",
        "margin-bottom": "0.2rem",
        "width": "95%",
        "position": "absolute",
        "top": "0.15rem",
        "left": "0.1rem",
    })

    $('.submiting').addClass("subActive")
}

// ��ȡcookie�д�ȡ��content������
function getCookie(cookieName) {
    var strCookie = document.cookie;
    console.log('cookie:' + strCookie)
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (cookieName == arr[0]) {

            if (arr[1] != undefined) {
                $('#replyArea').val(arr[1]);
                content = arr[1];
                replyId = 0;
            }
            return arr[1];
        }
    }
    return "";
}

//�ж��Ƿ���΢���д�
function is_weixn() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        isWx = true;
        console.log('isWx:' + isWx)
        return true;
    } else {
        isWx = false;
        console.log('isWx:' + isWx)
        return false;
    }
}

function createCookie() {
    if (content == undefined) {
        document.cookie = 'content=' + '';
    } else {
        document.cookie = 'content=' + content;

    }
    console.log('createing:' + document.cookie)
}

// // �������ֲ�
// $(document).click(function (e) {
//     var replyCover = $(".replyCover")[0],
//         target = e.target;
//     // if (txtAreaClicked == 1) {
//     if (replyCover == target) {
//         $('.replyCover').hide();
//         $('.replyBox').hide();
//     }
//     // }

// });

// ҳ���״μ����������»�ȡtopicId
function getTopicId() {
    comment_title = $(document).attr("title");
    comment_url = window.location.href;
    comment_sid = $(".sid").text();
    // comment_title = '��Ӣ��֮�С�Ӣ��ƪ�����ɱ¾����_�켫��';
    // comment_url = 'http://game.yesky.com/webgame/359/35334359.shtml';
    // comment_sid = 35334359;
    // comment_title = '�Ӱ�������ݿ���Ŀ�����ҵSaaSӦ��ʵ��һ_�켫��';
    // comment_url = 'http://wap.yesky.com/cio/140/99904140.shtml';
    // comment_sid = 99904140;
    console.log('comment_title', comment_title)
    console.log('comment_url', comment_url)
    console.log(' comment_sid', comment_sid)
    $.ajax({
        url: 'https://comment.yesky.com/api/getTopicId.do',
        data: {
            comment_url: comment_url,
            comment_title: comment_title,
            comment_sid: comment_sid
        },
        type: 'post',
        dataType: 'json',
        success(res) {
            console.log(res);
            // console.log('topicId' + data.data.topicId);
            if (res.success) {
                topicId = res.data.topicId;
                console.log('topicId:', topicId)
                getComment();
            }
        },
        error(res) {
            console.log('sth Wrong', res.info)
        }
    })

}
$(document).ready(function () {
    $('body').height($('body')[0].clientHeight);
});



// ҳ���״λ�ȡ����
function getComment() {
    timestamp = Date.parse(new Date());
    // topicId = 2; //����Id
    // var offset = 0;
    count = 5;
    console.log('ʱ�����' + timestamp);
    console.log('offset:' + offset)
    console.log('count:' + count)
    console.log('topicId:' + topicId)
    loadMoreComments(0, 3);
    offset = 3; //��ҳ���غ�ƫ������3��ʼ����Ϊ��ҳ����3��
}



// ��ȡ�����б�
function loadMoreComments(offset, count) {
    $.ajax({
        url: 'https://comment.yesky.com/api/getComment.do',
        data: {
            timestamp: timestamp,
            topicId: topicId,
            offset: offset,
            count: count
        },
        type: 'post',
        dataType: 'json',
        success: function (res) {
            comment_counts = res.cmt_sum;
            $('.comment_count').text(comment_counts);
            console.log(res)
            var comments = res.comments;
            var commentLi = '';
            var replyLi = '';
            var noCommentTip = `<div class="noCommentTip">
            <img src="https://resource.yesky.com/TLimages2009/yesky/images/bdapp/fbbg.png"></>
            <p>��������</p>
            <p>�Ժ�����������</p>
          </div>`
            if(comment_counts == 0){
              $('.show-comment').append(noCommentTip)
            }
            if (res.comments == null) {
                console.log('û������')
                $('.loadMore').hide();
            } else {
                $.each(comments, function (i, val) {
                    // console.log(val.createdTime.slice(0, val.createdTime.indexOf(' ')))
                    // val.createdTime = val.createdTime.slice(0, val.createdTime.indexOf(' ')); //��ȡ����ʱ��
                    val.createdTime = val.createdTime.slice(5, val.createdTime.length); //��ȡ����,ȥ�����
                    commentLi = '<dl class="content-com clearfix">' +
                        '<div class="up-content clearfix"><dt class="user-con"><img id="fIcon" data-id="' + val.commentId + '"  src="' + val.avatarUri + '"></img></dt><dd class="info-con"><p class="user-name">' + val.nickname + '</p><p class="time">' + val.createdTime + '</p><p class="text" id="fCom" data-id="' + val.commentId + '">' + val.content + '</p></dd></div></div>' +
                        '<div class="an-comment" data-id="0010"></div>'
                    '</dl>';
                    $('.show-comment').append(commentLi)
                    if (val.replyComments) {
                        $.each(val.replyComments, function (j, item) {
                            // item.createdTime = item.createdTime.slice(0, item.createdTime.indexOf(' '));
                            item.createdTime = item.createdTime.slice(5, item.createdTime.length);
                            replyLi = '<dl class="an-content-com"  data-id="' + item.commentId + '"><dt class="user-con"><img src="' + item.avatarUri + '"></dt><dd class="info-con"><p class="user-name">' + item.nickname + '</p><p class="time">' + item.createdTime + '</p><p class="text">�ظ�<span class="a-name">@' + item.replyNickname + '</span>:' + item.content + '</p></dd></dl>'
                            $('.an-comment').eq(i + offset).append(replyLi);
                        })
                    }
                })
            }

        },
        error(res) {
            console.log('sth Wrong', res.info)
        }
    });

}



function replyUserShow() {
    // txtAreaClicked = 1;
    // $('.replyCover').show();
    // $('.replyBox').show();
    $('#replyArea').focus();


    // console.log('replyId:' + replyId)
    // txtAreaClicked = 0;
    // console.log(' txtAreaClicked:' + txtAreaClicked)

}



// function replyUserHide() {
//     $('.replyCover').hide();
//     $('.replyBox').hide();
// }


//����½
function loginState() {
    $.ajax({
        url: 'https://comment.yesky.com/api/checkLogin.do',
        data: {},
        type: 'get',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: 'json',
        success(data) {
            console.log('��½info��' + data);
            console.log('�Ƿ��½��' + data.isLogin);
            console.log('��½�û�ID��' + data.nickname);
            console.log('��½�û�ID��' + data.avatarUri);
            if (data.isLogin == true) {
                // createCookie();
                if (content != undefined || content != '') {
                    replySubmit(content);
                    $('.loginBox').hide();
                    $('.replyCover').hide();
                }
                console.log("replyContent:" + content)
            } else {
                getWapApi();
                $('.loginBox').show();
                $('.replyCover').show();
            }
        },
    })
}



// ��������
function replySubmit(con) {
    console.log(topicId)
    console.log(con)
    console.log('replyId:' + replyId)
    $.ajax({
        url: 'https://comment.yesky.com/api/submit.do',
        data: {
            topicId: topicId,
            content: con,
            replyId: replyId,
            type: 1
        },
        type: 'post',
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success(res) {
            console.log('�����ύ�Ƿ�ɹ���' + res.success)
            console.log('����Id:' + res.commentId)
            console.log('����info:' + res.info)
            if (res.success == true) {
                // window.location.reload();
                $('.show-comment').html("");
                getComment();
                $('#replyArea').val("");
                document.cookie = 'content=' + '';
                console.log('ios�仯����ʽ�ָ�-------')
                $('body').css({
                    "height": "100%",
                    "width": "100%",
                    "position": "statice",

                })
                $('.replyBox').css({
                    "height": "0.7rem",
                    "position": "fixed",
                })
                $('.replyBox').removeClass('rpActive')
                $('.textBox').css({
                    "height": "0.7rem",
                    "margin-bottom": "0rem",
                    "width": "80%",
                    "position": "static",
                    "top": "0",
                    "left": "0",
                })
                $('.cancleBtn').hide();
                $('.submiting').removeClass("subActive")

            }
            if (res.type == 1) {
                $('.auditing').show()
                console.log('����˺󷢲�')
                setTimeout(function () {
                    $('.auditing').hide();
                }, 2000)

            }
            timestamp = Date.parse(new Date());
        },
        error(res) {
            console.log('err:' + res.info)
        }

    })
};

function getWapApi() {
    $.ajax({
        url: 'https://comment.yesky.com/api/getWapApi.do',
        data: {},
        type: 'get',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        dataType: 'json',
        success(data) {
            console.log('data.wechat:' + data.wechat)
            console.log('data.qq:' + data.qq)
            console.log('data.sina:' + data.sina)
            if (data.success) {
                if (isWx && data.wechat) {
                    $('.wechatLogin').show();
                } else {
                    $('.wechatLogin').hide();
                }
                if (!data.qq) {
                    $('.qqLogin').hide();
                }
                if (!data.sina) {
                    $('.sinaLogin').hide();
                }
            }
        },
        error(res) {
            console.log(res.info)
        }
    })
}