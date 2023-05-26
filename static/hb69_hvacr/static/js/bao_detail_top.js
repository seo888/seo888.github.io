
(function () {
	//图片最大个数
	var imgMax = 1;
	var imgUrl = "";
	var imgLink = "";

	//获取图片信息
	function calImgInfo(index) {
		switch (index) {
			case 1:

				//中国品牌榜
				//imgUrl = "https://img1.hvacr.cn/bao/Images/2022-770x100-ppb.jpg";
				//imgLink = "https://t.hvacr.cn/a52";

				//制冷百科品牌专题
				//imgUrl = "https://img1.hvacr.cn/Images/lbh20221212770x100.jpg?rnd=" + Math.random();
				//imgLink = "https://bao.hvacr.cn/202205_2096992.html";

				//技术专题
				//imgUrl = "https://img1.hvacr.cn/images/gskhfzlbk.jpg?rnd=" + Math.random();
				//imgLink = "https://bao.hvacr.cn/202211_2100108.html";

				imgUrl = "https://img1.hvacr.cn/images/zhongguang770.jpg?rnd=" + Math.random();
				imgLink = "https://www.outes.com/";

				break;
			default:
				break;
		}
	}

	//清空图片信息
	function clearImgInfo() {
		imgUrl = "";
		imgLink = ""
	}

	//循环输出
	for (var i = 1; i <= imgMax; i++) {

		//计算图片信息
		calImgInfo(i);

		if (imgUrl == "" || imgLink == "")
			continue;

		//输出
		document.write("	<div class=\"xq_ad position_r\">");
		document.write("	    <a rel=\"nofollow\" href=\"" + imgLink + "\" target=\"_blank\">");
		document.write("		    <img src=\"" + imgUrl + "\">");
		document.write("		</a>");
        document.write("        <span class=\"ad_mark\">广告</span>");
		document.write("	</div>");

		//清空图片信息
		clearImgInfo();
	}
})()