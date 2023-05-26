/***************************************************

### 建议放文档前面

###  参数 ###
var pcURL    = "http://www.fjsen.com/zhuanti/2020ncp/node_300916.htm";
var padURL   = "http://www.fjsen.com/zhuanti/2020ncp/wap/node_300916.htm";
var jumpRule = "auto";

###  栏目模板 ###
<FOUNDER-XY type="columnlist" data="{'columnid':[],'columntype':'self'}">
<#list columns as column>
<script>
var pcURL    = "${column.url!''}";
var padURL   = "${column.urlPad!''}";
var jumpRule = "auto";
</script>
</#list>
</FOUNDER-XY>

###  内容模板 ###
<FOUNDER-XY type="article" data="{'articleid':''}">
<script>
var pcURL    = "${article.url!''}";
var padURL   = "${article.urlPad!''}";
var jumpRule = "auto";
</script>
</FOUNDER-XY>

###  CDN js  ###
<script src="http://www.fjsen.com/js/xy5url.js"></script>

jumpRule 有三个值： pc   pad   auto
当设置为 pc   时，访问网页时，会跳转至 pcURL
当设置为 pad  时，访问网页时，会跳转至 padURL
当设置为 auto 时，访问网页时，会依据终端类型判断跳转

***************************************************/

(function(pcURL, padURL, jumpRule){
	var toPage = function(url){
		var last = '';
		if(url.match(/#/)) url = url.replace(/#[\S\s]*?$/, function(a){last = a; return '';});
		if(url.match(/\?/)) url = url.replace(/\?([\S\s]*?)$/, function(a, b){last = (b ? '&' + b : '') + last; return '';});
		return url.replace(/(\?|$)/, '?page=' + jumpRule) + last;
	}, jumpURL = function(){
		var url = padURL;
		if(jumpRule == 'pc') url = pcURL;
		location.href = toPage(url);
	}, rightURL = function(url){
		url = '' + url;
		for(var i = 0; i < replaceURL.length; i++){
			url = url.replace(replaceURL[i][0], replaceURL[i][1]);
		}
		return url;
	}, replaceURL = [
		['www.fjsen.com/vod', 'tv.fjsen.com']
		,['zz.fjsen.com', 'zzpd.fjsen.com']
		,['fjdj.fjsen.com', 'www.fjjgdj.gov.cn']
	], curURL = location.href, isPAD = curURL.match(/\/wap/i) ? true : false;
	
	if(curURL.match(/(page=|\/preview)/i)) return ;
	
	if(jumpRule && pcURL && padURL && pcURL != '' && padURL != ''){
		jumpRule = jumpRule.toLowerCase();
		pcURL  = rightURL(pcURL);
		padURL = rightURL(padURL);
		if(jumpRule == 'auto') jumpRule = 'ontouchstart' in window ? 'pad' : 'pc';
		if(jumpRule == 'pc' && isPAD == true) jumpURL();
		if(jumpRule == 'pad' && isPAD == false) jumpURL();
	}
})(pcURL, padURL, jumpRule)

