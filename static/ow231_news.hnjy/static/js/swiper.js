$(document).ready(function(){
	/* 首页 - 焦点图 */
	if($('.swiper-focus')) {
		var mySwiperFocus = new Swiper('.swiper-focus', {
			autoplay: 5000,
			speed: 600,
			autoplayDisableOnInteraction : false,
			slidesPerView: 1,
			paginationClickable: true,
			pagination: '.swiper-focus .swiper-pagination',
		})
	}

	/* 先声视频 */
	if($('.swiper-video')) {
		var mySwiperVideo = new Swiper('.swiper-video', {
			autoplay: 5000,
			speed: 600,
			autoplayDisableOnInteraction : false,
			slidesPerView: 3,
			spaceBetween : 15,
			prevButton:'.video-box .swiper-button-prev',
			nextButton:'.video-box .swiper-button-next',
		})
	}

	/* 基础教育-焦点图 */
	if($('.swiper-edu')) {
		var mySwiperEdu = new Swiper('.swiper-edu', {
			autoplay: 5000,
			speed: 600,
			autoplayDisableOnInteraction : false,
			slidesPerView: 1,
			prevButton:'.swiper-edu .swiper-button-prev',
			nextButton:'.swiper-edu .swiper-button-next',
		})
	}

	/* 高等教育-焦点图 */
	if($('.swiper-edu-gd')) {
		var mySwiperEduGd = new Swiper('.swiper-edu-gd', {
			autoplay: 5000,
			speed: 600,
			autoplayDisableOnInteraction : false,
			slidesPerView: 1,
			paginationClickable: true,
			pagination: '.swiper-edu-box .swiper-pagination',
		})
	}

	/* 小记者站 - 首页焦点图 */
	if($('.swiper-report-banner')) {
		var mySwiperFocus = new Swiper('.swiper-report-banner', {
			autoplay: 5000,
			speed: 600,
			autoplayDisableOnInteraction : false,
			slidesPerView: 1,
			paginationClickable: true,
			pagination: '.swiper-report-banner .swiper-pagination',
			prevButton:'.swiper-report-banner .swiper-button-prev',
			nextButton:'.swiper-report-banner .swiper-button-next',
			paginationType: 'fraction',
		})
	}

	/* 小记者在现场 */
	if($('.swiper-scene')) {
		var mySwiperScene = new Swiper('.swiper-scene', {
			autoplay: 5000,
			speed: 600,
			autoplayDisableOnInteraction : false,
			slidesPerView: 4.5,
			spaceBetween : 15,
			prevButton:'.swiper-scene .swiper-button-prev',
			nextButton:'.swiper-scene .swiper-button-next',
		})
	}

	/* 美丽幼儿园 */
	if($('.swiper-kidgarden')) {
		var mySwiperScene = new Swiper('.swiper-kidgarden', {
			autoplay: 5000,
			speed: 600,
			autoplayDisableOnInteraction : false,
			slidesPerView: 1,
			paginationClickable: true,
			pagination: '.kidgarden-box .swiper-pagination',
		})
	}

	/* 名师名园长 */
	if($('.swiper-teacher')) {
		var mySwiperScene = new Swiper('.swiper-teacher', {
			autoplay: 5000,
			speed: 600,
			autoplayDisableOnInteraction : false,
			slidesPerView: 1,
			paginationClickable: true,
			pagination: '.teacher-box .swiper-pagination',
		})
	}

	/* 详情页 - 相关推荐 */
	if($('.relevant-recommend .swiper-video')) {
		var mySwiperVideo = new Swiper('.relevant-recommend .swiper-video', {
			autoplay: 5000,
			speed: 600,
			autoplayDisableOnInteraction : false,
			slidesPerView: 3,
			spaceBetween : 15,
			prevButton:'.relevant-recommend .swiper-button-prev',
			nextButton:'.relevant-recommend .swiper-button-next',
		})
	}
});