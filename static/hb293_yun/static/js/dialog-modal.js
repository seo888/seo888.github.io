// artDialog 信息提示框
(function () {
    var MessageModal = function () {

        var timer = null;
        var dom = $(  '<div class="artdialog artdialog-message" id="modal-message">'
            + '<p class="message-icon">'
            + '<span class="icon-box"></span>'
            + '<span class="message-txt"></span>'
            + '</p>'
            + '<button class="artdialog-close artdialog-close-message">×</button>'
            + '</div>');


        var messageDialog = dialog({
            'padding' : 0,
            'content' : dom
        });

        // 设置内容
        function setContent (style, message) {
            dom.find('span.icon-box').attr('class', 'icon-box ' + style);
            dom.find('span.message-txt').html(message);

            messageDialog.showModal();
            timer = setTimeout(function () {
                messageDialog.close();
            }, 2000);

            return messageDialog;
        }

        dom.find('.artdialog-close-message').off('click');
        dom.find('.artdialog-close-message').on('click', function () {
            clearTimeout(timer);
            messageDialog.close();
        });

        return {
            "success" : function (message, funcName) {
                setContent('success', message).addEventListener('close', function () {
                    funcName && funcName();
                });
            },
            "alert" : function (message, funcName) {
                setContent('alerts', message).addEventListener('close', function () {
                    funcName && funcName();
                });
            },
            "error" : function (message, funcName) {
                setContent('error', message).addEventListener('close', function () {
                    funcName && funcName();
                });
            }
        }
    };

    window['Modal'] = new MessageModal();
})();
