function PCMSAD(PID) {
  this.ID        = PID;
  this.PosID  = 0; 
  this.ADID		  = 0;
  this.ADType	  = "";
  this.ADName	  = "";
  this.ADContent = "";
  this.PaddingLeft = 0;
  this.PaddingTop  = 0;
  this.Wspaceidth = 0;
  this.Height = 0;
  this.IsHitCount = "N";
  this.UploadFilePath = "";
  this.URL = "";
  this.SiteID = 0;
  this.ShowAD  = showADContent;
  this.Stat = statAD;
}

function statAD() {
	var new_element = document.createElement("script"); 
	new_element.type = "text/javascript";
	new_element.src="http://www.cpnct.com/index.php?m=poster&c=index&a=show&siteid="+this.SiteID+"&id="+this.ADID+"&spaceid="+this.PosID; 
	document.body.appendChild(new_element);
}

function showADContent() {
  var content = this.ADContent;
  var str = "";
  var AD = eval('('+content+')');
  if (this.ADType == "images") {
	  if (AD.Images[0].imgADLinkUrl) str += "<a href='"+this.URL+'&a=poster_click&sitespaceid='+this.SiteID+"&id="+this.ADID+"&url="+AD.Images[0].imgADLinkUrl+"' target='_blank'>";
	  str += "<img title='"+AD.Images[0].imgADAlt+"' src='"+this.UploadFilePath+AD.Images[0].ImgPath+"' width='"+this.Width+"' height='"+this.Height+"' style='border:0px;'>";
	  if (AD.Images[0].imgADLinkUrl) str += "</a>";
  }else if(this.ADType == "flash"){
	  str += "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' width='"+this.Width+"' height='"+this.Height+"' id='FlashAD_"+this.ADID+"' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0'>";
	  str += "<param name='movie' value='"+this.UploadFilePath+AD.Images[0].ImgPath+"' />"; 
      str += "<param name='quality' value='autohigh' />";
      str += "<param name='wmode' value='opaque'/>";
	  str += "<embed src='"+this.UploadFilePath+AD.Images[0].ImgPath+"' quality='autohigh' wmode='opaque' name='flashad' swliveconnect='TRUE' pluginspage='http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash' type='application/x-shockwave-flash' width='"+this.Width+"' height='"+this.Height+"'></embed>";
      str += "</object>";	  
  }
  str += "";
  document.write(str);
}
 
var cmsAD_25 = new PCMSAD('cmsAD_25'); 
cmsAD_25.PosID = 25; 
cmsAD_25.ADID = 27; 
cmsAD_25.ADType = "images"; 
cmsAD_25.ADName = "内容页底部横幅03"; 
cmsAD_25.ADContent = "{'Images':[{'imgADLinkUrl':'','imgADAlt':'','ImgPath':'http://www.cpnct.com/uploadfile/2022/0211/20220211093559474.jpg'}],'imgADLinkTarget':'New','Count':'1','showAlt':'Y'}"; 
cmsAD_25.URL = "http://www.cpnct.com/index.php?m=poster&c=index"; 
cmsAD_25.SiteID = 1; 
cmsAD_25.Width = 680; 
cmsAD_25.Height = 100; 
cmsAD_25.UploadFilePath = ''; 
cmsAD_25.ShowAD();

var isIE=!!window.ActiveXObject; 
if (isIE){

	if (document.readyState=="complete"){
		cmsAD_25.Stat();
	} else {
		document.onreadystatechange=function(){
			if(document.readyState=="complete") cmsAD_25.Stat();
		}
	}
} else {
	cmsAD_25.Stat();
}