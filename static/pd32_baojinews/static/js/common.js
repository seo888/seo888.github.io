//提交检索
function submitsearch(event) {
	let keyword=$("#account").val();

	if (keyword == "搜索" || keyword == "") {
		alert("请输入查询关键字!");
		return false;
	}
	else {
		location.href="/search/index.html?keyword=" + encodeURIComponent(keyword)
	}
}

$(document).ready(function () {
	/*****首页搜索*****/
	$('.search').on('keydown','#account',function(event){
            if(event.keyCode==13){
                submitsearch()
            }
    });

	$(".followbtn").click(function(){
		layer.open({
		  type: 1,
		  title: "宝鸡Plus二维码",
		  skin: 'layui-layer-rim', //加上边框
		  area: ['280px', '332px'], //宽高
		  content: '<img src="http://cdn.baojinews.cn/site/1/images/qrcode.png" width="280">'
		});
	});

	$(".xuexibtn").click(function(){
		layer.open({
		  type: 1,
		  title: "学习强国二维码",
		  skin: 'layui-layer-rim', //加上边框
		  area: ['280px', '332px'], //宽高
		  content: '<img src="http://cdn.baojinews.cn/site/1/images/xuexi.png" width="280">'
		});
	});

	$(".wmbtn").click(function(){
		
	});

});



/******tongji********/
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?64f48544a0890d3d15f0d12fcb40deb6";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
