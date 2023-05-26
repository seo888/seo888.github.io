/* 集成之前的代码 */
var GPage = new PageLoad();
var HOST_URL = 'http://' + document.domain + '/';
var ContentTag = 'jieqi_contents';//内容块
// alert('welcome to txsm.com_main.js')
//头部加载
function loadheader(){
    if(getUserId()>0)
    {
        try{
            var gurl = urlParams(HOST_URL+"login/logined", 'ajax_request=1');
            if(gurl.indexOf("ajax_gets")=='-1') gurl = urlParams(gurl, 'ajax_gets='+ContentTag);
            //gurl = urlParams(gurl, 'date='+Math.random());
            GPage.getJson(gurl,function(data){
                $("#login_box").html(data);
            });
        }catch(error){
        }
    }
}

function getUserId(){
    var jieqiUserInfo = get_cookie_value("jieqiUserInfo");
    var jieqiUserId = 0;
    if(jieqiUserInfo!="")
    {
        try{
            start = 0;
            offset = jieqiUserInfo.indexOf(',', start);

            while(offset > 0){
                tmpval = jieqiUserInfo.substring(start, offset);
                tmpidx = tmpval.indexOf('=');
                if(tmpidx > 0){
                    tmpname = tmpval.substring(0, tmpidx);
                    tmpval = tmpval.substring(tmpidx+1, tmpval.length);
                    if(tmpname == 'jieqiUserId'){
                        jieqiUserId = tmpval;
                        break;
                    }
                }
                start = offset+1;
                if(offset < jieqiUserInfo.length){
                    offset = jieqiUserInfo.indexOf(',', start);
                    if(offset == -1) offset =  jieqiUserInfo.length;
                }else{
                    offset = -1;
                }
            }
        }catch(error){

        }
    }
    return jieqiUserId;
}

function get_cookie_value(Name) {
    var returnvalue = "";
    var strCookie=document.cookie;
    //将多cookie切割为多个名/值对
    var arrCookie=strCookie.split("; ");
    var userId;
    //遍历cookie数组，处理每个cookie对
    for(var i=0;i<arrCookie.length;i++){
        var arr=arrCookie[i].split("=");
        //找到名称为userId的cookie，并返回它的值
        if(arr[0] === Name){
            returnvalue=unescape(arr[1]);
            break;
        }
    }
    return returnvalue;
}

function huodong(url,id,target){
    if(getUserId()<1){
        userLogin(id);
    }else{
        GPage.loadpage(target,url);
    }
}
function huodong3g(url,id,target){
    if(getUserId()<1){
        location.href = _login;
    }else{
        GPage.loadpage(target,url);
    }
}


// function otherlogin(url){
//     var pagei = layer.open({
//         type:2,
//         shade : [0.6 , '#000' , true],
//         border : [10 , 0.3 , '#000', true],
//         area: ['920px', '510px'],
//         title: false,
//         closeBtn: [0,true],
//         iframe:{src: url}
//     });
// }


