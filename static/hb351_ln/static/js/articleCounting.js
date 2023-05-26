$(function() {
	var countFlag = $("span[articlecounts=yes]");
	if(countFlag&&countFlag.length>0){
		var articleKey = $("#eprotalCurrentArticleKey").val();
		var moduleId = $("#eportalappPortletId").val();
		var columnId=$("#eprotalCurrentColumnId").val();
		var url = "/eportal/ui?pageId="+$("#eprotalCurrentPageId").val()+"&moduleId="+moduleId+"&columnId="+columnId+"&articleKey="+articleKey+"&portal.url=/app/counting-front!saveInfo.portlet";
		$.ajax( {
			type : "post",
			url : url,
			dataType : "text",
			success : function(msg) {
				if(msg.match(/^\d*$/)){
				    $("span[articleCounts=yes]").html(msg);
				}else{
					$("span[articleCounts=yes]").html("1");
				}
			}
		});
	}

	if($('#aisiteQrCodeDiv')[0]){
		var url=window.location.href;
		var qrWidth=$('#aisiteQrCodeDiv').attr("width");
		var qrHeight =$('#aisiteQrCodeDiv').attr("height");
		var logoQrWidth = qrWidth/ 4;
		var logoQrHeight = qrHeight /4;
		$('#aisiteQrCodeDiv').qrcode({
		    render: "canvas",
		    width: qrWidth,
		    height: qrHeight,
		    text: url
		});
		if($("#aisiteQrCodeLogoImg")[0]){
		   $("#aisiteQrCodeDiv canvas")[0].getContext('2d').drawImage($("#aisiteQrCodeLogoImg")[0], (qrWidth - logoQrWidth) / 2, (qrHeight - logoQrHeight) / 2, logoQrWidth, logoQrHeight);
		}
	}

	$.each($("[previousarticle='yes']"),function(){
		var element = $(this);
		if(element!=null&&element[0]!="undefined"){
			var articleKey = element.attr("articlekey");
			var columnid = element.attr("columnid");
			var isStaticRequest=$("#isStaticRequest").val();
			var urltype= element.attr("urltype");
			if(articleKey!=null&&articleKey!="undefined"&&!articleKey.match(/^\s*$/)){
				var moduleId = $("#eportalappPortletId").val();
				var url = "/eportal/ui?pageId="+$("#eprotalCurrentPageId").val()+"&moduleId="+moduleId+"&portal.url=/portlet/article-portlet!getPreOrNextArticle.portlet&urlType="+urltype;
				$.ajax( {
					type : "post",
					url : url,
					dataType : "text",
					data:{"articleKey":articleKey,"columnId":columnid,"staticRequest":isStaticRequest},
					success : function(msg) {
						    if(msg!="error"){
						        var tagName=element[0].tagName.toLowerCase();
						        msg=eval("("+msg+")");
						        var preTitle=msg.preTitle;
						        var preUrl=msg.preUrl;
						        var preTitlePhoto=msg.preTitlePhoto;
						        var nextTitle=msg.nextTitle;
						        var nextUrl=msg.nextUrl;
						        var nextTitlePhoto=msg.nextTitlePhoto;
						        if(tagName=="span"){
						            var spanNav=element;
							        if(preUrl.match(/^\s*$/)){
							            spanNav.prev().hide();
							        }else{
							            spanNav.html("<a href='"+preUrl+"'>"+preTitle+"</a>");
							        }
							        if(nextUrl.match(/^\s*$/)){
						              $("span[nextarticle='yes']").prev().hide();
						            }else{
						               $("span[nextarticle='yes']").html("<a href='"+nextUrl+"'>"+nextTitle+"</a>");
						            }
						        }else if(tagName=="img"){
							        if($("#previousArticleImage")[0]){
								         if(preUrl.match(/^\s*$/)){
								             $("#previousArticleImage").attr("src","/eportal/uiFramework/images/picNews/notuji.jpg");
								             $("#previousArticleImage").after("<br>已是第一图集");
								         }else{
									          if(!preTitlePhoto.match(/^\s*$/)){
									             $("#previousArticleImage").attr("src",preTitlePhoto);
									          }else{
									             $("#previousArticleImage").attr("src","/eportal/uiFramework/images/picNews/notuji.jpg");
									          }
									          $("#previousArticleImage").after("上一图集");
								          }
							        }
							        if($("#nextArticleImage")[0]){
								         if(nextUrl.match(/^\s*$/)){
								             $("#nextArticleImage").attr("src","/eportal/uiFramework/images/picNews/notuji.jpg");
								             $("#nextArticleImage").after("<br>已是最后图集");
								         }else{
									          if(!nextTitlePhoto.match(/^\s*$/)){
									             $("#nextArticleImage").attr("src",nextTitlePhoto);
									          }else{
									             $("#nextArticleImage").attr("src","/eportal/uiFramework/images/picNews/notuji.jpg");
									          }
									           $("#nextArticleImage").after("下一图集");
								          }
							        }
						        }
						    }
					}
				});
			}
		}
	});

	var system ={
	    win : false,
	    mac : false,
	    xll : false
	};

	var p = navigator.platform;
	system.win = p.indexOf("Win") == 0;
	system.mac = p.indexOf("Mac") == 0;
	system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
	var flag=system.win||system.mac||system.xll;

	if($("#eprotalCurrentSiteType").val()=="APP"||!flag){
		var objectList = document.getElementsByTagName("object");
		while(objectList.length>0){
		    var obj = objectList[0];
		    var paramList = obj.childNodes;
		    var videoLink = "";
		    var width = $(window).width();
		    var heigth =$(window).height();
			var play=false;
			var audioLink="";
		    for(var n = 0; n <paramList.length; n++){
				tarP = paramList[n];

				if(tarP.name == "FlashVars"){
				    videoLink = tarP.value;
				    videoLink=videoLink.substring(2);
				    videoLink=videoLink.replace("&p=1","");
				}
				if(tarP.name == "play"&&paramList[n].value=="true"){
					play = true;
				}

				if(tarP.name == "movie"){
					audioLink = tarP.value;
					if(audioLink.indexOf("autoStart=true")>0){
						play = true;
					}
					audioLink=audioLink.replace("/eportal/uiFramework/js/videoPlayer/audioPlayer.swf?file=", "");
					audioLink=audioLink.substring(0,audioLink.indexOf("&"));
				}
		    }
		    var showHtmlVideo=videoLink.indexOf(".mp4")>0||videoLink.indexOf(".MP4")>0;
		    if(showHtmlVideo){
	    	    var objParent = obj.parentNode;
			    objParent.innerHTML="";
			    var video = "<video controls='controls' ";
			    if(play){
			    	video+=" autoplay='"+play+"' ";
			    }
		        video+=" width = " + width + " height = " + heigth + "><source src='" + videoLink + "' type='video/mp4' codecs='avc1.42E01E,mp4a.40.2'/>您的浏览器不支持 video 标签。</video>";
		        objParent.innerHTML = video;
		    }
		    var showHtmlAudio=audioLink.indexOf(".mp3")>0||audioLink.indexOf(".MP3")>0;
		    if(showHtmlAudio){
	    	    var objParent = obj.parentNode;
	    	    objParent.innerHTML="";
			    var audio = "<audio  controls='controls' loop='loop' ";
			    if(play){
			    	audio+=" autoplay='true' ";
			    }
			    audio+="src='" + audioLink + "'>您的浏览器不支持 audio标签。</audio>";
		        objParent.innerHTML = audio;
		    }
		}
	}

	var dingFlag = $("span[articlecountingtype='ding']");
    getDingCaiRecords('1',dingFlag);

	var caiFlag = $("span[articlecountingtype='cai']");
    getDingCaiRecords('4',caiFlag);

    var articleCollectFlag=$("img[imgtype='articleCollectImg']");
    if(articleCollectFlag&&articleCollectFlag.length>0){
		  var articleKey = $("#articleKey").val();
		  var visitType=$("input[visitType='visitType']").val();
			$("img[imgtype='articleCollectImg']").attr("onclick","articleCollect('"+visitType+"','"+articleKey+"')");		    
	}
});
function getPreviousOrNextArticlePath(type,columnId,articleKey,preImageId,nextImageId){
	var isStaticRequest=$("#isStaticRequest").val();
	var moduleId = $("#eportalappPortletId").val();
   	var url = "/eportal/ui?pageId="+$("#eprotalCurrentPageId").val()+"&moduleId="+moduleId+"&portal.url=/portlet/article-portlet!getPreOrNextArticle.portlet";
	$.ajax( {
		type : "post",
		url : url,
		dataType : "text",
		data:{"articleKey":articleKey,"columnId":columnId,"staticRequest":isStaticRequest},
		success : function(msg) {
			    if(msg!="error"){
			        msg=eval("("+msg+")");
			        if(type=="pre"){
				        var preTitle=msg.preTitle;
				        var preUrl=msg.preUrl;
				        if(!preUrl.match(/^\s*$/)){
				            window.location.href=preUrl;
				        }
			        }else if(type=="next"){
				        var nextTitle=msg.nextTitle;
				        var nextUrl=msg.nextUrl;
				        if(!nextUrl.match(/^\s*$/)){
				            window.location.href=nextUrl;
				        }
			        }
			    }
		},
		error : function(msg) {}
    });
}

