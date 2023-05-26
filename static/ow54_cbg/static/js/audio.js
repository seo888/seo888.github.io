/*
 * @Author: Jason
 * @Date:   2019-12-16 14:27:52
 * @Last Modified by:   Jason
 * @Last Modified time: 2020-01-03 17:16:25
 */

(function(audiojs, audiojsInstance, container) {
    var path = (function() {
        var re = new RegExp("audio(.min)?.js.*"),
            scripts = document.getElementsByTagName("script");
        for (var i = 0, ii = scripts.length; i < ii; i++) {
            var path = scripts[i].getAttribute("src");
            if (re.test(path)) {
                var f = path.split("/");
                f.pop();
                return f.join("/") + "/"
            }
        }
        return ""
    })();
    container[audiojs] = {
        instanceCount: 0,
        instances: {},
        flashSource: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="$1" width="1" height="1" name="$1" style="position:absolute;left:-1px"><param name="movie" value="$2?playerInstance=' + audiojs + '.instances[\'$1\']&datetime=$3"><param name="allowscriptaccess" value="always"><embed name="$1" src="$2?playerInstance=' + audiojs + '.instances[\'$1\']&datetime=$3" width="1" height="1" allowscriptaccess="always"></object>',
        settings: {
            autoplay: false,
            loop: false,
            preload: true,
            imageLocation: path + "player-graphics.gif",
            retinaImageLocation: path + "player-graphics@2x.gif",
            swfLocation: path + "audiojs.swf",
            useFlash: (function() {
                var a = document.createElement("audio");
                return !(a.canPlayType && a.canPlayType("audio/mpeg;").replace(/no/, ""))
            })(),
            hasFlash: (function() {
                if (navigator.plugins && navigator.plugins.length && navigator.plugins["Shockwave Flash"]) {
                    return true
                } else {
                    if (navigator.mimeTypes && navigator.mimeTypes.length) {
                        var mimeType = navigator.mimeTypes["application/x-shockwave-flash"];
                        return mimeType && mimeType.enabledPlugin
                    } else {
                        try {
                            var ax = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                            return true
                        } catch (e) {}
                    }
                }
                return false
            })(),
            createPlayer: {
                markup: '<div class="play-pause"><p class="play"></p><p class="pause"></p><p class="error"></p></div>' +
                        '<div class="time"><em class="played">00:00</em></div>' +
                        '<div class="scrubber"><div class="progress"></div><div class="loaded"></div></div>' +
                        '<div class="time time_end"><strong class="duration">00:00</strong></div>' +
                        '<div class="error-message"></div>',
                playPauseClass: "play-pause",
                scrubberClass: "scrubber",
                progressClass: "progress",
                loaderClass: "loaded",
                timeClass: "time",
                durationClass: "duration",
                playedClass: "played",
                errorMessageClass: "error-message",
                playingClass: "playing",
                errorClass: "error"
            },
            css: '.audiojs audio{position:absolute;left:-1px}' +
                '.play-pause{-webkit-tap-highlight-color:rgba(255,255,255,0)}' +
                '.audiojs p{display:none;width:50px;height:50px;margin:0;text-indent:-999rem;border-radius:50%;background:url("' + path + 'audio_bg.png") no-repeat #e64a46;background-size:100% auto}' +
                '.audiojs .play{display:block;background-position:0 0;}' +
                '.audiojs .progress{position:absolute;top:0;left:0;z-index:1;width:0;height:100%;max-width:100%;background-color:#ea0000}' +
                '.audiojs .loaded{position:absolute;top:0;left:0;width:0;height:100%;background-color:#8b8b8b}' +
                '.audiojs .title{top:8px;right:56px;left:64px;z-index:2;height:40px;line-height:40px;overflow:hidden;font-size:14px;text-align:left}' +
                '.audiojs .time em{font-style:normal;}' +
                '.audiojs .time strong{padding-left:2px;font-weight:normal}' +
                '.audiojs .error-message{display:none;float:left;width:500px;height:38px;line-height:38px;margin:0 0 0 45px;overflow:hidden;font-size:14px;white-space:nowrap;-webkit-text-overflow:ellipsis;text-overflow:ellipsis;color:#666;-o-text-overflow:ellipsis;-icab-text-overflow:ellipsis;-khtml-text-overflow:ellipsis;-moz-text-overflow:ellipsis}' +
                '.audiojs .error-message a{padding-bottom:1px;white-space:wrap;text-decoration:none;color:#eee;border-bottom:1px solid #999}' +
                '.audiojs .loading{background:#e64a46 url("' + path + 'audio_bg.png") no-repeat;background-position:0 70px;background-size:50px auto;-webkit-animation:rotate 1s infinite linear;animation:rotate 1s infinite linear}' +
                '.audiojs .error{background-position:0 -100px;}' +
                '.audiojs .pause{background-position:0 -50px;}' +
                '.jindu{position:absolute;top:-6px;right:-15px;width:15px;height:15px;background-color:#ea0000;border-radius:10px}' +
                '.playing .error,.playing .loading,.playing .play{display:none}' +
                '.playing .pause{display:block}' +
                '.loading .error,.loading .pause,.loading .play{display:none}' +
                '.loading .loading{display:block}' +
                '.error .loading,.error .pause,.error .play,.error .scrubber,.error .time{display:none}' +
                '.error .error{display:block}' +
                '.error .play-pause p{cursor:auto}' +
                '.error .error-message{display:block}' +
                '.audiojs{position:relative;height:50px;overflow:hidden}' +
                '.audiojs>div{position:absolute}' +
                '.play-pause{top:0;left:0;z-index:2;width:50px;height:50px;cursor:pointer}' +
                '.audioplayer-stopped .audioplayer-playpause{background-position:6px 3px}' +
                '.audioplayer-playing .audioplayer-playpause{background-position:6px -160px}' +
                '.time{top:0;left:66px;z-index:2;height:100%;line-height:50px;font-size:16px;text-align:center}' +
                '.time_end{right:5px;left:auto}' +
                '.audioplayer-time-current{left:64px}' +
                '.audioplayer-time-duration{right:5px;border-right:1px solid #555;border-right-color:rgba(255,255,255,.1)}' +
                '.audiojs .scrubber{top:50%;right:65px;left:125px;z-index:1;height:4px;margin-top:-2px;overflow:hidden;cursor:pointer;background-color:#d2d2d2}' +
                '.audioplayer-novolume .audioplayer-bar{right:43.75px}' +
                '.audioplayer-bar div{position:absolute;top:0;left:0;width:0;height:100%}' +
                '.audioplayer-bar-loaded{z-index:1;background-color:#d2d2d2}' +
                '.audioplayer-bar-played{z-index:2;background-color:#ea0000}' +
                '@-webkit-keyframes rotate{0%{-webkit-transform:rotate(0)}100%{-webkit-transform:rotate(360deg)}}' +
                '@keyframes rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}',
            trackEnded: function(e) {},
            flashError: function() {
                var player = this.settings.createPlayer,
                    errorMessage = getByClass(player.errorMessageClass, this.wrapper),
                    html = 'Missing <a href="//get.adobe.com/flashplayer/">flash player</a> plugin.';
                if (this.mp3) {
                    html += ' <a href="' + this.mp3 + '">Download audio file</a>.'
                }
                container[audiojs].helpers.removeClass(this.wrapper, player.loadingClass);
                container[audiojs].helpers.addClass(this.wrapper, player.errorClass);
                errorMessage.innerHTML = html
            },
            loadError: function(e) {
                var player = this.settings.createPlayer,
                    errorMessage = getByClass(player.errorMessageClass, this.wrapper);
                container[audiojs].helpers.removeClass(this.wrapper, player.loadingClass);
                container[audiojs].helpers.addClass(this.wrapper, player.errorClass);
                errorMessage.innerHTML = 'Error loading: "' + this.mp3 + '"'
            },
            init: function() {
                var player = this.settings.createPlayer;
                container[audiojs].helpers.addClass(this.wrapper, player.loadingClass)
            },
            loadStarted: function() {
                var player = this.settings.createPlayer,
                    duration = getByClass(player.durationClass, this.wrapper),
                    m = Math.floor(this.duration / 60),
                    s = Math.floor(this.duration % 60);
                container[audiojs].helpers.removeClass(this.wrapper, player.loadingClass);
                duration.innerHTML = ((m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s)
            },
            loadProgress: function(percent) {
                var player = this.settings.createPlayer,
                    loaded = getByClass(player.loaderClass, this.wrapper);
                loaded.style.width = Math.round(100 * percent) + "%"
            },
            playPause: function() {
                if (this.playing) {
                    this.settings.play()
                } else {
                    this.settings.pause()
                }
            },
            play: function() {
                var player = this.settings.createPlayer;
                container[audiojs].helpers.removeClass(this.wrapper, player.errorClass);
                container[audiojs].helpers.addClass(this.wrapper, player.playingClass)
            },
            pause: function() {
                var player = this.settings.createPlayer;
                container[audiojs].helpers.removeClass(this.wrapper, player.playingClass)
            },
            updatePlayhead: function(percent) {
                var player = this.settings.createPlayer,
                    progress = getByClass(player.progressClass, this.wrapper);
                progress.style.width = Math.round(100 * percent) + "%";
                var played = getByClass(player.playedClass, this.wrapper),
                    p = this.duration * percent,
                    m = Math.floor(p / 60),
                    s = Math.floor(p % 60);
                played.innerHTML = ((m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s)
            }
        },
        create: function(element, options) {
            var options = options || {};
            if (element.length) {
                return this.createAll(options, element)
            } else {
                return this.newInstance(element, options)
            }
        },
        createAll: function(options, elements) {
            var audioElements = elements || document.getElementsByTagName("audio"),
                instances = [];
            options = options || {};
            for (var i = 0, ii = audioElements.length; i < ii; i++) {
                if ((" " + audioElements[i].parentNode.className + " ").replace(/[\n\t]/g, " ").indexOf(" audiojs ") > -1) {
                    continue
                }
                instances.push(this.newInstance(audioElements[i], options))
            }
            return instances
        },
        newInstance: function(element, options) {
            var element = element,
                s = this.helpers.clone(this.settings),
                id = "audiojs" + this.instanceCount,
                wrapperId = "audiojs_wrapper" + this.instanceCount,
                instanceCount = this.instanceCount++;
            if (element.getAttribute("autoplay") != null) {
                s.autoplay = true
            }
            if (element.getAttribute("loop") != null) {
                s.loop = true
            }
            if (element.getAttribute("preload") == "none") {
                s.preload = false
            }
            if (options) {
                this.helpers.merge(s, options)
            }
            if (s.createPlayer.markup) {
                element = this.createPlayer(element, s.createPlayer, wrapperId)
            } else {
                element.parentNode.setAttribute("id", wrapperId)
            }
            var audio = new container[audiojsInstance](element, s);
            if (s.css) {
                this.helpers.injectCss(audio, s.css)
            }
            if (s.useFlash && s.hasFlash) {
                this.injectFlash(audio, id);
                this.attachFlashEvents(audio.wrapper, audio)
            } else {
                if (s.useFlash && !s.hasFlash) {
                    s.flashError.apply(audio)
                }
            }
            if (!s.useFlash || (s.useFlash && s.hasFlash)) {
                this.attachEvents(audio.wrapper, audio)
            }
            this.instances[id] = audio;
            return audio
        },
        createPlayer: function(element, player, id) {
            var wrapper = document.createElement("div"),
                newElement = element.cloneNode(true);
            wrapper.setAttribute("class", "audiojs");
            wrapper.setAttribute("className", "audiojs");
            wrapper.setAttribute("id", id);
            if (newElement.outerHTML && !document.createElement("audio").canPlayType) {
                newElement = this.helpers.cloneHtml5Node(element);
                wrapper.innerHTML = player.markup;
                wrapper.appendChild(newElement);
                element.outerHTML = wrapper.outerHTML;
                wrapper = document.getElementById(id)
            } else {
                wrapper.appendChild(newElement);
                wrapper.innerHTML = wrapper.innerHTML + player.markup;
                element.parentNode.replaceChild(wrapper, element)
            }
            return wrapper.getElementsByTagName("audio")[0]
        },
        attachEvents: function(wrapper, audio) {
            if (!audio.settings.createPlayer) {
                return
            }
            var player = audio.settings.createPlayer,
                playPause = getByClass(player.playPauseClass, wrapper),
                scrubber = getByClass(player.scrubberClass, wrapper),
                leftPos = function(elem) {
                    var curleft = 0;
                    if (elem.offsetParent) {
                        do {
                            curleft += elem.offsetLeft
                        } while (elem = elem.offsetParent)
                    }
                    return curleft
                };
            container[audiojs].events.addListener(playPause, "click", function(e) {
                audio.playPause.apply(audio)
            });
            container[audiojs].events.addListener(scrubber, "click", function(e) {
                var relativeLeft = e.clientX - leftPos(this);
                audio.skipTo(relativeLeft / scrubber.offsetWidth)
            });
            if (audio.settings.useFlash) {
                return
            }
            container[audiojs].events.trackLoadProgress(audio);
            container[audiojs].events.addListener(audio.element, "timeupdate", function(e) {
                audio.updatePlayhead.apply(audio)
            });
            container[audiojs].events.addListener(audio.element, "ended", function(e) {
                audio.trackEnded.apply(audio)
            });
            container[audiojs].events.addListener(audio.source, "error", function(e) {
                clearInterval(audio.readyTimer);
                clearInterval(audio.loadTimer);
                audio.settings.loadError.apply(audio)
            })
        },
        attachFlashEvents: function(element, audio) {
            audio["swfReady"] = false;
            audio["load"] = function(mp3) {
                audio.mp3 = mp3;
                if (audio.swfReady) {
                    audio.element.load(mp3)
                }
            };
            audio["loadProgress"] = function(percent, duration) {
                audio.loadedPercent = percent;
                audio.duration = duration;
                audio.settings.loadStarted.apply(audio);
                audio.settings.loadProgress.apply(audio, [percent])
            };
            audio["skipTo"] = function(percent) {
                if (percent > audio.loadedPercent) {
                    return
                }
                audio.updatePlayhead.call(audio, [percent]);
                audio.element.skipTo(percent)
            };
            audio["updatePlayhead"] = function(percent) {
                audio.settings.updatePlayhead.apply(audio, [percent])
            };
            audio["play"] = function() {
                if (!audio.settings.preload) {
                    audio.settings.preload = true;
                    audio.element.init(audio.mp3)
                }
                audio.playing = true;
                audio.element.pplay();
                audio.settings.play.apply(audio)
            };
            audio["pause"] = function() {
                audio.playing = false;
                audio.element.ppause();
                audio.settings.pause.apply(audio)
            };
            audio["setVolume"] = function(v) {
                audio.element.setVolume(v)
            };
            audio["loadStarted"] = function() {
                audio.swfReady = true;
                if (audio.settings.preload) {
                    audio.element.init(audio.mp3)
                }
                if (audio.settings.autoplay) {
                    audio.play.apply(audio)
                }
            }
        },
        injectFlash: function(audio, id) {
            var flashSource = this.flashSource.replace(/\$1/g, id);
            flashSource = flashSource.replace(/\$2/g, audio.settings.swfLocation);
            flashSource = flashSource.replace(/\$3/g, (+new Date + Math.random()));
            var html = audio.wrapper.innerHTML,
                div = document.createElement("div");
            div.innerHTML = flashSource + html;
            audio.wrapper.innerHTML = div.innerHTML;
            audio.element = this.helpers.getSwf(id)
        },
        helpers: {
            merge: function(obj1, obj2) {
                for (attr in obj2) {
                    if (obj1.hasOwnProperty(attr) || obj2.hasOwnProperty(attr)) {
                        obj1[attr] = obj2[attr]
                    }
                }
            },
            clone: function(obj) {
                if (obj == null || typeof(obj) !== "object") {
                    return obj
                }
                var temp = new obj.constructor();
                for (var key in obj) {
                    temp[key] = arguments.callee(obj[key])
                }
                return temp
            },
            addClass: function(element, className) {
                var re = new RegExp("(\\s|^)" + className + "(\\s|$)");
                if (re.test(element.className)) {
                    return
                }
                element.className += " " + className
            },
            removeClass: function(element, className) {
                var re = new RegExp("(\\s|^)" + className + "(\\s|$)");
                element.className = element.className.replace(re, " ")
            },
            injectCss: function(audio, string) {
                var prepend = "",
                    styles = document.getElementsByTagName("style"),
                    css = string.replace(/\$1/g, audio.settings.imageLocation);
                css = css.replace(/\$2/g, audio.settings.retinaImageLocation);
                for (var i = 0, ii = styles.length; i < ii; i++) {
                    var title = styles[i].getAttribute("title");
                    if (title && ~title.indexOf("audiojs")) {
                        style = styles[i];
                        if (style.innerHTML === css) {
                            return
                        }
                        prepend = style.innerHTML;
                        break
                    }
                }
                var head = document.getElementsByTagName("head")[0],
                    firstchild = head.firstChild,
                    style = document.createElement("style");
                if (!head) {
                    return
                }
                style.setAttribute("type", "text/css");
                style.setAttribute("title", "audiojs");
                if (style.styleSheet) {
                    style.styleSheet.cssText = prepend + css
                } else {
                    style.appendChild(document.createTextNode(prepend + css))
                }
                if (firstchild) {
                    head.insertBefore(style, firstchild)
                } else {
                    head.appendChild(style)
                }
            },
            cloneHtml5Node: function(audioTag) {
                var fragment = document.createDocumentFragment(),
                    doc = fragment.createElement ? fragment : document;
                doc.createElement("audio");
                var div = doc.createElement("div");
                fragment.appendChild(div);
                div.innerHTML = audioTag.outerHTML;
                return div.firstChild
            },
            getSwf: function(name) {
                var swf = document[name] || window[name];
                return swf.length > 1 ? swf[swf.length - 1] : swf
            }
        },
        events: {
            memoryLeaking: false,
            listeners: [],
            addListener: function(element, eventName, func) {
                if (element.addEventListener) {
                    element.addEventListener(eventName, func, false)
                } else {
                    if (element.attachEvent) {
                        this.listeners.push(element);
                        if (!this.memoryLeaking) {
                            window.attachEvent("onunload", function() {
                                if (this.listeners) {
                                    for (var i = 0, ii = this.listeners.length; i < ii; i++) {
                                        container[audiojs].events.purge(this.listeners[i])
                                    }
                                }
                            });
                            this.memoryLeaking = true
                        }
                        element.attachEvent("on" + eventName, function() {
                            func.call(element, window.event)
                        })
                    }
                }
            },
            trackLoadProgress: function(audio) {
                if (!audio.settings.preload) {
                    return
                }
                var readyTimer, loadTimer, audio = audio,
                    ios = (/(ipod|iphone|ipad)/i).test(navigator.userAgent);
                readyTimer = setInterval(function() {
                    if (audio.element.readyState > -1) {
                        if (!ios) {
                            audio.init.apply(audio)
                        }
                    }
                    if (audio.element.readyState > 1) {
                        if (audio.settings.autoplay) {
                            audio.play.apply(audio)
                        }
                        clearInterval(readyTimer);
                        loadTimer = setInterval(function() {
                            audio.loadProgress.apply(audio);
                            if (audio.loadedPercent >= 1) {
                                clearInterval(loadTimer)
                            }
                        }, 200)
                    }
                }, 200);
                audio.readyTimer = readyTimer;
                audio.loadTimer = loadTimer
            },
            purge: function(d) {
                var a = d.attributes,
                    i;
                if (a) {
                    for (i = 0; i < a.length; i += 1) {
                        if (typeof d[a[i].name] === "function") {
                            d[a[i].name] = null
                        }
                    }
                }
                a = d.childNodes;
                if (a) {
                    for (i = 0; i < a.length; i += 1) {
                        purge(d.childNodes[i])
                    }
                }
            },
            ready: (function() {
                return function(fn) {
                    var win = window,
                        done = false,
                        top = true,
                        doc = win.document,
                        root = doc.documentElement,
                        add = doc.addEventListener ? "addEventListener" : "attachEvent",
                        rem = doc.addEventListener ? "removeEventListener" : "detachEvent",
                        pre = doc.addEventListener ? "" : "on",
                        init = function(e) {
                            if (e.type == "readystatechange" && doc.readyState != "complete") {
                                return
                            }(e.type == "load" ? win : doc)[rem](pre + e.type, init, false);
                            if (!done && (done = true)) {
                                fn.call(win, e.type || e)
                            }
                        },
                        poll = function() {
                            try {
                                root.doScroll("left")
                            } catch (e) {
                                setTimeout(poll, 50);
                                return
                            }
                            init("poll")
                        };
                    if (doc.readyState == "complete") {
                        fn.call(win, "lazy")
                    } else {
                        if (doc.createEventObject && root.doScroll) {
                            try {
                                top = !win.frameElement
                            } catch (e) {}
                            if (top) {
                                poll()
                            }
                        }
                        doc[add](pre + "DOMContentLoaded", init, false);
                        doc[add](pre + "readystatechange", init, false);
                        win[add](pre + "load", init, false)
                    }
                }
            })()
        }
    };
    container[audiojsInstance] = function(element, settings) {
        this.element = element;
        this.wrapper = element.parentNode;
        this.source = element.getElementsByTagName("source")[0] || element;
        this.mp3 = (function(element) {
            var source = element.getElementsByTagName("source")[0];
            return element.getAttribute("src") || (source ? source.getAttribute("src") : null)
        })(element);
        this.settings = settings;
        this.loadStartedCalled = false;
        this.loadedPercent = 0;
        this.duration = 1;
        this.playing = false
    };
    container[audiojsInstance].prototype = {
        updatePlayhead: function() {
            var percent = this.element.currentTime / this.duration;
            this.settings.updatePlayhead.apply(this, [percent])
        },
        skipTo: function(percent) {
            if (percent > this.loadedPercent) {
                return
            }
            this.element.currentTime = this.duration * percent;
            this.updatePlayhead()
        },
        load: function(mp3) {
            this.loadStartedCalled = false;
            this.source.setAttribute("src", mp3);
            this.element.load();
            this.mp3 = mp3;
            container[audiojs].events.trackLoadProgress(this)
        },
        loadError: function() {
            this.settings.loadError.apply(this)
        },
        init: function() {
            this.settings.init.apply(this)
        },
        loadStarted: function() {
            if (!this.element.duration) {
                return false
            }
            this.duration = this.element.duration;
            this.updatePlayhead();
            this.settings.loadStarted.apply(this)
        },
        loadProgress: function() {
            if (this.element.buffered != null && this.element.buffered.length) {
                if (!this.loadStartedCalled) {
                    this.loadStartedCalled = this.loadStarted()
                }
                var durationLoaded = this.element.buffered.end(this.element.buffered.length - 1);
                this.loadedPercent = durationLoaded / this.duration;
                this.settings.loadProgress.apply(this, [this.loadedPercent])
            }
        },
        playPause: function() {
            if (this.playing) {
                this.pause()
            } else {
                this.play()
            }
        },
        play: function() {
            var ios = (/(ipod|iphone|ipad)/i).test(navigator.userAgent);
            if (ios && this.element.readyState == 0) {
                this.init.apply(this)
            }
            if (!this.settings.preload) {
                this.settings.preload = true;
                this.element.setAttribute("preload", "auto");
                container[audiojs].events.trackLoadProgress(this)
            }
            this.playing = true;
            this.element.play();
            this.settings.play.apply(this)
        },
        pause: function() {
            this.playing = false;
            this.element.pause();
            this.settings.pause.apply(this)
        },
        setVolume: function(v) {
            this.element.volume = v
        },
        trackEnded: function(e) {
            this.skipTo.apply(this, [0]);
            if (!this.settings.loop) {
                this.pause.apply(this)
            }
            this.settings.trackEnded.apply(this)
        }
    };
    var getByClass = function(searchClass, node) {
        var matches = [];
        node = node || document;
        if (node.getElementsByClassName) {
            matches = node.getElementsByClassName(searchClass)
        } else {
            var i, l, els = node.getElementsByTagName("*"),
                pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
            for (i = 0, l = els.length; i < l; i++) {
                if (pattern.test(els[i].className)) {
                    matches.push(els[i])
                }
            }
        }
        return matches.length > 1 ? matches : matches[0]
    }
})("audiojs", "audiojsInstance", this);