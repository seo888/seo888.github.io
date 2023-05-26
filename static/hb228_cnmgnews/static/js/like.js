$(function(){
    $("#scinfo").click(function(){
		var _this=$(this);
	     zanact(contentid,1,_this)
	
	})

	$("#dyinfo").click(function(){
		var _this=$(this);
	     zanact(contentid,2,_this)
	
	})
if(typeof(contentid)!="undefined"){
	loaddatas(contentid);
}


})
function loaddatas(aid) {
		var cid=aid;
		$.getJSON('http://app.cnmgnews.com/?app=member&controller=index&action=getdianzan&callback=?',{'id':cid},function(ret) {
			 $("#scinfo span").html("("+ret.scinfo+")")	;
			 $("#dyinfo span").html("("+ret.dyinfo+")")	
		})
}
//点赞
//aid  文章id
//type  1 文章  2 问答  3 评论 
function zanact(aid,type,that) {
		var cid=aid;
		var type=type;
		$.getJSON('http://app.cnmgnews.com/?app=member&controller=index&action=dianzan&callback=?',{'type':type,'id':cid},function(ret) {
				if(ret.status)
				{
					   showmsg(ret.msg);
					   //if(type==1)
					   that.find("span").html("("+ret.zannums+")");//点赞数量
					
				}else
			    {
					showmsg(ret.msg)
					if(ret.code=='10000')
					{
						window.location.href="http://app.cnmgnews.com/?app=member&controller=index&action=login" 
					}
				}
			   
			},'json')
}


function dingyue(aid) {
		var cid=aid;
		var type=type;
		$.getJSON('http://app.cnmgnews.com/?app=member&controller=index&action=dianzan&callback=?',{'type':'3','id':cid},function(ret) {
				if(ret.status)
				{
					   showmsg("点赞成功");
					  
					
				}else
			    {
					showmsg(ret.msg)
					if(ret.code=='10000')
					{
						window.location.href="http://app.cnmgnews.com/?app=member&controller=index&action=login" 
					}
				}
			   
			},'json')
}

function showmsg(str){
	alert(str);
}