function articleDingCai(type,articleKey){
	var url = "/eportal/ui?pageId="+$("#eprotalCurrentColumnId").val()+"&moduleId="+$("#eportalappPortletId").val()+"&portal.url=/portlet/article-ding-cai!dingCaiOperate.portlet";
	$.ajax( {
		type : "post",
		url : url,
		dataType : "json",
		data:{"articleKey":articleKey,"type":type},
		success : function(result) {
			    	 if(result.success){

			    	 	   if(type=="1"){
			    	 	   	  $("span[articlecountingtype='ding']").html(result.countNum);

			    	 	   }
			    	 	   if(type=="4"){
			    	 	      $("span[articlecountingtype='cai']").html(result.countNum);

			    	 	   }
			    	 }else{
			    		 console.log(result.errorMessage);
			    	 }
		}
	});
}

function articleCollect(visitType,articleKey){
	var url = "/eportal/ui?pageId="+$("#eprotalCurrentPageId").val()+"&moduleId="+$("#eportalappPortletId").val()+"&portal.url=/portlet/my-collect-portlet!articleCollect.portlet";
	$.ajax({
		type : "post",
		url : url,
		dataType : "text",
		data:{"articleKey":articleKey,"visitType":visitType},
		success : function(msg) {
			    if(msg!="error"){
			    	 var result=eval("("+msg+")");
			    	 showTipsDialog('收藏成功！', 'okay');
			    }
		}
	});
}

