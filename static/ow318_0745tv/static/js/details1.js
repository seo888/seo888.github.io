'use strict';

// 热点详情

var id = location.href.split('?')[1];
var Guid = location.href.split('?')[3] ? location.href.split('?')[3] : '';
var Name = decodeURIComponent(location.href.split('?')[2]);

//搜索跳转
$('#searchA').click(function () {
    var key = $('#i_input').val();
    open('../search.html?key=' + key);
});

$('#crumbs').text(Name + '-');
if (Name === '热点') {
    $('#crumbs').attr('href', '../index.html');
} else if (Name === '新闻') {
    $('#crumbs').attr('href', '../news.html');
} else if (Name === '短视频') {
    $('#crumbs').attr('href', '../shortVideo.html');
}
if (Name !== '短视频') {
    $.ajax({
        type: 'get',
        url: url + '/NewWebArticle/GetArticleModel',
        data: {
            ID: id,
            Guid: Guid
        },
        cache: false,
        async: true,
        dataType: 'json',
        jsonp: 'jsonCallback',
        jsonpCallback: 'callback',
        success: function success(data) {
            console.log(data);
            var data = data.Data.Model;
            if(data.ResourceType==2){
                window.location.href=data.ResourceUrl;
            }else{
                var html = '<h1>' + data.Title.trim() + '</h1>';
                html += '<p class="pSmall"><small>来源: ' + data.SourceForm + '</small><small>' + dateFormat("yyyy-MM-dd hh:mm", data.CreateTime) + '</small><p>';
                // 判断是否为视频稿件
                if (data.ResourceKind === 3 || data.MediaHeadPic !== '') {
                    html += '<video width="100%" height="auto"  controls ><source src=' + data.MediaHeadPic + ' ></video>' + data.ResourceContent;
                } else {
                    html += data.ResourceContent;
                }
                $(".details-content").append(html);
                $(document).attr("title", data.Title.trim());
          }
        }
    });
} else {
    $.ajax({
        type: 'get',
        url: url + '/NewWebShortVideo/GetShortVideoList',
        data: {
            ID: id
        },
        cache: false,
        async: true,
        dataType: 'json',
        jsonp: 'jsonCallback',
        jsonpCallback: 'callback',
        success: function success(data) {
            var res = data.Data;
            console.log(res);

            //if (res[0].ImgUrl !== '' && res[0].ImgUrl) {
           //     ImgUrl = res[0].ImgUrl.indexOf('http') === -1 ? imgUrl + res[0].ImgUrl : res[0].ImgUrl;
           // } else {
           //     ImgUrl = './img/default_img.png';
            //}

            // alert(ImgUrl)
            $(document).attr("title", res[0].VideoName.trim());
            var html = '<h1>' + res[0].VideoName.trim() + '</h1>';
            html += '<p class="pSmall"><small>来源: ' + res[0].SourceForm + '</small><small>' + dateFormat("yyyy-MM-dd hh:mm", res[0].CreateTime) + '</small><p>';
            html += '<video width="100%" height="500"  controls ><source src=' + res[0].MediaUrl + ' ></video>';
            $(".details-content").append(html);

            //$('video').css('background', 'transparent url(https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1416707203,810579746&fm=26&gp=0.jpg) 40% 40% / cover no-repeat')
        }
    });
}

// 推荐热点
$.ajax({
    type: 'get',
    url: url + '/NewWebChannel/GetIndexArticle',
    data: {
        ID: 1
    },
    cache: false,
    async: true,
    dataType: 'json',
    jsonp: 'jsonCallback',
    jsonpCallback: 'callback',
    success: function success(data) {
        // console.log(data.Data)
        var html = '';
        data.Data.forEach(function (item, index) {
            if (index < 2) {
                var PicPath = '';
                if (item.SmallPicUrl && item.SmallPicUrl !== '') {
                    PicPath = item.SmallPicUrl.indexOf('http') === -1 ? imgUrl + item.SmallPicUrl : item.SmallPicUrl;
                } else {
                    PicPath = '../img/default_img.png';
                }
                var url = void 0;
            // PicPath = PicPath.split(',')[0]
            if(item.ResourceType==2)
            {
              url=item.ResourceUrl;
            }else if(item.ResourceType==4){
              url = '../special-details.html?ParentID=' + item.ChID;
            }else{
              url='./details.html?' + item.ID + '?新闻'
            }
                html += '<a target="_blank" href="'+url+'"><img src="' + PicPath + '" alt=""><p>' + item.Title + '</p></a>';
            }
        });
        $(".details-right .host.a").append(html);
    }
});

if (Name !== '短视频') {
    // 本土资讯
    $.ajax({
        type: 'get',
        url: url + '/NewWebChannel/GetNewsChildUpList',
        data: {
            Chid: 443
        },
        cache: false,
        async: true,
        dataType: 'json',
        jsonp: 'jsonCallback',
        jsonpCallback: 'callback',
        success: function success(data) {
            // console.log(data.Data)
            var html = '';
            
            data.Data.forEach(function (item, index) {
              if(item.ResourceType==2)
              {
                url=item.ResourceUrl;
              }else if(item.ResourceType==4){
                url = '/special-details.html?ParentID=' + item.ChID;
              }else{
                url='./details.html?' + item.ID + '?新闻'
              }
                if (index < 5) {
                    if (index < 3) {
                        html += '<a target="_blank" href="'+url+'"><i class="on' + index + '"></i><p class="on">' + item.Title + '</p></a>';
                    } else {
                        html += '<a target="_blank" href="'+url+'"><p>' + item.Title + '</p></a>';
                    }
                }
            });
            $(".details-right .information").append(html);
        }
    });
} else {
    $('.flex').html('短视频精选');
    $.ajax({
        type: 'get',
        url: url + '/NewWebShortVideo/GetShortVideoList',
        cache: false,
        async: true,
        dataType: 'json',
        jsonp: 'jsonCallback',
        jsonpCallback: 'callback',
        success: function success(data) {
            console.log(data.Data);
            var html = '';
            data.Data.forEach(function (item, index) {
                if (index < 8) {
                    if (index < 3) {
                        html += '<a target="_blank" href="./details.html?' + item.ID + '?短视频"><i class="on' + index + '"></i><p class="on">' + item.VideoName + '</p></a>';
                    } else {
                        html += '<a target="_blank" href="./details.html?' + item.ID + '?短视频"><p>' + item.VideoName + '</p></a>';
                    }
                }
            });
            $(".details-right .information").append(html);
        }
    });
}

if (Name !== '短视频') {
    $('.Aspecial').css('display', 'block');
    // 专题
    $.ajax({
        type: 'get',
        url: url + '/NewWebChannel/GetSpecialList',
        cache: false,
        async: true,
        dataType: 'json',
        jsonp: 'jsonCallback',
        jsonpCallback: 'callback',
        success: function success(data) {
            var html = '';
            // console.log(data.Data)
            data.Data.forEach(function (item, index) {
                var ImageUrl = '';
                if (item.ImageUrl && item.ImageUrl !== '') {
                    ImageUrl = item.SmallPicUrl.indexOf('http') === -1 ? imgUrl + item.SmallPicUrl : item.SmallPicUrl;
                } else {
                    ImageUrl = '../img/default_img.png';
                }
                if (index < 2) {
                    html += '<a target="_blank" href="../special-details.html?ParentID=' + item.ID + '"><img src="' + ImageUrl + '" alt=""><p>' + item.ChannelName + '</p></a>';
                }
            });
            $(".host.Aspecial").append(html);
        }
    });
} else {
    $('.Aspecial').css('display', 'none');
}