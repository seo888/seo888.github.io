// JavaScript Document
$.fn.validForm = function () {

    var opt =
    {
        select1: { 
        	validator: function (value, param) {
            	return (value != 0);
        	},
            message: "请选择{0}!"
        },
        required: {
            validator: function (value,defaultvalue, param) {
                return (value != "" && value != defaultvalue);
            },
            message: "请输入{0}!"
        },


        length: {
            validator: function (value, param) {
                var len = value.replace(/[^\x00-\xff]/g, "aa").length;
                if (len < param[0])
                    return false;
                else if (len > param[1])
                    return false;
                else
                    return true;
            },
            message: "{0}长度不正确"
        },
        CHS: {
            validator: function (value, param) {
                return /^[\u0391-\uFFE5]+$/.test(value);
            },
            message: '请输入汉字'
        },
        Email: {
            validator: function (value, param) {
                return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
            },
            message: '邮箱格式不正确'
        },
        ZIP: {
            validator: function (value, param) {
                return /^[1-9]\d{5}$/.test(value);
            },
            message: '邮政编码不存在'
        },
        QQ: {
            validator: function (value, param) {
                return /^[1-9]\d{4,10}$/.test(value);
            },
            message: 'QQ号码不正确'
        },
        mobile: {
            validator: function (value, param) {
                return /(^(13|14|15|17|18)\d{9}$)/.test(value);
            },
            message: '手机号码格式不正确'
        },
        account: {
            validator: function (value, param) {
                return /^[\u0391-\uFFE5\w]+$/.test(value);
            },
            message: '登录名称只允许汉字、英文字母、数字及下划线。'
        },
        safepass: {
            validator: function (value, param) {
                return !(/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/.test(value));
            },
            message: '密码由字母和数字组成，至少6位'
        },
        equals: {
            validator: function (value, param) {
                return value == $(param).val();
            },
            message: '两次输入不匹配！'
        },
        number: {
            validator: function (value, param) {
                return /^\d+$/.test(value);
            },
            message: '请输入正确格式的{0}'
        },
        idcard: {
            validator: function (value, param) {
                return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
            },
            message: '请输入正确格式的身份证号'
        },
        match1: {
            validator: function (value, param) {
                var reg = new RegExp(param);
                return reg.test(value);
            },
            message: '请输入正确格式的{0}'
        }
    };

    var input = undefined;
    var tt = true;
    $(this).each(
				 function () {

				     input = $(this);
				     var strInput = input.attr("valid"); //获取文本框的valid属性，是一个字符串
				     var strInputObj = eval('(' + strInput + ')'); //将strInput字符串转化成json对象
				     var val = input.val();

				     for (var keys in strInputObj)//循环获取strInputObj对象的键，keys为这个json对象的键
				     {

				         if (!opt[keys].validator(val, this.defaultValue)) {
				             //var mes = opt[keys].message;
				             layer.tips(opt[keys].message.replace("{0}", input.attr("message")), input, {
                                 tips: 1
				             });
				             input.focus();
				             tt = false;
				             return false;
				         }

				     }

				 }
	);
    return tt;
}


$.fn.checkForm = function () {

    var opt =
    {
       
        required: {
            validator: function (value, defaultvalue, param) {
                return (value != "" && value != defaultvalue);
            },
            message: "请输入{0}!"
        },


       
        Email: {
            validator: function (value, param) {
                return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
            },
            message: '邮箱格式不正确'
        },
       
        mobile: {
            validator: function (value, param) {
                return /(^(13|14|15|18|17)\d{9}$)/.test(value);
            },
            message: '手机号码格式不正确'
        },
       
        number: {
            validator: function (value, param) {
                return /^\d+$/.test(value);
            },
            message: '请输入正确格式的{0}'
        },
        
        match1: {
            validator: function (value, param) {
                var reg = new RegExp(param);
                return reg.test(value);
            },
            message: '请输入正确格式的{0}'
        }
    };

    var input = undefined;
    var tt = true;
    $(this).each(
				 function () {

				     input = $(this);
				     var strInput = input.attr("yz"); //获取文本框的valid属性，是一个字符串
				     var strInputObj = eval('(' + strInput + ')'); //将strInput字符串转化成json对象
				     var val = input.val();

				     for (var keys in strInputObj)//循环获取strInputObj对象的键，keys为这个json对象的键
				     {

				         if (!opt[keys].validator(val, this.defaultValue)) {
				             //var mes = opt[keys].message;
				             layer.tips(opt[keys].message.replace("{0}", input.attr("message")), input, {
				                 time: 1,
				                 styly: ['background-color:#0365bb; color:#fff', '#0365bb'],
				                 maxWidth: 250

				             });
				             tt = false;
				             return false;
				         }

				     }

				 }
	);
    return tt;
}