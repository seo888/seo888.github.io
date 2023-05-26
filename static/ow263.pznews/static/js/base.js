(function(e){
    e.fn.tabBlock = function(t) {
        return t = e.extend({
            tab: ".tab-title",
            content: ".tab-content",
            triggerEvent: "hover"
        }, t || {}), this.each(function() {
            var n = e(this), r = n.find(t.tab).children(), i = n.find(t.content).children(), s, o, u, f;
            t.triggerEvent == "hover" ? r.hover(function() {
                s = e(this), u = s.index(), o = i.eq(u), f = setTimeout(function() {
                    s.addClass("current").siblings().removeClass("current"), o.addClass("current").siblings().removeClass("current");
                }, 50);
            }, function() {
                clearTimeout(f);
            }) : r.bind(t.triggerEvent, function() {
                s = e(this), u = s.index(), o = i.eq(u), s.addClass("current").siblings().removeClass("current"), o.addClass("current").siblings().removeClass("current");
            });
        });
    };
})(jQuery);

(function($){
    window.info={

        open : function(options){
            options = options ? options : {};

            /*remove*/
            $('.info-message').remove();

            var _msgClass='',
                _ie6style='',
                _position = ['top', 'middle', 'bottom'],
                _type =['success', 'warning', 'error', 'loading'],
                _scrollTop;


            if( options.position && $.inArray(options.position, _position)){
                _msgClass="info-message-"+options.position;
            }else{
                _msgClass="info-message-"+_position[0];
            }

            if( options.type &&  $.inArray(options.type, _position) ){
                _msgClass += " info-message-"+options.type;
            }else{
                _msgClass += " info-message-"+_type[0];
            }


            if(options.nopadding){
                _msgClass += " nopadding"
            }
            if($.browser.version=="6.0"){
                //_bodyHeight = $(document.body)[0].clientHeight;
                _scrollTop = document.documentElement.scrollTop + 100;
                _ie6style ='style="top:'+_scrollTop+'px"';
            }
            var suc = '<div class="info-message clearfix '+_msgClass+'"'+_ie6style+'><span class="icon"></span><div class="info-main">'+options.message+'</div></div>';
            $('body').append(suc);
            if( options.func &&  typeof options.func == 'function' ){
                options.func();
            }
            if(	options.autoClose  || options.autoClose != false ){
                $('.info-message').delay(2000).hide(0,function(){
                    $('.info-message').remove();
                });
            }

            /*dblclick self close */
            $('.info-message').dblclick(function(){
                $(this).remove();
            })
        },
        close:function(){
            $('.info-message').remove();
        }




    }
})(jQuery);

var m2oCont_has_comment = 0;
 function web_get_title_attr(data)
 {
	 var tcolor = data['tcolor'];
	 var isbold = data['isbold'];
	 var isitalic = data['isitalic'];
	 var style  = ' style="';
	 if (tcolor && tcolor != '#000')
	 {
	 	style =  style + 'color:' + tcolor + ';';
	 }
	 if (isbold)
	 {
	 	style =   style + 'font-weight:bold;';
	 }
	 if (isitalic)
	 {
	 	style =   style + 'font-style:italic;';
	 }
	 style =   style + '"';
	 return style;
 }
 
 function web_get_pic_url(data,var_pic_width,var_pic_height)
 {
 	if (data)
	{
		var_pic_width = parseInt(var_pic_width);
		var_pic_height = parseInt(var_pic_height);
		var url = data['host'] + data['dir'];
		if (var_pic_width)
		{
			url = url + var_pic_width + 'x' + var_pic_height + '/';
		}
		return url + data['filepath']  + data['filename'];
	}
	else
	{
		return '';
	}
 }
