// JavaScript Document
var domain = ".gamedog.cn";
//更新下载次数
function setAdddonws(aid,token){
	//return false;
	//alert("http://plus"+domain+"/ajax_comm.php?callback=?&action=setAdddowns&aid="+aid+"&token="+token);
	$.getJSON("http://plus"+domain+"/ajax_comm.php?callback=?&action=setAdddowns&aid="+aid+"&token="+token+"&source=2",function(data){
	  //alert(data)
	  return true;
	});
}

//极速下载
function fasterDownloads(id,name,shorttitle,imgurl,version,size,grade,classid,token,packagename,versioncode){
	var req = new XMLHttpRequest();
	url = "http://127.0.0.1:32999/?id="+id+"&name="+name+"&shorttitle="+shorttitle+"&imgurl="+imgurl+"&version="+version+"&size="+size+"&grade="+grade+"&classid="+classid+"&token="+token+"&packagename="+packagename+"&versionCode="+versioncode;
	req.open("GET", url, true);
    req.onreadystatechange = function () {
		if(req.status != 200){
		    window.location = 'http://wap1.gamedog.cn/soft/zhushou/android/zhushou_gao_'+id+'.apk';//转到下载页面或直接下载
		}
    };
    req.send(null);
}

//下载内页 控制下载显示隐藏
$(window).scroll(function () {
    if ($(window).scrollTop() > 235 ) {
        $(".downit2").css('display', 'block');
    }else{
        $(".downit2").css('display', 'none');
    }
});

$(function() { 
    var explorer = window.navigator.userAgent;
    if (explorer.indexOf("gamedog") >= 0) {
        $("#" + e).hide();
        return false
    }
    var isiOS = !!explorer.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if(isiOS == false){
      //  $(".jisu").css('display', 'none');
    }
})

function setFont(id) {
    $("#con_wenzhang").removeClass().addClass("con_wenzhang" + id)
}
$(document).ready(function() {
    $("a.w-art-pic").click(function() {
        var str = $(this).children("img").attr("src");
        if (str.substr(0, 8) == "http://m") {
            $(this).removeClass("w-pic-small").addClass("w-pic-big");
            $(this).children("img").attr("src", str.replace("http://mimg", "http://img"))
        } else {
            $(this).children("img").attr("src", str.replace("http://img", "http://mimg"));
            $(this).removeClass("w-pic-big").addClass("w-pic-small")
        }
    })
});
function getLikeApps(e) {
    $.getJSON("http://m"+domain+"/index.php?m=N&a=likeapps",
    function(data) {
        if (data) {
            var str = '<div class="likeapp apps_touchslider">';
            str += '<div class="tit"><span>猜您喜欢</span>';
            str += ' <span class="scroll"><span class="touchslider-nav-item touchslider-nav-item-current"></span><span class="touchslider-nav-item"></span><span class="touchslider-nav-item"></span></span>';
            str += "</div>";
            str += '<div class="apps_touchslider2">';
            str += '<div class="touchslider-viewport" style="width:100%; height:210px;overflow:hidden"><div>';
            str += '<div class="touchslider-item">';
            str += "<ul>";
            for (var i = 0; i < data.length; i++) {
                str += "<li>";
                str += '<a href="' + data[i].arcurl + '"><img src="' + data[i].icon + '"  height="72" width="72"></a>';
                str += '<a href="' + data[i].arcurl + '">' + data[i].shorttitle.substring(0, 6) + "</a>";
                str += "</li>";
                if ((i + 1) % 6 == 0 && i != 17) {
                    str += '</ul></div><div class="touchslider-item"><ul>'
                }
            }
            str += "</div></div>";
            $("#" + e).html(str);
       
        }
    })
}
function getLikeApps2(e) {
    $.getJSON("http://m"+domain+"/index.php?m=N&a=likeapps",
    function(data) {
        if (data) {
            var str = '<div class="swiper-container">';
            str += '<div class="tit"><span class="shouyouico">手游推荐</span>';
            str += '<div class="swiper-pagination"></div>';
            str += "</div>";
            str += '<div class="swiper-wrapper carousel-list">';
            str += '<ul class="swiper-slide">';
            for (var i = 0; i < data.length; i++) {
                str += "<li>";
                str += '<a href="' + data[i].arcurl + '"><img src="' + data[i].icon + '" ></a>';
                str += '<a href="' + data[i].arcurl + '">' + data[i].shorttitle.substring(0, 6) + "</a>";
                str += "</li>";
                if ((i + 1) % 8 == 0 && i != 23) {
                    str += '</ul><ul class="swiper-slide">'
                }
            }
            str += "</div></div>";
            $("#" + e).html(str);
        
        }
    })
}
function getLikeDbApps(e, t) {
    var explorer = window.navigator.userAgent;
    if (explorer.indexOf("gamedog") >= 0) {
        $("#" + e).hide();
        return false
    }
    var tname;
    if (t == "bizhi") {
        tname = "热门游戏推荐"
    } else {
        tname = "猜你喜欢"
    }
    $.getJSON("http://m"+domain+"/index.php?m=N&a=likeDbApps",
    function(data) {
        if (data) {
            var str = '<div class="likeapp apps_touchslider">';
            str += '<div class="tit"><span class="loveico">' + tname + "</span>";
            str += ' <span class="scroll"><span class="touchslider-nav-item touchslider-nav-item-current"></span><span class="touchslider-nav-item"></span><span class="touchslider-nav-item"></span></span>';
            str += "</div>";
            str += '<div class="apps_touchslider2">';
            str += '<div class="touchslider-viewport" style="width:100%; height:210px;overflow:hidden"><div>';
            str += '<div class="touchslider-item">';
            str += "<ul>";
            for (var i = 0; i < data.length; i++) {
                str += "<li>";
                str += '<a href="' + data[i].arcurl + '"><img src="' + data[i].icon + '"  height="72" width="72"></a>';
                str += '<a href="' + data[i].arcurl + '">' + data[i].shorttitle.substring(0, 6) + "</a>";
                str += "</li>";
                if ((i + 1) % 8 == 0 && i != 17) {
                    str += '</ul></div><div class="touchslider-item"><ul>'
                }
            }
            str += "</div></div>";
            $("#" + e).html(str);
         
        }
    })
}

