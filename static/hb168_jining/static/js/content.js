
jQuery(function(jq){
	//标签
	jq(".fontsize").hover(function(){
		jq(".fontsize-layer").show();
		},function(){
		jq(".fontsize-layer").hide();
	});
	jq(".zleftld").hover(function(){
		jq(".zleftld2").show();
		},function(){
		jq(".zleftld2").hide();
	});
	jq(".mobilea").hover(function(){
		jq(".zleftd22").show(100);
		},function(){
		jq(".zleftd22").hide(100);
	});
	jq(".mobileb").hover(function(){
		jq(".zleftlb2").show(100);
		},function(){
		jq(".zleftlb2").hide(100);
	});
	jq(".la2").hover(function(){
		jq(".la22").show(100);
		},function(){
		jq(".la22").hide(100);
	});
	console.log(location.href.indexOf('http://video.sdchina.com/live/'))
	if(location.href.indexOf('http://video.sdchina.com/live/') >= 0) {
		jq(".code").qrcode({ 
			render: "table", //table方式 
			width: 120, //宽度 
			height:120, //高度 
			text: "http://m.sdchina.com/website/#/live/" + jq("#hfLiveID").val() //任意内容 
		});
	} else {
		jq(".code").qrcode({ 
			render: "table", //table方式 
			width: 120, //宽度 
			height:120, //高度 
			text: location.href //任意内容 
		}); 
	}
});
//转换字号
function doZoom(size){	
	jQuery(".zleftf").css("fontSize",size);
}

function qiehuan101(num) {
    for (var id = 1; id <= 3; id++) {
        if (id == num) { document.getElementById("tit101_" + id).className = "zleftj1_off"; document.getElementById("box101_" + id).className = "zleftj1_box_block"; }
        else { document.getElementById("tit101_" + id).className = "zleftj1_on"; document.getElementById("box101_" + id).className = "zleftj1_box_on"; }
    }
}


    $(function() {
		if($("#nav101") && $("#nav101").length > 0) {
			$("#nav101").lavaLamp({
				speed: 300,
				click: function(event, menuItem) {
					//return false;
				}
			});
		}
    });




function qiehuan102(num) {
    for (var id = 1; id <= 3; id++) {
        if (id == num) { document.getElementById("tit102_" + id).className = "zleftj1_off"; document.getElementById("box102_" + id).className = "zleftj1_box_block"; }
        else { document.getElementById("tit102_" + id).className = "zleftj1_on"; document.getElementById("box102_" + id).className = "zleftj1_box_on"; }
    }
}


    $(function() {
		if($("#nav102") && $("#nav102").length > 0) {
			$("#nav102").lavaLamp({
				speed: 300,
				click: function(event, menuItem) {
					//return false;
				}
			});
		}
    });










