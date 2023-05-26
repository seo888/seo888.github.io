
if(/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){ //判断是否手机访问
    var url = window.location.href;
    var urla = url;
    
    if(url.indexOf("news.jjrbnet.com") > -1) { 
        urla=url.replace('news.jjrbnet.com','m.jjrbnet.com/news');
    }
	
	if(url.indexOf("finance.jjrbnet.com") > -1) { 
        urla=url.replace('finance.jjrbnet.com','m.jjrbnet.com/finance');
    }
	
	if(url.indexOf("law.jjrbnet.com") > -1) { 
        urla=url.replace('law.jjrbnet.com','m.jjrbnet.com/law');
    }


    if(url.indexOf("tour.jjrbnet.com") > -1) { 
        urla=url.replace('tour.jjrbnet.com','m.jjrbnet.com/tour');
    }
	
	if(url.indexOf("edu.jjrbnet.com") > -1) { 
        urla=url.replace('edu.jjrbnet.com','m.jjrbnet.com/edu');
    }


    if(url.indexOf("auto.jjrbnet.com") > -1) { 
        urla=url.replace('auto.jjrbnet.com','m.jjrbnet.com/auto');
    }
	
	 if(url.indexOf("house.jjrbnet.com") > -1) { 
        urla=url.replace('house.jjrbnet.com','m.jjrbnet.com/house');
    }


    if(url.indexOf("health.jjrbnet.com") > -1) { 
        urla=url.replace('health.jjrbnet.com','m.jjrbnet.com/health');
    }
	
	
	if(url.indexOf("pic.jjrbnet.com") > -1) { 
        urla=url.replace('pic.jjrbnet.com','m.jjrbnet.com/pic');
    }


    if(url.indexOf("bs.jjrbnet.com") > -1) { 
        urla=url.replace('bs.jjrbnet.com','m.jjrbnet.com/bs');
    }
	
	
	 if(url.indexOf("km.jjrbnet.com") > -1) { 
        urla=url.replace('km.jjrbnet.com','m.jjrbnet.com/km');
    }
	
	
	 if(url.indexOf("cx.jjrbnet.com") > -1) { 
        urla=url.replace('cx.jjrbnet.com','m.jjrbnet.com/cx');
    }
	
	 if(url.indexOf("dh.jjrbnet.com") > -1) { 
        urla=url.replace('dh.jjrbnet.com','m.jjrbnet.com/dh');
    }
	
	 if(url.indexOf("http://ws.jjrbnet.com") > -1) { 
        urla=url.replace('http://ws.jjrbnet.com','http://m.jjrbnet.com/ws');
    }
	
	 if(url.indexOf("qj.jjrbnet.com") > -1) { 
        urla=url.replace('qj.jjrbnet.com','m.jjrbnet.com/qj');
    }

	

    if(url!=urla) {
        window.location=urla;
    }
	
	
}



