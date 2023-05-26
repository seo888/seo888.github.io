function nry_tp(data) {
	var rx01 = document.getElementById('nry_tp');
	var rx11 = document.getElementById('tpx210');
	if (data.Retcode == 200) {
		rx01.setAttribute("style", "display:block;")
		rx11.setAttribute("src", data.url)
	} else {
		rx01.setAttribute("style", "display:none;")
		rx11.setAttribute("scr", '');
	}
}
$(document).ready(function () {
	$("embed").each(function () {var embed = $(this);var parentNode = embed.parent();parentNode = embed.parent().html("");$("<video/>", {"preload": "auto", "muted":"muted","controls": "controls","autoplay": "false",html: '<source src="' + embed.attr("urlapp") + '" type="video/mp4" />您的浏览器不支持Video标签。',}).appendTo(parentNode);});$("video").on("loadedmetadata", function () {var videoWidth = this.videoWidth;console.log(videoWidth);if (videoWidth > 650) {$(this).css("width", "650px");}})
	
	$(".maincontent img").each(function(){
		$(this).parent().attr("style", "text-align:center;");
	});
});