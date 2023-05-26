/**
 * custom.js
 * Custom JS code required by the plugin
 */
jQuery(document).ready(function ($) {

    'use strict';

    // Toggle button

    $('h5.toggle').click(function () {
        $(this).next().slideToggle(300);
        $(this).toggleClass('activetoggle');
        return false;
    }).next().hide();


    // Box close button

    $('.box').each(function () {
        $(this).find('.hide_box').click(function () {
            $(this).parent().hide();
        });
    });

    // Tabs
    $('.tabber').each(function () {
        var widgets = $(this).find('div.tabbed'),
            titleList = '<ul class="ss-tabs clear">',
            i,
            widgetTitle,
            listItem;
        for (i = 0; i < widgets.length; i += 1) {
            widgetTitle = $(widgets[i]).children('h4.tab_title').text();
            $(widgets[i]).children('h4.tab_title').hide();
            listItem = '<li><a href="#' + $(widgets[i]).attr('id') + '">' + widgetTitle + '</a></li>';
            titleList += listItem;
        }
        titleList += '</ul>';
        $(widgets[0]).before(titleList);
        $(this).tabs();
    });

    // Accordion
    $('.accordion').accordion({
        header: 'h5.handle',
        collapsible: true,
        active: false,
        heightStyle: 'content'
    });

});