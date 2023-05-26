var timer = null;
function notice(type, msg, time, el){
    var $el = el ? el : jQuery('.mce-tinymce');
    clearTimeout(timer);
    jQuery('#notice').remove();
    $el.append('<div id="notice"><div class="notice-bg"></div><div class="notice-wrap"><div class="notice-inner notice-'+type+'">'+msg+'</div></div></div>');
    if(time) {
        timer = setTimeout(function () {
            jQuery('#notice').remove();
        }, time);
    }
}

function comments_list(list, del){
    var $html = '';
    if(list && list.length){
        for(var i = 0; i<list.length; i++){
            $html += '<li class="as-comments-item" data-id="'+list[i].ID+'">\
            <div class="as-comment-name">'+list[i].user+' <span>'+list[i].date+'</span>'+(del=='1'?'<span><a class="j-del-comment" href="javascript:;">'+QAPress_js.lang.delete+'</a></span>':'')+'</div>\
            <div class="as-comment-content">'+list[i].content+'</div>\
            </li>';
        }
    }else{
        $html += '<li class="as-comments-none">'+QAPress_js.lang.nocomment2+'</li>';
    }
    return $html;
}

jQuery(document).ready(function($) {
    var submited = 0;

    var $single = $('.q-single');
    if($single.length){
        $.ajax({
            url: QAPress_js.ajaxurl,
            data: {action: 'QAPress_views', id: $single.data('id')},
            type: 'POST',
            success: function(res){}
        });
    }

    $('#answer').on('click', '.j-reply', function(){
        var $el = $(this).closest('.as-item');
        if($el.find('.as-comments-box').length){
            $('.as-comments-box').remove();
            $('.as-comments').remove();
        }else{
            var $comments = '<div class="as-comments-box">\
        <form method="post" class="as-comments-form clearfix">\
        <input type="hidden" name="id" value="'+$el.data('aid')+'" >\
    <input class="as-comments-input form-control" name="comment" type="text" placeholder="'+QAPress_js.lang.addcomment+'" autocomplete="off">\
    <input class="as-comments-submit" type="submit" value="'+QAPress_js.lang.submit+'">\
    </form></div>';

            $('.as-comments-box').remove();
            $('.as-comments').remove();
            $el.find('.as-main').append($comments);
            $el.find('.as-comments-input').focus();
        }
    }).on('click', '.btn-vote', function () {
        const $el = $(this);
        let type = $el.hasClass('btn-vote-up') ? 1 : -1;
        const $item = $el.closest('.as-item');
        const $active = $item.find('.btn-vote.active');
        const $upvote = $item.find('.btn-vote-up');
        let vote = $upvote.data('vote');

        if ($el.hasClass('active')) {
            $el.removeClass('active');
            if (type === 1) {
                let _vote = vote - 1;
                _vote = _vote < 1 ? '' : ' ' + _vote;
                $upvote.html($upvote.find('svg').prop('outerHTML') + $upvote.attr('aria-label') + _vote);
            }
        } else {
            if (type === 1) {
                let _vote = vote + 1;
                _vote = _vote < 1 ? '' : ' ' + _vote;
                $upvote.html($upvote.find('svg').prop('outerHTML') + $upvote.attr('aria-label') + _vote);
            } else if($active.length){
                let _vote = vote - 1;
                _vote = _vote < 1 ? '' : ' ' + _vote;
                $upvote.html($upvote.find('svg').prop('outerHTML') + $upvote.attr('aria-label') + _vote);
            }
            $active.removeClass('active');
            $el.addClass('active');
        }

        $.ajax({
            url: QAPress_js.ajaxurl,
            data: {action: 'QAPress_vote', id: $item.data('aid'), type: type, nonce: $('#comments_list_nonce').val()},
            type: 'POST',
            dataType: 'json',
            success: function (res) {
                if (res.result == '0') {
                    $upvote.data('vote', res.upvote);
                    let _vote = res.upvote < 1 ? '' : ' ' + res.upvote;
                    $upvote.html($upvote.find('svg').prop('outerHTML') + $upvote.attr('aria-label') + _vote);
                    $item.find('.btn-vote').removeClass('active');
                    if (res.voted && res.voted === 'upvote') {
                        $item.find('.btn-vote-up').addClass('active');
                    } else if(res.voted && res.voted === 'downvote'){
                        $item.find('.btn-vote-down').addClass('active');
                    }
                } else if (res.msg) {
                    $item.find('.btn-vote.active').removeClass('active');
                    let _vote = vote < 1 ? '' : ' ' + vote;
                    $upvote.html($upvote.find('svg').prop('outerHTML') + $upvote.attr('aria-label') + _vote);
                    notice(0, res.msg, 1200, $item);
                }
            }
        });
    });

    $('#answer').on('click', '.j-reply-list', function(){
        var $el = $(this).closest('.as-item');
        var leng = $el.find('.as-comments').length;
        $el.find('.as-comments-box').remove();
        $el.find('.as-comments').remove();
        if(!leng){
            $el.find('.as-main').append('<div class="as-comments"><ul class="as-comments-list"><li class="as-comments-none"><img class="notice-loading" src="'+QAPress_js.ajaxloading+'"> '+QAPress_js.lang.loading+'</li></ul></div>');
            $.ajax({
                url: QAPress_js.ajaxurl,
                data: {action: 'QAPress_comments', aid: $el.data('aid')},
                type: 'POST',
                dataType: 'json',
                success: function (res) {
                    if(res.result==0){
                        var $html = comments_list(res.comments, res.delete);
                        $el.find('.as-main .as-comments-list').html($html);
                    }else{
                        $el.find('.as-main .as-comments-list').html('<li class="as-comments-none">'+QAPress_js.lang.error1+'</li>');
                        notice(0, QAPress_js.lang.error1, 1200, $el);
                    }
                },
                error: function(){
                    $el.find('.as-main .as-comments-list').html('<li class="as-comments-none">'+QAPress_js.lang.error2+'</li>');
                    notice(0, QAPress_js.lang.error2, 1200, $el);
                }
            });
        }
    }).on('click', '.j-answer-del', function(){
        if(confirm(QAPress_js.lang.confirm)){
            $el = $(this).closest('.as-item');
            notice(1, '<img class="notice-loading" src="'+QAPress_js.ajaxloading+'"> '+QAPress_js.lang.deleting, 0, $el);

            var answer = $el.data('aid');
            $.ajax({
                url: QAPress_js.ajaxurl,
                data: {action: 'QAPress_delete_answer', id: answer, },
                type: 'POST',
                dataType: 'json',
                success: function(res){
                    clearTimeout(timer);
                    $('#notice').remove();
                    if(res.result==0){
                        notice(1, QAPress_js.lang.success, 1500, $el);
                        setTimeout(function(){
                            $el.fadeOut('fast', function(){
                                var $parent = $el.closest('.as-list');
                                $el.remove();
                                if($parent.find('.as-item').length==0){
                                    $parent.append('<li class="as-item-none" style="text-align: center;color: #999;padding-top: 10px;">'+QAPress_js.lang.nocomment+'</li>');
                                }
                            });
                        }, 1400);
                    }else if(res.result==2){
                        notice(0, QAPress_js.lang.denied, 1200, $el);
                    }else{
                        notice(0, QAPress_js.lang.error3, 1200, $el);
                    }
                },
                error: function(err){
                    clearTimeout(timer);
                    $('#notice').remove();
                    notice(0, QAPress_js.lang.error3, 1200, $el);
                }
            });
        }
    }).on('click', '.j-del-comment', function(){
        if(confirm(QAPress_js.lang.confirm2)){
            $el = $(this).closest('.as-comments-item');
            notice(1, '<img class="notice-loading" src="'+QAPress_js.ajaxloading+'"> '+QAPress_js.lang.deleting, 0, $el);

            var comment = $el.data('id');
            $.ajax({
                url: QAPress_js.ajaxurl,
                data: {action: 'QAPress_delete_comment', id: comment, },
                type: 'POST',
                dataType: 'json',
                success: function(res){
                    clearTimeout(timer);
                    $('#notice').remove();
                    if(res.result==0){
                        notice(1, QAPress_js.lang.success, 1500, $el);
                        setTimeout(function(){
                            $el.fadeOut('fast', function(){
                                var $parent = $el.closest('.as-comments-list');
                                $el.remove();
                                if($parent.find('.as-comments-item').length==0){
                                    $parent.append('<li class="as-comments-none">'+QAPress_js.lang.nocomment2+'</li>');
                                }
                            });
                        }, 1400);
                    }else if(res.result==2){
                        notice(0, QAPress_js.lang.denied, 1200, $el);
                    }else{
                        notice(0, QAPress_js.lang.error3, 1200, $el);
                    }
                },
                error: function(err){
                    clearTimeout(timer);
                    $('#notice').remove();
                    notice(0, QAPress_js.lang.error3, 1200, $el);
                }
            });
        }
    });

    $('#as-form').submit(function(){
        if(submited) return false;
        submited = 1;
        tinyMCE.triggerSave();
        var content = $('#editor-answer').val();
        if(!$.trim(content)){
            notice(0, QAPress_js.lang.empty, 1000);
            submited = 0;
            return false;
        }else{
            notice(1, '<img class="notice-loading" src="'+QAPress_js.ajaxloading+'"> ' + QAPress_js.lang.submitting, 0);
            $.ajax({
                url: QAPress_js.ajaxurl,
                data: $(this).serialize()+'&action=QAPress_add_answer',
                type: 'POST',
                dataType: 'json',
                success: function(res){
                    submited = 0;
                    if(res.result==0){
                        notice(1, QAPress_js.lang.success2, 1200);
                        var $item = '<li id="as-'+res.answer.ID+'" class="as-item" data-aid="'+res.answer.ID+'" style="display: none;"><div class="as-head">\
                            <div class="as-avatar">'+res.user.avatar+'</div>\
                            <div class="as-user">'+res.user.nickname+'</div>\
                            </div>\
                        <div class="as-main">\
                        <div class="as-content entry-content">'+res.answer.content+'</div>\
                        <div class="as-action">\
                        <span class="as-time">'+res.answer.date+'</span>\
                        <span class="as-reply-count"><a class="j-reply-list" href="javascript:;">'+QAPress_js.lang.ncomment+'</a></span>\
                        </div>\
                        </div>\
                        </li>';

                        $('.as-list').append($item);
                        $('#as-'+res.answer.ID).fadeIn();
                        $('.as-item-none').remove();
                        tinyMCE.activeEditor.setContent('');
                    }else if(res.result==101){
                        notice(0, QAPress_js.lang.empty, 1200);
                    }else if(res.result==2){
                        notice(0, QAPress_js.lang.login, 2000);
                    }else{
                        notice(0, QAPress_js.lang.error4, 1200);
                    }
                },
                error: function(err){
                    submited = 0;
                    notice(0, QAPress_js.lang.error4, 1200);
                }
            })
        }
        return false;
    });

    $('#answer').on('submit', '.as-comments-form', function(){
        if(submited) return false;
        submited = 1;
        var content = $(this).find('.as-comments-input').val();
        var $item = $(this).closest('.as-item');
        if(!$.trim(content)){
            notice(0, QAPress_js.lang.empty, 1200, $item);
            submited = 0;
            return false;
        }else{
            notice(1, '<img class="notice-loading" src="'+QAPress_js.ajaxloading+'"> '+QAPress_js.lang.submitting, 0, $item);
            $.ajax({
                url: QAPress_js.ajaxurl,
                data: $(this).serialize()+'&action=QAPress_add_comment',
                type: 'POST',
                dataType: 'json',
                success: function(res){
                    submited = 0;
                    if(res.result==0){
                        notice(1, QAPress_js.lang.success2, 2000, $item);
                        $item.find('.as-comments-input').val('');
                    }else if(res.result==101){
                        notice(0, QAPress_js.lang.empty, 1200, $item);
                    }else if(res.result==2){
                        notice(0, QAPress_js.lang.login, 2000, $item);
                    }else{
                        notice(0, QAPress_js.lang.error4, 1200, $item);
                    }
                },
                error: function(err){
                    submited = 0;
                    notice(0, QAPress_js.lang.error4, 1200, $item);
                }
            })
        }
        return false;
    });


    $('#question-form').submit(function(){
        if(submited) return false;
        submited = 1;
        tinyMCE.triggerSave();
        var title = $('input[name=title]').val();
        var category = $('select[name=category]').val();
        var content = $('#editor-question').val();
        if(!title){
            notice(0, QAPress_js.lang.need_title, 1200);
            submited = 0;
            return false;
        }else if(!category){
            notice(0, QAPress_js.lang.need_cat, 1200);
            submited = 0;
            return false;
        }else if(!$.trim(content)){
            notice(0, QAPress_js.lang.need_content, 1200);
            submited = 0;
            return false;
        }else{
            notice(1, '<img class="notice-loading" src="'+QAPress_js.ajaxloading+'"> '+QAPress_js.lang.submitting, 0);
            $.ajax({
                url: QAPress_js.ajaxurl,
                data: $(this).serialize()+'&action=QAPress_add_question',
                type: 'POST',
                dataType: 'json',
                success: function(res){
                    submited = 0;
                    if(res.result==0){
                        console.log(res);
                        if($('input[name=id]').val()){
                            notice(1, typeof res.msg === 'undefined' ? QAPress_js.lang.success3 : res.msg, 1500);
                        }else{
                            submited = 1;
                            notice(1, typeof res.msg === 'undefined' ? QAPress_js.lang.success4 : res.msg, 1200);
                        }
                        if( typeof res.location !== 'undefined' ){
                            setTimeout(function(){
                                window.location.href = res.location;
                                submited = 0;
                            }, 1200);
                        }
                    }else if(res.result==101){
                        notice(0, QAPress_js.lang.need_all, 1200);
                    }else if(res.result==102){
                        notice(0, QAPress_js.lang.length, 1200);
                    }else{
                        notice(0, QAPress_js.lang.error4, 1200);
                    }
                },
                error: function(err){
                    submited = 0;
                    notice(0, QAPress_js.lang.error4, 1200);
                }
            })
        }
        return false;
    });

    $('#answer').on('click', '.q-load-more', function(){
        var $el = $(this);
        if($el.hasClass('disabled')) return;
        $el.addClass('disabled').text(QAPress_js.lang.loading);
        var question = $('.q-single').data('id');
        var page = $el.data('page');
        page = page ? page : 2;
        $.ajax({
            url: QAPress_js.ajaxurl,
            data: {action: 'QAPress_answers_pagination', question: question, page: page},
            type: 'POST',
            dataType: 'json',
            success: function(res){
                if(res.result==0){
                    var $html = '';
                    if(res.answers.length){
                        for(var i=0;i<res.answers.length;i++){
                            $html += res.answers[i];
                        }
                        $('.as-list').append($html);

                    }else{
                        $('.q-load-more').css('visibility', 'hidden');
                        notice(1, QAPress_js.lang.load_done, 1500, $('.as-list'));
                    }
                }else{
                    notice(0, QAPress_js.lang.load_fail, 1500, $('.as-list'));
                }
                $el.removeClass('disabled').text(QAPress_js.lang.load_more);
                $el.data('page', page+1);
            },
            error: function(err){
                $el.removeClass('disabled').text(QAPress_js.lang.load_more);
                notice(0, QAPress_js.lang.load_fail, 1500, $('.as-list'));
            }
        });
    });


    $('.topic-header').on('click', '.j-del', function(){
        if(confirm(QAPress_js.lang.confirm3)){

            notice(1, '<img class="notice-loading" src="'+QAPress_js.ajaxloading+'"> '+QAPress_js.lang.deleting, 0, $('.q-entry'));

            var question = $('.q-single').data('id');
            $.ajax({
                url: QAPress_js.ajaxurl,
                data: {action: 'QAPress_delete_question', id: question, },
                type: 'POST',
                dataType: 'json',
                success: function(res){
                    clearTimeout(timer);
                    $('#notice').remove();
                    if(res.result==0){
                        notice(1, QAPress_js.lang.success, 1500, $('.q-entry'));
                    }else if(res.result==2){
                        notice(0, QAPress_js.lang.denied, 1200, $('.q-entry'));
                    }else{
                        notice(0, QAPress_js.lang.error3, 1200, $('.q-entry'));
                    }
                },
                error: function(err){
                    clearTimeout(timer);
                    $('#notice').remove();
                    notice(0, QAPress_js.lang.error3, 1200, $('.q-entry'));
                }
            });
        }
    }).on('click', '.j-approve', function(){
        if(confirm(QAPress_js.lang.approve)){
            notice(1, '<img class="notice-loading" src="'+QAPress_js.ajaxloading+'"> ' + QAPress_js.lang.loading, 0, $('.q-entry'));
            var question = $('.q-single').data('id');
            $.ajax({
                url: QAPress_js.ajaxurl,
                data: {action: 'QAPress_approve_question', id: question, },
                type: 'POST',
                dataType: 'json',
                success: function(res){
                    clearTimeout(timer);
                    $('#notice').remove();
                    if(res.result==0){
                        notice(1, QAPress_js.lang.success, 1500, $('.q-entry'));
                        $('.j-approve').remove();
                    }else if(res.result==2){
                        notice(0, QAPress_js.lang.denied, 1200, $('.q-entry'));
                    }else{
                        notice(0, QAPress_js.lang.error2, 1200, $('.q-entry'));
                    }
                },
                error: function(err){
                    clearTimeout(timer);
                    $('#notice').remove();
                    notice(0, QAPress_js.lang.error2, 1200, $('.q-entry'));
                }
            });
        }
    }).on('click', '.j-set-top', function(){
        notice(1, '<img class="notice-loading" src="'+QAPress_js.ajaxloading+'"> ' + QAPress_js.lang.loading, 0, $('.q-entry'));
        var question = $('.q-single').data('id');
        $.ajax({
            url: QAPress_js.ajaxurl,
            data: {action: 'QAPress_set_top', id: question, },
            type: 'POST',
            dataType: 'json',
            success: function(res){
                clearTimeout(timer);
                $('#notice').remove();
                if(res.result==0){
                    notice(1, QAPress_js.lang.success, 1500, $('.q-entry'));
                    window.location.reload();
                }else if(res.result==2){
                    notice(0, QAPress_js.lang.denied, 1200, $('.q-entry'));
                }else{
                    notice(0, QAPress_js.lang.error2, 1200, $('.q-entry'));
                }
            },
            error: function(err){
                clearTimeout(timer);
                $('#notice').remove();
                notice(0, QAPress_js.lang.error2, 1200, $('.q-entry'));
            }
        });
    });


    // 用户中心
    $('.wpcom-profile').on('click', '.j-user-questions,.j-user-answers', function(){
        var $this = $(this);
        if($this.hasClass('loading') || $this.hasClass('disabled')) return false;

        var data = null;
        var page = $this.data('page');
        page = page ? page + 1 : 2;

        var id = $('.profile-tab').data('user');
        if( $this.hasClass('j-user-questions') ){
            data = {action: 'QAPress_user_questions', user: id?id:0, page:page};
        }else if( $this.hasClass('j-user-answers') ){
            data = {action: 'QAPress_user_answers', user: id?id:0, page:page};
        }

        $this.loading(1);
        $.ajax({
            type: 'POST',
            url: _wpcom_js.ajaxurl,
            data: data,
            dataType: 'html',
            success: function(data) {
                if(data=='0'){
                    $this.addClass('disabled').text(QAPress_js.lang.end);
                }else{
                    var $data = $(data);
                    $this.parent().prev().append($data);
                    $data.find('.j-lazy').lazyload({
                        threshold : -50, //距离50像素触发
                        effect : "fadeIn" //显示特效
                    });
                    $this.data('page', page);
                    $(window).trigger('scroll');
                }
                $this.loading(0);
            },
            error: function(){
                $this.loading(0);
            }
        });
    });
});