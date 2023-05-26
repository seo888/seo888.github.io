/*
 * 全局JS  使用前必须引入jquery.js
 * author jake
 * createTime 2017-11-2 14:19:57
 * modifyTime 2017年11月2日14:20:23
 */

/*
 * 判断是否为移动设备
 * author Jake
 * 2017-11-2 14:23:06
 */
function isMobileUserAgent() {
    return (/iphone|ipad|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase()));
}