function getDingCaiRecords(type,flag){
	if(flag&&flag.length>0){
		var articleKey = $("#eprotalCurrentArticleKey").val();
        var url = "/eportal/ui?pageId="+$("#eprotalCurrentColumnId").val()+"&moduleId="+$("#eportalappPortletId").val()+"&portal.url=/portlet/article-ding-cai!dingCaiOperate.portlet";
			$.ajax( {
				type : "post",
				url : url,
				dataType : "text",
				data:{"articleKey":articleKey,"type":type,"getDataInfo":"1"},
				success : function(msg) {
					    if(msg!="error"){
					    	 var result=eval("("+msg+")");
					    	 if(type=="1"){

					    	 	  $("span[articlecountingtype='ding']").html(result.countNum);
					    	 	  if(result.success){
					    	 	    $("[imgtype='ding']").attr("onclick","articleDingCai('1','"+articleKey+"')");
					    	 	  }else{

					    	 	  }
					    	 }
					    	 if(type=="4"){

					    	 	  $("span[articlecountingtype='cai']").html(result.countNum);
					    	 	   if(result.success){
					    	 	     $("[imgtype='cai']").attr("onclick","articleDingCai('4','"+articleKey+"')");
					    	 	  }else{

					    	 	  }
					    	 }

					    }
				}
			});
	}

}