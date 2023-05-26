window.onload = function(){
	var divs = document.getElementsByClassName("xwzw_t2");
	for (var i = 0; i < divs.length; i++) {
					var iframes = divs[i].getElementsByTagName("iframe");
					for (var j = 0; j < iframes.length; j++) {
						if(iframes[j].offsetWidth>window.screen.width) {
							iframes[j].style.width=100+'%';
						}
					}
				};
				for (var i = 0; i < divs.length; i++) {
					var imgs = divs[i].getElementsByTagName("img");
					for (var j = 0; j < imgs.length; j++) {
						if(imgs[j].offsetWidth>divs[i].offsetWidth) {
							imgs[j].style.width=100+'%';
							imgs[j].style.height='auto';
						};
					}
				};
}
