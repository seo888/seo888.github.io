document.writeln("<style>");
document.writeln("*{ margin:0; padding:0px; }");
document.writeln("#xmnnfooter{padding-bottom:20px;font:14px/1.5 \"Microsoft Yahei\"; width:1152px; margin:0 auto; background: #EFEFEF;}");
document.writeln("#xmnnfooter a{text-decoration:none;}");
document.writeln(".bottom-msg{ padding-top:20px; font:12px/24px \"宋体\";}");
document.writeln(".bottom-msg .fl{ width:64%; text-align:right; float:left; display:inline; }");
document.writeln(".bottom-msg .fr{ width:30%; text-align:left;border-left:1px solid #8d8a8a; padding-left:3%; float:right; display:inline;}");
document.writeln(".bottom-msg .fl a{ margin:0 5px;}");
document.writeln("#_ideConac{}");
document.writeln(".mod-wrap-foll{text-align: center}");
document.writeln(".foll-2 a{ margin:0 6px;}");
switch(xmnnfooter){
    case "blue":
        //参考kid.xmnn.cn
        document.writeln("#xmnnfooter{ color:#FFF;}");
        document.writeln(".bottom-msg  a{ color:#fff;}");
        document.writeln(".bottom-msg .fr{ border-color:#fff}");
        document.writeln("#xmnnfooter  a:hover{color:#0000ff;}");break;
    case "red":
        //参考http://www.xmnn.cn/aggfe/
        document.writeln("#xmnnfooter{ color:#FFF;}");
        document.writeln(".bottom-msg .fr{ border-color:#fff}");
        document.writeln(".bottom-msg  a{ color:#fff;}");
        document.writeln("#xmnnfooter  a:hover{color:#FF0000;}"); break;
    case "yellow":
        //参考http://www.xmnn.cn/aggfe/
        document.writeln("#xmnnfooter{ color:#FFF;}");
        document.writeln(".bottom-msg .fr{ border-color:#fff}");
        document.writeln(".bottom-msg  a{ color:#fff;}");
        document.writeln("#xmnnfooter  a:hover{color:#FFFF00;}"); break;
    case "white":
        //参考http://www.xmnn.cn/
        document.writeln("#xmnnfooter{ color:#929292;}");
        document.writeln(".bottom-msg .fl  a{ color:#6d6a6a;}");
        document.writeln(".bottom-msg .fl{ color:#6d6a6a;}");
        document.writeln(".bottom-msg  a{ color:#6d6a6a;}");
        document.writeln("#xmnnfooter  a:hover{color:#E60213;}");break;

}
document.writeln("</style>");
document.writeln("<div id=\"xmnnfooter\">");
document.writeln("<div class=\"bottom-msg page-wrap\">");
document.writeln("   <div class=\"mod-wrap-full clearfix\"> ");
document.writeln("           <div class=\"fl\">");
document.writeln("          	 <p><a target=\"_blank\" href=\"//www.xmnn.cn/about/jianjie/\">厦门网简介</a>-<a target=\"_blank\" href=\"//www.xmnn.cn/about/bqsm/\">版权声明</a>-<a target=\"_blank\" href=\"//www.xmnn.cn/about/flgw/\">法律顾问</a>-<a target=\"_blank\" href=\"//www.xmnn.cn/about/lxwm/\">联系我们</a></p>");
document.writeln("               <p>厦门网 版权所有，未经厦门网书面特别授权，请勿转载或建立镜像 厦门电信提供网络带宽</p>");
document.writeln("               <p>互联网新闻信息服务许可证35120170005号信息网络传播视听节目许可证（1308312）</p>");
document.writeln("               <p>厦门网违法和不良信息举报中心、未成年人举报专区、儿童色情信息举报专区电话:18060970590  举报邮箱：xmwnews@126.com</p>");
document.writeln("             	 <p>海峡网络(厦门)传媒有限公司  地址:厦门市软件园三期诚毅北大街53号厦门日报社新媒体大厦15F、16F  邮编:361009 传真:5506194</p>");
document.writeln("               <p>广告热线:5506107 新闻热线:5506191[8:00-18:00] <a target=\"_blank\" href=\"https://beian.miit.gov.cn\">闽ICP备05020922号-3</a>  <a target=\"_blank\" href=\"http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=35020302000782\"><img style=\"vertical-align: middle; padding-right:5px\" src=\"https://js.xmnn.cn/xmnn/ghs.png\" />闽公网安备  35020302000782号</a></p>");
document.writeln("               <p>新闻欺诈、虚假新闻举报邮箱：xcbjxmsc@xm.gov.cn 举报电话：0592-2858950 0592-285895</p>");
document.writeln("               <p>厦门网“打假治敲”专项行动举报电话：5506197 举报邮箱：xmnn@xmnn.cn</p>");
document.writeln("           </div>");
document.writeln("            <div class=\"fr\">");
document.writeln("           	<p><a href=\"http://www.cyberpolice.cn/wfjb/\"  target=\"_blank\">网络违法犯罪举报网站</a></p>");
document.writeln("            	<p><a href=\"http://www.12377.cn/\"  target=\"_blank\">违法与不良信息举报中心</a></p>");
document.writeln("           	<p><a href=\"http://www.12321.cn/\"  target=\"_blank\">12321网络不良信息与垃圾信息举报受理中心</a></p>");
document.writeln("           	<p><a href=\"https://yhssglxt.miit.gov.cn\"  target=\"_blank\">工业和信息化部电信用户申诉受理中心</a></p>");
document.writeln("           	<p><a href=\"https://jbts.mct.gov.cn\"  target=\"_blank\">12318全国文化市场举报网站</a></p>");
document.writeln("           	<p><a href=\"http://gat.fujian.gov.cn/ztzl/fjjffpzxrx/\"  target=\"_blank\">福建警方防骗咨询</a></p>");
document.writeln("           	<p><a href=\"http://jubao.fjsen.com/node_306167.htm\"  target=\"_blank\">涉养老诈骗专项举报</a></p>");
document.writeln("           	<p><a href=\"https://app9.fjsen.com/?app=jubao&c=index&m=post&jtype=swlblxx\"  target=\"_blank\">涉网络暴力有害信息专项举报</a></p>");
document.writeln("           	<div style=\"height:0px\"></div>");
document.writeln("          </div>");
document.writeln("   </div>");
document.writeln("   <div class=\"mod-wrap-foll foll-2 clearfix\"  style=\"padding-top:10px\">");
document.writeln("       <a href=\"http://www.12377.cn/\" target=\"_blank\"><img src=\"https://js.xmnn.cn/xmnn/er.png\" /></a>");
document.writeln("       <a href=\"http://bszs.conac.cn/sitename?method=show&id=13B9368C52726DEBE053022819AC1590\"  target=\"_blank\"><img src=\"https://js.xmnn.cn/xmnn/blue.png\" /></a>");
document.writeln("       <a href=\"http://www.12377.cn/\" target=\"_blank\"><img src=\"https://js.xmnn.cn/xmnn/jb.png\" /></a>");
document.writeln("       <a href=\"//www.xmnn.cn/about/bqbh.html\" target=\"_blank\"><img src=\"https://js.xmnn.cn/xmnn/bqbh.png\" /></a>");
document.writeln("   </div>");
document.writeln(" </div>");
document.writeln("</div>");


//页面灰色代码

