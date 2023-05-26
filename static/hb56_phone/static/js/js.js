/*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function(e,t){function _(e){var t=M[e]={};return v.each(e.split(y),function(e,n){t[n]=!0}),t}function H(e,n,r){if(r===t&&e.nodeType===1){var i="data-"+n.replace(P,"-$1").toLowerCase();r=e.getAttribute(i);if(typeof r=="string"){try{r=r==="true"?!0:r==="false"?!1:r==="null"?null:+r+""===r?+r:D.test(r)?v.parseJSON(r):r}catch(s){}v.data(e,n,r)}else r=t}return r}function B(e){var t;for(t in e){if(t==="data"&&v.isEmptyObject(e[t]))continue;if(t!=="toJSON")return!1}return!0}function et(){return!1}function tt(){return!0}function ut(e){return!e||!e.parentNode||e.parentNode.nodeType===11}function at(e,t){do e=e[t];while(e&&e.nodeType!==1);return e}function ft(e,t,n){t=t||0;if(v.isFunction(t))return v.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return v.grep(e,function(e,r){return e===t===n});if(typeof t=="string"){var r=v.grep(e,function(e){return e.nodeType===1});if(it.test(t))return v.filter(t,r,!n);t=v.filter(t,r)}return v.grep(e,function(e,r){return v.inArray(e,t)>=0===n})}function lt(e){var t=ct.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function At(e,t){if(t.nodeType!==1||!v.hasData(e))return;var n,r,i,s=v._data(e),o=v._data(t,s),u=s.events;if(u){delete o.handle,o.events={};for(n in u)for(r=0,i=u[n].length;r<i;r++)v.event.add(t,n,u[n][r])}o.data&&(o.data=v.extend({},o.data))}function Ot(e,t){var n;if(t.nodeType!==1)return;t.clearAttributes&&t.clearAttributes(),t.mergeAttributes&&t.mergeAttributes(e),n=t.nodeName.toLowerCase(),n==="object"?(t.parentNode&&(t.outerHTML=e.outerHTML),v.support.html5Clone&&e.innerHTML&&!v.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):n==="input"&&Et.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):n==="option"?t.selected=e.defaultSelected:n==="input"||n==="textarea"?t.defaultValue=e.defaultValue:n==="script"&&t.text!==e.text&&(t.text=e.text),t.removeAttribute(v.expando)}function Mt(e){return typeof e.getElementsByTagName!="undefined"?e.getElementsByTagName("*"):typeof e.querySelectorAll!="undefined"?e.querySelectorAll("*"):[]}function _t(e){Et.test(e.type)&&(e.defaultChecked=e.checked)}function Qt(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Jt.length;while(i--){t=Jt[i]+n;if(t in e)return t}return r}function Gt(e,t){return e=t||e,v.css(e,"display")==="none"||!v.contains(e.ownerDocument,e)}function Yt(e,t){var n,r,i=[],s=0,o=e.length;for(;s<o;s++){n=e[s];if(!n.style)continue;i[s]=v._data(n,"olddisplay"),t?(!i[s]&&n.style.display==="none"&&(n.style.display=""),n.style.display===""&&Gt(n)&&(i[s]=v._data(n,"olddisplay",nn(n.nodeName)))):(r=Dt(n,"display"),!i[s]&&r!=="none"&&v._data(n,"olddisplay",r))}for(s=0;s<o;s++){n=e[s];if(!n.style)continue;if(!t||n.style.display==="none"||n.style.display==="")n.style.display=t?i[s]||"":"none"}return e}function Zt(e,t,n){var r=Rt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function en(e,t,n,r){var i=n===(r?"border":"content")?4:t==="width"?1:0,s=0;for(;i<4;i+=2)n==="margin"&&(s+=v.css(e,n+$t[i],!0)),r?(n==="content"&&(s-=parseFloat(Dt(e,"padding"+$t[i]))||0),n!=="margin"&&(s-=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0)):(s+=parseFloat(Dt(e,"padding"+$t[i]))||0,n!=="padding"&&(s+=parseFloat(Dt(e,"border"+$t[i]+"Width"))||0));return s}function tn(e,t,n){var r=t==="width"?e.offsetWidth:e.offsetHeight,i=!0,s=v.support.boxSizing&&v.css(e,"boxSizing")==="border-box";if(r<=0||r==null){r=Dt(e,t);if(r<0||r==null)r=e.style[t];if(Ut.test(r))return r;i=s&&(v.support.boxSizingReliable||r===e.style[t]),r=parseFloat(r)||0}return r+en(e,t,n||(s?"border":"content"),i)+"px"}function nn(e){if(Wt[e])return Wt[e];var t=v("<"+e+">").appendTo(i.body),n=t.css("display");t.remove();if(n==="none"||n===""){Pt=i.body.appendChild(Pt||v.extend(i.createElement("iframe"),{frameBorder:0,width:0,height:0}));if(!Ht||!Pt.createElement)Ht=(Pt.contentWindow||Pt.contentDocument).document,Ht.write("<!doctype html><html><body>"),Ht.close();t=Ht.body.appendChild(Ht.createElement(e)),n=Dt(t,"display"),i.body.removeChild(Pt)}return Wt[e]=n,n}function fn(e,t,n,r){var i;if(v.isArray(t))v.each(t,function(t,i){n||sn.test(e)?r(e,i):fn(e+"["+(typeof i=="object"?t:"")+"]",i,n,r)});else if(!n&&v.type(t)==="object")for(i in t)fn(e+"["+i+"]",t[i],n,r);else r(e,t)}function Cn(e){return function(t,n){typeof t!="string"&&(n=t,t="*");var r,i,s,o=t.toLowerCase().split(y),u=0,a=o.length;if(v.isFunction(n))for(;u<a;u++)r=o[u],s=/^\+/.test(r),s&&(r=r.substr(1)||"*"),i=e[r]=e[r]||[],i[s?"unshift":"push"](n)}}function kn(e,n,r,i,s,o){s=s||n.dataTypes[0],o=o||{},o[s]=!0;var u,a=e[s],f=0,l=a?a.length:0,c=e===Sn;for(;f<l&&(c||!u);f++)u=a[f](n,r,i),typeof u=="string"&&(!c||o[u]?u=t:(n.dataTypes.unshift(u),u=kn(e,n,r,i,u,o)));return(c||!u)&&!o["*"]&&(u=kn(e,n,r,i,"*",o)),u}function Ln(e,n){var r,i,s=v.ajaxSettings.flatOptions||{};for(r in n)n[r]!==t&&((s[r]?e:i||(i={}))[r]=n[r]);i&&v.extend(!0,e,i)}function An(e,n,r){var i,s,o,u,a=e.contents,f=e.dataTypes,l=e.responseFields;for(s in l)s in r&&(n[l[s]]=r[s]);while(f[0]==="*")f.shift(),i===t&&(i=e.mimeType||n.getResponseHeader("content-type"));if(i)for(s in a)if(a[s]&&a[s].test(i)){f.unshift(s);break}if(f[0]in r)o=f[0];else{for(s in r){if(!f[0]||e.converters[s+" "+f[0]]){o=s;break}u||(u=s)}o=o||u}if(o)return o!==f[0]&&f.unshift(o),r[o]}function On(e,t){var n,r,i,s,o=e.dataTypes.slice(),u=o[0],a={},f=0;e.dataFilter&&(t=e.dataFilter(t,e.dataType));if(o[1])for(n in e.converters)a[n.toLowerCase()]=e.converters[n];for(;i=o[++f];)if(i!=="*"){if(u!=="*"&&u!==i){n=a[u+" "+i]||a["* "+i];if(!n)for(r in a){s=r.split(" ");if(s[1]===i){n=a[u+" "+s[0]]||a["* "+s[0]];if(n){n===!0?n=a[r]:a[r]!==!0&&(i=s[0],o.splice(f--,0,i));break}}}if(n!==!0)if(n&&e["throws"])t=n(t);else try{t=n(t)}catch(l){return{state:"parsererror",error:n?l:"No conversion from "+u+" to "+i}}}u=i}return{state:"success",data:t}}function Fn(){try{return new e.XMLHttpRequest}catch(t){}}function In(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}function $n(){return setTimeout(function(){qn=t},0),qn=v.now()}function Jn(e,t){v.each(t,function(t,n){var r=(Vn[t]||[]).concat(Vn["*"]),i=0,s=r.length;for(;i<s;i++)if(r[i].call(e,t,n))return})}function Kn(e,t,n){var r,i=0,s=0,o=Xn.length,u=v.Deferred().always(function(){delete a.elem}),a=function(){var t=qn||$n(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,i=1-r,s=0,o=f.tweens.length;for(;s<o;s++)f.tweens[s].run(i);return u.notifyWith(e,[f,i,n]),i<1&&o?n:(u.resolveWith(e,[f]),!1)},f=u.promise({elem:e,props:v.extend({},t),opts:v.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:qn||$n(),duration:n.duration,tweens:[],createTween:function(t,n,r){var i=v.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(i),i},stop:function(t){var n=0,r=t?f.tweens.length:0;for(;n<r;n++)f.tweens[n].run(1);return t?u.resolveWith(e,[f,t]):u.rejectWith(e,[f,t]),this}}),l=f.props;Qn(l,f.opts.specialEasing);for(;i<o;i++){r=Xn[i].call(f,e,l,f.opts);if(r)return r}return Jn(f,l),v.isFunction(f.opts.start)&&f.opts.start.call(e,f),v.fx.timer(v.extend(a,{anim:f,queue:f.opts.queue,elem:e})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function Qn(e,t){var n,r,i,s,o;for(n in e){r=v.camelCase(n),i=t[r],s=e[n],v.isArray(s)&&(i=s[1],s=e[n]=s[0]),n!==r&&(e[r]=s,delete e[n]),o=v.cssHooks[r];if(o&&"expand"in o){s=o.expand(s),delete e[r];for(n in s)n in e||(e[n]=s[n],t[n]=i)}else t[r]=i}}function Gn(e,t,n){var r,i,s,o,u,a,f,l,c,h=this,p=e.style,d={},m=[],g=e.nodeType&&Gt(e);n.queue||(l=v._queueHooks(e,"fx"),l.unqueued==null&&(l.unqueued=0,c=l.empty.fire,l.empty.fire=function(){l.unqueued||c()}),l.unqueued++,h.always(function(){h.always(function(){l.unqueued--,v.queue(e,"fx").length||l.empty.fire()})})),e.nodeType===1&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],v.css(e,"display")==="inline"&&v.css(e,"float")==="none"&&(!v.support.inlineBlockNeedsLayout||nn(e.nodeName)==="inline"?p.display="inline-block":p.zoom=1)),n.overflow&&(p.overflow="hidden",v.support.shrinkWrapBlocks||h.done(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t){s=t[r];if(Un.exec(s)){delete t[r],a=a||s==="toggle";if(s===(g?"hide":"show"))continue;m.push(r)}}o=m.length;if(o){u=v._data(e,"fxshow")||v._data(e,"fxshow",{}),"hidden"in u&&(g=u.hidden),a&&(u.hidden=!g),g?v(e).show():h.done(function(){v(e).hide()}),h.done(function(){var t;v.removeData(e,"fxshow",!0);for(t in d)v.style(e,t,d[t])});for(r=0;r<o;r++)i=m[r],f=h.createTween(i,g?u[i]:0),d[i]=u[i]||v.style(e,i),i in u||(u[i]=f.start,g&&(f.end=f.start,f.start=i==="width"||i==="height"?1:0))}}function Yn(e,t,n,r,i){return new Yn.prototype.init(e,t,n,r,i)}function Zn(e,t){var n,r={height:e},i=0;t=t?1:0;for(;i<4;i+=2-t)n=$t[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}function tr(e){return v.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:!1}var n,r,i=e.document,s=e.location,o=e.navigator,u=e.jQuery,a=e.$,f=Array.prototype.push,l=Array.prototype.slice,c=Array.prototype.indexOf,h=Object.prototype.toString,p=Object.prototype.hasOwnProperty,d=String.prototype.trim,v=function(e,t){return new v.fn.init(e,t,n)},m=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,g=/\S/,y=/\s+/,b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,E=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,S=/^[\],:{}\s]*$/,x=/(?:^|:|,)(?:\s*\[)+/g,T=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,N=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,C=/^-ms-/,k=/-([\da-z])/gi,L=function(e,t){return(t+"").toUpperCase()},A=function(){i.addEventListener?(i.removeEventListener("DOMContentLoaded",A,!1),v.ready()):i.readyState==="complete"&&(i.detachEvent("onreadystatechange",A),v.ready())},O={};v.fn=v.prototype={constructor:v,init:function(e,n,r){var s,o,u,a;if(!e)return this;if(e.nodeType)return this.context=this[0]=e,this.length=1,this;if(typeof e=="string"){e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3?s=[null,e,null]:s=w.exec(e);if(s&&(s[1]||!n)){if(s[1])return n=n instanceof v?n[0]:n,a=n&&n.nodeType?n.ownerDocument||n:i,e=v.parseHTML(s[1],a,!0),E.test(s[1])&&v.isPlainObject(n)&&this.attr.call(e,n,!0),v.merge(this,e);o=i.getElementById(s[2]);if(o&&o.parentNode){if(o.id!==s[2])return r.find(e);this.length=1,this[0]=o}return this.context=i,this.selector=e,this}return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e)}return v.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),v.makeArray(e,this))},selector:"",jquery:"1.8.3",length:0,size:function(){return this.length},toArray:function(){return l.call(this)},get:function(e){return e==null?this.toArray():e<0?this[this.length+e]:this[e]},pushStack:function(e,t,n){var r=v.merge(this.constructor(),e);return r.prevObject=this,r.context=this.context,t==="find"?r.selector=this.selector+(this.selector?" ":"")+n:t&&(r.selector=this.selector+"."+t+"("+n+")"),r},each:function(e,t){return v.each(this,e,t)},ready:function(e){return v.ready.promise().done(e),this},eq:function(e){return e=+e,e===-1?this.slice(e):this.slice(e,e+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(l.apply(this,arguments),"slice",l.call(arguments).join(","))},map:function(e){return this.pushStack(v.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:[].sort,splice:[].splice},v.fn.init.prototype=v.fn,v.extend=v.fn.extend=function(){var e,n,r,i,s,o,u=arguments[0]||{},a=1,f=arguments.length,l=!1;typeof u=="boolean"&&(l=u,u=arguments[1]||{},a=2),typeof u!="object"&&!v.isFunction(u)&&(u={}),f===a&&(u=this,--a);for(;a<f;a++)if((e=arguments[a])!=null)for(n in e){r=u[n],i=e[n];if(u===i)continue;l&&i&&(v.isPlainObject(i)||(s=v.isArray(i)))?(s?(s=!1,o=r&&v.isArray(r)?r:[]):o=r&&v.isPlainObject(r)?r:{},u[n]=v.extend(l,o,i)):i!==t&&(u[n]=i)}return u},v.extend({noConflict:function(t){return e.$===v&&(e.$=a),t&&e.jQuery===v&&(e.jQuery=u),v},isReady:!1,readyWait:1,holdReady:function(e){e?v.readyWait++:v.ready(!0)},ready:function(e){if(e===!0?--v.readyWait:v.isReady)return;if(!i.body)return setTimeout(v.ready,1);v.isReady=!0;if(e!==!0&&--v.readyWait>0)return;r.resolveWith(i,[v]),v.fn.trigger&&v(i).trigger("ready").off("ready")},isFunction:function(e){return v.type(e)==="function"},isArray:Array.isArray||function(e){return v.type(e)==="array"},isWindow:function(e){return e!=null&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return e==null?String(e):O[h.call(e)]||"object"},isPlainObject:function(e){if(!e||v.type(e)!=="object"||e.nodeType||v.isWindow(e))return!1;try{if(e.constructor&&!p.call(e,"constructor")&&!p.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||p.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw new Error(e)},parseHTML:function(e,t,n){var r;return!e||typeof e!="string"?null:(typeof t=="boolean"&&(n=t,t=0),t=t||i,(r=E.exec(e))?[t.createElement(r[1])]:(r=v.buildFragment([e],t,n?null:[]),v.merge([],(r.cacheable?v.clone(r.fragment):r.fragment).childNodes)))},parseJSON:function(t){if(!t||typeof t!="string")return null;t=v.trim(t);if(e.JSON&&e.JSON.parse)return e.JSON.parse(t);if(S.test(t.replace(T,"@").replace(N,"]").replace(x,"")))return(new Function("return "+t))();v.error("Invalid JSON: "+t)},parseXML:function(n){var r,i;if(!n||typeof n!="string")return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(s){r=t}return(!r||!r.documentElement||r.getElementsByTagName("parsererror").length)&&v.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&g.test(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(C,"ms-").replace(k,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,n,r){var i,s=0,o=e.length,u=o===t||v.isFunction(e);if(r){if(u){for(i in e)if(n.apply(e[i],r)===!1)break}else for(;s<o;)if(n.apply(e[s++],r)===!1)break}else if(u){for(i in e)if(n.call(e[i],i,e[i])===!1)break}else for(;s<o;)if(n.call(e[s],s,e[s++])===!1)break;return e},trim:d&&!d.call("\ufeff\u00a0")?function(e){return e==null?"":d.call(e)}:function(e){return e==null?"":(e+"").replace(b,"")},makeArray:function(e,t){var n,r=t||[];return e!=null&&(n=v.type(e),e.length==null||n==="string"||n==="function"||n==="regexp"||v.isWindow(e)?f.call(r,e):v.merge(r,e)),r},inArray:function(e,t,n){var r;if(t){if(c)return c.call(t,e,n);r=t.length,n=n?n<0?Math.max(0,r+n):n:0;for(;n<r;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,s=0;if(typeof r=="number")for(;s<r;s++)e[i++]=n[s];else while(n[s]!==t)e[i++]=n[s++];return e.length=i,e},grep:function(e,t,n){var r,i=[],s=0,o=e.length;n=!!n;for(;s<o;s++)r=!!t(e[s],s),n!==r&&i.push(e[s]);return i},map:function(e,n,r){var i,s,o=[],u=0,a=e.length,f=e instanceof v||a!==t&&typeof a=="number"&&(a>0&&e[0]&&e[a-1]||a===0||v.isArray(e));if(f)for(;u<a;u++)i=n(e[u],u,r),i!=null&&(o[o.length]=i);else for(s in e)i=n(e[s],s,r),i!=null&&(o[o.length]=i);return o.concat.apply([],o)},guid:1,proxy:function(e,n){var r,i,s;return typeof n=="string"&&(r=e[n],n=e,e=r),v.isFunction(e)?(i=l.call(arguments,2),s=function(){return e.apply(n,i.concat(l.call(arguments)))},s.guid=e.guid=e.guid||v.guid++,s):t},access:function(e,n,r,i,s,o,u){var a,f=r==null,l=0,c=e.length;if(r&&typeof r=="object"){for(l in r)v.access(e,n,l,r[l],1,o,i);s=1}else if(i!==t){a=u===t&&v.isFunction(i),f&&(a?(a=n,n=function(e,t,n){return a.call(v(e),n)}):(n.call(e,i),n=null));if(n)for(;l<c;l++)n(e[l],r,a?i.call(e[l],l,n(e[l],r)):i,u);s=1}return s?e:f?n.call(e):c?n(e[0],r):o},now:function(){return(new Date).getTime()}}),v.ready.promise=function(t){if(!r){r=v.Deferred();if(i.readyState==="complete")setTimeout(v.ready,1);else if(i.addEventListener)i.addEventListener("DOMContentLoaded",A,!1),e.addEventListener("load",v.ready,!1);else{i.attachEvent("onreadystatechange",A),e.attachEvent("onload",v.ready);var n=!1;try{n=e.frameElement==null&&i.documentElement}catch(s){}n&&n.doScroll&&function o(){if(!v.isReady){try{n.doScroll("left")}catch(e){return setTimeout(o,50)}v.ready()}}()}}return r.promise(t)},v.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(e,t){O["[object "+t+"]"]=t.toLowerCase()}),n=v(i);var M={};v.Callbacks=function(e){e=typeof e=="string"?M[e]||_(e):v.extend({},e);var n,r,i,s,o,u,a=[],f=!e.once&&[],l=function(t){n=e.memory&&t,r=!0,u=s||0,s=0,o=a.length,i=!0;for(;a&&u<o;u++)if(a[u].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}i=!1,a&&(f?f.length&&l(f.shift()):n?a=[]:c.disable())},c={add:function(){if(a){var t=a.length;(function r(t){v.each(t,function(t,n){var i=v.type(n);i==="function"?(!e.unique||!c.has(n))&&a.push(n):n&&n.length&&i!=="string"&&r(n)})})(arguments),i?o=a.length:n&&(s=t,l(n))}return this},remove:function(){return a&&v.each(arguments,function(e,t){var n;while((n=v.inArray(t,a,n))>-1)a.splice(n,1),i&&(n<=o&&o--,n<=u&&u--)}),this},has:function(e){return v.inArray(e,a)>-1},empty:function(){return a=[],this},disable:function(){return a=f=n=t,this},disabled:function(){return!a},lock:function(){return f=t,n||c.disable(),this},locked:function(){return!f},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],a&&(!r||f)&&(i?f.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!r}};return c},v.extend({Deferred:function(e){var t=[["resolve","done",v.Callbacks("once memory"),"resolved"],["reject","fail",v.Callbacks("once memory"),"rejected"],["notify","progress",v.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return v.Deferred(function(n){v.each(t,function(t,r){var s=r[0],o=e[t];i[r[1]](v.isFunction(o)?function(){var e=o.apply(this,arguments);e&&v.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===i?n:this,[e])}:n[s])}),e=null}).promise()},promise:function(e){return e!=null?v.extend(e,r):r}},i={};return r.pipe=r.then,v.each(t,function(e,s){var o=s[2],u=s[3];r[s[1]]=o.add,u&&o.add(function(){n=u},t[e^1][2].disable,t[2][2].lock),i[s[0]]=o.fire,i[s[0]+"With"]=o.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=l.call(arguments),r=n.length,i=r!==1||e&&v.isFunction(e.promise)?r:0,s=i===1?e:v.Deferred(),o=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?l.call(arguments):r,n===u?s.notifyWith(t,n):--i||s.resolveWith(t,n)}},u,a,f;if(r>1){u=new Array(r),a=new Array(r),f=new Array(r);for(;t<r;t++)n[t]&&v.isFunction(n[t].promise)?n[t].promise().done(o(t,f,n)).fail(s.reject).progress(o(t,a,u)):--i}return i||s.resolveWith(f,n),s.promise()}}),v.support=function(){var t,n,r,s,o,u,a,f,l,c,h,p=i.createElement("div");p.setAttribute("className","t"),p.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=p.getElementsByTagName("*"),r=p.getElementsByTagName("a")[0];if(!n||!r||!n.length)return{};s=i.createElement("select"),o=s.appendChild(i.createElement("option")),u=p.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:r.getAttribute("href")==="/a",opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:u.value==="on",optSelected:o.selected,getSetAttribute:p.className!=="t",enctype:!!i.createElement("form").enctype,html5Clone:i.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",boxModel:i.compatMode==="CSS1Compat",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},u.checked=!0,t.noCloneChecked=u.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!o.disabled;try{delete p.test}catch(d){t.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",h=function(){t.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick"),p.detachEvent("onclick",h)),u=i.createElement("input"),u.value="t",u.setAttribute("type","radio"),t.radioValue=u.value==="t",u.setAttribute("checked","checked"),u.setAttribute("name","t"),p.appendChild(u),a=i.createDocumentFragment(),a.appendChild(p.lastChild),t.checkClone=a.cloneNode(!0).cloneNode(!0).lastChild.checked,t.appendChecked=u.checked,a.removeChild(u),a.appendChild(p);if(p.attachEvent)for(l in{submit:!0,change:!0,focusin:!0})f="on"+l,c=f in p,c||(p.setAttribute(f,"return;"),c=typeof p[f]=="function"),t[l+"Bubbles"]=c;return v(function(){var n,r,s,o,u="padding:0;margin:0;border:0;display:block;overflow:hidden;",a=i.getElementsByTagName("body")[0];if(!a)return;n=i.createElement("div"),n.style.cssText="visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px",a.insertBefore(n,a.firstChild),r=i.createElement("div"),n.appendChild(r),r.innerHTML="<table><tr><td></td><td>t</td></tr></table>",s=r.getElementsByTagName("td"),s[0].style.cssText="padding:0;margin:0;border:0;display:none",c=s[0].offsetHeight===0,s[0].style.display="",s[1].style.display="none",t.reliableHiddenOffsets=c&&s[0].offsetHeight===0,r.innerHTML="",r.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=r.offsetWidth===4,t.doesNotIncludeMarginInBodyOffset=a.offsetTop!==1,e.getComputedStyle&&(t.pixelPosition=(e.getComputedStyle(r,null)||{}).top!=="1%",t.boxSizingReliable=(e.getComputedStyle(r,null)||{width:"4px"}).width==="4px",o=i.createElement("div"),o.style.cssText=r.style.cssText=u,o.style.marginRight=o.style.width="0",r.style.width="1px",r.appendChild(o),t.reliableMarginRight=!parseFloat((e.getComputedStyle(o,null)||{}).marginRight)),typeof r.style.zoom!="undefined"&&(r.innerHTML="",r.style.cssText=u+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=r.offsetWidth===3,r.style.display="block",r.style.overflow="visible",r.innerHTML="<div></div>",r.firstChild.style.width="5px",t.shrinkWrapBlocks=r.offsetWidth!==3,n.style.zoom=1),a.removeChild(n),n=r=s=o=null}),a.removeChild(p),n=r=s=o=u=a=p=null,t}();var D=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;v.extend({cache:{},deletedIds:[],uuid:0,expando:"jQuery"+(v.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?v.cache[e[v.expando]]:e[v.expando],!!e&&!B(e)},data:function(e,n,r,i){if(!v.acceptData(e))return;var s,o,u=v.expando,a=typeof n=="string",f=e.nodeType,l=f?v.cache:e,c=f?e[u]:e[u]&&u;if((!c||!l[c]||!i&&!l[c].data)&&a&&r===t)return;c||(f?e[u]=c=v.deletedIds.pop()||v.guid++:c=u),l[c]||(l[c]={},f||(l[c].toJSON=v.noop));if(typeof n=="object"||typeof n=="function")i?l[c]=v.extend(l[c],n):l[c].data=v.extend(l[c].data,n);return s=l[c],i||(s.data||(s.data={}),s=s.data),r!==t&&(s[v.camelCase(n)]=r),a?(o=s[n],o==null&&(o=s[v.camelCase(n)])):o=s,o},removeData:function(e,t,n){if(!v.acceptData(e))return;var r,i,s,o=e.nodeType,u=o?v.cache:e,a=o?e[v.expando]:v.expando;if(!u[a])return;if(t){r=n?u[a]:u[a].data;if(r){v.isArray(t)||(t in r?t=[t]:(t=v.camelCase(t),t in r?t=[t]:t=t.split(" ")));for(i=0,s=t.length;i<s;i++)delete r[t[i]];if(!(n?B:v.isEmptyObject)(r))return}}if(!n){delete u[a].data;if(!B(u[a]))return}o?v.cleanData([e],!0):v.support.deleteExpando||u!=u.window?delete u[a]:u[a]=null},_data:function(e,t,n){return v.data(e,t,n,!0)},acceptData:function(e){var t=e.nodeName&&v.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),v.fn.extend({data:function(e,n){var r,i,s,o,u,a=this[0],f=0,l=null;if(e===t){if(this.length){l=v.data(a);if(a.nodeType===1&&!v._data(a,"parsedAttrs")){s=a.attributes;for(u=s.length;f<u;f++)o=s[f].name,o.indexOf("data-")||(o=v.camelCase(o.substring(5)),H(a,o,l[o]));v._data(a,"parsedAttrs",!0)}}return l}return typeof e=="object"?this.each(function(){v.data(this,e)}):(r=e.split(".",2),r[1]=r[1]?"."+r[1]:"",i=r[1]+"!",v.access(this,function(n){if(n===t)return l=this.triggerHandler("getData"+i,[r[0]]),l===t&&a&&(l=v.data(a,e),l=H(a,e,l)),l===t&&r[1]?this.data(r[0]):l;r[1]=n,this.each(function(){var t=v(this);t.triggerHandler("setData"+i,r),v.data(this,e,n),t.triggerHandler("changeData"+i,r)})},null,n,arguments.length>1,null,!1))},removeData:function(e){return this.each(function(){v.removeData(this,e)})}}),v.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=v._data(e,t),n&&(!r||v.isArray(n)?r=v._data(e,t,v.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=v.queue(e,t),r=n.length,i=n.shift(),s=v._queueHooks(e,t),o=function(){v.dequeue(e,t)};i==="inprogress"&&(i=n.shift(),r--),i&&(t==="fx"&&n.unshift("inprogress"),delete s.stop,i.call(e,o,s)),!r&&s&&s.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return v._data(e,n)||v._data(e,n,{empty:v.Callbacks("once memory").add(function(){v.removeData(e,t+"queue",!0),v.removeData(e,n,!0)})})}}),v.fn.extend({queue:function(e,n){var r=2;return typeof e!="string"&&(n=e,e="fx",r--),arguments.length<r?v.queue(this[0],e):n===t?this:this.each(function(){var t=v.queue(this,e,n);v._queueHooks(this,e),e==="fx"&&t[0]!=="inprogress"&&v.dequeue(this,e)})},dequeue:function(e){return this.each(function(){v.dequeue(this,e)})},delay:function(e,t){return e=v.fx?v.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,s=v.Deferred(),o=this,u=this.length,a=function(){--i||s.resolveWith(o,[o])};typeof e!="string"&&(n=e,e=t),e=e||"fx";while(u--)r=v._data(o[u],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(a));return a(),s.promise(n)}});var j,F,I,q=/[\t\r\n]/g,R=/\r/g,U=/^(?:button|input)$/i,z=/^(?:button|input|object|select|textarea)$/i,W=/^a(?:rea|)$/i,X=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,V=v.support.getSetAttribute;v.fn.extend({attr:function(e,t){return v.access(this,v.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){v.removeAttr(this,e)})},prop:function(e,t){return v.access(this,v.prop,e,t,arguments.length>1)},removeProp:function(e){return e=v.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,s,o,u;if(v.isFunction(e))return this.each(function(t){v(this).addClass(e.call(this,t,this.className))});if(e&&typeof e=="string"){t=e.split(y);for(n=0,r=this.length;n<r;n++){i=this[n];if(i.nodeType===1)if(!i.className&&t.length===1)i.className=e;else{s=" "+i.className+" ";for(o=0,u=t.length;o<u;o++)s.indexOf(" "+t[o]+" ")<0&&(s+=t[o]+" ");i.className=v.trim(s)}}}return this},removeClass:function(e){var n,r,i,s,o,u,a;if(v.isFunction(e))return this.each(function(t){v(this).removeClass(e.call(this,t,this.className))});if(e&&typeof e=="string"||e===t){n=(e||"").split(y);for(u=0,a=this.length;u<a;u++){i=this[u];if(i.nodeType===1&&i.className){r=(" "+i.className+" ").replace(q," ");for(s=0,o=n.length;s<o;s++)while(r.indexOf(" "+n[s]+" ")>=0)r=r.replace(" "+n[s]+" "," ");i.className=e?v.trim(r):""}}}return this},toggleClass:function(e,t){var n=typeof e,r=typeof t=="boolean";return v.isFunction(e)?this.each(function(n){v(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if(n==="string"){var i,s=0,o=v(this),u=t,a=e.split(y);while(i=a[s++])u=r?u:!o.hasClass(i),o[u?"addClass":"removeClass"](i)}else if(n==="undefined"||n==="boolean")this.className&&v._data(this,"__className__",this.className),this.className=this.className||e===!1?"":v._data(this,"__className__")||""})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;n<r;n++)if(this[n].nodeType===1&&(" "+this[n].className+" ").replace(q," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,s=this[0];if(!arguments.length){if(s)return n=v.valHooks[s.type]||v.valHooks[s.nodeName.toLowerCase()],n&&"get"in n&&(r=n.get(s,"value"))!==t?r:(r=s.value,typeof r=="string"?r.replace(R,""):r==null?"":r);return}return i=v.isFunction(e),this.each(function(r){var s,o=v(this);if(this.nodeType!==1)return;i?s=e.call(this,r,o.val()):s=e,s==null?s="":typeof s=="number"?s+="":v.isArray(s)&&(s=v.map(s,function(e){return e==null?"":e+""})),n=v.valHooks[this.type]||v.valHooks[this.nodeName.toLowerCase()];if(!n||!("set"in n)||n.set(this,s,"value")===t)this.value=s})}}),v.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,s=e.type==="select-one"||i<0,o=s?null:[],u=s?i+1:r.length,a=i<0?u:s?i:0;for(;a<u;a++){n=r[a];if((n.selected||a===i)&&(v.support.optDisabled?!n.disabled:n.getAttribute("disabled")===null)&&(!n.parentNode.disabled||!v.nodeName(n.parentNode,"optgroup"))){t=v(n).val();if(s)return t;o.push(t)}}return o},set:function(e,t){var n=v.makeArray(t);return v(e).find("option").each(function(){this.selected=v.inArray(v(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attrFn:{},attr:function(e,n,r,i){var s,o,u,a=e.nodeType;if(!e||a===3||a===8||a===2)return;if(i&&v.isFunction(v.fn[n]))return v(e)[n](r);if(typeof e.getAttribute=="undefined")return v.prop(e,n,r);u=a!==1||!v.isXMLDoc(e),u&&(n=n.toLowerCase(),o=v.attrHooks[n]||(X.test(n)?F:j));if(r!==t){if(r===null){v.removeAttr(e,n);return}return o&&"set"in o&&u&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r)}return o&&"get"in o&&u&&(s=o.get(e,n))!==null?s:(s=e.getAttribute(n),s===null?t:s)},removeAttr:function(e,t){var n,r,i,s,o=0;if(t&&e.nodeType===1){r=t.split(y);for(;o<r.length;o++)i=r[o],i&&(n=v.propFix[i]||i,s=X.test(i),s||v.attr(e,i,""),e.removeAttribute(V?i:n),s&&n in e&&(e[n]=!1))}},attrHooks:{type:{set:function(e,t){if(U.test(e.nodeName)&&e.parentNode)v.error("type property can't be changed");else if(!v.support.radioValue&&t==="radio"&&v.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}},value:{get:function(e,t){return j&&v.nodeName(e,"button")?j.get(e,t):t in e?e.value:null},set:function(e,t,n){if(j&&v.nodeName(e,"button"))return j.set(e,t,n);e.value=t}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,s,o,u=e.nodeType;if(!e||u===3||u===8||u===2)return;return o=u!==1||!v.isXMLDoc(e),o&&(n=v.propFix[n]||n,s=v.propHooks[n]),r!==t?s&&"set"in s&&(i=s.set(e,r,n))!==t?i:e[n]=r:s&&"get"in s&&(i=s.get(e,n))!==null?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):z.test(e.nodeName)||W.test(e.nodeName)&&e.href?0:t}}}}),F={get:function(e,n){var r,i=v.prop(e,n);return i===!0||typeof i!="boolean"&&(r=e.getAttributeNode(n))&&r.nodeValue!==!1?n.toLowerCase():t},set:function(e,t,n){var r;return t===!1?v.removeAttr(e,n):(r=v.propFix[n]||n,r in e&&(e[r]=!0),e.setAttribute(n,n.toLowerCase())),n}},V||(I={name:!0,id:!0,coords:!0},j=v.valHooks.button={get:function(e,n){var r;return r=e.getAttributeNode(n),r&&(I[n]?r.value!=="":r.specified)?r.value:t},set:function(e,t,n){var r=e.getAttributeNode(n);return r||(r=i.createAttribute(n),e.setAttributeNode(r)),r.value=t+""}},v.each(["width","height"],function(e,t){v.attrHooks[t]=v.extend(v.attrHooks[t],{set:function(e,n){if(n==="")return e.setAttribute(t,"auto"),n}})}),v.attrHooks.contenteditable={get:j.get,set:function(e,t,n){t===""&&(t="false"),j.set(e,t,n)}}),v.support.hrefNormalized||v.each(["href","src","width","height"],function(e,n){v.attrHooks[n]=v.extend(v.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return r===null?t:r}})}),v.support.style||(v.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||t},set:function(e,t){return e.style.cssText=t+""}}),v.support.optSelected||(v.propHooks.selected=v.extend(v.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),v.support.enctype||(v.propFix.enctype="encoding"),v.support.checkOn||v.each(["radio","checkbox"],function(){v.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value}}}),v.each(["radio","checkbox"],function(){v.valHooks[this]=v.extend(v.valHooks[this],{set:function(e,t){if(v.isArray(t))return e.checked=v.inArray(v(e).val(),t)>=0}})});var $=/^(?:textarea|input|select)$/i,J=/^([^\.]*|)(?:\.(.+)|)$/,K=/(?:^|\s)hover(\.\S+|)\b/,Q=/^key/,G=/^(?:mouse|contextmenu)|click/,Y=/^(?:focusinfocus|focusoutblur)$/,Z=function(e){return v.event.special.hover?e:e.replace(K,"mouseenter$1 mouseleave$1")};v.event={add:function(e,n,r,i,s){var o,u,a,f,l,c,h,p,d,m,g;if(e.nodeType===3||e.nodeType===8||!n||!r||!(o=v._data(e)))return;r.handler&&(d=r,r=d.handler,s=d.selector),r.guid||(r.guid=v.guid++),a=o.events,a||(o.events=a={}),u=o.handle,u||(o.handle=u=function(e){return typeof v=="undefined"||!!e&&v.event.triggered===e.type?t:v.event.dispatch.apply(u.elem,arguments)},u.elem=e),n=v.trim(Z(n)).split(" ");for(f=0;f<n.length;f++){l=J.exec(n[f])||[],c=l[1],h=(l[2]||"").split(".").sort(),g=v.event.special[c]||{},c=(s?g.delegateType:g.bindType)||c,g=v.event.special[c]||{},p=v.extend({type:c,origType:l[1],data:i,handler:r,guid:r.guid,selector:s,needsContext:s&&v.expr.match.needsContext.test(s),namespace:h.join(".")},d),m=a[c];if(!m){m=a[c]=[],m.delegateCount=0;if(!g.setup||g.setup.call(e,i,h,u)===!1)e.addEventListener?e.addEventListener(c,u,!1):e.attachEvent&&e.attachEvent("on"+c,u)}g.add&&(g.add.call(e,p),p.handler.guid||(p.handler.guid=r.guid)),s?m.splice(m.delegateCount++,0,p):m.push(p),v.event.global[c]=!0}e=null},global:{},remove:function(e,t,n,r,i){var s,o,u,a,f,l,c,h,p,d,m,g=v.hasData(e)&&v._data(e);if(!g||!(h=g.events))return;t=v.trim(Z(t||"")).split(" ");for(s=0;s<t.length;s++){o=J.exec(t[s])||[],u=a=o[1],f=o[2];if(!u){for(u in h)v.event.remove(e,u+t[s],n,r,!0);continue}p=v.event.special[u]||{},u=(r?p.delegateType:p.bindType)||u,d=h[u]||[],l=d.length,f=f?new RegExp("(^|\\.)"+f.split(".").sort().join("\\.(?:.*\\.|)")+"(\\.|$)"):null;for(c=0;c<d.length;c++)m=d[c],(i||a===m.origType)&&(!n||n.guid===m.guid)&&(!f||f.test(m.namespace))&&(!r||r===m.selector||r==="**"&&m.selector)&&(d.splice(c--,1),m.selector&&d.delegateCount--,p.remove&&p.remove.call(e,m));d.length===0&&l!==d.length&&((!p.teardown||p.teardown.call(e,f,g.handle)===!1)&&v.removeEvent(e,u,g.handle),delete h[u])}v.isEmptyObject(h)&&(delete g.handle,v.removeData(e,"events",!0))},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(n,r,s,o){if(!s||s.nodeType!==3&&s.nodeType!==8){var u,a,f,l,c,h,p,d,m,g,y=n.type||n,b=[];if(Y.test(y+v.event.triggered))return;y.indexOf("!")>=0&&(y=y.slice(0,-1),a=!0),y.indexOf(".")>=0&&(b=y.split("."),y=b.shift(),b.sort());if((!s||v.event.customEvent[y])&&!v.event.global[y])return;n=typeof n=="object"?n[v.expando]?n:new v.Event(y,n):new v.Event(y),n.type=y,n.isTrigger=!0,n.exclusive=a,n.namespace=b.join("."),n.namespace_re=n.namespace?new RegExp("(^|\\.)"+b.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,h=y.indexOf(":")<0?"on"+y:"";if(!s){u=v.cache;for(f in u)u[f].events&&u[f].events[y]&&v.event.trigger(n,r,u[f].handle.elem,!0);return}n.result=t,n.target||(n.target=s),r=r!=null?v.makeArray(r):[],r.unshift(n),p=v.event.special[y]||{};if(p.trigger&&p.trigger.apply(s,r)===!1)return;m=[[s,p.bindType||y]];if(!o&&!p.noBubble&&!v.isWindow(s)){g=p.delegateType||y,l=Y.test(g+y)?s:s.parentNode;for(c=s;l;l=l.parentNode)m.push([l,g]),c=l;c===(s.ownerDocument||i)&&m.push([c.defaultView||c.parentWindow||e,g])}for(f=0;f<m.length&&!n.isPropagationStopped();f++)l=m[f][0],n.type=m[f][1],d=(v._data(l,"events")||{})[n.type]&&v._data(l,"handle"),d&&d.apply(l,r),d=h&&l[h],d&&v.acceptData(l)&&d.apply&&d.apply(l,r)===!1&&n.preventDefault();return n.type=y,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(s.ownerDocument,r)===!1)&&(y!=="click"||!v.nodeName(s,"a"))&&v.acceptData(s)&&h&&s[y]&&(y!=="focus"&&y!=="blur"||n.target.offsetWidth!==0)&&!v.isWindow(s)&&(c=s[h],c&&(s[h]=null),v.event.triggered=y,s[y](),v.event.triggered=t,c&&(s[h]=c)),n.result}return},dispatch:function(n){n=v.event.fix(n||e.event);var r,i,s,o,u,a,f,c,h,p,d=(v._data(this,"events")||{})[n.type]||[],m=d.delegateCount,g=l.call(arguments),y=!n.exclusive&&!n.namespace,b=v.event.special[n.type]||{},w=[];g[0]=n,n.delegateTarget=this;if(b.preDispatch&&b.preDispatch.call(this,n)===!1)return;if(m&&(!n.button||n.type!=="click"))for(s=n.target;s!=this;s=s.parentNode||this)if(s.disabled!==!0||n.type!=="click"){u={},f=[];for(r=0;r<m;r++)c=d[r],h=c.selector,u[h]===t&&(u[h]=c.needsContext?v(h,this).index(s)>=0:v.find(h,this,null,[s]).length),u[h]&&f.push(c);f.length&&w.push({elem:s,matches:f})}d.length>m&&w.push({elem:this,matches:d.slice(m)});for(r=0;r<w.length&&!n.isPropagationStopped();r++){a=w[r],n.currentTarget=a.elem;for(i=0;i<a.matches.length&&!n.isImmediatePropagationStopped();i++){c=a.matches[i];if(y||!n.namespace&&!c.namespace||n.namespace_re&&n.namespace_re.test(c.namespace))n.data=c.data,n.handleObj=c,o=((v.event.special[c.origType]||{}).handle||c.handler).apply(a.elem,g),o!==t&&(n.result=o,o===!1&&(n.preventDefault(),n.stopPropagation()))}}return b.postDispatch&&b.postDispatch.call(this,n),n.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return e.which==null&&(e.which=t.charCode!=null?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,s,o,u=n.button,a=n.fromElement;return e.pageX==null&&n.clientX!=null&&(r=e.target.ownerDocument||i,s=r.documentElement,o=r.body,e.pageX=n.clientX+(s&&s.scrollLeft||o&&o.scrollLeft||0)-(s&&s.clientLeft||o&&o.clientLeft||0),e.pageY=n.clientY+(s&&s.scrollTop||o&&o.scrollTop||0)-(s&&s.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&a&&(e.relatedTarget=a===e.target?n.toElement:a),!e.which&&u!==t&&(e.which=u&1?1:u&2?3:u&4?2:0),e}},fix:function(e){if(e[v.expando])return e;var t,n,r=e,s=v.event.fixHooks[e.type]||{},o=s.props?this.props.concat(s.props):this.props;e=v.Event(r);for(t=o.length;t;)n=o[--t],e[n]=r[n];return e.target||(e.target=r.srcElement||i),e.target.nodeType===3&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,r):e},special:{load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(e,t,n){v.isWindow(this)&&(this.onbeforeunload=n)},teardown:function(e,t){this.onbeforeunload===t&&(this.onbeforeunload=null)}}},simulate:function(e,t,n,r){var i=v.extend(new v.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?v.event.trigger(i,null,t):v.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},v.event.handle=v.event.dispatch,v.removeEvent=i.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]=="undefined"&&(e[r]=null),e.detachEvent(r,n))},v.Event=function(e,t){if(!(this instanceof v.Event))return new v.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?tt:et):this.type=e,t&&v.extend(this,t),this.timeStamp=e&&e.timeStamp||v.now(),this[v.expando]=!0},v.Event.prototype={preventDefault:function(){this.isDefaultPrevented=tt;var e=this.originalEvent;if(!e)return;e.preventDefault?e.preventDefault():e.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=tt;var e=this.originalEvent;if(!e)return;e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=tt,this.stopPropagation()},isDefaultPrevented:et,isPropagationStopped:et,isImmediatePropagationStopped:et},v.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){v.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,s=e.handleObj,o=s.selector;if(!i||i!==r&&!v.contains(r,i))e.type=s.origType,n=s.handler.apply(this,arguments),e.type=t;return n}}}),v.support.submitBubbles||(v.event.special.submit={setup:function(){if(v.nodeName(this,"form"))return!1;v.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=v.nodeName(n,"input")||v.nodeName(n,"button")?n.form:t;r&&!v._data(r,"_submit_attached")&&(v.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),v._data(r,"_submit_attached",!0))})},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&v.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){if(v.nodeName(this,"form"))return!1;v.event.remove(this,"._submit")}}),v.support.changeBubbles||(v.event.special.change={setup:function(){if($.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")v.event.add(this,"propertychange._change",function(e){e.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),v.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),v.event.simulate("change",this,e,!0)});return!1}v.event.add(this,"beforeactivate._change",function(e){var t=e.target;$.test(t.nodeName)&&!v._data(t,"_change_attached")&&(v.event.add(t,"change._change",function(e){this.parentNode&&!e.isSimulated&&!e.isTrigger&&v.event.simulate("change",this.parentNode,e,!0)}),v._data(t,"_change_attached",!0))})},handle:function(e){var t=e.target;if(this!==t||e.isSimulated||e.isTrigger||t.type!=="radio"&&t.type!=="checkbox")return e.handleObj.handler.apply(this,arguments)},teardown:function(){return v.event.remove(this,"._change"),!$.test(this.nodeName)}}),v.support.focusinBubbles||v.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){v.event.simulate(t,e.target,v.event.fix(e),!0)};v.event.special[t]={setup:function(){n++===0&&i.addEventListener(e,r,!0)},teardown:function(){--n===0&&i.removeEventListener(e,r,!0)}}}),v.fn.extend({on:function(e,n,r,i,s){var o,u;if(typeof e=="object"){typeof n!="string"&&(r=r||n,n=t);for(u in e)this.on(u,n,r,e[u],s);return this}r==null&&i==null?(i=n,r=n=t):i==null&&(typeof n=="string"?(i=r,r=t):(i=r,r=n,n=t));if(i===!1)i=et;else if(!i)return this;return s===1&&(o=i,i=function(e){return v().off(e),o.apply(this,arguments)},i.guid=o.guid||(o.guid=v.guid++)),this.each(function(){v.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,s;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,v(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if(typeof e=="object"){for(s in e)this.off(s,n,e[s]);return this}if(n===!1||typeof n=="function")r=n,n=t;return r===!1&&(r=et),this.each(function(){v.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},live:function(e,t,n){return v(this.context).on(e,this.selector,t,n),this},die:function(e,t){return v(this.context).off(e,this.selector||"**",t),this},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return arguments.length===1?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){v.event.trigger(e,t,this)})},triggerHandler:function(e,t){if(this[0])return v.event.trigger(e,t,this[0],!0)},toggle:function(e){var t=arguments,n=e.guid||v.guid++,r=0,i=function(n){var i=(v._data(this,"lastToggle"+e.guid)||0)%r;return v._data(this,"lastToggle"+e.guid,i+1),n.preventDefault(),t[i].apply(this,arguments)||!1};i.guid=n;while(r<t.length)t[r++].guid=n;return this.click(i)},hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){v.fn[t]=function(e,n){return n==null&&(n=e,e=null),arguments.length>0?this.on(t,null,e,n):this.trigger(t)},Q.test(t)&&(v.event.fixHooks[t]=v.event.keyHooks),G.test(t)&&(v.event.fixHooks[t]=v.event.mouseHooks)}),function(e,t){function nt(e,t,n,r){n=n||[],t=t||g;var i,s,a,f,l=t.nodeType;if(!e||typeof e!="string")return n;if(l!==1&&l!==9)return[];a=o(t);if(!a&&!r)if(i=R.exec(e))if(f=i[1]){if(l===9){s=t.getElementById(f);if(!s||!s.parentNode)return n;if(s.id===f)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(f))&&u(t,s)&&s.id===f)return n.push(s),n}else{if(i[2])return S.apply(n,x.call(t.getElementsByTagName(e),0)),n;if((f=i[3])&&Z&&t.getElementsByClassName)return S.apply(n,x.call(t.getElementsByClassName(f),0)),n}return vt(e.replace(j,"$1"),t,n,r,a)}function rt(e){return function(t){var n=t.nodeName.toLowerCase();return n==="input"&&t.type===e}}function it(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}}function st(e){return N(function(t){return t=+t,N(function(n,r){var i,s=e([],n.length,t),o=s.length;while(o--)n[i=s[o]]&&(n[i]=!(r[i]=n[i]))})})}function ot(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}function ut(e,t){var n,r,s,o,u,a,f,l=L[d][e+" "];if(l)return t?0:l.slice(0);u=e,a=[],f=i.preFilter;while(u){if(!n||(r=F.exec(u)))r&&(u=u.slice(r[0].length)||u),a.push(s=[]);n=!1;if(r=I.exec(u))s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=r[0].replace(j," ");for(o in i.filter)(r=J[o].exec(u))&&(!f[o]||(r=f[o](r)))&&(s.push(n=new m(r.shift())),u=u.slice(n.length),n.type=o,n.matches=r);if(!n)break}return t?u.length:u?nt.error(e):L(e,a).slice(0)}function at(e,t,r){var i=t.dir,s=r&&t.dir==="parentNode",o=w++;return t.first?function(t,n,r){while(t=t[i])if(s||t.nodeType===1)return e(t,n,r)}:function(t,r,u){if(!u){var a,f=b+" "+o+" ",l=f+n;while(t=t[i])if(s||t.nodeType===1){if((a=t[d])===l)return t.sizset;if(typeof a=="string"&&a.indexOf(f)===0){if(t.sizset)return t}else{t[d]=l;if(e(t,r,u))return t.sizset=!0,t;t.sizset=!1}}}else while(t=t[i])if(s||t.nodeType===1)if(e(t,r,u))return t}}function ft(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function lt(e,t,n,r,i){var s,o=[],u=0,a=e.length,f=t!=null;for(;u<a;u++)if(s=e[u])if(!n||n(s,r,i))o.push(s),f&&t.push(u);return o}function ct(e,t,n,r,i,s){return r&&!r[d]&&(r=ct(r)),i&&!i[d]&&(i=ct(i,s)),N(function(s,o,u,a){var f,l,c,h=[],p=[],d=o.length,v=s||dt(t||"*",u.nodeType?[u]:u,[]),m=e&&(s||!t)?lt(v,h,e,u,a):v,g=n?i||(s?e:d||r)?[]:o:m;n&&n(m,g,u,a);if(r){f=lt(g,p),r(f,[],u,a),l=f.length;while(l--)if(c=f[l])g[p[l]]=!(m[p[l]]=c)}if(s){if(i||e){if(i){f=[],l=g.length;while(l--)(c=g[l])&&f.push(m[l]=c);i(null,g=[],f,a)}l=g.length;while(l--)(c=g[l])&&(f=i?T.call(s,c):h[l])>-1&&(s[f]=!(o[f]=c))}}else g=lt(g===o?g.splice(d,g.length):g),i?i(null,o,g,a):S.apply(o,g)})}function ht(e){var t,n,r,s=e.length,o=i.relative[e[0].type],u=o||i.relative[" "],a=o?1:0,f=at(function(e){return e===t},u,!0),l=at(function(e){return T.call(t,e)>-1},u,!0),h=[function(e,n,r){return!o&&(r||n!==c)||((t=n).nodeType?f(e,n,r):l(e,n,r))}];for(;a<s;a++)if(n=i.relative[e[a].type])h=[at(ft(h),n)];else{n=i.filter[e[a].type].apply(null,e[a].matches);if(n[d]){r=++a;for(;r<s;r++)if(i.relative[e[r].type])break;return ct(a>1&&ft(h),a>1&&e.slice(0,a-1).join("").replace(j,"$1"),n,a<r&&ht(e.slice(a,r)),r<s&&ht(e=e.slice(r)),r<s&&e.join(""))}h.push(n)}return ft(h)}function pt(e,t){var r=t.length>0,s=e.length>0,o=function(u,a,f,l,h){var p,d,v,m=[],y=0,w="0",x=u&&[],T=h!=null,N=c,C=u||s&&i.find.TAG("*",h&&a.parentNode||a),k=b+=N==null?1:Math.E;T&&(c=a!==g&&a,n=o.el);for(;(p=C[w])!=null;w++){if(s&&p){for(d=0;v=e[d];d++)if(v(p,a,f)){l.push(p);break}T&&(b=k,n=++o.el)}r&&((p=!v&&p)&&y--,u&&x.push(p))}y+=w;if(r&&w!==y){for(d=0;v=t[d];d++)v(x,m,a,f);if(u){if(y>0)while(w--)!x[w]&&!m[w]&&(m[w]=E.call(l));m=lt(m)}S.apply(l,m),T&&!u&&m.length>0&&y+t.length>1&&nt.uniqueSort(l)}return T&&(b=k,c=N),x};return o.el=0,r?N(o):o}function dt(e,t,n){var r=0,i=t.length;for(;r<i;r++)nt(e,t[r],n);return n}function vt(e,t,n,r,s){var o,u,f,l,c,h=ut(e),p=h.length;if(!r&&h.length===1){u=h[0]=h[0].slice(0);if(u.length>2&&(f=u[0]).type==="ID"&&t.nodeType===9&&!s&&i.relative[u[1].type]){t=i.find.ID(f.matches[0].replace($,""),t,s)[0];if(!t)return n;e=e.slice(u.shift().length)}for(o=J.POS.test(e)?-1:u.length-1;o>=0;o--){f=u[o];if(i.relative[l=f.type])break;if(c=i.find[l])if(r=c(f.matches[0].replace($,""),z.test(u[0].type)&&t.parentNode||t,s)){u.splice(o,1),e=r.length&&u.join("");if(!e)return S.apply(n,x.call(r,0)),n;break}}}return a(e,h)(r,t,s,n,z.test(e)),n}function mt(){}var n,r,i,s,o,u,a,f,l,c,h=!0,p="undefined",d=("sizcache"+Math.random()).replace(".",""),m=String,g=e.document,y=g.documentElement,b=0,w=0,E=[].pop,S=[].push,x=[].slice,T=[].indexOf||function(e){var t=0,n=this.length;for(;t<n;t++)if(this[t]===e)return t;return-1},N=function(e,t){return e[d]=t==null||t,e},C=function(){var e={},t=[];return N(function(n,r){return t.push(n)>i.cacheLength&&delete e[t.shift()],e[n+" "]=r},e)},k=C(),L=C(),A=C(),O="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",_=M.replace("w","w#"),D="([*^$|!~]?=)",P="\\["+O+"*("+M+")"+O+"*(?:"+D+O+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+_+")|)|)"+O+"*\\]",H=":("+M+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+P+")|[^:]|\\\\.)*|.*))\\)|)",B=":(even|odd|eq|gt|lt|nth|first|last)(?:\\("+O+"*((?:-\\d)?\\d*)"+O+"*\\)|)(?=[^-]|$)",j=new RegExp("^"+O+"+|((?:^|[^\\\\])(?:\\\\.)*)"+O+"+$","g"),F=new RegExp("^"+O+"*,"+O+"*"),I=new RegExp("^"+O+"*([\\x20\\t\\r\\n\\f>+~])"+O+"*"),q=new RegExp(H),R=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,U=/^:not/,z=/[\x20\t\r\n\f]*[+~]/,W=/:not\($/,X=/h\d/i,V=/input|select|textarea|button/i,$=/\\(?!\\)/g,J={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),NAME:new RegExp("^\\[name=['\"]?("+M+")['\"]?\\]"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+P),PSEUDO:new RegExp("^"+H),POS:new RegExp(B,"i"),CHILD:new RegExp("^:(only|nth|first|last)-child(?:\\("+O+"*(even|odd|(([+-]|)(\\d*)n|)"+O+"*(?:([+-]|)"+O+"*(\\d+)|))"+O+"*\\)|)","i"),needsContext:new RegExp("^"+O+"*[>+~]|"+B,"i")},K=function(e){var t=g.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}},Q=K(function(e){return e.appendChild(g.createComment("")),!e.getElementsByTagName("*").length}),G=K(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==p&&e.firstChild.getAttribute("href")==="#"}),Y=K(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),Z=K(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||!e.getElementsByClassName("e").length?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length===2)}),et=K(function(e){e.id=d+0,e.innerHTML="<a name='"+d+"'></a><div name='"+d+"'></div>",y.insertBefore(e,y.firstChild);var t=g.getElementsByName&&g.getElementsByName(d).length===2+g.getElementsByName(d+0).length;return r=!g.getElementById(d),y.removeChild(e),t});try{x.call(y.childNodes,0)[0].nodeType}catch(tt){x=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}nt.matches=function(e,t){return nt(e,null,null,t)},nt.matchesSelector=function(e,t){return nt(t,null,null,[e]).length>0},s=nt.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=s(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=s(t);return n},o=nt.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},u=nt.contains=y.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t&&t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:y.compareDocumentPosition?function(e,t){return t&&!!(e.compareDocumentPosition(t)&16)}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt.attr=function(e,t){var n,r=o(e);return r||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):r||Y?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},i=nt.selectors={cacheLength:50,createPseudo:N,match:J,attrHandle:G?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},find:{ID:r?function(e,t,n){if(typeof t.getElementById!==p&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,n,r){if(typeof n.getElementById!==p&&!r){var i=n.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==p&&i.getAttributeNode("id").value===e?[i]:t:[]}},TAG:Q?function(e,t){if(typeof t.getElementsByTagName!==p)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n},NAME:et&&function(e,t){if(typeof t.getElementsByName!==p)return t.getElementsByName(name)},CLASS:Z&&function(e,t,n){if(typeof t.getElementsByClassName!==p&&!n)return t.getElementsByClassName(e)}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace($,""),e[3]=(e[4]||e[5]||"").replace($,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||nt.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&nt.error(e[0]),e},PSEUDO:function(e){var t,n;if(J.CHILD.test(e[0]))return null;if(e[3])e[2]=e[3];else if(t=e[4])q.test(t)&&(n=ut(t,!0))&&(n=t.indexOf(")",t.length-n)-t.length)&&(t=t.slice(0,n),e[0]=e[0].slice(0,n)),e[2]=t;return e.slice(0,3)}},filter:{ID:r?function(e){return e=e.replace($,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace($,""),function(t){var n=typeof t.getAttributeNode!==p&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace($,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[d][e+" "];return t||(t=new RegExp("(^|"+O+")"+e+"("+O+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==p&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r,i){var s=nt.attr(r,e);return s==null?t==="!=":t?(s+="",t==="="?s===n:t==="!="?s!==n:t==="^="?n&&s.indexOf(n)===0:t==="*="?n&&s.indexOf(n)>-1:t==="$="?n&&s.substr(s.length-n.length)===n:t==="~="?(" "+s+" ").indexOf(n)>-1:t==="|="?s===n||s.substr(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r){return e==="nth"?function(e){var t,i,s=e.parentNode;if(n===1&&r===0)return!0;if(s){i=0;for(t=s.firstChild;t;t=t.nextSibling)if(t.nodeType===1){i++;if(e===t)break}}return i-=r,i===n||i%n===0&&i/n>=0}:function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||nt.error("unsupported pseudo: "+e);return r[d]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?N(function(e,n){var i,s=r(e,t),o=s.length;while(o--)i=T.call(e,s[o]),e[i]=!(n[i]=s[o])}):function(e){return r(e,0,n)}):r}},pseudos:{not:N(function(e){var t=[],n=[],r=a(e.replace(j,"$1"));return r[d]?N(function(e,t,n,i){var s,o=r(e,null,i,[]),u=e.length;while(u--)if(s=o[u])e[u]=!(t[u]=s)}):function(e,i,s){return t[0]=e,r(t,null,s,n),!n.pop()}}),has:N(function(e){return function(t){return nt(e,t).length>0}}),contains:N(function(e){return function(t){return(t.textContent||t.innerText||s(t)).indexOf(e)>-1}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!i.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},header:function(e){return X.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:rt("radio"),checkbox:rt("checkbox"),file:rt("file"),password:rt("password"),image:rt("image"),submit:it("submit"),reset:it("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return V.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},active:function(e){return e===e.ownerDocument.activeElement},first:st(function(){return[0]}),last:st(function(e,t){return[t-1]}),eq:st(function(e,t,n){return[n<0?n+t:n]}),even:st(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:st(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:st(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:st(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}},f=y.compareDocumentPosition?function(e,t){return e===t?(l=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:function(e,t){if(e===t)return l=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],o=e.parentNode,u=t.parentNode,a=o;if(o===u)return ot(e,t);if(!o)return-1;if(!u)return 1;while(a)i.unshift(a),a=a.parentNode;a=u;while(a)s.unshift(a),a=a.parentNode;n=i.length,r=s.length;for(var f=0;f<n&&f<r;f++)if(i[f]!==s[f])return ot(i[f],s[f]);return f===n?ot(e,s[f],-1):ot(i[f],t,1)},[0,0].sort(f),h=!l,nt.uniqueSort=function(e){var t,n=[],r=1,i=0;l=h,e.sort(f);if(l){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e},nt.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},a=nt.compile=function(e,t){var n,r=[],i=[],s=A[d][e+" "];if(!s){t||(t=ut(e)),n=t.length;while(n--)s=ht(t[n]),s[d]?r.push(s):i.push(s);s=A(e,pt(i,r))}return s},g.querySelectorAll&&function(){var e,t=vt,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[":focus"],s=[":active"],u=y.matchesSelector||y.mozMatchesSelector||y.webkitMatchesSelector||y.oMatchesSelector||y.msMatchesSelector;K(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+O+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),K(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+O+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'/>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=new RegExp(i.join("|")),vt=function(e,r,s,o,u){if(!o&&!u&&!i.test(e)){var a,f,l=!0,c=d,h=r,p=r.nodeType===9&&e;if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){a=ut(e),(l=r.getAttribute("id"))?c=l.replace(n,"\\$&"):r.setAttribute("id",c),c="[id='"+c+"'] ",f=a.length;while(f--)a[f]=c+a[f].join("");h=z.test(e)&&r.parentNode||r,p=a.join(",")}if(p)try{return S.apply(s,x.call(h.querySelectorAll(p),0)),s}catch(v){}finally{l||r.removeAttribute("id")}}return t(e,r,s,o,u)},u&&(K(function(t){e=u.call(t,"div");try{u.call(t,"[test!='']:sizzle"),s.push("!=",H)}catch(n){}}),s=new RegExp(s.join("|")),nt.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!o(t)&&!s.test(n)&&!i.test(n))try{var a=u.call(t,n);if(a||e||t.document&&t.document.nodeType!==11)return a}catch(f){}return nt(n,null,null,[t]).length>0})}(),i.pseudos.nth=i.pseudos.eq,i.filters=mt.prototype=i.pseudos,i.setFilters=new mt,nt.attr=v.attr,v.find=nt,v.expr=nt.selectors,v.expr[":"]=v.expr.pseudos,v.unique=nt.uniqueSort,v.text=nt.getText,v.isXMLDoc=nt.isXML,v.contains=nt.contains}(e);var nt=/Until$/,rt=/^(?:parents|prev(?:Until|All))/,it=/^.[^:#\[\.,]*$/,st=v.expr.match.needsContext,ot={children:!0,contents:!0,next:!0,prev:!0};v.fn.extend({find:function(e){var t,n,r,i,s,o,u=this;if(typeof e!="string")return v(e).filter(function(){for(t=0,n=u.length;t<n;t++)if(v.contains(u[t],this))return!0});o=this.pushStack("","find",e);for(t=0,n=this.length;t<n;t++){r=o.length,v.find(e,this[t],o);if(t>0)for(i=r;i<o.length;i++)for(s=0;s<r;s++)if(o[s]===o[i]){o.splice(i--,1);break}}return o},has:function(e){var t,n=v(e,this),r=n.length;return this.filter(function(){for(t=0;t<r;t++)if(v.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1),"not",e)},filter:function(e){return this.pushStack(ft(this,e,!0),"filter",e)},is:function(e){return!!e&&(typeof e=="string"?st.test(e)?v(e,this.context).index(this[0])>=0:v.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,s=[],o=st.test(e)||typeof e!="string"?v(e,t||this.context):0;for(;r<i;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&n.nodeType!==11){if(o?o.index(n)>-1:v.find.matchesSelector(n,e)){s.push(n);break}n=n.parentNode}}return s=s.length>1?v.unique(s):s,this.pushStack(s,"closest",e)},index:function(e){return e?typeof e=="string"?v.inArray(this[0],v(e)):v.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.prevAll().length:-1},add:function(e,t){var n=typeof e=="string"?v(e,t):v.makeArray(e&&e.nodeType?[e]:e),r=v.merge(this.get(),n);return this.pushStack(ut(n[0])||ut(r[0])?r:v.unique(r))},addBack:function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}}),v.fn.andSelf=v.fn.addBack,v.each({parent:function(e){var t=e.parentNode;return t&&t.nodeType!==11?t:null},parents:function(e){return v.dir(e,"parentNode")},parentsUntil:function(e,t,n){return v.dir(e,"parentNode",n)},next:function(e){return at(e,"nextSibling")},prev:function(e){return at(e,"previousSibling")},nextAll:function(e){return v.dir(e,"nextSibling")},prevAll:function(e){return v.dir(e,"previousSibling")},nextUntil:function(e,t,n){return v.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return v.dir(e,"previousSibling",n)},siblings:function(e){return v.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return v.sibling(e.firstChild)},contents:function(e){return v.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:v.merge([],e.childNodes)}},function(e,t){v.fn[e]=function(n,r){var i=v.map(this,t,n);return nt.test(e)||(r=n),r&&typeof r=="string"&&(i=v.filter(r,i)),i=this.length>1&&!ot[e]?v.unique(i):i,this.length>1&&rt.test(e)&&(i=i.reverse()),this.pushStack(i,e,l.call(arguments).join(","))}}),v.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),t.length===1?v.find.matchesSelector(t[0],e)?[t[0]]:[]:v.find.matches(e,t)},dir:function(e,n,r){var i=[],s=e[n];while(s&&s.nodeType!==9&&(r===t||s.nodeType!==1||!v(s).is(r)))s.nodeType===1&&i.push(s),s=s[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)e.nodeType===1&&e!==t&&n.push(e);return n}});var ct="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ht=/ jQuery\d+="(?:null|\d+)"/g,pt=/^\s+/,dt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,vt=/<([\w:]+)/,mt=/<tbody/i,gt=/<|&#?\w+;/,yt=/<(?:script|style|link)/i,bt=/<(?:script|object|embed|option|style)/i,wt=new RegExp("<(?:"+ct+")[\\s/>]","i"),Et=/^(?:checkbox|radio)$/,St=/checked\s*(?:[^=]|=\s*.checked.)/i,xt=/\/(java|ecma)script/i,Tt=/^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,Nt={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},Ct=lt(i),kt=Ct.appendChild(i.createElement("div"));Nt.optgroup=Nt.option,Nt.tbody=Nt.tfoot=Nt.colgroup=Nt.caption=Nt.thead,Nt.th=Nt.td,v.support.htmlSerialize||(Nt._default=[1,"X<div>","</div>"]),v.fn.extend({text:function(e){return v.access(this,function(e){return e===t?v.text(this):this.empty().append((this[0]&&this[0].ownerDocument||i).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(v.isFunction(e))return this.each(function(t){v(this).wrapAll(e.call(this,t))});if(this[0]){var t=v(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&e.firstChild.nodeType===1)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return v.isFunction(e)?this.each(function(t){v(this).wrapInner(e.call(this,t))}):this.each(function(){var t=v(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=v.isFunction(e);return this.each(function(n){v(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){v.nodeName(this,"body")||v(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(this.nodeType===1||this.nodeType===11)&&this.insertBefore(e,this.firstChild)})},before:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(e,this),"before",this.selector)}},after:function(){if(!ut(this[0]))return this.domManip(arguments,!1,function(e){this.parentNode.insertBefore(e,this.nextSibling)});if(arguments.length){var e=v.clean(arguments);return this.pushStack(v.merge(this,e),"after",this.selector)}},remove:function(e,t){var n,r=0;for(;(n=this[r])!=null;r++)if(!e||v.filter(e,[n]).length)!t&&n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),v.cleanData([n])),n.parentNode&&n.parentNode.removeChild(n);return this},empty:function(){var e,t=0;for(;(e=this[t])!=null;t++){e.nodeType===1&&v.cleanData(e.getElementsByTagName("*"));while(e.firstChild)e.removeChild(e.firstChild)}return this},clone:function(e,t){return e=e==null?!1:e,t=t==null?e:t,this.map(function(){return v.clone(this,e,t)})},html:function(e){return v.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return n.nodeType===1?n.innerHTML.replace(ht,""):t;if(typeof e=="string"&&!yt.test(e)&&(v.support.htmlSerialize||!wt.test(e))&&(v.support.leadingWhitespace||!pt.test(e))&&!Nt[(vt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(dt,"<$1></$2>");try{for(;r<i;r++)n=this[r]||{},n.nodeType===1&&(v.cleanData(n.getElementsByTagName("*")),n.innerHTML=e);n=0}catch(s){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){return ut(this[0])?this.length?this.pushStack(v(v.isFunction(e)?e():e),"replaceWith",e):this:v.isFunction(e)?this.each(function(t){var n=v(this),r=n.html();n.replaceWith(e.call(this,t,r))}):(typeof e!="string"&&(e=v(e).detach()),this.each(function(){var t=this.nextSibling,n=this.parentNode;v(this).remove(),t?v(t).before(e):v(n).append(e)}))},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=[].concat.apply([],e);var i,s,o,u,a=0,f=e[0],l=[],c=this.length;if(!v.support.checkClone&&c>1&&typeof f=="string"&&St.test(f))return this.each(function(){v(this).domManip(e,n,r)});if(v.isFunction(f))return this.each(function(i){var s=v(this);e[0]=f.call(this,i,n?s.html():t),s.domManip(e,n,r)});if(this[0]){i=v.buildFragment(e,this,l),o=i.fragment,s=o.firstChild,o.childNodes.length===1&&(o=s);if(s){n=n&&v.nodeName(s,"tr");for(u=i.cacheable||c-1;a<c;a++)r.call(n&&v.nodeName(this[a],"table")?Lt(this[a],"tbody"):this[a],a===u?o:v.clone(o,!0,!0))}o=s=null,l.length&&v.each(l,function(e,t){t.src?v.ajax?v.ajax({url:t.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):v.error("no ajax"):v.globalEval((t.text||t.textContent||t.innerHTML||"").replace(Tt,"")),t.parentNode&&t.parentNode.removeChild(t)})}return this}}),v.buildFragment=function(e,n,r){var s,o,u,a=e[0];return n=n||i,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,e.length===1&&typeof a=="string"&&a.length<512&&n===i&&a.charAt(0)==="<"&&!bt.test(a)&&(v.support.checkClone||!St.test(a))&&(v.support.html5Clone||!wt.test(a))&&(o=!0,s=v.fragments[a],u=s!==t),s||(s=n.createDocumentFragment(),v.clean(e,n,s,r),o&&(v.fragments[a]=u&&s)),{fragment:s,cacheable:o}},v.fragments={},v.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){v.fn[e]=function(n){var r,i=0,s=[],o=v(n),u=o.length,a=this.length===1&&this[0].parentNode;if((a==null||a&&a.nodeType===11&&a.childNodes.length===1)&&u===1)return o[t](this[0]),this;for(;i<u;i++)r=(i>0?this.clone(!0):this).get(),v(o[i])[t](r),s=s.concat(r);return this.pushStack(s,e,o.selector)}}),v.extend({clone:function(e,t,n){var r,i,s,o;v.support.html5Clone||v.isXMLDoc(e)||!wt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(kt.innerHTML=e.outerHTML,kt.removeChild(o=kt.firstChild));if((!v.support.noCloneEvent||!v.support.noCloneChecked)&&(e.nodeType===1||e.nodeType===11)&&!v.isXMLDoc(e)){Ot(e,o),r=Mt(e),i=Mt(o);for(s=0;r[s];++s)i[s]&&Ot(r[s],i[s])}if(t){At(e,o);if(n){r=Mt(e),i=Mt(o);for(s=0;r[s];++s)At(r[s],i[s])}}return r=i=null,o},clean:function(e,t,n,r){var s,o,u,a,f,l,c,h,p,d,m,g,y=t===i&&Ct,b=[];if(!t||typeof t.createDocumentFragment=="undefined")t=i;for(s=0;(u=e[s])!=null;s++){typeof u=="number"&&(u+="");if(!u)continue;if(typeof u=="string")if(!gt.test(u))u=t.createTextNode(u);else{y=y||lt(t),c=t.createElement("div"),y.appendChild(c),u=u.replace(dt,"<$1></$2>"),a=(vt.exec(u)||["",""])[1].toLowerCase(),f=Nt[a]||Nt._default,l=f[0],c.innerHTML=f[1]+u+f[2];while(l--)c=c.lastChild;if(!v.support.tbody){h=mt.test(u),p=a==="table"&&!h?c.firstChild&&c.firstChild.childNodes:f[1]==="<table>"&&!h?c.childNodes:[];for(o=p.length-1;o>=0;--o)v.nodeName(p[o],"tbody")&&!p[o].childNodes.length&&p[o].parentNode.removeChild(p[o])}!v.support.leadingWhitespace&&pt.test(u)&&c.insertBefore(t.createTextNode(pt.exec(u)[0]),c.firstChild),u=c.childNodes,c.parentNode.removeChild(c)}u.nodeType?b.push(u):v.merge(b,u)}c&&(u=c=y=null);if(!v.support.appendChecked)for(s=0;(u=b[s])!=null;s++)v.nodeName(u,"input")?_t(u):typeof u.getElementsByTagName!="undefined"&&v.grep(u.getElementsByTagName("input"),_t);if(n){m=function(e){if(!e.type||xt.test(e.type))return r?r.push(e.parentNode?e.parentNode.removeChild(e):e):n.appendChild(e)};for(s=0;(u=b[s])!=null;s++)if(!v.nodeName(u,"script")||!m(u))n.appendChild(u),typeof u.getElementsByTagName!="undefined"&&(g=v.grep(v.merge([],u.getElementsByTagName("script")),m),b.splice.apply(b,[s+1,0].concat(g)),s+=g.length)}return b},cleanData:function(e,t){var n,r,i,s,o=0,u=v.expando,a=v.cache,f=v.support.deleteExpando,l=v.event.special;for(;(i=e[o])!=null;o++)if(t||v.acceptData(i)){r=i[u],n=r&&a[r];if(n){if(n.events)for(s in n.events)l[s]?v.event.remove(i,s):v.removeEvent(i,s,n.handle);a[r]&&(delete a[r],f?delete i[u]:i.removeAttribute?i.removeAttribute(u):i[u]=null,v.deletedIds.push(r))}}}}),function(){var e,t;v.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e=v.uaMatch(o.userAgent),t={},e.browser&&(t[e.browser]=!0,t.version=e.version),t.chrome?t.webkit=!0:t.webkit&&(t.safari=!0),v.browser=t,v.sub=function(){function e(t,n){return new e.fn.init(t,n)}v.extend(!0,e,this),e.superclass=this,e.fn=e.prototype=this(),e.fn.constructor=e,e.sub=this.sub,e.fn.init=function(r,i){return i&&i instanceof v&&!(i instanceof e)&&(i=e(i)),v.fn.init.call(this,r,i,t)},e.fn.init.prototype=e.fn;var t=e(i);return e}}();var Dt,Pt,Ht,Bt=/alpha\([^)]*\)/i,jt=/opacity=([^)]*)/,Ft=/^(top|right|bottom|left)$/,It=/^(none|table(?!-c[ea]).+)/,qt=/^margin/,Rt=new RegExp("^("+m+")(.*)$","i"),Ut=new RegExp("^("+m+")(?!px)[a-z%]+$","i"),zt=new RegExp("^([-+])=("+m+")","i"),Wt={BODY:"block"},Xt={position:"absolute",visibility:"hidden",display:"block"},Vt={letterSpacing:0,fontWeight:400},$t=["Top","Right","Bottom","Left"],Jt=["Webkit","O","Moz","ms"],Kt=v.fn.toggle;v.fn.extend({css:function(e,n){return v.access(this,function(e,n,r){return r!==t?v.style(e,n,r):v.css(e,n)},e,n,arguments.length>1)},show:function(){return Yt(this,!0)},hide:function(){return Yt(this)},toggle:function(e,t){var n=typeof e=="boolean";return v.isFunction(e)&&v.isFunction(t)?Kt.apply(this,arguments):this.each(function(){(n?e:Gt(this))?v(this).show():v(this).hide()})}}),v.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Dt(e,"opacity");return n===""?"1":n}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":v.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(!e||e.nodeType===3||e.nodeType===8||!e.style)return;var s,o,u,a=v.camelCase(n),f=e.style;n=v.cssProps[a]||(v.cssProps[a]=Qt(f,a)),u=v.cssHooks[n]||v.cssHooks[a];if(r===t)return u&&"get"in u&&(s=u.get(e,!1,i))!==t?s:f[n];o=typeof r,o==="string"&&(s=zt.exec(r))&&(r=(s[1]+1)*s[2]+parseFloat(v.css(e,n)),o="number");if(r==null||o==="number"&&isNaN(r))return;o==="number"&&!v.cssNumber[a]&&(r+="px");if(!u||!("set"in u)||(r=u.set(e,r,i))!==t)try{f[n]=r}catch(l){}},css:function(e,n,r,i){var s,o,u,a=v.camelCase(n);return n=v.cssProps[a]||(v.cssProps[a]=Qt(e.style,a)),u=v.cssHooks[n]||v.cssHooks[a],u&&"get"in u&&(s=u.get(e,!0,i)),s===t&&(s=Dt(e,n)),s==="normal"&&n in Vt&&(s=Vt[n]),r||i!==t?(o=parseFloat(s),r||v.isNumeric(o)?o||0:s):s},swap:function(e,t,n){var r,i,s={};for(i in t)s[i]=e.style[i],e.style[i]=t[i];r=n.call(e);for(i in t)e.style[i]=s[i];return r}}),e.getComputedStyle?Dt=function(t,n){var r,i,s,o,u=e.getComputedStyle(t,null),a=t.style;return u&&(r=u.getPropertyValue(n)||u[n],r===""&&!v.contains(t.ownerDocument,t)&&(r=v.style(t,n)),Ut.test(r)&&qt.test(n)&&(i=a.width,s=a.minWidth,o=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=u.width,a.width=i,a.minWidth=s,a.maxWidth=o)),r}:i.documentElement.currentStyle&&(Dt=function(e,t){var n,r,i=e.currentStyle&&e.currentStyle[t],s=e.style;return i==null&&s&&s[t]&&(i=s[t]),Ut.test(i)&&!Ft.test(t)&&(n=s.left,r=e.runtimeStyle&&e.runtimeStyle.left,r&&(e.runtimeStyle.left=e.currentStyle.left),s.left=t==="fontSize"?"1em":i,i=s.pixelLeft+"px",s.left=n,r&&(e.runtimeStyle.left=r)),i===""?"auto":i}),v.each(["height","width"],function(e,t){v.cssHooks[t]={get:function(e,n,r){if(n)return e.offsetWidth===0&&It.test(Dt(e,"display"))?v.swap(e,Xt,function(){return tn(e,t,r)}):tn(e,t,r)},set:function(e,n,r){return Zt(e,n,r?en(e,t,r,v.support.boxSizing&&v.css(e,"boxSizing")==="border-box"):0)}}}),v.support.opacity||(v.cssHooks.opacity={get:function(e,t){return jt.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=v.isNumeric(t)?"alpha(opacity="+t*100+")":"",s=r&&r.filter||n.filter||"";n.zoom=1;if(t>=1&&v.trim(s.replace(Bt,""))===""&&n.removeAttribute){n.removeAttribute("filter");if(r&&!r.filter)return}n.filter=Bt.test(s)?s.replace(Bt,i):s+" "+i}}),v(function(){v.support.reliableMarginRight||(v.cssHooks.marginRight={get:function(e,t){return v.swap(e,{display:"inline-block"},function(){if(t)return Dt(e,"marginRight")})}}),!v.support.pixelPosition&&v.fn.position&&v.each(["top","left"],function(e,t){v.cssHooks[t]={get:function(e,n){if(n){var r=Dt(e,t);return Ut.test(r)?v(e).position()[t]+"px":r}}}})}),v.expr&&v.expr.filters&&(v.expr.filters.hidden=function(e){return e.offsetWidth===0&&e.offsetHeight===0||!v.support.reliableHiddenOffsets&&(e.style&&e.style.display||Dt(e,"display"))==="none"},v.expr.filters.visible=function(e){return!v.expr.filters.hidden(e)}),v.each({margin:"",padding:"",border:"Width"},function(e,t){v.cssHooks[e+t]={expand:function(n){var r,i=typeof n=="string"?n.split(" "):[n],s={};for(r=0;r<4;r++)s[e+$t[r]+t]=i[r]||i[r-2]||i[0];return s}},qt.test(e)||(v.cssHooks[e+t].set=Zt)});var rn=/%20/g,sn=/\[\]$/,on=/\r?\n/g,un=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,an=/^(?:select|textarea)/i;v.fn.extend({serialize:function(){return v.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?v.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||an.test(this.nodeName)||un.test(this.type))}).map(function(e,t){var n=v(this).val();return n==null?null:v.isArray(n)?v.map(n,function(e,n){return{name:t.name,value:e.replace(on,"\r\n")}}):{name:t.name,value:n.replace(on,"\r\n")}}).get()}}),v.param=function(e,n){var r,i=[],s=function(e,t){t=v.isFunction(t)?t():t==null?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};n===t&&(n=v.ajaxSettings&&v.ajaxSettings.traditional);if(v.isArray(e)||e.jquery&&!v.isPlainObject(e))v.each(e,function(){s(this.name,this.value)});else for(r in e)fn(r,e[r],n,s);return i.join("&").replace(rn,"+")};var ln,cn,hn=/#.*$/,pn=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,dn=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,vn=/^(?:GET|HEAD)$/,mn=/^\/\//,gn=/\?/,yn=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bn=/([?&])_=[^&]*/,wn=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,En=v.fn.load,Sn={},xn={},Tn=["*/"]+["*"];try{cn=s.href}catch(Nn){cn=i.createElement("a"),cn.href="",cn=cn.href}ln=wn.exec(cn.toLowerCase())||[],v.fn.load=function(e,n,r){if(typeof e!="string"&&En)return En.apply(this,arguments);if(!this.length)return this;var i,s,o,u=this,a=e.indexOf(" ");return a>=0&&(i=e.slice(a,e.length),e=e.slice(0,a)),v.isFunction(n)?(r=n,n=t):n&&typeof n=="object"&&(s="POST"),v.ajax({url:e,type:s,dataType:"html",data:n,complete:function(e,t){r&&u.each(r,o||[e.responseText,t,e])}}).done(function(e){o=arguments,u.html(i?v("<div>").append(e.replace(yn,"")).find(i):e)}),this},v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,t){v.fn[t]=function(e){return this.on(t,e)}}),v.each(["get","post"],function(e,n){v[n]=function(e,r,i,s){return v.isFunction(r)&&(s=s||i,i=r,r=t),v.ajax({type:n,url:e,data:r,success:i,dataType:s})}}),v.extend({getScript:function(e,n){return v.get(e,t,n,"script")},getJSON:function(e,t,n){return v.get(e,t,n,"json")},ajaxSetup:function(e,t){return t?Ln(e,v.ajaxSettings):(t=e,e=v.ajaxSettings),Ln(e,t),e},ajaxSettings:{url:cn,isLocal:dn.test(ln[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":Tn},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":v.parseJSON,"text xml":v.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:Cn(Sn),ajaxTransport:Cn(xn),ajax:function(e,n){function T(e,n,s,a){var l,y,b,w,S,T=n;if(E===2)return;E=2,u&&clearTimeout(u),o=t,i=a||"",x.readyState=e>0?4:0,s&&(w=An(c,x,s));if(e>=200&&e<300||e===304)c.ifModified&&(S=x.getResponseHeader("Last-Modified"),S&&(v.lastModified[r]=S),S=x.getResponseHeader("Etag"),S&&(v.etag[r]=S)),e===304?(T="notmodified",l=!0):(l=On(c,w),T=l.state,y=l.data,b=l.error,l=!b);else{b=T;if(!T||e)T="error",e<0&&(e=0)}x.status=e,x.statusText=(n||T)+"",l?d.resolveWith(h,[y,T,x]):d.rejectWith(h,[x,T,b]),x.statusCode(g),g=t,f&&p.trigger("ajax"+(l?"Success":"Error"),[x,c,l?y:b]),m.fireWith(h,[x,T]),f&&(p.trigger("ajaxComplete",[x,c]),--v.active||v.event.trigger("ajaxStop"))}typeof e=="object"&&(n=e,e=t),n=n||{};var r,i,s,o,u,a,f,l,c=v.ajaxSetup({},n),h=c.context||c,p=h!==c&&(h.nodeType||h instanceof v)?v(h):v.event,d=v.Deferred(),m=v.Callbacks("once memory"),g=c.statusCode||{},b={},w={},E=0,S="canceled",x={readyState:0,setRequestHeader:function(e,t){if(!E){var n=e.toLowerCase();e=w[n]=w[n]||e,b[e]=t}return this},getAllResponseHeaders:function(){return E===2?i:null},getResponseHeader:function(e){var n;if(E===2){if(!s){s={};while(n=pn.exec(i))s[n[1].toLowerCase()]=n[2]}n=s[e.toLowerCase()]}return n===t?null:n},overrideMimeType:function(e){return E||(c.mimeType=e),this},abort:function(e){return e=e||S,o&&o.abort(e),T(0,e),this}};d.promise(x),x.success=x.done,x.error=x.fail,x.complete=m.add,x.statusCode=function(e){if(e){var t;if(E<2)for(t in e)g[t]=[g[t],e[t]];else t=e[x.status],x.always(t)}return this},c.url=((e||c.url)+"").replace(hn,"").replace(mn,ln[1]+"//"),c.dataTypes=v.trim(c.dataType||"*").toLowerCase().split(y),c.crossDomain==null&&(a=wn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ln[1]&&a[2]===ln[2]&&(a[3]||(a[1]==="http:"?80:443))==(ln[3]||(ln[1]==="http:"?80:443)))),c.data&&c.processData&&typeof c.data!="string"&&(c.data=v.param(c.data,c.traditional)),kn(Sn,c,n,x);if(E===2)return x;f=c.global,c.type=c.type.toUpperCase(),c.hasContent=!vn.test(c.type),f&&v.active++===0&&v.event.trigger("ajaxStart");if(!c.hasContent){c.data&&(c.url+=(gn.test(c.url)?"&":"?")+c.data,delete c.data),r=c.url;if(c.cache===!1){var N=v.now(),C=c.url.replace(bn,"$1_="+N);c.url=C+(C===c.url?(gn.test(c.url)?"&":"?")+"_="+N:"")}}(c.data&&c.hasContent&&c.contentType!==!1||n.contentType)&&x.setRequestHeader("Content-Type",c.contentType),c.ifModified&&(r=r||c.url,v.lastModified[r]&&x.setRequestHeader("If-Modified-Since",v.lastModified[r]),v.etag[r]&&x.setRequestHeader("If-None-Match",v.etag[r])),x.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+(c.dataTypes[0]!=="*"?", "+Tn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)x.setRequestHeader(l,c.headers[l]);if(!c.beforeSend||c.beforeSend.call(h,x,c)!==!1&&E!==2){S="abort";for(l in{success:1,error:1,complete:1})x[l](c[l]);o=kn(xn,c,n,x);if(!o)T(-1,"No Transport");else{x.readyState=1,f&&p.trigger("ajaxSend",[x,c]),c.async&&c.timeout>0&&(u=setTimeout(function(){x.abort("timeout")},c.timeout));try{E=1,o.send(b,T)}catch(k){if(!(E<2))throw k;T(-1,k)}}return x}return x.abort()},active:0,lastModified:{},etag:{}});var Mn=[],_n=/\?/,Dn=/(=)\?(?=&|$)|\?\?/,Pn=v.now();v.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Mn.pop()||v.expando+"_"+Pn++;return this[e]=!0,e}}),v.ajaxPrefilter("json jsonp",function(n,r,i){var s,o,u,a=n.data,f=n.url,l=n.jsonp!==!1,c=l&&Dn.test(f),h=l&&!c&&typeof a=="string"&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Dn.test(a);if(n.dataTypes[0]==="jsonp"||c||h)return s=n.jsonpCallback=v.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,o=e[s],c?n.url=f.replace(Dn,"$1"+s):h?n.data=a.replace(Dn,"$1"+s):l&&(n.url+=(_n.test(f)?"&":"?")+n.jsonp+"="+s),n.converters["script json"]=function(){return u||v.error(s+" was not called"),u[0]},n.dataTypes[0]="json",e[s]=function(){u=arguments},i.always(function(){e[s]=o,n[s]&&(n.jsonpCallback=r.jsonpCallback,Mn.push(s)),u&&v.isFunction(o)&&o(u[0]),u=o=t}),"script"}),v.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){return v.globalEval(e),e}}}),v.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),v.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=i.head||i.getElementsByTagName("head")[0]||i.documentElement;return{send:function(s,o){n=i.createElement("script"),n.async="async",e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,i){if(i||!n.readyState||/loaded|complete/.test(n.readyState))n.onload=n.onreadystatechange=null,r&&n.parentNode&&r.removeChild(n),n=t,i||o(200,"success")},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(0,1)}}}});var Hn,Bn=e.ActiveXObject?function(){for(var e in Hn)Hn[e](0,1)}:!1,jn=0;v.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&Fn()||In()}:Fn,function(e){v.extend(v.support,{ajax:!!e,cors:!!e&&"withCredentials"in e})}(v.ajaxSettings.xhr()),v.support.ajax&&v.ajaxTransport(function(n){if(!n.crossDomain||v.support.cors){var r;return{send:function(i,s){var o,u,a=n.xhr();n.username?a.open(n.type,n.url,n.async,n.username,n.password):a.open(n.type,n.url,n.async);if(n.xhrFields)for(u in n.xhrFields)a[u]=n.xhrFields[u];n.mimeType&&a.overrideMimeType&&a.overrideMimeType(n.mimeType),!n.crossDomain&&!i["X-Requested-With"]&&(i["X-Requested-With"]="XMLHttpRequest");try{for(u in i)a.setRequestHeader(u,i[u])}catch(f){}a.send(n.hasContent&&n.data||null),r=function(e,i){var u,f,l,c,h;try{if(r&&(i||a.readyState===4)){r=t,o&&(a.onreadystatechange=v.noop,Bn&&delete Hn[o]);if(i)a.readyState!==4&&a.abort();else{u=a.status,l=a.getAllResponseHeaders(),c={},h=a.responseXML,h&&h.documentElement&&(c.xml=h);try{c.text=a.responseText}catch(p){}try{f=a.statusText}catch(p){f=""}!u&&n.isLocal&&!n.crossDomain?u=c.text?200:404:u===1223&&(u=204)}}}catch(d){i||s(-1,d)}c&&s(u,f,c,l)},n.async?a.readyState===4?setTimeout(r,0):(o=++jn,Bn&&(Hn||(Hn={},v(e).unload(Bn)),Hn[o]=r),a.onreadystatechange=r):r()},abort:function(){r&&r(0,1)}}}});var qn,Rn,Un=/^(?:toggle|show|hide)$/,zn=new RegExp("^(?:([-+])=|)("+m+")([a-z%]*)$","i"),Wn=/queueHooks$/,Xn=[Gn],Vn={"*":[function(e,t){var n,r,i=this.createTween(e,t),s=zn.exec(t),o=i.cur(),u=+o||0,a=1,f=20;if(s){n=+s[2],r=s[3]||(v.cssNumber[e]?"":"px");if(r!=="px"&&u){u=v.css(i.elem,e,!0)||n||1;do a=a||".5",u/=a,v.style(i.elem,e,u+r);while(a!==(a=i.cur()/o)&&a!==1&&--f)}i.unit=r,i.start=u,i.end=s[1]?u+(s[1]+1)*n:n}return i}]};v.Animation=v.extend(Kn,{tweener:function(e,t){v.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;r<i;r++)n=e[r],Vn[n]=Vn[n]||[],Vn[n].unshift(t)},prefilter:function(e,t){t?Xn.unshift(e):Xn.push(e)}}),v.Tween=Yn,Yn.prototype={constructor:Yn,init:function(e,t,n,r,i,s){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=s||(v.cssNumber[n]?"":"px")},cur:function(){var e=Yn.propHooks[this.prop];return e&&e.get?e.get(this):Yn.propHooks._default.get(this)},run:function(e){var t,n=Yn.propHooks[this.prop];return this.options.duration?this.pos=t=v.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Yn.propHooks._default.set(this),this}},Yn.prototype.init.prototype=Yn.prototype,Yn.propHooks={_default:{get:function(e){var t;return e.elem[e.prop]==null||!!e.elem.style&&e.elem.style[e.prop]!=null?(t=v.css(e.elem,e.prop,!1,""),!t||t==="auto"?0:t):e.elem[e.prop]},set:function(e){v.fx.step[e.prop]?v.fx.step[e.prop](e):e.elem.style&&(e.elem.style[v.cssProps[e.prop]]!=null||v.cssHooks[e.prop])?v.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Yn.propHooks.scrollTop=Yn.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},v.each(["toggle","show","hide"],function(e,t){var n=v.fn[t];v.fn[t]=function(r,i,s){return r==null||typeof r=="boolean"||!e&&v.isFunction(r)&&v.isFunction(i)?n.apply(this,arguments):this.animate(Zn(t,!0),r,i,s)}}),v.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Gt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=v.isEmptyObject(e),s=v.speed(t,n,r),o=function(){var t=Kn(this,v.extend({},e),s);i&&t.stop(!0)};return i||s.queue===!1?this.each(o):this.queue(s.queue,o)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return typeof e!="string"&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=e!=null&&e+"queueHooks",s=v.timers,o=v._data(this);if(n)o[n]&&o[n].stop&&i(o[n]);else for(n in o)o[n]&&o[n].stop&&Wn.test(n)&&i(o[n]);for(n=s.length;n--;)s[n].elem===this&&(e==null||s[n].queue===e)&&(s[n].anim.stop(r),t=!1,s.splice(n,1));(t||!r)&&v.dequeue(this,e)})}}),v.each({slideDown:Zn("show"),slideUp:Zn("hide"),slideToggle:Zn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){v.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),v.speed=function(e,t,n){var r=e&&typeof e=="object"?v.extend({},e):{complete:n||!n&&t||v.isFunction(e)&&e,duration:e,easing:n&&t||t&&!v.isFunction(t)&&t};r.duration=v.fx.off?0:typeof r.duration=="number"?r.duration:r.duration in v.fx.speeds?v.fx.speeds[r.duration]:v.fx.speeds._default;if(r.queue==null||r.queue===!0)r.queue="fx";return r.old=r.complete,r.complete=function(){v.isFunction(r.old)&&r.old.call(this),r.queue&&v.dequeue(this,r.queue)},r},v.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},v.timers=[],v.fx=Yn.prototype.init,v.fx.tick=function(){var e,n=v.timers,r=0;qn=v.now();for(;r<n.length;r++)e=n[r],!e()&&n[r]===e&&n.splice(r--,1);n.length||v.fx.stop(),qn=t},v.fx.timer=function(e){e()&&v.timers.push(e)&&!Rn&&(Rn=setInterval(v.fx.tick,v.fx.interval))},v.fx.interval=13,v.fx.stop=function(){clearInterval(Rn),Rn=null},v.fx.speeds={slow:600,fast:200,_default:400},v.fx.step={},v.expr&&v.expr.filters&&(v.expr.filters.animated=function(e){return v.grep(v.timers,function(t){return e===t.elem}).length});var er=/^(?:body|html)$/i;v.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){v.offset.setOffset(this,e,t)});var n,r,i,s,o,u,a,f={top:0,left:0},l=this[0],c=l&&l.ownerDocument;if(!c)return;return(r=c.body)===l?v.offset.bodyOffset(l):(n=c.documentElement,v.contains(n,l)?(typeof l.getBoundingClientRect!="undefined"&&(f=l.getBoundingClientRect()),i=tr(c),s=n.clientTop||r.clientTop||0,o=n.clientLeft||r.clientLeft||0,u=i.pageYOffset||n.scrollTop,a=i.pageXOffset||n.scrollLeft,{top:f.top+u-s,left:f.left+a-o}):f)},v.offset={bodyOffset:function(e){var t=e.offsetTop,n=e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset&&(t+=parseFloat(v.css(e,"marginTop"))||0,n+=parseFloat(v.css(e,"marginLeft"))||0),{top:t,left:n}},setOffset:function(e,t,n){var r=v.css(e,"position");r==="static"&&(e.style.position="relative");var i=v(e),s=i.offset(),o=v.css(e,"top"),u=v.css(e,"left"),a=(r==="absolute"||r==="fixed")&&v.inArray("auto",[o,u])>-1,f={},l={},c,h;a?(l=i.position(),c=l.top,h=l.left):(c=parseFloat(o)||0,h=parseFloat(u)||0),v.isFunction(t)&&(t=t.call(e,n,s)),t.top!=null&&(f.top=t.top-s.top+c),t.left!=null&&(f.left=t.left-s.left+h),"using"in t?t.using.call(e,f):i.css(f)}},v.fn.extend({position:function(){if(!this[0])return;var e=this[0],t=this.offsetParent(),n=this.offset(),r=er.test(t[0].nodeName)?{top:0,left:0}:t.offset();return n.top-=parseFloat(v.css(e,"marginTop"))||0,n.left-=parseFloat(v.css(e,"marginLeft"))||0,r.top+=parseFloat(v.css(t[0],"borderTopWidth"))||0,r.left+=parseFloat(v.css(t[0],"borderLeftWidth"))||0,{top:n.top-r.top,left:n.left-r.left}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||i.body;while(e&&!er.test(e.nodeName)&&v.css(e,"position")==="static")e=e.offsetParent;return e||i.body})}}),v.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);v.fn[e]=function(i){return v.access(this,function(e,i,s){var o=tr(e);if(s===t)return o?n in o?o[n]:o.document.documentElement[i]:e[i];o?o.scrollTo(r?v(o).scrollLeft():s,r?s:v(o).scrollTop()):e[i]=s},e,i,arguments.length,null)}}),v.each({Height:"height",Width:"width"},function(e,n){v.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){v.fn[i]=function(i,s){var o=arguments.length&&(r||typeof i!="boolean"),u=r||(i===!0||s===!0?"margin":"border");return v.access(this,function(n,r,i){var s;return v.isWindow(n)?n.document.documentElement["client"+e]:n.nodeType===9?(s=n.documentElement,Math.max(n.body["scroll"+e],s["scroll"+e],n.body["offset"+e],s["offset"+e],s["client"+e])):i===t?v.css(n,r,i,u):v.style(n,r,i,u)},n,o?i:t,o,null)}})}),e.jQuery=e.$=v,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return v})})(window);

