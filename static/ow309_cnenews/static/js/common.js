/*Member_common表示会员公共js*/
/*验证码改变*/
function refreshAuthCode() {
    $("#img_click").attr("src", "/CommonHandles/Verification.aspx?" + Math.random());
}

/*ajax通用类*/
/*url=网址*/
/*parmer=提交参数*/
/*successCallBak=成功后返回函数*/
/*type=提交方式*//*dataType=返回类型*/
var AjaxHelper = function (url, parmer, successCallBak, errCallback, type, dataType) {
    if (!url)
        return;
    if (!type) type = "post";
    if (!dataType) dataType = "json";
    if (type.toLowerCase() == "get") parmer += "&" + Math.random();
    if (!errCallback) errCallback = function (XMLHttpRequest, textStatus, errorThrow) { };
    $.ajax({
        url: url,
        type: type,
        dataType: dataType,
        data: parmer,
        success: function (msg) {
            successCallBak(msg);
        },
        error: errCallback
    });
}
var UploadHelper = function (option) {
    var opt = {
        submitId: "",
        action: "",
        data: {},
        bgcallback: function () { return true; },
        onSubmit: function (file, ext) {
            if (!/^(jpg|bmp|png|gif)$/.test(ext)) {
                alert("只能上传格式为(bmp、jpg、png、gif)格式的图片！");
                return false;
            }
            return true;
        },
        onComplete: function (file, response) {

        }
    };
    if (!option) return;
    if ((typeof (eval(opt.bgcallback)) != "function")) opt.bgcallback = function () { return true; };
    option.onSubmit = !option.onSubmit || !(option.onSubmit instanceof Function) ? opt.onSubmit : option.onSubmit
    opt = $.extend(opt, option);
    if (!opt.submitId || !opt.action || !opt.onComplete) return;
    return new AjaxUpload(opt.submitId, {
        action: opt.action,
        data: opt.data,
        onSubmit: function (file, ext) {
            if (!opt.bgcallback())
                return false;
            if (!opt.onSubmit(file, ext)) {
                return false;
            }
            this.disable();
        },
        onComplete: function (file, response) {
            if (!response) alert("上传失败！");
            response = JSON.parse(response);
            if (response.Status != "1") {
                alert(response.ErrMsg);
                this.enable();
                return false;
            }
            opt.onComplete(file, response);
            this.enable();
        }
    });
};
/**
* 替换字符串中的字段.
* @param {String} str 模版字符串
* @param {Object} o json data
* @param {RegExp} [regexp] 匹配字符串的正则表达式
*/
function substitute(str, o, regexp) {
    return str.replace(regexp || /\\?\{([^{}]+)\}/g, function (match, name) {
        return (o[name] === undefined) ? '' : o[name];
    });
}
/**
* 替换模板的数据.
*/
function ReplaceTemplet(templet, json) {
    var html = "";
    if (!json || !templet) return html;
    if (!json.length) { json = [json] }
    for (var i = 0; i < json.length; i++) {
        html += substitute(templet, json[i]);
    }
    return html;
}
/**
* 判断from表单是否有更改
oldFormValue=更改之前的值
formId=表单id
*/
function FormChanged(obj, oldFormValue) {
    if (obj.length == 0) return false;
    var newFrmValue = obj.serializeArray();
    if (JSON.stringify(oldFormValue) == JSON.stringify(newFrmValue)) return false;
    return true
}
/**
* easyui的保存和取消事件
*/
function EasyUISave(obj, frm, txt, action, url, isLoad) {
    var str = "添加";
    if (!url) url = "?";
    if (!action) action = "Add";
    if (!isLoad && isLoad != false) isLoad = true;
    if (action && action.toLowerCase() == "edit") str = "修改";
    obj.dialog({
        title: txt,
        modal: true,
        bgiframe: true,
        buttons: [{
            text: "保存",
            handler: function () {
                var result = frm.form("validate");
                if (!result) {
                    $.messager.alert('提示', '验证不通过');
                    return false;
                }
                if (editor1) editor1.sync();
                var params = frm.serialize();
                AjaxHelper(url, "M=" + action + "&" + params, function (data) {
                    if (data.isSuccess) {
                        $.messager.alert('提示', str + '成功!', 'info', function () {
                            obj.dialog('close');
                            frm.form('clear');
                            if (target) { target.datagrid("reload") };
                        });
                    } else {
                        $.messager.alert('警告', str + '失败!' + data.Message, 'warn');
                    }
                }, function () { $.messager.alert('警告', str + '失败!', 'warn'); });
            }
        }, {
            text: "取消",
            handler: function () {
                obj.dialog("close");
            }
        }],
        maximizable: true
    });
}
/**
* 将from表单通过serializeArray获取的值，转换成json
json=[{name:"",value=""}]
*/
function FrmArrToJson(frmarr) {
    if (!frmarr || frmarr.length == 0) return [];
    var json = {};
    for (var i = 0; i < frmarr.length; i++) {
        json[frmarr[i].name] = frmarr[i].value;
    };
    return json;
}
/**
* 给form表单赋值
*/
function returnFrm(frmarr) {
    if (!frmarr || frmarr.length == 0) return;
    var json = FrmArrToJson(frmarr);
    for (var c in json) {
        $("#" + c).val(json[c]);
    }
}
/**
* 判断是不是json.
*/
var isJson = function (obj) {
    var isjson = typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}
///<summary>获得字符串实际长度，中文2，英文1</summary>
///<param name="str">要获得长度的字符串</param>
GetLength = function (str) {
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};
//登陆成功后回调
function LoginCallback() {
    if (IsLoginState == 'true') {
        $('#wtbnt').show(); $('#spLogin').remove();
        //$(".Unlike_shop").show(); $("#like_shop").hide();
    }
}
IsLoginState = "false";
//登陆后喜欢
function LoginLike(obj, e, type) {
    if (IsLoginState != "true") {
        $.showModal('/Templates/minilogin.html', {
            title: '会员登录', onclose: function () {
                if (IsLoginState == "true") {
                    $('#wtbnt').show(); $('#spLogin').remove();
                    ShopInfo._initWebControl.like(obj, e, type);
                }
            }
        });
        return false;
    }
    return IsLoginState == "true";
}


Date.prototype.format = function (format) {
    var o =
    {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}
function addCount(id) {
    if (!id) return;
    AjaxHelper("/addCount.aspx", "id=" + id);
}
