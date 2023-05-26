$(document).ready(function(){
	var linkListItem = $(".link-list li");
    linkListItem.each(function () {
        $(this).hover(function () {
            $(".link-child-list", $(this)).show();
        }, function () {
            $(".link-child-list", $(this)).hide();
        })
    });

	/* 栏目tab切换 */
	$('.news-head-tab').find('span').delegate('','mouseenter',function(){
		$(this).siblings().removeClass('active');
		$(this).addClass("active");

		var index = $(this).index();

		var bigDiv = $(this).parent().parent();
		$(bigDiv).find('ul').hide();
		$($(bigDiv).find('ul')[index]).show();
		
	})
});