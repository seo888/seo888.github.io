document.write('<div style="display:none;"><script type="text/javascript">var cnzz_protocol = "https://";document.write(unescape("%3Cspan id=\'cnzz_stat_icon_5889335\'%3E%3C/span%3E%3Cscript src=\'" + cnzz_protocol + "v1.cnzz.com/stat.php%3Fid%3D5889335\' type=\'text/javascript\'%3E%3C/script%3E"));</script></div>');
document.write('<div style="display:none;"><script type="text/javascript">document.write(unescape("%3Cspan id=\'cnzz_stat_icon_1252957732\'%3E%3C/span%3E%3Cscript src=\'" + cnzz_protocol + "s19.cnzz.com/stat.php%3Fid%3D1252957732\' type=\'text/javascript\'%3E%3C/script%3E"));</script></div>');
document.write('<div style="display:none;"><script type="text/javascript">document.write(unescape("%3Cspan id=\'cnzz_stat_icon_1257375486\'%3E%3C/span%3E%3Cscript src=\'" + cnzz_protocol + "s4.cnzz.com/stat.php%3Fid%3D1257375486\' type=\'text/javascript\'%3E%3C/script%3E"));</script></div>');

function friendly(url,org_id){
    _paq.push(['setCustomVariable', 1, 'channel_id', 'PC', 'page']);
    _paq.push(['setCustomVariable', 2, 'screen', 'pc_friendly_click', 'page']);
    _paq.push(['setCustomVariable', 3, 'url', url, 'page']);
    _paq.push(['trackPageView']); _paq.push(['setSiteId',org_id]);

}

function services(url,org_id,s_id){
    _paq.push(['setCustomVariable', 1, 'channel_id', 'PC', 'page']);
    _paq.push(['setCustomVariable', 2, 'screen', 'pc_service_click', 'page']);
    _paq.push(['setCustomVariable', 3, 'url', url, 'page']);
    _paq.push(['setCustomVariable', 4, 'service_id', s_id, 'page']);
    _paq.push(['trackPageView']); _paq.push(['setSiteId',org_id]);

}

function ads(ad_id,org_id){
    _paq.push(['setCustomVariable', 1, 'channel_id', 'PC', 'page']);
    _paq.push(['setCustomVariable', 2, 'screen', 'pc_ad_click', 'page']);
    _paq.push(['setCustomVariable', 3, 'ad_id', ad_id, 'page']);
     _paq.push(['trackPageView']); _paq.push(['setSiteId',org_id]);
}

function category(classid,org_id){
    _paq.push(['setCustomVariable', 1, 'channel_id', 'PC', 'page']);
    _paq.push(['setCustomVariable', 2, 'screen', 'pc_news_list', 'page']);
    _paq.push(['setCustomVariable', 4, 'class_id', classid, 'page']);
     _paq.push(['trackPageView']); _paq.push(['setSiteId',org_id]);
}