(function(a) {
    a.fn.extend({
        autocomplete: function(b, c) {
            var d = typeof b == "string";
            c = a.extend({},
            a.Autocompleter.defaults, {
                url: d ? b: null,
                data: d ? null: b,
                delay: d ? a.Autocompleter.defaults.delay: 10,
                max: c && !c.scroll ? 10 : 150
            },
            c);
            c.highlight = c.highlight ||
            function(e) {
                return e
            };
            c.formatMatch = c.formatMatch || c.formatItem;
            return this.each(function() {
                new a.Autocompleter(this, c)
            })
        },
        result: function(b) {
            return this.bind("result", b)
        },
        search: function(b) {
            return this.trigger("search", [b])
        },
        flushCache: function() {
            return this.trigger("flushCache")
        },
        setOptions: function(b) {
            return this.trigger("setOptions", [b])
        },
        unautocomplete: function() {
            return this.trigger("unautocomplete")
        }
    });
    a.Autocompleter = function(l, g) {
        var c = {
            UP: 38,
            DOWN: 40,
            DEL: 46,
            TAB: 9,
            RETURN: 13,
            ESC: 27,
            COMMA: 188,
            PAGEUP: 33,
            PAGEDOWN: 34,
            BACKSPACE: 8,
            SPACE: 32
        };
        var b = a(l).attr("autocomplete", "off").addClass(g.inputClass);
        var j;
        var p = "";
        var m = a.Autocompleter.Cache(g);
        var e = 0;
        var u;
        var x = {
            mouseDownOnSelect: false
        };
        var r = a.Autocompleter.Select(g, l, d, x);
        var w;
        a.browser.opera && a(l.form).bind("submit.autocomplete",
        function() {
            if (w) {
                w = false;
                return false
            }
        });
        b.bind((a.browser.opera ? "keypress": "keyup") + ".autocomplete",
        function(y) {
            e = 1;
            u = y.keyCode;
            switch (y.keyCode) {
            case c.UP:
                y.preventDefault();
                if (r.visible()) {
                    r.prev();
                    var z = r.hadselect().result.replace('<span class="cubane_hilight">', "");
                    z = z.replace("</span>", "");
                    b.val(z)
                } else {
                    t(0, true)
                }
                break;
            case c.DOWN:
                y.preventDefault();
                if (r.visible()) {
                    r.next();
                    var z = r.hadselect().result.replace('<span class="cubane_hilight">', "");
                    z = z.replace("</span>", "");
                    b.val(z)
                } else {
                    t(0, true)
                }
                break;
            case c.PAGEUP:
                y.preventDefault();
                if (r.visible()) {
                    r.pageUp()
                } else {
                    t(0, true)
                }
                break;
            case c.PAGEDOWN:
                y.preventDefault();
                if (r.visible()) {
                    r.pageDown()
                } else {
                    t(0, true)
                }
                break;
            case g.multiple && a.trim(g.multipleSeparator) == "," && c.COMMA: case c.TAB:
            case c.RETURN:
                if (d()) {
                    y.preventDefault();
                    w = true;
                    return false
                }
                break;
            case c.ESC:
                r.hide();
                break;
            default:
                clearTimeout(j);
                j = setTimeout(t, g.delay);
                break
            }
        }).focus(function() {
            e++;
            t(0, true)
        }).blur(function() {
            e = 0;
            if (!x.mouseDownOnSelect) {
                s()
            }
        }).click(function() {
            if (e++>1 && !r.visible()) {
                t(0, true)
            }
        }).bind("search",
        function() {
            var y = (arguments.length > 1) ? arguments[1] : null;
            function z(D, C) {
                var A;
                if (C && C.length) {
                    for (var B = 0; B < C.length; B++) {
                        if (C[B].result.toLowerCase() == D.toLowerCase()) {
                            A = C[B];
                            break
                        }
                    }
                }
                if (typeof y == "function") {
                    y(A)
                } else {
                    b.trigger("result", A && [A.data, A.value])
                }
            }
            a.each(h(b.val()),
            function(A, B) {
                f(B, z, z)
            })
        }).bind("flushCache",
        function() {
            m.flush()
        }).bind("setOptions",
        function() {
            a.extend(g, arguments[1]);
            if ("data" in arguments[1]) {
                m.populate()
            }
        }).bind("unautocomplete",
        function() {
            r.unbind();
            b.unbind();
            a(l.form).unbind(".autocomplete")
        });
        function d() {
            var B = r.selected();
            if (!B) {
                return false
            }
            var y = B.result;
            p = y;
            if (g.multiple) {
                var E = h(b.val());
                if (E.length > 1) {
                    var A = g.multipleSeparator.length;
                    var D = a(l).selection().start;
                    var C, z = 0;
                    a.each(E,
                    function(F, G) {
                        z += G.length;
                        if (D <= z) {
                            C = F;
                            return false
                        }
                        z += A
                    });
                    E[C] = y;
                    y = E.join(g.multipleSeparator)
                }
                y += g.multipleSeparator
            }
            b.val(y);
            v();
            b.trigger("result", [B.data, B.value]);
            return true
        }
        function t(A, z) {
            if (u == c.DEL) {
                r.hide();
                return
            }
            var y = b.val();
            if (g.defaultKeywords == y) {
                y = ""
            }
            if (!z && y == p) {
                return
            }
            p = y;
            y = i(y);
            if (y.length >= g.minChars) {
                if (!g.matchCase) {
                    y = y.toLowerCase()
                }
                f(y, k, v)
            } else {
                n();
                r.hide()
            }
        }
        function h(y) {
            if (!y) {
                return [""]
            }
            if (!g.multiple) {
                return [a.trim(y)]
            }
            return a.map(y.split(g.multipleSeparator),
            function(z) {
                return a.trim(y).length ? a.trim(z) : null
            })
        }
        function i(y) {
            if (!g.multiple) {
                return y
            }
            var A = h(y);
            if (A.length == 1) {
                return A[0]
            }
            var z = a(l).selection().start;
            if (z == y.length) {
                A = h(y)
            } else {
                A = h(y.replace(y.substring(z), ""))
            }
            return A[A.length - 1]
        }
        function q(y, z) {
            if (g.autoFill && (i(b.val()).toLowerCase() == y.toLowerCase()) && u != c.BACKSPACE) {
                b.val(b.val() + z.substring(i(p).length));
                a(l).selection(p.length, p.length + z.length)
            }
        }
        function s() {
            clearTimeout(j);
            j = setTimeout(v, 200)
        }
        function v() {
            var y = r.visible();
            r.hide();
            clearTimeout(j);
            n();
            if (g.mustMatch) {
                b.search(function(z) {
                    if (!z) {
                        if (g.multiple) {
                            var A = h(b.val()).slice(0, -1);
                            b.val(A.join(g.multipleSeparator) + (A.length ? g.multipleSeparator: ""))
                        } else {
                            b.val("");
                            b.trigger("result", null)
                        }
                    }
                })
            }
        }
        function k(z, y) {
            if (y && y.length && e) {
                n();
                r.display(y, z);
                q(z, y[0].value);
                r.show()
            } else {
                v()
            }
        }
        function f(A, C, z) {
            if (!g.matchCase) {
                var B = m.load(A)
            }
            r.selectCancel();
            if (B && B.length) {
                C(A, B)
            } else {
                if ((typeof g.url == "string") && (g.url.length > 0)) {
                    var D = {
                        timestamp: +new Date()
                    };
                    a.each(g.extraParams,
                    function(E, F) {
                        D[E] = typeof F == "function" ? F() : F
                    });
                    var y = g.url + "&q=" + i(A) + "&limit=" + g.max + "&timestamp=" + (new Date()).getTime();
                    a.getScript(y,
                    function() {
                        if (typeof _suggestData != "undefined") {
                            var E = g.parse && g.parse(_suggestData) || o(_suggestData);
                            m.add(A, E);
                            C(A, E)
                        }
                    })
                } else {
                    r.emptyList();
                    z(A)
                }
            }
        }
        function o(B) {
            var y = [];
            var A = B.split("\n");
            for (var z = 0; z < A.length; z++) {
                var C = a.trim(A[z]);
                if (C) {
                    C = C.split("|");
                    y[y.length] = {
                        data: C,
                        value: C[0],
                        result: g.formatResult && g.formatResult(C, C[0]) || C[0]
                    }
                }
            }
            return y
        }
        function n() {
            b.removeClass(g.loadingClass)
        }
    };
    a.Autocompleter.defaults = {
        inputClass: "ac_input",
        resultsClass: "ac_results",
        loadingClass: "ac_loading",
        defaultKeywords: "",
        minChars: 1,
        delay: 400,
        matchCase: false,
        matchSubset: true,
        matchContains: false,
        cacheLength: 0,
        max: 100,
        mustMatch: false,
        extraParams: {},
        selectFirst: true,
        formatItem: function(b) {
            return b[0]
        },
        formatMatch: null,
        autoFill: false,
        width: 0,
        multiple: false,
        multipleSeparator: ", ",
        highlight: function(d, c) {
            var e = /^[\w].*$/;
            if (e.test(c)) {
                var b = d.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + c.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "g"), "<span>$1</span><b>");
                var b = b + "</b>";
                return b
            } else {
                var b = d.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + c.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<span>$1</span><b>");
                var b = b + "</b>";
                return b
            }
        },
        scroll: true,
        scrollHeight: 180
    };
    a.Autocompleter.Cache = function(c) {
        var f = {};
        var d = 0;
        function h(l, k) {
            if (!c.matchCase) {
                l = l.toLowerCase()
            }
            var j = l.indexOf(k);
            if (c.matchContains == "word") {
                j = l.toLowerCase().search("\\b" + k.toLowerCase())
            }
            if (j == -1) {
                return false
            }
            return j == 0 || c.matchContains
        }
        function g(j, i) {
            if (d > c.cacheLength) {
                b()
            }
            if (!f[j]) {
                d++
            }
            f[j] = i
        }
        function e() {
            if (!c.data) {
                return false
            }
            var k = {},
            j = 0;
            if (!c.url) {
                c.cacheLength = 1
            }
            k[""] = [];
            for (var m = 0,
            l = c.data.length; m < l; m++) {
                var p = c.data[m];
                p = (typeof p == "string") ? [p] : p;
                var o = c.formatMatch(p, m + 1, c.data.length);
                if (o === false) {
                    continue
                }
                var n = o.charAt(0).toLowerCase();
                if (!k[n]) {
                    k[n] = []
                }
                var q = {
                    value: o,
                    data: p,
                    result: c.formatResult && c.formatResult(p) || o
                };
                k[n].push(q);
                if (j++<c.max) {
                    k[""].push(q)
                }
            }
            a.each(k,
            function(r, s) {
                c.cacheLength++;
                g(r, s)
            })
        }
        setTimeout(e, 25);
        function b() {
            f = {};
            d = 0
        }
        return {
            flush: b,
            add: g,
            populate: e,
            load: function(n) {
                if (!c.cacheLength || !d) {
                    return null
                }
                if (!c.url && c.matchContains) {
                    var m = [];
                    for (var j in f) {
                        if (j.length > 0) {
                            var o = f[j];
                            a.each(o,
                            function(p, k) {
                                if (h(k.value, n)) {
                                    m.push(k)
                                }
                            })
                        }
                    }
                    return m
                } else {
                    if (f[n]) {
                        return f[n]
                    } else {
                        if (c.matchSubset) {
                            for (var l = n.length - 1; l >= c.minChars; l--) {
                                var o = f[n.substr(0, l)];
                                if (o) {
                                    var m = [];
                                    a.each(o,
                                    function(p, k) {
                                        if (h(k.value, n)) {
                                            m[m.length] = k
                                        }
                                    });
                                    return m
                                }
                            }
                        }
                    }
                }
                return null
            }
        }
    };
    a.Autocompleter.Select = function(e, j, l, p) {
        var i = {
            ACTIVE: "ac_over"
        };
        var k, f = -1,
        s, m = "",
        t = true,
        c, o;
        var r = e.layer ? e.layer: document.body;
        function n(u) {
            if (!t) {
                return
            }
            if (typeof u == "undefined") {
                u = document.body
            }
            c = a("<div/>").hide().addClass(e.resultsClass).css("position", "absolute").appendTo(u);
            o = a("<ul/>").appendTo(c).mouseover(function(v) {
                if (q(v).nodeName && q(v).nodeName.toUpperCase() == "LI") {
                    f = a("li", o).removeClass(i.ACTIVE).index(q(v));
                    a(q(v)).addClass(i.ACTIVE)
                }
            }).click(function(v) {
                a(q(v)).addClass(i.ACTIVE);
                l();
                j.focus();
                return false
            }).mousedown(function() {
                p.mouseDownOnSelect = true
            }).mouseup(function() {
                p.mouseDownOnSelect = false
            });
            if (e.width > 0) {
                c.css("width", e.width)
            }
            t = false
        }
        function q(v) {
            var u = v.target;
            while (u && u.tagName != "LI") {
                u = u.parentNode
            }
            if (!u) {
                return []
            }
            return u
        }
        function h(u) {
            k.slice(f, f + 1).removeClass(i.ACTIVE);
            g(u);
            var w = k.slice(f, f + 1).addClass(i.ACTIVE);
            if (e.scroll) {
                var v = 0;
                k.slice(0, f).each(function() {
                    v += this.offsetHeight
                });
                if ((v + w[0].offsetHeight - o.scrollTop()) > o[0].clientHeight) {
                    o.scrollTop(v + w[0].offsetHeight - o.innerHeight())
                } else {
                    if (v < o.scrollTop()) {
                        o.scrollTop(v)
                    }
                }
            }
        }
        function g(u) {
            f += u;
            if (f < 0) {
                f = k.size() - 1
            } else {
                if (f >= k.size()) {
                    f = 0
                }
            }
        }
        function b(u) {
            return e.max && e.max < u ? e.max: u
        }
        function d() {
            o.empty();
            var v = b(s.length);
            for (var w = 0; w < v; w++) {
                if (!s[w]) {
                    continue
                }
                var x = e.formatItem(s[w].data, w + 1, v, s[w].value, m);
                if (x === false) {
                    continue
                }
                var u = a("<li/>").html(e.highlight(x, m)).addClass(w % 2 == 0 ? "ac_even": "ac_odd").appendTo(o)[0];
                a.data(u, "ac_data", s[w])
            }
            k = o.find("li");
            if (e.selectFirst) {
                k.slice(0, 1).addClass(i.ACTIVE);
                f = 0
            }
            if (a.fn.bgiframe) {
                o.bgiframe()
            }
        }
        return {
            display: function(v, u) {
                n(r);
                s = v;
                m = u;
                d()
            },
            selectCancel: function() {
                f = -1
            },
            next: function() {
                h(1)
            },
            prev: function() {
                h( - 1)
            },
            pageUp: function() {
                if (f != 0 && f - 8 < 0) {
                    h( - f)
                } else {
                    h( - 8)
                }
            },
            pageDown: function() {
                if (f != k.size() - 1 && f + 8 > k.size()) {
                    h(k.size() - 1 - f)
                } else {
                    h(8)
                }
            },
            hide: function() {
                c && c.hide();
                k && k.removeClass(i.ACTIVE);
                f = -1
            },
            visible: function() {
                return c && c.is(":visible")
            },
            current: function() {
                return this.visible() && (k.filter("." + i.ACTIVE)[0] || e.selectFirst && k[0])
            },
            show: function() {
                var w = a(j).offset();
                c.css({
                    width: typeof e.width == "string" || e.width > 0 ? e.width: a(j).width(),
                    top: w.top + j.offsetHeight,
                    left: w.left
                }).show();
                if (e.scroll) {
                    o.scrollTop(0);
                    o.css({
                        maxHeight: e.scrollHeight,
                        overflow: "auto"
                    });
                    if (a.browser.msie && typeof document.body.style.maxHeight === "undefined") {
                        var u = 0;
                        k.each(function() {
                            u += this.offsetHeight
                        });
                        var v = u > e.scrollHeight;
                        o.css("height", v ? e.scrollHeight: u);
                        if (!v) {
                            k.width(o.width() - parseInt(k.css("padding-left")) - parseInt(k.css("padding-right")))
                        }
                    }
                }
            },
            selected: function() {
                var u = k && k.filter("." + i.ACTIVE).removeClass(i.ACTIVE);
                return u && u.length && a.data(u[0], "ac_data")
            },
            hadselect: function() {
                var u = k && k.filter("." + i.ACTIVE);
                return u && u.length && a.data(u[0], "ac_data")
            },
            emptyList: function() {
                o && o.empty()
            },
            unbind: function() {
                c && c.remove()
            }
        }
    };
    a.fn.selection = function(i, b) {
        if (i !== undefined) {
            return this.each(function() {
                if (this.createTextRange) {
                    var j = this.createTextRange();
                    if (b === undefined || i == b) {
                        j.move("character", i);
                        j.select()
                    } else {
                        j.collapse(true);
                        j.moveStart("character", i);
                        j.moveEnd("character", b);
                        j.select()
                    }
                } else {
                    if (this.setSelectionRange) {
                        this.setSelectionRange(i, b)
                    } else {
                        if (this.selectionStart) {
                            this.selectionStart = i;
                            this.selectionEnd = b
                        }
                    }
                }
            })
        }
        var g = this[0];
        if (g.createTextRange) {
            var c = document.selection.createRange(),
            h = g.value,
            f = "<->",
            d = c.text.length;
            c.text = f;
            var e = g.value.indexOf(f);
            g.value = h;
            this.selection(e, e + d);
            return {
                start: e,
                end: e + d
            }
        } else {
            if (g.selectionStart !== undefined) {
                return {
                    start: g.selectionStart,
                    end: g.selectionEnd
                }
            }
        }
    }
})(jQuery);

