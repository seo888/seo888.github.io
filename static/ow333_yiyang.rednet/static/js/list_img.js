		// 组图播放
		function listImgScroll(){
			var blw = $(".min_img li").width();
			//获取单个子元素所需宽度
			var liArr = $(".min_img ul").children("li");
			//获取子元素数量
			var mysw = $(".min_img").width();
			//获取子元素所在区域宽度
			var mus = parseInt(mysw / blw);
			//计算出需要显示的子元素的数量
			var length = liArr.length - mus;
			//计算子元素可移动次数（被隐藏的子元素数量）
			var i = 0

			$(".min_imgli").click(function () {
				var title = $(this).attr("title");
				$("#picinfo-text p").html(title);
			});

			$(".ejectimgli").click(function () {
				var title = $(this).attr("title");
				$("#picinfo-eject p").html(title);
			});

			$(".min_imgli:first ").click();
			
			$(".ejectimgli:first ").click();

			$("#btn-right").click(function () {
				i++
				console.log(1111)
				//点击i加1
				if (i < length) {
					$("#myscrollbox").css("left", -(blw * i));
					//子元素集合向左移动，距离为子元素的宽度乘以i。
				} else {
					i = length;
					$("#myscrollbox").css("left", -(blw * length));
					//超出可移动范围后点击不再移动。最后几个隐藏的元素显示时i数值固定位已经移走的子元素数量。
				}
			});
			$("#btn-left").click(function () {
				i--
				//点击i减1
				if (i >= 0) {
					$("#myscrollbox").css("left", -(blw * i));
					//子元素集合向右移动，距离为子元素的宽度乘以i。
				} else {
					i = 0;
					$("#myscrollbox").css("left", 0);
					//超出可移动范围后点击不再移动。最前几个子元素被显示时i为0。
				}
			});
		};


		// 组图隐藏滚动箭头
		function btnHide(){
			var minImgLi = $(".min_img li").length;
			var btnLeft = $("#btn-left");
			var btnRight = $("#btn-right");

			if(minImgLi <= 3){
				$(btnLeft).hide();
				$(btnRight).hide();
			}
		};

		$(document).ready(function(){
			btnHide();
			listImgScroll();
		})


		var pic = 0; //记录当前显示的图片的索引
		var round = 0; //记录当前亮起的按钮的索引
		var imgWidth = 900;

		// 组图弹出层
		function changeBigImg(inputObj) {
			var parentTag = $(".min_img li a.active");
			var thisImg = inputObj.getElementsByTagName("img")
			var thisIndex = $(inputObj).parent().index();
			var ulLength = $(inputObj).parent().parent().children("li").length;
			//console.log(ulLength);
			$(".detail-article .progress .numerator").html(thisIndex + 1);
			var imgSrc = $(thisImg).attr("src");
			var bigSrc = $(thisImg).attr("src");
			$(".detail-article p img").attr("src", bigSrc);
			$(".min_img li a.active").removeClass("active");
			$(inputObj).addClass("active");
		}

		function tc_changeBigImg(inputObj) {
			var thisImg = inputObj.getElementsByTagName("img")
			var thisIndex = $(inputObj).parent().index();
			var ulLength = $(inputObj).parent().parent().children("li").length;
			$(".numerator").html(thisIndex + 1);

			var imgSrc = $(thisImg).attr("src");
			var bigSrc = $(thisImg).attr("src");
			//$("#box ul img").attr("src", bigSrc);

			var ul = $("#box").find('div').find('ul');
			var target = -(thisIndex ) * imgWidth;
			ul.attr("style","left:" + target + "px");

			pic = thisIndex;
			round = thisIndex;
			
			$(".tr_img li a img.active").removeClass("active");
			$(inputObj).children("img").addClass("active");
		}


		$(function() {

			var ulLength = $(".min_img ul").children("li").length;
			$(".detail-article .progress .denominator").html(ulLength);
			$('#eye').on('click', function() {
				$("body").addClass("un_roll");
				$(".tr_show,.photo_layer").show();
				setTimeout(function() {
					box()
				}, 100)
			})

			$(".imgClose").on('click', function() {
				$("body").removeClass("un_roll");
				var box = document.getElementById("box");
				var ol = box.children[1];
				var screen = box.children[0];
				var ul = screen.children[0];
				ul.removeChild(ul.lastElementChild);
				$(ol).html("");
				$(".tr_show,.photo_layer").hide();
			})

			
			function box() {
				var timer = null;
				//找人
				var box = document.getElementById("box");
				var screen = box.children[0];
				var ul = screen.children[0];
				var ulLis = ul.children;
				var tc_ulLength = ulLis.length;
				$(".photo_layer .progress .denominator").html(tc_ulLength);
				var ol = box.children[1];
				var arr = document.getElementById("arr");
				var left = document.getElementById("left");
				var right = document.getElementById("right");
				

				//动态生成结构
				//生成ol中的按钮
				for (var i = 0; i < ulLis.length; i++) {
					var li = document.createElement("li");
					//li.innerHTML = i ;
					ol.appendChild(li);
				}
				var olLis = ol.children;
				olLis[0].className = "current";
				//克隆第一张图
				var firstImg = ulLis[0].cloneNode(true);
				ul.appendChild(firstImg);

				//鼠标经过按钮  按钮排他 移动ul到相应位置
				for (var j = 0; j < olLis.length; j++) {
					olLis[j].index = j;
				}
			if($('.holder').length>0){//判断分页
				
			var prePage=12;
			$(document).ready(function() {
				$("div.holder").jPages({
					containerID : "clearfix",
					perPage: prePage,
					previous: "上一页",
					next: "下一页",
					scrollBrowse: true
				});
			});

			
			}
				//点击右箭头 移动ul到相应位置
				right.onclick = function() {
					//如果是最后一张 就应该 瞬间跳回开始 然后让ul从真的第一张渐渐地移动到第二张
					if (pic === ulLis.length - 1) { //最后一张图片的索引
						ul.style.left = 0;
						pic = 0; //pic也要归零
					}
					pic++; //计算接下来要显示的图片的索引
					//目标 和pic有关 和图片宽度有关 而且是负数
					var target = -pic * imgWidth;
					animate(ul, target);

					//按钮也要跟着跑
					if (round < olLis.length - 1) {
						round++; //计算出接下来要亮起的按钮的索引
					} else {
						round = 0;
					}
					$("#photo_layer .progress .numerator").html(round + 1);
					$("#photo_layer .progress .denominator").html(olLis.length);
					$("#photo_layer .figure-side .tr_img li").children("a").children("img").removeClass("active");
					$("#photo_layer .figure-side .tr_img li").eq(round).children("a").children("img").addClass("active");


					//干掉所有人
					for (var i = 0; i < olLis.length; i++) {
						olLis[i].className = "";
					}
					//留下对应的
					olLis[round].className = "current";

					$("#picinfo-eject p").html($("#photo_layer .figure-side .tr_img li").eq(round).attr("title"));
					
					if($('.holder').length>0){//判断分页 
						$('#arr').on('click', function() {
							if((round)%prePage==0){
							var Vtnext=Math.ceil((round+1)/prePage);
							$(".right").jPages(Vtnext);
							}
						});

					}

				};
				left.onclick = function() {
					//如果是第一张 就应该 瞬间跳回最后 然后让ul从假的第一张渐渐地移动到真的最后一张
					if (pic === 0) {
						ul.style.left = -(ulLis.length - 1) * imgWidth + "px";
						pic = ulLis.length - 1; //pic要变到最后
					}
					pic--; //计算接下来要显示的图片的索引
					//目标 和pic有关 和图片宽度有关 而且是负数
					var target = -pic * imgWidth;
					animate(ul, target);

					//按钮也要跟着跑
					if (round > 0) {
						round--; //计算出接下来要亮起的按钮的索引
					} else {
						round = olLis.length - 1;
					}
					$("#photo_layer .progress .numerator").html(round + 1);
					$("#photo_layer .figure-side .tr_img li").children("a").children("img").removeClass("active")
					$("#photo_layer .figure-side .tr_img li").eq(round).children("a").children("img").addClass("active")

					//干掉所有人
					for (var i = 0; i < olLis.length; i++) {
						olLis[i].className = "";
					}
					//留下对应的
					olLis[round].className = "current";
					$("#picinfo-eject p").html($("#photo_layer .figure-side .tr_img li").eq(round).attr("title"));
					
					if($('.holder').length>0){//判断分页
						$('#arr').on('click', function() {
							if((round+1)%prePage>=0){
							var Vsnext=Math.ceil((round+1)/prePage);
							$(".left").jPages(Vsnext);
							}
						});
					}
					
				};



				//添加自动滚动
				//timer = setInterval(playNext, 2000);
				function playNext() {
					right.onclick();
				}

				function animate(obj, target) {
					clearInterval(obj.timer);
					obj.timer = setInterval(function() {
						var leader = obj.offsetLeft;
						var step = 30;
						step = leader < target ? step : -step;
						if (Math.abs(target - leader) >= Math.abs(step)) {
							leader = leader + step;
							obj.style.left = leader + "px";
						} else {
							obj.style.left = target + "px";
							clearInterval(obj.timer);
						}
					}, 15);
				}
				//轮播结束
			}


			
		})