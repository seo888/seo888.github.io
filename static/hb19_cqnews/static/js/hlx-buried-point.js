!function (e, t, a) {
  "use strict";

  "undefined" != typeof window && "function" == typeof define && define.amd ? define(a) : "undefined" != typeof module && module.exports ? module.exports = a() : t.exports ? t.exports = a() : t.Fingerprint2 = a();
}(0, this, function () {
  "use strict";

  var d = function (e, t) {
      e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
      var a = [0, 0, 0, 0];
      return a[3] += e[3] + t[3], a[2] += a[3] >>> 16, a[3] &= 65535, a[2] += e[2] + t[2], a[1] += a[2] >>> 16, a[2] &= 65535, a[1] += e[1] + t[1], a[0] += a[1] >>> 16, a[1] &= 65535, a[0] += e[0] + t[0], a[0] &= 65535, [a[0] << 16 | a[1], a[2] << 16 | a[3]];
    },
    g = function (e, t) {
      e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]];
      var a = [0, 0, 0, 0];
      return a[3] += e[3] * t[3], a[2] += a[3] >>> 16, a[3] &= 65535, a[2] += e[2] * t[3], a[1] += a[2] >>> 16, a[2] &= 65535, a[2] += e[3] * t[2], a[1] += a[2] >>> 16, a[2] &= 65535, a[1] += e[1] * t[3], a[0] += a[1] >>> 16, a[1] &= 65535, a[1] += e[2] * t[2], a[0] += a[1] >>> 16, a[1] &= 65535, a[1] += e[3] * t[1], a[0] += a[1] >>> 16, a[1] &= 65535, a[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0], a[0] &= 65535, [a[0] << 16 | a[1], a[2] << 16 | a[3]];
    },
    f = function (e, t) {
      return 32 === (t %= 64) ? [e[1], e[0]] : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t | e[0] >>> 32 - t] : (t -= 32, [e[1] << t | e[0] >>> 32 - t, e[0] << t | e[1] >>> 32 - t]);
    },
    h = function (e, t) {
      return 0 === (t %= 64) ? e : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t] : [e[1] << t - 32, 0];
    },
    m = function (e, t) {
      return [e[0] ^ t[0], e[1] ^ t[1]];
    },
    T = function (e) {
      return e = m(e, [0, e[0] >>> 1]), e = g(e, [4283543511, 3981806797]), e = m(e, [0, e[0] >>> 1]), e = g(e, [3301882366, 444984403]), e = m(e, [0, e[0] >>> 1]);
    },
    l = function (e, t) {
      t = t || 0;
      for (var a = (e = e || "").length % 16, n = e.length - a, r = [0, t], i = [0, t], o = [0, 0], l = [0, 0], s = [2277735313, 289559509], c = [1291169091, 658871167], u = 0; u < n; u += 16) o = [255 & e.charCodeAt(u + 4) | (255 & e.charCodeAt(u + 5)) << 8 | (255 & e.charCodeAt(u + 6)) << 16 | (255 & e.charCodeAt(u + 7)) << 24, 255 & e.charCodeAt(u) | (255 & e.charCodeAt(u + 1)) << 8 | (255 & e.charCodeAt(u + 2)) << 16 | (255 & e.charCodeAt(u + 3)) << 24], l = [255 & e.charCodeAt(u + 12) | (255 & e.charCodeAt(u + 13)) << 8 | (255 & e.charCodeAt(u + 14)) << 16 | (255 & e.charCodeAt(u + 15)) << 24, 255 & e.charCodeAt(u + 8) | (255 & e.charCodeAt(u + 9)) << 8 | (255 & e.charCodeAt(u + 10)) << 16 | (255 & e.charCodeAt(u + 11)) << 24], o = g(o, s), o = f(o, 31), o = g(o, c), r = m(r, o), r = f(r, 27), r = d(r, i), r = d(g(r, [0, 5]), [0, 1390208809]), l = g(l, c), l = f(l, 33), l = g(l, s), i = m(i, l), i = f(i, 31), i = d(i, r), i = d(g(i, [0, 5]), [0, 944331445]);
      switch (o = [0, 0], l = [0, 0], a) {
        case 15:
          l = m(l, h([0, e.charCodeAt(u + 14)], 48));
        case 14:
          l = m(l, h([0, e.charCodeAt(u + 13)], 40));
        case 13:
          l = m(l, h([0, e.charCodeAt(u + 12)], 32));
        case 12:
          l = m(l, h([0, e.charCodeAt(u + 11)], 24));
        case 11:
          l = m(l, h([0, e.charCodeAt(u + 10)], 16));
        case 10:
          l = m(l, h([0, e.charCodeAt(u + 9)], 8));
        case 9:
          l = m(l, [0, e.charCodeAt(u + 8)]), l = g(l, c), l = f(l, 33), l = g(l, s), i = m(i, l);
        case 8:
          o = m(o, h([0, e.charCodeAt(u + 7)], 56));
        case 7:
          o = m(o, h([0, e.charCodeAt(u + 6)], 48));
        case 6:
          o = m(o, h([0, e.charCodeAt(u + 5)], 40));
        case 5:
          o = m(o, h([0, e.charCodeAt(u + 4)], 32));
        case 4:
          o = m(o, h([0, e.charCodeAt(u + 3)], 24));
        case 3:
          o = m(o, h([0, e.charCodeAt(u + 2)], 16));
        case 2:
          o = m(o, h([0, e.charCodeAt(u + 1)], 8));
        case 1:
          o = m(o, [0, e.charCodeAt(u)]), o = g(o, s), o = f(o, 31), o = g(o, c), r = m(r, o);
      }
      return r = m(r, [0, e.length]), i = m(i, [0, e.length]), r = d(r, i), i = d(i, r), r = T(r), i = T(i), r = d(r, i), i = d(i, r), ("00000000" + (r[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (r[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (i[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (i[1] >>> 0).toString(16)).slice(-8);
    },
    e = {
      preprocessor: null,
      audio: {
        timeout: 1e3,
        excludeIOS11: !0
      },
      fonts: {
        swfContainerId: "fingerprintjs2",
        swfPath: "flash/compiled/FontList.swf",
        userDefinedFonts: [],
        extendedJsFonts: !1
      },
      screen: {
        detectScreenOrientation: !0
      },
      plugins: {
        sortPluginsFor: [/palemoon/i],
        excludeIE: !1
      },
      extraComponents: [],
      excludes: {
        enumerateDevices: !0,
        pixelRatio: !0,
        doNotTrack: !0,
        fontsFlash: !0
      },
      NOT_AVAILABLE: "not available",
      ERROR: "error",
      EXCLUDED: "excluded"
    },
    c = function (e, t) {
      if (Array.prototype.forEach && e.forEach === Array.prototype.forEach) e.forEach(t);else if (e.length === +e.length) for (var a = 0, n = e.length; a < n; a++) t(e[a], a, e);else for (var r in e) e.hasOwnProperty(r) && t(e[r], r, e);
    },
    s = function (e, n) {
      var r = [];
      return null == e ? r : Array.prototype.map && e.map === Array.prototype.map ? e.map(n) : (c(e, function (e, t, a) {
        r.push(n(e, t, a));
      }), r);
    },
    a = function () {
      return navigator.mediaDevices && navigator.mediaDevices.enumerateDevices;
    },
    n = function (e) {
      var t = [window.screen.width, window.screen.height];
      return e.screen.detectScreenOrientation && t.sort().reverse(), t;
    },
    r = function (e) {
      if (window.screen.availWidth && window.screen.availHeight) {
        var t = [window.screen.availHeight, window.screen.availWidth];
        return e.screen.detectScreenOrientation && t.sort().reverse(), t;
      }
      return e.NOT_AVAILABLE;
    },
    i = function (e) {
      if (null == navigator.plugins) return e.NOT_AVAILABLE;
      for (var t = [], a = 0, n = navigator.plugins.length; a < n; a++) navigator.plugins[a] && t.push(navigator.plugins[a]);
      return u(e) && (t = t.sort(function (e, t) {
        return e.name > t.name ? 1 : e.name < t.name ? -1 : 0;
      })), s(t, function (e) {
        var t = s(e, function (e) {
          return [e.type, e.suffixes];
        });
        return [e.name, e.description, t];
      });
    },
    o = function (t) {
      var e = [];
      if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject" in window) {
        e = s(["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"], function (e) {
          try {
            return new window.ActiveXObject(e), e;
          } catch (e) {
            return t.ERROR;
          }
        });
      } else e.push(t.NOT_AVAILABLE);
      return navigator.plugins && (e = e.concat(i(t))), e;
    },
    u = function (e) {
      for (var t = !1, a = 0, n = e.plugins.sortPluginsFor.length; a < n; a++) {
        var r = e.plugins.sortPluginsFor[a];
        if (navigator.userAgent.match(r)) {
          t = !0;
          break;
        }
      }
      return t;
    },
    p = function (t) {
      try {
        return !!window.sessionStorage;
      } catch (e) {
        return t.ERROR;
      }
    },
    v = function (t) {
      try {
        return !!window.localStorage;
      } catch (e) {
        return t.ERROR;
      }
    },
    A = function (t) {
      try {
        return !!window.indexedDB;
      } catch (e) {
        return t.ERROR;
      }
    },
    S = function (e) {
      return navigator.hardwareConcurrency ? navigator.hardwareConcurrency : e.NOT_AVAILABLE;
    },
    C = function (e) {
      return navigator.cpuClass || e.NOT_AVAILABLE;
    },
    B = function (e) {
      return navigator.platform ? navigator.platform : e.NOT_AVAILABLE;
    },
    w = function (e) {
      return navigator.doNotTrack ? navigator.doNotTrack : navigator.msDoNotTrack ? navigator.msDoNotTrack : window.doNotTrack ? window.doNotTrack : e.NOT_AVAILABLE;
    },
    t = function () {
      var t,
        e = 0;
      void 0 !== navigator.maxTouchPoints ? e = navigator.maxTouchPoints : void 0 !== navigator.msMaxTouchPoints && (e = navigator.msMaxTouchPoints);
      try {
        document.createEvent("TouchEvent"), t = !0;
      } catch (e) {
        t = !1;
      }
      return [e, t, "ontouchstart" in window];
    },
    y = function (e) {
      var t = [],
        a = document.createElement("canvas");
      a.width = 2e3, a.height = 200, a.style.display = "inline";
      var n = a.getContext("2d");
      return n.rect(0, 0, 10, 10), n.rect(2, 2, 6, 6), t.push("canvas winding:" + (!1 === n.isPointInPath(5, 5, "evenodd") ? "yes" : "no")), n.textBaseline = "alphabetic", n.fillStyle = "#f60", n.fillRect(125, 1, 62, 20), n.fillStyle = "#069", e.dontUseFakeFontInCanvas ? n.font = "11pt Arial" : n.font = "11pt no-real-font-123", n.fillText("Cwm fjordbank glyphs vext quiz, 😃", 2, 15), n.fillStyle = "rgba(102, 204, 0, 0.2)", n.font = "18pt Arial", n.fillText("Cwm fjordbank glyphs vext quiz, 😃", 4, 45), n.globalCompositeOperation = "multiply", n.fillStyle = "rgb(255,0,255)", n.beginPath(), n.arc(50, 50, 50, 0, 2 * Math.PI, !0), n.closePath(), n.fill(), n.fillStyle = "rgb(0,255,255)", n.beginPath(), n.arc(100, 50, 50, 0, 2 * Math.PI, !0), n.closePath(), n.fill(), n.fillStyle = "rgb(255,255,0)", n.beginPath(), n.arc(75, 100, 50, 0, 2 * Math.PI, !0), n.closePath(), n.fill(), n.fillStyle = "rgb(255,0,255)", n.arc(75, 75, 75, 0, 2 * Math.PI, !0), n.arc(75, 75, 25, 0, 2 * Math.PI, !0), n.fill("evenodd"), a.toDataURL && t.push("canvas fp:" + a.toDataURL()), t;
    },
    E = function () {
      var o,
        e = function (e) {
          return o.clearColor(0, 0, 0, 1), o.enable(o.DEPTH_TEST), o.depthFunc(o.LEQUAL), o.clear(o.COLOR_BUFFER_BIT | o.DEPTH_BUFFER_BIT), "[" + e[0] + ", " + e[1] + "]";
        };
      if (!(o = F())) return null;
      var l = [],
        t = o.createBuffer();
      o.bindBuffer(o.ARRAY_BUFFER, t);
      var a = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0]);
      o.bufferData(o.ARRAY_BUFFER, a, o.STATIC_DRAW), t.itemSize = 3, t.numItems = 3;
      var n = o.createProgram(),
        r = o.createShader(o.VERTEX_SHADER);
      o.shaderSource(r, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"), o.compileShader(r);
      var i = o.createShader(o.FRAGMENT_SHADER);
      o.shaderSource(i, "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"), o.compileShader(i), o.attachShader(n, r), o.attachShader(n, i), o.linkProgram(n), o.useProgram(n), n.vertexPosAttrib = o.getAttribLocation(n, "attrVertex"), n.offsetUniform = o.getUniformLocation(n, "uniformOffset"), o.enableVertexAttribArray(n.vertexPosArray), o.vertexAttribPointer(n.vertexPosAttrib, t.itemSize, o.FLOAT, !1, 0, 0), o.uniform2f(n.offsetUniform, 1, 1), o.drawArrays(o.TRIANGLE_STRIP, 0, t.numItems);
      try {
        l.push(o.canvas.toDataURL());
      } catch (e) {}
      l.push("extensions:" + (o.getSupportedExtensions() || []).join(";")), l.push("webgl aliased line width range:" + e(o.getParameter(o.ALIASED_LINE_WIDTH_RANGE))), l.push("webgl aliased point size range:" + e(o.getParameter(o.ALIASED_POINT_SIZE_RANGE))), l.push("webgl alpha bits:" + o.getParameter(o.ALPHA_BITS)), l.push("webgl antialiasing:" + (o.getContextAttributes().antialias ? "yes" : "no")), l.push("webgl blue bits:" + o.getParameter(o.BLUE_BITS)), l.push("webgl depth bits:" + o.getParameter(o.DEPTH_BITS)), l.push("webgl green bits:" + o.getParameter(o.GREEN_BITS)), l.push("webgl max anisotropy:" + function (e) {
        var t = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic");
        if (t) {
          var a = e.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
          return 0 === a && (a = 2), a;
        }
        return null;
      }(o)), l.push("webgl max combined texture image units:" + o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS)), l.push("webgl max cube map texture size:" + o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE)), l.push("webgl max fragment uniform vectors:" + o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS)), l.push("webgl max render buffer size:" + o.getParameter(o.MAX_RENDERBUFFER_SIZE)), l.push("webgl max texture image units:" + o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS)), l.push("webgl max texture size:" + o.getParameter(o.MAX_TEXTURE_SIZE)), l.push("webgl max varying vectors:" + o.getParameter(o.MAX_VARYING_VECTORS)), l.push("webgl max vertex attribs:" + o.getParameter(o.MAX_VERTEX_ATTRIBS)), l.push("webgl max vertex texture image units:" + o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS)), l.push("webgl max vertex uniform vectors:" + o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS)), l.push("webgl max viewport dims:" + e(o.getParameter(o.MAX_VIEWPORT_DIMS))), l.push("webgl red bits:" + o.getParameter(o.RED_BITS)), l.push("webgl renderer:" + o.getParameter(o.RENDERER)), l.push("webgl shading language version:" + o.getParameter(o.SHADING_LANGUAGE_VERSION)), l.push("webgl stencil bits:" + o.getParameter(o.STENCIL_BITS)), l.push("webgl vendor:" + o.getParameter(o.VENDOR)), l.push("webgl version:" + o.getParameter(o.VERSION));
      try {
        var s = o.getExtension("WEBGL_debug_renderer_info");
        s && (l.push("webgl unmasked vendor:" + o.getParameter(s.UNMASKED_VENDOR_WEBGL)), l.push("webgl unmasked renderer:" + o.getParameter(s.UNMASKED_RENDERER_WEBGL)));
      } catch (e) {}
      return o.getShaderPrecisionFormat && c(["FLOAT", "INT"], function (i) {
        c(["VERTEX", "FRAGMENT"], function (r) {
          c(["HIGH", "MEDIUM", "LOW"], function (n) {
            c(["precision", "rangeMin", "rangeMax"], function (e) {
              var t = o.getShaderPrecisionFormat(o[r + "_SHADER"], o[n + "_" + i])[e];
              "precision" !== e && (e = "precision " + e);
              var a = ["webgl ", r.toLowerCase(), " shader ", n.toLowerCase(), " ", i.toLowerCase(), " ", e, ":", t].join("");
              l.push(a);
            });
          });
        });
      }), l;
    },
    M = function () {
      try {
        var e = F(),
          t = e.getExtension("WEBGL_debug_renderer_info");
        return e.getParameter(t.UNMASKED_VENDOR_WEBGL) + "~" + e.getParameter(t.UNMASKED_RENDERER_WEBGL);
      } catch (e) {
        return null;
      }
    },
    x = function () {
      var e = document.createElement("div");
      e.innerHTML = "&nbsp;";
      var t = !(e.className = "adsbox");
      try {
        document.body.appendChild(e), t = 0 === document.getElementsByClassName("adsbox")[0].offsetHeight, document.body.removeChild(e);
      } catch (e) {
        t = !1;
      }
      return t;
    },
    O = function () {
      if (void 0 !== navigator.languages) try {
        if (navigator.languages[0].substr(0, 2) !== navigator.language.substr(0, 2)) return !0;
      } catch (e) {
        return !0;
      }
      return !1;
    },
    b = function () {
      return window.screen.width < window.screen.availWidth || window.screen.height < window.screen.availHeight;
    },
    P = function () {
      var e,
        t = navigator.userAgent.toLowerCase(),
        a = navigator.oscpu,
        n = navigator.platform.toLowerCase();
      if (e = 0 <= t.indexOf("windows phone") ? "Windows Phone" : 0 <= t.indexOf("win") ? "Windows" : 0 <= t.indexOf("android") ? "Android" : 0 <= t.indexOf("linux") || 0 <= t.indexOf("cros") ? "Linux" : 0 <= t.indexOf("iphone") || 0 <= t.indexOf("ipad") ? "iOS" : 0 <= t.indexOf("mac") ? "Mac" : "Other", ("ontouchstart" in window || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints) && "Windows Phone" !== e && "Android" !== e && "iOS" !== e && "Other" !== e) return !0;
      if (void 0 !== a) {
        if (0 <= (a = a.toLowerCase()).indexOf("win") && "Windows" !== e && "Windows Phone" !== e) return !0;
        if (0 <= a.indexOf("linux") && "Linux" !== e && "Android" !== e) return !0;
        if (0 <= a.indexOf("mac") && "Mac" !== e && "iOS" !== e) return !0;
        if ((-1 === a.indexOf("win") && -1 === a.indexOf("linux") && -1 === a.indexOf("mac")) != ("Other" === e)) return !0;
      }
      return 0 <= n.indexOf("win") && "Windows" !== e && "Windows Phone" !== e || (0 <= n.indexOf("linux") || 0 <= n.indexOf("android") || 0 <= n.indexOf("pike")) && "Linux" !== e && "Android" !== e || (0 <= n.indexOf("mac") || 0 <= n.indexOf("ipad") || 0 <= n.indexOf("ipod") || 0 <= n.indexOf("iphone")) && "Mac" !== e && "iOS" !== e || (n.indexOf("win") < 0 && n.indexOf("linux") < 0 && n.indexOf("mac") < 0 && n.indexOf("iphone") < 0 && n.indexOf("ipad") < 0) !== ("Other" === e) || void 0 === navigator.plugins && "Windows" !== e && "Windows Phone" !== e;
    },
    L = function () {
      var e,
        t = navigator.userAgent.toLowerCase(),
        a = navigator.productSub;
      if (("Chrome" === (e = 0 <= t.indexOf("firefox") ? "Firefox" : 0 <= t.indexOf("opera") || 0 <= t.indexOf("opr") ? "Opera" : 0 <= t.indexOf("chrome") ? "Chrome" : 0 <= t.indexOf("safari") ? "Safari" : 0 <= t.indexOf("trident") ? "Internet Explorer" : "Other") || "Safari" === e || "Opera" === e) && "20030107" !== a) return !0;
      var n,
        r = eval.toString().length;
      if (37 === r && "Safari" !== e && "Firefox" !== e && "Other" !== e) return !0;
      if (39 === r && "Internet Explorer" !== e && "Other" !== e) return !0;
      if (33 === r && "Chrome" !== e && "Opera" !== e && "Other" !== e) return !0;
      try {
        throw "a";
      } catch (e) {
        try {
          e.toSource(), n = !0;
        } catch (e) {
          n = !1;
        }
      }
      return n && "Firefox" !== e && "Other" !== e;
    },
    I = function () {
      var e = document.createElement("canvas");
      return !(!e.getContext || !e.getContext("2d"));
    },
    k = function () {
      if (!I()) return !1;
      var e = F();
      return !!window.WebGLRenderingContext && !!e;
    },
    R = function () {
      return "Microsoft Internet Explorer" === navigator.appName || !("Netscape" !== navigator.appName || !/Trident/.test(navigator.userAgent));
    },
    D = function () {
      return void 0 !== window.swfobject;
    },
    N = function () {
      return window.swfobject.hasFlashPlayerVersion("9.0.0");
    },
    _ = function (t, e) {
      var a = "___fp_swf_loaded";
      window[a] = function (e) {
        t(e);
      };
      var n,
        r,
        i = e.fonts.swfContainerId;
      (r = document.createElement("div")).setAttribute("id", n.fonts.swfContainerId), document.body.appendChild(r);
      var o = {
        onReady: a
      };
      window.swfobject.embedSWF(e.fonts.swfPath, i, "1", "1", "9.0.0", !1, o, {
        allowScriptAccess: "always",
        menu: "false"
      }, {});
    },
    F = function () {
      var e = document.createElement("canvas"),
        t = null;
      try {
        t = e.getContext("webgl") || e.getContext("experimental-webgl");
      } catch (e) {}
      return t || (t = null), t;
    },
    G = [{
      key: "userAgent",
      getData: function (e) {
        e(navigator.userAgent);
      }
    }, {
      key: "webdriver",
      getData: function (e, t) {
        e(null == navigator.webdriver ? t.NOT_AVAILABLE : navigator.webdriver);
      }
    }, {
      key: "language",
      getData: function (e, t) {
        e(navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || t.NOT_AVAILABLE);
      }
    }, {
      key: "colorDepth",
      getData: function (e, t) {
        e(window.screen.colorDepth || t.NOT_AVAILABLE);
      }
    }, {
      key: "deviceMemory",
      getData: function (e, t) {
        e(navigator.deviceMemory || t.NOT_AVAILABLE);
      }
    }, {
      key: "pixelRatio",
      getData: function (e, t) {
        e(window.devicePixelRatio || t.NOT_AVAILABLE);
      }
    }, {
      key: "hardwareConcurrency",
      getData: function (e, t) {
        e(S(t));
      }
    }, {
      key: "screenResolution",
      getData: function (e, t) {
        e(n(t));
      }
    }, {
      key: "availableScreenResolution",
      getData: function (e, t) {
        e(r(t));
      }
    }, {
      key: "timezoneOffset",
      getData: function (e) {
        e(new Date().getTimezoneOffset());
      }
    }, {
      key: "timezone",
      getData: function (e, t) {
        window.Intl && window.Intl.DateTimeFormat ? e(new window.Intl.DateTimeFormat().resolvedOptions().timeZone) : e(t.NOT_AVAILABLE);
      }
    }, {
      key: "sessionStorage",
      getData: function (e, t) {
        e(p(t));
      }
    }, {
      key: "localStorage",
      getData: function (e, t) {
        e(v(t));
      }
    }, {
      key: "indexedDb",
      getData: function (e, t) {
        e(A(t));
      }
    }, {
      key: "addBehavior",
      getData: function (e) {
        e(!(!document.body || !document.body.addBehavior));
      }
    }, {
      key: "openDatabase",
      getData: function (e) {
        e(!!window.openDatabase);
      }
    }, {
      key: "cpuClass",
      getData: function (e, t) {
        e(C(t));
      }
    }, {
      key: "platform",
      getData: function (e, t) {
        e(B(t));
      }
    }, {
      key: "doNotTrack",
      getData: function (e, t) {
        e(w(t));
      }
    }, {
      key: "plugins",
      getData: function (e, t) {
        R() ? t.plugins.excludeIE ? e(t.EXCLUDED) : e(o(t)) : e(i(t));
      }
    }, {
      key: "canvas",
      getData: function (e, t) {
        I() ? e(y(t)) : e(t.NOT_AVAILABLE);
      }
    }, {
      key: "webgl",
      getData: function (e, t) {
        k() ? e(E()) : e(t.NOT_AVAILABLE);
      }
    }, {
      key: "webglVendorAndRenderer",
      getData: function (e) {
        k() ? e(M()) : e();
      }
    }, {
      key: "adBlock",
      getData: function (e) {
        e(x());
      }
    }, {
      key: "hasLiedLanguages",
      getData: function (e) {
        e(O());
      }
    }, {
      key: "hasLiedResolution",
      getData: function (e) {
        e(b());
      }
    }, {
      key: "hasLiedOs",
      getData: function (e) {
        e(P());
      }
    }, {
      key: "hasLiedBrowser",
      getData: function (e) {
        e(L());
      }
    }, {
      key: "touchSupport",
      getData: function (e) {
        e(t());
      }
    }, {
      key: "fonts",
      getData: function (e, t) {
        var u = ["monospace", "sans-serif", "serif"],
          d = ["Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3"];
        t.fonts.extendedJsFonts && (d = d.concat(["Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT", "American Typewriter", "American Typewriter Condensed", "AmerType Md BT", "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo", "Arabic Typesetting", "ARCHER", "ARNO PRO", "Arrus BT", "Aurora Cn BT", "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy", "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville", "Baskerville Old Face", "Batang", "BatangChe", "Bauer Bodoni", "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD", "Blackadder ITC", "BlairMdITC TT", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Bookshelf Symbol 7", "Boulder", "Bradley Hand", "Bradley Hand ITC", "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Californian FB", "Calisto MT", "Calligrapher", "Candara", "CaslonOpnface BT", "Castellar", "Centaur", "Cezanne", "CG Omega", "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer", "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed", "CloisterBlack BT", "Cochin", "Colonna MT", "Constantia", "Cooper Black", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold", "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Cordia New", "CordiaUPC", "Cornerstone", "Coronet", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David", "DB LCD Temp", "DELICIOUS", "Denmark", "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant", "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "EUROSTILE", "Exotc350 Bd BT", "FangSong", "Felix Titling", "Fixedsys", "FONTIN", "Footlight MT Light", "Forte", "FrankRuehl", "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script", "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER", "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT", "Gautami", "Geeza Pro", "Geometr231 BT", "Geometr231 Hv BT", "Geometr231 Lt BT", "GeoSlab 703 Lt BT", "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Gloucester MT Extra Condensed", "GOTHAM", "GOTHAM BOLD", "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", "GoudyOLSt BT", "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington", "Heather", "Heiti SC", "Heiti TC", "HELV", "Herald", "High Tower Text", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Imprint MT Shadow", "Incised901 Bd BT", "Incised901 BT", "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT", "INTERSTATE", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET", "Jenson", "Jester", "Jokerman", "Juice ITC", "Kabel Bk BT", "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN", "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC", "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script", "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT", "LilyUPC", "Lithograph", "Lithograph Light", "Long Island", "Lydian BT", "Magneto", "Maiandra GD", "Malayalam Sangam MN", "Malgun Gothic", "Mangal", "Marigold", "Marion", "Marker Felt", "Market", "Marlett", "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion", "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern", "Modern No. 20", "Mona Lisa Solid ITC TT", "Mongolian Baiti", "MONO", "MoolBoran", "Mrs Eaves", "MS LineDraw", "MS Mincho", "MS PMincho", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli", "Nadeem", "Narkisim", "NEVIS", "News Gothic", "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid", "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century", "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN", "OSAKA", "OzHandicraft BT", "Palace Script MT", "Papyrus", "Parchment", "Party LET", "Pegasus", "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB", "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET", "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic", "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Rod", "Roman", "Sakkal Majalla", "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold", "SCRIPTINA", "Serifa", "Serifa BT", "Serifa Th BT", "ShelleyVolante BT", "Sherwood", "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard", "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell", "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket", "Souvenir Lt BT", "Staccato222 BT", "Steamer", "Stencil", "Storybook", "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen", "Synchro LET", "System", "Tamil Sangam MN", "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC", "Terminal", "Thonburi", "Traditional Arabic", "Trajan", "TRAJAN PRO", "Tristan", "Tubular", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold", "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium", "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Vijaya", "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda", "Westminster", "WHITNEY", "Wide Latin", "ZapfEllipt BT", "ZapfHumnst BT", "ZapfHumnst Dm BT", "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT", "ZWAdobeF"]));
        d = (d = d.concat(t.fonts.userDefinedFonts)).filter(function (e, t) {
          return d.indexOf(e) === t;
        });
        var a = document.getElementsByTagName("body")[0],
          r = document.createElement("div"),
          g = document.createElement("div"),
          n = {},
          i = {},
          f = function () {
            var e = document.createElement("span");
            return e.style.position = "absolute", e.style.left = "-9999px", e.style.fontSize = "72px", e.style.fontStyle = "normal", e.style.fontWeight = "normal", e.style.letterSpacing = "normal", e.style.lineBreak = "auto", e.style.lineHeight = "normal", e.style.textTransform = "none", e.style.textAlign = "left", e.style.textDecoration = "none", e.style.textShadow = "none", e.style.whiteSpace = "normal", e.style.wordBreak = "normal", e.style.wordSpacing = "normal", e.innerHTML = "mmmmmmmmmmlli", e;
          },
          o = function (e) {
            for (var t = !1, a = 0; a < u.length; a++) if (t = e[a].offsetWidth !== n[u[a]] || e[a].offsetHeight !== i[u[a]]) return t;
            return t;
          },
          l = function () {
            for (var e = [], t = 0, a = u.length; t < a; t++) {
              var n = f();
              n.style.fontFamily = u[t], r.appendChild(n), e.push(n);
            }
            return e;
          }();
        a.appendChild(r);
        for (var s = 0, c = u.length; s < c; s++) n[u[s]] = l[s].offsetWidth, i[u[s]] = l[s].offsetHeight;
        var h = function () {
          for (var e, t, a, n = {}, r = 0, i = d.length; r < i; r++) {
            for (var o = [], l = 0, s = u.length; l < s; l++) {
              var c = (e = d[r], t = u[l], a = void 0, (a = f()).style.fontFamily = "'" + e + "'," + t, a);
              g.appendChild(c), o.push(c);
            }
            n[d[r]] = o;
          }
          return n;
        }();
        a.appendChild(g);
        for (var m = [], T = 0, p = d.length; T < p; T++) o(h[d[T]]) && m.push(d[T]);
        a.removeChild(g), a.removeChild(r), e(m);
      },
      pauseBefore: !0
    }, {
      key: "fontsFlash",
      getData: function (t, e) {
        return D() ? N() ? e.fonts.swfPath ? void _(function (e) {
          t(e);
        }, e) : t("missing options.fonts.swfPath") : t("flash not installed") : t("swf object not loaded");
      },
      pauseBefore: !0
    }, {
      key: "audio",
      getData: function (a, e) {
        var t = e.audio;
        if (t.excludeIOS11 && navigator.userAgent.match(/OS 11.+Version\/11.+Safari/)) return a(e.EXCLUDED);
        var n = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        if (null == n) return a(e.NOT_AVAILABLE);
        var r = new n(1, 44100, 44100),
          i = r.createOscillator();
        i.type = "triangle", i.frequency.setValueAtTime(1e4, r.currentTime);
        var o = r.createDynamicsCompressor();
        c([["threshold", -50], ["knee", 40], ["ratio", 12], ["reduction", -20], ["attack", 0], ["release", 0.25]], function (e) {
          void 0 !== o[e[0]] && "function" == typeof o[e[0]].setValueAtTime && o[e[0]].setValueAtTime(e[1], r.currentTime);
        }), i.connect(o), o.connect(r.destination), i.start(0), r.startRendering();
        var l = setTimeout(function () {
          return console.warn('Audio fingerprint timed out. Please report bug at https://github.com/Valve/fingerprintjs2 with your user agent: "' + navigator.userAgent + '".'), r.oncomplete = function () {}, r = null, a("audioTimeout");
        }, t.timeout);
        r.oncomplete = function (e) {
          var t;
          try {
            clearTimeout(l), t = e.renderedBuffer.getChannelData(0).slice(4500, 5e3).reduce(function (e, t) {
              return e + Math.abs(t);
            }, 0).toString(), i.disconnect(), o.disconnect();
          } catch (e) {
            return void a(e);
          }
          a(t);
        };
      }
    }, {
      key: "enumerateDevices",
      getData: function (t, e) {
        if (!a()) return t(e.NOT_AVAILABLE);
        navigator.mediaDevices.enumerateDevices().then(function (e) {
          t(e.map(function (e) {
            return "id=" + e.deviceId + ";gid=" + e.groupId + ";" + e.kind + ";" + e.label;
          }));
        }).catch(function (e) {
          t(e);
        });
      }
    }],
    U = function (e) {
      throw new Error("'new Fingerprint()' is deprecated, see https://github.com/Valve/fingerprintjs2#upgrade-guide-from-182-to-200");
    };
  return U.get = function (a, n) {
    n ? a || (a = {}) : (n = a, a = {}), function (e, t) {
      if (null == t) return;
      var a, n;
      for (n in t) null == (a = t[n]) || Object.prototype.hasOwnProperty.call(e, n) || (e[n] = a);
    }(a, e), a.components = a.extraComponents.concat(G);
    var r = {
        data: [],
        addPreprocessedComponent: function (e, t) {
          "function" == typeof a.preprocessor && (t = a.preprocessor(e, t)), r.data.push({
            key: e,
            value: t
          });
        }
      },
      i = -1,
      o = function (e) {
        if ((i += 1) >= a.components.length) n(r.data);else {
          var t = a.components[i];
          if (a.excludes[t.key]) o(!1);else {
            if (!e && t.pauseBefore) return i -= 1, void setTimeout(function () {
              o(!0);
            }, 1);
            try {
              t.getData(function (e) {
                r.addPreprocessedComponent(t.key, e), o(!1);
              }, a);
            } catch (e) {
              r.addPreprocessedComponent(t.key, String(e)), o(!1);
            }
          }
        }
      };
    o(!1);
  }, U.getPromise = function (a) {
    return new Promise(function (e, t) {
      U.get(a, e);
    });
  }, U.getV18 = function (i, o) {
    return null == o && (o = i, i = {}), U.get(i, function (e) {
      for (var t = [], a = 0; a < e.length; a++) {
        var n = e[a];
        if (n.value === (i.NOT_AVAILABLE || "not available")) t.push({
          key: n.key,
          value: "unknown"
        });else if ("plugins" === n.key) t.push({
          key: "plugins",
          value: s(n.value, function (e) {
            var t = s(e[2], function (e) {
              return e.join ? e.join("~") : e;
            }).join(",");
            return [e[0], e[1], t].join("::");
          })
        });else if (-1 !== ["canvas", "webgl"].indexOf(n.key)) t.push({
          key: n.key,
          value: n.value.join("~")
        });else if (-1 !== ["sessionStorage", "localStorage", "indexedDb", "addBehavior", "openDatabase"].indexOf(n.key)) {
          if (!n.value) continue;
          t.push({
            key: n.key,
            value: 1
          });
        } else n.value ? t.push(n.value.join ? {
          key: n.key,
          value: n.value.join(";")
        } : n) : t.push({
          key: n.key,
          value: n.value
        });
      }
      var r = l(s(t, function (e) {
        return e.value;
      }).join("~~~"), 31);
      o(r, t);
    });
  }, U.x64hash128 = l, U.VERSION = "2.1.0", U;
});
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s) {
  return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}
