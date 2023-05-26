/******* _vData Main Method********/
/*****************************************
--- CreationTime: 2020/03/25
--- UpdateTime:   2021/06/02
--- AuthorName:   Jesse Liu
--- AuthorBlog:   //liuxinxiu.com/
****************************************/
var _vUser=(function(){
    return {
        usable:true,
        isLogin:false,
        uid:'',
        mobile:'',
        backUrl:'',
        shortMessageUrl:'',
        userAvatarUrlMiddle:'',
        init:function(){
          /****** 初始化保存常用量 ******/

        }
    }
})();


// 登录弹窗
function showLogin(){
		/*** 请求登录页面 //statict.cnmo.com/origin/mainpage/uCenter/car_Login.html***/
    $.get("//statict.cnmo.com/origin/mainpage/uCenter/car_Login.html",{},function(result){
    //     /*** 新Click方法 ***/
    	$('#login2019').remove();
        $("body").append(result);
        // $('#login2019').show();
		$('#login2019').fadeIn();

		/*** 更新验证码 ***/
		var imgMa = $("#login2019").find('.nbox').eq(0).find(".imgMa");
		var time = Date.parse(new Date());
		var URL ='//passport.cnmo.com/index.php'
		imgMa.attr("src",URL+'?c=Member_Ajax_AuthCode&m=DisplayPostSeccode'+'&t='+ time)


			var inputK = $("#login2019 .inbox").find('input[type="text"]')
			// console.log(inputK)
			inputK.focus(function(){
	      	var that = $(this)
	      	// console.log(that)
	      	if(that.hasClass('text')) return
			that.addClass('on');
			var str = $.trim(that.val())
			if(str!=''){
				that.parent().addClass('on')
			}
	    });
    	inputK.blur(function(){
			var that = $(this)
			if(that.hasClass('text')) return
			delClick = setTimeout(function(){
				var str = $.trim(that.val())
				that.removeClass('on')
				that.parent().removeClass('on')
			},200)
	    });
		//键盘输入
		inputK.on('keyup',function(){
			var that = $(this)
			var str = $.trim(that.val())
			if(str!=''){
				that.parent().addClass('on')
			}else{
				that.parent().removeClass('on')
			}
		})

    //     console.log('GET ====> /user/login.html');
    });
}

