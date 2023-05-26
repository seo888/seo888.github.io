/**
 * @author  wangfengquan
 * @date  2016-05-13
 * @description 用于前端的音频播放插件
 */
function covertAudio(){
    $('audio[data-audio-play]').each(function(index, el) {
        var $this = $(this);
        var isFirst = true;

        $(this).wrap('<div class="audio-box"></div>');
        $(this).hide();

        addEvent($this[0],'loadedmetadata',function(){
            if(isFirst){
                $(this).parent().append(
	                 '<span class="play-btn"></span>'
	                +'<span class="audio-progress">'
	                +	'<i class="audio-progress-bar"></i>'
	                +'</span>'
	                +'<span class="currentTime">-&nbsp;'+formatAudioTime(this.duration)+'</span>'
                );
                audioEventList($this);
                isFirst = false;
            }
        },false);
        //加载出错时隐藏播放器
        $(this).error(function(){
            $(this).parent().hide();
        });
        //保证上面绑定的事件能够触发
        $(this).attr("src",$(this).attr("src")+"?"+new Date().getTime());
    });
}

/**
 * @param  audio对象
 * @description 给每一个音频添加事件
 */
function audioEventList($this){

    var $barBox = $this.parent();
    var $barBoxW = $barBox.find('.audio-progress').width();
    var $bar = $barBox.find('.audio-progress-bar');
    var timeid = null;

    //给音频播放按钮加事件
    $barBox.on('click',function(){
        self = $(this).find('.play-btn');
        audioDraw(self);
        self.toggleClass('audio-playing');
        (self.hasClass('audio-playing'))?$this[0].play():$this[0].pause();
    });

    //音频播放动画
    function audioDraw(ele,type){
        if(timeid&&(ele.hasClass('audio-playing') || type)){
            clearInterval(timeid);
            timeid = null;
            handle(0);
            return;
        }
        var state = 0;
        timeid = setInterval(function(){
            state = state === 0 ? 4 : state - 2;
            handle(state);
        },700);
        function handle(type){
            ele.css("background-position","0 -" + type + "0px");
        }
    }

    //监测音频对象的状态
    addEvent($this[0],'timeupdate',timeupdate,false);
    addEvent($this[0],'ended',playEnd,false);

    function timeupdate(){
        var totalDuration = Math.round(this.duration);
        var progress = Math.round(this.currentTime)/totalDuration.toFixed(3);
        var time = formatAudioTime(totalDuration-this.currentTime);
        
        $barBox.find('.currentTime').html('-&nbsp;'+time);
        $bar.width(progress*$barBoxW);
    }

    function playEnd(){
        ele = $(this).parent().find('.play-btn');
        ele.removeClass('audio-playing');
        audioDraw(ele,1);
    }

}

/**
 * @param  时间戳 单位 s
 * @return string 格式为 HH:MM:SS || MM:SS
 */
function formatAudioTime(t){
    var isHour = (t/3600) >= 1;
    var h = (isHour && toDub(parseInt(t/3600))+':') || '';
    t = (isHour && t/3600) || t;
    var m = parseInt(t/60);
    var s = parseInt(t%60);
    return h+(toDub(m)||'00')+':'+toDub(s);
}

/* 数字补零函数
 * @param n => number
 * return number
 */
function toDub(n){
    n = Math.round(n);
    return n<10?'0'+n:''+n;
}

/* 自定义注册事件函数
 * @param obj => 要注册的事件的对象，
 * @param ev => 要绑定的事件类型，
 * @param fn => 事件执行函数，
 * @param bool => 是否取消事件冒泡。 
 */
function addEvent(obj,ev,fn,bool){
    if(window.addEventListener){
        obj.addEventListener(ev,fn,bool);
    }else{
        obj.attatchEvent('on'+ev,fn,bool);
    }
}
covertAudio();

