/* ��Ч�ű����� http://js.itobe.cn */
var myFocus={
 $:function(id){return document.getElementById(id);},
 $$:function(tag,obj){return (typeof obj=='object'?obj:this.$(obj)).getElementsByTagName(tag);},
 style:function(obj,style){return (+[1,])?window.getComputedStyle(obj,null)[style]:obj.currentStyle[style];},//getStyle�򻯰�
 easeOut:function(t,b,c,d){return -c*((t=t/d-1)*t*t*t - 1) + b;},
 move:function(obj,prop,val,type,spd,fn){//�˶�������spdΪ�˶���Ҫ��ʱ�䣬ʱ��Խ���ٶ�ԽС
  var t=0,b=parseInt(this.style(obj,prop)),c=val-b,d=spd||50,st=type,m=c>0?'ceil':'floor';
  if(obj[prop+'Timer']) clearInterval(obj[prop+'Timer']);
  obj[prop+'Timer']=setInterval(function(){
   if(t<d){obj.style[prop]=Math[m](myFocus[st](++t,b,c,d))+'px';}
   else {clearInterval(obj[prop+'Timer']);fn&&fn.call(obj);}
  },10);return this;
 },
 addList:function(obj,cla,x){//����HMTL,claΪ�б��class,���з�װ��:cla='txt'(����alt����),cla='num'(���ɰ�ť����),cla='thumb'(����Сͼ)
  var s=[],n=x||this.$$('li',this.$$('ul',obj)[0]).length,num=cla.length;
  for(var j=0;j<num;j++){
   s.push('<ul class='+cla[j]+'>');
   for(var i=0;i<n;i++){s.push('<li>'+(cla[j]=='num'?(i+1):(cla[j]=='txt'?this.$$('li',obj)[i].innerHTML.replace(/\<img.*?\>/i,this.$$('img',obj)[i].alt):(cla[j]=='thumb'?'<img src='+(this.$$('img',obj)[i].getAttribute("thumb")||this.$$('img',obj)[i].src)+' />':'')))+'<span></span></li>')};
   s.push('</ul>');
  }; obj.innerHTML+=s.join('');
 },
 setting:function(par){
  if(window.attachEvent){window.attachEvent('onload',function(){myFocus[par.style](par)});}
����  else{window.addEventListener('load',function(){myFocus[par.style](par)},false);}
 },
 mF_liuzg:function(par){
  var box=this.$(par.id),boxH=box.offsetHeight,t=par.time*1000;
  this.addList(box,['txt-bg','txt','num']);
  var pic=this.$$('li',this.$$('ul', box)[0]),n=pic.length;
  var c=boxH%par.chip?8:par.chip,h=boxH/c,pics=[];
  for(var i=0;i<c;i++){
   pics.push('<li><p>')
   for(var j=0;j<n;j++) pics.push(pic[j].innerHTML);
   pics.push('</p></li>')
  }
  this.$$('ul', box)[0].innerHTML=pics.join('');
  var ul=this.$$('ul',box),txt=this.$$('li',ul[2]),btn=this.$$('li',ul[3]),pic=this.$$('li',ul[0]);
  for(var i=0;i<c;i++){//��ʼ����ʽ����
   this.$$('p',pic[i])[0].style.top=-i*h+'px';
   pic[i].style.height=h+'px';
   this.$$('p',pic[i])[0].style.height=boxH*c+'px';
  }
  var index = 0;//��ʼ��ʾ�����
  box.removeChild(this.$$('div',box)[0]);
  var run = function(idx) {
   var tt=par.type==4?Math.round(1+(Math.random()*(3-1))):par.type;//Ч��ѡ��
   btn[index].className = '';
   txt[index].style.display='none';
            if(index==n-1) index=-1;
   var N=idx!=undefined?idx:index+1;
   var spd=tt==2?20:(tt==1?80:Math.round(20+(Math.random()*(80-20))));
   for(var i=0;i<c;i++){
    if(tt==3) spd=Math.round(20+(Math.random()*(80-20)));
    myFocus.move(myFocus.$$('p',pic[i])[0],'top',-N*c*h-i*h,'easeOut',spd);
    spd=tt==2?spd+10:(tt==1?spd-10:spd);
   }
   btn[N].className = 'current';
   txt[N].style.display='block';
            index = N;
        }
  run(index);
  var auto=setInterval(function(){run()},t);
  for (var j=0;j<n;j++){
   btn[j].j=j;
   btn[j].onclick=function(){if(!this.className) run(this.j)}
  }
  box.onmouseover=function(){clearInterval(auto);}
     box.onmouseout=function(){auto=setInterval(function(){run()},t);}
  for(var i=0,lk=this.$$('a',box),ln=lk.length;i<ln;i++) lk[i].onfocus=function(){this.blur();}//ȥ�����߿�
 }
};
myFocus.setting({
 style:'mF_liuzg',//styleΪ�����ʽ��
 id:'myFocus',//����ͼID
 chip:1,//ͼƬ��Ƭ�������ܱ�����ͼ�ĸ���������Ч��Ĭ��Ϊ8Ƭ
 type:3,//��ƬЧ����1Ϊ˦ͷ��2Ϊ˦β��3Ϊ���ң�4Ϊ���Ч��
 time:4//ÿ֡ͼƬʱ����
});