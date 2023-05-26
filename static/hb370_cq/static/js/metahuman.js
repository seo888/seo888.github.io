(()=>{"use strict";var i={928:(e,t,i)=>{function n(e=""){var t=document.createElement("div");return t.innerHTML=e,t.innerText}function c(e="",t=100){for(var i=[];e&&e.length>t;)i.push(e.substring(0,t)),e=e.slice(t);return e&&i.push(e),i}i.r(t),i.d(t,{dateFormat:()=>function(e,t){var i;var n={"y+":e.getFullYear().toString(),"M+":(e.getMonth()+1).toString(),"d+":e.getDate().toString(),"h+":e.getHours().toString(),"m+":e.getMinutes().toString(),"s+":e.getSeconds().toString()};for(var o in n)(i=new RegExp("("+o+")").exec(t))&&(t=t.replace(i[1],1==i[1].length?n[o]:n[o].padStart(i[1].length,"0")));return t},guid:()=>function(){return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})},htmlToText:()=>n,loadScript:()=>function(e,t){const i=document.createElement("script");i.type="text/javascript",i.readyState?i.onreadystatechange=function(){"loaded"!==i.readyState&&"complete"!==i.readyState||(i.onreadystatechange=null,t())}:i.onload=function(){t()};i.src=e,document.body.append(i)},matchAllWord:()=>function(t,i){let n=!0;for(let e=0;e<i.length;e++)if(!t.includes(i[e])){n=!1;break}return n},splitText:()=>function(e=""){e=(e=(e=n(e)).replace(/\s+/g," ")).replace(/[_]/g,"");let a=100,s=300,l=e.split(/[。！!？?，,；;]/).filter(e=>!!e),h=[];return l.reduce((e,t,i)=>{i=i===l.length-1;if(e){var n=e.concat(" ",t),o=n.length;if(o<a){if(!i)return n;h.push(n)}else{if(o>=a&&o<=s)return h.push(n),"";if(o>s)if(h.push(e),t.length<a){if(!i)return t;h.push(t)}else{if(t.length>=a&&t.length<=s)return h.push(t),"";t.length>s&&h.push(...c(t))}}}else{if(!i)return t;t.length<=s?h.push(t):h.push(...c(t))}return""},""),void 0,void 0,h},splitTextByLimit:()=>c,toAbsURL:()=>function(e){var t=document.createElement("img");return t.src=e,e=t.src,t.src=null,e}})}},n={};function o(e){var t=n[e];return void 0!==t||(t=n[e]={exports:{}},i[e](t,t.exports,o)),t.exports}o.d=(e,t)=>{for(var i in t)o.o(t,i)&&!o.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};{var a=o(928),e=function(e,s,l,h){return new(l=l||Promise)(function(i,t){function n(e){try{a(h.next(e))}catch(e){t(e)}}function o(e){try{a(h.throw(e))}catch(e){t(e)}}function a(e){var t;e.done?i(e.value):((t=e.value)instanceof l?t:new l(function(e){e(t)})).then(n,o)}a((h=h.apply(e,s||[])).next())})};class t{constructor(e){var t;this.isIOS=/^(iPad|iPhone|iPod)/.test(window.navigator.platform)||/^Mac/.test(window.navigator.platform)&&1<window.navigator.maxTouchPoints,this.model=169,this.modelOffset=[0,0],this.voice="Aixia",this.voiceSpeed=20,this.voiceVolume=50,this.theme="dark",this.speakBeforeLoading=!1,this.guid=a.guid(),this.container=e.container,this.model=null!=(t=null==e?void 0:e.model)?t:this.model,this.modelOffset=null!=(t=null==e?void 0:e.modelOffset)?t:this.modelOffset,this.voice=null!=(t=null==e?void 0:e.voice)?t:this.voice,this.voiceSpeed=null!=(t=null==e?void 0:e.voiceSpeed)?t:this.voiceSpeed,this.voiceVolume=null!=(t=null==e?void 0:e.voiceVolume)?t:this.voiceVolume,this.theme=null!=(t=e.theme)?t:this.theme,this.speakKwReplace=null!=(t=null==e?void 0:e.speakKwReplace)?t:this.speakKwReplace,this.speakBeforeLoading=null!=(t=null==e?void 0:e.speakBeforeLoading)?t:this.speakBeforeLoading,this.onReady=e.onReady,this.onSpeakBefore=e.onSpeakBefore,this.onSpeak=e.onSpeak,this.onSpeakEnd=e.onSpeakEnd,this.init()}init(){return e(this,void 0,void 0,function*(){this.htmlInit();try{this.loadSDK(()=>{this.loading(),this.eventListener(),AMagics.on(AMagics.INIT_SUCCESS,()=>{this.modelInit()}),AMagics.on(AMagics.AVATAR_LOADED,e=>{var t;null!=(t=this.humanContainer)&&t.classList.add("mh-human--visible"),this.modelReset(),this.onReady&&this.onReady(),this.loading(!1),setTimeout(()=>{AMagics.playAction("DaZhaoHu_out",!1)},1200)})})}catch(e){this.loading(!1)}})}loadSDK(e){window.AMagics||a.loadScript("https://large.magics-ad.com/%2Asdk/release/magicssdk-kpy-1.0.1.min.js",e)}eventListener(){AMagics.on(AMagics.READ_BEGIN,()=>{this.speakBeforeLoading&&this.loading_fecthTTS(!1),AMagics.playAction("ZBDH_33Miao_out",!0),this.onSpeak&&this.onSpeak()}),AMagics.on(AMagics.READ_END,()=>{AMagics.stopAction(),this.onSpeakEnd&&this.onSpeakEnd()}),window.addEventListener("resize",()=>{AMagics.setRenderSize(this.container.clientWidth,this.container.clientHeight),this.modelReset()})}htmlInit(){this.container.className+=" mh","light"===this.theme&&(this.container.className+=" mh--light");var[e,t]=this.modelOffset;this.container.innerHTML=`
      <div class="mh-human" style="${`
      left: ${"string"==typeof e?e:e+"px"};
      top: ${"string"==typeof t?t:t+"px"};
    `}">
        <canvas></canvas>
      </div>
      <div class="mh-loading">
        <div class="mh-loading_body">
          <div class="mh-loading_icon mh-anim-loading">
            <i class="mp-icon mp-icon-lixi"></i>
          </div>
          <div class="mh-loading_text">加载中...</div>
        </div>
      </div>
      <div class="mh-loading mh-loading--fecth-tts">
        <div class="mh-loading_body">
          <div class="mh-loading_icon mh-anim-loading">
            <i class="mp-icon mp-icon-lixi"></i>
          </div>
        </div>
      </div>
    `,this.humanContainer=this.container.querySelector(".mh-human"),this.canvas=this.container.querySelector("canvas")}modelInit(){var e;AMagics.initAvatar({canvas:this.canvas,width:null==(e=this.humanContainer)?void 0:e.clientWidth,height:null==(e=this.humanContainer)?void 0:e.clientHeight,avatarId:this.model,voiceName:this.voice,speechRate:this.voiceSpeed,volume:this.voiceVolume})}loading(e=!0){let t=this.container.querySelector(".mh-loading");e?(t.style.zIndex="10",t.style.opacity="1"):(t.style.opacity="0",setTimeout(()=>{t.style.zIndex="-1"},1e3))}loading_fecthTTS(e=!0){let t=this.container.querySelector(".mh-loading--fecth-tts");var i;e?(e=this.container.getBoundingClientRect(),i=AMagics.getBoundingBox(),t.style.top=e.height-i.height+"px",t.style.backgroundColor="transparent",t.style.zIndex="10",t.style.opacity="1"):(t.style.opacity="0",setTimeout(()=>{t.style.zIndex="-1"},1e3))}loadingTextSet(e){this.container.querySelector(".mh-loading_text").innerHTML=e}_kwReplace(i){return this.speakKwReplace&&Object.keys(this.speakKwReplace).forEach(e=>{var t=new RegExp(""+e,"g");i=i.replace(t,this.speakKwReplace[e])}),i}speak(e){this.onSpeakBefore&&this.onSpeakBefore(),e=e&&this._kwReplace(e),AMagics.stopRead(),AMagics.read(e),this.speakBeforeLoading&&(this.loading_fecthTTS(),AMagics.playAction("GaoXing_out",!0))}stop(){this.speakBeforeLoading&&this.loading_fecthTTS(!1),AMagics.stopAction(),AMagics.stopRead()}playAction(e,t=!1){AMagics.playAction(e,t)}modelPosToCenter(){var e=AMagics.getBoundingBox(),t=(null==(t=this.canvas)?void 0:t.offsetWidth)/2,i=(null==(i=this.canvas)?void 0:i.offsetHeight)/2-e.height/2+e.height;AMagics.setAvatarPosition(t,i)}modelResize(){var e=AMagics.getBoundingBox(),t=e.width/e.height,i=null!=(i=null==(i=this.humanContainer)?void 0:i.clientWidth)?i:0,n=null!=(n=null==(n=this.humanContainer)?void 0:n.clientHeight)?n:0,o=e.width/e.height;n<i||t<o?AMagics.setAvatarScale(n/e.height*.9):AMagics.setAvatarScale(i/e.width*.9)}modelReset(){this.modelResize(),this.modelPosToCenter()}}t.utils=a,window.Metahuman=t}})();