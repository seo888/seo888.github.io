/*************
**恩施新闻网**
*************/

function articleSpace() {
	var spaceDiv = $('.article-space');
	if(!spaceid || !spaceDiv.length) return;
	$.getJSON(APP_URL+'?app=system&controller=content&action=space&type=json&jsoncallback=?',{'contentid':contentid,'pagesize':4}, function(data){
		if(typeof(data.spaceid) == 'undefined' || !data.spaceid) return;
		if (data.space.photo.indexOf("http") < 0) data.space.photo=UPLOAD_URL+data.space.photo;
		spaceDiv.append('<dl>'+
			'<dt class="clear"><h3>作者专栏</h3></dt>'+
			'<dd class="author ofh clear">'+
				'<div class="photo tac fl ofh mt5">'+
					'<a href="'+SPACE_URL+data.space.alias+'" target="_blank"><img width="" height="" src="'+data.space.photo+'"><br>'+data.space.author+'</a>'+
				'</div>'+
				'<div class="descr fl ml10 ofh">'+
					'<a href="'+SPACE_URL+data.space.alias+'" target="_blank">'+cut_str(data.space.description, 47)+'</a>'+
				'</div>'+
			'</dd>'+
			'<dd class="lists clear ofh hidden"><ul class="list-dot f14 clear"></ul></dd>'+
			'</dl>');
		$('#info-author').html('<a href="'+SPACE_URL+data.space.alias+'" target="_blank">'+data.space.author+'</a>');
		$.each(data.article, function(k, v) {
			spaceDiv.find('.lists').show().find('ul').append('<li><a href="'+v.url+'" target="_blank">'+v.title+'</a></li>');
		});
		$('.article-space-bottom dl').addClass('content-bar');
	});
};

function articleFulltext() {
	var context = '',
			content = '',
			contentDiv = $('.article-content');
	$('.btn-showContent').click(function(){
		var fullContent = function() {
			$('h1#title').html($('h1#title').html().replace(/（\d）/, ''));
			contentDiv.html(context);
			$('.btn-showContent').addClass('border-radius-leftTB').html('分页阅读').parent().siblings().hide();
			$('.article-minNav').hide();
		};
		if(context ==''){
			content = contentDiv.html();
			$.getJSON(APP_URL+'?app=article&controller=article&action=fulltext&jsoncallback=?&contentid='+contentid, function(data){
				context = data.content;
				fullContent();
			});
		}else{
			if($(this).html() == '分页阅读'){
				$('h1#title').html(title);
				contentDiv.html(content);
				$(this).removeClass('border-radius-leftTB').html('阅读全文').parent().siblings().show();
				$('.article-minNav, .pagination li a').show();
			}else{
				fullContent();
			};
		};
	});
};

$(function(){
	articleSpace();
	articleFulltext();
});

