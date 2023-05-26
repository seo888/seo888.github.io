$(".dahao").attr("title", "放大字体").attr("role","button").attr("aria-label","放大字体");
$(".xiaohao").attr("title", "缩小字体").attr("role","button").attr("aria-label","缩小字体");
$(".fenxiang").attr("title", "分享到:").attr("role","button").attr("aria-label","分享到:");
$(".dayin").attr("title", "打印");
$("div.container.container_main > div.contain_main_pic > div .group_list_pic img").attr("alt","古代中国之青铜器");
$(".z_cen_wntj_list_bq_lm img").attr("alt","分享到:");

$(".col-xs-12").each(function () {
    $(this).find(".think_tank .think_img img").attr("alt",$(this).find(".think_tank_tit a").text());
})
//视频处理
$("img[src='http://img.qianlong.com/templates/qianlong/common/images/logo_zhibo.png']").attr("alt", "千龙视频");

$("div.container").each(function () {
	$(this).find(".addon-video #vodPlayer video").attr("title",$(this).find("h1").text());
})

$(".mainContent").each(function () {
	$(this).find(".addon-video #vodPlayer video").attr("title",$(this).find("h1").text());
})
//非文本
$(".bd_close").attr("alt", "关闭");
$(".s_pc_zfenx img").attr("alt", "分享到:");
$(".row .span4 .list8 li").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("a:eq(1)").text());
})
$("#myCarousel1 .carousel-inner .item").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("div h4").text());
})
$(".beijing .span4 .media-list li").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("div a").text());
})
$(".row .span8 .media-list .media").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("div a").text());
})
$(".container:eq(4) li").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("a:eq(1)").text());
})
$(".span12 .list_12 li").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("p").text());
})
$("#myCarousel1 .carousel-inner .item").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("div h4").text());
})
$("#py .span4 .lm3 .carousel-inner .item").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("div h4").text());
}) 
$("#xmj .row .span8 .carousel-inner .item").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("div h4").text());
})   
$("#xmj .span8 .media-list li").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("a:eq(1)").text());
}) 
$("#xmj .span4 .list8 li").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("a:eq(1)").text());
}) 
$("#xmj  .row .media-list:eq(2) li").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("div a:eq(1)").text());
})  
$("#xmj  .row .list18 li").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("a:eq(1)").text());
}) 
$(".span8 #lm1 .list4 .carousel-inner .item").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("div h4").text());
})  
$(".span4:eq(1) li").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("a:eq(1)").text());
})
$(".list17 li").each(function () {
	$(this).find("img").attr("alt",$(this).find(".long a").text());
})
$("#zhuanti .wrap .row .span12 ul li").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find(".media-body a").text());
})
$("#zhuanti .wrap .row .span12 ul li").each(function () {
	$(this).find(".pull-right img").attr("alt",$(this).find(".media-body a").text());
})
$("#f-622 li").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("a:eq(1)").text());
})
$("#f-2476 li").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("a:eq(1)").text());
})
$("#w-0180-c ul li").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("a:eq(1)").text());
})
$(".publish_demo").each(function () {
    $(this).find("img:eq(1)").attr("alt",$(this).find(".publish_demo_tit").text());
})
$("#myCarousel1 div").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("h4").text());
})
$(".bg3 .in11").each(function () {
	$(this).find("img").attr("alt",$(this).find("a").text());
})
$(".bg7 li").each(function () {
	$(this).find("img").attr("alt",$(this).find("p").text());
})
$("#lm5 li").each(function () {
	$(this).find("img").attr("alt",$(this).find("a").text());
})
$("#lm3 li").each(function () {
	$(this).find("img").attr("alt",$(this).find("p").text());
})
$("#lm4 li").each(function () {
	$(this).find("img").attr("alt",$(this).find("p").text());
})
$(".carousel-inner:eq(1) li").each(function () {
	$(this).find("img").attr("alt",$(this).find("a").text());
})
$("#jquery_jplayer").find("img").attr("alt",$(".jp-playlist-current:eq(0)").find("a").text()); 

$(".pin_demo").each(function () {
    $(this).find("img:eq(0)").attr("alt",$(this).find("a:eq(1)").text());
})
 $(".pin_flag img").attr("alt", "分享到:");
