$(function () {
	
	//var urlroot = window.location.href;
    //if (urlroot == 'http://creative.dfic.cn/') {
    //    window.location.href = 'http://creative.dfic.cn/icreative.ic'
    //}
    //
	var winwidth = $(window).width();
    var winheight = $(window).height();
   // $('.banner').css('height', winheight * 0.8);
   // $('.imglist a').css('height', winheight * 0.8);
    if (!navigator.userAgent.match(/mobile/i)) {
        // $('.banner').css('height', winheight * 0.8);
        $('.banner').css('height', winheight * 0.56);
        $('.imglist a').css('height', winheight * 0.7);
        $('.core').css('height', winheight* 0.6);
        $('.core').css("background-size", "100% 100%");
    } else {
        $('.banner').css('height', 'auto');
        // $('.imglist a').css('height', 'auto');
        $('.core').css('height', winheight*0.4);
        $('.core').css("background-size", "100% 100%");
    };


     $('.header').mouseover(function () {
        $('.header').css("background","rgba(255,255,255,1)");
         $('.header a').css("color","rgba(0,0,0,0.7)");
         $('#logreg button').css("color","rgba(0,0,0,0.7)");
         $('#searchicon').css("background-image",'url("img/soblack.png")');
         $('#register').css('border-color','rgba(0,0,0,0.7)');


     });
    $('.header').mouseout(function () {
        if ($(document).scrollTop()>=550) {
            $('.header').css('background',"rgba(255,255,255,1)");
        }else{
            $('.header').css('background',"rgba(255,255,255,0)");
            $('.header a').css("color","rgba(255,255,255,0.7)");
            $('#logreg button').css("color","rgba(255,255,255,0.7)");
            $('#searchicon').css("background-image",'url("img/sowhite.png")');
            $('#register').css('border-color','rgba(255,255,255,0.7)');
        }
    });
     //header

     $('#searchicon').click(function (e) {
         e.stopPropagation();
         $('#searchercon').css('border-width','1px');
         $('#searchercon').animate({width:"100%"},300);
         $('#searchtext').focus();
     });
     $(document).click(function (e) {
         e.stopPropagation();
         $('#searchercon').css('border-width','0px');
         $('#searchercon').animate({width:"40px"},300);
     });


     //core
	 $('.picmouseover').mouseover(function (e) {
        $('.img1').fadeOut(300);
        $('.core').css("background","url("+$(this).data('pidurl')+")");
        $('.core').css("background-size","100% 100%").css("cursor","pointer");
        e.stopPropagation();
    });
     // $('.pic1').mouseenter(function (e) {
         // $('.img1').fadeIn(300);
         // e.stopPropagation();
     // });
    // $('.pic1').mouseout(function (e) {
        // $('.img1').fadeOut(300);
        // $('.core').css("background","url("+$(this).data('pidurl')+")");
        // $('.core').css("background-size","100% 100%");
        // e.stopPropagation();
    // });
     // $('.pic2').mouseenter(function (e) {
         // $('.img2').fadeIn(300);
         // e.stopPropagation();
     // });
    // $('.pic2').mouseout(function (e) {
        // $('.img2').fadeOut(300);
        // $('.core').css("background","url(img/hx2.jpg)");
        // $('.core').css("background-size","100% 100%");
        // e.stopPropagation();
    // });
     // $('.pic3').mouseenter(function (e) {
         // $('.img3').fadeIn(300);
         // e.stopPropagation();
     // });
    // $('.pic3').mouseout(function (e) {
        // $('.img3').fadeOut(300);
        // $('.core').css("background","url(img/hx3.jpg)");
        // $('.core').css("background-size","100% 100%");
        // e.stopPropagation();
    // });
     // $('.pic4').mouseenter(function (e) {
         // $('.img4').fadeIn(300);
         // e.stopPropagation();
     // });
    // $('.pic4').mouseout(function (e) {
        // $('.img4').fadeOut(300);
        // $('.core').css("background","url(img/hx4.jpg)");
        // $('.core').css("background-size","100% 100%");
        // e.stopPropagation();
    // });
     // $('.pic5').mouseenter(function (e) {
         // $('.img5').fadeIn(300);
         // e.stopPropagation();
     // });
    // $('.pic5').mouseout(function (e) {
        // $('.img5').fadeOut(300);
        // $('.core').css("background","url(img/hx5.jpg)");
        // $('.core').css("background-size","100% 100%");
        // e.stopPropagation();
    // });



    // banner
     $('.imglist').slick({
         dots:true,
         autoplay:true,
         arrows:true,
         draggable:false,
         autoplaySpeed:5000,
         infinite:true,
         speed:300,
         slidesToShow:1,
         adaptiveHeight:true,
         pauseOnHover:true
     });
     $('.bancon').slick({
         autoplay:true,
         draggable:false,
         autoplaySpeed:5000,
         slidesToShow:1,
         infinite:true,
         speed:300,
         adaptiveHeight:true,
         arrows:false,
         pauseOnHover:false
     });
     $('.imglist a').mouseenter(function () {
         $('.imglist').slickPause();
         $('.bancon').slickPause();
     });

    $('.imglist a').mouseout(function () {
        $('.imglist').slickPlay();
        $('.bancon').slickPlay();
    });


    $('.slick-prev').click(function () {
        $('.bancon').slickPrev();
    });
    $('.slick-next').click(function () {
        $('.bancon').slickNext();
    });
    $('.slick-dots li').each(function(i) {
        $(this).bind("click", function() {
            $('.bancon').slickGoTo(parseInt(i));
        })
    });

     
    var aWindow = $(window);
    var aBody   = $(document);
    var aheader  = $('.header');
    var Advimg1  = $('.advimg1');
    var Advimg2  = $('.advimg2');
    var Advimg3  = $('.advimg3');
    var Advimg4  = $('.advimg4');
    var ali      = $('#logolist li');
    var aBack    = $('#back');

        aWindow.scroll(function () {
        	if(!navigator.userAgent.match(/mobile/i)){
    		 if (aBody.scrollTop()>=1700 && $(window).width() >= 960){
    	            Advimg1.animate({opacity:"1",top:"20px"},200);
    	            Advimg2.animate({opacity:"1",top:"0px"},300);
    	            Advimg3.animate({opacity:"1",top:"30px"},400);
    	            Advimg4.animate({opacity:"1",top:"60px"},500);
    	            $('.advright').animate({padding:'0',opacity:'1'},400);
    	        }
        	}else{
        		Advimg1.animate({opacity:"1",top:"20px"},100);
	            Advimg2.animate({opacity:"1",top:"0px"},100);
	            Advimg3.animate({opacity:"1",top:"220px"},100);
	            Advimg4.animate({opacity:"1",top:"195px"},100);
	            $('.advright').animate({padding:'0',opacity:'1'},100);
        	}
       
    });
     aWindow.scroll(function () {
//         console.log(aBody.scrollTop());
         if (aBody.scrollTop()>=350) {
             $('.header').css('background',"rgba(255,255,255,1)");
             $('.header a').css("color","rgba(0,0,0,0.7)");
             $('#logreg button').css("color","rgba(0,0,0,0.7)");
             $('#searchicon').css("background-image",'url("img/soblack.png")');
             $('#register').css('border-color','rgba(0,0,0,0.7)');
             $('#piccon a').animate({padding:'0',opacity:1},200);

         }else{
             $('.header').css('background',"rgba(255,255,255,0)");
             $('.header a').css("color","rgba(255,255,255,0.7)");
             $('#logreg button').css("color","rgba(255,255,255,0.7)");
             $('#searchicon').css("background-image",'url("img/sowhite.png")');
             $('#register').css('border-color','rgba(255,255,255,0.7)');
         }
     });
     aWindow.scroll(function () {
    	 if(!navigator.userAgent.match(/mobile/i)){
	         if (aBody.scrollTop()>=2800 && $(window).width() >= 960) {
	             ali.animate({margin:"0px",opacity:'1'},300);
	         }
    	 }else{
    		 ali.animate({margin:"0px",opacity:'1'},100);
    	 }
         });

    
     aWindow.scroll(function () {
         if(aBody.scrollTop()>=300) {
             aBack.fadeIn(1000);
         }else{
             aBack.fadeOut(1000);
         }
     });
     aBack.click(function () {
         $('body,html').animate({ scrollTop: "0" }, 500);
         return false;
     });


     //login
     $('.lgbtn').click(function (e) {
         
    	 $('input[name = "redirect"]').val($(this).attr('data-url') ? $(this).attr('data-url') : '');
         
         $('#bg').css('display','block');
         document.body.style.overflow='hidden';
         document.body.style.height='100%';
         document.documentElement.style.overflow='hidden';
         if($.cookie('dfic_username')) {
             $('#fname').val($.cookie('dfic_username'));
             $('#fpassword').val($.cookie('dfic_password'));
         }else{
             $('#fname').val('');
             $('#fpassword').val('');
         }
     });
     
     
    $('#closebtn').click(function (e) {
        $("#bg").css('display',"none");
        document.body.style.overflow='auto';
        document.body.style.height='auto';
        document.documentElement.style.overflow='auto'
    });

    //rember password
    var remberpaw = 1;
    $('#jzmm').click(function (e) {
        if(remberpaw == 1) {
            $(this).css('color','grey');
            remberpaw = 0
        }else{
            $(this).css('color','red');
            remberpaw = 1
        }
    })
	$('#jzmm2').click(function (e) {
        if(remberpaw == 1) {
            $(this).attr("checked", false);
            remberpaw = 0
        }else{
            $(this).attr("checked", true);
            remberpaw = 1
        }
    })
    
    $('#loginbtn').click(function (e) {
    	
        if ($('#fname').val() == '' || $('#fpassword').val() == '') {
            $('#tip').css('display','block');
            return false
        }else{
    		var URL = 'checkLogin.ic';
            $.ajax({
                type: 'POST',
                url: URL,
                async:false,
                data: { userid: encodeURI(encodeURI($('#fname').val())), password: encodeURI(encodeURI($('#fpassword').val())), rand:$("#frand").val() },
                dataType: 'JSON',
                async:false,
                success: function(data) {
                	if(data == "1"){
                		alert("����Ƶ�������������!");
                		$("#frand").val("");
            			$("#randimg").attr("src","randomNum2018.ic?op=image&time="+new Date().getTime());
                	}else{
                		var DATA = eval(data);
                        if(DATA.flag2 == false){
                        	alert("��֤���������");
                        	$("#frand").val("");
                			$("#randimg").attr("src","randomNum2018.ic?op=image&time="+new Date().getTime());
                        }else{
                        	if (DATA.flag == true) {
                                $('#fm').submit();
                                $.cookie('dfic_username', $('#fname').val(), { expires: 100, path: '/' });
                                $.cookie('dfic_password', $('#fpassword').val(), { expires: 100, path: '/' });
                            } else {
                                $('#tip').css('display', 'block');
                                globalLoginErr = DATA.errcount;
                                if(globalLoginErr > 3){
                                	$("#frand").val("");
                        			$("#randimg").attr("src","randomNum2018.ic?op=image&time="+new Date().getTime());
                                	$('#randdiv').css('display', 'block');
                                }
                                return false
                            }
                        }
                	}            
                },
                error:function() {
                	alert('��¼ʧ��!');
                }
            })
        }
    });
    
    //parseurl
    function parseURL(url) {
        var a =  document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':',''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function(){
                var ret = {},
                    seg = a.search.replace(/^\?/,'').split('&'),
                    len = seg.length, i = 0, s;
                for (;i<len;i++) {
                    if (!seg[i]) { continue; }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
            hash: a.hash.replace('#',''),
            path: a.pathname.replace(/^([^\/])/,'/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
            segments: a.pathname.replace(/^\//,'').split('/')
        };
    }
    
  //�ֻ���
    var zknum = 1;
    $('#zkbtn').click(function(e) {
    	$(this).toggleClass('is-active');
        if (zknum == 1) {
            //$('.button span:eq(0)').css('transform', "translate3d(0, 8px, 0) rotate(45deg)");
            //$('.button span:eq(1)').css('opacity', "0");
            //$('.button span:eq(2)').css('transform', "translate3d(0, -8px, 0) rotate(-45deg)");
            $('.header').css('background', "rgba(255,255,255,1)");
            $('.header a').css("color", "rgba(0,0,0,0.7)");
            $('.phone_nav').animate({ left: '0' }, 300);
            zknum = 2;
        } else if (zknum == 2) {
           // $('.button span:eq(0)').css('transform', "translate3d(0, -0px, 0) rotate(0deg)");
           // $('.button span:eq(1)').css('opacity', "1");
           // $('.button span:eq(2)').css('transform', "translate3d(0, 0px, 0) rotate(0deg)");
            $('.phone_nav').animate({ left: '-100%' }, 300);
            // $('.phone_nav').css("display", "none");
            zknum = 1;
        }
    });

    $('.phone_nav li').click(function() {
        $(this).children('.phone_nav2').toggle(500);
    });

    //
    $('.pic_list').slick({
        dots: false,
        autoplay: false,
        arrows: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        pauseOnHover: true
    });

 });


