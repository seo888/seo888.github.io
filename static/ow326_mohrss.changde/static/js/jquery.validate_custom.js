/**
 * 此文件的头部注释
 */

/*global jQuery: false */

(function ($) {

    //覆盖掉系统的date验证
    $.validator.methods.date = function () {
        return true;
    };

    //添加验证码远程验证
    $.validator.addMethod('captcha',
        function (value, ele, param) {
            var result = false;
            if (event.type != 'keyup') {
                $.ajaxPreventCSRF({
                    url: param['url'],
                    type: 'post',
                    async: false,
                    data: { captcha: value },
                    success: function (data) {
                        result = data;
                    }
                });
            }
            return result;
        });
    $.validator.unobtrusive.adapters.add('captcha',
        ['url'],
        function (options) {
            options.rules['captcha'] = {
                url: options.params.url
            };
            options.messages['captcha'] = options.message;
        });

    //添加自定义validator的日期时间格式客户端验证
    $.validator.addMethod('datetime',
        function (value, element) {
            var pattern =
                /^(?:(?!0000)[0-9]{4}(\/|-|\.|\u5e74)(?:(?:0?[1-9]|1[0-2])(\/|-|\.|\u6708)(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])(\/|-|\.|\u6708)(?:29|30)|(?:0?[13578]|1[02])(\/|-|\.|\u6708)31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)(\/|-|\.|\u5e74)0?2(\/|-|\.|\u6708)29)(\u65e5)?(\s((0?[0-9])|1[0-9]|2[0-3])\:([0-5]?[0-9])(\:([0-5]?[0-9]))?)?$/;
            return this.optional(element) || pattern.test(value);
        });
    $.validator.unobtrusive.adapters.addBool('datetime');

    //添加自定义validator的日期格式客户端验证
    $.validator.addMethod('localdate',
        function (value, element) {
            var pattern =
                /^(?:(?!0000)[0-9]{4}(\/|-|\.|\u5e74)(?:(?:0?[1-9]|1[0-2])(\/|-|\.|\u6708)(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])(\/|-|\.|\u6708)(?:29|30)|(?:0?[13578]|1[02])(\/|-|\.|\u6708)31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)(\/|-|\.|\u5e74)0?2(\/|-|\.|\u6708)29)(\u65e5)?$/;
            return this.optional(element) || pattern.test(value);
        });
    $.validator.unobtrusive.adapters.addBool('localdate');

    //添加自定义validator的日期范围客户端验证
    $.validator.addMethod('daterange',
        function (value, element, params) {
            var compareDate = function (startDate, endDate) {
                if (String(startDate).length == 0 || String(endDate).length == 0) {
                    return false;
                }

                var reg = new RegExp("\\-", "gi"),
                    start = new Date(startDate.replace(reg, "/")),
                    end = new Date(endDate.replace(reg, "/"));

                return end - start >= 0;
            };

            return this.optional(element) ||
                (compareDate(params.minvalue, value) && compareDate(value, params.maxvalue));
        });

    //添加自定义unobtrusive的日期范围客户端验证
    $.validator.unobtrusive.adapters.add('daterange',
        ['minvalue', 'maxvalue'],
        function (options) {
            options.rules['daterange'] = {
                minvalue: options.params.minvalue,
                maxvalue: options.params.maxvalue
            };
            options.messages['daterange'] = options.message;
        });

    //添加自定义比较客户端验证  
    $.validator.addMethod("comparewith",
        function (value, element, params) {
            var otherProperty = params.otherproperty;
            var operator = params.operator;
            var type = params.type;
            var ignorecase = params.ignorecase;
            var sourceValue = $("#" + otherProperty + "").val();
            switch (type) {
                case "Integer":
                    value = parseInt(value);
                    sourceValue = parseInt(sourceValue);
                    break;
                case "Double":
                    value = parseFloat(value);
                    sourceValue = parseFloat(sourceValue);
                    break;
                case "Date":
                    var reg = new RegExp("\\-", "gi");
                    value = new Date(value.replace(reg, "/"));
                    sourceValue = new Date(sourceValue.replace(reg, "/"));
                    break;
            }
            switch (operator) {
                case "Equal":
                    if (type === "String" && ignorecase === "True") {
                        return value.toLowerCase() === sourceValue.toLowerCase();
                    }
                    return value == sourceValue;
                case "NotEqual":
                    if (type === "String" && ignorecase === "True") {
                        return value.toLowerCase() !== sourceValue.toLowerCase();
                    }
                    return value != sourceValue;
                case "GreaterThan":
                    return value > sourceValue;
                case "GreaterThanEqual":
                    return value >= sourceValue;
                case "LessThan":
                    return value < sourceValue;
                case "LessThanEqual":
                    return value <= sourceValue;
            }
            return true;
        });

    //调用unobtrusive.adapters.add方法对自定义比较验证规则 comparewith 进行注册,并指定对应的验证参数名称列表。  
    $.validator.unobtrusive.adapters.add("comparewith",
        ["otherproperty", "otherpropertydisplayname", "operator", "type", "ignorecase"],
        function (options) {
            options.rules["comparewith"] = {
                otherproperty: options.params.otherproperty,
                otherpropertydisplayname: options.params.otherpropertydisplayname,
                operator: options.params.operator,
                type: options.params.type,
                ignorecase: options.params.ignorecase
            };
            options.messages["comparewith"] = options.message;
        });

    //对视频地址进行验证
    $.validator.addMethod('videourl',
        function (value, element) {
            var pattern =
                /^([a-z]|\d|\+|-|\.)+:\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
            return this.optional(element) || pattern.test(value);
        });
    $.validator.unobtrusive.adapters.addBool('videourl');

    //对图片地址进行验证
    $.validator.addMethod('imageurl',
        function (value, element) {
            var pattern = /^\S*(\.jpg|\.gif|\.png|\.bmp|\.jpeg)$/i;
            return this.optional(element) || pattern.test(value);
        });
    $.validator.unobtrusive.adapters.addBool('imageurl');

    //对邮箱进行验证
    $.validator.addMethod('email',
        function (value, element) {
            var pattern =
                /^((([a-zA-Z]|\d|[!#\$%&amp;'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&amp;'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/;
            return this.optional(element) || pattern.test(value);
        });

    //对IP进行验证
    $.validator.addMethod('ipaddress',
        function (value, element) {
            var pattern =
                /(^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$)/;
            return this.optional(element) || pattern.test(value);
        });
    $.validator.unobtrusive.adapters.addBool('ipaddress');

    //对电话进行验证
    $.validator.addMethod('telephone',
        function (value, element) {
            var pattern =
                /^((\d{11,12})|(\d{7,8})|(\d{3,4})(-|\s)(\d{7,8})|(\d{3,4})(-|\s)(\d{7,8})(-|\s)(\d{3,4}|\d{1,2})|(\d{7,8})(-|\s)(\d{1,4}))$/;
            return this.optional(element) || pattern.test(value);
        });
    $.validator.unobtrusive.adapters.addBool('telephone');

    //对身份证进行验证
    $.validator.addMethod('idcard',
        function (value, element) {
            var isValid = function (cardNo) {
                if (cardNo && 15 != cardNo.length && 18 != cardNo.length) {
                    return false;
                }

                var year,
                    month,
                    day,
                    sex,
                    birthday,
                    i,
                    area = [
                        11, 12, 13, 14, 15, 21, 22, 23, 31, 32, 33, 34, 35, 36, 37, 41, 42, 43, 44, 45, 46, 50, 51, 52,
                        53, 54, 61, 62, 63, 64, 65, 71, 81, 82, 91
                    ],
                    wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1], // 加权因子
                    last = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2], // 身份证验证位值.10代表X
                    sum = 0, // 声明加权求和变量
                    cardNoArray,
                    areaCode = cardNo.substring(0, 6),
                    check = /^[1-9]\d{5}$/.test(areaCode);

                if (!check || $.inArray(parseInt(cardNo.substring(0, 2)), area) == -1) {
                    return false;
                }

                if (15 == cardNo.length) {
                    year = cardNo.substring(6, 8);
                    month = cardNo.substring(8, 10);
                    day = cardNo.substring(10, 12);
                    sex = cardNo.substring(14, 15); // 性别位
                    birthday = new Date(year, parseFloat(month) - 1, parseFloat(day));

                    // 对于老身份证中的年龄则不需考虑千年虫问题而使用getYear()方法
                    if (birthday.getYear() != parseFloat(year) ||
                        birthday.getMonth() != parseFloat(month) - 1 ||
                        birthday.getDate() != parseFloat(day)) {
                        return false;
                    }
                } else if (18 == cardNo.length) {
                    year = cardNo.substring(6, 10);
                    month = cardNo.substring(10, 12);
                    day = cardNo.substring(12, 14);
                    sex = cardNo.substring(14, 17);
                    birthday = new Date(year, parseFloat(month) - 1, parseFloat(day));
                    // 这里用getFullYear()获取年份，避免千年虫问题
                    if (birthday.getFullYear() != parseFloat(year) ||
                        birthday.getMonth() != parseFloat(month) - 1 ||
                        birthday.getDate() != parseFloat(day)) {
                        return false;
                    }

                    cardNoArray = cardNo.split("");

                    if (cardNoArray[17].toLowerCase() == 'x') {
                        cardNoArray[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
                    }

                    for (i = 0; i < 17; i++) {
                        sum += wi[i] * cardNoArray[i]; // 加权求和
                    }

                    i = sum % 11; // 得到验证码所位置
                    if (cardNoArray[17] != last[i]) {
                        return false;
                    }
                }

                return true;
            };

            return this.optional(element) || isValid(value);
        });
    $.validator.unobtrusive.adapters.addBool('idcard');

    //对车牌号码进行验证
    $.validator.addMethod('licenseplatenumber',
        function (value, element) {
            var pattern =
                /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Za-z](([0-9]{5}[DFdf])|([DFdf]([A-Ha-hJ-Nj-nP-Zp-z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Za-z][A-Ha-hJ-Nj-nP-Zp-z0-9]{4}[A-Ha-hJ-Nj-nP-Zp-z0-9挂学警港澳使领]))$/i;
            return this.optional(element) || pattern.test(value);
        });
    $.validator.unobtrusive.adapters.addBool('licenseplatenumber');

    //添加自定义validator的对数据安全性进行验证
    $.validator.addMethod('dangerous',
        function (value, element) {
            var pattern = /^(?!(.|\n)*<[a-z!\/?])(?!(.|\n)*&#)(.|\n)*$/i;
            return this.optional(element) || pattern.test(value);
        });

    //添加自定义unobtrusive的对数据安全性进行验证
    $.validator.unobtrusive.adapters.add('dangerous',
        [],
        function (options) {
            if (options.message) {
                options.rules['dangerous'] = options.params;
                options.messages['dangerous'] = '不允许含有潜在危险的Html代码。';
            }
        });

    //添加强密码客户端验证
    $.validator.addMethod('strongpassword',
        function (value, element) {
            var error = '';
            var isValid = function (password) {
                var blankReg = /\s/;
                if (blankReg.test(password)) {
                    error = '密码不能包含空格';
                    $.validator.messages['strongpassword'] = error;
                    return false;
                }
                var digitReg = /[0-9]/;
                if (!digitReg.test(password)) {
                    error = '密码必须包含数字';
                    $.validator.messages['strongpassword'] = error;
                    return false;
                }
                var lowCharReg = /[a-z]/;
                if (!lowCharReg.test(password)) {
                    error = '密码必须包含小写字母';
                    $.validator.messages['strongpassword'] = error;
                    return false;
                }
                var upperCharReg = /[A-Z]/;
                if (!upperCharReg.test(password)) {
                    error = '密码必须包含大写字母';
                    $.validator.messages['strongpassword'] = error;
                    return false;
                }

                return true;
            };

            return this.optional(element) || isValid(value);
        });

    $.validator.unobtrusive.adapters.add('strongpassword',
        [],
        function (options) {
            if (options.message) {
                options.rules['strongpassword'] = options.params;
            }
        });

    //全局验证之前Trim进行处理，然后再进行验证  //UNCODE 为什么要去掉前后空格再验证？ 用户名不允许前后空格那么正则就验证不了因为这个地方去掉了
    //$.each($.validator.methods,
    //    function (key, value) {
    //        $.validator.methods[key] = function () {
    //            if (arguments.length > 0) {
    //                arguments[0] = $.trim(arguments[0]);
    //            }
    //            return value.apply(this, arguments);
    //        };
    //    });
}(jQuery));