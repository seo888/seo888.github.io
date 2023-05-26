;(function(window,document,undefined){var Array$indexOf=Array.prototype.indexOf;var Object$assign=Object.assign;var runningInWeChat=/MicroMessenger/i.test(navigator.userAgent);var isMobileScreen=document.documentElement.clientWidth<=768;var image=(document.images[0]||0).src||'';var site=getMetaContentByName('site')||getMetaContentByName('Site')||document.title;var title=getMetaContentByName('title')||getMetaContentByName('Title')||document.title;var description=getMetaContentByName('description')||getMetaContentByName('Description')||'';var defaults={url:location.href,origin:location.origin,source:site,title:title,description:description,image:image,imageSelector:undefined,weiboKey:'',wechatQrcodeTitle:'微信扫一扫：分享',wechatQrcodeHelper:'<p>微信里点“发现”，扫一下</p>',wechatQrcodeSize:100,sites:['weibo','qq','wechat','douban','qzone','linkedin','facebook','twitter'],mobileSites:[],disabled:[],initialized:false};var templates={qzone:'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}',qq:'http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&pics={{IMAGE}}&summary="{{SUMMARY}}"',weibo:'https://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}',wechat:'javascript:',douban:'http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11',linkedin:'http://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{SUMMARY}}&source={{SOURCE}}&armin=armin',facebook:'https://www.facebook.com/sharer/sharer.php?u={{URL}}',twitter:'https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{ORIGIN}}'};window.socialShare=function(elem,options){elem=typeof elem==='string'?querySelectorAlls(elem):elem;if(elem.length===undefined){elem=[elem];}
each(elem,function(el){if(!el.initialized){share(el,options);}});};alReady(function(){socialShare('.social-share, .share-component');});function share(elem,options){var data=mixin({},defaults,options||{},dataset(elem));if(data.imageSelector){data.image=querySelectorAlls(data.imageSelector).map(function(item){return item.src;}).join('||');}
addClass(elem,'share-component social-share');createIcons(elem,data);createWechat(elem,data);elem.initialized=true;}
function createIcons(elem,data){var sites=getSites(data);var isPrepend=data.mode=='prepend';each(isPrepend?sites.reverse():sites,function(name){var url=makeUrl(name,data);var link=data.initialized?getElementsByClassName(elem,'icon-'+name):createElementByString('<a class="social-share-icon icon-'+name+'"></a>');if(!link.length){return true;}
link[0].href=url;if(name==='wechat'){link[0].tabindex=-1;}else{link[0].target='_blank';}
if(!data.initialized){isPrepend?elem.insertBefore(link[0],elem.firstChild):elem.appendChild(link[0]);}});}
function createWechat(elem,data){var wechat=getElementsByClassName(elem,'icon-wechat','a');if(wechat.length===0){return false;}
var elems=createElementByString('<div class="wechat-qrcode"><h4>'+data.wechatQrcodeTitle+'</h4><div class="qrcode"></div><div class="help">'+data.wechatQrcodeHelper+'</div></div>');var qrcode=getElementsByClassName(elems[0],'qrcode','div');new QRCode(qrcode[0],{text:data.url,width:data.wechatQrcodeSize,height:data.wechatQrcodeSize});wechat[0].appendChild(elems[0]);}
function getSites(data){if(!data['mobileSites'].length){data['mobileSites']=data['sites'];}
var sites=(isMobileScreen?data['mobileSites']:data['sites']).slice(0);var disabled=data['disabled'];if(typeof sites=='string'){sites=sites.split(/\s*,\s*/);}
if(typeof disabled=='string'){disabled=disabled.split(/\s*,\s*/);}
if(runningInWeChat){disabled.push('wechat');}
disabled.length&&each(disabled,function(it){sites.splice(inArray(it,sites),1);});return sites;}
function makeUrl(name,data){if(!data['summary']){data['summary']=data['description'];}
return templates[name].replace(/\{\{(\w)(\w*)\}\}/g,function(m,fix,key){var nameKey=name+fix+key.toLowerCase();key=(fix+key).toLowerCase();return encodeURIComponent((data[nameKey]===undefined?data[key]:data[nameKey])||'');});}
function querySelectorAlls(str){return(document.querySelectorAll||window.jQuery||window.Zepto||selector).call(document,str);}
function selector(str){var elems=[];each(str.split(/\s*,\s*/),function(s){var m=s.match(/([#.])(\w+)/);if(m===null){throw Error('Supports only simple single #ID or .CLASS selector.');}
if(m[1]){var elem=document.getElementById(m[2]);if(elem){elems.push(elem);}}
elems=elems.concat(getElementsByClassName(str));});return elems;}
function addClass(elem,value){if(value&&typeof value==="string"){var classNames=(elem.className+' '+value).split(/\s+/);var setClass=' ';each(classNames,function(className){if(setClass.indexOf(' '+className+' ')<0){setClass+=className+' ';}});elem.className=setClass.slice(1,-1);}}
function getMetaContentByName(name){return(document.getElementsByName(name)[0]||0).content;}
function getElementsByClassName(elem,name,tag){if(elem.getElementsByClassName){return elem.getElementsByClassName(name);}
var elements=[];var elems=elem.getElementsByTagName(tag||'*');name=' '+name+' ';each(elems,function(elem){if((' '+(elem.className||'')+' ').indexOf(name)>=0){elements.push(elem);}});return elements;}
function createElementByString(str){var div=document.createElement('div');div.innerHTML=str;return div.childNodes;}
function mixin(){var args=arguments;if(Object$assign){return Object$assign.apply(null,args);}
var target={};each(args,function(it){each(it,function(v,k){target[k]=v;});});return args[0]=target;}
function dataset(elem){if(elem.dataset){return JSON.parse(JSON.stringify(elem.dataset));}
var target={};if(elem.hasAttributes()){each(elem.attributes,function(attr){var name=attr.name;if(name.indexOf('data-')!==0){return true;}
name=name.replace(/^data-/i,'').replace(/-(\w)/g,function(all,letter){return letter.toUpperCase();});target[name]=attr.value;});return target;}
return{};}
function inArray(elem,arr,i){var len;if(arr){if(Array$indexOf){return Array$indexOf.call(arr,elem,i);}
len=arr.length;i=i?i<0?Math.max(0,len+i):i:0;for(;i<len;i++){if(i in arr&&arr[i]===elem){return i;}}}
return-1;}
function each(obj,callback){var length=obj.length;if(length===undefined){for(var name in obj){if(obj.hasOwnProperty(name)){if(callback.call(obj[name],obj[name],name)===false){break;}}}}else{for(var i=0;i<length;i++){if(callback.call(obj[i],obj[i],i)===false){break;}}}}
function alReady(fn){var add='addEventListener';var pre=document[add]?'':'on';~document.readyState.indexOf('m')?fn():'load DOMContentLoaded readystatechange'.replace(/\w+/g,function(type,i){(i?document:window)
[pre?'attachEvent':add]
(pre+type,function(){if(fn)if(i<6||~document.readyState.indexOf('m'))fn(),fn=0},!1)})}})(window,document);