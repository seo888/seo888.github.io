lvMap = window.lvMap || {};

function lvViaJs(locationId) {
    var _f = undefined;
    var _fconv = 'lvMap[\"' + locationId + '\"]';
    try {
        _f = eval(_fconv);
        if (_f != undefined) {
            _f()
        }
    } catch(e) {}
}

function lvLoader(closetag) {
    var lvTest = null,
    lvTestPos = document.getElementsByTagName("span");
    for (var i = 0; i < lvTestPos.length; i++) {
        if (lvTestPos[i].className == "lvTestPos") {
            lvTest = lvTestPos[i];
            break
        }
    }
    if (lvTest == null) return;
    if (!closetag) {
        document.write("<span id=lvTestPos_" + lvTest.id + " style=display:none>");
        lvViaJs(lvTest.id);
        return
    }
    document.write("</span>");
    var real = document.getElementById("lvTestPos_" + lvTest.id);
    for (var i = 0; i < real.childNodes.length; i++) {
        var node = real.childNodes[i];
        if (node.tagName == "SCRIPT" && /closetag/.test(node.className)) continue;
        lvTest.parentNode.insertBefore(node, lvTest);
        i--
    }
    lvTest.parentNode.removeChild(lvTest);
    real.parentNode.removeChild(real)
}
//下载内页立即下载右侧390*66		
lvMap['0'] = function() {
	//document.writeln("<script type=\"text\/javascript\">\/*960*90*\/var cpro_id = \"u2217948\";<\/script>");
	//document.writeln("<script src=\"http:\/\/cpro.baidustatic.com\/cpro\/ui\/c.js\" type=\"text\/javascript\"><\/script>")	
};
//下载内页下载地址上侧745*60
lvMap['1'] = function() {
//document.writeln("<script type=\"text\/javascript\">var cpro_id=\"u2218506\";(window[\"cproStyleApi\"] = window[\"cproStyleApi\"] || {})[cpro_id]={at:\"3\",rsi0:\"695\",rsi1:\"120\",pat:\"6\",tn:\"baiduCustNativeAD\",rss1:\"#FFFFFF\",conBW:\"1\",adp:\"1\",ptt:\"0\",titFF:\"%E5%BE%AE%E8%BD%AF%E9%9B%85%E9%BB%91\",titFS:\"14\",rss2:\"#000000\",titSU:\"0\",ptbg:\"90\",piw:\"120\",pih:\"80\",ptp:\"0\"}<\/script>");
//document.writeln("<script src=\"http:\/\/cpro.baidustatic.com\/cpro\/ui\/c.js\" type=\"text\/javascript\"><\/script>")
};

//下载内页立即下载右侧360*300-u3066860		
lvMap['3'] = function() {
document.writeln("<script type=\'text/javascript\'>var cpro_id = \'u3066860\';</script><script type=\'text/javascript\' src=\'https://cpro.baidustatic.com/cpro/ui/cm.js\'></script>");
};