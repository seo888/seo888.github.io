var tbcList = document.getElementsByTagName('div');
var zones = new Array();
for(var i = 0; i < tbcList.length ; i++) {
if(tbcList[i].getAttribute("name") != 'PHPADM_MULTIADS' ) continue;
	zones[zones.length] = tbcList[i];
} 
var logurl = "https://g4.iqilu.com/phpad.stat/adlog.php";
if (zones[0]) {
    if (zones[0].getAttribute("time") !== null && zones[0].getAttribute("time") != '') {
        var intervalTime = zones[0].getAttribute("time") * 1000;
    } else {
        var intervalTime = 5000;
    }
    
    for (k = 0, len = zones.length, imp = new Array(); k < len; k++) {
        zone_children = filterAd(zones[k], 'DIV');
         if (zones[k].getAttribute("imp") !== null && zones[k].getAttribute("imp") != '') {
            var importance = zones[k].getAttribute("imp");
            var time = importance.split(':').length;
            imp[k] = getAdByImp(importance);
            if (time != zone_children.length) {
                var importance = getImpD(zone_children.length);
                imp[k] = getAdByImp(importance);
            }
        } else {
            var importance = getImpD(zone_children.length);
            imp[k] = getAdByImp(importance);
        }
    }
    window.onload = function () {
        for (var i = 0, leng = zones.length; i < leng; i++) {
            zone_childs = filterAd(zones[i], 'DIV');
	    sendReq(zone_childs);
            if (zone_childs[0] !== null && typeof(zone_childs[0]) !== 'undefined') {
                zone_childs[0].style.display = 'block';
                var zones_pslib = siblings(zone_childs[0], 'DIV');
                for (j = 0, lengs = zones_pslib.length; j < lengs; j++) {
                    zones_pslib[j].style.display = 'none';
                }
            } 
	//zones[i].style.display='block';
        }
    };

    window.setInterval(function () {
        changeAd();
    }, intervalTime);
}
function getImpD(leng){
    if (leng === null || typeof(leng) === 'undefined'){
        return;
    }
    switch (leng) {
            case 2:
                dimportance = '5:5';
                return dimportance;
            case 3:
                dimportance = '5:5:5';
                return dimportance;
            case 4:
                dimportance = '5:5:5:5';
                return dimportance;
            case 5:
                dimportance = '5:5:5:5:5';
                return dimportance;
            default:
                return '5:5:5:5:5'
        }
}

function changeAd() {
    for (g = 0, lenc = zones.length; g < lenc; g++) {
        advalue = imp[g].shift();
        imp[g].push(advalue);
        zone_childs = filterAd(zones[g], 'DIV');
        if (zone_childs[advalue] !== null && typeof(zone_childs[advalue]) !== 'undefined') {
            zone_childs[advalue].style.display = 'block';
	    //var explorer = window.navigator.userAgent ;
            //if (!(explorer.indexOf("MSIE") >= 0)) {
            //    logRequest(zone_childs[advalue]);
            //}
            var zones_pslib = siblings(zone_childs[advalue], 'DIV');
            for (h = 0, lens = zones_pslib.length; h < lens; h++) {
                zones_pslib[h].style.display = 'none';
            }
        }
    }
}

function sendReq(zone_childs) {
    var explorer = window.navigator.userAgent;
	bannerinfoSet="[";
    for (u = 0, lenu = zone_childs.length; u < lenu; u++) {
        //bannerinfoSet+=zone_childs[u].getAttribute("bannerinfo")+",";
	if (zone_childs[u].getAttribute("bannerinfo")) {
            bannerinfoSet+=zone_childs[u].getAttribute("bannerinfo")+",";
        } else {
            bannerinfoSet+=zone_childs[u].childNodes[0].getAttribute("bannerinfo")+",";
        }
    }
    bannerinfoSet = bannerinfoSet.substr(0, bannerinfoSet.length-1);
    bannerinfoSet += "]";
    if (!(explorer.indexOf("MSIE") >= 0)) {
	logRequest(bannerinfoSet);
    }
}

