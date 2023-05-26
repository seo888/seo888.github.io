app.factory("geetest",function($http){
    var obj = {}; 
    obj.callback = false;  
    // 初始化 
    obj.init = function(){
       try {
            $http.get('/index/Geetest/getverfiy?t='+new Date().getTime()).then(function(data){
                var data = data.data;
                initGeetest({
                    gt: data.gt,
                    challenge: data.challenge,
                    new_captcha: data.new_captcha,
                    product: "bind", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
                    offline: !data.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
                    // 更多配置参数请参见：http://www.geetest.com/install/sections/idx-client-sdk.html#config
                }, function(captchaObj){
                    captchaObj.onSuccess(function () {
                        var result = captchaObj.getValidate();
                        if(obj.callback && typeof obj.callback == 'function'){
                            obj.callback(result);
                            // captchaObj.reset()
                        }
                    });
                    // 触发验证
                    obj.start = function(){
                        captchaObj.verify();
                    }
                });
            });
       } catch (error) {
           throw TypeError('缺少initGeetest 文件')
       }
       
    }
    obj.start = function(){
        modal_time('验证码加载中。。。',1000);
    }

 
    return obj;
})