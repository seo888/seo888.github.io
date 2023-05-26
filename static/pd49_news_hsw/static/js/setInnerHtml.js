timers = 'timers' in window ? timers : [];
timeouts = 'timeouts' in window ? timeouts : [];
var PageClass = 1;
var global_html_pool = [];
var global_script_pool = [];
var global_script_src_pool = [];
var global_lock_pool = [];
var innerhtml_lock = null;
var document_buffer = "";
function set_innerHTML(j, f, b) {
    if (innerhtml_lock == null) {
        innerhtml_lock = j
    } else {
        if (typeof(b) == "undefined") {
            global_lock_pool[j + "_html"] = f;
            window.setTimeout("set_innerHTML('" + j + "', global_lock_pool['" + j + "_html']);", 20);
            return
        } else {
            if (innerhtml_lock != j) {
                global_lock_pool[j + "_html"] = f;
                window.setTimeout("set_innerHTML('" + j + "', global_lock_pool['" + j + "_html'], " + b + ");", 20);
                return
            }
        }
    }
    function h() {
        return"script_" + (new Date()).getTime().toString(36) + Math.floor(Math.random() * 100000000).toString(36)
    }

    document_buffer = "";
    document.write = function (i) {
        document_buffer += i
    };
    document.writeln = function (i) {
        document_buffer += i + "\n"
    };
    global_html_pool = [];
    var d = [];
    f = f.split(/<\/script>/i);
    for (var e = 0; e < f.length; e++) {
        global_html_pool[e] = f[e].replace(/<script[\s\S]*$/ig, "");
        d[e] = {text: "", src: ""};
        d[e].text = f[e].substr(global_html_pool[e].length);
        d[e].src = d[e].text.substr(0, d[e].text.indexOf(">") + 1);
        d[e].src = d[e].src.match(/src\s*=\s*(\"([^\"]*)\"|\'([^\']*)\'|([^\s]*)[\s>])/i);
        if (d[e].src) {
            if (d[e].src[2]) {
                d[e].src = d[e].src[2]
            } else {
                if (d[e].src[3]) {
                    d[e].src = d[e].src[3]
                } else {
                    if (d[e].src[4]) {
                        d[e].src = d[e].src[4]
                    } else {
                        d[e].src = ""
                    }
                }
            }
            d[e].text = ""
        } else {
            d[e].src = "";
            d[e].text = d[e].text.substr(d[e].text.indexOf(">") + 1);
            d[e].text = d[e].text.replace(/^\s*<\!--\s*/g, "")
        }
    }
    var m;
    if (typeof(b) == "undefined") {
        m = 0
    } else {
        m = b
    }
    var l, c, a;
    for (var e = 0; e < d.length; e++) {
        var k = "document_buffer += global_html_pool[" + e + "];\n";
        k += "document.getElementById('" + j + "').innerHTML = document_buffer;\n";
        l = document.createElement("script");
        if (d[e].src) {
            l.src = d[e].src;
            if (typeof(global_script_src_pool[l.src]) == "undefined") {
                global_script_src_pool[l.src] = true;
                m += 2000
            } else {
                m += 10
            }
        } else {
            l.text = d[e].text;
            m += 10
        }
        l.defer = true;
        l.type = "text/javascript";
        l.id = h();
        global_script_pool[l.id] = l;
        c = k;
        c += "document.getElementsByTagName('head').item(0)";
        c += ".appendChild(global_script_pool['" + l.id + "']);\n";
        window.setTimeout(c, m);
        a = "document.getElementsByTagName('head').item(0)";
        a += ".removeChild(document.getElementById('" + l.id + "'));\n";
        a += "delete global_script_pool['" + l.id + "'];\n";
        window.setTimeout(a, m + 10000)
    }
    var g = "if (document_buffer.match(/<\\/script>/i)) {\n";
    g += "set_innerHTML('" + j + "', document_buffer, " + m + ");\n";
    g += "}\n";
    g += "else {\n";
    g += "document.getElementById('" + j + "').innerHTML = document_buffer;\n";
    g += "innerhtml_lock = null;\n";
    g += "}";
    window.setTimeout(g, m)
};