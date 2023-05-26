//common
var uedCommon = {};
uedCommon.Version = "1.02";
uedCommon.Author = "Hunkjiang";
uedCommon.CreateDate = "2011-02-16";
uedCommon.EditDate = "2011-05-05";
uedCommon.EditContent = "add fn.realOut()";
uedCommon.fn = {
    getEbyId: function(objectId) {
        if (document.getElementById && document.getElementById(objectId)) {
            return document.getElementById(objectId)
        } else if (document.all && document.all(objectId)) {
            return document.all(objectId)
        } else if (document.layers && document.layers[objectId]) {
            return document.layers[objectId]
        } else {
            return false
        }
    },
    getEbyTag: function(oTag) {
        if (document.getElementsByTagName && document.getElementsByTagName(oTag)) {
            return document.getElementsByTagName(oTag)
        } else {
            return false
        }
    },
    getEbyClass: function(obj, tag, clsName) {
        var reArray = [];
        var target = obj.getElementsByTagName(tag);
        for (i = 0; i < target.length; i++) {
            if (target[i].className == clsName) {
                reArray.push(target[i]);
            }
        }
        return reArray;
    },
    ie: /msie/.test(window.navigator.userAgent.toLowerCase()),
    moz: /gecko/.test(window.navigator.userAgent.toLowerCase()),
    isloaded: function(obj, fCallback) {
        if (this.ie) {
            obj.onreadystatechange = function() {
                if (this.readyState == 'loaded' || this.readyState == 'complete') {
                    fCallback()
                }
            }
        } else if (this.moz) {
            obj.onload = function() {
                fCallback()
            }
        } else {
            fCallback()
        }
    },
    LoadJs: function(sUrl, fCallback) {
        var _script = document.createElement('script');
        _script.setAttribute('type', 'text/javascript');
        _script.setAttribute('charset', 'gb2312');
        _script.setAttribute('src', sUrl);
        document.getElementsByTagName('head')[0].appendChild(_script);
        this.isloaded(_script, fCallback)
    },
    addEvent: function(l, i, I) {
        if (l.attachEvent) {
            l.attachEvent("on" + i, I)
        } else {
            l.addEventListener(i, I, false)
        }
    },
    delEvent: function(l, i, I) {
        if (l.detachEvent) {
            l.detachEvent("on" + i, I)
        } else {
            l.removeEventListener(i, I, false)
        }
    },
	getStyle:function(Ele,Attri){
	var style = '';
	if(Ele.currentStyle)
		{return style = Ele.currentStyle[Attri]}
	else if(window.getComputedStyle)
		{return style = window.getComputedStyle(Ele,null)[Attri];
		}
	},
	setStyle:function(Ele,Attri){
	var style = '';
	if(Ele.currentStyle)
		{return style = Ele.currentStyle[Attri]}
	else if(window.getComputedStyle)
		{return style = window.getComputedStyle(Ele,null)[Attri];
		}
	},
	realOut:function (obj, e, callback) {
        var e = window.event || e,
        relatedTarget = e.toElement || e.relatedTarget;
        while (relatedTarget && relatedTarget != obj) {
            relatedTarget = relatedTarget.parentNode;
        }
        if (!relatedTarget) {
            callback();
        }
    },
	isEobj: function(obj) {
            var oTrue;
            if (obj.nodeType == 1) {
                oTrue = obj
            } else if (obj.nodeType == 3) {
                oTrue = obj.previousSibling
            }
            return oTrue
        }
};
function __firefox(){
    HTMLElement.prototype.__defineGetter__("runtimeStyle", __element_style);
    window.constructor.prototype.__defineGetter__("event", __window_event);
    Event.prototype.__defineGetter__("srcElement", __event_srcElement);
}
function __element_style(){
    return this.style;
}
function __window_event(){
    return __window_event_constructor();
}
function __event_srcElement(){
    return this.target;
}
function __window_event_constructor(){
    if(document.all){
        return window.event;
    }
    var _caller = __window_event_constructor.caller;
    while(_caller!=null){
        var _argument = _caller.arguments[0];
        if(_argument){
            var _temp = _argument.constructor;
            if(_temp.toString().indexOf("Event")!=-1){
                return _argument;
            }
        }
        _caller = _caller.caller;
    }
    return null;
}
if(window.addEventListener){
    __firefox();
}
//uedFoucs
function uedFoucs(Content,imgShowId, titShowId,dotShowId,arrLeftId, arrRightId,curOnclass,curOverclass, onEffect,onEvents,isAuto,autoInt) {
    this.Content = Content;
	this.imgShowId = imgShowId;
    this.titShowId = titShowId;
	this.dotShowId = dotShowId;
    this.arrLeftId = arrLeftId;
	this.arrRightId = arrRightId;
	this.curOnclass = curOnclass;
	this.curOverclass = curOverclass;
	this.onEffect = onEffect;
	this.onEvents = onEvents;
	this.isAuto = false;
	this.autoInt = 3;
	this.currentIndex = 0;
	this.opacity = 0;
	this.imgArr =[];
	this.titArr = [];
	this.dotArr = [];
	this.imgDotArr = [];
    if (!uedFoucs.childs) {
        uedFoucs.childs = []
    };
    this.ID = uedFoucs.childs.length;
    uedFoucs.childs.push(this);
	this.init = function(){
	    this.total = this.Content.length;
		this.imgShowDiv = uedCommon.fn.getEbyId(this.imgShowId);
	    this.titShowDiv = uedCommon.fn.getEbyId(this.titShowId);
	    this.dotShowDiv = uedCommon.fn.getEbyId(this.dotShowId);
		this.arrLeftObj = uedCommon.fn.getEbyId(this.arrLeftId);
	    this.arrRightObj = uedCommon.fn.getEbyId(this.arrRightId);
		for(i=0;i < this.total;i++){
			if(i==0){
				this.imgCurr = ' class="'+this.curOnclass.imgC+'"';
				this.titCurr = ' class="'+this.curOnclass.titC+'"';
				this.dotCurr = ' class="'+this.curOnclass.dotC+'"';
			}else{
				this.imgCurr = this.titCurr = this.dotCurr = '';
			}
			if(this.Content[i].img1 != '' && this.Content[i].img1 && this.imgShowDiv){
			  this.imgArr[i] = '<a href="'+this.Content[i].slink+'"'+this.imgCurr+' target="_blank"><img src="'+this.Content[i].img1+'" /></a>';
			  this.imgShowDiv.innerHTML += this.imgArr[i];
			}else{
			  this.imgArr[i] = "<a style='display:none'></a>";
			  this.imgShowDiv.innerHTML += this.imgArr[i];
			}
			if(this.Content[i].title != '' && this.Content[i].title && this.titShowDiv){
			  this.titArr[i] = '<a href="'+this.Content[i].slink+'"'+this.titCurr+' target="_blank">'+this.Content[i].title+'</a>';
			  this.titShowDiv.innerHTML += this.titArr[i];
			}else{
			  this.titArr[i] = "<a style='display:none'></a>";
			  this.titShowDiv.innerHTML += this.titArr[i];
			}
			if(this.Content[i].img2 != '' && this.Content[i].img2 && this.dotShowDiv){
				this.imgDotArr[i] = '<img src="'+this.Content[i].img2+'" />';
			}else{
				this.imgDotArr[i] = '';
			};
			if(this.dotShowDiv){
				this.dotArr[i] = '<a href="javascript:void(0)" hidefocus="true"'+this.dotCurr+' target="_self"><i>'+(i+1)+'</i>'+this.imgDotArr[i]+'</a>';
			    this.dotShowDiv.innerHTML += this.dotArr[i];
			}else{
				this.dotArr[i] = '<a style="display:none"></a>';
			    this.dotShowDiv.innerHTML += this.dotArr[i];
			};
		};
		uedCommon.fn.addEvent(this.imgShowDiv.parentNode, "mouseover", Function("uedFoucs.childs[" + this.ID + "].clearAuto()"));
		uedCommon.fn.addEvent(this.imgShowDiv.parentNode, "mouseout", Function("uedFoucs.childs[" + this.ID + "].autoPlays()"));
		for(i=0;i < this.total;i++){
		  uedCommon.fn.addEvent(this.dotShowDiv.getElementsByTagName("a")[i], this.onEvents, Function("uedFoucs.childs[" + this.ID + "].clickGo("+i+")"));
		}
		if(this.arrLeftObj){
		  uedCommon.fn.addEvent(this.arrLeftObj, "click", Function("uedFoucs.childs[" + this.ID + "].goPrev()"));
		}
		if(this.arrRightObj){
		  uedCommon.fn.addEvent(this.arrRightObj, "click", Function("uedFoucs.childs[" + this.ID + "].goNext()"));
		}
		if(this.isAuto){
			this.autoPlays();
		};
		this.imgArr = this.titArr = this.dotArr =this.imgCurr=this.titCurr=this.dotCurr= this.imgDotArr = null;
	};
	this.clickGo = function(n){
		for(i=0;i < this.total;i++){
			if(this.dotShowDiv.getElementsByTagName("a")[i] == this.dotShowDiv.getElementsByTagName("a")[n]){
			    if(this.onEffect){
				  this.showEffect();
				}
				this.imgShowDiv.getElementsByTagName("a")[i].className = this.curOnclass.imgC;
				this.titShowDiv.getElementsByTagName("a")[i].className = this.curOnclass.titC;
				this.dotShowDiv.getElementsByTagName("a")[i].className = this.curOnclass.dotC;
				this.currentIndex = i;
			}else{
				this.imgShowDiv.getElementsByTagName("a")[i].className = "";
				this.titShowDiv.getElementsByTagName("a")[i].className = "";
				this.dotShowDiv.getElementsByTagName("a")[i].className = "";
			}
		}
	};
	this.goPrev = function(){
		if(this.currentIndex > 0){
			this.currentIndex --;
		}else{
			this.currentIndex = this.total - 1;
		}
		this.clickGo(this.currentIndex);
	};
	this.goNext = function(){
		if(this.currentIndex < this.total-1){
			this.currentIndex ++;
		}else{
			this.currentIndex = 0;
		}
		this.clickGo(this.currentIndex);
	};
	this.showEffect = function(){
	if(this.opacity < 100){
	  this.opacity += 10;
	  this.imgShowDiv.style.filter = "alpha(opacity:"+this.opacity+")";
	  this.imgShowDiv.style.opacity = this.opacity / 100;
	  this.effectId = setTimeout('uedFoucs.childs[' + this.ID + '].showEffect()',50);
	}else{
	  clearTimeout(this.effectId);
	  this.opacity = 0;
	};
	};
	this.autoPlays = function(){
		if(this.isAuto){
			this.autoId = setInterval('uedFoucs.childs[' + this.ID + '].goNext()',this.autoInt*1000)
		}
	};
	this.clearAuto = function(){
		clearInterval(this.autoId);
	};
	
}
//uedScroll
function uedScroll(scrollContId, arrLeftId, arrRightId, dotListId, scrollSplit, dotSplit, sSliceIndex, sDir, nStep, nType) {
    this.scrollContId = scrollContId;
    this.arrLeftId = arrLeftId;
    this.arrRightId = arrRightId;
    this.dotListId = dotListId;
    this.scrollSplit = scrollSplit;
    this.dotSplit = dotSplit;
    this.sSliceIndex = sSliceIndex;
    this.sDir = sDir;
    this.nStep = nStep;
    this.nType = nType;
	this.pageIndex = 0;
    this.autoPlay = false;
    this.autoPlayTime = 4;
    this._state = "ready";
    this._endIndex = 0;
    this._forIndex = 0;
    this.nbuffer = 30;
	this.pageDot = [];
    this.stripDiv = document.createElement("DIV");
    this.listDiv01 = document.createElement("DIV");
    this.listDiv02 = document.createElement("DIV");
    if (!uedScroll.childs) {
        uedScroll.childs = []
    };
    this.ID = uedScroll.childs.length;
    uedScroll.childs.push(this);
    this.init = function() {
        this.scrollContObj = uedCommon.fn.getEbyId(this.scrollContId);
        this.listDiv01.innerHTML = this.listDiv02.innerHTML = this.scrollContObj.innerHTML;
        this.scrollContObj.innerHTML = "";
        this.scrollContObj.appendChild(this.stripDiv);
        this.stripDiv.appendChild(this.listDiv01);
        this.SplitObj = uedCommon.fn.getEbyClass(this.scrollContObj, this.scrollSplit.mytag, this.scrollSplit.myclass);
        this._endIndex = this.SplitObj.length;
		switch (this.sDir) {
        case 1:
            this.sDir = {
                ContObj: "scrollLeft",
                SplitObj: "offsetLeft"
            };
			this.mar = "marginLeft";
            this.stripDiv.style.width = "32766px";
            this.listDiv01.style.cssFloat = "left";
			this.listDiv02.style.cssFloat = "left";
            break;
        case 2:
            this.sDir = {
                ContObj: "scrollTop",
                SplitObj: "offsetTop"
            };
			this.mar = "marginTop";
            this.stripDiv.style.height = "32766px";
            break;
        };
        switch (this.nType) {
        case 1:
            this.leftEnd = function() {
                if (this.SplitObj.length % this.sSliceIndex != 0) {
                    var x = this.SplitObj.length % this.sSliceIndex;
                } else {
                    var x = this.sSliceIndex;
                }
                this.pageIndex = this.SplitObj.length - x;
                this.nStep = this.nYuanStep;
                this.nStep = this.nStep * 2;
                this.sGoTo = "next";
            };
            this.rightEnd = function() {
                this.pageIndex = 0;
                this.nStep = this.nYuanStep;
                this.nStep = this.nStep * 2;
                this.sGoTo = "prve";
            };
            break;
        case 2:
		    this._LoopCase();
            break;
		case 3:
		    this._LoopCase();
            break;
        default:
            break;
        };
        this.nYuanStep = this.nStep;
        uedCommon.fn.addEvent(this.scrollContObj, "mouseover", Function("uedScroll.childs[" + this.ID + "].stop()"));
        uedCommon.fn.addEvent(this.scrollContObj, "mouseout", Function("uedCommon.fn.realOut(uedScroll.childs[" + this.ID + "].scrollContObj,event,function(){uedScroll.childs[" + this.ID + "].play()})"));
        if (this.arrLeftId) {
            this.arrLeftObj = uedCommon.fn.getEbyId(this.arrLeftId);
            if (this.arrLeftObj) {
                uedCommon.fn.addEvent(this.arrLeftObj, "click", Function("uedScroll.childs[" + this.ID + "].clicks(1)"));

            }
        };
        if (this.arrRightId) {
            this.arrRightObj = uedCommon.fn.getEbyId(this.arrRightId);
            if (this.arrRightObj) {
                uedCommon.fn.addEvent(this.arrRightObj, "click", Function("uedScroll.childs[" + this.ID + "].clicks(2)"));
            }
        };
		if (this.dotListId) {
            this.dotListObj = uedCommon.fn.getEbyId(this.dotListId);
            if (this.dotListObj) {
				this.pageNum = Math.ceil(this._endIndex / this.sSliceIndex);
				this.dotMod = this.dotListObj.innerHTML;
				this.dotListObj.innerHTML = "";
				for(i=0;i<this.pageNum;i++){
					this.dotListObj.innerHTML += this.dotMod;
				};
				this.dotObj = uedCommon.fn.getEbyClass(this.dotListObj,this.dotSplit.mytag,this.dotSplit.myclass);
				var xy = 0;
				for(i=0;i<this.pageNum;i++){
					uedCommon.fn.addEvent(this.dotObj[i], this.Events, Function("uedScroll.childs[" + this.ID + "].pageTo("+xy+")"));
					this.pageDot.push(xy);
					xy += this.sSliceIndex;
					
				};
				this.dotObj[0].className = this.dotSplit.cur;
			    this.dotCurClass = function(){
					for(i=0;i<this.pageNum;i++){
						if(this.pageIn(i)){
							this.dotObj[i].className = this.dotSplit.cur;
						}else{
							if(this.dotSplit.offing){
							  this.dotObj[i].className = this.dotSplit.offing;
							}else{
							  this.dotObj[i].className = "";
							}
						};
					}
				};
            }
        };
        this.play();
    };
	this._LoopCase = function(){
	  this._forIndex = this.sSliceIndex;
            this.stripDiv.appendChild(this.listDiv02);
            this.SplitObj = uedCommon.fn.getEbyClass(this.scrollContObj, this.scrollSplit.mytag, this.scrollSplit.myclass);
			this.leftEnd = function() {
				if(this.pageIndex-this.sSliceIndex<0 && this.pageIndex != 0){
				  this.pageIndex = this._endIndex - (this.pageIndex-this.sSliceIndex);
				}else{
				  this.pageIndex = this._endIndex;
				};
                this.nStep = this.nYuanStep;
                this.scrollContObj[this.sDir.ContObj] = this.SplitObj[this.pageIndex][this.sDir.SplitObj];
                this.pageIndex = this.pageIndex - this.sSliceIndex;
                this.sGoTo = "prve";
            };
            this.rightEnd = function() {
                if (this.pageIndex >= this._endIndex) {
                    if (this._endIndex % this.sSliceIndex != 0 && this.pageIndex!=this._endIndex) {
                        var x = this._endIndex % this.sSliceIndex;
                    } else {
                        var x = this.sSliceIndex;
                    }
                    if (this._forIndex <= 0 || this._forIndex-x <= 0) {
                        this._forIndex = 0;
                    } else {
                        this._forIndex -= x
                    }
                    this.scrollContObj[this.sDir.ContObj] = this.SplitObj[this._forIndex][this.sDir.SplitObj];
                    this.pageIndex = this._forIndex;
                    if (this._forIndex <= 0) {
                        this._forIndex = this.sSliceIndex;
                    }
                }
            }
	};
    this.clicks = function(n) {
		if (this.nType == 3) {}
	    else{
		      if (this._state != "ready") {
                  return;
                }
		 }
		clearInterval(this._autoTimeObj);
        if (n == 1) {
            if (this.pageIndex <= 0 || (this.pageIndex-this.sSliceIndex<0 && this.pageIndex != 0) ) {
                this.leftEnd();
            } else {
                this.pageIndex -= this.sSliceIndex;
                this.nStep = this.nYuanStep;
                this.sGoTo = "prve";
            }
        } else if (n == 2) {
            if (this.pageIndex + this.sSliceIndex >= this.SplitObj.length) {
                this.rightEnd();
            } else {
                this.pageIndex += this.sSliceIndex;
                this.nStep = this.nYuanStep;
                this.sGoTo = "next";
            }
        };
		this._state = "floating";
		if(this.dotCurClass){this.dotCurClass();}
        this._scrollTimeObj = setInterval("uedScroll.childs[" + this.ID + "]." + this.sGoTo + "(" + (this.pageIndex) + "," + this.nStep + ",{ContObj:'" + this.sDir.ContObj + "',SplitObj:'" + this.sDir.SplitObj + "'})", 10)
    },
    this.prve = function(nIndex, nStep, sDir) {
		if(isNaN(parseInt(uedCommon.fn.getStyle(this.SplitObj[nIndex],this.mar)))){
		  var y = 0;
		}else{
		  var y = parseInt(uedCommon.fn.getStyle(this.SplitObj[nIndex],this.mar));
		}
		var x = this.SplitObj[nIndex][sDir.SplitObj] - y;
        if (this.scrollContObj[sDir.ContObj] > x) {
            if (Math.ceil(this.scrollContObj[sDir.ContObj] - this.SplitObj[nIndex][sDir.SplitObj]) <= this.nbuffer) {
                this.scrollContObj[sDir.ContObj]--;
            } else {
                this.scrollContObj[sDir.ContObj] -= nStep;
            }
        } else {
            clearInterval(this._scrollTimeObj);
            this._state = "ready"
			this.play();
			
        }
    };
    this.next = function(nIndex, nStep, sDir) {
		if(isNaN(parseInt(uedCommon.fn.getStyle(this.SplitObj[nIndex],this.mar)))){
		  var y = 0;
		}else{
		  var y = parseInt(uedCommon.fn.getStyle(this.SplitObj[nIndex],this.mar));
		}
		var x = this.SplitObj[nIndex][sDir.SplitObj] - y;
        if (this.scrollContObj[sDir.ContObj] < x) {
            if (Math.ceil(this.SplitObj[nIndex][sDir.SplitObj] - this.scrollContObj[sDir.ContObj]) <= this.nbuffer) {
                this.scrollContObj[sDir.ContObj]++;
            } else {
                this.scrollContObj[sDir.ContObj] += nStep;
            }
        } else {
            clearInterval(this._scrollTimeObj);
            this._state = "ready";
            if (this.nType == 2 || this.nType == 3) {
                this.rightEnd();
            };
			this.play();
        }
    };
	this.pageTo = function(n){
		if (this.nType == 3) {}
	    else{
		      if (this._state != "ready") {
                  return;
                }
		 }
		clearInterval(this._autoTimeObj);
		this.pageIndex = n;
		if (this.scrollContObj[this.sDir.ContObj] > this.SplitObj[n][this.sDir.SplitObj]){
		  var x ="prve"
		}else{
		  var x ="next"
		};
		this._state = "floating";
		if(this.dotCurClass){this.dotCurClass();}
        this._scrollTimeObj = setInterval("uedScroll.childs[" + this.ID + "]." + x + "(" + (this.pageIndex) + "," + this.nStep + ",{ContObj:'" + this.sDir.ContObj + "',SplitObj:'" + this.sDir.SplitObj + "'})", 10)
	};
	this.pageIn = function(n){
		var x = this.pageDot[n] - this.sSliceIndex;
		if(x < 0){x = 0};
		if(this.pageIndex >= this._endIndex){
		  y = this.pageIndex - this._endIndex;
		}else{
		  y = this.pageIndex;
		}
		if(y>x && y <= this.pageDot[n] || (y==0 && y==this.pageDot[n])){
			return true;
		}else{return false;}
	};
    this.play = function() {
        if (!this.autoPlay) {
            return;
        };;
		if (this.nType == 3) {}
	    else{
		      if (this._state != "ready") {
                  return;
                }
		 }
        this._autoTimeObj = setInterval("uedScroll.childs[" + this.ID + "].clicks(2)",this.autoPlayTime*1000)
    };
    this.stop = function() {
        if (this.nType == 3) {}
	    else{
		      if (this._state != "ready") {
                  return;
                }
		 }
            clearInterval(this._autoTimeObj);
			if (this.nType == 3) {
			  clearInterval(this._scrollTimeObj);
			};
    };
};
//uedTabCard
function uedTabCard(tabBtnId,tabBtnTag,tabBtnClass,curBtnStyle,tabBodyId,tabBodyTag,tabBodyClass,onEvent,curIndex,scrollFrom) {
	this.tabBtnId = tabBtnId;
	this.tabBtnTag = tabBtnTag;
	this.tabBtnClass = tabBtnClass;
	this.curBtnStyle = curBtnStyle;
	this.tabBodyId = tabBodyId;
	this.tabBodyTag = tabBodyTag;
	this.tabBodyClass = tabBodyClass;
	this.onEvent = onEvent;
	this.curIndex = curIndex;
	this.scrollFrom = scrollFrom;
	if (!uedTabCard.childs) {
        uedTabCard.childs = []
    };
    this.ID = uedTabCard.childs.length;
    uedTabCard.childs.push(this);
	this.init = function() {
        var tabBtnObj = uedCommon.fn.getEbyId(this.tabBtnId);
		var tabBodyObj = uedCommon.fn.getEbyId(this.tabBodyId);
        this.tabBtnArr = uedCommon.fn.getEbyClass(tabBtnObj, this.tabBtnTag, this.tabBtnClass);
        this.tabBodyArr = uedCommon.fn.getEbyClass(tabBodyObj, this.tabBodyTag, this.tabBodyClass);
		for(i=0;i<this.tabBtnArr.length;i++){
			uedCommon.fn.addEvent(this.tabBtnArr[i], this.onEvent, Function("uedTabCard.childs[" + this.ID + "].tab("+i+")"));
		};
		this.tab(this.curIndex);
	};
	this.tab = function(n){
	  for(i=0;i<this.tabBtnArr.length;i++){
		  if(i == n){
			 this.tabBtnArr[i].className = this.curBtnStyle.curClass; 
			 this.tabBodyArr[i].style.display = "";
			 if(typeof(uedScroll) != "undefined" && typeof(this.scrollFrom) != "undefined" && !isNaN(this.scrollFrom)){
			   if(typeof(uedScroll.childs[i+this.scrollFrom]) != "undefined"){
				 clearInterval(uedScroll.childs[i+this.scrollFrom]._autoTimeObj);
				 clearInterval(uedScroll.childs[i+this.scrollFrom]._scrollTimeObj);
				 uedScroll.childs[i+this.scrollFrom].autoPlay = true;
			     uedScroll.childs[i+this.scrollFrom].play();
			   }
			 }
		  }else{
			  if(this.curBtnStyle.offClass){
				  var btnOff = this.curBtnStyle.offClass;
			  }else{
				  var btnOff = "";
			  };
			 this.tabBtnArr[i].className = btnOff; 
			 this.tabBodyArr[i].style.display = "none";
			 if(typeof(uedScroll) != "undefined" && typeof(this.scrollFrom) != "undefined" && !isNaN(this.scrollFrom)){
			   if(typeof(uedScroll.childs[i+this.scrollFrom]) != "undefined"){
			     uedScroll.childs[i+this.scrollFrom].autoPlay = false;
			     uedScroll.childs[i+this.scrollFrom].stop();
			  }
			 }
		  }
	  };
	};
};
/*  |xGv00|0ec59393215118cd5cb1c6a4ac33c51d */