/******** 閲嶅啓2017-03-23 ********/
var reW=(function(){
	return{
		includeFile:function(sId,src){
	        if(typeof(src)!='undefined'){
		    	//console.log(sId+"ol_js");
		    	//<sc'+'ript type="text/javascript" id="adstat_js" src="http://stat.cnmo.com/ol_cnmo.js"></scr'+'ipt>'
		        var oBody=document.getElementsByTagName('body').item(0);
		        var oDom=document.createElement("script");
		        oDom.language="javascript";
		        oDom.type="text/javascript";
	        	oDom.id=sId;
	        	oDom.src=src;
		        oBody.appendChild(oDom);
		        console.log(oBody+'--xx--'+oDom.innerHTML);
	        }
	        else if(typeof(src)=='undefined'&&(sId.indexOf('.js')>-1||sId.indexOf('.php')>-1)){
		        var oBody=document.getElementsByTagName('body').item(0);
		        var oDom=document.createElement("script");
		        oDom.language="javascript";
		        oDom.type="text/javascript";
		        oDom.src=sId;
		        oBody.appendChild(oDom);
	        }
		    else if(sId.indexOf('<iframe')>-1){
				var sRc=sId.split('src="')[1].split(' allowtransparency')[0];
				console.log('\n\n'+sRc+'-iframe--sRc==>\n');
				//<iframe width=1 height=0 src="' + a + '" allowtransparency align="center,center" marginwidth=0 marginheight=0 scrolling=no frameborder=0></iframe>
				var oBody=document.getElementsByTagName('body').item(0);
				var oDom=document.createElement("iframe");
				oDom.setAttribute('width',1);
				oDom.setAttribute('height',0);
				oDom.setAttribute('marginwidth',0);
				oDom.setAttribute('marginheight',0);
				oDom.setAttribute('scrolling','no');
				oDom.setAttribute('frameborder',0);
				oDom.src=sRc;
				oBody.appendChild(oDom);
		    }
		    else{
		    	$("body").append(sId);
		    }
		},
		rewrite:function(str){
			if(str.indexOf('<script')>-1){
				if(str.indexOf('id=')>-1){
					var sId=str.split('id="')[1].split('" src')[0];
					var sRc=str.split('src="')[1].split('">')[0];
					reW.includeFile(sId,sRc);
				}
				else{
					var sRc=str.split('src="')[1].split('">')[0];
					console.log(sRc);
					reW.includeFile(sRc);
				}
			}
			else if(str.indexOf('<iframe')>-1){
				reW.includeFile(str);
			}
			else{
				$("body").append(str);
			}
			//console.log(str+"--test--");
		}
	}
})();
//  articleBase.js
//  pc文章最终页 基础js
//  Created by yangcongwei on 2017-02-15.
//  Copyright 2017 yangcongwei. All rights reserved.
// 

