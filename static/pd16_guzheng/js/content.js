function format_time(timestamp, format){
	var d = new Date(timestamp * 1000);
	var year = d.getFullYear();
	var month = d.getMonth()+1;
	month = month < 10 ? '0' + month : month;
	var day = d.getDate();
	day = day < 10 ? '0' + day : day;
	var hour = d.getHours();
	hour = hour < 10 ? '0' + hour : hour;
	var minute = d.getMinutes();
	minute = minute < 10 ? '0' + minute : minute;
	var second = d.getSeconds();
	second = second < 10 ? '0' + second : second;
	return format.replace('Y', year).replace('m',month).replace('d',day).replace('H',hour).replace('i',minute).replace('s',second);
}
function add_0(t){
	return t != "" ? (t>9?t:"0"+t) : "00";
}

function getTime(t) {
	var mydate=new Date(parseInt(t) * 1000);
	var y=mydate.getFullYear();
	var m=mydate.getMonth()+1;
	var d=mydate.getDate();
	var hours=mydate.getHours();
	var minutes=mydate.getMinutes();
	var seconds=mydate.getSeconds();
	return y+"-"+add_0(m)+"-"+add_0(d)+"&nbsp;&nbsp;"+add_0(hours)+":"+add_0(minutes)+":"+add_0(seconds);
}
function flexible(){
	var content = $("#aboutinfo").html();
	//过滤br
	if(content){
		var c = content.replace(/<[^>]+>/g,"");
		var brief_content;
		$(".content-sq").hide();//默认收起隐藏
		if(c&&c.length>=100) {;//如果长度不够100，隐藏展开
		brief_content = c.substr(0,100) + "..";
		$(".content-zk").show()
		$("#aboutinfo").text(brief_content);
		} else {
			$(".content-zk").hide();
		}
		$(".content-zk").on("click", function () {
			$("#aboutinfo").html(content);
			$(".content-zk").hide();
			$(".content-sq").show();
		});
		$(".content-sq").on("click", function () {
			$("#aboutinfo").text(brief_content);
			$(".content-sq").hide();
			$(".content-zk").show();
		})
	}else{
        $(".content-sq").hide();
        $(".content-zk").hide();
	}
}
flexible();


function pop(num,type){
	ckeckLogin(function(){
		if(type=="pudan"){
			layer.open({
				type: 2,
				title: false,
				skin: 'layui-layer-rim',
				area: ["800px", "543px"],
				shadeClose: true,
				//content: [site_url+"index.php?m=member&c=pudan&a=add_content&qupuid="+num,"no"],
				content: ["/index.php?m=member&c=pudan&a=add_content&qupuid="+num,"no"],
				success:function(layero){
					//var box = $(".score_integration_list", layero.find("iframe")[0].contentWindow.document);
					//box.attr("data-id",num)
					//box.attr("data-type",type)
				}
			});
		}else{
			layer.open({
				type: 2,
				title: false,
				skin: 'layui-layer-rim',
				area: ["800px", "543px"],
				shadeClose: true,
				//content: [site_url+"index.php?m=member&c=qudan&a=add_content&zhengquid="+num,"no"],
				content: ["/index.php?m=member&c=qudan&a=add_content&zhengquid="+num,"no"],
				success:function(layero){
					//var box = $(".score_integration_list", layero.find("iframe")[0].contentWindow.document);
					//box.attr("data-id",num)
					//box.attr("data-type",type)
				}
			});

		}
	})
}

function popNickLogin(){
    layer.open({
        type: 2,
        title: '昵称登录',
        skin: 'layui-layer-rim',
        area: ["800px", "366px"],
        shadeClose: true,
        scrollbar:false,
        content: "/index.php?m=member&c=login&a=login_pop&type=nick",
    });
}
function del(type,num){
	layer.confirm('确定删除吗？', {
		title:"提示",
		btn: ['确定','取消'] //按钮
	}, function(){
		var url="/member/content/del.json"
		var data={catid:type,id:num}
		$.getJSON(url,data, function(data){
			if(data.error==0){
				layer.msg("删除成功");
				setTimeout(function(){
					window.location.reload();
				},600);
			}
		});
	});
}
function delMusic(type,num){
	layer.confirm('确定删除这条曲子吗？', {
		title:"提示",
		btn: ['确定','取消'] //按钮
	}, function(){
		var url="/index.php?m=member&c=qudan&a=del_content"
		var data={id:type,zhengquid:num}
		$.getJSON(url,data, function(data){
			if(data.error==0){
				layer.msg("删除成功");
				setTimeout(function(){
					window.location.reload();
				},600);
			}
		});
	});
}
function delVideo(type,num,str){
	if(str=='dingyue'){
		message='确定取消订阅吗？'
	}else{
		message='确定移除这条视频吗？'
	}
	layer.confirm(message, {
		title:"提示",
		btn: ['确定','取消'] //按钮
	}, function(){
		$.getJSON("/member/favorite/del.json", {modelid:type,id:num}, function(data){
			if(data.error==0){
				layer.msg("删除成功");
				setTimeout(function(){
					window.location.reload()
				},600);
			}
		});
	});
}

