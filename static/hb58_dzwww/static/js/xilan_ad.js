// ad
function addScript(url){
    document.write("<script language=javascript src="+url+"></script>");
}
addScript("//dup.baidustatic.com/js/os.js?"+Math.random());
function loadAD() {
    BAIDU_CLB_fillSlotAsync('6002258','ad_6002258');
    if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|wOSBrowser|BrowserNG|WebOS)/i))) {
        BAIDU_CLB_fillSlotAsync('6678274','ad_6678274');BAIDU_CLB_fillSlotAsync('6678276','ad_6678276');BAIDU_CLB_fillSlotAsync('6687658','ad_6687658');
        BAIDU_CLB_fillSlotAsync('6687659','ad_6687659');BAIDU_CLB_fillSlotAsync('6687660','ad_6687660');
    }else {
        BAIDU_CLB_fillSlotAsync('6533318','ad_6533318');BAIDU_CLB_fillSlotAsync('6002258','ad_6002258');BAIDU_CLB_fillSlotAsync('6678200','ad_6678200');
        BAIDU_CLB_fillSlotAsync('5582168','ad_5582168');BAIDU_CLB_fillSlotAsync('6687630','ad_6687630');BAIDU_CLB_fillSlotAsync('6687630','ad_6687630_1');
        BAIDU_CLB_fillSlotAsync('6687630','ad_6687630_2');BAIDU_CLB_fillSlotAsync('6687630','ad_6687630_3');BAIDU_CLB_fillSlotAsync('6687627','ad_6687627');
        BAIDU_CLB_fillSlotAsync('6687627','ad_6687627_1');BAIDU_CLB_fillSlotAsync('6687627','ad_6687627_2');BAIDU_CLB_fillSlotAsync('6687627','ad_6687627_3');
        BAIDU_CLB_fillSlotAsync('6687624','ad_6687624');BAIDU_CLB_fillSlotAsync('6687624','ad_6687624_1');BAIDU_CLB_fillSlotAsync('6687624','ad_6687624_2');
        BAIDU_CLB_fillSlotAsync('6687624','ad_6687624_3');BAIDU_CLB_fillSlotAsync('6707355','ad_6707355');BAIDU_CLB_fillSlotAsync('6707355','ad_6707355_1');
        BAIDU_CLB_fillSlotAsync('6707355','ad_6707355_2');BAIDU_CLB_fillSlotAsync('6707355','ad_6707355_3');BAIDU_CLB_fillSlotAsync('6707357','ad_6707357');
        BAIDU_CLB_fillSlotAsync('6707357','ad_6707357_1');BAIDU_CLB_fillSlotAsync('6707357','ad_6707357_2');BAIDU_CLB_fillSlotAsync('6707357','ad_6707357_3');
    }
}
loadAD();
