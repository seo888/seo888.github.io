$(function(){
    //��������ͼƬȥ�߿�
    $("#contentfontsize img").css({"border":0});

    //fontsizeToggle();
    $("#closebtn").click(function(){
        $(this).parent().parent().hide();
    });
    $("#cbtn").click(function(){
        $(this).parent().hide();
    });
    var obj1 = $("#clabel");
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        $(".gfapp").css("display","none");
    }else{
        $(".gfapp").css("display","block");
        obj1.click(function(){
            $("#gfapp1").css("display","none");
        }); 
    };
    //���ض�ά��
    var lastCp = $(".newscontent p:last-child");
    var imgUrl = "//resource.yesky.com/uploadImages/2015/166/MAW867KS0NKA.png";
    var imgSrc = lastCp.find("img").attr("src");
    if(imgSrc == imgUrl){
        lastCp.hide();
    };
	
       //�������ݶ���Ӹ��ఴť
	//�������ݶ���Ӹ��ఴť
	var fh=$(".newscontentbox").height();
	if(fh>3440){
	$(".newscontent").css({"height":"3430px","overflow":"hidden"});
	$(".newscontentbox").css("position","relative");
    $(".newsshare").css("padding-top","24px");
	$(".newscontentbox").append("<style type=\"text/css\">.clkmore{clear:both;width:100%;height:36px;line-height:100px;text-align:center;background-image: -webkit-linear-gradient(top, rgba(255,255, 255, 0) 0%,rgba(255,255, 255, 0.85) 20%,rgba(255,255, 255, 1) 100%);background-image: -moz-linear-gradient(top, rgba(255,255, 255, 0) 0%,rgba(255,255, 255, 0.85) 20%,rgba(255,255, 255, 1) 100%);background-image: -o-linear-gradient(top, rgba(255,255, 255, 0) 0%,rgba(255,255, 255, 0.85) 20%,rgba(255,255, 255, 1) 100%);background-image:linear-gradient(top, rgba(255,255, 255, 0) 0%,rgba(255,255, 255, 0.85) 20%,rgba(255,255, 255, 1) 100%);position:absolute;bottom:14px;}</style><div class=\"clkmore\"><span style=\"color:#00aeef;display:inline-block;cursor:pointer;\">����Ķ�ȫ��</span><img style='width: 20px; vertical-align: baseline;' src='//resource.yesky.com/TLimages2009/yesky/images/ywap15/tmcbt.png'/></div>")
        $(".clkmore").click(function(){
		$(this).hide();
        $(".newsshare").css("padding-top","0");
		$(".newscontent").css("height","auto");		
		});
		}
    //΢��OPENAPI�ӿ�
    wx.ready(function (){
        // ���������Ȧ
        wx.onMenuShareTimeline(_shareCont);
        // ����
        wx.onMenuShareAppMessage(_shareCont);
        // QQ
        wx.onMenuShareQQ(_shareCont);
        // ����
        wx.onMenuShareWeibo(_shareCont);
    });
	
	//������⴦��
	//$(".baidulm").width($("body").width());

    //360ģ��������
    var url = window.location.href;
    var num = url.indexOf("360wap");
    if(num>0){
        $("#gfapp1").hide();
        $("#flayer").hide();
    };
    
    //img��ǩ��src����ʱ�����ص��ñ�ǩ
    var ShowImg=document.getElementsByTagName("img");
    for(var j=0;j<ShowImg.length;j++){
        ShowImg[j].onerror=function(){
            this.style.display="none";
        }
	}
});
var videoList = document.getElementsByTagName("video")
for(var i = 0;i<videoList.length;i++){
	videoList[i].setAttribute('webkit-playsinline','true');
    videoList[i].setAttribute('playsinline','true');
    videoList[i].setAttribute('x5-video-player-type','h5');
    videoList[i].setAttribute('x5-video-player-fullscreen','true');
    videoList[i].setAttribute('x5-video-orientation','portraint');
}
window.onload = function(){
    //ͼƬ����Ӧ��������
    function onresizeScreen(){
        if($(window).width()>=1000){
            $(".picbox").width(320);
        }else{
            $(".picbox").width("auto");
        };
    };
    onresizeScreen();
    onresize=function(){onresizeScreen();}
};
/*function fontsizeToggle(){
    var fontsized = document.getElementById("contentsizeadd");
    var fontsizee = document.getElementById("contentsizedel");
    var fontsizec = document.getElementById("contentfontsize");
    fontsized.onclick = function(event){
        fontsizec.style.fontSize=20+"px";
        fontsized.style.display="none";
        fontsizee.style.display="block";
    };
    fontsizee.onclick = function(event){
        fontsizec.style.fontSize=16+"px";
        fontsized.style.display="block";
        fontsizee.style.display="none";
    };
};*/
// ���������ﲻ��ʾ��ͼƬ
function initImg(url,i){
	var img = new Image()
	img.src = url
	if(img.complete || img.width){
		$(".baidu_pl img[src='" + url + "']").show()
	}else{
		$(".baidu_pl img[src='" + url + "']").hide()
	}
}
window.onload=function(){    
	var urls = $(".baidu_pl").find("img");
	for(var i = 0;i<urls.length;i++){
		var src = urls[i].getAttribute("src")
		initImg(urls[i].getAttribute("src"),i)
	}        
}
// ��ʾ��Ƶ
for(var i = 0;i< document.getElementsByTagName("video").length;i++){
                document.getElementsByTagName("video")[i].style.display = "block";
            }