$(window, document, "body").scroll(function(event) {
    var wScrollY = $("html,body").scrollTop();
    var newwInnerH = document.documentElement.clientWidth
    var bScrollH = document.body.scrollHeight - 837;
    if (wScrollY + newwInnerH >= bScrollH) {         
        $(".pin_flag img").attr("alt", "分享到:");
        $(".pin_demo").each(function () {
            $(this).find("img:eq(0)").attr("alt",$(this).find("a:eq(1)").text());
        })
    }
});

$(".z_cen_box").each(function () {
	$(this).find("p:eq(16) img").attr("alt",$(this).find("p:eq(17)").text());
})
$(".z_cen_box").each(function () {
	$(this).find("p:eq(13) img").attr("alt",$(this).find("p:eq(14)").text());
})
$(".z_cen_box").each(function () {
	$(this).find("p:eq(10) img").attr("alt",$(this).find("p:eq(11)").text());
})

$(".z_cen_box").each(function () {
	$(this).find("p:eq(6) img").attr("alt",$(this).find("p:eq(7)").text());
})
$(".z_cen_box").each(function () {
	$(this).find("p:eq(3) img").attr("alt",$(this).find("p:eq(4)").text());
})
$(".z_cen_box").each(function () {
	$(this).find("p:eq(0) img").attr("alt",$(this).find("p:eq(1)").text());
})

$(".s_pc_rdjx_box").each(function () {
	$(this).find(".s_pc_rdjx_img img").attr("alt",$(this).find("h3").text());
})
$(".row:eq(18)").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("a:eq(1) div").text());
})
$(".swiper-wrapper:eq(5) .swiper-slide").each(function () {
    $(this).find("a:eq(0) img").attr("alt",$(this).find("a:eq(1)").text());
})
$(".col-xs-12:eq(47)").each(function () {
    $(this).find("img:eq(0)").attr("alt",$(this).find(".express_shadow a:eq(0)").text());
})
$(".m_hot_demo").each(function () {
    $(this).find(".col-xs-4 img").attr("alt",$(this).find(".col-xs-8 a:eq(0)").text());
})
$(".recommend_demo:eq(5)").each(function () {
    $(this).find(".think_tank_flag img").attr("alt",$(this).find("a").text());
})
$(".recommend_demo:eq(10)").each(function () {
    $(this).find(".think_tank_flag img").attr("alt",$(this).find("a").text());
})
$(".recommend_demo:eq(16)").each(function () {
    $(this).find(".think_tank_flag img").attr("alt",$(this).find("a").text());
})
$(".col-xs-6:eq(8)").each(function () {
    $(this).find("img").attr("alt",$(this).find(".express_shadow a").text());
})
$(".publish_demo").each(function () {
    $(this).find("img").attr("alt",$(this).text());
})
$(".s_pc_ztbd").each(function () {
	$(this).find("img").attr("alt",$(this).find("h3").text());
})
$(".s_pc_jxsp_box").each(function () {
	$(this).find(".s_pc_jxsp_list img").attr("alt",$(this).find(".s_pc_jxsp_wt_title h2:eq(0)").text());
})
$(".s_pc_jxsp_wt").each(function () {
	$(this).find("h2 span img").attr("alt",$(this).find(".s_pc_jxsp_wt_title h2 a").text());
})
$(".s_pc_datu_box").each(function () {
	$(this).find("img").attr("alt",$(this).find("h3").text());
})

$(".s_pc_xiaotu_box_li").each(function () {
	$(this).find("img").attr("alt",$(this).find("h3").text());
})
$(".sj_cen_box .sj_cen_list").each(function () {
	$(this).find(".sj_cen_list_img img").attr("alt",$(this).find(".sj_cen_list_title a:eq(0)").text());
})

$(".zw_demo").each(function () {
    $(this).find(".think_img img").attr("alt",$(this).find("a").text());
})
$(".swiper-wrapper:eq(2) .swiper-slide").each(function () {
	$(this).find("a:eq(0) img").attr("alt",$(this).find("a:eq(1)").text());
})	
$(".bds_more").attr("title", "more");