//公共变量
//var cwPubVar;//全局变量
//
//var cwSpeFn;//页面单独方法
//此处添加分享具体设置
//window._bd_share_config={
//	"common":{"bdSnsKey":{'tsina':'1387762139','tqq':''},
//	"bdText":"",
//	"bdPic":$('body').attr('sharedata'),
//	"bdStyle":"0",
//	"bdSize":"16"},
//	"share":{}
//};
window._bd_share_config={
	"common":{"bdSnsKey":{'tsina':'1387762139','tqq':''},
	"bdText":"",
	"bdMini":"2",
	"bdPic":$('body').attr('sharedata'),
	"bdStyle":"0",
	"bdSize":"16"},
	"share":{}
	};
//以下为js加载部分
var script=document.createElement("script");
script.type="text/javascript";
//http://192.168.180.200/xfile/www/static/api/js/share.js
script.src='//statict.cnmo.com/origin/libs/static/api/js/share.js?cdnversion=102'+~(-new Date()/36e5);
document.getElementsByTagName("head")[0].appendChild(script);
//document.getElementsByTagName('head')[0].appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=11'+~(-new Date()/36e5);


/********* 分页数据源 *********/
if(document.getElementsByTagName('body')[0].getAttribute('pageData')!=null){
	var _pageData=document.getElementsByTagName('body')[0].getAttribute('pageData');
	var _pageSplit=_pageData.split('---');
	//分页用
	pageRwp={
		"now" :_pageSplit[0],
		"href":_pageSplit[1].split(','),//所有页链接
		"next":_pageSplit[2],
		"prevL":_pageSplit[3],//上一页链接
		"nextL":_pageSplit[4]//下一页链接
	};
}