/*comment add、replay、share...*/
function commentAdd(obj, options){
	if (!options)
	{
		options = {};
	}
    var sendbtn= $(obj).find(".submit"),
        cval= obj.content.value,
        jqcontent= $(obj).find(".textarea"),
        actionurl = $(obj).attr("action"),
        ajaxdata;

    if( cval == '')
    {
        commentInfo({"obj" : obj,"message" : "请填写内容！",	"type" : "error", "delay" : 2000});
        obj.content.focus();
        return false;
    }
    //send data ...
    sendbtn.attr("disabled", true);
    commentInfo({"obj" : obj,"message" : "正在提交","type" : "loading"});

    ajaxdata=m2oContentInfo;
    ajaxdata.access_token=$('#access_token').val();
    if (!ajaxdata.content_url)
    {
		ajaxdata.content_url=$('#url').val();
    }   
    if (!ajaxdata.content_title)
    {
		ajaxdata.content_title=$('#title').val();
    }
    ajaxdata.content=cval;
    options.target= options.target ? options.target :  "#cmtlist";
    $.ajax({
        url : actionurl,
        data : ajaxdata,
        timeout : 15000,
        dataType : "json",
        type:'POST',
        success:function(data){
            //console.log(data.length);
            if (data.ErrorCode)
            {
            	var msg = data.ErrorText || data.ErrorCode;
                commentInfo({"obj" : obj,"message" : msg,"type" : "error"});
                sendbtn.attr("disabled", false).addClass("disabled");
                return;
            }
            if(data.error || !data.length){
                commentInfo({"obj" : obj,"message" : "评论失败","type" : "error"});
                sendbtn.attr("disabled", false).addClass("disabled");
            }else{
            	data = data[0];
            	if (m2oCont_has_comment == 0)
            	{
            		$(options.target).html('');
            	}
            	m2oCont_has_comment = 1;
                if(data.state===1){
                    commentInfo({"obj" : obj,"message" : "评论成功","type" : "success", "delay" : 2000});
					$("#tpl_commentlist").tmpl(data).prependTo(options.target);
                }else{
                    commentInfo({"obj" : obj,"message" : "评论需要审核后显示","type" : "success", "delay" : 2000});
					$("#tpl_commentlist").tmpl(data).prependTo(options.target);
                }
            }
            jqcontent.val("");
        },
        fail:function(){
            //console.log("fail");
            commentInfo({"obj" : obj,"message" : "系统忙,请重试!","type" : "error", "delay" : 2000});
            sendbtn.attr("disabled", false);
        },
        error:function(jqXHR, textStatus, errorThrown){
            //console.log("error");
            commentInfo({"obj" : obj,"message" : textStatus ,"type" : "error", "delay" : 2000});
            sendbtn.attr("disabled", false);
            //console.log(typeof errorThrown);
        },
        complete : function(){
            //console.log("complete");
        }
    });
    return false;
}

function commentInfo(options){
    options.obj = options.obj ? options.obj : "body";
    options.delay =  options.delay ? options.delay : 5000;
    if(options.action=="hide"){
        $(options.obj).slideUp();
    }else{
        $(options.obj).find(".cmt-info").html(options.message);
        $(options.obj).find(".cmt-info").attr("class", "cmt-info").addClass(options.type).stop(true, true).dequeue().slideDown().delay(options.delay).slideUp();
    }
}

function loadComment(options, first){
    var laoddata;
    laoddata=m2oContentInfo;
    laoddata.need_count=1;
    laoddata.need_member_info=1;
    laoddata.count=options.count?options.count:10;
    laoddata.offset = $("#cmtload").attr("data-start") ?  $("#cmtload").attr("data-start") : options.offset ? options.offset : 0;

    options.target= options.target ? options.target :  "#cmtlist";
    options.loading= options.loading ? options.loading :  "#cmtload";

    if($("#cmtload").attr("data-loading")){
        return ;
    }

	if (first)
	{
		$(options.target).html('');
	}
    //get comment list
    $("#cmtload").show().attr("data-loading", "loading").addClass("loading");
    $.ajax({
        type : 'post',
        dataType : 'json',
        url :  options.action,
        data : laoddata ,
        success:function(data){
			if (data.total > 0)
			{
				m2oCont_has_comment = 1;
			}
            if(data.total<10){
                $("#cmtload").hide();
            }
            if(!data||data==''){
                $("#cmtload").val("暂无评论");
            }else{
                $("#pls").text( data.total);

                if(data.total<10){
                    $("#cmtload").hide();
                }

                if(data.data.length<6){
                    $("#cmtload").hide();
                }
                $.each(data.data,function(index, item){
                    item.username = item.author ? item.author : item.username ;
                    item.username  = (item.username == "模板")　?　'网友' : item.username ;
                    //item.avatar = item.avatar ? item.avatar : "http://www.zjmc.tv/t/1/3/images/avatar.png";
                    if(item.member_info){
                        var _this=item.member_info.avatar;
                        item.avatar=_this.host+_this.dir+_this.filepath+_this.filename;
                    }else{
                        item.avatar ="";
                    }
					$("#tpl_commentlist").tmpl(this).appendTo(options.target);
                });
            }
            $(".cmt-total").html(data.total);
            var size = $(options.target).children().size();

            $("#cmtload").attr("data-loading", '').removeClass("loading").attr("data-start", size);
        }
    });
}