$(".col-xs-12").each(function () {
	$(this).find(".pin_demo img:eq(0)").attr("alt",$(this).find(".pin_demo a:eq(1)").text());
})
$(window, document, "body").scroll(function(event) {
    var wScrollY = $("html,body").scrollTop();
    var newwInnerH = document.documentElement.clientWidth
    var bScrollH = document.body.scrollHeight - 837;
    if (wScrollY + newwInnerH >= bScrollH) {
		$(".col-xs-12").each(function () {
	        $(this).find(".pin_demo img:eq(0)").attr("alt",$(this).find(".pin_demo a:eq(1)").text());
        })    
    }
});



$(".s_pc_rdph_box_yt").each(function () {
	$(this).find(".s_pc_rdph_box_yt_img img").attr("alt",$(this).find(".s_pc_rdph_box_yt_title a:eq(0)").text());
})
$(".s_pc_pdtj_box").each(function () {
	$(this).find(".s_pc_pdtj_box_xt_img img").attr("alt",$(this).find(".s_pc_pdtj_box_xt_text a:eq(0)").text());
})
$(".s_pc_pdtj_box_dt").each(function () {
	$(this).find(".s_pc_pdtj_box_dt_img img").attr("alt",$(this).find(".s_pc_pdtj_box_dt_text a:eq(0)").text());
})


$(".z_cen_wntj_list").each(function () {
	$(this).find(".z_cen_wntj_list_img img").attr("alt",$(this).find(".z_cen_wntj_list_title a:eq(0)").text());
})
$(window, document, "body").scroll(function(event) {
    var wScrollY = $("html,body").scrollTop();
    var newwInnerH = document.documentElement.clientWidth
    var bScrollH = document.body.scrollHeight - 837;
    if (wScrollY + newwInnerH >= bScrollH) {
$(".z_cen_wntj_list").each(function () {
	$(this).find(".z_cen_wntj_list_img img").attr("alt",$(this).find(".z_cen_wntj_list_title a:eq(0)").text());
})
 }
});





$(".list16 li").each(function () {
	$(this).find("img").attr("alt",$(this).find("a:eq(1)").text());
})
$(".m_hot_demo").each(function () {
	$(this).find(".col-xs-4 img").attr("alt",$(this).find(".col-xs-8 a:eq(0)").text());
})
$(".s_pc_24bd_box_yt").each(function () {
	$(this).find(".s_pc_24bd_box_img img").attr("alt",$(this).find(".s_pc_24bd_box_cen a").text());
})
$("#commBlock2 .media").each(function () {
	$(this).find(".pull-left img").attr("alt",$(this).find(".media-body a:eq(0)").text());
})
$(".part2 .contain_main_pic .main_pic_list").each(function () {
	$(this).find(".pic_list_style img").attr("alt",$(this).find(".pic_list_desc p").text());
})
$(".boxL #user_name").attr("title","请输入账号");
$(".boxL #user_password").attr("title","请输入密码");


$(".channelLogo").attr("alt","千龙网");
$(".s_pc_logo img").attr("alt","千龙网");
$(".bdimgshare-content a").attr("title", "图片分享");
$(".ministries:eq(0)").attr("title", "中央政府和国家部委网站");
$(".ministries:eq(1)").attr("title", "市政府机构网站");
$(".ministries:eq(2)").attr("title", "各区政府网站");
$(".ministries:eq(3)").attr("title", "北京新闻媒体网站");
$("img[src='http://img.qianlong.com/ql2019/index/images/head.png']").attr("alt", "头条");
$("#focus_open").attr("alt", "展开");
$("#focus_close").attr("alt", "隐藏");
$("a[href='http://zhibo.qianlong.com/2021/0922/6312741.shtml']").attr("title", "中国农民丰收节");
$(".loading").attr("title", "加载");
$(".tool_title img").attr("title", "分享到:");
$(".s_ding").attr("title", "返回顶部");

