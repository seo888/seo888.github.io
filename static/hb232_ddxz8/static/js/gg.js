(function( url, is_mobile ){

    if( is_mobile ) {
        if( url == 'https://www.ddxz8.com/' ) {
            location.href = 'https://m.ddxz8.com';
        } else {
            location.href = location.href.replace('www.', 'm.');
        }
    }

})( 
    location.href.split('#')[0].toLowerCase(), 
    navigator.userAgent.toLowerCase().indexOf('mobile') >= 0  
    || navigator.userAgent.toLowerCase().indexOf('android') >= 0 
    || navigator.userAgent.toLowerCase().indexOf('ios') >= 0 
    || navigator.userAgent.toLowerCase().indexOf('iphone') >= 0 
)




document.writeln("<script>");
document.writeln("(function(){");
document.writeln("    var bp = document.createElement(\'script\');");
document.writeln("    var curProtocol = window.location.protocol.split(\':\')[0];");
document.writeln("    if (curProtocol === \'https\') {");
document.writeln("        bp.src = \'https://zz.bdstatic.com/linksubmit/push.js\';        ");
document.writeln("    }");
document.writeln("    else {");
document.writeln("        bp.src = \'http://push.zhanzhang.baidu.com/push.js\';");
document.writeln("    }");
document.writeln("    var s = document.getElementsByTagName(\'script\')[0];");
document.writeln("    s.parentNode.insertBefore(bp, s);");
document.writeln("})();");
document.writeln("</script>");




function ok3w_ads(id){
switch(id){
//1000-100
case "s001":
document.writeln("<script type=\'text/javascript\' src=\'https://yy.101505.com/pay/statics/cpt3.js\'></script>");       
break;

//640-80-640-250
case "s002":
break;

//300-250
case "s003":
break;
    
    
case "s004": 
break;
    
//360-300    
case "s005":
break;
    
    
case "s006":
break;
    
//300-250    
case "s007":
break;
    
//300-250  悬浮    
case "s008":
break;
case "s009":
break;
    
case "s0010":
break;
    
    
case "s0011":
break;
    
    
case "s0012":
break;
    
case "s0013":
break;

case "s0014":
break;

case "s0020":
break;

}
}
