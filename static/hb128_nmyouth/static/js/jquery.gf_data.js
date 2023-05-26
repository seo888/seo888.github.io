
jQuery.fn.getCondition = function (prefix, name, data) {
    var flag = false;
    if (name == undefined) {
        name = "id"
    }
    if (prefix == undefined) {
        prefix = 'model';
    }
    if (data == undefined) {
        data = {};
    } else {
        var len = prefix.length + 3;
        for (var id in data) {
            if (id.substring(0, len) == prefix + "[1]") {
                flag = true;
                break;
            }
        }
    }
    jQuery(this).each(function () {
        var val;
        try {
            val = jQuery(this).val();
        } catch (e) {
            val = jQuery(this).attr("value");
        }
        var val1 = "";
        var id = jQuery(this).attr(name);
        switch (jQuery(this).attr("querymode")) {
            case 'region':
                var input = jQuery(this).nextAll("[name=" + id + "]");
                var val1 = input.val();
            case 'array':
                var vals = val.split(',');
                val = vals[0];
                if (vals.length > 1) {
                    val1 = vals[1];
                }
                break;
            default:
        }


        if (val != "") {
            data[prefix + "[0]." + id] = val;
            switch (jQuery(this).attr("querymode")) {
                case 'array':
                case "region":
                    if (val1 != "") {
                        data[prefix + "[1]." + id] = val1;
                    } else if (!flag) {
                        data[prefix + "[1]." + id] = null;
                    }
                    flag = true;
                    break;
                case "like":
                    data[prefix + "[1]." + id] = "%";
                    flag = true;
                    break;
                case "value":
                default: data[prefix + "[1]." + id] = val;
                    break;
            }
        }
        else if (val1 != "") {
            data[prefix + "[0]." + id] = null;
            data[prefix + "[1]." + id] = val1;
            flag = true;
        }
        else {
            data[prefix + "[0]." + id] = null;
            data[prefix + "[1]." + id] = null;
        }
    });
    if (flag) {
        for (var id in data) {
            var second = id.replace('[0]', '[1]');
            if (data[second] == undefined) {
                data[second] = data[id];
            }
        }
    }

    return data;
}
/*
表单校验
在需要校验的元素上加属性如<input valid="{required:true, length:[1,5], match:'/^1[3|5|8][0-9]\d{4,8}jQuery/'}"/>
*/
jQuery.fn.checkValid = function (tip) {
    var input = undefined;
    var msg = "";
    var idCard = function (num) {
        var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
        var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
        var varArray = new Array();
        var intValue;
        var lngProduct = 0;
        var intCheckDigit;
        var intStrLen = num.length;
        var idNumber = num;
        // initialize
        if ((intStrLen != 15) && (intStrLen != 18)) {
            return false;
        }
        // check and set value
        for (i = 0; i < intStrLen; i++) {
            varArray[i] = idNumber.charAt(i);
            if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
                return false;
            } else if (i < 17) {
                varArray[i] = varArray[i] * factorArr[i];
            }
        }

        if (intStrLen == 18) {
            //check date
            var date8 = idNumber.substring(6, 14);
            if (isDate8(date8) == false) {
                return false;
            }
            // calculate the sum of the products
            for (i = 0; i < 17; i++) {
                lngProduct = lngProduct + varArray[i];
            }
            // calculate the check digit
            intCheckDigit = parityBit[lngProduct % 11];
            // check last digit
            if (varArray[17] != intCheckDigit) {
                return false;
            }
        }
        else {        //length is 15
            //check date
            var date6 = idNumber.substring(6, 12);
            if (isDate6(date6) == false) {
                return false;
            }
        }
        return true;
    }
    var opt = {

        required: {
            validator: function (value, defaultvalue, param) {
                return (value != "" && value != "（必填）");
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
                return /^[0-9]\d{5}$/.test(value);
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
                return /(^(13|14|17|15|18)\d{9}$)/.test(value);
            },
            message: '手机号码不正确'
        },
        mobileisnull: {
            validator: function (value, param) {
                if (value != "") {
                    return /(^(13|14|15|17|18)\d{9}$)/.test(value);
                }
                return true;
            },
            message: '手机号码不正确'
        },
        mobileTel: {
            validator: function (value, param) {
                return /^((0\d{2,3}\d{7,8})|(1[3584]\d{9})|([48]00\d{7}))$/.test(value);
            },
            message: '手机/固话格式不正确'
        },
        mobileTelisnull: {
            validator: function (value, param) {
                if (value != "") {
                    return /^((0\d{2,3}\d{7,8})|(1[3584]\d{9})|([48]00\d{7}))$/.test(value);
                }
                return true;

            },
            message: '手机/固话格式不正确'
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
        pricess: {
            validator: function (value, param) {
                return /^\d+$/.test(value);
            },
            message: '请输入数字'
        },
        number: {
            validator: function (value, param) {
                return /^\d+$/.test(value);
            },
            message: '请输入数字'
        },
        idcard: {
            validator: function (value, param) {
                return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
            },
            message: '请输入正确的身份证号码'
        },
        match: {
            validator: function (value, param) {
                var reg = new RegExp(param);
                return reg.test(value);
            },
            message: '请输入正确的{0}'
        },
        select: {
            validator: function (value, param) {
                return (value != '');
            },
            message: "请选择{0}!"
        }
    };

    jQuery(this).each(function () {
        input = jQuery(this);
        var valid = jQuery(this).attr("valid");
        var editor = jQuery(this).attr("editor");
        if (editor == undefined) {
            try {
                if (valid != undefined) {
                    valid = eval("(" + valid + ")");
                } else {
                    return true;
                }
                var getvalue = input.attr("getvalue");
                var value = "";
                try {
                    if (getvalue == undefined) {
                        getvalue = "val()";
                    }
                    value = eval("input." + getvalue);
                } catch (e) {
                }
                for (var func in valid) {
                    if (!opt[func].validator(value, valid[func], this.defaultValue)) {
                        msg = opt[func].message;
                        break;
                    }
                }
            } catch (e) {

            }
        }
        else {
            if (editor == "ueditor") {
                var Content = "";
                Content = UE.getEditor(jQuery(this).attr("id")).getContentTxt().replace(/\s+/g, "");
                if (NowWrite != undefined) {
                    var reg = new RegExp(NowWrite);
                    var key = reg.exec(Content);
                    if (key != null) {
                        msg = "您输入的内容中包括 [<span style='color:red'>" + key + "</span>]等敏感字! 请进行筛选后添加";
                    }
                }
            }
            if (editor == "combotree") {

                var messagetemp = input.attr("placeholder");
                if (input.combotree("getValue") == undefined || input.combotree("getValue") == "") {
                    msg = messagetemp;
                }
            }
        }
        if (msg != "") {
            var curr;
            var name = "";
            if (input.attr("_placeholder") != undefined) {
                name = input.attr("_placeholder").replace("请输入", "");
            }
            else if (input.attr("message") != undefined) {
                name = input.attr("message").replace("请输入", "");
            } else if (input.attr("placeholder") != undefined) {
                name = input.attr("placeholder").replace("请输入", "");
            }
            msg = msg.replace("{0}", name).replace("：", "");
            if (tip != undefined) {
                tip.html(msg);
                setTimeout(function ()
                { input.focus(); }, 5000);

            } else {
                try {
                    $.messager.alert("警告", msg, "warning");
                } catch (e) {
                    jAlert(msg);
                }

                input.focus();
            }


            return false;
        }
    });
    if (msg != "") {
        return false;
    } else {
        return true;
    }
}

