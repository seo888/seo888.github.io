/*
 * hunliji.com Chat UI Framework
 * Copyright (c) 2015 AUTHORS.hsj
 * Version 1.0
 */
var t = {
    "\u5927\u7b11": "daxiao",
    "\u4e24\u773c\u653e\u5149": "fangguang",
    "\u62a0\u9f3b": "koubi",
    "\u4e0d\u9ad8\u5174": "bugaoxing",
    "\u5410\u820c": "tushe",
    "\u59d4\u5c48": "weiqu",
    "\u5fae\u7b11": "weixiao",
    "\u5413": "xia",
    "\u9119\u89c6": "bishi",
    "\u4e0d\u9ad8": "bugaoxing",
    "\u5927\u54ed": "daku",
    "\u9f13\u638c": "guzhang",
    "\u6c57": "han",
    "\u9177": "ku",
    "\u4eb2\u4eb2": "qinqin",
    "\u751f\u6c14": "shengqi",
    "\u559c\u6b22": "xihuan",
    "\u6655": "yun",
    "\u6293\u72c2": "zhuakuang",
    "\u6253": "da",
    "\u54c8\u6b20": "haqian",
    "\u54fc": "heng",
    "\u6487\u5634": "piezui",
    "\u7761\u89c9": "shuijiao",
    "\u518d\u89c1": "zaijian",
    "\u574f\u7b11": "huaixiao",
    "\u53ef\u601c": "kelian",
    "\u8d31\u7b11": "jianxiao",
    "\u7591\u95ee": "yiwen",
    "\u65e0\u8bed": "wuyu",
    "\u6012\u9a82": "numa",
    "\u56f0": "kun",
    "\u53e3\u7f69": "kouzhao",
    "\u8d5e": "zan",
    ok: "ok",
    "\u8036": "ye",
    "\u95ed\u5634": "bizui"
};
function addScriptTag(src) {
    var script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.src = src
    document.body.appendChild(script)
  }
  addScriptTag('https://qnm.hunliji.com/o_1fiqgv9mb1aqm11rf1kn61kdp10q09.js') // deviceKind文件

var user_id = getCookie('user_id') || getCookie('visitor_user_id'),
    currentMsgPage = 1,
    isVisitor = !getCookie('user_id') && !!getCookie('visitor_user_id')
    now_id = $('.mallindex_chat').attr('data-touser') || $('.merchant_list_button').attr('data-merchantId'),
    actionAdded = false,
    channel_id = '', to_user_id = '', tab_type = 'new', first = true,
    socket_open = false, socketInterval = null, other_user_id = '',isShow = '', 
    ChannelList = [], domain_url='',webSocketUrl='' ,hasConsultList = false;
    if ( window.location.hostname === 'www.hunliji.com' || window.location.hostname === 'hotel.hunliji.com' ) {
        domain_url = 'https://css.hunliji.com:8011'
        webSocketUrl = 'wss://comet.hunliji.com:6051/api/ws'
    } else if( window.location.hostname === 'www7.hunliji.com' || window.location.hostname === 'hotel7.hunliji.com' ){
        domain_url = 'http://www7.hunliji.com:8010'
        webSocketUrl = 'ws://www7.hunliji.com:6050/api/ws'
    } else {
        domain_url = 'http://test.hunliji.com:8010'
        webSocketUrl = 'ws://test.hunliji.com:6050/api/ws'
    }

