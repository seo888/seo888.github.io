/**
 * Created by cc on 2014/8/29.
 */

(function (exports) {

    var cnsTimeout = 120 * 1000;

    var longCnsTimeout = 30 * 60 * 1000;

    exports.api_tools = {};

    exports.api_tools.cnsTimeout = cnsTimeout;

    function has_property(obj, prop_name) {
        var is_name = check_string(prop_name);
        if (check_obj(obj)) {
            if (is_name) {
                if (obj.hasOwnProperty(prop_name)) {
                    return true;
                }
                else
                    return false;
            }
            else {
                for (var i in obj) {
                    return true;
                }

            }

        }
        return false;
    }

    exports.api_tools.has_property = has_property;


    function check_obj_is_null(obj) {
        if (check_obj(obj)) {
            var j = 0;
            for (var i in obj) {
                if (obj[i]) {
                    j = 1;
                    break;
                }
            }
            return j > 0;
        }
        return false;
    }

    exports.api_tools.check_obj_is_null = check_obj_is_null;

    function valid_params() {

        var c = 0;
        for (var i in arguments) {
            if (valid(i) && (check_obj(i) ? has_property(i) : true)) {
                c++;
                continue;
            }
            else
                return false;
        }
        return c > 0;
    }

    exports.api_tools.valid_params = valid_params;

    function valid_id(id) {
        return typeof id === "string" || typeof  id === 'number';
    }

    function valid_data_id(id) {
        if (typeof(id) == "undefined" || id == "0" || id == 0 || id == "") {
            return false;
        } else {
            return true;
        }
    }

    exports.api_tools.valid_id = valid_id;
    exports.api_tools.valid_obj = has_property;
    exports.api_tools.valid_array = valid_array;
    exports.api_tools.valid_data_id = valid_data_id;

    function valid_array(obj) {
        return obj instanceof Array && has_property(obj);
    }


    function gen_url(path, params, needRandom) {

        var url;
        if (check_string(path))
            url = path;
        else
            url = '/';

        if (valid(params)) {
            if (check_obj(params)) {
                if (has_property(params))
                    url += (url.indexOf("?") > 0 ? '&' : '?') + (is_nodejs() ? require('qs').stringify(params) : $.param(params));
            }
            else
                url += (url.charAt(url.length - 1) === "/" ? "" : '/') + encodeURIComponent(params);

        }
        //==undefined 为兼容以前的代码
        if (needRandom == undefined || needRandom) {
            if (url.indexOf("?") > 0) {
                url += "&_rid=" + Math.random();
            } else {
                url += "?_rid=" + Math.random();
            }
        }
        return url;
    }

    function date_reviver(key, value) {
        var a;
        if (typeof value === 'string') {
            a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
            if (a) {
                return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                    +a[5], +a[6]));
            }
        }
        return value;
    };

    function JSONparse(str) {
        return JSON.parse(str, date_reviver);
    }

    function set_authorization(req) {
        if (check_obj(tycom.userinfo && tycom.userinfo.current_user))
            if (check_string(tycom.userinfo.current_user.get_authorization()))
                req.setRequestHeader('authorization', tycom.userinfo.current_user.get_authorization());

    }

    exports.api_tools.gen_url = gen_url;


    exports.api_tools.get_html = function (path, params, callback) {
        var result = check_obj(callback);
        $.ajax({
            url: gen_url(path, params)
            , type: "GET"
            , dataType: "text"
            , timeout: cnsTimeout
            , cache: false
            //,processData:true
            //,data:params
            , async: result
            , beforeSend: set_authorization
            , success: function (body) {

                if (result)
                    callback(body);
                else
                    result = body;

            }
            , error: function (req, status, error) {
                result = {code: 998, msg: "超时：服务器没有在指定的时间内返回。"};
                throw "get_html " + gen_url(path, params) + " " + error;
                //if(check_obj(callback))
                //    process_result(result,callback);
            }
        });

        return result;

    };


    exports.api_tools.get_data = function (path, params, callback) {
        var result;
        $.ajax({
            url: gen_url(path, params)
            , type: "GET"
            , dataType: "text"
            , timeout: cnsTimeout
            , cache: false
            //,processData:true
            //,data:params
            , async: check_obj(callback)
            , beforeSend: set_authorization
            , success: function (body) {

                result = JSONparse(body);
                if (check_obj(callback))
                    process_result(result, callback);

            }
            , error: function (req, status, error) {
                result = {code: 998, msg: "超时：服务器没有在指定的时间内返回。"};
                if (check_obj(callback))
                    process_result(result, callback);
                else
                    throw "get_data " + gen_url(path, params) + " " + error;
            }
        });

        return check_obj(callback) ? null : process_result(result);

    };


    exports.api_tools.post_data = function (path, params, data, callback) {
        var result;
        $.ajax({
            url: gen_url(path, params)
            , type: "POST"
            , dataType: "json"
            , contentType: "application/json"
            , timeout: cnsTimeout
            , cache: false
            , processData: false
            , data: data ? JSON.stringify(data) : null
            , async: !(callback === null || callback === undefined)
            , beforeSend: set_authorization
            , success: function (body) {

                //result = JSONparse(body);
                result = body;
                if (check_obj(callback))
                    process_result(result, callback);

            }
            , error: function (req, status, error) {
                result = {code: 998, msg: "超时：服务器没有在指定的时间内返回。"};
                if (check_obj(callback))
                    process_result(result, callback);
                else
                    throw "post_data " + gen_url(path, params) + " " + error;

            }
        });

        return check_obj(callback) ? null : process_result(result);

    };

    exports.api_tools.post_file_data = function (path, params, data, callback) {
        var result;
        $.ajax({
            type: "POST"
            , url: gen_url(path, params)
            , data: data
            , dataType: "json"
            , mimeType: "multipart/form-data"
            , contentType: false
            , cache: false
            , processData: false
            , async: !(callback === null || callback === undefined)
            , beforeSend: set_authorization
            , success: function (body) {

                //result = JSONparse(body);
                result = body;
                if (check_obj(callback))
                    process_result(result, callback);

            }
            , error: function (req, status, error) {
                result = {code: 998, msg: "超时：服务器没有在指定的时间内返回。"};
                if (check_obj(callback))
                    process_result(result, callback);
                else
                    throw "post_data " + gen_url(path, params) + " " + error;

            }
        });

        return check_obj(callback) ? null : process_result(result);

    };

    exports.api_tools.post_data_long_time = function (path, params, data, callback) {
        var result;
        $.ajax({
            url: gen_url(path, params)
            , type: "POST"
            , dataType: "json"
            , contentType: "application/json"
            , timeout: longCnsTimeout
            , cache: false
            , processData: false
            , data: data ? JSON.stringify(data) : null
            , async: !(callback === null || callback === undefined)
            , beforeSend: set_authorization
            , success: function (body) {

                //result = JSONparse(body);
                result = body;
                if (check_obj(callback))
                    process_result(result, callback);

            }
            , error: function (req, status, error) {
                result = {code: 998, msg: "超时：服务器没有在指定的时间内返回。"};
                if (check_obj(callback))
                    process_result(result, callback);
                else
                    throw "post_data " + gen_url(path, params) + " " + error;

            }
        });

        return check_obj(callback) ? null : process_result(result);

    };


    exports.api_tools.put_data = function (path, params, data, callback) {
        var result;
        $.ajax({
            url: gen_url(path, params)
            , type: "PUT"
            , dataType: "json"
            , contentType: "application/json"
            , timeout: cnsTimeout
            , cache: false
            , processData: false
            , data: data ? JSON.stringify(data) : null
            , async: !(callback === null || callback === undefined)
            , beforeSend: set_authorization
            , success: function (body) {

                //result = JSONparse(body);
                result = body;
                if (check_obj(callback))
                    process_result(result, callback);

            }
            , error: function (req, status, error) {
                result = {code: 998, msg: "超时：服务器没有在指定的时间内返回。"};
                if (check_obj(callback))
                    process_result(result, callback);
                else
                    throw "put_data " + gen_url(path, params) + " " + error;

            }
        });

        return check_obj(callback) ? null : process_result(result);

    };


    exports.api_tools.del_data = function (path, params, callback) {
        var result;
        $.ajax({
            url: gen_url(path, params)
            , type: "DELETE"
            , dataType: "text"
            , timeout: cnsTimeout
            , cache: false
            //,processData:true
            //,data:params
            , async: !(callback === null || callback === undefined)
            , beforeSend: set_authorization
            , success: function (body) {

                result = JSONparse(body);
                if (check_obj(callback))
                    process_result(result, callback);

            }
            , error: function (req, status, error) {
                result = {code: 998, msg: "超时：服务器没有在指定的时间内返回。"};
                if (check_obj(callback))
                    process_result(result, callback);
                else
                    throw "del_data " + gen_url(path, params) + " " + error;
            }
        });

        return check_obj(callback) ? null : process_result(result);
    };


