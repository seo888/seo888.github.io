/**
 * Created by Administrator on 2018/3/20.
 */
$(function () {
    refreshImgCode();
    $(".code img").on("click",function () {
        refreshImgCode();
    })
});

//验证码
function refreshImgCode() {
    $("img[name='img_code']").attr("src",tycom.app_manager.captcha_url());
}
function collect_login(callback) {
    tycom.api.collect.submit({
        sourceType:1,
        platform:"web",
        action:"login",
        count:1
    },callback)
}

function qq_login() {
    QC.Login({
            btnId: "qqLoginBtn",//插入按钮的html标签id
            size: "B_M",//按钮尺寸
            scope: "get_user_info",//展示授权，全部可用授权可填 all
            display: "pc"//应用场景，可选
        }
        , function (reqData, opts) {
            QC.Login.getMe(function (openId, accessToken) {
                // alert(["当前登录用户的", "openId为：" + openId, "accessToken为：" + accessToken].join("\n"));
                var qqimg="";
                if (reqData.figureurl_qq_2){
                    qqimg=reqData.figureurl_qq_2;
                }else{
                    qqimg=reqData.figureurl_qq_1;
                }
                data = {
                    bindType: "qq",
                    bindValue: openId,
                    bindName:reqData.nickname,
                    img:qqimg,
                    autoRegister : "1"

                }

                QC.Login.signOut();
                // return  console.log(data);

                tycom.api.member.check_bind_other(data, function (res, err) {
                    if (err) {
                        return tycom.common.api_tools.alert_error(err);
                    }
                    console.log(res);

                    if (res == 0) {
                        // window.location.href="./bind_account.html";
                        window.location.href = tycom.url.bind_account(data);
                    } else {
                        collect_login(function (res, err) {
                            if(err){
                                return tycom.common.api_tools.alert_error(err)
                            }
                            window.location.href = tycom.url.home();
                        })

                    }
                })


            });
        }
        , function (opts) {

        });


}
function weixin_login() {
    var uri=tycom.url.redirect_uri();
    var state=Math.random().toString(36).substr(2);
    var weixin=tycom.url.weixin_login(uri,state);
    $(".am-icon-weixin").on("click",function () {
        window.open(weixin);
        var wx={
            state:state
        }
        var interval = setInterval(function() {
            // debugger;
            // alert("测试1");
            tycom.api.member.get_wechat_user_info(wx, function (res, err) {
                if(res){
                    // clearInterval(interval);
                    // alert("测试2");
                    // console.log(res.openid);
                    data = {
                        bindType: "weixin",
                        bindValue: res.openid,
                        bindName:res.nickname,
                        img:res.headimgurl,
                        autoRegister : "1"
                    }
                    tycom.api.member.check_bind_other(data,function (res,err) {
                        if(err){
                            return tycom.common.api_tools.alert_error(err);
                        }
                        if(res==0){
                            window.location.href=tycom.url.bind_account(data);
                        }else{
                            collect_login(function (res, err) {
                                if(err){
                                    return tycom.common.api_tools.alert_error(err)
                                }
                                window.location.href=tycom.url.home();
                            })

                        }
                    })
                    clearInterval(interval);
                }

            })
        },1000)
    })
}