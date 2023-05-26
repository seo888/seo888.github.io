function clearContent(){
  $('#content').html('');
}  

function updateAttitude(articleid,attitude){
    if(checkAttitude(articleid)){
        alert("对不起，你已经发过表情了！");
        return;
    }
    
    $.post("/app/post.php",
       { action: "doupdate", type: "attitude", articleid: articleid, attitude: attitude},
       function(data){
          var json=eval('('+data+')');
          $('#percent_num_1').html(json.a_1);
          $('#percent_num_2').html(json.a_2);
          $('#percent_num_3').html(json.a_3);
          $('#percent_num_4').html(json.a_4);
          $('#percent_num_5').html(json.a_5);
          
          $('#percent_img_1').height(((json.a_1/json.cou)*100));
          $('#percent_img_2').height(((json.a_2/json.cou)*100));
          $('#percent_img_3').height(((json.a_3/json.cou)*100));
          $('#percent_img_4').height(((json.a_4/json.cou)*100));
          $('#percent_img_5').height(((json.a_5/json.cou)*100));
          
          //将投票记录写入 cookie
          if( $.cookie('article_attitude')==null ){
              var attitude=articleid;
          }else{
          	  var attitude=$.cookie('article_attitude');
          	  attitude_arr=explode(',',attitude);
          	  if(attitude_arr.length>=200){
          		attitude_arr.pop();
          	  }
          	  attitude_arr.unshift(articleid);
          	  attitude=implode(',',attitude_arr);
          }
          $.cookie('article_attitude',attitude,{expires:1, path:'/', domain:'gxnews.com.cn',secure:false});
       } 
    );
} 

function resetAttitude(articleid){
    $.post("/app/post.php",
       { action: "select", type: "attitude", articleid: articleid},
       function(data){
          var json=eval('('+data+')');
          $('#percent_num_1').html(json.a_1);
          $('#percent_num_2').html(json.a_2);
          $('#percent_num_3').html(json.a_3);
          $('#percent_num_4').html(json.a_4);
          $('#percent_num_5').html(json.a_5);
          
          $('#percent_img_1').height(((json.a_1/json.cou)*100));
          $('#percent_img_2').height(((json.a_2/json.cou)*100));
          $('#percent_img_3').height(((json.a_3/json.cou)*100));
          $('#percent_img_4').height(((json.a_4/json.cou)*100));
          $('#percent_img_5').height(((json.a_5/json.cou)*100));
       } 
    );
}

//验证是否已经发过表情
function checkAttitude(articleid){
    var attitude_arr = new Array();
    if( $.cookie('article_attitude')==null ){
        return false;
    }else{
        //如果已经投过票
        var attitude=$.cookie('article_attitude');
       /* attitude_arr=explode(',',attitude);
        if( attitude_arr.find(articleid) ){
            return true;
        }else{
            return false;
        }*/
        attitude_arr = attitude.split(',');
		for (var i in attitude_arr) {
			if (attitude_arr[i] == articleid) {
				return true;	
			}
		}
        return false;
    }
}

function resetComment(articleid){
    $.post("/app/post.php",
       { action: "count", type: "comment", articleid: articleid},
       function(data){
          var json=eval('('+data+')')
          $('#comment_count').html(json);
       } 
    );
}

function validate_bbslogin()
{
	if (form_bbslogin.vb_login_username.value == '')
	{
		alert('请输入用户名！');
		form_bbslogin.vb_login_username.focus();
	}
	else if (form_bbslogin.vb_login_password.value == '')
	{
		alert('请输入密码！');
		form_bbslogin.vb_login_password.focus();
	}
	else
	{
		form_bbslogin.submit();
	}
}

function setContentFontsize(i)
{
	document.getElementById("content").style.fontSize = i + "px";
}



//重置图片尺寸
window.onload = function()
{
	var maxWidth = 550; //内文图片的最大宽度
	$('#left_3 img').each(function(i){ // 重置图片大小，防止撑开页面
		if (this.width > maxWidth) {
			this.width  = maxWidth;
			this.height = parseInt(maxWidth * this.height / this.width);
		}
		
	}); 

}


//(支持“←、→”按键翻页)
document.onkeydown = function(e) {     
	var theEvent = window.event || e;     
	var code = theEvent.keyCode || theEvent.which;     
	if (code == 37 && $('#artCon_prev').attr('href') != undefined) { //左箭头按键
		window.location = $('#artCon_prev').attr('href');
	}
	if (code == 39 && $('#artCon_next').attr('href') != undefined) { //右箭头按键
		window.location = $('#artCon_next').attr('href');
	}
}