$(".s_pc_rdjx_cen_bq img").attr("title", "分享到:");
$("img[src='http://upload.qianlong.com/2020/0731/1596159390153.jpg']").attr("alt", "北京市人民政府新闻发布会");
$("img[src='http://upload.qianlong.com/2020/0724/1595583057232.jpg']").attr("alt", "委员听民意");
$("img[src='http://upload.qianlong.com/2021/0517/1621220746890.png']").attr("alt", "委员讲堂");
$("img[src='http://upload.qianlong.com/2021/0602/1622623163486.jpg']").attr("alt", "健康北京 一起行动");
$("img[src='http://img.qianlong.com/qianlong_img/xqlogo1.png']").attr("alt", "千龙网");
$("img[src='http://img.qianlong.com/templates/qianlong/common/images/logo_www.png']").attr("alt", "千龙网");
$("img[src='https://changyan.sohu.com/upload/asset/scs/images/pic/pic42_null.gif']").attr("alt", "图片");
$(".function-face-w a").attr("title", "上传图片");
$("img[src='http://img.qianlong.com/ql2019/list/images/pc_zw_ss1.png']").attr("alt", "搜索");
$("img[src='http://upload.qianlong.com/2021/0327/1616813524929.png']").attr("alt", "中信银行");
$("img[src='http://img.qianlong.com/ql2019/index/images/fwxm.png']").attr("alt", "服务项目");
$("img[src='http://img.qianlong.com/ql2019/index/images/sn.png']").attr("alt", "京彩三农");
$(".pg_prev").attr("title","上一个");
$(".pg_next").attr("title","下一个");
$(".swiper-button-prev").attr("aria-label","上一个");
$(".swiper-button-next").attr("aria-label","下一个");
$("img[src='http://upload.qianlong.com/2020/0206/1580960239312.jpg']").attr("alt", "【专题】抗击疫情 党旗飘扬");
$("img[src='http://img.qianlong.com/ql2019/index/images/logo2.png']").attr("alt", "千龙网");
$("img[src='http://upload.qianlong.com/2021/0903/1630632610570.jpg']").attr("alt", "京彩网络正能量");
$("img[src='http://img.qianlong.com/ql2019/index/images/guangao1.png']").attr("alt", "新京报APP");
$("img[src='http://img.qianlong.com/qianlong_img/1.png']").attr("alt", "京ICP证000032号");
$("img[src='http://img.qianlong.com/qianlong_img/3.png']").attr("alt", "诚信网站");
$("img[src='http://img.qianlong.com/qianlong_img/12377.jpg']").attr("alt", "网上有害信息举报专区");
$("img[src='http://img.qianlong.com/qianlong_img/4.png']").attr("alt", "北京互联网举报中心");
$("img[src='http://img.qianlong.com/qianlong_img/5.png']").attr("alt", "网络110报警服务");
$("img[src='http://img.qianlong.com/qianlong_img/7.png']").attr("alt", "传漾");
$("img[src='http://img.qianlong.com/ql2019/list/images/1.png']").attr("alt", "京ICP证000032号");
$("img[src='http://img.qianlong.com/ql2019/list/images/3.png']").attr("alt", "诚信网站");
$("img[src='http://img.qianlong.com/ql2019/list/images/12377.jpg']").attr("alt", "中国互联网违法和不良信息举报中心");
$("img[src='http://img.qianlong.com/ql2019/list/images/4.png']").attr("alt", "北京互联网举报中心");
$("img[src='http://img.qianlong.com/ql2019/list/images/5.png']").attr("alt", "网络110报警服务");
$("img[src='http://img.qianlong.com/ql2019/list/images/7.png']").attr("alt", "传漾");
$("img[src='http://img.qianlong.com/ql2019/list/images/pc_loggo3.png']").attr("alt", "千龙网");
$("img[src='http://img.qianlong.com/ql2019/list/images/guanggao2.png']").attr("alt", "新京报APP");
$("img[src='http://upload.qianlong.com/2019/0606/1559785525605.jpg']").attr("alt", "美丽春天青年演员擂台赛");
$("img[src='http://upload.qianlong.com/2019/0520/1558320131547.jpg']").attr("alt", "过昭关不得不过的关");
$("img[src='http://upload.qianlong.com/2019/0520/1558319836689.jpg']").attr("alt", "化水自带诡异气氛");
$("img[src='http://upload.qianlong.com/2019/0429/1556503265754.jpg']").attr("alt", "孩子不知自己的生存价值");
$("img[src='http://upload.qianlong.com/2019/0410/1554865727179.jpg']").attr("alt", "北京剧院40年的生意经");
$("img[src='http://upload.qianlong.com/2019/0402/1554173095759.jpg']").attr("alt", "进村的当代艺术既近且远");
$("img[src='http://upload.qianlong.com/2019/0401/1554081263214.jpg']").attr("alt", "林怀民谈退休后的舞团");
$("img[src='http://upload.qianlong.com/2019/0328/1553751078603.jpg']").attr("alt", "特色书屋伴你读书到春深");


