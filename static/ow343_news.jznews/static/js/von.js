//			鐪佺暐鍙? letter-limit="12" data-click="true"
			$('[letter-limit]').each(function(){
		        var that = $(this);
		        var limitNum = parseInt($(this).attr("letter-limit"));
		        var olds = $.trim($(this).text());
		        if(limitNum && olds.length > limitNum){
		            $(this).text(olds.substring(0, limitNum)+"...");
		        }
		    });
//		    tab鍒囨崲
$(function(){

				loadTab();

			});

function resetTabs(obj) {
				$(obj).parent().parent().next(".hmcontent").find(".tabrow").hide();
				$(obj).parent().parent().find("a").removeClass("current");
			}

			function loadTab() {
				$(".hmcontent > .tabrow").hide();
				$(".hmcontent").each(function() {
					$(this).find(".tabrow:first").fadeIn();
				});
				$(".hmtabs a").on("mouseover", function(e) {
					e.preventDefault();
					if ($(this).attr("class") == "current") {
						return;
					} else {
						resetTabs(this);
						$(this).addClass("current");
						$($(this).attr("name")).fadeIn();
					}
				});
			};

