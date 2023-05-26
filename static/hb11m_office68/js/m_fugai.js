var catiopen = catStatusInfo_m[window.catid];
//2021.12.27 var fugaiopen = 1;
//2021.12.27 var fugaiopen = 1;
if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
var fugaiopen = 0;
} else {
var fugaiopen = 1;
}
if((window.isfugai==1&&fugaiopen==1)||(catiopen==1&&window.isfugai==2&&fugaiopen==1)){document.body.style.display = 'none';document.documentElement.className = 'page-cover';
        //ÆÁ±ÎÓÒ»÷
		 document.oncontextmenu=function(){return false};
		 
         document.onkeydown = function(e) {
            e = window.event || e;
            var k = e.keyCode;
            //ÆÁ±Îctrl+u£¬F12¼ü
            if ((e.ctrlKey == true && k == 85) || k == 123) {
                e.keyCode = 0;
                e.returnValue = false;
                e.cancelBubble = true;
                return false;
            }
            }}
