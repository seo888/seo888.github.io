
//获取浏览器URL的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURIComponent(r[2]);
    return ""; //返回参数值
}

//验证身份证号码的js方法
function checkIdCard(idcard) {
    var numberRegular = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    return numberRegular.test(idcard);
}

//验证邮箱的js方法
function checkEmail(email) {
    var emailRegular = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegular.test(email);
}

//验证手机号码
function checkMobile(mobile) {
    var mobileRegular = /^1[0-9][0-9]\d{8}$/;
    return mobileRegular.test(mobile);
}

function SetHome(obj,vrl){
    try{
        obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
    }
    catch(e){
        if(window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }
            catch (e) {
                alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage',vrl);
        }else{
            alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入："+vrl+"点击确定。");
        }
    }
}
// 加入收藏 兼容360和IE6
function shoucang(sTitle,sURL)
{
    try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
function jGetUrlData() {
    var _paramsStr = location.search, _obj = {};

    if(_paramsStr.indexOf('?') != -1) {
        var _strs = _paramsStr.substr(1).split('&');

        for(var i = 0; i < _strs.length; i++) {
            _obj[_strs[i].split('=')[0]] = _strs[i].split('=')[1];
        }
    }

    return _obj;
}

function date_format(date) {
    if(date){
        var _date = date.split(" ");
        return _date[0];
    } else {
        return;
    }
}

function behavior(contentId) {
    if(tycom.config && tycom.config.close_user_collect){
        return false;
    }
    if(contentId){
        var data = {
            action: "open_story", //打开文章
            data_id: contentId, //todo 文章id
            net_type: 0, //网络类型 0未知
        };
        tycom.api.collect.submit(data,function(res,err){
            if(err){
                console.log(err);
            }
        });

    }
}