/**
* 曲单喜欢功能
* @param listid
* @param musicid
* @param refresh
* @param e
*/
// function addMusic(listid,musicid,refresh,e){
// 	ckeckLogin(function(){
// 		$.ajax({
// 			url:"/index.php?m=member&c=qudan&a=add_content&zhengquid="+musicid,
// 			type:"post",
// 			data:{'id':listid},
// 			success:function(data){
// 				if(data.error==0){
// 					layer.msg("添加成功")
// 					$(e).addClass("active")
// 					if(refresh=='yes'){
// 						setTimeout(function(){
// 							parent.location.reload();
// 						},1000);
// 					}
// 				}else{
// 					$(e).addClass("active")
// 					layer.msg("已添加")
// 				}
// 			}
// 		})
// 	})
// }
var addMusicStatus=true
function addMusic(listid,musicid,refresh,e){
	if(addMusicStatus){
        addMusicStatus=false
        ckeckLogin(function(){
            if("cancel"==$(e).attr("data-type")){
                delMusicLike(listid,musicid)
            }else{
                addMusicLike(listid,musicid,refresh,e)
            }
        })
	}
}
function addMusicLike(listid,musicid,refresh,e){
	$.ajax({
		url:"/index.php?m=member&c=qudan&a=add_content&zhengquid="+musicid,
		type:"post",
		data:{'id':listid},
		success:function(data){
			if(data.error==0){
				if(refresh=='yes'){
					layer.msg("成功加入")
					setTimeout(function(){
						parent.location.reload();
					},1000);
				}else{
					$(e).addClass("active").attr("data-type","cancel");
					if(typeof(addMusicLikeCB)!="undefined"){
						addMusicLikeCB(listid,musicid,refresh,e);
					}
                    if(data.data&&data.data.extra_hook&&data.data.extra_hook.point){
                        showPointsPopup(data.data.extra_hook.point.value);
                    }else{
                        layer.msg("成功喜欢")
                    }
				}
			}else{
				$(e).addClass("active")
				layer.msg("已添加")
			}
            addMusicStatus=true
		},error:function(){
            addMusicStatus=true
		}
	})
}
function delMusicLike(listid,musicid){
	$.ajax({
		url:"/index.php?m=member&c=qudan&a=del_content",
		type:"get",
		data:{'id':listid,'zhengquid':musicid},
		success:function(data){
			if(data.error==0){
				layer.msg("取消喜欢")
				setTimeout(function(){
					window.location.reload();
				},1000);
			}
            addMusicStatus=true
        },error:function(){
            addMusicStatus=true
        }
	})
}

