var taqHome;!function(){var g={},p=window,R=function(e,t){e=e.match(RegExp("(^|&|\\?|#)("+t+")=([^&#]*)(&|$|#)",""));return e?e[3]:"null"}(p.location.hash.substring(1),"heatShow"),h=(window.location.href,document),e=!1,t=M(function(){var e="",t=document.getElementsByTagName("meta");try{if(0<t.length)for(var n=0;n<t.length;n++){var o=t[n],r=o.getAttribute("charset");if(r){e=r;break}var a=o.getAttribute("http-equiv");if(a&&"content-type"==a.toLowerCase()&&(r=function(){var e=o.content.split(";");return 1<e.length?e[1].split("=")[1]:null}())){e=r;break}}}catch(e){A("fail to parse charset: "+e)}return e.toUpperCase()}()),n=(h.characterSet||h.charset).toUpperCase();if(g.bc=n,p.inTRSDesignMode)A("The current page existence the window.inTRSDesignMode,so exit!");else{if(Oe(t)){g.mc=t;var o=/^GB/;if(!(t==n||o.test(t)&&o.test(n)))return A("the meta charset(["+t+"]) is different from browser charset(document.characterSet = ["+n+"]), so exit!")}try{e=h.domain==top.document.domain}catch(e){A("unable check top.document.domain: "+e)}var U,j,f=e?top.document:h,o=(g.domain=f.domain||"",p&&p.screen&&(g.sh=p.screen.height||0,g.sw=p.screen.width||0,g.cd=p.screen.colorDepth||0),h.getElementById("gscrumb")),D=(o&&(g.gc=T(o.innerHTML)),!1),q=3e3,P=!1,F=!1,z=3e3,W="",X=!1,K=null,r=null,G=null,Q=null;if("undefined"!=typeof _taq)for(var a in taqHome=_taq.home,_taq)switch(_taq[a][0]){case"_mpId":g.mpId=_taq[a][1];break;case"_setUID":_taq[a][1]&&""!=_taq[a][1]&&(g.uid=_taq[a][1])}else{t=h.getElementById("_trs_ta_js");if(!t)return A("not found _trs_ta_js script element, so just return!");for(var i=t.src.split("?")[1].split("&"),a=0;a<i.length;a++)try{var c=i[a].split("=")[0],d=i[a].split("=")[1];"mpid"==c?g.mpId=d:"waitTitle"==c?D=d:"waitAjaxElement"==c?F=""!=T(d)&&(W=d,!0):"siteType"==c?K=d:"cPrefix"==c?(r=d,/^(http(s)?:)?\/\//.test(r)||(r="//"+r)):"srcMode"==c&&(Q=d=4==d?"1,2":d)}catch(e){A("skip a param as it is not key=value format, i="+a+", myselfSrcParamArray="+i)}taqHome=r||t.src.split("/js/")[0],G=document.getElementById("_trs_ta_js").srcsup||document.getElementById("_trs_ta_js").getAttribute("srcsup")||void 0}if(p.ta_count=p.ta_count||0,"spa"==K)p.ta_count++;else{if(p["ta.js"])return;p["ta.js"]=!0}p.TA17Obj={};var V,Y=p.TA17Obj,J=(Y.clearLoginUser=function(){Se(J,"/",0,We(f.domain))},Y.track=function(e){if(p.inTRSDesignMode)A("The current page existence the window.inTRSDesignMode,so TA17Obj.track ignore!");else{if(!e.eventKey&&0!==e.eventKey)return A("eventKey值为："+e.eventKey+"不符合命名规范!"),!1;-1<e.eventKey.indexOf(".")&&(e.eventKey=e.eventKey.substring(e.eventKey.indexOf(".")+1)+"&t_t="+e.eventKey.split(".")[0]);var t,n,o=h.getElementById("NewsEditionName"),r=h.getElementById("NewsEditionNumber"),a=h.getElementById("NewsArticleTitle"),i=h.getElementById("NewsArticleAuthor"),c=h.getElementById("NewsArticleID"),d=h.getElementById("NewsArticleType"),l=h.getElementById("NewsPaperName"),s=h.getElementById("NewsArticleSource"),u=h.getElementById("NewsArticlePubDay"),m=h.getElementById("SelfNewsArticleID");if(e.trackInfos&&0!=e.trackInfos.length)for(var f=0;f<e.trackInfos.length;f++)n=new Image(1,1),t=taqHome+"/1.gif?mpId="+g.mpId+"&event=jsapi&t_k="+e.eventKey+"&cu="+g.cu+"&cs="+g.cs+"&pv="+g.pv+"&url="+encodeURIComponent(g.url),e.trackInfos[f].eventItem&&(t+="&t_i="+e.trackInfos[f].eventItem),e.trackInfos[f].eventItemType&&(t+="&t_it="+e.trackInfos[f].eventItemType),e.trackInfos[f].eventItemName&&(t+="&t_in="+e.trackInfos[f].eventItemName),e.trackInfos[f].commodity_num&&(t+="&t_num="+e.trackInfos[f].commodity_num),e.trackInfos[f].commodity_money&&(t+="&t_money="+e.trackInfos[f].commodity_money.toFixed(2)),e.trackInfos[f].target_page&&(t+="&e_tu="+e.trackInfos[f].target_page),e.trackInfos[f].customParam&&(t+="&e_cus="+JSON.stringify(e.trackInfos[f].customParam)),c&&(t+="&a_id="+T(c.innerHTML)),a&&(t+="&a_nt="+xe(T(a.innerHTML))),r&&(t+="&a_en="+T(r.innerHTML)),o&&(t+="&a_ea="+T(o.innerHTML)),d&&(t+="&a_tp="+T(d.innerHTML)),l&&(t+="&a_pn="+T(l.innerHTML)),s&&(t+="&a_src="+T(s.innerHTML)),i&&(t+="&a_ar="+T(i.innerHTML)),u&&(t+="&a_pd="+T(u.innerHTML)),m&&(t+="&a_sid="+T(m.innerHTML)),O(n.src=t,"track");else n=new Image(1,1),t=taqHome+"/1.gif?mpId="+g.mpId+"&event=jsapi&t_k="+e.eventKey+"&cu="+g.cu+"&cs="+g.cs+"&pv="+g.pv+"&url="+g.url,O(n.src=t,"track")}},U=(new Date).getTime(),j=(new Date).getTime(),"_trs_user"),l=Ie(J),Z=3e3,s=!1;if(l)g.uid=l,A("get user id from cookie");else if(void 0!==window.TA17Callbacks_getAndSendLoginUser){V=(new Date).getTime();try{A("start to get user id"),window.TA17Callbacks_getAndSendLoginUser(function(e){s||(A("user state returned."),s=!0,(l=String(e))&&"null"!=l&&"undefined"!=l?(ke(J,l,"/",null,We(f.domain)),g.uid=l):Se(J,"/",0,We(f.domain)))})}catch(e){A("no valid method for getting user was provided."),s=!0}}else A("no valid method for getting user was provided."),s=!0;var u,m,y,ee,te,v,w,ne,n="_trs_ua_s_1",e="_trs_uv",o=(g.pv=Ae(g.mpId),0<h.cookie.length&&(u=Ie(n),m=Ie(e)),Te(u)&&A("sessionCookie expired: "+u+", so create new: "+(u=Ce(g.mpId))),Te(m)&&A("UVCookie expired: "+m+", so create new: "+(m=Ce(g.mpId))),new Date),t=(o.setDate(o.getDate()+730),We(f.domain)),o=(Ee(e,m,"/",o.toGMTString(),t),A("set UVCookie topLevelDomain: "+t+", "+e+"="+m),new Date);o.setMinutes(o.getMinutes()+30),Ee(n,u,"/",o.toGMTString()),A("set sessionCookie: "+n+"="+u),g.cs=u||"",g.cu=m||"","undefined"==typeof jQuery||"undefined"==typeof $?g.title=document.title||"":g.title=$(f).attr("title")||"",g.url=f.URL||"",g.refer=f.referrer||"",1==R&&(y=document.createElement("iframe"),ee=document.referrer&&"function"==typeof document.referrer.indexOf&&0<=document.referrer.indexOf("/console/heatmap")?document.referrer.slice(0,document.referrer.indexOf("/console/heatmap")):taqHome,te=document.documentElement.scrollWidth,v=document.documentElement.scrollHeight,w=0,y.src=ee+"/agent.html#"+te+"*"+v,document.body.appendChild(y),y.style.display="none",ne=function(){document.documentElement.scrollHeight!=v?(w=0,te=document.documentElement.scrollWidth,v=document.documentElement.scrollHeight,y.src=ee+"/agent.html?random="+Math.random()+"#"+te+"*"+v):w<=3?(w++,setTimeout(ne,1e3)):w=0},B(window,"resize",ne));var oe=function(e){try{window.parent.postMessage(e,"*")}catch(e){A(e.message)}},re=!1,_=(function(e){B(window,"message",e)}(function(e){var t="",n="";e.data&&"taHeatShow"==e.data.type&&(re||(re=!0,B(window,"resize",function(){document.documentElement.scrollHeight!=n&&(t=document.body.scrollWidth,n=document.documentElement.scrollHeight,oe({type:"contentSize",value:[t,n]}))})),t=document.body.scrollWidth,n=document.documentElement.scrollHeight,oe({type:"contentSize",value:[t,n]}))}),document.onreadystatechange=function(){window.postMessage&&"complete"==document.readyState&&oe({type:"contentSize",value:[document.body.scrollWidth,document.documentElement.scrollHeight]})},navigator&&(g.lang=navigator.language||navigator.browserLanguage||"",g.fl=Ne(),g.je=navigator.javaEnabled()?1:0,g.ce=navigator.cookieEnabled?1:0),p.performance),ae=((_?function e(t){var n=_.timing;try{var o,r,a,i,c,d,l,s,u,m,f,h;parseInt(n.domContentLoadedEventEnd)<=0?setTimeout(function(){e(g)},50):(o=_.navigation,o.type,n.connectEnd,r=n.connectStart,n.redirectEnd,n.redirectStart,a=n.domainLookupEnd-n.domainLookupStart,i=n.connectEnd-r,c=n.responseStart-n.requestStart,n.responseEnd,n.responseStart,n.domInteractive,n.domLoading,n.loadEventStart,n.domLoading,d=n.domContentLoadedEventStart-n.fetchStart,n.loadEventStart,n.fetchStart,l=n.responseEnd-n.navigationStart,n.responseStart,n.requestStart,n.requestStart,n.navigationStart,p.google&&p.chrome,s=He(),-1!==p.navigator.userAgent.indexOf("Chrome")&&(g.p_fp=-1,p.chrome)&&window.PerformancePaintTiming&&(m=performance.getEntriesByType("paint")[0],u=((m.startTime+performance.timeOrigin)/1e3).toFixed(3),g.p_fp=0<=u?u:-1),-1!=navigator.appName.indexOf("Microsoft Internet Explorer")&&document.all&&(u=n.msFirstPaint-n.navigationStart,g.p_fp=0<=u?u:-1),requestType=_.navigation.type,n.loadEventEnd,n.domLoading,f=n.loadEventEnd-n.navigationStart,g.p_d=0<=a?a:-1,g.p_ct=0<=i?i:-1,g.p_st=0<=c?c:-1,g.p_nt=0<=l?l:-1,g.p_tt=0<=f?f:-1,g.p_dr=0<=d?d:-1,g.p_rt=requestType,g.p_c=0,g.p_tajs=0<=s?Math.floor(s):-1,1===requestType&&(g.p_c=0),0===n.requestStart&&(g.p_c=1),n.connectStart===n.connectEnd&&(g.p_c=1),"getEntriesByType"in _&&_.getEntriesByType("resource")instanceof Array&&(h=_.getEntriesByType("resource"),g.p_rc=h.length),Le())}catch(e){}}:Le)(),0),ie=g.mpId,ce=!1,de=(/msie (\d+\.\d+)/i.test(navigator.userAgent),taqHome+"/1.gif?event=click&sr="+screen.width+"*"+screen.height+"&url="+encodeURIComponent(document.URL)),b=de,le=0,se=0,t=(!!document.all||document.captureEvents(Event.MOUSEMOVE),le=document.documentElement&&document.documentElement.scrollWidth||document.body&&document.body.scrollWidth||0,se=document.documentElement&&document.documentElement.scrollHeight||document.body&&document.body.scrollHeight||0,window.devicePixelRatio||1),t=Number(t).toFixed(4),x=(window.innerWidth,window.innerHeight,C(document.URL,1024)),I=(0<x.indexOf("#")&&(x=x.substring(0,x.indexOf("#"))),taqHome+"/1.gif?event=mousedown&sr="+screen.width+"*"+screen.height+"&br="+le+"*"+se+"&dpr="+t),ue=I+"&clicktype=1&url="+H(),E=I+"&clicktype=2",me=I+"&clicktype=3&url="+H(),k="",S="",fe="";if(p.TAQueueArr){for(a=0;a<p.TAQueueArr.length;a++)Y.track(p.TAQueueArr[a][0]);p.TAQueueArr=[]}he=function(){var e={Base64:function(){_keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",this.encode=function(e){var t,n,o,r,a,i,c="",d=0;for(e=_utf8_encode(e);d<e.length;)o=(t=e.charCodeAt(d++))>>2,r=(3&t)<<4|(t=e.charCodeAt(d++))>>4,a=(15&t)<<2|(n=e.charCodeAt(d++))>>6,i=63&n,isNaN(t)?a=i=64:isNaN(n)&&(i=64),c=c+_keyStr.charAt(o)+_keyStr.charAt(r)+_keyStr.charAt(a)+_keyStr.charAt(i);return c},this.decode=function(e){var t,n,o,r,a,i,c="",d=0;for(e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");d<e.length;)o=_keyStr.indexOf(e.charAt(d++)),t=(15&(r=_keyStr.indexOf(e.charAt(d++))))<<4|(a=_keyStr.indexOf(e.charAt(d++)))>>2,n=(3&a)<<6|(i=_keyStr.indexOf(e.charAt(d++))),c+=String.fromCharCode(o<<2|r>>4),64!=a&&(c+=String.fromCharCode(t)),64!=i&&(c+=String.fromCharCode(n));return c=_utf8_decode(c)},_utf8_encode=function(e){e=e.replace(/\r\n/g,"\n");for(var t="",n=0;n<e.length;n++){var o=e.charCodeAt(n);o<128?t+=String.fromCharCode(o):t=127<o&&o<2048?(t+=String.fromCharCode(o>>6|192))+String.fromCharCode(63&o|128):(t=(t+=String.fromCharCode(o>>12|224))+String.fromCharCode(o>>6&63|128))+String.fromCharCode(63&o|128)}return t},_utf8_decode=function(e){var t,n="",o=0;for(c1=c2=0;o<e.length;)(t=e.charCodeAt(o))<128?(n+=String.fromCharCode(t),o++):191<t&&t<224?(c2=e.charCodeAt(o+1),n+=String.fromCharCode((31&t)<<6|63&c2),o+=2):(c2=e.charCodeAt(o+1),c3=e.charCodeAt(o+2),n+=String.fromCharCode((15&t)<<12|(63&c2)<<6|63&c3),o+=3);return n}},readXPath:function(e){if(""!==e.id)return"//*[@id='"+e.id+"']";for(var t=0,n=e.parentNode,o=e.parentNode.childNodes,r=0,a=o.length;r<a;r++){var i=o[r];if(i==e)return n==document.body?e.tagName.toLowerCase()+(t+1==1?"":"["+(t+1)+"]"):arguments.callee(e.parentNode)+"/"+e.tagName.toLowerCase()+(t+1==1?"":"["+(t+1)+"]");1==i.nodeType&&i.tagName==e.tagName&&t++}},indexOf:function(e,t){if(null!=Array.prototype.indexOf)return e.indexOf(t);for(var n=0;n<e.length;n++)if(e[n]===t)return n;return-1}};return e}(),ge=["TEXTAREA","HTML","BODY"];var he,ge,pe,ye={tools:he,collectable:function(e){return!(e==document||!e||(e=e.tagName.toUpperCase(),-1<he.indexOf(ge,e)))}},ve=ye.tools,we=(B(document,"mouseup",function(e){var t=e.target||e.srcElement;if(document!=t){qe(e);var t=e,n=t.target||t.srcElement;if(null!=n){var o=C(n.tagName.toLowerCase(),255),r=Re(t),a=r.x,i=r.y,r=r.z,c=ye.collectable(n),d=Ue(n),l="a"==o||"input"==o||"button"==o;if("a"!=o&&"input"!=o&&"button"!=o&&(""==k?k="{"+a+","+i+","+r+"}":k+=";{"+a+","+i+","+r+"}",Fe()),l||c){E=d.flag?(E=Be(E,d.anchorEle,{elemText:d.anchorText}),l=C(d.anchorEle.tagName.toLowerCase(),255),E=L(E,"e_tn",l),L(E,"e_iac","1")):(E=L(E=Be(E,n),"e_tn",o),L(E,"e_iac","0"));c=C(t.type,255),d="",l=0;try{var s=ve.readXPath(n),u=new ve.Base64,d=encodeURIComponent(u.encode(s));0!=ae&&(l=Math.floor(((new Date).getTime()-ae)/1e3))}catch(e){A("someting wrong for getting element xPath"),A(e)}if(E=L(E,"e_et",c),E=L(E,"e_nd",d),E=L(E,"e_etd",l),E=L(E,"x",a),E=L(E,"y",i),E=L(E,"x2",r),isNaN(a))try{var m={isPage:t.pageX,isClient:t.clientX,isScroll:document.documentElement.scrollTop,isBodyScroll:document.body.scrollTop};E=L(E,"p_err",JSON.stringify(m))}catch(e){}o=new Image(1,1);o.src=E,O(o.src,"click"),E=I+"&clicktype=2"}}u=(n=Re(n=e)).x,s=n.y,n=n.z,""==S?(S="{x:"+u+",y:"+s+"}",fe="{z:"+n+",y:"+s+"}"):(S+=",{x:"+u+",y:"+s+"}",fe+=",{z:"+n+",y:"+s+"}"),ze()}}),B(window,"unload",function(){var e,t;pe||$e(),e=pe<1?pe:1,t=new Image(1,1),e=taqHome+"/1.gif?mpId="+g.mpId+"&event=viewInfo&cu="+g.cu+"&cs="+g.cs+"&pv="+g.pv+"&vp="+e+"&url="+encodeURIComponent(g.url),O(t.src=e,"leave"),Pe()}),B(window,"scroll",$e),0);Y.urlChanged=function(){ce&&(Pe(),g.pv=Ae(g.mpId),"undefined"==typeof jQuery?g.title=document.title||"":g.title=$(document).attr("title")||"",g.url=document.URL||"",g.refer=document.referrer||"",P=!1,Le())},Xe.prototype={init:function(e,t,n,o,r,a,i){this.x=e,this.y=t,this.value=n,this.w=o,this.h=r,this.scale=a,this.ele=i},draw:function(e){e.beginPath(),e.ellipse(this.x,this.y,this.w,this.h,0,0,2*Math.PI),e.closePath();var t=this.w>this.h?this.w:this.h,n=(0==t&&(t=1),e.save(),e.scale(this.w/t,this.h/t),this.w/t==0?1:this.w/t),o=this.h/t==0?1:this.h/t,n=(this.x/n).toFixed(2),o=(this.y/o).toFixed(2),n=e.createRadialGradient(n,o,0,n,o,t),o=(this.scale<.001?(n.addColorStop(0,"rgba(0,255,0,0.5)"),n.addColorStop(.5,"rgba(0,0,255,0.3)"),n.addColorStop(1,"rgba(148,0,211,0)")):this.scale<.008?(n.addColorStop(0,"rgba(0,255,255,0.5)"),n.addColorStop(.5,"rgba(0,255,0,0.3)"),n.addColorStop(1,"rgba(0,0,255,0)")):(n.addColorStop(0,"rgba(255,0,0,0.5)"),n.addColorStop(.5,"rgba(255,255,0,0.3)"),n.addColorStop(1,"rgba(0,255,0,0)")),e.fillStyle=n,2e3*this.scale);e.globalAlpha=Math.max(Math.min(o,1),0),e.fill(),e.restore()}},B(window,"message",function(e){var t;e.data&&"dealXpath"==e.data.type&&((t=document.createElement("canvas")).setAttribute("id","heatmap"),t.style.position="fixed",t.style.zIndex=999,t.style.display="block",t.style.top=0,t.style.left=0,document.body.appendChild(t),(t=document.createElement("div")).setAttribute("id","tooltip"),t.style.backgroundColor="black",t.style.width="150px",t.style.height="40px",t.style.padding="10px",t.style.position="fixed",t.style.display="none",t.style.top=0,t.style.left=0,t.style.zIndex=1e3,document.body.appendChild(t),Ge(Ke(e.data.data)))})}function _e(){var e=h.getElementById("NewsEditionName"),t=h.getElementById("NewsEditionNumber"),n=h.getElementById("NewsArticleTitle"),o=h.getElementById("NewsArticleAuthor"),r=h.getElementById("NewsArticleID"),a=h.getElementById("NewsArticleType"),i=h.getElementById("NewsPaperName"),c=h.getElementById("NewsArticleSource"),d=h.getElementById("NewsArticlePubDay"),l=h.getElementById("SelfNewsArticleID"),s=h.getElementById("gscrumb"),u=h.getElementById("NewsArticleDepartmentOfAuthor"),m=h.getElementById("ReserveCustomField");s&&(g.gc=T(s.innerHTML)),(t||r)&&(r&&(g.a_id=T(r.innerHTML)),n&&(g.a_nt=xe(T(n.innerHTML))),t&&(g.a_en=T(t.innerHTML)),e&&(g.a_ea=T(e.innerHTML)),a&&(g.a_tp=T(a.innerHTML)),i&&(g.a_pn=T(i.innerHTML)),c&&(g.a_src=T(c.innerHTML)),o&&(g.a_ar=T(o.innerHTML)),d&&(g.a_pd=T(d.innerHTML)),l&&(g.a_sid=T(l.innerHTML)),u&&(g.a_doa=T(u.innerHTML)),m)&&(g.a_rcf=T(m.innerHTML)),"undefined"==typeof jQuery||"undefined"==typeof $?g.title=document.title||"":g.title=$(f).attr("title")||""}function be(e){return null==e||"string"==typeof e&&0==T(e).length}function T(e){return e.replace(/^\s+|\s+$/gm,"")}function C(e,t){return null!=e&&T(e).length>t?e.substring(0,t-3)+"...":e}function xe(e){return e.replace(/<br.*?>/g," ")}function Ie(e){var t;return-1==(t=h.cookie.indexOf(e+"="))?null:(t=t+e.length+1,-1==(e=h.cookie.indexOf(";",t))&&(e=h.cookie.length),decodeURIComponent(h.cookie.substring(t,e)))}function Ee(e,t,n,o,r){null==r||0==Oe(r)?h.cookie=e+"="+encodeURIComponent(t)+"; path="+n+"; expires="+o+"; secure":h.cookie=e+"="+encodeURIComponent(t)+"; path="+n+"; domain="+r+"; expires="+o+"; secure"}function ke(e,t,n,o,r){e=encodeURIComponent(e)+"="+encodeURIComponent(t);n&&(e+="; path="+n),o instanceof Date&&(e+="; expires="+o.toGMTString()),r&&(e+="; domain="+r),h.cookie=e}function Se(e,t,n,o){ke(e,"",t,new Date(0),o)}function Te(e){return be(e)||"undefined"==e||"string"!=typeof e||(24<e.length?(A("length="+e.length+": "+e),1):!/^[^_=]{8,9}_\d+_[^_=]{1,5}$/.test(e)&&!/^[^_=]{1,5}_\d+_[^_=]{8,9}$/.test(e)&&(A(e+" not valid"),1))}function Ce(e){var t=parseInt(Math.floor(1e3*Math.random()+1)+""+Math.floor(1e3*Math.random()+1));return String((new Date).valueOf().toString(36).concat("_").concat(e).concat("_").concat(t.toString(36)))}function Ae(e){var t=parseInt(Math.floor(1e3*Math.random()+1)+""+Math.floor(1e3*Math.random()+1));return String((e+"").concat("_").concat((new Date).valueOf().toString(36)).concat("_").concat(t.toString(36)))}function A(e){if(window.console&&console.log)try{console.log(e)}catch(e){}}function Ne(){var e="Shockwave Flash",t=e+" ";if(navigator.plugins&&0<navigator.plugins.length){e=navigator.plugins[e];if(!e)return"-1";try{if(null!=e.version)return e.version}catch(e){}e=e.description;return-1!=e.indexOf(t)?e.substring(t.length):e}for(var n=function(){var e;try{return(e=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")).GetVariable("$version")}catch(e){}try{return e=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),version="WIN 6,0,21,0",e.AllowScriptAccess="always",e.GetVariable("$version")}catch(e){}try{return(e=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3")).GetVariable("$version")}catch(e){}try{return new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"),"WIN 3,0,18,0"}catch(e){}try{return new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),"WIN 2,0,0,11"}catch(e){return"-1"}}().split(","),o="",t="WIN ",r=0,a=n.length;r<a;r++)-1!=n[r].indexOf(t)?o=o+n[r].substring(t.length)+".":r==a-1?o+=n[r]:o=o+n[r]+".";return o}function Me(){var e=!g.uid&&!s&&(new Date).getTime()-V<Z,t=!(P=P||!("true"==D&&!Oe("undefined"==typeof jQuery||"undefined"==typeof $?document.title:$(f).attr("title"))||(_e(),0)))&&(new Date).getTime()-U<q,n=!(X=X||1!=F||null!=(n=h.getElementById(W))&&""!=T(n.innerHTML)&&(g.gc=T(n.innerHTML),!0))&&(new Date).getTime()-j<z;return e||t||n}function Le(){if(Me())setTimeout(Le,500);else{var e,t="";for(e in g)be(g[e])||(""!=t&&(t+="&"),t+=e+"="+encodeURIComponent(g[e]));if(taqHome){ce=!0;try{ae=(new Date).getTime(),ie=g.mpId}catch(e){A(e)}var n=new Image(1,1);n.src=taqHome+"/1.gif?"+t,O(n.src,"pv")}else A("no _taq.home!")}}function He(){var e=0;try{var t=h.getElementById("_trs_ta_js").src,n=p.performance.getEntriesByName(t);0<n.length&&(e=n[0].duration)}catch(e){}return e}function Oe(e){return"string"==typeof e&&0<e.length}function N(e){return null==e||"undefined"==e||""==e||"null"==e?e:e.replace(/\t/g," ").replace(/(^\s*)|(\s*$)/g,"").replace(/[\r\n]/g," ")}function M(e){return null==e||"undefined"==e||""==e||"null"==e?e:e.replace(/(^\s*)|(\s*$)/g,"")}function L(e,t,n){return null==n||"undefined"==n||""==n||"null"==n?e:e+"&"+t+"="+n}function H(){var e;return"spa"==K?(e=C(document.URL,1024),C(encodeURIComponent(e),1024)):C(encodeURIComponent(x),1024)}function Be(e,t,n){var o,r=t.getAttribute("href"),a=!!r&&r.match(/^#/),r=(r=a?r:t.href)&&C(M(r),255),i=C(t.id,255),c=C(N(t.innerText),255),n=(c=(c=n&&n.elemText?C(N(n.elemText),255):c)||je(t),C(t.type,255)),d=C(t.name,255),t=C(t.target,255);return e=L(e,"mpId",ie),e=L(e,"cs",g.cs),e=L(e,"cu",g.cu),e=L(e,"pv",g.pv),e=L(e,"e_id",i),e=L(e,"url",H()),Oe(r)&&(e=L(e,"e_tu",encodeURIComponent(r)),a||(i={},0==(a=M(a=r)).indexOf("http")||0==a.indexOf("https")?(i.protocol=a.substring(0,a.indexOf("://")),-1<(o=a.substring(a.indexOf("://")+3)).indexOf("/")?i.domain=o.substring(0,o.indexOf("/")):i.domain=o):0==a.indexOf("//")?(i.protocol=null,-1<(o=a.substring(a.indexOf("//")+2)).indexOf("/")?i.domain=o.substring(0,o.indexOf("/")):i.domain=o):-1<a.indexOf(":")?(i.protocol=a.substring(0,a.indexOf(":")),i.domain=null):(i.protocol=null,i.domain=parseDomain2(document.URL)),r=i,e=L(e,"e_td",encodeURIComponent(r.domain)),e=L(e,"e_tp",encodeURIComponent(r.protocol)))),e=L(e,"e_tt",n),e=L(e,"e_tx",encodeURIComponent(c)),e=L(e,"e_en",d),e=L(e,"e_ht",t)}function O(e,t){if(G&&Q)for(var n=Q.split(","),o=!1,r=0;r<n.length;r++){switch(n[r]){case"0":o=!1;break;case"1":o="pv"==t;break;case"2":o="click"==t;break;case"3":o="track"==t;break;default:return}if(o){e.split("/1.gif?")[0];for(var a,i=e.split("/1.gif?")[1],c=G.split(","),d=/^(http(s)?:)?\/\//,r=0;r<c.length;r++)a=d.test(c[r])?c[r]:"//"+c[r],taqHome!=a&&(new Image(1,1).src=a+"/1.gif?"+i)}}}function Re(e){var t=Math.floor(e.pageX),n=Math.floor(e.pageY),o=window.innerWidth||document.documentElement.clientWidth||document.body.offsetWidth;return isNaN(t)&&(n=Math.max(document.documentElement.scrollTop,document.body.scrollTop),t=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft),n=Math.floor(e.clientY+n),t=Math.floor(e.clientX+t)),{x:t,y:n,z:Math.floor(t-o/2)}}function Ue(e){for(var o,r,t,n={flag:!1},a=e;a&&1==a.nodeType;a=a.parentNode)if(a.getAttribute("href")){n.anchorEle=a,n.anchorText=(t=r=o=void 0,"area"==a.nodeName.toLowerCase()?(t=a.parentNode,o=t.name||t.id,je(function(){for(var e=null,t=document.getElementsByTagName("img"),n=0;n<t.length;n++)if(t[n].getAttribute("usemap")=="#"+o){e=t[n];break}return e}())):0<(t=C(N(De(a)),19)).length?t:0<(t=C(N(a.title),19)).length?t:(t=function(){for(var e="",t=a.childNodes,n=0;n<t.length;n++)if(1==t[n].nodeType&&(r=r||t[n],"img"==t[n].nodeName.toLowerCase())){e=t[n];break}return e}())?je(t):r?r.nodeName.toLowerCase()+" "+C(N(De(r)),19):""),n.flag=!0;break}return n}function je(e){var t,n;return e?(t=e.getAttribute("alt")?M(e.getAttribute("alt")):"",n=e.getAttribute("title")?M(e.getAttribute("title")):"",e=e.getAttribute("src")?e.getAttribute("src"):"",C(N(t||n||e),25)):""}function De(e){return e?"string"==typeof e.textContent?e.textContent:e.innerText:""}function qe(e){var t,n,o,r,a,i,c,d,l,s=function(e){var t=e.getAttribute("data-trs-ta-event-key");if(null!=t&&"undefined"!=t&&""!=t&&"null"!=t)return e;for(;(e=e.parentNode)&&1==e.nodeType;)if(null!=(t=e.getAttribute("data-trs-ta-event-key"))&&"undefined"!=t&&""!=t&&"null"!=t)return e;return null}(e.target||e.srcElement);null==s||"a"!=(t=s.tagName.toLowerCase())&&"input"!=t&&"button"!=t||(n=C(s.getAttribute("data-trs-ta-event-key"),255),o=C(s.getAttribute("data-trs-ta-event-type"),255),r=C(N(s.getAttribute("data-trs-ta-event-itemtype")),255),a=C(N(s.getAttribute("data-trs-ta-event-item")),255),i=C(N(s.getAttribute("data-trs-ta-event-itemname")),255),c=(l=Re(e)).x,d=l.y,l=l.z,e=e.type,b=L(b=Be(b,s),"t_k",encodeURIComponent(n)),b=L(b,"t_t",encodeURIComponent(o)),b=L(b,"t_it",encodeURIComponent(r)),b=L(b,"t_i",encodeURIComponent(a)),b=L(b,"t_in",encodeURIComponent(i)),b=L(b,"x",c),b=L(b,"y",d),b=L(b,"x2",l),b=L(b,"e_tn",t),b=L(b,"e_et",e),new Image(1,1).src=b,b=de)}function Pe(){Fe(),ze()}function Fe(){var e;""!=k&&(ue+="&pa=["+k+"]",k="",(e=new Image(1,1)).src=ue+"&pv="+g.pv,O(e.src,"click"),ue=I+"&clicktype=1&url="+H())}function ze(){var e;""!=S&&(me=(me+="&br="+le+"*"+se)+"&pa=["+S+"]&pb=["+fe+"]",fe=S="",(e=new Image(1,1)).src=me,O(e.src,"click"),me=I+"&clicktype=3&url="+H())}function We(e){for(var t=[".com.cn",".net.cn",".org.cn",".gov.cn",".edu.cn",".ac.cn",".mil.cn",".ah.cn",".bj.cn",".cq.cn",".fj.cn",".gd.cn",".gs.cn",".gz.cn",".gx.cn",".ha.cn",".hb.cn",".he.cn",".hi.cn",".hl.cn",".hn.cn",".jl.cn",".js.cn",".jx.cn",".ln.cn",".nm.cn",".nx.cn",".qh.cn",".sc.cn",".sd.cn",".sh.cn",".sn.cn",".sx.cn",".tj.cn",".xj.cn",".xz.cn",".yn.cn",".zj.cn",".hk.cn",".mo.cn",".tw.cn",".com",".cn",".net",".cc",".org",".tv",".edu",".mil",".info",".mobi",".biz",".pro",".travel",".museum",".int",".areo",".post",".rec"],n="",o=0;o<t.length;o++){var r=(n=t[o]).replace(".","\\."),r=new RegExp(r+"$");if(r.test(e)){e=(e=e.replace(r,"")).substring(e.lastIndexOf(".")+1,e.length),e+=n;break}}return e}function B(e,t,n){1<p.ta_count||(e.attachEvent?e.attachEvent("on"+t,n):e.addEventListener&&e.addEventListener(t,n,!1))}function $e(e){var t=document.documentElement.scrollTop||document.body.scrollTop,n=document.documentElement&&document.documentElement.scrollHeight||document.body&&document.body.scrollHeight||0,o=window.innerHeight||se;we=Math.max(t,we),pe=Number((we+o)/n).toFixed(4)}function Xe(){}function Ke(e){for(var t=[],n=0;n<e.length;n++){""==e[n].xpath?e[n].xpath="html/body":"0"==e[n].xpath.substr(e[n].xpath.length-1,1)?e[n].xpath="/html/body/"+e[n].xpath.substring(0,e[n].xpath.length-2):0!=e[n].xpath.indexOf("/")&&(e[n].xpath="/html/body/"+e[n].xpath);try{var o,r,a=document.evaluate(e[n].xpath,document).iterateNext();a&&(0==a.childNodes.length||0!=a.childNodes.length&&0==a.childNodes[0].childNodes.length)&&(o=a.offsetWidth/2+function e(t){return t.offsetParent?e(t.offsetParent)+t.offsetLeft:t.offsetLeft}(a),r=a.offsetHeight/2+function e(t){return t.offsetParent?e(t.offsetParent)+t.offsetTop:t.offsetTop}(a),t.push({x:o,y:r,value:e[n].click,w:a.clientWidth/2,h:a.clientHeight/2,scale:e[n].click/e[n].sumClick,ele:a}))}catch(e){console.log(e)}}return t}function Ge(e){var t,n,r=[],o=document.getElementById("heatmap");for(n in o.getContext?(t=o.getContext("2d"),o.width=document.body.scrollWidth,o.height=document.body.scrollHeight):alert("浏览器不支持canvas!"),e){var a,i=e[n].x,c=e[n].y,d=e[n].value,l=e[n].w,s=e[n].h,u=e[n].scale,m=e[n].ele;void 0!==m&&((a=new Xe).init(i,c,d,l,s,u,m),a.draw(t),r.push(a))}document.getElementById("heatmap").getContext("2d");var f=document.getElementById("tooltip"),h=[];document.getElementById("heatmap").onmousemove=function(e){var t,n=e.clientX,o=e.clientY;for(t in 0==h.length&&(f.style.display="none"),r)if(0<n-(r[t].x-r[t].w)&&n-(r[t].x-r[t].w)<2*r[t].w&&0<o-(r[t].y-r[t].h)&&o-(r[t].y-r[t].h)<2*r[t].h){if(0<h.length){if(r[t].w>h[0].w||r[t].h>h[0].h)continue;h.pop().ele.style.border=""}h.push(r[t]),h[0].ele.style.border="1px solid red",h[0].ele.style.width=2*r[t].w-2+"px",h[0].ele.style.height=2*r[t].h-2+"px",h[0].ele.style.boxSizing="border-box",f.style.display="block",n>document.body.clientWidth-200?(f.style.left=n-200+"px",f.style.top=o-10+"px"):(f.style.left=n+10+"px",f.style.top=o+10+"px"),f.style.color="white",f.innerHTML="点击量："+h[0].value+"<br />点击率："+function(e){if(0==e)return 0;e=Number(100*e).toFixed(5);return e+="%"}(h[0].scale)}else void 0!==r[t].ele&&(r[t].ele.style.border="",r[t]==h[0])&&(h[0].ele.style.width=2*r[t].w+"px",h[0].ele.style.height=2*r[t].h+"px",h.pop())}}}();