/*emotion*/
function emotionInit(){
    var emotion_mood ,
        emotion_total = 0,
        emotion_percent = 0,
        emotion_id = $('#cmid').val();

    $.ajax({
        url : '/m2o/webapp/webapp.php',
        data : {'id' : emotion_id},
        dataType:"json",
        timeout: 5000,
        success: function(data){
            emotion_mood = data[0].mood;

            if(!emotion_mood){return;}

            $.each(emotion_mood, function(index, value){
                emotion_total += value;
                $("#emotion .emotion-" + index + " a").attr("data-value", value);
            });
            $("#emotion").attr('data-total', emotion_total);
            emotionAnimate();

        },
        error : function(){}
    });
}

function emotionAnimate(){
    var emotion_total = $("#emotion").attr('data-total'),
        emotion_percent = 0,
        emotion_value=0;
    $("#emotion li").each(function(){
        emotion_value = $(this).find('a').attr('data-value');
        if(!emotion_value){return false;}
        emotion_percent = Math.round(emotion_value/emotion_total*1000)/10;
        $(this).find("span").html(emotion_percent + "%");
        $(this).find(".cBg").animate({
            height : (100-emotion_percent) + "%"
        }, 500);
    })
}

function dingInit(){
    var ding_id = $("#m2oDing").attr('data_cmid'),
        ding_data = null;

    if(m2oContentInfo && m2oContentInfo.pub == 0)
    {
        var postdata = {cid : ding_id, app_uniqueid : m2oContentInfo.app_uniqueid};
    }
    else
    {
        var postdata = {id : ding_id};
    }


    $.ajax({
        url : '/m2o/webapp/webapp.php',
        data : postdata,
        dataType : 'json',
        timeout : 5000,
        success : function(data){
            ding_data = data[0];
            if(ding_data.up){ $("#m2oDing .dc_up span").html(ding_data.up); }
            if(ding_data.down){ $("#m2oDing .dc_down span").html(ding_data.down); }
        }
    })
}



/*vote*/
function m2oVoteInit(options){
    var votestr='',
        voteresult='',
        voteprecent = 0,
        voterand = 1,
        votetype = 'radio';

    $.ajax({
        url : '/m2o/vote.php',
        data : {id : options.id, d_return : '1'},
        dataType : 'json',
        success : function(data){
            voteresult = '<div class="vote_result"><ul class="vt_ul">';
            votestr += '<form name="m2ovote"  class="vote-form" method="post"  action="/m2o/voting.php"><input type="hidden" name="vote_id" value="'+options.id+'" />';
            if(!data.option_title){return false;}
            if(data.option_type == '2'){
                votetype = "checkbox"
            }
            votestr += '<ul data-max="'+ data.max_option+'" data-min="'+ data.min_option+'">';
            $.each(data.option_title, function(index, item){
                voteprecent = Math.round((item.single_total / data.question_total * 1000)) / 10;
                voterand = Math.floor(Math.random()*9+1);
                votestr += '<li><input type="'+votetype +'" value="'+ item.id +'" id="single_total_'+ item.id +'" name="single_total">'+ item.title +'</li>' ;
                voteresult += '<li><div class="vote-option-li">'+ item.title + ':</div> <div class="vote-option-outer-box"><div class="vote-option-inner-box vote-option-color'+ voterand +'" style="width:' + voteprecent + '%;"></div></div> <div class="vote-option-text-box">(' + voteprecent +  '%)<span>' + item.single_total + ' 票</span></div></li>';

            });
            votestr += '</ul><div class="vote-action"><input type="submit" value="投票" class="vote-submit" /><a href="/vote/index.php?id='+ data.id +'"  class="vote-view">查看</a></div><!--<div class="vote-random">可选('+ data.min_option +', ' + data.max_option +')项</div>--></form>';
            voteresult += '</ul><div class="tpbtnbg"><input type="button" value="返回投票" onclick="showVoteForm();" class="vote-question-back"/></div></div>';
            if(options.success=="1"){
                votestr = '';
            }
            votestr = '<h3>' + data.title + '</h3>' + voteresult + votestr  + '<div class="vote-total">已<span>' + data.vote_total +'</span>人参与</div>';
            $(options.append).append(votestr);
        }

    })
}

