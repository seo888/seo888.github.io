$(function() {
    var category = $("#category").val();
    var str = "";
    str += '<div class="index_nav_child">';
    str += '<div class="index_nav_left">';
    str += '<a href="//www.tom.com" title="TOM首页" id="shouye" >首页</a>';
    str += '<a href="//news.tom.com" title="TOM资讯" id="news" >资讯</a>';
    str += '<a href="//lookin.tom.com/" title="LOOKin" id="LOOKin">LOOKin</a>';
    str += '<a href="//ent.tom.com" title="TOM娱乐" id="ent" >娱乐</a>';
    str += '<a href="//sports.tom.com" title="TOM体育" id="sports">体育</a>';
    str += '<a href="//star.tom.com" title="TOM明星" id="gossip" >明星</a>';
    str += '<a href="//fashion.tom.com" title="TOM时尚" id="fashion">时尚</a>';
    str += '<a href="//game.tom.cn" title="TOM游戏" target="_blank">游戏</a>';
    str += '<a href="//travel.tom.com" id="travel" title="TOM旅游">旅游</a>';
    str += '<a href="//life.tom.com" title="TOM生活" id="life">生活</a>';
    str += '<a href="//baby.tom.com" title="TOM母婴" id="baby">母婴</a>';
    str += '<a href="//marketing.tom.com" title="TOM营销" id="marketing" >营销</a>';
    str += '<a href="//vip.tom.com" title="TOM邮箱" id="mail" target="_blank">邮箱</a>';
    str += '<a href="//biz.tom.com" id="biz" title="TOM商业">商业</a>';
    str += '<a href="//v.tom.com" id="tv" target="_blank" title="TOM视频">视频</a>';
    str += '<a href="//finance.tom.com" id="finance" title="TOM财经">财经</a>';
    str += '<a href="//health.tom.com" id="health" title="TOM健康">健康</a>';
    str += '<a href="//joke.tom.com" id="joke" title="TOM段子">段子</a>';
    str += '<a href="//xiaofei.tom.com" id="xiaofei" title="TOM消费">消费</a>';
    str += '<a href="//car.tom.com" title="TOM汽车" id="car" >汽车</a>';
    str += '<a href="//www.ule.com" title="TOM购物" target="_blank">购物</a>';
    str += '<a href="//tech.tom.com" title="TOM科技" id="tech">科技</a>';
    str += "</div>";
    str += "</div>";
    if (category.indexOf("/hot/") != -1) {
        $("#shouye").addClass("active")
    } else if (category.indexOf("/ent/") != -1) {
        $("#ent").addClass("active")
    } else if (category.indexOf("/car/") != -1 || category.indexOf("/auto/") != -1) {
        $("#car").addClass("active")
    } else if (category.indexOf("/gossip/") != -1) {
        $("#gossip").addClass("active")
    } else if (category.indexOf("/fashion/") != -1) {
        $("#fashion").addClass("active")
    } else if (category.indexOf("/tech/") != -1) {
        $("#tech").addClass("active")
    } else if (category.indexOf("/sports/") != -1) {
        $("#sports").addClass("active")
    } else if (category.indexOf("/baby/") != -1 || category.indexOf("/yyzn/") != -1 || category.indexOf("/product/") != -1 || category.indexOf("/parenting/") != -1) {
        $("#baby").addClass("active")
    } else if (category.indexOf("/life/") != -1 || category.indexOf("/shcs/") != -1 || category.indexOf("/jiaju/") != -1) {
        $("#life").addClass("active")
    } else if (category.indexOf("/news/") != -1) {
        $("#news").addClass("active")
    } else if (category.indexOf("/travel/") != -1 || category.indexOf("/trip/") != -1 || category.indexOf("/lyzx/") != -1) {
        $("#travel").addClass("active")
    } else if (category.indexOf("/biz/") != -1 || category.indexOf("/sycf/") != -1 || category.indexOf("/syzx/") != -1) {
        $("#biz").addClass("active")
    } else if (category.indexOf("/tv/") != -1) {
        $("#tv").addClass("active")
    } else if (category.indexOf("/finance/") != -1 || category.indexOf("/cjsy/") != -1 || category.indexOf("/money/") != -1) {
        $("#finance").addClass("active")
    } else if (category.indexOf("/health/") != -1) {
        $("#health").addClass("active")
    } else if (category.indexOf("/xfzx/") != -1 || category.indexOf("/lxsh/") != -1 || category.indexOf("/xiaofei/") != -1) {
        $("#xiaofei").addClass("active")
    } else if (category.indexOf("/joke/") != -1) {
        $("#joke").addClass("active")
    } else if (category.indexOf("/popular/") != -1) {
        $("#popular").addClass("active")
    }
	
		var infor_time;
		 var infor_type;
		 infor_time=$(".infor_time").text();
		 infor_time = infor_time.replace(/^\s+|\s+$/g,'');
			var news_box_text=$(".news_box_text").text();
		  var infor_time_date=infor_time;
		   infor_time_date = new Date(Date.parse(infor_time_date.replace(/-/g, "/")));
		   infor_time_date = infor_time_date.getTime();
			if(news_box_text.length>0){
				if(news_box_text.indexOf("【TOM】") != -1){
					var docmetit = $(document).attr('title');
					var docmekey= $("meta[name='keywords']").attr("content");
									
					if(docmetit.indexOf("邮箱")>-1  || (docmekey.indexOf("邮箱")>-1 ) ){	
						infor_type="2";
					}else {
						infor_type="1";
					}
					
				}else{
					infor_type="3";
				}
			}	
		  t_article_time=infor_time_date;
		  
			t_article_type=infor_type;
		
		 console.log(infor_type);
});