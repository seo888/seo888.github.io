(function() {
    var matches = location.href.match(/\/(\d+)\.shtml/);
    var targetId = matches ? matches[1]: 0;
    spm.config({ 
      siteId: "zm1217-001",
      additionalInfo: {
        targetID: targetId,
        organization: "zm1217",
        category: 'event',
        action: 'comeIn'
      }
     });
    window.onbeforeunload = function() {
        spm.push({ category: 'event', action: 'leave' });
    };
    $('#supports').click(function() {
        spm.push({ category: 'event', action: 'praise' });
    });
})();