/*zhengfang*/
function zhengfangInit(options){
    $.ajax({
        url : '/m2o/vote.php',
        data : {id : options.id, d_return : '1'},
        dataType : 'json',
        timeout : 5000,
        success : function(data){

            if(!data.option_title){return false;}

            $(options.ns + ' .m2o-zhengfang-zheng').html(data.option_title[0].single_total);
            $(options.ns + ' .m2o-zhengfang-fang').html(data.option_title[1].single_total);
        }
    })
}
function zhengfang(id, single, obj){

    if($(obj).parents('.m2o-zhengfang').hasClass('disabled')){return false;}

    $(obj).parents('.m2o-zhengfang').addClass('disabled');

    $.ajax({
        url : '/m2o/voting.php',
        data : {vote_id : id, single_total : single},
        success : function(html){
            if(html.indexOf('success=1')>0){
                $(obj).parent().find('.m2o-zhengfang-num').html(parseInt($(obj).parent().find('.m2o-zhengfang-num').html(), 10) + 1);
            }else{
                $(obj).html('失败').delay(1000).html('');
            }
        },
        error : function(){
            $(obj).parents('.m2o-zhengfang').removeClass('disabled');
        }
    })

}


function updateStatus(state, obj){
    var _user_id, _user_name, _user_avatar, _user_data ={}, _user_referurl= false;
    if(state != "init"){
        _user_data =  {'member_name':obj.find('input[name=member_name]').val(),'password':obj.find('input[name=password]').val()};
    }
    if(obj && obj.find('input[name="referurl"]').val() != ""){
        _user_referurl = obj.find('input[name="referurl"]').val();
    }
    $.ajax({
        type: "POST",
        url: "/m2o/login.php",
        data: _user_data,
        dataType : "json",
        success: function(data){
            if(state != "init"){
                if(data.state == '2'){
                    alert("登陆失败，请检查用户名密码");
                }
            }
            if(data.state == '1'){
                _user_id = data.user.member_id;
                _user_name = data.user.member_name;
                _user_avatar = data.user.avatar.host + data.user.avatar.dir + data.user.avatar.filepath + data.user.avatar.filename;
                $('.m2o-user-login').hide();
                $('.m2o-user-success').html('欢迎' + data.user.member_name + '<a href="javascript:void(0);" class="m2o-logout" data-avatar="'+_user_avatar+'" data-id="'+_user_id+'" onclick="m2ologout()">退出</a>').show().data('success', 'success');
                $('.m2o-user-login input[name="member_name"]').val('');
                $('.m2o-user-login input[name="password"]').val('');
                if(_user_referurl){
                    setTimeout(function(){window.location.href=_user_referurl;},2000);
                }
            }
        },
        error : function(){
            //alert('Ajax Request Error!');
        }
    });
}
function m2ologout(){
    $.ajax({
        type: "POST",
        url: "/m2o/logout.php",
        dataType : "json",
        success: function(data){
            if(data.state == '1'){
                $('.m2o-user-login').show();
                $('.m2o-user-success').hide().data('success', ''); ;
            }
        },
        error : function(){
            //alert('Ajax Request Error!');
        }
    });
}



