var da;

jQuery(function() {
	 var url=location.href.split('#')[0];
    jQuery.ajax({
      type: "GET",
      url: "http://fx.newssc.org:8080/api/share",
      dataType: "json",
      data:{
    	  url:url
      },
      async:false,
      success: function(data){

         da=data;


         wx.config({
             debug : false, // ��������ģʽ,���õ�����api�ķ���ֵ���ڿͻ���alert��������Ҫ�鿴����Ĳ�����������pc�˴򿪣�������Ϣ��ͨ��log���������pc��ʱ�Ż��ӡ��
             appId : da.appId, // ������ںŵ�Ψһ��ʶ
             timestamp : da.timestamp, // �������ǩ����ʱ���
             nonceStr : da.nonceStr, // �������ǩ���������
             signature : da.signature,// ���ǩ��������¼1
             jsApiList : ['updateAppMessageShareData', 'updateTimelineShareData', 'chooseImage', 'getLocalImgData']
         // �����Ҫʹ�õ�JS�ӿ��б�����JS�ӿ��б����¼2
            });      
          

     
     
        wx.ready(function () {   //�����û����ܵ������ťǰ���ȵ���
   console.log(newsTitle);
console.log(url);
    	//��������
    	wx.updateAppMessageShareData({ 
    	    title: newsTitle, // �������
    	    desc: newsAbs, // ��������
    	    link: url, // �������ӣ�������������·�������뵱ǰҳ���Ӧ�Ĺ��ں�JS��ȫ����һ��
    	    imgUrl: img, // ����ͼ��
    	    success: function () {
    	      // ���óɹ�

    	    }
    	});
            
     
        
            //�Զ��塰��������Ȧ����������QQ�ռ䡱��ť�ķ�������
    	wx.updateTimelineShareData({ 
            title: newsTitle, // �������
            link: url, // �������ӣ�������������·�������뵱ǰҳ���Ӧ�Ĺ��ں�JS��ȫ����һ��
            imgUrl: img, // ����ͼ��
            success: function () {
              // ���óɹ�
            }
           });



     });

     }
    });

  
});