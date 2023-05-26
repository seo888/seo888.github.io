/**
 * @author xujun
 **/




/**
 * 以下参数在系统配置时必填，特别注意！
 **/
//素材文件夹路径，放置图片FLASH的地方
//var	IM_AD_ROOT_PATH="https://192.9.150.70/images/upload/";
var	IM_AD_ROOT_PATH="//img.zjol.com.cn/05zjol/adcode/images/upload/";
//var	IM_AD_ROOT_PATH="https://61.130.8.218/images/upload/";

//点击素材链接路径，考虑到记录点击率问题
var	IM_AD_link="";
//放置广告位内容的JS目录，这些JS是由广告系统自动生成的
//var	AD_JS_ROOT_PATH="https://192.9.150.70/js/cachejs/";
var	AD_JS_ROOT_PATH="//img.zjol.com.cn/05zjol/adcode/js/cachejs/";
//var	AD_JS_ROOT_PATH="https://61.130.8.218/js/cachejs/";

//高级广告JS效果的外部附加文件路径，'幻灯片'等高级广告效果要依赖此文件夹的文件
//var	IM_AD_JS_TOOL="https://192.9.150.70/js/tool/";
var	IM_AD_JS_TOOL="//www.zjol.com.cn/05zjol/adcode/js/tool/";
//var	IM_AD_JS_TOOL="https://61.130.8.218/js/tool/";

//adtool.js的路径
var IM_ADTOOL = "//img.zjol.com.cn/05zjol/adcode/js/";

//在json_edit.js文件里有后备服务器的路径要设置，不要忘记

/**
 * 以下参数在系统配置时可不填，但推荐填上，以防出错！
 **/
//素材出错时显示的路径
var ERROR_IMG_DEFAULT_PATH="https://www.zjol.com.cn/05zjol/images/main/ggzs_200.jpg";  
//广告链接出错时显示的链接
var ERROR_IMG_DEFAULT_LINK="https://www.zjol.com.cn/05zjol/guanggao/ad.html";  
//文字说明未设定内容时显示的文字
var ERROR_TEXT_DEFAULT_CONTENT="浙江在线广告位";

//载入外部JS文件，以下2方法用于幻灯片广告
document.write("<script	type='text/javascript' src='"+IM_AD_JS_TOOL+"yu.js"+"'></script>");
document.write("<script	type='text/javascript' src='"+IM_AD_JS_TOOL+"tb.js"+"'></script>");

//保存广告信息
/**
 * 保存一个广告的信息
 * @param	adUrl		广告的地址
 * @param	adLink	  点击广告的连接地址
 * @param	adText	 广告文字
 * @param	keyWord		关键字
 * @param	opener		广告关闭按钮，-1为关闭状态，其他则为打开
 **/
function ImAd( adUrl, adLink, adText ,keyWord, opener){
		this.adUrl	=	adUrl;
		this.link	=	adLink;
		this.adText	=	adText;
		this.keyWord	=	keyWord;
		this.opener	=	opener;
			
		if (this.adUrl == undefined || this.adUrl ==""){
			this.adUrl = ERROR_IMG_DEFAULT_PATH
		}else{
			this.adUrl = IM_AD_ROOT_PATH	+  this.adUrl
		 }
		if (this.link == undefined){
			this.link = ERROR_IMG_DEFAULT_LINK
		}
		if (this.adText == undefined || this.adText ==""){
			this.adText = ERROR_TEXT_DEFAULT_CONTENT
		}
		if (this.keyWord == undefined || this.keyWord ==""){
			this.keyWord = "hiywefqehrbdefgrrbiadungqewribgqwrebgqrouhtqwrgfdfdfg"
		}				
		if (this.link != ""){
		this.link	=	IM_AD_link	+ this.link
		}				

}


//保存广告位
/**
 * 保存一个广告位
 * @param	adType	 广告类型0 ->	flash	 1-> 图片广告位	 2 ->	文字链广告位 3 ->幻灯片广告 4->弹出页广告 5->内文广告  6->漂浮广告  7->全屏广告  8 ->轮播广告  9 ->FLASH幻灯片广告   10 ->背投广告   11 ->视频广告(播放器和文件路径要填绝对路径)   12 ->随机显示广告   13 ->内框广告
 * @param	arrImAd	 该广告位上面显示的所有广告
 * @param	height	 图片的高度
 * @param	width	 图片的宽度
 * @param	para	 幻灯片广告的时间、全屏广告的时间、内文广告产生作用域的div的id（范围越小越好，范围定义过大会出错）
 * @param adIndexX   广告横向位置，注意是字符串类型的而且不要带空格，负数表示从右至左的宽度
 * @param adIndexY   广告纵向位置，注意没有负数
 **/
