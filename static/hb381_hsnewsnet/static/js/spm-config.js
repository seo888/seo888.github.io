
spm.config({
  siteId: "zm5008-001", // 此处填写该网站对应的网站标识（即SPM a段） 例如'zmXXXX-001'
  additionalInfo: {
     targetID: gid, // 此处填写稿件ID
     organization: "zm5008", // 此处填写机构ID
      // 上报进入事件
     category: 'event',
     action: 'comeIn'
  }
})

window.onbeforeunload = function () {
    // 上报离开事件
    spm.push({ category: 'event', action: 'leave' });
};
