/**
 * 全站公共js，仅存放性能好，影响小的全站js代码
 */
//防止网站被镜像的监控
var RBDomain = document.domain;
var i=0;

/****** 判断域名执行跳转 ******/
if (RBDomain.indexOf("cnmo.com") == -1 && RBDomain.indexOf("cnmo.me") == -1) {
	new Image().src='//count.cnmo.com/at001.gif?type=rubbishCount&objid=1'+'&r='+Math.random();
}
