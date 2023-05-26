$(function () {
  $("head").append(
    '<link rel="stylesheet" href="https://at.alicdn.com/t/font_1301223_4iab7j03vnd.css">'
  );

  var url = window.location.href;
  var regURL = /^(?:http|https):\/\/(.*)\.prnasia\.com/i;
  var lang = null;
  if(regURL.test(url)) {
    var href = RegExp.$1;
    if (href.indexOf("www") !== -1 || href.indexOf("cnmobile") !== -1) {
      lang = { text: "cn", code: 1 };
    } else if (href.indexOf("en") !== -1) {
      lang = { text: "en", code: 0 };
    } else if (href.indexOf("vn") !== -1) {
      lang = { text: "vn", code: 11 };
    } else if (href.indexOf("jp") !== -1) {
      lang = { text: "jp", code: 3 };
    } else if (href.indexOf("kr") !== -1) {
      lang = { text: "kr", code: 9 };
    } else {
      lang = { text: "en", code: 0 };
    }
  } else {
    lang = { text: "en", code: 0 };
  }

  // var href = window.location.href;
  // if (href.indexOf("www") !== -1 || href.indexOf("cnmobile") !== -1) {
  //   var lang = { text: "cn", code: 1 };
  // } else if (href.indexOf("en") !== -1) {
  //   var lang = { text: "en", code: 0 };
  // } else if (href.indexOf("vn") !== -1) {
  //   var lang = { text: "vn", code: 11 };
  // } else if (href.indexOf("jp") !== -1) {
  //   var lang = { text: "jp", code: 3 };
  // } else if (href.indexOf("kr") !== -1) {
  //   var lang = { text: "kr", code: 9 };
  // } else {
  //   var lang = { text: "en", code: 0 };
  // }

  if ($("h1.headline").length !== 0) {
    var title = $("h1.headline").text();
  } else {
    var title = document.title;
  }

  var pageURL = window.location.href;
  var complayName = $(".company-left .complayname .name").text();
  var dateTime = $(".company-left .datetime").text();

  $("#dvContent a").each(function (index, ele) {
    if ($(ele).children("img").length === 0) {
      return;
    }
    var item = $(ele).closest("div")[0];

    var mmaLink = $(ele).attr("href");
    var caption = $(item).find("span").text();
    var imgLink = $(ele).find("img").attr("src") || "";
    var imgLinkPublish = imgLink.replace(/\?p=\w*$/i, "?p=publish");
    $(ele)
      .attr("data-fancybox", "gallery")
      .attr("data-caption", caption)
      .attr("href", imgLinkPublish)
      .attr("data-mma", mmaLink);
  });

  $('[id^="jwplayer_"]').each(function (index, item) {
    var optionsStr = "";
    var reg = /jwplayer\('.*'\)\.setup\((.*)\);/i;
    $(item)
      .find("script")
      .each(function (index, item) {
        var text = $(item).text();
        if (reg.test(text)) {
          optionsStr = RegExp.$1;
        }
      });
    if (optionsStr !== "") {
      try {
        $(item).children().css("display", "none");
        var options = eval("(" + optionsStr + ")");
        $(item).append(
          '<p style="TEXT-ALIGN: center; WIDTH: 100%"><a class="fancy-video-wrap" href="' +
            options.file +
            '" target="_blank" rel="nofollow" data-fancybox="gallery" data-caption="" style="display: inline-block; max-width: 100%; width:' +
            options.width +
            "px; height: " +
            options.height +
            'px;"><img src="' +
            options.image +
            '" title="" alt=""><span class="icon iconfontprn iconprnplay2 fancy-video-play"></span></a><br><span></span></p>'
        );
      } catch (err) {
        console.log(err);
      }
    }
  });

  // $(".PRN_ImbeddedAssetReference").each(function (index, item) {
  //   var mmaLink = $(item).find("a").attr("href");
  //   var caption = $(item).find("span").text();
  //   var imgLink = $(item).find("img").attr("src") || "";
  //   var imgLinkPublish = imgLink.replace(/\?p=\w*$/i, "?p=publish");
  //   $(item)
  //     .find("a")
  //     .attr("data-fancybox", "gallery")
  //     .attr("data-caption", caption);
  //   $(item).find("a").attr("href", imgLinkPublish).attr("data-mma", mmaLink);

  //   var optionsStr = "";
  //   var reg = /jwplayer\('.*'\)\.setup\((.*)\);/i;
  //   $(item)
  //     .find("script")
  //     .each(function (index, item) {
  //       var text = $(item).text();
  //       if (reg.test(text)) {
  //         optionsStr = RegExp.$1;
  //       }
  //     });
  //   if (optionsStr !== "") {
  //     try {
  //       $(item).children().css("display", "none");
  //       var options = eval("(" + optionsStr + ")");
  //       $(item).append(
  //         '<p style="TEXT-ALIGN: center; WIDTH: 100%"><a class="fancy-video-wrap" href="' +
  //           options.file +
  //           '" target="_blank" rel="nofollow" data-fancybox="gallery" data-caption="" style="display: inline-block; width:' +
  //           options.width +
  //           "px; height: " +
  //           options.height +
  //           'px;"><img src="' +
  //           options.image +
  //           '" title="" alt=""><span class="icon iconfontprn iconprnplay2 fancy-video-play"></span></a><br><span></span></p>'
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // });

  var currentSrc = "";
  var srcList = [];
  var shareInitDone = false;

  $('[data-fancybox="gallery"]').fancybox({
    baseClass: "fancybox-custom-layout",
    infobar: false,
    touch: {
      vertical: false,
    },
    buttons: ["close", "thumbs", "download", "copylink", "prnshare", "zoom"],
    animationEffect: "fade",
    transitionEffect: "fade",
    preventCaptionOverlap: true,
    idleTime: false,
    gutter: 0,
    caption: function (instance, obj) {
      var i18n = obj.opts.i18n;
      var lang = obj.opts.lang;
      var langNow = i18n[lang];

      var dataCapation = $(this).attr("data-caption");
      var capationDesc =
        dataCapation === ""
          ? ""
          : '<div class="fb-caption-desc"><span class="fb-caption-title">' +
            langNow.CAPTION +
            "</span>" +
            dataCapation +
            "</div>";
      return (
        '<div class="fb-caption"><div class="fb-caption-bg">' +
        capationDesc +
        '<div class="fb-caption-title fb-caption-release-title"><span>' +
        langNow.RELEASELINK +
        '</span><a href="' +
        pageURL +
        '" class="fb-caption-link">' +
        title +
        '</a></div><div class="fb-caption-company">' +
        langNow.SOURCE +
        complayName +
        '</div><div class="fb-caption-time">' +
        dateTime +
        "</div></div></div>"
      );
    },
    afterShow: function (instance, current) {
      currentSrc = current.src;
    },
    onInit: function (instance) {
      var group = instance.group;
      for (var i = 0; i < group.length; i++) {
        if (group[i].type === "image") {
          srcList.push(group[i].src);
        }
      }
    },
    // onActivate: function() {
    //   console.log("onActivate")
    // },
    afterClose: function () {
      shareInitDone = false;
    },
    btnTpl: {
      close:
        '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
        '<span class="icon iconfontprn iconprnclose"></span>' +
        "</button>",
      thumbs:
        '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}">' +
        '<span class="icon iconfontprn iconprnmore"></span>' +
        "</button>",
      zoom:
        '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">' +
        '<span class="icon iconfontprn iconprnzoom"></span>' +
        "</button>",
      // Arrows
      // arrowLeft:
      //   '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
      //   '<div><span class="icon iconfontprn iconprnRight fancy-arrow fancy-arrow-left"></span></div>' +
      //   "</button>",

      // arrowRight:
      //   '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}">' +
      //   '<div><span class="icon iconfontprn iconprnRight fancy-arrow fancy-arrow-right"></span></div>' +
      //   "</button>",
    },
    lang: lang.text,
    i18n: {
      en: {
        CLOSE: "Close",
        NEXT: "Next",
        PREV: "Previous",
        ERROR:
          "The requested content cannot be loaded. <br/> Please try again later.",
        THUMBS: "Thumbnails",
        DOWNLOAD: "Download",
        SHARE: "Share",
        ZOOM: "Zoom",
        COPYLINK: "Copy link",
        COPYLINKSUCCESS: "The Link has been copied successfully",
        SIZESMALL: "Thumbnail",
        SIZEMID: "Small Image",
        SIZELARGE: "Large Image",
        CAPTION: "Caption: ",
        RELEASELINK: "Related Press Releases Links: ",
        SOURCE: "Source: ",
      },
      cn: {
        CLOSE: "关闭",
        NEXT: "下一张",
        PREV: "上一张",
        ERROR: "内容无法加载， <br/> 请稍后再试",
        THUMBS: "缩略图",
        DOWNLOAD: "下载",
        SHARE: "分享",
        ZOOM: "缩放",
        COPYLINK: "复制链接",
        COPYLINKSUCCESS: "复制链接成功",
        SIZESMALL: "缩略图",
        SIZEMID: "小尺寸",
        SIZELARGE: "高清大图",
        CAPTION: "图片说明：",
        RELEASELINK: "相关新闻稿链接：",
        SOURCE: "消息来源：",
      },
      vn: {
        CLOSE: "Đóng",
        NEXT: "Tiếp",
        PREV: "Trước",
        ERROR: "Không tải được tải liệu yêu cầu <br/> Hãy thử lại",
        THUMBS: "Thumbnail",
        DOWNLOAD: "Tải",
        SHARE: "Chia sẻ",
        ZOOM: "Zoom",
        COPYLINK: "Sao chép đường dẫn",
        COPYLINKSUCCESS: "Đường dẫn đã được sao chép thành công",
        SIZESMALL: "Thumbnail",
        SIZEMID: "Ảnh nhỏ",
        SIZELARGE: "Ảnh lớn",
        CAPTION: "Chú thích: ",
        RELEASELINK: "Đường link liên quan tới Thông cáo báo chí: ",
        SOURCE: "Nguồn: ",
      },
      jp: {
        CLOSE: "閉じる",
        NEXT: "次",
        PREV: "前",
        ERROR:
          "リクエストされたコンテンツを読み込めません。<br/> 後でもう一度お試しください。",
        THUMBS: "サムネイル",
        DOWNLOAD: "ダウンロード",
        SHARE: "シェア",
        ZOOM: "Zoom",
        COPYLINK: "リンクのコピー",
        COPYLINKSUCCESS: "リンクが正常にコピーされました。",
        SIZESMALL: "サムネイル表示",
        SIZEMID: "小さめの画像",
        SIZELARGE: "大きめの画像",
        CAPTION: "キャプション: ",
        RELEASELINK: "関連するプレスリリースへのリンク: ",
        SOURCE: "ソース: ",
      },
      kr: {
        CLOSE: "닫기",
        NEXT: "다음",
        PREV: "이전",
        ERROR:
          "요청한 콘텐츠를 업로드 할 수 없습니다.<br/> 나중에 다시 시도하십시오.",
        THUMBS: "썸네일",
        DOWNLOAD: "다운로드",
        SHARE: "공유",
        ZOOM: "줌",
        COPYLINK: "링크 복사",
        COPYLINKSUCCESS: "링크가 성공적으로 복사되었습니다.",
        SIZESMALL: "썸네일",
        SIZEMID: "작은 이미지",
        SIZELARGE: "큰 이미지",
        CAPTION: "캡션: ",
        RELEASELINK: "관련 보도 자료 링크: ",
        SOURCE: "출처: ",
      },
    },
  });

  // 工具栏有下拉菜单的自定义按钮的显示和隐藏
  $("body").on("click", ".fancybox-button--toggle", function (e) {
    e.stopPropagation();
    if ($(this).hasClass("show")) {
      $(this).removeClass("show");
    } else {
      $(".fancybox-button--toggle").removeClass("show");
      $(this).addClass("show");
    }
  });
  $("body").on("click", function () {
    if ($(".fancybox-button--toggle").hasClass("show")) {
      $(".fancybox-button--toggle").removeClass("show");
    }
  });

  function getDownloadHideWidth(code) {
    if (code === 1) {
      // cn
      return 100;
    } else if (code === 3) {
      // jp
      return 150;
    } else if (code === 9) {
      // kr
      return 130;
    } else if (code === 11) {
      // vn
      return 125;
    } else {
      // en 0 default
      return 130;
    }
  }

  // 下载按钮添加
  $.fancybox.defaults.btnTpl.download =
    '<button data-fancybox-download class="fancybox-button fancybox-button--download fancybox-button--toggle" title="{{DOWNLOAD}}">' +
    '<span class="icon iconfontprn iconprndownload"></span>' +
    '<div class="fancybox-button--hide fancybox-button--hide-download" style="width: ' +
    getDownloadHideWidth(lang.code) +
    'px;"><div class="fancybox-button--hide-arrow"></div><div class="fb-download-type" data-size="thumbnail150"><div class="fb-download-thumbnail"><span class="icon iconfontprn iconprnimage1" style="font-size: 12px;"></span></div><span>{{SIZESMALL}}</span></div><div class="fb-download-type" data-size="medium600"><div class="fb-download-thumbnail"><span class="icon iconfontprn iconprnimage1" style="font-size: 14px;"></span></div><span>{{SIZEMID}}</span></div><div class="fb-download-type" data-size="publish"><div class="fb-download-thumbnail"><span class="icon iconfontprn iconprnimage1" style="font-size: 16px;"></span></div><span>{{SIZELARGE}}</span></div></div>' +
    "</button>";

  // 下载按钮下拉菜单的功能
  $("body").on("click", ".fb-download-type", function () {
    var size = $(this).attr("data-size");
    window.open(currentSrc.replace(/\?p=\w*$/i, "?p=" + size));
  });

  function getPrnshareByLang(code) {
    if (code === 1) {
      // cn
      return (
        '<button data-fancybox-prnshare class="fancybox-button fancybox-button--prnshare fancybox-button--toggle" title="{{SHARE}}">' +
        '<span class="icon iconfontprn iconprnshare"></span>' +
        '<div class="fancybox-button--hide fancybox-button--hide-prnshare" style="width: 150px;"><div class="fancybox-button--hide-arrow"></div><div class="cshare"><div class="shareicon"><a class="share-weibo"></a></div><div class="shareicon"><a class="share-weixin"></a></div><div class="shareicon"><a class="share-linkedin"></a></div><div class="shareicon"><a  class="share-qzone"></a></div></div></div>'
      );
    } else if (code === 3) {
      // jp
      return (
        '<button data-fancybox-prnshare class="fancybox-button fancybox-button--prnshare fancybox-button--toggle" title="{{SHARE}}">' +
        '<span class="icon iconfontprn iconprnshare"></span>' +
        '<div class="fancybox-button--hide fancybox-button--hide-prnshare" style="width: 150px"><div class="fancybox-button--hide-arrow"></div><div class="cshare"><div class="shareicon"><a class="share-facebook"></a></div><div class="shareicon"><a class="share-twitter"></a></div><div class="shareicon"><a class="share-linkedin"></a></div><div style="display: none"><figure><img src="" alt="" /></figure></div><div class="shareicon"><a class="share-lineline"></a></div></div></div>'
      );
    } else if (code === 9) {
      // kr
      return (
        '<button data-fancybox-prnshare class="fancybox-button fancybox-button--prnshare fancybox-button--toggle" title="{{SHARE}}">' +
        '<span class="icon iconfontprn iconprnshare"></span>' +
        '<div class="fancybox-button--hide fancybox-button--hide-prnshare" style="width: 150px"><div class="fancybox-button--hide-arrow"></div><div class="cshare"><div class="shareicon"><a class="share-facebook"></a></div><div class="shareicon"><a class="share-twitter"></a></div><div class="shareicon"><a class="share-linkedin"></a></div><div style="display: none"><figure><img src="" alt="" /></figure></div><div class="shareicon"><a class="share-lineline"></a></div></div></div>'
      );
    } else if (code === 11) {
      // vn
      return (
        '<button data-fancybox-prnshare class="fancybox-button fancybox-button--prnshare fancybox-button--toggle" title="{{SHARE}}">' +
        '<span class="icon iconfontprn iconprnshare"></span>' +
        '<div class="fancybox-button--hide fancybox-button--hide-prnshare" style="width: 120px"><div class="fancybox-button--hide-arrow"></div><div class="cshare"><div class="shareicon"><a class="share-facebook"></a></div><div class="shareicon"><a class="share-twitter"></a></div><div class="shareicon"><a class="share-linkedin"></a></div><div style="display:none;"><figure><img src="" alt=""></figure></div></div></div>'
      );
    } else {
      // 把en（code === 0）作为默认
      return (
        '<button data-fancybox-prnshare class="fancybox-button fancybox-button--prnshare fancybox-button--toggle" title="{{SHARE}}">' +
        '<span class="icon iconfontprn iconprnshare"></span>' +
        '<div class="fancybox-button--hide fancybox-button--hide-prnshare" style="width: 200px;"><div class="fancybox-button--hide-arrow"></div><div class="cshare"><div class="shareicon"><a class="share-facebook"></a></div><div class="shareicon"><a class="share-twitter"></a></div><div class="shareicon"><a class="share-linkedin"></a></div><div style="display: none"><figure><img src="" alt="" /></figure></div><div class="shareicon"><a class="share-weixin"></a></div><div class="shareicon"><a class="share-weibo"></a></div></div></div>'
      );
    }
  }

  // 分享按钮添加
  $.fancybox.defaults.btnTpl.prnshare = getPrnshareByLang(lang.code);
  // $.fancybox.defaults.btnTpl.prnshare =
  //   lang.code === 1
  //     ? '<button data-fancybox-prnshare class="fancybox-button fancybox-button--prnshare fancybox-button--toggle" title="{{SHARE}}">' +
  //       '<span class="icon iconfontprn iconprnshare"></span>' +
  //       '<div class="fancybox-button--hide fancybox-button--hide-prnshare" style="width: 150px;"><div class="fancybox-button--hide-arrow"></div><div class="cshare"><div class="shareicon"><a class="share-weibo"></a></div><div class="shareicon"><a class="share-weixin"></a></div><div class="shareicon"><a class="share-linkedin"></a></div><div class="shareicon"><a  class="share-qzone"></a></div></div></div>'
  //     : '<button data-fancybox-prnshare class="fancybox-button fancybox-button--prnshare fancybox-button--toggle" title="{{SHARE}}">' +
  //       '<span class="icon iconfontprn iconprnshare"></span>' +
  //       '<div class="fancybox-button--hide fancybox-button--hide-prnshare" style="width: 200px;"><div class="fancybox-button--hide-arrow"></div><div class="cshare"><div class="shareicon"><a class="share-facebook"></a></div><div class="shareicon"><a class="share-twitter"></a></div><div class="shareicon"><a class="share-linkedin"></a></div><div style="display: none"><figure><img src="" alt="" /></figure></div><div class="shareicon"><a class="share-weixin"></a></div><div class="shareicon"><a class="share-weibo"></a></div></div></div>';

  // 下载按钮下拉菜单的功能
  $("body").on("click", ".fancybox-button--prnshare", function () {
    if (!shareInitDone) {
      var option = {
        lang: lang.code,
        title: document.title,
        url: window.location.href.split("#")[0],
        // url: window.location.href,
        summary: $("meta[name='description']").attr("content"),
        pic: "",
        picMore1: srcList.join("||"),
      };
      cShare.addDefine(option);
      shareInitDone = true;
    }
  });

  $("body").on(
    "click",
    ".fancybox-button--prnshare .share-weixin",
    function (e) {
      e.stopPropagation();
    }
  );

  // 复制链接按钮添加
  $.fancybox.defaults.btnTpl.copylink =
    '<button data-fancybox-copylink class="fancybox-button fancybox-button--copylink" title="{{COPYLINK}}" data-message="{{COPYLINKSUCCESS}}">' +
    '<span class="icon iconfontprn iconprnlink"></span>' +
    "</button>";

  // 复制链接按钮的功能
  $("body").on("click", "[data-fancybox-copylink]", function () {
    var input = document.createElement("input");
    // 兼容在iOS环境下瞬间拉起键盘又缩回的闪烁
    input.setAttribute("readonly", "readonly");
    // input.setAttribute("value", currentSrc);
    input.setAttribute("value", window.location.href);
    document.body.appendChild(input);
    // 兼容在iOS环境下，input.select()没有选中全部内容
    input.setSelectionRange(0, currentSrc.length);
    input.select();
    if (document.execCommand("copy")) {
      document.execCommand("copy");
      alert($(this).attr("data-message"));
    }
    document.body.removeChild(input);
  });
});