function PageLoad() {
    this.MyMethod = null;//AJAX处理URL回调函数的中转容器

    this.getJson = function(url, myFun)
    {
        $.ajax({
            type : "GET",
            url : urlParams(url,'ajax_request=1&date='+Math.random()),
            dataType : "jsonp",
            jsonp: 'CALLBACK',
            success : function(json){
                if(isExitsFunction(myFun)) myFun(json);
                else{
                    this.MyMethod = myFun;
                    if(this.MyMethod!=null){
                        this.MyMethod(json);
                    }
                }
            }
        });
    }

    this.postData = function(url, _data, myFun)
    {
        $.ajax({
            type : "POST",
            url : urlParams(url,'ajax_request=1&date'+Math.random()),
            data: _data,
            dataType : "jsonp",
            jsonp: 'CALLBACK',
            success : function(json){
                if(isExitsFunction(myFun)) myFun(json);
                else{
                    this.MyMethod = myFun;
                    if(this.MyMethod!=null){
                        this.MyMethod(json);
                    }
                }
            },
            error: function(XMLHttpRequest,textStatus,errorThrown){
                console.log(XMLHttpRequest)
                console.log(textStatus)
            }
        });
    }

    this.postForm = function(form, url, myFun)
    {
        $.ajax({
            type : "POST",
            url : urlParams(url,'ajax_request=1&date'+Math.random()),
            data: $('#'+form).serialize(),
            dataType : "jsonp",
            jsonp: 'CALLBACK',
            success : function(json){
                if(isExitsFunction(myFun)) myFun(json);
                else{
                    this.MyMethod = myFun;
                    if(this.MyMethod!=null){
                        this.MyMethod(json);
                    }
                }
            },
            error: function(XMLHttpRequest,textStatus,errorThrown){
                console.log(XMLHttpRequest.status);
                console.log(XMLHttpRequest.readyState);
                console.log(textStatus);
            }
        });
    }

    this.buychapter = function(url)
    {
        GPage.getJson(url,
            function(data){
                if(data.status=='OK'){
                    /*layer.open({
                     content: data.msg,
                     style: 'border:none; background-color:#fff; color:black;',
                     time: 2
                     }); */
                    GPage.loadpage('text_content', vurl, true);
                }else{
                    layer.open({
                        content: data.msg,
                        btn: ['CLOSE'],
                        time:5
                    });
                }
            }
        );
    }


    this.addbook = function(url, id, obj)
    {
        if(getUserId()<1){
            location.href = _login;
        }else{
            GPage.getJson(url,function(data){
                if(data.status=='OK'){
                    if (id == "vip") {
                        loadheader('vip');
                        layer.open({
                            content: data.msg
                            ,skin: 'msg'
                            ,time: 1.5 //1.5秒后自动关闭
                        })
                    }else{
                        if (id=='display_type'){
                            loadheader();
                            $('#add_gz').hide();
                            $('#cancel_gz').show();
                        }else if(id=='display'){
                            $('#cancel_gz').hide();
                            $('#add_gz').show();
                        }else if(id=='dianzan'){
                            var num = $(obj).text();
                            var iLen = num.length;
                            var num = parseInt(num.substring(1,iLen-1))+1;
                            $(obj).text('('+num+')');
                        }else{
                            layer.open({
                                content: data.msg,
                                style: 'border:none; background-color:black; color:#fff;',
                                time: 2
                            });
                        }
                    }

                }else{
                    layer.open({
                        content: data.msg,
                        style: 'border:none; background-color:black; color:#fff;',
                        time: 2
                    });
                }
            });
        }
    }

    this.loadpage = function(tag,url,date,showloading){
        var gurl = url;
        if(url.indexOf("ajax_gets")=='-1') gurl = urlParams(url,'ajax_gets='+ContentTag);
        //if(_hmt_cn)  gurl = urlParams(gurl,'_hmt_cn='+_hmt_cn);
        /*if("undefined" != typeof _hmt_cn){
         gurl = urlParams(gurl,'_hmt_cn='+_hmt_cn);
         }*/
        GPage.getJson(gurl,function(data){
            //$("#"+tag).html(data);
            $("#"+tag).html('');
            $("#"+tag).html(data);
            if($("#"+tag).html()==''){
                document.getElementById(tag).innerHTML=data;
            }
        });
    }
}

function urlParams(url, params){
    var vrul = url;
    if(url.indexOf("?")!='-1') {
        vrul = url+'&'+params;
    }else{
        vrul = url+'?'+params;
    }
    return vrul;

}

function jumpurl(url, count) {
    if(count <1 ) location.href=url;
    window.setTimeout(function(){
        count--;
        if(count > 0) {
            if($('#jumpnum')) $('#jumpnum').attr('innerHTML', count);
            jumpurl(url, count);
        } else {
            location.href=url;
        }
    }, 1000);
}
//是否存在指定函数
function isExitsFunction(funcName) {
    try {
        if (typeof(eval(funcName)) == "function") {
            return true;
        }
    } catch(e) {}
    return false;
}
//是否存在指定变量
function isExitsVariable(variableName) {
    try {
        if (typeof(variableName) == "undefined") {
            return false;
        } else {
            return true;
        }
    } catch(e) {}
    return false;
}

//移动版弹出层登录，注册等用
function openMsg(msg){
    layer.open({
        content: msg,
        style: 'border:none; background-color:black; color:#fff;',
        time: 2
    });
}

$(function(){

    // 原加入书签等功能

})

// 点赞月票等操作函数
var act = function(num,obj){
    $('ul[data-name=current'+num+']').find('li').removeClass("active");
    $(obj).addClass("active");
    $('#current'+num).val($(obj).attr("data-id"));
}

function continueRead(string, url)
{
    var htmls = '<div class="ui-poptips">';
    htmls += '<a href="'+url+'" class="ui-poptips-cnt">'+string+'</a>';
    htmls += '<div class="close-tip" data-act="close-tip"><img src="http://file1.txsm.com/wap_test/images/icon-close-tip.png"></div>';
    htmls += '</div>';

    $("body").append(htmls)

    setTimeout(function(){
        $('.ui-poptips').css("animation","tip-out 1.5s forwards")
    }, 4000)
}

function addBookCase(url, title, string, okBtn, cancel){
    var htmls = '<div class="ui-marktip">';
    htmls += '<p class="markcon">' + title + '</p>';
    htmls += '<a data-act="addbook" href="javascript:;" data-url="' + url + '" class="btn-tip"  data-msg="' + string + '">' + okBtn + '</a>';
    htmls += '<a href="javascript:void(0);" class="btn-tip cancle" data-name="tip_c">' + cancel + '</a>';
    htmls += '</div>';

    $("header").append(htmls);

    setTimeout(function(){
        $('.ui-marktip').css("display", "none")
    }, 4000)
}


