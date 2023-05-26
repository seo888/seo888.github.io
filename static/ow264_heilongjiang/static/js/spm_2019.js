
var url=window.location.href;
var len=url.lastIndexOf('/');
var newurl=url.substring(len+1);
var nid=newurl.substring(0,9);
  if (window.spm) {
    // 初始化配置
       spm.config({
      siteId: "zm5115-001", // 此处填写该网站对应的网站标识（即SPM a段） 例如'zmXXXX-001'
      additionalInfo: {
      targetID: nid, // 此处填写稿件ID
      organization: "zm5115", // 此处填写机构ID
        // 上报进入事件
        category: 'event',
        action: 'comeIn'
      }
    });
  }
  window.onbeforeunload = function () {
    // 上报离开事件
    spm.push({ category: 'event', action: 'leave' });
  };
