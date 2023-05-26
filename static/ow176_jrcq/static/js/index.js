//资讯评论
var xmlHttppj = false;
try {
  xmlHttppj = new ActiveXObject("Msxml2.XMLHTTP");
} catch (e) {
  try {
    xmlHttppj = new ActiveXObject("Microsoft.XMLHTTP");
  } catch (e2) {
    xmlHttppj = false;
  }
}
if (!xmlHttppj && typeof XMLHttpRequest != 'undefined') {
  xmlHttppj = new XMLHttpRequest();
}

function newspj(x){
t=document.getElementById("pjt").value;
if(t==""){alert("请输入评价内容");document.getElementById("pjt").focus();return false;}
url = "newspj.php?bh="+x+"&pj="+escape(t);
xmlHttppj.open("get", url, true);
xmlHttppj.onreadystatechange = updatePagepj;
xmlHttppj.send(null);
}

function updatePagepj() {
 if(xmlHttppj.readyState == 4) {
 response = xmlHttppj.responseText;
 response=response.replace(/[\r\n]/g,'');
  if(response=="err1"){tclogin();return false;}
  else if(response=="err2"){alert("亲~评论过于频繁，请稍候再发");return false;}
  else if(response=="ok"){location.reload();}else{alert("未知错误，请刷新重试");return false;}
 }
}

//弹出登录窗口
function tclogin(){
layer.open({
  type: 2,
  area: ['650px', '415px'],
  title:["快捷登录","text-align:left"],
  skin: 'layui-layer-rim', //加上边框
  content:['../tem/openw.php', 'no'] 
});
}