$(".container").each(function () {
	$(this).find(".row .span8 .article-content .firstRow img").attr("alt",$(this).find(".row .span12 h1").text());
})

$("img").removeAttr("title");
$("img[src='http://img.qianlong.com/templates/qianlong/common/images/logo_v.png']").attr("alt", "千龙视频");
$("img[src='http://img.qianlong.com/templates/qianlong/common/images/logo_thinktank.png']").attr("alt", "千龙智库");
$("img[src='http://upload.qianlong.com/2015/1119/1447921750171.jpg']").attr("alt", "生产真知灼见");
$("img[src='http://upload.qianlong.com/2020/0610/1591770081104.png']").attr("alt", "委员听民意");
$("img[src='http://upload.qianlong.com/2020/0731/1596177282119.jpg']").attr("alt", "委员听民意");
$("img[src='http://img.qianlong.com/ql2019/list/images/jcsn.png']").attr("alt", "京彩三农");
$("img[src='http://img.qianlong.com/templates/qianlong/zhongguancun/img/zgc_1.jpg']").attr("alt", "一区十六园");
$("img[src='http://upload.qianlong.com/2021/0312/1615519437224.png']").attr("alt", "中关村丰台园创新中心项目建设完成在即");
$("img[src='http://upload.qianlong.com/2021/0325/1616650459554.jpg']").attr("alt", "用“AI”续写创新故事，百度在香港二次上市");
$("img[src='http://upload.qianlong.com/2018/1116/1542358969235.jpg']").attr("alt", "热线84686999");
$("img[src='http://img.qianlong.com/templates/qianlong/py/img/title6.png']").attr("alt", "人民网");
$("img[src='http://upload.qianlong.com/2018/1116/1542358991248.jpg']").attr("alt", "中国互联网联合辟谣平台");
$("img[src='http://img.qianlong.com/templates/qianlong/py/img/title7.png']").attr("alt", "CNR");
$("img[src='http://upload.qianlong.com/2018/1122/thumb_284_152_1542865000312.jpg']").attr("alt", "小视频成谣言传播新渠道");
$("img[src='http://img.qianlong.com/templates/qianlong/py/img/topBanner.png']").attr("alt", "北京地区网站联合辟谣平台");
$("img[src='http://img.qianlong.com/templates/qianlong/py/img/topBanner_small.png']").attr("alt", "北京地区网站联合辟谣平台");
$("img[src='http://upload.qianlong.com/2018/0323/thumb_1200_100_1521784665213.jpg']").attr("alt", "网络素养学院");
$("img[src='http://upload.qianlong.com/2020/0602/1591069172872.jpg']").attr("alt", "物业如何让百姓安居乐业");
$("img[src='http://upload.qianlong.com/2020/0602/1591069515547.jpg']").attr("alt", "青春蓬勃力量");
$("img[src='http://upload.qianlong.com/2020/0602/1591068965656.jpg']").attr("alt", "抗击疫情");
$("img[src='http://upload.qianlong.com/2020/0602/1591069485440.jpg']").attr("alt", "书香飘京城~悦读颂小康");
$("img[src='http://upload.qianlong.com/2020/0826/thumb_750_60_1598427001735.png']").attr("alt", "2020年度委员听民意");
$("img[src='http://img.qianlong.com/templates/qianlong/FM/images/big-title.png']").attr("alt", "千龙FM");

$("img[src='http://upload.qianlong.com/2019/0627/thumb_285_160_1561603205802.jpg']").attr("alt", "知己知彼 打好网络诈骗“预防针”");
$("img[src='http://upload.qianlong.com/2019/0627/thumb_285_160_1561603515875.jpg']").attr("alt", "网络投票套路详解");