var cwPubVar = {
	wHeight :$(window).height(),
	wScroll :0,//页面滚动高度
	//文章点赞人数
	textZan :0,
	
	cHotHeight:$('#chot').height(),//火热围观高度
	cRightHeight:$('#cright').height()+$('#cright').offset().top,//右侧高度
	cLeftHeight:$('#cleft').height()+$('#cleft').offset().top-10//左侧高度
};
window.cwPubVar=cwPubVar;

//页面单独方法
var cwSpeFn = {
	//返回顶部显示隐藏
	topHave:function(callback){
		var scroll = $(window).scrollTop();
		cwPubVar.wScroll = scroll;
		//返回顶部
		if (scroll > cwPubVar.wHeight){        	
            $('#fixedRight').find('.c_top').show();
        }else{        	
            $('#fixedRight').find('.c_top').hide();
        }
        //右侧吸顶
        if(scroll > cwPubVar.cRightHeight-60){
        	$('#chot').addClass('chot_fixed');
        	$('#chot').next('.chot_box').show();
        	//如果到底部，处理
//      	var chotT = scroll + cwPubVar.cHotHeight;
	        if(scroll+cwPubVar.cHotHeight+50 > cwPubVar.cLeftHeight){
	        	$('#chot').css('top',50-(scroll+cwPubVar.cHotHeight+50 - cwPubVar.cLeftHeight));
	        }else{
	        	$('#chot').css('top',50);
	        }
        }else{
        	$('#chot').removeClass('chot_fixed');
        	$('#chot').next('.chot_box').hide();
        }
        
        callback&&callback();
	},
	//选中状态更改
	hasClass:function(that,tag,name,callback){
		//this，标签名，class名
		if(!that.hasClass(name)){
			that.parent().find(tag).removeClass(name);
			that.addClass(name);
		}
		callback&&callback();
	},
	//文章上下翻页
	imgCutKey:function(){
	    $(document).on('keydown',function(e){
			switch (e.keyCode) {
				case 37:
					if(e.target.localName!='body'){
						return;
					}
					e.preventDefault();
					if(pageRwp.prevL==''||pageRwp.prevL==0){
						alert('已经是第一页了');
						break;
					}
	    			location.href = pageRwp.prevL;
					break;
				case 39:
					if(e.target.localName!='body'){
						return;
					}
					e.preventDefault();
					if(pageRwp.nextL==''||pageRwp.nextL==0){
						alert('已经是最后一页了');
						break;
					}
	 				location.href = pageRwp.nextL;
				    break;
			};
		});
    },
  	showImg: function(obj, callback) { //图片懒加载(范围)		
		if (!obj) return;
		cwPubVar.wScroll = $(window).scrollTop();
		var wLIimgH=$('.cselect_con').eq(0).height();
		showImg1();
		$(window).off('scroll', showImg1);
		$(window).on('scroll', showImg1);

		function showImg1() {
			$(obj).find('img').each(function() { //遍历所有图片	
				
				var othis = $(this); //当前图片对象
//				var	top = othis.offset().top - cwPubVar.wScroll; //计算图片top - 滚动条top
				var offsTop = $(this).offset().top; //当前图片距页面顶部距离
				var tHeight = $(this).height(); //当前图片高度

				var wBottom = cwPubVar.wScroll + cwPubVar.wHeight; //页面可视区底部
				var wTop = offsTop + tHeight; //当前图片底距顶部高度
				if (wBottom >= offsTop && wTop >= cwPubVar.wScroll) { //如果该图片不在可视区可见
					othis.attr('src', othis.attr('data_src')).removeAttr('data_src'); //可见的时候把占位值替换 并删除占位属性	           
					showImgError(othis);
				}
				showImgT(othis);
			});
		};
		callback&&callback();
		
		/*图赏部分图片处理*/
		function showImgT(that){
			if(that.parent().parent().hasClass('cselect_con1')){
				that.on('load',function(){
					var _this=$(this);
					if(_this.height()<wLIimgH){
						_this.css({'height':'100%','width':'auto'});
					}
				});
			}	
		}
		/*图片加载失败*/
		function showImgError(that){
			that.error(function(){
				if(that.attr('err_src')){
					that.attr('src', that.attr('err_src')).removeAttr('err_src');
				}
			});
		}
	},
	//分页
	pagingC: function(box,json,num,callback) {
		/*json
		*"now" : 0,//当前页
		*"href":["###","###","###","###"],//所有页链接
		*"prev":"xxxx",//上一页名称
		*"next": "拍照体验自然锐利锐利",//下一页名称
		*"prevL":"###",//上一页链接
		*"nextL":"###",//下一页链接
		* num:显示页数
		*/
		if(!box) return;
		
//		//键盘翻页
//		cwSpeFn.imgCutKey();
		var nowPage = json.now || 0,//当前页
			allHref = json.href,
			prevName= json.prev || "上一页",//上一页名称
			nextName= json.next || "下一页",//下一页名称
			prevL   = json.prevL|| "",//上一页链接
			nextL   = json.nextL|| "";//下一页链接
		
		
		
		var count = allHref.length;//分页总页数
		var start =0,length=count;
		var str = "";
		if(count<=5){
			num = 5;
		}
		
		if(count > num){
			length = num;
			
			if(nowPage<=1){
				start = 0;
			}else if(nowPage>=count-num){
				start = count-num;
			}else{
				start = nowPage-1;
			}
		}
		
		
		// 上一页
		if(nowPage==0){
			str+='<span class="prevpage cbbb">'+ prevName +'</span>';
		}else{
			str+='<a class="prevpage" href="'+ prevL +'" target="_self" >'+ prevName +'</a>';
		}
		
		// 开始拼接 中间内容 --123...  /// ..345...///...456  ///12345
		if(start != 0){
			str+= '<span>...</span>';
		}
		
		for(var i=0;i<length;i++){
			if( (start+i) == (nowPage) ){
				str+= '<b class="nowpage">'+ (start+i+1) +'</b>';
			}else{
				str+= '<a href='+allHref[start+i]+' target="_self" >'+ (start+i+1) +'</a>';
			}
		}
		
		if(start < count-num){
			str+= '<span>...</span>';
		}
		// 拼接结束
		// 下一页
		if(nowPage < count-1){
			str+='<a class="nextpage" href="'+nextL+'" target="_self" >'+ nextName +'</a>';
		}
		
		box.html(str);
		callback&&callback;
	},
	//读取cookie
	getCookie :function(name){
	 var arr = document.cookie.split('; ');
	 for(var i = 0; i < arr.length; i++){
	  var temp = arr[i].split('=');
	  if(temp[0] == name){
	   return temp[1];
	  }
	 }
	 return '';
	}
};
window.cwSpeFn=cwSpeFn;

