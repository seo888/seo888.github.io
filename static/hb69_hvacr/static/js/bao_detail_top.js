
(function () {
	//ͼƬ������
	var imgMax = 1;
	var imgUrl = "";
	var imgLink = "";

	//��ȡͼƬ��Ϣ
	function calImgInfo(index) {
		switch (index) {
			case 1:

				//�й�Ʒ�ư�
				//imgUrl = "https://img1.hvacr.cn/bao/Images/2022-770x100-ppb.jpg";
				//imgLink = "https://t.hvacr.cn/a52";

				//����ٿ�Ʒ��ר��
				//imgUrl = "https://img1.hvacr.cn/Images/lbh20221212770x100.jpg?rnd=" + Math.random();
				//imgLink = "https://bao.hvacr.cn/202205_2096992.html";

				//����ר��
				//imgUrl = "https://img1.hvacr.cn/images/gskhfzlbk.jpg?rnd=" + Math.random();
				//imgLink = "https://bao.hvacr.cn/202211_2100108.html";

				imgUrl = "https://img1.hvacr.cn/images/zhongguang770.jpg?rnd=" + Math.random();
				imgLink = "https://www.outes.com/";

				break;
			default:
				break;
		}
	}

	//���ͼƬ��Ϣ
	function clearImgInfo() {
		imgUrl = "";
		imgLink = ""
	}

	//ѭ�����
	for (var i = 1; i <= imgMax; i++) {

		//����ͼƬ��Ϣ
		calImgInfo(i);

		if (imgUrl == "" || imgLink == "")
			continue;

		//���
		document.write("	<div class=\"xq_ad position_r\">");
		document.write("	    <a rel=\"nofollow\" href=\"" + imgLink + "\" target=\"_blank\">");
		document.write("		    <img src=\"" + imgUrl + "\">");
		document.write("		</a>");
        document.write("        <span class=\"ad_mark\">���</span>");
		document.write("	</div>");

		//���ͼƬ��Ϣ
		clearImgInfo();
	}
})()