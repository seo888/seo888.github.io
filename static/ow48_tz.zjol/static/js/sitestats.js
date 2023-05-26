// MLF stat begin
(function() {
	var ta_mp_map = {};

	ta_mp_map["www.zjol.com.cn"] = 1; //浙江在线
	ta_mp_map["zjnews.zjol.com.cn"] = 2; //浙江新闻
	ta_mp_map["s.zjol.com.cn"] = 4; //浙江在线搜索
	//9个地市分社
	ta_mp_map["hangzhou.zjol.com.cn"] = 6; //杭州在线
	ta_mp_map["nb.zjol.com.cn"] = 7; //宁波在线
	ta_mp_map["jx.zjol.com.cn"] = 8; //嘉兴新闻
	ta_mp_map["sx.zjol.com.cn"] = 9; //绍兴新闻
	ta_mp_map["jinhua.zjol.com.cn"] = 10; //金华新闻
	ta_mp_map["qz.zjol.com.cn"] = 208; //衢州新闻
	ta_mp_map["zsxq.zjol.com.cn"] = 12; //舟山新区网
	ta_mp_map["tz.zjol.com.cn"] = 13; //台州新闻
	ta_mp_map["lstk.zjol.com.cn"] = 14; //丽水新闻
	//各县分社、其他频道
	ta_mp_map["nhnews.zjol.com.cn"] = 15; //南湖新闻网
	ta_mp_map["jxxznews.zjol.com.cn"] = 16; //秀洲新闻网
	ta_mp_map["txnews.zjol.com.cn"] = 17; //桐乡新闻网
	ta_mp_map["hnnews.zjol.com.cn"] = 18; //海宁新闻网
	ta_mp_map["hyxww.zjol.com.cn"] = 19; //海盐新闻网
	ta_mp_map["ph2009.zjol.com.cn"] = 20; //平湖新闻网
	ta_mp_map["jsxww.zjol.com.cn"] = 21; //嘉善新闻网
	ta_mp_map["dqnews.zjol.com.cn"] = 22; //德清新闻网
	ta_mp_map["ajnews.zjol.com.cn"] = 23; //安吉新闻网
	ta_mp_map["cxnews.zjol.com.cn"] = 24; //长兴新闻网
	ta_mp_map["wxnews.zjol.com.cn"] = 25; //吴兴新闻网
	ta_mp_map["nxnews.zjol.com.cn"] = 26; //南浔新闻网
	ta_mp_map["zgkqw.zjol.com.cn"] = 27; //柯桥新闻网
	ta_mp_map["synews.zjol.com.cn"] = 28; //上虞新闻网
	ta_mp_map["sznews.zjol.com.cn"] = 29; //嵊州新闻网
	ta_mp_map["xcnews.zjol.com.cn"] = 30; //新昌新闻网
	ta_mp_map["hynews.zjol.com.cn"] = 31; //黄岩新闻网
	ta_mp_map["jjnews.zjol.com.cn"] = 32; //椒江新闻网
	ta_mp_map["luqiao.zjol.com.cn"] = 33; //路桥新闻网
	ta_mp_map["lhnews.zjol.com.cn"] = 34; //临海新闻网
	ta_mp_map["wlnews.zjol.com.cn"] = 35; //温岭新闻网
	ta_mp_map["yhnews.zjol.com.cn"] = 36; //玉环新闻网
	ta_mp_map["xjnews.zjol.com.cn"] = 38; //仙居新闻网
	ta_mp_map["ttnews.zjol.com.cn"] = 39; //天台新闻网
	ta_mp_map["jhwcw.zjol.com.cn"] = 40; //婺城新闻网
	ta_mp_map["jdnews.zjol.com.cn"] = 41; //金东新闻网
	ta_mp_map["lxnews.zjol.com.cn"] = 43; //兰溪新闻网
	ta_mp_map["dynews.zjol.com.cn"] = 44; //东阳新闻网
	ta_mp_map["wynews.zjol.com.cn"] = 45; //武义新闻网
	ta_mp_map["yknews.zjol.com.cn"] = 46; //永康新闻网
	ta_mp_map["pjnews.zjol.com.cn"] = 47; //浦江新闻网
	ta_mp_map["panews.zjol.com.cn"] = 48; //磐安新闻网
	ta_mp_map["qtnews.zjol.com.cn"] = 49; //青田新闻网
	ta_mp_map["lqnews.zjol.com.cn"] = 50; //龙泉新闻网
	ta_mp_map["qynews.zjol.com.cn"] = 51; //庆元新闻网
	ta_mp_map["zgyhnews.zjol.com.cn"] = 52; //云和新闻网
	ta_mp_map["syxww.zjol.com.cn"] = 53; //松阳新闻网
	ta_mp_map["scnews.zjol.com.cn"] = 54; //遂昌新闻网
	ta_mp_map["jynews.zjol.com.cn"] = 55; //缙云新闻网
	ta_mp_map["jnnews.zjol.com.cn"] = 56; //景宁新闻网
	ta_mp_map["khnews.zjol.com.cn"] = 57; //开化新闻网
	ta_mp_map["jsnews.zjol.com.cn"] = 58; //江山新闻网
	ta_mp_map["lynews.zjol.com.cn"] = 59; //龙游新闻网
	ta_mp_map["csnews.zjol.com.cn"] = 60; //常山新闻网
	ta_mp_map["kcnews.zjol.com.cn"] = 61; //柯城新闻网
	ta_mp_map["qjnews.zjol.com.cn"] = 62; //衢江新闻网
	ta_mp_map["dhnews.zjol.com.cn"] = 63; //定海新闻网
	ta_mp_map["ptnews.zjol.com.cn"] = 64; //普陀新闻网
	ta_mp_map["dsnews.zjol.com.cn"] = 65; //岱山新闻网
	ta_mp_map["ssnews.zjol.com.cn"] = 66; //嵊泗新闻网
	ta_mp_map["ohnews.zjol.com.cn"] = 67; //瓯海新闻网
	ta_mp_map["zjrb.zjol.com.cn"] = 69; //浙江日报
	ta_mp_map["qjwb.zjol.com.cn"] = 70; //钱江晚报
	ta_mp_map["jrzb.zjol.com.cn"] = 71; //今日早报
	ta_mp_map["msb.zjol.com.cn"] = 72; //美术报
	ta_mp_map["zjlnb.zjol.com.cn"] = 73; //浙江老年报
	ta_mp_map["zjfzb.zjol.com.cn"] = 74; //浙江法制报
	ta_mp_map["gcdy.zjol.com.cn"] = 75; //共产党员
	ta_mp_map["rarb.zjol.com.cn"] = 80; //瑞安日报
	ta_mp_map["wldaily.zjol.com.cn"] = 84; //温岭日报
	ta_mp_map["js.zjol.com.cn"] = 86; //浙江即时报
	ta_mp_map["ent.zjol.com.cn"] = 87; //文娱频道
	ta_mp_map["py.zjol.com.cn"] = 88; //浙江辟谣网
	ta_mp_map["china.zjol.com.cn"] = 89; //时政频道
	ta_mp_map["opinion.zjol.com.cn"] = 91; //评论频道
	ta_mp_map["fabu.zjol.com.cn"] = 92; //浙江发布网络平台
	ta_mp_map["mq.zjol.com.cn"] = 93; //浙江民情在线
	ta_mp_map["bbs.zjol.com.cn"] = 94; //浙江在线社区
	ta_mp_map["blog.zjol.com.cn"] = 96; //浙江博客网
	ta_mp_map["photo.zjol.com.cn"] = 97; //浙江在线图片中心
	ta_mp_map["v.zjol.com.cn"] = 98; //浙江视界
	ta_mp_map["biz.zjol.com.cn"] = 99; //浙商网
	ta_mp_map["cs.zjol.com.cn"] = 100; //城市频道
	ta_mp_map["zzhz.zjol.com.cn"] = 101; //住在杭州
	ta_mp_map["gotrip.zjol.com.cn"] = 102; //旅游频道
	ta_mp_map["cz.zjol.com.cn"] = 103; //浙江城镇网
	ta_mp_map["health.zjol.com.cn"] = 104; //健康频道
	ta_mp_map["auto.zjol.com.cn"] = 105; //汽车频道
	ta_mp_map["epmap.zjol.com.cn"] = 106; //环保频道
	ta_mp_map["zjtyol.zjol.com.cn"] = 107; //浙江体育在线
	ta_mp_map["edu.zjol.com.cn"] = 108; //教育频道
	ta_mp_map["art.zjol.com.cn"] = 109; //美术频道
	ta_mp_map["315.zjol.com.cn"] = 110; //消费新闻网
	ta_mp_map["zjsh.zjol.com.cn"] = 111; //书法频道
	ta_mp_map["sy.m.zjol.com.cn"] = 112; //手机浙江网
	ta_mp_map["water.zjol.com.cn"] = 113; //浙江水网
	ta_mp_map["zs.zjol.com.cn"] = 114; //浙江招商网
	ta_mp_map["ec.zjol.com.cn"] = 115; //浙江电商网
	ta_mp_map["st.zjol.com.cn"] = 116; //科技频道
	ta_mp_map["zztz.zjol.com.cn"] = 118; //住在台州网
	ta_mp_map["smartzj.zjol.com.cn"] = 119; //智慧浙江网
	ta_mp_map["mpnews.zjol.com.cn"] = 120; //质量频道
	ta_mp_map["yq.zjol.com.cn"] = 121; //浙江舆情网
	ta_mp_map["gk.zjol.com.cn"] = 122; //高考直通车
	ta_mp_map["baby.zjol.com.cn"] = 123; //亲子频道
	ta_mp_map["zjds.zjol.com.cn"] = 124; //地税频道
	ta_mp_map["qiye.zjol.com.cn"] = 125; //企业频道
	ta_mp_map["she.zjol.com.cn"] = 126; //伊人在线
	ta_mp_map["zjflcp.com"] = 128; //浙江福彩
	ta_mp_map["zjlxdj.zjol.com.cn"] = 129; //浙江两新党建
	ta_mp_map["mznews.zjol.com.cn"] = 131; //浙江民政新闻网
	ta_mp_map["culture.zjol.com.cn"] = 132; //人文频道
	ta_mp_map["wjr8.zjol.com.cn"] = 133; //微金融
	ta_mp_map["read.zjol.com.cn"] = 134; //云端魔方书城
	ta_mp_map["mlzj.zjol.com.cn"] = 135; //魅力浙江网

	ta_mp_map["m.guahao.zjol.com.cn"] = 163; //挂号平台移动端
	ta_mp_map["guahao.zjol.com.cn"] = 164; //挂号平台
	ta_mp_map["lsqs.zjol.com.cn"] = 185; //绿水青山
	ta_mp_map["delta.zjol.com.cn"] = 186; //长三角频道
	ta_mp_map["qzlx.zjol.com.cn"] = 187; //浙江群众路线网
	ta_mp_map["zzgz.zjol.com.cn"] = 188; //浙江组织工作网
	ta_mp_map["fxj.zjol.com.cn"] = 189; //钱江警钟
	ta_mp_map["wx.zjol.com.cn"] = 190; //浙江网视
	ta_mp_map["town.zjol.com.cn"] = 191; //浙江城镇
	ta_mp_map["tsxz.zjol.com.cn"] = 192; //浙江特色小镇官网
	ta_mp_map["djt.zjol.com.cn"] = 193; //浙江人文大讲堂
	ta_mp_map["yanjiu.zzhz.com.cn"] = 194; //浙报传媒地产研究院
	ta_mp_map["www.zjftu.org"] = 195; //浙江工会网
	ta_mp_map["huzhou.zjol.com.cn"] = 196; //湖州频道
	ta_mp_map["www.zjzj.org"] = 197; //浙江作家网
	ta_mp_map["visa.zjol.com.cn"] = 198; //浙江签证网
	ta_mp_map["ms.zjol.com.cn"] = 199; //民生频道
	ta_mp_map["pol.zjol.com.cn"] = 200; //浙江新闻政情
	ta_mp_map["fin.zjol.com.cn"] = 201; //浙江新闻经济
	ta_mp_map["wz.zjol.com.cn"] = 203; //温州频道
	ta_mp_map["yj.zjol.com.cn"] = 276; //国企频道
	ta_mp_map["yz.zjol.com.cn"] = 322; //国企频道
	ta_mp_map["guoqi.zjol.com.cn"] = 379; //国企频道

	var currentUrl = document.URL;
	var afterparsedomain = parseDomain(currentUrl);
	var objMpId = ta_mp_map[afterparsedomain];
	var valueMpId = (typeof(objMpId) != "undefined") ? objMpId : 1; // 域名匹配不出来的，都算到浙江在线www里；
	function parseDomain(oneurl) {
		if (oneurl.indexOf('://') > -1) {
			var urlnohttp = oneurl.substring(oneurl.indexOf('://') + 3);
		} else {
			var urlnohttp = oneurl;
		}
		if (urlnohttp.indexOf('/') > -1) {
			return urlnohttp.substring(0, urlnohttp.indexOf('/'));
		} else {
			return urlnohttp;
		}
	}

	(function(para) {
		var w = window,
			n = para.name;
		// 此⾏代码的GetuiData一定不能被替换为别的
		w['GetuiData'] = n;
		w[n] = w[n] || function(a) {
			return function() {
				(w[n]._q = w[n]._q || []).push([a, arguments]);
			}
		};
		var ifs = ['init', 'track', 'autoTrack'];
		for (var i = 0; i < ifs.length; i++) {
			w[n][ifs[i]] = w[n].call(null, ifs[i]);
		}
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.async = true;
		s.src = para.sdk_url;
		var x = document.getElementsByTagName('script')[0];
		w[n].customPara = para;
		x.parentNode.insertBefore(s, x);
	})({
		sdk_url: 'https://cdn-getuigw.getui.com/iopsdk/getuidata.min.js',
		name: 'GetuiDataSDK',
		appId: valueMpId,
		server_url: 'https://bggt.tmuyun.com/iop-ps/sdk/data.gif',
		show_log: true
	});
	GetuiDataSDK.autoTrack()
})();
//MLF stat end



var _hmt = _hmt || [];
(function() {
	var hm = document.createElement("script");
	hm.src = "https://hm.baidu.com/hm.js?a01d013056884fc5ac0c68b0b7198f33";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(hm, s);
})();