var go_id = 0;
var go_url = '';
var go_arr = new Array();

switch (location.host) {
    case "comment.fengniao.com":
        if (/\/71\/(\d+)\.html/.test(location.pathname)) {
            go_id = location.pathname.match(/\d+\.html/);
            go_url = 'https://m.fengniao.com/comment/' + go_id;
        }
        if (/\/71\/(\d+)_\d+\.html/.test(location.pathname)) {
            str = location.pathname.match(/\d+_\d+/);
            str = str.toString();
            go_arr = str.split("_");
            go_url = 'https://m.fengniao.com/comment/' + go_arr[0] + '.html';
        }
        break;
    case "bbs.fengniao.com":
        if (location.pathname == '/') {
            go_url = 'https://m.fengniao.com/bbs/';
        }
        //帖子页
        if (/\/(\d+)\.html/.test(location.pathname)) {
            go_id = location.pathname.match(/\d+\.html/);
            if (go_id) {
                go_url = 'https://m.fengniao.com/thread/' + go_id;
            }
        }
        if (/\/(\d+)_\d+\.html/.test(location.pathname)) {
            str = location.pathname.match(/\d+_\d+/);
            if (str) {
                go_arr = str.toString().split("_");
                go_url = 'https://m.fengniao.com/thread/' + go_arr[0] + '_' + go_arr[1] + '.html';
            }
        }
        if (/\/(\d+)_\d+_\d+\.html/.test(location.pathname)) {
            str = location.pathname.match(/\d+_\d+_\d+/);
            if (str) {
                go_arr = str.toString().split("_");
                go_url = 'https://m.fengniao.com/thread/' + go_arr[1] + '/' + go_arr[0] + '_' + go_arr[2] + '.html';
            }
        }
        //版块列表页
        if (/\/forum_(\d+)\.html/.test(location.pathname)) {
            go_id = location.pathname.match(/\d+/);
            go_url = 'https://m.fengniao.com/forum_' + go_id + '/';
        }
        //全部板块列表页
        if (location.pathname == '/forum/') {
            go_url = 'https://m.fengniao.com/bbs/';
        }
        //精华
        if (/\/jinghua-(\d+)\.html/.test(location.pathname)) {
            go_id = location.pathname.match(/\d+/);
            if (go_id == 1) {
                go_id = 101;
            }
            go_url = 'https://m.fengniao.com/forum_' + go_id + '/';
        }
        //帖子看图页
        if (/\/forum\/pic\/slide_(\d+)_(\d+)_(\d+).html/.test(location.pathname)) {
            str = location.pathname.match(/\d+_\d+_\d+/);
            str = str.toString();
            go_arr = str.split("_");
            go_url = 'https://m.fengniao.com/forum/slide_' + go_arr[1] + '.html';
        }
        break;
	case "tu.fengniao.com":
			if (/\/(\d+)\//.test(location.pathname) || /\/thread_(\d+)\.html/.test(location.pathname)) {
				go_id = location.pathname.match(/\d+/);
				go_id = go_id.toString();
				go_url = 'https://m.fengniao.com/image_' + go_id + '/';
			}
			break;
    case "photo.fengniao.com":
        go_url = 'https://m.fengniao.com/photo/';
        if (/\/f_(\d+)\.html/.test(location.pathname) || /\/f_(\d+)_(\d+)_(\d+)\.html/.test(location.pathname)) {
            str = location.pathname.match(/\d+/);
            str = str.toString();
            go_arr = str.split("_");
            go_url = 'https://m.fengniao.com/photo/f_' + go_arr[0] + '.html';
        }
        break;
    case "www.fengniao.com":
        //蜂鸟首页
        if (location.pathname == '/') {
            go_url = 'https://m.fengniao.com/';
        }

        //PE列表页 /pe/
        if (/^\/pe\/$/.test(location.pathname)) {
            go_url = 'https://m.fengniao.com/pe/';
        }

        //相机新品 /pe/camera.html
        if (/^\/pe\/list_camera\.html$/.test(location.pathname)) {
            go_url = 'https://m.fengniao.com/product/list_114.html';
        }

        //镜头新品 /pe/lens.html
        if (/^\/pe\/list_lens\.html$/.test(location.pathname)) {
            go_url = 'https://m.fengniao.com/product/list_118.html';
        }

        //器材页 /pe/278779/
        if (/^\/pe\/(\d+)\/$/.test(location.pathname)) {
            var str = location.pathname;
            str = str.toString();
            go_arr = str.split("/");
            go_id = go_arr[2];
            go_url = 'https://m.fengniao.com/p' + go_id + '/index.html';
        }

        //单个tag页 这个必须在前面 /zhuanti/haokandetupian_42943/
        if (/^\/zhuanti\/[a-z]+_(\d+)\//.test(location.pathname)) {
            go_id = location.pathname.match(/\d+/);
            go_url = 'https://m.fengniao.com/tag/' + go_id + '.html';
        }

        //tag列表页 /zhuanti/TagList_0_1.html
        if (/^\/zhuanti\/\TagList_\d_\d+.html$/.test(location.pathname)) {
            go_id = location.pathname.match(/\d/);
            go_url = 'https://m.fengniao.com/tag/list_' + go_id + '.html';
        }
        break;
    case "news.fengniao.com":
    case "qicai.fengniao.com":
    case "image.fengniao.com":
    case "academy.fengniao.com":
    case "travel.fengniao.com":
    case "auto.fengniao.com":
    case "qsy.fengniao.com":
    case "jjb.fengniao.com":
    case "info.fengniao.com":
    case "sai.fengniao.com":
    case "video.fengniao.com":
    case "8k.fengniao.com":
        //case "preview.cms.fengniao.com":
        //频道首页
        if (location.pathname == '/') {
            go_arr = location.host.split(".");
            go_url = 'https://m.fengniao.com/' + go_arr[0] + '/';
        }

        //频道二级列表页
        if (/list_\d+.html/.test(location.pathname)) {
            go_id = location.pathname.match(/\d+/);
            go_url = 'https://m.fengniao.com/class_' + go_id + '/';
        }

        //文章页
        if (/\d+\/\d+\.html/.test(location.pathname)) {
            go_id = location.pathname.match(/\d+\.html/);
            go_url = 'https://m.fengniao.com/document/' + go_id;
        }
        if (/\d+\/\d+_\d+\.html/.test(location.pathname)) {
            str = location.pathname.match(/\d+_\d+/);
            str = str.toString();
            go_arr = str.split("_");
            go_url = 'https://m.fengniao.com/document/' + go_arr[0] + '.html';
        }
        if (/\d+\/\d+_all\.html/.test(location.pathname)) {
            go_id = location.pathname.match(/\d+_all\.html/);
            go_id = go_id.toString();
            go_arr = go_id.split("_");
            go_url = 'https://m.fengniao.com/document/' + go_arr[0] + '.html';
        }

        //组图文章的wap适配
        if (/\/slide\/\d+\/\d+_1\.html/.test(location.pathname)) {
            go_id = location.pathname.match(/\d+_1\.html/);
            go_id = go_id.toString();
            go_arr = go_id.split("_");
            go_url = 'https://m.fengniao.com/slide/' + go_arr[0] + '.html';
        }
        //视频文章页
        if (/\/video\/\d+\.html/.test(location.pathname)) {
            go_id = location.pathname.match(/\d+\.html/);
            go_url = 'https://m.fengniao.com/video/' + go_id;
        }
        break;
    case "sgq.fengniao.com"://四光圈首页
        go_url = 'https://m.fengniao.com/';
        break;
    case "wkt.fengniao.com":
        if (location.pathname == '/') {
            go_url = 'https://m.fengniao.com/wkt';
        }
        if (/\/detail_\d+\.html/.test(location.pathname)) {
            go_id = location.pathname.match(/\d+/g);
            go_url = 'https://m.fengniao.com/wkt/detail_' + go_id + '.html';
        }
        if (/\/detail_\d+_\d+.html/.test(location.pathname)) {
            go_id = location.pathname.match(/\d+/g);
            go_id = go_id.toString();
            go_arr = go_id.split(",");
            go_url = 'https://m.fengniao.com/wkt/detail_' + go_arr[0] + '.html';
        }
        if (/\/course_\d+\.html/.test(location.pathname)) {
            go_id = location.pathname.match(/\d+/g);
            go_url = 'https://m.fengniao.com/wkt/course_' + go_id + '.html';
        }
        if (/\/list_?\d*_?\d*.html/.test(location.pathname)) {
            go_id = location.pathname.match(/\d+/g);
            if (go_id == null) {
                go_url = 'https://m.fengniao.com/wkt';
            } else {
                var _class = 0;
                var _freeType = 0;
                go_id = go_id.toString();
                go_arr = go_id.split(",");
                if (typeof (go_arr[0]) != "undefined") {
                    _class = go_arr[0];
                }
                if (typeof (go_arr[1]) != "undefined") {
                    _freeType = go_arr[1];
                }
                go_url = 'https://m.fengniao.com/wkt/list_' + _class + '_' + _freeType + '.html';
            }
        }
        break;
    case "live.fengniao.com"://直播
        if (/pc\/\d+/.test(location.pathname)) {
            go_id = location.pathname.match(/\d+/);
            go_url = 'http://live.fengniao.com/h5/' + go_id;
        }
        break;
    default:
        //go_url = 'https://m.fengniao.com/';
}

if (go_url) {
    if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/i.test(navigator.userAgent))) {
        if (document.cookie.indexOf("showpc=1") < 0) {
            try {
                if (/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    window.location.href = go_url;
                } else if (/iPad/i.test(navigator.userAgent)) {
                } else {
                    window.location.href = go_url;
                }
            } catch (e) {
            }
        }
    }
}