/* 201611月版本代码 */
$(function(){
    $.fn.scrollTo = function (options) {
        var defaults = {
            toT: 0,    //滚动目标位置
            durTime: 500,  //过渡动画时间
            delay: 30,     //定时器时间
            callback: null   //回调函数
        };
        var opts = $.extend(defaults, options),
            timer = null,
            _this = this,
            curTop = _this.scrollTop(),//滚动条当前的位置
            subTop = opts.toT - curTop,    //滚动条目标位置和当前位置的差值
            index = 0,
            dur = Math.round(opts.durTime / opts.delay),
            smoothScroll = function (t) {
                index++;
                var per = Math.round(subTop / dur);
                if (index >= dur) {
                    _this.scrollTop(t);
                    window.clearInterval(timer);
                    if (opts.callback && typeof opts.callback == 'function') {
                        opts.callback();
                    }
                    return;
                } else {
                    _this.scrollTop(curTop + index * per);
                }
            };
        timer = window.setInterval(function () {
            smoothScroll(opts.toT);
        }, opts.delay);
        return _this;
    };
    $(window).scroll(function() {
        if($(window).scrollTop() >= 100){
            $('.go-top').show();
        }else{
            $('.go-top').hide();
        }
    });
    $('.go-top').on('click',function() {
        $("body").scrollTo({
            toT: 0,
            durTime:500
        });
    })

    $('.praise').on('tap click',function () {
        $(this).addClass('selected')
    })
    /*简介展开收缩*/
    $("[data-act=text_spread]").on('click',function(){
        $(this).parent().hide();
        $(this).parent().next().show();
    })
    $("[data-act=text_flod]").on('click',function(){
        $(this).parent().hide();
        $(this).parent().prev().show();
    })
    $('.code-box').click(function () {
        $('#imgCode').attr("src","http://www.txsm.com/checkcode.php?rand=" + Math.random());
    })

    $('[data-act=close-tip]').click(function (event) {
        event.stopPropagation();
        $('.ui-poptips').css("animation","tip-out 1.5s forwards")
    })

    $("[data-name=tip_c]").click(function (event) {
        event.stopPropagation()
        $(this).parent().css('display','none')
    })

    // *********
    // ** 领取币
    // *********
    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

    var qd = GetQueryString('qd');

    if(qd!=null && qd!=''){
        $.fn.cookie("go-shucong-qd",qd,{expires:1, path: '/'});
    }

    if(getUserId()>0 && $.fn.cookie("shucong_addwx_getegolding")>0 && ($.fn.cookie("shucong_addwx_getegold")==null || $.fn.cookie("shucong_addwx_getegold")<1)){
        GPage.getJson('/index.php?controller=huodong&method=addwx', function(data){
            if ("OK"===data.status) {
                layer.open({
                    content: data.msg,
                    time:4,
                    type: 0
                });
            }
        })
    }

    if(getUserId()>0 && $.fn.cookie("shucong_addwx2_getegolding")>0 && ($.fn.cookie("shucong_addwx2_getegold")==null || $.fn.cookie("shucong_addwx2_getegold")<1)){
        GPage.getJson('/index.php?controller=huodong&method=addwx2', function(data){
            if ("OK"===data.status) {
                layer.open({
                    content: data.msg,
                    time:4,
                    type: 0
                });
            }
        })
    }

    if(getUserId()>0 && ($.fn.cookie("baonian_enddays")!=null && $.fn.cookie("baonian_enddays")>0)){
        GPage.getJson('/index.php?controller=huodong&method=baonian', function(data){
            if ("OK"===data.status) {
                layer.open({
                    content: '<font color=000000>'+data.msg+'</font>',
                    time:60,
                    btn: ['考虑一下', '立即续费'],
                    yes: function(index, layero){
                        layer.close(index);
                    },no: function(index, layero){
                        location.href='/pay/';
                    }
                });
            }
        })
    }

    function shucongEgold(){
        var top_html='<p id="go-shucong-egold"><a href="#top"><span></span></a></p>';
        $("body").prepend(top_html);
        $("#go-shucong-egold").fadeIn(1500);
    }

    $("#go-shucong-egold").click(function(){
        if(getUserId()<1){
            location.href = '/login';
        }
        GPage.getJson('/index.php?controller=huodong&method=hongbao', function(data){
            if ("OK"===data.status) {
                $("#go-shucong-egold").fadeOut(2000);
                //$.fn.cookie("go-shucong-egold","1",{expires:1, path: '/'});
            }
            layer.open({
                content: '<font color=ffffff>'+data.msg+'</font>',
                time:6,
                type: 2
            });
        })
        return false;
    })
    // ************** 领取书城币结束
});