var api = {
    getToUserInfo: '/p/wedding/Home/APIMerchant/detailMerchantV2', //获取商家评论，好评其他参数
    getChannelId: domain_url+'/api/channels', //获取channelId
    consultListAll: domain_url+'/api/channels?per_page=40', //咨询列表
    messagesList: domain_url+'/api/channels/' + channel_id + '/messages', //消息列表
    editChannel: domain_url+'/api/channels/' + other_user_id + '/channel_user', //修改用户的咨询
    presetMsgs: '/p/wedding/index.php/Home/APIUserShortSentence/List',  // 获取商家快捷短语
    defaultExchangeInfo: '/p/wedding/Home/APIUser/ExchangeInfo',  // 用户默认联系方式
    changeDefaultExchangeInfo: '/p/wedding/Home/APIUser/UpdateExchangeInfo',  // 修改用户默认联系方式
    exchangeMsgRes: function (id) {  // 确认/拒绝交换联系方式
        return `${domain_url}/api/exchange_message/${id}/reply`
    }
}
var weddingChat = {
    init: function (merchantId) {
        user_id = getCookie('user_id') || getCookie('visitor_user_id')
        now_id = merchantId || now_id
        if (now_id) {
            weddingChat.getToUserInfo(now_id)
        } else {
            if($('.user-item').length <= 1) {
                weddingChat.getUsers()     // 获取所有消息
            }
        }
        if(!socket_open) {
            weddingChat.socket();
        }
        !actionAdded && weddingChat.action();
        document.body.style.overflow='hidden'
        $('.mallindex_chat').show();
        var scrollHeight = $('.msg-mod')[0].scrollHeight
        $('.msg-wrap').scrollTop(scrollHeight + 999999999999999)
        var $picBtn = $('#msg-reply #pic-btn')
        if(!getCookie('user_id')){
            // 游客私信不能传图
            $picBtn.hide()
        }else{
            $picBtn.show()
        }
    },
    socket: function () {
        var ws = new WebSocket(webSocketUrl + `?devicekind=${window.hljUtils.getDeviceKind()}&appName=web:wedding`)
        this.ws = ws
        ws.onopen = function (event) {
            $('.non-msg').hide().siblings().show();
            socket_open = true;
            if (socketInterval) {
                clearInterval(socketInterval)
                socketInterval = null
            }
        };
        ws.onclose = function () {
            $('.non-msg').show().siblings().hide();
            show_dialog = false;
            $('#xubox_shade').remove();
            $('#xubox_layer').hide();
            $('.msg-list').remove();
            $('.msg-mod').html('');
            console.log('ws连接失败')
            $(".message-tip").show().text('连接失败请刷新页面或重新登录')
            setTimeout(function () {
                $(".message-tip").hide().text('')
            }, 2000)
            socket_open = false;
            weddingChat.reconnect();
        };
        ws.onmessage = function (event) {
            var res = JSON.parse(event.data);
            var { service, subject, payload } = res
            if (service == 'ws') {
                if (subject == 'ping') {
                    var msg = {
                        service: 'ws',
                        subject: 'pong',
                        payload
                    }
                    ws.send(JSON.stringify(msg))
                }
            } else if (service == 'css') {
                var { channel, kind, content } = payload

                // todo
                // if (kind == 'control' && content.action == 'deassign') {
                //     weddingChat.removeChannelFromList(channel, payload)
                //     return
                // }

                switch (subject) {
                    // case 'msg.read':
                    //     weddingChat.updateUserRead(payload)
                        // break
                    case 'msg.ack':
                        weddingChat.handleAckMsg(payload)
                        break
                    case 'msg':
                        weddingChat.readUserMsg(payload)
                        weddingChat.updateMessageList(payload)
                        weddingChat.updateChannelList(payload)
                        weddingChat.scrollToBottom()
                        break
                }
            }
        }
    },
    reconnect: function () {
        if (!socket_open && !socketInterval) {
            socketInterval = window.setInterval(function() {
                weddingChat.socket();
            }, 5 * 1000)
        }
    },
    sendMessage: function (kind, msgData) {
        var that = this
        msgData = filterXSS(msgData)
        var msg = weddingChat.getMsgData(channel_id, {
            kind,
            msgData
        })
        that.ws.send(JSON.stringify(msg))
    },
    readUserMsg: function (payload) {
        var { channel, id } = payload
        if($('.mallindex_chat').attr('style') == 'display: block;'){
            isShow = true
        } else {
            isShow = false
        }
        if (channel == +$('.msg-user').find(".chat-on p").attr('data-channel') && isShow) {
            if (!weddingChat.sendByMe(payload)) {
                weddingChat.sendRead(channel, id)
            }
        }
    },
    updateMessageList: function (payload) {
        if (payload.channel == channel_id) {
            var data = [payload]
            weddingChat.dealMsg(data,1,payload.channel)
        }
    },
    updateChannelList: function (payload) {
        var userTtem = $('.user-item'), html = ''
        userTtem.each(function () {
            ChannelList.push($(this).find('p').attr('data-channel'))
        });
        if (ChannelList.indexOf(""+payload.channel) <= -1) {
            weddingChat.showNoneChannel(payload.channel)
            ChannelList.push(""+payload.channel)
        } else {
            weddingChat.updateUnreadCount(payload)
        }
    },
    isShowMoreBtn: function() {
        if( $('.msg-user>.user-item').length > 12){
            $('.user-more').removeClass('hidden')
        }else{
            $('.user-more').addClass('hidden')
        }
    },
    updateUserRead: function (payload) {
        var userTtem = $('.user-item'), channel='', id = ''
        if($('.mallindex_chat').attr('style') == 'display: block;'){
            isShow = true
        } else {
            isShow = false
        }
        userTtem.each(function () {
            channel = $(this).find('p').attr('data-channel')
            id = $('.msg-mod').find('.msg-linerow:last').attr("data-message-id")
            if (channel == payload.channel && $(this).hasClass('.chat-on')&&isShow) { 
                weddingChat.sendRead(channel_id,id)
            }
        });
    },
    handleAckMsg: function (payload) {
        if (payload.code == 1030) {
            $(".all-msg").show().text(payload.msg)
            setTimeout(function () {
                $(".all-msg").hide().text('')
            }, 2000)
        } else {
            $(".message-tip").show().text(payload.msg)
            setTimeout(function () {
                $(".message-tip").hide().text('')
            }, 2000)
        }
    },
    updateUnreadCount: function (payload, channel) {
      if (!weddingChat.sendByMe(payload)) {
        var userTtem = $('.user-item'), channel='', unreadCount = ''
        userTtem.each(function () {
            var that = $(this)
            channel = that.find('p').attr('data-channel')
            unreadCount = that.find('.unread-icon').text()
            if (channel == payload.channel && !that.hasClass('chat-on')) { 
                unreadCount = +unreadCount + 1
                that.find('.unread-icon').text(unreadCount).removeClass('hidden')
                $('.msg-user .chat-on').after(that)
            }
        });
      }
    },
    sendByMe: function (payload) {
        return payload.author == user_id
    },
    sendRead: function (channelId, messageId) {
        var that = this
        var msg = weddingChat.getReadMsgData(+channelId, +messageId)
        that.ws.readyState === 1 && that.ws.send(JSON.stringify(msg))
    },
    getUsers: function () {
        $.ajax({
            url: api.consultListAll,
            type: 'GET',
            headers: { appname: 'web' },
            xhrFields: {
                withCredentials: true
            },
            success: function (result) {
                var list = result.data.list
                var html1 = ''
                for (var i = 0; i < list.length; i++) {
                    var obj = list[i];
                    if(obj.to_user_id == to_user_id){
                        html1 += ''
                    }else{
                        html1 += `<div class="user-item ">
                                    <p data-channel =`+ obj.id + ` data-toUser =` + obj.merchant.id + `>
                                        <i class="close-chat-icon"></i>
                                        `+ obj.merchant.name + `
                                    </p>`
                        obj.channelUser.unread_count
                        ? html1 += `<span class="unread-icon">` + obj.channelUser.unread_count + `</span></div>`
                        : html1 += '<span class="unread-icon hidden"></span></div>'
                    }
                }

                $('.msg-user').append(html1);
                if(list.length > 12){
                    $('.user-more').removeClass('hidden')
                }else{
                    $('.user-more').addClass('hidden')
                }
                if(!now_id && list.length && !hasConsultList) {  
                    weddingChat.getToUserInfo(list[0].merchant.id)
                    $('.user-item:first').addClass('chat-on')
                    $(this).find('.unread-icon').addClass('hidden')
                    hasConsultList = true
                }
            }
        });
    },
    getToUserInfo: function (id) {
        $.ajax({
            url: api.getToUserInfo,
            type: 'GET',
            headers: { appname: 'web', 'content-type': "application/json; charset=utf-8", aaa:'aaa' },
            xhrFields: {
                withCredentials: true
            },
            data: { 'mer_id': id },
            success: function (result) {

                var html2 = '',
                obj = result.data;
                to_user_id = result.data.user_id

                weddingChat.getPresetMsgs(obj.property.id, obj.shop_type)  // 获取预置短语

                html2 += ` <div class="shop-info-content active" data-channel =` + obj.id + `>
                            <div class="shop-awator">
                                <img style="cursor:pointer" class="shop-info-logo" src="`+ obj.logo_path + `" alt="` + obj.name + `">
                            </div>
                            <div class="area-detail">
                            `+ obj.name + `
                            </div>
                            <div class="other-info">
                                <span>`+ obj.comments_count + `条</span>
                                <span>`+ (obj.merchant_comment.good_rate * 100).toFixed(1) + `%好评</span>
                            </div>
                        </div>`
                        
                $('.shop-info').html(html2).find('.shop-info-logo').on('click', function () {
                    var shop_type = result.data.shop_type
                    var city_py = getCookie('city_py')
                    if (shop_type == '3' || shop_type == '4' ){
                        var hotel_domain = 'https://www.hunliji.com'
                        if( /www7/.test(window.location.host) ){
                            hotel_domain = 'https://hotel7.hunliji.com'
                        }else if( /dev/.test(window.location.host) ){
                            hotel_domain = 'http://hoteltest.hunliji.com'
                        }
                        return window.open(hotel_domain + '/' + city_py + '/detail_' + result.data.id)
                    } else if (shop_type == '1') {
                        return window.open('/shop/detail_' + result.data.id)
                    } else if (shop_type == '3' || shop_type == '7') {
                        return
                    }
                    window.open('/merchant/detail_' + result.data.id)
                })
                $('.msg-name').html(obj.name);
                
                if (first) {
                    weddingChat.getChannel();
                }
            }
        });

    },
    getChannel: function (id) {
        var param = JSON.stringify({ 'source': 1, 'to_user_id': +to_user_id || +id })
        $.ajax({
            url: api.getChannelId,
            type: 'PUT',
            headers: {
                'content-type': "application/json; charset=utf-8",
                appname: 'web' 
            },
            xhrFields: {
                withCredentials: true
            },
            data: param,
            success: function (result) {
                channel_id = result.data.id
                var html1 = ''
                var obj = result.data
                
                html1 += `<div class="user-item chat-on">
                                <p data-channel =`+ obj.id + ` data-toUser =` + obj.merchant.id + `><i class="close-chat-icon"></i>` + obj.merchant.name + `</p>
                                <span class="unread-icon hidden"></span>
                            </div>`;

                // $('.msg-user').prepend(html1);
                weddingChat.getMessagesList(channel_id);
                weddingChat.isSmartReception(channel_id, result.data.toUser.avatar)

                // 该频道是否已存在
                var channel_exist = $('.user-item p').filter(function() {
                    return $(this).attr('data-channel') == channel_id
                }).length > 0;

                // 商家列表资讯
                if ($('.user-item').length <= 1 || !channel_exist) {
                    // 先移除原节点
                    $('.user-item').remove();
                    $('.msg-user').prepend(html1);

                    weddingChat.getUsers()
                } else {
                    var userTtem = $('.user-item')
                    userTtem.each(function () {
                        if(+$(this).find('p').attr('data-channel') == channel_id) {
                            $(this).addClass('chat-on')
                                   .siblings().removeClass('chat-on')
                        }
                    });
                }
            }
        });

    },
    // 预置短语
    getPresetMsgs: function (property_id, shop_type) {
        var $msgsList = $('.presetMsgs__list')
        $msgsList.html('')
        // $msgsList.siblings('.presetMsgs__header__right')
        // $msgsList.parents('.presetMsgs-main').addClass('presetMsgs-wrapper-close')
        var param = {property_id, shop_type}
        $.ajax({
            url: api.presetMsgs,
            type: 'GET',
            headers:{
                appname:'web'
            },
            xhrFields: {
                withCredentials: true
            },
            data: param,
            success: function (result) {
                var html1 = ''
                if(result.data && result.data.length){
                    $.each(result.data, function (index, msg) {
                        var content = msg.content
                        var id = msg.id
                        html1 += `<div class="presetMsgs__list__item" data-id=${id} data-content="${content}"><span>· ${content}</span></div>`
                    })
                    $msgsList.html(html1)
                    $('.presetMsgs-main').removeClass('presetMsgs-wrapper-close')
                    $('.presetMsgs__header__right span').text('收起')
                    $('.presetMsgs__header__right img').attr({'src': '//qnm.hunliji.com/o_1dp07dbgt13fi11p98ua8kgcnie.png'})
                }
            }
        });
    },
    showNoneChannel: function (id) {
        var param = {"ids": id}
        $.ajax({
            url: api.getChannelId,
            type: 'GET',
            headers:{
                appname:'web'
            },
            xhrFields: {
                withCredentials: true
            },
            data: param,
            success: function (result) {
                channel_id = result.data.id
                var html1 = ''
                var obj = result.data.list
                html1 += `<div class="user-item">
                                <p data-channel =`+ obj[0].id + ` data-toUser =` + obj[0].merchant.id + `><i class="close-chat-icon"></i>` + obj[0].merchant.name + `</p>
                                <span class="unread-icon">1</span>
                            </div>`;

                $('.msg-user').find(".chat-on").after(html1);
                weddingChat.isShowMoreBtn()
            }
        });

    },
    delChannel: function (other_user_id, dom) {
        var param = JSON.stringify({ 'is_hidden': 1 })
        $.ajax({
            url: domain_url+'/api/channels/' + other_user_id + '/channel_user',
            type: 'PUT',
            xhrFields: {
                withCredentials: true
            },
            headers: {
                'content-type': "application/json; charset=utf-8",
                appname:'web'
            },
            data: param,
            success: function () {
                var channel = dom.find('p').attr('data-channel')
                dom.remove()
                ChannelList.splice(ChannelList.indexOf(channel), 1)
                weddingChat.isShowMoreBtn()
                if(!$('.msg-user>.user-item').length){
                    document.body.style.overflow='initial'
                    $('.mallindex_chat').hide()
                }
            }
        });
    },
    getMessagesList: function (channel_id, page) {
        page ? page : page = 1
        $.ajax({
            url: domain_url+'/api/channels/' + channel_id + '/messages',
            type: 'GET',
            headers:{
                appname:'web'
            },
            xhrFields: {
                withCredentials: true
            },
            data: {
                per_page: 10,
                page: page
            },
            success: function (result) {
                weddingChat.dealMsg(result.data.list.reverse(), page, channel_id)
                if(result.data.list.length < 10){
                    var text = isVisitor ? '扫右下方二维码，下载app可保存更多历史消息' : '扫右下方二维码，下载app查看更多历史消息'
                    $('.msg-more .ng-binding').text(text)
                }
                var $unread = $('.chat-on>.unread-icon')
                $unread.html('').addClass('hidden')
            }
        });
    },
    isSmartReception: function (channelId, avatar) {
        $.ajax({
            url: domain_url+'/api/channels/' + channelId + '/smart_reception',
            type: 'GET',
            headers:{
                appname:'web'
            },
            xhrFields: {
                withCredentials: true
            },
            success: function (result) {
                var html = ''
                html +=`<div class="msg-linerow msg-line left">
                        <img class="avatar" src="`+ avatar +`">
                        <h3 class="ng-binding ng-tips">`+ result.data.title +`</h3>`
                        if (result.data.questions) {
                            result.data.questions.forEach(element => {
                                html += '<p class="ng-binding ng-tips intelligent-reply">' + element + '</p>'
                            });
                        }
                // html +=  `<i class="icon"></i></div>`
            }
        });

    },
    callBack: function (id, submitDom, phone_num) {
        var warnParent
        var params = {
            from_type: 11,
            merchant_id: id
        }
        if(isVisitor){
            warnParent = $(submitDom).parent().parent().eq(0)
            var phone_num = $(submitDom).prev().val()
            if(/^1\d{10}/.test(phone_num)){
                params.from_type = 38
                params.phone_num = phone_num
                params.from_id = channel_id
            }else{
                weddingChat.setCallBackWarn(warnParent, '请输入正确的手机号')
                return
            }
        }
        $.ajax({
            url: '/p/wedding/index.php/home/APIMerchant/MakeAppointment',
            type: 'POST',
            headers: { appname: 'web' },
            xhrFields: {
                withCredentials: true
            },
            data: params,
            success: function (result) {
                if(result.status.RetCode != 0) {
                    if(isVisitor){
                        weddingChat.setCallBackWarn(warnParent, result.status.msg)
                    }else{
                        $(".message-tip").show().text(result.status.msg)
                        setTimeout(function () {
                            $(".message-tip").hide().text('')
                        }, 2000)
                    }
                }
            }
        });
    },
    setCallBackWarn: function (target, msg) {
        if(!target)return
        var warn = target.find('.visitor_phone_warn')[0]
        warn && (warn.innerHTML = msg)
        // target.append('<p class="visitor_phone_warn">'+ msg +'</p>')
    },
    dealMsg: function (item, page, channel_id) {
        var html = is_right = '', moreHtml = '', message_id=''

        moreHtml += '<li class="msg-line ng-scope msg-line-first">'
        moreHtml += '<div class="msg-attrntion msg-more">'
        // moreHtml += '<i class="arrow_down"></i>'
        moreHtml += '<p class="ng-binding">查看更多历史消息</p>'
        moreHtml += '</div>'
        moreHtml += '</li>'
        if (Array.isArray(item)) {
            for (var i = 0; i < item.length; i++) {
                var lineclass = item[i].id ? 'msg-line' + item[i].id : '', avatar = '', lineclassId = item[i].id ?item[i].id : '';
                if (item[i].author && +item[i].author == user_id) {
                    is_right = 'right';
                } else {
                    is_right = 'left';
                }
                item[i].authorObj.avatar
                    ? avatar = '<img  class="avatar" src="' + item[i].authorObj.avatar + '" />'
                    : avatar = '<img  class="avatar" src="http://qnm.hunliji.com/o_1d8g2u8491k0l1cjn18vu12tg11np9.png" />'
                html += '<li class="msg-line ng-scope">'

                if (item[i].kind == 'exchange_request') {
                    var type = item[i].content.type
                    var id = item[i].id
                    var typeText = type === 1 ? '微信号' : '手机号'   // 1微信号  2手机号
                    var hasReplied = item[i].content.status !== 0
                    var prompt = item[i].content.prompt
                    var reply_contact = item[i].content.reply_contact
                    html += `<div class="msg-linerow ${lineclass} ${is_right} data-message-id=${lineclassId} exchangeContact-wrapper">
                                ${avatar}
                                <div class="exchangeContact" data-id=${id}>
                                    <div class="exchangeContact-title">收到商家交换${typeText}的请求</div>
                                    <div class="exchangeContact-main">
                                        <div class="exchangeContact-desc">${prompt}</div>
                                        <div>
                                            <div class="exchangeContact-inputLabel">请确认${typeText}：</div>
                                            <input value="${reply_contact||''}" class="exchangeContact-input" ${hasReplied ? 'disabled' : ''} placeholder="点击填写" data-type="${type}" data-id=${id} />
                                        </div>
                                        <div class="exchangeContact-buttons">
                                            <span class="exchangeContact-refuse ${hasReplied ? "exchangeContact-disabled" : ""}" data-replyStatus="2" style="margin-right: 20px">
                                                残忍拒绝
                                            </span>
                                            <span class="exchangeContact-accept ${hasReplied ? "exchangeContact-disabled" : ""}" data-replyStatus="1">
                                                确认并发送
                                            </span>
                                        </div>
                                        <div class="exchangeContact-error"></div>
                                    </div>
                                </div>
                            </div>`
                    reply_contact || weddingChat.getDefaultExchangeInfo(id, type)
                } else if (item[i].kind == 'exchange_result') {
                    var content = item[i].content
                    var status = content.status  // 1已同意  2已拒绝
                    var type = content.type  // 1微信号 2手机号
                    var typeText = type === 1 ? '微信号' : '手机号'
                    var author_contact = content.author_contact
                    if( status == 1) {
                        html += `<div class="msg-linerow ${lineclass} ${is_right} data-message-id=${lineclassId} exchangeContactResult-wrapper">
                                    ${avatar}
                                    <div class="exchangeContactResult">
                                        <div>
                                            <div class="exchangeContactResult-inputLabel">商家${typeText}：</div>
                                            <div class="exchangeContactResult-input">${author_contact}</div>
                                        </div>
                                        ${type === 1 ? `<div class="exchangeContactResult-desc">添加${typeText}时备注‘婚礼纪’可快速通过哟～</div>` : ''}
                                        <div class="exchangeContactResult-buttons">
                                            <textarea style="opacity: 0;height: 1px">${author_contact}</textarea>
                                            <span class="exchangeContactResult-copy" data-contact=${author_contact}>
                                                一键复制
                                            </span>
                                        </div>
                                    </div>
                                </div>`
                    }else{
                        html += `<div class="msg-tip exchangeContactResultRefuse">您已拒绝交换${typeText}的请求</div>`
                    }
                } else if (item[i].kind == 'tips') {
                    if(item[i].content.tips.action == 0) {
                        if(isVisitor){
                            html += '<div class="msg-tip msg-attrntion" style="padding-bottom:3px;">';
                            html += '<h3 class="ng-binding ng-tips" style="background-color: #f5f5f5;font-weight:700">' + item[i].content.tips.title + '</h3>'
                            html += '<p class="ng-binding ng-tips visitor-makeAppoint-tips">您咨询的商家可能临时有事，请您稍作等待，或提交手机号预约回电，商家会与您电话联系。</p>'
                            html += '<p style="margin-top:9px;display:flex;margin-bottom: 2px;" class="ng-binding ng-tips"><input class="visitor_phone" placeholder="请输入您的手机号"/><span class="call_back visitor_call_back">提 交</span></p>'
                            html += '<p class="visitor_phone_warn">&nbsp;</p>'
                        }else{
                            html += '<div class="msg-tip msg-attrntion">';
                            html += '<h3 class="ng-binding ng-tips" style="background-color: #f5f5f5;font-weight:700">' + item[i].content.tips.title + '</h3>'
                            html += '<p class="ng-binding ng-tips">您咨询的商家可能临时有事，请您稍作等待，或点击<span class="call_back">预约回电</span>，商家会与您电话联系。</p>'
                        }
                    } else {
                        html += '<div class="msg-tip msg-attrntion">';
                        html += '<h3 class="ng-binding ng-tips" style="background-color: #f5f5f5;font-weight:700">' + item[i].content.tips.title + '</h3>'
                        html += '<p class="ng-binding ng-tips">' + item[i].content.tips.detail + '</p>'
                    }
                } else if (item[i].kind == 'appointment' || item[i].kind == 'coupon') {
                    html += '<div class="msg-tip  msg-attrntion msg-appointment">';
                    html += '<p class="ng-binding ng-tips appointment">'
                                +'<img class="success_icon"src="http://qnm.hunliji.com/o_1cge5um901qv490k1l91149i19547.png"/>'
                                +'<span class="order_success">预约成功！</span>请保持电话畅通下载APP，领取商家优惠券'
                            +'</p>'
                } else if (item[i].kind == 'voice') {
                    var vlen = Math.round(item[i].content.voice_duration) * 5;
                    if (is_right == 'right') {
                        html += '<div class="msg-tip msg-voice right" style="padding: 30px 0;float: right;background:#fff;"><span class="tip-sec" style="line-height: 14px;vertical-align: top;margin-right: 20px;margin-top: 8px;font-size-12px;">' 
                        html += Math.round(item[i].content.voice_duration) 
                        html += '<sup></sup></span><span class="msg-tip-voice tip-right" style="min-width:10px;text-align: left;max-width:100px;width: ' + vlen + 'px;cursor: pointer;" data-len="1" data-id="' + item[i].id + '"data-path="' + item[i].content.path + '"data-duration="' + item[i].content.voice_duration + '"></span>' + avatar;
                    }else{
                        html += '<div class="msg-tip msg-voice left" style="padding: 30px 10px;background:#fff;"><span class="msg-tip-voice tip-left" data-len="1" style="min-width:10px;max-width:100px;width: ' + vlen + 'px;cursor: pointer;" data-id="' + item[i].id + '"data-path="' + item[i].content.path + '"data-duration="' + item[i].content.voice_duration + '"></span><span class="tip-sec" style="line-height: 14px;vertical-align: top;margin-top: 5px;margin-left: 10px;font-size-12px;">'
                        html += Math.round(item[i].content.voice_duration)
                        html += '<sup></sup></span>' + avatar
                    }
                    html += '<p class="ng-date" style="color: #aaa;">' + item[i].created_at + '</p>';
                } else if (item[i].kind == 'track') {
                    var desc = '', img_path = '', go_url = ''
                    switch (item[i].content.track.action) {
                        case 1:
                            desc = item[i].content.track.meal;
                            img_path = item[i].content.track.meal.cover_path;
                            go_url = '/package/detail_' + item[i].content.track.meal.id;
                            break;
                        case 2:
                            desc = item[i].content.track.case;
                            img_path = item[i].content.track.case.cover_path;
                            go_url = '/example/detail_' + item[i].content.track.case.id;
                            break;
                        case 3:
                            desc = item[i].content.track.merchant;
                            img_path = item[i].content.track.merchant.logo_path;
                            switch (item[i].content.track.merchant.shop_type) {
                                case 1:
                                    go_url = '/shop/detail_' + item[i].content.track.merchant.id;
                                    break;
                                case 2:
                                    go_url = '/hunche/detail_' + item[i].content.track.merchant.id;
                                    break;
                                case 3:
                                    go_url = 'https://hoteltest.hunliji.com';
                                    break;
                                default:
                                    go_url = '/merchant/detail_' + item[i].content.track.merchant.id;
                                    break;
                            }
                            break;
                        case 5:
                            desc = item[i].content.track.product;
                            img_path = item[i].content.track.product.cover_image.image_path;
                            go_url = '/hunpin/detail_' + item[i].content.track.product.id;
                            break;
                        case 6:
                            desc = item[i].content.track.car_product;
                            img_path = item[i].content.track.car_product.cover_image.image_path;
                            go_url = '/hunche/detail_' + item[i].content.track.car_product.id;
                            break;
                        case 7:
                            desc = item[i].content.track.hotel_hall;
                            img_path = item[i].content.track.hotel_hall.cover_url;
                            go_url = 'https://hoteltest.hunliji.com';
                            break;
                    }
                    if (item[i].content.track.action !== 3) {
                        html += '<div class="msg-linerow ' + lineclass + ' ' + is_right + '" data-message-id = '+lineclassId+'>';
                        html += avatar;
                        html += '<a target="_blank" href="' + go_url + '">';
                        html += '<p class="ng-binding" style="text-align: center;margin-bottom: 10px;">发起咨询页</p>';
                        html += '<h3 class="ng-binding"><img class="msgPic" src="' + img_path + '"/><br>';
                        html += '<span  class="msgtitle"">' + (desc.title ? desc.title : desc.name) + '</span><br>'
                        if (desc.show_price) {
                            html += '<span  class="msgPrice""> <i>￥</i>' + desc.show_price + '</span><br>';
                        }
                        html += '</h3>';
                        // html += '<i class="icon"></i>'
                    } else {
                        html += '<div class="msg-tip  msg-attrntion" style="width: 150px;">';
                        html += '<a target="_blank" href="' + go_url + '">';
                        html += '<p class="ng-binding ng-tips">发起咨询页<span style="color: #13acec;">商家首页</span></p>'
                    }
                    html += '</a>';
                } else if (item[i].kind == 'gift') {
                    var content = item[i].content
                    var consult_gift = content.consult_gift  // 咨询礼
                    var shop_gift = content.shop_gift  // 到店礼
                    var order_gift = content.order_gift  // 订单礼物
                    var is_appointment = content.is_appointment  // 是否已预约
                    var user_phone = content.user_phone
                    var new_wedding_discount_content = content.new_wedding_discount_content
                    var shop_gift_tip = content.shop_gift_tip
                    
                    // var content = item[i].content
                    // var consult_gift = '咨询有礼物送哦'  // 咨询礼
                    // var shop_gift = '到店就送婚纱照一套'  // 到店礼
                    // var order_gift = '免费场地、免开瓶费、免费婚房一间'  // 订单礼物
                    // var is_appointment = 0  // 是否已预约
                    var giftHtml = `
                        ${consult_gift ? `<div class='userGetGiftsMessage-gift'>
                            <span class='userGetGiftsMessage-label'>咨询礼：</span>
                            <span class='userGetGiftsMessage-text'>${consult_gift}</span>
                        </div>`:''}
                        ${shop_gift ? `<div class='userGetGiftsMessage-gift'>
                            <span class='userGetGiftsMessage-label'>到店礼：</span>
                            <span class='userGetGiftsMessage-text'>${shop_gift}</span>
                        </div>`:''}
                        ${order_gift ? `<div class='userGetGiftsMessage-gift'>
                            <span class='userGetGiftsMessage-label'>订单礼：</span>
                            <span class='userGetGiftsMessage-text'>${order_gift}</span>
                        </div>`:''}
                        ${new_wedding_discount_content ? `<div class='userGetGiftsMessage-gift'>
                            <span class='userGetGiftsMessage-label'>新人福利：</span>
                            <span class='userGetGiftsMessage-text'>${new_wedding_discount_content}</span>
                        </div>`:''}
                    `
                    
                    html += `
                    <div class="msg-linerow ${lineclass} ${is_right} userGetGiftsMessage-wrapper" data-message-id=${lineclassId}>
                        ${avatar}
                        <div class='userGetGiftsMessage-main'>
                            <div class='userGetGiftsMessage-giftsWrapper'>
                                <div class='userGetGiftsMessage-gifts'>
                                    <div class='userGetGiftsMessage-gifts-collapseWrapper'>
                                        ${shop_gift_tip ? `<div class='userGetGiftsMessage-gift'>
                                        <span class='userGetGiftsMessage-label'>${shop_gift_tip}</span>
                                        <span class='userGetGiftsMessage-text'>${shop_gift}</span>
                                        </div>` : giftHtml}
                                    </div>
                                </div>
                                <a class='userGetGiftsMessage-collapseBtn' style="display: none">展开</a>
                            </div>
                            <div class='userGetGiftsMessage-desc'>
                                请确认您的联系方式，作为使用优惠的凭证
                            </div>
                            <div class='userGetGiftsMessage-bottom'>
                            <div class='userGetGiftsMessage-phone'>
                                ${user_phone}
                            </div>
                            <div class=${is_appointment ? 'userGetGiftsMessage-confirmed' :'userGetGiftsMessage-unConfirm'} data-message-id=${lineclassId} data-phone=${user_phone}>
                                ${is_appointment ? '已领取' : '确认领取'}
                            </div>
                            </div>
                        </div>
                    </div>
                    `
                } else if (item[i].kind == 'text') {
                    html += '<div class="msg-linerow ' + lineclass + ' ' + is_right + '"data-message-id = '+lineclassId+'>';
                    html += avatar;
                    html += '<p class="ng-binding">' + emojiFilter(item[i].content) + '</p>'
                    html += '<p class="ng-date" style="color: #aaa;">' + item[i].created_at + '</p>';
                    // html += '<i class="icon"></i>'
                } else if (item[i].kind == 'image') {
                    html += '<div class="msg-linerow ' + lineclass + ' ' + is_right + '"data-message-id = '+lineclassId+'>';
                    // html += '<i class="icon"></i>'
                    html += avatar;
                    html += '<h3 class="ng-binding" style="padding-bottom: 0;"><a href="#" class="show_img"><img class="msgPic" src="' + item[i].content.path.replace('%7c', '|') + '"></a></h3>';
                    html += '<p class="ng-date" style="color: #aaa;">' + item[i].created_at + '</p>';
                    // html += '<i class="icon"></i>'
                } else if (item[i].kind == 'gallery') {
                    html += '<div class="msg-linerow ' + lineclass + ' ' + is_right + '"data-message-id = '+lineclassId+'>';
                    html += avatar;
    
                    var galleryId = item[i].content.card.gallery.id;
                    var imgs = item[i].content.card.gallery.imgs
                    imgs = imgs.length > 3 ? imgs.slice(0, 3) : imgs
                    html += `
                    <div class="ng-binding">
                        <div class="pic-lab-msgbox">
                            <a class="pic-lab-msgbox-inner"
                                href=${ galleryId ? ("/p/wedding/Public/wap/m/gallery-detail/index.html?id=" + galleryId + "&msg=1") : '' }
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                <img src=${imgs[0].image_path} class="img" height="55" width="55" />
                                <img src=${imgs[1].image_path} class="img" height="55" width="55" />
                                <img src=${imgs[2].image_path} class="img" height="55" width="55" />
                                <span class="text">你好，我想了解图片中的同款方案</span>
                                <span class="detail"><span>详情</span><span class="arrow"></span></span>
                            </a>
                        </div>
                    </div>`
                    html += '<p class="ng-date" style="color: #aaa;">' + item[i].created_at + '</p>';
                    // html += '<i class="icon"></i>'
                } else if (item[i].kind == 'location') {
                    html += '<div class="msg-linerow ' + lineclass + ' ' + is_right + '"data-message-id = '+lineclassId+'>';
                    html += avatar;
                    html += `<h3 class="ng-binding"> 
                                <a href="https://apis.map.qq.com/uri/v1/marker?marker=coord:`+ item[i].content.location.latitude + item[i].content.location.longitude + `;title:地图信息;addr:` + item[i].content.location.address + `&referer=hunliji" class="show_img">
                                    <img class="msgPic" src="http://apis.map.qq.com/ws/staticmap/v2/?center=`+ item[i].content.location.latitude + `,` + item[i].content.location.longitude + `&zoom=12&size=250*156&maptype=roadmap&markers=size:large|color:0xFFCCFF|label:k|` + item[i].content.location.latitude + `,` + item[i].content.location.longitude + `&key=QLPBZ-3O6R4-GJDUO-DITBG-UHR7K-E6B2G" class="show_img">
                                </a>
                            </h3>`;
                    html += '<p class="ng-date" style="color: #aaa;">' + item[i].created_at + '</p>';
                    // html += '<i class="icon"></i>'
                } else if (item[i].kind == 'hints') {
                    html += '<div class="msg-linerow msg-hints ' + lineclass + ' ' + is_right + '"data-message-id = '+lineclassId+'>';
                    html += avatar;
                    html += '<p class="ng-binding ng-tips">' + item[i].content.hints.title + '</p>'
                    if (item[i].content.hints.detail) {
                        item[i].content.hints.detail.forEach(element => {
                            html += '<p class="ng-binding ng-tips intelligent-reply" style="color: #13acec;margin-top: 5px;">' + element + '</p>'
                        });
                    }
                    // html += '<p class="ng-binding ng-tips">' + item[i].content.hints.detail + '</p>'
                    html += '<p class="ng-date" style="color: #aaa;margin-top: 20px;">' + item[i].created_at + '</p>'
                    // html += '<i class="icon"></i>'
                } else if (item[i].kind == 'opu') {
                    html += '<div class="msg-linerow ' + lineclass + ' ' + is_right + '"data-message-id = '+lineclassId+'>';
                    html += avatar;
                    var urlkey = item[i].content.actual_price ? 'package' : 'example';
                    html += '<a target="_blank" href="/' + urlkey + '/detail_' + item[i].content.id + '">';
                    html += '<h3 class="ng-binding product-detail">' + '<img class="msgPic" src="' + (item[i].content.cover_path || '').replace('%7c', '|') + '"/><br>';
                    html += '<span class="msgtitle">' + item[i].content.title + '</span><br>';
                    if (item[i].content.actual_price)
                        html += '<span class="msgPrice"> <i>￥</i>' + item[i].content.actual_price + '</span></h3>';
                    html += '</a>';
                    html += '<p class="ng-date" style="color: #aaa;">' + item[i].created_at + '</p>';
                    // html += '<i class="icon"></i>'
                } else if (item[i].kind == 'product') {
                    html += '<div class="msg-linerow ' + lineclass + ' ' + is_right + '"data-message-id = '+lineclassId+'>';
                    html += avatar;
                    html += '<a target="_blank" href="  /hunpin/detail_' + item[i].content.id + '">';
                    html += '<h3 class="ng-binding">' + '<img class="msgPic" src="' + item[i].content.cover_path + '"/><br>';
                    html += '<span class="msgtitle"">' + item[i].content.title + '</span><br>'
                    if (item[i].content.actual_price)
                        html += '<span  class="msgPrice"> <i>￥</i>' + item[i].content.actual_price + '</span></h3>';
                    html += '</a>';
                    html += '<p class="ng-date" style="color: #aaa;">' + item[i].created_at + '</p>';
                    // html += '<i class="icon"></i>'
                } else if (item[i].kind == 'dress_style') {
                  // 新增款式类型
                  html += '<div class="msg-linerow ' + lineclass + ' ' + is_right + '"data-message-id = '+lineclassId+'>';
                  html += avatar;
                  html += '<a target="_blank" href="/p/wedding/Public/wap/m/wedding-dress-details/index.html#/index?id=' + item[i].content.id + '">';
                  html += '<h3 class="ng-binding product-detail">' + '<img class="stylePic" src="' + (item[i].content.coverPhoto.mediaPath || '').replace('%7c', '|') + '"/><br>';
                  html += '<span class="msgtitle">' + item[i].content.title + '</span></h3>';
                  html += '</a>';
                  html += '<p class="ng-date" style="color: #aaa;">' + item[i].created_at + '</p>';
                } else {
                    html += '<div class="msg-linerow ' + lineclass + ' ' + is_right + '"data-message-id = '+lineclassId+'>';
                    html += avatar;
                    html += '<p class="ng-binding">' + '该消息暂时不支持网页上浏览，请通过下载app查看' + '</p>'
                    html += '<p class="ng-date" style="color: #aaa;">' + item[i].created_at + '</p>';
                }

                html += '</div>'
                html += '</li>'
            }
        }
        if (first && page == 1) {
            $('.msg-mod').html(moreHtml + html);
            first = false
        } else if (page && page !== 1) {
            $('.msg-line-first').after(html);
        } else if(+$('.msg-user').find(".chat-on p").attr('data-channel') == channel_id){
            $('.msg-mod').append(html);
        }
        
        if($('.mallindex_chat').attr('style') == 'display: block;'){
            message_id = $('.msg-mod').find('.msg-linerow:last').attr("data-message-id")
            weddingChat.sendRead(channel_id,message_id)
        }
        if( page == 1 )weddingChat.scrollToBottom()

        // 设置获取礼物消息的折叠状态
        weddingChat.setUserGetGiftsMessageCollapse(lineclassId)
    },
    setUserGetGiftsMessageCollapse: function(){
        var userGetGiftsMessageGiftsWrappers = Array.prototype.slice.call($(`.userGetGiftsMessage-giftsWrapper`))

        // console.log('test', $(`.userGetGiftsMessage-giftsWrapper`).find('.userGetGiftsMessage-gifts'))
        userGetGiftsMessageGiftsWrappers.forEach(wrapper => {
            var gifts = $(wrapper).find('.userGetGiftsMessage-gifts')
            var giftsHeight = gifts.height()
            if (giftsHeight > 91) {
                $(wrapper).find('.userGetGiftsMessage-collapseBtn').show()
                gifts.height('91px')
            }else{
                gifts.height('auto')
                $(wrapper).find('.userGetGiftsMessage-collapseBtn').hide()
            }
        });
    },
    // 确认领取礼物
    userComfirmGetGifts: function (message_id, phone_num, onSuccess) {
        var params = {
            from_type: 53,
            from_id: message_id,
            phone_num,
            merchant_id: $('.chat-on>p').attr('data-touser')
        }
        $.ajax({
            url: '/p/wedding/index.php/home/APIMerchant/MakeAppointment',
            type: 'POST',
            headers: { appname: 'web' },
            xhrFields: {
                withCredentials: true
            },
            data: params,
            success: function (result) {
                if(result.status.RetCode == 0) {
                    onSuccess()
                }
            }
        });
    },
    uploadImg: function (_pickBtn, _pickBox, max) {
        var progressbar = $(".progress"),
            progressLabel = $(".all-msg");
        Qiniu.uploader({
            runtimes: 'html5,flash,html4',
            browse_button: _pickBtn,
            container: _pickBox,
            drop_element: 'container',
            max_file_size: max,
            flash_swf_url: 'Moxie.swf',
            dragdrop: true,
            unique_names: true,
            multi_selection: false,
            filters: {
                mime_types: [
                    { title: "Image files", extensions: "jpg,gif,png,jpeg,bmp" }
                ]
            },
            chunk_size: '4mb',
            uptoken_url: '/p/wedding/home/APIUtils/image_upload_token',
            domain: 'http://qnm.hunliji.com/',
            auto_start: true,
            init: {
                'FilesAdded': function (up, files) {

                },
                'BeforeUpload': function (up, file) {
                    progressLabel.text('正在上传图片');
                    progressbar.show();
                    progressbar.find('.progress-bar').css('width', 0);
                },
                'UploadProgress': function (up, file) {
                    progressbar.find('.progress-bar').css('width', file.percent + '%');
                },
                'UploadComplete': function () {
                    progressLabel.text('发送图片成功！');
                },
                'FileUploaded': function (up, file, info) {
                    progressbar.hide();
                    var domain = up.getOption('domain');
                    var res = jQuery.parseJSON(info);
                    var img = new Object();
                    img.path = domain + res.image_path;
                    img.width = res.width;
                    img.height = res.height;
                    var msgData = {
                        src: img.path,
                        info: {
                            height: img.height,
                            width: img.width
                        }
                    }
                    weddingChat.sendMessage('image', msgData)
                    weddingChat.scrollToBottom()
                },
                'Error': function (up, err, errTip) {

                }
            }
        });
    },
    getMsgData: function (channel, params) {
        var { kind, msgData } = params

        var data = null

        switch (kind) {
            case 'text': {
                data = weddingChat.getCommonMsgData({
                    content: msgData,
                    channel,
                    kind
                })
                break
            }

            case 'hints': {
                data = weddingChat.getCommonMsgData({
                    content: msgData,
                    channel,
                    kind: 'text',
                    source: 6
                })
                break
            }

            case 'image': {
                var { src, info } = msgData

                data = weddingChat.getCommonMsgData({
                    content: {
                        path: src,
                        height: info.height,
                        width: info.width
                    },
                    channel,
                    kind
                })
                break
            }

            case 'location': {
                var { address, latitude, longitude } = getSessionMerchantInfo()

                data = weddingChat.getCommonMsgData({
                    content: {
                        location: { address, latitude, longitude }
                    },
                    channel,
                    kind
                })
                break
            }

            case 'opu': {
                var { id, title, actual_price, cover_path } = msgData
                var base = {
                    id: parseInt(id),
                    title,
                    cover_path
                }

                var content = actual_price
                    ? {
                        actual_price,
                        base
                    }
                    : base

                data = weddingChat.getCommonMsgData({
                    content,
                    channel,
                    kind
                })
                break
            }

            case 'product': {
                var {
              id,
                    title,
                    cover_image: { width, height, img },
                    show_price
            } = msgData

                var content = {
                    id: parseInt(id),
                    title,
                    cover_path: img,
                    cover_width: width,
                    cover_height: height,
                    actual_price: show_price
                }

                data = weddingChat.getCommonMsgData({
                    content,
                    channel,
                    kind
                })
                break
            }
        }

        return data
    },
    getReadMsgData: function (channel, message) {
        return {
            id: String(new Date().getTime()),
            payload: {
                channel,
                message
            },
            service: 'css',
            subject: 'msg.read'
        }
    },
    getCommonMsgData: function (payload) {
        return {
            id: String(new Date().getTime()),
            service: 'css',
            subject: 'msg',
            payload
        }
    },
    scrollToBottom: function () {
        var scrollHeight = $('.msg-mod')[0].scrollHeight
        $('.msg-wrap').scrollTop(scrollHeight + 999999999999999)
    },
    /**
     * 获取默认联系方式(用于交换信息请求)，并填入输入框
     * @param {Number} id 消息id
     * @param {Number} type 1微信 2电话
     */
    getDefaultExchangeInfo: function (id, type) {
        $.ajax({
            url: api.defaultExchangeInfo,
            type: 'GET',
            headers: {
                'content-type': "application/json; charset=utf-8",
                appname: 'web' 
            },
            xhrFields: {
                withCredentials: true
            },
            success: function (result) {
                var input = $(`.exchangeContact-input[data-id=${id}]`)
                if(input){
                    var contact = type === 1 ? result.data.wechat : result.data.phone
                    input.val(contact)
                    input.attr({'data-default': contact})
                }
            }
        });
    },


    /**
    * 确认/拒绝交换联系方式点击事件
    * @param {Number} id 消息id
    * @param {Number} status  状态（1已同意 2已拒绝）
    * @param {String} contact 微信/手机号
    * @param {Number} type 1微信号 2手机号
    */
    exchangeMsg: function (id, status, contact, type) {
        var $errDom = $(`.exchangeContact[data-id=${id}] .exchangeContact-error`)
        if ( status === 1 && !$.trim(contact)){
            var typeText = type === 1 ? '微信号' : '手机号'
            $errDom.text(`请输入${typeText}`)
            return
        }

        var input = $(`.exchangeContact-input[data-id=${id}]`)
        var defaultVlue = input.attr('data-default')
        var data = {}
        if( type === 1 ) {
            data.wechat = contact
        }else if( type === 2) {
            data.phone = contact
        }

        if(defaultVlue != contact){  // 检测联系方式是否改变，若改变需调用修改接口
            weddingChat.changeDefaultContactInfo(id, status, contact, type)
        }else{
            weddingChat.exchangeMsgRes(id, status, contact)
        }

    },

    /**
    * 修改默认联系方式(用于交换信息请求)
    * 确认交换信息请求时，先检测联系方式是否改变，若改变需调用修改接口
    * @param {Number} id 消息id
    * @param {Number} status  状态（1已同意 2已拒绝）
    * @param {String} contact 微信/手机号
    * @param {Number} type 1微信号 2手机号
    */
    changeDefaultContactInfo: function (id, status, contact, type) {
        var data = {}
        if( type === 1 ) {
            data.wechat = contact
        }else if( type === 2) {
            data.phone = contact
        }
        $.ajax({
            url: api.changeDefaultExchangeInfo,
            type: 'POST',
            data: data,
            success: function (res) {
                if(res.data){
                    weddingChat.exchangeMsgRes(id, status, contact)
                }else{
                    $(`.exchangeContact[data-id=${id}] .exchangeContact-error`).text(res.status.msg)
                }
            }
        });
        
    },

    /**
     * 确认/拒绝交换联系方式请求
     * @param {Number} id 消息id
     * @param {Number} status  状态（1已同意 2已拒绝）
     * @param {String} contact 微信/手机号
     */
    exchangeMsgRes: function (id, status, contact) {
        var param = JSON.stringify({ status, contact })
        $.ajax({
            url: api.exchangeMsgRes(id),
            type: 'PUT',
            headers: {
                'content-type': "application/json; charset=utf-8",
                appname: 'web' 
            },
            xhrFields: {
                withCredentials: true
            },
            data: param,
            success: function (result) {
                if(result.data){
                    $(`.exchangeContact[data-id=${id}] .exchangeContact-buttons span`).addClass('exchangeContact-disabled')
                }
            },
        });
    },
    action: function () {
        actionAdded = true
        var that = this, content = ''
        $('#msg-reply .msg-txt').on('keydown', function (e) {
            if(e.keyCode == 13 && e.ctrlKey){
                this.value += "\n"
            }else if(e.keyCode == 13){
                e.preventDefault()
                content = $('.msg-txt').val()
                if (content) {
                    that.sendMessage('text', content)
                    $('.msg-txt').val('')
                    $('.msg-user').prepend($('.msg-user').find('.chat-on'))
                } else {
                    $(".all-msg").show().text('不能发送空白消息')
                    setTimeout(function () {
                        $(".all-msg").hide().text('')
                    }, 2000)
                }
            }
        })
        $('#msg-reply .btn').click(() => {
            content = $('.msg-txt').val()
            if (content) {
                that.sendMessage('text', content)
                $('.msg-txt').val('')
                $('.msg-user').prepend($('.msg-user').find('.chat-on'))
            } else {
                $(".all-msg").show().text('不能发送空白消息')
                setTimeout(function () {
                    $(".all-msg").hide().text('')
                }, 2000)
            }
        })
        $('#msg-reply .msg-txt ').focus(function () {
            $('.emoji-box').hide();
        });
        $('#emoji-btn').click(function () {
            $('.emoji-box').toggle();
        });
        $('.emoji-box li').click(function () {
            $('.msg-txt').val($('.msg-txt').val() + '[' + $(this).data('val') + ']');
            $('.emoji-box').hide();
        });
        weddingChat.uploadImg('pic-btn', 'msg-reply', '10mb');
        $('.msg-user').on('click', '.user-item', function () {
            currentMsgPage = 1
            var id = ''
            first = true
            if (!$(this).hasClass('chat-on')) {
                $(this).addClass('chat-on')
                    .siblings().removeClass('chat-on')
                channel_id = $(this).find('p').attr('data-channel')
                id = $(this).find('p').attr('data-touser')
                $(this).find('.unread-icon').addClass('hidden')
                // weddingChat.getMessagesList(channel_id);
                weddingChat.getToUserInfo(id)
                // weddingChat.getChannel()
            }
        })

        // 事件每次初始化时被多次绑定
        $('.msg-user').off('click', '.close-chat-icon').on('click', '.close-chat-icon', function (event) {
            event.stopPropagation();
            var parent = $(this).parents('.user-item')
            other_user_id = parent.find('p').attr('data-channel')
            if (parent.hasClass('chat-on')) {
                if (parent.index() == 0) {
                    $('.user-item').eq(1).addClass('chat-on')
                    channel_id = $('.user-item').eq(1).find('p').attr('data-channel')
                } else {
                    $('.user-item').eq(0).addClass('chat-on')
                    channel_id = $('.user-item').eq(0).find('p').attr('data-channel')
                }
                if (channel_id) {
                    first = false
                    weddingChat.getMessagesList(channel_id);
                } else {
                    $('.msg-mod').html('')
                }
            }
            weddingChat.delChannel(other_user_id, parent)
            // parent.remove()
        })
        $('.chat_mask').click(function () {
            document.body.style.overflow='initial'
            $('.mallindex_chat').hide()
        })

        $('.msg-tit .close').click(function () {
            document.body.style.overflow='initial'
            $('.mallindex_chat').hide()
        })

        $('.user-more').click(function () {
            $('.user-more').hide()
            $('.msg-user').removeClass('less-more').addClass('show-more')
        })

        $('.msg-mod').on('click', '.msg-voice .msg-tip-voice', function (event) {
            event.stopPropagation();
            var that = $(this), data_id = '', data_path = '', data_duration = '';
            data_id = that.attr('data-id')
            data_path = that.attr('data-path')
            data_duration = that.attr('data-duration')
            voice_init();
            play_phone_voice(data_id, data_path, data_duration)
        })
        $('.msg-mod').on('click', '.show_img', function (event) {
            event.stopPropagation();
            var that = $(this), src = ''
            src = that.find('img').attr('src')
            $('.chat_img img').attr('src', src)
            $('.chat_img').show()
        })
        $('.chat_img').click(function () {
            $('.chat_img').hide()
        })
        $('.msg-mod').on('click', '.msg-more', function () {
            if($('.msg-more .ng-binding').text() === '查看更多历史消息')
                weddingChat.getMessagesList(channel_id, ++currentMsgPage)
        })
        $('.msg-mod').off('click', '.intelligent-reply').on('click', '.intelligent-reply', function (event) {
            event.stopPropagation();
            var that = this, content = ''
            content = $(this).text()
            weddingChat.sendMessage('hints', content)
        })
        $('.msg-mod').on('input', '.visitor_phone', function () {
            var val = $(this).val().replace(/[^\d]/g,'').substring(0,11)
            $(this).val(val)
            var warn = $('.msg-mod .visitor_phone_warn')[0]
            warn && (warn.innerHTML = '&nbsp;')
        })
        
        $('.msg-mod').on('click', '.call_back', function () {
            var that = this, author = ''
            author = $('.msg-user-detail').find('.shop-info-content').attr('data-channel')
            weddingChat.callBack(author, this)
        })
        // 发送预置短语
        $('.presetMsgs__list').on('click', '.presetMsgs__list__item', function () {
            var text = $(this).attr('data-content')
            weddingChat.sendMessage('text', text)
        })
        // 监听交换联系方式输入框删除错误信息
        $('.content').on('input', '.exchangeContact-input', function () {
            $(this).parent().siblings('.exchangeContact-error').text('')
        })
        // 确认/拒绝交换联系方式
        $('.content').on('click', '.exchangeContact-buttons span', function () {
            if(!$(this).hasClass("exchangeContact-disabled")){
                var input = $(this).parent().parent().find('.exchangeContact-input')
                var contact_type = Number(input.attr('data-type'))  // 交换类型（1微信 2电话）
                var contact = input.val()
                var id = input.attr('data-id')
                var exchangeStatus = Number($(this).attr('data-replyStatus'))
                weddingChat.exchangeMsg(id, exchangeStatus, contact, contact_type)
            }
        })
        // 交换联系方式一键复制
        $('.content').on('click', '.exchangeContactResult-copy', function () {
            var contactArea = $(this).siblings('textarea')[0]
            contactArea.select()
            document.execCommand("copy")
        })
        // 展开/收起预置短语
        $('.presetMsgs__header__right').on('click', function () {
            var $this = $(this)
            var presetMsgsMain = $this.parents('.presetMsgs-main')
            presetMsgsMain.toggleClass('presetMsgs-wrapper-close')
            if(presetMsgsMain.hasClass('presetMsgs-wrapper-close')){
                $this.find('span').text('展开')
                $this.find('img').attr({'src': '//qnm.hunliji.com/o_1dp07ff1r1r81131s19lnh79g8uj.png'})
            }else{
                $this.find('span').text('收起')
                $this.find('img').attr({'src': '//qnm.hunliji.com/o_1dp07dbgt13fi11p98ua8kgcnie.png'})
            }
        })
        
        // 领取优惠的展开/收起事件
        $('.content').on('click', '.userGetGiftsMessage-collapseBtn', function () {
            var gifts = $(this).siblings('.userGetGiftsMessage-gifts')
            if(gifts.height() > 91){
                gifts.height('91px')
                $(this).text('展开')
            }else {
                gifts.height('auto')
                $(this).text('收起')
            }
        })

        $('.content').on('click', '.userGetGiftsMessage-unConfirm', function () {
            var This = $(this)
            if (This.hasClass('userGetGiftsMessage-unConfirm')) {
                var message_id = This.attr('data-message-id')
                var phone_num = This.attr('data-phone')
                weddingChat.userComfirmGetGifts(message_id, phone_num, function () {
                    This.addClass('userGetGiftsMessage-confirmed')
                    This.removeClass('userGetGiftsMessage-unConfirm')
                    This.html('已领取')
                })
            }
        })
        
    }

};