/**
* 谱单喜欢功能
* @param listid
* @param musicid
* @param refresh
* @param e
*/
var addSongStatus=true;
function addSong(listid,musicid,refresh,e){
	if(addSongStatus){
        addSongStatus=false
		ckeckLogin(function(){
			if("cancel"==$(e).attr("data-type")){
				delSongLike(listid,musicid)
			}else{
				addSongLike(listid,musicid,refresh,e)
			}
		})
	}
}
function addSongLike(listid,musicid,refresh,e){
	$.ajax({
		url:"/index.php?m=member&c=pudan&a=add_content&qupuid="+musicid,
		type:"post",
		data:{'id':listid},
		success:function(data){
			if(data.error==0){
				if(refresh=='yes'){
					layer.msg("成功加入")
					setTimeout(function(){
						parent.location.reload();
					},1000);
				}else{
					$(e).addClass("active").attr("data-type","cancel")
					if(typeof(addSongCB)!="undefined"){
						addSongCB(listid,musicid,refresh,e);
					}
                    if(data.data&&data.data.extra_hook&&data.data.extra_hook.point){
                        showPointsPopup(data.data.extra_hook.point.value);
                    }else{
                        layer.msg("成功喜欢")
					}
				}
			}else{
				$(e).addClass("active").attr("data-type","cancel")
				layer.msg(data.msg);
			}
            addSongStatus=true
		},error:function(){
            addSongStatus=true
		}
	})
}
function delSongLike(listid,musicid){
	$.ajax({
		url:"/index.php?m=member&c=pudan&a=del_content",
		type:"get",
		data:{'id':listid,'qupuid':musicid},
		success:function(data){
			if(data.error==0){
				layer.msg("取消喜欢")
				setTimeout(function(){
					window.location.reload();
				},1000);
			}
            addSongStatus=true
        },error:function(){
            addSongStatus=true
        }
	})
}
function delQupu(listid,musicid){
	layer.confirm('确定删除这条曲谱吗？', {
		title:"提示",
		btn: ['确定','取消'] //按钮
	}, function(){
		$.ajax({
			url:"/index.php?m=member&c=pudan&a=del_content",
			type:"get",
			data:{'id':listid,'qupuid':musicid},
			success:function(data){
				if(data.error==0){
					layer.msg("删除成功");
					setTimeout(function(){
						window.location.reload();
					},1000);
				}
			}
		})
	});

}

function ckeckLogin(callback){
	$.ajax({
		url:"/index.php?m=member&c=ajax&a=is_login",
		success:function(data){
			if(data.error==0){
				callback();
			}else{
                layer.open({
                    type: 2,
                    title: '用户登录/注册',
                    skin: 'layui-layer-rim',
                    area: ["800px", "580px"],
                    shadeClose: true,
                    scrollbar:false,
                    content: "/index.php?m=member&c=login&a=login_pop",
                });
                addMusicStatus=true
                addSongStatus=true
                isCollectStatus=true
                isfollowStatus=true

            }
		}
	})
}
function ckeckLoginSilence(callback){
	$.ajax({
		url:"/index.php?m=member&c=ajax&a=is_login",
		success:function(data){
			if(data.error==0){
				callback();
			}else{
				//alert("请登录！")
				//location.href="/index.php?m=member&c=login"
			}
		}
	})
}
function loginPop(){
    layer.open({
        type: 2,
        title: '用户登录/注册',
        skin: 'layui-layer-rim',
        area: ["800px", "580px"],
        shadeClose: true,
        scrollbar:false,
        content: "/index.php?m=member&c=login&a=login_pop",
    });
}

/**
* 数据加载之后显示是否收藏
* @param modelid
* @param id
* @param str
*/
function checkCollect(modelid,id,str){
	ckeckLoginSilence(function(){
		$.ajax({
			url:"/member/favorite/check.json",
			type:"get",
			data:{"modelid":modelid,"id":id},
			success:function(data){
				var ids=id.split(",");
				for(var i=0;i<data.length;i++){
                    if(data[i] == '0'){
                        $("#collect_"+ids[i]).removeClass("active").attr("data-type","add")
                        $(".collect_"+ids[i]).removeClass("active").attr("data-type","add")
                    }else{
                        $("#collect_"+ids[i]).addClass("active").attr("data-type","cancel").children().eq(1).html(str);
                        $(".collect_"+ids[i]).addClass("active").attr("data-type","cancel")
                        if(typeof(checkCollectCB)!="undefined"){
                            checkCollectCB(ids[i],str);
                        }
                    }
				}
			}
		})

	})
}


/**
* 点击收藏按钮之后执行判断是否收藏(喜欢和订阅与收藏逻辑一样)
* @param modelid
* @param id
* @param e
* @param type   类型
* @param url
*/
var isCollectStatus=true
function isCollect(modelid,id,e,type,url){
	if(isCollectStatus){
        isCollectStatus=false
        ckeckLogin(function(){
			if("add"==$(e).attr("data-type")){
				collect(modelid,id,e,type)
			}else{
				uncollect(modelid,id,e,type,url)
			}

        })
	}

}
/**
* 点击收藏(喜欢和订阅与收藏逻辑一样)
* @param modelid
* @param id
* @param e
* @param type  类型
*/
function collect(modelid,id,e,type){
	ckeckLogin(function(){
		$.ajax({
			url:"/member/favorite/add.json",
			type:"get",
			data:{"modelid":modelid,"id":id},
			success:function(data){
				console.log(data.error)
				if(data.error=="0"){
					$(e).addClass("active")
					if(type=='喜欢'){
						$(e).children().eq(1).html("已喜欢")
                        if(data.data&&data.data.extra_hook&&data.data.extra_hook.point){
                            showPointsPopup(data.data.extra_hook.point.value);
                        }else{
                            layer.msg("成功喜欢")
                        }
					}else{
						if(type){
							layer.msg("成功订阅")
							$(e).children().eq(1).html("已订阅")
						}else{
							layer.msg("成功收藏")
							$(e).children().eq(1).html("已收藏")
							$(e).find("span").text("已收藏");
		          $(e).parent(".add-coll").addClass("collected");
						}
					}
           $(e).attr("data-type","cancel")
				}else{
					layer.msg(data.msg)
				}
                isCollectStatus=true
			},error:function () {
                isCollectStatus=true
            }
		})
	})

}