//都在玩
function getandroidPlay(d) {
    var explorer = window.navigator.userAgent;
    if (explorer.indexOf("gamedog") >= 0) {
        $("#" + d).hide();
        return false;
    }
    var isAndroid = explorer.indexOf("Android") > -1 || explorer.indexOf("Adr") > -1;
    var isiOS = !!explorer.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    var tname = '';
    var moreurl = '';
    if (isAndroid == true) {
        var dataurl = "http://m"+domain+"/index.php?m=N&a=likeapps&system=andorid&wy=50&dj=10"
         tname ='网游推荐';
         moreurl = 'http://m.gamedog.cn/android/';
    } else {
        if (isiOS == true) {
            // $("#" + d).hide();
            var dataurl = "http://m"+domain+"/index.php?m=N&a=h5DjPlay";
             tname='小游戏推荐';
             moreurl = 'http://m.gamedog.cn/h5/';
        } else {
            $("#" + d).hide();
            return false
        }
    }

    var str = "";
    $.getJSON(dataurl,
    function(data) {
        if (data) {
            if(isAndroid==true){
                data = getRandomArrayElements(data,5);
                str += '<div class="h5_sement">';
                str += '<div class="h5_rmtjgk"><em></em><span>'+tname+'</span><a href="'+moreurl+'">更多游戏</a></div>';
                str += '<ul>';
                for (var i = 0; i < data.length; i++) {
                    str += '    <li>';
                    str += '        <a href="' + data[i].arcurl + '">';
                    str += '            <img src="' + data[i].icon + '" class="recently-played-img" />';
                    str += '            <b>' + data[i].shorttitle + "</b>";
                    str += "        </a>";
                    str += "    </li>"
                }
                str += "</ul>";
                str += "</div>";
            }else{
                str += '<div class="h5_sement">';
                str += '<div class="h5_rmtjgk"><em></em><span>'+tname+'</span><a href="'+moreurl+'">更多游戏</a></div>';
                str += '<ul>';
                for (var i = 0; i < data.length; i++) {
                    str += '    <li>';
                    str += '        <a href="' + data[i].playurl + '">';
                    str += '            <img src="' + data[i].icon + '" />';
                    str += '            <b>' + data[i].shorttitle + "</b>";
                    str += "        </a>";
                    str += "    </li>"
                }
                str += "</ul>";
                str += "</div>";
            }
            $("#" + d).html(str);
            
        } else {
            $("#" + d).hide();
            return false
        }
    })
}

