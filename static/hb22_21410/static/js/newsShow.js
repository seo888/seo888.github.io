$(function (){
	var Sticky = new hcSticky('aside', {
        stickTo: 'article',
        innerTop: 200,
        followScroll: false,
        queries: {
            480: {
                disable: true,
                stickTo: 'body'
            }
        }
    });
    $('.side-tab #sidetab li').click(function(){
        $(this).addClass('sidetab-current').siblings().removeClass('sidetab-current');
        $('#sidetab-content>section:eq('+$(this).index()+')').show().siblings().hide();
    });

	// 数据加载
	try {
		if ($id('voteMode').value>0){
			try {
				AjaxGetDealToIdJs(webPathPart +'news_deal_e2.php?mudi=vote&dataID='+ $id('infoID').value +'&webPathPart='+ WppSign(webPathPart), 'voteBox', '|vote|');
			}catch (e) {}
		}	

		// 评论加载
		if (IS_isNewsReply>0 && $id('isReply').value>0 && IS_newsReplyMode!=1){
			LoadReplyList($id('infoID').value);
			LoadReplyWrite($id('infoID').value);
		}
	}catch (e) {}

	$('#newsContent div,#newsContent span').removeClass('clear');
	ContentImgDeal();
	setTimeout("ContentImgDeal()",1000);
	setTimeout("ContentImgDeal()",2000);

	try {
		CheckSendContent();
	}catch (e) {}
	$('.fangdajingBox').mouseover(function (){
		$(this).find('.fangdajing').css({"display":""})
		$(this).hover(function (){
			
		},function (){
			$(this).find('.fangdajing').css({"display":"none"})
		});
	});

	try{
		if ( IS_isUserView == 1 ){
			AjaxGetDeal(webPathPart +"plugin_deal.php?mudi=userView&mode=ajax&type=info&dataID="+ $id('infoID').value);
		}
	}catch (e){}

});

function ContentImgDeal(){
	conImgMaxWidth = 665;
	try {
		conImgMaxWidth = parseInt($id('contentImgMaxWidth').value);
		if (isNaN(conImgMaxWidth)){
			conImgMaxWidth = 665;
		}else{
			if (conImgMaxWidth < 50){ conImgMaxWidth = 665; }
		}
	}catch (e) {}
	
	$('#newsContent img').each(function (i){
		if (this.width > conImgMaxWidth * 0.98){
			var newHeight = parseInt(this.height * conImgMaxWidth / this.width);
			this.height = newHeight;
			this.width = conImgMaxWidth;
			this.style.width = conImgMaxWidth +"px";
			this.style.height = newHeight +"px";
			$(this).wrap("<div class='fangdajingBox'></div>");
			$(this).before("<div class='fangdajing' style='position:relative;display:none;'><div style='position:absolute;left:0px;top:4px;width:"+ (conImgMaxWidth-2) +"px;height:30px;text-align:right;filter:alpha(opacity=80);-moz-opacity:0.80;opacity:0.80;z-index:999;'><img src='"+ jsPathPart +"inc_img/fangda.gif' onclick=\"var a=window.open('"+ $(this).attr('src') +"');return false;\" title='单击该处才可查看到原图' class='pointer' /></div></div>");
		}
	});
}

// 检查是否发送文章内容
function CheckSendContent(){
	if (ToInt($id('isUserCheck').value) > 0){
		if ($id('isEnc').value == 1){ retId="newsEncCont"; }else{ retId="newsContent"; }
		$id(retId).innerHTML = "<div class='hiddenContent' style='text-align:center;padding:18px;'>数据加载中...<br /><img src='"+ jsPathPart +"inc_img/loading.gif' alt='数据加载中...' /></div>";
		AjaxGetDealToIdJs2(webPathPart +"news_deal.php?mudi=contentSend&dataID="+ $id('infoID').value +"&isEnc="+ $id('isEnc').value +"&page="+ $id('pageValue').value +"&webPathPart="+ WppSign(webPathPart), retId, '|video|');
	}else{
		LoadVideoFile($id('newsContent').innerHTML);
	}
}

// 确定阅读
function CutScoreBtn(){
	if ($id('isEnc').value == 1){ retId="newsEncCont"; }else{ retId="newsContent"; }
	AjaxGetDealToIdJs2(webPathPart +"news_deal.php?mudi=contentSend&dataID="+ $id('infoID').value +"&isEnc="+ $id('isEnc').value +"&page="+ $id('pageValue').value +"&webPathPart="+ WppSign(webPathPart) +"&isCut=true", retId, '|video|');
}

// 分页链接
function ContentPageHref(modeStr,infoID,pageNum,mode1Url){
	if (modeStr!=""){
		AjaxGetDealToId(webPathPart +"news_deal.php?mudi=contentSend&dataID="+ infoID +"&page="+ pageNum +"&webPathPart="+ WppSign(webPathPart), modeStr, '|video|');
	}else{
		document.location.href=mode1Url.replace("[page]",pageNum);
	}
}