/**
* 点击取消收藏(喜欢和订阅与收藏逻辑一样)
* @param modelid
* @param id
* @param e
* @param type
* @param url
*/
function uncollect(modelid,id,e,type,url){
	ckeckLogin(function(){
		$.ajax({
			url:"/member/favorite/del.json",
			type:"get",
			data:{"modelid":modelid,"id":id},
			success:function(data){
				if(data.error=="0"){
					$(e).removeClass("active")
					if(type=='喜欢'){
						layer.msg("取消喜欢")
						$(e).children().eq(1).html("喜欢")
					}else{
						if(type){
							layer.msg("取消订阅")
							$(e).children().eq(1).html("订阅")
						}else{
							layer.msg("取消收藏")
							$(e).children().eq(1).html("收藏")
							$(e).find("span").text("+收藏");
		          $(e).parent(".add-coll").removeClass("collected");
						}
					}
					if(url){
						setTimeout(function(){
							location.href=url
						},600);
					}
                    $(e).attr("data-type","add")
				}else{
					layer.msg(data.msg)
				}
                isCollectStatus=true
            },error:function () {
                isCollectStatus = true
            }
		})
	})

}
function countStrLen(obj,countObj,submitObj) {
	var maxLen = 140;
	var str = obj.value;
	if(str.length > maxLen){
		obj.value = str.substring(0, maxLen);
	}
	else if(str.length>0){
		countObj.html(maxLen-str.length);
		submitObj.attr('disabled', false);
	}
	else{
		countObj.html(maxLen-str.length);
		submitObj.attr('disabled', true);
	}
}
function comment_next_page(page,buyflag){
	var $wonder_box = $('.wonder-box');
	var wonder_list = $wonder_box.find('.wonder-list').html('');
	var comment_list = $('.comment_list').html('');
	$.getJSON('/index.php?m=comment&c=index&a=lists&commentid='+commentid+'&num=10&page=' + page, function(json){
		$('.comment_total').html(json.total);
		if(json.total > 0){
			if(null===json.wonderful || !json.wonderful.length){
                $wonder_box.addClass("hidden");
			}else{
				$.each(json.wonderful, function(i, v){
					var wonder_li_html = '<li class="comment_write clearfix">' + commentLi(v) + '';
					if(v.replylist){
						wonder_li_html += '<ul class="replylist"><span class="arr"></span>';
						$.each(v.replylist, function(i_, v_){
							wonder_li_html += '<li>' + replyLi(v_) + '</li>';
						});
						wonder_li_html += '</ul>';
					}
					wonder_list.append(wonder_li_html+'</li>');
				});
				$wonder_box.removeClass("hidden");
			}
			$.each(json.data, function(i, v){
				var li_html = '<li class="comment_write clearfix">' + commentLi(v) + '';
				if(v.replylist){
					li_html += '<ul class="replylist"><span class="arr"></span>';
					$.each(v.replylist, function(i_, v_){
						li_html += '<li>' + replyLi(v_) + '</li>';
					});
					li_html += '</ul>';
				}
				comment_list.append(li_html+'</li>');
			});
		}else{
			if(page==1){
				comment_list.html('<li class="nocomment_show">暂无评论</li>')
			}
		}
		laypage({
			cont: $('.comment_page')[0],
			skin: 'molv',
			pages: json.pages,
			curr: page || 1,
			hash: 'page',
			jump: function(obj,first){
				if(!first){
					comment_next_page(obj.curr,buyflag);
				}
			}
		});
        if(buyflag=='hide') $(".feedback .replybtn").hide();
	});
}
function commentLi(v){
	var li_html = '<div class="write_avatar"><a href="' + v.user.space + '" target="_blank" class="author-thumb"><img class="media-object" src="' + v.user.avatar + '"></a></div>';
	// var li_html = '';
	// li_html += '<h5><a href="' + v.user.home + '">' + v.username + '</a></h5>'
	li_html += '<div class="write_body"><h4 class="media-heading"><a href="' + v.user.space + '" target="_blank">' + v.username + '</a></h4>';
	li_html += '<p>' + v.content + '</p>';
	li_html += '<div class="feedback clearfix">';
	li_html += '<span class="tiptime"><i class="icon icon-date" title="date"></i>' + format_time(v.creat_at,'Y-m-d') + '</span>';
	//li_html += '<a href="javascript:;" class="zan" onclick="commentSupport(' + v.id + ')"><i class="icon icon-zan" title="点赞"></i>赞(<font id="support_' + v.id + '">' + v.support + '</font>)</a><a href="javascript:;" class="replybtn" onclick="replyComment(' + v.id + ',\''+commentid+'\')">回复</a>';
    if(v.uid==memberuid) {
        li_html += '<a href="javascript:;" class="deletebtn" onclick="deleteComment(' + v.id + ',this)">删除</a>';
    }
    if(v.reply==0){
		li_html += '<a href="javascript:;" class="zan" onclick="dz(' + v.id + ',this)"><i class="icon icon-zan" title="点赞"></i>赞(<font id="support_' + v.id + '">' + v.support + '</font>)</a><a href="javascript:;" class="replybtn" onclick="replyComment(' + v.id + ',\''+commentid+'\')">回复</a>';
	}
	li_html += '<div class="comment_replay_container clearfix" style="display:none" id="reply_' + v.id + '"></div>';
	li_html += '</div>';
	return li_html;
}
function replyLi(v){
	// var li_html = '<div class="write_avatar"><a href="' + v.user.home + '" target="_blank" class="author-thumb"><img class="media-object" src="' + v.user.avatar + '"></a></div>';
	var li_html = '';
	li_html += '<h5><a href="' + v.user.space + '" target="_blank">' + v.username + '</a></h5>'
	// li_html += '<div class="write_body"><h4 class="media-heading"><a href="' + v.user.home + '" target="_blank">' + v.username + '</a></h4>';
	li_html += '<p>' + v.content + '</p>';
	li_html += '<div class="feedback clearfix">';
	li_html += '<span class="tiptime"><i class="icon icon-date" title="date"></i>' + format_time(v.creat_at,'Y-m-d') + '</span>';
	//li_html += '<a href="javascript:;" class="zan" onclick="commentSupport(' + v.id + ')"><i class="icon icon-zan" title="点赞"></i>赞(<font id="support_' + v.id + '">' + v.support + '</font>)</a><a href="javascript:;" class="replybtn" onclick="replyComment(' + v.id + ',\''+commentid+'\')">回复</a>';
    if(v.uid==memberuid) {
        li_html += '<a href="javascript:;" class="deletebtn" onclick="deleteComment(' + v.id + ',this)">删除</a>';
    }
    // if(v.reply==0){
	// 	li_html += '<a href="javascript:;" class="zan" onclick="commentSupport(' + v.id + ')"><i class="icon icon-zan" title="点赞"></i>赞(<font id="support_' + v.id + '">' + v.support + '</font>)</a><a href="javascript:;" class="replybtn" onclick="replyComment(' + v.id + ',\''+commentid+'\')">回复</a>';
	// }
	// li_html += '<div class="comment_replay_container clearfix" style="display:none" id="reply_' + v.id + '"></div>';
	li_html += '</div>';
	return li_html;
}
// function commentSupport(id,e){