function getShouyouDbApps(e, t) {
    var explorer = window.navigator.userAgent;
    if (explorer.indexOf("gamedog") >= 0) {
        $("#" + e).hide();
        return false
    }
    var isAndroid = explorer.indexOf("Android") > -1 || explorer.indexOf("Adr") > -1;
    var isiOS = !!explorer.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isAndroid == true) {
        var dataurl = "http://m"+domain+"/index.php?m=N&a=likeapps&system=andorid&wy=50&dj=10"
    } else {
        if (isiOS == true) {
            $("#" + e).hide();
            return false
            var dataurl = "http://m"+domain+"/index.php?m=N&a=likeapps&system=ios&wy=100&dj=10"
        } else {
            $("#" + e).hide();
            return false
        }
    }
    var tname;
    if (t == "bizhi") {
        tname = "热门游戏推荐"
    } else {
        tname = "手游推荐"
    }
    $.getJSON(dataurl,
    function(data) {
        if (data) {
            data = getRandomArrayElements(data,8)
            if (isiOS == true) {
                var str = '<div class="swiper-container swiper-container-sy">';
                str += '<div class="tit"><span class="shouyouico">' + tname + "</span>";
                str += "</div>";
                str += '<div class="swiper-wrapper carousel-list">';
                str += '<ul class="swiper-slide">';
                for (var i = 0; i < 4; i++) {
                    str += "<li>";
                    str += '<a href="' + data[i].arcurl + '"><img src="' + data[i].icon + '" ></a>';
                    str += '<a href="' + data[i].arcurl + '">' + data[i].shorttitle.substring(0, 6) + "</a>";
                    str += "</li>";
                    if ((i + 1) % 12 == 0 && i != 23) {
                        str += '</ul><ul class="swiper-slide">'
                    }
                }
                str += "</div></div>";
                $("#" + e).html(str)
            } else {
                if (isAndroid == true) {
                    var str = '<div class="swiper-container swiper-container-sy">';
                    str += '<div class="tit"><span class="shouyouico">' + tname + "</span>";
                    str += ' <div class="swiper-pagination  swiper-pagination-db"></div>';
                    str += "</div>";
                    str += '<div class="swiper-wrapper carousel-list">';
                    str += '<ul class="swiper-slide">';
                    for (var i = 0; i < data.length; i++) {
                        str += "<li>";
                        str += '<a href="' + data[i].arcurl + '"><img src="' + data[i].icon + '" ></a>';
                        str += '<a href="' + data[i].arcurl + '">' + data[i].shorttitle.substring(0, 6) + "</a>";
                        str += "</li>";
                        if ((i + 1) % 12 == 0 && i != 23) {
                            str += '</ul><ul class="swiper-slide">'
                        }
                    }
                    str += "</div></div>";
                    $("#" + e).html(str);
                   
                }
            }
        }
    })
}

function getXinpinDbApps(e,newshuxing,newshuxingname) {
    var explorer = window.navigator.userAgent;
    if (explorer.indexOf("gamedog") >= 0) {
        $("#" + e).hide();
        return false
    }
    var isAndroid = explorer.indexOf("Android") > -1 || explorer.indexOf("Adr") > -1;
    var isiOS = !!explorer.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	if(newshuxing==""){
		return false;
	}

    if (isAndroid == true) {

		var parstr  = newshuxing?"&newshuxing="+newshuxing:""; 
        var dataurl = "http://m"+domain+"/index.php?m=N&a=xinpinapps&system=andorid"+parstr
    } else {
        if (isiOS == true) {
            $("#" + e).hide();
            return false
            var dataurl = "http://m"+domain+"/index.php?m=N&a=xinpinapps&system=ios"
        } else {
            $("#" + e).hide();
            return false
        }
    }
    var tname = "相关游戏";
	//alert(newshuxingname.length);
	if(newshuxingname && newshuxingname.length>1){
		tname = newshuxingname+tname;
	}
    
    $.getJSON(dataurl,
		function(data) {
			if (data) {
				if(data.length>8){
					data = getRandomArrayElements(data,8)
				}
					var str = '<div class="swiper-container swiper-container-sy">';
					str += '<div class="tit"><span class="shouyouico">' + tname + "</span>";
					str += "</div>";
					str += '<div class="swiper-wrapper carousel-list">';
					str += '<ul class="swiper-slide">';
					console.log("tname",data);
					for (var i = 0; i < 4; i++) {
						if(data[i]){
							str += "<li>";
							str += '<a href="' + data[i].arcurl + '"><img src="' + data[i].icon + '" ></a>';
							str += '<a href="' + data[i].arcurl + '">' + data[i].shorttitle.substring(0, 6) + "</a>";
							str += "</li>";
							if ((i + 1) % 12 == 0 && i != 23) {
								str += '</ul><ul class="swiper-slide">'
							}
						}
                }
                str += "</div></div>";
                $("#" + e).html(str)
			
        }
    })
}
//随机数组元素
function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

