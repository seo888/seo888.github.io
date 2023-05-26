	//获取url中的参数
	function getUrlParam(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	    if (r != null) return unescape(r[2]); return null; //返回参数值
	}


    var cxid = getUrlParam('cxid');

    window.html11 = '';
    window.html22 = '';

    switch(cxid){
    	case "isz":
    		window.html11 = '<script type="text/javascript" src="http://adv.sznews.com/s?z=sznews&c=468" charset="gbk" ></script>';
            break;
        case 'ins':
            window.html11 = '';
            break;
    	default:
    		window.html11 = '';
    }
    $(function(){
        $("a[href='http://a.app.qq.com/o/simple.jsp?pkgname=com.sznews.aishenzhen']").attr('href','http://a.app.qq.com/o/simple.jsp?pkgname=com.sznews');
    });