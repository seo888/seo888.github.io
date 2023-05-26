/* 视频插件 */
//document.write('<script type="text/javascript" src="//www.scol.com.cn/scolplayer/jwplayer.js"><\/script>');
//document.write('<script type="text/javascript" src="//www.scol.com.cn/scolplayer/jwscol.js"><\/script>');
document.write('<script type="text/javascript" src="//www.scol.com.cn/scolplayer/cyberplayer.js"><\/script>');
document.write('<script type="text/javascript" src="//www.scol.com.cn/scolplayer/bdvideo.js?r=32"><\/script>');
/* 推荐新闻 */
document.write('<script type="text/javascript" src="//www.scol.com.cn/scol-3/js/19page_mescroll.js"></script>');

$(function(){
	$('#m_logo').html('<i class="fa fa-chevron-left btn-back"></i><i><img src="//www.scol.com.cn/scol-3/images/logo.jpg"></i><i class="btn-menu"></i>');
	$('.btn-back').click(function () {
    	history.go(-1)
  	});
});