(function($){
    window.dialog={
        init:function(){
            $('body').append('<div class="ui-dialog-overlay" onclick="dialog.close();"></div>');
            if($.browser.version=="6.0"){
                $(".ui-dialog-overlay").css({
                    "height":$(document.body)[0].clientHeight,
                    "width":$(document.body)[0].clientWidth
                });
            }
            $('body').append('<div class="ui-dialog-box" id="ui-dialog"><div class="ui-dialog-panel"><h3 class="ui-dialog-title"></h3><a href="javascript:void(0);" onclick="dialog.close();" class="ui-dialog-close">×</a><div class="ui-dialog-main"></div></div></div>');
            this.initialization=true;
        },
        resize:function(obj, height){
            $(obj).css({
                "marginTop": -height/2 +'px'
            });
            if($.browser.version=="6.0"){
                $(obj).css({
                    "top" : document.documentElement.scrollTop,
                    "marginTop" : height/2 +'px'
                });
            }
            $("#ui-dialog").show();
        },
        show:function(options){
            if(!this.initialization){this.init();}
            if(this.oid && this._clone){ $('body').append(this._clone); $(this.oid).hide();}
            //去掉确认框
            $("#ui-dialog .ui-dialog-confirm").remove(".ui-dialog-confirm");

            $("#ui-dialog .ui-dialog-title").html( options.title  ?  options.title  : "提示" );

            if(options.content){
                $("#ui-dialog .ui-dialog-main").html(options.content);
            }else if(options.id){
                this._clone = $(options.id).clone();
                $(options.id).remove();
                $("#ui-dialog .ui-dialog-main").html(this._clone);
                $(options.id).show();
                this.oid = options.id;
            }else if(options.ajax){
                $.ajax({
                    url : options.ajax,
                    success :function(html){
                        $("#ui-dialog").find(".ui-dialog-main").html(html);
                        if($.browser.version!="6.0"){
                            $("#ui-dialog").animate({
                                "marginTop" : "-="+ ($("#ui-dialog").find(".ui-dialog-main").height())/2+"px"
                            },500)
                        }
                    }
                });
            }

            if(options.confirm){
                $("#ui-dialog .ui-dialog-panel").append('<div class="ui-dialog-confirm"  ><a href="javascript:void()" class="ui-btn" onclick="dialog.close();">'+options.confirm+'</a></div>');
            }
            if(options.delay){
                var delay =options.delay/1000;
                clearTimeout(this.timer);
                $("#ui-dialog a.ui-btn").before('<span class="ui-dialog-timer">' + delay  +'秒后该窗口关闭</span>');
                this.timer = setTimeout("dialog.close()", options.delay);
            }

            if(options.overlay){
                $(".ui-dialog-overlay").show();
            }else{
                $(".ui-dialog-overlay").hide();
            }

            $("#ui-dialog").css({
                "display": "block",
                "marginTop" : "-999em"
            });
            this.dialogsHeight= $("#ui-dialog .ui-dialog-panel").outerHeight(true);
            this.resize("#ui-dialog",  this.dialogsHeight);

        },
        destroy:function(){
            $(".ui-dialog-overlay, #ui-dialog").remove();
            this.initialization=false;
        },
        close:function(){
            $(".ui-dialog-overlay, #ui-dialog").hide();
        }
    };
})(jQuery);


function setVoteCookie(id, domains, expire){
    domains = domains.split(":")[0];
    expire = Math.ceil(parseInt(expire)/24);
    if( typeof $.cookie == 'undefined'){
        return;
    }
    $.cookie('m2o-vote-'+id, "m2o-vote-success", { expires: expire, path: '/',domain : domains });
}

function updateVote(data){
    var voteprecent = 0;
    if($('.m2o-vote-'+data.id).size() <0){return;}
    $.each(data.option, function(index, item){
        voteprecent = 0;
        voteprecent = Math.round( ( parseInt(item.ini_num) + parseInt(item.single_total))/  parseInt(data.question_total_ini) * 1000 ) / 10;
        $('.m2o-vote-'+data.id +' .vote-option-'+item.id + ' .vote-option-inner-box').animate({
            width : voteprecent
        },1000);
        $('.m2o-vote-'+data.id +' .vote-option-'+item.id + ' .vote-option-text-box').html(voteprecent + '%<span>' +( parseInt(item.ini_num) + parseInt(item.single_total)) +'票</span>')
    });
}