function filterAd(node, filter) {
    if (filter === null || typeof (filter) === 'undefined') {
        return;
    }
    if (node === null || typeof (node) === 'undefined') {
        return;
    }
    var a = [];
    var zones_childs = node.childNodes;
    for (var i = 0, lenf = zones_childs.length; i < lenf; i++) {
        if (zones_childs[i] !== node && zones_childs[i].nodeName === filter)
            a.push(zones_childs[i]);
    }
    return a;
}

function getAdByImp(importance) {
    if (typeof (importance) === "undefined") {
        return;
    }
    if (typeof (importance) !== "undefined") {
        var scale = importance.split(':');
        if (scale.length < 2) {
            return;
        }
    }
    switch (importance) {
        case '5:5':
            scaleToImp = [0,1,0,1,0,1,0,1,0,1];
            return scaleToImp;
        case '6:4':
            scaleToImp = [0,1,0,1,0,1,0,1,0,0];
            return scaleToImp;
        case '7:3':
            scaleToImp = [0,0,1,0,0,1,0,0,1,0];
            return scaleToImp;
        case '4:3:3':
            scaleToImp = [0,1,2,0,1,2,0,1,2,0];
            return scaleToImp;    
        case '5:3:2':
            scaleToImp = [0,1,0,2,0,1,0,2,1,0];
            return scaleToImp;    
        case '6:2:2':
            scaleToImp = [2,0,1,0,0,2,0,0,1,0];
            return scaleToImp;    
    }
    for (i = 0, lent = scale.length, temp_imp = ''; i < lent; i++) {
        for (j = 0; j < scale[i]; j++) {
            temp_imp += i + ',';
        }
    }
    imp_str = temp_imp.substr(0, temp_imp.length - 1);
    scaleToImp = imp_str.split(',');
    scaleToImp.sort(function () {
        return Math.random() > .5 ? -1 : 1;
    });
    return scaleToImp;
}

function logRequest(bannerinfoSet) {
        if (bannerinfoSet === null || typeof (bannerinfoSet) === 'undefined') {
            return;
        }
        if (bannerinfoSet !== null && typeof(bannerinfoSet) !== 'undefined') {
            PHPADM_XmlHttpRequest(logurl, bannerinfoSet, "POST");
        } else {
                var p = nodes.children;
                for (var i = 0, pl = p.length; i < pl; i++) {
                    if (p[i].nodeName === 'DIV') {
                        childs_img = p[i].childNodes;
                        if (childs_img[0].nodeType == 1) {
                             PHPADM_XmlHttpRequest(childs_img[0].getAttribute("src"), '',"GET");
                        }
                    }
                }
        }
    }

function PHPADM_XmlHttpRequest(url, bannerinfoSet, method)
{
    var xmlHttp = null;
    if (method === null || typeof (method) === 'undefined') {
        method = 'POST';
    }
    if (url === null || typeof (url) === 'undefined') {
        return;
    }
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        var versions = ['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.7.0', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
        for (var i = 0; i < versions.length; i++) {
            try {
                tmp = new ActiveXObject(versions[i]);
                if (tmp) {
                    xmlHttp = tmp;
                }
            } catch (e) {
                xmlHttp = false;
            }
        }
    }
    xmlHttp.open(method, url, true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if (method === 'POST') {
        xmlHttp.send("bannerinfoSet=" + bannerinfoSet);
    } else if (method === 'GET') {
        xmlHttp.send();
    }
}

function siblings(elm, filter) {
    if (elm === null || typeof(elm) === 'undefined') {
        return;
    }
    var a = [];
    var p = elm.parentNode.children;
    for (var i = 0, pl = p.length; i < pl; i++) {
        if (p[i] !== elm && p[i].nodeName === filter) {
             a.push(p[i]);
        }
    }
    return a;
}