function getLikeDbAppsv3(e, t) {
    var explorer = window.navigator.userAgent;
    if (explorer.indexOf("gamedog") >= 0) {
        $("#" + e).hide();
        return false
    }
    var tname;
    if (t == "bizhi") {
        tname = "热门游戏推荐"
    } else {
        tname = "猜你喜欢"
    }
    $.getJSON("http://m"+domain+"/index.php?m=N&a=likeDbApps?callback=?",
    function(data) {
        if (data) {
            var str = '<div class="apps_touchslider">';
            str += '<div class="title"><span><img src="/Public/zq/img/xh_tb.png"></span>';
            str += "<span>" + tname + "</span>";
            str += ' <span class="scroll"><span class="touchslider-nav-item touchslider-nav-item-current"></span><span class="touchslider-nav-item"></span><span class="touchslider-nav-item"></span></span>';
            str += "</div>";
            str += '<div class="apps_touchslider2">';
            str += '<div class="touchslider-viewport" style="width:100%; height:210px;overflow:hidden">';
            str += '<div class="touchslider-item">';
            str += "<ul>";
            for (var i = 0; i < data.length; i++) {
                str += "<li>";
                str += '<a href="' + data[i].arcurl + '"><img src="' + data[i].icon + '" ></a>';
                str += '<a href="' + data[i].arcurl + '">' + data[i].shorttitle.substring(0, 6) + "</a>";
                str += "</li>";
                if ((i + 1) % 6 == 0 && i != 17) {
                    str += '</ul></div><div class="touchslider-item"><ul>'
                }
            }
            str += "</div></div></div>";
            $("#" + e).html(str);
            $(".apps_touchslider").touchSlider({
                mouseTouch: true,
                autoplay: true
            })
        }
    })
}

function getH5djPlay(d) {
    var explorer = window.navigator.userAgent;
    if (explorer.indexOf("gamedog") >= 0) {
        $("#" + d).hide();
        return false
    }
    var str = "";
    $.getJSON("http://m"+domain+"/index.php?m=N&a=h5DjPlay",
    function(data) {
        if (data) {
            str += '<div class="h5_sement">';
            str += '<div class="h5_rmtjgk"><em></em><span>小游戏推荐</span><a href="http://m.gamedog.cn/h5/">更多游戏</a></div>';
            str += '<ul>';
            for (var i = 0; i < data.length; i++) {
                str += '    <li>';
                str += '        <a href="' + data[i].playurl + '">';
                str += '            <img src="' + data[i].icon + '" />';
                str += '            <b>' + data[i].shorttitle + "</b>";
                str += "        </a>";
                str += "    </li>"
            }
            str += "</ul>";
            str += "</div>";
            $("#" + d).html(str);
         
        } else {
            $("#" + d).hide();
            return false
        }
    })
}
function recommendList(d) {
    if (articleId == 171495) {
        var title = $("title").html();
        var url = window.location.href;
        $.getJSON("http://m" + domain + "/index.php?m=N&a=getsmapi&callback=?&title=" + title + "&url=" + url,
        function(data) {
            if (data.error == "succ") {
                var hits = data.hits;
                var li = "";
                for (var i in hits) {
                    var url = "http://m.sa.sm.cn/s?q=" + hits[i].word + "&uc_param_str=dnntnwvepffrgibijbprsvpi&from=wa000101";
                    li = li + '<li><a href="' + url + '" target="_blank">' + hits[i].word + "</a></li>"
                }
                if (li.length > 0) {
                    var content = '<section class="news color_smtj">';
                    content = content + '<div class="newstitle"><span>相关推荐</span></div><div class="newslist">';
                    content = content + "<ul>" + li + "</ul>";
                    content = content + "</div></section>";
                    $("#" + d).before(content)
                }
            } else {
                var url = window.location.href;
                recommendList2(d, url)
            }
        })
    } else {
        return false
    }
}
function recommendList2(d, url) {
    var ciarray = new Array();
    ciarray[0] = "我的世界中文版";
    ciarray[1] = "地铁跑酷最新版";
    ciarray[2] = "游戏狗保卫萝卜";
    ciarray[3] = "保卫萝卜2攻略";
    ciarray[4] = "密室逃脱攻略";
    ciarray[5] = "我的世界中文版";
    ciarray[6] = "植物大战僵尸2攻略";
    ciarray[7] = "星河战神";
    ciarray[8] = "奇怪的大冒险攻略";
    ciarray[9] = "植物大战僵尸2破解版";
    ciarray[10] = "未上锁的房间2攻略";
    var i = Math.round(Math.random() * 10);
    title = ciarray[i];
    $.getJSON("http://m" + domain + "/index.php?m=N&a=getsmapi&callback=?&title=" + title + "&url=" + url,
    function(data) {
        if (data.error == "succ") {
            var hits = data.hits;
            var li = "";
            for (var i in hits) {
                var url = "https://so.m.sm.cn/s?q=" + hits[i].word + "&uc_param_str=dnntnwvepffrgibijbprsvpi&from=wa000101";
                li = li + '<li><a href="' + url + '" target="_blank">' + hits[i].word + "</a></li>"
            }
            if (li.length > 0) {
                var content = '<section class="news color_smtj">';
                content = content + '<div class="newstitle"><span>相关推荐</span></div><div class="newslist">';
                content = content + "<ul>" + li + "</ul>";
                content = content + "</div></section>";
                $("#" + d).before(content)
            }
        }
    })
}

