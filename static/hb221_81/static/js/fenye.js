function getDataResult1 (pageUrl, callback) {
  $.ajax({
    url: pageUrl,
    type: 'GET',
    async: true,
    success: function (res) {
      callback && callback(res);
    },
    error: function (error) {
      console.log(error)
    }
  });
}
function getDataResult2 (testUrl, formData, callback) {
  $.ajax({
    url: testUrl,
    type: 'POST',
    dataType: 'json',
    data: formData,
    async: true,
    cache: false, //上传文件不需要缓存
    processData: false, // 告诉jQuery不要去处理发送的数据
    contentType: false, // 告诉jQuery不要去设置Content-Type请求头
    success: function (res) {
      callback && callback(res);
    },
    error: function (error) {
      console.log(error)
    }
  });
}
function createPageHTML (
  _nPageCount,
  _nCurrIndex,
  _sPageName,
  _sPageExt,
  _recordCount,
  _type,
  _isDetail
) {
  //  _isDetail 是否是详情页，detail:表示是详情页，为空的话是列表页
  var iWinWidth1 = window.innerWidth || $(window).width();
  console.log(
    '总页数', _nPageCount,
    '当前页', _nCurrIndex,
    '_sPageName', _sPageName,
    '_sPageExt', _sPageExt,
    '总数', _recordCount,
    '分页类型', _type,
    '详情页类型', _isDetail
  )
  _nPageCount = parseInt(_nPageCount)
  _nCurrIndex = parseInt(_nCurrIndex)
  var displaypagenum = $('#displaypagenum')
  var loadNextPageBtn = $('#loadNextPageBtn')

  if (_nPageCount <= 1) {
    displaypagenum.remove()
    loadNextPageBtn.remove()
  }

  // First Prev 1 2 3 4 5 6 7 Next Last
  var edition = document.documentElement.lang
  var FirstName = ''
  var PrevName = ''
  var NextName = ''
  var LastName = ''
  var MoreName = ''
  var clickNext = ''
  var noMore = ''
  var PageN = ''
  var PageY = ''
  if (edition !== 'en') {
    // 中文
    FirstName = '首页'
    PrevName = '上一页'
    NextName = '下一页'
    LastName = '尾页'
    MoreName = '加载中...'
    clickNext = '轻触这里，加载下一页'
    noMore = '没有更多的数据'
    PageN = '第'
    PageY = '页'
  } else {
    // 英文
    FirstName = 'First'
    PrevName = 'Prev'
    NextName = 'Next'
    LastName = 'Last'
    MoreName = 'More...'
    clickNext = 'MORE'
    noMore = 'NO MORE'
    PageN = 'Page'
    PageY = ''
  }

  /**
   * 获取url参数
   */
  window.getParamVal = function () {
    var params = {}
    var arr = location.search.substring(1).split('&')
    var aTmp = null
    var numberVal = null
    var value = null

    if (location.search !== '') {
      for (var i = 0, iLen = arr.length; i < iLen; i++) {
        aTmp = arr[i].split('=')
        value = decodeURIComponent(aTmp[1])
        numberVal = Number(value)
        // 处理数字
        if (typeof numberVal === 'number' && numberVal === numberVal) {
          value = numberVal
        }
        // 处理布尔值
        if (value === 'true' || value === 'false') {
          value = value === 'true'
        }
        params[aTmp[0]] = value
      }
    }
    return params
  }

  // 滚动加载
  var scrollMore = function () {
    if (_nPageCount == null || _nPageCount <= 1) {
      return
    }
    displaypagenum.attr("data-count", _nPageCount).attr("data-index", _nCurrIndex);
  }

  var computesTimeInfo = function () {
    var arr = $('[data-count]');
    if (arr.length > 0) {
      var words = 0;
      $.each(arr, function (index, item) {
        words = parseInt(item.getAttribute('data-count'))
        if (words < 5) {
          $(item).find('span').text("多媒体稿件，阅读全文约需 3 分钟");
        } else {
          $(item).find('span').text(words + " 字，阅读全文约需 " + Math.ceil(words / 300) + " 分钟");
        }
      })
    }
  }

  // 分页
  var fenYeMore = function () {
    if (_nPageCount == null || _nPageCount <= 1) {
      return
    }
    var nCurrIndex = _nCurrIndex || 0

    var me = this;
    var content = [];
    var pageNum = nCurrIndex;
    var totalNum = _nPageCount;

    // 首页
    content.push('<a href="' + _sPageName + '.' + _sPageExt + '">' + FirstName + '</a>');
    // 上一页
    if (_nPageCount >= 2 && nCurrIndex >= 2) {
      if ((nCurrIndex - 1) === 1) {
        content.push('<a href="' + _sPageName + '.' + _sPageExt + '">' + PrevName + '</a>');
      } else {
        content.push('<a href="' + _sPageName + '_' + (nCurrIndex - 1) + '.' + _sPageExt + '">' + PrevName + '</a>');
      }
    }
    // 总页数大于6必显示省略号
    if (totalNum > 6) {
      // 1、当前页码小于5且总页码大于6 省略号显示后面+总页码
      if (pageNum < 5) {
        // 1与6主要看要显示多少个按钮 目前都显示5个
        for (var i = 1; i < 6; i++) {
          if (pageNum !== i) {
            if (i === 1) {
              content.push('<a href="' + _sPageName + '.' + _sPageExt + '">' + i + '</a>');
            } else {
              content.push('<a href="' + _sPageName + '_' + i + '.' + _sPageExt + '">' + i + '</a>');
            }
          } else {
            content.push('<span class="page">' + i + '</span>');
          }
        }
        content.push(". . .");
        if (totalNum === 1) {
          content.push('<a href="' + _sPageName + '.' + _sPageExt + '">' + totalNum + '</a>');
        } else {
          content.push('<a href="' + _sPageName + '_' + totalNum + '.' + _sPageExt + '">' + totalNum + '</a>');
        }
      } else {
        // 2、当前页码接近后面 到最后页码隔3个 省略号显示后面+总页面
        if (pageNum < totalNum - 3) {
          for (var i = pageNum - 2; i < pageNum + 3; i++) {
            if (pageNum !== i) {
              if (i === 1) {
                content.push('<a href="' + _sPageName + '.' + _sPageExt + '">' + i + '</a>');
              } else {
                content.push('<a href="' + _sPageName + '_' + i + '.' + _sPageExt + '">' + i + '</a>');
              }
            } else {
              content.push('<span class="page">' + i + '</span>');
            }
          }
          content.push(". . .");
          if (totalNum === 1) {
            content.push('<a href="' + _sPageName + '.' + _sPageExt + '">' + totalNum + '</a>');
          } else {
            content.push('<a href="' + _sPageName + '_' + totalNum + '.' + _sPageExt + '">' + totalNum + '</a>');
          }
        } else {
          // 3、页码至少在5，最多在【totalNum - 3】的中间位置 第一页+省略号显示前面
          content.push('<a href="' + _sPageName + '.' + _sPageExt + '">1</a>');
          content.push(". . .");
          for (var i = totalNum - 4; i < totalNum + 1; i++) {
            if (pageNum !== i) {
              if (i === 1) {
                content.push('<a href="' + _sPageName + '.' + _sPageExt + '">' + i + '</a>');
              } else {
                content.push('<a href="' + _sPageName + '_' + i + '.' + _sPageExt + '">' + i + '</a>');
              }
            } else {
              content.push('<span class="page">' + i + '</span>');
            }
          }
        }
      }
    } else {
      // 总页数小于6
      for (var i = 1; i < totalNum + 1; i++) {
        if (pageNum !== i) {
          if (i === 1) {
            content.push('<a href="' + _sPageName + '.' + _sPageExt + '">' + i + '</a>');
          } else {
            content.push('<a href="' + _sPageName + '_' + i + '.' + _sPageExt + '">' + i + '</a>');
          }
        } else {
          content.push('<span class="page">' + i + '</span>');
        }
      }
    }
    // 下一页
    if (_nPageCount >= 2 && _nCurrIndex != _nPageCount) {
      if ((nCurrIndex + 1) === 1) {
        content.push('<a href="' + _sPageName + '.' + _sPageExt + '">' + NextName + '</a>');
      } else {
        content.push('<a href="' + _sPageName + '_' + (nCurrIndex + 1) + '.' + _sPageExt + '">' + NextName + '</a>');
      }
    }

    // 尾页
    if (_nPageCount === 1) {
      content.push('<a class="next" href="' + _sPageName + '.' + _sPageExt + '">' + LastName + '</a>');
    } else {
      content.push('<a class="next" href="' + _sPageName + '_' + _nPageCount + '.' + _sPageExt + '">' + LastName + '</a>');
    }
    displaypagenum.html(content.join(''));
  }

  if (_type === 'fenye') {
    $('body').addClass('fenye-more')
    if (iWinWidth1 <= 992) {
      // 手机端 滚动加载
      scrollMore()
    } else {
      fenYeMore()
    }
  } else if (_isDetail === 'all') {
    $('body').addClass('fenye-more')
    fenYeMore()
  } else {
    $('body').addClass('scroll-more')
    // 滚动加载
    scrollMore()
  }

  window.counter = Number(displaypagenum.attr('data-count')); /*计数器*/
  window.pageStart = Number(displaypagenum.attr('data-index')); /*offset*/


  // 分页-移动端加载更多
  function BingLoadNextPageEvent () {
    var isEnd = true;/*结束标志*/
    var bottomH = 200;//距离底部多少像素开始加载
    loadNextPageBtn.html('<span>' + clickNext + '</span><br><small id="VProgress">' + pageStart + '/' + counter + '</small>');
    if (pageStart === counter) {
      loadNextPageBtn.remove()
    }
    /*监听加载更多*/
    var getFn = function () {
      var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop() + bottomH);
      if ($(document).height() <= totalheight) {
        if (isEnd) {
          isEnd = false
          pageStart++;
          if (pageStart <= counter) {
            LoadPage(counter, pageStart, loadNextPageBtn, function () {
              if (counter === pageStart) {
                isEnd = false
              }
              isEnd = true
            });
          } else {
            loadNextPageBtn.remove();
            return;
          }
        }
      }
    }
    loadNextPageBtn.on('click', function () {
      getFn()
    })
    console.log('pageStart', pageStart)
    if (pageStart > 1) {
      $('#main-news-list').html('')
      var runRequests = function (userIndex) {
        if (userIndex <= counter) {
          var numFruit = LoadPage(counter, userIndex, loadNextPageBtn, function () {
            if (userIndex == pageStart) {
              isEnd = true
            } else {
              runRequests(++userIndex);
            }
          });
          var testDEs = numFruit
        } else {
          loadNextPageBtn.remove();
        }
      };
      if (1 < pageStart) {
        runRequests(1);
      }
    }
  }

  function fixsLayout () {
    //var maxHeight = 0;
    var maxHeight =
      $('#main-news-list .list-box img').height() +
      $('#main-news-list .title').height() +
      $('#main-news-list .time').height()
    var list = $('#main-news-list .list-box')
    list.each(function (index, item) {
      maxHeight = maxHeight < $(item).height() ? $(item).height() : maxHeight
    })
    list.css({ height: maxHeight + 'px' })
  }

  // pc 滚动也加载更多
  function BingLoadNextPageEventMore () {
    console.log('pc more')
    var isEnd = true;/*结束标志*/
    var bottomH = 200;//距离底部多少像素开始加载
    loadNextPageBtn.html('[' + pageStart + '/' + counter + '] ' + MoreName + '');
    // console.log(counter)
    if (counter > 2) {

    } else {
      loadNextPageBtn.remove()
    }
    /*监听加载更多*/
    var getFn1 = function () {
      var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop() + bottomH);
      if ($(document).height() <= totalheight) {
        if (isEnd) {
          isEnd = false
          pageStart++;
          if (pageStart <= counter) {
            LoadPage(counter, pageStart, loadNextPageBtn, function () {
              if (counter === pageStart) {
                isEnd = false
              }
              isEnd = true
              fixsLayout()
            });
          } else {
            loadNextPageBtn.remove();
            return;
          }
        }
      }
    }
    loadNextPageBtn.on('click', function () {
      getFn1()
    })
    $(window).scroll(function () {
      getFn1()
    });
  }

  /**
   * Ajax 加载下一页数据
   * @param pageInfo
   * @param loadNextPageBtn
   * @constructor
   */
  function LoadPage (totalPageNum, currentPage, loadNextPageBtn, callback) {
    console.log('totalPageNum', totalPageNum, currentPage)
    var url = ''
    var pageUrl = ''
    var param = getParamVal()
    var ajaxResult = ''
    var contFn = function (data) {
      // console.log('data', data)
      //取出页面中的正文部分
      var ContentHtml_Reg = new RegExp("<!--HTMLBOX-->([\\s\\S]+)<!--HTMLBOX-->", "i");
      ajaxResult = data.match(ContentHtml_Reg);
      ajaxResult = ajaxResult[1].replace(/<!--[\w\W\r\n]*?-->/gmi, "");
      ajaxResult = ajaxResult.replace(/<([^\s>]+)[^>]*>(\s*)<\/\1>/gmi, "");
      // console.log(ajaxResult)
      if (_type === 'fenye') {
        if (_isDetail === 'page-split') {
          ajaxResult = '<div class="page-split"><hr><small class="pageNum">' + PageN + currentPage + PageY + '</small></div>' + ajaxResult
        } else {
          ajaxResult = '<hr><small class="pageNum">' + PageN + currentPage + PageY + '</small>' + ajaxResult
        }
      }
      $('#main-news-list').append(ajaxResult);
      callback && callback()
      if (currentPage === totalPageNum) {
        loadNextPageBtn.html(noMore);
        loadNextPageBtn.remove();
      } else {
        if (_type === 'fenye') {
          loadNextPageBtn.html('<span>' + clickNext + '</span><br><small id="VProgress">' + currentPage + '/' + totalPageNum + '</small>');
        } else {
          loadNextPageBtn.text('[' + currentPage + '/' + totalPageNum + ']' + MoreName);
        }
      }
      if (edition !== 'en') {
        setS2T()
        computesTimeInfo()
      }
    }
    if (!param['token']) {
      console.log('正式链接')
      // 正式链接
      if (_isDetail !== 'detail') {
        // 非详情页
        console.log('列表页')
        url = window.location.href.split('index')[0];
        if (currentPage === 1) {
          pageUrl = url + 'index.html';
        } else {
          pageUrl = url + 'index_' + currentPage + '.html';
        }
        console.log('pageUrl', pageUrl)
      } else {
        // 是详情页
        console.log('详情页')
        url = window.location.href;
        var lastIndex = url.lastIndexOf('/'); //取_前面的值
        var urlFirst = url.substring(0, lastIndex); //取_前面的值
        var urlLast = url.substring(lastIndex, url.length); //取_面的值
        console.log(lastIndex, urlFirst, urlLast)
        if (urlLast.indexOf('_') !== -1) {
          // console.log('有_')
          // 循环从第2页开始
          var name = urlLast.split('_')
          if (currentPage === 1) {
            pageUrl = urlFirst + name[0] + '.html'
          } else {
            pageUrl = urlFirst + name[0] + '_' + currentPage + '.html';
          }
        } else {
          // 循环从第一页开始
          // console.log('无_')
          name = urlLast.split('.')
          if (currentPage === 1) {
            pageUrl = urlFirst + name[0] + '.html'
          } else {
            pageUrl = urlFirst + name[0] + '_' + currentPage + '.html';
          }
        }
        console.log('pageUrl1', pageUrl, currentPage)
      }
      getDataResult1(pageUrl, function (res) {
        contFn(res)
      });
    } else {
      // 测试链接
      var formData = new FormData()
      var params = _isDetail === 'detail' ? {
        token: param['token'],
        id: param['id'],
        page: currentPage === 1 ? (param['id'] + '.html') : param['id'] + '_' + currentPage + '.html'
      } : {
        token: param['token'],
        device: param['device'],
        routerPath: param['routerPath'],
        channel_classify_id: param['channel_classify_id'],
        page: currentPage === 1 ? ('index.html') : 'index_' + currentPage + '.html'
      }
      for (var key in params) {
        formData.append(key, params[key])
      }
      var testUrl = _isDetail === 'detail' ? 'https://rmt-zuul.81.cn/api-editing/edit/published/publishManuscriptPreview' : 'https://rmt-zuul.81.cn/api-editing/edit/published/publishClassifyPreview'
      getDataResult2(testUrl, formData, function (res) {
        var data = res.data.html_content
        contFn(data)
      })
    }
  }

  if (_type === 'fenye') {
    // $(window).resize(function () {
    //   BingLoadNextPageEvent();
    // });
    BingLoadNextPageEvent();
  } else {
    // pc scroll 等
    $(window).resize(function () {
      BingLoadNextPageEventMore()
      fixsLayout()
    })
    BingLoadNextPageEventMore()
    fixsLayout()
  }
  if (edition !== 'en') {
    computesTimeInfo()
  }
}