// 投票样式
function VoteStyle(){
	// 心情投票
	$(".webBox .d li").hover(function() { 
			$(this).addClass("font2_2 fontB");
		}, function(){
			$(this).removeClass("font2_2 fontB");
	});

	// 顶踩投票
	$(".webBox .d .upDown .up").hover(function() { 
			$(this).addClass("up2");
		}, function(){
			$(this).removeClass("up2");
	});
	$(".webBox .d .upDown .down").hover(function() { 
			$(this).addClass("down2");
		}, function(){
			$(this).removeClass("down2");
	});
}

// 投票点击
var isUseVote=false
function VoteDeal(num){
	if (isUseVote==true){
		alert('您已投票过，请下次再投.');return false;
	}
	AjaxGetDealToIdNo(webPathPart +'news_deal_e2.php?mudi=vote&dataID='+ $id('infoID').value +'&selItem='+ num +'&webPathPart='+ WppSign(webPathPart),'voteBox','验证码禁用');
	isUseVote = true;
}


// 评论指定用户回复
function ReplyUser(reID,reName){
	$id('replyUserID').value = reID;
	$id('replyUserStr').innerHTML = "回复："+ reName +"&ensp;&ensp;<span style='color:#000;cursor:pointer;' onclick='ReplyUserCancel();'>【取消回复】</span>";
	document.location.href="#replyArea";
}

// 指定用户回复取消
function ReplyUserCancel(){
	$id('replyUserID').value = 0;
	$id('replyUserStr').innerHTML = "";
}


// 检测发表评论框
function CheckReplyForm(){
	if ($id('replyContent').value==""){
		alert('评价内容不能为空');$id('replyContent').focus();return false;
	}
	if ($id('replyContent').value.length<5){
		alert('评价内容不能少于5字符');$id('replyContent').focus();return false;
	}
	strMaxLen = parseInt($id('replyContentMaxLen').value);
	if (strMaxLen>0 && $id('replyContent').value.length>strMaxLen){
		alert('评价内容超过最大'+ strMaxLen +'字符限制');$id('replyContent').value=$id('replyContent').value.substring(0,strMaxLen);CalcReplyLen();return false;
	}
	if ($id('replyUser').value==""){
		alert('昵称不能为空');$id('replyUser').focus();return false;
	}
	try {
		if (SYS_verCodeMode == 20){
			if ($("input[name='geetest_challenge']").val() == "") {
				alert('请点击验证码按钮进行验证');return false;
			}
		}else{
			if ($id('verCode').value==""){
				alert('验证码不能为空');$id('verCode').focus();return false;
			}
		}
	}catch (e) {}
	AjaxPostDeal("replyForm");
	return false;
}


// 读取评论区信息
function LoadReplyList(repID){
	$id("replyList").innerHTML = "<center style='padding:10px;'><img src='"+ webPathPart +"inc_img/onload.gif' style='margin-right:5px;' />数据加载中...</center>"+ $id("replyList").innerHTML;
	AjaxGetDealToId(webPathPart +"news_deal.php?mudi=messageSend&dataID="+ repID +'&webPathPart='+ WppSign(webPathPart),"replyList");
}

// 读取评论区填写框
function LoadReplyWrite(repID){
	var dataTypeVal="",isReplyVal="";
	try {
		dataTypeVal=$id('dataType').value;
	}catch (e) {}
	try {
		isReplyVal=$id('isReply').value;
	}catch (e) {}

	$id("replyWrite").innerHTML = "<center style='padding:10px;'><img src='"+ webPathPart +"inc_img/onload.gif' style='margin-right:5px;' />数据加载中...</center>";
	$.ajaxSetup({cache:false});
	$.get(webPathPart +"news_deal.php?mudi=messageWrite&dataID="+ repID +'&dataType='+ dataTypeVal +'&isReply='+ isReplyVal +'&webPathPart='+ WppSign(webPathPart), function(result){
		document.getElementById("replyWrite").innerHTML = result;
		try {
			CheckReplyMaxLen();
		}catch (e) {}
		try {
			if (SYS_verCodeMode == 20){
				geetWidth = "260px";
				LoadJsFile('geetestJs',webPathPart +'tools/geetest/gt.js?v=1.0',1);
			}
		}catch (e) {}
	});
}


// 检测回复内容字符
function CheckReplyMaxLen(){
	try {
		strMaxLen = parseInt($id('replyContentMaxLen').value);
		if (strMaxLen>0){
			$id('conMaxLenBox').innerHTML = "(<span id='conCurrLen'>0</span>/"+ strMaxLen +")&ensp;";
			$('#replyContent').keyup(function (){
				CalcReplyLen();
			});
		}
	}catch (e) {}
}

// 计算回复内容字符数
function CalcReplyLen(){
	try {
		$id('conCurrLen').innerHTML = $id('replyContent').value.length;
	}catch (e) {}
}
