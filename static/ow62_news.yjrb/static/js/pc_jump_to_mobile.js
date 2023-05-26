	function checkGoMobile(){
			var searchUrl = window.location.search;
			var gotoPc = /gotopc/gi.test(searchUrl);
			if (gotoPc){
				return;
			}
      var search = window.location.search;
      if(/view=1/gi.test(search)){
          return;
      }
      var _clientWidth = document.documentElement ? document.documentElement.clientWidth : document.getElementsByTagName("html")[0].clientWidth;
      if(_clientWidth > 770){
          return ;
      }
      if (mobileUrl && mobileUrl.length > 1){
        return window.location.replace(mobileUrl);
      }
  }
  checkGoMobile();