//调用执行函数
$(function() {
	//页面id
	 var docid= $('body').attr('docid');
	 //二维码
	 var erweiTimer=null;
	 //搜索
	 var my_array = new Array();
		//键盘翻页
		cwSpeFn.imgCutKey();
		//图片懒加载
		cwSpeFn.showImg('.c_img');
		//获取页面高度
		//window.onload =function(){
			
			cwPubVar.cHotHeight=$('#chot').height();//火热围观高度
			cwPubVar.cRightHeight=$('#cright').height()+$('#cright').offset().top;//右侧高度
			cwPubVar.cLeftHeight=$('#cleft').height()+$('#cleft').offset().top-10;//左侧高度
			//console.log(cwPubVar.cLeftHeight);
			cwSpeFn.topHave(function(){
	        	$('#chot').next('.chot_box').css('height',cwPubVar.cHotHeight+'px');
			});
			//cwSpeFn.showImg('.c_img'); 
		//};
		
		/*页面初始化读取cookie*/	
	    
	    CookiePage();
	   
	    function CookiePage(){
	    
	    	//文章点赞
//	    	var arrZdocid = cwSpeFn.getCookie('Zdocid');
	    	//循环cookie判断是否已经点过，点过的话更改自定义标识
	    	var arr = cwSpeFn.getCookie('Zdocid').split(',');
	    	
			for(var j=1;j<arr.length;j++){   				
				if(docid==arr[j]){
					$('#textZan').removeClass('ctext_zan_hover');
			    	$('#textZan').addClass('ctext_zang');
			    	$('#textZan').find('.iconfont').html('&#xe60e;');
					$('#textZan').attr('onOff','1')
				}
			}
	    }


	    /******* 添加PC资讯底部2018年度横屏专题入口 *******/
	    //$(".copyright").html('<div style="padding:20px 0px;"><a href="//topic.cnmo.com/topic/1448.html">点击查看CNMO 2018年度盛典评选专题全部内容</a></div>版权所有，未经许可不得转载')


		
		//页面滚动事件
//		cwSpeFn.topHave(function(){
//      	$('#chot').next('.chot_box').css('height',cwPubVar.cHotHeight+'px');
//		});
		
		$(window).on('scroll',function() {
	        cwSpeFn.topHave();
		});
	   
		//分页
//		if(pageRwp!='undefined'){
//			cwSpeFn.pagingC($('#cpagelink'),pageRwp,3)
//		}
			
		//吸顶应用大全滑过
		$('#nav_capp').on('mouseover',function(){
			$(this).find('.capp1').show();
		});
		$('#nav_capp').on('mouseout',function(){
			$(this).find('.capp1').hide();
		});
		//潮机范鼠标滑过列表
		$('.chao_list_list').on('mouseover','li',function(){
			cwSpeFn.hasClass($(this),'li','cur');
		});
		//鼠标点击切换
		$('#chao_cut').find('.chao_list_tit').on('mouseover','a',function(){
			var that=$(this);
			var num = $(this).index();
			cwSpeFn.hasClass(that,'a','cur',function(){
				$('.chao_list_list').hide();
				$('.chao_list_list').eq(num).show();
			});
			
		});
		$('#ckuwan').find('.chao_list_tit').on('mouseover','a',function(){
			var that=$(this);
			var num = $(this).index();
			cwSpeFn.hasClass(that,'a','cur',function(){
				$('.ckuwan_app').hide();
				$('.ckuwan_app').eq(num).show();
			});
			
		});

		
		
		//右侧点击-二维码-返回顶部-评论-
		
		$('#fixedRight').find('.c_erweima').on('mouseover',function(e){
			clearTimeout(erweiTimer);
			$(this).parent().find('.c_erweima_big').addClass('show');
		});
		$('#fixedRight').find('.c_erweima').on('mouseout',function(e){
			e.stopPropagation();
			erweiTimer = setTimeout(function(){
				$('#fixedRight').find('.c_erweima_big').removeClass('show');
			},400);
			
		});
		$('#fixedRight').find('.c_erweima_big').on('mouseover',function(e){
			clearTimeout(erweiTimer);
			$(this).addClass('show');
		});
		$('#fixedRight').find('.c_erweima_big').on('mouseout',function(e){
			erweiTimer = setTimeout(function(){
				$('#fixedRight').find('.c_erweima_big').removeClass('show');
			},400);
		});
		
		
	    $('#fixedRight .c_top').on('click',function() {
	        $('html, body').animate({scrollTop: 0}, 1000);
	    });
	    $('#fixedRight .c_comm , #comm_to').on('click',function() {
	    	var num = $('#ccom').offset().top-60;
	        $('html, body').animate({scrollTop: num}, 800);
	    });
	    
	    //关闭广告
	    $('.money_close').click(function(){
	    	$(this).parent().hide();
	    });
	    
	    //文章点赞	    
	    $('#textZan').on('click',function(){
	    	var that = $(this);
			
			
	    	if(that.attr('onOff')=='0'){
	    		that.attr('onOff','1');
	    		cwPubVar.textZan = cwPubVar.textZan+1;
		    	that.find('.ctext_jia').html(cwPubVar.textZan);
		    	that.removeClass('ctext_zan_hover');
		    	that.addClass('ctext_zang');
		    	that.find('.ctext_jia_move').addClass('ctext_jia_move1');
		    	that.find('.iconfont').html('&#xe60e;');
		    	setTimeout(function(){
		    		that.find('.ctext_jia_move').remove();
		    	},600);
	    	}else{
	    		alert('您已经点过赞了');
	    	}
	    	
	    });
	    	
		//评论区获取焦点失去焦点
		$('#ccom_textarea').on('focus',function(){
			$(this).parent().addClass('border_red');
		});
		$('#ccom_textarea').on('blur',function(){
			$(this).parent().removeClass('border_red');
		});
		//评论区域点击回复
		$('#ccomList').on('click','.ccom_body_huif',function(){
			var box = $(this).parent().parent().siblings('.chuifu_box');
			//展开评论框
			box.slideToggle('fast');
			//评论框失去焦点
			$('.chuifu_box').find('textarea').blur();
		});
		//楼层评论区滑过显示
		$('#ccomList').on('mouseover','.ccom_con_f',function(){
			$(this).find('.ccom_body_other1').show();
		});
		$('#ccomList').on('mouseout','.ccom_con_f',function(){
			if($(this).find('.chuifu_box').is(":hidden")){
				$(this).find('.ccom_body_other1').hide();
			}
		});
		//评论点赞
//		$('#ccomList .ccom_body_zan,#ccomList .ccom_body_cai').one('click',function(){
//			var that = $(this);
//			var num = parseInt(that.find('span').attr('num')); 
//			var name = that.attr('class')
//			that.find('span').html(num+1);
//			that.addClass(name+'g');
//		})
		

		
			//点击空白处
			$(document).click(function(){
//				if($(".header_search div").length){
//					$(".header_search div:last").hide();
//				}
				$('#search').find(".pull_down_list").removeClass('show');
			});
		
		
		//搜索框处理
		//搜索框点击事件
//		$('#s').on('click',function(){
//			checkOnBlur(this);
//		})
//		function checkOnBlur(obj)
//		{	  
//		//  console.log(message)    
//		    var message = $(obj).val();
//			if ('亲，快来找你感兴趣的' == message) {
//		        $(obj).val('').css('color','#333');
//		    }
//			$('#search').addClass('csearchf');
//		    //搜索框失去焦点
//		    $(obj).blur(function(){
//		        if ($(obj).val() == '' || $(obj).val() == '亲，快来找你感兴趣的') {
//		            $(obj).css('color','#bbb');
//		            $(obj).val('亲，快来找你感兴趣的');
//		        }else {
//		            $(obj).css('color','#333');
//		        }
//		        $('#search').removeClass('csearchf');
//		    });
//		}
		//点击下拉
		$('#search').find(".csearch_list").on('click',function(e){
			e.stopPropagation();
			var that = $(this);
			that.children('.pull_down_list').toggleClass('show');
		});
		
		//搜索
		saerchinit();
		function saerchinit(){
		    $('#s').autocomplete('//s.cnmo.com/se.php', {
		        width: 289,
		        delay: 150, //单位毫秒
		        matchContains: true, //包含匹配
		        scroll: false, //滚动条
		        selectFirst: false, //自动选择第一个
		        minChars:0,
		        layer:$('div.csearch_con')
		    });
		}
		//下拉按钮点击事件
		$("#search").click(function(event){
		    if ($('#Seach_xiala').is(":visible")) {
		        $("#Seach i").removeClass('hover');
		        $('#Seach_xiala').hide();
		    }else {
		        $("#Seach i").addClass('hover');
		        $('#Seach_xiala').show();
		    }
		    event.stopPropagation();
		});
		
		
		my_array['文章']='//s.cnmo.com/doc.php';
		my_array['应用']='//app.cnmo.com/index.php?c=search';
		my_array['图片']='//s.cnmo.com/pic.php';
		my_array['产品']='//product.cnmo.com/search.php';
		my_array['论坛']='//bbs.cnmo.com/search.php?mod=forum';
		my_array['综合']='//s.cnmo.com/se.php';
		
		searchCLICK($('#search').find(".pull_down_list").find('a.cRed'))
		$('#search').find(".pull_down_list").on('click','a',function(){
			var that = $(this);
			//处理样式
		    var temp = that.html();
		    if(that.hasClass('cRed')) return;
		    
			//处理form链接
		    if(temp=='产品'){
		        $('#s').unbind();
		        $('#s').autocomplete('//product.cnmo.com/page.html?c=MiniSearch&a=GetSearch', {
		            width: 289,
		            delay: 100, //单位毫秒
		            matchContains: true, //包含匹配
		            scroll: false, //滚动条
		            selectFirst: false, //自动选择第一个
		            minChars:0,
		            layer:$('div.csearch_con')
		        });
		    }else if(temp=='应用'){
		        $('#s').unbind();
		        $('#s').autocomplete('//app.cnmo.com/appSuggest.php?dataFrom=app', {
		            width: 238,
		            delay: 100, //单位毫秒
		            matchContains: true, //包含匹配
		            scroll: false, //滚动条
		            selectFirst: false, //自动选择第一个
		            minChars:0,
		            layer:$('div.csearch_con')
		        });
		    }else{
		    	 $('#s').unbind();
		    }
			
		    if(temp.indexOf("论坛")!=-1){var temp = '论坛';$('form').attr('target',"_blank");
		        $('#s').attr('name', "srchtxt");
		    } else {
		        $('#s').attr('name', "s");
		    }
		    if(temp.indexOf("产品")!=-1){var temp = '产品';$('form').attr('target',"_blank");}
		    if(temp.indexOf("文章")!=-1){var temp = '文章';$('form').attr('target',"_blank");}
		    if(temp.indexOf("图片")!=-1){var temp = '图片';$('form').attr('target',"_blank");}
		    if(temp.indexOf("视频")!=-1){var temp = '视频';$('form').attr('target',"_blank");}
		    if(temp.indexOf("应用")!=-1){var temp = '应用';$('form').attr('target',"_blank");}
		    if(temp.indexOf("综合")!=-1){var temp = '综合';$('form').attr('target',"_blank");}
		    $('#myForm').attr('action',my_array[temp]);
		    that.parent().siblings('span').html(that.html());
			that.siblings().removeClass('cRed');
			that.addClass('cRed');
			that.parent().removeClass('show');
			sClick()
		    return false;
		});	
		function searchCLICK(that){
//			var that = $(this);
			//处理样式
		    var temp = that.html();
//		    if(that.hasClass('cRed')) return;
		    
			//处理form链接
		    if(temp=='产品'){
		        $('#s').unbind();
		        $('#s').autocomplete('//product.cnmo.com/page.html?c=MiniSearch&a=GetSearch', {
		            width: 289,
		            delay: 100, //单位毫秒
		            matchContains: true, //包含匹配
		            scroll: false, //滚动条
		            selectFirst: false, //自动选择第一个
		            minChars:0,
		            layer:$('div.csearch_con')
		        });
		    }else if(temp=='应用'){
		        $('#s').unbind();
		        $('#s').autocomplete('//app.cnmo.com/appSuggest.php?dataFrom=app', {
		            width: 238,
		            delay: 100, //单位毫秒
		            matchContains: true, //包含匹配
		            scroll: false, //滚动条
		            selectFirst: false, //自动选择第一个
		            minChars:0,
		            layer:$('div.csearch_con')
		        });
		    }else{
		    	 $('#s').unbind();
		    }
			
		    if(temp.indexOf("论坛")!=-1){var temp = '论坛';$('form').attr('target',"_blank");
		        $('#s').attr('name', "srchtxt");
		    } else {
		        $('#s').attr('name', "s");
		    }
		    if(temp.indexOf("产品")!=-1){var temp = '产品';$('form').attr('target',"_blank");}
		    if(temp.indexOf("文章")!=-1){var temp = '文章';$('form').attr('target',"_blank");}
		    if(temp.indexOf("图片")!=-1){var temp = '图片';$('form').attr('target',"_blank");}
		    if(temp.indexOf("视频")!=-1){var temp = '视频';$('form').attr('target',"_blank");}
		    if(temp.indexOf("应用")!=-1){var temp = '应用';$('form').attr('target',"_blank");}
		    if(temp.indexOf("综合")!=-1){var temp = '综合';$('form').attr('target',"_blank");}
		    $('#myForm').attr('action',my_array[temp]);
		    that.parent().siblings('span').html(that.html());
			that.siblings().removeClass('cRed');
			that.addClass('cRed');
			that.parent().removeClass('show');
			sClick()
		    return false;
		}
		//搜索按钮提交
		$('#mySubmit').on('click',function(){
			var searchTxet = $.trim($("#s").val());
		    if(searchTxet=='亲，快来找你感兴趣的'||searchTxet==''){
		        alert('亲，你还没有输入要查找的内容哦！');
		        return false;
		    }else{
		        $('#myForm').submit();
		    }
		});
		//搜索框键盘事件
		$('div.csearch input').keydown(function(e){
			var searchTxet = $.trim($("#s").val());
			if(e.keyCode==13){
				if(searchTxet=='亲，快来找你感兴趣的'||searchTxet==''){
			        alert('亲，你还没有输入要查找的内容哦！');
			        return false;
			    }else{
			        $('#myForm').submit();
			    }
			}
		});
		//搜索初始化
		sClick()
		function sClick(){
			$('#s').on('focus',function(){
		    	var message = $(this).val();
		    	$('#search').addClass('csearchf');
		    	if ('亲，快来找你感兴趣的' == message) {
		    		$(this).val('').css('color','#333');
		    	}
		    });
			$('#s').on('blur',function(){
				var message = $(this).val();
		        if (message == '' || message == '亲，快来找你感兴趣的') {
		            $(this).css('color','#bbb').val('亲，快来找你感兴趣的');
		        }else {
		            $(this).css('color','#333');
		        }
		        $('#search').removeClass('csearchf');
		    });
		}
	    
	     //文章页图片加alt
	    imgAddAlt();
	    function imgAddAlt(){
	    	var doc_title = window.document.title;
			var num = doc_title.indexOf('_');
			
			if(num !=-1){
				doc_title = doc_title.substring(0,num);
			}
		    var text_img = $('.ctext').find('img');
		    
		    $.each(text_img,function(){
		    	if($(this).attr('alt')==''||!$(this).attr('alt')){
					$(this).attr('alt',doc_title);
					$(this).attr('title',doc_title);
					return;
				}
		    	if($(this).attr('title')==''||!$(this).attr('title')){
					$(this).attr('title',$(this).attr('alt'));
				}
		    });
	    }
})	
//  articleBase.js
//  pc文章最终页 ajax
//  Created by yangcongwei on 2017-02-17.
//  Copyright 2017 yangcongwei. All rights reserved.
// 
//var cwAjaxFn;//ajax方法
//if(location.hostname=='www.cnmo.com'||location.hostname=='//www.cnmo.com'){
	//var urlNew = '/doc/Html/index.php?c=Ajax';	