$(document).ready(function(e) {
    /*news-smallpic switch*/
    if($('.news-pic-tab .list').size()){
        $('.news-pic-tab .list').switchable({
            triggers:false,
            effect: 'scrollLeft',
            steps: 1,
            panels: 'li',
            easing: 'ease-in-out',
            visible: 1, // important
            loop: false,
            end2end: false,
            autoplay:false,
            prev: $('.news-prev'),
            next: $('.news-next'),
            onSwitch: function(event, currentIndex) {
                var api = this,
                    len=this.length;
                api.prevBtn.toggleClass('disabled', currentIndex === 0);
                api.nextBtn.toggleClass('disabled', currentIndex === len - 1);
                $('.news-pic-tab ul li').eq(currentIndex).addClass('hover').siblings().removeClass('hover');
                $('.news-pic-list ul li').eq(currentIndex).addClass('show').siblings().removeClass('show');
            }
        });
        /*news-pic tab*/
        $('.news-pic-tab ul li').each(function(index){
            $(this).on('hover',function(){
                $(this).addClass('hover').siblings().removeClass('hover');
                $('.news-pic-list ul li').eq(index).addClass('show').siblings().removeClass('show');
            });
        });
    }

    //update user status
    //updateStatus('init');

    //update m2o-js-reffer
    $("a.m2o-js-reffer").each(function(){
        $(this).attr('href', $(this).attr('href')+encodeURIComponent(window.location.href) );
    });

    /*userlogin submit*/
    $("form.userlogin").submit(function(){
        var _formSubmitFlag=true,
            _memberName=$(this).find('input[name=member_name]'),
            _password=$(this).find('input[name=password]');

        $(this).find(".error").hide();

        if(!$.trim(_memberName.val())){
            _memberName.nextAll(".error").html("用户名不能为空").show();
            _formSubmitFlag=false;
        }

        if(!$.trim(_password.val())){
            _password.nextAll(".error").html("密码不能为空").show();
            _formSubmitFlag=false;
        }
        if(_formSubmitFlag){
            updateStatus('login', $(this));
            return false;
        }else{
            return false;
        }

    });
    if(typeof player != "undefined" ){
        player.recommendChange = function(url){
            window.location.href= url;
        }
    }

    /*m2o-simple-vote*/
    $(".m2o-simple-vote form").submit(function(e){

        e.preventDefault();
        var vote_checked= ""
            ,vote_data = {},
            vote_error;
        /* valiate */
        if($(this).hasClass('m2o-vote-expire')){
            info.open({
                type : 'warning',
                message : '投票已经过期'
            });
            return false;
        }
        if($(this).hasClass('m2o-vote-prepare')){
            info.open({
                type : 'warning',
                message : '投票未开始'
            });
            return false;
        }
        if($(this).hasClass('m2o-vote-success')){
            info.open({
                type : 'warning',
                message : '刚投过'
            });
            return false;
        }
        if($(this).find("input:checked").size()==0) {
            info.open({
                type : 'warning',
                message : '你没有勾选'
            });
            return false;
        }
        if($(this).find("input:checked").size() < $(this).find('input[name=id]').data('min') ){
            info.open({
                type : 'warning',
                message : '你没有勾选太少'
            });
            return false;
        }
        if( $(this).find("input:checked").size() > $(this).find('input[name=id]').data('max') ){
            info.open({
                type : 'warning',
                message : '你的勾选项太多'
            });
            return false;
        }
        $(this).find("input:checked").each(function(){
            vote_checked = vote_checked + "," + $(this).val();
        });

        /* company data */
        vote_data.option_id  = vote_checked.substring(1);
        vote_data.id= $(this).find('input[name=id]').val();
        if($(this).find('input[name=id]').data('expire')){
            vote_data.domain = $(this).find('input[name=id]').data('domain');
            vote_data.expire = $(this).find('input[name=id]').data('expire') ;
        }
        if($(this).find('.vote-option--1 input:checked').size() > 0){
            if($(this).find('input[name=other_title]').val() ==""){
                info.open({
                    type : 'warning',
                    message : '请填写你的选项'
                });
                return false;
            }
            vote_data.other_title = $(this).find('input[name=other_title]').val();
        }

        info.open({
            type : 'loading',
            message : '投票处理中...'
        });

        $(this).find('.m2o-vote-action').hide();

        $.ajax({
            url : '/m2o/vote/vote_create.php',
            data : vote_data,
            dataType : 'json',
            timeout : 5000,
            success  :function(data){

                if(data.length > 0 && (typeof data[0].error) =="undefined" ){
                    info.open({
                        type : 'success',
                        message : '投票成功'
                    });
                    $('.m2o-vote-'+data[0].id).addClass("m2o-vote-success");

                    updateVote(data[0]);

                    /*update cookie*/
                    if(!!vote_data.expire){
                        setVoteCookie(vote_data.id, vote_data.domain, vote_data.expire);
                    }

                    /*update selected option*/
                    vote_data.option_ids = vote_data.option_id.split(",");
                    for(var i= 0; i< vote_data.option_ids.length ; i++){
                        $(".vote-option-" + vote_data.option_ids[i]).addClass("vote-option-selected");
                    }

                }else{
                    vote_error = data[0].error ? data[0].error : '系统忙，请稍后重试';
                    info.open({
                        type : 'error',
                        message : vote_error
                    });
                    $(this).find('.m2o-vote-action').show();
                }
            },
            failed : function(){
                info.open({
                    type : 'error',
                    message : '系统忙，请稍后重试'
                });
                $(this).find('.m2o-vote-action').show();
            }
        });
        //ajax end
    });


    $('.m2o-view-btn').toggle(function(){
        $(this).parents('form').addClass('m2o-vote-view');
    },function(){
        $(this).parents('form').removeClass('m2o-vote-view');
    })

    if( typeof $.cookie != 'undefined'){
        if($.cookie('m2o-vote-'+ $('.m2o-simple-vote input[name=id]').val())=="m2o-vote-success"){
            $('.m2o-vote-'+ $('.m2o-simple-vote input[name=id]').val()).addClass("m2o-vote-success");
        }
    }


});