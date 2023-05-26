	(function($){
		$.getUrlParam = function (name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return decodeURIComponent(r[2]); return null;
		}
	})(jQuery);


	app.config(function($httpProvider) {
		var rand = Math.random();
		$httpProvider.defaults.headers.common = { 'spm' : rand,'X-Requested-With': 'XMLHttpRequest' }
	})
	$(function(){

	$(document).on('click','.messbtn',function(){
		$('.message_case').modal('show');
	})
	// 选择行业分类
	$('.class').on('click', function(){
		$(this).siblings('.select-tab').show();
	})
	// 下拉菜单
	$(document).on('click', '.dropdown-menu li a', function(){
		$(this).parents('li').addClass('hover').siblings().removeClass('hover');
		var con = $(this).html();
		var val = $(this).attr('value');
		$(this).parents('.dropdown').find('.dropdown-selected').html(con).attr('value', val);
		$(this).parents('.dropdown-menu').hide();
	})

	$(document).on('mouseover', '.dropdown', function(){
		$(this).find('.dropdown-menu').css('margin-top', '0px').show();
		$(this).children('.newdt').css({'border-left':'1px solid #e7ebed','border-right': '1px solid #e7ebed','background':'#fff'});
	})

	$(document).on('mouseout', '.dropdown', function(){
		$(this).find('.dropdown-menu').hide();
		$(this).children('.newdt').css({'border-left':'1px solid #f8fbff','border-right': '1px solid #f8fbff','background':''});
	})

	$(document).on('mouseover', '.dropdown', function(){
		$(this).find('.dropdown-menu').css('margin-top', '0px').show();
	})
	$(document).on('mouseout', '.dropdown', function(){
		$(this).find('.dropdown-menu').hide();
	})
	$(document).on('click', '.dropdown-select li a', function(){
	$(this).parents('.dropdown-select').find('.dropdown-selected').html($(this).html()).attr('value', $(this).attr('value'))
	})
	// 新版下拉框
	//$('.select-box').hover(function(){
	//  $(this).find('ul').show();
	//},function(){
	//  $(this).find('ul').hide();
	//})
	$(document).on('mouseover', '.select-box', function(){
	$(this).find('ul').show();
	})
	$(document).on('mouseout', '.select-box', function(){
		$(this).find('ul').hide();
	})
	$(document).on('click','.select-box li',function(){
		var con = $(this).text();
		var parent=$(this).parent();
		if(parent[0].nodeName !='UL'){
		parent=$(this).parents('ul');
		}
		parent.prev().text(con);
		parent.hide();
		
	})
		//头部开春入口banner
		//$(document).on('click','.redEnter i',function(){
		//    $('.redEnter').hide();
		//    $('.main-block').css('padding-top','90px')
		//    $('.question_content').css('margin-top','100px')
		//})


	// modal 返回指定modal  跳转页面
	$(document).on('click', '.modal button', function(){
		var back = $(this).attr('back');
		var fun = $(this).attr('fun');

		if(back){
			if(back.match(/\.htm/)){
				window.location.href = back;
			} else {
				$('.'+back).modal('show')
			}
			return false;
		}

		if(fun){
			eval('('+fun+')');
		}
			
	})

	// modal  头部拖动
	$(document).on('mousedown', '.modal-header, .modal-footer', function(e){
		var x = e.pageX;
		var y = e.pageY;
		var $modal = $(this).parents('.modal-dialog');
		var top = parseInt($modal.css('top'));
		var left = parseInt($modal.css('left'));

		$(document).on('mousemove', function(e){
			var xx = e.pageX; 
			var yy = e.pageY;	

			$modal.css({
				top: top+yy-y+'px',
				left: left+xx-x+'px'
			})
		})
	})
	$(document).on('mouseup', function(){
		$(document).off('mousemove')
	})

	// 滚动到顶部
	$(document).on('click', '.go_top', function(){
	$('body,html').animate({'scrollTop': 0}, 1000)
	})

	// 购物车右侧
	$(document).on('click', '.menu_right_btn', function(){
	$(this).parents('.menu-right').toggleClass('open')
	})
	$(document).on('click', '.menu_right_close', function(){
	$(this).parents('.menu-right').removeClass('open')
	})

	// 列表头部放到顶部
	$(window).on('scroll', function(){
	if(!$('.goto_header').length) return false;

	var top = $('.goto_header').offset();
	var width = $('.goto_header').innerWidth();
	var height = $('.goto_header').height();
	top = top.top;
	var scroll_top = $(window).scrollTop();
	var header_height = $('.header_togo').height();
	if($('.goto_header_ok').length) header_height -=  $('.goto_header_ok').height();

	if(scroll_top+header_height > top){
		if($('.goto_header_ok').length) return false;
		var html = '';
		if($('.goto_header > thead').length){
		html = $('.goto_header > thead').clone(true)
		html = $('<table class="table goto_header_ok" style="width: '+width+'px;margin: 0 auto;"></table>').append(html)
		} else {
		html = $('.goto_header').clone(true)
		html = $('<div class=" goto_header_ok" style="width: '+width+'px;margin: 0 auto;"></div>').append(html)
		}
		$('.header_togo').append(html).find('.goto_header').removeClass('goto_header');
	} else {
		$('.goto_header_ok').remove();
	}
	})

	// 解决框架兼容
	$('.modal').on('hidden.bs.modal', function(){
	$('body').css('padding-right', 0);
	});


	$(document).keypress(function(e) {
		if(e.which == 13) {
			$('.tcdPageCode a.go').trigger('click')
		}
	});

		var cook = $.cookie('token');
		$(document).on('click','.tougao',function(){
			if(cook == null){
				modal_confirm('您还没有登录，登录才能投稿！',function(){
					window.location.href = '/member/user/login.htm';
				}, function(){
					
				}, {yes: '去登录',no:'hide'});
			}
		})


	})

	// ------------------------------------------------功能函数---------------------------------------------

	// 点击分页滚动
	function gotoTop(target, header){
	var top = target ? $(target).offset() : 0;
	var header_height = header ? $(header).height() : 0;
	$(window).scrollTop(top.top-header_height-20);
	}

	// 新手引导
	function showGuide(){
		var intro = introJs();
		intro.setOptions({
			tooltipClass: '',
			nextLabel: '下一步',
			prevLabel: '上一步',
			skipLabel: '跳过',
			doneLabel: "完成",
			exitOnOverlayClick: false,
			exitOnEsc: true,
			showButtons: true,
			showBullets: false,
			showProgress: false,

			steps: [
			{
				element: '#step1',
				intro: "在这里添加网站资源",
				position: 'right'
			},
			{
				element: '#step2',
				intro: "在这里出售相关商品",
				position: 'right'
			},
			{
				element: '#step3',
				intro: "在这里查看、管理订单",
				position: 'right'
			}

			]
		});

		intro.start();
	}
	// showGuide();


	// 验证手机号
	function checkPhone(phone){
	var reg = /^[1][0-9][0-9]{9}$/;
	if(reg.test(phone)){
		return true;
	} else {
		return false;
	}
	}



	// 设置复制功能   252
	function setcopy(btn, con){
		
		var clip = new ZeroClipboard.Client();
		clip.setHandCursor(true);
		clip.setText($('#'+con).val());
		clip.glue(btn);

		clip.addEventListener( "complete", function(){
			modal_alert("复制成功！");
		});


		$(document).on('click', function(){
			clip.reposition();
			$(window).scrollTop(0)
		})

	}


	// 计时器
	function setTimer(target, contain, time){
		$('.'+target).removeClass(target).addClass('timer_running').html(time+'秒后获取');

		var timer = setInterval(function(){
			time--;
			if(time < 0){
				clearInterval(timer);
				$('.timer_running').removeClass('timer_running').addClass(target).html(contain)
				return false;
			}
			$('.timer_running').html(time+'秒后获取');
		}, 1000)
	}

	// 小型模态框  modal_time
	// modal_time('123', 1);
	function modal_time(str, time){
	if(str && time){
		$('.modal_time').find('.modal_time_text').html(str);
		$('.modal_time').modal('show');

		setTimeout(function(){
		$('.modal_time').modal('hide');
		}, time)

		$('.modal_time').on('hidden.bs.modal', function(){
		$('.modal_time').find('.modal_time_text').html('没有提示内容...');
		})
	}
	}

	//勾选选择
	$(document).on('click', '.checkplace', function(){
		var k = $(this).find('input').attr('mark');
		if ($('.checkplace input[type="radio"]').is(':checked')) {
			if(k==1){
				$('.inpage').show();
			}else{
				$('.inpage').hide();
			}
		}

	})

	//活动弹框
	// $(document).ready(function(){
	//   var cokie = getCookie('activity');
	//   console.log(cokie)
	//   if (cokie != 'cookieValue'){
	//     $('.activity-window').show();
	//   }
	//   	setTimeout(function(){
	// 		$('.activity-window').hide();
	// 	},5000)
	// })

	// $(document).on('click', '.activity-window .close', function () {
	// 	$('.activity-window').hide();
	// 	setCookie('activity','cookieValue',30)
	// })


	//在cokie中写入
	function setCookie(c_name, value, expiredays) {
		var exdate = new Date()
		exdate.setDate(exdate.getDate() + expiredays)
		document.cookie = c_name + "=" + escape(value) +
			((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
	}

	//获取cokie中写入的值
	function getCookie(c_name) {
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=")
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1
				c_end = document.cookie.indexOf(";", c_start)
				if (c_end == -1) c_end = document.cookie.length
				return unescape(document.cookie.substring(c_start, c_end))
			}
		}
		return ""
	}


	// 小型模态框  modal_alert
	// modal_alert(111);
	function modal_alert(str){
		if(str){
			$('.modal_tips').find('.modal_tips_text').html(str);
			$('.modal_tips').find('.modal_tips_no').addClass('hidden');
			$('.modal_tips').modal('show');

			$('.modal_tips').on('hidden.bs.modal', function(){
				$('.modal_tips').find('.modal_tips_text').html('没有提示内容...');
				$('.modal_tips').find('.modal_tips_no').removeClass('hidden');
			})
		}
	}


	// 小型模态框  confirm
	// modal_confirm(111,function(){console.log('yes11')}, function(){console.log('no')});
	//str:字符串信息 fnY:确定  fnN:取消 btns:按钮显示
	function modal_confirm(str, fnY, fnN, btns,closeHide){
		$(document).off('click', '.modal_tips .modal_tips_no',function(){});
		$(document).off('click', '.modal-tips .modal_tips_yes',function(){});
		if(str){
			$('.modal_tips').find('.modal_tips_text').html(str);
			$('.modal_tips').modal('show');
			$(document).on('click', '.modal_tips .modal_tips_no', function(){
				if(typeof fnN == 'function'){
					fnN();
				}
			})
			$(document).on('click', '.modal_tips .modal_tips_yes', function(){
				if(typeof fnY == 'function'){
					fnY();
				}
			})
			if(btns){
				btns.yes == 'hide' ? $('.modal_tips .modal_tips_yes').hide() : $('.modal_tips .modal_tips_yes').text(btns.yes);
				btns.no == 'hide' ? $('.modal_tips .modal_tips_no').hide() : $('.modal_tips .modal_tips_no').text(btns.no);
			}
		if(closeHide){
				$('.modal_tips .close').hide();
			}
			$('.modal_tips').on('hidden.bs.modal', function(){
				$('.modal_tips').find('.modal_tips_text').html('没有提示内容...');
				$('.modal_tips .modal_tips_yes').show().text('确定')
				$('.modal_tips .modal_tips_no').show().text('返回')
				setTimeout(function(){
					$(document).off('click', '.modal_tips .modal_tips_no');
					$(document).off('click', '.modal_tips .modal_tips_yes');
				},200)
			})
		}

	}

		// 滚动函数 往上滚和往左滚
		// opts = {go: 'left', obj: $('.scroll_left'), cons: 5, goTime: 1000, stopTime: 2000, dots: $('.con-dots span')}
		// go:滚动方向top/left  obj:滚动的容器，有超出隐藏的  cons:容器看到的个数  goTime:滚动的时间，毫秒  stopTime:停止的时间
		// dots:滚动的序号按钮，所有的，要设置属性index从0开始（这个参数可不传）
		// afterfun:滚动后的函数调用，参数为当前的索引  beforefun:滚动前的函数调用，参数是索引 （这两个函数可不传）
		function scrollFun(opts, afterfun, beforefun){
			var itemNum = opts.obj.find('li').length;
			var conH = opts.obj.innerHeight();
			var conW = opts.obj.innerWidth();
			var itemH =opts.objH || conH/opts.cons;
			var itemW = conW/opts.cons;
			var cur = 1;
			var ul = opts.obj.find('ul').length > 0 ? opts.obj.find('ul') : opts.obj;

			//勿删 删掉下面这句会影响滚的时候卡顿
			opts.obj.find('li').clone().appendTo(ul).attr('mark', 'clone');
			// 上滚
			var toTop = function(){
				if(typeof beforefun == 'function'){
					beforefun(cur == itemNum? 0: cur);
				}
				opts.obj.stop(true, true).animate({
					scrollTop: itemH*cur+'px'
				}, opts.goTime, function(){
					if(typeof afterfun == 'function'){
						afterfun(cur == itemNum? 0: cur);
					}
					if(opts.dots)
					opts.dots.eq(cur == itemNum? 0: cur).addClass('active').siblings().removeClass('active');
					cur++;
					if(cur > itemNum){
						opts.obj.stop(true, true).scrollTop(0);
						cur = 1;
					}
				})
			}
			if(opts.go == 'top'){
				opts.obj.scrollTop(0);
				var timer = setInterval(toTop, opts.stopTime)
				opts.obj.on('mouseover', function(){
					clearInterval(timer);
				})
				opts.obj.on('mouseout', function(){
					timer = setInterval(toTop, opts.stopTime)
				})
				if(opts.dots){
					opts.dots.on('mouseover', function(){
						clearInterval(timer);
						var index = $(this).attr('index');
						cur = index == 0? itemNum : index;
						toTop();
					})
					opts.dots.on('mouseout', function(){
						timer = setInterval(toTop, opts.stopTime)
					})
				}
			}

		}

		// 统计字符串长度，一个汉字2个字节
		function countStr(str){
			var len = 0;
			if(str){
				for (var i = 0; i < str.length; i++) {
					if (str.charCodeAt(i) > 128) {
						len += 2;
					} else {
						len += 1;
					}
				};
			}
			return len;
		}

		// 获取链接的参数
	function getParameter(name) { 
		var reg = new RegExp(name +"=.*",'g'); 
		var str = window.location.href.match(reg); 
		
		if (str) {
			str = str[0].split('&');
			str = str[0].split('=');
			str = str[1];
			return str;
		} else {
			return '';
		}
	}

		// 富文本复制功能 
	function copyToClip(str) {
		//pc编辑器上传图片
		var reg=/\/ueditor\/php\/upload/g;
		//h5上传图片
		var reg2=/\/upload\/avatar\//g;
		//添加图片路径域名
		if(str.match(reg)){
			str=str.replace(reg,'//cdn.2898.com/ueditor/php/upload')
		}
		if(str.match(reg2)){
			str=str.replace(reg2,'//cdn.2898.com/upload/avatar/')
		}
		function listener(e) {
			e.clipboardData.setData("text/html", str);
			e.clipboardData.setData("text/plain", str);
			e.preventDefault();
		
		}
		document.addEventListener("copy", listener);
		if(document.execCommand("copy")){
				modal_alert('复制成功！快去使用吧!')
		}else{
			modal_alert('复制失败!')
		}
		document.removeEventListener("copy", listener);
	
		};



	// 字符串超出截断加省略号
	function cutStr(str, len){
	if(str.length*2 <= len) {
		return str;
	}

	var strlen = 0;
	var newstr = '';
	for(var i = 0;i < str.length; i++) {
		newstr = newstr + str.charAt(i);

		if (str.charCodeAt(i) > 128) {
			strlen = strlen + 2;	
		} else {
			strlen = strlen + 1;
		}
		if(strlen >= len){
			return newstr.substring(0,newstr.length-1) + '...';
		}
	}
		return newstr;
	}


	app.directive('scrollShow', ['$window', function($window){
	return {
		link: function(scope, element, attr){
		$window = angular.element($window);
		$window.on('scroll', handler);
		
		function handler(){   
			if(element.height()/2+element.offset().top < $window.height()+$window.scrollTop()){
			element.addClass(attr.scrollClass);
			}
		}
		handler();
		}
	}
	}]);


	app.directive('scrollBottom', ['$window', function($window){
	return {
		link: function(scope, element, attr){
		$window = angular.element($window);
		$window.on('scroll', handler);
		
		function handler(){  
			var data = element.attr('data-scroll-bottom');
			if(!data){
			data = element.offset().top+element.height()*0;
			element.attr('data-scroll-bottom', data);
			} 
			if(data > $window.height()+$window.scrollTop()){
			element.addClass(attr.scrollBottom);
			} else {
			element.removeClass(attr.scrollBottom);
			}
		}
		}
	}
	}]);


	app.service('common', ['$http', function($http){
	var _this=this;
		this.staticHost = function(url){
		
			return staticHost(url);
		}
	this.formatTime = function(time, type, format){
		if(type == 'seconds') time = parseInt(time+'000');
		if(type == 'milliseconds') time = parseInt(time);
		
		var DateTime = new Date(time);
		var year = DateTime.getFullYear();
		var month = this.prevZero(DateTime.getMonth()+1);
		var date = this.prevZero(DateTime.getDate());
		var hours = this.prevZero(DateTime.getHours());
		var minutes = this.prevZero(DateTime.getMinutes());
		var seconds = this.prevZero(DateTime.getSeconds());

		time = format.replace(/y/g, year);
		time = time.replace(/m/g, month);
		time = time.replace(/d/g, date);
		time = time.replace(/h/g, hours);
		time = time.replace(/i/g, minutes);
		time = time.replace(/s/g, seconds);
		return time;
	}

	// 1 01
	this.prevZero = function(num){
		num = num+'';
		if(num.length == 1) num = '0'+num;
		return num;
	}

	// 购物车
	this.itemNum = 0;
	this.allPrice=0.00.toFixed(2)
	this.itemData = [];
	this.itemDataList = []
	this.itemType = 1;
	this.itemShow = false;
	this.isLogin = false;
	this.checkData = {
		all:false,
	};
	this.checkCount=0;
	this.arr=['电脑端','手机端','双端[普通版]','双端[专业版]']
	this.getAdverType=function(n){
		return this.arr[n-1]
	}
	var isLoad=true;
	this.getCart = function(type){
		var url = indexUrl('/cart/getcart');
		this.itemType = type;
		this.itemShow = true;
		var that = this;
		$http.get(url).then(function(res){   
			if(res.data.statusCode == 200){
				that.isLogin = true;
				that.itemNum = res.data.data.count;
				that.itemDataList = res.data.data.cart;
				that.showHeadCart(that.itemNum);
				if(!isLoad){
					for(var i=0;i<that.itemDataList.length;i++){
						for(var j=0;j<that.itemDataList[i].data.length;j++){
							var cid = that.itemDataList[i].data[j].cartid;
							if(that.checkData[cid] === undefined){
								that.checkData[cid]=true;
								that.checkCount++;
								that.upDatePrice(that.itemDataList[i].data[j].price)
							}
						}
					}
					
				}else{
					that.choose_cart('all');
					isLoad=false;
				}
			} else  {
				that.isLogin = true;
				that.itemNum = 0;
				that.allPrice=0.00.toFixed(2)
				that.itemData = [];
				that.showHeadCart(that.itemNum);
			}
		}, function(res){
			that.itemNum = 0;
			that.allPrice=0.00.toFixed(2)
			that.itemData = [];
			that.showHeadCart(that.itemNum);
		});
	}

		this.isShow= false
		this.CartLogin = function(){
		this.isShow= this.isShow?false:true
		var self = this
		setTimeout(function() {
			if(!self.isLogin){
				modal_confirm('登录后才能查看购物车，<br/>请先登录', function(){
					window.location.href = memberUrl('/user/login')+'?back_href='+window.location.href;
				}, function(){}, {yes:'去登录', no:'hide'});
			}
		}, 700);
		}
		// 选择 、单选 全选 模块多选
	this.choose_cart=function(index,k){
		if(index=='all'){
			this.checkData.all =!this.checkData.all;
			this.checkCount=this.checkData.all?this.itemNum:0;
			// 全选
			for(var i=0;i<this.itemDataList.length;i++){
				var modal = 'modal'+i;
				this.checkData[modal] = this.checkData.all;
				for(var j=0;j<this.itemDataList[i].data.length;j++){
					var cid = this.itemDataList[i].data[j].cartid;
					this.checkData[cid]=this.checkData.all;
				}
			}
			this.upDatePrice();
		}else if(k == 'modal'){
			// 模块全选
			var modal = 'modal'+index;
			this.checkData[modal] = !this.checkData[modal];
			for(var n=0;n<this.itemDataList[index].data.length;n++){
				var cid = this.itemDataList[index].data[n].cartid;
				if( this.checkData[cid] != this.checkData[modal]){
					this.checkData[cid] = this.checkData[modal]
					if(this.checkData[modal]){
					this.checkCount++;
					continue;
					}
					this.checkCount--;
				}
			}
			// 总数
		
			this.upDatePrice();
		}else{
			// 单选
			var cid = this.itemDataList[index].data[k].cartid;
			if(!this.checkData[cid]){
				this.checkData[cid]=true;
				this.upDatePrice(this.itemDataList[index].data[k].price);
				this.checkCount+=1;
				// 判断当前模块全选
				for(var n=0;n<this.itemDataList[index].data.length;n++){
					if(!this.checkData[cid]){
						this.checkData['modal'+index]=false;
						return;
					}
				}
				this.checkData['modal'+index]=true;
			}else{
				this.upDatePrice(-this.itemDataList[index].data[k].price);
				this.checkData[cid]=false;
				this.checkData['modal'+index]=false;
				this.checkCount-=1;
			}
		}
	}
		this.upDatePrice=function(price){
			if(price){
				this.allPrice=(parseFloat(this.allPrice)+parseFloat(price)).toFixed(2);
				return;
			}
			var price=0.00;
			for(var i=0;i<this.itemDataList.length;i++){
				for(var j=0;j<this.itemDataList[i].data.length;j++){
					if(this.checkData[this.itemDataList[i].data[j].cartid]){
						price+=parseFloat(this.itemDataList[i].data[j].price);
					}
				}
			}
			this.allPrice=price.toFixed(2);
		}
		this.showHeadCart = function(num){
			if(this.itemType == 1){
				$('.ylmm').parent().find('.shoptext').text(num);
			} else {
				$('.tw').parent().find('.shoptext').text(num);
			}
		};

		this.in_array = function(i,arr){return arr.indexOf(i)>=0;}

		//购物车单选及全选
		this.checked = false
		this.cartArr=[];

	//购物车去结算
		this.toShopCart=function(){
			var ids=[];
			for(var i=0;i<this.itemDataList.length;i++){
				for(var j=0;j<this.itemDataList[i].data.length;j++){
					var cid = this.itemDataList[i].data[j].cartid
					if(this.checkData[cid]){
						ids.push(cid);
					}
				
				}
			}
			if(ids.length<=0){
				return window.location.href='/index/goods/submit_order';
			}
				window.location.href='/index/goods/submit_order?cid='+ids.toString();
		}

		// 删除商品  isApp 1:app 2:小程序
		this.can_del = true
		this.delItem = function(gid,type,price_type,isApp,key,key1){
			if(!type){
				type = 2
			}
			if(isApp){
				type=isApp==1?4:5
			}
			var allData={gids:gid,type:type,price_type:price_type};
			if(!this.can_del) return false;
			this.can_del = false
			if(!gid) return false;
			var url = indexUrl('/cart/delfriendcart');
			var that = this;
			$http.post(url,allData).then(function(res){
				that.can_del = true
				if(res.data.statusCode == 200){
					that.delItemOk(gid,key,key1);
				} else {
					modal_alert(res.data.message);
				}
			}, function(res){
				modal_alert('系统出错，请联系客服。');
			});
		}
		this.delItemOk = function(gid,key,key1){
			this.itemDataList[key].count -= 1
			this.itemNum -= 1;
			if(this.checkData[this.itemDataList[key].data[key1].cartid]){
				this.checkCount-=1;
				this.upDatePrice(-this.itemDataList[key].data[key1].price);
			}
			delete this.checkData[this.itemDataList[key].data[key1].cartid];
			this.itemDataList[key].data.splice(key1, 1);
			for(var i=0;i<this.itemDataList[key].data.length;i++){
				if(!this.checkData[this.itemDataList[key].data[i].cartid]){
					this.checkData['modal'+key] = false;
					break;
				}
			}

		}
		this.clearCart = function(){
			modal_confirm('确定要清空购物车吗？',function(){
				$http.post('/index/cart/clearCart',{all:1,clear:1}).success(function(data){
					if(data.statusCode==200){
						// _this.getCart();
						_this.itemNum = 0;
						_this.itemDataList = [];
						_this.allPrice = 0.00;
						_this.checkCount = 0;
						this.checkData = {
							all:false,
						};
					}else{
						modal_alert(data.message);
					}
				})
			})
		}

	// 添加购物车效果
	this.flyImg = function(url, obj1, obj2, pos, fun){
		if(!url || !obj1 || !obj2 || !pos) return false;
		var html = '<img src="'+url+'" class="fly_img" style="position:fixed;top:-100px;left:-100px;z-index:99999;width:45px;height:45px;border-radius:50%;overflow:hidden;opacity:0;"></img>';
		var obj1Data = {x:0, y:0};
		var obj2Data = {x:0, y:0};
		var winData = {x:0, y:0};

		winData.x = $(window).scrollLeft();
		winData.y = $(window).scrollTop();
		obj1Data.x = $(obj1).offset().left-winData.x+$(obj1).width()/pos.obj1x;
		obj1Data.y = $(obj1).offset().top-winData.y+$(obj1).height()/pos.obj1y;
		obj2Data.x = $(obj2).offset().left-winData.x+$(obj2).width()/pos.obj2x;
		obj2Data.y = $(obj2).offset().top-winData.y+$(obj2).height()/pos.obj2y;

		$('body').append(html);
		$('.fly_img').css({
			opacity: 1,
			top: obj1Data.y+'px',
			left: obj1Data.x+'px'
		});
		$('.fly_img').animate({
			top: obj2Data.y+'px',
			left: obj2Data.x+'px',
			width: '15px',
			height: '15px',
			opacity: 0.5
		}, pos.time, 'easeOutQuad', function(){
			$('.fly_img').remove();
			if(fun && typeof(fun) == 'function') fun();
		})
	}
	}])

		// 图片上传
		$(document).on('click', '.adimgUp', function(){
			$('#adimgUp').trigger('click');

		})


	// 检查长度
	app.directive('checkLength', function () {
		return {
			link: function (scope, element, attrs) {
				var target = attrs.checkLength;
				var max = attrs.checkMax;
				var min = attrs.checkMin;

				element.on('change keyup click', function () {
					var val = element.val();
					var check = true;

					if (min && val.length < min) check = false;
					if (max && val.length > max) check = false;
					scope.$apply(function () {
						scope[target] = check;
					})
				})
			}
		};
	});

	// 检查url
	app.directive('checkUrl', function () {
		return {
			link: function (scope, element, attrs) {
				var target = attrs.checkUrl;

				element.on('change keyup click', function () {
					var val = element.val();
					var reg = /^[\s\S]{2,300}\.[\s\S]{2,300}$/g;
					var check = true;
					check = reg.test(val);
					
					scope.$apply(function () {
						scope[target] = check;
					})
				})
			}
		};
	});

	// 渲染后执行
	app.directive('renderOk', ['$timeout', '$parse', function ($timeout, $parse) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) { 
				if (scope.$last === true) {
					$timeout(function () {
						var fun = scope.$eval(attrs.renderOk);
						if(fun && typeof(fun)=='function'){  
							fun();  
						}  
					});
				}
			}
		}
	}])

	//验证URL
	function validateUrl(url) {
		var str = url;
	//在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
	//判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
	//下面的代码中应用了转义字符"\"输出一个字符"/"
		//var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
		var Expression=/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
		var objExp=new RegExp(Expression);
		if(objExp.test(str)==true){
			return true;
		}else{
			return false;
		}
	}



	//显示终端未完善（上架广告）
	//出售广告页面不显示此弹框
	var str=window.location.pathname
	if(str.indexOf("twgoods")==-1){
		complete_info()
	}

	function complete_info(){
		$.ajax({
			type: "get",
			url: "/index/index/check_T",
			dataType: "json",
			success: function (data) {
				if (data.statusCode == 200) {
					setTimeout(function(){
						modal_confirm('请完善网站广告的显示终端信息，否则无法进行其他操作。',function(){
							if(data.data=='tp'){
								window.location.href="/member/webpro/twgoods.htm?type=1"
							}else{
								window.location.href="/member/webpro/twgoods.htm?type=2"
							}

						},false,{no:'hide',yes:'前往完善'},true)
					},100)
				}else{
					modal_alert(data.message)
				}
			}
		});
	}