function getH5DbApps(e, t) {
    getH5DbAppsV2(e, t);
}

function getH5DbAppsV2(e, t) {
    var explorer = window.navigator.userAgent;
    if (explorer.indexOf("gamedog") >= 0) {
        $("#" + e).hide();
        return false
    }
    var tname;
    if (t == "bizhi") {
        tname = "热门游戏推荐"
    } else {
        tname = "H5游戏推荐"
    }
    $.getJSON("http://m"+domain+"/index.php?m=N&a=h5DbApps",
    function(data) {
        if (data) {
            var str = '<div class="swiper-container swiper-container-h5">';
            str += '<div class="h5tit"><span class="h5ico">' + tname + "</span>";
            str += ' <div class="swiper-pagination swiper-pagination-h5"></div>';
            str += "</div>";
            str += '<div class="swiper-wrapper carousel-list">';
            str += '<ul class="swiper-slide">';
            for (var i = 0; i < data.length; i++) {
                str += "<li>";
                str += '<a href="' + data[i].playurl + '"><img src="' + data[i].icon + '" ></a>';
                str += '<a href="' + data[i].playurl + '">' + data[i].shorttitle.substring(0, 6) + "</a>";
                str += "</li>";
                if ((i + 1) % 8 == 0 && i != 23) {
                    str += '</ul><ul class="swiper-slide">'
                }
            }
            str += "</div></div>";
            $("#" + e).html(str);
        
        }
    })
}


function getContentApps() {
    var explorer = window.navigator.userAgent;
    var isAndroid = explorer.indexOf("Android") > -1 || explorer.indexOf("Adr") > -1;
    var isiOS = !!explorer.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	//domain=".gamedog.cn";
    $.getJSON("http://m"+domain+"/index.php?m=N&a=listAjaxContet",
    function(data) {
		if(isAndroid ){
		   if (data.jptj) {
				str =  getAppsHtml("精品推荐",data.jptj);
				$("#ContentApps").append(str);
			}
		
			if (data.xinpin) {
				str =  getAppsHtml("新品推荐",data.xinpin);
				$("#ContentApps").append(str);
			}	
		}		
	   if (data.h5) {
			str =  getAppsHtml("H5游戏推荐",data.h5);
			$("#ContentApps").append(str);
        }		
    })
}

function getAppsHtml(tname,data) {
		  if(data.length>8){
			  data = getRandomArrayElements(data,8)	
			}
	        var str = '	<div id="h5app" class="h5app"><div class="swiper-container swiper-container-h5">';
            str += '<div class="h5tit"><span class="h5ico">'+tname+'</span>';
            str += ' <div class="swiper-pagination swiper-pagination-h5"></div>';
            str += "</div>";
            str += '<div class="swiper-wrapper carousel-list">';
            str += '<ul class="swiper-slide">';
            for (var i = 0; i < data.length; i++) {
                str += "<li>";
                str += '<a href="' + data[i].arcurl + '"><img src="' + data[i].icon + '" ></a>';
                str += '<a href="' + data[i].arcurl + '">' + data[i].title.substring(0, 6) + "</a>";
                str += "</li>";
                if ((i + 1) % 8 == 0 && i != 23) {
                    str += '</ul><ul class="swiper-slide">'
                }
            }
            str += "</div></div></div>";
			
		return   str;	
}