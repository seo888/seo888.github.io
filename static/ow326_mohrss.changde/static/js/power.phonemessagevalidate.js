$(function () {
    var interval = 60; // 间隔函数，1秒执行
    var curInterval; // 当前剩余秒数
    var timerObj; // timer变量，控制时间

    var requiredTips = '短信验证 字段是必需的。';
    var emptyPhoneNumberTips = '请填写手机号码。';

    var data = $('[data-type=phonemessagevalidate]');
    var requestUrl, codeElement, basisElement, tips;
    var codeIntervalTime = data.attr('data-val-codeIntervalTime');
    if (codeIntervalTime == '' || codeIntervalTime == null || codeIntervalTime == undefined) {
        codeIntervalTime = '60';
    }

    InitCodeIntervalTime();

    $.each(data, function (i, v) {
        var getCodeBtn = $(v).children('input[type=button]');
        var element = $(v).attr('data-val-codeelement');
        var phoneMessageValidateCode = $('#' + element);
        if (phoneMessageValidateCode.length > 0) {
            phoneMessageValidateCode.rules('add', { required: true, messages: { required: requiredTips } });
        }

        getCodeBtn.unbind().click(function () {
            getCode(getCodeBtn);
        });
    });

    function getCode(_this) {
        setInfo(_this);
        var userName = $("#UserName").val();
        var phoneNumber = $('#' + basisElement).val().trim();
        tipsClassHandler();
        if (phoneNumber === '') {
            tips.html(getTipsHtml(false, emptyPhoneNumberTips));
            return;
        }

        $.ajaxPreventCSRF({
            type: 'post',
            dataType: 'json',
            url: requestUrl,
            data: { 'phoneNumber': phoneNumber, 'userName': userName },
            success: function (result) {
                if (result.IsSuccess) {
                    interval = result.SurplusSecond;
                    curInterval = interval;
                    setCodeBtn();
                    tips.html(getTipsHtml(true, result.Tips));
                } else {
                    if (result.SurplusSecond > 0) {
                        curInterval = result.SurplusSecond;
                        setCodeBtn();
                    }

                    tips.html(getTipsHtml(false, result.Tips));
                }
                window.timerObj = timerObj;
            }
        });
    }

    // timer处理函数
    function setRemainTime() {
        if (curInterval === 0) {
            window.clearInterval(timerObj); // 停止计时器
            $.each(data, function (i, v) {
                var getCodeBtn = $(v).children('input[type=button]');
                getCodeBtn.removeAttr('disabled').val('重发验证码'); // 启用按钮
            });

        } else {
            curInterval--;
            $.each(data, function (i, v) {
                var getCodeBtn = $(v).children('input[type=button]');
                getCodeBtn.val(curInterval + 's');
            });
        }
    }

    function getTipsHtml(isSuccess, tipsText) {
        if (isSuccess) {
            return '<span style="color:green">' + tipsText + '</span>';
        }

        return '<span style="color:red">' + tipsText + '</span>';
    }

    function tipsClassHandler() {
        tips.removeClass('field-validation-valid');
        tips.addClass('field-validation-error');
    }

    function InitCodeIntervalTime() {
        var cookie = GetCookies();
        var cookieTime = cookie["Power::ValidateCode::IntervalTime"];
        var nowTime = parseInt(new Date().getTime() / 1000);
        var intervalTime = parseInt(codeIntervalTime);
        if (intervalTime < 0 || intervalTime == 0) {
            intervalTime = 60;
        }

        if (nowTime - parseInt(cookieTime) < intervalTime) {
            if (nowTime - parseInt(cookieTime) < 0) {
                curInterval = 60;
            } else {
                curInterval = intervalTime - (nowTime - parseInt(cookieTime));
            }

            setCodeBtn();
        }
    }

    function GetCookies() {
        var cookieStr = document.cookie;
        var cookie = {};
        if (cookieStr != '') {
            var cookieStrs = cookieStr.split(';');
            $.each(cookieStrs, function (i, v) {
                var item = v.split('=');
                cookie[item[0].replace(/(^\s*)|(\s*$)/g, "")] = item[1].replace(/(^\s*)|(\s*$)/g, "");
            });
        }

        return cookie;
    }

    function setInfo(_this) {
        var info = _this.parents('[data-type=phonemessagevalidate]');
        requestUrl = info.attr('data-val-requesturl');
        codeElement = info.attr('data-val-codeelement');
        basisElement = info.attr('data-val-basiselement');
        tips = info.next('[data-valmsg-for=' + codeElement + ']');
    }

    function setCodeBtn() {
        // 设置按钮显示效果，倒计时
        $.each(data, function (i, v) {
            var getCodeBtn = $(v).children('input[type=button]');
            getCodeBtn.attr('disabled', 'true');
        });

        timerObj = window.setInterval(setRemainTime, 1000); // 启动计时器，1秒执行一次
    }
});