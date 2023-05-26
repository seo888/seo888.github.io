var getScriptArgs=function(){
    var scripts=document.getElementsByTagName("script"),
    script=scripts[scripts.length-1],
    src=script.src,
    reg=/(?:\?|&)(.*?)=(.*?)(?=&|$)/g,
    temp,res={};
    while((temp=reg.exec(src))!=null) res[temp[1]]=decodeURIComponent(temp[2]);
    return res;
};
var scriptArgs=getScriptArgs();
document.write("<script type='text/javascript' src='https://commondata.yunnan.cn/js/real_calc.js?click=true&cms="+scriptArgs.cms+"' ></script>");
document.close();<!--ecms sync check [sync_thread_id="3bcee7cc5a424330844ab778a62d31c1" sync_date="2023-01-04 11:30:12" check_sum="3bcee7cc5a424330844ab778a62d31c1]-->