function ImAdcolumn( adType, arrImAd, width, height, para, adIndexX, adIndexY){
		//广告类型
		this.adType = adType;
    // 里面存放的对象都是ImAd
    this.arrImAd = arrImAd;
    // 高度
    this.height = height;
    // 宽度
    this.width = width;
    // 广告参数    
    this.para = para;
    //如果adIndexX为负数，则表示从右向左的数值
		this.adIndexX	=	adIndexX;
		this.adIndexY	=	adIndexY;		      

		if (this.adType == undefined || this.adType ==""){
			this.adType = 1
		}
		if (this.arrImAd == undefined || this.arrImAd =="" || this.arrImAd.length == 0){
			this.arrImAd = new ImAd("","","","")
		}
		if (this.height == undefined || this.height ==""){
			this.height = 100
		}
		if (this.width == undefined || this.width ==""){
			this.width = 100
		}
		if (this.para == undefined || this.para ==""){
			this.para = ""
		}
		if (this.adUrl == undefined || this.adUrl ==""){
			this.adUrl = ERROR_IMG_DEFAULT_PATH
		}
		if (this.adUrl == undefined || this.adUrl ==""){
			this.adUrl = ERROR_IMG_DEFAULT_PATH
		}				
    		
		if (this.adIndexX==undefined || typeof(this.adIndexX)!='string' || this.adIndexX ==""){
			this.adIndexX = "100"
		}

		if (this.adIndexY==undefined || this.adIndexY ==""){
			this.adIndexY = "100"
		}				



    /**
     * 把广告位画出来
     **/
    this.draw = function() {
        // 画div层
        var imAd= this.arrImAd[0];
        // 如果是flash的话
        if ( this.adType == 0 ) {
            this.drawFlash(imAd);
        } else if( this.adType == 1 ) {
            this.drawPic(imAd);
        } else if ( this.adType == 2 ) {
            this.drawTextLink(imAd);
        } else if ( this.adType == 3 ) {
            this.drawSlide(arrImAd);
        } else if ( this.adType == 4 ) {
            this.drawWin(imAd);
        } else if ( this.adType == 5 ) {
            this.drawKey(arrImAd);
        } else if ( this.adType == 6 ) {
            this.drawFloat(imAd);
        } else if ( this.adType == 7 ) {
            this.drawBackPic(imAd);
        } else if ( this.adType == 8 ) {
            this.drawSlideR2(arrImAd);
        } else if ( this.adType == 9 ) {
            this.drawSlideFlash(arrImAd);
        } else if ( this.adType == 10 ) {
            this.drawBehindAll(imAd);
        } else if ( this.adType == 11 ) {
            this.drawFlv(imAd);
        } else if ( this.adType == 12 ) {
            this.drawRandom(arrImAd);
        } else if ( this.adType == 13 ) {
            this.drawIframe(imAd);
        }
		
    }
    
    
    /**
     * 画文字链接
     * @param imAd 广告信息
     **/
    this.drawTextLink = function( imAd ) {
    	  //关闭按钮
      	if(-1 == imAd.opener){return}
    	
        // 组装生成div的id
        //var divId = this.randomChar(10);
        var divContent = '';
        //divContent += '<div id="' + divId + '" style="left:0;top:0;">'; 
	
        if ( imAd.link ) {
            divContent += '<a href="' + imAd.link + '" target="_blank" >' + imAd.adText + '</a>';
        } else {
            divContent +=  imAd.adText;
        }
        //divContent += '</div>'; 
        document.write(divContent);
    }
    

    /**
     * 画html图片广告
     * @param imAd 广告信息
     **/
    this.drawPic = function( imAd ) {
    	  //关闭按钮
      	if(-1 == imAd.opener){return}
        
        if (imAd.adUrl.slice(-4)==".swf"){        
        // 组装生成div的id
        var divId = this.randomChar(10);
        var divContent = '';
        divContent += '<div id="' + divId + '" style="position:relative;left:0;top:0;">'; 
        
        divContent +='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="' + this.width + '" height="' + this.height + '">';
        divContent +='  <param name="movie" value="' + imAd.adUrl + '" />';
        divContent +='  <param name="quality" value="high" />';
        divContent +='  <param name="wmode" value="transparent">';
        divContent +='  <param name="allowScriptAccess" value="always"/>';
        divContent +='  <embed src="' + imAd.adUrl + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + this.width + '" height="' + this.height + '"></embed>';
        divContent +='</object>';

        // 如果有连接的话
        if( imAd.link ) {
            divContent +='	<div style="position:absolute; left:0;top:0;">'; 
            divContent +='		<table width="'+ this.width +'" height="' + this.height + '" border="0" cellspacing="0"  onclick="window.open(\''+ imAd.link +'\');" style="cursor:pointer" cellpadding="0">'; 
            divContent +='		  <tr><td>&nbsp;</td></tr>'; 
            divContent +='		</table>'; 
            divContent +='	</div>'; 
        }
        divContent +='</div>'; 
        document.write(divContent);       	
        }else{        	     
        // 组装生成div的id
        var divId = this.randomChar(10);
        var divContent = '';
        divContent += '<div id="' + divId + '" style="left:0;top:0;">'; 

        if ( imAd.link ) {
       		divContent += '<a target=_blank href="' + imAd.link + '"><img src="' + imAd.adUrl + '" onerror=this.src=ERROR_IMG_DEFAULT_PATH style="cursor:pointer" width="' + this.width + '" height="' + this.height + '" border=0 /></a>'; 
        } else {
            divContent += '<img src="' + imAd.adUrl + '" onerror=this.src=ERROR_IMG_DEFAULT_PATH width="' + this.width + '" height="' + this.height + '" />'; 
        }
        divContent += '</div>'; 
        document.write(divContent);
        }
    }


    /**
     * 画FLASH
     * @param imAd 广告信息
     **/
    this.drawFlash = function ( imAd ) {
    	  //关闭按钮
      	if(-1 == imAd.opener){return}
    	    	
        if (imAd.adUrl.slice(-4)==".swf"){        
        // 组装生成div的id
        var divId = this.randomChar(10);
        var divContent = '';
        divContent += '<div id="' + divId + '" style="position:relative;left:0;top:0;">'; 
        
        divContent +='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="' + this.width + '" height="' + this.height + '">';
        divContent +='  <param name="movie" value="' + imAd.adUrl + '" />';
        divContent +='  <param name="quality" value="high" />';
        divContent +='  <param name="wmode" value="transparent">';
        divContent +='  <param name="allowScriptAccess" value="always"/>';
        divContent +='  <embed src="' + imAd.adUrl + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + this.width + '" height="' + this.height + '"></embed>';
        divContent +='</object>';

        // 如果有连接的话
        if( imAd.link ) {
            divContent +='	<div style="position:absolute; left:0;top:0;">'; 
            divContent +='		<table width="'+ this.width +'" height="' + this.height + '" border="0" cellspacing="0"  onclick="window.open(\''+ imAd.link +'\');" style="cursor:pointer" cellpadding="0">'; 
            divContent +='		  <tr><td>&nbsp;</td></tr>'; 
            divContent +='		</table>'; 
            divContent +='	</div>'; 
        }
        divContent +='</div>'; 
        document.write(divContent);       	
        }else{        	     
        // 组装生成div的id
        var divId = this.randomChar(10);
        var divContent = '';
        divContent += '<div id="' + divId + '" style="left:0;top:0;">'; 

        if ( imAd.link ) {
       		divContent += '<a target=_blank href="' + imAd.link + '"><img src="' + imAd.adUrl + '" onerror=this.src=ERROR_IMG_DEFAULT_PATH style="cursor:pointer" width="' + this.width + '" height="' + this.height + '" border=0 /></a>'; 
        } else {
            divContent += '<img src="' + imAd.adUrl + '" onerror=this.src=ERROR_IMG_DEFAULT_PATH width="' + this.width + '" height="' + this.height + '" />'; 
        }
        divContent += '</div>'; 
        document.write(divContent);
        } 
    }

    /**
     * 画幻灯片
     * @param arrImAd 广告信息组
     **/
    this.drawSlide = function( arrImAd ) {
        // 组装生成div的id
        var divId = this.randomChar(10);
        var divContent = '';		
        var i;
        var imAd;
        var exist = -1;
        
        //生成随机序列
  		  var arr = new Array();
				var num;

				for(var i = 0, j; i < this.arrImAd.length; i++)
				{
				 num = parseInt(Math.random() * this.arrImAd.length);
 
				 for(j = 0; j < arr.length; j++)
				 {
				  if(arr[j] == num)break;
				 }
 
				 if(j == arr.length)
				 {
				  arr[arr.length] = num;
				 }
				 else
				 {
				  i --;
				 }
				}        
		
		divContent += '<div id="MainPromotionBanner" style="width:'+this.width+'px;height:'+this.height+'px;">';
		divContent += '<div id="' + divId + '" style="position:relative">';
		divContent += '<ul class="Slides" style="height:'+this.height+'px;">';
	
		for (i = 0; i < this.arrImAd.length; i++) {
			imAd = this.arrImAd[arr[i]];
			//广告是否要显示的判断
     	if(-1 == imAd.opener){continue}
     	exist = 1;
    				
			if (imAd.link) {

				if (imAd.adUrl.slice(-4)==".swf"){			
        divContent += '<li style="width:' + this.width + 'px;height:' + this.height + 'px;"><div style="left:0;top:0;">'; 
        
        divContent +='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="' + this.width + '" height="' + this.height + '">';
        divContent +='  <param name="movie" value="' + imAd.adUrl + '" />';
        divContent +='  <param name="quality" value="high" />';
        divContent +='  <param name="wmode" value="transparent">';
        divContent +='  <param name="allowScriptAccess" value="always"/>';
        divContent +='  <embed src="' + imAd.adUrl + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + this.width + '" height="' + this.height + '"></embed>';
        divContent +='</object>';

        divContent +='	<div style="position:absolute; left:0;top:'+(i*this.height)+';">'; 
        divContent +='		<table width="'+ this.width +'" height="' + this.height + '" border="0" cellspacing="0"  onclick="window.open(\''+ imAd.link +'\');" style="cursor:pointer" cellpadding="0">'; 
        divContent +='		  <tr><td>&nbsp;</td></tr>'; 
        divContent +='		</table>'; 
        divContent +='	</div>'; 
        divContent +='</div></li>'; 			
				} else {
				divContent += '<li style="width:' + this.width + 'px;height:' + this.height + 'px;"><a target="_blank" href="' + imAd.link + '"><img style="width:' + this.width + 'px;height:' + this.height + 'px;" src="' + imAd.adUrl + '"></a></li>';
				}
			}
			else {

				if (imAd.adUrl.slice(-4)==".swf"){			
        divContent += '<li style="width:' + this.width + 'px;height:' + this.height + 'px;"><div style="left:0;top:0;">'; 
        
        divContent +='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="' + this.width + '" height="' + this.height + '">';
        divContent +='  <param name="movie" value="' + imAd.adUrl + '" />';
        divContent +='  <param name="quality" value="high" />';
        divContent +='  <param name="wmode" value="transparent">';
        divContent +='  <param name="allowScriptAccess" value="always"/>';
        divContent +='  <embed src="' + imAd.adUrl + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + this.width + '" height="' + this.height + '"></embed>';
        divContent +='</object>';

        divContent +='</div></li>'; 
        			
				} else {			
			
				divContent += '<li style="width:' + this.width + 'px;height:' + this.height + 'px;"><img style="width:' + this.width + 'px;height:' + this.height + 'px;" src="' + imAd.adUrl + '"></li>';
				} 
			}
		}
		

		divContent += '</ul>';
		divContent += '</div>';
		
		//下面代码是JS工具生成的，关于添加幻灯片效果的JS代码
		divContent += '<scri';
		divContent += 'pt type=\"text/javascri';
		divContent += 'pt\">\r\n';
		divContent += 'TB.widget.SimpleSlide.decoration(\'' + divId + '\', {eventType:\'mouse\', effect:\'scroll\'';
		if(this.para!=""){
			divContent += ',autoPlayTimeout:\''+this.para+'\'';
		}
		divContent += '});\r\n';
		divContent += '</scri';
		divContent += 'pt>\r\n';
		
		divContent += '</div>';
		
		if(-1 == exist){return}		
		
    document.write(divContent);
    }


    /**
     * 画弹出广告
     * @param imAd 广告信息
     **/
    this.drawWin = function(imAd){
		//cookie防重复弹出
		if (this.get_cookie('adpopped'+imAd.adUrl)!=''){return}
    	//关闭按钮
      	if(-1 == imAd.opener){return}
      	
      	if(typeof leftindexvalue == "undefined"){
					leftindexvalue = 10;				 
				}      	
      	    	
    		window.open(imAd.adUrl,"","width="+this.width+",height="+this.height+",left="+leftindexvalue+",toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no");
				
				leftindexvalue = parseInt(leftindexvalue)+parseInt(this.width)+60;
		//设置cookie
		document.cookie="adpopped"+imAd.adUrl+"=yes"
	  }
	
    /**
     * 画内文关键字广告
     * @param arrImAd 广告信息组
     **/
    this.drawKey = function(arrImAd){
        matchAdvertise(this.para,arrImAd);
    }		
    
    
    /**
     * 画漂浮广告
     * @param imAd 广告信息
     **/
    this.drawFloat = function(imAd){
    	  //关闭按钮
      	if(-1 == imAd.opener){return}
      	    	
    		var temple = this.randomChar(10);
    		var stringtext = "";
    		var x = this.adIndexX;
    		var y = this.adIndexY;
				if (x.indexOf("-")==0){
					x = "right:" + x.slice(1) + "px;";
				}else{
					x = "left:" + x + "px;";
				}
				if (y.indexOf("-")==0){
					z = "_top:expression(eval(document.compatMode && document.compatMode==\'CSS1Compat\') ?  documentElement.scrollTop + (document.documentElement.clientHeight-this.offsetHeight"+y+") : document.body.scrollTop + (document.body.clientHeight - this.clientHeight"+y+"));";
					y = "bottom:" + y.slice(1) + "px;";
				}else{
					z = "_top:expression(eval(document.compatMode && document.compatMode==\'CSS1Compat\') ?  documentElement.scrollTop +"+y+" : document.body.scrollTop+"+y+");";
					y = "top:" + y + "px;";
				}
	  		
		stringtext += '<div id="' + temple + '" style="clear:both;z-index:999;' + x + y + 'position:fixed!important;position:absolute;' + z + '" class="adcode">';
		if (imAd.adUrl.slice(-4)==".swf"){				
			stringtext +='<div style="position:relative; left:0;top:0;">'; 
			stringtext +='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="' + this.width + '" height="' + this.height + '">';
			stringtext +='  <param name="movie" value="' + imAd.adUrl + '" />';
			stringtext +='  <param name="quality" value="high" />';
			stringtext +='  <param name="wmode" value="transparent">';
			stringtext +='  <embed src="' + imAd.adUrl + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + this.width + '" height="' + this.height + '"></embed>';
			stringtext +='</object>';

			// 如果有连接的话
			if( imAd.link ) {
				stringtext +='	<div style="position:absolute; left:0;top:0;">'; 
				stringtext +='		<table width="'+ this.width +'" height="' + this.height + '" border="0" cellspacing="0"  onclick="window.open(\''+ imAd.link +'\');" style="cursor:pointer" cellpadding="0">'; 
				stringtext +='		  <tr><td>&nbsp;</td></tr>'; 
				stringtext +='		</table>'; 
				stringtext +='	</div>'; 
			}
			stringtext +='</div>';	

		} else {
			// 如果有连接的话
			if( imAd.link ) {
						stringtext +="<a target=_blank href=" + imAd.link + "><img alt='"+imAd.adText+"' width=" + this.width + " height=" + this.height + " border=0 src=" + imAd.adUrl + "></a>";
			}else {				
					stringtext +="<img alt='"+imAd.adText+"' width=" + this.width + " height=" + this.height + " border=0 src=" + imAd.adUrl + ">";
			}
		}
		stringtext +="<div align=left onclick=\"javascript:document.getElementById('" + temple +"').style.display='none';\" style=\"position:absolute;cursor:pointer;right:0px;top:0px;\" ><img width=\"14\" height=\"14\" border=0 src=\"https://www.zjol.com.cn/05zjol/2010/images/close_btn3.gif\"></div>";
		
		stringtext +="</div>";
		document.write(stringtext);
	} 
    		
    /**
     * 画全屏广告
     * @param imAd 广告信息
     **/
    this.drawBackPic = function(imAd){
    	  //关闭按钮
      	if(-1 == imAd.opener){return}
      	    	
    		var temple = this.randomChar(10);
    		document.writeln("<SCRIPT language=\"JavaScript\">");
    		document.writeln("function fsclock"+temple+"(){fsi"+temple+"=fsi"+temple+"-1;if(fsi"+temple+">0)setTimeout(\"fsclock"+temple+"();\","+((this.para!="")?this.para:"8")+"000);else document.getElementById('div"+temple+"').style.display=\"none\";}");
    		document.writeln("var fsi"+temple+"=2;fsclock"+temple+"();");
    		document.writeln("</SCRIPT>");
    		document.writeln("<div id=\"div"+temple+"\">");
		document.writeln("<div align=left onclick=\"javascript:document.getElementById('div" + temple +"').style.display='none';\" style=\"position:relative;color:#000000;z-index:999;left:"+(this.width-20)+"px;top:20px;cursor:pointer;\" ><img width=\"14\" style=\"display:inline\" height=\"14\" border=0 src=\"/05zjol/2010/images/close_btn3.gif\"></div>");
    		if (imAd.adUrl.slice(-4)==".swf"){
				
        document.writeln('<div style="position:relative; left:0;top:0;">'); 
        document.writeln('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="' + this.width + '" height="' + this.height + '">');
        document.writeln('  <param name="movie" value="' + imAd.adUrl + '" />');
        document.writeln('  <param name="quality" value="high" />');
        document.writeln('  <param name="wmode" value="transparent">');
        document.writeln('  <embed src="' + imAd.adUrl + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + this.width + '" height="' + this.height + '"></embed>');
        document.writeln('</object>');

        // 如果有连接的话
        if( imAd.link ) {
            document.writeln('	<div style="position:absolute; left:0;top:0;">'); 
            document.writeln('		<table width="'+ this.width +'" height="' + this.height + '" border="0" cellspacing="0"  onclick="window.open(\''+ imAd.link +'\');" style="cursor:pointer" cellpadding="0">'); 
            document.writeln('		  <tr><td>&nbsp;</td></tr>'); 
            document.writeln('		</table>'); 
            document.writeln('	</div>'); 
        }
        document.writeln('</div>');				


				} else {
        // 如果有连接的话
        if( imAd.link ) {
        			document.writeln("<a target=_blank href=" + imAd.link + "><img alt='"+imAd.adText+"' width=" + this.width + " height=" + this.height + " border=0 src=" + imAd.adUrl + "></a>");
        }else {				
				document.writeln("<img alt='"+imAd.adText+"' width=" + this.width + " height=" + this.height + " border=0 src=" + imAd.adUrl + ">");
				 }
				}
					
				document.writeln("</div>");
				BackPicValue = "1";
    }


    /**
     * 画轮播广告
     * @param arrImAd 广告信息组
     **/
    this.drawSlideR2 = function( arrImAd ) {
        // 组装生成div的id
        var divId = this.randomChar(10);
        var divContent = '';		
        var i;
        var imAd;
        var exist = -1;
		
		divContent += '<div id="MainPromotionBannerR2" style="width:'+this.width+'px;height:'+this.height+'px;">';
		divContent += '<div id="' + divId + '" style="position:relative">';
		divContent += '<ul class="Slides" style="height:'+this.height+'px;">';

		//数组随机排序
		this.arrImAd.sort(function(){return Math.random()>0.5?-1:1;});	

		for (i = 0; i < this.arrImAd.length; i++) {
			imAd = this.arrImAd[i];
			//广告是否要显示的判断			
     	if(-1 == imAd.opener){continue}
     	exist = 1;
     				
			if (imAd.link) {

				if (imAd.adUrl.slice(-4)==".swf"){			
        divContent += '<li style="width:' + this.width + 'px;height:' + this.height + 'px;"><div style="left:0;top:0;">'; 
        
        divContent +='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="' + this.width + '" height="' + this.height + '">';
        divContent +='  <param name="movie" value="' + imAd.adUrl + '" />';
        divContent +='  <param name="quality" value="high" />';
        divContent +='  <param name="wmode" value="transparent">';
        divContent +='  <param name="allowScriptAccess" value="always"/>';
        divContent +='  <embed src="' + imAd.adUrl + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + this.width + '" height="' + this.height + '"></embed>';
        divContent +='</object>';

        divContent +='	<div style="position:absolute; left:0;top:'+(i*this.height)+';">'; 
        divContent +='		<table width="'+ this.width +'" height="' + this.height + '" border="0" cellspacing="0"  onclick="window.open(\''+ imAd.link +'\');" style="cursor:pointer" cellpadding="0">'; 
        divContent +='		  <tr><td>&nbsp;</td></tr>'; 
        divContent +='		</table>'; 
        divContent +='	</div>'; 
        divContent +='</div></li>'; 			
				} else {
				divContent += '<li style="width:' + this.width + 'px;height:' + this.height + 'px;"><a target="_blank" href="' + imAd.link + '"><img alt="'+imAd.adText+'" style="width:' + this.width + 'px;height:' + this.height + 'px;" src="' + imAd.adUrl + '"></a></li>';
				}
			}
			else {

				if (imAd.adUrl.slice(-4)==".swf"){			
        divContent += '<li style="width:' + this.width + 'px;height:' + this.height + 'px;"><div style="left:0;top:0;">'; 
        
        divContent +='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="' + this.width + '" height="' + this.height + '">';
        divContent +='  <param name="movie" value="' + imAd.adUrl + '" />';
        divContent +='  <param name="quality" value="high" />';
        divContent +='  <param name="wmode" value="transparent">';
        divContent +='  <param name="allowScriptAccess" value="always"/>';
        divContent +='  <embed src="' + imAd.adUrl + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + this.width + '" height="' + this.height + '"></embed>';
        divContent +='</object>';

        divContent +='</div></li>'; 
        			
				} else {			
			
				divContent += '<li style="width:' + this.width + 'px;height:' + this.height + 'px;"><img alt="'+imAd.adText+'" style="width:' + this.width + 'px;height:' + this.height + 'px;" src="' + imAd.adUrl + '"></li>';
				} 
			}
		}
		

		divContent += '</ul>';
		divContent += '</div>';
		
		//下面代码是JS工具生成的，关于添加幻灯片效果的JS代码
		divContent += '<scri';
		divContent += 'pt type=\"text/javascri';
		divContent += 'pt\">\r\n';
		divContent += 'TB.widget.SimpleSlide.decoration(\'' + divId + '\', {eventType:\'mouse\', effect:\'scroll\'';
		if(this.para!=""){
			divContent += ',autoPlayTimeout:\''+this.para+'\'';
		}
		divContent += '});\r\n';
		divContent += '</scri';
		divContent += 'pt>\r\n';
		
		divContent += '</div>';
		
		if(-1 == exist){return}			
		document.write(divContent);
    }


    /**
     * 画FLASH幻灯片广告
     * @param arrImAd 广告信息组
     **/
    this.drawSlideFlash = function( arrImAd ) {
     		var focus_width=parseInt(this.width);
     		var focus_height=parseInt(this.height);
     		var text_height=18;
     		var swf_height = focus_height+text_height;
     		var pics = "";
     		var links = "";
     		var texts = "";
     		var exist = -1;

		    for (i = 0; i < this.arrImAd.length; i++) {
			  		imAd = this.arrImAd[i];
						//广告是否要显示的判断			
     				if(-1 == imAd.opener){continue}
     				exist = 1;			  		
			  		pics = imAd.adUrl+"|"+pics;
			  		links = imAd.link+"|"+links;
			  		texts = imAd.adText+"|"+texts;
				}
				pics = pics.substring(0,pics.length - 1);
				links = links.substring(0,links.length - 1);
				texts = texts.substring(0,texts.length - 1);
     		if(-1 == exist){return}	
    		document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="'+ focus_width +'" height="'+ swf_height +'">');
     		document.write('<param name="allowScriptAccess" value="sameDomain"><param name="movie" value="'+IM_AD_JS_TOOL+'focus.swf"><param name="quality" value="high"><param name="bgcolor" value="#F0F0F0">');
     		document.write('<param name="menu" value="false"><param name=wmode value="opaque">');
     		document.write('<param name="FlashVars" value="pics='+pics+'&links='+links+'&texts='+texts+'&borderwidth='+focus_width+'&borderheight='+focus_height+'&textheight='+text_height+'">');
     		document.write('<embed src="'+IM_AD_JS_TOOL+'focus.swf" wmode="opaque" FlashVars="pics='+pics+'&links='+links+'&texts='+texts+'&borderwidth='+focus_width+'&borderheight='+focus_height+'&textheight='+text_height+'" menu="false" bgcolor="#F0F0F0" quality="high" width="'+ focus_width +'" height="'+ focus_height +'" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');  document.write('</object>');
    }


    /**
     * 画背投广告
     * @param imAd 广告信息
     **/
    this.drawBehindAll = function(imAd){
    	  //关闭按钮
      	if(-1 == imAd.opener){return}
      	    	
    		var adPopup=window.open (imAd.adUrl,"","channelmode=yes");
				adPopup.blur();
				adPopup.opener.focus();
	  }


    /**
     * 画视频广告
     * @param imAd 广告信息
     **/
    this.drawFlv = function(imAd){
    	  var StringTxt = "";
    	  var StringTxt2 = "";
    	  //关闭按钮
      	if(-1 == imAd.opener){return}
      	    	
    		var temple = "spgg";
    		var stringtext = "";
    		var x = "right:10px;";
			var z = "_top:expression(eval(document.compatMode && document.compatMode==\'CSS1Compat\') ?  documentElement.scrollTop + (document.documentElement.clientHeight-this.offsetHeight-10) : document.body.scrollTop + (document.body.clientHeight - this.clientHeight-10));";
			var y = "bottom:10px;";


			

		stringtext += '<div id="' + temple + '" style="clear:both;z-index:999;' + x + y + 'position:fixed!important;position:absolute;' + z + '">';

		StringTxt2 += "<div  style=\"text-align:right; width:"+this.width+"px; background-image:url("+IM_AD_JS_TOOL+"b.jpg); height:20px; border-left:1px solid #1A1A1A\"><div style=\"padding:3px 10px 0px;display:inline;float:left;\"><font size=2 color=White >浙江在线视频广告</font></div><div style=\"display:inline;\"><a style=\"cursor:pointer;\" onclick=\"javascript:document.getElementById('" + temple +"').style.display='none';document.getElementById('" + temple +"').innerHTML=\'\'\"><img src=\""+IM_AD_JS_TOOL+"r.jpg\" width=\"20\" height=\"20\" border=\"0\" /></a></div></div>";			
		var divId = "spggwh";
			var player=IM_AD_JS_TOOL+"vcastr2.swf";
			var swf_width=this.width;
			var swf_height=this.height;
			var texts="英伦风情";
			var files=imAd.adUrl;
			var config='1:自动播放|0:连续播放|100:默认音量|0:控制栏位置|2:控制栏显示|0x000033:主体颜色|60:主体透明度|0x66ff00:光晕颜色|0xffffff:图标颜色|0xffffff:文字颜色|英伦风情:logo文字|:logo地址|:结束swf地址';

			StringTxt2 +='<div id="' + divId + '" style="position:relative; left:0;top:0;width:'+this.width+';height:'+this.height+';"><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="'+ swf_width +'" height="'+ swf_height +'">';
			StringTxt2 +='<param name="movie" value="'+player+'"><param name="quality" value="high">';
			StringTxt2 +='<param name="menu" value="false"><param name=wmode value="opaque">';
			StringTxt2 +='<param name="FlashVars" value="vcastr_file='+files+'&vcastr_title='+texts+'&vcastr_config='+config+'">';
			StringTxt2 +='<embed src='+player+' wmode="opaque" FlashVars="vcastr_file='+files+'&vcastr_title='+texts+'&vcastr_config='+config+'" menu="false" quality="high" width="'+ swf_width +'" height="'+ swf_height +'" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
			StringTxt2 +='</object>'; 
		// 如果有连接的话
        if( imAd.link ) {
            StringTxt2 +='	<div style="position:absolute; left:0;top:0;">'; 
            StringTxt2 +='		<table width="'+ this.width +'" height="' + (parseInt(this.height)-20).toString() + '" border="0" cellspacing="0"  onclick="window.open(\''+ imAd.link +'\');" style="cursor:pointer" cellpadding="0">'; 
            StringTxt2 +='		  <tr><td>&nbsp;</td></tr>'; 
            StringTxt2 +='		</table>'; 
            StringTxt2 +='	</div>'; 
        }
		StringTxt2 +='	</div>';

		stringtext +="</div>";

		document.write(stringtext);

		if(typeof BackPicValue == "undefined"){
			document.getElementById("spgg").innerHTML=StringTxt2;				 
		}else{
		function alertV(){document.getElementById("spgg").innerHTML=StringTxt2;} 
		setTimeout(alertV,10000);
		}
	  }


    /**
     * 画随机广告
     * @param arrImAd 广告信息组
     **/
    this.drawRandom = function( arrImAd ) {
        var exist = -1;
	
				for (i = 0; i < this.arrImAd.length; i++) {
					imAd = this.arrImAd[i];
 	   		 	if(-1 == imAd.opener){continue}
 	  	  	exist = 1;
  		  }    	
		    if(-1 == exist){return}    	
    	
    	
    		var num = this.arrImAd.length-1;
    		    		
    		do {
    		var i = Math.floor(Math.random() * (1 + num));
    		
				imAd = this.arrImAd[i];
				   } while (-1 == imAd.opener);
				
				
				
				if (imAd.adUrl.slice(-4)==".swf"){
				
        document.writeln('<div style="left:0;top:0;">'); 
        
        document.writeln('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="' + this.width + '" height="' + this.height + '">');
        document.writeln('  <param name="movie" value="' + imAd.adUrl + '" />');
        document.writeln('  <param name="quality" value="high" />');
        document.writeln('  <param name="wmode" value="transparent">');
        document.writeln('  <embed src="' + imAd.adUrl + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="' + this.width + '" height="' + this.height + '"></embed>');
        document.writeln('</object>');

        // 如果有连接的话
        if( imAd.link ) {
            document.writeln('	<div style="position:absolute; left:0;top:0;">'); 
            document.writeln('		<table width="'+ this.width +'" height="' + this.height + '" border="0" cellspacing="0"  onclick="window.open(\''+ imAd.link +'\');" style="cursor:pointer" cellpadding="0">'); 
            document.writeln('		  <tr><td>&nbsp;</td></tr>'); 
            document.writeln('		</table>'); 
            document.writeln('	</div>'); 
        }
        document.writeln('</div>');				

				} else {
        // 如果有连接的话
        if( imAd.link ) {
        			document.writeln("<a target=_blank href=" + imAd.link + "><img width=" + this.width + " height=" + this.height + " border=0 src=" + imAd.adUrl + "></a>");
        }else {				
				document.writeln("<img width=" + this.width + " height=" + this.height + " border=0 src=" + imAd.adUrl + ">");
				 }
				}
				document.writeln("</div>");
    }


    /**
     * 画内框广告
     * @param imAd 广告信息
     **/
    this.drawIframe = function(imAd){
    	  //关闭按钮
      	if(-1 == imAd.opener){return}
      	document.write("<script	type='text/javascript' src='"+imAd.adUrl+"'></script>");
    }



    /**
     * 生成随机字符串
     * @param l 位数     
     * @return 生成的随机字符串
     **/    
    this.randomChar = function(l) {
    	var   x="erfqwertyuioplkjhgfdsazxcvbnm";
    	var   tmp="";
    	for(var   i=0;i<l;i++)   {
    		tmp   +=   x.charAt(Math.ceil(Math.random()*100000000)%x.length);
    	}
    	return   tmp;
    }


    /**
     * 获取cookie值
     * @param Name 名称     
     * @return 获取的值
     **/ 
	this.get_cookie = function(Name) {    
		var search = Name + "=";    
		var returnvalue = "";     
		if (document.cookie.length > 0) {     
			offset = document.cookie.indexOf(search);     
			if (offset != -1) {     
				offset += search.length;     
				end = document.cookie.indexOf(";", offset);     
				if (end == -1){     
					end = document.cookie.length;
				}
				returnvalue=unescape(document.cookie.substring(offset, end));     
			}     
		}     
		return returnvalue;     
	}	

}





/**
 * 为页面动态添加外部文件
 * @param filename 文件路径和名字
 * @return filetype 文件类型：js或者css
 **/	
function loadjscssfile(filename, filetype){ 
	if (filetype=="js"){ //判断文件类型 
  	var fileref=document.createElement('script')//创建标签 
  	fileref.setAttribute("type","text/javascript")//定义属性type的值为text/javascript 
	fileref.setAttribute("src", filename)//文件的地址 
	} 
	else if (filetype=="css"){ //判断文件类型 
 	var fileref=document.createElement("link") 
	fileref.setAttribute("rel", "stylesheet") 
	fileref.setAttribute("type", "text/css")  
	 fileref.setAttribute("href", filename) 
	} 
	if (typeof fileref!="undefined"){
  	document.getElementsByTagName("head")[0].appendChild(fileref) 
	} 
} 
loadjscssfile(IM_AD_JS_TOOL+"css.css", "css");
loadjscssfile(IM_AD_JS_TOOL+"style.css", "css");


/**
 * 为内文广告添加JS函数支持
 **/	
				var divWidth="240px";//广告层宽度
    		var divHeight="160px";//广告层高度
    		var loadingImg=IM_AD_JS_TOOL+"loading1.gif";
    		var timerID;

    		//获取鼠标的位置
    		function getMousePosition(event)
    		{
	    		if(event.pageX || event.pageY)//firefox中的位置
         		{
          		return {x:event.pageX, y:event.pageY};
         		}
         		return {//ie中的位置
          		x:event.clientX + document.body.scrollLeft - document.body.clientLeft,
          		y:event.clientY + document.body.scrollTop  - document.body.clientTop
         		};
    		}    		

    		//匹配网页中的特定关键字，加超链接显示；element表示匹配区域
    		function matchAdvertise(element,arrImAd)
    		{
	    		//创建广告层
	    		var divAdvertise=document.createElement("div");
	    		//设定广告层的ID
	    		divAdvertise.id="divAdvertise";
	    		divAdvertise.setAttribute("id","divAdvertise");
	    		divAdvertise.setAttribute("name","divAdvertise");
	
	    		divAdvertise.style.width=divWidth;
	    		divAdvertise.style.height=divHeight;
	    		divAdvertise.style.position="absolute";
	    		divAdvertise.innerHTML="<div id=\"divAdvertiseBar\" name=\"Advertise\"><div id=\"divAdvertiseTitle\" name=\"Advertise\">"+
	    		"</div><div id=\"divAdvertiseClose\" name=\"Advertise\">"+
	    		"<img name=\"Advertise\" src=\""+IM_AD_JS_TOOL+"close.jpg\" width=\"14\" height=\"14\" border=\"0\" onclick=\"hiddenAdShowBox()\" />"+
	    		"</div></div><div id=\"divAdvertiseContent\" name=\"divAdvertiseContent\"></a></div>";
	    		document.body.appendChild(divAdvertise);//添加广告显示层
	
    			//获取element指定的节点
	    		var node=document.getElementById(element);
	    		//判断节点是否存在
	    		if(!node)
	    		{
	        		//如果不存在 直接认为是body的节点
		    		node=document.body;
	    		}
	
	    		//获取element指定的节点中的HTML代码
	    		var temp=node.innerHTML;
	    		
	    		for(var i=0;i<arrImAd.length;i++)
	    		{
	        	//获取匹配全文的关键字信息的正则表达式
		    		var advertise=eval("/"+arrImAd[i].keyWord+"/g");
		    		var adUrl=arrImAd[i].adUrl;
		    		var adLink=arrImAd[i].link;
		    		var adText=arrImAd[i].adText;
		    		var keyWord=arrImAd[i].keyWord;
		    		//将所有关键字信息替换为链接样式
		    		temp=temp.replace(advertise,
        		"<a oncontextmenu=\"return false;\" onmousemove=\"moveDivAdvertise(event);\" onmouseover=\"showAdvertiseSearch(event,'"+adUrl+"','"+adLink+"','"+adText+"','"+keyWord+"');\" style=\"color:Red\" name=\"Advertise\" target=\"_blank\">"+keyWord+"</a>");
	    		}
	    		//替换element指定的节点中的HTML代码
	    		node.innerHTML=temp;
    		}

    		//广告层显示
    		function showAdvertiseSearch(event,adUrl,adLink,adText,keyWord)
    		{
	    		try
	    		{
		    		clearTimeout(timerID);
	    		}
	    		catch(e)
	    		{
		
    			}
	
	    		moveDivAdvertise(event);
	    		document.getElementById('divAdvertiseTitle').innerHTML="关键词\""+keyWord+"\"的相关广告";
	    		document.getElementById('divAdvertiseContent').innerHTML="<img src=\""+loadingImg+"\">";//加载提示
	    		document.getElementById('divAdvertise').style.display="block";
	
    		  advertiseHandler(adUrl,adLink,adText,keyWord);
    		}

    		function advertiseHandler(adUrl,adLink,adText,keyWord)
    		{
	    		var result = "";
	    		result += "<div style=\"float:left\">";
	    		
	    		if (adUrl.slice(-4)==".swf"){
				
    	    result += '<div style="position:relative; left:0;top:0;">'; 
        
    	    result +='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="100" height="100">';
					result +='  <param name="movie" value="' + adUrl + '" />';
    	    result +='  <param name="quality" value="high" />';
    	    result +='  <param name="wmode" value="transparent">';
      	  result +='  <embed src="' + adUrl + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="100" height="100"></embed>';
        	result +='</object>';

        	// 如果有连接的话
        	if( adLink ) {
          	  result +='	<div style="position:absolute; left:0;top:0;">'; 
            	result +='		<table width="100" height="100" border="0" cellspacing="0"  onclick="window.open(\''+ adLink +'\');" style="cursor:pointer" cellpadding="0">'; 
	            result +='		  <tr><td>&nbsp;</td></tr>'; 
  	          result +='		</table>'; 
    	        result +='	</div>'; 
      	  }
        	result +='</div>'; 
        
					} else {
	    		result += "<a target=\"_blank\" href=\""+adLink+"\"><img style=\"border-width : 0px;\" src=\""+adUrl+"\" width=\"100\" height=\"100\" /></a>";
					}
	    		result += "</div><div><div align=\"center\"><b>";
	    		result += keyWord +"</b></div>";		
      		result += "<a target=\"_blank\"  href=\"";
      		result += adLink + "\">" + adText + "</a>";
	    		result += "</div>";  
	
    			document.getElementById('divAdvertiseContent').innerHTML=result;//把结果显示出来	
	    		document.getElementById('divAdvertiseContent').style.display="block"; 
    		}

    		function moveDivAdvertise(event)
    		{
	    		var AdBoxLeft=getMousePosition(event).x;//当前鼠标的横坐标
	    		//如果广告窗体超出显示区域
	    		if(parseInt(document.body.clientWidth)-AdBoxLeft<parseInt(document.getElementById('divAdvertise').style.width))
        		{
    	    		AdBoxLeft=(AdBoxLeft-parseInt(document.getElementById('divAdvertise').style.width))+"px";
        		}
	    		else
        		{
    	    		AdBoxLeft=AdBoxLeft+"px";
        		}
	
	    		document.getElementById('divAdvertise').style.left=AdBoxLeft;//设置横坐标
	    		var AdBoxTop=getMousePosition(event).y//当前鼠标的纵坐标
	    		if(parseInt(document.body.clientHeight)-AdBoxTop<parseInt(document.getElementById('divAdvertise').style.height))
        		{
    	    		AdBoxTop=(AdBoxTop-parseInt(document.getElementById('divAdvertise').style.height)-15)+"px";
        		}
	    		else
        		{
    	    		AdBoxTop=(AdBoxTop+15)+"px";
        		}
	    		document.getElementById('divAdvertise').style.top=AdBoxTop;//设置纵坐标
    		}


    		//鼠标移动事件
    		document.onmouseover=function(e)
    		{
      		e = e || window.event;   
      		var eSrc=e.target||e.srcElement;
      		if(eSrc.name!="Advertise")
      		{
         		try
	     		{
	 	    		clearTimeout(timerID);
	     		} 
	     		catch(e)
	     		{
	 	
	     		}
         		timerID=setTimeout("hiddenAdShowBox()",1000);
      		}
      		else
      		{
         		try
	     		{
	 	    		clearTimeout(timerID);
	     		} 
	     		catch(e)
	     		{
	 	
	     		}
      	}
    	}

    		//隐藏广告窗体
    		function hiddenAdShowBox()
    		{
	    		try
	    		{
		    		clearTimeout(timerID);
		    		document.getElementById('divAdvertise').style.display="none";
	    		} 
	    		catch(e)
	    		{
    			
	    		}
 	    		
    		}

//视频广告页面大小改变函数
window.onresize = resizeDiv;
function resizeDiv()
{
	try{
if(document.getElementById("leftDivspgg")){
var leftDivspgg2w=document.getElementById("leftDivspgg").style.width;
var leftDivspgg2h=document.getElementById("leftDivspgg").style.height;
document.getElementById("leftDivspgg").style.left=eval("document.body.clientWidth"+"+document.body.scrollLeft"+(-parseInt(leftDivspgg2w)-20).toString());
document.getElementById("leftDivspgg").style.top=eval("document.body.clientHeight"+"+document.body.scrollTop"+(-parseInt(leftDivspgg2h)-20).toString());
}
	}catch(e){}
}    		
 
 