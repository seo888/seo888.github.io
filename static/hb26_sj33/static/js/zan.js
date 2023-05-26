$(function () {
    $.post(
        '/iszan.php',
        {
            id: archiveId
        },
        function (result, status) {
            if (status == 'success') {
                result = eval('(' + result + ')');
                if (result.code == 0) {
                    if (result.data.iszan == 1) {
                        $('#zan_button').unbind('click').removeClass('zan').addClass('zan_s');
                    }
                    $('#zan_number').text(result.data.zan);
                }
            }
        });
    $('#zan_button').click(function () {
        if ($(this).hasClass('zan_s')) {
            return false;
        }
        $.post(
            '/zan.php',
            {
                id: archiveId
            },
            function (result, status) {
                var zan_number = parseInt($('#zan_number').text());
                zan_number++;
                $('#zan_number').text(zan_number);
                $('#zan_button').unbind('click').removeClass('zan').addClass('zan_s');
            }
        );
    });
});
