!function (window) {

    if (!window.ciicDomReady) {
        // Dom ready
        window.ciicDomReady = function (func) {
            var done = false, action_once = function () { if (done) { return; } done = true; func(); };
            if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', action_once, false);
                document.addEventListener('load', action_once, false);
                return;
            }
            (function (action_once) {
                (function testReady() { try { window.document.documentElement.doScroll('left'); } catch (error) { setTimeout(testReady, 1); return; } action_once(); })();
                window.document.onreadystatechange = function () { if (/complete/i.test(window.document.readyState)) { window.document.onreadystatechange = null; action_once(); } }
            })(action_once);
        };
    }

    var init = function () {
        // Not support MediaSource
        // if (!('MediaSource' in window)) return;

        var is_mobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase()),
            supports_video = function () { var bool = false, elem = document.createElement('video'); try { bool = !!elem.canPlayType; if (bool) { bool = new Boolean(bool); } } catch (e) { } return bool; },
            url_player_style = 'http://www.china.com.cn/player/player-1.1.4.min.css',
            url_player_script = 'http://www.china.com.cn/player/player-1.1.4.min.js',
            el_head = document.getElementsByTagName('head')[0],
            el_body = document.getElementsByTagName('body')[0],
            el_player = document.getElementById('videoarea'),
            player_width = window.parseInt(el_player.style.width),
            player_height = window.parseInt(el_player.style.height),
            style_ciic_player = document.createElement('link'),
            script_ciic_player = document.createElement('script'),
            el_source = document.getElementById('videofile'),
            video_source;

        if (!el_source) {
            el_player.style.display = 'none';
            return;
        }

        if (!supports_video()) {
            el_player.style.background = '#21252e url(http://www.china.com.cn/player/fail.jpg) no-repeat 50%';
            el_player.style.color = '#fff';
            el_player.innerHTML = '<p>由于存在安全问题Flash插件已经停止使用！</p><p>请使用新版本的Chrome、Firefox、Safari或者Edge观看视频.</p><p>For the sake of security problems, Flash plugin is not supported!</p><p>Please use the latest Chrome, Firefox, Safari or Edge to play the video.</p>';
            return;
        }

        video_source = el_source.getAttribute('src').replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        video_poster = el_source.getAttribute('poster');

        el_player.style.display = 'none';
        style_ciic_player.rel = 'stylesheet';
        style_ciic_player.href = url_player_style;
        script_ciic_player.src = url_player_script;

        el_head.appendChild(style_ciic_player);
        el_body.appendChild(script_ciic_player);

        script_ciic_player.onload = function () {
            var CiicPlayer = window.Ciic.CiicPlayer,
                options = {}, ciic_player;

            options.width = player_width;
            options.height = player_height;
            options.fluid = is_mobile;
            if (!!video_poster) {
                options.poster = video_poster.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
            }
            ciic_player = new CiicPlayer(el_player, options);

            ciic_player.player.on('error', function (err) {
                el_player.style.background = '#21252e url(http://www.china.com.cn/player/fail.jpg) no-repeat 50%';
            });

            ciic_player.load([video_source]);

            window.Ciic.ciic_player = ciic_player;
        };
    }, init_wza = function () {
        // Barrier-free transformation
        var wza = document.getElementById('ciic_wza'),
            is_ccc = !!location.hostname.match(/(china\.com\.cn)/i),
            service_url = 'http://images.china.cn/images1/resource/wza_20220119/aria.js?appid=3b3a93f34c302cac49542f0667879058',
            service_script = document.createElement('script');

        if (!wza && is_ccc) {
            service_script.defer = true;
            service_script.async = true;
            service_script.type = 'text/javascript';
            service_script.src = service_url;

            wza = document.createElement('div');
            wza.id = 'ciic_wza';
            wza.style = 'position:fixed;right:0;top:50%;transform:translate(0,-50%);width:30px;background:#333;color:#fff;padding:10px;font:20px/30px sans-serif;text-align:center;';
            wza.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="wheelchair" class="svg-inline--fa fa-wheelchair fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M496.101 385.669l14.227 28.663c3.929 7.915.697 17.516-7.218 21.445l-65.465 32.886c-16.049 7.967-35.556 1.194-43.189-15.055L331.679 320H192c-15.925 0-29.426-11.71-31.679-27.475C126.433 55.308 128.38 70.044 128 64c0-36.358 30.318-65.635 67.052-63.929 33.271 1.545 60.048 28.905 60.925 62.201.868 32.933-23.152 60.423-54.608 65.039l4.67 32.69H336c8.837 0 16 7.163 16 16v32c0 8.837-7.163 16-16 16H215.182l4.572 32H352a32 32 0 0 1 28.962 18.392L438.477 396.8l36.178-18.349c7.915-3.929 17.517-.697 21.446 7.218zM311.358 352h-24.506c-7.788 54.204-54.528 96-110.852 96-61.757 0-112-50.243-112-112 0-41.505 22.694-77.809 56.324-97.156-3.712-25.965-6.844-47.86-9.488-66.333C45.956 198.464 0 261.963 0 336c0 97.047 78.953 176 176 176 71.87 0 133.806-43.308 161.11-105.192L311.358 352z"></path></svg><a href="javascript:;" style="color:#fff; text-decoration:none; font:20px/30px sans-serif;" target="_self" id="cniil_wza" onclidk="aria.start()">网站无障碍</a>';
            document.body.appendChild(wza);

            document.body.appendChild(service_script);
        }
    };

    window.ciicDomReady(function () {
        init_wza();
        init();
    });
}(window);

function getElementLeft(element){
  var parent= element.parentNode;
  parent.style.position = 'relative';
  return element.offsetLeft;
}

setTimeout(function () {
  // 处理新图说
  var picture = document.querySelectorAll('.picture-illustrating');
  var originalTitleElement = '';
  for (var i = 0; i < picture.length; i++) {
    var originalTitle = picture[i].getAttribute("data-original-title");
    if (originalTitle) {
      picture[i].style.marginBottom = '';
      originalTitleElement = document.createElement("p");
      originalTitleElement.className = 'picture-illustrating-content';
      originalTitleElement.style.width = picture[i].width + 'px';
      var eleParent = picture[i].parentNode;
      if (eleParent.tagName != 'P') eleParent = eleParent.parentNode;
      if (eleParent.querySelectorAll('.picture-illustrating-content').length) break;
      if (eleParent.style.textAlign == 'center' || picture[i].style.textAlign == 'center') {
        originalTitleElement.style.margin = '0 auto';
      } else {
        eleParent.style.position = 'relative';
        originalTitleElement.style.marginLeft = eleParent.offsetLeft + 'px';
      }
      originalTitleElement.innerHTML = originalTitle;
      eleParent.appendChild(originalTitleElement);
    }
  }
}, 300);