///}else{
//	var urlNew = ;
//}

/****** 初始化加载Dialog ******/
var Bind = {
  init:function(){
    $('body').append('<div id="sj_pop" style="display:none;"><div style="border: 1px solid #eee;width: 1000px;height: 600px;position: fixed;top: 50%;margin-top: -300px;left: 50%;margin-left: -500px;z-index: 9999;background: #fff;border-radius: 20px;overflow: hidden;"><div style="background: url(//icon.cnmo.com/forum/images/201707/sj_icon.png) no-repeat;width: 35px;height: 35px;background-position: -103px 8px;position: absolute;right: 15px;top: 15px;cursor: pointer;" onclick="$(\'#sj_pop\').hide();"></div><div style="margin-top: 60px;height: 540px;"><iframe style="width:100%;height:100%;" src="" id="sj_pop_src" scrolling="no" framespacng="0" frameborder="0"></iframe></div></div><div style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;opacity: .5;filter:Alpha(opacity=50) ;background: #000;z-index: 9998;"></div></div>');
  },
  openBox:function(){
    if ( $('#sj_pop').is(':hidden') ) {
      if ( $('#sj_pop_src').attr('src') == '' ) {
        $('#sj_pop_src').attr('src','//i.cnmo.com/index.php?c=MySetting&m=MobileBinding&type=mini&jsobj=Bind');
      }
      setTimeout(function(){$('#sj_pop').show();},200);
    }
  },
  closeBox:function(){
    $('#sj_pop').hide();
  },
  success:function(){
    this.closeBox();
    MOBILE_BINDED = 1;
    $('#sj_bind_replybox').hide();
  }
};
window.Bind = Bind;
window.Bind.init();

/****** 公共方法 ******/
var cwAjaxVar = {
	URL: '//www.cnmo.com/pcarticle/index.php?c=Ajax',
	docid: $('body').attr('docid'),//文章id
	page:2,//为你精选页
	ccom:true,
	//拼接评论
	ccom_con :function(data){
		var str='';
		for(var i=0;i<data.length;i++){
			var listLast=data[i].comList[data[i].comCount-1];

			/*** 判断comList不等于空数组，再去拼接字符串，配合 @建雨@乐峰 添加容错处理  2020-12-16 Liuxinxiu ***/

			/*** comList确定为数组形式，要么为空，要么有数据@建雨 ***/
			if((data[i].comList).length > 0){
				str+= '<div class="ccom_con cf">';
				if(listLast.uid<=0){
				/*用户是否登录*/
					str+= '		<a class="ccom_head fl">';
				}else{
					str+= '		<a href="'+listLast.userSpace+'" class="ccom_head fl">';
				}
				str+= '			<span class="ccom_head_img"></span>';
				str+= '				<img src="'+listLast.userPicUrl+'">';
				str+= '		</a>';
				str+= '		<div class="ccom_body fl">';
				/*用户是否登录*/
				if(listLast.uid<=0){
					str+= '			<p class="ccom_body_name c999">'+ listLast.nickname +'</p>';
				}else{
					str+= '			<div class="ccom_body_name1"><a href="'+ listLast.userSpace +'" class="ccom_body_name">'+ listLast.nickname +'</a></div>'	;
				}
				/*盖楼*/
				str+= '<div class="ccom_con_floor">'+ cwAjaxVar.ccom_con_lou(data[i].comList) +'</div>';
				str+= ' 		<p class="ccom_body_text">'+ listLast.content +'</p>';
				str+= '			<div class="ccom_body_other">';
				str+= '				<span class="cbbb fl">'+ listLast.posttime +'</span>';
				str+= '				<div class="ccom_body_other1 fr" cId='+ listLast.id +' onOff="0">';
				str+= '					<div class="ccom_body_huif">回复</div>';
				str+= '						<a class="ccom_body_zan">';
				str+= '							<i class="iconfont">&#xe60e;</i>';
				str+= '							<span num="'+ listLast.goodNum +'">'+ (listLast.goodNum==0?"赞":listLast.goodNum) +'</span>';
				str+= '						</a>';
				str+= '						<a class="ccom_body_cai">';
				str+= '							<i class="iconfont">&#xe614;</i>';
				str+= '							<span num="'+ listLast.badNum +'">'+ (listLast.badNum==0?"踩":listLast.badNum) +'</span>';
				str+= '						</a>';
				str+= '				</div>';
				str+= '			</div>';
				str+= '			<div class="chuifu_box">';
				str+= '				<i class="icon"></i>';
				str+= '				<textarea placeholder="回复 '+ listLast.nickname +'"></textarea>';
				str+= '				<input type="button" cId='+ listLast.id +' class="chuifu_btn" value="回复评论" />';
				str+= '			</div>';
				str+= '		</div>';
				str+= '	</div>';
			}
		}
		return str;
	},
	//拼接评论楼层
	ccom_con_lou :function(comlist){
		var str='';	
		var i=comlist.length-2;
		ccom_lou(comlist[i],i);
		if(comlist.length>1){
			str+= '<div class="ccom_con_floor1"></div>';
		}
	//	str+= '<div class="ccom_con_floor1"></div>';
		return str;
		function ccom_lou(list,a){
			if(i<0) return;
			i--;
			str+= '<div class="ccom_con2 cf">';
			ccom_lou(comlist[i],i);
			str+= '<div class="ccom_con_f cf">';
			if(list.uid<=0){
				str+= '		<p class="ccom_body_name c999">'+ list.nickname +'</p>';
				str+= '     <p class="ccom_body_flnum">'+(a+1)+'</p>';
				str+= '		<a class="ccom_head fl">';
			}else{
				str+= '		<div class="ccom_body_name1"><a href="'+ list.userSpace +'" class="ccom_body_name">'+ list.nickname +'</a></div>';
				str+= '     <p class="ccom_body_flnum">'+(a+1)+'</p>';
				str+= '		<a href="'+list.userSpace+'" class="ccom_head fl">';
			}
			str+= '			<span class="ccom_head_img"></span>';
			str+= '				<img src="'+list.userPicUrl+'">';
			str+= '		</a>';
			str+= '		<div class="ccom_body fl">';
			str+= ' 		<p class="ccom_body_text">'+ list.content +'</p>';
			str+= '			<div class="ccom_body_other">';
			str+= '				<span class="cbbb fl">'+ list.posttime +'</span>';
			str+= '				<div class="ccom_body_other1 fr" cId='+ list.id +' style="display:none;" onOff="0">';
			str+= '					<div class="ccom_body_huif">回复</div>';
			str+= '					<a class="ccom_body_zan">';
			str+= '						<i class="iconfont">&#xe60e;</i>';
			str+= '						<span num="'+ list.goodNum +'">'+ (list.goodNum==0?"赞":list.goodNum) +'</span>';
			str+= '					</a>';
			str+= '					<a class="ccom_body_cai">';
			str+= '						<i class="iconfont">&#xe614;</i>';
			str+= '						<span num="'+ list.badNum +'">'+ (list.badNum==0?"踩":list.badNum) +'</span>';
			str+= '					</a>';
			str+= '				</div>';
			str+= '			</div>';
			str+= '			<div class="chuifu_box">';
			str+= '				<i class="icon"></i>';
			str+= '				<textarea placeholder="回复 '+ list.nickname +'"></textarea>';
			str+= '				<input type="button" cId='+ list.id +' class="chuifu_btn" value="回复评论" />';
			str+= '			</div>';
			str+= '		</div>';
			str+= '	</div>'	;
			str+= '	</div>'	;	
		}
	},
	//拼接精选
	selectCon:function(num,content){
		var str='';		
		for(var i=0;i<content.length;i++){
			if(content[i].showPic == '1'){ //图片文章
				str+= '<div class="cselect_con cselect_con1">';
				str+= '		<a class="cselect_tit" href="'+content[i].url+'">'+content[i].title+'</a>';				
				for(var j=0;j<content[i].guidePic.length;j++){
					str+= '		<a href="'+content[i].url+'" class="cselect_img">';
					str+= '			<img src="//icon.cnmo-img.com.cn/articlepc/cimg_load.png" data_src="'+content[i].guidePic[j]+'"  err_src="'+content[i].guideSmallPic[j]+'">';
					str+= '		</a>';
				}
				str+= '	<div class="cselect_num_div"><a class="cselect_num"><i class="iconfont">&#xe609;</i>'+ (content[i].comNum==0?'抢沙发':content[i].comNum) +'</a></div>';
				str+= '</div>';
			}else{//普通文章
				str+= '<div class="cselect_con">';
				str+= '		<a href="'+content[i].url+'" class="cselect_img">';
				if(!content[i].guideSmallPic||content[i].guideSmallPic==""){
					str+= '			<img src="//icon.cnmo-img.com.cn/articlepc/cimg_load.png" data_src="'+content[i].guidePic+'">';
				}else{
					str+= '			<img src="//icon.cnmo-img.com.cn/articlepc/cimg_load.png" data_src="'+content[i].guidePic+'"  err_src="'+content[i].guideSmallPic+'">';	
				}
				str+= '		</a>';
				str+= '		<div class="cselect_text">';
				str+= '			<a class="cselect_tit" href="'+content[i].url+'">'+content[i].title+'</a>';
				str+= '			<div class="ctaxt_icon2">';
				//如果是第一篇手工位
				if(num==1 && i==0){
					
					if(content[i].className!=''){
						if(content[i].classUrl==''){
							str+= '<a><i class="icon_btn1 icon"></i><b>'+ content[i].className +'</b></a>';
						}else{
							str+= '	<a class="ctaxt_icon2_have" href="'+ content[i].classUrl +'"><i class="icon_btn1 icon"></i><b>'+ content[i].className +'</b></a>';
						}
						
					};
					str+= '			</div>';
					//如果第一条评论!=0
					if(content[i].comNum!=0){
						//处理评论没有链接
						if(content[i].comUrl==""){
							str+= '<div class="cselect_num_div"><a class="cselect_num">';
						}else{
							str+= '<div class="cselect_num_div"><a href="'+ content[i].comUrl +'" class="cselect_num cselect_num_have">';
						}
						
						str+= '<i class="iconfont">&#xe609;</i>'+ (content[i].comNum==0?'抢沙发':content[i].comNum) +'</a></div>';
					}
				}else{
					if(content[i].className!=''){
						str+= '	<a class="ctaxt_icon2_have" href="'+ content[i].classUrl +'"><i class="icon_btn1 icon"></i><b>'+ content[i].className +'</b></a>';
					};
					str+= '			</div>';
					str+= '	<div class="cselect_num_div"><a href="'+ content[i].comUrl +'" class="cselect_num cselect_num_have"><i class="iconfont">&#xe609;</i>'+ (content[i].comNum==0?'抢沙发':content[i].comNum) +'</a></div>';
				}
				str+= '		</div>';
				str+= '</div>';
			}		
		}
		return str;
	}
};

