(function () {
    //畅言滤重
    if (window.changyan !== undefined || window.cyan !== undefined) {
        return;
    }
    var createNs = function () {
        if (window.changyan !== undefined) {
            return;
        } else {
            window.changyan = {};
            window.changyan.api = {};
            window.changyan.api.config = function (conf) {
                window.changyan.api.tmpIsvPageConfig = conf;
                
                // 日志 记录加载changyan.js的加载
                (function() {
                    try {
                        window.__cyappid=conf.appid;
                        var clientId = conf.appid;
                        (function(i,s,o,g,r,a,m) {
                            i['KZAnalyticsObject'] = r; i[r] = i[r] || function() {(i[r].q = i[r].q || []).push(arguments);};
                            a = s.createElement(o); m = s.getElementsByTagName(o)[0]; a.sync = 1; a.src = g;
                            m.parentNode.insertBefore(a, m);
                        })(window, document, "script", "//pv.kuaizhan.com/kzcollector.min.js?version=0.1", "kaq");
                        kaq('create', 'cy')
                        kaq('send', 'event', 'cy-pc', 'cy-pc', clientId)
                    } catch(e) {}
                })();
            };
            window.changyan.api.ready = function (fn) {
                window.changyan.api.tmpHandles = window.changyan.api.tmpHandles || [];
                window.changyan.api.tmpHandles.push(fn);
            };
            window.changyan.ready = function (fn) {
              if (window.changyan.rendered) {
                fn && fn();
              } else {
                window.changyan.tmpHandles = window.changyan.tmpHandles || [];
                window.changyan.tmpHandles.push(fn);
              }
            }
        }
    };

    var createMobileNs = function () {
        if (window.cyan) {
            return;
        }

        window.cyan = {};
        window.cyan.api = {};
        window.cyan.api.ready = function (fn) {
            window.cyan.api.tmpHandles = window.cyan.api.tmpHandles || [];
            window.cyan.api.tmpHandles.push(fn);
        };
    };


    var loadVersionJs = function () {
        var loadJs = function (src, fun) {
            var head = document.getElementsByTagName('head')[0] || document.head || document.documentElement;

            var script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('charset', 'UTF-8');
            script.setAttribute('src', src);

            if (typeof fun === 'function') {
                if (window.attachEvent) {
                    script.onreadystatechange = function () {
                        var r = script.readyState;
                        if (r === 'loaded' || r === 'complete') {
                            script.onreadystatechange = null;
                            fun();
                        }
                    };
                } else {
                    script.onload = fun;
                }
            }

            head.appendChild(script);
        };

        window.__loadJs = loadJs

        var ver = (Date.now() / 1000 / 60 / 10).toFixed() + 1; // per 10m
        var protocol = (('https:' == window.document.location.protocol) ? "https://" : "http://");
        var url = protocol + 'cy-cdn.kuaizhan.com/upload/version-v3.js?' + ver;
        loadJs(url);
    };
    createNs();
    createMobileNs();
    loadVersionJs();
}());
