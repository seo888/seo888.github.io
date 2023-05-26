function getViews(contentId, nodeId, baseUrl, max) {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //发送请求
    var url = '/content_view.jspt?contentId=' + contentId
    if (baseUrl) {
        url = baseUrl + url
    }
    xhr.open('get', url, false);
    xhr.send();
    //同步接受响应
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            let num = JSON.parse(xhr.responseText)[0]
            //实际操作
            if (nodeId && (!max || max < num)) {
                document.getElementById(nodeId).textContent = JSON.parse(xhr.responseText)[0];
            } else if (nodeId) {
                document.getElementById(nodeId).style.display = "none"
            }
        }
    }
}

// 动态加载change_pc_mobile.js ,切换pc or H5 路由 start
function appendJQ() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.setAttribute("src", "https://imgfile.estv.com.cn/common/change_pc_mobile.js");
    head.appendChild(script);
}
// 执行
appendJQ();
// 动态加载change_pc_mobile.js ,切换pc or H5 路由 end