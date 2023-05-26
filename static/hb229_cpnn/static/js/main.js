$(document).ready(function(){
	//轮播图开始
  	var olKey = 0;
		var ulKey = 0;
		var timer01 = null;
		function myFn(){
            olKey++;
			if(olKey > 4){
				olKey = 0;
			}
			$('.con ol li').eq(olKey).addClass('current').siblings().removeClass('current');
			//控制ul变化
			ulKey++;
			if(ulKey > 5){
				ulKey = 1;
				//为了实现无缝滚动效果  我们应该欺骗用户的视觉 让ul一瞬间回到0的位置 然后再去执行animate移动即可
				$('.con ul').css('left','0');
				//alert('我骗了你');
			}
			//程序执行到这里的是时候ul的位置是0 想走到-664的位置   0 - 664 = -664
			var move = ulKey * -664;
			$('.con ul').stop().animate({'left':''+move+'px'},500);
		}
		
		$('.con ul').append($('.con ul li').eq(0).clone(true));
		
		$('.rightBtn').click(function(e) {
			myFn();
        });
		
		//左按钮点击
		$('.leftBtn').click(function(e) {
            //ol的li
			olKey--;
			if(olKey < 0){
				olKey = 4;
			}
			$('.con ol li').eq(olKey).addClass('current').siblings().removeClass('current');
			
			//控制ul
			ulKey--;
			if(ulKey < 0){
				ulKey = 4;//用户想看到的是 倒数第二张图（因为用户以为是倒数第二张才是最后一张图）
				//为了让用户平滑的看到最后一张图 我们要控制让ul标签的left一瞬间回到 最后一个临时工所在的位置（5*-664 = -3320）再移动 就实现无缝滚动效果
				
				$('.con ul').css('left','-3320px');	
				//alert('我骗了用户 让他看了两个一样的图');
			
			}
			var move = ulKey * -664;
			$('.con ul').stop().animate({'left':''+move+'px'},500);
        });
		
		//定时器
		timer01 = setInterval(function(){
			//定时器代码 跟右按钮完全一样
			myFn();
		},4000);
		$('.con').hover(function(e) {
            clearInterval(timer01);
        },function(){
			timer01 = setInterval(function(){
				//定时器代码 跟右按钮完全一样
				myFn();
			},4000);
		});		
		
		$('.con ol li').click(function(e) {
			//为了顺序不乱 我们在点击ol的li时候 要把全局变量变成当前li索引值
			//此案例中 ul的li和ol的li个数不同 所以都要恢复成当前点击的索引值

			olKey = $(this).index();
			ulKey = $(this).index();
            $(this).addClass('current').siblings().removeClass('current');

			//点击ol的li控制ul移动
			var move = ulKey * -664;
			$('.con ul').stop().animate({'left':move + 'px'},500);
        });	
    //轮播图结束
    
    fnDate()
//js 获取当前时间
	function fnDate(){
		var date=new Date();
		var year=date.getFullYear();//当前年份
		$(".year").html(year);
		$(".year1").html(year);
	}
	
    /*tab切换*/
   tabs1();
   function tabs1(){
   		$(".tab_common .tab a").mouseover(function(){
			$(this).addClass('on').siblings().removeClass('on');
			var listContainer=$(this).parent().parent().parent().find(".content");
    		var chnl=$(this).attr("data-tab");
    		listContainer.find("[data-chnl="+chnl+"]").removeClass("hide").siblings().addClass("hide");
		});
   }
    
    tabs();
   function tabs(){
   		$(".nav_con .nav01 li a").mouseover(function(){
			var listContainer=$(this).parent().parent().parent().find(".nav_list");
    		var chnl=$(this).attr("data-tab");
    		listContainer.find("[data-chnl="+chnl+"]").removeClass("hide").siblings().addClass("hide");
		});
		$(".nav_list").mouseleave(function(){
			var listContainer=$(this).parent().find(".nav_list");
    		var chnl=$(this).attr("data-tab");
    		listContainer.find("ul").addClass("hide");
		});
   }
    
    /*关闭两侧广告*/
   $('.leftgg .leftgg_b span').click(function(){
   	  $('.leftgg_b').hide();
   })
   $('.leftgg .leftgg_t span').click(function(){
   	  $('.leftgg_t').hide();
   })
   $('.rightgg .rightgg_t span').click(function(){
   	  $('.rightgg_t').hide();
   })
   $('.rightgg .rightgg_b span').click(function(){
   	  $('.rightgg_b').hide();
   })
   
   /*导航点击显示隐藏多余菜单*/
  $('.nav i').click(function(){
   	  $('.moretab').toggleClass('hide');
   	  $('.nav i').toggleClass('on');
   })
  $('.guanzhugg i').click(function(){
   	  $('.guanzhugg').hide();
   })
  
    $(".nav_con .nav01 li").click(function(){
    	$(this).addClass('active').siblings().removeClass('active');
	});
  
    
})
