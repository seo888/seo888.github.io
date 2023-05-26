
/*
 * 公共js
 * @Author: Rohan
 * @Date:   2017-07-06 17:06:33
 * @Last Modified by:   Rohan
 * @Last Modified time: 2021-08-30 15:52:56
 */

/**
 * 加载层
 */
function loadingTip(content) {
    //loading带文字
    layer.open({
        type: 2
        ,content: content
    });
}

/**
 * 不关闭跳转遮罩弹出层
 */
function layerNotOff(content,time,redirect) {
    layer.open({
        content: content,
        time: time,
        skin: 'msg',
        shadeClose: false,
        end: function(elem){
            if(redirect!=false) {
                window.location.href=redirect;
            }
        }
    });
}

/**
 * 不关闭跳转遮罩弹出层
 */
function layerNotOffBtn(content,btn_name,redirect) {
    layer.open({
        content: content,
        btn: btn_name,
        shadeClose: false,
        yes: function(){
            if(redirect!=false) {
                window.location.href=redirect;
            }
        }
    });
}

/**
 * 普通遮罩弹出层
 */
function normalLayer(content,time) {
	layer.open({
		content: content,
        skin: 'msg',
		//style: 'background-color:#F0F0F0; color:#e53f42; border:none;',
		time: time,
	});
}

/**
 * 不关闭跳转遮罩弹出层
 */
function normalTipNotOff(content,time,redirect) {
    layer.open({
        content: content,
        skin: 'msg',
        time: time,
        shadeClose: false,
        end: function(elem){
            if(redirect!=false) {
                window.location.href=redirect;
            }
        }
    });
}

/**
 * 普通tip弹出层
 */
function normalTip(content,time) {
	//提示
	layer.open({
		content: content
		,skin: 'msg'
		,time: time //x秒后自动关闭
	});
}

/**
 * 普通单按钮tip弹出层
 */
function normalTipBtn(content,btn) {
    //信息框
    layer.open({
        content: content
        ,btn: btn
    });
}

/**
 * h5底部带跳转对话框
 */
function bottomTipBtn(content,redirect) {
    //底部对话框
    layer.open({
        content: content
        ,btn: ['取消', '确定']
        ,skin: 'footer'
        ,no: function(index){
            if(redirect!=false) {
                window.location.href=redirect;
            }
        }
    });
}

/**
 * login
 * 检查手机号
 */
function checkPhone(phone) {
	if(phone==''){
		normalTip('请填写手机号！',3);
        return false;
	}
	if (! /^(1)[0-9]{10}$/.test(phone)){
		normalTip('手机号不正确！',3);
		return false;
	}
	return true;
}

/**
 * login
 * 检查验证码
 */
function checkYzm(sms_code) {
	if(sms_code==''){
		normalTip('请填写验证码！',3);
        return false;
	}
	if (sms_code.length!=6){
		normalTip('验证码为6位！',3);
		return false;
	}
	return true;
}

/**
 * paper_list
 * 上拉加载-模板
 */
function templates(tplid,data,func){
    var tpl = document.getElementById(tplid).innerHTML;
    laytpl(tpl).render(data,function(html){
        func(html);
    });
}

/* 返回顶部方法 start */
function scroll(st){
    var boo=st>100;
    var boo2=!$('#back-top').is(':hidden');
    if(boo&&!boo2){
        $('#back-top').fadeIn();
    }else{
        if(!boo&&boo2){
            $('#back-top').fadeOut();
        }
    }
}

function backToTop(){
    var scrtop = $(window).scrollTop();
    var time,wct;
    var x_scrtop = parseInt(scrtop/100);
    if(scrtop<=100){
        $(window).scrollTop(0);
    }else if(scrtop<=1000){
        time = setInterval(function(){
            scrtop = scrtop-100;
            $(window).scrollTop(scrtop);
            if(scrtop <= 0){
                clearInterval(time);
            }
        },10);
    }else if(scrtop>1000){
        $(window).scrollTop(1000);
        scrtop =1000;
        time = setInterval(function(){
            scrtop = scrtop-100;
            $(window).scrollTop(scrtop);
            if(scrtop <= 0){
                clearInterval(time);
            }
        },20);

    }
    return false;
}
/* 返回顶部方法 end */