function emojiFilter(str) {
    if (typeof (str) != 'undefined') {
        $.map(t, function (s, f) {
            if (str.indexOf(f)) {
                str = str.replace(new RegExp('\\[' + f + '\]', "g"), '<img src="https://www.hunliji.com/assets/backend/emoji/' + s + '@2x.png" class="emoji-img">')

            }
        });
        return str;
    }
    return str;
}
function timeFilter(str) {
    if (str) {
        str = str.replace('T', ' ').replace('Z', '');
        var curDate = new Date();
        var d = str.split(' ');
        var da = d[0].split('-');
        var db = d[1].split(':');
        curDate.setFullYear(da[0], da[1] - 1, da[2]);
        curDate.setHours(db[0], db[1], db[2]);
        curDate.setHours(curDate.getHours() + 8);
        return getNowFormatDate(curDate);
    }
}

var voice_is_init = false, voice_id, voice_flag, voice_source;
function voice_init() {
    if (!voice_is_init)
        RongIMLib.RongIMVoice.init();
    voice_is_init = true;
}
function play_phone_voice(id, url, t) {
    if (voice_id == id) {
        if (voice_flag == 'play') {
            voice_flag = '';
            RongIMLib.RongIMVoice.stop();
        } else {
            voice_flag = 'play';
            RongIMLib.RongIMVoice.stop();
            RongIMLib.RongIMVoice.play(voice_source, t, function () {
                voice_flag = '';
            });
        }
    } else {
        $.ajax({
            url: '/p/wedding/Public/chat/encode.php',
            type: 'POST',
            data: 'url=' + url,
            success: function (res) {
                voice_id = id;
                voice_flag = 'play';
                voice_source = res;
                RongIMLib.RongIMVoice.stop();
                RongIMLib.RongIMVoice.play(res, t, function () {
                    voice_flag = '';
                });
            }
        });
    }
}
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}