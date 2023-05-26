//屏蔽JS报错
function killErrors() {
    return true;
}
window.onerror = killErrors;

//PHPCMS调用主核心JS
//document.writeln(
//    '<script language="JavaScript" src="/themes/yongzhou_news/js/config.js"></script></script><script language="JavaScript" src="/themes/yongzhou_news/js/jquery.sgallery.js"></script><script language="JavaScript" src="/themes/yongzhou_news/js/css.js"></script><script language="JavaScript" src="/themes/yongzhou_news/js/common.js"></script><script language="JavaScript" src="/themes/yongzhou_news/js/login.js"></script><script language="JavaScript" src="/themes/yongzhou_news/js/validator.js"></script>'
// );