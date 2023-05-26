
$(document).ready(function() {
    // 首页-搜索框下拉
    $(".top-links-lf p").click(function(){
        $(".top-links-lf ul").slideToggle();
    });
    $(".top-links-lf ul li").click(function(){
        $(".top-links-lf ul").slideUp(0);
        $(".top-links-lf p").text($(this).text());
    });
    $(".top-links-lf").attr('tabindex',1);
    $(".top-links-lf").blur(function(){
        $(".top-links-lf ul").slideUp(0);
    });
    //地名选择下拉
    $(".topport-select p").click(function(){
        $(".topport-select ul").slideToggle();
    });
    $(".topport-select ul li").click(function(){
        $(".topport-select ul").slideUp(0);
        $(".topport-select p").text($(this).text());
    });
    $(".topport-select").attr('tabindex',1);
    $(".topport-select").blur(function(){
        $(".topport-select ul").slideUp(0);
    });
    //标签切换
    Tab3($("#new-lfm3 .new-lf3tab ul"),$("#new-lfm3 .new-lf3con"),"new-mlf3act",".lanren");
    Tab3($("#new-lfm5 .new-lf3tab ul"),$("#new-lfm5 .new-lf3con"),"new-mlf3act",".new-lf3con1");
    //遂宁要闻字数限制
    hidden_char($(".new-mainlf .new-lfm2 > p"),88);
    hidden_char($(".new-lf3con .new-l3item .descb .word p"),78);
    hidden_char($(".new-mainrt .new-rtm1 p"),50);
    hidden_char($(".new-rtm2 .new-rtm2con .con p"),38);
    //新闻概览
    hidden_char($(".newg-rt .new-rtm2 .new-rtm2con .con p"),28);
    // 本网直击
    hidden_char($(".new-rtmconpub div > p"),22);
    //今日关注标签切换
    Tab3($("#new-rtm2 .title ul"),$("#new-rtm2 .new-rtm2con"),"new-rm2act",".new-rtm2con1");
    //传媒看遂宁标签切换
    Tab3($("#new-rtm4 .title ul"),$("#new-rtm4 .new-rtm2con"),"new-rm2act",".new-rtm2con1");
    // 美丽遂宁
    Tab3($("#new-rtm5 .title ul"),$("#new-rtm5 .new-rtm2con"),"new-rm2act",".new-rtm2con1");
    //遂宁推荐
    Tab3($(".new-rtm7 ul.new-rt7tab"),$(".new-rt7con"),"new-rt7act",".new-rt7con1");
    //新闻中心-概览列表间距控制
    for(var i=0; i < $(".newg-main .newg-lf li").length; i++){
        if(i % 5 == 0){
            $(".newg-main .newg-lf li").eq(i).css('margin-top','25px');
        }
        $(".newg-main .newg-lf li").eq(0).css('margin-top','15px');
    }
});
//多行字数限制
function hidden_char(node,show){
    for(var i=0;i<node.length;i++){
        var node_str = node[i].innerHTML;
        if(node_str.length>show){
            var show_str = node_str.substr(0,show)+"...";
            node[i].innerHTML = show_str;
        }
    }
}
//标签切换
function Tab3(tab, con,classm,childrennode){
    var tab = tab.find("li");
    var con = con.children(childrennode);
    con.eq(0).show().siblings(childrennode).hide();
    tab.hover(function(){
        tab.removeClass(classm);
        $(this).addClass(classm);
        con.eq(tab.index(this)).show().siblings(childrennode).hide();
    })
}

function TVieVodPlayer(domID, apiServer, VID, width, height, skinID, swfURL) {
	this.apiServer = apiServer;
	this.VID = VID;
	this.domID = domID;
	this.width = width;
	this.height = height;
	this.skinID = skinID;
	this.swfURL = swfURL;
	this.is_mobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);

	if (this.is_mobile !== null)
	{
		//start html5player
		
		var xmlhttp;
		if (window.XMLHttpRequest){
			xmlhttp = new XMLHttpRequest();
		}
		else{
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.open("GET","http://" + this.apiServer + '/api/getCDNByVodId/' + this.VID, false);
		xmlhttp.send();
		var resText = xmlhttp.responseText;
		this.VodInfo = eval('(' + resText + ')');
		this.src = this.VodInfo.video_files[0];
		this.html = '<video width="' + this.width + '" height="' + this.height + '" controls autoplay><source src="'+ this.src +'" type="video/mp4" /></video>';
	}
	else
	{
	
		//start flash player
		this.html = '<embed src="' + this.swfURL + '" width="'+ this.width +'" height="'+ this.height +'" allowfullscreen="true" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="opaque" allowscriptaccess="always" flashvars="Video_ID='+ this.VID +'&Skin_ID='+ this.skinID +'&API_Server='+ this.apiServer +'">';

	}
}

TVieVodPlayer.prototype.run = function() {
	document.getElementById(this.domID).innerHTML = this.html;
}