function b64_md5(s) {
  return binl2b64(core_md5(str2binl(s), s.length * chrsz));
}
function str_md5(s) {
  return binl2str(core_md5(str2binl(s), s.length * chrsz));
}
function hex_hmac_md5(key, data) {
  return binl2hex(core_hmac_md5(key, data));
}
function b64_hmac_md5(key, data) {
  return binl2b64(core_hmac_md5(key, data));
}
function str_hmac_md5(key, data) {
  return binl2str(core_hmac_md5(key, data));
}

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test() {
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[(len + 64 >>> 9 << 4) + 14] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t) {
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
  return md5_cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
  return md5_cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
  return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data) {
  var bkey = str2binl(key);
  if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);
  var ipad = Array(16),
    opad = Array(16);
  for (var i = 0; i < 16; i++) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }
  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xFFFF;
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str) {
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for (var i = 0; i < str.length * chrsz; i += chrsz) bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin) {
  var str = "";
  var mask = (1 << chrsz) - 1;
  for (var i = 0; i < bin.length * 32; i += chrsz) str += String.fromCharCode(bin[i >> 5] >>> i % 32 & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray) {
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for (var i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 + 4 & 0xF) + hex_tab.charAt(binarray[i >> 2] >> i % 4 * 8 & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray) {
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for (var i = 0; i < binarray.length * 4; i += 3) {
    var triplet = (binarray[i >> 2] >> 8 * (i % 4) & 0xFF) << 16 | (binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4) & 0xFF) << 8 | binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4) & 0xFF;
    for (var j = 0; j < 4; j++) {
      if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;else str += tab.charAt(triplet >> 6 * (3 - j) & 0x3F);
    }
  }
  return str;
}
"use strict";
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
(function () {
  var Config = {};
  Config.url = "https://hlxapi.cqnews.net"; // https://hlxapi.cqnews.net  http://10.3.192.197:30000
  Config.ajax = function ajax(ops) {
    var options = {
      url: ops.url || "",
      type: ops.type.toUpperCase() || "GET",
      async: ops.async || true,
      data: ops.data || {},
      headers: ops.headers || {},
      success: ops.success || null,
      error: ops.error || null
    };
    var xhr = null;
    var params = formsParams(options.data);
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    if (options.type == "GET") {
      xhr.open(options.type, options.url + "?" + params, options.async);
      if (options.headers && options.headers instanceof Object) {
        for (var header in options.headers) {
          xhr.setRequestHeader(header, options.headers[header]);
        }
      }
      xhr.send(null);
    }
    if (options.type == "POST") {
      xhr.open(options.type, options.url, options.async);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      if (options.headers && options.headers instanceof Object) {
        for (var header in options.headers) {
          xhr.setRequestHeader(header, options.headers[header]);
        }
      }
      xhr.send(params);
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
          var res;
          if (options.success && options.success instanceof Function) {
            res = xhr.responseText;
            if (typeof res === "string") {
              res = res ? JSON.parse(res) : res;
            }
            options.success(res);
          }
        } else {
          if (options.error && options.error instanceof Function) {
            options.error(xhr);
          }
        }
      }
    };
    function formsParams(data) {
      var arr = [];
      for (var prop in data) {
        arr.push(prop + "=" + data[prop]);
      }
      return arr.join("&");
    }
  };
  Config.getCookie = function getCookie(key) {
    if (typeof document === "undefined" || arguments.length && !key) {
      return;
    }
    var cookies = document.cookie ? document.cookie.split("; ") : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split("=");
      var value = parts.slice(1).join("=");
      var foundKey = parts[0];
      try {
        jar[foundKey] = JSON.parse(unescape(value));
      } catch (e) {
        jar[foundKey] = unescape(value);
      }
      if (key === foundKey) {
        break;
      }
    }
    return key ? jar[key] : jar;
  };
  var buriedPointController = function buriedPointController() {
    // 公共变量
    var _that = this;
    // 私有变量
    var _private = {};
    var referrer = document.referrer || ""; // 参数：来源地址
    var currentUrl = document.URL || ""; // 参数：当前地址
    var platform = window.navigator.platform || ""; // 参数：平台
    var language = window.navigator.language || ""; // 参数：语言
    _private.init = function () {
      Fingerprint2.get({}, function (components) {
        // 参数
        var values = components.map(function (component) {
          return component.value;
        });
        var murmur = Fingerprint2.x64hash128(values.join(""), 31); // 参数：浏览器指纹

        var titleDom = document.getElementsByTagName("title")[0];
        var title = titleDom ? titleDom.innerText : ""; // 参数：标题
        var businessTypeDom = getMetaDom("businessType");
        var businessType = businessTypeDom ? businessTypeDom.content.toUpperCase() : ""; // 参数：业务类型
        var businessIdDom = getMetaDom("businessId");
        var businessId = businessIdDom ? businessIdDom.content.replace(/\D/g, '') : ""; // 参数：业务id
        var catalogsIdDom = getMetaDom("catalogsId");
        var catalogsId = catalogsIdDom ? catalogsIdDom.content.replace(/,/g, '').replace(/\D/g, '') : ""; // 参数：栏目id

        // 埋点 
        var formData = {
          businessId: businessId,
          businessType: businessType,
          fingerprint: murmur,
          fromUrl: referrer,
          language: language,
          platform: platform,
          title: title,
          url: currentUrl,
          catalogsId: catalogsId
        };
        Config.ajax({
          url: Config.url + "/statistics/view_count",
          type: "POST",
          data: formData,
          success: function success() {
            console.log("buriedPoint success");
          },
          error: function error() {
            console.log("buriedPoint error");
          }
        });
      });
    };
    _private.init();
    function getMetaDom(name) {
      var metaList = document.getElementsByTagName("meta");
      if (metaList && metaList.length > 0) {
        for (var i = 0; i < metaList.length; i++) {
          if (metaList[i].name === name) {
            return metaList[i];
          }
        }
      } else {
        return "";
      }
    }
  };
  new buriedPointController();
})();
(function () {
  ZWY_INFO_CLOUD = window.ZWY_INFO_CLOUD || {};
  ZWY_INFO_CLOUD = {
    version: "1.0"
  };

  /**
   ** 获取app用户信息（不需要回调的新方法）  getUserInfo
   ** return:
   ** obj = {
   **   token : '',
   **   sessionId : '',
   **   phone : '',
   **   portrait: '', (用户头像，可能为空)
   **   nickname: '',
   ** }
   **
   **/
  ZWY_INFO_CLOUD.getUserInfo = function (params) {
    if (ZWY_INFO_CLOUD.getOS() == "iOS" && ZWY_INFO_CLOUD.isOpenInApp()) {
      if (ZWY_INFO_CLOUD.getWebVersion(1)) {
        // 判断新版webview   老版webview中还是使用New_AppJsObj.getUserInfo()老方法
        var userInfo = window.prompt("getUserInfo");
      } else {
        var userInfo = New_AppJsObj.getUserInfo();
      }
    } else {
      var userInfo = New_AppJsObj.getUserInfo();
    }
    if (_typeof(userInfo) === "object") {
      var obj = userInfo;
    } else {
      var obj = JSON.parse(userInfo);
    }
    return obj;
  };

  /**
   ** 判断设备操作系统
   ** @return string
   ** iOS      苹果
   ** Android  安卓
   ** ""       其他
   ** */
  ZWY_INFO_CLOUD.getOS = function () {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      return "iOS";
    } else if (/(Android)/i.test(navigator.userAgent)) {
      return "Android";
    } else {
      return "";
    }
  };
  /**
   ** 判断是否在app内打开
   ** @return Boolean
   ** true   app内打开
   ** fasle  app外打开
   ** */
  ZWY_INFO_CLOUD.isOpenInApp = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf("cq_xhl") > -1) {
      return true;
    } else {
      return false;
    }
  };

  /**
   ** 判断app内webview版本号
   ** @param
   ** version 版本号
   ** @return Boolean
   ** true    高于参数传递的版本号
   ** false   低于参数传递的版本号
   ** */
  ZWY_INFO_CLOUD.getWebVersion = function (version) {
    version = version + "";
    var _str = window.navigator.userAgent.toLowerCase();
    var r = _str.match(/xhl_v=([^\"\)\'\;\s]*)/);
    if (r != null) {
      if (r[1] >= version) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
})();
(function () {
  var Config = {};
  Config.url = "https://hlxapi.cqnews.net"; // http://testhlxgateway.cqyqdc.com   https://hlxapi.cqnews.net
  Config.ajax = function ajax(ops) {
    var options = {
      url: ops.url || "",
      type: ops.type.toUpperCase() || "GET",
      async: ops.async || true,
      data: ops.data || {},
      headers: ops.headers || {},
      success: ops.success || null,
      error: ops.error || null
    };
    var xhr = null;
    xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    if (options.type == "GET") {
      var params = formsParams(options.data);
      xhr.open(options.type, options.url + "?" + params, options.async);
      if (options.headers && options.headers instanceof Object) {
        for (var header in options.headers) {
          xhr.setRequestHeader(header, options.headers[header]);
        }
      }
      xhr.send(null);
    }
    if (options.type == "POST") {
      var _params = JSON.stringify(options.data);
      xhr.open(options.type, options.url, options.async);
      xhr.setRequestHeader("Content-Type", "application/json");
      if (options.headers && options.headers instanceof Object) {
        for (var _header in options.headers) {
          xhr.setRequestHeader(_header, options.headers[_header]);
        }
      }
      xhr.send(_params);
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
          var res;
          if (options.success && options.success instanceof Function) {
            res = xhr.responseText;
            if (typeof res === "string") {
              res = res ? JSON.parse(res) : res;
            }
            options.success(res);
          }
        } else {
          if (options.error && options.error instanceof Function) {
            options.error(xhr);
          }
        }
      }
    };
    function formsParams(data) {
      var arr = [];
      for (var prop in data) {
        arr.push(prop + "=" + data[prop]);
      }
      return arr.join("&");
    }
  };
  Config.getCookie = function getCookie(key) {
    if (typeof document === "undefined" || arguments.length && !key) {
      return;
    }
    var cookies = document.cookie ? document.cookie.split("; ") : [];
    var jar = {};
    for (var i = 0; i < cookies.length; i++) {
      var parts = cookies[i].split("=");
      var value = parts.slice(1).join("=");
      var foundKey = parts[0];
      try {
        jar[foundKey] = JSON.parse(unescape(value));
      } catch (e) {
        jar[foundKey] = unescape(value);
      }
      if (key === foundKey) {
        break;
      }
    }
    return key ? jar[key] : jar;
  };
  Config.$local = {
    set: function set(key, val) {
      localStorage.setItem('HLW_' + key, JSON.stringify(val));
    },
    get: function get(key) {
      var val = localStorage.getItem('HLW_' + key);
      var dataobj = val ? JSON.parse(val) : val;
      return dataobj;
    },
    del: function del(key) {
      localStorage.removeItem('HLW_' + key);
    }
  };
  Config.jq = {
    getMetaDom: function getMetaDom(name) {
      var metaList = document.getElementsByTagName("meta");
      if (metaList && metaList.length > 0) {
        for (var i = 0; i < metaList.length; i++) {
          if (metaList[i].name === name) {
            return metaList[i];
          }
        }
      } else {
        return "";
      }
    }
  };

  /**
   * 判断浏览器
   */
  var browser = {
    versions: function () {
      var u = navigator.userAgent;
      return {
        isZJAPP: u.toLowerCase().indexOf('cq_xhl') > -1,
        isMedia: u.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i),
        /* 是否是移动端 */
        trident: u.indexOf('Trident') > -1,
        /*IE内核*/
        presto: u.indexOf('Presto') > -1,
        /*opera内核*/
        webKit: u.indexOf('AppleWebKit') > -1,
        /*苹果、谷歌内核*/
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
        /*火狐内核*/
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        /*是否为移动终端*/
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        /*ios终端*/
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        /*android终端或者uc浏览器*/
        windowsPhone: u.indexOf('Windows Phone') > -1,
        /*android终端或者uc浏览器*/
        iPhone: u.indexOf('iPhone') > -1,
        /*是否为iPhone或者QQHD浏览器*/
        iPad: u.indexOf('iPad') > -1,
        /*是否iPad*/
        webApp: u.indexOf('Safari') == -1,
        /*是否web应该程序，没有头部与底部*/
        souyue: u.indexOf('souyue') > -1,
        superapp: u.indexOf('superapp') > -1,
        weixin: u.toLowerCase().indexOf('micromessenger') > -1,
        /*是否微信*/
        safari: u.indexOf('Safari') > -1
      };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  };

  /**
   * murmur: 浏览器指纹
   */
  var videoPointController = function videoPointController(murmur) {
    // 公共变量
    var _nowTime = new Date().getTime();
    var _reTime = '';
    // 2、获取对应数据
    var _private = {};
    var ctype = '';
    var b = browser.versions;
    // 判断当前浏览器
    if (b.isZJAPP) {
      ctype = 'APP';
    } else if (b.weixin) {
      ctype = 'WX';
    } else if (b.isMedia || b.mobile) {
      ctype = 'H5';
    } else if (!b.isMedia && !b.mobile) {
      ctype = 'PC';
    } else {
      ctype = 'OTHER';
    }

    // const ua = window.navigator.userAgent.toLowerCase();
    // const isOpenApp = ua.indexOf("cq_xhl") >= 0; // 是否在APP内
    var referrer = document.referrer || ""; // 参数：来源地址
    var currentUrl = document.URL || ""; // 参数：当前地址
    var platform = window.navigator.platform || ""; // 参数：平台
    var language = window.navigator.language || ""; // 参数：语言
    var titleDom = document.getElementsByTagName("title")[0];
    var _title = titleDom ? titleDom.innerText : ""; // 参数：标题
    var businessTypeDom = Config.jq.getMetaDom("businessType");
    var businessType = businessTypeDom ? businessTypeDom.content.toUpperCase() : "COLUMN"; // 参数：业务类型   NEWS | COLUMN
    var businessIdDom = Config.jq.getMetaDom("businessId");
    var businessId = businessIdDom ? businessIdDom.content.replace(/\D/g, '') : ""; // 参数：稿件id
    var catalogsIdDom = Config.jq.getMetaDom("catalogsId");
    var catalogsId = catalogsIdDom ? catalogsIdDom.content.replace(/,/g, '').replace(/\D/g, '') : ""; // 参数：栏目id
    var _murmur = murmur; // 浏览器指纹
    var _key = hex_md5(_murmur + _nowTime);
    function getCurrTime(otime) {
      otime = otime || new Date().getTime();
      if (!_reTime) return otime;
      if (Math.abs(otime - _reTime) < 86400000) {
        return otime;
      } else {
        return _reTime;
      }
    }
    // console.log(_key);
    // console.log(ZWY_INFO_CLOUD)
    if (businessType === 'NEWS' && !businessId || businessType === 'COLUMN' && !catalogsId) return false;
    // 新闻浏览时长对象
    var _ntsObj = {
      "btime": 0,
      "cid": catalogsId,
      "ctime": "",
      "fromUrl": referrer,
      "nid": businessId,
      "pk": _key,
      "url": currentUrl
    };
    // 视频播放时长对象
    var _vtsObj = {
      "cid": catalogsId,
      "ctime": "",
      "fromUrl": referrer,
      "nid": businessId,
      "url": currentUrl,
      "playTime": 0,
      "totalTime": 0,
      "vurl": "",
      "pk": ""
    };
    var video_data = {
      "ctype": ctype,
      // 栏目
      "cv": {
        "cid": catalogsId,
        "fromUrl": referrer,
        "url": currentUrl
      },
      // 浏览器指纹
      "fingerprint": _murmur,
      // 语言
      "language": language,
      // 新闻浏览时长对象集合
      "nts": [],
      // 新闻浏览量埋点对象
      "nv": {
        "cid": catalogsId,
        "fromUrl": referrer,
        "nid": businessId,
        "pk": _key,
        "title": _title,
        "url": currentUrl
      },
      // 平台
      "platform": platform,
      // 视频播放时长对象集合
      "vts": []
    };

    /// 2.1 APP单独处理session
    if (b.isZJAPP) {
      if (window.ZWY_INFO_CLOUD.getUserInfo().sessionId) {
        video_data["token"] = window.ZWY_INFO_CLOUD.getUserInfo().token;
        video_data["sessionId"] = window.ZWY_INFO_CLOUD.getUserInfo().sessionId;
      }
    }

    // 3、执行内置方法
    _private.init = function () {
      // 4、初始化，上报当前数据，并处理历史监听数据
      //// 4.1 判断当前为栏目还是文章
      if (businessType === 'NEWS') {
        delete video_data.cv;
      } else {
        delete video_data.nv;
      }
      //// 4.2 页面浏览时长 -- 历史数据处理
      var newsData = Config.$local.get('NEWS_POINT');
      Config.$local.del('NEWS_POINT');
      if (newsData && newsData.constructor === Object) {
        for (var _i1 in newsData) {
          if (isNaN(Number(_i1))) {
            delete newsData[_i1];
            continue;
          }
          var _v1 = newsData[_i1];
          _v1 && video_data.nts.push(_v1);
        }
      }

      //// 4.3 页面视频时长 -- 历史数据处理
      var videoData = Config.$local.get('VIDEO_POINT');
      Config.$local.del('VIDEO_POINT');
      if (videoData && videoData.constructor === Object) {
        for (var _i2 in videoData) {
          if (isNaN(Number(_i2.replace(/v/, '')))) {
            delete videoData[_i2];
            continue;
          }
          var _v2 = videoData[_i2];
          if (_v2 && _v2.playTime && _v2.playTime > 1) video_data.vts.push(_v2);
        }
      }
      //// 4.4 iframe页面视频时长 -- 历史数据处理
      var iframeData = Config.$local.get('VIDEO_IFRAME');
      Config.$local.del('VIDEO_IFRAME');
      if (iframeData && iframeData.constructor === Object) {
        for (var _i3 in iframeData) {
          if (isNaN(Number(_i3.replace(/i/, '')))) {
            delete iframeData[_i3];
            continue;
          }
          var _v3 = iframeData[_i3];
          if (_v3 && _v3.playTime && _v3.playTime > 1) video_data.vts.push(_v3);
        }
      }
      //// 4.5 调上报接口, 延迟1.5s 执行
      setTimeout(function () {
        Config.ajax({
          url: Config.url + "/statistics/currency",
          type: "POST",
          data: video_data,
          success: function success(res) {
            console.log("videoPoint success");
            _reTime = res.data;
          },
          error: function error() {
            console.log("videoPoint error");
          }
        });
      }, 1500);

      // 5、当为文章时候，监听页面停留时长
      if (businessType === 'NEWS') {
        addNewsListener();
      }
      window.addEventListener("load", function (e) {
        console.log("point load");
        // 6、监听video视频播放
        addVideoListener();

        // 7、向iframe派发事件，进行去iframe的视频进行监听
        var iframe = document.getElementsByTagName('iframe');
        for (var i = 0; i < iframe.length; i++) {
          var _iframe = iframe[i].contentWindow;
          _iframe.postMessage({
            event: "video",
            data: JSON.stringify({
              "name": 'i' + i,
              "columnId": catalogsId,
              "createTime": _nowTime,
              "fromUrl": referrer,
              "newsId": businessId,
              "url": currentUrl,
              "pk": _key
            })
          }, '*');
        }
      });
      // 8.接受iframe返回的数据
      window.addEventListener('message', function (event) {
        var e = event.data ? event.data.event : '';
        if (e !== 'iframeVideo' || !event.data.data) return false;
        var data = event.data.data ? JSON.parse(event.data.data) : {};
        var _video_iframe = Config.$local.get('VIDEO_IFRAME') || {};
        if (data.name) {
          _video_iframe[data.name] = {
            "cid": data.cid || '',
            "ctime": getCurrTime(data.ctime) || '',
            "fromUrl": data.fromUrl || '',
            "nid": data.nid || '',
            "url": data.url || '',
            "playTime": data.playTime || 0,
            "totalTime": data.totalTime || 0,
            "vurl": data.vurl || '',
            "pk": data.pk || ''
          };
          Config.$local.set('VIDEO_IFRAME', _video_iframe);
        }
      }, false);
    };
    function addNewsListener() {
      setInterval(function () {
        _ntsObj.btime = _ntsObj.btime + 1;
        _ntsObj.ctime = _ntsObj.ctime || getCurrTime();
        var _news_point = Config.$local.get('NEWS_POINT') || {};
        _news_point[_nowTime] = _ntsObj;
        Config.$local.set('NEWS_POINT', _news_point);
      }, 1000);
    }
    function addVideoListener() {
      var videosList = document.getElementsByTagName('video');
      var r = [];
      for (var i = 0; i < videosList.length; i++) {
        var _n = 'HLW_VIDEO_POINT' + (i + 1);
        r.push(_n);
        var _v = videosList[i];
        _v.setAttribute(_n, "");
        videoHanlder(_v, _n, i);
      }
      return r;
    }
    var videoTimer = {};
    var videoNum = 0;
    function videoHanlder(mVideo, mName, i) {
      videoNum = i;
      var index = i;
      videoTimer[mName] = null;
      var videoObj = Object.assign({}, _vtsObj, {
        pk: _key + 'v' + index,
        ctime: null
      });
      // video监听事件
      // 开启监听事件
      mVideo.oncanplay = function () {
        // let _t = getCurrTime();
        videoObj = {
          "cid": catalogsId,
          "ctime": videoObj.ctime || getCurrTime(),
          "fromUrl": referrer,
          "nid": businessId,
          "url": currentUrl,
          "playTime": videoObj ? videoObj.playTime : 0,
          "totalTime": mVideo.duration,
          "vurl": mVideo.getElementsByTagName('source').length ? mVideo.getElementsByTagName('source')[0].getAttribute('src') : mVideo.getAttribute('src'),
          "pk": _key + 'v' + index
        };
      };
      //监听播放开始
      mVideo.addEventListener('play', function () {
        if (!videoTimer[mName]) {
          videoTimer[mName] = setInterval(function () {
            videoObj = {
              "cid": catalogsId,
              "ctime": videoObj.ctime || getCurrTime(),
              "fromUrl": referrer,
              "nid": businessId,
              "url": currentUrl,
              "playTime": videoObj ? videoObj.playTime + 1 : 1,
              "totalTime": mVideo.duration,
              "vurl": mVideo.getElementsByTagName('source').length ? mVideo.getElementsByTagName('source')[0].getAttribute('src') : mVideo.getAttribute('src'),
              "pk": _key + 'v' + index
            };
            var _video_point = Config.$local.get('VIDEO_POINT') || {};
            _video_point[_nowTime + 'v' + index] = videoObj;
            Config.$local.set('VIDEO_POINT', _video_point);
          }, 1000);
        }
      });

      //监听播放结束
      mVideo.addEventListener('pause', function () {
        if (videoTimer[mName]) {
          clearInterval(videoTimer[mName]);
          videoTimer[mName] = null;
        }
      });

      //监听播放结束
      mVideo.addEventListener('ended', function () {
        console.log('ended');
        if (videoTimer[mName]) {
          clearInterval(videoTimer[mName]);
          videoTimer[mName] = null;
        }
        index = ++videoNum;
        videoObj.ctime = null;
        videoObj.playTime = 0;
      });

      //使用事件监听方式捕捉事件， 此事件可作为实时监测video 播放状态
      mVideo.addEventListener("timeupdate", function () {}, false);
    }
    _private.init();
  };

  // 1、获取浏览器指纹
  Fingerprint2.get({}, function (components) {
    var values = components.map(function (component) {
      return component.value;
    });
    var murmur = Fingerprint2.x64hash128(values.join(""), 31); // 参数：浏览器指纹
    new videoPointController(murmur);
  });
})();