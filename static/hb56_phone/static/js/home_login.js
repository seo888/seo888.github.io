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
          /****** ��ʼ�����泣���� ******/

        }
    }
})();


// ��¼����
function showLogin(){
		/*** �����¼ҳ�� //statict.cnmo.com/origin/mainpage/uCenter/car_Login.html***/
    $.get("//statict.cnmo.com/origin/mainpage/uCenter/car_Login.html",{},function(result){
    //     /*** ��Click���� ***/
    	$('#login2019').remove();
        $("body").append(result);
        // $('#login2019').show();
		$('#login2019').fadeIn();

		/*** ������֤�� ***/
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
		//��������
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
		//���󵯴�
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

		              	/*** ������ѯ ***/
		              	cUserFn.setTimer(res.data.pc);
		              	/*** ������ʱ 20���Ӻ��ά��ʧЧ ***/
		              	setTimeout(function () {
		              		clearTimeout(timer) //����ʱ����
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
	    //��ѯ
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
	                    clearTimeout(timer); //����ʱ����

	                }
	            }
	        })

	    }
    }

	var URL ='//passport.cnmo.com/index.php'
	var cookietime=false;//�Զ�����

	//�򿪵�¼����
	// $('#openLogin').on('click',function(){
	// 	$('#login2019').fadeIn();

	// 	/*** ������֤�� ***/
	// 	var imgMa = $("#login2019").find('.nbox').eq(0).find(".imgMa");
	// 	var time = Date.parse(new Date());
	// 	imgMa.attr("src",URL+'?c=Member_Ajax_AuthCode&m=DisplayPostSeccode'+'&t='+ time)
	// })
	var delClick = null;
	/*** ���չʾ��¼��ע�ᵯ�� ***/
    $("body").on("click", "#openLogin", function(e){
        console.log('userLogin');
        var cname = $(this).parent();
        if(cname.hasClass('nologin') ){
			showLogin();  
        }
    });

    // ��¼��ҳ
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
		//��������
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
	//�رյ�¼����
	$("body").on("click", ".logoin_bg,.login_2019_close", function(e){
		$('#login2019').fadeOut()
	})
	//ɾ�� 
	$("body").on("click", '#login2019 .inbox b.icondel', function(e){
		e.stopPropagation()
		clearTimeout(delClick)
		$(this).parent().find('input').val('')
		$(this).parent().removeClass('on')	
		$(this).parent().find('input').focus()
	})
    
	

    /****** �����ѡ�Զ���¼ ******/
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

    /****** �����ά���л�ѡ� ******/
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
    /****** �˺ŵ�¼����л�ѡ� ******/
    $("body").on("click", "#login2019 .inbox .ptit .item", function(e){
        var _thisIndex=$(this).index();
        $("#login2019 .inbox .ptit .item").removeClass("on");
        $(this).addClass("on");
        $("#login2019").find('.nbox').hide()
        $("#login2019").find('.nbox').eq(_thisIndex).show()

		/*** ���ѡ�������֤�� ***/
		var imgMa = $("#login2019").find('.nbox').eq(_thisIndex).find(".imgMa");
		var src = imgMa.attr("src");
		var time = Date.parse(new Date());
		imgMa.attr("src",src+'&t='+ time)
		
    })
    //�س��¼���
	$("#login2019 .clearfix").bind("keydown",function(e){
	����// ����FF��IE��Opera
	����var theEvent = e || window.event;
	����var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
	���� if (code == 13) {
	����//�س�ִ�в�ѯ
	��    $("#login2019 .submitbtn").trigger('click');
	����}
	});
    

    
    //���뵥������
     /*����*/
    password()
    function password(){
    	var delClick =null
    	$("body").on("click", "#password .iconmim", function(e){
			var that=$(this).parent()
			if(that.hasClass('textOn')){
				//���벻��ʾ
				that.removeClass('textOn')
				that.find('.password').focus()
			}else{
				//������ʾ
				that.addClass('textOn')
				that.find('.text').focus()
			}
			clearTimeout(delClick)
			that.find('.password').addClass('on')
		})
	    //input��
		$('#password').find('input').focus(function(){
			var that = $(this)
			that.addClass('on');
			var str = $.trim(that.val())
			that.parent().addClass('on')
		})
		//ʧȥ����
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
    
    ////ajax,,�����ȡ��֤��
    getmsCode()
    function getmsCode(){
    	//���������֤��
		var yanzmaOn2019 = true;var timer = null
		$("body").on("click", "#login2019 .getmsCode", function(e){
			if(!yanzmaOn2019) return
			yanzmaOn2019 = false;
			var tscode = $('.tscode').val(); //ͼƬ��֤��
			if(tscode == ""){
				$('.tu-ma-yanz').addClass('error')
				$('.tu-ma-yanz').find('.user-info').html('������ͼƬ��֤�룡')
				yanzmaOn2019 = true
				return;
			}
			var that = $(this)
			// var input1 = that.parent().prev().find('input');
			var input1 = that.parent().parent().prev().prev().find('input');
			// console.log(input1)
			//��֤�ֻ���
			var val = $.trim(input1.val())
			if(val==""){
				input1.parent().parent().addClass('error')
				input1.parent().parent().find('.user-info').html('�������ֻ��ţ�')
				yanzmaOn2019 = true
				return;
			}
			if(val.length!=11){
				input1.parent().parent().addClass('error')
				input1.parent().parent().find('.user-info').html('��������ȷ���ֻ��ţ�')
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
	                	that.html(num+'s�����»�ȡ')
	                	that.addClass('on');
	                	timer = setInterval(function(){
	                		num--;
	                		that.html(num+'s�����»�ȡ')
	                		if(num<=0){
	                			clearInterval(timer)
	                			that.html('���»�ȡ')
	                			yanzmaOn2019 = true
	                			that.removeClass('on')
	                		}
	                	},1000)
						// cUserFn.loading(false)
	                	cUserFn.infoError('��֤���ѷ��ͣ���ע�����')
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
	            	cUserFn.infoError('����������,���Ժ����ԣ�')
	            }
	    	})
		})
	}
    
    //ͼ����֤��
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

    //����˳�
    // $('.login_out').on('click',function(){
    $("body").on("click", ".login_out", function(e){
		// ͨ�õ�ҳ������
        $(".nologin").show();
        $(".islogin").hide();
    })

    //�����¼
    var denglu1 = true;
    $("body").on("click", "#login2019 .submitbtn", function(e){
//  	cUserFn.infoError('��½��...')
    	
    	if(!denglu1) return;

    	
    	$('#login2019 .error').removeClass('error')
    	var that = $(this)
    	var input1 = that.parent().parent().find('input[type="text"]')
    	
    	var type=that.attr('data-type')//1 �ֻ��ŵ�¼ 2�˺������¼
		
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
				'codeimg':$.trim(input1.eq(1).val()),  //ͼƬ��֤��
				'codemessage':$.trim(input1.eq(2).val()),//�ֻ���֤��
				'cookietime':cookietime
			}
    		// Data.codemessage = $.trim(input1.eq(2).val())
    	}else{
			var Data = {
				'username':$.trim(input1.eq(0).val()),
				'codeimg':$.trim(input1.eq(2).val()),  //ͼƬ��֤��
				'cookietime':cookietime,
				'password':$('.password').val()
			}
    		// Data.password = $.trim(input1.eq(1).val())
    	}
    	cUserFn.infoError('��¼��...');
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

                	/*** ����Cookie�ķ��� ***/
				    function setCookie(c_name,value,expiredays){
					    var exdate=new Date();
					    exdate.setDate(exdate.getDate()+expiredays);
					    document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/;domain=.cnmo.com";
				    }

                	/****** �հ����� ******/
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

                	// ����ҳ���¼��֤�ж�
                	window.hasLogin = 1
			    	window.hasLoginData={}
			    	window.hasLoginData = _vUser;


            		
						
                	/****** ��¼���Сģ�� ******/
                	var data = res.data
                	var denglu = '<li class="login loginin fr">'
   							    +'<a rel="nofollow" href="//i.cnmo.com/" class="user_name"><span>'+ data.username +'</span><i></i></a>'
   							    +'<div class="user_link">'
   								+'<a href="//i.cnmo.com/index.php?c=Space&m=Index"><span>�ҵ���ҳ</span></a>'
   								+'<a href="//i.cnmo.com/index.php?c=MySetting&amp;m=Security"><span>�˻���ȫ</span></a>'
   								+'<a href="//passport.cnmo.com/logout/" target="_self" class="login_out" ><span>�˳�</span></a>'
   							    +'</div>'
   						        +'</li>';
					/***  denglu2���ɸ���CEO�������~���� 2021-06-02 ***/
                	var denglu2 = '<li class="login loginin fr" style="width:120px">'
   							    +'<a rel="nofollow" href="//i.cnmo.com/" class="user_name"><span class="avatar" style="background-image: url('+ data.userAvatarUrlMiddle +');"></span><span>'+ data.username +'</span><i></i></a>'
   							    +'<div class="user_link">'
   								+'<a href="//i.cnmo.com/index.php?c=Space&m=Index"><span>�ҵ���ҳ</span></a>'
   								+'<a href="//i.cnmo.com/index.php?c=MySetting&amp;m=Security"><span>�˻���ȫ</span></a>'
   								+'<a href="//passport.cnmo.com/logout/" target="_self" class="login_out" ><span>�˳�</span></a>'
   							    +'</div>'
   						        +'</li>';
					/****** ����ҳ����Ԫ����ʾ״̬ ******/
					var ulDiv=$('.login').parent();
					var ulDivH=$('.head1_topbar_login').parent();
	                $('.register,.head1_topbar_register').remove();
	                $('.login,.head1_topbar_login').remove();

					/***  denglu2���ɸ���CEO�������~���� 2021-06-02 ***/
					if($(".topbar").hasClass('topbar2021')){
						/*** ���ڲ���ǰ�߲���***/
						ulDiv.prepend(denglu2);
						//ulDivH.prepend(denglu);
					}
					else{
						/*** ���ڲ����߲���***/
						ulDiv.append(denglu);
						ulDivH.append(denglu);
					}

	                $('#login2019').fadeOut()
	                cUserFn.infoError('��¼�ɹ�')


	                /****** PC��������ҳ�����û���Ϣչʾ (2020-04-20 �������� user_name_ing)******/
					var denglu = '<a href="//i.cnmo.com/"  class="user_name_ing">��ӭ�㣬'+ data.username +'</a><span>|</span><a href="//i.cnmo.com/index.php?c=Notice&m=Comment">����Ϣ</a><span>|</span><a href="//passport.cnmo.com/logout/" target="_self">�˳�</a>';
					//var dengluC = '<a href="//i.cnmo.com/">��ӭ�㣬'+ data.userInfo.nickname +'</a><span> | </span><a href="//passport.cnmo.com/logout/" target="_self">�˳�</a>';
					//���۴�	
					$('#ccom .ccom_tit').find('.c999').remove();
					$('#comm_denglu').parent().remove();
					$('#ccom_textarea').next().val('��������');
					//ҳ�涥��
					$('#cheader_my').addClass('cheader_myd');
					$('#cheader_my').html(denglu);



					/********* �ֻ���ȫ2020-11-13 �û������û�ͷ����������ż ************/
					var Hdenglu = '<a class="pro-comm-head" rel="nofollow" href="//i.cnmo.com/index.php?c=Space&m=Index"><img src="'+ data.userAvatarUrlMiddle +'"></a><span><a href="//i.cnmo.com/index.php?c=Space&m=Index">'+ data.username +'</a></span>'
					if($('.my-comm-head').length != 0){
						$('.my-comm-head').attr('login',1);
						$('.my-comm-head').html(Hdenglu);
					}


					// ͨ�õ�ҳ������
                    $(".nologin").hide();
                    $(".islogin").show();

					/****** �ж��Ƿ�Ϊ���� ******/
					function validate(obj){
						var reg = /^[0-9]*$/;
						return reg.test(obj);
					};

					/****** �ж�����̳��ˢ����ҳ�� ******/
					if((location.hostname).indexOf("bbs.cnmo.com")!=-1){
						setTimeout(function(){
							location.reload();
						},2000)
					}

					/****** �ж��� ��̳һ��Ŀ¼Ϊ/bbs/��ˢ����ҳ�� ******/
					if((location.pathname.substring(0,5)).indexOf("/bbs/")!=-1){
						setTimeout(function(){
							location.reload();
						},2000)
					}


					/****** �ж��Ǳ��ػ���ר���ˢ����ҳ�� ******/
					if((location.hostname).indexOf("192.168.180.")!=-1 || (location.hostname).indexOf("topic.cnmo.com")!=-1){
						setTimeout(function(){
							location.reload();
						},2000)
					}

					/****** ����һ�������жϵ�¼���Ƿ�Ҫˢ�� ******/
					if(typeof(isReload)!="undefined"){
						/****** �жϱ���ֵ�Ƿ�Ϊ������ ******/
						if(validate(isReload)){
							setTimeout(function(){
								location.reload();
							},isReload);
						}
						/****** ����լС����̳��� ******/
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
                	
                	if(res.status==-11){//ͼƬ��֤����ص�-11
						var type=that.attr('data-type')//1 �ֻ��ŵ�¼ 2�˺������¼
						if(type == 1){
							num = 1
						}else{
							num = 2
						}
                	}else if(res.status==-22){//�ֻ���֤����صĴ���-22
                		num = 2
                	}else if(res.status==-33){//�ֻ��Ŵ�����صĴ���-33
                		num = 0
                	}else if(res.status==-44){//����-44
                		num = 1
                	}
                	
                	input1.eq(num).parent().parent().addClass('error')
    				input1.eq(num).parent().parent().find('.user-info').html(res.notice)
                }
            },
            error:function(){
            	denglu1 = true
            	cUserFn.infoError('����������,���Ժ����ԣ�')
            }
    	})
    });

	/************************************
	 ��װ������صķ���
	 *************************************/
	var _vShare=(function(){
	    return {
	        //��������΢�� 
	        sharetoSina:function(title,url,picurl){
	            var sharesinastring='http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+url+'&content=utf-8&sourceUrl='+url+'&pic='+picurl;
	            window.open(sharesinastring,'newwindow','height=400,width=400,top=100,left=100');
	        },
	        //����QQ�ռ�
	        sharetoQQzone:function(title,url,picurl){
	            var shareqqzonestring='//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary='+title+'&url='+url+'&pics='+picurl;
	            window.open(shareqqzonestring,'newwindow','height=400,width=400,top=100,left=100');
	        },
	        //����΢������Ȧ
	        sharetoWeixin:function(title,url,picurl){
	            $('#bdshare_weixin_qrcode_dialog #bdshare_weixin_qrcode_dialog_qr').html('').qrcode(url);
	            $(".bd_weixin_popup").css({"display":"block"});
	        }
	    }
	})();
	$(".user_logout").on('click','.weibo,.qzone,.weixin',function(event){
        /****** �жϵ�ǰ�����ĸ�Ԫ�� ******/
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
    /****** ������ʾ����ICON ******/
    $(".mainpage").on('mouseover','.share',function(){
        $(this).addClass("item-on");
    })
    $(".mainpage").on('mouseout','.share',function(){
        $(this).removeClass("item-on");
    })


    /************************************
    	 �ر�΢�ŷ���Ķ�ά��
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
