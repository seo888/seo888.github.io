window.addEventListener('load', function () {
  //尾部碎片
  var strs_footer =
    '<p style="text-align: center">联系我们:585 597 3@qq.com<br />
关于我们| 联系方式| 版权声明| 供稿服务| 友情链接</p>
<p style="text-align: center"><a href="https://beian.miit.gov.cn/"><span style="color: #ffffff">沪ICP备2022005074号-17</span></a></p>
<p style="text-align: center"><a href="http://xin.cwan.com/"><span style="color: #ffffff">国际新闻网</span></a>&nbsp;版权所有，未经书面授权禁止使用</p>
<p style="text-align: center">Copyright&copy;2008-2020 By <a href="http://xin.cwan.com/"><span style="color: #ffffff">xin.cwan.com</span></a> All Rights Reserved</p>'
  //内容页广告碎片
  var strs_right =
    '<div class="adver_3"><script type="text/javascript" src="http://user.042.cn/adver/adver.js"></script><script type="text/javascript">getAdvert(".adver_3",1,"300px","300px");</script></div>'
  //首页广告碎片
  var strs_top =
    '<div class="adver"><script type="text/javascript" src="http://user.042.cn/adver/adver.js"></script><script type="text/javascript">getAdvert(".adver",4,"1200px","90px");</script></div>'
  //移动端广告碎片
  var strs_wap = ''
  // 尾部信息展示div的固定class
  var beian = document.querySelectorAll('.beian')
  //首页广告调用位置class
  var adindex = document.querySelectorAll('.adindex')
  // 右侧广告调用位置class
  var adlist = document.querySelectorAll('.adlist')
  // 移动端广告调用位置class
  var adwap = document.querySelectorAll('.adwap')
  /**
   * 有几个需要调用的碎片就调用对应数量的函数
   * @param css类名
   * @param 碎片名称
  */

  adddom(beian, strs_footer)
  adddom(adlist, strs_right)
  adddom(adindex, strs_top)
  adddom(adwap, strs_wap)
  
  function adddom(dom, htm) {
    if (dom.length > 1) {
      for (let i = 0; i < dom.length; i++) {
        dom[i].insertAdjacentHTML('afterbegin', htm)
        loadJsBtn(dom)
      }
    } else if (dom.length == 1) {
      dom[0].insertAdjacentHTML('afterbegin', htm)
      if (dom[0].querySelectorAll('script')[0]) {
        loadJsBtn(dom)
      }
    } else {
      return
    }
  }
  // 添加js


function loadJs(loadUrl, callMyFun, dom) {
  var loadScript = document.createElement('script')
  loadScript.setAttribute('type', 'text/javascript')
  loadScript.setAttribute('src', loadUrl)
  document.getElementsByTagName('head')[0].appendChild(loadScript)
  if (navigator.userAgent.indexOf('IE') >= 0) {
    //IE下的事件
    loadScript.onreadystatechange = function () {
      if (loadScript && (loadScript.readyState == 'loaded' || loadScript.readyState == 'complete')) {
        //表示加载成功
        loadScript.onreadystatechange = null
        callMyFun(dom)
        //执行回调
      }
    }
  } else {
    loadScript.onload = function () {
      loadScript.onload = null
      callMyFun(dom)
    }
  }
}

function loadJsBtn(dom) {
  loadJs(dom[0].querySelectorAll('script')[0].src, callMyFun, dom)
}
function callMyFun(dom) {
  eval(dom[0].querySelectorAll('script')[1].innerHTML)
}
})