jQuery.fn.getChanged = function (prefix, data) {



}
function ChangeDateFormat(time) {
    if (time != null) {
        var date = new Date(parseInt(time.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var Hours=date.getHours();
        var Minutes = date.getMinutes();
        var Seconds = date.getSeconds();
        return date.getFullYear() + "-" + month + "-" + currentDate +" "+ Hours + ":" + Minutes ;
    }
    return "";
}

function ChangeDateFormatyy(time) {
    if (time != null) {
        var date = new Date(parseInt(time.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var Hours = date.getHours();
        var Minutes = date.getMinutes();
        var Seconds = date.getSeconds();
        return date.getFullYear() + "." + month + "." + currentDate ;
    }
    return "";
}


//提取数据，服务器参数格式
jQuery.fn.loadData = function (option) {
    if (option.data == undefined) {
        data = {};
    } else {
        data = option.data;
    }
    if (option.name == undefined) {
        option["name"] = "id";
    }
    var names = [];
    jQuery(this).each(function () {
        var input = jQuery(this);
        var id = input.attr(option.name);
        if (id == undefined) {
            return true;
        }
        var idx = id;
        if (option.prefix != undefined) {
            idx = option.prefix + "." + id
        }
        var value = "";
        var editor = input.attr("editor");
        switch (editor) {
            case 'ueditor': var ue = UE.getEditor(input.attr("id")); data[idx] = ue.getContent(); break;
            case 'combotree':
                if (input.attr("getvalue") != undefined) {
                    var oi = input.combotree(input.attr("getvalue"));
                    switch (input.attr("getvalue")) {
                        case "getValues":
                            data[idx] = "";
                            var king = "";
                            for (var ko = 0; ko < oi.length; ko++) {
                                king += oi[ko]+","
                            };
                            data[idx] = king.substring(0,king.length-1);
                            break;
                        default: data[idx] = oi; break;
                    }
                }
                else
                    data[idx] = input.combotree("getValue");
                break;
            case 'datetimebox': data[idx] = input.datetimebox('getValue'); break;
            case 'datebox': data[idx] = input.datebox('getValue'); break;
            case 'combobox': data[idx] = input.combobox('getValue'); break;
            default:
                if (input.is(":radio")) {
                    if (input.prop("checked")) {
                      
                    } else {
                        return true;
                    }
                }
                if (input.is(":checkbox")) {
                    if (input.attr("checked")) {
                    } else {
                        data[idx] = false;
                        return true;
                    }
                }
                var getvalue = input.attr("getvalue");

                try {
                    if (getvalue == undefined) {
                        getvalue = "val()";
                    }

                    value = eval("input." + getvalue);
                } catch (e) {
                    return true;
                }
                if (value == "") {
                    names.push(id);
                }
                data[idx] = value;
                break;
        }
       
    });
    if (option.required) {
        for (var i = 0; i < names.length; i++) {
            data["required[" + i + "]"] = names[i];
        }
    }
    return data;
}
//提取数据，对象格式
jQuery.fn.loadObject = function (name, data) {
    if (data == undefined) {
        data = {};
    }
    jQuery(this).each(function () {
        var input = jQuery(this);
        var id = input.attr(name);
        if (id == undefined) {
            return true;
        }
        var value = "";
        var editor = input.attr("editor");
        switch (editor) {
            case 'checkboxlist':
                data[id] = [];
                input.find(":checkbox:checked").each(function () {
                    var name = jQuery(this).attr("name");
                    var item = {};
                    item[name] = jQuery(this).val();
                    data[id].push(item);
                });
                break;
            default:
                var getvalue = input.attr("getvalue");
                try {
                    if (getvalue == undefined) {
                        getvalue = "val";
                    }
                    value = eval("input." + getvalue + "()");
                } catch (e) {
                }
                break;
        }
        if (id.indexOf('.') == 0) {
            data[id] = value;
        } else {
            var names = id.split('.');
            var len = names.length - 1;
            var detail = data;
            for (var i = 0; i < len; i++) {
                if (detail[names[i]] == undefined) {
                    detail[names[i]] = {};
                }
                detail = detail[names[i]];
            }
            detail[names[len]] = value;
        }
    });
    return data;
}


jQuery.fn.getEasyRows = function (option) {
    var opt = {
        prefix: '',
        data: {}
        //key:undefined
    };
    if (option != undefined) {
        jQuery.extend(true, opt, option);
    }
    var prefix = opt.prefix;
    var key = opt.key;
    var data = opt.data;
    var ret = {};
    switch (jQuery.type(data)) {
        case 'array':
            for (var i = 0; i < data.length; i++) {
                jQuery.extend(true, ret, jQuery.fn.getEasyRows({ data: data[i], prefix: prefix + '[' + i + ']', key: key }));
            }
            break;
        case 'object':
            if (key == undefined) {
                for (var id in data) {
                    jQuery.extend(true, ret, jQuery.fn.getEasyRows({ data: data[id], prefix: (prefix == '' ? '' : prefix + '.') + id }));
                }
            } else if (data[key] != undefined) {
                ret[prefix] = data[key];
            }
            break;
        case 'boolean':
            if (prefix != '') {
                ret[prefix] = data + '';
            }
            break;
        case "string":
            if (data.indexOf("/Date(") == 0) {
                if (jQuery.type(eval(data))) {
                    if (prefix != '') {
                        ret[prefix] = eval('new ' + eval(data).source).format('yyyy-MM-dd hh:mm:ss');;
                    }
                    break;
                }
            }
            if (prefix != '') {
                ret[prefix] = data;
            }
            break;
        default:
            if (prefix != '') {
                ret[prefix] = data;
            }
            break;
    }
    return ret;
}


jQuery.fn.bindData = function (data, option) {
   
    if (option == undefined) {
        option = {};
    }
    if (option.field == undefined) {
        option["field"] = "field";
    }
    jQuery(this).each(function () {
        //
        var fields;
        if (jQuery(this).attr(option.field) != null) {
            fields = jQuery(this).add(jQuery(this).find("[" + option.field + "]"));
        } else {
            fields = jQuery(this).find("[" + option.field + "]");
        }
        
        for (var i = fields.length - 1; i >= 0; i--) {
            var input = jQuery(fields[i]);

            var field = input.attr(option.field);
            var value = "";
            var column = {};
            if (field != undefined) {
                column["field"] = field;
            }
            column["target"] = this;
            try {
                value = eval("data." + field);
            } catch (e) {
            }
            try {
                var formatter = input.attr("formatter");
                if (formatter != undefined) {
                    column.formatter = eval(formatter);
                    value = column.formatter(value, data, 0);
                    
                }
                if (input.attr("editor")) {
                    switch (input.attr("editor"))
                    {
                        case "ueditor": SetContent(input, value, data); break;
                        case "imagefile": SetImageFile(input, value, data); break;
                        case "file": SetImageFile(input, value, data); break;                            
                        case "datetimebox":
                            input.val(ChangeDateFormat(value)); break;
                        case 'datebox': input.datebox("setValue",value); break;
                        case "combotree": input.combotree('setValue', value); break;
                        case "combobox": input.combobox('setValue', value); break;
                    }
                }
                else {
                    switch (true) {
                        case input.is("select"):
                            var opt = input.find("option[value='" + value + "']");
                            if (opt.length == 0) {
                                input.append("<option value='" + value + "' selected>" + value + "</option>");
                            } else {
                                opt.attr("selected", true);
                            }; break;
                        case input.is(":radio"):
                        case input.is(":checkbox"):
                            if (input.val() == value + "") {
                                input.prop('checked', true);
                            } else {
                                input.prop('checked', false);
                            };
                            break;
                        case input.is("textarea"): input.val(value); break;
                        case input.is("input"): input.val(value); break;
                        default: input.html(value); break;
                    }
                }
               
            } catch (e) {
               alert(e.message);
                input.html(value);
            }
        }
    });
}
///设置编辑器的内容
var SetContent = function (input, value, data) {
    if (value) {
        var ue = UE.getEditor(input.attr("id"));
        ue.ready(function () {
            ue.setContent(value);
        })
    }
}
//设置图片上传的内容
var SetImageFile = function (input, value, data)
{

    if (value) {
        value = value.split(',');
        var jsonList = '<script type="text/uploader-files"> [';
        for (var i = 0; i < value.length; i++) {
            if (i == 0) {
                jsonList += '{ "name":"' + value[i] + '","url": "' + value[i] + '" }';
            }
            else {
                jsonList += ',{  "name":"' + value[i] + '","url": "' + value[i] + '" }';
            }

        }
        jsonList += ']<\/script>';
        ///万恶的JsonList
        input.next("ul").append(jsonList);
    }
}