////////////////////////////////////////////////////
////////////////////////////////////////////////////


    function process_result(result, callback) {
        if (!check_obj(result))
            if (callback === undefined) {
                var msg = getErrMsg(result);
                throw msg;
            }
            else
                return callback(result);//2018-2-5 by zhaojj 缺少return 返回非对象数据时还会执行后面代码,导致callback调用两次

        if (result.code === "success" || result.code === "000") {

            if (callback === undefined)
                return result.data;
            else
                callback(result.data);
        }
        else if (result.code == "access_denied") {
            tycom.userinfo.login_check()
            /*            alert("服务器链接已经断开，请重新登录！");
             window.location.href = "/login";*/
            if (callback) {
                //把result做为异常返回
                callback(null, result);
            } else {
                // throw result;

                return null;
            }
        }
        else {
            //throw result;
            if (result.msg) {
                if (typeof(dialogAlertError) !== "undefined") {
                    dialogAlertError(result.msg, "错误");
                }
            }
            if (callback) {
                //把result做为异常返回
                callback(null, result);
            } else {
                // throw result;

                return null;
            }
        }
    };

    exports.api_tools.process_result = process_result;

    function check_string(s) {
        return (typeof s === 'string') && (s.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length > 0);
    };

    exports.api_tools.check_string = check_string;


    function is_nodejs() {
        try {
            return typeof global === 'object' && Object.prototype.toString.call(global) === "[object global]";
        }
        catch (err) {
            return false;
        }

    }

    exports.api_tools.is_nodejs = is_nodejs;

    function valid(value) {
        return !(value === null || value === undefined );
    }

    exports.api_tools.valid = valid;

    function check_obj(obj, callback) {
        if (callback)
            callback(obj);
        else
            return (obj instanceof Object);
        //return callback == null? !( s === null || s === undefined):callback(s);
    }

    exports.api_tools.check_obj = check_obj;


    exports.api_tools.check_result = function (result) {

        return result.code === "success";
    };

    //by tyj 20151217 如果req里面有时间戳，则在返回对象里面加入该时间戳
    exports.api_tools.return_result = function (result, res, req) {
        if (req) {
            if (req.query && req.query._timestamp) {
                result._timestamp = req.query._timestamp;
            } else if (req.params && req.params._timestamp) {
                result._timestamp = req.params._timestamp;
            }
        }
        res.json(result);
    };

    exports.api_tools.return_info = function (code, msg, res, req) {
        exports.api_tools.return_result({code: code, msg: msg}, res, req);
    };

    exports.api_tools.return_data = function (result, res, req) {
        exports.api_tools.return_result({code: 'success', data: result}, res, req);
    };


    exports.api_tools.gen_result = function (data) {
        return {code: 'success', data: data};

    };

    exports.api_tools.gen_info = function (data) {
        return {code: 'failed', data: data};

    };
    exports.api_tools.gen_vars = function (param) {
        var temp = {};
        temp.vars = param;
        return temp;
    };


    function catch_error(err, url, line, col, msg) {
        var oErrorLog = window.document.body;
        oErrorLog.innerHTML = "<b>异常.</b><p>";
        oErrorLog.innerHTML += "URL: " + url + "<br>";
        oErrorLog.innerHTML += "Line: " + line + "<br>";
        oErrorLog.innerHTML += "col: " + col + "<br>";
        oErrorLog.innerHTML += "Error: " + JSON.stringify(msg) + "<br>";
        return false;
    }

    if (!is_nodejs()) {
        //window.onerror = catch_error;
    }

    var id = (new Date()).getTime();

    function get_id() {
        return id++;
    }

    exports.api_tools.gen_id = get_id;

    exports.api_tools.merge_obj = function (dest, source) {
        if (check_obj(dest) && check_obj(source)) {

            for (prop in dest) {
                if (has_property(source, prop))
                    dest[prop] = source[prop];
            }
        }
        return dest;
    }


    exports.api_tools.date_format = function (dateobj, fmt) {
        // 对Date的扩展，将 Date 转化为指定格式的String
        // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
        // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
        // 例子：
        // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
        // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
        if (fmt === undefined)
            fmt = 'yyyy-MM-dd hh:mm:ss';
        if (typeof dateobj === 'string')
            dateobj = JSON.parse('{"d":"' + dateobj + '"}').d;

        //error
        //todo
        if (dateobj instanceof Date) {
            //author: meizz
            var o = {
                "M+": dateobj.getMonth() + 1,                 //月份
                "d+": dateobj.getDate(),                    //日
                "h+": dateobj.getHours(),                   //小时
                "m+": dateobj.getMinutes(),                 //分
                "s+": dateobj.getSeconds(),                 //秒
                "q+": Math.floor((dateobj.getMonth() + 3) / 3), //季度
                "S": dateobj.getMilliseconds()             //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (dateobj.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }

        return '';
    }

    function get_client_ip(req) {
        var ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        ip = ip.replace(/::ffff:/, "");
        if (ip == "::1") {
            ip = "127.0.0.1";
        }
        var ips = ip.split(",");
        return ips[0];
    }

    exports.api_tools.get_client_ip = get_client_ip;


    function _gen_num(num) {
        if (parseInt(num) < 10) {
            return "0" + num;
        }
        return num + "";
    }

    function get_str_date() {
        var str_date = [];
        var date = new Date();
        str_date.push(date.getFullYear());
        str_date.push("-");
        str_date.push(_gen_num(date.getMonth() + 1));
        str_date.push("-");
        str_date.push(_gen_num(date.getDate()));
        str_date.push(" ");
        str_date.push(_gen_num(date.getHours()));
        str_date.push(":");
        str_date.push(_gen_num(date.getMinutes()));
        str_date.push(":");
        str_date.push(_gen_num(date.getSeconds()));
        return str_date.join("");
    }

    exports.api_tools.get_str_date = get_str_date;


    function callback_result(result, callback) {
        callback(result);
    }

    exports.api_tools.callback_result = callback_result;

    function callback_success(data, callback) {
        callback({code: "success", data: data});
    }

    exports.api_tools.callback_success = callback_success;

    function callback_error(msg, callback) {
        callback({code: "error", msg: msg});
    }

    exports.api_tools.callback_error = callback_error;

    /**
     * 构建标准的 http url 地址， 此方法不适用于linux下拼接路径
     * http_root 是否合法不判断
     *  最终返回的 url 最后不包含 /
     * @param http_root
     * @returns {*}
     */
    function gen_http_url(http_root) {
        if (http_root == undefined) {
            http_root = "";
        }
        var url = http_root;
        url = url.replace(/\\/g, "/");
        //去掉最后一个杠
        while (url.length > 0 && url[url.length - 1] == "/") {
            url = url.substring(0, url.length - 1);
        }
        var args = arguments;
        var paths = [];
        if (args.length > 1) {
            for (var i = 1; i < args.length; i++) {
                var path = args[i];
                if (path == undefined) {
                    path = "";
                }
                path = path.replace(/\\/g, "/");
                //去掉前后的杠
                while (path.length > 0 && path[0] == "/") {
                    path = path.substring(1, path.length);
                }
                //去掉最后一个杠
                while (path.length > 0 && path[path.length - 1] == "/") {
                    path = path.substring(0, path.length - 1);
                }
                if (path.length > 0) {
                    paths.push(path);
                }
            }
            if (paths.length > 0) {
                var pathstr = paths[0];
                for (var i = 1; i < paths.length; i++) {
                    pathstr += "/" + paths[i];
                }
                if (pathstr.length > 0) {
                    url += "/" + pathstr;
                }
            }
        }
        return url;
    }

    exports.api_tools.gen_http_url = gen_http_url;

    exports.api_tools.get_default_img = function () {
        return "/img/img-error-thumb.png";
    }

    exports.api_tools.get_error_img = function () {
        return "/img/img-error.png";
    }

    exports.api_tools.get_error = function (err) {
        if (!err) {
            return "";
        }
        if (err.message) {
            return exports.api_tools.get_error(err.message);
        }
        if (err.msg) {
            return exports.api_tools.get_error(err.msg);
        }
        return err;
    }

    exports.api_tools.get_default_page_img = function () {
        return '/img/Page_b.jpg';
    }


    //3层文件夹监控太耗内存，不建议使用， 新业务都改成两层目录模式 idConvertPathTwoLevel
    exports.api_tools.idConvertPath = function (id, separate) {
        if (!separate) {
            separate = "/";
        }
        if (!id) {
            return id;
        }
        id = id + "";
        while (id.length < 9) {
            id = "0" + id;
        }
        var part1 = id.substring(0, id.length - 6);
        var part2 = id.substring(id.length - 6, id.length - 3);
        var part3 = id.substring(id.length - 3, id.length);
        var path1 = parseInt(part1) % 255;
        var path2 = parseInt(part2) % 255;
        var path3 = parseInt(part3) % 255;

        return separate + path1 + separate + path2 + separate + path3 + separate;
    };
    exports.api_tools.idConvertPathTwoLevel = function (id, separate) {
        if (!separate) {
            separate = "/";
        }
        if (!id) {
            return id;
        }
        id = id + "";
        while (id.length < 9) {
            id = "0" + id;
        }
        //var part1 = id.substring(0, id.length - 6);
        var part2 = id.substring(id.length - 6, id.length - 3);
        var part3 = id.substring(id.length - 3, id.length);
        //var path1 = parseInt(part1) % 255;
        var path2 = parseInt(part2) % 255;
        var path3 = parseInt(part3) % 255;

        return /*separate + path1 +*/ separate + path2 + separate + path3 + separate;
    };

    exports.api_tools.getPageTitle = function (page) {
        var name = "";
        if (!page)
            return name;
        if (page.pubDate)
            name += moment(page.pubDate).format(DATE_FORMAT) + " ";
        return exports.api_tools.getPageDisPlayName(page, name);
    }
    exports.api_tools.getPageDisPlayName = function (page, name) {
        if (!name)
            name = "";
        if (!page)
            return name;
        if (page.sectionName)
            name += page.sectionName;
        if (page.pageOrder) {
            if (page.pageOrder < 10) {
                name += ("0" + page.pageOrder)
            } else {
                name += page.pageOrder
            }
        }
        if (page.name)
            name += page.name;
        return name;
    }

    //拼稿件详情json结构,专题,剪报使用
    exports.api_tools.genContentDetailJson = function (data) {
        if (!data)
            return data;
        var result = {
            mediaType: data.mediaType,
            articleType: data.mediaInfo && data.mediaInfo.articleType,
            listType: data.mediaInfo && data.mediaInfo.listType,
            id: data.id,
            mediaId: data.mediaId,
            authorName: data.authorName,
            title: data.title,
            description: data && data.mediaInfo && data.mediaInfo.description,
            source: data.contentSource && data.contentSource.name,
            mediaInfo: data.mediaInfo,
            attribute: {
                library: {id: data.libraryId, name: data.library && data.library.name},
                creator: {id: data.creatorId, name: data.creator && data.creator.name},
                modifier: {id: data.modifierId, name: data.modifier && data.modifier.name},
                locationLon: data.locationLon,
                locationLat: data.locationLat,
                rank: data.rank,
                keyword: data.keyword,
                createTime: data.createTime,
                eventTime: data.eventTime,
                modifierTime: data.modifyTime,
            },
            titleImage: data.titleImage,
            videoList: data.videoList,
            imageList: data.imageList,
            newImageList: data.newImageList,
            page: data.page,
            publishTime: null,
            plainContent: data && data.mediaInfo && data.mediaInfo.plainContent,
            newPlainContent: data && data.mediaInfo && data.mediaInfo.newPlainContent,
            pubDate: data && data.page && data.page.pubDate,
            sectionName: data && data.page && data.page.sectionName,
            pageOrder: data && data.page && data.page.pageOrder,
            pubCode: data && data.page && data.page.publication && data.page.publication.code,
            pubName: data && data.page && data.page.publication && data.page.publication.name,
            isHide: data.isHide,
            pageName: data && data.page && data.page.name
        };
        if (data.clippingImg)
            result.clippingImg = data.clippingImg;
        return result;
    }

    //拼稿件列表json结构,专题,剪报使用
    exports.api_tools.genContentListJson = function (data, subListName) {
        if (!data)
            return data;
        if (!subListName)
            subListName = "subList";
        var oriSubList = data[subListName] || [];
        var subList = [];
        oriSubList.forEach(function (item) {
            var images = [];
            var imageObj = {};
            if (item.clippingImg)
                imageObj[item.clippingImg] = 1;
            if (item.titleImage && item.titleImage.url)
                imageObj[item.titleImage.url] = 1;
            item.imageList && item.imageList.forEach(function (img) {
                if (img.url)
                    imageObj[img.url] = 1;
            });
            for (var i in imageObj) {
                images.push(i);
            }
            subList.push({
                mediaType: item.mediaType,
                listType: item.mediaInfo && item.mediaInfo.listType,
                articleType: item.mediaInfo && item.mediaInfo.articleType,
                title: item.title,
                id: item.id,
                url: item.jsonUrl,
                images: images,
                imageCount: images.length,
                page: item.page,
                publishTime: null
            })
        })
        data[subListName] = subList;
        return data;
    }

    //解密
    function uncompileStr(code) {
        code = unescape(code);
        var c = String.fromCharCode(code.charCodeAt(0) - code.length);
        for (var i = 1; i < code.length; i++) {
            c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
        }
        return c;
    }

    exports.api_tools.uncompileStr = uncompileStr

    //加密
    function es(code) {
        var c = String.fromCharCode(code.charCodeAt(0) + code.length);
        for (var i = 1; i < code.length; i++) {
            c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
        }
        return escape(c);
    }

    exports.api_tools.es = es

    exports.api_tools.isEmptyObject = function (e) {
        var t;
        for (t in e)
            return false;
        return true;
    };

    exports.api_tools.uniqueArr = function (arr) {
        if (!arr || arr.length === 0)
            return [];
        var obj = {};
        var result = [];
        arr.forEach(function (item) {
            obj[item] = 1;
        })
        for (var i in obj) {
            result.push(i);
        }
        return result;
    }

    var defaultDpi = 300;//默认300dpi
    var perInch2cm = 2.54;//1英寸=?厘米

    function fomatFloat(src, pos, mandatory) {
        function toDecimal(x) {
            var f = parseFloat(x);
            if (isNaN(f)) {
                return false;
            }
            var coefficient = 1;
            for (var i = 0; i < pos; i++) {
                coefficient = coefficient * 10
            }
            var f = Math.round(x * coefficient) / coefficient;
            var s = f.toString();
            var rs = s.indexOf('.');
            if (rs < 0) {
                rs = s.length;
                s += '.';
            }
            while (s.length <= rs + pos) {
                s += '0';
            }
            return s;
        }

        if (!mandatory)
            return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
        else
            return toDecimal(src);
    }

    /**
     * 像素转换,只能像素和长度转换,不支持厘米毫米转换,默认像素转毫米
     * @param params    {
     *                      from,      //来源:px,mm,cm,默认px
     *                      to,        //目标:px,mm,cm,默认mm
     *                      val,       //转换值
     *                      dpi,       //DPI,默认300
     *                      decimals,  //小数点位数,默认0
     *                      mandatory, //是否强制增加小数点位数
     * }
     * @returns {*}
     */
    function pxChange(params) {
        if (!params)
            throw "参数不能为空";
        var from = params.from;
        var to = params.to;
        var val = params.val;
        var dpi = params.dpi;
        var decimals = params.decimals;
        var mandatory = params.mandatory;
        if (!val)
            throw "val参数不能为空";
        if (!decimals || isNaN(decimals))
            decimals = 0;
        val = parseInt(val);
        if (!from)
            from = "px";
        if (!to)
            to = "mm";
        if (from === to)
            return val;
        if (!dpi || isNaN(dpi))
            dpi = defaultDpi;
        var result = null;
        if (from === "px" && to === "cm") {
            result = val * perInch2cm / dpi
        } else if (from === "px" && to === "mm") {
            result = val * (perInch2cm * 10) / dpi
        } else if (from === "cm" && to === "px") {
            result = val * dpi / perInch2cm
        } else if (from === "mm" && to === "px") {
            result = val * dpi / (perInch2cm * 10)
        }
        if (!isNaN(decimals))
            result = fomatFloat(result, decimals, mandatory);
        return result
    }

    exports.api_tools.pxChange = pxChange;

    /**
     * 通过坐标获取边缘矩形
     * @param polygon   坐标的字符串
     * @returns {{width: number, height: number, minX: Number, minY: Number, maxX: Number, maxY: Number, middleX: Number, middleY: Number}}
     */
    function getEdgeByPolygon(polygon) {
        var polygonArr = null;
        if (polygon instanceof Array) {
            polygonArr = polygon;
        } else {
            polygonArr = polygon.split(",");
        }
        var xArr = [];
        var yArr = [];
        polygonArr.forEach(function (item, index) {
            if (index % 2 === 0) {
                xArr.push(item);
            } else {
                yArr.push(item);
            }
        });
        if (xArr.length > 0 && yArr.length > 0) {
            xArr.sort(function (a, b) {
                return a - b;
            })
            yArr.sort(function (a, b) {
                return a - b;
            })
            try {
                var minX = parseInt(xArr[0]);
                var maxX = parseInt(xArr[xArr.length - 1]);
                var minY = parseInt(yArr[0]);
                var maxY = parseInt(yArr[xArr.length - 1]);

                var middleX = (minX + maxX) / 2;
                var middleY = (minY + maxY) / 2;

                var width = maxX - minX;
                var height = maxY - minY;
                return {
                    width: width,
                    height: height,
                    minX: minX,
                    minY: minY,
                    maxX: maxX,
                    maxY: maxY,
                    middleX: middleX,
                    middleY: middleY
                }
            } catch (e) {
                throw e;
            }
        } else {
            throw "附图块热区坐标数据错误!";
        }
    }


    exports.api_tools.getEdgeByPolygon = getEdgeByPolygon

    /**
     *  根据坐标和宽高获取四个点的坐标
     * @param x             *左上角x坐标
     * @param y             *左上角y坐标
     * @param width         *宽度
     * @param height        *高度
     * @param order         顺序,0表示顺时针,1表示逆时针,默认0
     * @param resultType    返回的值类型,0或者空返回完整坐标字符串,1表示坐标字符串数组,2表示坐标对象数组,3表示坐标数组数组其他抛异常
     * @param closure       是否闭合 bool
     * @param fromType      源坐标类型,0左上角(默认),1中间
     */
    exports.api_tools.getCoordinates = function (x, y, width, height, order, resultType, closure, fromType) {
        if (!fromType)
            fromType = 0;
        if (isNaN(x))
            throw "参数x错误";
        if (isNaN(y))
            throw "参数y错误";
        if (isNaN(width))
            throw "参数width错误";
        if (isNaN(height))
            throw "参数height错误";
        x = parseFloat(x);
        y = parseFloat(y);
        width = parseFloat(width);
        height = parseFloat(height);
        if (!resultType || isNaN(resultType))
            resultType = 0;
        if (!order)
            order = 0;
        else
            order = 1;

        function Point(x, y) {
            return {
                x: x,
                y: y,
                all: function () {
                    return this.x + "," + this.y
                },
                arr: function () {
                    return [this.x, this.y]
                }
            }
        }

        var first;
        var second;
        var third;
        var fourth;
        if (fromType == 1) {//坐标是中间点
            first = new Point(x - width / 2, y - height / 2)
            second = new Point(x + width / 2, y - height / 2)
            third = new Point(x + width / 2, y + height / 2)
            fourth = new Point(x - width / 2, y + height / 2)
        } else {
            first = new Point(x, y)
            second = new Point(x + width, y)
            third = new Point(x + width, y + height)
            fourth = new Point(x, y + height)
        }
        var obj = [];
        if (order) {
            obj.push(first);
            obj.push(fourth);
            obj.push(third);
            obj.push(second);
        } else {
            obj.push(first);
            obj.push(second);
            obj.push(third);
            obj.push(fourth);
        }
        if (closure)
            obj.push(first);
        var result = [];
        var arrRes = [];
        obj.forEach(function (item) {
            item.all = item.all();
            item.arr = item.arr();
            result.push(item.all);
            arrRes.push(item.arr);
        })
        if (resultType == 0) {
            return result.join(',');
        } else if (resultType == 1) {
            return result;
        } else if (resultType == 2) {
            return obj;
        } else if (resultType == 3) {
            return arrRes;
        } else {
            throw "参数resultType不正确";
        }
    };

    /**
     * 坐标转换
     * @param opt {oriWidth:123//原宽度,
     *              oriHeight:123//原高度,
     *              width:123//转换宽度,
     *              height:123//转换高度,
     *              coordinate:"1,2,3,4"//坐标
     *              }
     */
    exports.api_tools.coordinateTransformation = function (opt) {
        if (!opt.oriWidth)
            throw "缺少原宽度";
        if (!opt.oriHeight)
            throw "缺少原高度";
        if (!opt.width)
            throw "缺少宽度";
        if (!opt.height)
            throw "缺少高度";
        if (!opt.coordinate)
            throw "缺少坐标";
        var oriWidth = parseInt(opt.oriWidth),
            oriHeight = parseInt(opt.oriHeight),
            imgWidth = parseInt(opt.width),
            imgHeight = parseInt(opt.height),
            widthProportion = imgWidth / oriWidth,
            heightProportion = imgHeight / oriHeight;

        return calcNum(opt.coordinate);

        function calcNum(str) {
            var arr = str.split(",");
            arr.forEach(function (item, index) {
                if (index % 2 === 0) {
                    arr[index] = parseFloat(item) * widthProportion;
                    //arr[index] = Math.ceil(parseInt(item) * widthProportion);
                } else {
                    arr[index] = parseFloat(item) * heightProportion;
                    //arr[index] = Math.ceil(parseInt(item) * heightProportion);
                }
            });
            return arr.join(",");
        }
    }

    /**
     * 根据对角点，返回四个点坐标字符串
     * @param str       对角点
     * @param order
     * @param closure
     */
    exports.api_tools.getCoordSort = function (str, order, closure) {
        if (!order)
            order = 0;
        var arr = str.split(",");
        var minX = arr[0]
        var minY = arr[1]
        var maxX = arr[2]
        var maxY = arr[3]
        if (minX > maxX) {
            minX = arr[2]
            maxX = arr[0]
        }
        if (minY > maxY) {
            minY = arr[3]
            maxY = arr[1]
        }
        var result = [];
        result[0] = [minX, minY].join(",");
        if (order)
            result[1] = [maxX, minY].join(",");
        else
            result[1] = [minX, maxY].join(",");
        result[2] = [maxX, maxY].join(",");
        if (order)
            result[3] = [minX, maxY].join(",");
        else
            result[3] = [maxX, minY].join(",");
        if (closure)
            result[4] = [minX, minY].join(",");
        return result.join(",")
    }

    /**
     * 从数组中删除空元素:"",null,undefined
     * @param arr
     * @returns {Array}
     */
    exports.api_tools.removeEmptyFromArr = function (arr) {
        var result = []
        arr.forEach(function (item) {
            if (item == 0 || item)
                result.push(item)
        })
        return result;
    }

    /**
     * 字符串对比
     * @param baseArr   基础版本的字符串数组
     * @param checkArr  对比版本的字符串数组
     * @param callback(baseArr, checkArr)   返回检查后的两个字符串数组
     */
    exports.api_tools.stringCompare = function (baseArr, checkArr, callback) {
        run();

        function getBeginIndex(rtfIndex) {
            for (var i = rtfIndex - 1; i >= 0; i--) {
                if (checkArr[i] && !isNaN(checkArr[i].to)) {
                    return checkArr[i].to
                }
            }
            return 0;
        }

        function getEndIndex(rtfIndex) {
            for (var i = rtfIndex + 1; i < checkArr.length; i++) {
                if (checkArr[i] && !isNaN(checkArr[i].to)) {
                    return checkArr[i].to
                }
            }
            return baseArr.length - 1;
        }

        function run(rtfIndex) {
            if (!rtfIndex)
                rtfIndex = 0;
            var tempArr = []
            for (; rtfIndex < checkArr.length; rtfIndex++) {
                var rtfItem = checkArr[rtfIndex];
                if (rtfItem.lock)
                    continue;
                var maxMatch = 0;
                var maxMatchObj = null;
                var textBeginIndex = getBeginIndex(rtfIndex);
                var textEndIndex = getEndIndex(rtfIndex);
                for (var textIndex = textBeginIndex; textIndex <= textEndIndex; textIndex++) {
                    var textItem = baseArr[textIndex];
                    var match = 0;
                    if (rtfItem.text == textItem.text) {
                        match = 1;
                        for (var i = 1; ((i + rtfIndex) < checkArr.length) && (( i + textIndex ) < baseArr.length); i++) {
                            if (baseArr[(i + textIndex)] && checkArr[(i + rtfIndex)] && checkArr[(i + rtfIndex)].text == baseArr[(i + textIndex)].text) {
                                match++;
                            } else {
                                break;
                            }
                        }
                        if (match > maxMatch) {
                            maxMatch = match;
                            maxMatchObj = {
                                match: match,
                                begin: rtfIndex,
                                end: i + rtfIndex - 1,
                                baseBegin: textIndex,
                                baseEnd: i + textIndex - 1,
                            }
                        }
                    }
                }
                if (maxMatch == 0) {
                    rtfItem.lock = 1;
                }
                if (maxMatchObj) {
                    tempArr.push(maxMatchObj);
                }
            }

            var maxItem = getMaxMatch(tempArr);
            if (maxItem) {
                checkArr.forEach(function (item, index) {
                    if (index >= maxItem.begin && index <= maxItem.end) {
                        item.lock = 1;
                        item.to = maxItem.baseBegin + index - maxItem.begin
                    }
                })
                baseArr.forEach(function (item, index) {
                    if (index >= maxItem.baseBegin && index <= maxItem.baseEnd) {
                        item.lock = 1;
                        item.to = maxItem.begin + index - maxItem.baseBegin
                    }
                })
            }

            var ifOver = true;
            checkArr.every(function (item, index) {
                if (!item.lock) {
                    ifOver = false;
                    setTimeout(function () {
                        run(index)
                    })
                    return false;
                }
                return true;
            })
            if (ifOver) {
                return callback && callback(baseArr, checkArr)
            }
        }

        function getMaxMatch(arr) {
            var match = 0;
            var result = null;
            arr.forEach(function (item) {
                if (item.match > match) {
                    match = item.match;
                    result = item;
                }
            })
            return result;
        }
    }

    /**
     * 从字符串中提取责编
     * @param text
     */
    exports.api_tools.getDutyEditor = function (text) {
        text = getCleanText(text);
        if (text) {
            var reg = /责编\/\s*[\u4e00-\u9fa5]+/g;
            var match = text.match(reg);
            if (match && match[0]) {
                return getCleanText(match[0].replace(/责编\//g, ""));
            }
        }
    }

    /**
     * 从字符串中提取美编
     * @param text
     */
    exports.api_tools.getArtEditor = function (text) {
        text = getCleanText(text);
        if (text) {
            var reg = /美编\/\s*[\u4e00-\u9fa5]+/g;
            var match = text.match(reg);
            if (match && match[0]) {
                return getCleanText(match[0].replace(/美编\//g, ""));
            }
        }
    }

    /**
     * 从字符串中提取校对
     * @param text
     */
    exports.api_tools.getProofreader = function (text) {
        text = getCleanText(text);
        if (text) {
            var reg = /校对\/\s*[\u4e00-\u9fa5]+/g;
            var match = text.match(reg);
            if (match && match[0]) {
                return getCleanText(match[0].replace(/校对\//g, ""));
            }
        }
    }

    /**
     * 从字符串中提取排版
     * @param text
     */
    exports.api_tools.getLayoutDesigner = function (text) {
        text = getCleanText(text);
        if (text) {
            var reg = /版式统筹\/\s*[\u4e00-\u9fa5]+/g;
            var match = text.match(reg);
            if (match && match[0]) {
                return getCleanText(match[0].replace(/版式统筹\//g, ""));
            }
        }
    }

    function getCleanText(text) {
        if (!text)
            return;
        text = text.replace(/(^\s+)|(\s+$)/g, "");
        if (!text)
            return;
        return text;
    }

    exports.api_tools.check_mobile = function (mobile) {
        var reg = /(13|14|15|17|18|19)[0-9]{9}/g;
        return reg.test(mobile);
    }

    exports.api_tools.check_email = function (email) {
        var reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/g;
        return reg.test(email);
    }

    exports.api_tools.clear_form_data = function (data) {
        if (!data)
            data = {}
        for (var i in data) {
            var item = data[i];
            if (item)
                data[i] = getCleanText(item);
        }
        return data;
    }

    exports.api_tools.alert_error = function (err) {
        alert(exports.api_tools.get_error(err));
    }

    $.fn.serializeObject = function () {
        var obj = {};
        var count = 0;
        $.each(this.serializeArray(), function (i, o) {
            var n = o.name, v = o.value;
            count++;
            obj[n] = obj[n] === undefined ? v
                : $.isArray(obj[n]) ? obj[n].concat(v)
                    : [obj[n], v];
        });
        return obj;//JSON.stringify(obj);
    };

    exports.api_tools.add_url_title = function (url) {
        if (!url)
            return "/";
        if (/^\//g.test(url))
            return url;
        return "/" + url;
    }
})((function () {
    if (typeof exports === 'undefined') {
        if (typeof window.tycom === 'undefined')
            window.tycom = {};

        if (typeof window.tycom.common === 'undefined')
            window.tycom.common = {};
        return window.tycom.common;
    }
    else {
        return exports;
    }
})());



