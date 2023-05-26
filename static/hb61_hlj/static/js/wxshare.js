/*΢�������������5�������
1���ͻ��˷��������ǿ�Ƭ��ʽ
2�����ں����·����ǿ�Ƭ��ʽ
3�����԰�ҳ�棬������Ͻ�΢�ŷ���ɨ���ά������ǿ�Ƭ��ʽ
4���ɰ�΢�ŷ���Ŀ�Ƭ���ӣ��ٴη����ǿ�Ƭ��ʽ
5���°�΢�ţ�8.0.15��֮��İ汾����ֱ�ӷ������ӣ��򿪺����ͳһ��ֻ����ʾΪ������ʽ��΢�Ÿİ����������

������������⣬��������������ͼƬ���������ӣ����ں����ƣ�nacos�����ã�;΢�Žӿ���debug;�Ƿ�ʹ�ò���wxshare�ӿ�
*/

function wxshare(share_title, share_desc, share_img, share_url, name,isDebug,isDevEnv) {
    var domainPrefix = isDevEnv?'dev-':'';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "//" + domainPrefix + "wxshare.chinanews.com.cn/jssdksign?name=" + name + "&url=" + encodeURIComponent(share_url));
    xmlHttp.send();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            if(isDevEnv){
                console.log("appId",data.data.appId);
            }
            //ͨ��config�ӿ�ע��Ȩ����֤����
            wx.config({
                debug: isDebug,
                appId: data.data.appId,
                timestamp: data.data.timestamp,
                nonceStr: data.data.nonceStr,
                signature: data.data.signature,
                jsApiList: [
                    'updateAppMessageShareData', //��������Ѽ�qq
                    'updateTimelineShareData', //��������Ȧ������QQ�ռ�
                    'onMenuShareWeibo', //������Ѷ΢��
                    'onMenuShareTimeline',//��������Ȧ������������
                    'onMenuShareAppMessage',//��������ѣ�����������
                    'onMenuShareQQ',//����QQ������������
                    'onMenuShareQZone',//����QQ�ռ䣨����������

                ]
            });

            //ͨ��ready�ӿڴ���ɹ���֤
            wx.ready(function () {
                //�жϵ�ǰ�ͻ��˰汾�Ƿ�֧��ָ��JS�ӿ�
                wx.checkJsApi({
                    //checkJsApi:���жϿͻ���֧��֧�����api����������Ȩ�޵�
                    jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareWeibo','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone'],//
                    success: function (res) {
                        //��������Ѽ�qq
                        if (res.checkResult.updateAppMessageShareData) {
                            if(isDevEnv){
                                 console.log("res.checkResult:",res.checkResult);
                                 console.log("res.checkResult.updateAppMessageShareData:",res.checkResult.updateAppMessageShareData);
                            }

                            wx.updateAppMessageShareData({
                                title: share_title, // �������
                                desc: share_desc, // ��������
                                link: share_url, // �������ӣ�������������·�������뵱ǰҳ���Ӧ�Ĺ��ں�JS��ȫ����һ��
                                imgUrl: share_img, // ����ͼ��
                                success: function () {
                                    console.log("����ɹ�");
                                }
                            });
                        }
                        //��������Ȧ������QQ�ռ�
                        if (res.checkResult.updateTimelineShareData) {
                            wx.updateTimelineShareData({
                                title: share_title, // �������
                                link: share_url, // �������ӣ�������������·�������뵱ǰҳ���Ӧ�Ĺ��ں�JS��ȫ����һ��
                                imgUrl: share_img, // ����ͼ��
                                success: function () {
                                    // console.log("����ɹ�");
                                }
                            })
                        }

                        //������Ѷ΢��
                        if (res.checkResult.onMenuShareWeibo) {
                            wx.onMenuShareWeibo({
                                title: share_title, // �������
                                desc: share_desc, // ��������
                                link: share_url, // ��������
                                imgUrl: share_img, // ����ͼ��
                                success: function () {
                                    // �û�ȷ�Ϸ����ִ�еĻص�����
                                },
                                cancel: function () {
                                    // �û�ȡ�������ִ�еĻص�����
                                }
                            });
                        }

                        /*//��ȡ����������Ȧ����ť���״̬���Զ���������ݽӿڣ�����������  !res.checkResult.updateTimelineShareData && 
                        if(res.checkResult.updateAppMessageShareData.onMenuShareTimeline){
                            wx.onMenuShareTimeline({
                                title: share_title, // �������
                                link: share_url, // �������ӣ�������������·�������뵱ǰҳ���Ӧ�Ĺ��ں�JS��ȫ����һ��
                                imgUrl: share_img, // ����ͼ��
                                success: function () {
                                    // �û�����˷����ִ�еĻص�����
                                }
                            });
                        }
                        //��ȡ����������ѡ���ť���״̬���Զ���������ݽӿڣ����������� !res.checkResult.updateAppMessageShareData && 
                        if(res.checkResult.updateAppMessageShareData.onMenuShareAppMessage){
                            wx.onMenuShareAppMessage({
                                title: share_title, // �������
                                desc: share_desc, // ��������
                                link: share_url, // �������ӣ�������������·�������뵱ǰҳ���Ӧ�Ĺ��ں�JS��ȫ����һ��
                                imgUrl: share_img, // ����ͼ��
                                type: 'link', // ��������,music��video��link������Ĭ��Ϊlink
                                dataUrl: '',// ���type��music��video����Ҫ�ṩ�������ӣ�Ĭ��Ϊ��
                                success: function () {
                                    // �û�����˷����ִ�еĻص�����
                                }
                            });
                        }
                        //��ȡ������QQ����ť���״̬���Զ���������ݽӿڣ�����������!res.checkResult.updateAppMessageShareData && 
                        if(res.checkResult.updateAppMessageShareData.onMenuShareQQ){
                            wx.onMenuShareQQ({
                                title: share_title, // �������
                                desc: share_desc, // ��������
                                link: share_url, // ��������
                                imgUrl: share_img,// ����ͼ��
                                success: function () {
                                    // �û�ȷ�Ϸ����ִ�еĻص�����
                                },
                                cancel: function () {
                                    // �û�ȡ�������ִ�еĻص�����
                                }
                            });
                        }
                        //��ȡ����������Ȧ����ť���״̬���Զ���������ݽӿڣ�����������!res.checkResult.updateTimelineShareData && 
                        if(res.checkResult.updateAppMessageShareData.onMenuShareQZone){
                            wx.onMenuShareQZone({
                                title: share_title, // �������
                                desc: share_desc, // ��������
                                link: share_url, // ��������
                                imgUrl: share_img, // ����ͼ��
                                success: function () {
                                    // �û�ȷ�Ϸ����ִ�еĻص�����
                                },
                                cancel: function () {
                                    // �û�ȡ�������ִ�еĻص�����
                                }
                            });
                        }*/
                    },
                });
            });

            //ͨ��error�ӿڴ���ʧ����֤
            wx.error(function (res) {
                console.log(res);
            });
        }
    };
}