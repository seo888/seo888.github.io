
        $(function () {
            //  
            $('.jubao').click(function () {
                $('#overlay').show()
                $('#popjubao').show()
            });

	var maxHeight = $(window).height() / 2;
	$(window).scroll(function() {
		if ($(window).scrollTop() > maxHeight) {
			$('.jubao').show();
		} else {
			$('.jubao').hide();
		}
	});
            $('.pop_close').click(function () {
                hidepop();
            });
            $('#overlay').click(function () {
                hidepop();
            });

            function hidepop() {
                $('#overlay').hide()
                $('#popjubao').hide()
                return false;
            }

            $("#imgCode").click(function () {
                $("#imgCode").attr("src", $("#imgCode").attr("src") + "?ran=" + Math.random());
            });
        });

        function ReportSumbit() {
            var yuanyin = $('input:radio[name="yuanyin"]:checked').val();
            if (!yuanyin) {
                alert("请选择举报原因!");
                return;
            }
            var url = location.pathname;
            var arr = url.split('/');
            var id = arr[2].split('.')[0];
            var type;
            if(url.indexOf("/yx/") != -1){
                type=1;
            }else{
                type=2;
            }
            var spec = $("#spec").val();
            if (spec.length > 200) {
                alert("原因内容请控制在200字以内!");
                return;
            }

            var code = $("#txtvalidateCode").val();
            var cookie = $("#imgCode").text();
            cookie = cookie.replace(/ /g, '');
            if (code == cookie) {
                $.get("https://m.7xdown.com/zapi/jubao?yuanyin="+yuanyin+"&spec="+spec+"&type="+type+"&uid="+id,function(data,status){
                    data = JSON.parse(data)
                    if(data==1){
                        alert("举报成功");

                        $("input:text").val("");
                        $("#spec").val("");
                        $("#overlay").hide();
                        $("#popjubao").hide();
                        $("#imgCode").attr("src", $("#imgCode").attr("src") + "?ran=" + Math.random());
                        $('.jubao').show();
                        $("#btn").attr("onclick", "ReportSumbit()")
                    }
                });
            } else {
                alert("您输入的验证码有误");
            }

        }
