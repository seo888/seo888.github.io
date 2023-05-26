/**
 * CSRF
 */

/*global jQuery: false */

(function ($) {
    var __requestverificationtoken = '__requestverificationtoken';

    //$.post扩展方法（预防CSRF）
    $.postPreventCSRF = function (url, data, success, dataType) {
        data = addToken(data);

        return $.post(url, data, success, dataType);
    };

    //$.ajax扩展方法（预防CSRF）
    $.ajaxPreventCSRF = function (options) {
        options = options || {};
        options.type = 'post';
        options.data = addToken(options.data);

        return $.ajax(options);
    };

    pe = window.pe || {};
    pe.security = {};
    pe.security.Csrf = {
        getRequestVerificationToken: function () {
            var $requestverificationtoken = getToken();
            if (!$requestverificationtoken) {
                return '';
            }

            return __requestverificationtoken + '=' + $requestverificationtoken.val();
        },
        getRequestVerificationTokenValue: function () {
            var $requestverificationtoken = getToken();
            if (!$requestverificationtoken) {
                return '';
            } else {
                return $requestverificationtoken.val();
            }
        }
    };

    function addToken(data) {
        data = data || {};

        var $requestverificationtoken = getToken();
        if (!$requestverificationtoken) {
            return data;
        }

        // 兼容IE8
        if (!Array.isArray) {
            Array.isArray = function (arg) {
                return Object.prototype.toString.call(arg) === '[object Array]';
            };
        }

        if (Array.isArray(data)) {
            var isExistsToken = false;
            $.each(data,
                function (index, value) {
                    if (value['name'].toLowerCase() === __requestverificationtoken) {
                        isExistsToken = true;
                        return false;
                    }
                });

            if (isExistsToken) {
                return data;
            }

            data.push({ name: __requestverificationtoken, value: $requestverificationtoken.val() });
            return data;
        }
        var $tokenInput = $('input[name="__RequestVerificationToken"]');
        var defaultsData = {
            "__RequestVerificationToken": $tokenInput && $tokenInput.val()
        };

        if (typeof (data) === "string") {
            if (data.toLowerCase().indexOf(__requestverificationtoken) > -1) {
                return data;
            }

            data += '&' + __requestverificationtoken + '=' + $requestverificationtoken.val();
            return data;
        }

        if (typeof (data) === "object") {
            data = $.extend({}, { __requestverificationtoken: $requestverificationtoken.val() }, data);
            return data;
        }

        return data;
    }

    function getToken() {
        var $anti_forgery_token_container = $("[data-power-anti_forgery_token_input]");
        if ($anti_forgery_token_container.length) {
            var anti_forgery_token_input = $anti_forgery_token_container.data("power-anti_forgery_token_input");
            return $(anti_forgery_token_input);
        }

        var $requestverificationtoken = $('input[name="__RequestVerificationToken"]');
        if ($requestverificationtoken.length) {
            return $requestverificationtoken;
        }

        console.error("所需的防伪表单字段“__RequestVerificationToken”不存在！请确保表单中包含@Html.AntiForgeryToken()。");
        return null;
    }
})(jQuery);