var cwAjaxFn = {
    hasLoginInfo:function(argument){
        /********* 发起异步请求 ********/
        $.ajax({
        	type: "GET",
            url:"//passport.cnmo.com/index.php?c=Member_Api_LoginStatus",
            dataType:"jsonp",
            jsonp:"callback",
            success:function(data){
            	var shortMessageUrl=data['shortMessageUrl'];
            	if(data['uid']&&data['uname']){
	                var state = data['uid'];
	                cwAjaxVar.uname = data['uname'];
	                cwAjaxVar.isLogin=state>=1?1:0;
	                cwAjaxVar.mobileBinded=data['mobilestatus'] || 0;
	                IS_LOGIN = state;
		    		IS_LOGIN = IS_LOGIN>=1?1:0;
		    		MOBILE_BINDED = data['mobilestatus'] || 0;

	                /****** 更改页面中元素显示状态 ******/
					var denglu = '<a href="//i.cnmo.com/">欢迎你，'+ data.uname +'</a><span>|</span><a href="'+shortMessageUrl+'">短消息</a><span>|</span><a href="//passport.cnmo.com/logout/" target="_self">退出</a>';
					//var dengluC = '<a href="//i.cnmo.com/">欢迎你，'+ data.userInfo.nickname +'</a><span> | </span><a href="//passport.cnmo.com/logout/" target="_self">退出</a>';
					//评论处	
					$('#ccom .ccom_tit').find('.c999').remove();
					$('#comm_denglu').parent().remove();
					$('#ccom_textarea').next().val('发表评论');
					//页面顶部
					$('#cheader_my').addClass('cheader_myd');
					$('#cheader_my').html(denglu);		

					//请求接口，判断是否已经收藏
					cwAjaxFn.IsCollection();
            	}
            }
      	}); 
		$("#ccom_textarea").focus(function(){
			
				if (cwAjaxVar.isLogin == 0 || !cwAjaxVar.isLogin) {					
					$("#ccom_textarea").blur();
					setTimeout(function(){
						$("#ccom_textarea").parent().removeClass('border_red');
						alert('请先登录再发表评论哦~~~');
					},0)
					
			
					return false;
				}
				if( cwAjaxVar.isLogin == 1 && cwAjaxVar.mobileBinded == 0 ){
					window.Bind.openBox();
					return false;
				}
			});	  
    },
	openLogin:function(Data){
		$(".btnbox").click(function(){
			console.log("点击添加收藏按钮")
			var _docid=$("body").attr("docid");
	        /********* 发起异步请求 ********/
	        $.ajax({
	        	type: "GET",
	            url:"//www.cnmo.com/pcarticle/index.php",
	            dataType:"jsonp",
	            jsonp:"timestamp",
	            data:{
	            	c:"Ajax",
	            	m:"Collection",
	            	docid:_docid
	            },
	            success:function(data){
	            	console.log(data)
	            	/****** 判断是否未登录(3为未登录) ******/
	            	if(data.status==3){
						console.log(data)
						$('#login2019').fadeIn();
	            	}
	            	if(data.status==1){
	            		$(".btnbox").addClass("btnbox-on");
	            		var _h='';
							_h+='<a href="//i.cnmo.com/index.php?c=FavoriteArt&m=Index">';
							_h+='	<div class="gifimg"><img src="//statict.cnmo.com/origin/mainpage/www/images/heart.jpg"></div>';
							_h+='	<p>已收藏</p>';
							_h+='</a>';

	      //       		var _h='';
							// _h+='	<div class="gifimg"><img src="//statict.cnmo-img.com.cn/origin/mainpage/www/images/heart.jpg"></div>';
							// _h+='	<p>已收藏</p>';
						$(".btnbox").html(_h);

	            	}
	            },
	            error:function(data){
	            	console.log("服务器错误")
	            }
	      	}); 
		})
	},

	IsCollection:function(Data){
		var _docid=$("body").attr("docid");
        /********* 发起异步请求 ********/
        $.ajax({
        	type: "GET",
            url:"//www.cnmo.com/pcarticle/index.php",
            dataType:"jsonp",
            jsonp:"timestamp",
            data:{
            	c:"Ajax",
            	m:"IsCollection",
            	docid:_docid
            },
            success:function(data){
            	console.log(data)
            	/****** 判断是否被收藏 ******/
            	if(data.status==1){
            		$(".btnbox").addClass("btnbox-on");
            		var _h='';
						_h+='	<div class="gifimg"><img src="//statict.cnmo.com/origin/mainpage/www/images/heart.gif"></div>';
						_h+='	<p>已收藏</p>';
					$(".btnbox").html(_h);
            	}
            },
            error:function(data){
            	console.log("服务器错误");
            }
      	}); 
	},
	
	Ajax:function(Data,succFn,errFn){
		jQuery.support.cors = true;
		$.ajax({
            type: "GET",
            url: cwAjaxVar.URL,
            data: Data,
            dataType:"jsonp",
            jsonp:"timestamp",
            success: function(data){
               succFn&&succFn(data);
            },
            error:function(data){
            	errFn&&errFn(data);
            	console.log('服务器错误');
            }
       });
	},
	//评论部分
	//插入评论
	openComm:function(){

		var Data ={"m":'CommList',"docid":cwAjaxVar.docid};
		cwAjaxFn.Ajax(Data,function(data){	
//			console.log(data.comList)
			commGet(data);
		},function(){
			//失败以后延时1s重新发送
			cwAjaxFn.Ajax(Data,function(data){
				commGet(data);
			},function(){
				alert('抱歉，评论获取失败！');
			});
		});
		function commGet(data){
			if(data.status!=1) return;
			var str = cwAjaxVar.ccom_con(data.comList);
			//如果用户登录
			//if(data.userInfo.uid!=-1){
			//	var denglu = '<a class="c_name" href="//i.cnmo.com/">欢迎你，'+ data.userInfo.nickname +'</a><span>|</span><a href="//i.cnmo.com/index.php?c=Notice&m=Comment">短消息</a><span>|</span><a href="http://passport.cnmo.com/logout/" target="_self">退出</a>';
//				var dengluC = '<a href="//i.cnmo.com/">欢迎你，'+ data.userInfo.nickname +'</a><span> | </span><a href="//passport.cnmo.com/logout/" target="_self">退出</a>';
				//评论处	
			// 	$('#ccom .ccom_tit').find('.c999').remove();
			// 	$('#comm_denglu').parent().remove();
			// 	$('#ccom_textarea').next().val('发表评论');
			// 	//页面顶部
			// 	$('#cheader_my').addClass('cheader_myd');
			// 	$('#cheader_my').html(denglu);
				
			// }

            /****** 新的用户登录状态判断 2017-08-29 11:29 Jesse.Liu ******/
            if(cwAjaxVar.uname!=''&&cwAjaxVar.isLogin==1){
                console.log('cwAjaxVar.uname:'+cwAjaxVar.uname);
                console.log('cwAjaxVar.isLogin:'+cwAjaxVar.isLogin);
                console.log('cwAjaxVar.mobileBinded:'+cwAjaxVar.mobileBinded);
                var denglu = '<a class="c_name" href="//i.cnmo.com/">欢迎你，'+ data.userInfo.nickname +'</a><span>|</span><a href="//i.cnmo.com/index.php?c=StationLetter&m=Index">短消息</a><span>|</span><a href="//passport.cnmo.com/logout/" target="_self">退出</a>';
				//评论处	
				$('#ccom .ccom_tit').find('.c999').remove();
				$('#comm_denglu').parent().remove();
				$('#ccom_textarea').next().val('发表评论');
				$('.ccom_denglu_other').hide();
				//页面顶部
				// $('#cheader_my').addClass('cheader_myd');
				// $('#cheader_my').html(denglu);

            }		
			
			//更改页面评论数
			$('.comm_num').html(data.comNum);
			//如果没有评论
			if(data.comNum == 0){
				$('#ccom .ccom_tit').find('a').remove();
			}
			//点击加载更多处理
			if(data.comNum>2){				
				$('#ccom .ccom_more').css('display','block');
			}
			//更改页面点赞数
			cwPubVar.textZan = data.voteNum;
			$('#textZan .ctext_jia').html(data.voteNum);
			//去掉评论加载中
			$('#ccomList').find('.no_data').remove();
			$('#ccomList').prepend(str);
			//评论点赞
			cwAjaxFn.commClick();
			//点击发表评论
			$('#ccom').on('click','.ccom_sub ,.chuifu_btn',function(){
				if(!cwAjaxVar.ccom) return;
				cwAjaxVar.ccom = false;
				cwAjaxFn.commS($(this),$(this).prev());
			});
			//图片懒加载
			cwSpeFn.showImg('.c_img');
			//右侧吸顶更改左侧高度
			cwPubVar.cLeftHeight=$('#cleft').height()+$('#cleft').offset().top-10;//左侧高度
		}
	},
	//评论点赞
	commClick:function(){
		/****** 评论区点击事件 Add Code Snippet 2017-08-30 11:29 Jesse.Liu ******/
		$('#ccom_textarea,.chuifu_box textarea,.ccom_sub,.chuifu_btn').on('click',function(){
			if(cwAjaxVar.isLogin==0){
				alert('请先登录才能发表评论！');
				return false;
			}
            if(cwAjaxVar.mobileBinded==0&&cwAjaxVar.isLogin==1){
                console.log('还没绑定手机号！')
                window.Bind.openBox();
                //location.href='//my.m.cnmo.com/security/bindmobile/?referer='+document.URL;
                return false;
            }
		});
		$('#ccomList').on('click','.ccom_body_zan,.ccom_body_cai',function(){	
			
			/*根据页面中标签上的onOff自定义属性判断是否点过，点过弹出提示*/
			var that = $(this);						
			if(that.parent().attr('onOff')=='0'){
				that.parent().attr('onOff','1').addClass('dianguo');
				var num = parseInt(that.find('span').attr('num')); 
				var name = that.attr('class');
				that.find('span').html(num+1);
				that.addClass(name+'g');
				var commentId = that.parent().attr('cId');
				var type = that.hasClass('ccom_body_zan')?1:0;
				
				
				var Data ={"m":'CommVote',"docid":cwAjaxVar.docid,"commentId":commentId,"type":type};
				cwAjaxFn.Ajax(Data,function(data){
					//成功以后
					/*记录cookie*/				
					//记录赞
					if(type == 1){
						var arrZcomm = cwSpeFn.getCookie('Zcomm');
						document.cookie = 'Zcomm =' + arrZcomm + ','+commentId; 
					}else{//记录踩
						var arrCcomm = cwSpeFn.getCookie('Ccomm');
						document.cookie = 'Ccomm =' + arrCcomm + ','+commentId; 
					}
				},function(){
					//失败以后延时1s重新发送
					setTimeout(function(){
						cwAjaxFn.Ajax(Data,function(data){
							//成功以后
							/*记录cookie*/				
							//记录赞
							if(type == 1){
								var arrZcomm = cwSpeFn.getCookie('Zcomm');
								document.cookie = 'Zcomm =' + arrZcomm + ','+commentId; 
							}else{//记录踩
								var arrCcomm = cwSpeFn.getCookie('Ccomm');
								document.cookie = 'Ccomm =' + arrCcomm + ','+commentId; 
							}
						});
					},1000);
				});
			}
		});
		
		//cookie初始化
		//评论点赞
    	if(cwSpeFn.getCookie('Zcomm')!=''){
    		commCookie('Zcomm');
		}
    	//评论点踩    	
    	if(cwSpeFn.getCookie('Ccomm')!=''){    		
    		commCookie('Ccomm');
		}
		function commCookie(Name){			
			var arr = cwSpeFn.getCookie(Name).split(',');
    		var list = $('#ccomList').find('.ccom_body_other1');
    		//踩赞区分
    		var addNname = (Name=='Zcomm'?'ccom_body_zan':'ccom_body_cai');
    		//循环cookie判断是否已经点过，点过的话更改自定义标识
    		$.each(list,function(i){
    			for(var j=1;j<arr.length;j++){   				
    				if(list.eq(i).attr('cid')==arr[j]){
    					//更改样式
    					list.eq(i).attr('onOff','1').addClass('dianguo');	
    					//更改标识
    					list.eq(i).find('.'+addNname).addClass(addNname+'g');	
    				}
    			}
    		});
		}
	},
	//发表评论
	commS:function(btn,box){
			
			//输入内容筛选
			var content = $.trim(box.val());
			//筛选网址
	        var result=/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(content);
	        if(result){
	        	cwAjaxVar.ccom = true;
	            alert('评论中不能含有链接哦');
	            return;
	        }
			if(content==''){
				cwAjaxVar.ccom = true;
				alert('请您输入内容');
				return;
			}
			
			var cid = btn.attr('cid')?btn.attr('cid'):0 ;
			var Data ={"m":'AddComm',"docid":cwAjaxVar.docid,"replyid":cid,"content":content};
			cwAjaxFn.Ajax(Data,function(data){	
				//发表失败
				if(data.status==0){
					alert('抱歉，评论发表失败!'+'     '+data.info);
					cwAjaxVar.ccom = true;
					return;
				}
				//发表成功
				var str = cwAjaxVar.ccom_con(data.data.comList);
				box.val('');
				$('#ccomList').prepend(str);
				$('#ccomList').find('div').eq(0).hide();
				$('#ccomList').find('div').eq(0).slideDown('fast');
				$('.chuifu_box').slideUp('fast');
				cwAjaxVar.ccom = true;
			},function(){
				cwAjaxVar.ccom = true;
				alert('抱歉，评论发表失败!');
			});
	},
	//键盘事件
	commKeypress:function(){
		$('#ccom').on("keypress",'.ccom_box ,.chuifu_box',function(e){
			
		    if (e.ctrlKey && e.which == 13 || e.which == 10){
		    	var btn = $(this).find('input');
				var box = $(this).find('textarea');
		        cwAjaxFn.commS(btn,box);
		    }
		});
	},
	//文章点赞
	textZanClick:function(){		
		$('#textZan').one('click',function(){
	    	var Data ={"m":'vote',"docid":cwAjaxVar.docid};
			cwAjaxFn.Ajax(Data,function(data){	
				//成功以后
				/*记录cookie*/
				var arrZdocid = cwSpeFn.getCookie('Zdocid');
				document.cookie = 'Zdocid =' + arrZdocid + ','+cwAjaxVar.docid;
			},function(){
				//失败以后延时1s重新发送
				setTimeout(function(){
					cwAjaxFn.Ajax(Data,function(data){
						//成功以后
						/*记录cookie*/
						var arrZdocid = cwSpeFn.getCookie('Zdocid');
						document.cookie = 'Zdocid =' + arrZdocid + ','+cwAjaxVar.docid;
					});
				},1000);
				
			});
	    });
	},
	//精选点击加载更多
	selectMore:function(){
		var onoff=true;
		//页面初始化时候加载为你精选
		/* selectAjax($('#ccom_more'),1,function(){
			$('#cselect_list').find('.no_data').remove();
			$('#ccom_more').css('display','block');
			//右侧吸顶更改左侧高度
			cwPubVar.cLeftHeight=$('#cleft').height()+$('#cleft').offset().top-10;//左侧高度
		}); */
		//处理评论icon
		$('#cselect_list').find('.cselect_num .iconfont').html('&#xe609;')
		$('#ccom_more').css('display','block');
		//右侧吸顶更改左侧高度
		cwPubVar.cLeftHeight=$('#cleft').height()+$('#cleft').offset().top-10;//左侧高度
		$('#ccom_more').on('click',function(){
			var that=$(this);
			//防止二次点击
			if(!onoff) return;
			onoff=false;
			that.find('span').html('请稍后，加载中...');
			cwAjaxVar.page = Number(cwAjaxVar.page);
			that.addClass('ccom_more_no');
			selectAjax(that,2,function(){
				cwPubVar.cLeftHeight=$('#cleft').height()+$('#cleft').offset().top-10;//左侧高度
			});
		});
		function selectAjax(that,num,callback){
			var Data ={"m":'Recom',"docid":cwAjaxVar.docid,"page":cwAjaxVar.page};
			cwAjaxFn.Ajax(Data,function(data){
//				成功回调
				//加载失败
				if(data.status==0) {
					alert('抱歉数据加载失败'+'     '+ data.info);
					onoff=true;
					return;
				}
				var str = cwAjaxVar.selectCon(num,data.data);
				cwAjaxVar.page++;
				if(cwAjaxVar.page>=7 || data.nodata==0){
					//最多加载5次
					that.find('span').html('已到底部');
				}else{
					that.removeClass('ccom_more_no');
					onoff=true;
					that.find('span').html('点击加载更多<i class="icon"></i>');
				}
				//填入页面
				
				$('#cselect_list').append(str);
				cwSpeFn.showImg('.c_img');
			
				callback&&callback();
			},function(){
//				失败回调
				
				that.removeClass('ccom_more_no');
				onoff=true;
				that.find('span').html('点击加载更多<i class="icon"></i>');
			});
		}
	},
	checkLogin : function (){//检测用户是否登录
        var that = this;

        $.getJSON('//passport.cnmo.com/index.php?c=Member_Api_LoginStatus&callback=?',{ size:'small'},function(data){
                if (data) {
                	console.log(data);
                    if (data.uid > 0) {
//                          if ($('#login_after').length == 0) {
//                              //var loginStr = that.getLoginAfterInfo(data.uname,data.spaceUrl,data.shortMessageNum);
//                              var loginStr = that.getBbsLoginAfterInfo(data.uname,data.uid,data.shortMessageNum,data.userAvatarUrl,data.level,data.jingyan);
//                              $('#login_before').remove();
//                              $('#login_status').before(loginStr);
//                              //绑定鼠标悬停用户信息事件
//                              that.doBindLoginAfterMouseOverAction();
//                          }
                    }
                }
            }
        );
    }
	
};
//用户登录
cwAjaxFn.hasLoginInfo();
//插入评论
cwAjaxFn.openComm();
//文章点赞
cwAjaxFn.textZanClick();
//键盘发表评论事件
cwAjaxFn.commKeypress();
//精选点击加载更多
cwAjaxFn.selectMore();
//cwAjaxFn.checkLogin();

//点击点赞事件
cwAjaxFn.openLogin();





/****** 获取页面视频播放源 ******/
var _youkuVurl=$("body").attr("youkuVurl"); 
var _sohuVurl=$("body").attr("sohuVurl");


/****** 判断优先使用搜狐视频源 ******/
if(_sohuVurl!=undefined && _sohuVurl!=''){
	/****** 过滤数据源 ******/
	var index=_sohuVurl.lastIndexOf("\/");
	_sohuVurl=_sohuVurl.substring(index+1,_sohuVurl.length);
	var _sohuVid=_sohuVurl.split(".shtml")[0];
	/****** 插入搜狐视频 ******/
    //$(".cpage .ctext").prepend('<p style="text-align: center;"><embed id="player1516352791394" pluginspage="//www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="467" height="350" src="//tv.sohu.com/upload/swf/20180118/Main.swf" quality="high" bgcolor="#000000" allowfullscreen="true" allowscriptaccess="always" wmode="transparent" flashvars="&amp;oad=&amp;ead=&amp;pad=&amp;fbarad=&amp;flogoad=&amp;flogodelay=&amp;tlogoad=&amp;tlogodelay=&amp;fbottomad=&amp;fbottomdelay=&amp;ftitlead=&amp;ftitledelay=&amp;domain=inner&amp;sogouBtn=0&amp;skin=0&amp;api_key=4a5eb459b50e55e13de88f5933e290d8&amp;enforceMP4=&amp;xuid=&amp;recommend=&amp;showRecommend=0&amp;playercover=&amp;id='+_sohuVid+'&amp;autoplay=true&amp;pageurl=//www.cnmo.com&amp;showCtrlBar=0&amp;jump=0&amp;sid=null&amp;enforceHTML5=false&amp;uuid=869eab6b-b924-7504-93ce-0dab63639573&amp;topBarFull=1" style="width: 467px; height: 350px;"></p>');
    $(".cpage .ctext").prepend('<iframe frameborder="0" src="https://tv.sohu.com/s/sohuplayer/iplay.html?bid='+_sohuVid+'&autoplay=true&disablePlaylist=true" allowFullScreen="true" scrolling="no" style="width: 690px; height: 480px; display: block; margin:0 auto;"></iframe>');
}
/****** 判断优酷视频源 ******/
else{
	if(_youkuVurl!=undefined &&　_youkuVurl!=''){
		/****** 过滤数据源 ******/
		var _youkuVid=_youkuVurl.split("/v_show/")[1].split(".html")[0].split("id_")[1];
		/****** 插入优酷视频 ******/
		$(".cpage .ctext").prepend('<p style="text-align: center;"><iframe height="480" width="690" src="//player.youku.com/embed/'+_youkuVid+'" frameborder="0"></iframe></p>');
	}
}



/****** 投票模块 2020-01-16 liuxinxinxiu ******/
/****** 投票展示拼接模板 ******/
function setdata(data){
    var ndata=data.data;
    var dataList=ndata.options;
    var _html='';
    console.log(ndata)
    $(".vote_boxs").attr("id",ndata.id);

    /****** 判断单选还是多选 ******/
    if(ndata.tyle=='radio'){
        var typeText='单选题';
    }
    else{
        var typeText='多选题';
    }
    _html+='<div class="titf">';
    _html+='<span>'+ndata.title+'</span>';
    _html+='</div>';
    _html+='<ul class="tp" type="Single">';
    $(".rele-hd span").html(typeText);

    var baseNum=0;
    for(var i=0; i<dataList.length; i++){
        /****** 获取最大值为基数 ******/
        if(i==0){
            baseNum = parseInt(dataList[i].orivalue);
        }
        if(parseInt(dataList[i].orivalue)>baseNum){
            baseNum = parseInt(dataList[i].orivalue);
        }

        _html+='<li class="clearfix '+ndata.tyle+'" vid="'+dataList[i].id+'" type="'+ndata.tyle+'"><span class="lo">'+dataList[i].content+'</span><span class="bt ktop" pn="'+dataList[i].orivalue+'">投票</span></li>';
        if(i==dataList.length-1){
            _html+='</ul><ul class="vp" style="display: none;">';
        }
    }
    for(var i=0; i<dataList.length; i++){
        /****** 判断如果值过小就设置1px ******/
        if((parseInt(dataList[i].orivalue)/baseNum).toFixed(2)=="0.00"){
            var widthPX='1px';
        }
        else{
            var widthPX=((parseInt(dataList[i].orivalue)/baseNum).toFixed(2)*100)+'%';
        }
        if(widthPX=="100%"){
            var styleStr="border-radius: 5px;";
        }
        else{
            var styleStr="";
        }

        _html+='<li class="clearfix" vid="'+dataList[i].id+'">';
        _html+='    <span class="lo">'+dataList[i].content+'</span><span class="bt">投票</span>';
        _html+='    <span class="lbox">';
        _html+='        <span class="progress" style="width: '+widthPX+'; '+styleStr+'"></span><span class="pn" pn="'+dataList[i].orivalue+'">'+dataList[i].orivalue+'票</span>';
        _html+='    </span>';
        _html+='</li>';

        if(i==dataList.length-1){
            _html+='</ul>';
        }
    }
    $(".vote_boxs .inner").html(_html);
};
function upDateData(data){
    var ndata=data.data;
    var dataList=ndata.options;
    var _html='';
    console.log(ndata)
    for(var i=0; i<dataList.length; i++){
        $(".vote_boxs ul.vp li").eq(i).find(".pn").html(dataList[i].orivalue+"票")
    }
};
function getdata(str){
    var _docid = $("body").attr("docid"); 
    console.log(_docid)
    /****** 请求投票数据接口 ******/
    $.ajax({
        type: "GET",
        url: "//www.cnmo.com/pcarticle/index.php",
        data:{"c":"Ajax","m":"GetBallot","docid":_docid},
        dataType: "jsonp",
        jsonp: "timestamp",
        success: function (data) {
            console.log(str + data);

            /****** 判断没有数据直接隐藏模块 ******/
            if(data.status == 0){
                $(".bodych").hide();
                return false;
            }
            else{
            	$(".bodych").show();
            }
            
            /****** 开始请求数据展示模块 ******/
            if(str=='onload:'){
                setdata(data);
            }
            else{
                upDateData(data)
            }

        },
        error:function(data){
            console.log("服务器错误！")
        }
    })
}
/****** 自执行函数 ******/
$(function(){
    getdata("onload:");
});


/****** 点击投票事件 ******/
$(".vote_boxs .inner").on("click",".bt",function(e){
    var _target = e.target;
    var _docid = $("body").attr("docid");
    var _this = $(_target).parents(".clearfix").eq(0);
    var _index = _this.index();
    var _vid = _this.attr("vid");
    var _tp = $(_target).parents(".tp").eq(0);
    var _vp = $(_target).parents(".inner").eq(0).find(".vp");
    var _type= _this.attr("type");
    console.log(_type);
    //console.log($(_target).parents(".tp").eq(0).length>0)
    console.log(_this.find(".bt").html())

    if(_this.find(".bt").hasClass("selected")){
        console.log("有元素标记，禁止再选择！");
        return false;
    }

    console.log("_docid:"+_docid+'----- _vid:'+_vid)

    var _docid = $("body").attr("docid"); 
    var _optionid = $(".vote_boxs").attr("id");
    var _html='';

    /****** 请求抽奖数据接口 ******/
    $.ajax({
        type: "GET",
        url: "//www.cnmo.com/pcarticle/index.php",
        data:{"c":"Ajax","m":"SecretBallot","optionid":_vid,"voteid":_optionid},
        dataType: "jsonp",
        jsonp: "timestamp",
        success: function (data) {
            console.log(data);
            
            /****** 状态码3或4 直接弹框 ******/
            if(data.status==1 || data.status == 2){
                /**** 执行逻辑 ****/
                if(_tp.length>0){
                    _tp.hide();
                    _vp.show();
                    var tar=$(_target).parents(".tp").next(".vp").find(".clearfix").eq(_index).find(".bt");
                    tar.addClass("selected");
                    tar.html("已投");
                    console.log("_type"+_type)
                    if(_type=='radio'){
                        $(".vp .clearfix").find(".bt").addClass("selected");
                    }
                }
                else{
                     $(_target).addClass("selected");
                     $(_target).html("已投");
                }
                getdata("更新数据:");
            }

        },
        error:function(data){
            console.log("服务器错误！")
        }
    })

})
