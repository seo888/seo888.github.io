

var HtmlUtil = {
	// 1.用浏览器内部转换器实现html编码
	htmlEncode: function(html) {
		// 创建一个元素容器
		var tempDiv = document.createElement('div');
		// 把需要编码的字符串赋值给该元素的innerText(ie支持)或者textContent(火狐、谷歌等) 
		(tempDiv.textContent != undefined) ? (tempDiv.textContent = html) : (tempDiv.innerText = html);
		var output = tempDiv.innerHTML;
		tempDiv = null;
		return output;
	},
	
	// 2.用浏览器内部转换器实现html解码
	htmlDecode: function(text) {
		// 创建一个元素容器
		var tempDiv = document.createElement('div');
		// 把解码字符串赋值给元素innerHTML
		tempDiv.innerHTML = text;
		// 最后返回这个元素的innerText(ie支持)或者textContent(火狐、谷歌等支持)
		var output = tempDiv.innerText || tempDiv.textContent;
		tempDiv = null;
		return output;
	}
}

function search() {
   $("#bdcs-search-form-submit").click(function() {
    var myselect = document.getElementById("selectlist");
    var index = myselect.selectedIndex;
	var searchValue = HtmlUtil.htmlEncode($("#bdcs-search-form-input").val());
	console.log(searchValue);
    window.open("/search.html?key=" + $("#bdcs-search-form-input").val() + "&type=" + myselect.options[index].value);
    });
}

function dengru() {
    
}

function zhuce() { 

}

function tiaozhuan() {
    var url = encodeURIComponent(window.location.href.split('#')[0]);
    var NoCodeUrl = window.location.href.split('#')[0];
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|wOSBrowser|BrowserNG|WebOS)/i))) {
        if (NoCodeUrl.match("dianshizb")) {

            window.location.href = "/wrap/zhibo.aspx";
        }
        if (NoCodeUrl.match("Hengyanlanmu")) {

            window.location.href = "/wrap/brand.aspx";
        }
        if (NoCodeUrl.match("monograph")) {
            window.location.href = "/wrap/Category.aspx";
        }
        if (NoCodeUrl.match("huodong")) {
            window.location.href = "/wrap/wraphd.aspx";

        }
        if (NoCodeUrl.match("dongtai")) {
            window.location.href = "/wrap/newlist.aspx?id=465";

        }
        if (NoCodeUrl.match("news/show")) {
            var str = NoCodeUrl.split('/')[4].split('-')[1].split('.')[0];
            window.location.href = "/wrap/news_show.aspx?id=" + str;
        }

        if (NoCodeUrl.match("news_show")) {
            var str = NoCodeUrl.split('/')[3].split('-')[1].split('.')[0];
            
            window.location.href = "/wrap/news_show.aspx?id=" + str;
            
        }
   	if (NoCodeUrl.match("Eventshow")) {
            var str = NoCodeUrl.split('/')[3].split('-')[1].split('.')[0];
            window.location.href = "/wrap/Event.aspx?id=" + str;
        }
        if (NoCodeUrl.match("dblist1")) {
            var str = NoCodeUrl.split('/')[4];

            window.location.href = "/wrap/pplm.aspx?id=" + str;

        }
        if(NoCodeUrl.match("dblist")){
        
            var str = NoCodeUrl.split('/')[4];
            
            window.location.href = "/wrap/pplmzy.aspx?id=" + str;
        }

        if (NoCodeUrl.match("jiemu_index")) {

            var str = NoCodeUrl.split('/')[4].split('.')[0];
            
            window.location.href = "/wrap/Item.aspx?id=" + str;
        }
        if (NoCodeUrl.match("dianbo_detail")) {

            var str = NoCodeUrl.split('/')[4].split('-')[1];

            window.location.href = "/wrap/Item.aspx?id=" + str;
        }

        if (NoCodeUrl.match("ztxqy")) {

            var str = NoCodeUrl.split('/')[4];

            window.location.href = "/wrap/Thematic.aspx?id=" + str;
return;
        }

        if (NoCodeUrl.match("ztxq")) {

            var str = NoCodeUrl.split('/')[4];

            window.location.href = "/wrap/indexdt.aspx?id=" + str;
        } 
if (NoCodeUrl.match("newszt")) {

            var str = NoCodeUrl.split('/')[4].split('.')[0];

            window.location.href = "/wrap/HYChlidChannel.aspx?id=" + str;
        } 
if (NoCodeUrl.match("hengyanghdDetail")) {
            var str = NoCodeUrl.split('/')[4].split('.')[0];
            alert(str);
            window.location.href = "/wrap/LiveActivityDetail.aspx?id=" + str;
        }    
    }   
}
tiaozhuan();  

