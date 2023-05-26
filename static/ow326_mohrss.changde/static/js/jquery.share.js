(function ($) {
    $.fn.share = function ($options) {
        var $head = $(document.head);

        var $defaults = {
            url: location.href,
            site_url: location.origin,
            source: $head.find('[name=site], [name=Site]').attr('content') || document.title,
            title: $head.find('[name=title], [name=Title]').attr('content') || document.title,
            description: $head.find('[name=description], [name=Description]').attr('content') || '',
            image: $('img:first').prop('src') || '',

            imageSelector: undefined,

            weiboKey: '',

            wechatQrcodeDialogId: 'share_weixin_qrcode_dialog_qr', //微信二维码弹窗的ID
            wechatQrcodeTitle: '微信扫一扫：分享',
            wechatQrcodeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
            wechatQrcodeSize: 200,

            mobileSites: [],
            sites: ['weibo', 'qq', 'wechat', 'tencent', 'douban', 'qzone'],
            disabled: [],
            initialized: false
        };

        var $globals = $.extend({}, $defaults, $options);

        var $templates = {
            qzone:
                'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}&pics={{IMAGE}}',
            qq:
                'http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&pics={{IMAGE}}',
            tencent: 'http://share.v.t.qq.com/index.php?c=share&a=index&title={{TITLE}}&url={{URL}}&pic={{IMAGE}}',
            weibo:
                'https://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}',
            //weibo: 'https://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&appkey={{WEIBOKEY}}&searchPic=false', //如需要去掉微博分享图片的请把微博链接替换成这个
            wechat: 'javascript:;',
            douban:
                'http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11'
        };

        var $ariaLabels = {
            qzone: "QQ空间",
            qq: "QQ",
            tencent: "腾讯微博",
            weibo: "微博",
            wechat: "微信",
            douban: "豆瓣"
        };

        this.each(function () {
            if ($(this).data('initialized')) {
                return true;
            }

            var $data = $.extend({}, $globals, $(this).data());
            if ($data.imageSelector) {
                $data.image = $($data.imageSelector).map(function () {
                    return $(this).prop('src');
                }).get().join('||');
            }
            var $container = $(this).addClass('share-component social-share');

            createIcons($container, $data);
            createWechat($container, $data);

            $(this).data('initialized', true);
        });

        function createIcons($container, $data) {
            var $sites = getSites($data);

            $data.mode == 'prepend' ? $sites.reverse() : $sites;

            if (!$sites.length) {
                return;
            }

            $.each($sites,
                function (i, $name) {
                    var $url = makeUrl($name, $data);
                    var $link = $data.initialized
                        ? $container.find('.icon-' + $name)
                        : $('<a href="javascript:;" class="social-share-icon icon-' + $name + '"></a>');

                    if (!$link.length) {
                        return true;
                    }
                    $link.prop('aria-label', "分享到 " + $ariaLabels[$name]);

                    $link.prop('href', $url);

                    if ($name === 'wechat') {
                        $link.prop('tabindex', -1);
                    } else {
                        $link.prop('target', '_blank');
                    }

                    if (!$data.initialized) {
                        $data.mode == 'prepend' ? $container.prepend($link) : $container.append($link);
                    }
                });
        }

        function createWechat($container, $data) {
            var $wechat = $container.find('a.icon-wechat');

            if (!$wechat.length) {
                return;
            }

            $("body").append('<div class="wechat-qrcode share-wechat-qrcode" id="' +
                $data.wechatQrcodeDialogId +
                '"><div class="close">x</div><h4>' +
                $data.wechatQrcodeTitle +
                '</h4><div class="qrcode" data-powertype="qrcode" data-size="' +
                $data.wechatQrcodeSize +
                '"></div><div class="help">' +
                $data.wechatQrcodeHelper +
                '</div></div>');

            //加入微信分享点击事件
            $('a.icon-wechat').click(function () {
                $("#" + $data.wechatQrcodeDialogId).show();
            });
            $("#" + $data.wechatQrcodeDialogId + " .close").click(function () {
                $("#" + $data.wechatQrcodeDialogId).hide();
            });

            // if ($wechat.offset().top < 100) {
            //     $wechat.find('.wechat-qrcode').addClass('bottom');
            // }
        }

        function getSites($data) {
            if ($data['mobileSites'].length === 0 && $data['sites'].length) {
                $data['mobileSites'] = $data['sites'];
            };

            var $sites =
                (isMobileScreen() ? $data['mobileSites'] : ($data['sites'].length ? $data['sites'] : [])).slice(0);
            var $disabled = $data['disabled'];

            if (typeof $sites == 'string') {
                $sites = $sites.split(/\s*,\s*/);
            }
            if (typeof $disabled == 'string') {
                $disabled = $disabled.split(/\s*,\s*/);
            }

            if (runningInWeChat()) {
                $disabled.push('wechat');
            }
            // Remove elements
            $disabled.length &&
                $.each($disabled,
                    function (i, el) {
                        var removeItemIndex = $.inArray(el, $sites);
                        if (removeItemIndex !== -1) {
                            $sites.splice(removeItemIndex, 1);
                        }
                    });

            return $sites;
        }

        function makeUrl($name, $data) {
            var $template = $templates[$name];
            $data['summary'] = $data['description'];

            for (var $key in $data) {
                if ($data.hasOwnProperty($key)) {
                    var $camelCaseKey = $name +
                        $key.replace(/^[a-z]/,
                            function ($str) {
                                return $str.toUpperCase();
                            });

                    var $value =
                        encodeURIComponent($data[$camelCaseKey] === undefined ? $data[$key] : $data[$camelCaseKey]);
                    $template = $template.replace(new RegExp('{{' + $key.toUpperCase() + '}}', 'g'), $value);
                }
            }

            return $template;
        }

        function runningInWeChat() {
            return /MicroMessenger/i.test(navigator.userAgent);
        }

        function isMobileScreen() {
            return $(window).width() <= 768;
        }
    };

    // Domready after initialization
    $(function () {
        $('.share-component,.social-share').share();
    });

})(jQuery);