// }
function dz(id,e) {
	// e.stopPropagation()
	if(!$(e).hasClass("zan")){
		return false;
	}
	// if($(e).hasClass("active")){
	//     return false;
	// }
	$.getJSON(/*site_url +*/ '/index.php?m=comment&c=ajax&a=support&commentid='+commentid+'&id='+id, function(data){
		if(data.error == 0) {
			$('#support_'+id).html(parseInt($('#support_'+id).html())+1);
			$(e).addClass("active")
			layer.msg(data.msg);
		} else {
			layer.msg(data.msg);
		}
	});
}
function replyComment(id,commentid) {
	ckeckLogin(function(){
		var str = '<form method="post" data-url="/index.php?m=comment&c=ajax&a=post&commentid='+commentid+'&id='+id+'" onSubmit="return addreply(this)">';
		str += '<textarea class="comment_replay" name="content" rows="5" onKeyDown="countStrLen(this,$(\'#strlen'+id+'\'),$(\'#com_submit'+id+'\'))" onKeyUp="countStrLen(this,$(\'#strlen'+id+'\'),$(\'#com_submit'+id+'\'))"></textarea>';
		str += '<div class="co sub_comment">';
		str += '<div class="tb_to fl">还可输入<span id="strlen'+id+'">140</span>个字</div>';
		str += '<input type="submit" class="write_btn" value="回复" id="com_submit'+id+'">';
		str += '</div>';
		str += '</form>';
		$('#reply_'+id).html(str);
		if($('#reply_'+id).css("display")=="none"){
			$('#reply_'+id).css("display","block")
		}else{
			$('#reply_'+id).css("display","none")
		}
	})
}
function deleteComment(id,e){
    layer.confirm('确定删除吗？', {
        title:"提示",
        btn: ['确定','取消'] //按钮
    }, function(){
        $.get("/api/comment/del.json?id="+id,function(data){
            if(data.error==0){
                layer.msg("删除成功");
                comment_next_page(1);
            }else{
                layer.msg(data.msg);
            }
        },"json");
    })
}
function addComment(form){
	ckeckLogin(function(){
		var content = form.content.value;
		if(content == ''){
			layer.msg('请输入内容！');
			form.content.focus();
			return false;
		}
		var url = form.action!=location.href&&''!=form.action ? form.action : '/index.php?m=comment&c=ajax&a=post&commentid='+commentid;
		$.ajax({
			type: 'post',
			url: url,
			data: 'content=' + encodeURIComponent(content),
			dataType: 'json',
			success: function(data){
				if(data.error == 0){
					form.content.value = '';
                    if(data.data&&data.data.extra_hook&&data.data.extra_hook.point){
                        showPointsPopup(data.data.extra_hook.point.value);
                    }else{
                        layer.msg('发表成功！');
                    }
					comment_next_page(1);
				}else{
					layer.msg(data.msg);
				}
			}
		});
		return false;
	})
	return false;
}

