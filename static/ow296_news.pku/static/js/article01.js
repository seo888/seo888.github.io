$(".topicList02 .flexslider").flexslider({
    animation: 'slide',
    prevText: "",           //String:  上一项的文字
  	nextText: "",               //String:  下一项的文字
    animationLoop: true,
	slideshowSpeed: 4000, //展示时间间隔ms
	animationSpeed: 600, //滚动时间ms
	 pauseOnHover: true,
            //鼠标滑向滚动内容时，是否暂停滚动
	touch: true //是否支持触屏滑动
// slideshow:false
});

$('.flex-direction-nav a').each(function(e){
	var $this =$(this)
	$this.addClass('iconfont');
	//$this.text('');
	if($this.hasClass('flex-prev')){
		$(this).addClass('icon-arrow')
	}else if($this.hasClass('flex-next')){
		$(this).addClass('icon-arrow1')
	}
})
articleShare()//文章页分享
asideFix()//文章页侧边栏固定
//获取文章页的图片去掉首行缩进
$('.article').find('img').each(function(){
 	$(this).parent().css('text-indent',0)
})
$('.article').find('video').each(function(){
      var videoWidth = $(this).width()
      var videoHeight = $(this).height();
      var videoPic = $(this).attr('poster')
      $(this).parent('p').css('text-indent','0')
      $(this).wrap('<div></div>');
      $(this).parent('div').css({
        width:videoWidth,
        height:videoHeight,
        margin:'0 auto'
      })
      $(this).css('display','none');
      $(this).parent('div').css({
        backgroundImage:'url('+videoPic+')',
      })
      $(this).parent('div').addClass('articleVideo');
      $(this).parent('div').append('<span class="videoPlay iconfont icon-play1"></span>')
      $(this).next('.videoPlay').click(function(){
        $(this).prev('video').fadeIn(300).get(0).play();
        $(this).fadeOut(100)
      })
    })