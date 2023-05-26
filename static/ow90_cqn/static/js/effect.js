$(document).ready(function(){ $(".gosite").change(function(){ if($(this).get(0).selectedIndex!=0 &&$(this).val()!=""){window.open($(this).val());} });});

/* 横向滑动*/
 $(document).ready(function() {
	 $(".tab .tabt ul li").hover(
	function() {
		 var ind = $(this).parent().find(this).index();
		 $(this).siblings().removeClass("current");
		 $(this).addClass("current");
		 $(this).parent().parent().next().find(".tabc").hide();
		 $(this).parent().parent().next().find(".tabc").eq(ind).show();
	}, function() {
	}
	);
 });
/* 竖向滑动*/
 $(document).ready(function() {
	 $(".tabv .tabt ul li").hover(
	function() {
		 var ind = $(this).parent().find(this).index();
		 $(this).siblings().removeClass("current");
		 $(this).addClass("current");
		 $(this).parent().parent().next().find(".tabc").hide();
		 $(this).parent().parent().next().find(".tabc").eq(ind).show();
	}, function() {
	}
	);
 });

/* 左右滚动*/
function r_to_l(speeds,container,left,right)
{
	var speed=speeds;  //the bigger the slower
	var conc = $(container);
	var concl = $(left);
	var concr = $(right);
	var i=0;
	while(concl.width()<conc.width())
	{		
		concl.find("tr").html(concl.find("tr").html()+concl.find("tr").html());
	}
	concr.html(concl.html());
	function Marquee(){ 
		if(conc.scrollLeft()>=concl.width())
			conc.scrollLeft(0); 
		else{
			conc.scrollLeft(conc.scrollLeft()+1);
		}
	} 
	var MyMar=setInterval(Marquee,speed) 
	conc.mouseover(function() {
		clearInterval(MyMar);
	} )
	conc.mouseout(function() {
		MyMar=setInterval(Marquee,speed);
	} )	 
}

//var tp = new r_to_l(30, "#scrr", "#scrr1", "#scrr2");
//var zazhi = new r_to_l(30,"#zazhi","#zazhi1","#zazhi2");

//加粗字体
$(document).ready(function() {
						  // alert($(".news .R_L").eq(0).find("ul li").eq(0).find("a").html());
						   $(".news .R_L").eq(0).find("ul li").eq(0).find("a").addClass("btitle");
						   $(".news .R_L").eq(0).find("ul li").eq(4).find("a").addClass("btitle");
						   $(".news .R_L").eq(0).find("ul li").eq(9).find("a").addClass("btitle");
						 //  alert($(".news .R_L").eq(0).find("ul li").eq(0).find("a").html());
});

//报系下拉
$(document).ready(function() {
		
	$(".bx").bind('mouseover',function() // 顶级菜单项的鼠标移入操作 
	{  	
		$(this).find('ul').slideDown('fast');
	}).bind('mouseleave',function() // 顶级菜单项的鼠标移出操作 
	{  
		$(this).find('ul').slideUp('fast'); 
	}); 
	 
	$('.bx li').bind('mouseover',function() // 子菜单的鼠标移入操作 
	{ 
		$(this).find('ul').slideDown('fast'); 
	}).bind('mouseleave',function() // 子菜单的鼠标移出操作 
	{  
		$(this).find('ul').slideUp('fast'); 
	}); 

});


//报系下拉
$(document).ready(function() {
		
	$(".baoxi").bind('mouseover',function() // 顶级菜单项的鼠标移入操作 
	{  	
		$(this).find('ul').slideDown('fast');
	}).bind('mouseleave',function() // 顶级菜单项的鼠标移出操作 
	{  
		$(this).find('ul').slideUp('fast'); 
	}); 
	 
	$('.baoxi li').bind('mouseover',function() // 子菜单的鼠标移入操作 
	{ 
		$(this).find('ul').slideDown('fast'); 
	}).bind('mouseleave',function() // 子菜单的鼠标移出操作 
	{  
		$(this).find('ul').slideUp('fast'); 
	}); 

});

//广告置标
$(document).ready(function() {
	$(".ad").find('img').each(function(){		
		$(this).after('<span class="ad_tap" style="font-size:8px; line-height:15px;height:15px; color:#999999; position:absolute; right:5px; bottom:5px; border:1px solid #999999; padding:0px 2px;border-radius:2px">广告</span>');
		
	});
	$(".anner_c").find('.ad_tap').each(function(){		
		$(this).hide();	
	});
	$(".no_tap").find('.ad_tap').each(function(){		
		$(this).hide();	
	});
});

