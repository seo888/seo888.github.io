/**
 * @author: liang
 */

$(function () {
    $(document).on('mouseover', '.h-avatar', function () {
        $('.h-avatar-info').show();
    });
    $(document).on('mouseout', '.h-avatar', function () {
        $('.h-avatar-info').hide();
    });
});
