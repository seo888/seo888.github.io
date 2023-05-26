//百度统计
// var _hmt = _hmt || [];
// (function() {
//   var hm = document.createElement("script");
//   hm.src = "//hm.baidu.com/hm.js?de6470f7123b10c2a7885a20733e9cb1";
//   var s = document.getElementsByTagName("script")[0];
//   s.parentNode.insertBefore(hm, s);
// })();

//移动审核
// $(function() {
//   var init = 0;
//   $("#slider li").map(function(){
//     var currentWidth = $(this).outerWidth(true);
//     init = init + currentWidth;
//   });
//   $("#slider").width(Math.ceil(init));

//   $('.js-confirm').click(function() {
//     var str = prompt('请输入屏蔽理由:'),
//         $ele = $(this);
//     //当有输入时
//     if(str != null && str != '') {
//       var href = $ele.attr('url'),
//           form = $('<form id="form1" method="post" action="' + href + '"></form>'),
//           metadataInput = '<input name="comment" value="'+str+'" type="hidden" />';
//       //添加表单并提交
//       form.hide().append(metadataInput).appendTo('body');
//       form.submit();
//     } else {
//       return;
//     }
//   });

//   if($("#is_video").attr("data")==true){
//     $(".nbd-con").css("height","auto");
//     $(".show-more").hide()
//   }
// });

//视频初始化, 阿里云视频
$(function () {
  var width = $(window).width() > 600 ? 600 : $(window).width() - 50,
    count = 0;
  flag = $(".vedioItem").hasClass("aliyunVideo");

  //判断是否为阿里云播放
  if (flag) {
    var arr = [];

    $(".aliyunVideo").each(function (key, elem) {
      $(elem).css("height", (width * 3) / 4 + "px");
      arr.push({
        elem: $(elem).find(".prism-player").attr("id"),
        videoID: $.trim($(elem).find(".prism-player").attr("data-vid")),
      });
    });

    //实例化运行
    for (var i in arr) {
      (function (i) {
        executeRequest(arr[i].elem, arr[i].videoID);
      })(i);
    }
  }

  //腾讯云
  //判断视频横竖屏
  $.ajax({
    url:
      "/nbd_api/videos/video_info?tencent_video_ids=" +
      $(".TencentBox").eq(0).attr("data-txid"),
    success: function (res) {
      //判断视频id是否正确
      if (res.Response.MediaInfoSet.length == 0) {
        $(".TencentBox").each(function (i) {
          $(this).html(
            '<video id="player-container-id' +
              i +
              '" preload="auto"  playsinline webkit-playsinline>'
          );
          var player = TCPlayer("player-container-id" + i, {
            // player-container-id 为播放器容器ID，必须与html中一致
            fileID: $.trim($(".TencentBox").eq(i).attr("data-txid")), // 请传入需要播放的视频filID 必须
            appID: "1252627319", // 请传入点播账号的appID 必须
          });
          $(".TencentBox").height((width * 3) / 4 + "px");
          player.width(width);
          player.height((width * 3) / 4 + "px");
        });
      } else {
        //横屏
        if (
          res.Response.MediaInfoSet[0].MetaData.Width >
          res.Response.MediaInfoSet[0].MetaData.Height
        ) {
          $(".TencentBox").each(function (i) {
            $(this).html(
              '<video id="player-container-id' +
                i +
                '" preload="auto"  playsinline webkit-playsinline>'
            );
            var player = TCPlayer("player-container-id" + i, {
              // player-container-id 为播放器容器ID，必须与html中一致
              fileID: $.trim($(".TencentBox").eq(i).attr("data-txid")), // 请传入需要播放的视频filID 必须
              appID: "1252627319", // 请传入点播账号的appID 必须
            });
            $(".TencentBox").height((width * 3) / 4 + "px");
            player.width(width);
            player.height((width * 3) / 4 + "px");
          });
        } else {
          $(".TencentBox").each(function (i) {
            $(this).html(
              '<video id="player-container-id' +
                i +
                '" preload="auto"  playsinline webkit-playsinline>'
            );
            var player = TCPlayer("player-container-id" + i, {
              // player-container-id 为播放器容器ID，必须与html中一致
              fileID: $.trim($(".TencentBox").eq(i).attr("data-txid")), // 请传入需要播放的视频filID 必须
              appID: "1252627319", // 请传入点播账号的appID 必须
            });
            $(".TencentBox").height((width * 16) / 9.24 + "px");
            player.width(width);
            player.height((width * 16) / 9.24 + "px");
          });
        }
      }
    },
  });

  /**
   * 实例化一个视频
   * @author mao
   * @version 1
   * @date    2017-07-10
   */
  function executeRequest(elem, videoID) {
    var that = arguments;
    $.ajax({
      type: "get",
      url: $("#ULR_Auth").attr("url") + videoID,
      success: function (res) {
        var option = {
          id: elem,
          autoplay: false,
          width: width + "px",
          height: (width * 3) / 4 + "px",
          vid: videoID,
          playauth: res.playAuth,
          showBarTime: 3000000,
          cover: res.vidio_data.VideoMeta.CoverURL,
        };
        var player = new prismplayer(option);
      },
      error: function (xml, err, data) {
        if (err == "error") {
          console.log(err, data);
        }
      },
    });
  }

  if ($("#is_video").attr("data") == true) {
    $(".nbd-con").css("height", "auto");
    $(".show-more").hide();
  }

  // 其他视频 大小
  (function (window) {
    var gScale = 320 / 240;
    var vedioId = document.getElementById("sunow_box");
    var div = document.getElementsByTagName("div");
    for (var i = 0; i < div.length; i++) {
      if (div[i].getAttribute("id") == "sunow_box") {
        div[i].className = "vedioItem";
      }
    }
    var vedioList = document.getElementsByClassName("vedioItem");
    for (var i = 0; i < vedioList.length; i++) {
      if (vedioList.length > 0) {
        vedioList[i].style.height = vedioList[i].offsetWidth / gScale + "px";
      }
      if (vedioList.length > 1) {
        vedioList[i].style.margin = "10px auto";
      }
    }
  })(window);
  $("#sunow_box iframe").attr("allowfullscreen", "true");
  $("#sunow_box iframe").attr("wmode", "opaque");
  $("#sunow_box iframe").attr("allowTransparency", "true");
});