$(function(){
	var cUserFn = {
		state : 1 ,
		timer : null ,
		pc : '',
		//错误弹窗
	    infoError: function (info) {
	        if ($('#info-error').length == 0) {
	            $('body').append('<div id="info-error" style="display: none;"></div>');
	        }
	        $('#info-error').show()
	        $('#info-error').html(info);
	        clearTimeout();
	        setTimeout(function () {
	            $('#info-error').fadeOut(600, function () {
	                $('#info-error').hide()
	            })
	        }, 1000)
	    },
	    erweima:function(){
	    	if (this.state == 1) {
	    		$('.loadings').show();
				$.ajax({
		            type: "GET",
		            url:'//m.cnmo.com/zhaimi/index.php?c=Index&m=GetErweimaPc',
		            data: {'client':'h5'},
		            dataType:"jsonp",
			        jsonp:"callback",
		            success: function (res) {
		              console.log(res);
		              if (res.code == 200) {
		              	$('.loadings').hide();
		              	$('.Invalid').hide();
		              	cUserFn.state = 0;
		              	cUserFn.pc = res.data.pc;
		              	$('.l_erweima img').attr('src',res.data.url);

		              	/*** 开启轮询 ***/
		              	cUserFn.setTimer(res.data.pc);
		              	/*** 开启定时 20分钟后二维码失效 ***/
		              	setTimeout(function () {
		              		clearTimeout(timer) //清理定时任务
							$('.Invalid').show();
							cUserFn.state = 1;
						}, 1000*60*20);
		              }
		              
		            },
		            error:function(err){
						console.log(err);
		            }
	            })
			}
	    },
	    //轮询
	    setTimer:function (ordernum) {
	        $.ajax({
	            type: "GET",
	            url: "//passport.cnmo.com/index.php?c=Member_AppLogin&m=AjaxLogin",
	            data:{pc:ordernum},
	            dataType: "jsonp",
	            jsonp: "callback",
	            success: function(data) {
	            	// console.log(data)
	                if (data.status == 0) {  
	                    timer = setTimeout(() => {
	                        cUserFn.setTimer(ordernum);
	                    }, 2500);
	                }else{
	                	window.location.href = data.data.backUrl;
	                    clearTimeout(timer); //清理定时任务

	                }
	            }
	        })

	    }
    }

	var URL ='//passport.cnmo.com/index.php'
	var cookietime=false;//自动开关

	//打开登录弹窗
	// $('#openLogin').on('click',function(){
	// 	$('#login2019').fadeIn();

	// 	/*** 更新验证码 ***/
	// 	var imgMa = $("#login2019").find('.nbox').eq(0).find(".imgMa");
	// 	var time = Date.parse(new Date());
	// 	imgMa.attr("src",URL+'?c=Member_Ajax_AuthCode&m=DisplayPostSeccode'+'&t='+ time)
	// })
	var delClick = null;
	/*** 点击展示登录或注册弹框 ***/
    $("body").on("click", "#openLogin", function(e){
        console.log('userLogin');
        var cname = $(this).parent();
        if(cname.hasClass('nologin') ){
			showLogin();  
        }
    });

    // 登录单页
    if ($('.loginpage').length >0) {
    	var delClick = null;
    	var inputK = $("#login2019 .inbox").find('input[type="text"]')
			// console.log(inputK)
			inputK.focus(function(){
	      	var that = $(this)
	      	// console.log(that)
	      	if(that.hasClass('text')) return
			that.addClass('on');
			var str = $.trim(that.val())
			if(str!=''){
				that.parent().addClass('on')
			}
	    });
    	inputK.blur(function(){
			var that = $(this)
			if(that.hasClass('text')) return
			delClick = setTimeout(function(){
				var str = $.trim(that.val())
				that.removeClass('on')
				that.parent().removeClass('on')
			},200)
	    });
		//键盘输入
		inputK.on('keyup',function(){
			var that = $(this)
			var str = $.trim(that.val())
			if(str!=''){
				that.parent().addClass('on')
			}else{
				that.parent().removeClass('on')
			}
		})
    }
	//关闭登录弹窗
	$("body").on("click", ".logoin_bg,.login_2019_close", function(e){
		$('#login2019').fadeOut()
	})
	//删除 
	$("body").on("click", '#login2019 .inbox b.icondel', function(e){
		e.stopPropagation()
		clearTimeout(delClick)
		$(this).parent().find('input').val('')
		$(this).parent().removeClass('on')	
		$(this).parent().find('input').focus()
	})
    
	

    /****** 点击勾选自动登录 ******/
    $("body").on("click", "#login2019 .auto_flag", function(e){
        if($(this).hasClass("on")){
            $(this).removeClass("on");
            cookietime=false
        }
        else{
            $(this).addClass("on");
            cookietime=true
        }
    })

    /****** 点击二维码切换选项卡 ******/
    $("body").on("click", "#login2019 .login_2020_erweima", function(e){
    	$(this).toggleClass('login_2020_pc');
        if ( !$("#login2019 .login_2020_erweima").hasClass('login_2020_pc')) {
        	$('#login2019 .inbox').show();
        	$('.login_2020_erweima_box').hide();
        }else{
        	$('#login2019 .inbox').hide();
        	$('.login_2020_erweima_box').show();
			cUserFn.erweima();
			// console.log(1)
        }
    });
    /****** 账号登录点击切换选项卡 ******/
    $("body").on("click", "#login2019 .inbox .ptit .item", function(e){
        var _thisIndex=$(this).index();
        $("#login2019 .inbox .ptit .item").removeClass("on");
        $(this).addClass("on");
        $("#login2019").find('.nbox').hide()
        $("#login2019").find('.nbox').eq(_thisIndex).show()

		/*** 点击选项卡更新验证码 ***/
		var imgMa = $("#login2019").find('.nbox').eq(_thisIndex).find(".imgMa");
		var src = imgMa.attr("src");
		var time = Date.parse(new Date());
		imgMa.attr("src",src+'&t='+ time)
		
    })
    //回车事件绑定
	$("#login2019 .clearfix").bind("keydown",function(e){
	　　// 兼容FF和IE和Opera
	　　var theEvent = e || window.event;
	　　var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
	　　 if (code == 13) {
	　　//回车执行查询
	　    $("#login2019 .submitbtn").trigger('click');
	　　}
	});
    

    
    //密码单独处理
     /*密码*/
    password()
    function password(){
    	var delClick =null
    	$("body").on("click", "#password .iconmim", function(e){
			var that=$(this).parent()
			if(that.hasClass('textOn')){
				//密码不显示
				that.removeClass('textOn')
				that.find('.password').focus()
			}else{
				//密码显示
				that.addClass('textOn')
				that.find('.text').focus()
			}
			clearTimeout(delClick)
			that.find('.password').addClass('on')
		})
	    //input框
		$('#password').find('input').focus(function(){
			var that = $(this)
			that.addClass('on');
			var str = $.trim(that.val())
			that.parent().addClass('on')
		})
		//失去焦点
		$('#password').find('input').blur(function(){
			var that = $(this)
			var str = $.trim(that.val())
			that.parent().find('input').val(str)
			delClick = setTimeout(function(){
				that.removeClass('on')
				that.parent().removeClass('on')
			},200)
		})
    }
    
    ////ajax,,点击获取验证码
    getmsCode()
    function getmsCode(){
    	//点击发送验证码
		var yanzmaOn2019 = true;var timer = null
		$("body").on("click", "#login2019 .getmsCode", function(e){
			if(!yanzmaOn2019) return
			yanzmaOn2019 = false;
			var tscode = $('.tscode').val(); //图片验证码
			if(tscode == ""){
				$('.tu-ma-yanz').addClass('error')
				$('.tu-ma-yanz').find('.user-info').html('请输入图片验证码！')
				yanzmaOn2019 = true
				return;
			}
			var that = $(this)
			// var input1 = that.parent().prev().find('input');
			var input1 = that.parent().parent().prev().prev().find('input');
			// console.log(input1)
			//验证手机号
			var val = $.trim(input1.val())
			if(val==""){
				input1.parent().parent().addClass('error')
				input1.parent().parent().find('.user-info').html('请输入手机号！')
				yanzmaOn2019 = true
				return;
			}
			if(val.length!=11){
				input1.parent().parent().addClass('error')
				input1.parent().parent().find('.user-info').html('请输入正确的手机号！')
				yanzmaOn2019 = true
				return;
			}
			var Data = {
				'mobile':val,
				'type':that.attr('data-type')||5,
				'codeimg':tscode
			}
			var num = 60;
			$.ajax({
	            type: "GET",
	            url: URL+'?c=Member_Ajax_Register&m=SendMessageCode',
	            data: Data,
	            dataType:"jsonp",
		        jsonp:"Jsoncallback",
		        timeout: 30000,
	            success: function (res) {
	            	console.log(res);
	                if (res.status == 1){
	                	that.html(num+'s后重新获取')
	                	that.addClass('on');
	                	timer = setInterval(function(){
	                		num--;
	                		that.html(num+'s后重新获取')
	                		if(num<=0){
	                			clearInterval(timer)
	                			that.html('重新获取')
	                			yanzmaOn2019 = true
	                			that.removeClass('on')
	                		}
	                	},1000)
						// cUserFn.loading(false)
	                	cUserFn.infoError('验证码已发送，请注意查收')
	                }else{
	                	yanzmaOn2019 = true; 
	                	if (res.status == -11) {
	                		input1.parent().parent().next().addClass('error');
	                		input1.parent().parent().next().find('.user-info').html(res.message)
	                		cUserFn.infoError(res.message)
	                	}else{
	                		// cUserFn.loading(false)
							input1.parent().parent().addClass('error')
							input1.parent().parent().find('.user-info').html(res.message)
		                	cUserFn.infoError(res.message)
	                	}
	                }
	            },
	            error:function(){
//	            	yanzmaOn2019 = true
//	            	cUserFn.loading(false)
	            	cUserFn.infoError('服务器错误,请稍后再试！')
	            }
	    	})
		})
	}
    
    //图形验证码
    $("body").on("click", "#login2019 .imgMa", function(e){
		var time = Date.parse(new Date());
		$(this).attr('src',URL+'?c=Member_Ajax_AuthCode&m=DisplayPostSeccode'+'&t='+ time)
    })
    $("body").on("click", "#login2019 .imgMa1", function(e){
    	var that = $(this)
		var time = Date.parse(new Date());
		that.prev().attr('src',URL+'?c=Member_Ajax_AuthCode&m=DisplayPostSeccode'+'&t='+ time)
		that.addClass('on')
		that.prev().on('load',function(){
			that.removeClass('on')
		})
    })

    //点击退出
    // $('.login_out').on('click',function(){
    $("body").on("click", ".login_out", function(e){
		// 通用的页面设置
        $(".nologin").show();
        $(".islogin").hide();
    })

    //点击登录
    var denglu1 = true;
    $("body").on("click", "#login2019 .submitbtn", function(e){
//  	cUserFn.infoError('登陆中...')
    	
    	if(!denglu1) return;

    	
    	$('#login2019 .error').removeClass('error')
    	var that = $(this)
    	var input1 = that.parent().parent().find('input[type="text"]')
    	
    	var type=that.attr('data-type')//1 手机号登录 2账号密码登录
		
		if(type == 1){
			for(var i=0;i<input1.length;i++){
				var val = $.trim(input1.eq(i).val())
				if(val==""){
					var str = input1.eq(i).attr('placeholder')
					input1.eq(i).parent().parent().addClass('error')
					input1.eq(i).parent().parent().find('.user-info').html(str)
					denglu = true
					return
				}
			}
		}
    	
		
    	if(type==1){
			var Data = {
				'username':$.trim(input1.eq(0).val()),
				'codeimg':$.trim(input1.eq(1).val()),  //图片验证码
				'codemessage':$.trim(input1.eq(2).val()),//手机验证码
				'cookietime':cookietime
			}
    		// Data.codemessage = $.trim(input1.eq(2).val())
    	}else{
			var Data = {
				'username':$.trim(input1.eq(0).val()),
				'codeimg':$.trim(input1.eq(2).val()),  //图片验证码
				'cookietime':cookietime,
				'password':$('.password').val()
			}
    		// Data.password = $.trim(input1.eq(1).val())
    	}
    	cUserFn.infoError('登录中...');
    	denglu1=false;
    	$.ajax({
            type: "GET",
            url: URL+'?c=Member_Login&m=AjaxLogin',
            data: Data,
            dataType:"jsonp",
	        jsonp:"callback",
	        timeout: 30000,
            success: function (res) {
            	console.log(res)
                if (res.status == 1){
                	_vUser.isLogin = true;

                	/*** 设置Cookie的方法 ***/
				    function setCookie(c_name,value,expiredays){
					    var exdate=new Date();
					    exdate.setDate(exdate.getDate()+expiredays);
					    document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/;domain=.cnmo.com";
				    }

                	/****** 闭包变量 ******/
                	if(typeof(res.data.uid)!='undefined'){
                		_vUser.uid = res.data.uid;
                		setCookie("cnmo_tj_uid",res.data.uid);
                		
                	}
                	if(typeof(res.data.mobile)!='undefined'){
                		_vUser.mobile = res.data.mobile;
                	}
                	if(typeof(res.data.backUrl)!='undefined'){
                		_vUser.backUrl = res.data.backUrl;
                	}
                	if(typeof(res.data.shortMessageUrl)!='undefined'){
                		_vUser.shortMessageUrl = res.data.shortMessageUrl;
                	}
                	if(typeof(res.data.userAvatarUrlMiddle)!='undefined'){
                		_vUser.userAvatarUrlMiddle = res.data.userAvatarUrlMiddle;
                	}

                	// 个别页面登录验证判断
                	window.hasLogin = 1
			    	window.hasLoginData={}
			    	window.hasLoginData = _vUser;


            		
						
                	/****** 登录后的小模板 ******/
                	var data = res.data
                	var denglu = '<li class="login loginin fr">'
   							    +'<a rel="nofollow" href="//i.cnmo.com/" class="user_name"><span>'+ data.username +'</span><i></i></a>'
   							    +'<div class="user_link">'
   								+'<a href="//i.cnmo.com/index.php?c=Space&m=Index"><span>我的主页</span></a>'
   								+'<a href="//i.cnmo.com/index.php?c=MySetting&amp;m=Security"><span>账户安全</span></a>'
   								+'<a href="//passport.cnmo.com/logout/" target="_self" class="login_out" ><span>退出</span></a>'
   							    +'</div>'
   						        +'</li>';
					/***  denglu2是松哥新CEO提的需求~老罗 2021-06-02 ***/
                	var denglu2 = '<li class="login loginin fr" style="width:120px">'
   							    +'<a rel="nofollow" href="//i.cnmo.com/" class="user_name"><span class="avatar" style="background-image: url('+ data.userAvatarUrlMiddle +');"></span><span>'+ data.username +'</span><i></i></a>'
   							    +'<div class="user_link">'
   								+'<a href="//i.cnmo.com/index.php?c=Space&m=Index"><span>我的主页</span></a>'
   								+'<a href="//i.cnmo.com/index.php?c=MySetting&amp;m=Security"><span>账户安全</span></a>'
   								+'<a href="//passport.cnmo.com/logout/" target="_self" class="login_out" ><span>退出</span></a>'
   							    +'</div>'
   						        +'</li>';
					/****** 更改页面中元素显示状态 ******/
					var ulDiv=$('.login').parent();
					var ulDivH=$('.head1_topbar_login').parent();
	                $('.register,.head1_topbar_register').remove();
	                $('.login,.head1_topbar_login').remove();

					/***  denglu2是松哥新CEO提的需求~老罗 2021-06-02 ***/
					if($(".topbar").hasClass('topbar2021')){
						/*** 在内部最前边插入***/
						ulDiv.prepend(denglu2);
						//ulDivH.prepend(denglu);
					}
					else{
						/*** 在内部最后边插入***/
						ulDiv.append(denglu);
						ulDivH.append(denglu);
					}

	                $('#login2019').fadeOut()
	                cUserFn.infoError('登录成功')


	                /****** PC文章最终页更改用户信息展示 (2020-04-20 增加类名 user_name_ing)******/
					var denglu = '<a href="//i.cnmo.com/"  class="user_name_ing">欢迎你，'+ data.username +'</a><span>|</span><a href="//i.cnmo.com/index.php?c=Notice&m=Comment">短消息</a><span>|</span><a href="//passport.cnmo.com/logout/" target="_self">退出</a>';
					//var dengluC = '<a href="//i.cnmo.com/">欢迎你，'+ data.userInfo.nickname +'</a><span> | </span><a href="//passport.cnmo.com/logout/" target="_self">退出</a>';
					//评论处	
					$('#ccom .ccom_tit').find('.c999').remove();
					$('#comm_denglu').parent().remove();
					$('#ccom_textarea').next().val('发表评论');
					//页面顶部
					$('#cheader_my').addClass('cheader_myd');
					$('#cheader_my').html(denglu);



					/********* 手机大全2020-11-13 用户评论用户头像下面是奇偶 ************/
					var Hdenglu = '<a class="pro-comm-head" rel="nofollow" href="//i.cnmo.com/index.php?c=Space&m=Index"><img src="'+ data.userAvatarUrlMiddle +'"></a><span><a href="//i.cnmo.com/index.php?c=Space&m=Index">'+ data.username +'</a></span>'
					if($('.my-comm-head').length != 0){
						$('.my-comm-head').attr('login',1);
						$('.my-comm-head').html(Hdenglu);
					}


					// 通用的页面设置
                    $(".nologin").hide();
                    $(".islogin").show();

					/****** 判断是否为数字 ******/
					function validate(obj){
						var reg = /^[0-9]*$/;
						return reg.test(obj);
					};

					/****** 判断是论坛就刷新下页面 ******/
					if((location.hostname).indexOf("bbs.cnmo.com")!=-1){
						setTimeout(function(){
							location.reload();
						},2000)
					}

					/****** 判断是 论坛一级目录为/bbs/就刷新下页面 ******/
					if((location.pathname.substring(0,5)).indexOf("/bbs/")!=-1){
						setTimeout(function(){
							location.reload();
						},2000)
					}


					/****** 判断是本地或者专题就刷新下页面 ******/
					if((location.hostname).indexOf("192.168.180.")!=-1 || (location.hostname).indexOf("topic.cnmo.com")!=-1){
						setTimeout(function(){
							location.reload();
						},2000)
					}

					/****** 定义一个变量判断登录后是否要刷新 ******/
					if(typeof(isReload)!="undefined"){
						/****** 判断变量值是否为纯数字 ******/
						if(validate(isReload)){
							setTimeout(function(){
								location.reload();
							},isReload);
						}
						/****** 贝贝宅小秘论坛板块 ******/
						else{
							setTimeout(function(){
								location.reload();
							},2000);
						}
					}

                }else{
                	denglu1 = true
                	console.log(denglu)
                	cUserFn.infoError(res.notice)
                	var num = 0
                	
                	if(res.status==-11){//图片验证码相关的-11
						var type=that.attr('data-type')//1 手机号登录 2账号密码登录
						if(type == 1){
							num = 1
						}else{
							num = 2
						}
                	}else if(res.status==-22){//手机验证码相关的错误-22
                		num = 2
                	}else if(res.status==-33){//手机号错误相关的错误-33
                		num = 0
                	}else if(res.status==-44){//密码-44
                		num = 1
                	}
                	
                	input1.eq(num).parent().parent().addClass('error')
    				input1.eq(num).parent().parent().find('.user-info').html(res.notice)
                }
            },
            error:function(){
            	denglu1 = true
            	cUserFn.infoError('服务器错误,请稍后再试！')
            }
    	})
    });

	/************************************
	 封装分享相关的方法
	 *************************************/
	var _vShare=(function(){
	    return {
	        //分享到新浪微博 
	        sharetoSina:function(title,url,picurl){
	            var sharesinastring='http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+url+'&content=utf-8&sourceUrl='+url+'&pic='+picurl;
	            window.open(sharesinastring,'newwindow','height=400,width=400,top=100,left=100');
	        },
	        //分享到QQ空间
	        sharetoQQzone:function(title,url,picurl){
	            var shareqqzonestring='//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary='+title+'&url='+url+'&pics='+picurl;
	            window.open(shareqqzonestring,'newwindow','height=400,width=400,top=100,left=100');
	        },
	        //分享到微信朋友圈
	        sharetoWeixin:function(title,url,picurl){
	            $('#bdshare_weixin_qrcode_dialog #bdshare_weixin_qrcode_dialog_qr').html('').qrcode(url);
	            $(".bd_weixin_popup").css({"display":"block"});
	        }
	    }
	})();
	$(".user_logout").on('click','.weibo,.qzone,.weixin',function(event){
        /****** 判断当前属于哪个元素 ******/
        var _this=$(event.target);
        var _cname=_this.attr("class");
        var _title=_this.parent().parent().attr("stitle");
        var _ahref=_this.parent().parent().attr("slink");
        var _image=_this.parent().parent().attr("simg");

        if(_cname.indexOf("weibo")>-1){
            _vShare.sharetoSina(_title,_ahref,_image);
        }
        if(_cname.indexOf("qzone")>-1){
            _vShare.sharetoQQzone(_title,_ahref,_image);
        }
        if(_cname.indexOf("weixin")>-1){
            _vShare.sharetoWeixin(_title,_ahref,_image);
        }
    })
    /****** 滑过显示分享ICON ******/
    $(".mainpage").on('mouseover','.share',function(){
        $(this).addClass("item-on");
    })
    $(".mainpage").on('mouseout','.share',function(){
        $(this).removeClass("item-on");
    })


    /************************************
    	 关闭微信分享的二维码
     *************************************/
    $(".bd_weixin_popup a").click(function(){
        $(".bd_weixin_popup").css({"display":"none"})
    });

    $(".share").hover(function(){
        $(this).addClass("share-on");
    },function(){
        $(this).removeClass("share-on");
    })

})
