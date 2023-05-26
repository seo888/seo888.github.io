$(function(){
    if(window.gs_download && window.gs_download.url && $.device.os != 'ios'){
        var dom = $('#download_url_show');
        var btn = dom.find('.btn').eq(0);  //安卓相关按钮
        var btnIos = dom.find('.ios-show'); //苹果相关按钮
        var url = btn.attr('href');
        var durl = gs_download.yuanurl ?  gs_download.yuanurl : gs_download.url;

        var tip = '';
        var tip2 = '推荐'+gs_download.name+'下载更安全更方便。';
        // 豌豆荚高速下载 （按钮勾选切换）
        if(gs_download.type == 1){
            if(url) {
                tip = '需下载'+gs_download.name+',下载更安全更方便。';

            }else {
                 tip = '暂无资源,推荐使用'+gs_download.name+'搜索相关安卓版下载。';
            }
            var gs_tip = tip;
            if(btn.hasClass('btn-disabled')){
                if(btn.text() == 'PC软件暂无移动版本'){
                    tip = 'PC软件无法在手机运行，建议使用'+gs_download.name+'搜索相关软件。';
                    btn.html('暂无安卓版');
                }
            }else{
                btn.html('普通下载');
            }
            var btnStr = btn.prop("outerHTML");
            // console.log(btnStr);
            var str = '<div class="wd-download checked" id="wdDownload">'+
                '<div class="hd"><i class="icon icon-check"></i><span class="name">使用'+gs_download.name+'下载</span></div>'+
                '<div class="bd">'+
                '<div class="bd-item bd-default">'+ btnStr +
                '<p class="txt"><i class="icon icon-tip"></i>'+ tip2 +'</p>'+
                '</div>'+
                '<div class="bd-item bd-wandou">'+
                '<a class="btn btn-blue" id="btnwdj"  href="javascript:void(0);">立即下载</a>'+
                '<p class="txt"><i class="icon icon-tip"></i>'+ tip +'</p>'+
                '</div></div></div>';
            dom.after(str).remove();
            // 豌豆下载
            $('#wdDownload .hd').on('click', function(){
                $(this).parent().toggleClass('checked');
            });
            downloadFast();
        }else if(gs_download.type == 2){
            var str = '<a class="btn-gs"  id="btnwdj"><i class="icon icon-down-gs"></i>高速下载</a>';
            if(url){
                str += '<a class="btn-pt" href="'+ btn.attr('href')+'"><i class="icon icon-down-pt"></i>普通下载</a>';
                tip = '<p class="tip"><span class="red">*</span>需下载'+gs_download.name+',使用高速下载更安全更快速。</p>';
            }else{
                str += '<a class="btn-none"><i class="icon icon-down-none"></i>暂无下载</a>';
                if(btnIos.attr('href')){
                    tip = '<p class="tip"><span class="red">*</span>520下载暂无资源,推荐使用'+gs_download.name+'搜索相关安卓版下载。</p>';
                }
            }
            str += tip;
            dom.html(str);

            //豌豆高速下载功能接入
            downloadFast();
            return false;
        }else  if(gs_download.type == 3){
            var str = '<a class="btn-gs"  id="btnwdj"><i class="icon icon-down-gs"></i>'+gs_download.name+'</a>';
            if(url){
                str += '<a class="btn-pt" href="'+ btn.attr('href')+'"><i class="icon icon-down-pt"></i>普通下载</a>';
                tip = '<p class="tip"><span class="red">*</span>需下载'+gs_download.name+',使用高速下载更安全更快速。</p>';
            }else{
                str += '<a class="btn-none"><i class="icon icon-down-none"></i>暂无下载</a>';
                if(gs_download.is_soft ==1){
                    tip = '<p class="tip"><span class="red">*</span>PC软件无法在手机上运行,推荐使用'+gs_download.name+'搜索相关安卓版下载。</p>';
                }else{
                    tip = '<p class="tip"><span class="red">*</span>520下载暂无资源,推荐使用'+gs_download.name+'搜索相关安卓版下载。</p>';
                }
            }
            str += tip;
            dom.html(str);
            downloadFast();
            return false;
        }

        function downloadFast(){
            console.log(durl);
            if (parseInt(gs_download.kbid) > 0) {
                mowanDownInit({
                    mwid: gs_download.mwid,
                    success: function (response) {
                        console.log(response);
                        $("#btnwdj").addClass('toDownload').attr({'href': 'javascript:;','data-url':response.url}).removeAttr('id');
                        $(document).on("click",".toDownload",function(e){
                            var url = $(this).attr('data-url')
                            if(!url){
                                url = 'mwzs://app/splash'
                            }
                            console.log('toDownload', url)
                            window.location.href = url;
                            console.log(document.hidden);
                            var timer = setTimeout(function(){
                                if(!document.hidden){
                                    window.location.href = gs_download.url;
                                }
                            },2000);
                        })
                    }
                });
            } else {
                $('#btnwdj').click(function() {
                    window.open(durl);
                });
            }
        }
    }





})