function addreply(form){
	ckeckLogin(function(){
		var content = form.content.value;
		var url=$(form).attr("data-url")
		if(content == ''){
			layer.msg('请输入内容！');
			form.content.focus();
			return false;
		}
		$.ajax({
			type: 'post',
			url: url,
			data: 'content=' + encodeURIComponent(content),
			dataType: 'json',
			success: function(data){
				if(data.error == 0){
					form.content.value = '';
                    if(data.data&&data.data.extra_hook&&data.data.extra_hook.point){
                        showPointsPopup(data.data.extra_hook.point.value);
                    }else{
                        layer.msg('发表成功！');
                    }
					comment_next_page(1);
				}else{
					layer.msg(data.msg);
				}
			}
		});
	})
	return false;
}
function checkfollow(followid){
	ckeckLoginSilence(function(){
		$.ajax({
			url:"/member/follow/check.json",
			data:{followid:followid},
			type:"get",
			success:function(data){
                var ids=followid.split(",");
                for(var i=0;i<data.length;i++) {
                    if (data[i] == 1) {
                        $("#follow_" + ids[i]).addClass("active").html("已关注").attr("data-type", "cancel")
                        $(".follow_" + ids[i]).addClass("active").html("已关注").attr("data-type", "cancel")
                        if (typeof(checkCollectCB) != "undefined") {
                            checkfollowCB(followid, '已关注');
                        }
                    } else {
                        $("#follow_" + ids[i]).removeClass("active").attr("data-type", "add")
                        $(".follow_" + ids[i]).removeClass("active").attr("data-type", "add")
                    }
                }
			}
		})
	})

}
var isfollowStatus=true;//状态标志
function isfollow(followid,e,str){
    if(isfollowStatus) {
        isfollowStatus = false
        ckeckLogin(function () {
            if("add"==$(e).attr("data-type")){
					follow(followid, e)
				} else {
					followed(followid, e, str)
				}
        })
    }
}
function follow(followid,e){
	ckeckLogin(function(){
		$.ajax({
			url:"/member/follow/add.json",
			data:{followid:followid},
			type:"get",
			success:function(data){
				if(data.error){
					layer.msg(data.msg);
				}else{
					if(e){
						$(e).html("已关注")
						$(e).addClass("active").attr("data-type","cancel")
						if(typeof(checkfollowCB)!="undefined"){
							checkfollowCB(followid,'已关注');
						}
					}
					layer.msg('关注成功');
				}
                isfollowStatus=true
			},
			error:function(){
                isfollowStatus=true
			}
		})
	})

}
function followed(followid,e,str){
	ckeckLogin(function(){
		$.ajax({
			url:"/member/follow/del.json",
			data:{followid:followid},
			type:"get",
			success:function(data){
				if(data.error){
					layer.msg(data.msg);
				}else{
					if(e){
						$(e).html(str)
                        $(e).removeClass("active").attr("data-type","add")
						if(typeof(checkfollowCB)!="undefined"){
							checkfollowCB(followid,"+关注");
						}
					}
					layer.msg('取消关注');
				}
                isfollowStatus=true
            },
            error:function(){
                isfollowStatus=true
            }

		})
	})

}
function askQuestion(fromid){
	var ask_text = $("#"+fromid+" .ask_area").val();
	if(ask_text==""){
		layer.msg("请填写问题");
		return false;
	}
	var ask_type = $("#"+fromid+" #typeid").val();
	if(ask_type==""){
		layer.msg("请选择问题类型");
		return false;
	}

	var sak_form = $("#"+fromid).serialize();
	$.post("index.php?m=member&c=content&a=add",sak_form, function(data){
		if(data.error == 0){
			layer.msg("提问成功");
			setTimeout(function(){
				window.location.reload();
			},1000);
		}else{
			data.msg ? layer.msg(data.msg) : layer.msg('发布失败');
		}
	},'json');
	return false;
}
function uploadData(array,num,property,id,modelid,uid){
	var url;
	array[0].num=num;
	array[0].property=property;
	localStorage.search=JSON.stringify(array);
	var addStr;
	addStr = num == "1" ? '':'&num='+num;
	if(id==''){
		if(undefined===uid){
		}else{
			url='/music/player.html?modelid='+modelid+'&space_uid='+uid+'&property='+property+addStr
		}
	}else{
		if(undefined===modelid){
			url='/music/player.html?id='+id+'&property='+property+addStr;
		}else{
			url='/music/player.html?id='+id+'&modelid='+modelid+'&property='+property+addStr;
		}
	}
	window.open(url, 'player');
}
function downCheckBuy(id,modelid){
	var modelids=new Array(id.length+1).join(modelid+",");
	$.ajax({
		type:"get",
		url:"/content/app.json?op=buycheckV2&q=json",
		data:{"modelid":modelids.substr(0, modelids.lastIndexOf(',')),"id":id.join(",")},
		dataType:"json",
		async:false,
		success:function(data){
			if(data.error==0){
				for(var i= 0;i<data.lists.length;i++){
					if(data.lists[i]=='2'){
						$('.j-operate'+id[i]).find('.download').attr({"data-purchase":"true","data-thumb":data.goodslists[0].thumb?data.goodslists[0].thumb:img_path+"video60bg.png","data-title":data.goodslists[i].title,"data-id":data.goodslists[i].id});
					}else{
						$('.j-operate'+id[i]).find('.download').attr("href",$('.j-operate'+id[i]).find('.download').attr("data-href"));
						$('.j-operate'+id[i]).find('.download').removeAttr("data-href")
					}
				}
			}else{
				console.log(layer.msg);
			}
		}
	});
}
/**获取cookie**/
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}
/**保存cookie**/
function saveCookie(name, value, options){
    options = options || {};
    if (value === null) {
        value = '';
        options.expires = -1;
    }
    var expires = '';
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
        var date;
        if (typeof options.expires == 'number') {
            date = new Date();
            date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
        } else {
            date = options.expires;
        }
        expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
    }
    var path = options.path ? '; path=' + options.path : '';
    var domain = options.domain ? '; domain=' + options.domain : '';
    var secure = options.secure ? '; secure' : '';
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
}
// 显示积分弹窗
function showPointsPopup(num){
    $("body").append('<div class="receive-points-popup">' +
        '    <div class="animate-box"></div>' +
        '    <p>积分+'+num+'</p>' +
        '</div>');
    setTimeout(function(){
        $(".receive-points-popup").remove();
    },2500);
}