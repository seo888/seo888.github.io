
(function(){function magicCube(){this.schedule=[];this.date=new Date();this.year=this.date.getFullYear();this.month=this.date.getMonth();this.day=this.date.getDate();var month=this.month+1;month=month>9?month:'0'+parseInt(month);var day=this.day;day=day>9?day:'0'+parseInt(day);this.daytime=parseInt(this.year+''+month+''+day);}
magicCube.prototype.init=function(obj){if(typeof obj=='object')
{this.schedule=obj;}}
magicCube.prototype.write_ad=function(param,callback){var results=[];try{if(typeof param=='string'){if(this.schedule[this.daytime][param]['type']=='iframe')
{var iframes='<iframe src="';iframes+=this.schedule[this.daytime][param]['src'];iframes+='" frameborder="0" scrolling="no" width="';iframes+=this.schedule[this.daytime][param]['width'];iframes+='" height="';iframes+=this.schedule[this.daytime][param]['height'];iframes+='"></iframe>';document.write(iframes);if(typeof callback=='function'){callback({'status':1});}
return;}}
if(typeof callback=='function'){callback({'status':0});}}catch(e){}
return results;};var magicFunc=new magicCube();window.magicCubeFunc=magicFunc;})();magicCubeFunc.init([]);