//新版列表页面的页码处理
$(document).ready(function() {
	
//var pages = 30; //总页数
//var current = 1; //当前页码
//var list_count=10; //前后预留的页码数量（不包含“上一页”，“下一页”，“第一页”，“最后一页”）

var pages = $(".pages").attr("pages");
var current = $(".pages").attr("current");
var list_count = 7;

init(current);

if(pages>=100)
{
	list_count = 5;
}
if(pages>list_count)
{
	if(current<=list_count)
	{
		for(i=eval(parseInt(list_count)+1);i<pages;i++)
		{
			$(".page"+i).hide();			
		}
		showTail(parseInt(current),parseInt(list_count),pages);
	}
	else
	{

		for(i=2;i<eval(parseInt(current)-(parseInt(list_count)-1)/2);i++)
		{			

			$(".page"+i).hide();				
		}
		for(i=eval(parseInt(current)+(parseInt(list_count)-1)/2+1);i<pages;i++)
		{

			$(".page"+i).hide();			
		}

		showHead(current,list_count);
		showTail(current,list_count,pages);
	}
	
}


	function init(current)
	{
		$(".pages .page").removeClass("page-active");
		$(".pages .page"+current).addClass("page-active");
		$(".page-previous").hide()
		$(".page-next").hide()
		$(".page-previous a").text("上页")
		$(".page-next a").text("下页");
		
	}

	function showHead(c,l)
	{	
		
		if(parseInt(c)>=parseInt(l)){
			$(".page2").text("...");
			$(".page2").attr("href","javascript:void(0);");
			$(".page2").show()
		}
		$(".page-previous").show()
		$(".page1").show()
		
	}
	function showTail(c,l,p)
	{		

		if(eval(parseInt(p)-parseInt(c))>=eval(parseInt(l-1)/2))
		{
			$(".page"+eval(p-1)).text("...");
			$(".page"+eval(p-1)).attr("href","javascript:void(0);");
			$(".page"+eval(p-1)).show()
		}
		$(".page"+eval(p)).show()
		$(".page-next").show()
	}


});

/* resizeImage {*/
$(document).ready(function() {
    $('.Detail_Content .content img').each(function() {
        var imgobj = $(this);
        var imgw = 0;
        var imgh = 0;
        console.log($(imgobj).attr("src"));

        $(imgobj).css("width", "90%").css("height", "auto");

        if ($(imgobj).attr("width")) {
            $(imgobj).attr("width", "90%")
        }
        if ($(imgobj).attr("height")) {
            $(imgobj).attr("height", "auto")
        }
        $("<img />").attr("src", $(imgobj).attr("src")).on("load", function() {
            imgw = this.width;
            imgh = this.height;
            console.log("imgw:" + imgw + ',' + "imgh:" + imgh);
            console.log("imgw1:" + imgw + ',' + "imgh1:" + imgh);
            if (imgw < 100) {
                console.log("imgw2:" + imgw + ',' + "imgh2:" + imgh);
                $(imgobj).css("width", "auto").css("height", "auto");
                if ($(imgobj).attr("width")) {
                    $(imgobj).attr("width", "auto");
                }
                if ($(imgobj).attr("height")) {
                    $(imgobj).attr("height", "auto");
                }
            }
        });

    });
    /*修复附件的icon*/
    $('.Detail_Content .contentFiles').each(function() {
        $(this).siblings("img").css("width", "auto");
        $(this).siblings("img").css("height", "auto");
    });
    $('.Detail_Content .att_icon').each(function() {
        $(this).css("width", "auto");
        $(this).css("height", "auto");
    });

});
/* resizeImage }*/
/* ShowVideoPoser {*/
$('.Detail_Content .content video').each(function() {
    if($(this).attr("picpath")) {
            $(this).attr("poster", $(this).attr("picpath"))
        }
});
/* ShowVideoPoser }*/

/* 修复embed 标签中src的路径https 改回http {*/
$(".edui-faked-video").each(function() {
    var embed_src=$(this).attr("src");
    if(embed_src)
    {
        embed_src = embed_src.replace("src=https://v.cqn.com.cn/vod/","src=http://v.cqn.com.cn/vod/");
        $(this).attr("src",embed_src);
    }
});
/* 修复embed 标签中src的路径https 改回http}*/
