/**
 * 监听页面HTML加载完成事件
 */
window.addEventListener('DOMContentLoaded', function () {
  /**
   * 碎片HTML和页面上需要添加的类名
   * 碎片不能包含回车符 函数里面参数需要使用双引号 例：getAdvert(".adver",4,"1200px","90px");
   */
  const suipian = [
    {
      htm: 'QQ邮箱：435 226 40@qq.com Copyright &copy; 2002-2023 信报网版权所有 &copy;<a href="https://beian.miit.gov.cn/" target="_blank"><span id="bah">京ICP备2022022245号</span></a>',
      leiming: '.beian'
    },
    {
      htm: '',
      leiming: '.beian_zg'
    },
    {
      htm: '<div class="adver"><script type="text/javascript" src="http://user.042.cn/adver/adver.js"></script><script type="text/javascript">getAdvert(".adver",4,"1200px","90px");</script></div>',
      leiming: '.adindex'
    },
    {
      htm: '<div class="adver_3"><script type="text/javascript" src="http://user.042.cn/adver/adver.js"></script><script type="text/javascript">getAdvert(".adver_3",1,"300px","300px");</script></div>',
      leiming: '.adlist'
    },
    {
      htm: '<div class="adver_3"><script type="text/javascript" src="http://user.042.cn/adver/adver.js"></script><script type="text/javascript">getAdvert(".adver_3",2,"","80px");</script></div>',
      leiming: '.adwap'
    }
  ]
  /**
   * @function 添加碎片调用函数
   * @param suipian {Array} 碎片数组
   */
  function add_suipian(suipian) {
    for (let j = 0; j < suipian.length; j++) {
      let dom = document.querySelectorAll(suipian[j].leiming)
      for (let i = 0; i < dom.length; i++) {
        dom[i].insertAdjacentHTML('afterbegin', suipian[j].htm)
        if (dom[i].querySelectorAll('script')[0]) {
          let loadScript = document.createElement('script')
          let url = dom[i].querySelectorAll('script')[0].src
          loadScript.setAttribute('type', 'text/javascript')
          loadScript.setAttribute('src', url)
          document.getElementsByTagName('head')[0].appendChild(loadScript)
          loadScript.onload = function () {
            loadScript.onload = null
            eval(dom[0].querySelectorAll('script')[1].innerHTML)
          }
        }
      }
    }
  }
  add_suipian(suipian)
})