$("img[src='http://img.qianlong.com/templates/qianlong/common/images/logo.png']").attr("alt", "千龙网");
$("img[src='http://img.qianlong.com/templates/qianlong/aboutus/images/qlw1.png']").attr("alt", "千龙网");
$("img[src='http://img.qianlong.com/templates/qianlong/www/css/img/logo_a.jpg']").attr("alt", "京ICP证");
$("img[src='http://img.qianlong.com/templates/qianlong/www/css/img/logo_c.jpg']").attr("alt", "诚信网站");
$("img[src='http://img.qianlong.com/templates/qianlong/www/css/img/12377.jpg']").attr("alt", "12377");
$("img[src='http://img.qianlong.com/templates/qianlong/www/css/img/logo_d.jpg']").attr("alt", "北京互联网举报中心");
$("img[src='http://img.qianlong.com/templates/qianlong/www/css/img/logo_e.jpg']").attr("alt", "网络110报警服务");
$("img[src='http://img.qianlong.com/templates/qianlong/www/css/img/logo_g.jpg']").attr("alt", "传漾");
$("img[src='http://img.qianlong.com/templates/qianlong/www/css/img/jb.png']").attr("alt", "网上有害信息举报专区");

$("img[src='http://upload.qianlong.com/2017/1120/1511142394747.jpg']").attr("alt", "北京市人民政府新闻发布会");
$("img[src='http://upload.qianlong.com/2019/0122/1548149674814.jpg']").attr("alt", "听丰");
$("img[src='http://upload.qianlong.com/2021/0512/1620791014748.png']").attr("alt", "委员讲堂");
$("img[src='http://img.qianlong.com/templates/qianlong/common/images/logo_qlyc.png']").attr("alt", "千龙原创");

$("img[src='http://upload.qianlong.com/2020/0903/1599116215809.jpg']").attr("alt", "中关村论坛");
$("img[src='http://upload.qianlong.com/2015/0724/1437700253661.jpg']").attr("alt", "中关村");
$("img[src='mid/c2d32d8333661a46d3259350b8471b65.jpg']").attr("alt", "影展");
$("img[src='mid/9a298b92479764d7281305702d69ee4e.jpg']").attr("alt", "抗击疫情");
$("img[src='mid/3773bda9d4e5aa8ed7df651172a42b56.jpg']").attr("alt", "花开盛世");
$("img[src='mid/20c7f51e55fa462c31383e504101eac5.jpg']").attr("alt", "嗨玩北京");
$("img[src='img/logo3.png']").attr("alt", "千龙网");
$("img[src='img/logo.png']").attr("alt", "千龙图像库");

//焦点顺序
	var focusTags="a,input,textarea,area,img,.dahao,.xiaohao,.fenxiang";
    $(focusTags).focus(function () {
        this.style.setProperty("outline","2px auto black","important");
    });
    $(focusTags).blur(function () {
        $(this).css({
          "outline": "0px black"
        });
    });
  
function esdJumpNodeTagLwLb(NodeElement,LastFunc,NextFunc){
    NodeElement.keydown(function (e) {
      if (e.shiftKey && e.keyCode == 9) {
        LastFunc()
        return false;
      }
      if (e.keyCode == 9) {
        NextFunc();
        return false;
      }
    });
}

//千龙图库 注册> 摄影师
$("#username").attr("title","用户名");
$("#password1").attr("title","密码");
$("#password2").attr("title","验证密码");
$("#realname").attr("title","真实姓名");
$("#company").attr("title","工作单位");
$("#tel").attr("title","手机");
$("#email").attr("title","电子邮件");
$("#address").attr("title","通信地址");
$("#link").attr("title","作品链接");
$("#note").attr("title","备注");
$(".webuploader-element-invisible").attr("title","点击选择图片");
$(".formfield:eq(7)").attr("title","固定电话");

if(window.location.href.toLowerCase().indexOf("tuku.qianlong.com")>-1){
    $("#search-submit").attr("role","button").attr("aria-label","搜索");  
    $("#search-advanced-submit").attr("role","button").attr("aria-label","高级搜索");  
}

if(window.location.href=="http://tuku.qianlong.com/index/wregister?flag=agree&type=p"){
	window.tukuEsdInterval = setInterval(function(){
	    if($("#filePicker label").length>0){
	        clearInterval(window.tukuEsdInterval);
	        $("#filePicker label").attr("role","button").attr("aria-label","点击选择图片");  
	    }
	},500)
}
if($(".s_nav_content_top span").html()!=undefined&&$(".s_nav_content_top span").html().toLowerCase()=="x"){
    $(".s_nav_content_top span").attr("role","button").attr("aria-label","关闭");
}

